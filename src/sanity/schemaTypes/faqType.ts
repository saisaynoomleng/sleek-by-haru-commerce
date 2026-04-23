import { defineField, defineType } from 'sanity';
import { FaQuestion } from 'react-icons/fa';
import { sanitySlugifier } from './sanitySlugifier';

export const faqType = defineType({
  name: 'faq',
  title: 'FAQs',
  icon: FaQuestion,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'FAQ Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (rule) => rule.required(),
      options: {
        source: (doc) => `${doc.name}`,
        slugify: sanitySlugifier,
      },
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'text',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'text',
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
    }),
  ],
});
