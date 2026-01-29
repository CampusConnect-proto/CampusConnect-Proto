
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Users, BedDouble, Calendar, Wallet, ShieldCheck, Phone, Building, Search, Loader2, Eye, Info, Wrench } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import type { Student, Property } from '@/lib/types';
import { useMemo, useState } from "react";
import { mockProperties } from "@/lib/mock-data";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";


const suggestionSchema = z.object({
  message: z.string().min(10, 'Please provide a more detailed message.').max(500, 'Your message is too long (max 500 characters).'),
});


export default function StudentDashboardPage() {
    const { user, isUserLoading } = useUser();
    const firestore = useFirestore();
    const { toast } = useToast();
    const [isDemoMode, setIsDemoMode] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const suggestionForm = useForm<z.infer<typeof suggestionSchema>>({
        resolver: zodResolver(suggestionSchema),
        defaultValues: {
            message: '',
        },
    });

    const studentDocRef = useMemoFirebase(() => {
        if (!user || !firestore) return null;
        return doc(firestore, 'students', user.uid);
    }, [user, firestore]);
    const { data: student, isLoading: isStudentLoading } = useDoc<Student>(studentDocRef);

    const propertyDocRef = useMemoFirebase(() => {
        if (!student?.bookedPropertyId || !firestore || isDemoMode) return null;
        return doc(firestore, 'properties', student.bookedPropertyId);
    }, [student, firestore, isDemoMode]);

    const { data: bookedPropertyFromDB, isLoading: isPropertyLoading } = useDoc<Property>(propertyDocRef);

    const bookedProperty = useMemo(() => {
        if (isDemoMode) {
            // Use a specific mock property for the demo that has an image and details.
            return mockProperties.find(p => p.id === 'prop1');
        }
        return bookedPropertyFromDB;
    }, [isDemoMode, bookedPropertyFromDB]);

    const isLoading = isUserLoading || isStudentLoading || (student?.bookedPropertyId && !isDemoMode && isPropertyLoading);
    const hasBooking = !!(student?.bookedPropertyId && bookedPropertyFromDB);

     async function onSuggestionSubmit(values: z.infer<typeof suggestionSchema>) {
        if (!user || !bookedProperty || !firestore || !student) {
            toast({ variant: 'destructive', title: 'Error', description: 'You must be logged in and have a booked property to submit feedback.' });
            return;
        }
        setIsSubmitting(true);
        try {
            const suggestionsCollection = collection(firestore, 'propertyOwners', bookedProperty.propertyOwnerId, 'suggestions');
            await addDoc(suggestionsCollection, {
                studentId: user.uid,
                studentName: student.name,
                propertyId: bookedProperty.id,
                propertyName: bookedProperty.name,
                message: values.message,
                createdAt: serverTimestamp(),
                status: 'open'
            });
            toast({ title: 'Feedback Submitted', description: 'Thank you! The property owner has been notified.' });
            suggestionForm.reset();
        } catch (error) {
            console.error("Error submitting suggestion:", error);
            toast({ variant: 'destructive', title: 'Submission Failed', description: 'Could not submit your feedback. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    }


    if (isLoading) {
        return (
            <div className="flex h-[calc(100vh-8rem)] w-full items-center justify-center">
                 <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <p className="text-muted-foreground">Loading your dashboard...</p>
                </div>
            </div>
        )
    }

    if (!hasBooking && !isDemoMode) {
        return (
             <div className="bg-muted/40 min-h-[calc(100vh-4rem)]">
                <div className="container mx-auto py-8 px-4 md:px-6">
                     <div className="mb-8">
                        <h1 className="text-3xl font-bold font-headline">Student Dashboard</h1>
                        <p className="text-muted-foreground">Welcome back, {student?.name || user?.displayName || 'Student'}!</p>
                    </div>
                    <Card className="text-center py-16">
                        <CardHeader>
                            <CardTitle>No Property Booked Yet</CardTitle>
                            <CardDescription>It looks like you haven't booked a property. Let's find your perfect student home or view a demo.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-center items-center flex-wrap gap-4">
                             <Button asChild size="lg">
                                <Link href="/properties">
                                    <Search className="w-4 h-4 mr-2"/>
                                    Explore Properties
                                </Link>
                            </Button>
                            <Button size="lg" variant="secondary" onClick={() => setIsDemoMode(true)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Demo
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }
    
    if (!bookedProperty) {
        // Fallback for when no property is found even in demo mode (e.g., if mock data changes)
        return (
             <div className="bg-muted/40 min-h-screen">
                <div className="container mx-auto py-8 px-4 md:px-6">
                    <p>Could not load property details. Please try again later.</p>
                </div>
            </div>
        );
    }

    const studentImage = PlaceHolderImages.find(p => p.id === bookedProperty.imageIds[0]);

    return (
        <div className="bg-muted/40 min-h-screen">
            <div className="container mx-auto py-8 px-4 md:px-6 space-y-12">
                 <section>
                    {isDemoMode && (
                        <Alert className="mb-8 border-primary/50 bg-primary/10">
                            <Info className="h-4 w-4 text-primary" />
                            <AlertTitle className="font-semibold text-primary">Demo Mode</AlertTitle>
                            <AlertDescription className="flex justify-between items-center text-primary/80">
                                You are currently viewing a demo of the student dashboard.
                                <Button variant="ghost" size="sm" onClick={() => setIsDemoMode(false)}>Exit Demo</Button>
                            </AlertDescription>
                        </Alert>
                    )}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold font-headline">Student Dashboard</h1>
                        <p className="text-muted-foreground">Welcome back, {student?.name || user?.displayName || 'Student'}! Here's an overview of your stay.</p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-3">
                        <div className="lg:col-span-2 space-y-8">
                            <Card className="overflow-hidden">
                                <CardHeader className="p-0">
                                    <Link href={`/properties/${bookedProperty.id}`} className="block w-full aspect-video relative group">
                                        {studentImage &&
                                            <Image
                                                src={studentImage.imageUrl}
                                                alt={bookedProperty.name}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                data-ai-hint={studentImage.imageHint}
                                            />
                                        }
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                        <div className="absolute bottom-0 left-0 p-6">
                                            <h2 className="text-2xl font-bold text-white font-headline">{bookedProperty.name}</h2>
                                            <p className="text-white/80">{bookedProperty.address}</p>
                                        </div>
                                    </Link>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="font-semibold mb-2">Room Details</h3>
                                            <div className="space-y-2 text-muted-foreground">
                                                <p className="flex items-center gap-2"><Home className="w-4 h-4" /> Type: <span className="font-medium text-foreground capitalize">{bookedProperty.type}</span></p>
                                                <p className="flex items-center gap-2"><Users className="w-4 h-4" /> Capacity: <span className="font-medium text-foreground">{bookedProperty.totalCapacity} Students</span></p>
                                                <p className="flex items-center gap-2"><BedDouble className="w-4 h-4" /> Your Bed: <span className="font-medium text-foreground">B-07</span></p>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-2">Amenities</h3>
                                            <div className="space-y-2 text-muted-foreground">
                                                {bookedProperty.facilities.slice(0, 3).map(f => (
                                                    <p key={f} className="flex items-center gap-2 capitalize"><ShieldCheck className="w-4 h-4 text-primary" /> {f}</p>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="space-y-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Rent Status</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-baseline justify-center text-center p-4 rounded-lg bg-muted">
                                        <span className="text-4xl font-bold text-primary">₹{bookedProperty.rent.toLocaleString('en-IN')}</span>
                                        <span className="text-muted-foreground">/month</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground flex items-center gap-2"><Calendar className="w-4 h-4" /> Next Due Date</span>
                                        <span className="font-semibold">5th of next month</span>
                                    </div>
                                    <Button className="w-full" disabled>
                                        <Wallet className="w-4 h-4 mr-2" />
                                        Pay Now (Feature coming soon)
                                    </Button>
                                </CardContent>
                            </Card>

                             <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Wrench className="w-5 h-5"/>
                                        Suggestions & Issues
                                    </CardTitle>
                                    <CardDescription>Report a problem or suggest an improvement for your room.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Form {...suggestionForm}>
                                        <form onSubmit={suggestionForm.handleSubmit(onSuggestionSubmit)} className="space-y-4">
                                            <FormField
                                                control={suggestionForm.control}
                                                name="message"
                                                render={({ field }) => (
                                                    <FormItem>
                                                    <FormControl>
                                                        <Textarea placeholder="e.g., The Wi-Fi is slow in my room..." rows={4} {...field} disabled={isSubmitting}/>
                                                    </FormControl>
                                                    <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                                 {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                Submit Feedback
                                            </Button>
                                        </form>
                                    </Form>
                                </CardContent>
                            </Card>

                             <Card>
                                <CardHeader>
                                    <CardTitle>Quick Actions</CardTitle>
                                </CardHeader>
                                <CardContent className="grid grid-cols-2 gap-4">
                                    <Button variant="outline" className="h-20 flex-col gap-1">
                                        <Phone className="w-6 h-6"/>
                                        <span>Contact Owner</span>
                                    </Button>
                                    <Button variant="outline" className="h-20 flex-col gap-1" asChild>
                                        <Link href="/properties" className="flex flex-col items-center justify-center h-full">
                                            <Building className="w-6 h-6"/>
                                            <span>All Properties</span>
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

    