'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Input } from '../ui/input';

interface PropertySearchFiltersProps {
  onFilterChange: (filters: any) => void;
  initialFilters: any;
}

const allFacilities = ['Wi-Fi', 'AC/Heater', 'Geyser', 'Power Backup', 'Laundry', 'Kitchen', 'Parking', 'Gym'];
const roomTypes = ['any', 'single', 'shared', 'studio'];

export function PropertySearchFilters({ onFilterChange, initialFilters }: PropertySearchFiltersProps) {
  const [filters, setFilters] = useState(initialFilters);
  
   useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);


  const handleSliderChange = (value: number[], name: string) => {
    setFilters(prev => ({ ...prev, [name]: value[0] }));
  };

  const handleFacilityChange = (facility: string) => {
    setFilters(prev => {
      const newFacilities = prev.facilities.includes(facility)
        ? prev.facilities.filter(f => f !== facility)
        : [...prev.facilities, facility];
      return { ...prev, facilities: newFacilities };
    });
  };

  const handleRoomTypeChange = (value: string) => {
    setFilters(prev => ({ ...prev, roomType: value }));
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'min' | 'max') => {
    const value = e.target.value ? parseInt(e.target.value, 10) : (field === 'min' ? 0 : 50000);
    setFilters(prev => ({ ...prev, budget: { ...prev.budget, [field]: value } }));
  };

  const handleMessChange = (checked: boolean) => {
    setFilters(prev => ({ ...prev, messAvailable: checked }));
  };
  
  const clearFilters = () => {
    const clearedFilters = {
       distance: 5,
        roomType: 'any',
        budget: { min: 0, max: 50000 },
        facilities: [],
        messAvailable: false,
    };
    setFilters(clearedFilters);
  }

  return (
    <Card className="sticky top-24">
      <CardHeader className='flex-row items-center justify-between'>
        <CardTitle>Filter Properties</CardTitle>
        <Button variant="ghost" size="sm" onClick={clearFilters} className="text-primary hover:text-primary">Clear all</Button>
      </CardHeader>
      <CardContent className="space-y-6">
        
        <div className="space-y-2">
          <Label htmlFor="distance">Max Distance (km): {filters.distance} km</Label>
          <Slider
            id="distance"
            min={0}
            max={5}
            step={0.5}
            value={[filters.distance]}
            onValueChange={(value) => handleSliderChange(value, 'distance')}
          />
        </div>

        <div className="space-y-2">
          <Label>Room Type</Label>
          <RadioGroup value={filters.roomType} onValueChange={handleRoomTypeChange}>
            {roomTypes.map(type => (
                <div key={type} className="flex items-center space-x-2">
                    <RadioGroupItem value={type} id={`type-${type}`} />
                    <Label htmlFor={`type-${type}`} className="font-normal capitalize">{type === 'shared (2)' ? 'Shared (2 beds)' : type === 'shared (3+)' ? 'Shared (3+ beds)' : type}</Label>
                </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-2">
            <Label>Budget (per month)</Label>
            <div className="flex gap-2">
                <Input type="number" placeholder="Min" value={filters.budget.min || ''} onChange={(e) => handleBudgetChange(e, 'min')} />
                <Input type="number" placeholder="Max" value={filters.budget.max || ''} onChange={(e) => handleBudgetChange(e, 'max')} />
            </div>
        </div>

        <div className="space-y-2">
          <Label>Facilities</Label>
          <div className="space-y-2">
            {allFacilities.map(facility => (
              <div key={facility} className="flex items-center space-x-2">
                <Checkbox 
                  id={facility} 
                  onCheckedChange={() => handleFacilityChange(facility)}
                  checked={filters.facilities.includes(facility)}
                />
                <Label htmlFor={facility} className="font-normal capitalize">{facility}</Label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
            <Label>Food/Mess</Label>
             <div className="flex items-center space-x-2">
                <Checkbox 
                  id="mess" 
                  onCheckedChange={handleMessChange}
                  checked={filters.messAvailable}
                />
                <Label htmlFor="mess" className="font-normal">Mess Available</Label>
              </div>
        </div>
      </CardContent>
    </Card>
  );
}
