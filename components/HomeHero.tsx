'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icon from './Icon';
import BookingPicker from './BookingPicker';
import { properties } from '../lib/properties';
import styles from './HomeHero.module.css';
const slides = [
    { property: 'snj-taj-grand', src: '/images/hotel-room.jpg', alt: 'Illustrative hotel bedroom', title: 'A little escape.', accent: 'A lasting memory.', description: 'Discover stays, dining and celebrations at SNJ Taj Grand in Agra.' },
    { property: 'snj-laxmi-dham', src: '/images/hotel-lounge.jpg', alt: 'Illustrative hotel lounge', title: 'A soulful journey.', accent: 'A warm welcome.', description: 'Plan your Vrindavan visit, family stay or gathering with SNJ Laxmi Dham.' },
    { property: 'snj-gold-garden', src: '/images/hotel-room.jpg', alt: 'Illustrative hospitality interior', title: 'Your special day.', accent: 'Your golden moment.', description: 'Discover wedding lawn and banquet spaces at SNJ Gold Garden in Agra.' },
    { property: 'snj-pearls-garden', src: '/images/hotel-lounge.jpg', alt: 'Illustrative hospitality lounge', title: 'Bring everyone together.', accent: 'Celebrate beautifully.', description: 'Explore SNJ Pearls Garden in Agra for weddings, banquets and family celebrations.' },
];
export default function HomeHero() {
    const panel = useRef<HTMLDivElement>(null);const [compact,setCompact]=useState(false);const [headerHeight,setHeaderHeight]=useState(150);
    const [promo,setPromo]=useState('');const [savedPromo,setSavedPromo]=useState('');const [promoMessage,setPromoMessage]=useState('');
    useEffect(()=>{const header=document.querySelector('header.site-header');const update=()=>{const height=header?.getBoundingClientRect().height||0;setHeaderHeight(height);setCompact(!!panel.current&&panel.current.getBoundingClientRect().bottom<height);};const observer=new ResizeObserver(update);if(header)observer.observe(header);window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);update();return()=>{observer.disconnect();window.removeEventListener('scroll',update);window.removeEventListener('resize',update);};},[]);
    function returnToBooking(){panel.current?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});panel.current?.focus({preventScroll:true});}
    const [slide, setSlide] = useState(0); const touch = useRef<number | null>(null);
    const [hovered, setHovered] = useState(false); const [focused, setFocused] = useState(false); const [reduced, setReduced] = useState(true); const [visible, setVisible] = useState(true); const [touching, setTouching] = useState(false);
    useEffect(() => { const media = window.matchMedia('(prefers-reduced-motion: reduce)'); const motion = () => setReduced(media.matches); const visibility = () => setVisible(!document.hidden); motion(); visibility(); media.addEventListener('change', motion); document.addEventListener('visibilitychange', visibility); return () => { media.removeEventListener('change', motion); document.removeEventListener('visibilitychange', visibility); }; }, []);
    const rotating = !hovered && !focused && !reduced && visible && !touching;
    useEffect(() => { if (!rotating) return; const timer = setTimeout(() => setSlide(i => (i + 1) % slides.length), 6500); return () => clearTimeout(timer); }, [rotating, slide]);
    function go(index: number) { setSlide((index + slides.length) % slides.length); }

    const [intent, setIntent] = useState<'stay' | 'celebrate'>('stay');
    const [slug, setSlug] = useState(properties[0].slug);
    const [party, setParty] = useState({ rooms: 1, adults: 2, children: 0 }); const [dateSignal, setDateSignal] = useState(0); const [checkoutSignal, setCheckoutSignal] = useState(0); const [guestSignal, setGuestSignal] = useState(0);
    const [arrival, setArrival] = useState(''); const [departure, setDeparture] = useState(''); const [guests, setGuests] = useState('2'); const [review, setReview] = useState(false); const [error, setError] = useState('');
    function savePromo(){const code=promo.trim().toUpperCase();if(!/^[A-Z0-9-]{3,24}$/.test(code)){setPromoMessage('Enter a code with 3-24 letters, numbers or hyphens.');return;}setSavedPromo(code);setPromoMessage('Code saved. Discount eligibility will be confirmed at booking.');changed();}
    function changed() { setReview(false); setError(''); }
    const choices = intent === 'stay' ? properties.filter(p => p.hotel) : properties;
    const featured = properties.find(p => p.slug === slides[slide].property)!;
    const selected = properties.find(p => p.slug === slug)!;
    return <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.stage} role="region" aria-roledescription="carousel" aria-label="Hotel and destination inspiration" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false); }} onTouchCancel={() => { touch.current = null; setTouching(false); }} onTouchStart={e => { setTouching(true); touch.current = e.touches[0].clientX; }} onTouchEnd={e => { setTouching(false); if (touch.current !== null) { const delta = e.changedTouches[0].clientX - touch.current; if (Math.abs(delta) > 60) go(slide + (delta < 0 ? 1 : -1)); } touch.current = null; }}>
            {slides.map((photo, i) => <div key={photo.property} className={styles.slide} data-active={slide === i} aria-hidden={slide !== i}><Image src={photo.src} alt={photo.alt} fill sizes="100vw" preload={i === 0} loading={i === 0 ? undefined : 'eager'} className={styles.image} /></div>)}
            <div className={styles.shade} />
            <div className={styles.copy}>
                <p className={styles.eyebrow}><span /> {featured.name.toUpperCase()} &middot; {featured.city.toUpperCase()} <span /></p>
                <div key={slide} className={styles.slideCopy} aria-live={rotating ? 'off' : 'polite'} aria-atomic="true"><h1 id="hero-title">{slides[slide].title}<br /><em>{slides[slide].accent}</em></h1>
                    <p className={styles.description}>{slides[slide].description}</p></div>
                <a className={styles.googleReviews} href={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(featured.name + ' ' + featured.city)} target="_blank" rel="noopener noreferrer"><span className={styles.reviewStar} aria-hidden="true">&#9733;</span><span>Read Google reviews<small>{featured.name} &middot; {featured.city}</small></span><Icon name="arrow" /></a>
                <div className={styles.actions}><Link href={'/properties/' + featured.slug}>Explore this property <Icon name="arrow" /></Link><Link href="/weddings-events">Weddings &amp; celebrations</Link></div>
            </div>
            <button type="button" className={styles.previous} aria-label="Previous photo" onClick={() => go(slide - 1)}><Icon name="arrow" /></button><button type="button" className={styles.next} aria-label="Next photo" onClick={() => go(slide + 1)}><Icon name="arrow" /></button>
        </div>
        <div ref={panel} id="home-booking" tabIndex={-1} className={styles.panel} style={{scrollMarginTop:headerHeight+16}}>
            <div className={styles.panelTop}><div className={styles.tabs} role="group" aria-label="Choose your experience">{(['stay', 'celebrate'] as const).map(value => <button type="button" key={value} aria-pressed={intent === value} onClick={() => { setIntent(value); setPromoMessage(''); setSlug(properties[value === 'stay' ? 0 : 2].slug); setGuests(value === 'stay' ? '2' : '100'); setReview(false); setError(''); }}>{value === 'stay' ? 'Find your stay' : 'Plan a celebration'}</button>)}</div></div>
            <form id="home-stay-form" className={styles.form} onChange={() => { setReview(false); setError(''); }} onSubmit={e => { e.preventDefault(); const now = new Date(); const today = [now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'), String(now.getDate()).padStart(2, '0')].join('-'); if (!arrival || (intent === 'stay' && !departure)) { setError('Please select your dates.'); return; } if (intent === 'celebrate' && (!Number.isInteger(Number(guests)) || Number(guests) < 1 || Number(guests) > 5000)) { setError('Please choose a valid guest count.'); return; } if (arrival < today) { setError('Please choose today or a future date.'); return; } if (intent === 'stay' && departure <= arrival) { setError('Check-out must be after check-in.'); return; } setError(''); setReview(true); }}>
                <div className={styles.field}><BookingPicker label={intent === 'stay' ? 'Hotel' : 'Venue'} kind="property" choices={choices} value={slug} onChange={v => { setSlug(v); changed(); if (intent === 'stay') setDateSignal(n => n + 1); }} /></div>
                <div className={styles.field}><BookingPicker label={intent === 'stay' ? 'Check-in' : 'Event date'} kind="date" value={arrival} openSignal={dateSignal} onChange={v => { setArrival(v); if (departure <= v) setDeparture(''); changed(); if (intent === 'stay') setCheckoutSignal(n => n + 1); }} /></div>
                {intent === 'stay' && <div className={styles.field}><BookingPicker label="Check-out" kind="date" value={departure} rangeStart={arrival} openSignal={checkoutSignal} min={arrival ? (() => { const d = new Date(arrival + 'T12:00:00'); d.setDate(d.getDate() + 1); return [d.getFullYear(), String(d.getMonth() + 1).padStart(2, '0'), String(d.getDate()).padStart(2, '0')].join('-'); })() : undefined} onChange={v => { setDeparture(v); changed(); setGuestSignal(n => n + 1); }} /></div>}
                <div className={styles.field}>{intent === 'stay' ? <BookingPicker label="Rooms & guests" kind="party" value={JSON.stringify(party)} openSignal={guestSignal} onChange={v => { setParty(JSON.parse(v)); changed(); }} /> : <BookingPicker label="Guests" kind="guests" value={guests} max={5000} onChange={v => { setGuests(v); changed(); }} />}</div>
            {intent==='stay'&&<div className={styles.promoRow}><label htmlFor="home-promo"><Icon name="tag"/>Promo code</label><div className={styles.promoInput}><input id="home-promo" onKeyDown={e=>{if(e.key==='Enter'){e.preventDefault();savePromo();}}} value={promo} maxLength={24} autoComplete="off" placeholder="Enter code" onChange={e=>{setPromo(e.target.value.toUpperCase());setSavedPromo('');setPromoMessage('');setReview(false);}}/><button type="button" onClick={savePromo}>Save</button></div>{savedPromo&&<button className={styles.removePromo} type="button" onClick={()=>{setPromo('');setSavedPromo('');setPromoMessage('Code removed.');setReview(false);}}>Remove</button>}</div>}
                <button className={styles.submit} type="submit">{intent === 'stay' ? 'Plan my stay' : 'Plan my event'}<Icon name="arrow" /></button>
            </form>

            {intent==='stay'&&promoMessage&&<p role="status" className={styles.promoStatus}>{promoMessage}</p>}
            {error && <p role="alert" className={styles.error}>{error}</p>}
            {review && <div className={styles.review} role="status"><div><strong>{selected.name}</strong><p>{arrival}{intent === 'stay' ? ' to ' + departure : ''} &middot; {intent === 'stay' ? party.rooms + ' room(s), ' + party.adults + ' adults, ' + party.children + ' children - ' + Math.round((Date.parse(departure) - Date.parse(arrival)) / 86400000) + ' nights' : guests + ' guests'}</p>{intent==='stay'&&savedPromo&&<p>Promo: {savedPromo} &middot; Pending verification</p>}<small>Your plan is ready. Availability and reservations are not live yet.</small></div><Link href={'/properties/' + slug}>Explore this property <Icon name="arrow" /></Link></div>}
        </div>
        {compact&&<div className={styles.scrollBooking} style={{top:headerHeight}} aria-label="Booking quick access"><div><strong>{selected.name}</strong><span>{arrival||'Choose dates'}{intent==='stay'&&departure?' / '+departure:''} &middot; {intent==='stay'?party.rooms+' rooms, '+(party.adults+party.children)+' guests':guests+' guests'}{intent==='stay'&&savedPromo?' / '+savedPromo:''}</span></div><button onClick={returnToBooking}>{intent==='stay'?'Edit stay':'Edit event'} <Icon name="arrow"/></button></div>}

        {compact&&<div className={styles.desktopBooking} role="region" aria-label="Desktop booking bar"><div className={styles.desktopFields}>
        <BookingPicker label={intent==='stay'?'Hotel':'Venue'} kind="property" choices={choices} value={slug} onChange={v=>{setSlug(v);changed();}}/>
        <BookingPicker label={intent==='stay'?'Check-in':'Event date'} kind="date" value={arrival} onChange={v=>{setArrival(v);if(departure<=v)setDeparture('');changed();}}/>
        {intent==='stay'&&<BookingPicker label="Check-out" kind="date" value={departure} rangeStart={arrival} min={arrival?new Date(Date.parse(arrival+'T12:00:00Z')+86400000).toISOString().slice(0,10):undefined} onChange={v=>{setDeparture(v);changed();}}/>}
        {intent==='stay'?<BookingPicker label="Rooms & guests" kind="party" value={JSON.stringify(party)} onChange={v=>{setParty(JSON.parse(v));changed();}}/>:<BookingPicker label="Guests" kind="guests" value={guests} max={5000} onChange={v=>{setGuests(v);changed();}}/>}
        {intent==='stay'&&<div className={styles.dockPromo}><label htmlFor="dock-promo">Promo code</label><div><input id="dock-promo" value={promo} maxLength={24} placeholder="Enter code" onChange={e=>{setPromo(e.target.value.toUpperCase());setSavedPromo('');setPromoMessage('');changed();}} onKeyDown={e=>{if(e.key==='Enter'){e.preventDefault();savePromo();}}}/><button type="button" onClick={savePromo}>Save</button></div></div>}
        <button type="button" className={styles.dockSubmit} onClick={()=>{(document.getElementById('home-stay-form') as HTMLFormElement)?.requestSubmit();returnToBooking();}}>{intent==='stay'?'Plan my stay':'Plan my event'}<Icon name="arrow"/></button>
        </div>{intent==='stay'&&promoMessage&&<p role="status">{promoMessage}</p>}</div>}
    </section>;
}
