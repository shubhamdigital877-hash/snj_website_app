'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect,useRef,useState } from 'react';
import Icon from './Icon';
import styles from './TopBar.module.css';
export default function TopBar(){
 const [open,setOpen]=useState(false);const root=useRef<HTMLDivElement>(null);const trigger=useRef<HTMLButtonElement>(null);const path=usePathname();
 useEffect(()=>setOpen(false),[path]);
 useEffect(()=>{const outside=(e:PointerEvent)=>{if(!root.current?.contains(e.target as Node))setOpen(false);};document.addEventListener('pointerdown',outside);return()=>document.removeEventListener('pointerdown',outside);},[]);
 return <div className={styles.bar}><div className={styles.inner}>
 <div ref={root} className="destination-nav" onPointerEnter={e=>{if(e.pointerType==='mouse')setOpen(true);}} onPointerLeave={e=>{if(e.pointerType==='mouse'&&!e.currentTarget.contains(document.activeElement))setOpen(false);}} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setOpen(false);}} onKeyDown={e=>{if(e.key==='Escape'){e.preventDefault();e.stopPropagation();setOpen(false);trigger.current?.focus();}}}>
 <button ref={trigger} className={styles.destinationTrigger} aria-label="Explore destinations" aria-expanded={open} aria-controls="destination-menu" onClick={()=>setOpen(!open)}><span className={styles.pin}><Icon name="pin" /></span><span className={styles.destinationLabel}>EXPLORE</span><span className={styles.destinationValue}>Agra<i aria-hidden="true"/>Vrindavan</span><Icon name="chevron" /></button>
 {open&&<div id="destination-menu" className="destination-dropdown" onClick={()=>setOpen(false)}><Link href="/properties?city=Agra">Agra <span>3 properties</span></Link><Link href="/properties?city=Vrindavan">Vrindavan <span>1 property</span></Link><Link href="/properties">All destinations <Icon name="arrow" /></Link></div>}
 </div>
 <div className={styles.message}><Icon name="sparkle" /><span>A stay to remember. <span className={styles.messageAccent}>A celebration to cherish.</span></span></div>
 <div className={styles.actions}><Link className={styles.bookingsAction} href="/my-bookings"><Icon name="suitcase" />My Bookings</Link><Link className={styles.eventAction} href="/weddings-events"><Icon name="calendar" />Plan a celebration</Link><span className={styles.divider}/><Link className={styles.downloadAction} href="/download-app"><span className={styles.appIcon}><Icon name="smartphone" /></span>Download app<Icon name="download" /></Link></div>
 </div></div>;
}
