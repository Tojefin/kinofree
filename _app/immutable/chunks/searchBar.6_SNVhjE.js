import{s as Z,r as x,c as ee,b as te}from"./scheduler.hW0JTbzp.js";import{S as se,i as ne,e as k,k as O,s as A,c as y,a as j,l as L,d as g,f as V,m as le,n as d,o as I,g as z,h as m,p as P,q as K,r as C,u as R,v as $,w as H,x as re,t as ae,b as oe,y as ie,j as ue}from"./index.vbNZMW90.js";import{o as fe,L as ce,e as M}from"./_options.ppq8KazM.js";import{a as pe,g as Q}from"./entry.KiOphwu2.js";import{C as he,A as me,v as _e}from"./watchPlayer.svelte_svelte_type_style_lang.bOZPtuAV.js";import{p as de}from"./stores.BiB3JgV9.js";let ge="https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword";async function we(n,l=1){return n?await(await fetch(`${ge}?keyword=${n}&page=${l}`,fe)).json():[]}function W(n,l,e){const r=n.slice();return r[18]=l[e].title,r[19]=l[e].id,r}function X(n){let l,e=M(n[0].list),r=[];for(let a=0;a<e.length;a+=1)r[a]=Y(W(n,e,a));return{c(){l=k("ul");for(let a=0;a<r.length;a+=1)r[a].c();this.h()},l(a){l=y(a,"UL",{class:!0});var s=j(l);for(let t=0;t<r.length;t+=1)r[t].l(s);s.forEach(g),this.h()},h(){d(l,"class","suggest svelte-1q1wj01")},m(a,s){z(a,l,s);for(let t=0;t<r.length;t+=1)r[t]&&r[t].m(l,null)},p(a,s){if(s&9){e=M(a[0].list);let t;for(t=0;t<e.length;t+=1){const _=W(a,e,t);r[t]?r[t].p(_,s):(r[t]=Y(_),r[t].c(),r[t].m(l,null))}for(;t<r.length;t+=1)r[t].d(1);r.length=e.length}},d(a){a&&g(l),re(r,a)}}}function Y(n){let l,e=n[18]+"",r,a,s,t;function _(){return n[13](n[18])}return{c(){l=k("button"),r=ae(e),a=A(),this.h()},l(o){l=y(o,"BUTTON",{class:!0});var u=j(l);r=oe(u,e),a=V(u),u.forEach(g),this.h()},h(){d(l,"class","svelte-1q1wj01")},m(o,u){z(o,l,u),m(l,r),m(l,a),s||(t=C(l,"pointerdown",ie(_)),s=!0)},p(o,u){n=o,u&1&&e!==(e=n[18]+"")&&ue(r,e)},d(o){o&&g(l),s=!1,t()}}}function be(n){let l,e,r,a,s,t,_,o,u,B,E=n[2]&&n[0].list.length&&n[3].trim().length>2,T,h,w,N="Найти",D,b,U,v,S,f;a=new ce({}),u=new he({props:{small:!0}});let c=E&&X(n);return b=new me({props:{circle:!0}}),{c(){l=k("div"),e=k("div"),r=k("div"),O(a.$$.fragment),s=A(),t=k("input"),_=A(),o=k("button"),O(u.$$.fragment),B=A(),c&&c.c(),T=A(),h=k("button"),w=k("p"),w.textContent=N,D=A(),O(b.$$.fragment),this.h()},l(i){l=y(i,"DIV",{class:!0});var p=j(l);e=y(p,"DIV",{class:!0});var q=j(e);r=y(q,"DIV",{class:!0});var G=j(r);L(a.$$.fragment,G),G.forEach(g),s=V(q),t=y(q,"INPUT",{type:!0,placeholder:!0,class:!0}),_=V(q),o=y(q,"BUTTON",{class:!0});var J=j(o);L(u.$$.fragment,J),J.forEach(g),B=V(q),c&&c.l(q),q.forEach(g),T=V(p),h=y(p,"BUTTON",{class:!0});var F=j(h);w=y(F,"P",{class:!0,"data-svelte-h":!0}),le(w)!=="svelte-173t95q"&&(w.textContent=N),D=V(F),L(b.$$.fragment,F),F.forEach(g),p.forEach(g),this.h()},h(){d(r,"class","loupe svelte-1q1wj01"),d(t,"type","text"),d(t,"placeholder","Фильм или сериал"),d(t,"class","svelte-1q1wj01"),d(o,"class","clear svelte-1q1wj01"),I(o,"canClear",n[3]),d(e,"class","input svelte-1q1wj01"),I(e,"inputFocus",n[2]),I(e,"inputValue",n[3].length&&!n[2]),d(w,"class","svelte-1q1wj01"),d(h,"class","search svelte-1q1wj01"),h.disabled=U=!(n[3].trim().length>0),d(l,"class","searchBar svelte-1q1wj01")},m(i,p){z(i,l,p),m(l,e),m(e,r),P(a,r,null),m(e,s),m(e,t),K(t,n[3]),n[12](t),m(e,_),m(e,o),P(u,o,null),m(e,B),c&&c.m(e,null),m(l,T),m(l,h),m(h,w),m(h,D),P(b,h,null),v=!0,S||(f=[C(t,"focus",n[9]),C(t,"blur",n[10]),C(t,"keydown",n[8]),C(t,"keyup",n[7]),C(t,"input",n[11]),C(o,"click",n[5]),C(h,"pointerdown",n[14])],S=!0)},p(i,[p]){p&8&&t.value!==i[3]&&K(t,i[3]),(!v||p&8)&&I(o,"canClear",i[3]),p&13&&(E=i[2]&&i[0].list.length&&i[3].trim().length>2),E?c?c.p(i,p):(c=X(i),c.c(),c.m(e,null)):c&&(c.d(1),c=null),(!v||p&4)&&I(e,"inputFocus",i[2]),(!v||p&12)&&I(e,"inputValue",i[3].length&&!i[2]),(!v||p&8&&U!==(U=!(i[3].trim().length>0)))&&(h.disabled=U)},i(i){v||(R(a.$$.fragment,i),R(u.$$.fragment,i),R(b.$$.fragment,i),v=!0)},o(i){$(a.$$.fragment,i),$(u.$$.fragment,i),$(b.$$.fragment,i),v=!1},d(i){i&&g(l),H(a),n[12](null),H(u),c&&c.d(),H(b),S=!1,x(f)}}}function ve(n,l,e){let r;ee(n,de,f=>e(17,r=f));let a,s={select:-1,list:[]},t,_=!1,o="";function u(f){e(2,_=f)}function B(){e(3,o=""),t.focus()}function E(){o.trim()&&Q("./search?key="+encodeURIComponent(o))}let T=null;function h(f){f.key=="ArrowUp"||f.key=="ArrowDown"||o.trim().length<3||(T&&clearTimeout(T),e(0,s.select=-1,s),T=setTimeout(async()=>{let{films:c}=await we(o);c?e(0,s.list=c.map(i=>({title:`${i.nameRu||i.nameEn} ${i.year||""}`,id:i.filmId})).slice(0,5),s):e(0,s.list=[],s),e(0,s.list[-1]={title:o},s)},400))}function w(f){f.key=="Enter"&&E(),f.key=="ArrowUp"&&s.list.length>0&&s.select>-1&&(e(0,s.select--,s),e(3,o=s.list[s.select].title)),f.key=="ArrowDown"&&s.list.length>0&&s.select+1<s.list.length&&(e(0,s.select++,s),e(3,o=s.list[s.select].title))}pe(()=>{a=Object.fromEntries(r.url.searchParams),a.key&&e(3,o=a.key)});const N=()=>u(!0),D=()=>u(!1);function b(){o=this.value,e(3,o)}function U(f){te[f?"unshift":"push"](()=>{t=f,e(1,t)})}return[s,t,_,o,u,B,E,h,w,N,D,b,U,f=>{e(3,o=f),Q(`/search?key=${f}`)},()=>{_e(),E()}]}class je extends se{constructor(l){super(),ne(this,l,ve,be,Z,{})}}export{je as S,we as s};
