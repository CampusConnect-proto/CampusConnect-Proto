import Image from 'next/image';
import Link from 'next/link';
import type { Property } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, BedDouble, ShieldCheck, Building } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { RatingDisplay } from '../reviews/rating-display';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

interface PropertyCardProps {
  property: Property;
  layout?: 'grid' | 'list';
}

export function PropertyCard({ property, layout = 'grid' }: PropertyCardProps) {
  const image = PlaceHolderImages.find(p => p.id === property.imageIds[0]);

  if (layout === 'list') {
    return (
     <Card className="w-full overflow-hidden transition-all hover:shadow-lg bg-background flex flex-col sm:flex-row">
        <Link href={`/properties/${property.id}`} className="sm:w-1/3 block">
            <div className="relative aspect-[16/10] w-full h-full">
                {image ? (
                <Image
                    src={image.imageUrl}
                    alt={property.name}
                    fill
                    className="object-cover"
                    sizes="33vw"
                    data-ai-hint={image.imageHint}
                />
                ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                        <span className="text-muted-foreground">No image</span>
                    </div>
                )}
                <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="bg-white/80 backdrop-blur-sm">
                        <ShieldCheck className="w-3 h-3 mr-1 text-primary"/>
                        Company-Serviced
                    </Badge>
                </div>
             </div>
        </Link>
        <div className="p-4 flex flex-col flex-1">
            <div>
                <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-bold mb-1 leading-tight">{property.name}</CardTitle>
                    <RatingDisplay rating={property.averageRating || 0} reviewCount={property.reviewCount || 0} />
                </div>
                <CardDescription className="flex items-center gap-1 text-sm mb-2">
                    <MapPin className="w-4 h-4" />
                    {property.address}
                </CardDescription>
                 <CardDescription className="flex items-center gap-1 text-sm mb-3">
                    <Building className="w-4 h-4" />
                    {property.collegeName}
                </CardDescription>

                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mt-2 border-t pt-3">
                    <div className="flex items-center gap-1.5">
                        <BedDouble className="w-4 h-4" />
                        <span>{property.distanceFromCollege} km away</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4" />
                        <span className="text-red-500 font-semibold">{property.currentAvailability} beds left</span>
                    </div>
                     <div className="flex items-center gap-1.5">
                        <span className="capitalize">{property.type} Room</span>
                    </div>
                </div>
            </div>
            <div className="mt-auto pt-4 flex items-end justify-between">
                <div>
                     <p className="text-xl font-bold text-foreground">
                        ₹{property.rent.toLocaleString('en-IN')}
                        <span className="text-sm font-normal text-muted-foreground">/month</span>
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" asChild>
                        <Link href={`/properties/${property.id}`}>View Details</Link>
                    </Button>
                    <Button asChild>
                        <Link href={`/properties/${property.id}`}>Book Now</Link>
                    </Button>
                </div>
            </div>
        </div>
     </Card>
    )
  }

  return (
    <Card className="w-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 bg-background">
      <Link href={`/properties/${property.id}`} className="block">
        <CardHeader className="p-0">
          <div className="relative aspect-[16/10] w-full">
            {image ? (
              <Image
                src={image.imageUrl}
                alt={property.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                data-ai-hint={image.imageHint}
              />
            ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground">No image</span>
                </div>
            )}
             <div className="absolute top-2 left-2">
                <Badge variant="secondary" className="bg-white/80 backdrop-blur-sm">
                    <ShieldCheck className="w-3 h-3 mr-1 text-primary"/>
                    Company-Serviced
                </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 flex flex-col flex-grow">
          <div className='flex-grow'>
             <CardDescription className="flex items-center gap-1 text-xs mb-1">
                <Building className="w-3 h-3" />
                {property.collegeName}
            </CardDescription>
            <div className="flex justify-between items-center">
                <RatingDisplay rating={property.averageRating || 0} reviewCount={property.reviewCount || 0} />
                 <p className="text-xs text-muted-foreground">{property.distanceFromCollege} km away</p>
            </div>
            <CardTitle className="text-lg font-bold mt-2 mb-1 truncate">{property.name}</CardTitle>
            <CardDescription className="flex items-center gap-1 text-sm">
                <MapPin className="w-4 h-4" />
                {property.address}
            </CardDescription>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center p-4 pt-0">
            <div>
                <p className="text-xl font-bold text-foreground">
                    ₹{property.rent.toLocaleString('en-IN')}
                    <span className="text-sm font-normal text-muted-foreground">/month</span>
                </p>
            </div>
            <Badge className="bg-red-500/10 text-red-600 border-red-500/20">{property.currentAvailability} beds left</Badge>
        </CardFooter>
      </Link>
    </Card>
  );
}
