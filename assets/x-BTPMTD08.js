import{r as t,j as g}from"./index-CWJm3WaG.js";import{M as b,u as w,P as $,a as q,b as A,L as D,c as z}from"./createLucideIcon-iWi5oUHK.js";class K extends t.Component{getSnapshotBeforeUpdate(l){const e=this.props.childRef.current;if(e&&l.isPresent&&!this.props.isPresent){const n=this.props.sizeRef.current;n.height=e.offsetHeight||0,n.width=e.offsetWidth||0,n.top=e.offsetTop,n.left=e.offsetLeft}return null}componentDidUpdate(){}render(){return this.props.children}}function T({children:i,isPresent:l}){const e=t.useId(),n=t.useRef(null),C=t.useRef({width:0,height:0,top:0,left:0}),{nonce:a}=t.useContext(b);return t.useInsertionEffect(()=>{const{width:d,height:o,top:h,left:s}=C.current;if(l||!n.current||!d||!o)return;n.current.dataset.motionPopId=e;const c=document.createElement("style");return a&&(c.nonce=a),document.head.appendChild(c),c.sheet&&c.sheet.insertRule(`
          [data-motion-pop-id="${e}"] {
            position: absolute !important;
            width: ${d}px !important;
            height: ${o}px !important;
            top: ${h}px !important;
            left: ${s}px !important;
          }
        `),()=>{document.head.removeChild(c)}},[l]),g.jsx(K,{isPresent:l,childRef:n,sizeRef:C,children:t.cloneElement(i,{ref:n})})}const U=({children:i,initial:l,isPresent:e,onExitComplete:n,custom:C,presenceAffectsLayout:a,mode:d})=>{const o=w(X),h=t.useId(),s=t.useCallback(f=>{o.set(f,!0);for(const x of o.values())if(!x)return;n&&n()},[o,n]),c=t.useMemo(()=>({id:h,initial:l,isPresent:e,custom:C,onExitComplete:s,register:f=>(o.set(f,!1),()=>o.delete(f))}),a?[Math.random(),s]:[e,s]);return t.useMemo(()=>{o.forEach((f,x)=>o.set(x,!1))},[e]),t.useEffect(()=>{!e&&!o.size&&n&&n()},[e]),d==="popLayout"&&(i=g.jsx(T,{isPresent:e,children:i})),g.jsx($.Provider,{value:c,children:i})};function X(){return new Map}const v=i=>i.key||"";function j(i){const l=[];return t.Children.forEach(i,e=>{t.isValidElement(e)&&l.push(e)}),l}const G=({children:i,custom:l,initial:e=!0,onExitComplete:n,presenceAffectsLayout:C=!0,mode:a="sync",propagate:d=!1})=>{const[o,h]=q(d),s=t.useMemo(()=>j(i),[i]),c=d&&!o?[]:s.map(v),f=t.useRef(!0),x=t.useRef(s),y=w(()=>new Map),[I,L]=t.useState(s),[p,k]=t.useState(s);A(()=>{f.current=!1,x.current=s;for(let u=0;u<p.length;u++){const r=v(p[u]);c.includes(r)?y.delete(r):y.get(r)!==!0&&y.set(r,!1)}},[p,c.length,c.join("-")]);const R=[];if(s!==I){let u=[...s];for(let r=0;r<p.length;r++){const m=p[r],M=v(m);c.includes(M)||(u.splice(r,0,m),R.push(m))}a==="wait"&&R.length&&(u=R),k(j(u)),L(s);return}const{forceRender:E}=t.useContext(D);return g.jsx(g.Fragment,{children:p.map(u=>{const r=v(u),m=d&&!o?!1:s===p||c.includes(r),M=()=>{if(y.has(r))y.set(r,!0);else return;let P=!0;y.forEach(S=>{S||(P=!1)}),P&&(E==null||E(),k(x.current),d&&(h==null||h()),n&&n())};return g.jsx(U,{isPresent:m,initial:!f.current||e?void 0:!1,custom:m?void 0:l,presenceAffectsLayout:C,mode:a,onExitComplete:m?void 0:M,children:u},r)})})};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H=z("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=z("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);export{G as A,H as S,O as X};
