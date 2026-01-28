import type { Review } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RatingDisplay } from './rating-display';
import { formatDistanceToNow } from 'date-fns';

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card className="bg-white dark:bg-card">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${review.studentName}`} />
          <AvatarFallback>{review.studentName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle className="text-base">{review.studentName}</CardTitle>
          <div className="flex items-center gap-4">
            <RatingDisplay rating={review.rating} />
            <time dateTime={review.createdAt} className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
            </time>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-foreground/80">{review.comment}</p>
      </CardContent>
    </Card>
  );
}
