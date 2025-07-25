import {defineField, defineType} from 'sanity'
import {allFeaturesField} from './allFeature'
import {garageField} from './garages'
import {houseTypeField} from './houseTypes'

export const property = defineType({
  name: 'property',
  title: 'Property',
  type: 'document',
  fields: [
    // House Model
    defineField({
      name: 'houseName',
      title: 'House Name',
      type: 'string',
      description: 'The name of the house or property.',
      validation: (Rule) =>
        Rule.required()
          .min(4)
          .max(100)
          .error('House name is required and must be between 4 and 100 characters.'),
    }),
    // Property state: e.g preConstruction, quickPossession
    defineField({
      name: 'propertyState',
      title: 'Property State',
      type: 'string',
      options: {
        list: [
          {title: 'Pre-Construction', value: 'preConstruction'},
          {title: 'Quick Possession', value: 'quickPossession'},
          {title: 'Showhome', value: 'showhome'},
        ],
        layout: 'radio',
      },
      description: 'The current state of the property.',
      validation: (Rule) => Rule.required().error('Property state is required.'),
    }),

    // Slug
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'houseModel',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Slug is required and must be unique.'),
      description: 'A unique identifier for the quick possession, used in URLs.',
    }),
    // House Type
    houseTypeField,
    // Featured Image
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Featured image of the property',
      validation: (Rule) => Rule.required(),
    }),
    // City
    defineField({
      name: 'city',
      title: 'city',
      type: 'reference',
      to: [{type: 'city'}],
      description: 'Select the city',
      validation: (Rule) => Rule.required(),
    }),
    // Community
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
    // Short Description
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
    // Address
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
      description: 'The address of the property.',
    }),
    // Province
    defineField({
      name: 'province',
      title: 'Province',
      type: 'string',
      description: 'The province or state where the home is located.',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = (context as {parent?: {propertyState?: string}}).parent
          if (parent?.propertyState === 'showhome' && !value) {
            return 'Province is required for showhome.'
          }
          return true
        }),
      hidden: ({parent}) => parent.propertyState !== 'showhome',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      description: 'Current market status of the property.',
      options: {
        list: [
          {title: 'Move-in Ready', value: 'ready'},
          {title: 'Pending', value: 'pending'},
          {title: 'Sold', value: 'sold'},
          {title: 'Available', value: 'available'},
        ],
        layout: 'dropdown',
      },
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = (context as {parent?: {propertyState?: string}}).parent
          if (parent?.propertyState === 'quickPossession' && !value) {
            return 'Status is required for quick possession.'
          }
          return true
        }),
    }),
    // Availability
    defineField({
      name: 'readyStatus',
      title: 'Move in Ready Status',
      type: 'string',
      options: {
        list: [
          {title: 'Immediately', value: 'immediately'},
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
      description: "Only visible when status is 'Ready'.",
    }),
    defineField({
      name: 'availableStatus',
      title: 'Availabe Status',
      type: 'string',
      options: {
        list: [
          {title: 'Customization Available', value: 'Customization Available'},
          {title: 'Permits in Process', value: 'Permits in Process'},
          {
            title: 'Under Construction Foundation Stage',
            value: 'Under Construction Foundation Stage',
          },
          {title: 'Under Construction Framing Stage', value: 'Under Construction Framing Stage'},
          {title: 'Under Construction Drywall Stage', value: 'Under Construction Drywall Stage'},
          {
            title: 'Under Construction Finishing Stage',
            value: 'Under Construction Finishing Stage',
          },
          {title: 'Under Construction Final Stages', value: 'Under Construction Final Stages'},
        ],
        layout: 'dropdown',
      },
      hidden: ({parent}) => parent?.status !== 'available',
      description: "Only visible when status is 'Available'.",
    }),
    // Old Price
    defineField({
      name: 'oldPrice',
      title: 'Old Price',
      type: 'number',
    }),

    // New Price
    defineField({
      name: 'newPrice',
      title: 'New Price',
      type: 'number',
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
        Rule.required().min(1).max(50).error('Gallery must have between 1 and 50 images.'),
      description: 'Add list of images of house. You can drag and drop multiple images at once.',
    }),
    // Video tour
    defineField({
      name: 'videoTour',
      title: 'Video Tour',
      type: 'text',
      description: 'Paste the YouTube url here.',
      hidden: ({parent}) => parent?.propertyState !== 'showhome',
    }),

    // Floor Plans
    defineField({
      name: 'floorPlans',
      title: 'Floor Plans',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'floor',
              title: 'Floor',
              type: 'string',
              options: {
                list: [
                  {title: 'Main Floor', value: 'Main Floor'},
                  {title: 'Second Floor', value: 'Second Floor'},
                  {title: 'Upper Floor', value: 'Upper Floor'},
                  {title: 'Lower Floor', value: 'Lower Floor'},
                  {title: 'Basement', value: 'Basement'},
                  {title: 'Walkout Basement', value: 'Walkout Basement'},
                  {title: 'Garage Suite', value: 'Garage Suite'},
                  {title: 'Garden Suite', value: 'Garden Suite'},
                  {title: 'Laneway House', value: 'Laneway House'},
                  {title: 'Front Elevation', value: 'Front Elevation'},
                  {title: 'Rear Elevation', value: 'Rear Elevation'},
                  {title: 'Left Side Elevation', value: 'Left Side Elevation'},
                  {title: 'Right Side Elevation', value: 'Right Side Elevation'},
                  {title: 'Roof Plan', value: 'Roof Plan'},
                  {title: 'Foundation Plan', value: 'Foundation Plan'},
                  {title: 'Cross Section', value: 'Cross Section'},
                ],
                layout: 'dropdown',
              },
              description:
                'Select the floor (Main Floor, Second Floor, Basement, or Garage Suite).',
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              description: 'Images for this floor plan.',
            },
          ],
        },
      ],
      description: 'Add floor plans for up to 4 floors, each with its own images.',
      hidden: ({parent}) => parent.propertyState === 'showhome',
    }),
    // Pick garage
    garageField,
    // All Features
    allFeaturesField,
    // Additional Features and Upgrades
    defineField({
      name: 'additionalFeatures',
      title: 'Additional Features',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of sentences describing the property features.',
      validation: (Rule) =>
        Rule.custom((array) => {
          // If field is not set, skip validation (optional)
          if (!array) return true

          // Check for empty strings ("" or whitespace-only)
          const hasEmptyItems = array.some((item) => typeof item !== 'string' || !item.trim())

          if (hasEmptyItems) {
            return 'Cannot have empty items. Please fill in or remove them.'
          }

          return true
        }),
    }),

    defineField({
      name: 'upgrades',
      title: 'Upgrades',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of sentences that describe the additional upgrades of the property.',
      validation: (Rule) =>
        Rule.custom((array) => {
          // If field is not set, skip validation (optional)
          if (!array) return true

          // Check for empty strings ("" or whitespace-only)
          const hasEmptyItems = array.some((item) => typeof item !== 'string' || !item.trim())

          if (hasEmptyItems) {
            return 'Cannot have empty items. Please fill in or remove them.'
          }

          return true
        }),
    }),

    // Downloadable Floor Plan
    defineField({
      name: 'floorPlan',
      title: 'Attached Document(PDF Only)',
      type: 'file',
      description: 'Upload the floor plan PDF document.',
      options: {
        accept: '.pdf',
      },
      validation: (Rule) =>
        Rule.custom((file) => {
          if (file && file.asset) {
            // Check if the file is a PDF
            const fileName = file.asset._ref || ''
            if (!fileName.toLowerCase().includes('pdf')) {
              return 'Please upload a PDF file only'
            }
          }
          return true
        }),
    }),
  ],
})
