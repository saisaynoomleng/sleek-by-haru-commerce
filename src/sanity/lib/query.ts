import { defineQuery } from 'next-sanity';

export const MAIN_PAGE_QUERY = defineQuery(`*[_type == 'mainPage'
 && slug.current == $slug][0]{
    "metaTitle": seo.metaTitle,
    "metaDescription": seo.metaDescription,
    "opengraphImage": seo.opengraphImage.asset->.url
 }`);
