import fb from '@/assets/icons/social-media/facebook.svg';
import ig from '@/assets/icons/social-media/instagram.svg';
import ln from '@/assets/icons/social-media/linkedIn.svg';
import tk from '@/assets/icons/social-media/tiktok.svg';

export interface SocialMediaItem {
  id: number;
  name: string;
  platform: 'facebook' | 'instagram' | 'linkedin' | 'tiktok';
  url: string;
  icon: string;
}

export interface FooterData {
  description: string;
  socialMediaTitle: string;
  socialMedia: SocialMediaItem[];
}

export const footer = {
  description:
    'Discover inspiring stories & timeless knowledge, ready to borrow anytime. Explore online or visit our nearest library branch.',
  socialMediaTitle: 'Follow on Social Media',
  socialMedia: [
    {
      id: 1,
      name: 'Facebook',
      platform: 'facebook',
      url: 'https://facebook.com',
      icon: fb,
    },
    {
      id: 2,
      name: 'Instagram',
      platform: 'instagram',
      url: 'https://instagram.com',
      icon: ig,
    },
    {
      id: 3,
      name: 'LinkedIn',
      platform: 'linkedin',
      url: 'https://linkedin.com',
      icon: ln,
    },
    {
      id: 4,
      name: 'TikTok',
      platform: 'tiktok',
      url: 'https://tiktok.com',
      icon: tk,
    },
  ],
};
