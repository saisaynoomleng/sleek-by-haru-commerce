import { BsLayoutTextSidebarReverse } from 'react-icons/bs';
import { defineField, defineType } from 'sanity';
import { sanitySlugifier } from './sanitySlugifier';

export const utilityPageType = defineType({
  name: 'utilityPage',
  title: 'Utility Pages',
  type: 'document',
  icon: BsLayoutTextSidebarReverse,
  fields: [
    defineField({
      name: 'name',
      title: 'Page Name',
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
      name: 'seo',
      title: 'SEO',
      type: 'blockSEO',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Text',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
  ],
});
