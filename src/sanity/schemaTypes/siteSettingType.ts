import { defineField, defineType } from 'sanity';
import { CiSettings } from 'react-icons/ci';
import { sanitySlugifier } from './sanitySlugifier';

export const siteSettingType = defineType({
  name: 'siteSetting',
  title: 'Site Setting',
  icon: CiSettings,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Site Name',
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
      name: 'logoWithHaru',
      title: 'Site Logo With Haru',
      type: 'blockImage',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Site Logo',
      type: 'blockImage',
      validation: (rule) => rule.required(),
    }),
    // defineField({
    //   name: 'navLinks',
    //   title: 'Menu Links',
    //   type: 'array',
    //   of: [
    //     defineArrayMember({
    //       name: 'name',
    //       title: 'Link Title',
    //       type: 'object',
    //       fields: [],
    //     }),
    //   ],
    // }),
  ],
});
