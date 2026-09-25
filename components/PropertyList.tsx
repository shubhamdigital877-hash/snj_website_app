'use client';
import Link from 'next/link';
import {useState} from 'react';
import {properties} from '../lib/properties';
import Icon from './Icon';
export default function PropertyList({initialCity='All destinations',hotelsOnly=false}:{initialCity?:string;hotelsOnly?:boolean}){
 const [query,setQuery]=useState('');const [city,setCity]=useState(initialCity);const list=properties.filter(p=>(!hotelsOnly||p.hotel)&&(city==='All destinations'||p.city===city)&&(p.name+' '+p.city).toLowerCase().includes(query.toLowerCase().trim()));
 return <><div className="page-search"><label className="property-search"><Icon name="search" /><input type="search" aria-label="Search properties by name or city" placeholder="Search a hotel, venue or city..." value={query} onChange={e=>setQuery(e.target.value)}/></label><label className="city-filter">Destination<select value={city} onChange={e=>setCity(e.target.value)}>{['All destinations','Agra','Vrindavan'].map(c=><option key={c}>{c}</option>)}</select></label></div><p className="results-count" role="status">{list.length} {list.length===1?'property':'properties'} found</p><div className="property-grid">{list.map(p=><article key={p.slug} className="property-card"><span className="eyebrow">{p.city}</span><h2>{p.name}</h2><p>{p.kind}</p><Link href={'/properties/'+p.slug}>View property <Icon name="arrow" /></Link></article>)}</div>{!list.length&&<p className="empty-search">No matching property. Try another city or property name.</p>}</>;
}
