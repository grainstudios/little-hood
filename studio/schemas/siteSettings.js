import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  description: 'Global site settings. The logo here is shown in the header, mobile menu and footer across the whole site.',
  fields: [
    defineField({
      name: 'title',
      title: 'Label',
      type: 'string',
      description: 'Just a label to identify this document. Keep it as "Site Settings".',
      initialValue: 'Site Settings',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Store logo shown in the header, mobile menu and footer. Use a transparent PNG for best results.',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'title', media: 'logo' },
    prepare({ title, media }) {
      return { title: title || 'Site Settings', media }
    },
  },
})
