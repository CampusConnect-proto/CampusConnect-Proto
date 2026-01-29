'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useFirestore } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';

export default function DashboardRedirectPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();

  useEffect(() => {
    if (isUserLoading || !firestore) {
      // Wait until user state is loaded and firestore is available
      return;
    }

    if (!user) {
      // If no user is logged in, redirect to the login page
      router.replace('/login');
      return;
    }

    const checkUserRoleAndRedirect = async () => {
      if (!user.uid) return;

      const studentDocRef = doc(firestore, 'students', user.uid);
      const ownerDocRef = doc(firestore, 'propertyOwners', user.uid);

      try {
        const studentSnap = await getDoc(studentDocRef);
        if (studentSnap.exists()) {
          router.replace('/dashboard/student');
          return;
        }

        const ownerSnap = await getDoc(ownerDocRef);
        if (ownerSnap.exists()) {
          router.replace('/dashboard/owner');
          return;
        }

        // If no profile document is found, the user may not have completed onboarding.
        // Redirect them to the role selection page.
        router.replace('/onboarding');
      } catch (error) {
        console.error("Error checking user role:", error);
        // In case of an error, fallback to the onboarding page.
        router.replace('/onboarding');
      }
    };

    checkUserRoleAndRedirect();
  }, [user, isUserLoading, firestore, router]);

  return (
    <div className="flex h-[calc(100vh-8rem)] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading your dashboard...</p>
      </div>
    </div>
  );
}
