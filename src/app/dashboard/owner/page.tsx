'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, Home, Users, PlusCircle, Eye, TrendingUp, Bell, CircleDollarSign } from "lucide-react";
import Link from 'next/link';
import { OwnerEarningsChart } from '@/components/dashboard/owner/owner-earnings-chart';
import { mockProperties } from '@/lib/mock-data';
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const recentActivities = [
    { name: 'Rohan Sharma', activity: 'paid rent for Prop1', time: '5m ago', image: 'Rohan Sharma' },
    { name: 'Priya Singh', activity: 'sent a message', time: '1h ago', image: 'Priya Singh' },
    { name: 'Ankit Kumar', activity: 'booked a tour for Prop2', time: '3h ago', image: 'Ankit Kumar'},
    { name: 'New Property', activity: 'pending verification', time: '1d ago', image: 'NP' },
]

export default function OwnerDashboardPage() {
    const ownerProperties = mockProperties.slice(0, 3);
    const totalProperties = ownerProperties.length;
    const totalRent = ownerProperties.reduce((acc, prop) => acc + prop.rent, 0);
    const totalCapacity = ownerProperties.reduce((acc, prop) => acc + prop.totalCapacity, 0);
    const totalAvailability = ownerProperties.reduce((acc, prop) => acc + prop.currentAvailability, 0);
    const occupancy = totalCapacity > 0 ? ((totalCapacity - totalAvailability) / totalCapacity) * 100 : 0;


    return (
        <div className="bg-muted/40 min-h-screen">
            <div className="container mx-auto py-8 px-4 md:px-6 space-y-12">
                <section>
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold font-headline">Owner Dashboard</h1>
                            <p className="text-muted-foreground">Welcome back! Here's an overview of your portfolio.</p>
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
                                <CardTitle>Monthly Earnings</CardTitle>
                                <CardDescription>Your estimated rent collection over the year.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <OwnerEarningsChart />
                            </CardContent>
                        </Card>
                        <div className="lg:col-span-2 space-y-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Recent Activity</CardTitle>
                                    <CardDescription>Latest updates from tenants and properties.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {recentActivities.map(activity => (
                                            <div key={activity.name} className="flex items-center gap-4">
                                                <Avatar className="h-9 w-9">
                                                     <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${activity.image}`} />
                                                    <AvatarFallback>{activity.image.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 text-sm">
                                                    <p><span className="font-semibold">{activity.name}</span> {activity.activity}</p>
                                                </div>
                                                <time className="text-xs text-muted-foreground">{activity.time}</time>
                                            </div>
                                        ))}
                                    </div>
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
                                    {ownerProperties.map(prop => {
                                        const image = PlaceHolderImages.find(p => p.id === prop.imageIds[0]);
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
