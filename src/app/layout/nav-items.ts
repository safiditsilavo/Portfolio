export interface NavItem {
  path: string;
  labelKey: string;
  icon: string;
}

export const NAV_ITEMS: NavItem[] = [
  { path: '/', labelKey: 'nav.dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z' },
  { path: '/about', labelKey: 'nav.about', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { path: '/skills', labelKey: 'nav.skills', icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m21-6h-2m2 6h-2M7 5h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2z' },
  { path: '/projects', labelKey: 'nav.projects', icon: 'M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-2' },
  { path: '/contact', labelKey: 'nav.contact', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L22 8m-9 11h3m-3-7l-3.11-2.07A2 2 0 007.89 8H3a2 2 0 00-2 2v8a2 2 0 002 2h18a2 2 0 002-2v-8a2 2 0 00-2-2h-4.89a2 2 0 00-1.11.31L13 12z' },
];