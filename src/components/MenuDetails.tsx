import { ArrowLeft, Heart, Clock, Users, Wine, Flame, Trash2 } from 'lucide-react';
import { MenuItem } from '../App';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MenuItemDetailsProps {
  item: MenuItem;
  isFavorite: boolean;
  onBack: () => void;
  onToggleFavorite: (id: string) => void;
  onRemove: (id: string) => void;
}

export function MenuItemDetails({ item, isFavorite, onBack, onToggleFavorite, onRemove }: MenuItemDetailsProps) {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-white shadow-2xl pb-20">
      {/* Hero Image */}
      <div className="relative h-80">
        <ImageWithFallback
          src={item.image}
          alt={item.dishName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="bg-white/90 hover:bg-white shadow-md"
          >
            <ArrowLeft className="w-5 h-5 text-gray-900" />
          </Button>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onToggleFavorite(item.id)}
              className="bg-white/90 hover:bg-white shadow-md"
            >
              <Heart
                className={`w-5 h-5 ${
                  isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-900'
                }`}
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                if (confirm('Are you sure you want to remove this item?')) {
                  onRemove(item.id);
                }
              }}
              className="bg-white/90 hover:bg-white shadow-md"
            >
              <Trash2 className="w-5 h-5 text-red-600" />
            </Button>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <Badge className="bg-amber-600 text-white border-0 mb-3">
            {item.course}
          </Badge>
          <h1 className="text-3xl text-white mb-2">{item.dishName}</h1>
          <div className="flex items-center gap-4 text-white/90 text-sm">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{item.prepTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{item.servings} serving{item.servings > 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Price per serving</p>
            <p className="text-3xl text-amber-700">R{item.price.toFixed(2)}</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-lg">
            <Flame className="w-5 h-5 text-orange-600" />
            <div>
              <p className="text-xs text-gray-600">Calories</p>
              <p className="text-sm">{item.nutritionalInfo.calories}</p>
            </div>
          </div>
        </div>

        <Separator className="bg-amber-100" />

        {/* Description */}
        <div>
          <h2 className="text-lg mb-2 text-gray-900">Description</h2>
          <p className="text-gray-700 leading-relaxed">{item.description}</p>
        </div>

        {/* Wine Pairing */}
        {item.winePairing && (
          <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <div className="flex items-center gap-3">
              <Wine className="w-6 h-6 text-purple-700" />
              <div>
                <p className="text-sm text-gray-600">Recommended Wine Pairing</p>
                <p className="text-purple-900">{item.winePairing}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Allergens */}
        {item.allergens.length > 0 && (
          <div>
            <h3 className="text-lg mb-3 text-gray-900">Allergens</h3>
            <div className="flex flex-wrap gap-2">
              {item.allergens.map((allergen) => (
                <Badge
                  key={allergen}
                  variant="outline"
                  className="border-red-300 text-red-700 bg-red-50"
                >
                  {allergen}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Nutritional Information */}
        <div>
          <h3 className="text-lg mb-3 text-gray-900">Nutritional Information</h3>
          <Card className="p-4 border-amber-100">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-amber-50 rounded-lg">
                <p className="text-2xl text-amber-700 mb-1">{item.nutritionalInfo.calories}</p>
                <p className="text-xs text-gray-600">Calories</p>
              </div>
              <div className="text-center p-3 bg-amber-50 rounded-lg">
                <p className="text-2xl text-amber-700 mb-1">{item.nutritionalInfo.protein}</p>
                <p className="text-xs text-gray-600">Protein</p>
              </div>
              <div className="text-center p-3 bg-amber-50 rounded-lg">
                <p className="text-2xl text-amber-700 mb-1">{item.nutritionalInfo.carbs}</p>
                <p className="text-xs text-gray-600">Carbs</p>
              </div>
              <div className="text-center p-3 bg-amber-50 rounded-lg">
                <p className="text-2xl text-amber-700 mb-1">{item.nutritionalInfo.fat}</p>
                <p className="text-xs text-gray-600">Fat</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
