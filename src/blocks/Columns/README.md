# Columns Block

A flexible columns block that allows content editors to create responsive column layouts with rich text content, perfect for creating structured information sections like location details, travel information, and more.

## Features

- **Configurable Column Count**: Choose between 2, 3, or 4 columns
- **Header Content for Multi-Column Layouts**: 
  - **Rich Text Header**: Add titles, descriptions, or introductory content above 3+ column layouts
  - **Center-Aligned Styling**: Headers are automatically styled with center alignment and proper spacing
  - **Conditional Display**: Header option only appears when using 3 or 4 columns
- **Advanced Stacking Control**: 
  - **Stack Order**: Control how columns reorder when stacked on mobile (Normal, Reverse, Alternate)
  - **Stack Breakpoint**: Choose when columns stack (Small/640px, Medium/768px, Large/1024px)
  - **Vertical Alignment**: Align columns on desktop (Top, Center, Bottom, Stretch for equal height)
- **Border Lines Between Columns**:
  - **Toggle Borders**: Enable or disable separator lines between columns
  - **Border Position**: Choose vertical (between columns), horizontal (below columns when stacked), or both
  - **Border Styles**: Solid, dashed, or dotted line styles
  - **Border Colors**: Gold, light gray, dark gray, charcoal, or white
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
- **Responsive Design**: Fully responsive with customizable stacking behavior
- **Spacing Control**: Adjustable spacing between columns (Small, Medium, Large)
- **Smooth Animations**: Staggered fade-in animations for each column

## Header Content Features

### When Available
- **3+ Columns Only**: Header content field appears only when 3 or 4 columns are selected
- **Optional**: Header content is completely optional - leave blank for columns-only layout

### Header Styling
- **Center-Aligned**: All header content is automatically center-aligned for visual balance
- **Large Typography**: Headers use larger font sizes compared to column content
- **Proper Spacing**: Generous spacing between header and columns for clear hierarchy
- **Responsive**: Header text scales appropriately across all devices

### Header Content Types
- **Main Titles**: Use H1-H4 headings for section titles
- **Descriptions**: Add paragraphs to introduce the content below
- **Lists**: Include bullet points or numbered lists for structured information
- **Quotes**: Add blockquotes for testimonials or highlighted information

## New Stacking Features

### Stack Order Options
- **Normal**: Columns stack in their original order (1st, 2nd, 3rd, 4th)
- **Reverse**: Columns stack in reverse order (4th, 3rd, 2nd, 1st)  
- **Alternate**: Odd columns first, then even columns (1st, 3rd, 2nd, 4th)

### Vertical Alignment Options
- **Top**: Columns align to the top (default)
- **Center**: Columns align to their center
- **Bottom**: Columns align to the bottom
- **Stretch**: Columns stretch to equal height

### Stack Breakpoints
- **Small (640px)**: Columns stack below small tablet size
- **Medium (768px)**: Columns stack below medium tablet size (default)
- **Large (1024px)**: Columns stack below desktop size

## Border Line Features

### Border Position Options
- **Vertical**: Shows borders between columns on desktop (hidden when stacked)
- **Horizontal**: Shows borders below each column when stacked on mobile
- **Both**: Shows vertical borders on desktop and horizontal borders on mobile

### Border Style Options
- **Solid Line**: Clean, continuous border line (default)
- **Dashed Line**: Segmented dashed border for subtle separation
- **Dotted Line**: Dotted border for decorative effect

### Border Color Options
- **Gold**: Matches the site's accent color for elegant separation
- **Light Gray**: Subtle, unobtrusive borders (default)
- **Dark Gray**: More prominent borders for stronger separation
- **Charcoal**: High contrast borders
- **White**: For use on dark backgrounds

## Usage

1. Add a Columns block to your page layout
2. Select the number of columns (2-4)
3. **NEW**: Add header content (only available for 3+ columns):
   - Add a section title, description, or introductory text
   - Use rich text formatting for styling
   - Content will be center-aligned above the columns
4. Choose your preferred background color
5. (Optional) Upload a background image for decorative patterns
6. Set the spacing between columns
7. Configure stacking behavior:
   - Choose when columns should stack (breakpoint)
   - Set the stacking order for mobile devices
   - Choose vertical alignment for desktop
8. Configure border lines (optional):
   - Enable "Show Border Lines Between Columns"
   - Choose border position (vertical, horizontal, or both)
   - Select border style (solid, dashed, dotted)
   - Pick border color to match your design
9. Add rich text content to each column
   - Use H4 headings for section titles (e.g., "LOCATION", "GETTING TO EXPLORER")
   - Use bullet lists for structured information

## Example Structure

Perfect for creating layouts like:

**Header Section (3+ columns only):**
- H2: "Explore Our Facilities"
- Paragraph: "Discover the unique experiences and amenities available at our location"

**Left Column:**
- H4: "HOW TO FIND US"
- Descriptive paragraphs about the location

**Middle Column:**
- H4: "LOCATION" 
- Bullet list with location details

**Right Column:**
- H4: "GETTING TO EXPLORER"
- Bullet list with travel information

*With optional gold vertical borders between columns for visual separation*

## Responsive Behavior

- **Header Content**: Displays above columns on all screen sizes with center alignment
- **Desktop**: Displays in the selected number of columns with chosen vertical alignment
  - **Vertical borders** appear between columns if enabled
- **Tablet/Mobile**: Stacks according to the selected breakpoint and stack order
  - **Horizontal borders** appear below each column if enabled
  - **Vertical borders** are hidden when columns stack
- **Flexible**: Customize exactly when and how columns stack for different content types

## Styling Features

- **Background Images**: When a background image is uploaded, it displays with a semi-transparent white overlay for content readability
- **Typography Hierarchy**: H4 headings are styled as uppercase section headers with proper spacing
- **Custom List Styling**: Bullet points use gold color to match the design system
- **Consistent Spacing**: Enhanced spacing between elements for better visual flow
- **Equal Height Columns**: Use stretch alignment for columns of equal height
- **Smart Border Positioning**: Borders automatically adapt to responsive layout changes
- **Header Integration**: Seamless integration between header content and column layouts

## Technical Implementation

- Built with **React** and **TypeScript**
- Uses **Framer Motion** for smooth staggered animations
- Integrates with **Payload CMS** rich text editor and media uploads
- Responsive grid system with **Tailwind CSS**
- Support for background images with proper layering and overlays 
- **Advanced responsive controls** for precise layout control
- **Smart border system** that adapts to different screen sizes and column arrangements
- **Conditional header rendering** with specialized typography converters 