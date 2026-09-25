import Image from 'next/image';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import PageShell from '../../../components/PageShell';
import {destinations} from '../../../lib/destinations';
import {properties} from '../../../lib/properties';
import styles from './page.module.css';
export function generateStaticParams(){return destinations.map(d=>({city:d.slug}));}
export async function generateMetadata({params}:{params:Promise<{city:string}>}){const {city}=await params;const d=destinations.find(d=>d.slug===city);if(!d)notFound();return {title:d.name+' Hotels & Celebrations | SNJ Group',description:d.intro};}
export default async function Page({params}:{params:Promise<{city:string}>}){const {city}=await params;const d=destinations.find(d=>d.slug===city);if(!d)notFound();return <PageShell><nav className="property-breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span aria-current="page">{d.name}</span></nav><p className="eyebrow">{d.tag}</p><h1>Discover {d.name}</h1><p className="page-intro">{d.intro}</p><div className={styles.photo}><Image src={d.image} alt={d.alt} fill sizes="90vw" preload/></div><h2 className={styles.title}>{d.title}</h2><div className={styles.ideas}>{d.ideas.map(item=><article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div><h2 className={styles.title}>Our properties in {d.name}</h2><div className="property-grid">{properties.filter(p=>p.city===d.name).map(p=><article className="property-card" key={p.slug}><h3>{p.name}</h3><p>{p.kind}</p><Link href={'/properties/'+p.slug}>Explore {p.name} &rarr;</Link></article>)}</div><Link className={styles.other} href={'/destinations/'+(city==='agra'?'vrindavan':'agra')}>Also explore {city==='agra'?'Vrindavan':'Agra'} &rarr;</Link></PageShell>;}
