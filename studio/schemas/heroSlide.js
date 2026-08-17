import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'heroSlide',
  title: 'Hero Slide',
  type: 'document',
  description:
    'Big rotating banners at the top of the landing page. Upload your own photo and write the headline + subtitle that appears over it.',
  fields: [
    defineField({
      name: 'image',
      title: 'Background image',
      type: 'image',
      description: 'Shown full-width behind the text. Use a wide, high-resolution photo.',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Headline',
      type: 'string',
      description: 'Large text in the middle of the slide, e.g. "Crafted with Precision".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Small uppercase text above the headline, e.g. "Anime Figures & Collectibles".',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Button text',
      type: 'string',
      description: 'Text on the button. Defaults to "Shop Now" if left empty.',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Button link',
      type: 'string',
      description:
        'Where the button scrolls/links to. Use an on-page anchor like "#best-sellers" or a full URL. Defaults to "#best-sellers".',
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      description: 'Lower numbers appear first in the slideshow.',
      initialValue: 0,
    }),
    defineField({
      name: 'active',
      title: 'Visible on site',
      type: 'boolean',
      description: 'Turn off to hide this slide without deleting it.',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'subtitle', media: 'image' },
  },
})
