import Image from 'next/image';
import Link from 'next/link';
import Icon from './Icon';
import styles from './HomeCelebrations.module.css';
export default function HomeCelebrations(){return <section className={styles.section} aria-labelledby="celebrations-title"><div className={styles.layout}>
 <div className={styles.photo}><Image src="/images/wedding-table.jpg" alt="Wedding table with flowers and candles, illustrative event inspiration" fill sizes="(max-width:760px) 90vw, 45vw"/><div className={styles.overlay}/></div>
 <div className={styles.content}><h2 id="celebrations-title">Weddings &amp; Celebrations</h2><p className={styles.intro}>Wedding and event venues in Agra and Vrindavan.</p>
 <div className={styles.occasions}>{['Wedding','Engagement','Birthday','Bhagwat Katha'].map((name,i)=><Link key={name} href={'/weddings-events?occasion='+encodeURIComponent(name)}><span className={styles.number}>0{i+1}</span><span><strong>{name}</strong></span><Icon name="arrow"/></Link>)}</div>
 <div className={styles.actions}><Link className={styles.primary} href="/weddings-events">Plan your event <Icon name="arrow"/></Link><Link href="#celebration-venues">Explore venues <Icon name="arrow"/></Link></div></div>
 </div><div id="celebration-venues" className={styles.venues}><div><h3>Our venues</h3></div><Link href="/properties/snj-gold-garden"><span>SNJ Gold Garden<small>Agra &middot; Lawn &amp; banquet</small></span><Icon name="arrow"/></Link><Link href="/properties/snj-pearls-garden"><span>SNJ Pearls Garden<small>Agra &middot; Weddings &amp; events</small></span><Icon name="arrow"/></Link><Link href="/properties/snj-laxmi-dham"><span>SNJ Laxmi Dham<small>Vrindavan &middot; Stays &amp; celebrations</small></span><Icon name="arrow"/></Link></div></section>;}
