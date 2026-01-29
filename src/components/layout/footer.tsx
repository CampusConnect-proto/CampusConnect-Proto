import Link from 'next/link';
import { Home } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t bg-card text-card-foreground">
      <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Home className="h-6 w-6 text-primary" />
          <p className="text-lg font-bold font-headline">Campus Connect</p>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Campus Connect. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:gap-6">
          <Link href="/contact" className="text-sm hover:underline underline-offset-4">
            Contact
          </Link>
          <Link href="#" className="text-sm hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="text-sm hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
