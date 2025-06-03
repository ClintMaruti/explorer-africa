# Media Block with Menu Icons

A hero-style media block that displays background images with overlaid content and interactive menu icons for smooth navigation to page sections. Perfect for creating engaging landing sections with navigation elements.

## Features

- **Background Media**: Full-screen background images with overlay options
- **Rich Text Content**: Customizable content with proper typography
- **Interactive Menu Icons**: Clickable icons that smoothly scroll to page sections
- **Smooth Navigation**: JavaScript-powered smooth scrolling to targeted sections
- **Responsive Design**: Grid layout that adapts from mobile to desktop
- **Hover Effects**: Elegant icon animations and visual feedback
- **Background Options**: Light Gold or Charcoal overlays
- **CTA Links**: Optional call-to-action buttons

## Configuration Options

### Media Settings
- **Background Media**: Upload a hero image or video
- **Background Color**: Choose between Light Gold or Charcoal overlay

### Content Settings
- **Rich Text**: Full rich text editor with headings, paragraphs, lists, etc.
- **Links**: Up to 2 call-to-action buttons with custom styling

### Menu Icons
- **Icon Upload**: Upload SVG or PNG icons for each menu item
- **Menu Name**: Display text below each icon
- **Anchor ID**: Target section ID for smooth scrolling navigation
- **Maximum Items**: Up to 8 menu icons supported

## Menu Icons Setup

### 1. Configure Menu Icons
```
Icon: Upload restaurant.svg
Name: "Acacia Restaurant"
Anchor ID: "restaurant-section"
```

### 2. Configure Target Sections
Add corresponding anchor IDs to other blocks:
- Gallery Block: Set "restaurant-section" as Anchor ID
- Columns Block: Set "location-section" as Anchor ID
- ImageContent Block: Set "accommodation-section" as Anchor ID
- Map Block: Set "directions-section" as Anchor ID

### 3. Smooth Scrolling
The component automatically handles:
- Smooth scroll animation
- Proper scroll positioning
- Error handling for missing sections

## Usage Examples

### Safari Lodge Hero with Restaurant Menu
```
Background Media: lodge-aerial-view.jpg
Background Color: Charcoal
Rich Text: 
- H1: "Story of Delicious"
- H2: "CULINARY EXPERIENCES"
- Paragraph: Description of culinary offerings

Menu Icons:
1. restaurant-icon.svg | "Acacia Restaurant" | "restaurant-section"
2. bar-icon.svg | "Boma Restaurant" | "boma-section"
3. wine-icon.svg | "Divai Wine Cellar" | "wine-section"
4. pool-bar-icon.svg | "Kisimani Pool Bar" | "pool-section"
5. terrace-icon.svg | "Agama Terrace Bar" | "terrace-section"
6. coffee-icon.svg | "Kahawa Coffee Bar" | "coffee-section"
```

### Location Landing Page
```
Background Media: location-map-aerial.jpg
Background Color: Light Gold

Menu Icons:
1. location-icon.svg | "Our Location" | "location-section"
2. transport-icon.svg | "Getting Here" | "transport-section"
3. activities-icon.svg | "Activities" | "activities-section"
4. gallery-icon.svg | "Photo Gallery" | "gallery-section"
```

## Responsive Behavior

### Desktop (lg+)
- 6 columns grid for menu icons
- Larger icon sizes (80px)
- Enhanced hover effects

### Tablet (md)
- 3 columns grid for menu icons
- Medium icon sizes (64px)
- Touch-friendly spacing

### Mobile
- 2 columns grid for menu icons
- Smaller icon sizes (64px)
- Optimized for touch interaction

## Icon Design Guidelines

### Recommended Formats
- **SVG**: Best for scalability and quality
- **PNG**: With transparent background, 128x128px minimum

### Icon Styling
- Simple, clean designs work best
- Consider the overlay color when designing
- Icons are automatically styled based on background color:
  - **Charcoal background**: Icons inverted to white
  - **Light Gold background**: Icons remain original colors

## Navigation Setup Process

1. **Create MediaBlock** with menu icons
2. **Add target blocks** to the page
3. **Set anchor IDs** on target blocks
4. **Match anchor IDs** in menu icon configuration
5. **Test navigation** by clicking menu icons

## Accessibility Features

- **Keyboard Navigation**: All menu items are keyboard accessible
- **Screen Reader Support**: Proper ARIA labels and descriptions
- **Focus Management**: Clear focus indicators for navigation
- **Alt Text**: Automatic alt text generation for icons

## Animation Details

### Icon Animations
- **Entrance**: Staggered fade-in with upward motion
- **Hover**: Scale and lift effects with opacity changes
- **Click**: Gentle scale-down feedback

### Scroll Animation
- **Smooth Behavior**: CSS `scroll-behavior: smooth`
- **Block Positioning**: Scrolls to start of target section
- **Error Handling**: Graceful fallback if section not found

This MediaBlock creates an engaging hero section that doubles as a navigation hub, perfect for safari lodge websites, restaurant collections, or any site requiring visual navigation to different content sections. 