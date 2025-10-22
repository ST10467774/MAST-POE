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
  ![MAST PROJECT 1](https://github.com/user-attachments/assets/efad2e4e-5268-4123-8d83-f20f97e2ae08)
  ![MAST PROJECT 2](https://github.com/user-attachments/assets/767db135-6dbd-4942-b555-d092a2909dab)
  ![MAST PROJECT 3](https://github.com/user-attachments/assets/7c93c0e6-d977-4392-b5dc-a452379cbf2c)


  ## 10. Changelog
All notable changes to the MAST POE project will be documented in this file.

## Version 2.0.0 (October 22, 2025) - Complete React Native Migration

### 🎉 Major Release: Full React Native Conversion

This release represents a complete architectural transformation from web-based React to **pure React Native for mobile applications**.

### Changed - Complete Platform Migration

#### ✅ UI Components Converted (47 components)
All UI components migrated from web libraries to React Native:

**Removed Web Dependencies:**
- ❌ `@radix-ui/*` (all packages)
- ❌ `class-variance-authority`
- ❌ `react-dom`
- ❌ `lucide-react`
- ❌ `next-themes`
- ❌ `sonner`
- ❌ `vaul`
- ❌ `cmdk`
- ❌ `react-day-picker`
- ❌ `embla-carousel-react`
- ❌ `react-resizable-panels`
- ❌ `clsx`
- ❌ `tailwind-merge`
- ❌ `recharts`
- ❌ `input-otp`

**Added React Native Implementations:**
- ✅ `accordion.tsx` - Animated collapsible component
- ✅ `alert.tsx` - Native View-based alerts with variants
- ✅ `alert-dialog.tsx` - Modal-based dialog with Context API
- ✅ `aspect-ratio.tsx` - Calculated dimension component
- ✅ `avatar.tsx` - Image with fallback support
- ✅ `badge.tsx` - View-based badge component
- ✅ `breadcrumb.tsx` - Horizontal ScrollView navigation
- ✅ `button.tsx` - TouchableOpacity with variants (default, outline, ghost, destructive, link)
- ✅ `calendar.tsx` - Custom calendar implementation
- ✅ `card.tsx` - View-based card components (Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter)
- ✅ `carousel.tsx` - Horizontal ScrollView carousel
- ✅ `chart.tsx` - Custom chart rendering
- ✅ `checkbox.tsx` - TouchableOpacity with check state
- ✅ `collapsible.tsx` - Animated collapse component
- ✅ `command.tsx` - Command palette with Modal
- ✅ `context-menu.tsx` - Long-press context menu
- ✅ `dialog.tsx` - Modal-based dialog
- ✅ `drawer.tsx` - Bottom sheet drawer Modal
- ✅ `dropdown-menu.tsx` - Modal-based dropdown picker
- ✅ `form.tsx` - React Native compatible form wrapper
- ✅ `hover-card.tsx` - Pressable tooltip component
- ✅ `input.tsx` - TextInput component
- ✅ `input-otp.tsx` - Custom OTP input
- ✅ `label.tsx` - Text label component
- ✅ `menubar.tsx` - Horizontal menu bar
- ✅ `navigation-menu.tsx` - Navigation structure
- ✅ `pagination.tsx` - TouchableOpacity pagination buttons
- ✅ `popover.tsx` - Modal-based popover
- ✅ `progress.tsx` - Animated progress bar
- ✅ `radio-group.tsx` - TouchableOpacity radio group
- ✅ `resizable.tsx` - PanResponder resizable panels
- ✅ `scroll-area.tsx` - ScrollView wrapper
- ✅ `select.tsx` - Native Picker/Modal select
- ✅ `separator.tsx` - View divider
- ✅ `sheet.tsx` - Side drawer Modal
- ✅ `sidebar.tsx` - Drawer layout component
- ✅ `skeleton.tsx` - Animated skeleton loader
- ✅ `slider.tsx` - Native Slider component
- ✅ `sonner.tsx` - Custom toast notification
- ✅ `switch.tsx` - Native Switch component
- ✅ `table.tsx` - ScrollView with View-based table
- ✅ `tabs.tsx` - Native tab implementation
- ✅ `textarea.tsx` - Multiline TextInput
- ✅ `toast.tsx` - Animated toast notifications
- ✅ `toggle.tsx` - TouchableOpacity toggle
- ✅ `toggle-group.tsx` - Button group component
- ✅ `tooltip.tsx` - Animated tooltip
- ✅ `use-mobile.ts` - Dimensions API hook
- ✅ `utils.ts` - StyleSheet utility functions

#### ✅ Screen Components Verified (8 screens)
All screen components confirmed to be React Native compatible:
- ✅ `HomeScreen.tsx` - Dashboard with menu items
- ✅ `AddMenuItems.tsx` - Add/edit menu form
- ✅ `MenuDetails.tsx` - Dish details view
- ✅ `FavoritesScreen.tsx` - Saved dishes list
- ✅ `FilterMenu.tsx` - Advanced filtering
- ✅ `SearchScreen.tsx` - Search functionality
- ✅ `SettingsScreen.tsx` - App settings
- ✅ `BottomNavigation.tsx` - Tab navigation

#### ✅ Styles Converted (4 files)
- ✅ `styles/globals.ts` - Converted from CSS to React Native theme objects
  - Removed `:root` and `.dark` CSS selectors
  - Converted `oklch()` colors to hex/rgba format
  - Added `fonts` object (sizes, weights)
  - Added `spacing` object (xs to 3xl)
  - Added `borderRadius` object
  - Added `themeColors` object (light & dark themes)
  - Added `typography` presets (h1-h4, p, label, button, input, small)
  - Added `getThemeColors()` helper function
- ✅ `styles/colors.ts` - Already React Native compatible
- ✅ `styles/ThemeContext.tsx` - Already React Native compatible
- ✅ `styles/useTheme.ts` - Already using Appearance API

### Added
- **react-native-vector-icons** - Icon library (MaterialIcons, Feather)
- **@react-native-community/slider** - Native slider component
- **@react-native-picker/picker** - Native picker component
- **Context API** implementations for complex components
- **Animated API** for smooth animations
- **StyleSheet.create()** for all component styling
- **TypeScript interfaces** for all component props

### Technical Changes

#### API Pattern Changes
- `className` → `style` (StyleSheet objects)
- `onClick` → `onPress`
- `onChange` → `onChangeText` (for TextInput)
- HTML elements → React Native components:
  - `<div>` → `<View>`
  - `<span>` → `<Text>`
  - `<button>` → `<TouchableOpacity>`
  - `<input>` → `<TextInput>`
  - `<img>` → `<Image>`

#### Styling Changes
- CSS classes → StyleSheet objects
- CSS animations → Animated API
- CSS variables → JavaScript objects
- Tailwind classes → React Native flexbox
- Media queries → Dimensions API
- Hover states → Pressable handlers

### Quality Assurance
- ✅ **0 TypeScript errors** across entire codebase
- ✅ All components use pure React Native APIs
- ✅ No web-specific code remaining
- ✅ Proper TypeScript interfaces for all components
- ✅ Consistent styling patterns
- ✅ Theme support (light/dark mode) functional

### Breaking Changes
⚠️ This is a major version upgrade with breaking changes:

1. **Component APIs** - All props changed from web to React Native patterns
2. **Event Handlers** - Use React Native event types (onPress, onChangeText, etc.)
3. **Styling** - Must use StyleSheet objects instead of className strings
4. **Platform** - Now mobile-only (iOS/Android via Expo)
5. **Dependencies** - All web libraries removed

### Migration Guide
If updating from v1.x:
1. Replace `className` props with `style` props
2. Replace `onClick` with `onPress`
3. Update event handlers to React Native patterns
4. Convert any custom CSS to StyleSheet.create()
5. Test on physical device or emulator

---

## Version 1 (October 2025)

#### Added
- Initial project setup and repository creation
- Complete menu management system for Chef Christoffel's Food App
- Home screen dashboard with featured dishes display
- Add menu item functionality with form validation
- Menu item details view with full dish information
- Search functionality for dishes by name or keyword
- Favorites system allowing users to save preferred dishes
- Filter menu by course type (Starters, Mains, Desserts)
- Advanced filtering by price range and dietary preferences
- Settings screen with currency, theme, and notification preferences
- Bottom navigation for easy screen switching
- UI component library integration (custom components in `/src/components/ui/`)
- TypeScript support for type safety
- React Native StyleSheet for cross-platform styling

#### Fixed
- OTA (Over-The-Air) updates disabled in app.json for local development
- ScrollArea component made cross-platform (web div + native ScrollView)
- Type declarations added for Radix ScrollArea components
- Form validation errors for required fields
- Terminal and console error handling

#### Changed
- Updated folder structure for better organization
- Improved CSS/styling implementation with global styles
- Refactored package.json dependencies
- Updated tsconfig.json to include proper type declarations
- Enhanced UI components for better user experience

#### Technical Improvements
- Installed and configured npm packages for UI components
- Added local Radix ScrollArea type declarations
- Implemented AsyncStorage for data persistence
- Created modular component architecture
- Set up GitHub repository with proper documentation

---

## 11. References
#### Core Technologies
*  **React Native Documentation**  
   React Native · Learn once, write anywhere  
   https://reactnative.dev/docs/getting-started  
   Accessed: October 2025
*  **TypeScript Documentation**  
   TypeScript: JavaScript With Syntax For Types  
   https://www.typescriptlang.org/docs/  
   Accessed: October 2025
*  **Expo Documentation**  
   Expo Documentation  
   https://docs.expo.dev/  
   Accessed: October 2025
*  **React Documentation**  
   React – A JavaScript library for building user interfaces  
   https://react.dev/  
   Accessed: October 2025
#### Navigation & UI Libraries
*  **React Navigation**  
   React Navigation · Routing and navigation for React Native apps  
   https://reactnavigation.org/docs/getting-started  
   Accessed: October 2025
*  **React Native Vector Icons**  
   oblador/react-native-vector-icons: Customizable Icons for React Native  
   https://github.com/oblador/react-native-vector-icons  
   Accessed: October 2025
*  **React Native Community Slider**  
   @react-native-community/slider  
   https://github.com/callstack/react-native-slider  
   Accessed: October 2025
*  **React Native Picker**  
   @react-native-picker/picker  
   https://github.com/react-native-picker/picker  
   Accessed: October 2025
### Learning Resources
*  **React Native Tutorial - Meta**  
   Introduction · React Native  
   https://reactnative.dev/docs/tutorial  
   Accessed: October 2025
*  **TypeScript Handbook**  
    The TypeScript Handbook  
    https://www.typescriptlang.org/docs/handbook/intro.html  
    Accessed: October 2025
*  **React Hooks Documentation**  
    Hooks API Reference – React  
    https://react.dev/reference/react  
    Accessed: October 2025
*  **FlatList Performance Guide**  
    FlatList · React Native  
    https://reactnative.dev/docs/flatlist  
    Accessed: October 2025
### Design & Styling

*  **React Native StyleSheet**  
    StyleSheet · React Native  
    https://reactnative.dev/docs/stylesheet  
    Accessed: October 2025
*  **React Native Animated API**  
    Animated · React Native  
    https://reactnative.dev/docs/animated  
    Accessed: October 2025
*  **React Native Appearance API**  
    Appearance · React Native  
    https://reactnative.dev/docs/appearance  
    Accessed: October 2025
### Development Tools
*  **Expo CLI Documentation**  
    Expo CLI - Expo Documentation  
    https://docs.expo.dev/workflow/expo-cli/  
    Accessed: October 2025
*  **Metro Bundler**  
    Metro · The JavaScript Bundler for React Native  
    https://facebook.github.io/metro/  
    Accessed: October 2025
*  **VS Code for React Native**  
    React Native Tools - Visual Studio Marketplace  
    https://marketplace.visualstudio.com/items?itemName=msjsdiag.vscode-react-native  
    Accessed: October 2025
### Best Practices & Patterns
*  **React Native Performance**  
    Performance Overview · React Native  
    https://reactnative.dev/docs/performance  
    Accessed: October 2025
*  **React Context API Guide**  
    Context – React  
    https://react.dev/reference/react/useContext  
    Accessed: October 2025
*  **TypeScript with React Native**  
    Using TypeScript · React Native  
    https://reactnative.dev/docs/typescript  
    Accessed: October 2025
*  **React Native Accessibility**  
    Accessibility · React Native  
    https://reactnative.dev/docs/accessibility  
    Accessed: October 2025
### GitHub & Version Control
*  **GitHub Docs - Repository Management**  
    About repositories - GitHub Docs  
    https://docs.github.com/en/repositories  
    Accessed: October 2025
*  **Git Documentation**  
    Git - Documentation  
    https://git-scm.com/doc  
    Accessed: October 2025
### Community Resources
*  **Stack Overflow - React Native**  
    Newest 'react-native' Questions  
    https://stackoverflow.com/questions/tagged/react-native  
    Accessed: October 2025
*  **React Native Community**  
    React Native Community  
    https://github.com/react-native-community  
    Accessed: October 2025
*  **Expo Forums**  
    Expo Forums  
    https://forums.expo.dev/  
    Accessed: October 2025
### Migration Guides
*  **React Native Upgrade Helper**  
    React Native Upgrade Helper  
    https://react-native-community.github.io/upgrade-helper/  
    Accessed: October 2025
*  **Migrating from Web to React Native**  
    Out-of-Tree Platforms · React Native  
    https://reactnative.dev/docs/out-of-tree-platforms  
    Accessed: October 2025
### Testing & Quality
*  **React Native Testing Library**  
    React Native Testing Library  
    https://callstack.github.io/react-native-testing-library/  
    Accessed: October 2025
*  **TypeScript ESLint**  
    typescript-eslint  
    https://typescript-eslint.io/  
    Accessed: October 2025
### Additional Resources
*  **NPM Documentation**  
    npm Docs  
    https://docs.npmjs.com/  
    Accessed: October 2025
*  **Node.js Documentation**  
    Node.js Documentation  
    https://nodejs.org/en/docs/  
    Accessed: October 2025
*   **MDN Web Docs - JavaScript**  
    JavaScript | MDN  
    https://developer.mozilla.org/en-US/docs/Web/JavaScript  
    Accessed: October 2025
*   **React Native Directory**  
    React Native Directory  
    https://reactnative.directory/  
    Accessed: October 2025
### Academic & Tutorial Resources
*  **freeCodeCamp - React Native Tutorial**  
    React Native Tutorial for Beginners  
    https://www.freecodecamp.org/news/react-native-tutorial/  
    Accessed: October 2025
*  **Microsoft Learn - React Native**  
    Introduction to React Native - Learn | Microsoft Docs  
    https://learn.microsoft.com/en-us/training/modules/react-native-introduction/  
    Accessed: October 2025
### Image & Asset Resources
*  **React Native Image Component**  
    Image · React Native  
    https://reactnative.dev/docs/image  
    Accessed: October 2025
*  **SVG Support in React Native**  
    react-native-svg  
    https://github.com/software-mansion/react-native-svg  
    Accessed: October 2025
### License Information
*  **React Native License**  
    React Native is MIT licensed  
    https://github.com/facebook/react-native/blob/main/LICENSE  
    Accessed: October 2025

---

## Attribution

This project uses open-source software licensed under various licenses including MIT, Apache 2.0, and BSD. All third-party libraries and dependencies are used in accordance with their respective licenses.

### Key Contributors
- **Facebook/Meta Open Source** - React Native core framework
- **Expo Team** - Expo development platform and tools
- **React Navigation Team** - Navigation library
- **React Native Community** - Community-maintained packages and tools

### Development Team
- **Student ID:** ST10467774
- **Project:** MAST POE - Chef Christoffel's Menu Management App
- **Institution:** [Your Institution Name]
- **Course:** Mobile Application Software Technology
- **Year:** 2025




  


