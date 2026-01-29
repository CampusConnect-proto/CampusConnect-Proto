import { mockMessListings, mockReviews } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, IndianRupee, Phone, Salad, Utensils, Award, ChefHat } from "lucide-react";
import { ImageGallery } from "@/components/properties/image-gallery";
import { ReviewList } from "@/components/reviews/review-list";
import { Button } from "@/components/ui/button";
import { RatingDisplay } from "@/components/reviews/rating-display";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;

export default function MessDetailsPage({ params }: { params: { id: string } }) {
  const mess = mockMessListings.find(m => m.id === params.id);
  const reviews = mockReviews.filter(r => r.messId === params.id);

  if (!mess) {
    notFound();
  }

  const foodTypeClasses = {
    veg: 'bg-green-100 text-green-800 border-green-200',
    'non-veg': 'bg-red-100 text-red-800 border-red-200',
    both: 'bg-orange-100 text-orange-800 border-orange-200',
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        <div className="md:col-span-2">
          <ImageGallery imageIds={mess.imageIds} propertyName={mess.name} />

          <div className="mt-8">
            <Badge variant="outline" className={cn("mb-2 capitalize", foodTypeClasses[mess.foodType])}>
                <Utensils className="w-3 h-3 mr-1.5"/>
                {mess.foodType.replace('-', ' ')}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold font-headline">{mess.name}</h1>
            <div className="flex items-center gap-2 mt-2 text-muted-foreground">
              <MapPin className="w-5 h-5" />
              <span>{mess.address}</span>
            </div>
            <div className="mt-4">
                <RatingDisplay rating={mess.averageRating || 0} reviewCount={mess.reviewCount || 0} starClassName="w-6 h-6" className="gap-4"/>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="space-y-6">
            <h2 className="text-2xl font-bold font-headline">About this Mess</h2>
            <p className="text-foreground/80 leading-relaxed">{mess.description}</p>
          </div>

          <Separator className="my-8" />
          
          <div>
            <h2 className="text-2xl font-bold font-headline mb-6">Weekly Menu</h2>
            <Tabs defaultValue="monday" className="w-full">
              <TabsList className="grid w-full grid-cols-3 sm:grid-cols-7">
                {weekDays.map(day => (
                  <TabsTrigger key={day} value={day} className="capitalize">{day.slice(0,3)}</TabsTrigger>
                ))}
              </TabsList>
              {weekDays.map(day => (
                 <TabsContent key={day} value={day}>
                    <Card>
                        <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <h3 className="font-semibold text-center text-muted-foreground">Breakfast</h3>
                                <p className="text-center p-3 bg-muted/50 rounded-md min-h-[60px] flex items-center justify-center">{mess.dailyMenu[day].breakfast}</p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold text-center text-muted-foreground">Lunch</h3>
                                <p className="text-center p-3 bg-muted/50 rounded-md min-h-[60px] flex items-center justify-center">{mess.dailyMenu[day].lunch}</p>
                            </div>
                             <div className="space-y-2">
                                <h3 className="font-semibold text-center text-muted-foreground">Dinner</h3>
                                <p className="text-center p-3 bg-muted/50 rounded-md min-h-[60px] flex items-center justify-center">{mess.dailyMenu[day].dinner}</p>
                            </div>
                        </CardContent>
                    </Card>
                 </TabsContent>
              ))}
            </Tabs>
          </div>

        </div>

        <div className="md:col-span-1 space-y-8">
            <Card className="sticky top-24">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-primary">
                        Pricing
                    </CardTitle>
                    <CardDescription>Choose the plan that suits you best.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {mess.pricing.monthly && (
                        <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                            <span className="font-semibold">Monthly</span>
                            <span className="font-bold text-lg">₹{mess.pricing.monthly.toLocaleString('en-IN')}</span>
                        </div>
                    )}
                    {mess.pricing.quarterly && (
                        <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                            <span className="font-semibold">Quarterly</span>
                            <span className="font-bold text-lg">₹{mess.pricing.quarterly.toLocaleString('en-IN')}</span>
                        </div>
                    )}
                     {mess.pricing.perMeal && (
                        <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                            <span className="font-semibold">Per Meal</span>
                            <span className="font-bold text-lg">₹{mess.pricing.perMeal.toLocaleString('en-IN')}</span>
                        </div>
                    )}
                    <Separator/>
                     <div className="space-y-2">
                        <h3 className="font-semibold">Contact Owner</h3>
                         <Button variant="outline" className="w-full" disabled>
                            <Phone className="w-4 h-4 mr-2"/>
                            Feature coming soon
                        </Button>
                     </div>
                    <Button size="lg" className="w-full">
                         <ChefHat className="w-5 h-5 mr-2"/>
                        Subscribe Now
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
      
      <Separator className="my-12" />

      <div>
        <ReviewList reviews={reviews} targetId={mess.id} targetType="mess" />
      </div>
    </div>
  );
}

    