import{s as A,a as se,c as re,b as H,d as g,f as p,i as T,g as k,n as N,E as G,a2 as Y,j as S,k as L,x as D,q as V,r as M,z as Z,l as F,m as K}from"../chunks/scheduler.YlLT_MhZ.js";import{S as P,i as j,f as ee,c as z,a as E,m as x,t as h,b as v,d as U,g as R,e as X}from"../chunks/index.K3M16RrR.js";import{w as ue}from"../chunks/searchFilm.az4ILZEi.js";import{g as ce,a as fe}from"../chunks/entry.-tmVF6KW.js";import{U as O}from"../chunks/ui.button._2l3wbZu.js";import{U as $e}from"../chunks/ui.loginProviders.svelte_svelte_type_style_lang.xvtoYX95.js";import{p as q}from"../chunks/index.3YLQEot0.js";import{A as me}from"../chunks/arrow.f9q8NU4h.js";import{U as pe}from"../chunks/ui.films.HfQz2iL4.js";function ge(i){let e,n;return{c(){e=se("svg"),n=se("path"),this.h()},l(t){e=re(t,"svg",{width:!0,height:!0,viewBox:!0,fill:!0,xmlns:!0});var s=H(e);n=re(s,"path",{d:!0,stroke:!0,"stroke-width":!0,"stroke-linecap":!0,"stroke-linejoin":!0}),H(n).forEach(g),s.forEach(g),this.h()},h(){p(n,"d","M12 15L15 12M15 12L12 9M15 12H4M4 7.24802V7.2002C4 6.08009 4 5.51962 4.21799 5.0918C4.40973 4.71547 4.71547 4.40973 5.0918 4.21799C5.51962 4 6.08009 4 7.2002 4H16.8002C17.9203 4 18.4796 4 18.9074 4.21799C19.2837 4.40973 19.5905 4.71547 19.7822 5.0918C20 5.5192 20 6.07899 20 7.19691V16.8036C20 17.9215 20 18.4805 19.7822 18.9079C19.5905 19.2842 19.2837 19.5905 18.9074 19.7822C18.48 20 17.921 20 16.8031 20H7.19691C6.07899 20 5.5192 20 5.0918 19.7822C4.71547 19.5905 4.40973 19.2839 4.21799 18.9076C4 18.4798 4 17.9201 4 16.8V16.75"),p(n,"stroke","white"),p(n,"stroke-width","2"),p(n,"stroke-linecap","round"),p(n,"stroke-linejoin","round"),p(e,"width","24"),p(e,"height","24"),p(e,"viewBox","0 0 24 24"),p(e,"fill","none"),p(e,"xmlns","http://www.w3.org/2000/svg")},m(t,s){T(t,e,s),k(e,n)},p:N,i:N,o:N,d(t){t&&g(e)}}}class he extends P{constructor(e){super(),j(this,e,null,ge,A,{})}}function de(i){let e,n="Вход в Kinofree";return{c(){e=S("h2"),e.textContent=n,this.h()},l(t){e=L(t,"H2",{slot:!0,class:!0,"data-svelte-h":!0}),D(e)!=="svelte-1wppmlr"&&(e.textContent=n),this.h()},h(){p(e,"slot","title"),p(e,"class","svelte-pzapza")},m(t,s){T(t,e,s)},p:N,d(t){t&&g(e)}}}function _e(i){let e,n,t="Войдите через удобный вам сервис",s,r,o,l='<img src="/icons/google.svg" alt="google"/>',u,f;return{c(){e=S("section"),n=S("span"),n.textContent=t,s=V(),r=S("ul"),o=S("button"),o.innerHTML=l,this.h()},l(c){e=L(c,"SECTION",{slot:!0,class:!0});var a=H(e);n=L(a,"SPAN",{"data-svelte-h":!0}),D(n)!=="svelte-11qkcq2"&&(n.textContent=t),s=M(a),r=L(a,"UL",{});var $=H(r);o=L($,"BUTTON",{class:!0,"data-svelte-h":!0}),D(o)!=="svelte-13j3565"&&(o.innerHTML=l),$.forEach(g),a.forEach(g),this.h()},h(){p(o,"class","svelte-pzapza"),p(e,"slot","content"),p(e,"class","svelte-pzapza")},m(c,a){T(c,e,a),k(e,n),k(e,s),k(e,r),k(r,o),u||(f=Z(o,"click",i[1]),u=!0)},p:N,d(c){c&&g(e),u=!1,f()}}}function ve(i){let e,n,t;function s(o){i[2](o)}let r={$$slots:{content:[_e],title:[de]},$$scope:{ctx:i}};return i[0]!==void 0&&(r.isShow=i[0]),e=new $e({props:r}),G.push(()=>ee(e,"isShow",s)),{c(){z(e.$$.fragment)},l(o){E(e.$$.fragment,o)},m(o,l){x(e,o,l),t=!0},p(o,[l]){const u={};l&16&&(u.$$scope={dirty:l,ctx:o}),!n&&l&1&&(n=!0,u.isShow=o[0],Y(()=>n=!1)),e.$set(u)},i(o){t||(h(e.$$.fragment,o),t=!0)},o(o){v(e.$$.fragment,o),t=!1},d(o){U(e,o)}}}function oe(i,e,n,t,s,r,o){try{var l=i[r](o),u=l.value}catch(f){return void n(f)}l.done?e(u):Promise.resolve(u).then(t,s)}function be(i){return function(){var e=this,n=arguments;return new Promise(function(t,s){var r=i.apply(e,n);function o(u){oe(r,t,s,o,l,"next",u)}function l(u){oe(r,t,s,o,l,"throw",u)}o(void 0)})}}function we(i,e,n){let{isShow:t}=e;function s(){return r.apply(this,arguments)}function r(){return r=be(function*(){yield q.collection("users").authWithOAuth2({provider:"google"}),ce("")}),r.apply(this,arguments)}function o(l){t=l,n(0,t)}return i.$$set=l=>{"isShow"in l&&n(0,t=l.isShow)},[t,s,o]}class ke extends P{constructor(e){super(),j(this,e,we,ve,A,{isShow:0})}}function Ce(i){let e,n='<p class="svelte-zpnp51">Войти в аккаунт</p> <span class="svelte-zpnp51">Синхронизация списков на разных устройствах</span>',t,s,r,o,l,u;function f(a){i[2](a)}let c={};return i[0]!==void 0&&(c.isShow=i[0]),s=new ke({props:c}),G.push(()=>ee(s,"isShow",f)),{c(){e=S("button"),e.innerHTML=n,t=V(),z(s.$$.fragment),this.h()},l(a){e=L(a,"BUTTON",{class:!0,"data-svelte-h":!0}),D(e)!=="svelte-cli9t6"&&(e.innerHTML=n),t=M(a),E(s.$$.fragment,a),this.h()},h(){p(e,"class","login svelte-zpnp51")},m(a,$){T(a,e,$),T(a,t,$),x(s,a,$),o=!0,l||(u=Z(e,"click",i[1]),l=!0)},p(a,[$]){const m={};!r&&$&1&&(r=!0,m.isShow=a[0],Y(()=>r=!1)),s.$set(m)},i(a){o||(h(s.$$.fragment,a),o=!0)},o(a){v(s.$$.fragment,a),o=!1},d(a){a&&(g(e),g(t)),U(s,a),l=!1,u()}}}function Se(i,e,n){var t=!1;const s=()=>n(0,t=!0);function r(o){t=o,n(0,t)}return[t,s,r]}class Le extends P{constructor(e){super(),j(this,e,Se,Ce,A,{})}}function ze(i){let e,n;return e=new he({}),{c(){z(e.$$.fragment)},l(t){E(e.$$.fragment,t)},m(t,s){x(e,t,s),n=!0},i(t){n||(h(e.$$.fragment,t),n=!0)},o(t){v(e.$$.fragment,t),n=!1},d(t){U(e,t)}}}function Ee(i){let e,n;return e=new O({props:{dark:!0,circle:!0,$$slots:{default:[ze]},$$scope:{ctx:i}}}),e.$on("click",i[0]),{c(){z(e.$$.fragment)},l(t){E(e.$$.fragment,t)},m(t,s){x(e,t,s),n=!0},p(t,[s]){const r={};s&2&&(r.$$scope={dirty:s,ctx:t}),e.$set(r)},i(t){n||(h(e.$$.fragment,t),n=!0)},o(t){v(e.$$.fragment,t),n=!1},d(t){U(e,t)}}}function xe(i){function e(){q.authStore.clear(),ce("")}return[e]}class Ue extends P{constructor(e){super(),j(this,e,xe,Ee,A,{})}}function ie(i){let e,n;return e=new Le({}),{c(){z(e.$$.fragment)},l(t){E(e.$$.fragment,t)},m(t,s){x(e,t,s),n=!0},i(t){n||(h(e.$$.fragment,t),n=!0)},o(t){v(e.$$.fragment,t),n=!1},d(t){U(e,t)}}}function He(i){let e,n;return e=new me({props:{left:!0}}),{c(){z(e.$$.fragment)},l(t){E(e.$$.fragment,t)},m(t,s){x(e,t,s),n=!0},p:N,i(t){n||(h(e.$$.fragment,t),n=!0)},o(t){v(e.$$.fragment,t),n=!1},d(t){U(e,t)}}}function le(i){var u,f;let e,n,t=((f=(u=q.authStore.model)==null?void 0:u.email)==null?void 0:f.split("@")[0])+"",s,r,o,l;return o=new Ue({}),{c(){e=S("div"),n=S("p"),s=F(t),r=V(),z(o.$$.fragment),this.h()},l(c){e=L(c,"DIV",{class:!0});var a=H(e);n=L(a,"P",{class:!0});var $=H(n);s=K($,t),$.forEach(g),r=M(a),E(o.$$.fragment,a),a.forEach(g),this.h()},h(){p(n,"class","svelte-13k0ezt"),p(e,"class","user svelte-13k0ezt")},m(c,a){T(c,e,a),k(e,n),k(n,s),k(e,r),x(o,e,null),l=!0},i(c){l||(h(o.$$.fragment,c),l=!0)},o(c){v(o.$$.fragment,c),l=!1},d(c){c&&g(e),U(o)}}}function Te(i){let e;return{c(){e=F("История")},l(n){e=K(n,"История")},m(n,t){T(n,e,t)},d(n){n&&g(e)}}}function ae(i){let e,n,t,s;return e=new O({props:{toggle:!0,active:i[0]=="view",$$slots:{default:[Ve]},$$scope:{ctx:i}}}),e.$on("click",i[7]),t=new O({props:{toggle:!0,active:i[0]=="planned",$$slots:{default:[Me]},$$scope:{ctx:i}}}),t.$on("click",i[8]),{c(){z(e.$$.fragment),n=V(),z(t.$$.fragment)},l(r){E(e.$$.fragment,r),n=M(r),E(t.$$.fragment,r)},m(r,o){x(e,r,o),T(r,n,o),x(t,r,o),s=!0},p(r,o){const l={};o&1&&(l.active=r[0]=="view"),o&4096&&(l.$$scope={dirty:o,ctx:r}),e.$set(l);const u={};o&1&&(u.active=r[0]=="planned"),o&4096&&(u.$$scope={dirty:o,ctx:r}),t.$set(u)},i(r){s||(h(e.$$.fragment,r),h(t.$$.fragment,r),s=!0)},o(r){v(e.$$.fragment,r),v(t.$$.fragment,r),s=!1},d(r){r&&g(n),U(e,r),U(t,r)}}}function Ve(i){let e;return{c(){e=F("Смотрю")},l(n){e=K(n,"Смотрю")},m(n,t){T(n,e,t)},d(n){n&&g(e)}}}function Me(i){let e;return{c(){e=F("Буду смотреть")},l(n){e=K(n,"Буду смотреть")},m(n,t){T(n,e,t)},d(n){n&&g(e)}}}function Ie(i){let e,n,t,s,r,o,l,u="Профиль",f,c,a,$,m,J,y,Q,te,b=!i[2]&&ie();r=new O({props:{title:"Назад",nav:!0,vibro:!0,dark:!0,circle:!0,$$slots:{default:[He]},$$scope:{ctx:i}}}),r.$on("click",i[5]);let w=i[2]&&le();m=new O({props:{toggle:!0,active:i[0]=="history",$$slots:{default:[Te]},$$scope:{ctx:i}}}),m.$on("click",i[6]);let d=i[2]&&ae(i);return{c(){e=S("section"),b&&b.c(),n=V(),t=S("div"),s=S("div"),z(r.$$.fragment),o=V(),l=S("h2"),l.textContent=u,f=V(),w&&w.c(),c=V(),a=S("div"),$=S("nav"),z(m.$$.fragment),J=V(),d&&d.c(),this.h()},l(_){e=L(_,"SECTION",{class:!0});var C=H(e);b&&b.l(C),n=M(C),t=L(C,"DIV",{class:!0});var I=H(t);s=L(I,"DIV",{class:!0});var B=H(s);E(r.$$.fragment,B),B.forEach(g),o=M(I),l=L(I,"H2",{class:!0,"data-svelte-h":!0}),D(l)!=="svelte-12joxbi"&&(l.textContent=u),f=M(I),w&&w.l(I),I.forEach(g),c=M(C),a=L(C,"DIV",{class:!0});var ne=H(a);$=L(ne,"NAV",{class:!0});var W=H($);E(m.$$.fragment,W),J=M(W),d&&d.l(W),W.forEach(g),ne.forEach(g),C.forEach(g),this.h()},h(){p(s,"class","back svelte-13k0ezt"),p(l,"class","svelte-13k0ezt"),p(t,"class","top svelte-13k0ezt"),p($,"class","svelte-13k0ezt"),p(a,"class","bottom svelte-13k0ezt"),p(e,"class","svelte-13k0ezt")},m(_,C){T(_,e,C),b&&b.m(e,null),k(e,n),k(e,t),k(t,s),x(r,s,null),k(t,o),k(t,l),k(t,f),w&&w.m(t,null),k(e,c),k(e,a),k(a,$),x(m,$,null),k($,J),d&&d.m($,null),i[9]($),y=!0,Q||(te=Z($,"scroll",i[4]),Q=!0)},p(_,[C]){_[2]?b&&(R(),v(b,1,1,()=>{b=null}),X()):b?C&4&&h(b,1):(b=ie(),b.c(),h(b,1),b.m(e,n));const I={};C&4096&&(I.$$scope={dirty:C,ctx:_}),r.$set(I),_[2]?w?C&4&&h(w,1):(w=le(),w.c(),h(w,1),w.m(t,null)):w&&(R(),v(w,1,1,()=>{w=null}),X());const B={};C&1&&(B.active=_[0]=="history"),C&4096&&(B.$$scope={dirty:C,ctx:_}),m.$set(B),_[2]?d?(d.p(_,C),C&4&&h(d,1)):(d=ae(_),d.c(),h(d,1),d.m($,null)):d&&(R(),v(d,1,1,()=>{d=null}),X())},i(_){y||(h(b),h(r.$$.fragment,_),h(w),h(m.$$.fragment,_),h(d),y=!0)},o(_){v(b),v(r.$$.fragment,_),v(w),v(m.$$.fragment,_),v(d),y=!1},d(_){_&&g(e),b&&b.d(),U(r),w&&w.d(),U(m),d&&d.d(),i[9](null),Q=!1,te()}}}function Ne(i,e,n){let{activeList:t="history"}=e;var s,r=q.authStore.isValid;function o(m){n(0,t=m)}function l(){var m=s.scrollLeft/(s.scrollWidth-s.clientWidth);m<.01&&n(1,s.style="mask-image: linear-gradient(90deg,transparent 0%,rgba(0, 0, 0, 1) 0%,rgba(0, 0, 0, 1) 90%,transparent 100%)",s),m>.01&&m<.99&&n(1,s.style="mask-image: linear-gradient(90deg,transparent 0%,rgba(0, 0, 0, 1) 10%,rgba(0, 0, 0, 1) 90%,transparent 100%)",s),m>.99&&n(1,s.style="mask-image: linear-gradient(90deg,transparent 0%,rgba(0, 0, 0, 1) 10%,rgba(0, 0, 0, 1) 100%,transparent 100%)",s)}fe(()=>{ue.get(),n(2,r=q.authStore.isValid)});const u=()=>history.back(),f=()=>o("history"),c=()=>o("view"),a=()=>o("planned");function $(m){G[m?"unshift":"push"](()=>{s=m,n(1,s)})}return i.$$set=m=>{"activeList"in m&&n(0,t=m.activeList)},[t,s,r,o,l,u,f,c,a,$]}class Ae extends P{constructor(e){super(),j(this,e,Ne,Ie,A,{activeList:0})}}function Pe(i){let e,n,t,s,r,o;function l(f){i[1](f)}let u={};return i[0]!==void 0&&(u.activeList=i[0]),n=new Ae({props:u}),G.push(()=>ee(n,"activeList",l)),r=new pe({props:{type:i[0]}}),{c(){e=S("div"),z(n.$$.fragment),s=V(),z(r.$$.fragment),this.h()},l(f){e=L(f,"DIV",{class:!0});var c=H(e);E(n.$$.fragment,c),s=M(c),E(r.$$.fragment,c),c.forEach(g),this.h()},h(){p(e,"class","page-profile svelte-5o4glg")},m(f,c){T(f,e,c),x(n,e,null),k(e,s),x(r,e,null),o=!0},p(f,[c]){const a={};!t&&c&1&&(t=!0,a.activeList=f[0],Y(()=>t=!1)),n.$set(a);const $={};c&1&&($.type=f[0]),r.$set($)},i(f){o||(h(n.$$.fragment,f),h(r.$$.fragment,f),o=!0)},o(f){v(n.$$.fragment,f),v(r.$$.fragment,f),o=!1},d(f){f&&g(e),U(n),U(r)}}}function je(i,e,n){var t;function s(r){t=r,n(0,t)}return[t,s]}class Be extends P{constructor(e){super(),j(this,e,je,Pe,A,{})}}function De(i){let e,n;return e=new Be({}),{c(){z(e.$$.fragment)},l(t){E(e.$$.fragment,t)},m(t,s){x(e,t,s),n=!0},p:N,i(t){n||(h(e.$$.fragment,t),n=!0)},o(t){v(e.$$.fragment,t),n=!1},d(t){U(e,t)}}}class Re extends P{constructor(e){super(),j(this,e,null,De,A,{})}}export{Re as component};
