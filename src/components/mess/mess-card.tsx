
import Image from 'next/image';
import Link from 'next/link';
import type { MessListing } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Utensils, IndianRupee } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { RatingDisplay } from '../reviews/rating-display';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

interface MessCardProps {
  mess: MessListing;
  layout?: 'grid' | 'list';
}

export function MessCard({ mess, layout = 'grid' }: MessCardProps) {
  const image = PlaceHolderImages.find(p => p.id === mess.imageIds[0]);

  const foodTypeClasses = {
    veg: 'bg-gray-100 text-gray-800 border-gray-200',
    'non-veg': 'bg-red-100 text-red-800 border-red-200',
    both: 'bg-orange-100 text-orange-800 border-orange-200',
  };

  const monthlyPrice = mess.pricing.monthly;

  if (layout === 'list') {
    return (
     <Card className="w-full overflow-hidden transition-all hover:shadow-lg bg-background flex flex-col sm:flex-row">
        <Link href={`/mess/${mess.id}`} className="sm:w-1/3 block">
            <div className="relative aspect-[16/10] w-full h-full">
                {image ? (
                <Image
                    src={image.imageUrl}
                    alt={mess.name}
                    fill
                    className="object-cover"
                    sizes="33vw"
                    data-ai-hint={image.imageHint}
                />
                ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                        <Utensils className="w-10 h-10 text-muted-foreground" />
                    </div>
                )}
                <div className="absolute top-2 left-2">
                    <Badge variant="outline" className={cn("capitalize", foodTypeClasses[mess.foodType])}>
                        {mess.foodType.replace('-', ' ')}
                    </Badge>
                </div>
             </div>
        </Link>
        <div className="p-4 flex flex-col flex-1">
            <div>
                <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-bold mb-1 leading-tight">{mess.name}</CardTitle>
                    <RatingDisplay rating={mess.averageRating || 0} reviewCount={mess.reviewCount || 0} />
                </div>
                <CardDescription className="flex items-center gap-1 text-sm mb-2">
                    <MapPin className="w-4 h-4" />
                    {mess.address}
                </CardDescription>

                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mt-2 border-t pt-3">
                    <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        <span>{mess.distanceFromCollege} km away</span>
                    </div>
                    {mess.pricing.perMeal && mess.pricing.monthly && (
                        <div className="flex items-center gap-1.5">
                            <IndianRupee className="w-4 h-4" />
                            <span>{mess.pricing.perMeal}/plate</span>
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-auto pt-4 flex items-end justify-between">
                <div>
                     {mess.pricing.monthly ? (
                        <p className="text-xl font-bold text-foreground">
                            ₹{mess.pricing.monthly.toLocaleString('en-IN')}
                            <span className="text-sm font-normal text-muted-foreground">/month</span>
                        </p>
                    ) : mess.pricing.perMeal ? (
                        <p className="text-xl font-bold text-foreground">
                            ₹{mess.pricing.perMeal.toLocaleString('en-IN')}
                            <span className="text-sm font-normal text-muted-foreground">/plate</span>
                        </p>
                    ) : null}
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" asChild>
                        <Link href={`/mess/${mess.id}`}>View Menu</Link>
                    </Button>
                    <Button asChild>
                        <Link href={`/mess/${mess.id}`}>Subscribe</Link>
                    </Button>
                </div>
            </div>
        </div>
     </Card>
    )
  }

  return (
    <Card className="w-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 bg-background">
      <Link href={`/mess/${mess.id}`} className="block">
        <CardHeader className="p-0">
          <div className="relative aspect-[16/10] w-full">
            {image ? (
              <Image
                src={image.imageUrl}
                alt={mess.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                data-ai-hint={image.imageHint}
              />
            ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                    <Utensils className="w-12 h-12 text-muted-foreground/50" />
                </div>
            )}
            <div className="absolute top-2 left-2">
                <Badge variant="outline" className={cn("capitalize backdrop-blur-sm bg-white/80", foodTypeClasses[mess.foodType])}>
                    {mess.foodType.replace('-', ' ')}
                </Badge>
            </div>
            <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="bg-white/80 backdrop-blur-sm">
                    {mess.distanceFromCollege} km away
                </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 flex flex-col flex-grow">
          <div className='flex-grow'>
             <RatingDisplay rating={mess.averageRating || 0} reviewCount={mess.reviewCount || 0} />
            <CardTitle className="text-lg font-bold mt-2 mb-1 truncate">{mess.name}</CardTitle>
            <CardDescription className="flex items-center gap-1 text-sm">
                <MapPin className="w-4 h-4" />
                {mess.address}
            </CardDescription>
          </div>
        </CardContent>
        {(mess.pricing.monthly || mess.pricing.perMeal) && (
            <CardFooter className="flex justify-between items-center p-4 pt-0">
                <div>
                    {mess.pricing.monthly ? (
                        <p className="text-xl font-bold text-foreground">
                            ₹{mess.pricing.monthly.toLocaleString('en-IN')}
                            <span className="text-sm font-normal text-muted-foreground">/month</span>
                        </p>
                    ) : mess.pricing.perMeal ? (
                         <p className="text-xl font-bold text-foreground">
                            ₹{mess.pricing.perMeal.toLocaleString('en-IN')}
                            <span className="text-sm font-normal text-muted-foreground">/plate</span>
                        </p>
                    ) : null}
                </div>
            </CardFooter>
        )}
      </Link>
    </Card>
  );
}
