
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
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UploadCloud, Utensils, IndianRupee, MapPin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const messSchema = z.object({
  name: z.string().min(1, 'Mess name is required'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  address: z.string().min(1, 'Address is required'),
  distanceFromCollege: z.coerce.number().min(0, 'Distance must be a positive number'),
  foodType: z.string({ required_error: 'Please select a food type.' }),
  pricing: z.object({
      monthly: z.coerce.number().optional(),
      quarterly: z.coerce.number().optional(),
      perMeal: z.coerce.number().optional(),
  }),
  contactNumber: z.string().regex(/^\d{10}$/, 'Please enter a valid 10-digit phone number'),
  dailyMenu: z.object({
      monday: z.object({ breakfast: z.string(), lunch: z.string(), dinner: z.string() }),
      tuesday: z.object({ breakfast: z.string(), lunch: z.string(), dinner: z.string() }),
      wednesday: z.object({ breakfast: z.string(), lunch: z.string(), dinner: z.string() }),
      thursday: z.object({ breakfast: z.string(), lunch: z.string(), dinner: z.string() }),
      friday: z.object({ breakfast: z.string(), lunch: z.string(), dinner: z.string() }),
      saturday: z.object({ breakfast: z.string(), lunch: z.string(), dinner: z.string() }),
      sunday: z.object({ breakfast: z.string(), lunch: z.string(), dinner: z.string() }),
  })
});

const weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;
const meals = ['breakfast', 'lunch', 'dinner'] as const;

export default function AddMessPage() {
  const form = useForm<z.infer<typeof messSchema>>({
    resolver: zodResolver(messSchema),
    defaultValues: {
        name: '',
        description: '',
        address: '',
        distanceFromCollege: 0,
        foodType: 'veg',
        pricing: { monthly: 3000 },
        contactNumber: '',
        dailyMenu: {
            monday: { breakfast: '', lunch: '', dinner: '' },
            tuesday: { breakfast: '', lunch: '', dinner: '' },
            wednesday: { breakfast: '', lunch: '', dinner: '' },
            thursday: { breakfast: '', lunch: '', dinner: '' },
            friday: { breakfast: '', lunch: '', dinner: '' },
            saturday: { breakfast: '', lunch: '', dinner: '' },
            sunday: { breakfast: '', lunch: '', dinner: '' },
        }
    },
  });

  function onSubmit(values: z.infer<typeof messSchema>) {
    console.log('Submitting new mess:', values);
    // In a real app, you'd handle Firebase submission here
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
        <Card className="max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle className="text-3xl font-headline">List Your Mess / Tiffin Service</CardTitle>
                <CardDescription>Fill out the form below to add your service to Campus Connect.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Mess Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., Ghar Ka Khana" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Tell students about your service..." {...field} rows={4} />
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
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="Full address of your mess" {...field} className="pl-8"/>
                                  </div>
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
                                name="foodType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Food Type</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a food type" />
                                            </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="veg">Veg</SelectItem>
                                                <SelectItem value="non-veg">Non-Veg</SelectItem>
                                                <SelectItem value="both">Both</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Separator/>
                        <h3 className="text-lg font-medium font-headline">Pricing</h3>
                        <div className="grid md:grid-cols-3 gap-8">
                             <FormField
                                control={form.control}
                                name="pricing.monthly"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Monthly (₹)</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="e.g., 3500" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="pricing.quarterly"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Quarterly (₹)</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="e.g., 10000" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="pricing.perMeal"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Per Meal (₹)</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="e.g., 120" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

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
                            <h3 className="text-lg font-medium font-headline">Weekly Menu</h3>
                            <div className="space-y-4">
                                {weekDays.map(day => (
                                    <div key={day}>
                                        <h4 className="font-semibold capitalize mb-2">{day}</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {meals.map(meal => (
                                                <FormField
                                                    key={`${day}-${meal}`}
                                                    control={form.control}
                                                    name={`dailyMenu.${day}.${meal}`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-sm capitalize text-muted-foreground">{meal}</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder={`Enter ${meal} menu...`} {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Separator />
                        
                        <div className="space-y-2">
                             <FormLabel>Service Photos</FormLabel>
                             <div className="border-2 border-dashed rounded-lg p-12 text-center hover:border-primary cursor-pointer">
                                <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                                <p className="mt-2 text-sm text-muted-foreground">Click or drag files here to upload</p>
                                <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                             </div>
                        </div>


                        <Button type="submit" size="lg" className="w-full">
                            List My Mess
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    </div>
  );
}
