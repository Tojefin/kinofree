import{s as j,n as Q,b as X}from"../chunks/scheduler.hW0JTbzp.js";import{S as q,i as z,e as E,k as b,s as N,c as L,a as I,l as k,d as _,f as S,m as Y,n as D,g as W,h as p,p as w,r as J,u as d,y as Z,v,z as x,w as y,t as U,b as G}from"../chunks/index.e_G28YpI.js";import{a as K,g as tt}from"../chunks/entry.x9MpmCS7.js";import{B as F,A as et,H as rt,F as st}from"../chunks/watchPlayer.svelte_svelte_type_style_lang.Qx0ZRggo.js";import{g as M}from"../chunks/getWatchHistory.ob96_d0N.js";import{D as nt,R as at}from"../chunks/resultCard.8JeiJq6m.js";function lt(a){let t,e;return t=new et({props:{left:!0}}),{c(){b(t.$$.fragment)},l(r){k(t.$$.fragment,r)},m(r,s){w(t,r,s),e=!0},p:Q,i(r){e||(d(t.$$.fragment,r),e=!0)},o(r){v(t.$$.fragment,r),e=!1},d(r){y(t,r)}}}function ot(a){let t;return{c(){t=U("История")},l(e){t=G(e,"История")},m(e,r){W(e,t,r)},d(e){e&&_(t)}}}function P(a){let t,e,r,s,g,o;return e=new F({props:{circle:!0,dark:!0,vibro:!0,$$slots:{default:[it]},$$scope:{ctx:a}}}),{c(){t=E("button"),b(e.$$.fragment),r=U(`
				Очистить список «История»`),this.h()},l(f){t=L(f,"BUTTON",{class:!0});var i=I(t);k(e.$$.fragment,i),r=G(i,`
				Очистить список «История»`),i.forEach(_),this.h()},h(){D(t,"class","svelte-l6pfh9")},m(f,i){W(f,t,i),w(e,t,null),p(t,r),s=!0,g||(o=J(t,"click",a[4]),g=!0)},p(f,i){const u={};i&512&&(u.$$scope={dirty:i,ctx:f}),e.$set(u)},i(f){s||(d(e.$$.fragment,f),s=!0)},o(f){v(e.$$.fragment,f),s=!1},d(f){f&&_(t),y(e),g=!1,o()}}}function it(a){let t,e;return t=new nt({}),{c(){b(t.$$.fragment)},l(r){k(t.$$.fragment,r)},m(r,s){w(t,r,s),e=!0},i(r){e||(d(t.$$.fragment,r),e=!0)},o(r){v(t.$$.fragment,r),e=!1},d(r){y(t,r)}}}function ft(a){let t,e,r,s,g,o,f="Профиль",i,u,n,l,$,V,B,O;s=new F({props:{title:"Назад",nav:!0,vibro:!0,dark:!0,circle:!0,$$slots:{default:[lt]},$$scope:{ctx:a}}}),s.$on("click",a[6]),l=new F({props:{toggle:!0,active:a[0]=="history",$$slots:{default:[ot]},$$scope:{ctx:a}}}),l.$on("click",a[7]);let c=a[0]=="history"&&a[2].length&&P(a);return{c(){t=E("section"),e=E("div"),r=E("div"),b(s.$$.fragment),g=N(),o=E("h2"),o.textContent=f,i=N(),u=E("div"),n=E("nav"),b(l.$$.fragment),$=N(),c&&c.c(),this.h()},l(m){t=L(m,"SECTION",{class:!0});var h=I(t);e=L(h,"DIV",{class:!0});var H=I(e);r=L(H,"DIV",{class:!0});var C=I(r);k(s.$$.fragment,C),C.forEach(_),g=S(H),o=L(H,"H2",{class:!0,"data-svelte-h":!0}),Y(o)!=="svelte-12joxbi"&&(o.textContent=f),H.forEach(_),i=S(h),u=L(h,"DIV",{class:!0});var A=I(u);n=L(A,"NAV",{class:!0});var T=I(n);k(l.$$.fragment,T),T.forEach(_),$=S(A),c&&c.l(A),A.forEach(_),h.forEach(_),this.h()},h(){D(r,"class","back svelte-l6pfh9"),D(o,"class","svelte-l6pfh9"),D(e,"class","top svelte-l6pfh9"),D(n,"class","svelte-l6pfh9"),D(u,"class","bottom svelte-l6pfh9"),D(t,"class","svelte-l6pfh9")},m(m,h){W(m,t,h),p(t,e),p(e,r),w(s,r,null),p(e,g),p(e,o),p(t,i),p(t,u),p(u,n),w(l,n,null),a[8](n),p(u,$),c&&c.m(u,null),V=!0,B||(O=J(n,"scroll",a[5]),B=!0)},p(m,[h]){const H={};h&512&&(H.$$scope={dirty:h,ctx:m}),s.$set(H);const C={};h&1&&(C.active=m[0]=="history"),h&512&&(C.$$scope={dirty:h,ctx:m}),l.$set(C),m[0]=="history"&&m[2].length?c?(c.p(m,h),h&5&&d(c,1)):(c=P(m),c.c(),d(c,1),c.m(u,null)):c&&(Z(),v(c,1,1,()=>{c=null}),x())},i(m){V||(d(s.$$.fragment,m),d(l.$$.fragment,m),d(c),V=!0)},o(m){v(s.$$.fragment,m),v(l.$$.fragment,m),v(c),V=!1},d(m){m&&_(t),y(s),y(l),a[8](null),c&&c.d(),B=!1,O()}}}function ct(a,t,e){let{activeList:r="history"}=t,s,g=[];function o($){e(0,r=$)}function f(){localStorage.setItem("watch_history",JSON.stringify([])),tt("")}function i(){let $=s.scrollLeft/(s.scrollWidth-s.clientWidth);$<.01&&e(1,s.style="mask-image: linear-gradient(90deg,transparent 0%,rgba(0, 0, 0, 1) 0%,rgba(0, 0, 0, 1) 90%,transparent 100%)",s),$>.01&&$<.99&&e(1,s.style="mask-image: linear-gradient(90deg,transparent 0%,rgba(0, 0, 0, 1) 10%,rgba(0, 0, 0, 1) 90%,transparent 100%)",s),$>.99&&e(1,s.style="mask-image: linear-gradient(90deg,transparent 0%,rgba(0, 0, 0, 1) 10%,rgba(0, 0, 0, 1) 100%,transparent 100%)",s)}K(()=>{e(2,g=M())});const u=()=>history.back(),n=()=>o("history");function l($){X[$?"unshift":"push"](()=>{s=$,e(1,s)})}return a.$$set=$=>{"activeList"in $&&e(0,r=$.activeList)},[r,s,g,o,f,i,u,n,l]}class ut extends q{constructor(t){super(),z(this,t,ct,ft,j,{activeList:0})}}function $t(a){let t,e,r,s,g,o,f,i,u;return e=new rt({}),s=new ut({props:{activeList:R}}),o=new at({props:{lable:null,list:a[0],canDelete:R=="history",nothing:{title:"История пуста",text:"Здесь будет список фильмов, которые вы смотрели на своём устройстве"}}}),i=new st({}),{c(){t=E("div"),b(e.$$.fragment),r=N(),b(s.$$.fragment),g=N(),b(o.$$.fragment),f=N(),b(i.$$.fragment),this.h()},l(n){t=L(n,"DIV",{class:!0});var l=I(t);k(e.$$.fragment,l),r=S(l),k(s.$$.fragment,l),g=S(l),k(o.$$.fragment,l),f=S(l),k(i.$$.fragment,l),l.forEach(_),this.h()},h(){D(t,"class","page-main svelte-h7c1f0")},m(n,l){W(n,t,l),w(e,t,null),p(t,r),w(s,t,null),p(t,g),w(o,t,null),p(t,f),w(i,t,null),u=!0},p(n,[l]){const $={};l&1&&($.list=n[0]),o.$set($)},i(n){u||(d(e.$$.fragment,n),d(s.$$.fragment,n),d(o.$$.fragment,n),d(i.$$.fragment,n),u=!0)},o(n){v(e.$$.fragment,n),v(s.$$.fragment,n),v(o.$$.fragment,n),v(i.$$.fragment,n),u=!1},d(n){n&&_(t),y(e),y(s),y(o),y(i)}}}let R="history";function mt(a,t,e){let r;return K(()=>{e(0,r=M())}),[r]}class bt extends q{constructor(t){super(),z(this,t,mt,$t,j,{})}}export{bt as component};
