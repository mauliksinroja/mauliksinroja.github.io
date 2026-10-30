import { NavItem } from '../core/models';

/** Sidebar navigation (desktop). Ids match the section elements. */
export const SIDEBAR_NAV: NavItem[] = [
  { id: 'top', label: 'Home', icon: 'home' },
  { id: 'work', label: 'Work', icon: 'grid' },
  { id: 'approach', label: 'How I build', icon: 'bulb' },
  { id: 'writing', label: 'Writing', icon: 'pen' },
  { id: 'experience', label: 'Experience', icon: 'case' },
  { id: 'stack', label: 'Stack', icon: 'layers' },
  { id: 'contact', label: 'Contact', icon: 'mail' },
];

/** Pill tabs above the hero (desktop). */
export const SECTION_TABS: NavItem[] = SIDEBAR_NAV.filter((item) =>
  ['work', 'approach', 'writing', 'experience', 'stack'].includes(item.id),
);

/** Bottom navigation (phones). */
export const BOTTOM_NAV: NavItem[] = SIDEBAR_NAV.filter((item) =>
  ['top', 'work', 'experience', 'contact'].includes(item.id),
);

/** Sections watched by scroll-spy, in page order. */
export const SECTION_IDS = SIDEBAR_NAV.map((item) => item.id);
