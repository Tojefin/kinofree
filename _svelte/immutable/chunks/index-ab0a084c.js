function k(){}const st=t=>t;function ct(t,e){for(const n in e)t[n]=e[n];return t}function J(t){return t()}function H(){return Object.create(null)}function x(t){t.forEach(J)}function K(t){return typeof t=="function"}function Dt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let N;function Ot(t,e){return N||(N=document.createElement("a")),N.href=e,t===N.href}function lt(t){return Object.keys(t).length===0}function ot(t,...e){if(t==null)return k;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function Lt(t,e,n){t.$$.on_destroy.push(ot(e,n))}function Tt(t,e,n,s){if(t){const r=Q(t,e,n,s);return t[0](r)}}function Q(t,e,n,s){return t[1]&&s?ct(n.ctx.slice(),t[1](s(e))):n.ctx}function zt(t,e,n,s){if(t[2]&&s){const r=t[2](s(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const o=[],i=Math.max(e.dirty.length,r.length);for(let l=0;l<i;l+=1)o[l]=e.dirty[l]|r[l];return o}return e.dirty|r}return e.dirty}function Bt(t,e,n,s,r,o){if(r){const i=Q(e,n,s,o);t.p(i,r)}}function Ft(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let s=0;s<n;s++)e[s]=-1;return e}return-1}function Ht(t,e,n){return t.set(n),e}const U=typeof window!="undefined";let ut=U?()=>window.performance.now():()=>Date.now(),B=U?t=>requestAnimationFrame(t):k;const b=new Set;function V(t){b.forEach(e=>{e.c(t)||(b.delete(e),e.f())}),b.size!==0&&B(V)}function at(t){let e;return b.size===0&&B(V),{promise:new Promise(n=>{b.add(e={c:t,f:n})}),abort(){b.delete(e)}}}let R=!1;function ft(){R=!0}function _t(){R=!1}function dt(t,e,n,s){for(;t<e;){const r=t+(e-t>>1);n(r)<=s?t=r+1:e=r}return t}function ht(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const c=[];for(let u=0;u<e.length;u++){const _=e[u];_.claim_order!==void 0&&c.push(_)}e=c}const n=new Int32Array(e.length+1),s=new Int32Array(e.length);n[0]=-1;let r=0;for(let c=0;c<e.length;c++){const u=e[c].claim_order,_=(r>0&&e[n[r]].claim_order<=u?r+1:dt(1,r,a=>e[n[a]].claim_order,u))-1;s[c]=n[_]+1;const f=_+1;n[f]=c,r=Math.max(f,r)}const o=[],i=[];let l=e.length-1;for(let c=n[r]+1;c!=0;c=s[c-1]){for(o.push(e[c-1]);l>=c;l--)i.push(e[l]);l--}for(;l>=0;l--)i.push(e[l]);o.reverse(),i.sort((c,u)=>c.claim_order-u.claim_order);for(let c=0,u=0;c<i.length;c++){for(;u<o.length&&i[c].claim_order>=o[u].claim_order;)u++;const _=u<o.length?o[u]:null;t.insertBefore(i[c],_)}}function mt(t,e){t.appendChild(e)}function X(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function pt(t){const e=Y("style");return yt(X(t),e),e.sheet}function yt(t,e){mt(t.head||t,e)}function gt(t,e){if(R){for(ht(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function It(t,e,n){R&&!n?gt(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function bt(t){t.parentNode.removeChild(t)}function Wt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function Y(t){return document.createElement(t)}function F(t){return document.createTextNode(t)}function Gt(){return F(" ")}function Jt(){return F("")}function Kt(t,e,n,s){return t.addEventListener(e,n,s),()=>t.removeEventListener(e,n,s)}function Qt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function xt(t){return Array.from(t.childNodes)}function $t(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function Z(t,e,n,s,r=!1){$t(t);const o=(()=>{for(let i=t.claim_info.last_index;i<t.length;i++){const l=t[i];if(e(l)){const c=n(l);return c===void 0?t.splice(i,1):t[i]=c,r||(t.claim_info.last_index=i),l}}for(let i=t.claim_info.last_index-1;i>=0;i--){const l=t[i];if(e(l)){const c=n(l);return c===void 0?t.splice(i,1):t[i]=c,r?c===void 0&&t.claim_info.last_index--:t.claim_info.last_index=i,l}}return s()})();return o.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,o}function wt(t,e,n,s){return Z(t,r=>r.nodeName===e,r=>{const o=[];for(let i=0;i<r.attributes.length;i++){const l=r.attributes[i];n[l.name]||o.push(l.name)}o.forEach(i=>r.removeAttribute(i))},()=>s(e))}function Ut(t,e,n){return wt(t,e,n,Y)}function vt(t,e){return Z(t,n=>n.nodeType===3,n=>{const s=""+e;if(n.data.startsWith(s)){if(n.data.length!==s.length)return n.splitText(s.length)}else n.data=s},()=>F(e),!0)}function Vt(t){return vt(t," ")}function Xt(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function Yt(t,e,n,s){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,s?"important":"")}function Zt(t,e,n){t.classList[n?"add":"remove"](e)}function tt(t,e,{bubbles:n=!1,cancelable:s=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,n,s,e),r}function te(t,e=document.body){return Array.from(e.querySelectorAll(t))}const M=new Map;let q=0;function Et(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function kt(t,e){const n={stylesheet:pt(e),rules:{}};return M.set(t,n),n}function I(t,e,n,s,r,o,i,l=0){const c=16.666/s;let u=`{
`;for(let p=0;p<=1;p+=c){const g=e+(n-e)*o(p);u+=p*100+`%{${i(g,1-g)}}
`}const _=u+`100% {${i(n,1-n)}}
}`,f=`__svelte_${Et(_)}_${l}`,a=X(t),{stylesheet:d,rules:h}=M.get(a)||kt(a,t);h[f]||(h[f]=!0,d.insertRule(`@keyframes ${f} ${_}`,d.cssRules.length));const y=t.style.animation||"";return t.style.animation=`${y?`${y}, `:""}${f} ${s}ms linear ${r}ms 1 both`,q+=1,f}function At(t,e){const n=(t.style.animation||"").split(", "),s=n.filter(e?o=>o.indexOf(e)<0:o=>o.indexOf("__svelte")===-1),r=n.length-s.length;r&&(t.style.animation=s.join(", "),q-=r,q||Nt())}function Nt(){B(()=>{q||(M.forEach(t=>{const{stylesheet:e}=t;let n=e.cssRules.length;for(;n--;)e.deleteRule(n);t.rules={}}),M.clear())})}let E;function v(t){E=t}function D(){if(!E)throw new Error("Function called outside component initialization");return E}function ee(t){D().$$.on_mount.push(t)}function ne(t){D().$$.after_update.push(t)}function ie(){const t=D();return(e,n,{cancelable:s=!1}={})=>{const r=t.$$.callbacks[e];if(r){const o=tt(e,n,{cancelable:s});return r.slice().forEach(i=>{i.call(t,o)}),!o.defaultPrevented}return!0}}function re(t,e){return D().$$.context.set(t,e),e}const w=[],W=[],C=[],G=[],et=Promise.resolve();let z=!1;function nt(){z||(z=!0,et.then(it))}function se(){return nt(),et}function P(t){C.push(t)}const L=new Set;let j=0;function it(){const t=E;do{for(;j<w.length;){const e=w[j];j++,v(e),jt(e.$$)}for(v(null),w.length=0,j=0;W.length;)W.pop()();for(let e=0;e<C.length;e+=1){const n=C[e];L.has(n)||(L.add(n),n())}C.length=0}while(w.length);for(;G.length;)G.pop()();z=!1,L.clear(),v(t)}function jt(t){if(t.fragment!==null){t.update(),x(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(P)}}let $;function Ct(){return $||($=Promise.resolve(),$.then(()=>{$=null})),$}function T(t,e,n){t.dispatchEvent(tt(`${e?"intro":"outro"}${n}`))}const S=new Set;let m;function ce(){m={r:0,c:[],p:m}}function le(){m.r||x(m.c),m=m.p}function St(t,e){t&&t.i&&(S.delete(t),t.i(e))}function oe(t,e,n,s){if(t&&t.o){if(S.has(t))return;S.add(t),m.c.push(()=>{S.delete(t),s&&(n&&t.d(1),s())}),t.o(e)}}const Mt={duration:0};function ue(t,e,n,s){let r=e(t,n),o=s?0:1,i=null,l=null,c=null;function u(){c&&At(t,c)}function _(a,d){const h=a.b-o;return d*=Math.abs(h),{a:o,b:a.b,d:h,duration:d,start:a.start,end:a.start+d,group:a.group}}function f(a){const{delay:d=0,duration:h=300,easing:y=st,tick:p=k,css:g}=r||Mt,O={start:ut()+d,b:a};a||(O.group=m,m.r+=1),i||l?l=O:(g&&(u(),c=I(t,o,a,h,d,y,g)),a&&p(0,1),i=_(O,h),P(()=>T(t,a,"start")),at(A=>{if(l&&A>l.start&&(i=_(l,h),l=null,T(t,i.b,"start"),g&&(u(),c=I(t,o,i.b,i.duration,0,y,r.css))),i){if(A>=i.end)p(o=i.b,1-o),T(t,i.b,"end"),l||(i.b?u():--i.group.r||x(i.group.c)),i=null;else if(A>=i.start){const rt=A-i.start;o=i.a+i.d*y(rt/i.duration),p(o,1-o)}}return!!(i||l)}))}return{run(a){K(r)?Ct().then(()=>{r=r(),f(a)}):f(a)},end(){u(),i=l=null}}}function ae(t,e){const n={},s={},r={$$scope:1};let o=t.length;for(;o--;){const i=t[o],l=e[o];if(l){for(const c in i)c in l||(s[c]=1);for(const c in l)r[c]||(n[c]=l[c],r[c]=1);t[o]=l}else for(const c in i)r[c]=1}for(const i in s)i in n||(n[i]=void 0);return n}function fe(t){return typeof t=="object"&&t!==null?t:{}}function _e(t){t&&t.c()}function de(t,e){t&&t.l(e)}function qt(t,e,n,s){const{fragment:r,on_mount:o,on_destroy:i,after_update:l}=t.$$;r&&r.m(e,n),s||P(()=>{const c=o.map(J).filter(K);i?i.push(...c):x(c),t.$$.on_mount=[]}),l.forEach(P)}function Pt(t,e){const n=t.$$;n.fragment!==null&&(x(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Rt(t,e){t.$$.dirty[0]===-1&&(w.push(t),nt(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function he(t,e,n,s,r,o,i,l=[-1]){const c=E;v(t);const u=t.$$={fragment:null,ctx:null,props:o,update:k,not_equal:r,bound:H(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(c?c.$$.context:[])),callbacks:H(),dirty:l,skip_bound:!1,root:e.target||c.$$.root};i&&i(u.root);let _=!1;if(u.ctx=n?n(t,e.props||{},(f,a,...d)=>{const h=d.length?d[0]:a;return u.ctx&&r(u.ctx[f],u.ctx[f]=h)&&(!u.skip_bound&&u.bound[f]&&u.bound[f](h),_&&Rt(t,f)),a}):[],u.update(),_=!0,x(u.before_update),u.fragment=s?s(u.ctx):!1,e.target){if(e.hydrate){ft();const f=xt(e.target);u.fragment&&u.fragment.l(f),f.forEach(bt)}else u.fragment&&u.fragment.c();e.intro&&St(t.$$.fragment),qt(t,e.target,e.anchor,e.customElement),_t(),it()}v(c)}class me{$destroy(){Pt(this,1),this.$destroy=k}$on(e,n){const s=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return s.push(n),()=>{const r=s.indexOf(n);r!==-1&&s.splice(r,1)}}$set(e){this.$$set&&!lt(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{fe as A,Pt as B,ct as C,se as D,k as E,gt as F,Zt as G,Kt as H,x as I,Lt as J,Ht as K,W as L,Tt as M,Bt as N,Ft as O,zt as P,Wt as Q,ie as R,me as S,st as T,P as U,ue as V,te as W,Ot as X,K as Y,xt as a,Qt as b,Ut as c,bt as d,Y as e,Yt as f,It as g,vt as h,he as i,Xt as j,Gt as k,Jt as l,Vt as m,ce as n,oe as o,le as p,St as q,re as r,Dt as s,F as t,ne as u,ee as v,_e as w,de as x,qt as y,ae as z};