import { Star, StarHalf } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingDisplayProps {
  rating: number;
  reviewCount?: number;
  className?: string;
  starClassName?: string;
}

export function RatingDisplay({ rating, reviewCount, className, starClassName }: RatingDisplayProps) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className={cn('w-4 h-4 fill-yellow-400 text-yellow-400', starClassName)} />
        ))}
        {halfStar === 1 && <StarHalf className={cn('w-4 h-4 fill-yellow-400 text-yellow-400', starClassName)} />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className={cn('w-4 h-4 fill-muted text-muted-foreground', starClassName)} />
        ))}
      </div>
      {reviewCount !== undefined && (
        <span className="text-xs text-muted-foreground">
          ({reviewCount} review{reviewCount !== 1 ? 's' : ''})
        </span>
      )}
    </div>
  );
}
