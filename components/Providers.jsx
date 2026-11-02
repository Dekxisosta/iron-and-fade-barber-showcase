'use client';
import {MotionConfig} from 'framer-motion';
import {BookingProvider} from './Booking';
export default function Providers({children}){return <MotionConfig reducedMotion="user"><BookingProvider>{children}</BookingProvider></MotionConfig>}
