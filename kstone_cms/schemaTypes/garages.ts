import {defineField} from 'sanity'

export const garageField = defineField({
  name: 'garage',
  title: 'Garage & Parking',
  type: 'string',
  description: 'Select the garage/parking configuration for this home design.',
  options: {
    list: [
      // STANDARD GARAGES (New Build Focus)
      {title: 'No Garage', value: 'No Garage'},
      {title: 'Single Attached Garage', value: 'Single Attached'},
      {title: 'Double Attached Garage', value: 'Double Attached'},
      {title: 'Triple Attached Garage', value: 'Triple Attached'},
      {title: 'Single Detached Garage', value: 'Single Detached'},
      {title: 'Double Detached Garage', value: 'Double Detached'},
      {title: 'Tandem Garage (2+ Cars Deep)', value: 'Tandem Garage'},

      // PREMIUM GARAGE OPTIONS (Upsell Potential)
      {title: 'Heated Garage', value: 'Heated Garage'},
      {title: 'Insulated Garage', value: 'Insulated Garage'},
      {title: 'Oversized Garage (+1ft width/depth)', value: 'Oversized Garage'},
      {title: 'Workshop Garage (Extra Height)', value: 'Workshop Garage'},
      {title: 'Smart Garage (WiFi/App Controlled)', value: 'Smart Garage'},
      {title: 'EV Ready Garage (Pre-Wired)', value: 'EV Ready Garage'},

      // ALTERNATIVE PARKING (For Urban Lots)
      {title: 'Underground Parking', value: 'Underground Parking'},
      {title: 'Parkade Stall', value: 'Parkade Stall'},
      {title: 'Carport (Covered Parking)', value: 'Carport'},
      {title: 'Paved Parking Pad', value: 'Paved Parking Pad'},

      // SPECIALTY OPTIONS (Luxury/Functional)
      {title: 'RV Garage', value: 'RV Garage'},
      {title: 'Golf Cart Garage', value: 'Golf Cart Garage'},
      {title: 'Boat Garage', value: 'Boat Garage'},
      {title: 'Car Lift System', value: 'Car Lift System'},

      // FUTURE-PROOFING
      {title: 'Garage Suite Potential', value: 'Garage Suite Potential'},
      {title: "Builder's Choice (Consult Plans)", value: 'Custom Garage'},
    ],
    layout: 'dropdown',
  },
})
