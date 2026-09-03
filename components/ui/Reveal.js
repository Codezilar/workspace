'use client'; import {motion,useReducedMotion} from 'framer-motion';
export default function Reveal({children,delay=0,className=''}){const reduced=useReducedMotion();return <motion.div className={className} initial={reduced?false:{opacity:0,y:18}} whileInView={reduced?{}:{opacity:1,y:0}} viewport={{once:true,amount:.15}} transition={{duration:.5,delay}}>{children}</motion.div>}
