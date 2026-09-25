import Image from 'next/image';
import Link from 'next/link';
import Icon from './Icon';
import {properties} from '../lib/properties';
import styles from './HomeProperties.module.css';
export default function HomeProperties(){
 return <section id="our-properties" className={styles.section} aria-labelledby="properties-heading">
  <div className={styles.heading}><div><h2 id="properties-heading">Our Hotels &amp; Venues</h2></div><div className={styles.intro}><Link href="/properties">Explore all properties <Icon name="arrow"/></Link></div></div>
  <div className={styles.grid}>{properties.map((p,i)=><article className={styles.card} key={p.slug}>
   <div className={styles.visual} data-venue={!p.hotel} data-pearl={i===3}>
    {p.hotel?<Image src={i===0?'/images/hotel-room.jpg':'/images/hotel-lounge.jpg'} alt="Illustrative hotel interior" fill sizes="(max-width:700px) 88vw, 44vw" className={styles.image}/>:<div className={styles.venueArt} aria-hidden="true"><div className={styles.arch}/><div className={styles.archInner}/><div className={styles.orb}/><svg viewBox="0 0 220 180"><path d="M15 180Q100 110 180 5M58 142Q0 55 82 108M103 92Q50 12 124 61M140 50Q140 5 186 7M103 93Q181 116 151 54M59 142Q139 167 112 104"/></svg></div>}
    <div className={styles.badges}><span><Icon name={p.hotel?'bed':'sparkle'}/>{p.hotel?'HOTEL & STAYS':'WEDDINGS & EVENTS'}</span><span>0{i+1}</span></div>
    <div className={styles.location}><Icon name="pin"/>{p.city}{p.hotel&&<small>Illustrative image</small>}</div>
   </div>
   <div className={styles.body}><p className={styles.kind}>{p.kind}</p><h3><Link href={'/properties/'+p.slug}>{p.name}</Link></h3><p className={styles.description}>{p.description}</p><ul className={styles.features}>{p.features.slice(0,3).map(f=><li key={f}>{f}</li>)}</ul><div className={styles.cardBottom}><Link href={'/properties/'+p.slug} aria-label={'View '+p.name}>View property <span><Icon name="arrow"/></span></Link></div></div>
  </article>)}</div>
 </section>;
}
