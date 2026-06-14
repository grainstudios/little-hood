import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL id)',
      type: 'slug',
      description:
        'Auto-generated from the name. This becomes the product page link, e.g. /product/hobbit-lamp',
      options: { source: 'name', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (₹)',
      type: 'number',
      description: 'Leave empty to show "Price on request".',
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      description: 'The first image is used as the main/cover photo.',
      of: [{ type: 'image', options: { hotspot: true } }],
      options: { layout: 'grid' },
      validation: (rule) => rule.min(1).error('Add at least one image.'),
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      description: 'Lower numbers appear first within the category.',
      initialValue: 0,
    }),
    defineField({
      name: 'active',
      title: 'Visible on site',
      type: 'boolean',
      description: 'Turn off to hide this product without deleting it.',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Name A–Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'name', media: 'images.0', price: 'price', category: 'category.title' },
    prepare({ title, media, price, category }) {
      const priceLabel = price != null ? `₹${price}` : 'Price on request'
      return {
        title,
        media,
        subtitle: [category, priceLabel].filter(Boolean).join(' · '),
      }
    },
  },
})
