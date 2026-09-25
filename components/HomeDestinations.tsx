import Image from 'next/image';
import Link from 'next/link';
import Icon from './Icon';
import {destinations} from '../lib/destinations';
import {properties} from '../lib/properties';
import styles from './HomeDestinations.module.css';
export default function HomeDestinations(){return <section className={styles.section} aria-labelledby="destinations-title"><header className={styles.heading}><h2 id="destinations-title">Explore Our Destinations</h2></header><div className={styles.grid}>{destinations.map((d,i)=><Link href={'/destinations/'+d.slug} key={d.slug} className={styles.card} aria-label={'Explore '+d.name}><Image src={d.image} alt={d.alt} fill sizes="(max-width:700px) 88vw, 44vw"/><div className={styles.shade}/><div className={styles.top}><span>UTTAR PRADESH, INDIA</span><span>0{i+1}</span></div><div className={styles.copy}><p>{d.tag}</p><h3>{d.name}</h3><div className={styles.bottom}><small>{properties.filter(p=>p.city===d.name).length} SNJ {i===0?'properties':'property'}</small><strong>Explore {d.name} <Icon name="arrow"/></strong></div></div></Link>)}</div></section>;}
