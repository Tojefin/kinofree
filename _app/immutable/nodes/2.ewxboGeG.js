import{s as G,f as U,o as te,r as ne,n as se}from"../chunks/scheduler.hW0JTbzp.js";import{S as J,i as L,e as _,s as T,k as D,c as p,a as E,f as x,m as F,l as j,d as h,n as c,o as W,g as z,h as u,p as O,u as S,v as I,w as N,t as R,b as B,D as K,z as le,A as oe,r as X,j as re}from"../chunks/index.vbNZMW90.js";import{B as Q,A as ae,C as ce,v as ie,H as fe,F as ue}from"../chunks/watchPlayer.svelte_svelte_type_style_lang.qTQ3mXxd.js";import{g as $e}from"../chunks/entry.aHwLH3ax.js";import{g as me}from"../chunks/getWatchHistory.ob96_d0N.js";import{S as ge}from"../chunks/searchBar.7nGO9Bfa.js";function de(i){let e,s,t;return s=new ae({}),{c(){e=R(`Открыть TG
					`),D(s.$$.fragment)},l(r){e=B(r,`Открыть TG
					`),j(s.$$.fragment,r)},m(r,a){z(r,e,a),O(s,r,a),t=!0},i(r){t||(S(s.$$.fragment,r),t=!0)},o(r){I(s.$$.fragment,r),t=!1},d(r){r&&h(e),N(s,r)}}}function he(i){let e,s;return e=new ce({}),{c(){D(e.$$.fragment)},l(t){j(e.$$.fragment,t)},m(t,r){O(e,t,r),s=!0},i(t){s||(S(e.$$.fragment,t),s=!0)},o(t){I(e.$$.fragment,t),s=!1},d(t){N(e,t)}}}function ve(i){let e,s,t,r,a,n,v="Мы в Telegram",m,d,w=`Следите за этим и другими проектами в нашем телеграм канале. Ход разработки, голосования за
			итоговые решения и прочее будут выходить там.`,q,o,f,k,H,V,g,A;return k=new Q({props:{$$slots:{default:[de]},$$scope:{ctx:i}}}),g=new Q({props:{circle:!0,$$slots:{default:[he]},$$scope:{ctx:i}}}),g.$on("click",i[1]),{c(){e=_("section"),s=_("img"),r=T(),a=_("article"),n=_("h2"),n.textContent=v,m=T(),d=_("p"),d.textContent=w,q=T(),o=_("div"),f=_("a"),D(k.$$.fragment),H=T(),V=_("div"),D(g.$$.fragment),this.h()},l(l){e=p(l,"SECTION",{class:!0});var $=E(e);s=p($,"IMG",{src:!0,alt:!0,height:!0,width:!0,draggable:!0,class:!0}),r=x($),a=p($,"ARTICLE",{class:!0});var b=E(a);n=p(b,"H2",{class:!0,"data-svelte-h":!0}),F(n)!=="svelte-19xvxrs"&&(n.textContent=v),m=x(b),d=p(b,"P",{class:!0,"data-svelte-h":!0}),F(d)!=="svelte-xrxz4c"&&(d.textContent=w),q=x(b),o=p(b,"DIV",{class:!0});var C=E(o);f=p(C,"A",{href:!0,target:!0});var P=E(f);j(k.$$.fragment,P),P.forEach(h),C.forEach(h),b.forEach(h),H=x($),V=p($,"DIV",{class:!0});var y=E(V);j(g.$$.fragment,y),y.forEach(h),$.forEach(h),this.h()},h(){U(s.src,t="https://api.qrserver.com/v1/create-qr-code/?size=100x100&color=fce802&bgcolor=1f2227&data=http://tg.skyedge.xyz")||c(s,"src",t),c(s,"alt","QR code"),c(s,"height","100"),c(s,"width","100"),c(s,"draggable","false"),c(s,"class","svelte-12aq54g"),c(n,"class","svelte-12aq54g"),c(d,"class","svelte-12aq54g"),c(f,"href","https://tg.skyedge.xyz/#banner"),c(f,"target","_blank"),c(o,"class","more svelte-12aq54g"),c(a,"class","svelte-12aq54g"),c(V,"class","close svelte-12aq54g"),c(e,"class","svelte-12aq54g"),W(e,"hide",!i[0]||!Y)},m(l,$){z(l,e,$),u(e,s),u(e,r),u(e,a),u(a,n),u(a,m),u(a,d),u(a,q),u(a,o),u(o,f),O(k,f,null),u(e,H),u(e,V),O(g,V,null),A=!0},p(l,[$]){const b={};$&4&&(b.$$scope={dirty:$,ctx:l}),k.$set(b);const C={};$&4&&(C.$$scope={dirty:$,ctx:l}),g.$set(C),(!A||$&1)&&W(e,"hide",!l[0]||!Y)},i(l){A||(S(k.$$.fragment,l),S(g.$$.fragment,l),A=!0)},o(l){I(k.$$.fragment,l),I(g.$$.fragment,l),A=!1},d(l){l&&h(e),N(k),N(g)}}}const Y=!0;let M=2;function _e(i,e,s){let t=!1;const r=()=>{let a=JSON.parse(localStorage.getItem("anonse"));s(0,t=!1),a.show=!1,a.ver=M,localStorage.setItem("anonse",JSON.stringify(a))};return te(()=>{let a=JSON.parse(localStorage.getItem("anonse"));a||(a={}),a.ver!=M&&(s(0,t=!0),a.ver=M,a.show=!0),s(0,t=a.show),localStorage.setItem("anonse",JSON.stringify(a))}),[t,r]}class pe extends J{constructor(e){super(),L(this,e,_e,ve,G,{})}}function Z(i){var A;let e,s,t,r,a,n,v,m=(i[0].nameRu||i[0].nameEn||i[0].nameOriginal)+"",d,w,q,o,f,k,H,V,g=((A=i[0]._kinofree)==null?void 0:A.lastviewed)&&ee(i);return f=new Q({props:{$$slots:{default:[we]},$$scope:{ctx:i}}}),{c(){e=_("section"),s=_("div"),t=_("img"),a=T(),n=_("div"),v=_("h3"),d=R(m),w=T(),g&&g.c(),q=T(),o=_("div"),D(f.$$.fragment),this.h()},l(l){e=p(l,"SECTION",{role:!0,tabindex:!0,class:!0});var $=E(e);s=p($,"DIV",{class:!0});var b=E(s);t=p(b,"IMG",{src:!0,alt:!0,class:!0}),a=x(b),n=p(b,"DIV",{class:!0});var C=E(n);v=p(C,"H3",{class:!0});var P=E(v);d=B(P,m),P.forEach(h),w=x(C),g&&g.l(C),C.forEach(h),b.forEach(h),q=x($),o=p($,"DIV",{class:!0});var y=E(o);j(f.$$.fragment,y),y.forEach(h),$.forEach(h),this.h()},h(){U(t.src,r=i[0].posterUrlPreview)||c(t,"src",r),c(t,"alt","Постер"),c(t,"class","svelte-1jcu2c9"),c(v,"class","svelte-1jcu2c9"),c(n,"class","text svelte-1jcu2c9"),c(s,"class","info svelte-1jcu2c9"),c(o,"class","more svelte-1jcu2c9"),c(e,"role","button"),c(e,"tabindex","-0"),c(e,"class","svelte-1jcu2c9")},m(l,$){z(l,e,$),u(e,s),u(s,t),u(s,a),u(s,n),u(n,v),u(v,d),u(n,w),g&&g.m(n,null),u(e,q),u(e,o),O(f,o,null),k=!0,H||(V=[X(e,"click",i[2]),X(e,"keydown",null)],H=!0)},p(l,$){var C;(!k||$&1&&!U(t.src,r=l[0].posterUrlPreview))&&c(t,"src",r),(!k||$&1)&&m!==(m=(l[0].nameRu||l[0].nameEn||l[0].nameOriginal)+"")&&re(d,m),(C=l[0]._kinofree)!=null&&C.lastviewed?g?g.p(l,$):(g=ee(l),g.c(),g.m(n,null)):g&&(g.d(1),g=null);const b={};$&8&&(b.$$scope={dirty:$,ctx:l}),f.$set(b)},i(l){k||(S(f.$$.fragment,l),k=!0)},o(l){I(f.$$.fragment,l),k=!1},d(l){l&&h(e),g&&g.d(),N(f),H=!1,ne(V)}}}function ee(i){let e,s,t="Последний просмотр",r,a,n=new Date(i[0]._kinofree.lastviewed).toLocaleString("ru",i[1])+"",v;return{c(){e=_("div"),s=_("p"),s.textContent=t,r=T(),a=_("span"),v=R(n),this.h()},l(m){e=p(m,"DIV",{class:!0});var d=E(e);s=p(d,"P",{class:!0,"data-svelte-h":!0}),F(s)!=="svelte-166565y"&&(s.textContent=t),r=x(d),a=p(d,"SPAN",{class:!0});var w=E(a);v=B(w,n),w.forEach(h),d.forEach(h),this.h()},h(){c(s,"class","svelte-1jcu2c9"),c(a,"class","svelte-1jcu2c9"),c(e,"class","time svelte-1jcu2c9")},m(m,d){z(m,e,d),u(e,s),u(e,r),u(e,a),u(a,v)},p(m,d){d&1&&n!==(n=new Date(m[0]._kinofree.lastviewed).toLocaleString("ru",m[1])+"")&&re(v,n)},d(m){m&&h(e)}}}function we(i){let e,s,t;return s=new ae({}),{c(){e=R(`Смотреть дальше\r
				`),D(s.$$.fragment)},l(r){e=B(r,`Смотреть дальше\r
				`),j(s.$$.fragment,r)},m(r,a){z(r,e,a),O(s,r,a),t=!0},i(r){t||(S(s.$$.fragment,r),t=!0)},o(r){I(s.$$.fragment,r),t=!1},d(r){r&&h(e),N(s,r)}}}function be(i){let e,s,t=i[0]&&Z(i);return{c(){t&&t.c(),e=K()},l(r){t&&t.l(r),e=K()},m(r,a){t&&t.m(r,a),z(r,e,a),s=!0},p(r,[a]){r[0]?t?(t.p(r,a),a&1&&S(t,1)):(t=Z(r),t.c(),S(t,1),t.m(e.parentNode,e)):t&&(le(),I(t,1,1,()=>{t=null}),oe())},i(r){s||(S(t),s=!0)},o(r){I(t),s=!1},d(r){r&&h(e),t&&t.d(r)}}}function ke(i,e,s){let t;const r={month:"long",day:"numeric",timezone:"UTC"};function a(){ie(),$e("/watch?id="+(t==null?void 0:t.kinopoiskId))}return te(()=>{s(0,t=me()[0])}),[t,r,a]}class Ee extends J{constructor(e){super(),L(this,e,ke,be,G,{})}}function Se(i){let e,s,t,r;return t=new ge({}),{c(){e=_("section"),s=_("div"),D(t.$$.fragment),this.h()},l(a){e=p(a,"SECTION",{class:!0});var n=E(e);s=p(n,"DIV",{class:!0});var v=E(s);j(t.$$.fragment,v),v.forEach(h),n.forEach(h),this.h()},h(){c(s,"class","box svelte-s1rl3t"),c(e,"class","svelte-s1rl3t")},m(a,n){z(a,e,n),u(e,s),O(t,s,null),r=!0},p:se,i(a){r||(S(t.$$.fragment,a),r=!0)},o(a){I(t.$$.fragment,a),r=!1},d(a){a&&h(e),N(t)}}}class Ie extends J{constructor(e){super(),L(this,e,null,Se,G,{})}}function Ce(i){let e,s,t,r,a,n,v,m,d,w,q;return s=new fe({}),r=new pe({}),n=new Ie({}),m=new Ee({}),w=new ue({}),{c(){e=_("div"),D(s.$$.fragment),t=T(),D(r.$$.fragment),a=T(),D(n.$$.fragment),v=T(),D(m.$$.fragment),d=T(),D(w.$$.fragment),this.h()},l(o){e=p(o,"DIV",{class:!0});var f=E(e);j(s.$$.fragment,f),t=x(f),j(r.$$.fragment,f),a=x(f),j(n.$$.fragment,f),v=x(f),j(m.$$.fragment,f),d=x(f),j(w.$$.fragment,f),f.forEach(h),this.h()},h(){c(e,"class","page-main svelte-h7c1f0")},m(o,f){z(o,e,f),O(s,e,null),u(e,t),O(r,e,null),u(e,a),O(n,e,null),u(e,v),O(m,e,null),u(e,d),O(w,e,null),q=!0},p:se,i(o){q||(S(s.$$.fragment,o),S(r.$$.fragment,o),S(n.$$.fragment,o),S(m.$$.fragment,o),S(w.$$.fragment,o),q=!0)},o(o){I(s.$$.fragment,o),I(r.$$.fragment,o),I(n.$$.fragment,o),I(m.$$.fragment,o),I(w.$$.fragment,o),q=!1},d(o){o&&h(e),N(s),N(r),N(n),N(m),N(w)}}}class xe extends J{constructor(e){super(),L(this,e,null,Ce,G,{})}}export{xe as component};