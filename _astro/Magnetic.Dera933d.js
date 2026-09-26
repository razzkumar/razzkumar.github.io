import{c as a}from"./createLucideIcon.hAoVeujb.js";import{j as u}from"./jsx-runtime.ClP7wGfN.js";import{r as h}from"./index.DK-fsZOb.js";import{a as c}from"./use-transform.hdwRxxxV.js";import{u as r}from"./use-spring.BKEFc6Rs.js";import{m as l}from"./proxy.HQVqXCgU.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=[["path",{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",key:"c2jq9f"}],["rect",{width:"4",height:"12",x:"2",y:"9",key:"mk3on5"}],["circle",{cx:"4",cy:"4",r:"2",key:"bt5ra8"}]],_=a("linkedin",x);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]],w=a("mail",y);function R({children:m,strength:s=.35,className:f=""}){const n=h.useRef(null),e=c(0),o=c(0),p=r(e,{damping:18,stiffness:220,mass:.5}),d=r(o,{damping:18,stiffness:220,mass:.5});return u.jsx(l.div,{ref:n,style:{x:p,y:d},onMouseMove:i=>{const t=n.current.getBoundingClientRect();e.set((i.clientX-t.left-t.width/2)*s),o.set((i.clientY-t.top-t.height/2)*s)},onMouseLeave:()=>{e.set(0),o.set(0)},className:f,children:m})}export{_ as L,R as M,w as a};
