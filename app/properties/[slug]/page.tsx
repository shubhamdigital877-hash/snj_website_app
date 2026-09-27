import {notFound} from 'next/navigation';
import Image from 'next/image';
import Icon, {type IconName} from '../../../components/Icon';
import Link from 'next/link';
import {properties} from '../../../lib/properties';
import PropertyGallery from '../../../components/PropertyGallery';
import PropertyRooms from '../../../components/PropertyRooms';
import styles from '../../../components/PropertyExperience.module.css';
const amenityIcons: Record<string, IconName> = {'Hotel stays':'bed','Restaurant':'restaurant','Banquet':'banquet','Rooftop':'rooftop','Events':'calendar','Wedding lawn':'garden','Wedding venue':'banquet','Weddings':'diamond','Celebrations':'sparkle','Spiritual visits':'temple','Bhagwat Katha':'temple'};
export function generateStaticParams(){return properties.map(p=>({slug:p.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=properties.find(p=>p.slug===slug);if(!p)notFound();return {title:p.name+', '+p.city+' | SNJ Group',description:p.description};}
export default async function Page({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const p=properties.find(p=>p.slug===slug);if(!p)notFound();
 const photos=p.hotel?[['hotel-room.jpg','Rooms'],['hotel-lounge.jpg','Lounge'],['wedding-table.jpg','Celebrations']]:[['wedding-table.jpg','Celebrations']];
 const map='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(p.name+' '+p.city);
 return <main id="main-content" tabIndex={-1} className={styles.page}>
 <header className={styles.propertyTitle}><h1>{p.name}</h1><span aria-hidden="true">&middot;</span><p>{p.city}</p></header>
 <PropertyGallery photos={photos} hotel={p.hotel}/>
 <nav className={styles.sections} aria-label="Property sections">{p.hotel&&<a href="#rooms">Rooms & offers</a>}<a href="#overview">Overview</a><a href="#facilities">Facilities</a><a href="#location">Location</a><a href="#details">Good to know</a></nav>
 {p.hotel&&<PropertyRooms name={p.name}/>}<div className={styles.layout}><div><section id="overview" className={styles.section}><p className={styles.kicker}>{p.hotel?'STAY & CELEBRATE':'GATHER & CELEBRATE'}</p><h2>{p.hotel?'Your time in '+p.city+'.':'A setting for your occasion.'}</h2><p>{p.description}</p></section>
 <section id="facilities" className={styles.section}><h2>{p.hotel?'Amenities & facilities':'Spaces & occasions'}</h2><div className={styles.features}>{p.features.map(f=><div key={f}><span className={styles.amenityIcon}><Icon name={amenityIcons[f] || 'sparkle'}/></span><h3>{f}</h3></div>)}</div></section>
 <section id="location" className={styles.section}><p className={styles.kicker}>THE DESTINATION</p><h2>Discover {p.city}</h2><div className={styles.location}><Image src={'/images/'+(p.city==='Agra'?'agra-taj-mahal.jpg':'vrindavan-prem-mandir.jpg')} alt={p.city==='Agra'?'Taj Mahal in Agra':'Prem Mandir in Vrindavan'} width={640} height={400}/><div><p>{p.city==='Agra'?'Explore Agra\u2019s heritage and plan time for the Taj Mahal.':'Plan a visit to Vrindavan\u2019s temples and spiritual landmarks.'}</p><Link href={'/destinations/'+p.city.toLowerCase()}>Explore the destination &rarr;</Link><a href={map} target="_blank" rel="noreferrer">Find the property <Icon name="external"/></a></div></div></section>
 <section id="details" className={styles.section}><h2>Good to know</h2>{[[p.hotel?'Rooms & rates':'Capacity & packages',p.hotel?'Room categories, prices and availability will be added once confirmed.':'Venue capacity and event packages will be added once confirmed.'],['Photos','The current images are inspiration photography. Property photographs will be added once available.'],[p.hotel?'Check-in & hotel policies':'Event arrangements',p.hotel?'Check-in times, cancellation terms and occupancy policies need confirmation with the property.':'Confirm your guest count, dates, catering and decoration requirements with the property before booking.']].map(([q,a])=><details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</section></div>
 <aside>{p.hotel?<section className={styles.booking}><h2>Your next stay</h2><a className={styles.primary} href="#rooms">Explore rooms <Icon name="arrow"/></a></section>:<section className={styles.booking}><p className={styles.kicker}>YOUR CELEBRATION</p><h2>Begin with an occasion.</h2><p>Choose your event date and guest count to prepare your plan.</p><Link className={styles.primary} href="/weddings-events">Plan an event &rarr;</Link></section>}</aside></div>
 <section className={styles.more}><div><p className={styles.kicker}>MORE FROM SNJ</p><h2>Find your next setting.</h2></div><div>{properties.filter(x=>x.slug!==p.slug).map(x=><Link key={x.slug} href={'/properties/'+x.slug}><small>{x.city}</small><strong>{x.name}</strong><span>{x.kind} &rarr;</span></Link>)}</div></section>
 <div className={styles.mobileAction}><span>{p.name}<small>{p.city}</small></span><a className={styles.primary} href={p.hotel?'#plan-stay':'/weddings-events'}>{p.hotel?'Plan your stay':'Plan an event'} &rarr;</a></div>
 </main>;
}
