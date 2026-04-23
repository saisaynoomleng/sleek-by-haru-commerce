import { defineField, defineType } from 'sanity';
import { IoPencil } from 'react-icons/io5';
import { sanitySlugifier } from './sanitySlugifier';
import { formatTitle } from '@/lib/helper';

export const authorType = defineType({
  name: 'author',
  title: 'Authors',
  icon: IoPencil,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Author Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.name}`,
        slugify: sanitySlugifier,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'imageUrl',
      title: 'Author Photo',
      type: 'blockImage',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Author Bio',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      image: 'imageUrl',
    },
    prepare({ name, image }) {
      const nameFormatted = name ? formatTitle(name) : 'Name not provided';

      return {
        title: nameFormatted,
        media: image || IoPencil,
      };
    },
  },
});
