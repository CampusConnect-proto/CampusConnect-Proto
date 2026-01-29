'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';

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

  const handlePriceChange = (value: number[]) => {
    setFilters(prev => ({ ...prev, price: value[0] }));
  };
  
  const clearFilters = () => {
    const clearedFilters = {
       price: 5000,
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
        
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <Label htmlFor="price">Max Monthly Price</Label>
                <span className="text-sm font-medium">₹{filters.price.toLocaleString('en-IN')}</span>
            </div>
            <Slider
                id="price"
                min={1000}
                max={5000}
                step={500}
                value={[filters.price]}
                onValueChange={handlePriceChange}
            />
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
