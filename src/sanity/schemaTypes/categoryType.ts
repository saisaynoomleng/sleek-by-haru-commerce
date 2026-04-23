import { defineField, defineType } from 'sanity';
import { MdCategory } from 'react-icons/md';
import { sanitySlugifier } from './sanitySlugifier';

export const categoryType = defineType({
  name: 'category',
  title: 'Categories',
  icon: MdCategory,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
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
  ],
});
