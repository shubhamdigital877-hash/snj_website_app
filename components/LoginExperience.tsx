'use client';
import {useRef, useState} from 'react';
import Link from 'next/link';
import Icon from './Icon';
import styles from './LoginExperience.module.css';

export default function LoginExperience({onClose}: {onClose: () => void}) {
 const [step,setStep]=useState<'phone'|'otp'>('phone');
 const [otp,setOtp]=useState('');
 const [phone, setPhone] = useState('');
 const [error, setError] = useState('');
 const [notice, setNotice] = useState('');
 const phoneRef = useRef<HTMLInputElement>(null);
 return <div>
  <section className={styles.card}>
   <button className={styles.close} onClick={onClose} aria-label="Close login"><Icon name="close"/></button>
   <div className={styles.heading}>
    <span className={styles.emblem}><Icon name="user"/></span>
    <h1 id="login-heading">{step==='phone'?'Welcome back':'Enter OTP'}</h1>
    <p>{step==='phone'?'Login to your SNJ account':'+91 '+phone}</p>
   </div>
   <form noValidate onSubmit={event => {
    event.preventDefault();
    if(step==='otp'){setNotice('OTP verification is not connected yet.');return;}
    if (!/^[6-9]\d{9}$/.test(phone)) {
     setError('Enter a valid 10-digit mobile number.');
     setNotice('');
     phoneRef.current?.focus();
     return;
    }
    setError('');
    setStep('otp');
   }}>
    {step==='phone'?<><label htmlFor="mobile-number">Mobile number</label>
    <div className={styles.phoneField} data-invalid={!!error}>
     <span className={styles.country} aria-label="India, country code +91">
      <svg className={styles.flag} viewBox="0 0 30 20" aria-hidden="true"><path fill="#f49b46" d="M0 0h30v7H0z"/><path fill="#fff" d="M0 7h30v6H0z"/><path fill="#398958" d="M0 13h30v7H0z"/><circle cx="15" cy="10" r="2.5" fill="none" stroke="#334777" strokeWidth=".8"/><path d="M15 7.5v5M12.5 10h5M13.2 8.2l3.6 3.6m0-3.6-3.6 3.6" stroke="#334777" strokeWidth=".4"/></svg>
      <span>+91</span>
     </span>
     <input ref={phoneRef} id="mobile-number" type="tel" inputMode="numeric" autoComplete="tel-national" placeholder="Enter mobile number" value={phone} aria-invalid={!!error} aria-describedby={error ? 'login-error' : undefined} onChange={event => {
      let digits = event.target.value.replace(/\D/g, '');
      if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2);
      setPhone(digits.slice(0, 10)); setError(''); setNotice('');
     }}/>
    </div>
    </>:<><button type="button" className={styles.change} onClick={()=>{setStep('phone');setOtp('');setNotice('');}}>Change number</button><label htmlFor="otp-code">6-digit OTP</label><input autoFocus id="otp-code" className={styles.otp} inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={otp} placeholder="000000" onChange={e=>{setOtp(e.target.value.replace(/\D/g,'').slice(0,6));setNotice('');}}/></>}
    {error && <p id="login-error" role="alert" className={styles.error}>{error}</p>}
    <button className={styles.primary} type="submit" disabled={step==='otp'&&otp.length!==6}>{step==='phone'?'Continue':'Verify OTP'} <Icon name="arrow"/></button>
    {notice && <p role="status" className={styles.notice}>{notice}</p>}
   </form>
   <div className={styles.divider}><span/>or<span/></div>
   <Link className={styles.guest} onClick={onClose} href="/properties">Continue as a guest <Icon name="arrow"/></Link>
  </section>
 </div>;
}
