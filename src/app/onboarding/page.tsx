
import Image from 'next/image';
import Link from 'next/link';
import { Users, Building, ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function OnboardingPage() {
  const studentImage = PlaceHolderImages.find(p => p.id === 'onboarding-student');
  const ownerImage = PlaceHolderImages.find(p => p.id === 'onboarding-owner');

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-background text-foreground p-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-foreground">How would you like to connect?</h1>
        <p className="mt-2 text-lg text-muted-foreground">Choose your role to get started.</p>
      </div>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl">
        <Link href="/properties" className="group flex-1">
          <Card className="h-full transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
            <CardContent className="p-0">
               <div className="relative w-full h-64 rounded-t-lg overflow-hidden">
                {studentImage && (
                  <Image
                    src={studentImage.imageUrl}
                    alt="Students on a university campus"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint={studentImage.imageHint}
                  />
                )}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300"></div>
                 <div className="absolute top-4 left-4">
                    <Users className="h-12 w-12 text-white/80 transition-transform duration-500 group-hover:scale-110" />
                </div>
              </div>
            </CardContent>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">I'm a Student</CardTitle>
              <CardDescription className="flex items-center text-base group-hover:text-primary">
                Find your perfect place <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/owner/add-property" className="group flex-1">
           <Card className="h-full transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
             <CardContent className="p-0">
               <div className="relative w-full h-64 rounded-t-lg overflow-hidden">
                {ownerImage && (
                  <Image
                    src={ownerImage.imageUrl}
                    alt="Modern apartment building"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint={ownerImage.imageHint}
                  />
                )}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300"></div>
                 <div className="absolute top-4 left-4">
                    <Building className="h-12 w-12 text-white/80 transition-transform duration-500 group-hover:scale-110" />
                </div>
              </div>
            </CardContent>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">I'm a Property Owner</CardTitle>
              <CardDescription className="flex items-center text-base group-hover:text-primary">
                List your property <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
}
