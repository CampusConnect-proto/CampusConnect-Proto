'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Users, BedDouble, Calendar, Wallet, ShieldCheck, Phone, MessageSquare, Wrench, Building } from "lucide-react";
import Link from 'next/link';
import { mockProperties } from '@/lib/mock-data';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";


export default function StudentDashboardPage() {
    const bookedProperty = mockProperties[0];
    const studentImage = PlaceHolderImages.find(p => p.id === bookedProperty.imageIds[0]);
    const nextDueDate = new Date();
    nextDueDate.setMonth(nextDueDate.getMonth() + 1);
    nextDueDate.setDate(5);

    return (
        <div className="bg-muted/40 min-h-screen">
            <div className="container mx-auto py-8 px-4 md:px-6 space-y-12">
                 <section>
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold font-headline">Student Dashboard</h1>
                        <p className="text-muted-foreground">Welcome back, Rohan! Here's an overview of your stay.</p>
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
                             <Card>
                                <CardHeader>
                                    <CardTitle>Maintenance Requests</CardTitle>
                                    <CardDescription>Report and track issues in your room or common areas.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form className="space-y-4">
                                        <div className="grid sm:grid-cols-2 gap-4">
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Issue Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="plumbing">Plumbing</SelectItem>
                                                <SelectItem value="electrical">Electrical</SelectItem>
                                                <SelectItem value="appliance">Appliance</SelectItem>
                                                <SelectItem value="other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                         <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Urgency" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="low">Low</SelectItem>
                                                <SelectItem value="medium">Medium</SelectItem>
                                                <SelectItem value="high">High</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        </div>
                                        <Textarea placeholder="Describe the issue in detail..." />
                                        <Button className="w-full sm:w-auto">
                                            <Wrench className="w-4 h-4 mr-2" />
                                            Submit Request
                                        </Button>
                                    </form>
                                     <Separator className="my-6"/>
                                     <h4 className="font-semibold mb-4">Active Requests</h4>
                                     <Alert>
                                        <ShieldCheck className="h-4 w-4" />
                                        <AlertTitle>No active requests</AlertTitle>
                                        <AlertDescription>
                                            You have no pending maintenance requests.
                                        </AlertDescription>
                                     </Alert>
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
                                        <span className="font-semibold">{nextDueDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                                    </div>
                                    <Button className="w-full">
                                        <Wallet className="w-4 h-4 mr-2" />
                                        Pay Now
                                    </Button>
                                </CardContent>
                            </Card>
                             <Card>
                                <CardHeader>
                                    <CardTitle>Quick Actions</CardTitle>
                                </CardHeader>
                                <CardContent className="grid grid-cols-2 gap-4">
                                    <Button variant="outline" className="h-20 flex-col gap-1">
                                        <Wrench className="w-6 h-6"/>
                                        <span>Report Issue</span>
                                    </Button>
                                    <Button variant="outline" className="h-20 flex-col gap-1">
                                        <Phone className="w-6 h-6"/>
                                        <span>Contact Owner</span>
                                    </Button>
                                    <Button variant="outline" className="h-20 flex-col gap-1">
                                        <MessageSquare className="w-6 h-6"/>
                                        <span>Community</span>
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
