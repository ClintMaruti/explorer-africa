# Room Rates Feature Setup

This document explains how to set up and use the Room Rates feature that displays room pricing tables and collapsible sections for rate inclusions and lodge experiences.

## What's Been Implemented

### 1. Collections Created
- **Room Rates** (`room-rates`) - Stores pricing data by year
- **Rate Inclusions** (`rate-inclusions`) - Stores what's included/excluded for each rate type
- **Lodge Experiences** (`lodge-experiences`) - Stores in-lodge activities and experiences

### 2. Block Component
- **Room Rates Block** - A content block that can be added to any page
- Displays room rates table with seasonal pricing
- Shows collapsible sections for rate inclusions and lodge experiences
- Responsive design with modern UI

## Setup Instructions

### 1. Start the Development Server
```bash
pnpm dev
```

### 2. Access Payload Admin
1. Go to `http://localhost:3000/admin`
2. Create an admin user if you haven't already

### 3. Create Sample Data

#### Room Rates Collection
1. Go to Collections → Room Rates
2. Create a new entry with:
   - **Year**: 2025
   - **Accommodation Types**:
     
     **Savannah Room (68 total)**:
     - Full Board:
       - Double: Peak 1,450 | High 1,200 | Mid 900 | Low 750
       - Single: Peak 975 | High 850 | Mid 700 | Low 625
       - Triple: Peak 1,980 | High 1,700 | Mid 1,360 | Low 1,190
     - Game Package:
       - Double: Peak 1,930 | High 1,680 | Mid 1,380 | Low 1,230
       - Single: Peak 1,215 | High 1,090 | Mid 940 | Low 865
       - Triple: Peak 2,700 | High 2,420 | Mid 2,080 | Low 1,910

     **Savannah Suite (5 total)**:
     - Full Board:
       - Double: Peak 2,010 | High 1,760 | Mid 1,460 | Low 1,310
       - Single: Peak 1,255 | High 1,130 | Mid 980 | Low 905
       - Triple: Peak 2,610 | High 2,330 | Mid 1,990 | Low 1,820
     - Game Package:
       - Double: Peak 2,490 | High 2,240 | Mid 1,940 | Low 1,790
       - Single: Peak 1,495 | High 1,370 | Mid 1,220 | Low 1,145
       - Triple: Peak 3,330 | High 3,050 | Mid 2,710 | Low 2,540

     **Chief's Suite (1 total)**:
     - Full Board Per Room: Peak 3,500 | High 3,250 | Mid 2,950 | Low 2,800
     - Game Package Per Room: Peak 4,270 | High 4,020 | Mid 3,720 | Low 3,570

#### Rate Inclusions Collection
1. Go to Collections → Rate Inclusions
2. Create entries for:

   **Game Package (GP)** (Order: 0, Default Open: true):
   - **Includes**: Twice-daily shared game drives plus transfers to and from the designated airstrips (Seronera), accommodation, laundry services, all meals (breakfast, lunch and dinner), soft drinks, house beers, house wines and selected house spirits, teas, coffees, and refreshments (on the property and during game-drives).
   - **Excludes**: Transfers (other than to and from our designated airstrips), items of a personal nature, extra meals or any additional dining experiences outside of the designated meal plan, flying doctors' medical evacuation insurance, flights & airport taxes, gratuities, park fees, conservancy fees, and camping fees - where applicable.

   **Full Board (FB)** (Order: 1):
   - **Includes**: [Add content for Full Board inclusions]
   - **Excludes**: [Add content for Full Board exclusions]

   **Half Board (HB)** (Order: 2):
   - **Includes**: [Add content for Half Board inclusions]
   - **Excludes**: [Add content for Half Board exclusions]

   **Bed & Breakfast (BB)** (Order: 3):
   - **Includes**: [Add content for B&B inclusions]
   - **Excludes**: [Add content for B&B exclusions]

#### Lodge Experiences Collection
1. Go to Collections → Lodge Experiences
2. Create entries for:

   **The Serengeti 'Guided' Talk** (Order: 0, Default Open: true):
   - **Description**: Guests can enjoy tales of the Serengeti - from early man to the formation of the Serengeti as we know it today - courtesy of Explorer's Serengeti specialist. This informative talk will last up to 1 hour during which time guests will be offered light refreshments, and be invited to visit to the Serengeti Information Centre.
   - **Details**:
     - Rate: Complimentary
     - Duration: Up to 1 hour or at guests' leisure

   **'Explorer' Birding Tour** (Order: 1):
   - **Description**: [Add birding tour description]
   - **Details**: [Add relevant details]

   **'Explorer' Star Gazing** (Order: 2):
   - **Description**: [Add star gazing description]
   - **Details**: [Add relevant details]

   **'Silent' Outdoor Cinema** (Order: 3):
   - **Description**: [Add cinema description]
   - **Details**: [Add relevant details]

   **Wildlife Photographic Hide** (Order: 4):
   - **Description**: [Add hide description]
   - **Details**: [Add relevant details]

   **Photographic Studio & Camera Rental** (Order: 5):
   - **Description**: [Add studio description]
   - **Details**: [Add relevant details]

   **Yoga, Meditation, & Fitness** (Order: 6):
   - **Description**: [Add wellness description]
   - **Details**: [Add relevant details]

### 4. Add Block to a Page
1. Go to Collections → Pages
2. Edit an existing page or create a new one
3. In the Content tab, add a new block
4. Select "Room Rates Block"
5. Configure:
   - **Room Rates Data**: Select your created room rates entry
   - **Show Rate Inclusions**: ✓ (checked)
   - **Show Lodge Experiences**: ✓ (checked)
6. Save and publish the page

### 5. View the Result
1. Go to your page URL on the frontend
2. You should see:
   - Room rates table with pricing by season
   - Collapsible "Rate Inclusions" section
   - Collapsible "In-lodge Experiences" section

## Features

### Room Rates Table
- Displays accommodation types with total room counts
- Shows different rate types (Full Board, Game Package, etc.)
- Includes room configurations (Double, Single, Triple, Per Room)
- Seasonal pricing (Peak, High, Mid, Low)
- Responsive design with horizontal scrolling on mobile

### Collapsible Sections
- **Rate Inclusions**: Shows what's included and excluded for each rate type
- **Lodge Experiences**: Shows available activities with descriptions and details
- Interactive expand/collapse functionality
- Configurable default open/closed state
- Sortable by order field

### Styling
- Modern, clean design using Tailwind CSS
- Stone color palette for elegant appearance
- Hover effects and smooth transitions
- Mobile-responsive layout
- Consistent with your existing design system

## Customization

### Adding New Rate Types
1. Edit `src/collections/RoomRates.ts`
2. Add new options to the rate type select field
3. Update the `getRateTypeLabel` function in `src/blocks/RoomRates/Component.tsx`
4. Regenerate types: `pnpm generate:types`

### Adding New Room Types
1. Edit `src/collections/RoomRates.ts`
2. Add new options to the room type select field
3. Update the `getRoomTypeLabel` function in `src/blocks/RoomRates/Component.tsx`
4. Regenerate types: `pnpm generate:types`

### Styling Changes
- Edit `src/blocks/RoomRates/Component.tsx`
- Modify Tailwind CSS classes
- Colors use the stone palette (stone-200, stone-300, etc.)
- Table uses responsive design with overflow-x-auto

## Technical Notes

- Uses Payload CMS 3.0 with PostgreSQL
- React 19 with TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- Server-side rendering with Next.js App Router
- Payload's rich text editor for content fields

## Troubleshooting

### Types Not Generated
Run: `pnpm generate:types`

### Block Not Appearing
1. Check that collections are properly imported in `src/payload.config.ts`
2. Verify the block is added to `src/collections/Pages.ts`
3. Make sure the block is registered in `src/blocks/RenderBlocks.tsx`

### Data Not Loading
1. Check console for error messages
2. Verify collection relationships are correct
3. Ensure data exists in the admin panel 