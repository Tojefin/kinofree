import{s as le,n as Y,o as _e,b as de,f as fe,c as he}from"../chunks/scheduler.hW0JTbzp.js";import{S as re,i as ne,e as k,k as F,s as P,t as J,c as b,a as w,l as H,d as m,f as j,b as M,n as g,g as A,h as p,p as R,j as x,u as y,v as S,w as B,z as me,A as pe,m as $e,o as ae}from"../chunks/index.vbNZMW90.js";import{B as U,A as ge,H as ve,F as ke}from"../chunks/watchPlayer.svelte_svelte_type_style_lang.qTQ3mXxd.js";import{R as be,g as we}from"../chunks/resultCard.cMsrRMUI.js";import{o as ce}from"../chunks/_options.ppq8KazM.js";import{a as Ie}from"../chunks/entry.aHwLH3ax.js";import{p as Ee}from"../chunks/stores.iecUiYn6.js";function ye(s){let e=JSON.parse(localStorage.getItem("watch_history"));e||(e=[]);let t=e.filter(l=>l.kinopoiskId==s.kinopoiskId)[0];if(t){let l=e.indexOf(t);e.splice(l,1)}let a=Date.now();s={...s,_kinofree:{lastviewed:a}},e.unshift(s),e.length>24&&e.pop(),localStorage.setItem("watch_history",JSON.stringify(e))}let qe="https://kinopoiskapiunofficial.tech/api/v2.2/films",Se="https://kinopoiskapiunofficial.tech//api/v2.1/films";async function Ae(s){if(s){let e=await fetch(`${qe}/${s}/similars`,ce);e=await e.json();let t=await fetch(`${Se}/${s}/sequels_and_prequels`,ce);return t=await t.json(),[...t,...e.items]}return[]}function De(s){let e,t;return e=new ge({props:{left:!0}}),{c(){F(e.$$.fragment)},l(a){H(e.$$.fragment,a)},m(a,l){R(e,a,l),t=!0},p:Y,i(a){t||(y(e.$$.fragment,a),t=!0)},o(a){S(e.$$.fragment,a),t=!1},d(a){B(e,a)}}}function Pe(s){let e,t,a,l,o,f,c,$,r;return a=new U({props:{title:"Назад",nav:!0,vibro:!0,dark:!0,circle:!0,$$slots:{default:[De]},$$scope:{ctx:s}}}),a.$on("click",s[2]),{c(){e=k("section"),t=k("div"),F(a.$$.fragment),l=P(),o=k("h2"),f=J(s[0]),c=k("span"),$=J(s[1]),this.h()},l(i){e=b(i,"SECTION",{class:!0});var n=w(e);t=b(n,"DIV",{class:!0});var D=w(t);H(a.$$.fragment,D),D.forEach(m),l=j(n),o=b(n,"H2",{class:!0});var q=w(o);f=M(q,s[0]),c=b(q,"SPAN",{class:!0});var I=w(c);$=M(I,s[1]),I.forEach(m),q.forEach(m),n.forEach(m),this.h()},h(){g(t,"class","back svelte-4j2yli"),g(c,"class","svelte-4j2yli"),g(o,"class","svelte-4j2yli"),g(e,"class","svelte-4j2yli")},m(i,n){A(i,e,n),p(e,t),R(a,t,null),p(e,l),p(e,o),p(o,f),p(o,c),p(c,$),r=!0},p(i,[n]){const D={};n&8&&(D.$$scope={dirty:n,ctx:i}),a.$set(D),(!r||n&1)&&x(f,i[0]),(!r||n&2)&&x($,i[1])},i(i){r||(y(a.$$.fragment,i),r=!0)},o(i){S(a.$$.fragment,i),r=!1},d(i){i&&m(e),B(a)}}}function je(s,e,t){let{title:a=""}=e,{year:l=""}=e;const o=()=>{history.go(-1)};return s.$$set=f=>{"title"in f&&t(0,a=f.title),"year"in f&&t(1,l=f.year)},[a,l,o]}class Ne extends re{constructor(e){super(),ne(this,e,je,Pe,le,{title:0,year:1})}}function Oe(s){let e,t,a,l,o,f,c,$,r,i=(s[0].description||"Описание не найдено")+"",n,D,q,I,d,_="Плееры",v,E,N,z,O,L,C,se,K,X;function ie(u,h){return u[3].score>0?Fe:Ve}let ee=ie(s),V=ee(s);return N=new U({props:{toggle:!0,active:s[2]=="alpha",$$slots:{default:[He]},$$scope:{ctx:s}}}),N.$on("click",s[7]),O=new U({props:{toggle:!0,active:s[2]=="beta",$$slots:{default:[Re]},$$scope:{ctx:s}}}),O.$on("click",s[8]),C=new U({props:{toggle:!0,active:s[2]=="gamma",$$slots:{default:[Be]},$$scope:{ctx:s}}}),C.$on("click",s[9]),K=new U({props:{toggle:!0,active:s[2]=="delta",$$slots:{default:[Je]},$$scope:{ctx:s}}}),K.$on("click",s[10]),{c(){e=k("div"),t=k("iframe"),l=P(),o=k("aside"),f=k("div"),c=k("div"),V.c(),$=P(),r=k("p"),n=J(i),D=P(),q=k("div"),I=k("div"),d=k("h4"),d.textContent=_,v=P(),E=k("div"),F(N.$$.fragment),z=P(),F(O.$$.fragment),L=P(),F(C.$$.fragment),se=P(),F(K.$$.fragment),this.h()},l(u){e=b(u,"DIV",{class:!0});var h=w(e);t=b(h,"IFRAME",{title:!0,sandbox:!0,src:!0,class:!0}),w(t).forEach(m),h.forEach(m),l=j(u),o=b(u,"ASIDE",{class:!0});var W=w(o);f=b(W,"DIV",{class:!0});var G=w(f);c=b(G,"DIV",{});var Z=w(c);V.l(Z),Z.forEach(m),$=j(G),r=b(G,"P",{class:!0});var Q=w(r);n=M(Q,i),Q.forEach(m),G.forEach(m),D=j(W),q=b(W,"DIV",{class:!0});var oe=w(q);I=b(oe,"DIV",{class:!0});var te=w(I);d=b(te,"H4",{class:!0,"data-svelte-h":!0}),$e(d)!=="svelte-1y64ufn"&&(d.textContent=_),v=j(te),E=b(te,"DIV",{class:!0});var T=w(E);H(N.$$.fragment,T),z=j(T),H(O.$$.fragment,T),L=j(T),H(C.$$.fragment,T),se=j(T),H(K.$$.fragment,T),T.forEach(m),te.forEach(m),oe.forEach(m),W.forEach(m),this.h()},h(){g(t,"title","player"),t.allowFullscreen="true",g(t,"sandbox","allow-scripts allow-same-origin"),fe(t.src,a=""+(s[4][s[2]]+s[0].kinopoiskId))||g(t,"src",a),g(t,"class","svelte-f7qkdt"),g(e,"class","player svelte-f7qkdt"),g(r,"class","svelte-f7qkdt"),g(f,"class","info svelte-f7qkdt"),g(d,"class","svelte-f7qkdt"),g(E,"class","svelte-f7qkdt"),g(I,"class","sources svelte-f7qkdt"),g(q,"class","actions svelte-f7qkdt"),g(o,"class","svelte-f7qkdt")},m(u,h){A(u,e,h),p(e,t),s[6](t),A(u,l,h),A(u,o,h),p(o,f),p(f,c),V.m(c,null),p(f,$),p(f,r),p(r,n),p(o,D),p(o,q),p(q,I),p(I,d),p(I,v),p(I,E),R(N,E,null),p(E,z),R(O,E,null),p(E,L),R(C,E,null),p(E,se),R(K,E,null),X=!0},p(u,h){(!X||h&5&&!fe(t.src,a=""+(u[4][u[2]]+u[0].kinopoiskId)))&&g(t,"src",a),ee===(ee=ie(u))&&V?V.p(u,h):(V.d(1),V=ee(u),V&&(V.c(),V.m(c,null))),(!X||h&1)&&i!==(i=(u[0].description||"Описание не найдено")+"")&&x(n,i);const W={};h&4&&(W.active=u[2]=="alpha"),h&4096&&(W.$$scope={dirty:h,ctx:u}),N.$set(W);const G={};h&4&&(G.active=u[2]=="beta"),h&4096&&(G.$$scope={dirty:h,ctx:u}),O.$set(G);const Z={};h&4&&(Z.active=u[2]=="gamma"),h&4096&&(Z.$$scope={dirty:h,ctx:u}),C.$set(Z);const Q={};h&4&&(Q.active=u[2]=="delta"),h&4096&&(Q.$$scope={dirty:h,ctx:u}),K.$set(Q)},i(u){X||(y(N.$$.fragment,u),y(O.$$.fragment,u),y(C.$$.fragment,u),y(K.$$.fragment,u),X=!0)},o(u){S(N.$$.fragment,u),S(O.$$.fragment,u),S(C.$$.fragment,u),S(K.$$.fragment,u),X=!1},d(u){u&&(m(e),m(l),m(o)),s[6](null),V.d(),B(N),B(O),B(C),B(K)}}}function Ce(s){let e;return{c(){e=J("Загрузка ...")},l(t){e=M(t,"Загрузка ...")},m(t,a){A(t,e,a)},p:Y,i:Y,o:Y,d(t){t&&m(e)}}}function Ve(s){let e,t="Рейтинг не найден";return{c(){e=k("span"),e.textContent=t,this.h()},l(a){e=b(a,"SPAN",{class:!0,"data-svelte-h":!0}),$e(e)!=="svelte-1r1ha9q"&&(e.textContent=t),this.h()},h(){g(e,"class","svelte-f7qkdt")},m(a,l){A(a,e,l)},p:Y,d(a){a&&m(e)}}}function Fe(s){let e,t=s[3].platform+"",a,l,o,f,c=s[3].score+"",$;return{c(){e=k("span"),a=J(t),l=J(":"),o=P(),f=k("mark"),$=J(c),this.h()},l(r){e=b(r,"SPAN",{class:!0});var i=w(e);a=M(i,t),l=M(i,":"),i.forEach(m),o=j(r),f=b(r,"MARK",{class:!0});var n=w(f);$=M(n,c),n.forEach(m),this.h()},h(){g(e,"class","svelte-f7qkdt"),g(f,"class","svelte-f7qkdt"),ae(f,"okey",s[3].score>3.9&&s[3].score<7),ae(f,"bad",s[3].score<4)},m(r,i){A(r,e,i),p(e,a),p(e,l),A(r,o,i),A(r,f,i),p(f,$)},p(r,i){i&8&&t!==(t=r[3].platform+"")&&x(a,t),i&8&&c!==(c=r[3].score+"")&&x($,c),i&8&&ae(f,"okey",r[3].score>3.9&&r[3].score<7),i&8&&ae(f,"bad",r[3].score<4)},d(r){r&&(m(e),m(o),m(f))}}}function He(s){let e;return{c(){e=J("Alpha")},l(t){e=M(t,"Alpha")},m(t,a){A(t,e,a)},d(t){t&&m(e)}}}function Re(s){let e;return{c(){e=J("Beta")},l(t){e=M(t,"Beta")},m(t,a){A(t,e,a)},d(t){t&&m(e)}}}function Be(s){let e;return{c(){e=J("Gamma")},l(t){e=M(t,"Gamma")},m(t,a){A(t,e,a)},d(t){t&&m(e)}}}function Je(s){let e;return{c(){e=J("Delta")},l(t){e=M(t,"Delta")},m(t,a){A(t,e,a)},d(t){t&&m(e)}}}function Me(s){let e,t,a,l,o;const f=[Ce,Oe],c=[];function $(r,i){return r[0]?1:0}return a=$(s),l=c[a]=f[a](s),{c(){e=k("section"),t=k("div"),l.c(),this.h()},l(r){e=b(r,"SECTION",{class:!0});var i=w(e);t=b(i,"DIV",{class:!0});var n=w(t);l.l(n),n.forEach(m),i.forEach(m),this.h()},h(){g(t,"class","box svelte-f7qkdt"),g(e,"class","svelte-f7qkdt")},m(r,i){A(r,e,i),p(e,t),c[a].m(t,null),o=!0},p(r,[i]){let n=a;a=$(r),a===n?c[a].p(r,i):(me(),S(c[n],1,1,()=>{c[n]=null}),pe(),l=c[a],l?l.p(r,i):(l=c[a]=f[a](r),l.c()),y(l,1),l.m(t,null))},i(r){o||(y(l),o=!0)},o(r){S(l),o=!1},d(r){r&&m(e),c[a].d()}}}function Ke(s,e,t){let a,{film:l}=e,o,f={alpha:"https://voidboost.tv/embed/",beta:"https://polati.newplayjj.com:9443/?token=a3fd119d8a9418f6c3f6a7ae628a41&kp=",gamma:"https://api.framprox.ws/embed/kp/",delta:"https://49442664434375553.svetacdn.in/sZfbdItt5jeX?kp_id="},c="alpha";function $(d){t(2,c=d),localStorage.setItem("last_active_player",JSON.stringify(d)),window.history.replaceState([],"")}function r(){let d=JSON.parse(localStorage.getItem("last_active_player"));d||(localStorage.setItem("last_active_player",JSON.stringify("alpha")),d="alpha"),$(d)}_e(()=>{r()});function i(d){de[d?"unshift":"push"](()=>{o=d,t(1,o)})}const n=()=>$("alpha"),D=()=>$("beta"),q=()=>$("gamma"),I=()=>$("delta");return s.$$set=d=>{"film"in d&&t(0,l=d.film)},s.$$.update=()=>{s.$$.dirty&1&&t(3,a={score:(l==null?void 0:l.ratingKinopoisk)||(l==null?void 0:l.ratingImdb),platform:l!=null&&l.ratingKinopoisk?"Кинопоиск":l!=null&&l.ratingImdb?"IMDB":""})},[l,o,c,a,f,$,i,n,D,q,I]}class We extends re{constructor(e){super(),ne(this,e,Ke,Me,le,{film:0})}}function ue(s){let e,t;return e=new We({props:{film:s[0]}}),{c(){F(e.$$.fragment)},l(a){H(e.$$.fragment,a)},m(a,l){R(e,a,l),t=!0},p(a,l){const o={};l&1&&(o.film=a[0]),e.$set(o)},i(a){t||(y(e.$$.fragment,a),t=!0)},o(a){S(e.$$.fragment,a),t=!1},d(a){B(e,a)}}}function Ge(s){var D,q,I,d;let e,t,a,l,o,f,c,$,r,i;t=new ve({}),l=new Ne({props:{title:((D=s[0])==null?void 0:D.nameRu)||((q=s[0])==null?void 0:q.nameEn)||((I=s[0])==null?void 0:I.nameOriginal),year:(d=s[0])==null?void 0:d.year}});let n=s[0]&&ue(s);return c=new be({props:{list:s[1],lable:"Похожие фильмы",nothing:{disable:!0}}}),r=new ke({}),{c(){e=k("div"),F(t.$$.fragment),a=P(),F(l.$$.fragment),o=P(),n&&n.c(),f=P(),F(c.$$.fragment),$=P(),F(r.$$.fragment),this.h()},l(_){e=b(_,"DIV",{class:!0});var v=w(e);H(t.$$.fragment,v),a=j(v),H(l.$$.fragment,v),o=j(v),n&&n.l(v),f=j(v),H(c.$$.fragment,v),$=j(v),H(r.$$.fragment,v),v.forEach(m),this.h()},h(){g(e,"class","page-main svelte-h7c1f0")},m(_,v){A(_,e,v),R(t,e,null),p(e,a),R(l,e,null),p(e,o),n&&n.m(e,null),p(e,f),R(c,e,null),p(e,$),R(r,e,null),i=!0},p(_,[v]){var z,O,L,C;const E={};v&1&&(E.title=((z=_[0])==null?void 0:z.nameRu)||((O=_[0])==null?void 0:O.nameEn)||((L=_[0])==null?void 0:L.nameOriginal)),v&1&&(E.year=(C=_[0])==null?void 0:C.year),l.$set(E),_[0]?n?(n.p(_,v),v&1&&y(n,1)):(n=ue(_),n.c(),y(n,1),n.m(e,f)):n&&(me(),S(n,1,1,()=>{n=null}),pe());const N={};v&2&&(N.list=_[1]),c.$set(N)},i(_){i||(y(t.$$.fragment,_),y(l.$$.fragment,_),y(n),y(c.$$.fragment,_),y(r.$$.fragment,_),i=!0)},o(_){S(t.$$.fragment,_),S(l.$$.fragment,_),S(n),S(c.$$.fragment,_),S(r.$$.fragment,_),i=!1},d(_){_&&m(e),B(t),B(l),n&&n.d(),B(c),B(r)}}}function Te(s,e,t){let a;he(s,Ee,c=>t(3,a=c));let l,o,f;return Ie(async()=>{l=Object.fromEntries(a.url.searchParams),t(0,o=await we(l.id)),t(1,f=await Ae(l.id)),ye(o)}),[o,f]}class xe extends re{constructor(e){super(),ne(this,e,Te,Ge,le,{})}}export{xe as component};