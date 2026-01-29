'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Building2, Menu, PlusCircle, UserCircle, LayoutDashboard, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useUser } from '@/firebase';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const pathname = usePathname();
  const { user, isUserLoading } = useUser();

  const navLinks = [
    { href: '/', label: 'Home'},
    { href: '/properties', label: 'Properties'},
    { href: '/mess', label: 'Mess'},
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/contact', label: 'Contact' },
  ];

  const NavLink = ({ href, label, icon }: { href: string; label: string; icon?: React.ReactNode }) => (
    <Link
      href={href}
      className={cn(
        "flex items-center text-foreground/80 transition-colors hover:text-foreground",
        pathname === href && "text-primary hover:text-primary font-semibold"
      )}
    >
      {icon}
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-auto flex items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg mr-6">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="font-headline">Campus Connect</span>
          </Link>
           <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
             {navLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </nav>
        </div>
        
        <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="p-4">
                  <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-8">
                     <Building2 className="h-6 w-6 text-primary" />
                     <span className="font-headline">Campus Connect</span>
                  </Link>
                  <nav className="grid gap-6 text-lg font-medium">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          "flex items-center gap-2 text-foreground/80 transition-colors hover:text-foreground",
                          pathname === link.href && "text-primary hover:text-primary font-semibold"
                        )}
                      >
                        {link.icon}
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
        </div>
        
        <div className="flex items-center justify-end space-x-2">
          <div className="hidden md:flex items-center gap-2">
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  Partner with Us <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/owner/add-property">List a Property</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/owner/add-mess">List a Mess</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {!isUserLoading && !user && (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">
                    Login
                  </Link>
                </Button>
                 <Button asChild>
                  <Link href="/signup">
                    Sign Up
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
