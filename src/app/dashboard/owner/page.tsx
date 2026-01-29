
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, Home, Users, PlusCircle, Eye, TrendingUp, Bell, CircleDollarSign, Loader2, Info, MessageSquareText } from "lucide-react";
import Link from 'next/link';
import { OwnerEarningsChart } from '@/components/dashboard/owner/owner-earnings-chart';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from "@/components/ui/badge";
import { InfoCard } from "@/components/dashboard/info-card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useUser, useFirestore, useCollection, useMemoFirebase, useDoc } from '@/firebase';
import { collection, query, where, doc, orderBy } from 'firebase/firestore';
import type { Property, PropertyOwner, Suggestion } from '@/lib/types';
import { useMemo, useState } from "react";
import { mockProperties } from "@/lib/mock-data";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { formatDistanceToNow } from "date-fns";

export default function OwnerDashboardPage() {
    const { user, isUserLoading } = useUser();
    const firestore = useFirestore();
    const [isDemoMode, setIsDemoMode] = useState(false);

    const ownerDocRef = useMemoFirebase(() => {
        if (!user || !firestore) return null;
        return doc(firestore, 'propertyOwners', user.uid);
    }, [user, firestore]);
    const { data: owner, isLoading: isOwnerLoading } = useDoc<PropertyOwner>(ownerDocRef);

    const propertiesQuery = useMemoFirebase(() => {
        if (!user || !firestore) return null;
        return query(collection(firestore, 'properties'), where('propertyOwnerId', '==', user.uid));
    }, [user, firestore]);

    const { data: ownerProperties, isLoading: arePropertiesLoading } = useCollection<Property>(propertiesQuery);
    
    const displayProperties = useMemo(() => {
        if (isDemoMode) {
            return mockProperties.filter(p => ['owner1', 'owner2', 'owner3'].includes(p.propertyOwnerId));
        }
        return ownerProperties;
    }, [isDemoMode, ownerProperties]);

    const {
        totalProperties,
        totalRent,
        totalCapacity,
        totalAvailability,
        occupancy
    } = useMemo(() => {
        if (!displayProperties) {
            return { totalProperties: 0, totalRent: 0, totalCapacity: 0, totalAvailability: 0, occupancy: 0 };
        }
        const totalProperties = displayProperties.length;
        const totalRent = displayProperties.reduce((acc, prop) => acc + prop.rent, 0);
        const totalCapacity = displayProperties.reduce((acc, prop) => acc + prop.totalCapacity, 0);
        const totalAvailability = displayProperties.reduce((acc, prop) => acc + prop.currentAvailability, 0);
        const occupancy = totalCapacity > 0 ? ((totalCapacity - totalAvailability) / totalCapacity) * 100 : 0;
        
        return { totalProperties, totalRent, totalCapacity, totalAvailability, occupancy };
    }, [displayProperties]);

    const suggestionsQuery = useMemoFirebase(() => {
        if (!user || !firestore) return null;
        const suggestionsCollectionPath = collection(firestore, 'propertyOwners', user.uid, 'suggestions');
        return query(suggestionsCollectionPath, orderBy('createdAt', 'desc'));
    }, [user, firestore]);

    const { data: suggestions, isLoading: areSuggestionsLoading } = useCollection<Suggestion>(suggestionsQuery);
    

    const isLoading = isUserLoading || arePropertiesLoading || isOwnerLoading;
    const hasProperties = ownerProperties && ownerProperties.length > 0;

    if (isLoading) {
        return (
            <div className="flex h-[calc(100vh-8rem)] w-full items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        )
    }

    if (!hasProperties && !isDemoMode) {
        return (
            <div className="bg-muted/40 min-h-[calc(100vh-4rem)]">
                <div className="container mx-auto py-8 px-4 md:px-6">
                     <div className="mb-8">
                        <h1 className="text-3xl font-bold font-headline">Owner Dashboard</h1>
                        <p className="text-muted-foreground">Welcome back, {owner?.name || user?.displayName || 'Owner'}!</p>
                    </div>
                    <Card className="text-center py-16">
                        <CardHeader>
                            <CardTitle>You haven't listed any properties yet.</CardTitle>
                            <CardDescription>List your first property or view a demo of the dashboard.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-center items-center flex-wrap gap-4">
                             <Button asChild size="lg">
                                <Link href="/owner/add-property">
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    List Your First Property
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

    return (
        <div className="bg-muted/40 min-h-screen">
            <div className="container mx-auto py-8 px-4 md:px-6 space-y-12">
                <section>
                    {isDemoMode && (
                        <Alert className="mb-8 border-primary/50 bg-primary/10">
                            <Info className="h-4 w-4 text-primary" />
                            <AlertTitle className="font-semibold text-primary">Demo Mode</AlertTitle>
                            <AlertDescription className="flex justify-between items-center text-primary/80">
                                You are currently viewing a demo of the owner dashboard. This is sample data.
                                <Button variant="ghost" size="sm" onClick={() => setIsDemoMode(false)}>Exit Demo</Button>
                            </AlertDescription>
                        </Alert>
                    )}
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold font-headline">Owner Dashboard</h1>
                            <p className="text-muted-foreground">Welcome back, {owner?.name || user?.displayName || 'Owner'}! Here's an overview of your portfolio.</p>
                        </div>
                        <div className="flex gap-2">
                             <Button variant="outline">
                                <TrendingUp className="mr-2 h-4 w-4" />
                                View Analytics
                            </Button>
                            <Button asChild>
                                <Link href="/owner/add-property">
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Add New Property
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                        <InfoCard
                            title="Total Properties"
                            value={totalProperties.toString()}
                            icon={<Home className="h-4 w-4 text-muted-foreground" />}
                            description="Your entire property portfolio"
                        />
                        <InfoCard
                            title="Monthly Rent Collection"
                            value={`₹${totalRent.toLocaleString('en-IN')}`}
                            icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
                            description="Estimated earnings this month"
                        />
                        <InfoCard
                            title="Total Capacity"
                            value={totalCapacity.toString()}
                            icon={<Users className="h-4 w-4 text-muted-foreground" />}
                            description="Across all your properties"
                        />
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{occupancy.toFixed(0)}%</div>
                                <p className="text-xs text-muted-foreground">
                                    {totalCapacity - totalAvailability} of {totalCapacity} beds filled
                                </p>
                                <Progress value={occupancy} className="mt-2 h-2" />
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-5">
                        <Card className="lg:col-span-3">
                            <CardHeader>
                                <CardTitle>Rent by Property</CardTitle>
                                <CardDescription>A breakdown of your monthly rent per property.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <OwnerEarningsChart properties={displayProperties} />
                            </CardContent>
                        </Card>
                        <div className="lg:col-span-2 space-y-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Room Member Issues</CardTitle>
                                    <CardDescription>Recent feedback from tenants across your properties.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                     {areSuggestionsLoading ? (
                                        <div className="flex justify-center items-center h-40">
                                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                        </div>
                                    ) : !suggestions || suggestions.length === 0 ? (
                                        <div className="text-center text-muted-foreground py-8">
                                            <MessageSquareText className="w-10 h-10 mx-auto mb-4 text-muted-foreground/50"/>
                                            <p className="font-semibold">No Issues Reported</p>
                                            <p className="text-sm">Issues and suggestions from your tenants will appear here.</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                                            {suggestions.map(suggestion => (
                                                <div key={suggestion.id} className="p-3 rounded-lg border bg-muted/50">
                                                    <div className="flex justify-between items-start gap-2">
                                                        <div>
                                                            <p className="font-semibold text-sm leading-tight">{suggestion.studentName}</p>
                                                            <p className="text-xs text-muted-foreground">in <span className="font-medium">{suggestion.propertyName}</span></p>
                                                        </div>
                                                        <Badge variant={suggestion.status === 'open' ? 'destructive' : 'secondary'} className="capitalize text-xs whitespace-nowrap">{suggestion.status}</Badge>
                                                    </div>
                                                    <p className="mt-2 text-sm text-foreground/90">{suggestion.message}</p>
                                                    {suggestion.createdAt && typeof suggestion.createdAt.toDate === 'function' && (
                                                        <p className="text-right text-xs text-muted-foreground mt-2">
                                                            {formatDistanceToNow(suggestion.createdAt.toDate(), { addSuffix: true })}
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                             <Card>
                                <CardHeader>
                                    <CardTitle>Quick Actions</CardTitle>
                                </CardHeader>
                                <CardContent className="grid grid-cols-2 gap-4">
                                    <Button variant="outline" asChild>
                                        <Link href="/properties">
                                            <Eye className="w-4 h-4 mr-2"/>
                                            <span>View All</span>
                                        </Link>
                                    </Button>
                                    <Button variant="outline">
                                        <CircleDollarSign className="w-4 h-4 mr-2"/>
                                        <span>Payouts</span>
                                    </Button>
                                    <Button variant="outline">
                                        <Bell className="w-4 h-4 mr-2"/>
                                        <span>Notifications</span>
                                    </Button>
                                    <Button variant="outline" asChild>
                                        <Link href="/owner/add-property">
                                            <PlusCircle className="w-4 h-4 mr-2"/>
                                            <span>Add New</span>
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    
                    <Separator className="my-8" />

                    <Card>
                        <CardHeader>
                            <CardTitle>My Properties</CardTitle>
                            <CardDescription>An overview of your listed properties.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[300px]">Property</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Occupancy</TableHead>
                                        <TableHead className="text-right">Monthly Rent</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {displayProperties && displayProperties.map(prop => {
                                        const image = prop.imageIds.length > 0 ? PlaceHolderImages.find(p => p.id === prop.imageIds[0]) : null;
                                        return (
                                             <TableRow key={prop.id}>
                                                <TableCell className="font-medium">
                                                    <div className="flex items-center gap-3">
                                                         {image &&
                                                            <Image
                                                                src={image.imageUrl}
                                                                alt={prop.name}
                                                                width={64}
                                                                height={48}
                                                                className="rounded-md object-cover aspect-[4/3]"
                                                                data-ai-hint={image.imageHint}
                                                            />
                                                        }
                                                        <div>
                                                            <p className="font-semibold">{prop.name}</p>
                                                            <p className="text-sm text-muted-foreground">{prop.address}</p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant={prop.currentAvailability > 0 ? 'secondary' : 'default'} className={prop.currentAvailability > 0 ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}>
                                                        {prop.currentAvailability > 0 ? 'Available' : 'Full'}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col">
                                                        <span>{prop.totalCapacity - prop.currentAvailability} / {prop.totalCapacity}</span>
                                                        <span className="text-xs text-muted-foreground">{prop.currentAvailability} beds available</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right">₹{prop.rent.toLocaleString('en-IN')}</TableCell>
                                                <TableCell className="text-right">
                                                     <Button asChild variant="outline" size="sm">
                                                        <Link href={`/properties/${prop.id}`}>View</Link>
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </div>
    );
}

    