import { useState } from 'react';
import { ArrowLeft, SlidersHorizontal, Heart } from 'lucide-react';
import { MenuItem } from '../App';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Slider } from './ui/slider';
import { Label } from './ui/label';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface FilterMenuProps {
  menuItems: MenuItem[];
  favorites: Set<string>;
  onBack: () => void;
  onViewDetails: (item: MenuItem) => void;
  onToggleFavorite: (id: string) => void;
}

export function FilterMenu({ menuItems, favorites, onBack, onViewDetails, onToggleFavorite }: FilterMenuProps) {
  const [selectedCourse, setSelectedCourse] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);

  const courses = ['All', 'Starters', 'Mains', 'Dessert'];
  const allergens = ['Dairy', 'Eggs', 'Fish', 'Shellfish', 'Gluten', 'Nuts', 'Soy'];

  const toggleAllergen = (allergen: string) => {
    setSelectedAllergens(prev =>
      prev.includes(allergen)
        ? prev.filter(a => a !== allergen)
        : [...prev, allergen]
    );
  };

  const clearFilters = () => {
    setSelectedCourse('All');
    setPriceRange([0, 1000]);
    setSelectedAllergens([]);
  };

  // Apply filters
  const filteredItems = menuItems.filter(item => {
    const courseMatch = selectedCourse === 'All' || item.course === selectedCourse;
    const priceMatch = item.price >= priceRange[0] && item.price <= priceRange[1];
    const allergenMatch = selectedAllergens.length === 0 ||
      !item.allergens.some(a => selectedAllergens.includes(a));
    
    return courseMatch && priceMatch && allergenMatch;
  });

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white shadow-2xl pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6 sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-white hover:bg-white/20 -ml-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <SlidersHorizontal className="w-7 h-7" />
          <div>
            <h1 className="text-2xl">Filter Menu</h1>
            <p className="text-amber-100 text-sm">{filteredItems.length} items found</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={clearFilters}
          className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20"
        >
          Clear All Filters
        </Button>
      </div>

      <div className="p-6 space-y-6">
        {/* Course Filter */}
        <Card className="p-4 border-amber-100">
          <Label className="text-lg mb-3 block text-amber-900">Course Type</Label>
          <div className="flex flex-wrap gap-2">
            {courses.map((course) => (
              <Badge
                key={course}
                onClick={() => setSelectedCourse(course)}
                className={`cursor-pointer transition-all ${
                  selectedCourse === course
                    ? 'bg-amber-600 hover:bg-amber-700 text-white'
                    : 'bg-white hover:bg-amber-100 text-amber-900 border-amber-300'
                }`}
              >
                {course}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Price Range Filter */}
        <Card className="p-4 border-amber-100">
          <Label className="text-lg mb-3 block text-amber-900">Price Range</Label>
          <div className="space-y-4">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={1000}
              step={10}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm">
              <span className="text-amber-700">R{priceRange[0]}</span>
              <span className="text-gray-500">to</span>
              <span className="text-amber-700">R{priceRange[1]}</span>
            </div>
          </div>
        </Card>

        {/* Allergen Filter */}
        <Card className="p-4 border-amber-100">
          <Label className="text-lg mb-3 block text-amber-900">Exclude Allergens</Label>
          <div className="flex flex-wrap gap-2">
            {allergens.map((allergen) => (
              <Badge
                key={allergen}
                onClick={() => toggleAllergen(allergen)}
                className={`cursor-pointer transition-all ${
                  selectedAllergens.includes(allergen)
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-white hover:bg-red-100 text-red-900 border-red-300'
                }`}
              >
                {allergen}
              </Badge>
            ))}
          </div>
          {selectedAllergens.length > 0 && (
            <p className="text-xs text-gray-600 mt-2">
              Excluding items with: {selectedAllergens.join(', ')}
            </p>
          )}
        </Card>

        {/* Results */}
        <div>
          <h2 className="text-lg mb-4 text-gray-900">
            Filtered Results ({filteredItems.length})
          </h2>
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-2">No items match your filters</p>
              <Button
                onClick={clearFilters}
                variant="outline"
                className="border-amber-300 text-amber-700 hover:bg-amber-50"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {filteredItems.map((item) => (
                <Card
                  key={item.id}
                  className="overflow-hidden hover:shadow-xl transition-all cursor-pointer border-amber-100 group"
                  onClick={() => onViewDetails(item)}
                >
                  <div className="relative aspect-square">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.dishName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(item.id);
                      }}
                      className="absolute top-2 right-2 bg-white/90 hover:bg-white shadow-md"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          favorites.has(item.id)
                            ? 'fill-red-500 text-red-500'
                            : 'text-gray-600'
                        }`}
                      />
                    </Button>
                    <Badge className="absolute bottom-2 left-2 bg-amber-600 text-white border-0">
                      {item.course}
                    </Badge>
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm mb-1 line-clamp-1">{item.dishName}</h3>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-amber-700">R{item.price.toFixed(2)}</span>
                      <span className="text-xs text-gray-500">{item.prepTime}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
