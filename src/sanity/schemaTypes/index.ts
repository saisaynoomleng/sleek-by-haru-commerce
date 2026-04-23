import { type SchemaTypeDefinition } from 'sanity';
import { blockImageType } from './blockImageType';
import { blockContentType } from './blockContentType';
import { blockSEOType } from './blockSEOType';
import { authorType } from './authorType';
import { categoryType } from './categoryType';
import { faqType } from './faqType';
import { blogType } from './blogType';
import { siteSettingType } from './siteSettingType';
import { mainPageType } from './mainPageType';
import { utilityPageType } from './utilityPageType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockImageType,
    blockContentType,
    blockSEOType,
    authorType,
    categoryType,
    faqType,
    blogType,
    siteSettingType,
    mainPageType,
    utilityPageType,
  ],
};
