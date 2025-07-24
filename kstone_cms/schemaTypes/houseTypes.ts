import {defineField} from 'sanity'

export const houseTypeField = defineField({
  name: 'houseType',
  title: 'House Type',
  type: 'string',
  description: 'Select the primary type of the property',
  validation: (Rule) => Rule.required(),
  options: {
    list: [
      // Single Family Homes (Most Common)
      {title: 'Detached Single Family', value: 'Detached Single Family'},
      {title: 'Front Garage Home', value: 'Front Garage Home'},
      {title: 'Rear Lane Home', value: 'Rear Lane Home'},
      {title: 'Bungalow', value: 'Bungalow'},
      {title: 'Two-Storey Home', value: 'Two-Storey Home'},

      // Condominiums
      {title: 'Apartment (High-Rise)', value: 'Apartment High Rise'},
      {title: 'Apartment (Low-Rise)', value: 'Apartment Low Rise'},
      {title: 'Detached Condominium', value: 'Detached Condominium'},
      {title: 'Loft Condo', value: 'Loft Condo'},

      // Townhouses
      {title: 'Townhouse', value: 'Townhouse'},
      {title: 'Stacked Townhouse', value: 'Stacked Townhouse'},
      {title: 'Row House', value: 'Row House'},

      // Multi-Unit (Popular for Investors)
      {title: 'Duplex', value: 'Duplex'},
      {title: 'Triplex', value: 'Triplex'},
      {title: 'Fourplex (4PLEX)', value: '4PLEX'},
      {title: 'Semi-Detached', value: 'Semi-Detached'},

      // Specialty Homes
      {title: 'Cottage', value: 'Cottage'},
      {title: 'Carriage Home', value: 'Carriage Home'},
      {title: 'Laneway Home', value: 'Laneway Home'},
      {title: 'Modular Home', value: 'Modular Home'},

      // Land/Vacant
      {title: 'Vacant Lot/Land', value: 'Vacant Lot/Land'},
      {title: 'Acreage', value: 'Acreage'},

      // Regional Specialties
      {title: 'Vancouver Special', value: 'Vancouver Special'},
      {title: 'Ontario Cottage', value: 'Ontario Cottage'},
      {title: 'Quebec Triplex', value: 'Quebec Triplex'},
      {title: 'Prairie Bungalow', value: 'Prairie Bungalow'},
    ],
    layout: 'dropdown',
  },
})
