import {Archivo,Josefin_Sans,Lora,Yellowtail} from 'next/font/google';
import './globals.css';
import Sprite from '../components/Sprite';
import Providers from '../components/Providers';
const archivo=Archivo({subsets:['latin'],weight:['700','800'],style:['normal','italic'],variable:'--f-archivo'});
const josefin=Josefin_Sans({subsets:['latin'],weight:['400','600','700'],variable:'--f-josefin'});
const lora=Lora({subsets:['latin'],weight:['400','500'],variable:'--f-lora'});
const yellow=Yellowtail({subsets:['latin'],weight:'400',variable:'--f-yellowtail'});
export const metadata={title:'Iron & Fade Barbershop | Sharp Cuts. Strong Identity.',description:'Iron & Fade Barbershop in Santa Rosa, Laguna. Book a cut at Santa Rosa Central, Nuvali or Balibago.',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}){
 return(<html lang="en-PH" className={`${archivo.variable} ${josefin.variable} ${lora.variable} ${yellow.variable}`}><body>
 <Sprite/><Providers>{children}</Providers></body></html>)}
