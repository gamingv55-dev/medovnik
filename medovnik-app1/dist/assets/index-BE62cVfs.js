const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ShopPage-3zW_00CK.js","assets/vendor-router-U-89qT9Z.js","assets/CommunityPage-C25vIHEr.js","assets/ReviewsPage-BhUOvftt.js","assets/NotFoundPage-WZwQG_H-.js"])))=>i.map(i=>d[i]);
import{b as oe,c as de,r as n,L as w,u as Z,N as he,B as xe,a as fe,R as N}from"./vendor-router-U-89qT9Z.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))r(l);new MutationObserver(l=>{for(const a of l)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function i(l){const a={};return l.integrity&&(a.integrity=l.integrity),l.referrerPolicy&&(a.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?a.credentials="include":l.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(l){if(l.ep)return;l.ep=!0;const a=i(l);fetch(l.href,a)}})();var P={exports:{}},L={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var z;function pe(){if(z)return L;z=1;var s=oe(),t=Symbol.for("react.element"),i=Symbol.for("react.fragment"),r=Object.prototype.hasOwnProperty,l=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,a={key:!0,ref:!0,__self:!0,__source:!0};function d(o,h,x){var p,m={},c=null,f=null;x!==void 0&&(c=""+x),h.key!==void 0&&(c=""+h.key),h.ref!==void 0&&(f=h.ref);for(p in h)r.call(h,p)&&!a.hasOwnProperty(p)&&(m[p]=h[p]);if(o&&o.defaultProps)for(p in h=o.defaultProps,h)m[p]===void 0&&(m[p]=h[p]);return{$$typeof:t,type:o,key:c,ref:f,props:m,_owner:l.current}}return L.Fragment=i,L.jsx=d,L.jsxs=d,L}var D;function me(){return D||(D=1,P.exports=pe()),P.exports}var e=me(),C={},B;function ue(){if(B)return C;B=1;var s=de();return C.createRoot=s.createRoot,C.hydrateRoot=s.hydrateRoot,C}var ye=ue();const ge="modulepreload",je=function(s){return"/"+s},F={},T=function(t,i,r){let l=Promise.resolve();if(i&&i.length>0){let d=function(x){return Promise.all(x.map(p=>Promise.resolve(p).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),h=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));l=d(i.map(x=>{if(x=je(x),x in F)return;F[x]=!0;const p=x.endsWith(".css"),m=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${x}"]${m}`))return;const c=document.createElement("link");if(c.rel=p?"stylesheet":ge,p||(c.as="script"),c.crossOrigin="",c.href=x,h&&c.setAttribute("nonce",h),document.head.appendChild(c),p)return new Promise((f,j)=>{c.addEventListener("load",f),c.addEventListener("error",()=>j(new Error(`Unable to preload CSS for ${x}`)))})}))}function a(d){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=d,window.dispatchEvent(o),!o.defaultPrevented)throw d}return l.then(d=>{for(const o of d||[])o.status==="rejected"&&a(o.reason);return t().catch(a)})},qs={"Въздушен клапан":"Позволява CO₂ да излиза от съда, без да пуска въздух вътре — спира оцетяването на медовината.",Захаромер:"Измерва захарното съдържание на мъстта преди и след ферментацията, за да изчислиш алкохолния градус.",Хидрометър:"Измерва относителната плътност на течността — показва напредъка на ферментацията.",Сифон:"Тръбичка за претакване на медовината от един съд в друг, без да вдигаш утайката от дъното.","Помпа за претакване":"Автоматична помпа за прехвърляне на течността без усилие и без контакт с въздух.",Дрожди:"Живи микроорганизми, които превръщат захарта в алкохол и CO₂ — сърцето на всяка ферментация.","Хранителна среда":"Хранителни соли, които подхранват дрождите по време на ферментацията и предотвратяват спирането ѝ.",Наръчник:"Стъпка по стъпка видео клипове, които те водят през целия процес — от смесването до бутилирането."},Q=[{id:1,name:"Стартов Кит",subtitle:'„Само необходимото"',image:"/kit1.webp",cat:"Начален комплект",priceEur:48.99,price:95.82,iconType:"jar",badge:"Бест Селър",desc:"Всичко необходимо за първата ти партида. Проектиран за начинаещи.",tags:["5L пластмасов съд","Въздушен клапан","Дрожди","Хранителна среда","Захаромер","Наръчник"],featured:!1},{id:2,name:"Кит за Пивовар",subtitle:'„По-удобно и по-контролирано"',image:"/kit2.webp",cat:"Премиум комплект",priceEur:68.99,price:134.93,iconType:"flask",badge:"Препоръчан",desc:"Пълен арсенал за сериозния ентусиаст. Включва захаромер и премиум дрожди.",tags:["5L стъклен съд","Въздушен клапан","Дрожди","Хранителна среда","Захаромер","Наръчник","Помпа за претакване","Рецептурник","Персонализиран етикет за съда","Мрежеста торбичка за плодове"],featured:!0},{id:3,name:"Майсторски Кит",subtitle:'„Пълното изживяване"',cat:"Майсторски комплект",priceEur:88.99,price:174.05,iconType:"crown",badge:"Лимитиран",desc:"Професионално оборудване за майстори. Всичко за перфектната медовина.",tags:["Всичко от Пивовар","10L съд","Сифон","Премиум дрожди","Ареометър","Термостат","Ексклузивни рецепти"],featured:!1}],be=[{id:101,slot:1,name:"Продукт 1",iconType:"sparkle",desc:"[Описание скоро]",price:null},{id:102,slot:2,name:"Продукт 2",iconType:"sparkle",desc:"[Описание скоро]",price:null},{id:103,slot:3,name:"Продукт 3",iconType:"sparkle",desc:"[Описание скоро]",price:null},{id:104,slot:4,name:"Продукт 4",iconType:"sparkle",desc:"[Описание скоро]",price:null}],ve=[{id:201,name:"Viking Mead Pack",quantifiable:!0,desc:"Мащерка, хмел и бъзак — автентичен викингски вкус за смели рецепти.",price:12,image:"/viking.webp"},{id:202,name:"Winter Spice Mead",quantifiable:!0,desc:"Канела, карамфил и портокалова кора — уютна зимна медовина за студените вечери.",price:10,image:"/winter-spice.webp"},{id:203,name:"Cherry Oak Reserve",quantifiable:!0,desc:"Сушени череши и дъбови стърготини — богат, дълбок вкус с нотки на дърво и плод.",price:14},{id:204,name:"Citrus Honey Brew",quantifiable:!0,desc:"Лимон, портокал и лайм — свежа и искряща лятна медовина с цитрусов аромат.",price:11}],ke=[{id:301,name:"Акациев мед",price:18,desc:"Лек, светъл и ароматен. Перфектен за деликатна, флорална медовина."},{id:302,name:"Липов мед",price:16,desc:"Балансиран вкус с нежни флорални нотки — класика за начинаещи."},{id:303,name:"Горски мед",price:15,desc:"Тъмен и богат с интензивен горски аромат — характерна медовина."},{id:304,name:"Елда",price:20,desc:"Силен, наситен и тъмен — за смели рецепти с дълбок вкус."},{id:305,name:"Мащерков мед",price:22,desc:"Ароматен билков мед с уникален характер и дълго финале."},{id:306,name:"Слънчогледов мед",price:14,desc:"Класически кристализиращ мед — лесен за работа, мек вкус."}],Y=n.createContext(null),$=50;function we(s,t){switch(t.type){case"ADD":return s.items.find(r=>r.id===t.item.id)?t.item.quantifiable?{...s,items:s.items.map(r=>r.id===t.item.id?{...r,qty:r.qty+(t.qty||1)}:r)}:s:{...s,items:[...s.items,{...t.item,qty:t.qty||1}]};case"INCREMENT":return{...s,items:s.items.map(i=>i.id===t.id?{...i,qty:i.qty+1}:i)};case"DECREMENT":return{...s,items:s.items.map(i=>i.id===t.id?{...i,qty:i.qty-1}:i).filter(i=>i.qty>0)};case"REMOVE":return{...s,items:s.items.filter(i=>i.id!==t.id)};case"CLEAR":return{...s,items:[]};case"OPEN":return{...s,isOpen:!0};case"CLOSE":return{...s,isOpen:!1};case"TOGGLE":return{...s,isOpen:!s.isOpen};default:return s}}function Ne({children:s}){const[t,i]=n.useReducer(we,{items:[],isOpen:!1}),r=n.useCallback((c,f=1)=>{let j=c;(typeof c=="number"||typeof c=="string")&&(j=Q.find(b=>b.id===c)||be.find(b=>b.id===c)||ve.find(b=>b.id===c)||ke.find(b=>b.id===c)),!(!j||j.price==null)&&(i({type:"ADD",item:j,qty:f}),i({type:"OPEN"}))},[]),l=n.useCallback(c=>i({type:"REMOVE",id:c}),[]),a=n.useCallback(c=>i({type:"INCREMENT",id:c}),[]),d=n.useCallback(c=>i({type:"DECREMENT",id:c}),[]),o=n.useCallback(()=>i({type:"CLEAR"}),[]),h=n.useCallback(()=>i({type:"OPEN"}),[]),x=n.useCallback(()=>i({type:"CLOSE"}),[]),p=n.useCallback(()=>i({type:"TOGGLE"}),[]),m=n.useMemo(()=>{const c=t.items.reduce((v,y)=>v+(y.price||0)*(y.qty||1),0),f=t.items.reduce((v,y)=>v+(y.qty||1),0),b=t.items.some(v=>Q.some(y=>y.id===v.id))||c>=$,_=Math.max($-c,0),u=v=>t.items.some(y=>y.id===v),k=v=>{const y=t.items.find(ne=>ne.id===v);return y?y.qty:0};return{items:t.items,isOpen:t.isOpen,total:c,count:f,discordUnlocked:b,toDiscord:_,isInCart:u,qtyInCart:k,addToCart:r,removeFromCart:l,incrementCart:a,decrementCart:d,clearCart:o,openCart:h,closeCart:x,toggleCart:p}},[t,r,l,a,d,o,h,x,p]);return e.jsx(Y.Provider,{value:m,children:s})}function J(){const s=n.useContext(Y);if(!s)throw new Error("useCart must be used within CartProvider");return s}function Le(s=60){const[t,i]=n.useState(!1);return n.useEffect(()=>{const r=()=>i(window.scrollY>s);return r(),window.addEventListener("scroll",r,{passive:!0}),()=>window.removeEventListener("scroll",r)},[s]),t}function Ce(s){const t=n.useRef(null);return n.useEffect(()=>{function i(r){t.current&&!t.current.contains(r.target)&&s(r)}return document.addEventListener("mousedown",i),()=>document.removeEventListener("mousedown",i)},[s]),t}const g=s=>({width:s,height:s,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"});function Se({size:s=22,className:t,style:i}){return e.jsxs("svg",{...g(s),className:t,style:i,children:[e.jsx("circle",{cx:"9",cy:"21",r:"1",fill:"currentColor",stroke:"none"}),e.jsx("circle",{cx:"20",cy:"21",r:"1",fill:"currentColor",stroke:"none"}),e.jsx("path",{d:"M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6"})]})}function Rs({size:s=22,className:t,style:i}){return e.jsxs("svg",{...g(s),className:t,style:i,children:[e.jsx("rect",{x:"3",y:"11",width:"18",height:"11",rx:"2"}),e.jsx("path",{d:"M7 11V7a5 5 0 0110 0v4"}),e.jsx("circle",{cx:"12",cy:"16",r:"1",fill:"currentColor",stroke:"none"})]})}function Ts({size:s=22,className:t,style:i}){return e.jsxs("svg",{...g(s),className:t,style:i,children:[e.jsx("path",{d:"M9 3h6v2l1.5 2v11a2 2 0 01-2 2H9.5a2 2 0 01-2-2V7L9 5V3z"}),e.jsx("line",{x1:"7.5",y1:"7",x2:"16.5",y2:"7"}),e.jsx("path",{d:"M10 12c0 1.1.9 2 2 2s2-.9 2-2"}),e.jsx("line",{x1:"12",y1:"14",x2:"12",y2:"16"})]})}function Me({size:s=22,className:t,style:i}){return e.jsx("svg",{...g(s),className:t,style:i,children:e.jsx("path",{d:"M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 12a19.79 19.79 0 01-3.07-8.67A2 2 0 013.6 1.17h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.91 9.91a16 16 0 006.07 6.07l1.97-1.34a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"})})}function Ee({size:s=22,className:t,style:i}){return e.jsxs("svg",{...g(s),className:t,style:i,children:[e.jsx("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),e.jsx("polyline",{points:"22,6 12,13 2,6"})]})}function K({size:s=22,className:t,style:i}){return e.jsxs("svg",{...g(s),className:t,style:i,children:[e.jsx("path",{d:"M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"}),e.jsx("polyline",{points:"3.27,6.96 12,12.01 20.73,6.96"}),e.jsx("line",{x1:"12",y1:"22.08",x2:"12",y2:"12"})]})}function Is({size:s=22,className:t,style:i}){return e.jsxs("svg",{...g(s),className:t,style:i,children:[e.jsx("path",{d:"M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"}),e.jsx("path",{d:"M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"})]})}function qe({size:s=22,className:t,style:i}){return e.jsxs("svg",{...g(s),className:t,style:i,children:[e.jsx("path",{d:"M3 11l4-4 3 3 4-4 4 4"}),e.jsx("path",{d:"M3 17l4-4 3 3 4-4 4 4"})]})}function _s({size:s=22,className:t,style:i}){return e.jsxs("svg",{...g(s),className:t,style:i,children:[e.jsx("path",{d:"M8 21h8M12 17v4"}),e.jsx("path",{d:"M7 4H4a1 1 0 00-1 1v3a5 5 0 005 5h1"}),e.jsx("path",{d:"M17 4h3a1 1 0 011 1v3a5 5 0 01-5 5h-1"}),e.jsx("path",{d:"M8 4h8v9a4 4 0 01-4 4 4 4 0 01-4-4V4z"})]})}function Re({size:s=22,className:t,style:i}){return e.jsxs("svg",{...g(s),className:t,style:i,children:[e.jsx("circle",{cx:"12",cy:"12",r:"10"}),e.jsx("circle",{cx:"12",cy:"12",r:"6"}),e.jsx("circle",{cx:"12",cy:"12",r:"2",fill:"currentColor",stroke:"none"})]})}function Te({size:s=22,className:t,style:i}){return e.jsxs("svg",{...g(s),className:t,style:i,children:[e.jsx("path",{d:"M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"}),e.jsx("path",{d:"M5 3a2 2 0 100 4 2 2 0 000-4z"}),e.jsx("path",{d:"M19 3a2 2 0 100 4 2 2 0 000-4z"}),e.jsx("line",{x1:"8",y1:"12",x2:"16",y2:"12"}),e.jsx("line",{x1:"8",y1:"16",x2:"13",y2:"16"})]})}function X({size:s=22,className:t,style:i}){return e.jsx("svg",{...g(s),fill:"currentColor",stroke:"none",className:t,style:i,children:e.jsx("path",{d:"M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z"})})}function Ie({size:s=22,className:t,style:i}){return e.jsxs("svg",{...g(s),className:t,style:i,children:[e.jsx("path",{d:"M2 19l3.5-11L12 14l6.5-6L22 19H2z"}),e.jsx("line",{x1:"2",y1:"19",x2:"22",y2:"19"}),e.jsx("circle",{cx:"12",cy:"14",r:"1",fill:"currentColor",stroke:"none"}),e.jsx("circle",{cx:"5.5",cy:"8",r:"1",fill:"currentColor",stroke:"none"}),e.jsx("circle",{cx:"18.5",cy:"8",r:"1",fill:"currentColor",stroke:"none"})]})}function _e({size:s=22,className:t,style:i}){return e.jsxs("svg",{...g(s),className:t,style:i,children:[e.jsx("path",{d:"M9 3h6"}),e.jsx("path",{d:"M10 3v5.5L5 16a2 2 0 001.8 2.9h10.4A2 2 0 0019 16l-5-7.5V3"}),e.jsx("path",{d:"M7.5 14h9"})]})}function Pe({size:s=22,className:t,style:i}){return e.jsxs("svg",{...g(s),className:t,style:i,children:[e.jsx("rect",{x:"9",y:"2",width:"6",height:"3",rx:"1"}),e.jsx("path",{d:"M7 5h10v1.5a4 4 0 011 2.6V20a2 2 0 01-2 2H8a2 2 0 01-2-2V9.1A4 4 0 017 6.5V5z"}),e.jsx("path",{d:"M9.5 14c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5"})]})}function Ae({size:s=44,className:t,style:i}){return e.jsxs("svg",{width:s,height:s,viewBox:"0 0 44 44",fill:"none",className:t,style:i,children:[e.jsx("circle",{cx:"22",cy:"22",r:"22",fill:"rgba(184,98,26,0.18)"}),e.jsx("circle",{cx:"22",cy:"17",r:"7",fill:"rgba(242,200,78,0.25)",stroke:"#b8621a",strokeWidth:"1.2"}),e.jsx("ellipse",{cx:"22",cy:"13",rx:"9",ry:"2.5",fill:"rgba(184,98,26,0.55)",stroke:"#b8621a",strokeWidth:"1"}),e.jsx("path",{d:"M16 13 Q22 8 28 13",fill:"rgba(184,98,26,0.4)",stroke:"#b8621a",strokeWidth:"1"}),e.jsx("path",{d:"M13 40 Q13 30 22 27 Q31 30 31 40",fill:"rgba(242,200,78,0.18)",stroke:"#b8621a",strokeWidth:"1.2"})]})}function Ge({size:s=44,className:t,style:i}){return e.jsxs("svg",{width:s,height:s,viewBox:"0 0 44 44",fill:"none",className:t,style:i,children:[e.jsx("circle",{cx:"22",cy:"22",r:"22",fill:"rgba(184,98,26,0.18)"}),e.jsx("circle",{cx:"22",cy:"17",r:"7",fill:"rgba(242,200,78,0.25)",stroke:"#b8621a",strokeWidth:"1.2"}),e.jsx("path",{d:"M15 17 Q14 10 22 10 Q30 10 29 17",fill:"rgba(184,98,26,0.5)"}),e.jsx("path",{d:"M15 17 Q13 22 15 25",stroke:"#b8621a",strokeWidth:"1.2",fill:"none"}),e.jsx("path",{d:"M29 17 Q31 22 29 25",stroke:"#b8621a",strokeWidth:"1.2",fill:"none"}),e.jsx("path",{d:"M13 40 Q13 30 22 27 Q31 30 31 40",fill:"rgba(242,200,78,0.18)",stroke:"#b8621a",strokeWidth:"1.2"})]})}function Oe({size:s=44,className:t,style:i}){return e.jsxs("svg",{width:s,height:s,viewBox:"0 0 44 44",fill:"none",className:t,style:i,children:[e.jsx("circle",{cx:"22",cy:"22",r:"22",fill:"rgba(184,98,26,0.18)"}),e.jsx("circle",{cx:"22",cy:"17",r:"7",fill:"rgba(242,200,78,0.25)",stroke:"#b8621a",strokeWidth:"1.2"}),e.jsx("path",{d:"M15 19 Q15 27 22 27 Q29 27 29 19",fill:"rgba(184,98,26,0.4)",stroke:"#b8621a",strokeWidth:"1"}),e.jsx("path",{d:"M18 20 Q20 22 22 21 Q24 22 26 20",stroke:"#b8621a",strokeWidth:"1.2",fill:"none"}),e.jsx("path",{d:"M13 40 Q13 30 22 27 Q31 30 31 40",fill:"rgba(242,200,78,0.18)",stroke:"#b8621a",strokeWidth:"1.2"})]})}const ze={farmer:Ae,woman:Ge,bearded:Oe},De={jar:Pe,flask:_e,crown:Ie,sparkle:X,box:K},W="+359988779092",A="medovnikbg@gmail.com";function Be(){const[s,t]=n.useState(!1),i=Ce(()=>t(!1));return e.jsxs("span",{ref:i,children:[e.jsx("button",{className:"nav-link-btn",onClick:()=>t(r=>!r),children:"Контакти ▼"}),e.jsxs("div",{className:`contact-drop${s?" open":""}`,style:{fontWeight:500,width:380},children:[e.jsx("div",{className:"contact-drop-head",children:"Свържи се с нас"}),e.jsx(H,{icon:e.jsx(Me,{size:18}),label:"Телефон",value:"+359 98 877 9092",href:`tel:${W}`,copy:W}),e.jsx(H,{icon:e.jsx(Ee,{size:18}),label:"Имейл",value:A,href:`mailto:${A}`,copy:A})]})]})}function H({icon:s,label:t,value:i,href:r,copy:l}){const[a,d]=n.useState(!1);function o(h){var p;h.preventDefault(),h.stopPropagation();const x=()=>{d(!0),setTimeout(()=>d(!1),1400)};if((p=navigator.clipboard)!=null&&p.writeText)navigator.clipboard.writeText(l).then(x).catch(x);else{const m=document.createElement("textarea");m.value=l,m.style.position="fixed",m.style.opacity="0",document.body.appendChild(m),m.select();try{document.execCommand("copy")}catch{}m.remove(),x()}}return e.jsxs("a",{className:"contact-row",href:r,style:{padding:"8px 16px"},children:[e.jsx("div",{className:"contact-ico",children:s}),e.jsxs("div",{style:{minWidth:0,flex:1},children:[e.jsx("div",{className:"contact-lbl",children:t}),e.jsx("div",{className:"contact-val",style:{fontFamily:"'Inter', sans-serif",fontSize:"0.95rem",letterSpacing:"0.02em",whiteSpace:"nowrap"},children:i})]}),e.jsxs("button",{className:`contact-copy${a?" copied":""}`,type:"button","aria-label":`Копирай ${t.toLowerCase()}`,onClick:o,children:[e.jsxs("svg",{className:"copy",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("rect",{x:"9",y:"9",width:"13",height:"13",rx:"2"}),e.jsx("path",{d:"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"})]}),e.jsx("svg",{className:"check",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"20 6 9 17 4 12"})})]})]})}const Fe="/logo.webp";function Qe(){const s=Le(60),{count:t,toggleCart:i}=J(),[r,l]=n.useState(!1),a=()=>{l(!1),document.body.style.overflow=""},d=()=>{l(o=>{const h=!o;return document.body.style.overflow=h?"hidden":"",h})};return e.jsxs("nav",{className:`nav${s?" solid":""}`,id:"nav",style:{padding:"19px 56px 19px 18px"},children:[e.jsxs(w,{to:"/",className:"logo-wrap","aria-label":"Медовник",onClick:a,children:[e.jsx("img",{className:"logo-img",src:Fe,alt:"Медовник",style:{width:160,height:150,margin:"-2px 15px -90px 0"},fetchpriority:"high",decoding:"async"}),e.jsx("span",{className:"logo-text",style:{display:"none"},children:"Медовник"})]}),e.jsxs("button",{className:`nav-toggle${r?" open":""}`,type:"button","aria-label":"Меню",onClick:d,children:[e.jsx("span",{}),e.jsx("span",{}),e.jsx("span",{})]}),e.jsxs("ul",{className:`nav-links${r?" open":""}`,style:{padding:"0 15px 0 0"},children:[e.jsx(S,{to:"/",onClick:a,children:"Начало"}),e.jsx(S,{to:"/shop",onClick:a,children:"Магазин"}),e.jsx(S,{to:"/community",onClick:a,children:"Общност"}),e.jsx(S,{to:"/reviews",onClick:a,children:"Обратна връзка"}),e.jsx("li",{className:"nav-contact-wrap",children:e.jsx(Be,{})})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"1.2rem"},children:[e.jsxs("button",{className:"cart-ico-btn",onClick:i,"aria-label":"Количка",children:[e.jsx(Se,{size:22}),t>0&&e.jsx("span",{className:"cart-badge",style:{display:"flex"},children:t})]}),e.jsx(w,{className:"nav-cta",to:"/shop",onClick:a,children:"Купи сега"})]})]})}function S({to:s,onClick:t,children:i}){const{pathname:r}=Z(),l=r===s;return e.jsx("li",{children:e.jsx(he,{to:s,onClick:t,className:l?"active":"",children:i})})}const $e="/logo.webp";function We(){const s=new Date().getFullYear();return e.jsxs("footer",{className:"footer",children:[e.jsxs("div",{className:"footer-inner",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"footer-brand",children:[e.jsx("img",{className:"footer-logo-img",src:$e,alt:"Медовник"}),e.jsx("div",{className:"footer-logo",children:"Медовник"})]}),e.jsx("div",{className:"footer-desc",children:"Българско движение за домашно варене на медовина. Вярваме, че всеки може да направи нещо прекрасно с ръцете си."})]}),e.jsx(V,{title:"Магазин",links:[{label:"Starter Kit",to:"/shop"},{label:"Premium Kit",to:"/shop"},{label:"Абонамент",to:"/community"}]}),e.jsx(V,{title:"Помощ",links:[{label:"Discord",to:"/community"}],faqLink:!0})]}),e.jsx("div",{className:"footer-bottom",children:e.jsxs("span",{className:"fc",children:["© ",s," Медовник · Всички права запазени"]})})]})}function V({title:s,links:t,faqLink:i}){return e.jsxs("div",{children:[e.jsx("div",{className:"fc-title",children:s}),e.jsxs("ul",{className:"fc-links",children:[i&&e.jsx("li",{children:e.jsx("a",{href:"/#faq",onClick:r=>{const l=document.getElementById("faq");l&&(r.preventDefault(),l.scrollIntoView({behavior:"smooth"}))},children:"FAQ"})}),t.map(r=>e.jsx("li",{children:e.jsx(w,{to:r.to,children:r.label})},r.label))]})]})}function R(s,t="лв."){return s==null?"Скоро":`${s} ${t}`}const He="https://script.google.com/macros/s/AKfycbznixroXH49aoXdDFts5ZT3kDU6ILG8msYcI9yw8wall0RViQD2er59-cgw8WN6CKkfTg/exec",U=1.95583;function Ve({items:s,total:t,discordUnlocked:i,onClose:r,onSuccess:l}){const[a,d]=n.useState(""),[o,h]=n.useState(""),[x,p]=n.useState(""),[m,c]=n.useState(""),[f,j]=n.useState("idle"),b=s.reduce((u,k)=>u+(k.priceEur??k.price/U)*(k.qty||1),0).toFixed(2);async function _(u){u.preventDefault(),j("loading");try{const k=s.map(y=>({name:y.name,qty:y.qty||1,priceEur:y.priceEur?Number(y.priceEur):Number((y.price/U).toFixed(2)),priceBgn:y.price})),v=new URLSearchParams({name:a,phone:o,email:x,note:m||"",date:new Date().toLocaleString("bg-BG"),items:s.map(y=>`${y.name}${y.qty>1?" ×"+y.qty:""}`).join(", "),total:t,totalEur:b,discordUnlocked:i?"1":"0",itemsJson:JSON.stringify(k)});await fetch(He,{method:"POST",mode:"no-cors",body:v}),j("success"),setTimeout(()=>{l==null||l(),r==null||r()},2400)}catch{j("error")}}return e.jsx("div",{className:"po-modal",role:"dialog","aria-modal":"true","aria-label":"Предварителна поръчка",children:e.jsxs("div",{className:"po-card",children:[e.jsx("button",{className:"po-close",onClick:r,"aria-label":"Затвори",children:"✕"}),f==="success"?e.jsxs("div",{className:"po-success",children:[e.jsx("div",{className:"po-success-icon",children:"✓"}),e.jsx("h3",{children:"Поръчката е приета!"}),e.jsxs("p",{children:["Изпратихме потвърждение на ",e.jsx("strong",{children:x}),". Ще се свържем с вас скоро!"]})]}):e.jsxs(e.Fragment,{children:[e.jsx("h3",{className:"po-title",children:"Предварителна поръчка"}),e.jsxs("div",{className:"po-summary",children:[s.map(u=>e.jsxs("div",{className:"po-summary-row",children:[e.jsxs("span",{children:[u.emoji&&`${u.emoji} `,u.name,u.qty>1&&e.jsxs("span",{className:"po-qty",children:[" ×",u.qty]})]}),e.jsx("span",{children:R(u.price*(u.qty||1))})]},u.id)),e.jsxs("div",{className:"po-summary-total",children:[e.jsx("span",{children:"Общо"}),e.jsxs("span",{children:[b," € / ",R(t)]})]})]}),e.jsxs("form",{className:"po-form",onSubmit:_,children:[e.jsxs("label",{className:"po-label",children:["Имe *",e.jsx("input",{className:"po-input",type:"text",value:a,onChange:u=>d(u.target.value),required:!0,placeholder:"Иван Иванов",autoFocus:!0})]}),e.jsxs("label",{className:"po-label",children:["Телефон *",e.jsx("input",{className:"po-input",type:"tel",value:o,onChange:u=>h(u.target.value),required:!0,placeholder:"+359 88 888 8888"})]}),e.jsxs("label",{className:"po-label",children:["Имейл * ",e.jsx("span",{className:"po-optional",children:"(за потвърждение на поръчката)"}),e.jsx("input",{className:"po-input",type:"email",value:x,onChange:u=>p(u.target.value),required:!0,placeholder:"ivan@example.com"})]}),e.jsxs("label",{className:"po-label",children:["Допълнителна информация ",e.jsx("span",{className:"po-optional",children:"(незадължително)"}),e.jsx("textarea",{className:"po-input po-textarea",value:m,onChange:u=>c(u.target.value),placeholder:"Адрес за доставка, въпроси, предпочитания…",rows:3})]}),f==="error"&&e.jsx("p",{className:"po-error",children:"Нещо се обърка. Провери интернет връзката и опитай отново."}),e.jsx("button",{className:"po-submit",type:"submit",disabled:f==="loading",children:f==="loading"?"Изпращане…":"Потвърди поръчката →"})]})]})]})})}function Ue(){const{items:s,isOpen:t,total:i,toggleCart:r,closeCart:l,removeFromCart:a,incrementCart:d,decrementCart:o,clearCart:h,discordUnlocked:x,toDiscord:p}=J(),[m,c]=n.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:`cart-overlay${t?" open":""}`,onClick:r}),e.jsxs("aside",{className:`cart-drawer${t?" open":""}`,"aria-label":"Количка",children:[e.jsxs("div",{className:"cart-head",children:[e.jsx("div",{className:"cart-title",children:"Количка"}),e.jsx("button",{className:"cart-x",onClick:l,"aria-label":"Затвори",children:"✕"})]}),e.jsx("div",{className:"cart-items",children:s.length===0?e.jsxs("div",{className:"cart-empty",children:["Количката е празна.",e.jsx("br",{}),"Добави своя комплект."]}):s.map(f=>e.jsxs("div",{className:"cart-item",children:[e.jsx("div",{className:"ci-emoji",style:{color:"var(--honey)"},children:(()=>{const j=De[f.iconType];return j?e.jsx(j,{size:28}):e.jsx(K,{size:28})})()}),e.jsxs("div",{className:"ci-info",style:{flex:1},children:[e.jsx("div",{className:"ci-name",children:f.name}),e.jsxs("div",{className:"ci-price",children:[R(f.price*(f.qty||1)),f.qty>1&&e.jsxs("span",{className:"ci-unit",children:[" (",f.price," лв. × ",f.qty,")"]})]})]}),f.quantifiable?e.jsxs("div",{className:"ci-qty-ctrl",children:[e.jsx("button",{className:"ci-q-btn",onClick:()=>o(f.id),children:"−"}),e.jsx("span",{className:"ci-q-num",children:f.qty}),e.jsx("button",{className:"ci-q-btn",onClick:()=>d(f.id),children:"+"})]}):e.jsx("button",{className:"ci-rm",onClick:()=>a(f.id),"aria-label":`Премахни ${f.name}`,children:"✕"})]},f.id))}),s.length>0&&e.jsxs("div",{className:"cart-foot",style:{display:"block"},children:[e.jsxs("div",{className:"cart-upsell",children:[e.jsx("div",{className:"cup-lbl",children:x?"✅ Discord отключен!":`До Discord: ${p} лв.`}),e.jsx("p",{className:"cup-p",children:x?"Ще получиш покана на имейл след поръчката.":"Поръчай комплект или надвиши 50 лв. и влез в общността."})]}),e.jsxs("div",{className:"cart-total",children:[e.jsx("span",{className:"ct-lbl",children:"Общо"}),e.jsx("span",{className:"ct-val",children:R(i)})]}),e.jsx("button",{className:"btn-checkout",type:"button",onClick:()=>c(!0),children:"Завърши поръчката →"})]})]}),m&&e.jsx(Ve,{items:s,total:i,discordUnlocked:x,onClose:()=>c(!1),onSuccess:()=>{h(),l(),c(!1)}})]})}const Ze="/logo.webp",ee=typeof window<"u"&&window.innerWidth<=768,I=44,q=I*Math.sqrt(3),se=I*2,te=se*.75,ie=ee?12:19,re=ee?9:14,le=(ie+.5)*q,ae=re*te+se*.25,Ye=le/2,Je=ae/2;function Ke(s,t,i){return Array.from({length:6},(r,l)=>{const a=Math.PI/3*l-Math.PI/6;return`${(s+i*Math.cos(a)).toFixed(2)},${(t+i*Math.sin(a)).toFixed(2)}`}).join(" ")}const ce=(()=>{const s=[];for(let t=0;t<re;t++)for(let i=0;i<ie;i++){const r=i*q+(t%2?q/2:0)+q/2,l=t*te+I,a=Math.sqrt((r-Ye)**2+(l-Je)**2);s.push({x:r,y:l,dist:a,key:`${t}-${i}`})}return s})(),G=Math.max(...ce.map(s=>s.dist)),Xe=.2,es=.32;function ss({onDone:s}){const[t,i]=n.useState("init");n.useEffect(()=>{document.body.style.overflow="hidden";const a=requestAnimationFrame(()=>i("enter")),d=setTimeout(()=>i("zoom"),1900),o=setTimeout(()=>i("fade"),2600),h=setTimeout(()=>{s==null||s()},3300);return()=>{document.body.style.overflow="",cancelAnimationFrame(a),clearTimeout(d),clearTimeout(o),clearTimeout(h)}},[s]);const r=t==="zoom"||t==="fade",l=t==="zoom"||t==="fade";return e.jsxs("div",{className:`intro intro-${t}`,"aria-hidden":"true",children:[e.jsx("div",{className:`intro-hive${r?" intro-hive-zoom":""}`,children:e.jsxs("svg",{className:"intro-svg",viewBox:`0 0 ${Math.round(le)} ${Math.round(ae)}`,preserveAspectRatio:"xMidYMid slice",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("defs",{children:e.jsxs("filter",{id:"hxglow",x:"-40%",y:"-40%",width:"180%",height:"180%",children:[e.jsx("feGaussianBlur",{in:"SourceGraphic",stdDeviation:"4",result:"b"}),e.jsxs("feMerge",{children:[e.jsx("feMergeNode",{in:"b"}),e.jsx("feMergeNode",{in:"SourceGraphic"})]})]})}),t!=="init"&&ce.map(a=>{if(a.dist<G*Xe)return null;const d=a.dist/G*1100,o=a.dist<G*es;return e.jsx("polygon",{className:`intro-cell${o?" intro-cell-frame":""}`,points:Ke(a.x,a.y,I-1.5),style:{animationDelay:`${d}ms`}},a.key)})]})}),t!=="init"&&e.jsx("div",{className:`intro-logo-wrap${l?" intro-logo-out":""}`,children:e.jsx("img",{src:Ze,alt:"Медовник",className:"intro-logo-img",draggable:!1,fetchpriority:"high",decoding:"async"})})]})}function ts(){const{pathname:s}=Z();return n.useEffect(()=>{window.scrollTo(0,0)},[s]),null}function is(){return e.jsxs("section",{className:"hero",children:[e.jsx("div",{className:"hero-bg"}),e.jsx("div",{className:"orb orb1"}),e.jsx("div",{className:"orb orb2"}),e.jsx("div",{className:"orb orb3"}),e.jsxs("div",{className:"hero-content",children:[e.jsxs("h1",{className:"hero-h1",style:{margin:"95px 0 32px"},children:["Направи собствена",e.jsx("span",{className:"h1-line",children:"медовина у дома."})]}),e.jsx("p",{className:"hero-sub",style:{fontSize:23},children:"Представи си момента — отваряш бутилка, която ти сам направи преди седмици. Наливаш в чаши на най-близките хора. Това не е просто питие, а истинско преживяване, споделено заедно."}),e.jsxs("div",{className:"hero-btns",children:[e.jsx(w,{className:"btn-primary",to:"/shop",children:"Разгледай комплектите"}),e.jsx("button",{className:"btn-ghost",type:"button",onClick:()=>{var s;return(s=document.getElementById("how"))==null?void 0:s.scrollIntoView({behavior:"smooth"})},children:"Как работи"})]})]}),e.jsxs("div",{className:"hero-scroll",children:[e.jsx("div",{style:{width:1,height:50,background:"linear-gradient(180deg, var(--honey), transparent)",animation:"scrollPulse 2s ease-in-out infinite"}}),e.jsx("span",{children:"Скролни"})]})]})}function rs(){return e.jsx("div",{className:"trust",children:e.jsxs("div",{className:"trust-inner",children:[e.jsx(M,{num:"2,400+",label:e.jsxs(e.Fragment,{children:["Домашни",e.jsx("br",{}),"варители"]})}),e.jsx("div",{className:"trust-div"}),e.jsx(M,{num:"30",label:e.jsxs(e.Fragment,{children:["Дни до",e.jsx("br",{}),"първата партида"]})}),e.jsx("div",{className:"trust-div"}),e.jsx(M,{num:"4.9★",label:e.jsxs(e.Fragment,{children:["Средна оценка",e.jsx("br",{}),"от клиенти"]})}),e.jsx("div",{className:"trust-div"}),e.jsx(M,{num:"0",label:e.jsxs(e.Fragment,{children:["Опит",e.jsx("br",{}),"необходим"]})})]})})}function M({num:s,label:t}){return e.jsxs("div",{className:"trust-item",children:[e.jsx("div",{className:"trust-num",children:s}),e.jsx("div",{className:"trust-lbl",children:t})]})}function ls(){return e.jsx("div",{style:{background:"linear-gradient(180deg, var(--ink) 0%, #120c05 50%, var(--ink) 100%)",padding:"7rem 0",borderBottom:"1px solid rgba(184, 98, 26, 0.12)"},children:e.jsxs("div",{className:"sec",style:{paddingTop:0,paddingBottom:0,textAlign:"center"},children:[e.jsx("div",{className:"sec-label",style:{justifyContent:"center"},children:"Защо медовина"}),e.jsxs("h2",{className:"sec-h2",style:{maxWidth:800,margin:"0 auto 2rem"},children:["Едно питие, което ",e.jsx("span",{className:"h2-accent",children:"събира хората"})]}),e.jsxs("p",{style:as,children:["Медовината е най-древното алкохолно питие — варено по български земи преди хилядолетия. Днес я връщаме у дома, при семейството, при приятелите. Не като продукт от магазина, а като нещо, което"," ",e.jsx("span",{style:{color:"var(--honey)",fontStyle:"normal",fontWeight:600},children:"ти сам направи"}),"."]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"2.5rem",maxWidth:1100,margin:"0 auto"},children:[e.jsx(O,{icon:e.jsx(qe,{size:40}),title:"Споделено е по-сладко",body:"Няма по-голяма тръпка от това да отвориш бутилка, която ти сам направи, и да я налееш на хората, които обичаш."}),e.jsx(O,{icon:e.jsx(Te,{size:40}),title:"Българска традиция",body:"Траките и прабългарите я варили векове наред. Ние я връщаме — със същата простота, със същата душа."}),e.jsx(O,{icon:e.jsx(X,{size:40}),title:"Твое творение",body:"Купуваш мед и вода. Получаваш питие, което носи твоя характер, търпение и вкус. Това не е поръчка — това е творчество."})]})]})})}function O({icon:s,title:t,body:i}){return e.jsxs("div",{style:{textAlign:"left"},children:[e.jsx("div",{style:{fontSize:"2.5rem",marginBottom:"1.2rem"},children:s}),e.jsx("h3",{style:cs,children:t}),e.jsx("p",{style:ns,children:i})]})}const as={fontFamily:"'Cormorant Garamond', serif",fontSize:24,color:"var(--text)",lineHeight:1.8,maxWidth:720,margin:"0 auto 4rem",fontStyle:"italic"},cs={fontFamily:"'UniSans', sans-serif",fontSize:"1.2rem",color:"var(--cream)",textTransform:"uppercase",letterSpacing:"0.03em",marginBottom:"1rem"},ns={fontFamily:"'Cormorant Garamond', serif",fontSize:22,color:"var(--text)",lineHeight:1.75,fontStyle:"italic"},os=`<svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="honeyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#f2c84e"/>
                    <stop offset="50%" stop-color="#d4831f"/>
                    <stop offset="100%" stop-color="#b8621a"/>
                  </linearGradient>
                  <linearGradient id="honeyJarLiquid" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#f2c84e"/>
                    <stop offset="100%" stop-color="#d4831f"/>
                  </linearGradient>
                  <linearGradient id="honeyStream" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#f2c84e"/>
                    <stop offset="100%" stop-color="#e8aa28"/>
                  </linearGradient>
                  <clipPath id="bigJarInsideClip">
                    <path d="M 68 64 L 132 64 L 132 168 L 68 168 Z"/>
                  </clipPath>
                </defs>

                <!-- Floating bees -->
                <g class="bee-fly-1">
                  <g transform="translate(62, 18)">
                    <ellipse cx="0" cy="0" rx="2.5" ry="1.6" fill="#f2c84e"/>
                    <ellipse cx="-1" cy="0" rx="0.4" ry="1.6" fill="#1a0f06"/>
                    <ellipse cx="0.6" cy="0" rx="0.4" ry="1.6" fill="#1a0f06"/>
                    <g class="bee-wing"><ellipse cx="-0.4" cy="-1.4" rx="1.7" ry="0.75" fill="#fff8e0" opacity="0.85"/></g>
                  </g>
                </g>
                <g class="bee-fly-2">
                  <g transform="translate(165, 32)">
                    <ellipse cx="0" cy="0" rx="2.2" ry="1.4" fill="#f2c84e"/>
                    <ellipse cx="-0.8" cy="0" rx="0.35" ry="1.4" fill="#1a0f06"/>
                    <ellipse cx="0.5" cy="0" rx="0.35" ry="1.4" fill="#1a0f06"/>
                    <g class="bee-wing"><ellipse cx="-0.4" cy="-1.2" rx="1.5" ry="0.65" fill="#fff8e0" opacity="0.85"/></g>
                  </g>
                </g>

                <!-- Lid (popped off, floating) -->
                <g class="honey-lid">
                  <g transform="translate(40, 8)">
                    <ellipse cx="0" cy="0" rx="11" ry="3" fill="#a07a4d"/>
                    <ellipse cx="0" cy="-1.5" rx="10" ry="2.3" fill="#c79350"/>
                    <path d="M -11 0 L -11 2.5 Q -11 5 -9 5 L 9 5 Q 11 5 11 2.5 L 11 0 Z"
                          fill="#8a6638" stroke="#5a3f20" stroke-width="0.6"/>
                    <line x1="-7" y1="1.5" x2="-7" y2="4.5" stroke="#5a3f20" stroke-width="0.4"/>
                    <line x1="-3" y1="1.5" x2="-3" y2="4.5" stroke="#5a3f20" stroke-width="0.4"/>
                    <line x1="1"  y1="1.5" x2="1"  y2="4.5" stroke="#5a3f20" stroke-width="0.4"/>
                    <line x1="5"  y1="1.5" x2="5"  y2="4.5" stroke="#5a3f20" stroke-width="0.4"/>
                    <line x1="9"  y1="1.5" x2="9"  y2="4.5" stroke="#5a3f20" stroke-width="0.4"/>
                  </g>
                </g>

                <!-- Honey source jar (tilted to pour) -->
                <g class="honey-jar-tilt">
                  <g transform="translate(15, 14) rotate(28)">
                    <!-- threaded neck -->
                    <rect x="2"  y="2" width="22" height="4" fill="#3a2510"/>
                    <line x1="2" y1="3.2" x2="24" y2="3.2" stroke="#5a3a1c" stroke-width="0.4"/>
                    <line x1="2" y1="4.6" x2="24" y2="4.6" stroke="#5a3a1c" stroke-width="0.4"/>
                    <!-- lip ring -->
                    <rect x="0"  y="0" width="26" height="3" rx="1" fill="#1a0f06" stroke="#b8621a" stroke-width="1"/>
                    <!-- jar body -->
                    <path d="M -2 7 L 28 7 L 28 50 Q 28 56 22 56 L 4 56 Q -2 56 -2 50 Z"
                          fill="#0a0805" stroke="#b8621a" stroke-width="1.5"/>
                    <!-- honey inside source jar -->
                    <path d="M -1 8 L 27 8 L 27 49 Q 27 55 22 55 L 4 55 Q -1 55 -1 49 Z"
                          fill="url(#honeyJarLiquid)" opacity="0.95"/>
                    <!-- glass highlight -->
                    <line x1="1" y1="10" x2="1" y2="50" stroke="rgba(255,255,255,0.22)" stroke-width="1.4"/>
                    <!-- Cream label -->
                    <rect x="2" y="14" width="22" height="36" rx="2" fill="#f6e8c8" stroke="#8a6638" stroke-width="0.5"/>
                    <!-- product banner -->
                    <text x="13" y="20" text-anchor="middle" fill="#3a2510"
                          font-family="UniSans, sans-serif" font-size="3.4" font-weight="900" letter-spacing="0.5">PURE HONEY</text>
                    <line x1="4" y1="22" x2="22" y2="22" stroke="#8a6638" stroke-width="0.4"/>
                    <!-- beehive skep -->
                    <g transform="translate(13, 36)">
                      <ellipse cx="0" cy="3"    rx="8"   ry="2"   fill="#c79350" stroke="#8a6638" stroke-width="0.3"/>
                      <ellipse cx="0" cy="0"    rx="7.2" ry="2"   fill="#d4a560" stroke="#8a6638" stroke-width="0.3"/>
                      <ellipse cx="0" cy="-3"   rx="5.8" ry="1.8" fill="#dcae6a" stroke="#8a6638" stroke-width="0.3"/>
                      <ellipse cx="0" cy="-5.5" rx="3.6" ry="1.4" fill="#e6b876" stroke="#8a6638" stroke-width="0.3"/>
                      <ellipse cx="0" cy="-7.4" rx="1.7" ry="0.9" fill="#e6b876" stroke="#8a6638" stroke-width="0.3"/>
                      <!-- entrance -->
                      <ellipse cx="0" cy="4" rx="1.2" ry="0.9" fill="#3a2510"/>
                      <!-- bees buzzing around -->
                      <circle cx="-9"   cy="-2" r="0.55" fill="#3a2510"/>
                      <circle cx="8.5"  cy="-4" r="0.5"  fill="#3a2510"/>
                      <circle cx="-6"   cy="-7" r="0.4"  fill="#3a2510"/>
                    </g>
                    <!-- ground -->
                    <line x1="3" y1="44.5" x2="23" y2="44.5" stroke="#8a6638" stroke-width="0.4" opacity="0.6"/>
                  </g>
                </g>

                <!-- Honey pour stream from source jar lip into 5L jar mouth -->
                <g class="honey-pour">
                  <path d="M 38 30 C 58 38 80 50 95 60"
                        stroke="url(#honeyStream)" stroke-width="3.4" fill="none" stroke-linecap="round"/>
                  <path d="M 38 30 C 58 38 80 50 95 60"
                        stroke="#fff8e0" stroke-width="0.9" fill="none" stroke-linecap="round" opacity="0.45"/>
                  <ellipse class="pour-drop" cx="95" cy="62" rx="2.4" ry="3.2" fill="#f2c84e"/>
                </g>

                <!-- 5L Jar -->
                <g class="big-jar">
                  <!-- jar mouth -->
                  <rect x="78" y="52" width="44" height="8" rx="2" fill="#8a6e4a" opacity="0.7"/>
                  <rect x="80" y="60" width="40" height="4" fill="#6a4f30" opacity="0.5"/>
                  <!-- jar body -->
                  <path d="M 65 64 Q 65 60 70 60 L 130 60 Q 135 60 135 64 L 135 160 Q 135 168 127 168 L 73 168 Q 65 168 65 160 Z"
                        fill="#1a0f06" stroke="#b8621a" stroke-width="2" opacity="0.9"/>
                  <!-- glass highlight -->
                  <path d="M 70 70 L 70 155" stroke="rgba(255,255,255,0.15)" stroke-width="3" fill="none"/>
                  <!-- honey liquid (rising) -->
                  <g clip-path="url(#bigJarInsideClip)">
                    <g class="big-jar-fill">
                      <path d="M 68 168 L 132 168 L 132 90 Q 100 85 68 90 Z" fill="url(#honeyGrad)"/>
                    </g>
                  </g>
                  <!-- 5L label -->
                  <rect x="84" y="135" width="32" height="22" rx="2" fill="#16100a" opacity="0.85" stroke="#d4831f" stroke-width="1"/>
                  <text x="100" y="151" text-anchor="middle" fill="#f2c84e" font-family="UniSans, sans-serif" font-size="11" font-weight="900">5L</text>
                </g>
              </svg>`,ds=`<svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="yeastLiquidGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#e8aa28" stop-opacity="0.55"/>
                    <stop offset="100%" stop-color="#b8621a" stop-opacity="0.75"/>
                  </linearGradient>
                  <radialGradient id="cellGrad" cx="35%" cy="35%">
                    <stop offset="0%" stop-color="#fff8e0" stop-opacity="0.6"/>
                    <stop offset="100%" stop-color="#d4831f" stop-opacity="0.25"/>
                  </radialGradient>
                  <clipPath id="yeastLiquidClip">
                    <path d="M 62 168 L 138 168 L 138 80 L 62 80 Z"/>
                  </clipPath>
                </defs>

                <!-- Yeast packet (tilted, shaking) -->
                <g class="yeast-pack">
                  <g transform="translate(70, 4) rotate(-14 20 25)">
                    <!-- packet body -->
                    <path d="M 0 6 L 40 6 L 40 50 Q 40 53 37 53 L 3 53 Q 0 53 0 50 Z"
                          fill="#16100a" stroke="#b8621a" stroke-width="1.2"/>
                    <!-- torn open top -->
                    <path d="M 0 6 L 4 3 L 8 6 L 12 2 L 16 6 L 20 3 L 24 6 L 28 2 L 32 6 L 36 3 L 40 6"
                          stroke="#b8621a" stroke-width="1.2" fill="none" stroke-linejoin="round"/>
                    <!-- label -->
                    <rect x="4" y="14" width="32" height="20" rx="1.5" fill="#d4831f"/>
                    <text x="20" y="22" text-anchor="middle" fill="#16100a" font-family="UniSans, sans-serif" font-size="5" font-weight="900" letter-spacing="0.5">ACTIVE</text>
                    <text x="20" y="30" text-anchor="middle" fill="#16100a" font-family="UniSans, sans-serif" font-size="7" font-weight="900">YEAST</text>
                    <!-- 5g weight -->
                    <text x="20" y="42" text-anchor="middle" fill="#f2c84e" font-family="UniSans, sans-serif" font-size="4.5" font-weight="900" opacity="0.8">5 g</text>
                  </g>
                </g>

                <!-- Spores escaping packet -->
                <g class="yeast-spore spore-a" style="--sx: -6px; --sy: -8px;">
                  <circle cx="95" cy="40" r="1.4" fill="#f2c84e"/>
                </g>
                <g class="yeast-spore spore-b" style="--sx: 10px; --sy: -4px;">
                  <circle cx="95" cy="40" r="1.1" fill="#f2c84e"/>
                </g>
                <g class="yeast-spore spore-c" style="--sx: 2px; --sy: -12px;">
                  <circle cx="95" cy="40" r="0.9" fill="#f2c84e"/>
                </g>

                <!-- Jar (matches Step 3) -->
                <path d="M 60 50 L 140 50 L 140 160 Q 140 168 132 168 L 68 168 Q 60 168 60 160 Z"
                      fill="#1a0f06" stroke="#b8621a" stroke-width="2" opacity="0.9"/>
                <path d="M 67 60 L 67 155" stroke="rgba(255,255,255,0.12)" stroke-width="3" fill="none"/>

                <!-- Liquid (filled to same level as Step 3) -->
                <path d="M 62 168 L 138 168 L 138 80 L 62 80 Z" fill="url(#yeastLiquidGrad)"/>
                <!-- Surface highlight -->
                <ellipse cx="100" cy="80" rx="38" ry="2.2" fill="#f2c84e" opacity="0.35"/>
                <line x1="62" y1="80" x2="138" y2="80" stroke="#f2c84e" stroke-width="0.7" opacity="0.5"/>

                <!-- Falling yeast cells (clipped to jar interior so they vanish past surface ripple) -->
                <g clip-path="url(#yeastLiquidClip)">
                  <g class="yeast-fall yeast-fall-1">
                    <circle cx="0" cy="0" r="3" fill="#f2c84e"/>
                    <circle cx="0" cy="0" r="3" fill="url(#cellGrad)" opacity="0.65"/>
                    <circle cx="0" cy="0" r="1" fill="#d4831f" opacity="0.55"/>
                  </g>
                  <g class="yeast-fall yeast-fall-2">
                    <circle cx="0" cy="0" r="2.4" fill="#f2c84e"/>
                    <circle cx="0" cy="0" r="2.4" fill="url(#cellGrad)" opacity="0.6"/>
                  </g>
                  <g class="yeast-fall yeast-fall-3">
                    <circle cx="0" cy="0" r="3.3" fill="#f2c84e"/>
                    <circle cx="0" cy="0" r="3.3" fill="url(#cellGrad)" opacity="0.65"/>
                    <circle cx="0" cy="0" r="1.1" fill="#d4831f" opacity="0.5"/>
                  </g>
                  <g class="yeast-fall yeast-fall-4">
                    <circle cx="0" cy="0" r="2" fill="#f2c84e"/>
                    <circle cx="0" cy="0" r="2" fill="url(#cellGrad)" opacity="0.6"/>
                  </g>
                  <g class="yeast-fall yeast-fall-5">
                    <circle cx="0" cy="0" r="2.8" fill="#f2c84e"/>
                    <circle cx="0" cy="0" r="2.8" fill="url(#cellGrad)" opacity="0.65"/>
                  </g>

                  <!-- Living, swimming yeast inside the liquid -->
                  <g class="yeast-swim yeast-s-1">
                    <circle cx="0" cy="0" r="5" fill="#f2c84e"/>
                    <circle cx="0" cy="0" r="5" fill="url(#cellGrad)" opacity="0.7"/>
                    <circle cx="-1.2" cy="-0.6" r="1.6" fill="#d4831f" opacity="0.55"/>
                    <circle cx="4" cy="1" r="2.2" fill="#f2c84e"/>
                    <circle cx="4" cy="1" r="2.2" fill="url(#cellGrad)" opacity="0.6"/>
                  </g>
                  <g class="yeast-swim yeast-s-2">
                    <circle cx="0" cy="0" r="4" fill="#f2c84e"/>
                    <circle cx="0" cy="0" r="4" fill="url(#cellGrad)" opacity="0.65"/>
                    <circle cx="-0.5" cy="0" r="1.3" fill="#d4831f" opacity="0.5"/>
                    <circle cx="3.5" cy="-0.6" r="1.8" fill="#f2c84e"/>
                    <circle cx="3.5" cy="-0.6" r="1.8" fill="url(#cellGrad)" opacity="0.55"/>
                  </g>
                  <g class="yeast-swim yeast-s-3">
                    <circle cx="0" cy="0" r="3.6" fill="#f2c84e"/>
                    <circle cx="0" cy="0" r="3.6" fill="url(#cellGrad)" opacity="0.65"/>
                    <circle cx="0.4" cy="-0.4" r="1.2" fill="#d4831f" opacity="0.5"/>
                  </g>
                  <g class="yeast-swim yeast-s-4">
                    <circle cx="0" cy="0" r="4.6" fill="#f2c84e"/>
                    <circle cx="0" cy="0" r="4.6" fill="url(#cellGrad)" opacity="0.6"/>
                    <circle cx="-1" cy="0" r="1.4" fill="#d4831f" opacity="0.5"/>
                    <circle cx="3.5" cy="1" r="2" fill="#f2c84e"/>
                    <circle cx="3.5" cy="1" r="2" fill="url(#cellGrad)" opacity="0.55"/>
                  </g>
                  <g class="yeast-swim yeast-s-5">
                    <circle cx="0" cy="0" r="3" fill="#f2c84e"/>
                    <circle cx="0" cy="0" r="3" fill="url(#cellGrad)" opacity="0.65"/>
                    <circle cx="0" cy="0" r="1" fill="#d4831f" opacity="0.5"/>
                  </g>
                </g>
              </svg>`,hs=`<svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="fermentGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#e8aa28"/>
                    <stop offset="100%" stop-color="#b8621a"/>
                  </linearGradient>
                  <clipPath id="fermentClip">
                    <path d="M 62 168 L 138 168 L 138 80 L 62 80 Z"/>
                  </clipPath>
                </defs>

                <!-- Airlock on top -->
                <g class="airlock">
                  <!-- stem from jar lid -->
                  <rect x="97" y="20" width="6" height="12" fill="#6a4f30"/>
                  <!-- bulb -->
                  <circle cx="100" cy="38" r="8" fill="#1a0f06" stroke="#b8621a" stroke-width="1.4"/>
                  <!-- water inside bulb (meniscus) -->
                  <path d="M 92.6 38 Q 100 42 107.4 38 L 107.4 43.5 Q 100 45.5 92.6 43.5 Z" fill="#f2c84e" opacity="0.6"/>
                  <!-- bubble escaping through bulb water -->
                  <circle class="airlock-bubble" cx="100" cy="38" r="1.4" fill="#f2c84e"/>
                </g>

                <!-- Jar -->
                <path d="M 60 50 L 140 50 L 140 160 Q 140 168 132 168 L 68 168 Q 60 168 60 160 Z"
                      fill="#1a0f06" stroke="#b8621a" stroke-width="2" opacity="0.9"/>
                <path d="M 67 60 L 67 155" stroke="rgba(255,255,255,0.12)" stroke-width="3" fill="none"/>

                <!-- Liquid -->
                <path d="M 62 168 L 138 168 L 138 80 L 62 80 Z" fill="url(#fermentGrad)" opacity="0.85"/>
                <!-- Surface highlight -->
                <ellipse cx="100" cy="80" rx="38" ry="2" fill="#f2c84e" opacity="0.35"/>
                <line x1="62" y1="80" x2="138" y2="80" stroke="#f2c84e" stroke-width="0.6" opacity="0.45"/>

                <!-- Bubbles rising inside liquid (clipped to interior) -->
                <g clip-path="url(#fermentClip)">
                  <circle class="ferment-bubble bubble-1" cx="80"  cy="155" r="3"   fill="#f2c84e" opacity="0.8"/>
                  <circle class="ferment-bubble bubble-2" cx="105" cy="160" r="4"   fill="#f2c84e" opacity="0.7"/>
                  <circle class="ferment-bubble bubble-3" cx="120" cy="155" r="2.5" fill="#f2c84e" opacity="0.9"/>
                  <circle class="ferment-bubble bubble-4" cx="92"  cy="158" r="3.5" fill="#f2c84e" opacity="0.75"/>
                  <circle class="ferment-bubble bubble-5" cx="115" cy="162" r="2"   fill="#f2c84e" opacity="0.85"/>
                </g>

                <!-- Process label inside jar: ЗАХАР → АЛК. -->
                <g transform="translate(100, 115)">
                  <!-- pill background -->
                  <rect x="-44" y="-13" width="88" height="26" rx="13"
                        fill="#0a0805" stroke="#d4831f" stroke-width="1" opacity="0.94"/>
                  <!-- left label -->
                  <text x="-22" y="4" text-anchor="middle" fill="#f2c84e"
                        font-family="UniSans, sans-serif" font-size="9" font-weight="900" letter-spacing="0.5">ЗАХАР</text>
                  <!-- arrow shaft + head -->
                  <g class="arrow-line">
                    <line x1="-3" y1="0" x2="14" y2="0" stroke="#d4831f" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M 11 -3 L 14 0 L 11 3" stroke="#d4831f" stroke-width="1.5" fill="none"
                          stroke-linecap="round" stroke-linejoin="round"/>
                  </g>
                  <!-- traveling particle along arrow -->
                  <circle class="arrow-particle" cx="-3" cy="0" r="1.6" fill="#f2c84e"/>
                  <!-- right label -->
                  <text x="28" y="4" text-anchor="middle" fill="#f2c84e"
                        font-family="UniSans, sans-serif" font-size="9" font-weight="900" letter-spacing="0.5">АЛК.</text>
                </g>
              </svg>`,xs=`<svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="finalBottleGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#f2c84e" stop-opacity="0.95"/>
                    <stop offset="100%" stop-color="#b8621a" stop-opacity="0.95"/>
                  </linearGradient>
                  <radialGradient id="finalGlow" cx="50%" cy="50%">
                    <stop offset="0%" stop-color="#f2c84e" stop-opacity="0.85"/>
                    <stop offset="40%" stop-color="#e8aa28" stop-opacity="0.35"/>
                    <stop offset="100%" stop-color="#f2c84e" stop-opacity="0"/>
                  </radialGradient>
                  <clipPath id="finalBottleClip">
                    <path d="M 78 60 L 122 60 L 122 158 Q 122 165 115 165 L 85 165 Q 78 165 78 158 Z"/>
                  </clipPath>
                </defs>

                <!-- Celebration glow halo behind bottle top -->
                <circle class="finish-glow" cx="100" cy="50" r="55" fill="url(#finalGlow)"/>

                <!-- Pouring stream into bottle -->
                <g class="finish-stream">
                  <path d="M 100 18 L 100 56" stroke="#f2c84e" stroke-width="2.4" stroke-linecap="round" opacity="0.9"/>
                  <circle cx="100" cy="56" r="1.4" fill="#f2c84e" opacity="0.85"/>
                </g>

                <!-- Bottle -->
                <!-- lip -->
                <rect x="86" y="40" width="28" height="6" rx="1.5" fill="#1a0f06" stroke="#b8621a" stroke-width="1.5"/>
                <!-- neck -->
                <rect x="90" y="46" width="20" height="18" rx="1" fill="#1a0f06" stroke="#b8621a" stroke-width="1.5"/>
                <!-- shoulder + body -->
                <path d="M 78 60 L 122 60 L 122 158 Q 122 165 115 165 L 85 165 Q 78 165 78 158 Z"
                      fill="#0a0805" stroke="#b8621a" stroke-width="2"/>
                <!-- glass highlights -->
                <path d="M 84 70 L 84 155" stroke="rgba(255,255,255,0.15)" stroke-width="2.2" fill="none"/>
                <path d="M 117 75 L 117 150" stroke="rgba(255,255,255,0.08)" stroke-width="1.5" fill="none"/>

                <!-- Liquid filling (clipped to bottle interior) -->
                <g clip-path="url(#finalBottleClip)">
                  <g class="finish-fill">
                    <path d="M 78 165 L 122 165 L 122 60 L 78 60 Z" fill="url(#finalBottleGrad)"/>
                  </g>
                  <!-- liquid surface highlight rides with the fill -->
                  <g class="finish-fill" style="animation-delay: 0s;">
                    <ellipse cx="100" cy="60" rx="22" ry="1.6" fill="#fff8e0" opacity="0.45"/>
                  </g>
                </g>

                <!-- Label -->
                <rect x="83" y="98" width="34" height="42" rx="2" fill="#16100a" opacity="0.94" stroke="#d4831f" stroke-width="0.8"/>
                <text x="100" y="112" text-anchor="middle" fill="#f2c84e" font-family="UniSans, sans-serif" font-size="7" font-weight="900" letter-spacing="0.6">МЕДО-</text>
                <text x="100" y="121" text-anchor="middle" fill="#f2c84e" font-family="UniSans, sans-serif" font-size="7" font-weight="900" letter-spacing="0.6">ВИНА</text>
                <line x1="90" y1="126" x2="110" y2="126" stroke="#d4831f" stroke-width="0.6"/>
                <text x="100" y="134" text-anchor="middle" fill="#d4831f" font-family="UniSans, sans-serif" font-size="3.6" font-weight="900" letter-spacing="0.8">RESERVE</text>

                <!-- Cork (drops in after fill) -->
                <g class="finish-cork">
                  <rect x="91" y="33" width="18" height="11" rx="1.5" fill="#a07a4d"/>
                  <rect x="91" y="33" width="18" height="3" rx="1.5" fill="#8a6638" opacity="0.55"/>
                  <line x1="93" y1="38" x2="107" y2="38" stroke="#7a5630" stroke-width="0.5" opacity="0.6"/>
                  <line x1="93" y1="41" x2="107" y2="41" stroke="#7a5630" stroke-width="0.5" opacity="0.5"/>
                </g>

                <!-- Light particles bursting on completion -->
                <g class="finish-spark p-1"><polygon points="0,-4 1.2,-1.2 4,0 1.2,1.2 0,4 -1.2,1.2 -4,0 -1.2,-1.2" fill="#f2c84e"/></g>
                <g class="finish-spark p-2"><circle cx="0" cy="0" r="2.2" fill="#fff8e0"/></g>
                <g class="finish-spark p-3"><polygon points="0,-3.5 1,-1 3.5,0 1,1 0,3.5 -1,1 -3.5,0 -1,-1" fill="#e8aa28"/></g>
                <g class="finish-spark p-4"><circle cx="0" cy="0" r="1.7" fill="#f2c84e"/></g>
                <g class="finish-spark p-5"><polygon points="0,-4 1.2,-1.2 4,0 1.2,1.2 0,4 -1.2,1.2 -4,0 -1.2,-1.2" fill="#fff8e0"/></g>
                <g class="finish-spark p-6"><circle cx="0" cy="0" r="2.4" fill="#d4831f"/></g>
                <g class="finish-spark p-7"><polygon points="0,-3.5 1,-1 3.5,0 1,1 0,3.5 -1,1 -3.5,0 -1,-1" fill="#f2c84e"/></g>
                <g class="finish-spark p-8"><circle cx="0" cy="0" r="1.8" fill="#fff8e0"/></g>
                <g class="finish-spark p-9"><polygon points="0,-3 0.9,-0.9 3,0 0.9,0.9 0,3 -0.9,0.9 -3,0 -0.9,-0.9" fill="#e8aa28"/></g>
                <g class="finish-spark p-10"><circle cx="0" cy="0" r="2" fill="#f2c84e"/></g>
                <g class="finish-spark p-11"><polygon points="0,-3.8 1.1,-1.1 3.8,0 1.1,1.1 0,3.8 -1.1,1.1 -3.8,0 -1.1,-1.1" fill="#fff8e0"/></g>
                <g class="finish-spark p-12"><circle cx="0" cy="0" r="1.5" fill="#f2c84e"/></g>
                <g class="finish-spark p-13"><circle cx="0" cy="0" r="1.6" fill="#e8aa28"/></g>

                <!-- Completion badge -->
                <g class="finish-check">
                  <circle cx="152" cy="30" r="13" fill="#0a0805" stroke="#f2c84e" stroke-width="2"/>
                  <path d="M 146 30 L 150.5 34.5 L 158 26" stroke="#f2c84e" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
              </svg>`;function fs(){return e.jsx("div",{className:"how-bg",id:"how",children:e.jsxs("div",{className:"sec",children:[e.jsx("div",{className:"sec-label",children:"Как работи"}),e.jsxs("h2",{className:"sec-h2",children:["4 стъпки до твоята ",e.jsx("span",{className:"h2-accent",children:"първа медовина"})]}),e.jsx("p",{className:"sec-body",children:"Без химия, без опит, без скъпо оборудване. Само следваш наръчника и природата свърши останалото."}),e.jsxs("div",{className:"steps",children:[e.jsx(E,{svg:os,num:"01",day:"Ден 1",title:"Добавяш мед и вода",desc:"Разтваряш меда в хладка вода в 5-литровия съд. Пропорцията определя силата и вкуса на медовината.",descSize:20,descWeight:500}),e.jsx(E,{svg:ds,num:"02",day:"Ден 1-2",title:"Слагаш дрождите",desc:"Малките организми се събуждат и започват да хапят захарта. Те ще работят за теб следващите седмици.",descSize:20}),e.jsx(E,{svg:hs,num:"03",day:"Ден 3-25",title:"Ферментацията тече",desc:"Дрождите превръщат захарта в алкохол. Виждаш как мехурчетата излизат през въздушния клапан.",descSize:20}),e.jsx(E,{svg:xs,num:"04",day:"Ден 30+",title:"Бутилираш и опитваш",desc:"Прехвърляш медовината в бутилки за вторична ферментация. След няколко дни е готова за наздравица.",descSize:20})]})]})})}function E({svg:s,num:t,day:i,title:r,desc:l,descSize:a=16,descWeight:d}){return e.jsxs("div",{className:"step",children:[e.jsx("div",{className:"step-illustration",dangerouslySetInnerHTML:{__html:s}}),e.jsx("div",{className:"step-n",children:t}),e.jsx("div",{className:"step-day",children:i}),e.jsx("div",{className:"step-title",children:r}),e.jsx("div",{className:"step-desc",style:{fontFamily:'"Cormorant Garamond"',fontWeight:d,fontSize:a},children:l})]})}const ps=[{name:"начало-тук",meta:"Добре дошли!",locked:!1},{name:"въпроси-за-начинаещи",meta:"Всеки въпрос е добър",locked:!1},{name:"покажи-партидата-си",meta:"Похвали се",locked:!1},{name:"рецепти",meta:"Общодостъпни",locked:!1},{name:"премиум-рецепти",meta:"Premium",locked:!0}];function ms({compactLead:s=!1}){return e.jsx("div",{className:"comm-bg",children:e.jsxs("div",{className:"comm-grid",children:[e.jsxs("div",{style:s?void 0:{height:834,padding:"0 0 15px"},children:[e.jsx("div",{className:"sec-label",children:"Общност"}),e.jsxs("h2",{className:"sec-h2",children:[e.jsx("span",{className:"h2-accent",children:"ПРИСЪЕДИНИ СЕ"})," КЪМ НАШАТА ДИСКОРД ОБЩНОСТ"]}),e.jsx("p",{className:"sec-body",style:{marginBottom:"1rem"},children:"Нашият Discord е място, където начинаещи и опитни споделят рецепти, решават проблеми и се надпреварват всеки месец."}),e.jsxs("button",{type:"button",className:"discord-info","aria-label":"Какво е Discord",style:{margin:"8px 0 26px",padding:"11px 19px 15px",gap:4},children:[e.jsx("span",{className:"di-q",children:"?"}),"Какво е Discord",e.jsx("span",{className:"di-tip",children:"Приложение чрез което комуникацията между хора е много лесна и удобна."})]}),e.jsx("ul",{className:"channels",children:ps.map(t=>e.jsxs("li",{className:"channel",children:[e.jsx("span",{className:"channel-hash",children:"#"}),e.jsx("span",{className:"channel-name",children:t.name}),e.jsx("span",{className:"channel-meta",children:t.locked?e.jsx("span",{className:"lock-badge",children:"Premium"}):t.meta})]},t.name))})]}),e.jsx("div",{children:e.jsxs("div",{className:"comm-cta",children:[e.jsx("div",{style:{color:"var(--honey)",marginBottom:"1.5rem"},children:e.jsx(Re,{size:56})}),e.jsx("h3",{children:"Отключи Discord достъп"}),e.jsx("p",{children:"Поръчай комплект или надвиши 50 лв. и получи автоматична покана към нашата частна Discord общност."}),e.jsx(w,{className:"btn-primary",to:"/shop",children:"Разгледай комплектите"}),e.jsx("div",{className:"unlock-hint",children:"Автоматична покана след поръчката"})]})})]})})}const us=[{id:"t1",text:"Направих първата си партида за Великден и дадох на цялото семейство. Всички искаха рецептата. Вкусът беше невероятен.",author:"Димитър К.",detail:"София · Starter Kit",avatar:"farmer"},{id:"t2",text:"Имах проблем с температурата. В Discord ми помогнаха за 10 минути. Партидата се получи перфектно.",author:"Ива М.",detail:"Пловдив · Premium Kit",avatar:"woman"},{id:"t3",text:"Хобито ми стана страст. Вече съм на шеста партида. Общността е невероятна.",author:"Стефан Г.",detail:"Варна · Premium",avatar:"bearded"}];function ys({testimonial:s}){const t=ze[s.avatar];return e.jsxs("article",{className:"testi",children:[e.jsx("div",{className:"stars",children:"★★★★★"}),e.jsxs("div",{className:"testi-text",children:['"',s.text,'"']}),e.jsxs("div",{className:"testi-author",children:[e.jsx("div",{className:"author-av",children:t?e.jsx(t,{size:44}):s.avatar}),e.jsxs("div",{children:[e.jsx("div",{className:"author-name",children:s.author}),e.jsx("div",{className:"author-detail",children:s.detail})]})]})]})}function gs(){return e.jsx("div",{className:"testi-bg",children:e.jsxs("div",{className:"sec",children:[e.jsx("div",{className:"sec-label",children:"Обратна връзка"}),e.jsxs("h2",{className:"sec-h2",children:["Те вече са го ",e.jsx("span",{className:"h2-accent",children:"направили"})]}),e.jsx("div",{className:"testi-grid",children:us.map(s=>e.jsx(ys,{testimonial:s},s.id))}),e.jsx("div",{style:{textAlign:"center",marginTop:"2.5rem"},children:e.jsx(w,{className:"btn-ghost",to:"/reviews",children:"Виж всички отзиви →"})})]})})}const js=[{q:"Законно ли е да правя медовина у дома?",a:"Да! В България домашното производство на алкохол за лична употреба е напълно законно."},{q:"Колко трудно е за начинаещ?",a:"Абсолютно не е трудно. Комплектите са проектирани специално за хора без никакъв опит."},{q:"Колко дълго отнема да се направи медовина?",a:"Основна партида е готова след около 30 дни. Ферментацията отнема 2 седмици."},{q:"Ще миризма ли у дома по време на ферментацията?",a:"Има лека приятна миризма. Въздушният клапан минимизира всякакви аромати."},{q:"Колко алкохол се получава?",a:"Starter Kit дава около 10-14% алкохол. Premium Kit със специализирани дрожди: 16-20%."},{q:"Мога ли да получа помощ ако нещо се обърка?",a:"Да! Discord общността е активна денонощно. Хиляди варители са готови да помогнат."}];function bs(){const[s,t]=n.useState(null);return e.jsx("div",{id:"faq",style:{background:"linear-gradient(180deg, var(--ink) 0%, #100a04 100%)"},children:e.jsxs("div",{className:"sec",children:[e.jsx("div",{className:"sec-label",children:"FAQ"}),e.jsxs("h2",{className:"sec-h2",children:["Често задавани ",e.jsx("span",{className:"h2-accent",children:"въпроси"})]}),e.jsx("div",{className:"faq-list",children:js.map((i,r)=>{const l=s===r;return e.jsxs("div",{className:`faq-item${l?" open":""}`,children:[e.jsxs("div",{className:"faq-q",onClick:()=>t(l?null:r),role:"button",tabIndex:0,onKeyDown:a=>{(a.key==="Enter"||a.key===" ")&&(a.preventDefault(),t(l?null:r))},children:[e.jsx("div",{className:"faq-question",children:i.q}),e.jsx("div",{className:"faq-icon",children:"+"})]}),e.jsx("div",{className:"faq-a",children:e.jsx("div",{className:"faq-answer",children:i.a})})]},r)})})]})})}const vs="/logo.webp";function ks(){return e.jsxs("div",{className:"cta-banner",children:[e.jsx("img",{src:vs,className:"cta-logo",alt:"Медовник"}),e.jsx("h2",{className:"sec-h2",style:{textAlign:"center",marginBottom:"1rem"},children:"Готов да започнеш?"}),e.jsx("p",{style:{color:"var(--text)",fontStyle:"italic",fontSize:"1.2rem",maxWidth:540,margin:"0 auto 2.5rem",lineHeight:1.75,fontFamily:"'Cormorant Garamond', serif"},children:"Твоята първа медовина е само 30 дни далеч. Хиляди хора вече са го направили."}),e.jsx(w,{className:"btn-primary",to:"/shop",style:{fontSize:"0.95rem",padding:"1.3rem 3.2rem"},children:"Вземи комплекта си сега"})]})}function ws(){return e.jsxs("main",{children:[e.jsx(is,{}),e.jsx(rs,{}),e.jsx(ls,{}),e.jsx(fs,{}),e.jsx(ms,{}),e.jsx(gs,{}),e.jsx(bs,{}),e.jsx(ks,{})]})}const Ns=n.lazy(()=>T(()=>import("./ShopPage-3zW_00CK.js"),__vite__mapDeps([0,1]))),Ls=n.lazy(()=>T(()=>import("./CommunityPage-C25vIHEr.js"),__vite__mapDeps([2,1]))),Cs=n.lazy(()=>T(()=>import("./ReviewsPage-BhUOvftt.js"),__vite__mapDeps([3,1]))),Ss=n.lazy(()=>T(()=>import("./NotFoundPage-WZwQG_H-.js"),__vite__mapDeps([4,1])));function Ms(){const[s,t]=n.useState(!0);return e.jsxs(xe,{children:[s&&e.jsx(ss,{onDone:()=>t(!1)}),e.jsxs(Ne,{children:[e.jsx(ts,{}),e.jsx(Qe,{}),e.jsx(Ue,{}),e.jsx(n.Suspense,{fallback:null,children:e.jsxs(fe,{children:[e.jsx(N,{path:"/",element:e.jsx(ws,{})}),e.jsx(N,{path:"/shop",element:e.jsx(Ns,{})}),e.jsx(N,{path:"/community",element:e.jsx(Ls,{})}),e.jsx(N,{path:"/reviews",element:e.jsx(Cs,{})}),e.jsx(N,{path:"*",element:e.jsx(Ss,{})})]})}),e.jsx(We,{})]})]})}ye.createRoot(document.getElementById("root")).render(e.jsx(n.StrictMode,{children:e.jsx(Ms,{})}));requestAnimationFrame(()=>{const s=document.getElementById("boot");s&&(s.classList.add("gone"),setTimeout(()=>s.remove(),500))});export{be as A,Is as B,ms as D,ve as F,ke as H,Rs as L,Q as P,qs as T,qe as a,Ts as b,us as c,ys as d,_s as e,e as j,J as u};
