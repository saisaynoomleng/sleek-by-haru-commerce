import { defineField, defineType } from 'sanity';

export const blockSEOType = defineType({
  name: 'blockSEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'opengraphImage',
      title: 'Opengraph Image',
      type: 'blockImage',
      validation: (rule) => rule.required(),
    }),
  ],
});
