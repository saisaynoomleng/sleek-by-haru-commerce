import { BsLayoutTextSidebarReverse } from 'react-icons/bs';
import { CiSettings } from 'react-icons/ci';
import { FaNewspaper, FaQuestion } from 'react-icons/fa';
import { IoPencil } from 'react-icons/io5';
import { MdCategory } from 'react-icons/md';
import type { StructureResolver } from 'sanity/structure';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Sleek By Haru Commerce')
    .items([
      S.divider().title('Marketing'),
      S.documentTypeListItem('author').title('Authors').icon(IoPencil),
      S.documentTypeListItem('category').title('Categories').icon(MdCategory),
      S.documentTypeListItem('blog').title('Blogs').icon(FaNewspaper),

      S.divider().title('Operation'),
      S.documentTypeListItem('siteSetting')
        .title('Site Settings')
        .icon(CiSettings),
      S.documentTypeListItem('faq').title('FAQs').icon(FaQuestion),
      S.documentTypeListItem('mainPage')
        .title('Main Pages')
        .icon(BsLayoutTextSidebarReverse),
      S.documentTypeListItem('utilityPage')
        .title('Utility Pages')
        .icon(BsLayoutTextSidebarReverse),
    ]);
