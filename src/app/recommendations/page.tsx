import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RecommendationsForm } from './recommendations-form';
import { Sparkles } from 'lucide-react';

export default function RecommendationsPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <Card className="border-primary/20 border-2 shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-3xl font-headline">AI Property Recommendations</CardTitle>
            <CardDescription className="text-lg">
              Tell us what you're looking for, and our AI will find the perfect match for you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecommendationsForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
