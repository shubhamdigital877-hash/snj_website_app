'use client';
import {useState} from 'react';
import BookingPicker from './BookingPicker';
import styles from './PropertyExperience.module.css';
export default function PropertyStay({name}:{name:string}){
 const [checkin,setCheckin]=useState('');const [checkout,setCheckout]=useState('');const [party,setParty]=useState(JSON.stringify({rooms:1,adults:2,children:0}));const [step,setStep]=useState({out:0,party:0});const [summary,setSummary]=useState('');
 const nextDay=checkin?new Date(Date.parse(checkin+'T12:00:00Z')+86400000).toISOString().slice(0,10):undefined;
 const nights=checkin&&checkout?Math.round((Date.parse(checkout)-Date.parse(checkin))/86400000):0;
 return <section id="plan-stay" className={styles.booking}><span className={styles.kicker}>YOUR STAY</span><h2>Make time for {name.includes('Laxmi')?'Vrindavan':'Agra'}.</h2><form onSubmit={e=>{e.preventDefault();const guests=JSON.parse(party);setSummary(`${name} | ${checkin} to ${checkout} | ${nights} nights | ${guests.rooms} rooms, ${guests.adults} adults, ${guests.children} children`);}}>
 <BookingPicker label="Check-in" kind="date" value={checkin} onChange={v=>{setCheckin(v);if(checkout<=v)setCheckout('');setSummary('');setStep(s=>({...s,out:s.out+1}));}}/>
 <BookingPicker label="Check-out" kind="date" value={checkout} min={nextDay} rangeStart={checkin} openSignal={step.out} onChange={v=>{setCheckout(v);setSummary('');setStep(s=>({...s,party:s.party+1}));}}/>
 <BookingPicker label="Rooms & guests" kind="party" value={party} openSignal={step.party} onChange={v=>{setParty(v);setSummary('');}}/>
 {nights>0&&<p className={styles.nights}>{nights} {nights===1?'night':'nights'} selected</p>}
 <button className={styles.primary} disabled={!checkin||nights<1}>Review stay plan <span aria-hidden="true">&rarr;</span></button>
 <p className={styles.note}>Live rates and reservations are not available yet.</p>
 </form>{summary&&<div className={styles.summary} role="status"><strong>Your stay plan</strong><p>{summary}</p><small>This is a plan, not a confirmed reservation.</small><a download="snj-stay-plan.txt" href={'data:text/plain;charset=utf-8,'+encodeURIComponent(summary+'\nNot a confirmed reservation.')}>Save plan &darr;</a></div>}</section>;
}
