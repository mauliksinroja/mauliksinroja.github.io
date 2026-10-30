import { IconName } from './icon-name';

export interface Availability {
  /** Short label for pills, e.g. "Currently engaged". */
  label: string;
  /** One-line explanation shown under the actions and in the player bar. */
  line: string;
  /** `open` shows a green dot, `engaged` an amber one. */
  state: 'open' | 'engaged';
}

export interface SocialLink {
  label: string;
  url: string;
  icon: IconName;
  /** Icon size in px; solid logos render smaller to match outline icons. */
  iconSize: number;
  /** `rel="me"` marks profiles that belong to the site owner. */
  isOwnProfile: boolean;
}

export interface Profile {
  name: string;
  initials: string;
  title: string;
  lede: string;
  location: string;
  /** Short facts shown after the location in the hero. */
  facts: string[];
  email: string;
  photo: string;
  siteUrl: string;
  availability: Availability;
  linkedIn: SocialLink;
  /** Round icon buttons beside the LinkedIn button. */
  socials: SocialLink[];
  playStoreDeveloperUrl: string;
  upworkUrl: string;
  linkedInArticlesUrl: string;
  languages: string[];
  seo: {
    title: string;
    description: string;
    shareDescription: string;
    shareImage: string;
    twitterHandle: string;
    knowsAbout: string[];
    alumniOf: string;
    region: string;
    countryCode: string;
  };
}
