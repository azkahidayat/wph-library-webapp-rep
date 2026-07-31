import fiction from '@/assets/icons/book-categories/fiction.png';
import nonFiction from '@/assets/icons/book-categories/non-fiction.png';
import selfImprovement from '@/assets/icons/book-categories/self-improvement.png';
import finance from '@/assets/icons/book-categories/finance.png';
import science from '@/assets/icons/book-categories/science-and-technology.png';
import education from '@/assets/icons/book-categories/education-and-reference.png';

export type CategorySlug =
  | 'fiction'
  | 'non-fiction'
  | 'self-improvement'
  | 'finance'
  | 'science'
  | 'education';

interface Categories {
  id: number;
  name: string;
  slug: CategorySlug;
  icon: string;
  iconDescription: string;
}

export const categories: Categories[] = [
  {
    id: 1,
    name: 'Fiction',
    slug: 'fiction',
    icon: fiction,
    iconDescription: 'Magic wand and feather pen',
  },
  {
    id: 2,
    name: 'Non-Fiction',
    slug: 'non-fiction',
    icon: nonFiction,
    iconDescription: 'Scroll paper',
  },
  {
    id: 3,
    name: 'Self-Improvement',
    slug: 'self-improvement',
    icon: selfImprovement,
    iconDescription: 'Plant sprout in pot',
  },
  {
    id: 4,
    name: 'Finance',
    slug: 'finance',
    icon: finance,
    iconDescription: 'Money bag',
  },
  {
    id: 5,
    name: 'Science',
    slug: 'science',
    icon: science,
    iconDescription: 'Microscope',
  },
  {
    id: 6,
    name: 'Education',
    slug: 'education',
    icon: education,
    iconDescription: 'Book with graduation cap',
  },
];
