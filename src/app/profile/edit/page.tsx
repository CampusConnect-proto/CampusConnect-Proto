
'use client';

import { useUser, useFirestore } from '@/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const studentProfileSchema = z.object({
  collegeName: z.string().min(1, 'College name is required.'),
});

const ownerProfileSchema = z.object({
  contactNumber: z.string().regex(/^\d{10}$/, 'Please enter a valid 10-digit phone number.'),
});

type UserRole = 'student' | 'owner' | 'unknown' | 'loading';

export default function EditProfilePage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();
  const [role, setRole] = useState<UserRole>('loading');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const studentForm = useForm<z.infer<typeof studentProfileSchema>>({
    resolver: zodResolver(studentProfileSchema),
    defaultValues: { collegeName: '' },
  });

  const ownerForm = useForm<z.infer<typeof ownerProfileSchema>>({
    resolver: zodResolver(ownerProfileSchema),
    defaultValues: { contactNumber: '' },
  });

  useEffect(() => {
    if (isUserLoading || !firestore) return;
    if (!user) {
      router.replace('/login');
      return;
    }

    const fetchUserRole = async () => {
      const studentDocRef = doc(firestore, 'students', user.uid);
      const studentSnap = await getDoc(studentDocRef);
      if (studentSnap.exists()) {
        setRole('student');
        studentForm.setValue('collegeName', studentSnap.data().collegeName || '');
        return;
      }

      const ownerDocRef = doc(firestore, 'propertyOwners', user.uid);
      const ownerSnap = await getDoc(ownerDocRef);
      if (ownerSnap.exists()) {
        setRole('owner');
        ownerForm.setValue('contactNumber', ownerSnap.data().contactNumber || '');
        return;
      }

      setRole('unknown');
    };

    fetchUserRole();
  }, [user, isUserLoading, firestore, router, studentForm, ownerForm]);

  async function onStudentSubmit(values: z.infer<typeof studentProfileSchema>) {
    if (!user || !firestore) return;
    setIsSubmitting(true);
    try {
      const studentDocRef = doc(firestore, 'students', user.uid);
      await updateDoc(studentDocRef, { collegeName: values.collegeName });
      toast({ title: 'Profile Updated', description: 'Your profile has been successfully updated.' });
      router.push('/dashboard');
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Update Failed', description: error.message });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function onOwnerSubmit(values: z.infer<typeof ownerProfileSchema>) {
    if (!user || !firestore) return;
    setIsSubmitting(true);
    try {
      const ownerDocRef = doc(firestore, 'propertyOwners', user.uid);
      await updateDoc(ownerDocRef, { contactNumber: values.contactNumber });
      toast({ title: 'Profile Updated', description: 'Your profile has been successfully updated.' });
      router.push('/dashboard');
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Update Failed', description: error.message });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (role === 'loading') {
    return (
      <div className="flex h-[calc(100vh-8rem)] w-full items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  if (role === 'unknown') {
     return (
      <div className="flex h-[calc(100vh-8rem)] w-full items-center justify-center">
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Profile Not Found</CardTitle>
                <CardDescription>We couldn't find a profile for your account. Please select your role to continue.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button className="w-full" onClick={() => router.push('/onboarding')}>Go to Role Selection</Button>
            </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Complete Your Profile</CardTitle>
          <CardDescription>
            Just a few more details to get you started on Campus Connect.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {role === 'student' && (
            <Form {...studentForm}>
              <form onSubmit={studentForm.handleSubmit(onStudentSubmit)} className="space-y-6">
                <FormField
                  control={studentForm.control}
                  name="collegeName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>College Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Indian Institute of Technology Delhi" {...field} disabled={isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save and Continue
                </Button>
              </form>
            </Form>
          )}

          {role === 'owner' && (
             <Form {...ownerForm}>
              <form onSubmit={ownerForm.handleSubmit(onOwnerSubmit)} className="space-y-6">
                <FormField
                  control={ownerForm.control}
                  name="contactNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="9876543210" {...field} disabled={isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save and Continue
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
