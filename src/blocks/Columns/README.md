# Columns Block

A flexible columns block that allows content editors to create responsive column layouts with rich text content, perfect for creating structured information sections like location details, travel information, and more.

## Features

- **Configurable Column Count**: Choose between 2, 3, or 4 columns
- **Rich Text Content**: Each column supports full rich text editing with:
  - Headings (H1-H4) with tracking and proper typography
  - Paragraphs with elegant spacing
  - Lists with custom gold bullet points
  - Blockquotes with gold accent borders
  - Text formatting (bold, italic, etc.)
- **Background Options**: 
  - Three background color options: White (default), Light Gold, Charcoal
  - **Background Image Support**: Add decorative background images with automatic overlay
- **Enhanced Typography**: 
  - H4 headings automatically styled as uppercase section headers
  - Custom bullet points in gold for better visual hierarchy
  - Improved spacing and font weights for readability
- **Responsive Design**: Automatically stacks columns on mobile devices
- **Spacing Control**: Adjustable spacing between columns (Small, Medium, Large)
- **Smooth Animations**: Staggered fade-in animations for each column

## Usage

1. Add a Columns block to your page layout
2. Select the number of columns (2-4)
3. Choose your preferred background color
4. (Optional) Upload a background image for decorative patterns
5. Set the spacing between columns
6. Add rich text content to each column
   - Use H4 headings for section titles (e.g., "LOCATION", "GETTING TO EXPLORER")
   - Use bullet lists for structured information

## Example Structure

Perfect for creating layouts like:

**Left Column:**
- H4: "HOW TO FIND US"
- Descriptive paragraphs about the location

**Right Column:**
- H4: "LOCATION" 
- Bullet list with location details
- H4: "GETTING TO EXPLORER"
- Bullet list with travel information

## Responsive Behavior

- **Desktop**: Displays in the selected number of columns with proper spacing
- **Tablet**: Maintains column structure with adjusted spacing
- **Mobile**: Stacks all columns vertically for optimal readability

## Styling Features

- **Background Images**: When a background image is uploaded, it displays with a semi-transparent white overlay for content readability
- **Typography Hierarchy**: H4 headings are styled as uppercase section headers with proper spacing
- **Custom List Styling**: Bullet points use gold color to match the design system
- **Consistent Spacing**: Enhanced spacing between elements for better visual flow

## Technical Implementation

- Built with **React** and **TypeScript**
- Uses **Framer Motion** for smooth staggered animations
- Integrates with **Payload CMS** rich text editor and media uploads
- Responsive grid system with **Tailwind CSS**
- Support for background images with proper layering and overlays 