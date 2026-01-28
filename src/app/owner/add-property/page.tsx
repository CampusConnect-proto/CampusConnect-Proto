'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UploadCloud, Utensils, IndianRupee } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

const propertySchema = z.object({
  propertyName: z.string().min(1, 'Property name is required'),
  distanceFromCollege: z.coerce.number().min(0, 'Distance must be a positive number'),
  roomType: z.string({ required_error: 'Please select a room type.' }),
  rent: z.coerce.number().min(1, 'Rent must be at least 1'),
  facilities: z.array(z.string()),
  totalCapacity: z.coerce.number().min(1, 'Capacity must be at least 1'),
  currentAvailability: z.coerce.number().min(0, 'Availability cannot be negative'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  contactNumber: z.string().regex(/^\d{10}$/, 'Please enter a valid 10-digit phone number'),
  messAvailable: z.boolean(),
  messType: z.string().optional(),
  messPricingModel: z.string().optional(),
  messPrice: z.coerce.number().optional(),
  mealPlans: z.array(z.string()).optional(),
  messTimings: z.string().optional(),
  messDistanceFromRoom: z.coerce.number().optional(),
});

const allFacilities = ['Wi-Fi', 'AC/Heater', 'Geyser', 'Power Backup', 'Laundry', 'Kitchen'];
const allMealPlans = ['Breakfast Only', 'Breakfast + Dinner', 'All Meals', 'On-demand'];


export default function AddPropertyPage() {
  const form = useForm<z.infer<typeof propertySchema>>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      propertyName: '',
      distanceFromCollege: 0,
      rent: 5000,
      facilities: [],
      totalCapacity: 1,
      currentAvailability: 1,
      description: '',
      contactNumber: '',
      messAvailable: false,
      mealPlans: [],
    },
  });

  const watchMessAvailable = form.watch('messAvailable');
  const watchMessPricingModel = form.watch('messPricingModel');

  function onSubmit(values: z.infer<typeof propertySchema>) {
    console.log('Submitting new property:', values);
    // In a real app, you'd handle Firebase submission here
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
        <Card className="max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle className="text-3xl font-headline">List Your Property</CardTitle>
                <CardDescription>Fill out the form below to add your property to Campus Connect.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                        control={form.control}
                        name="propertyName"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Property Name</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., Green View Hostel" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />

                        <div className="grid md:grid-cols-2 gap-8">
                             <FormField
                                control={form.control}
                                name="distanceFromCollege"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Distance from Nearest College (in km)</FormLabel>
                                    <FormControl>
                                        <Input type="number" step="0.1" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="roomType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Room Type</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a room type" />
                                            </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                            <SelectItem value="single">Single</SelectItem>
                                            <SelectItem value="shared">Shared</SelectItem>
                                            <SelectItem value="studio">Studio</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                         <FormField
                            control={form.control}
                            name="rent"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Room Rent (per month)</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="facilities"
                            render={() => (
                            <FormItem>
                                <div className="mb-4">
                                <FormLabel>Facilities</FormLabel>
                                <FormDescription>
                                    Select the amenities available at your property.
                                </FormDescription>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {allFacilities.map((item) => (
                                    <FormField
                                    key={item}
                                    control={form.control}
                                    name="facilities"
                                    render={({ field }) => {
                                        return (
                                        <FormItem
                                            key={item}
                                            className="flex flex-row items-start space-x-3 space-y-0"
                                        >
                                            <FormControl>
                                            <Checkbox
                                                checked={field.value?.includes(item)}
                                                onCheckedChange={(checked) => {
                                                return checked
                                                    ? field.onChange([...field.value, item])
                                                    : field.onChange(
                                                        field.value?.filter(
                                                        (value) => value !== item
                                                        )
                                                    );
                                                }}
                                            />
                                            </FormControl>
                                            <FormLabel className="font-normal capitalize">
                                            {item}
                                            </FormLabel>
                                        </FormItem>
                                        );
                                    }}
                                    />
                                ))}
                                </div>
                                <FormMessage />
                            </FormItem>
                            )}
                        />

                        <div className="grid md:grid-cols-2 gap-8">
                             <FormField
                                control={form.control}
                                name="totalCapacity"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Total Capacity</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="currentAvailability"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Current Availability (beds)</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        
                         <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Tell students about your property..." {...field} rows={6} />
                                    </FormControl>
                                     <FormDescription>
                                        Provide a detailed description to attract students.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                         <FormField
                            control={form.control}
                            name="contactNumber"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Contact Number</FormLabel>
                                <FormControl>
                                    <Input type="tel" placeholder="9876543210" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Separator />
                        <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                                <Utensils className="w-6 h-6 text-primary" />
                                <div>
                                    <h3 className="text-lg font-medium font-headline">Mess / Food Facilities</h3>
                                    <p className="text-sm text-muted-foreground">Provide details about the food facilities if available.</p>
                                </div>
                            </div>

                            <FormField
                                control={form.control}
                                name="messAvailable"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">Is Mess Available?</FormLabel>
                                        <FormDescription>
                                        Check if you provide food/mess services.
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    </FormItem>
                                )}
                            />

                            {watchMessAvailable && (
                                <div className="space-y-8 pl-4 border-l-2 ml-4">
                                    <FormField
                                        control={form.control}
                                        name="messType"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Cuisine Type</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select cuisine type" />
                                                    </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                    <SelectItem value="veg">Veg Only</SelectItem>
                                                    <SelectItem value="non-veg">Non-Veg Only</SelectItem>
                                                    <SelectItem value="both">Veg & Non-Veg</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                     <FormField
                                        control={form.control}
                                        name="messPricingModel"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Pricing Model</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select pricing model" />
                                                    </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                    <SelectItem value="included">Included in Rent</SelectItem>
                                                    <SelectItem value="per-meal">Per Meal</SelectItem>
                                                    <SelectItem value="monthly">Monthly Mess</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {(watchMessPricingModel === 'per-meal' || watchMessPricingModel === 'monthly') && (
                                        <FormField
                                            control={form.control}
                                            name="messPrice"
                                            render={({ field }) => (
                                                <FormItem>
                                                <FormLabel>Price</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                        <Input type="number" placeholder={watchMessPricingModel === 'per-meal' ? 'Price per meal' : 'Price per month'} {...field} className="pl-8"/>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )}

                                     <FormField
                                        control={form.control}
                                        name="mealPlans"
                                        render={() => (
                                        <FormItem>
                                            <div className="mb-4">
                                            <FormLabel>Available Meal Plans / Combos</FormLabel>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                            {allMealPlans.map((item) => (
                                                <FormField
                                                key={item}
                                                control={form.control}
                                                name="mealPlans"
                                                render={({ field }) => {
                                                    return (
                                                    <FormItem
                                                        key={item}
                                                        className="flex flex-row items-start space-x-3 space-y-0"
                                                    >
                                                        <FormControl>
                                                        <Checkbox
                                                            checked={field.value?.includes(item)}
                                                            onCheckedChange={(checked) => {
                                                            return checked
                                                                ? field.onChange([...(field.value || []), item])
                                                                : field.onChange(
                                                                    (field.value || []).filter(
                                                                    (value) => value !== item
                                                                    )
                                                                );
                                                            }}
                                                        />
                                                        </FormControl>
                                                        <FormLabel className="font-normal capitalize">
                                                        {item}
                                                        </FormLabel>
                                                    </FormItem>
                                                    );
                                                }}
                                                />
                                            ))}
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="messTimings"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>Mess Timings</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g., 8-10am, 1-3pm, 8-10pm" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="messDistanceFromRoom"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>Distance from Room (in meters)</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="0 for 'with room'" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}

                        </div>

                        <Separator />
                        
                        <div className="space-y-2">
                             <FormLabel>Property Photos</FormLabel>
                             <div className="border-2 border-dashed rounded-lg p-12 text-center hover:border-primary cursor-pointer">
                                <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                                <p className="mt-2 text-sm text-muted-foreground">Click or drag files here to upload</p>
                                <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                             </div>
                        </div>


                        <Button type="submit" size="lg" className="w-full">
                            List Property
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    </div>
  );
}
