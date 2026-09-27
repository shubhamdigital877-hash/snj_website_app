'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import TopBar from './TopBar';
import LoginExperience from './LoginExperience';
import loginStyles from './LoginExperience.module.css';
import { properties } from '../lib/properties';
const links = [['Home', '/'], ['Weddings & events', '/weddings-events'], ['Offers', '/offers'], ['Contact', '/contact']];
export default function Header() {
    const [login, setLogin] = useState(false); const dialog = useRef<HTMLDialogElement>(null);
    useEffect(() => {
        const open = (event: MouseEvent) => {
            if (!(event.target instanceof Element)) return;
            const link = event.target.closest<HTMLAnchorElement>('a[href]');
            if (!link) return;
            const url = new URL(link.href, window.location.href);
            if (url.origin !== window.location.origin || url.pathname.replace(/\/$/, '') !== '/login') return;
            event.preventDefault();
            setMobile(false);
            setDropdown(false);
            setLogin(true);
        };
        // Capture before Next Link handles navigation, keeping the current page open.
        document.addEventListener('click', open, true);
        return () => document.removeEventListener('click', open, true);
    }, []);

    useEffect(() => { if (!login) return; const previous = document.activeElement as HTMLElement; const overflow = document.body.style.overflow; dialog.current?.showModal(); document.body.style.overflow = 'hidden'; return () => { dialog.current?.close(); document.body.style.overflow = overflow; previous?.focus(); }; }, [login]);
    const path = usePathname(); const [mobile, setMobile] = useState(false); const [dropdown, setDropdown] = useState(false); const [scrolled, setScrolled] = useState(false);
    const drawer = useRef<HTMLDialogElement>(null);
    useEffect(() => {
        const url = new URL(window.location.href);
        if (url.searchParams.get('login') !== '1') return;
        setLogin(true);
        url.searchParams.delete('login');
        window.history.replaceState(window.history.state, '', url.pathname + url.search + url.hash);
    }, [path]);
    useEffect(() => { if (!mobile) return; const overflow = document.body.style.overflow; drawer.current?.showModal(); document.body.style.overflow = 'hidden'; const media = window.matchMedia('(min-width:961px)'); const resize = () => { if (media.matches) setMobile(false); }; media.addEventListener('change', resize); return () => { drawer.current?.close(); document.body.style.overflow = overflow; toggle.current?.focus(); media.removeEventListener('change', resize); }; }, [mobile]);
    const root = useRef<HTMLElement>(null); const toggle = useRef<HTMLButtonElement>(null); const propertyToggle = useRef<HTMLButtonElement>(null);
    useEffect(() => { setMobile(false); setDropdown(false); }, [path]);
    useEffect(() => { const scroll = () => setScrolled(window.scrollY > 16); const outside = (e: PointerEvent) => { if (!root.current?.contains(e.target as Node)) { setDropdown(false); } }; scroll(); window.addEventListener('scroll', scroll, { passive: true }); document.addEventListener('pointerdown', outside); return () => { window.removeEventListener('scroll', scroll); document.removeEventListener('pointerdown', outside); }; }, []);
    function nav(label: string, href: string) { return <Link className="nav-link" href={href} aria-current={path === href ? 'page' : undefined}>{label}</Link>; }
    return <><a className="skip-link" href="#main-content">Skip to content</a><header ref={root} className={'site-header ' + (scrolled ? 'scrolled' : '')} onKeyDown={e => { if (e.key === 'Escape' && !e.defaultPrevented) { e.preventDefault(); if (dropdown) { setDropdown(false); propertyToggle.current?.focus(); } else if (mobile) { setMobile(false); toggle.current?.focus(); } } }} onClickCapture={e => { if ((e.target as HTMLElement).closest('a')) { setMobile(false); setDropdown(false); } }}>
        <TopBar />
        <div className="nav-shell"><Link href="/" className="brand brand-original" aria-label="SNJ Group Hotels and Resorts home"><span className="logo-window"><Image src="/brand/snj-logo.png" alt="SNJ Group Hotels & Resorts" width={1024} height={937} priority sizes="340px" /></span></Link>
            <nav className="desktop-nav" aria-label="Main navigation">{nav('Home', '/')}
                <div className="property-nav" onPointerEnter={e => { if (e.pointerType === 'mouse') setDropdown(true); }} onPointerLeave={e => { if (e.pointerType === 'mouse' && !e.currentTarget.contains(document.activeElement)) setDropdown(false); }} onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setDropdown(false); }}>
                    <div className="property-nav-label"><Link className="nav-link" href="/properties" aria-current={path.startsWith('/properties') ? 'page' : undefined} onFocus={() => setDropdown(true)}>Our properties</Link><button ref={propertyToggle} className="property-dropdown-toggle" aria-label="Show properties" aria-expanded={dropdown} aria-controls="property-dropdown" onClick={() => setDropdown(!dropdown)} onKeyDown={e => { if (e.key === 'ArrowDown') { e.preventDefault(); setDropdown(true); requestAnimationFrame(() => root.current?.querySelector<HTMLAnchorElement>('#property-dropdown a')?.focus()); } }}><Icon name="chevron" /></button></div>
                    <div id="property-dropdown" className="property-dropdown" hidden={!dropdown}><p>THE SNJ COLLECTION</p>{properties.map(p => <Link href={'/properties/' + p.slug} key={p.slug}><span>{p.name}<small>{p.city}</small></span><Icon name="arrow" /></Link>)}<Link className="all-properties" href="/properties">Explore all properties <Icon name="arrow" /></Link></div>
                </div>
                {links.slice(1).map(([label, href]) => <span key={href}>{nav(label, href)}</span>)}
            </nav>
            <div className="header-actions"><Link className="search-toggle" href="/properties" aria-label="Search hotels and venues"><Icon name="search" /></Link><div className="login-book-group"><button type="button" className="account-toggle" aria-label="Login / Profile" aria-haspopup="dialog" onClick={() => { setMobile(false); setLogin(true); }}><Icon name="user" /></button><Link href="/book" className="book-button">Book a stay <Icon name="arrow" /></Link></div><button ref={toggle} className="menu-toggle" aria-label={mobile ? 'Close navigation' : 'Open navigation'} aria-expanded={mobile} aria-controls="mobile-nav" onClick={() => setMobile(!mobile)}><Icon name={mobile ? 'close' : 'menu'} /></button></div></div>
    </header><dialog ref={drawer} id="mobile-nav" className="navigation-drawer" aria-labelledby="drawer-title" onCancel={() => setMobile(false)} onClick={e => { if (e.target === e.currentTarget) setMobile(false); }}>
            <div className="drawer-content">
                <div className="drawer-heading"><div><span>SNJ GROUP</span><h2 id="drawer-title">Explore SNJ</h2></div><button autoFocus className="drawer-close" aria-label="Close navigation" onClick={() => setMobile(false)}><Icon name="close" /></button></div>
                <nav aria-label="Mobile navigation" className="drawer-links" onClick={e => { if ((e.target as HTMLElement).closest('a')) setMobile(false); }}>
                    {nav('Home', '/')}
                    <details className="drawer-properties"><summary>Our properties <Icon name="chevron" /></summary><div><Link href="/properties">Explore all properties <Icon name="arrow" /></Link>{properties.map(p => <Link key={p.slug} href={'/properties/' + p.slug} aria-current={path === '/properties/' + p.slug ? 'page' : undefined}><span>{p.name}<small>{p.city}</small></span><Icon name="arrow" /></Link>)}</div></details>
                    {nav('Weddings & events', '/weddings-events')}{nav('Offers', '/offers')}{nav('About SNJ', '/about')}{nav('Contact', '/contact')}
                    <div className="drawer-shortcuts"><Link href="/my-bookings"><Icon name="suitcase" />My Bookings</Link><Link href="/profile"><Icon name="user" />Profile</Link></div>
                    <Link href="/book" className="book-button drawer-book">Book a stay <Icon name="arrow" /></Link>
                    <Link href="/download-app" className="drawer-download">Download app <Icon name="arrow" /></Link>
                </nav></div></dialog><dialog ref={dialog} className={loginStyles.modal} aria-labelledby="login-heading" onCancel={() => setLogin(false)} onClick={e => { if (e.target === e.currentTarget) setLogin(false); }}>{login && <LoginExperience onClose={() => setLogin(false)} />}</dialog></>;
}
