import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Header from '../components/Header';
import SiteFooter from '../components/SiteFooter';
const jakarta = localFont({ src: '../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2', variable: '--font-jakarta', display: 'swap', weight: '200 800' });
export const metadata: Metadata = { title: 'SNJ Group | Hotels & Resorts', description: 'Discover SNJ hotels, spiritual stays and celebration venues in Agra and Vrindavan.', robots: { index: false, follow: false } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" className={jakarta.variable}><body><Header />{children}<SiteFooter /></body></html>; }
