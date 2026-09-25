'use client';
import { useState } from 'react';
import type { FormEvent } from 'react';
import Icon from './Icon';
const venues = ['Not decided yet', 'SNJ Taj Grand', 'SNJ Laxmi Dham', 'SNJ Gold Garden', 'SNJ Pearls Garden'];
function today() { const d=new Date(); return [d.getFullYear(), String(d.getMonth()+1).padStart(2,'0'), String(d.getDate()).padStart(2,'0')].join('-'); }
export default function EventPlanner({initialOccasion="Wedding"}:{initialOccasion?:string}) {
 const [status,setStatus]=useState('');
 const [summary,setSummary]=useState('');
 function prepare(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const form=e.currentTarget; const data=new FormData(form);
  const date=String(data.get('date'));
  if(date < today()){ const input=form.elements.namedItem('date') as HTMLInputElement; input.setCustomValidity('Please choose today or a future date.');input.reportValidity();return; }
  const text=['SNJ GROUP - EVENT ENQUIRY DRAFT','', 'Venue: '+data.get('venue'),'Event: '+data.get('event'),'Date: '+date,'Guests: '+data.get('guests'),'Requirements: '+(String(data.get('notes')).trim() || 'To be discussed'),'', 'This is a planning draft, not a submitted enquiry or a confirmed reservation. Availability and pricing need confirmation from the SNJ team.'].join('\n');
  setSummary(text);setStatus('Your enquiry draft is ready. Download it or copy it to share with the SNJ team.');
 }
 function download(){const url=URL.createObjectURL(new Blob([summary],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='SNJ-event-enquiry.txt';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);setStatus('Draft downloaded. It has not been sent to SNJ.');}
 async function copy(){try{await navigator.clipboard.writeText(summary);setStatus('Draft copied. You can paste it into your conversation with the SNJ team.');}catch{setStatus('Clipboard is unavailable. Please use Download draft instead.');}}
 return <section className="event-planner" aria-labelledby="event-planner-title"><div className="planner-intro"><span className="planner-icon"><Icon name="calendar" /></span><p className="eyebrow">LET US PLAN SOMETHING SPECIAL</p><h3 id="event-planner-title">Your occasion.<br/>Your way.</h3><p>Gather your event details in one place, then prepare an enquiry to share with our team.</p><div className="planner-steps"><span>01 &nbsp; Choose your occasion</span><span>02 &nbsp; Prepare your enquiry</span><span>03 &nbsp; Discuss availability & pricing</span></div><p className="planner-disclaimer">Online enquiry submission is coming soon. This planner creates a draft only; it does not reserve a venue.</p></div>
 <form className="planner-form" onSubmit={prepare} onChange={()=>{setSummary('');setStatus('');}}>
 <div className="planner-fields"><label>Preferred venue<select name="venue" defaultValue={venues[0]}>{venues.map(v=><option key={v}>{v}</option>)}</select></label><label>Occasion<select name="event" defaultValue={initialOccasion}>{['Wedding','Reception','Engagement','Birthday','Corporate event','Bhagwat Katha','Other celebration'].map(v=><option key={v}>{v}</option>)}</select></label><label>Event date<input name="date" type="date" min={today()} required onChange={e=>e.target.setCustomValidity('')} /></label><label>Expected guests<input name="guests" type="number" min="1" step="1" required placeholder="e.g. 250" inputMode="numeric" /></label></div>
 <label>Anything else? <span className="optional">(optional)</span><textarea name="notes" rows={3} maxLength={1500} placeholder="Rooms for guests, catering, decoration or special arrangements..." /></label>
 <button className="book-button" type="submit">Prepare enquiry <Icon name="arrow" /></button>
 {summary && <div className="draft-result"><h4>Your enquiry draft</h4><pre>{summary}</pre><div className="draft-actions"><button type="button" onClick={download}><Icon name="download" /> Download draft</button><button type="button" onClick={copy}><Icon name="copy" /> Copy details</button></div></div>}
 <p className="planner-status" role="status">{status}</p>
 </form></section>;
}
