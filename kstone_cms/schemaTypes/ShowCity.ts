import { defineType, defineField } from 'sanity'

export const showCityDocument = defineType({
  name: 'showCity',
  title: 'Show City', 
  type: 'document',
  fields: [
    defineField({
      name: 'chooseCityToShow',
      title: 'Choose City to Show',
      type: 'reference',
      to: [{ type: 'city' }],
      validation: (Rule) => Rule.required()
    })
  ],
  preview: {
    select: {
      title: 'chooseCityToShow.name'
    },
    prepare({ title }) {
      return {
        title: title || 'No city selected'
      }
    }
  }
})