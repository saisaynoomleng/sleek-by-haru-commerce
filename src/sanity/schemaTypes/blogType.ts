import { FaNewspaper } from 'react-icons/fa';
import { defineField, defineType } from 'sanity';
import { sanitySlugifier } from './sanitySlugifier';
import { formatDate, formatTitle } from '@/lib/helper';

export const blogType = defineType({
  name: 'blog',
  title: 'Blogs',
  icon: FaNewspaper,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Blog Title',
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
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
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
      name: 'publishedAt',
      title: 'Published On',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'imageUrl',
      title: 'Blog Cover Photo',
      type: 'blockImage',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'minRead',
      title: 'Min Read',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isFeatured',
      title: 'Is this featured?',
      type: 'boolean',
      validation: (rule) => rule.required(),
      initialValue: false,
    }),
    defineField({
      name: 'excerpt',
      title: 'Preview Text',
      description: 'Some of the actual blog content for previewing',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      author: 'author.name',
      publishedAt: 'publishedAt',
      image: 'imageUrl',
    },
    prepare({ name, author, publishedAt, image }) {
      const nameFormatted = name ? formatTitle(name) : 'Name not provided';
      const authorFormatted = author
        ? formatTitle(author)
        : 'Author not provided';
      const date = publishedAt ? formatDate(publishedAt) : 'No published Date';

      return {
        title: nameFormatted,
        subtitle: `Author: ${authorFormatted} | Published On: ${date}`,
        media: image || FaNewspaper,
      };
    },
  },
});
