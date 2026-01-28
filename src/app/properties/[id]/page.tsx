import { mockProperties, mockReviews } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, BedDouble, Users, Wifi, Utensils, Car, Dumbbell, Waves, Phone, Thermometer, Zap, Droplets, Clock, Footprints, IndianRupee, NotebookText, Salad } from "lucide-react";
import { ImageGallery } from "@/components/properties/image-gallery";
import { ReviewList } from "@/components/reviews/review-list";
import { Button } from "@/components/ui/button";
import { RatingDisplay } from "@/components/reviews/rating-display";

const facilityIcons: { [key: string]: React.ReactNode } = {
  'Wi-Fi': <Wifi className="w-5 h-5" />,
  'AC/Heater': <Thermometer className="w-5 h-5" />,
  'Geyser': <Droplets className="w-5 h-5" />,
  'Power Backup': <Zap className="w-5 h-5" />,
  'Laundry': <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3.86v16.28A2 2 0 0 0 5 22h14a2 2 0 0 0 2-1.86V3.86a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2Z"/><path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/><path d="M12 12h.01"/></svg>,
  'Parking': <Car className="w-5 h-5" />,
  'Gym': <Dumbbell className="w-5 h-5" />,
  'Pool': <Waves className="w-5 h-5" />,
  'Kitchen': <Utensils className="w-5 h-5" />,
};

export default function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const property = mockProperties.find(p => p.id === params.id);
  const reviews = mockReviews.filter(r => r.propertyId === params.id);

  if (!property) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        <div className="md:col-span-2">
          <ImageGallery imageIds={property.imageIds} propertyName={property.name} />

          <div className="mt-8">
            <Badge variant="secondary" className="mb-2 capitalize">{property.type}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold font-headline">{property.name}</h1>
            <div className="flex items-center gap-2 mt-2 text-muted-foreground">
              <MapPin className="w-5 h-5" />
              <span>{property.address}</span>
            </div>
            <div className="mt-4">
                <RatingDisplay rating={property.averageRating || 0} reviewCount={property.reviewCount || 0} starClassName="w-6 h-6" className="gap-4"/>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="space-y-6">
            <h2 className="text-2xl font-bold font-headline">About this property</h2>
            <p className="text-foreground/80 leading-relaxed">{property.description}</p>
          </div>

          <Separator className="my-8" />

          <div className="space-y-6">
             <h2 className="text-2xl font-bold font-headline">Amenities</h2>
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {property.facilities.map(facility => (
                    <div key={facility} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        {facilityIcons[facility] || <Wifi className="w-5 h-5" />}
                        <span className="capitalize font-medium">{facility}</span>
                    </div>
                ))}
             </div>
          </div>
          
           {property.messDetails && property.messDetails.available && (
            <>
                <Separator className="my-8" />
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold font-headline">Mess / Food Facilities</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                            <Salad className="w-5 h-5 mt-1 text-primary" />
                            <div>
                                <h3 className="font-semibold">Cuisine</h3>
                                <p className="text-muted-foreground capitalize">{property.messDetails.type}</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                            <IndianRupee className="w-5 h-5 mt-1 text-primary" />
                            <div>
                                <h3 className="font-semibold">Pricing</h3>
                                 <p className="text-muted-foreground capitalize">
                                    {property.messDetails.pricingModel === 'included' && 'Included in rent'}
                                    {property.messDetails.pricingModel === 'per-meal' && `₹${property.messDetails.price}/meal`}
                                    {property.messDetails.pricingModel === 'monthly' && `₹${property.messDetails.price}/month`}
                                 </p>
                            </div>
                        </div>
                         <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                            <NotebookText className="w-5 h-5 mt-1 text-primary" />
                            <div>
                                <h3 className="font-semibold">Meal Plans</h3>
                                <p className="text-muted-foreground capitalize">{property.messDetails.mealPlans.join(', ')}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                            <Clock className="w-5 h-5 mt-1 text-primary" />
                            <div>
                                <h3 className="font-semibold">Timings</h3>
                                <p className="text-muted-foreground">{property.messDetails.timings}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                            <Footprints className="w-5 h-5 mt-1 text-primary" />
                            <div>
                                <h3 className="font-semibold">Location</h3>
                                <p className="text-muted-foreground">
                                    {property.messDetails.distanceFromRoom === 0 ? 'With Room' : `${property.messDetails.distanceFromRoom}m from room`}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
           )}

        </div>

        <div className="md:col-span-1 space-y-8">
            <Card className="sticky top-24">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-primary">
                        ₹{property.rent.toLocaleString('en-IN')}<span className="text-lg font-normal text-muted-foreground">/month</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground flex items-center gap-2"><Users className="w-4 h-4"/> Capacity</span>
                        <span>{property.totalCapacity} student{property.totalCapacity > 1 && 's'}</span>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="text-muted-foreground flex items-center gap-2"><Users className="w-4 h-4"/> Availability</span>
                        <span className="text-red-500 font-semibold">{property.currentAvailability} beds left</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground flex items-center gap-2"><BedDouble className="w-4 h-4"/> Room Type</span>
                        <span className="capitalize">{property.type}</span>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="text-muted-foreground flex items-center gap-2"><MapPin className="w-4 h-4"/> Distance</span>
                        <span>{property.distanceFromCollege} km to campus</span>
                    </div>
                    <Separator/>
                     <div className="space-y-2">
                        <h3 className="font-semibold">Contact Owner</h3>
                         <Button variant="outline" className="w-full">
                            <Phone className="w-4 h-4 mr-2"/>
                            {property.ownerContactNumber}
                        </Button>
                     </div>
                    <Button size="lg" className="w-full">Book a Tour</Button>
                </CardContent>
            </Card>
        </div>
      </div>
      
      <Separator className="my-12" />

      <div>
        <ReviewList reviews={reviews} propertyId={property.id} />
      </div>
    </div>
  );
}
