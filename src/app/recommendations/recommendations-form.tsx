'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  getPropertyRecommendations,
  type PropertyRecommendationOutput,
} from '@/ai/flows/personalized-property-recommendations';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, AlertCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const recommendationsSchema = z.object({
  location: z.string().min(1, 'Location is required'),
  maxRent: z.coerce.number().min(100, 'Rent must be at least $100'),
  desiredAmenities: z.array(z.string()),
});

const allAmenities = ['parking', 'gym', 'laundry', 'wifi', 'pool', 'kitchen'];

export function RecommendationsForm() {
  const [recommendations, setRecommendations] = useState<PropertyRecommendationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof recommendationsSchema>>({
    resolver: zodResolver(recommendationsSchema),
    defaultValues: {
      location: '',
      maxRent: 1000,
      desiredAmenities: ['wifi', 'laundry'],
    },
  });

  async function onSubmit(values: z.infer<typeof recommendationsSchema>) {
    setIsLoading(true);
    setError(null);
    setRecommendations(null);
    try {
      const result = await getPropertyRecommendations(values);
      setRecommendations(result);
    } catch (e) {
      console.error(e);
      setError('Failed to get recommendations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Location</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Near Main Campus" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxRent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maximum Monthly Rent ($)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="desiredAmenities"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel>Desired Amenities</FormLabel>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {allAmenities.map((item) => (
                  <FormField
                    key={item}
                    control={form.control}
                    name="desiredAmenities"
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
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Get Recommendations'}
          </Button>
        </form>
      </Form>

      {error && (
        <Alert variant="destructive" className="mt-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {recommendations && (
        <div className="mt-12">
            <Separator />
            <h2 className="text-2xl font-bold text-center my-8 font-headline">Your Personalized Recommendations</h2>
            <div className="space-y-4">
            {recommendations.recommendations.map(prop => (
                <Card key={prop.propertyId} className="transition-all hover:shadow-md">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                             <div>
                                <CardTitle>{prop.propertyName}</CardTitle>
                                <CardDescription>{prop.address}</CardDescription>
                             </div>
                             <div className="text-right">
                                 <p className="text-lg font-bold text-primary">${prop.rent}<span className="text-sm font-normal text-muted-foreground">/month</span></p>
                                 <p className="text-sm text-muted-foreground">Match Score: {(prop.matchScore * 100).toFixed(0)}%</p>
                             </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="font-semibold text-sm mb-2">Amenities:</p>
                        <p className="text-sm text-muted-foreground capitalize">{prop.amenities.join(', ')}</p>
                        <Separator className="my-4" />
                        <p className="font-semibold text-sm mb-2">Contact:</p>
                        <p className="text-sm text-muted-foreground">{prop.contactInformation}</p>
                    </CardContent>
                </Card>
            ))}
            </div>
        </div>
      )}
    </div>
  );
}
