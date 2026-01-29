
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '../ui/input';

interface MessSearchFiltersProps {
  onFilterChange: (filters: any) => void;
  initialFilters: any;
}

const foodTypes = ['any', 'veg', 'non-veg', 'both'];

export function MessSearchFilters({ onFilterChange, initialFilters }: MessSearchFiltersProps) {
  const [filters, setFilters] = useState(initialFilters);
  
   useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);


  const handleFoodTypeChange = (value: string) => {
    setFilters(prev => ({ ...prev, foodType: value }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'min' | 'max') => {
    const value = e.target.value ? parseInt(e.target.value, 10) : (field === 'min' ? 0 : 5000);
    setFilters(prev => ({ ...prev, priceRange: { ...prev.priceRange, [field]: value } }));
  };
  
  const clearFilters = () => {
    const clearedFilters = {
       priceRange: { min: 0, max: 5000 },
       foodType: 'any',
    };
    setFilters(clearedFilters);
  }

  return (
    <Card className="sticky top-24">
      <CardHeader className='flex-row items-center justify-between'>
        <CardTitle>Filter Mess</CardTitle>
        <Button variant="ghost" size="sm" onClick={clearFilters} className="text-primary hover:text-primary">Clear all</Button>
      </CardHeader>
      <CardContent className="space-y-6">
        
        <div className="space-y-2">
            <Label>Monthly Price Range</Label>
            <div className="flex gap-2">
                <Input type="number" placeholder="Min" value={filters.priceRange.min || ''} onChange={(e) => handlePriceChange(e, 'min')} />
                <Input type="number" placeholder="Max" value={filters.priceRange.max || ''} onChange={(e) => handlePriceChange(e, 'max')} />
            </div>
        </div>

        <div className="space-y-2">
          <Label>Food Type</Label>
          <RadioGroup value={filters.foodType} onValueChange={handleFoodTypeChange}>
            {foodTypes.map(type => (
                <div key={type} className="flex items-center space-x-2">
                    <RadioGroupItem value={type} id={`type-${type}`} />
                    <Label htmlFor={`type-${type}`} className="font-normal capitalize">{type.replace('-', ' ')}</Label>
                </div>
            ))}
          </RadioGroup>
        </div>

      </CardContent>
    </Card>
  );
}
