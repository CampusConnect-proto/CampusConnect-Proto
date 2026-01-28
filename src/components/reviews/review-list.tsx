'use client';

import { useState } from 'react';
import type { Review } from '@/lib/types';
import { ReviewCard } from './review-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';

const reviewSchema = z.object({
  rating: z.number().min(1, "Rating is required").max(5),
  comment: z.string().min(10, "Comment must be at least 10 characters long."),
});


interface ReviewListProps {
  reviews: Review[];
  propertyId: string;
}

export function ReviewList({ reviews, propertyId }: ReviewListProps) {
  const [showAll, setShowAll] = useState(false);
  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);
  const [hoveredRating, setHoveredRating] = useState(0);

  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      comment: '',
    },
  });
  
  const currentRating = form.watch("rating");

  function onSubmit(values: z.infer<typeof reviewSchema>) {
    console.log("New review submitted:", { ...values, propertyId });
    // In a real app, you would save this review to your database.
    form.reset();
  }

  return (
    <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
      <div className="md:col-span-2 space-y-6">
        <h2 className="text-2xl font-bold font-headline">{reviews.length} Reviews</h2>
        {displayedReviews.length > 0 ? (
          <div className="space-y-6">
            {displayedReviews.map(review => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">This property has no reviews yet. Be the first to leave one!</p>
        )}
        {reviews.length > 3 && !showAll && (
          <Button variant="outline" onClick={() => setShowAll(true)}>
            Show all {reviews.length} reviews
          </Button>
        )}
      </div>
      <div className="md:col-span-1">
        <Card className="sticky top-24">
            <CardHeader>
                <CardTitle>Leave a Review</CardTitle>
                <CardDescription>Share your experience with other students.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                         <FormField
                            control={form.control}
                            name="rating"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Your Rating</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center gap-1" onMouseLeave={() => setHoveredRating(0)}>
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <Star
                                                    key={star}
                                                    className={`w-8 h-8 cursor-pointer transition-colors ${
                                                        (hoveredRating >= star || currentRating >= star)
                                                        ? 'text-yellow-400 fill-yellow-400'
                                                        : 'text-muted-foreground'
                                                    }`}
                                                    onMouseEnter={() => setHoveredRating(star)}
                                                    onClick={() => field.onChange(star)}
                                                />
                                            ))}
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="comment"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Your Comment</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Tell us about your stay..." {...field} rows={4}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">Submit Review</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
