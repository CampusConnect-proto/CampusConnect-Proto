'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Building2, ArrowRight, ShieldCheck, Search, Wallet, Star } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'property-2-1');

  const features = [
    {
      icon: <ShieldCheck className="h-8 w-8 text-primary" />,
      title: 'Verified Properties',
      description: 'Every property is vetted by our team to ensure quality and safety.',
    },
    {
      icon: <Search className="h-8 w-8 text-primary" />,
      title: 'Advanced Search',
      description: 'Filter by distance, rent, amenities, and more to find your perfect match.',
    },
    {
      icon: <Wallet className="h-8 w-8 text-primary" />,
      title: 'Budget-Friendly',
      description: 'Transparent pricing with no hidden costs to fit your student budget.',
    },
    {
      icon: <Star className="h-8 w-8 text-primary" />,
      title: 'Real Reviews',
      description: 'Read honest reviews from fellow students to make informed decisions.',
    },
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <main className="flex-1">
        <section className="relative w-full h-[80vh] min-h-[500px] flex items-center justify-center text-center text-white overflow-hidden">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt="A clean, modern single room in an Indian student residency."
              fill
              className="object-cover"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 p-4 animate-fade-in-up">
            <div className="flex justify-center md:justify-center items-center gap-3 mb-4">
              <Building2 className="h-10 w-10" />
              <span className="text-3xl font-bold font-headline">Campus Connect</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight font-headline">
              Find Your Perfect Student Home
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
              Your one-stop solution for student accommodations. Search, compare, and book your ideal stay near campus.
            </p>
            <div className="mt-8">
              <Button size="lg" asChild className="font-bold text-lg transition-transform transform hover:scale-105">
                <Link href="/onboarding">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center animate-fade-in-up">
              <h2 className="text-3xl font-bold tracking-tight font-headline sm:text-4xl">
                Why Choose Campus Connect?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                We make finding student housing simple, safe, and stress-free.
              </p>
            </div>
            <div className="relative mt-12 w-full overflow-hidden">
                <div className="flex animate-marquee hover:pause">
                    {[...features, ...features].map((feature, index) => (
                         <div key={index} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 p-4">
                             <div className="flex flex-col items-center text-center h-full">
                                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold">{feature.title}</h3>
                                <p className="mt-2 text-muted-foreground flex-grow">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
