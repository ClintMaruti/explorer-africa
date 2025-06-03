# Map Block

A versatile map block that allows content editors to embed interactive maps with customizable settings, perfect for showing locations, directions, and geographical information.

## Features

- **Multiple Map Types**: 
  - Google Maps integration with API
  - Custom embed support for any map service
- **Location Configuration**:
  - Latitude/Longitude coordinates for precise positioning
  - Address-based location search
  - Fallback to default location (Serengeti National Park)
- **Customizable Display**:
  - Multiple height options (300px to 600px)
  - Border radius control
  - Map mode selection (Roadmap, Satellite, Hybrid, Terrain)
  - Zoom level control (1-20)
- **User Experience**:
  - Responsive design for all devices
  - Smooth fade-in animations
  - Optional map title
  - Location information display
  - Fullscreen support
- **Accessibility**: Proper iframe titles and fallback content

## Configuration Options

### Basic Settings
- **Map Title**: Optional title displayed above the map
- **Map Type**: Choose between Google Maps or custom embed
- **Height**: Small (300px), Medium (400px), Large (500px), or Extra Large (600px)
- **Border Radius**: None, Small, Medium, or Large

### Location Settings
- **Coordinates**: Enter precise latitude and longitude
- **Address**: Use address or location name for Google Maps search
- **Custom Embed URL**: Full embed URL for custom map services

### Google Maps Specific
- **Zoom Level**: Control zoom level (1-20)
- **Map Mode**: Roadmap, Satellite, Hybrid, or Terrain view
- **Show Controls**: Enable/disable map controls
- **Fullscreen**: Allow fullscreen viewing

## Usage Examples

### 1. Safari Lodge Location
```
Title: "Find Our Lodge"
Coordinates: -2.583333, 34.833333 (Serengeti coordinates)
Height: Large
Map Mode: Satellite
Zoom Level: 15
```

### 2. Airport Transfer Route
```
Title: "Getting to Explorer"
Address: "Seronera Airport, Tanzania"
Height: Medium
Map Mode: Roadmap
Zoom Level: 12
```

### 3. Custom Map Integration
```
Map Type: Custom Embed
Embed URL: [Your custom map embed URL]
Height: Extra Large
Border Radius: Medium
```

## Setup Instructions

### For Google Maps (Recommended)
1. Get a Google Maps API key from Google Cloud Console
2. Add `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key` to your `.env.local` file
3. Enable Maps Embed API in your Google Cloud project

### For Custom Maps
1. Get the embed URL from your preferred map service
2. Select "Custom Embed" as map type
3. Paste the full embed URL

## Example Locations for Safari Context

- **Serengeti National Park**: `-2.583333, 34.833333`
- **Ngorongoro Crater**: `-3.2, 35.5`
- **Kilimanjaro Airport**: `-3.429, 37.074`
- **Arusha**: `-3.367, 36.683`

## Responsive Behavior

- **Desktop**: Full-width map with configured height
- **Tablet**: Maintains aspect ratio with responsive sizing
- **Mobile**: Full-width with optimized touch interactions

## Technical Implementation

- Built with **React** and **TypeScript**
- Uses **Framer Motion** for smooth animations
- Integrates with **Google Maps Embed API**
- Supports custom iframe embeds
- Responsive design with **Tailwind CSS**
- Proper accessibility attributes and error handling 