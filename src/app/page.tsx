'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Building2, ArrowRight, ShieldCheck, Search, Wallet, Star, Utensils, FileText, Phone } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');

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
      icon: <Utensils className="h-8 w-8 text-primary" />,
      title: 'Hygienic Mess',
      description: 'Discover top-rated tiffin services and mess halls with daily menus.',
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
              alt="A vibrant image of a modern university campus or student living area."
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
              <span className="text-3xl font-bold font-headline bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">Campus Connect</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight font-headline">
              Your Campus Life, Connected.
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
              The easiest way to find student accommodations and mess services. Search, compare, and book your ideal stay and meals.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild className="font-bold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 w-full sm:w-auto hover:-translate-y-0.5 rounded-full">
                <Link href="/properties">
                  Explore Stays <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="secondary" asChild className="font-bold text-lg bg-background text-primary hover:bg-background/90 transition-all duration-300 w-full sm:w-auto hover:-translate-y-0.5 rounded-full">
                <Link href="/mess">
                  Explore Mess
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="py-16 md:py-24 bg-muted/40">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center animate-fade-in-up">
              <h2 className="text-3xl font-bold tracking-tight font-headline sm:text-4xl">
                Why Choose Campus Connect?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                We make finding student housing and meals simple, safe, and stress-free.
              </p>
            </div>
             <div className="relative mt-12 flex w-full max-w-7xl mx-auto flex-col items-center justify-center overflow-hidden">
                <div className="flex w-max animate-marquee [--duration:50s] hover:[animation-play-state:paused]">
                    {[...features, ...features].map((feature, index) => (
                        <div key={index} className="mx-4 h-full w-[22rem] flex-shrink-0 rounded-xl bg-card p-8 text-card-foreground shadow-md border">
                            <div className="mb-5 inline-flex items-center justify-center rounded-full bg-primary/10 p-4 ring-8 ring-primary/5">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold font-headline">{feature.title}</h3>
                            <p className="mt-2 text-muted-foreground">{feature.description}</p>
                        </div>
                    ))}
                </div>
                <div
                    className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-muted/40 to-transparent"></div>
                <div
                    className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-muted/40 to-transparent"></div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center animate-fade-in-up">
              <h2 className="text-3xl font-bold tracking-tight font-headline sm:text-4xl">
                How It Works
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Finding your student home and meals is as easy as 1, 2, 3.
              </p>
            </div>
            <div className="relative mt-16 max-w-5xl mx-auto">
              <div className="absolute top-8 left-0 w-full h-px bg-border hidden md:block" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 relative">
                
                <div className="text-center flex flex-col items-center">
                  <div className="mb-6 flex items-center justify-center rounded-full bg-background border-2 border-primary/50 shadow-lg h-16 w-16 text-primary z-10">
                    <Search className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold">1. Search & Discover</h3>
                  <p className="mt-2 text-muted-foreground">Enter your college and browse a curated list of verified properties and mess services nearby.</p>
                </div>

                <div className="text-center flex flex-col items-center">
                   <div className="mb-6 flex items-center justify-center rounded-full bg-background border-2 border-primary/50 shadow-lg h-16 w-16 text-primary z-10">
                    <FileText className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold">2. Compare & Decide</h3>
                  <p className="mt-2 text-muted-foreground">Compare amenities, view photos, and read honest reviews from fellow students to make an informed choice.</p>
                </div>

                <div className="text-center flex flex-col items-center">
                   <div className="mb-6 flex items-center justify-center rounded-full bg-background border-2 border-primary/50 shadow-lg h-16 w-16 text-primary z-10">
                    <Phone className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold">3. Connect & Book</h3>
                  <p className="mt-2 text-muted-foreground">Contact property owners directly to schedule a visit or subscribe to a mess plan without any middlemen.</p>
                </div>

              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
