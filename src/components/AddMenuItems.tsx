import { useState } from 'react';
import { ArrowLeft, ChefHat, Save, Upload } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface AddMenuItemProps {
  onAdd: (item: {
    dishName: string;
    description: string;
    course: string;
    price: number;
    image: string;
    prepTime: string;
    servings: number;
    allergens: string[];
    nutritionalInfo: {
      calories: number;
      protein: string;
      carbs: string;
      fat: string;
    };
    winePairing?: string;
  }) => void;
  onCancel: () => void;
}

export function AddMenuItem({ onAdd, onCancel }: AddMenuItemProps) {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [servings, setServings] = useState('1');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [winePairing, setWinePairing] = useState('');
  const [allergens, setAllergens] = useState<string[]>([]);

  const courses = ['Starters', 'Mains', 'Dessert'];
  const commonAllergens = ['Dairy', 'Eggs', 'Fish', 'Shellfish', 'Gluten', 'Nuts', 'Soy'];

  const toggleAllergen = (allergen: string) => {
    setAllergens(prev =>
      prev.includes(allergen)
        ? prev.filter(a => a !== allergen)
        : [...prev, allergen]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!dishName.trim() || !description.trim() || !course || !price || !prepTime) {
      alert('Please fill in all required fields');
      return;
    }

    const priceNumber = parseFloat(price);
    if (isNaN(priceNumber) || priceNumber <= 0) {
      alert('Please enter a valid price');
      return;
    }

    onAdd({
      dishName: dishName.trim(),
      description: description.trim(),
      course,
      price: priceNumber,
      image: imageUrl || 'https://images.unsplash.com/photo-1698653223689-24b0bfd5150b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVmJTIwY29va2luZyUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzYwOTE2Mjg2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      prepTime: prepTime.trim(),
      servings: parseInt(servings) || 1,
      allergens,
      nutritionalInfo: {
        calories: parseInt(calories) || 0,
        protein: protein || '0g',
        carbs: carbs || '0g',
        fat: fat || '0g',
      },
      winePairing: winePairing.trim() || undefined,
    });
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white shadow-2xl pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onCancel}
            className="text-white hover:bg-white/20 -ml-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <ChefHat className="w-7 h-7" />
          <div>
            <h1 className="text-2xl">Add Menu Item</h1>
            <p className="text-amber-100 text-sm">Create a new dish</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Basic Information */}
        <Card className="p-6 border-amber-100 bg-gradient-to-br from-amber-50/50 to-orange-50/50">
          <h3 className="text-lg mb-4 text-amber-900">Basic Information</h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dishName" className="text-amber-900">
                Dish Name *
              </Label>
              <Input
                id="dishName"
                value={dishName}
                onChange={(e) => setDishName(e.target.value)}
                placeholder="e.g., Grilled Kingklip"
                className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-amber-900">
                Description *
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your dish..."
                rows={3}
                className="border-amber-200 focus:border-amber-500 focus:ring-amber-500 resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="course" className="text-amber-900">
                  Course *
                </Label>
                <Select value={course} onValueChange={setCourse}>
                  <SelectTrigger className="border-amber-200 focus:border-amber-500">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price" className="text-amber-900">
                  Price (ZAR) *
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-700">
                    R
                  </span>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0.00"
                    className="pl-8 border-amber-200"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="prepTime" className="text-amber-900">
                  Prep Time *
                </Label>
                <Input
                  id="prepTime"
                  value={prepTime}
                  onChange={(e) => setPrepTime(e.target.value)}
                  placeholder="e.g., 30 min"
                  className="border-amber-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="servings" className="text-amber-900">
                  Servings
                </Label>
                <Input
                  id="servings"
                  type="number"
                  value={servings}
                  onChange={(e) => setServings(e.target.value)}
                  className="border-amber-200"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl" className="text-amber-900">
                Image URL
              </Label>
              <div className="flex gap-2">
                <Input
                  id="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://..."
                  className="border-amber-200"
                />
                <Button type="button" variant="outline" size="icon" className="border-amber-300">
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Allergens */}
        <Card className="p-6 border-amber-100">
          <h3 className="text-lg mb-3 text-amber-900">Allergens</h3>
          <div className="flex flex-wrap gap-2">
            {commonAllergens.map((allergen) => (
              <Badge
                key={allergen}
                onClick={() => toggleAllergen(allergen)}
                className={`cursor-pointer transition-all ${
                  allergens.includes(allergen)
                    ? 'bg-amber-600 hover:bg-amber-700 text-white'
                    : 'bg-white hover:bg-amber-100 text-amber-900 border-amber-300'
                }`}
              >
                {allergen}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Nutritional Information */}
        <Card className="p-6 border-amber-100">
          <h3 className="text-lg mb-4 text-amber-900">Nutritional Info</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="calories">Calories</Label>
              <Input
                id="calories"
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                placeholder="0"
                className="border-amber-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="protein">Protein</Label>
              <Input
                id="protein"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                placeholder="0g"
                className="border-amber-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="carbs">Carbs</Label>
              <Input
                id="carbs"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
                placeholder="0g"
                className="border-amber-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fat">Fat</Label>
              <Input
                id="fat"
                value={fat}
                onChange={(e) => setFat(e.target.value)}
                placeholder="0g"
                className="border-amber-200"
              />
            </div>
          </div>
        </Card>

        {/* Wine Pairing */}
        <Card className="p-6 border-amber-100">
          <h3 className="text-lg mb-3 text-amber-900">Wine Pairing</h3>
          <Input
            value={winePairing}
            onChange={(e) => setWinePairing(e.target.value)}
            placeholder="e.g., Sauvignon Blanc"
            className="border-amber-200"
          />
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-6"
          >
            <Save className="w-5 h-5 mr-2" />
            Save Menu Item
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="w-full border-amber-300 text-amber-700 hover:bg-amber-50"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
