import { useEffect, useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Heart, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
export function Logo(){return <a href="#home" aria-label="Наша 7Я — главная" className="brand"><span className="brand-mark">7<Heart size={17} fill="currentColor" /></span><span className="brand-word">наша <b>7Я</b><small>наша семья</small></span></a>}
export function Reveal({children,className='',id}:{children:ReactNode;className?:string;id?:string}){const reduced=useReducedMotion();return <motion.section id={id} className={className} initial={reduced?false:{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.08}} transition={{duration:.65}}>{children}</motion.section>}
export function SectionHeading({eyebrow,title,accent,children}:{eyebrow:string;title:string;accent?:string;children?:ReactNode}){return <div className="section-heading"><div><span className="eyebrow"><span/> {eyebrow}</span><h2>{title} {accent&&<em>{accent}</em>}</h2></div>{children}</div>}
export function ArrowButton({children,onClick}:{children:ReactNode;onClick:()=>void}){return <Button variant="ghost" className="arrow-link" onClick={onClick}>{children}<ArrowUpRight size={18}/></Button>}
export function Count({value,label,suffix=''}:{value:number;label:string;suffix?:string}){const [count,setCount]=useState(0);useEffect(()=>{let n=0;const timer=setInterval(()=>{n+=1;setCount(Math.round(value*Math.min(n/30,1)));if(n>=30)clearInterval(timer)},35);return()=>clearInterval(timer)},[value]);return <div className="stat"><strong>{count}{suffix}</strong><span>{label}</span></div>}
export function goTo(id:string){document.getElementById(id)?.scrollIntoView({behavior:'smooth'})}
