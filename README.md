# ST10467774-MAST POE 
####  Github link:https://github.com/ST10467774/MAST-POE/tree/master 

## 1. App Overview

Chef Christoffel’s Food App is a mobile digital menu and management system designed for private dining experiences. It allows Chef Christoffel to add, edit, and display menu items, while clients can browse, search, and filter meals to suit their preferences.

The app provides an elegant mobile-first experience with smooth navigation and a high-end restaurant feel, showcasing the chef’s brand and professionalism.

## Purpose and Target Users

Purpose: To streamline menu management and enhance the client dining experience.

### Target Users:

Chef Christoffel (admin)  manages menu items, pricing, and details.

Clients/Guests: Browse and explore the menu, filter by dietary needs and mark favorites.

## South African Context (ZAR Currency)

All pricing is displayed in South African Rands (R) to reflect the local market, but there is also options to use other currencies if it is confenient for the user.
* Example: R350 for a main cource, R120 for desert.

## 2. Complete Feature List (10 Major Features)

### 2.1 Home Screen Dashboard

* Displays featured dishes, daily menu, and elegant imagery.
* Quick access to dish categories (Starters, Mains, Desserts).

### 2.2 Add Menu Item (Admin Form)

* Chef can add new dishes with name, price (in Rands), description, image URL, and dietary type.
* Includes form validation and error handling.

### 2.3 Menu Item Details View

* Shows full dish information: image, ingredients, dietary info, wine pairing, and allergens.
* Button to “Add to Favorites”.

### 2.4 Search Functionality

* Users can search by dish name or keyword.
* Smart suggestions show popular searches.

### 2.5 Favorites System

* Clients can save dishes they love and view them later in the “Favorites” tab.

### 2.6 Filter Menu (Course, Price, Allergens)

* Filters dishes by course type, dietary preference, and price range (R0–R1000).

### 2.7 Settings Customization

* Manage dietary preferences (e.g., vegetarian, gluten-free).
* Toggle notifications or contact the chef.

### 2.8 Data Persistence

* Local data storage ensures dishes and favorites remain after the app is closed.
* Uses AsyncStorage in React Native.

### 2.9 Mobile-First Design

* Fully optimized for Android and iOS using React Native.
* Touch-friendly buttons and smooth navigation.

### 2.10 Bottom Navigation Bar

* Tabs for Home, Search, Add, Favorites, and Settings.
* Built using React Navigation with Ionicons icons.

## 3. Detailed How-To Guide for Chef Christoffel
### Getting Started

* Open the app on your mobile device or emulator.
* You’ll see the Home Screen with the daily menu.
* Use the bottom navigation to explore different sections.

### 3.1 Adding New Dishes

* Tap “Add” from the bottom navigation.
* Fill in the fields: Dish Name, Price (R), Description, and Dietary Info.
* Tap “Add Dish” to save it, it appears instantly on the Home Screen.
* Error messages will appear if required fields are empty or price is invalid.

### 3.2 Managing Dishes

* View Dishes: All added dishes show on the Home Screen.
* Favorite Dishes: Tap the “❤️ Add to Favorites” button on the Details Screen.
* Delete (Optional Feature): Future update could allow removing old dishes.

### 3.3 Finding Dishes

* Tap Search in the bottom navigation.
* Type part of the dish name or ingredient.
* Apply filters for course type, price range, or dietary restrictions.

### 3.4 Client Presentations

* Use the app during private events to show the day’s curated menu.
* Allow guests to browse dishes, read descriptions, and view wine pairings.

### 3.5 Menu Planning Tips

* Keep menu categories balanced: Starters, Mains, Desserts.
* Rotate dishes weekly to keep offerings fresh.
* Ensure price consistency and highlight premium dishes.

## 4. Best Practices

### 4.1 Menu Management Tips

* Use descriptive dish names and high-quality images.
* Regularly update seasonal ingredients and specials.

### 4.2 Client Experience Guidelines

* Keep the app elegant and simple for clients to browse.
* Highlight signature dishes and chef’s recommendations.

### 4.3 Presentation Recommendations

* Use consistent colors, fonts, and spacing for a professional look.
* Keep prices visible and pair each dish with appropriate wine suggestions.

## 5. Menu Structure

### 5.1 Pricing Strategies

* Keep main courses between R250–R450.
* Offer premium tasting experiences around R890 per person.

### 5.2 Course Organisation

* Appetizers 
* Soups 
* Mains 
* Desserts 
* Beverages

## 6. Technical Information

#### 6.1 Built With: React Native, TypeScript, React Navigation, Vector Icons
#### 6.2 Local Storage: AsyncStorage (for saving dishes and favorites)
#### 6.3 Performance: Optimized for mobile rendering and touch inputs
#### 6.4 Compatibility: Android and iOS (Expo environment)
#### 6.5 Architecture:
* Components: HomeScreen, AddScreen, DetailsScreen, SearchScreen, FavouritesScreen, SettingsScreen
* Central Navigation: AppNavigator
* Styling: styles.ts using React Native’s StyleSheet.create()

## 7. Portfolio of Evidence (PoE) Value

### 7.1 Skills Demonstrated

* React Native development
* Component-based architecture
* Error handling and validation
* UI/UX planning and wireframing
* Local storage integration

### 7.2 Learning Outcomes

* Developed a cross-platform mobile app.
* Showed understanding of data flow, user interaction, and design logic.
* Applied best practices for user-friendly mobile app design.

### 7.2 Professional Features

* Uses responsive design
* Polished user interface
* Clean navigation and component separation

## 8. Common Questions & Support

### 8.1 FAQ

* Q: Can clients edit dishes?
* A: No, only Chef Christoffel (admin) can add or edit dishes.

* Q: What happens if the app crashes or closes?
* A: All data (dishes and favorites) are stored locally and remain available.

* Q: Can this app go online?
* A: Yes. In Part 3, it can connect to a real backend (like Supabase or Firebase).

### 8.2 Troubleshooting

* Ensure all form fields are filled when adding a dish.
* Restart the app if local data does not refresh immediately.
* Check for internet access if using online image URLs.

### 8.3 Data Management

* Uses AsyncStorage for persistence.
* You can clear stored data by uninstalling the app.

  ## 9. Screenshots

  

  ## 10. Changelog




  ## 11. References




