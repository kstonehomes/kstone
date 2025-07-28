import { defineField, defineType } from "sanity";

export const showHome = defineType({
  name: 'showHome',
  title: 'Show Home',
  type: 'document',
  fields: [
    defineField({
      name: 'houseModel',
      title: 'House Name',
      type: 'string',
      description: 'The Name of The House Model.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description:
        'A unique identifier for the show home, used in URLs. It is auto-generated from the name.',
      options: {
        source: 'houseModel',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      description: 'Featured image of the house.',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'houseType',
      title: 'House Type',
      type: 'string',
      description: 'Select the type of the house (e.g., Front-Drive Home, Landed Home).',
      validation: (Rule) =>
        Rule.required(),
      options: {
        list: [
          { title: '4PLEX', value: '4PLEX' },
          { title: 'Apartment High Rise', value: 'Apartment High Rise' },
          { title: 'Carriage', value: 'Carriage' },
          { title: 'Cottage', value: 'Cottage' },
          { title: 'Detached Condominium', value: 'Detached Condominium' },
          { title: 'Detached Single Family', value: 'Detached Single Family' },
          { title: 'Duplex Front and Back', value: 'Duplex Front and Back' },
          { title: 'Duplex Side By Side', value: 'Duplex Side By Side' },
          { title: 'Duplex Up And Down', value: 'Duplex Up And Down' },
          { title: 'Double Rear Detach Garage', value: 'Double Rear Detach Garage' },
          { title: 'Double Front Attach Garage', value: 'Double Front Attach Garage' },
          { title: 'Half Duplex', value: 'Half Duplex' },
          { title: 'Lowrise Apartment', value: 'Lowrise Apartment' },
          { title: 'Parking Stall', value: 'Parking Stall' },
          { title: 'Residential Attached', value: 'Residential Attached' },
          { title: 'Stacked Townhouse', value: 'Stacked Townhouse' },
          { title: 'Townhouse', value: 'Townhouse' },
          { title: 'Tri-Plex', value: 'Tri-Plex' },
          { title: 'Vacant Lot/Land', value: 'Vacant Lot/Land' },
          { title: 'Front Single Garage Home', value: 'Front Single Garage Home' },
          { title: 'Rear Single Garage Home', value: 'Rear Single Garage Home' },
          { title: 'Front Tripe Garage Home', value: 'Front Tripe Garage Home' },
          { title: 'Rear Triple Garage Home', value: 'Rear Triple Garage Home' },
          { title: 'Front Quadruple Garage Home', value: 'Front Quadruple Garage Home' },
          { title: 'Rear Quadruple Garage Home', value: 'Rear Quadruple Garage Home' }
        ],
        layout: 'dropdown', 
      },
    }), 
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      validation: (Rule) =>
        Rule.required() 
          .max(1200)
          .error('Short description is required and must be 1200 characters or less.'),
      description: 'A brief description of the property, up to 1200 characters.',
    }),
  
    defineField({
      name: 'address',
      title: 'Street Address',
      type: 'string',
      description: 'The street address of the home.',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'reference',
      to: [{type: 'city'}],
      description: 'The city where the show home is located.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'community',
      title: 'Community',
      type: 'reference',
      to: [{type: 'community'}],
      description: 'The community where the property is located.',
      validation: (Rule) => Rule.required(),
      options: {
        filter: ({document}) => {
          const doc = document as {city?: {_ref?: string}}
          return {
            filter: 'city._ref == $cityRef',
            params: {cityRef: doc?.city?._ref},
          }
        },
      },
    }),
    defineField({
      name: 'province',
      title: 'Province',
      type: 'string',
      description: 'The province or state where the home is located.',
      validation: (Rule) => Rule.required().min(2).max(100),
    }),
    // Status
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Move in Ready', value: 'ready'},
          {title: 'Pending', value: 'pending'},
          {title: 'Sold', value: 'sold'},
          {title: 'Available', value: 'available'},
        ],
        layout: 'dropdown',
      },
      description: 'The current status of the property.',
    }),
    // Availability
    defineField({
      name: 'readyStatus',
      title: 'Move in Ready Status',
      type: 'string',
      options: {
        list: [
          {title: 'Now', value: 'Now'},
          {title: 'in 15 Days', value: 'in 15 Days'},
          {title: 'in 30 Days', value: 'in 30 Days'},
          {title: 'in 45 Days', value: 'in 45 Days'},
          {title: 'in 60 Days', value: 'in 60 Days'},
          {title: 'in 75 Days', value: 'in 75 Days'},
          {title: 'in 90 Days', value: 'in 90 Days'},
        ],
        layout: 'dropdown',
      },
      hidden: ({parent}) => parent?.status !== 'ready',
      // validation: (Rule) =>
      //   Rule.custom((value, context) => {
      //     const parent = (context as {parent?: {status?: string}}).parent
      //     if (parent?.status === 'ready' && !value) {
      //       return 'Availability is required when status is Ready.'
      //     }
      //     return true
      //   }),
      description: "Only visible when status is 'Ready'.",
    }),
    defineField({
      name: 'availableStatus',
      title: 'Availabe Status',
      type: 'string',
      options: {
        list: [
          { title: '& Can be Customized', value: '& Can be Customized' },
          { title: '& Permits are in Progress', value: '& Permits are in Progress' },
          { title: '& at Foundation Stage', value: '& at Foundation Stage' },
          { title: '& at Framing Stage', value: '& at Framing Stage' },
          { title: '& at Drywall Stage', value: '& at Drywall Stage' },
          { title: '& at Finishing Stages', value: '& at Finishing Stages' },
          { title: 'Under Construction Final Stages', value: 'Under Construction Final Stages' },
        ],
        layout: 'dropdown',
      },
      hidden: ({parent}) => parent?.status !== 'available',
      // validation: (Rule) =>
      //   Rule.custom((value, context) => {
      //     const parent = (context as {parent?: {status?: string}}).parent
      //     if (parent?.status === 'available' && !value) {
      //       return 'Availability is required when status is Available.'
      //     }
      //     return true
      //   }),
      description: "Only visible when status is 'Available'.",
    }),
    // Pricing
    defineField({
      name: 'oldPrice',
      title: 'Old Price',
      type: 'number',
    }),
    defineField({
      name: 'newPrice',
      title: 'New Price',
      type: 'number',
      description: 'The new price of the property.',
    }),
    defineField({
      name: 'videoTour',
      title: 'Video Tour',
      type: 'text',
      description: 'Paste the YouTube url here.',
    }),
    // Gallery
    defineField({
      name: 'houseGallery',
      title: 'House Gallery',
      type: 'array',
      of: [{type: 'image'}],
      options: {
        layout: 'grid',
      },
      validation: (Rule) =>
        Rule.max(50).error('Gallery must have between 1 and 50 images.'),
      description:
        'List of images for the house gallery. You can drag and drop multiple images at once.',
    }),
    // Garage Select
    defineField({
      name: 'garage',
      title: 'Garage',
      type: 'string',
      options: {
        list: [
            { title: '2 Outdoor Stalls', value: '2 Outdoor Stalls' },
            { title: '220 Volt Wiring', value: '220 Volt Wiring' },
            { title: 'Double Carport', value: 'Double Carport' },
            { title: 'Double Garage Attached', value: 'Double Garage Attached' },
            { title: 'Double Garage Detached', value: 'Double Garage Detached' },
            { title: 'Double Front Attach Garage', value: 'Double Front Attach Garage' },
            { title: 'Double Rear Detach Garage', value: 'Double Rear Detach Garage' },
            { title: 'Double Indoor', value: 'Double Indoor' },
            { title: 'Front Drive Access', value: 'Front Drive Access' },
            { title: 'Front/Rear Drive Access', value: 'Front/Rear Drive Access' },
            { title: 'Heated', value: 'Heated' },
            { title: 'Insulated', value: 'Insulated' },
            { title: 'No Garage', value: 'No Garage' },
            { title: 'Over Sized', value: 'Over Sized' },
            { title: 'Parkade', value: 'Parkade' },
            { title: 'Parking Pad Cement/Paved', value: 'Parking Pad Cement/Paved' },
            { title: 'Quad or More Attached', value: 'Quad or More Attached' },
            { title: 'Quad or More Detached', value: 'Quad or More Detached' },
            { title: 'Rear Drive Access', value: 'Rear Drive Access' },
            { title: 'RV Parking', value: 'RV Parking' },
            { title: 'Shop', value: 'Shop' },
            { title: 'Single Carport', value: 'Single Carport' },
            { title: 'Single Garage Attached', value: 'Single Garage Attached' },
            { title: 'Single Garage Detached', value: 'Single Garage Detached' },
            { title: 'Single Indoor', value: 'Single Indoor' },
            { title: 'Stall', value: 'Stall' },
            { title: 'Tandem', value: 'Tandem' },
            { title: 'Triple Garage Attached', value: 'Triple Garage Attached' },
            { title: 'Triple Garage Detached', value: 'Triple Garage Detached' },
            { title: 'Underground', value: 'Underground' },
            { title: 'See Remarks', value: 'See Remarks' },
            { title: 'EV Charging Station', value: 'EV Charging Station' },
            { title: 'No Parking', value: 'No Parking' },
            { title: 'Front Single Garage Home', value: 'Front Single Garage Home' },
            { title: 'Rear Single Garage Home', value: 'Rear Single Garage Home' },
            { title: 'Front Tripe Garage Home', value: 'Front Tripe Garage Home' },
            { title: 'Rear Triple Garage Home', value: 'Rear Triple Garage Home' },
            { title: 'Front Quadruple Garage Home', value: 'Front Quadruple Garage Home' },
            { title: 'Rear Quadruple Garage Home', value: 'Rear Quadruple Garage Home' }

            

        ],
        layout: 'dropdown',
      },
      description: 'Select the garage type.',
    }),
    // All Features
    defineField(
      {
        name: 'allFeatures',
        title: 'All Features',
        type: 'object',
        fieldsets: [
          {
            name: 'mainFeatures',
            title: 'Main Features',
            options: { collapsible: true, collapsed: false }
          },
          {
            name: 'keyFeatures',
            title: 'Key Features',
            options: { collapsible: true, collapsed: true }
          },
        ],
         fields: [
          // MAIN FEATURES
          { name: 'sqft', title: 'Total SQFT (AG + BG + GS)', type: 'string', fieldset: 'mainFeatures', validation: (Rule) => Rule.required().error('This feature is required')},
          { name: 'mainHouseSqft', title: 'Main House SQFT', type: 'string', fieldset: 'mainFeatures', validation: (Rule) => Rule.required().error('This feature is required')},
          { name: 'basementSqft', title: 'Basement SQFT', type: 'string', fieldset: 'mainFeatures', validation: (Rule) => Rule.required().error('This feature is required')},
          { name: 'garageSuiteSqft', title: 'Garage Suite SQFT', type: 'string', fieldset: 'mainFeatures', validation: (Rule) => Rule.required().error('This feature is required')},
          { name: 'bedrooms', title: 'Total Beds', type: 'string', validation: (Rule) =>Rule.required().error('This feature is required'), fieldset: 'mainFeatures', },
          { name: 'bathrooms', title: 'Total Bath', type: 'string', validation: (Rule) => Rule.required().error('This feature is required'), fieldset: 'mainFeatures', },

          // KEY FEATURES
          { name: 'kitchen', title: 'Kitchen', type: 'number', fieldset: 'keyFeatures' },
          { name: 'spiceKitchen', title: 'Spice Kitchen', type: 'boolean', fieldset: 'keyFeatures' },
          { name: 'spiceKitchenTotal', title: 'Spice Kitchen in Total', type: 'string', fieldset: 'keyFeatures' },
          { name: 'fullBath', title: 'Full Bath', type: 'number', fieldset: 'keyFeatures' },
          { name: 'livingRoom', title: 'Living Room', type: 'number', fieldset: 'keyFeatures' },
          { name: 'bonusRoom', title: 'Bonus Room as 1', type: 'boolean', fieldset: 'keyFeatures' },
          { name: 'bonusRoomTotal', title: 'Bonus Room as Total', type: 'string', fieldset: 'keyFeatures' },
          { name: 'openToAbove', title: 'Open to Above', type: 'boolean', fieldset: 'keyFeatures' },
          { name: 'openToAboveTotal', title: 'Open to Above Total', type: 'string', fieldset: 'keyFeatures' },
          { name: 'ceilingHeight', title: 'Ceiling Height (in ft)', type: 'string', fieldset: 'keyFeatures' },
          { name: 'doubleBasement', title: 'Double Basement', type: 'boolean', fieldset: 'keyFeatures' },
          { name: 'treatedWoodDeck', title: 'Treated Wood Deck', type: 'boolean', fieldset: 'keyFeatures' },
          { name: 'concretePad', title: 'Concrete Pad', type: 'boolean', fieldset: 'keyFeatures' },
          { name: 'compositeDeck', title: 'Composite Deck', type: 'boolean', fieldset: 'keyFeatures' },
          { name: 'vinylDeck', title: 'Vinyl Deck', type: 'boolean', fieldset: 'keyFeatures' },
          { name: 'rearBalcony', title: 'Rear Balcony as 1', type: 'boolean', fieldset: 'keyFeatures' },
          { name: 'rearBalconyTotal', title: 'Rear Balcony as Total', type: 'number', fieldset: 'keyFeatures' },
          { name: 'frontBalcony', title: 'Front Balcony', type: 'boolean', fieldset: 'keyFeatures' },
          { name: 'featureWalls', title: 'Feature Walls', type: 'boolean', fieldset: 'keyFeatures' },
          { name: 'vinylFlooring', title: 'Vinyl Flooring', type: 'boolean', fieldset: 'keyFeatures' },
          { name: 'tiledFlooring', title: 'Tiled Flooring', type: 'boolean', fieldset: 'keyFeatures' },
          { name: 'tripleCarGarage', title: 'Triple Car Garage', type: 'boolean', fieldset: 'keyFeatures' },
          { name: 'doubleCarGarage', title: 'Double Car Garage', type: 'boolean', fieldset: 'keyFeatures' },
          { name: 'separateSideEntrance', title: 'Separate Side Entrance', type: 'boolean', fieldset: 'keyFeatures' },
          { name: 'mainFloorFullBedBath', title: 'Main Floor Full Bed & Bath', type: 'boolean', fieldset: 'keyFeatures' },
          { name: 'rentalGarageSuite', title: 'Rental Garage Suite', type: 'boolean', fieldset: 'keyFeatures' },
          { name: 'parkFacing', title: 'Park Facing', type: 'boolean', fieldset: 'keyFeatures' },
          { name: 'legalFinishedBasement', title: 'Legal Finished Basement', type: 'boolean', fieldset: 'keyFeatures' },
          { name: 'ownerSuiteBasement', title: 'Owner Suite Basement', type: 'boolean', fieldset: 'keyFeatures' },
           
          { name: 'airportNearby', title: 'Airport Nearby', type: 'boolean', fieldset: 'keyFeatures' },
          { name: 'playgroundSchoolsNearby', title: 'Playground & Schools Nearby', type: 'boolean', fieldset: 'keyFeatures' },
          { name: 'golfNearby', title: 'Golf Near By', type: 'boolean', fieldset: 'keyFeatures' },
          { name: 'schoolNearby', title: 'School Near By', type: 'boolean', fieldset: 'keyFeatures' },
          { name: 'walkout', title: 'Walkout', type: 'boolean', fieldset: 'keyFeatures' },
          { name: 'partialWalkout', title: 'Partial Walkout', type: 'boolean', fieldset: 'keyFeatures' },
          { name: 'regularLot', title: 'Regular Lot', type: 'boolean', fieldset: 'keyFeatures' },
          { name: 'vaultedCeiling', title: 'Vaulted Ceiling', type: 'boolean', fieldset: 'keyFeatures' },
          { name: 'indentCeiling', title: 'Indent Ceiling/s', type: 'boolean', fieldset: 'keyFeatures' },
          { name: 'ceilingHighCabinets', title: 'Ceiling High Cabinets', type: 'boolean', fieldset: 'keyFeatures' },
          { name: 'dropCeilings', title: 'Drop Ceiling/s', type: 'boolean', fieldset: 'keyFeatures' },
          { name: 'carpetFloor', title: 'Carpet Floor', type: 'boolean', fieldset: 'keyFeatures' },
          { name: 'tenFTceilings', title: '10 ft Ceilings', type: 'boolean', fieldset: 'keyFeatures' },
          { name: 'twentyFTceilings', title: '20 ft Ceilings', type: 'boolean', fieldset: 'keyFeatures' },
          { name: 'enSuites', title: 'EnSuites', type: 'number', fieldset: 'keyFeatures' },
        ]
    }),
    // Additional Features and Upgrades
    defineField({
      name: 'additionalFeatures',
      title: 'Additional Features',
      type: 'array',
      of: [{type: 'string'}],

      description: 'List of sentences that describe the additional features of the property.',
    }),
    defineField({
      name: 'upgrades',
      title: 'Upgrades',
      type: 'array',
      of: [{type: 'string'}],

      description: 'List of sentences that describe the additional upgrades of the property.',
    }),
    // Floor Plan Download
    defineField({
      name: 'floorPlan',
      title: 'Attached Document - PDF',
      type: 'file',
      description: 'Upload the floor plan PDF document.',
      options: {
        accept: '.pdf',
      },
      validation: (Rule) => Rule.custom((file) => {
        if (file && file.asset) {
          // Check if the file is a PDF
          const fileName = file.asset._ref || '';
          if (!fileName.toLowerCase().includes('pdf')) {
            return 'Please upload a PDF file only';
          }
        }
        return true;
      }),
    }),
    
    
  ],
})