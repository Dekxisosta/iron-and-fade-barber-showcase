'use client';
import {useEffect,useRef,useState} from 'react';
import {AnimatePresence,motion,useReducedMotion,useScroll,useTransform} from 'framer-motion';
import {useBooking} from './Booking';
import {S,BR,CATS,IC,AWARDS,REVIEWS,peso} from '../lib/data';

const rise=(i=0)=>({initial:{opacity:0,y:32},whileInView:{opacity:1,y:0},viewport:{once:true,margin:'-60px'},transition:{duration:.6,delay:(i%4)*.08,ease:'easeOut'}});
const Head=({s,h,p,pc})=>(<motion.div className="head" {...rise()}><small>{s}</small><h2>{h}</h2>{p&&<p>{p}</p>}</motion.div>);
const Ic=({id})=><svg className="ic" aria-hidden="true"><use href={'#'+id}/></svg>;
// Scroll-linked parallax layer: the inner layer is taller than its frame and drifts slower than the page.
function Par({className='',children,start='start end',range=14}){
 const ref=useRef(null),rm=useReducedMotion();
 const {scrollYProgress}=useScroll({target:ref,offset:[start,'end start']});
 const y=useTransform(scrollYProgress,[0,1],[`-${range}%`,`${range}%`]);
 return(<div ref={ref} className="par" aria-hidden="true"><motion.div className={'pl '+className} style={{y:rm?0:y}}>{children}</motion.div></div>)}
const Photo=({src,alt,...r})=>(<img src={src} alt={alt} loading="lazy" referrerPolicy="no-referrer" onError={e=>{e.currentTarget.style.display='none'}} {...r}/>);

const CLIPS=['/awards-1.mp4','/awards-2.mp4'];
function VideoBg({start='start end',range=14,overlay=true}){const [i,setI]=useState(0);const rm=useReducedMotion();
 return(<div className={'vbg'+(overlay?'':' nov')} aria-hidden="true"><Par start={start} range={range}><AnimatePresence><motion.video key={i} src={CLIPS[i]} autoPlay={!rm} muted playsInline preload="auto" onEnded={()=>setI(n=>(n+1)%CLIPS.length)} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.9}}/></AnimatePresence></Par></div>)}

function Badge({a,b,c}){
 const L=[];for(const side of[0,1])for(let i=0;i<9;i++){let ph=200+i*15;if(side)ph=360-ph;const r=ph*Math.PI/180,x=100+76*Math.sin(r),y=100-76*Math.cos(r);
  L.push(<ellipse key={side+'-'+i} cx={x.toFixed(1)} cy={y.toFixed(1)} rx="3.6" ry="9" transform={`rotate(${side?ph-55:ph+55} ${x.toFixed(1)} ${y.toFixed(1)})`} fill="currentColor" opacity=".85"/>)}
 return(<svg viewBox="0 0 200 200" role="img" aria-label={`${a} ${b}, ${c} (sample award)`}><circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="100" cy="100" r="62" fill="none" stroke="currentColor" strokeWidth="1" opacity=".6"/>{L}
  <path d="m100 58 3 7h8l-6 5 2 8-7-5-7 5 2-8-6-5h8z" fill="currentColor"/>
  <g textAnchor="middle" fill="currentColor"><text x="100" y="98" style={{fontFamily:'var(--fb)'}} fontSize="11" letterSpacing="4" fontWeight="600">{a}</text>
  <text x="100" y={b.length>7?126:128} style={{fontFamily:'var(--fd)'}} fontWeight="800" fontSize={b.length>7?18:26}>{b}</text>
  <text x="100" y="146" style={{fontFamily:'var(--fb)'}} fontSize="7.5" letterSpacing="1.6" fontWeight="600">{c}</text></g></svg>)}

function Card({s,ft,i,book}){return(<motion.article className={'card'+(ft?' ft':'')} {...rise(i)} whileHover={{y:-6}}><Ic id={IC[s.c]}/><h3>{s.n}</h3><p>{s.d}</p><span className="p">{peso(s.p)}</span>
 <span className="chip">{s.m} min{s.pk&&s.sv!=='₱0'?' · save '+s.sv:''}</span><button className="lnk" onClick={()=>book({svc:s.id})}>Book this</button></motion.article>)}

export default function Landing(){
 const book=useBooking();
 const [sc,setSc]=useState(false);const [ac,setAc]=useState(CATS[0]);const [isOpen,setOpen]=useState(null);const [sent,setSent]=useState(false);
 useEffect(()=>{const f=()=>setSc(window.scrollY>40);f();window.addEventListener('scroll',f,{passive:true});
  const h=+new Date().toLocaleString('en-GB',{timeZone:'Asia/Manila',hour:'numeric',hour12:false});setOpen(h>=10&&h<21);return()=>window.removeEventListener('scroll',f)},[]);
 const {scrollY}=useScroll();const hy=useTransform(scrollY,[0,700],[0,-120]);const ho=useTransform(scrollY,[0,520],[1,.1]);
 const barbers=BR.flatMap(b=>b.b.map((n,j)=>({n,b:b.n,u:b.ph[j]})));
 return(<>
 <motion.header className={sc?'sc':''} initial={{y:-90}} animate={{y:0}} transition={{duration:.6,ease:'easeOut'}}><div className="bar">
  <nav aria-label="Main"><a href="#services">Services</a><a href="#team">Barbers</a><a href="#branches">Branches</a></nav>
  <a className="logo" href="#top">IRON &amp; FADE<small>BARBERSHOP</small></a><button className="btn sm o" onClick={()=>book()}>Book now</button></div></motion.header>
 <main id="top">
 <div className="hero"><VideoBg start="start start" range={16} overlay={false}/><motion.div className="wrap" style={{y:hy,opacity:ho}}><h1>
  <motion.span style={{display:'block'}} initial={{opacity:0,x:-70}} animate={{opacity:1,x:0}} transition={{duration:.9,ease:'easeOut'}}><span className="scr">Sharp cuts.</span></motion.span>
  <motion.span style={{display:'block'}} initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:.8,delay:.35,ease:'easeOut'}}><span className="bold">Strong identity!</span></motion.span></h1>
  <motion.div className="row" initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:.8}}><motion.button className="btn big" whileHover={{scale:1.04}} whileTap={{scale:.97}} onClick={()=>book()}>Book now</motion.button><span>Open daily 10 AM – 9 PM</span></motion.div></motion.div></div>

 <section id="awards"><div className="vbg" aria-hidden="true"><Par className="abg"/></div><div className="wrap"><Head s="Recognition" h="Awards" p="Sample awards for design review. These are placeholders, not real recognition."/>
  <div className="aw">{AWARDS.map((a,i)=>(<motion.div key={i} initial={{opacity:0,scale:.8,rotate:-8}} whileInView={{opacity:1,scale:1,rotate:0}} viewport={{once:true,margin:'-40px'}} transition={{duration:.6,delay:i*.12,type:'spring',stiffness:140,damping:16}} whileHover={{scale:1.06,rotate:2}}>
   <Badge a={a[0]} b={a[1]} c={a[2]}/><span className="tag" style={{marginTop:8}}>Sample award</span></motion.div>))}</div></div></section>

 <section className="say"><div className="wrap"><motion.div {...rise()}><div className="qw"><svg className="q q1" viewBox="0 0 48 48" aria-hidden="true"><path d="M6 28c0-9 5-16 14-19l1.5 3C16 14 14 18 14 22h6v14H6zM28 28c0-9 5-16 14-19l1.5 3C38 14 36 18 36 22h6v14H28z"/></svg>
  <p>Traditional barbering with a modern edge. Three branches, one standard: sharp cuts, honest prices, and a chair that’s ready when you are.</p>
  <svg className="q q2" viewBox="0 0 48 48" aria-hidden="true"><path d="M6 28c0-9 5-16 14-19l1.5 3C16 14 14 18 14 22h6v14H6zM28 28c0-9 5-16 14-19l1.5 3C38 14 36 18 36 22h6v14H28z"/></svg></div>
  <div className="by"><b>Marcus Valdez</b><span>Founder &amp; CEO, Iron &amp; Fade Barbershop</span><span className="tag">Placeholder name</span></div></motion.div></div></section>

 <div className="stats"><div className="wrap">{[['st','3','Branches'],['sc','6','Barbers'],['ck','10–9','Open daily'],['gp','Up to 4','Per group booking']].map(([i,b,l],k)=>(
  <motion.div key={l} {...rise(k)}><Ic id={i}/><b>{b}</b><span>{l}</span></motion.div>))}</div></div>

 <section id="services"><div className="wrap"><Head s="Our treatment" h="Services" p="Clear prices in pesos, with durations so you know how long you’ll be in the chair."/>
  <div className="tabs" role="tablist">{CATS.map(c=>(<button key={c} role="tab" aria-selected={c===ac} className={c===ac?'on':''} onClick={()=>setAc(c)}>{c}</button>))}</div>
  <AnimatePresence mode="wait"><motion.div key={ac} className="grid" initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:.25}}>{S.filter(s=>s.c===ac).map((s,i)=>(<Card key={s.id} s={s} i={i} book={book}/>))}</motion.div></AnimatePresence></div></section>

 <section id="packages" className="lt"><div className="wrap"><Head s="Bundled savings" h="Packages" p="Fixed durations. Hair & Beard Combo is a package, so it earns no loyalty stamps and takes no extra discounts."/>
  <div className="grid">{S.filter(s=>s.pk).map((s,i)=>(<Card key={s.id} s={s} ft={s.id==='gent'} i={i} book={book}/>))}</div></div></section>

 <section id="promos"><div className="wrap"><Head s="One discount per transaction" h="Promotions" p="Applied automatically. Each person in a group is their own transaction."/>
  <div className="grid">
  <motion.div className="card" {...rise(0)} whileHover={{y:-6}}><Ic id="ck"/><h3>Student Day</h3><span className="chip">Every Tuesday</span><p>₱30 off the Student Cut: ₱120 becomes ₱90. Show a valid student ID at the branch.</p></motion.div>
  <motion.div className="card ft" {...rise(1)} whileHover={{y:-6}}><Ic id="sc"/><h3>Loyalty card</h3><span className="chip">Every 6th cut</span><p>Half off a haircut. One digital stamp per qualifying haircut, tied to your mobile number. Stamps and rewards never expire.</p><span className="tag">OTP sign-up simulated in prototype</span></motion.div>
  <motion.div className="card" {...rise(2)} whileHover={{y:-6}}><Ic id="pl"/><h3>Father’s Day</h3><span className="chip">June 12–21</span><p>15% off Fresh Start (₱162), Executive Groom (₱230) and Complete Gentleman (₱332).</p></motion.div></div></div></section>

 <section id="team" className="dk2"><div className="wrap"><Head s="The crew" h="Barbers" p="Book your favorite, or choose “no preference” and we’ll assign whoever is free."/>
  <div className="grid">{barbers.map((x,i)=>(<motion.div className="pt" key={x.n} {...rise(i)}><motion.div className="ph" whileHover={{scale:1.02}} style={{background:`linear-gradient(160deg,hsl(0,0%,${48+i*4}%),hsl(0,0%,13%))`}}>{x.n[0]}<Photo src={x.u} alt={`Placeholder portrait of ${x.n}`}/></motion.div>
   <h3>{x.n}</h3><p style={{opacity:.7,fontSize:14}}>{x.b}</p><span className="tag" style={{alignSelf:'center'}}>Placeholder name &amp; photo</span></motion.div>))}</div></div></section>

 <section id="branches"><div className="wrap"><Head s="Find us" h="Branches" p="Three locations in Santa Rosa, Laguna. Same hours everywhere: 10:00 AM to 9:00 PM, daily."/>
  <div className="grid">{BR.map((b,i)=>(<motion.div className="card" key={b.id} {...rise(i)} whileHover={{y:-6}}><div className="bimg"><Photo src={b.img} alt={`Placeholder photo of the ${b.n} branch`}/></div>
   {isOpen!==null&&<span className={'open'+(isOpen?'':' cl')}>{isOpen?'Open now · closes 9 PM':'Closed · opens 10 AM'}</span>}<h3>{b.n}</h3><p>{b.a}<br/>{b.t}<br/>{b.b.length} barber{b.b.length>1?'s':''}</p><span className="tag">Placeholder</span>
   <button className="btn sm" style={{marginTop:12}} onClick={()=>book({br:b.id})}>Book here</button></motion.div>))}</div>
  <p className="note">Placeholder details: addresses and phone numbers are fictional until official information is provided.</p></div></section>

 <section id="reviews" className="lt"><div className="wrap"><Head s="What people say" h="Reviews" p="Sample content for design review. These reviewers, jobs and companies are fictional."/>
  <div className="grid">{REVIEWS.map((r,i)=>(<motion.div className="rv" key={r.n} {...rise(i)}><div className="av">{r.l}<Photo src={r.u} alt={`Placeholder portrait of ${r.n}`}/></div><div className="stars">{r.s}</div><p>{r.q}</p>
   <b style={{font:'700 14px var(--fb)',letterSpacing:'.16em',textTransform:'uppercase'}}>{r.n}</b><span style={{fontSize:13,opacity:.75,marginTop:-6}}>{r.r}</span><span className="tag">Sample review</span></motion.div>))}</div></div></section>

 <section id="policies"><div className="wrap"><Head s="Simple rules" h="Policies"/><div className="grid">{[
  ['Cancel or reschedule','Up to 2 hours before each appointment using your secure link. Later than that, contact the branch. Late cancellations are recorded with no fee.'],
  ['No-shows','Marked 15 minutes after the start time. Three within 30 days pause online booking for 7 days; you can still book in person.'],
  ['Payment','No deposit. Pay after your service: Cash, GCash, Maya or Bank transfer.'],
  ['Group bookings','Up to 4 people under one reference, each with their own service, barber, price and discount.']].map(([h,p],i)=>(
  <motion.div className="card" key={h} {...rise(i)}><h3>{h}</h3><p>{p}</p></motion.div>))}</div></div></section>

 <section id="contact" className="ct"><div className="cl"><Par className="cbg"/><motion.div className="ci" {...rise()}><small>Questions?</small><h2>Contact</h2><p>Ask about services, groups or a branch. We’ll reply as soon as we can.</p></motion.div></div>
  <div className="cr"><motion.form {...rise()} onSubmit={e=>{e.preventDefault();setSent(true);e.currentTarget.reset()}}><label htmlFor="cn">Name</label><input id="cn" required/><label htmlFor="cm">Email or phone</label><input id="cm" required/><label htmlFor="cx">Message</label><textarea id="cx" rows={5} required/>
   <p style={{marginTop:20}}><button className="btn" type="submit">Send message</button></p>{sent&&<p className="note">Thanks. This prototype doesn’t send messages yet; the form is ready to connect.</p>}</motion.form></div></section>
 </main>
 <footer><div className="wrap"><p style={{marginBottom:10,font:'600 13px var(--fb)',letterSpacing:'.14em',textTransform:'uppercase'}}><a href="#packages">Packages</a> · <a href="#promos">Promotions</a> · <a href="#reviews">Reviews</a> · <a href="#policies">Policies</a> · <a href="#contact">Contact</a></p>
 Iron &amp; Fade Barbershop · Est. 2021 · Santa Rosa, Laguna, PH · Fictional business with placeholder branch data · Copy pending business-owner approval</div></footer></>)}
