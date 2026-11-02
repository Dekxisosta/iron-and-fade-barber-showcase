'use client';
import {createContext,useContext,useEffect,useState} from 'react';
import {AnimatePresence,motion} from 'framer-motion';
import {BR,S,peso} from '../lib/data';
import {CLOSE,OPEN,MAXP,sv,hm,manilaToday,planFor,commit,price} from '../lib/booking';

const Ctx=createContext(()=>{});
export const useBooking=()=>useContext(Ctx);
const fresh=()=>({step:0,br:null,ppl:[{s:null,b:'any'}],date:'',time:null,name:'',phone:'',email:'',notes:'',ref:null,plan:null,err:''});
const NAMES=['Branch','People','Date & time','Details'];
const GROUPS=['Haircuts','Beard & Shave','Treatments','Packages'];

export function BookingProvider({children}){
 const [open,setOpen]=useState(false);
 const [st,setSt]=useState(fresh);
 const set=p=>setSt(s=>({...s,...p}));
 const openBook=(o={})=>{const f=fresh();if(o.svc)f.ppl[0].s=o.svc;if(o.br){f.br=o.br;f.step=1}setSt(f);setOpen(true)};
 useEffect(()=>{if(!open)return;const k=e=>e.key==='Escape'&&setOpen(false);window.addEventListener('keydown',k);document.body.style.overflow='hidden';
  return()=>{window.removeEventListener('keydown',k);document.body.style.overflow=''}},[open]);
 const setP=(i,p)=>set({ppl:st.ppl.map((x,j)=>j===i?{...x,...p}:x),time:null,err:''});
 const br=BR.find(b=>b.id===st.br);
 const cur=st.step>=2&&st.step<4&&st.br&&st.date&&st.time!=null&&st.ppl.every(p=>p.s)?planFor(st.ppl,st.br,st.date,st.time):null;
 const slots=st.step===2&&st.date?Array.from({length:(CLOSE-OPEN)/30},(_,i)=>OPEN+i*30).filter(t=>planFor(st.ppl,st.br,st.date,t)):[];
 const confirm=()=>{
  if(!st.name.trim()||st.phone.replace(/\D/g,'').length<10||!/\S+@\S+/.test(st.email))return set({err:'Enter your name, a valid mobile number and an email.'});
  const p=planFor(st.ppl,st.br,st.date,st.time); // atomic re-check, all-or-nothing
  if(!p)return set({err:'That time was just taken. Go back and choose another.'});
  commit(p,st.date);set({plan:p,ref:'IF-'+Math.random().toString(36).slice(2,8).toUpperCase(),err:'',step:4})};
 const Nav=({dis})=>(<div className="foot">{st.step?<button className="btn o" onClick={()=>set({step:st.step-1})}>Back</button>:<span/>}<button className="btn" disabled={dis} onClick={()=>set({step:st.step+1})}>Continue</button></div>);
 const total=st.ppl.reduce((a,p)=>a+(st.date&&p.s?price(p,st.date).f:0),0);

 let view=null;
 if(st.step===0)view=(<><div className="opt">{BR.map(b=>(<button key={b.id} className={st.br===b.id?'on':''} onClick={()=>set({br:b.id})}><b>{b.n}</b><br/><small>{b.a} (placeholder)</small></button>))}</div><Nav dis={!st.br}/></>);
 if(st.step===1)view=(<>{st.ppl.map((p,i)=>(<div className="person" key={i}><h4>Person {i+1}{i>0&&<button className="x" onClick={()=>set({ppl:st.ppl.filter((_,j)=>j!==i),time:null})}>Remove</button>}</h4>
  <label htmlFor={'sv'+i}>Service or package</label>
  <select id={'sv'+i} value={p.s||''} onChange={e=>setP(i,{s:e.target.value||null})}><option value="">Choose…</option>{GROUPS.map(c=>(<optgroup key={c} label={c}>{S.filter(x=>x.c===c).map(x=>(<option key={x.id} value={x.id}>{x.n} · {peso(x.p)} · {x.m} min</option>))}</optgroup>))}</select>
  <label htmlFor={'bb'+i}>Barber</label>
  <select id={'bb'+i} value={p.b} onChange={e=>setP(i,{b:e.target.value})}><option value="any">No preference</option>{br.b.map(n=>(<option key={n}>{n}</option>))}</select></div>))}
  {st.ppl.length<MAXP&&<button className="btn o" onClick={()=>set({ppl:[...st.ppl,{s:null,b:'any'}],time:null})}>+ Add a person ({st.ppl.length}/{MAXP})</button>}
  <Nav dis={st.ppl.some(p=>!p.s)}/></>);
 if(st.step===2)view=(<><label htmlFor="dt">Date</label><input type="date" id="dt" min={manilaToday()} value={st.date} onChange={e=>set({date:e.target.value,time:null})}/>
  {st.date&&(slots.length?(<><p className="note" style={{marginTop:14}}>Available start times{st.ppl.length>1?' (we try back-to-back first, then overlapping with different barbers)':''}</p>
   <div className="slots">{slots.map(t=>(<motion.button key={t} whileTap={{scale:.95}} className={st.time===t?'on':''} onClick={()=>set({time:t})}>{hm(t)}</motion.button>))}</div></>)
   :<p className="err">No times fit everyone on this date. Try another date, remove a person, or choose “no preference”.</p>)}
  {cur&&<p className="note">{cur.mode}: {cur.a.map((x,i)=>`Person ${i+1} with ${x.b}, ${hm(x.s)}`).join(' · ')}</p>}
  <Nav dis={!cur}/></>);
 if(st.step===3&&cur)view=(<><label htmlFor="nm">Your name</label><input id="nm" value={st.name} onChange={e=>set({name:e.target.value})}/>
  <label htmlFor="ph">Mobile number</label><input id="ph" type="tel" inputMode="tel" placeholder="09XX XXX XXXX" value={st.phone} onChange={e=>set({phone:e.target.value})}/>
  <label htmlFor="em">Email</label><input id="em" type="email" value={st.email} onChange={e=>set({email:e.target.value})}/>
  <label htmlFor="nt">Notes (optional)</label><textarea id="nt" rows={2} value={st.notes} onChange={e=>set({notes:e.target.value})}/>
  <table><thead><tr><th>Person</th><th>Service</th><th>Time</th><th className="r">Price</th></tr></thead><tbody>{st.ppl.map((p,i)=>{const r=price(p,st.date),a=cur.a[i];return(
   <tr key={i}><td>{i+1}</td><td>{sv(p.s).n}<br/><small>{a.b}{r.tag?' · '+r.tag:''}</small></td><td>{hm(a.s)}</td><td className="r">{r.tag&&<s style={{opacity:.5}}>{peso(r.base)} </s>}{peso(r.f)}</td></tr>)})}
   <tr><td colSpan={3}><b>Total (pay in person)</b></td><td className="r"><b>{peso(total)}</b></td></tr></tbody></table>
  <p className="note">No deposit. Pay after service by Cash, GCash, Maya or Bank transfer. Cancel or reschedule up to 2 hours before each appointment. No-shows are marked after 15 minutes. Student Cut requires a valid student ID at the branch.</p>
  {st.err&&<p className="err">{st.err}</p>}
  <div className="foot"><button className="btn o" onClick={()=>set({step:2,err:''})}>Back</button><button className="btn" onClick={confirm}>Confirm booking</button></div></>);
 if(st.step===4)view=(<><p>Thanks, {st.name}. Your booking reference:</p>
  <motion.p initial={{scale:.8,opacity:0}} animate={{scale:1,opacity:1}} transition={{type:'spring',stiffness:260,damping:18}} style={{font:'700 34px var(--fd)',letterSpacing:'.1em',margin:'6px 0'}}>{st.ref}</motion.p>
  <p style={{opacity:.8}}>{BR.find(b=>b.id===st.br).n} (placeholder) · {new Date(st.date+'T12:00:00').toLocaleDateString('en-PH',{weekday:'long',month:'long',day:'numeric',year:'numeric'})}</p>
  <table><tbody>{st.ppl.map((p,i)=>{const r=price(p,st.date),a=st.plan.a[i];return(<tr key={i}><td>Person {i+1}</td><td>{sv(p.s).n}<br/><small>{a.b} · {r.tag||'No discount'}</small></td><td>{hm(a.s)}–{hm(a.e)}</td><td className="r">{peso(r.f)}</td></tr>)})}</tbody></table>
  <p className="note">Prototype: a confirmation email/SMS and secure manage link (cancel or reschedule each appointment individually, up to 2 hours before) would be sent here.</p>
  <div className="foot"><span/><button className="btn" onClick={()=>setOpen(false)}>Done</button></div></>);

 return(<Ctx.Provider value={openBook}>{children}
  <AnimatePresence>{open&&(<motion.div className="ov" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={e=>e.target===e.currentTarget&&setOpen(false)}>
   <motion.div className="dlg" role="dialog" aria-modal="true" aria-label="Book an appointment" initial={{opacity:0,y:36,scale:.97}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:24}} transition={{duration:.28,ease:'easeOut'}}>
    <div className="bh"><h3>{st.step<4?`Step ${st.step+1} of 4: ${NAMES[st.step]}`:'Booking confirmed'}</h3><button className="x" aria-label="Close" onClick={()=>setOpen(false)}>×</button></div>
    <div className="bb"><div className="steps">{[0,1,2,3,4].map(i=>(<i key={i} className={i<=st.step?'on':''}/>))}</div>
     <AnimatePresence mode="wait"><motion.div key={st.step} initial={{opacity:0,x:22}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-22}} transition={{duration:.2}}>{view}</motion.div></AnimatePresence></div>
   </motion.div></motion.div>)}</AnimatePresence></Ctx.Provider>)}
