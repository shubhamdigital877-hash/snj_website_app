import type { CSSProperties } from 'react';
export type IconName = 'arrow' | 'external' | 'chevron' | 'close' | 'menu' | 'pin' | 'sparkle' | 'diamond' | 'calendar' | 'bed' | 'search' | 'smartphone' | 'download' | 'copy' | 'user' | 'suitcase' | 'tag' | 'lock' | 'restaurant' | 'banquet' | 'rooftop' | 'garden' | 'temple';
const paths: Record<IconName, string> = {
 restaurant: 'M4 3v6a3 3 0 0 0 6 0V3M7 3v18M17 21V3c-3 2-4 5-4 9h4',
 banquet: 'M3 21h18M5 21V9h14v12M3 9l9-6 9 6M9 21v-6h6v6M8 12h.01M16 12h.01',
 rooftop: 'M3 21h18M5 21v-7h14v7M3 14h18M8 14v7M16 14v7M12 14V4M5 8l7-5 7 5H5Z',
 garden: 'M12 21v-9M8 21h8M12 15C5 15 3 11 3 7c6 0 9 3 9 8ZM12 12c0-5 3-8 9-8 0 5-3 8-9 8Z',
 temple: 'M3 21h18M5 21V11h14v10M3 11h18L12 5 3 11ZM12 5V2M9 21v-6h6v6',
 user: 'M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4 21v-2a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v2',
 suitcase: 'M5 6h14a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2ZM8 6V3h8v3M8 6v15m8-15v15',
 tag: 'M3 3h8l10 10-8 8L3 11V3Zm4 4h.01',
 lock: 'M6 10h12v11H6ZM8 10V6a4 4 0 0 1 8 0v4m-4 5v2',
 copy: 'M9 9h12v12H9ZM5 15H3V3h12v2',
 smartphone: 'M8 2.5h8a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-15a2 2 0 0 1 2-2ZM10 5h4M11 18.5h2',
 download: 'M12 3v12m-4-4 4 4 4-4M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3',
 search: 'M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-2 5 6 6',
 calendar: 'M5 4.5h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2ZM7 2.5v4m10-4v4M3 10h18m-13 6 2.5 2.5L16 13',
 bed: 'M3 18v3m18-3v3M3 18h18v-7H3v7ZM5 11V5h14v6M7 8h3v3M14 8h3v3',
 arrow: 'M4 12h16m-6-6 6 6-6 6',
 external: 'M6 18 18 6M6 6h12v12',
 chevron: 'm6 9 6 6 6-6',
 close: 'm6 6 12 12M6 18 18 6',
 menu: 'M4 6h16M4 12h16M4 18h16',
 pin: 'M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0ZM14.5 10a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0',
 sparkle: 'm12 2 2.8 7.2L22 12l-7.2 2.8L12 22l-2.8-7.2L2 12l7.2-2.8Z',
 diamond: 'm12 4 8 8-8 8-8-8Z',
};
export default function Icon({ name, style }: { name: IconName; style?: CSSProperties }) {
 return <svg className={`icon icon-${name}`} style={style} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d={paths[name]} /></svg>;
}
