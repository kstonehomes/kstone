import {defineField, defineType} from 'sanity'

export const imageGallery = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'altText',
      title: 'Alternative Text',
      type: 'string',
      description: 'The alternative text for the image.',
      validation: (Rule) => Rule.required().min(4).max(100),
    }),
  ],
  preview: {
    select: {
      media: 'image',
      altText: 'altText',
    },
    prepare(selection) {
      return {
        title: 'Gallery Image',
        subtitle: selection.altText || 'No alt text',
        media: selection.media,
      }
    },
  },
})
