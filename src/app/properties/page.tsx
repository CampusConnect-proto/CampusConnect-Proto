'use client';

import { useState, useMemo, useCallback } from 'react';
import { PropertyCard } from '@/components/properties/property-card';
import { PropertySearchFilters } from '@/components/properties/property-search-filters';
import { mockProperties } from '@/lib/mock-data';
import type { Property } from '@/lib/types';
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

export default function PropertiesPage() {
  const [layout, setLayout] = useState<'grid' | 'list'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [filters, setFilters] = useState({
    distance: 5,
    roomType: 'any',
    budget: { min: 0, max: 50000 },
    facilities: [] as string[],
    messAvailable: false,
  });

  const handleFilterChange = useCallback((newFilters: any) => {
    setFilters(newFilters);
  }, []);

  const filteredAndSortedProperties = useMemo(() => {
    let filtered = mockProperties.filter(property => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        property.name.toLowerCase().includes(searchLower) ||
        property.collegeName.toLowerCase().includes(searchLower) ||
        property.address.toLowerCase().includes(searchLower);

      const matchesDistance = property.distanceFromCollege <= filters.distance;
      const matchesRoomType = filters.roomType === 'any' || property.type === filters.roomType;
      const matchesBudget = property.rent >= filters.budget.min && property.rent <= filters.budget.max;
      const matchesFacilities = filters.facilities.every(facility => property.facilities.includes(facility));
      const matchesMess = !filters.messAvailable || (property.messDetails?.available === true);

      return matchesSearch && matchesDistance && matchesRoomType && matchesBudget && matchesFacilities && matchesMess;
    });

    const sorted = [...filtered].sort((a, b) => {
        switch (sortBy) {
            case 'rent-asc':
                return a.rent - b.rent;
            case 'rent-desc':
                return b.rent - a.rent;
            case 'rating-desc':
                return (b.averageRating || 0) - (a.averageRating || 0);
            case 'distance-asc':
                return a.distanceFromCollege - b.distanceFromCollege;
            default:
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
                        placeholder="Enter property name, college, or address..."
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
              <PropertySearchFilters onFilterChange={handleFilterChange} initialFilters={filters} />
            </aside>

            <main className="w-full md:w-3/4 lg:w-4/5">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl md:text-2xl font-bold">
                  Properties Found ({filteredAndSortedProperties.length})
                </h1>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground hidden md:inline">Sort By</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px] bg-background">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popularity">Popularity</SelectItem>
                      <SelectItem value="rent-asc">Rent: Low to High</SelectItem>
                      <SelectItem value="rent-desc">Rent: High to Low</SelectItem>
                      <SelectItem value="rating-desc">Rating: High to Low</SelectItem>
                      <SelectItem value="distance-asc">Distance: Closest</SelectItem>
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

              { filteredAndSortedProperties.length > 0 ? (
                    <div className={cn(
                    "transition-all",
                    layout === 'grid' 
                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
                        : "flex flex-col gap-6"
                    )}>
                    {filteredAndSortedProperties.map(property => (
                        <PropertyCard key={property.id} property={property} layout={layout} />
                    ))}
                  </div>
              ) : (
                <div className="text-center py-16 border-dashed border-2 rounded-lg flex flex-col items-center">
                    <Frown className="w-16 h-16 text-muted-foreground/50 mb-4" />
                    <h3 className="text-xl font-semibold">No Properties Found</h3>
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
