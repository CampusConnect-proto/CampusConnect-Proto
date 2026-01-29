'use client';

import { useState, useMemo, useCallback } from 'react';
import { MessCard } from '@/components/mess/mess-card';
import { MessSearchFilters } from '@/components/mess/mess-search-filters';
import { mockMessListings } from '@/lib/mock-data';
import type { MessListing } from '@/lib/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { List, LayoutGrid, Search, Frown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

export default function MessPage() {
  const [layout, setLayout] = useState<'grid' | 'list'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [filters, setFilters] = useState({
    price: 5000,
    foodType: 'any',
  });

  const handleFilterChange = useCallback((newFilters: any) => {
    setFilters(newFilters);
  }, []);

  const filteredAndSortedMess = useMemo(() => {
    let filtered = mockMessListings.filter(mess => {
      const hasImage = mess.imageIds && mess.imageIds.length > 0;
      
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        mess.name.toLowerCase().includes(searchLower) ||
        mess.address.toLowerCase().includes(searchLower);

      const monthlyPrice = mess.pricing.monthly;
      const matchesPrice = monthlyPrice !== undefined ? monthlyPrice <= filters.price : true;
      const matchesFoodType = filters.foodType === 'any' || mess.foodType === filters.foodType;

      return hasImage && matchesSearch && matchesPrice && matchesFoodType;
    });

    const sorted = [...filtered].sort((a, b) => {
        switch (sortBy) {
            case 'price-asc':
                return (a.pricing.monthly || Infinity) - (b.pricing.monthly || Infinity);
            case 'price-desc':
                return (b.pricing.monthly || 0) - (a.pricing.monthly || 0);
            case 'rating-desc':
                return (b.averageRating || 0) - (a.averageRating || 0);
            default: // popularity
                return (b.reviewCount || 0) - (a.reviewCount || 0);
        }
    });

    return sorted;
  }, [searchQuery, filters, sortBy]);

  return (
    <div className="bg-muted/40 min-h-[calc(100vh-4rem)]">
        <header className="bg-background border-b sticky top-16 z-40">
            <div className="container mx-auto py-4 px-4 md:px-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Enter mess name or location..."
                        className="w-full h-12 pl-10 text-base rounded-full shadow-sm bg-muted/50 focus:bg-background"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>
        </header>
        <div className="container mx-auto py-8 px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-8">
            <aside className="w-full md:w-1/4 lg:w-1/5">
              <MessSearchFilters onFilterChange={handleFilterChange} initialFilters={filters} />
            </aside>

            <main className="w-full md:w-3/4 lg:w-4/5">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl md:text-2xl font-bold">
                  Mess & Tiffins Found ({filteredAndSortedMess.length})
                </h1>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground hidden md:inline">Sort By</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px] bg-background">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popularity">Popularity</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                      <SelectItem value="rating-desc">Rating: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="hidden sm:flex rounded-md border bg-background p-0.5">
                    <Button variant={layout === 'list' ? 'secondary': 'ghost'} size="icon" onClick={() => setLayout('list')}>
                        <List className="h-5 w-5" />
                    </Button>
                    <Button variant={layout === 'grid' ? 'secondary': 'ghost'} size="icon" onClick={() => setLayout('grid')}>
                        <LayoutGrid className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>

              { filteredAndSortedMess.length > 0 ? (
                    <div className={cn(
                    "transition-all",
                    layout === 'grid' 
                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
                        : "flex flex-col gap-6"
                    )}>
                    {filteredAndSortedMess.map(mess => (
                        <MessCard key={mess.id} mess={mess} layout={layout} />
                    ))}
                  </div>
              ) : (
                <div className="text-center py-16 border-dashed border-2 rounded-lg flex flex-col items-center">
                    <Frown className="w-16 h-16 text-muted-foreground/50 mb-4" />
                    <h3 className="text-xl font-semibold">No Mess Found</h3>
                    <p className="text-muted-foreground mt-2">Try adjusting your filters or searching for something else.</p>
                </div>
              )
              }
            </main>
          </div>
      </div>
    </div>
  );
}
