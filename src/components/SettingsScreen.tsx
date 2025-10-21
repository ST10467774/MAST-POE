import { Settings as SettingsIcon, Bell, DollarSign, Utensils, Info, ChefHat } from 'lucide-react';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface SettingsScreenProps {
  settings: {
    currency: string;
    notifications: boolean;
    dietaryPreferences: string[];
  };
  onUpdateSettings: (settings: any) => void;
}

export function SettingsScreen({ settings, onUpdateSettings }: SettingsScreenProps) {
  const dietaryOptions = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free', 'Halal', 'Kosher'];

  const toggleDietaryPreference = (pref: string) => {
    const newPrefs = settings.dietaryPreferences.includes(pref)
      ? settings.dietaryPreferences.filter(p => p !== pref)
      : [...settings.dietaryPreferences, pref];
    
    onUpdateSettings({ ...settings, dietaryPreferences: newPrefs });
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white shadow-2xl pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6">
        <div className="flex items-center gap-3">
          <SettingsIcon className="w-7 h-7" />
          <div>
            <h1 className="text-2xl">Settings</h1>
            <p className="text-amber-100 text-sm">Customize your experience</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* General Settings */}
        <Card className="p-5 border-amber-100">
          <div className="flex items-center gap-2 mb-4">
            <SettingsIcon className="w-5 h-5 text-amber-700" />
            <h2 className="text-lg text-gray-900">General</h2>
          </div>

          <div className="space-y-4">
            {/* Currency */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-gray-600" />
                <Label className="text-gray-700">Currency</Label>
              </div>
              <Select
                value={settings.currency}
                onValueChange={(value) => onUpdateSettings({ ...settings, currency: value })}
              >
                <SelectTrigger className="border-amber-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ZAR">South African Rand (R)</SelectItem>
                  <SelectItem value="USD">US Dollar ($)</SelectItem>
                  <SelectItem value="EUR">Euro (€)</SelectItem>
                  <SelectItem value="GBP">British Pound (£)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator className="bg-amber-100" />

            {/* Notifications */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-gray-600" />
                <Label className="text-gray-700">Notifications</Label>
              </div>
              <Switch
                checked={settings.notifications}
                onCheckedChange={(checked) => onUpdateSettings({ ...settings, notifications: checked })}
              />
            </div>
          </div>
        </Card>

        {/* Dietary Preferences */}
        <Card className="p-5 border-amber-100">
          <div className="flex items-center gap-2 mb-4">
            <Utensils className="w-5 h-5 text-amber-700" />
            <h2 className="text-lg text-gray-900">Dietary Preferences</h2>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Select your dietary requirements to see relevant dishes
          </p>
          <div className="flex flex-wrap gap-2">
            {dietaryOptions.map((pref) => (
              <Badge
                key={pref}
                onClick={() => toggleDietaryPreference(pref)}
                className={`cursor-pointer transition-all ${
                  settings.dietaryPreferences.includes(pref)
                    ? 'bg-amber-600 hover:bg-amber-700 text-white'
                    : 'bg-white hover:bg-amber-100 text-amber-900 border-amber-300'
                }`}
              >
                {pref}
              </Badge>
            ))}
          </div>
        </Card>

        {/* About */}
        <Card className="p-5 border-amber-100 bg-gradient-to-br from-amber-50 to-orange-50">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-amber-700" />
            <h2 className="text-lg text-gray-900">About</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <ChefHat className="w-12 h-12 text-amber-600 flex-shrink-0" />
              <div>
                <h3 className="text-amber-900 mb-1">Chef Christoffel</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Premium private dining experiences tailored to your preferences. Showcasing the finest 
                  South African and international cuisine with exceptional service.
                </p>
              </div>
            </div>
            <Separator className="bg-amber-200" />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Version</p>
                <p className="text-gray-900">1.0.0</p>
              </div>
              <div>
                <p className="text-gray-600">Platform</p>
                <p className="text-gray-900">Mobile App</p>
              </div>
            </div>
          </div>
        </Card>

        {/* App Info */}
        <div className="text-center text-sm text-gray-500 py-4">
          <p>Portfolio of Evidence Project</p>
          <p className="text-xs text-gray-400 mt-1">
            Cross-platform Menu Management System
          </p>
        </div>
      </div>
    </div>
  );
}
