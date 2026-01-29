
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Building2, ArrowRight, ShieldCheck, Search, Wallet, Star, Utensils } from 'lucide-react';
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
              Your Campus Life, Connected.
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
              The easiest way to find student accommodations and mess services. Search, compare, and book your ideal stay and meals.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild className="font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary/20 w-full sm:w-auto">
                <Link href="/properties">
                  Explore Stays <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="font-bold text-lg text-white border-white bg-transparent backdrop-blur-sm hover:bg-white hover:text-primary transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
                <Link href="/mess">
                  Explore Mess
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
                We make finding student housing and meals simple, safe, and stress-free.
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

        <section className="py-12 px-6 bg-muted/40">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                
                <div className="bg-background rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100 group">
                    <div className="p-8">
                        <div className="text-primary font-bold text-sm uppercase mb-2">Verified Hostels</div>
                        <h3 className="text-2xl font-bold mb-4 font-headline">Explore Stays</h3>
                        <p className="text-gray-600 mb-6">Find the perfect room near campus with student-verified reviews and transparent pricing.</p>
                        <Button asChild>
                            <Link href="/properties" className="flex items-center">
                                Browse Rooms <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="bg-background rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100 group">
                    <div className="p-8">
                        <div className="text-primary font-bold text-sm uppercase mb-2">Daily Meals</div>
                        <h3 className="text-2xl font-bold mb-4 font-headline">Explore Mess</h3>
                        <p className="text-gray-600 mb-6">Discover top-rated tiffin services and mess halls. View menus and subscription plans today.</p>
                        <Button asChild>
                            <Link href="/mess" className="flex items-center">
                                View Menus <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </Button>
                    </div>
                </div>

            </div>
        </section>
      </main>
    </div>
  );
}
