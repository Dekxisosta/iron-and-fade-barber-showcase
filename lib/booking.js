import {S,BR} from './data';
export const OPEN=600,CLOSE=1260,MAXP=4;
export const sv=id=>S.find(s=>s.id===id);
export const hm=m=>{const h=Math.floor(m/60),x=m%60;return (h>12?h-12:h)+':'+String(x).padStart(2,'0')+(h>=12?' PM':' AM')};
export const manilaToday=()=>new Date(Date.now()+8*3600e3).toISOString().slice(0,10);
const hash=s=>[...s].reduce((a,c)=>(a*31+c.charCodeAt(0))>>>0,7);
const busy=(b,d,t)=>hash(b+d+t)%100<30; // seeded sample of existing bookings
const booked={}; // "barber+date" -> [[start,end]]
const free=(b,d,s,e)=>{for(let t=s;t<e;t+=15)if(busy(b,d+(t-t%30),t-t%30))return false;return !(booked[b+d]||[]).some(([x,y])=>s<y&&e>x)};
const barbersFor=(p,br)=>p.b==='any'?BR.find(b=>b.id===br).b:[p.b];
// Try consecutive first, then overlapping with different barbers.
export function planFor(ppl,br,date,start){
 const tryMode=cons=>{const used=[],out=[];let off=0;for(const p of ppl){const m=sv(p.s).m,s=cons?start+off:start,e=s+m;if(e>CLOSE)return null;
  const b=barbersFor(p,br).find(x=>!used.includes(x)&&free(x,date,s,e));if(!b)return null;used.push(b);out.push({b,s,e});off+=m}return out};
 const c=tryMode(true);if(c)return{mode:'Consecutive',a:c};const o=tryMode(false);return o?{mode:'Overlapping, different barbers',a:o}:null}
export function commit(plan,date){plan.a.forEach(x=>{(booked[x.b+date]=booked[x.b+date]||[]).push([x.s,x.e])})}
// One discount per person (each is their own transaction). Whole pesos, 0.50 rounds up.
export function price(p,date){const s=sv(p.s),d=new Date(date+'T12:00:00'),mo=d.getMonth()+1,dy=d.getDate();
 if(s.fd&&mo===6&&dy>=12&&dy<=21)return{f:Math.floor((s.p*85+50)/100),tag:"Father's Day −15%",base:s.p};
 if(s.st&&d.getDay()===2)return{f:s.p-30,tag:'Tuesday Student Day −₱30',base:s.p};
 return{f:s.p,tag:'',base:s.p}}
