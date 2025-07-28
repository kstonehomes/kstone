import {defineField, defineType} from 'sanity'

export const imageGallery = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Gallery Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'altText',
              title: 'Alternative Text',
              type: 'string',
              description: 'Alternative text for accessibility',
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'Optional caption for the image',
            },
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      images: 'images',
    },
    prepare(selection) {
      const {title, images} = selection
      const imageCount = images?.length || 0
      return {
        title: title || 'Untitled Gallery',
        subtitle: `${imageCount} image${imageCount === 1 ? '' : 's'}`,
        media: images?.[0],
      }
    },
  },
})