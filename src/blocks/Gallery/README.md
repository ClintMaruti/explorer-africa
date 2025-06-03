# Gallery Block

A comprehensive gallery block that displays collections of images in a responsive grid layout with lightbox functionality, perfect for showcasing accommodation photos, safari experiences, and other visual content.

## Features

- **Flexible Grid Layouts**: Choose from 2, 3, 4, or 5 columns
- **Multiple Aspect Ratios**: Square, Landscape, Portrait, Wide, or Original
- **Interactive Lightbox**: Full-screen image viewing with navigation
- **Image Management**: Upload multiple images with captions and alt text
- **Responsive Design**: Automatically adapts to different screen sizes
- **Smooth Animations**: Staggered load animations and hover effects
- **Accessibility**: Proper alt text and keyboard navigation support
- **Background Options**: White, Light Gold, or Charcoal backgrounds

## Configuration Options

### Content Settings
- **Gallery Title**: Optional title displayed above the gallery
- **Description**: Optional description text below the title
- **Images Array**: Upload multiple images with individual captions and alt text

### Layout Settings
- **Columns**: 2, 3, 4, or 5 column layouts
- **Aspect Ratio**: Control image proportions (Square, Landscape, Portrait, Wide, Auto)
- **Spacing**: None, Small, Medium, or Large gaps between images
- **Background Color**: White, Light Gold, or Charcoal

### Interactive Features
- **Enable Lightbox**: Allow full-screen image viewing (default: enabled)
- **Show Captions**: Display image captions below each image (default: enabled)

## Usage Examples

### 1. Safari Lodge Accommodation Gallery
```
Title: "Luxury Safari Accommodation"
Description: "Experience comfort in the heart of the Serengeti"
Layout: 4 Columns
Aspect Ratio: Landscape (4:3)
Spacing: Small
Enable Lightbox: Yes
Show Captions: Yes
```

### 2. Wildlife Photography Showcase
```
Title: "Captured Moments"
Layout: 3 Columns
Aspect Ratio: Square
Spacing: Medium
Background: Charcoal
Enable Lightbox: Yes
Show Captions: No
```

### 3. Lodge Facilities Overview
```
Title: "Our Facilities"
Description: "Every detail designed for your comfort"
Layout: 5 Columns
Aspect Ratio: Auto
Spacing: Small
Background: Light Gold
```

## Lightbox Features

When lightbox is enabled, users can:
- Click any image to open full-screen view
- Navigate between images with arrow buttons or keyboard
- Close with X button or escape key
- View image counter (current/total)
- Smooth animations for opening/closing

## Responsive Behavior

- **Mobile (< 768px)**: Always displays 2 columns regardless of setting
- **Tablet (768px - 1024px)**: Follows column setting but may reduce for smaller layouts
- **Desktop (> 1024px)**: Full column layout as configured

## Image Optimization

- Images automatically optimized with Next.js Image component in lightbox
- Responsive loading with proper sizing
- Hover effects with smooth scale transitions
- Lazy loading for performance

## Accessibility Features

- Proper alt text for all images
- Keyboard navigation in lightbox (arrow keys, escape)
- Focus management for modal
- Screen reader friendly structure
- High contrast controls in lightbox

## Best Practices

### Image Guidelines
- **Recommended Size**: 1200x800px for landscape images
- **File Format**: WebP or JPEG for best performance
- **File Size**: Keep under 500KB per image for optimal loading
- **Alt Text**: Always provide descriptive alt text for accessibility

### Layout Recommendations
- **2-3 Columns**: Best for detailed images that need larger display
- **4-5 Columns**: Ideal for galleries with many images
- **Square Aspect**: Perfect for consistent, grid-like layouts
- **Landscape**: Great for accommodation and facility photos

## Technical Implementation

- Built with **React** and **TypeScript**
- Uses **Framer Motion** for smooth animations and transitions
- Integrates with **Payload CMS** media management
- **Next.js Image** optimization in lightbox
- Responsive grid system with **Tailwind CSS**
- Keyboard and touch-friendly navigation 