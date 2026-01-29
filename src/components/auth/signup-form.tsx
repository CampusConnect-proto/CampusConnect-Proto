
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useAuth, useFirestore } from '@/firebase';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { GoogleIcon } from '../icons';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Loader2 } from 'lucide-react';

const signupSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters long.'),
  role: z.enum(['student', 'owner'], {
    required_error: 'You need to select a role.',
  }),
});

export function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const router = useRouter();
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'student'
    },
  });

  async function onSubmit(values: z.infer<typeof signupSchema>) {
    setIsLoading(true);
    try {
      if (!firestore) throw new Error("Firestore is not available");

      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;

      // Create user profile document in Firestore
      if (values.role === 'student') {
        const studentDocRef = doc(firestore, 'students', user.uid);
        await setDoc(studentDocRef, {
          id: user.uid,
          name: values.name,
          email: values.email,
          collegeName: 'Not specified', // Placeholder value
        });
      } else { // owner
        const ownerDocRef = doc(firestore, 'propertyOwners', user.uid);
        await setDoc(ownerDocRef, {
          id: user.uid,
          name: values.name,
          email: values.email,
          contactNumber: 'Not specified', // Placeholder value
        });
      }

      toast({
        title: "Account Created!",
        description: "Welcome to Campus Connect. Redirecting you now...",
      });

      router.push('/dashboard');

    } catch (error: any) {
      console.error("Signup failed:", error);
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: error.message || "Could not create your account. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGoogleSignUp() {
    setIsGoogleLoading(true);
    try {
        if (!firestore) throw new Error("Firestore is not available");

        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // Check if user document already exists
        const studentDocRef = doc(firestore, 'students', user.uid);
        const ownerDocRef = doc(firestore, 'propertyOwners', user.uid);
        const studentSnap = await getDoc(studentDocRef);
        const ownerSnap = await getDoc(ownerDocRef);

        if (studentSnap.exists() || ownerSnap.exists()) {
            // User already exists, just sign them in.
            toast({
                title: "Login Successful",
                description: "Welcome back!",
            });
        } else {
             // New user, create a document based on the selected role
            const role = form.getValues('role');
            if (role === 'student') {
                await setDoc(studentDocRef, {
                    id: user.uid,
                    name: user.displayName || 'New User',
                    email: user.email,
                    collegeName: 'Not specified',
                });
            } else { // owner
                await setDoc(ownerDocRef, {
                    id: user.uid,
                    name: user.displayName || 'New User',
                    email: user.email,
                    contactNumber: 'Not specified',
                });
            }
             toast({
                title: "Account Created!",
                description: "Welcome to Campus Connect.",
            });
        }

        router.push('/dashboard');

    } catch (error: any) {
        console.error("Google Signup failed:", error);
        toast({
            variant: "destructive",
            title: "Google Signup Failed",
            description: error.message || "Could not sign up with Google. Please try again.",
        });
    } finally {
        setIsGoogleLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Create an Account</CardTitle>
        <CardDescription>Join Campus Connect to find your perfect student home.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
             <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} disabled={isLoading || isGoogleLoading}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} disabled={isLoading || isGoogleLoading}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} disabled={isLoading || isGoogleLoading}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                    <FormLabel>I am a...</FormLabel>
                    <FormControl>
                        <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-4"
                        disabled={isLoading || isGoogleLoading}
                        >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                            <RadioGroupItem value="student" />
                            </FormControl>
                            <FormLabel className="font-normal">Student</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                            <RadioGroupItem value="owner" />
                            </FormControl>
                            <FormLabel className="font-normal">Property Owner</FormLabel>
                        </FormItem>
                        </RadioGroup>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <Button type="submit" className="w-full" disabled={isLoading || isGoogleLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Account
            </Button>
          </form>
        </Form>
        <Separator className="my-6" />
        <Button variant="outline" className="w-full" onClick={handleGoogleSignUp} disabled={isLoading || isGoogleLoading}>
            {isGoogleLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GoogleIcon className="mr-2 h-4 w-4" />}
            Sign up with Google
        </Button>
        <div className="mt-6 text-center text-sm">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

    