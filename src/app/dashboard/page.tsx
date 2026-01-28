'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Users, Building, ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function DashboardSelectionPage() {
  const studentImage = PlaceHolderImages.find(p => p.id === 'onboarding-student');
  const ownerImage = PlaceHolderImages.find(p => p.id === 'onboarding-owner');

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-background text-foreground p-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-foreground">View Your Dashboard</h1>
        <p className="mt-2 text-lg text-muted-foreground">Select your role to view your personalized dashboard.</p>
      </div>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl">
        <Link href="/dashboard/student" className="group flex-1">
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
              <CardTitle className="font-headline text-2xl">Student Dashboard</CardTitle>
              <CardDescription className="flex items-center text-base group-hover:text-primary">
                View your room & rent status <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/dashboard/owner" className="group flex-1">
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
              <CardTitle className="font-headline text-2xl">Owner Dashboard</CardTitle>
              <CardDescription className="flex items-center text-base group-hover:text-primary">
                Manage your properties & earnings <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
}
{/* Explore Sections */}
<section className="py-12 px-6 bg-gray-50">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
    
    {/* Stays Card */}
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100">
      <div className="p-8">
        <div className="text-blue-600 font-bold text-sm uppercase mb-2">Verified Hostels</div>
        <h3 className="text-2xl font-bold mb-4">Explore Stays</h3>
        <p className="text-gray-600 mb-6">Find the perfect room near campus with student-verified reviews and transparent pricing.</p>
        <button className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium">Browse Rooms</button>
      </div>
    </div>

    {/* Mess Card */}
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100">
      <div className="p-8">
        <div className="text-orange-600 font-bold text-sm uppercase mb-2">Daily Meals</div>
        <h3 className="text-2xl font-bold mb-4">Explore Mess</h3>
        <p className="text-gray-600 mb-6">Discover top-rated tiffin services and mess halls. View menus and subscription plans today.</p>
        <button className="bg-orange-600 text-white px-5 py-2.5 rounded-lg font-medium">View Menus</button>
      </div>
    </div>

  </div>
</section>