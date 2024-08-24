import{s as Y,a as pe,c as ve,b as E,d as h,f as d,i as H,g as _,n as Z,j as $,q as B,l as J,k as y,r as L,m as Q,z as He,D as W,L as Be,e as ce,B as Ve,a4 as Le,h as Me,x as Ae,a1 as ge,t as oe,E as Se,a2 as Ue}from"../chunks/scheduler.UmdBsXoH.js";import{S as x,i as ee,t as I,g as le,e as se,b as U,c as O,a as z,m as K,d as R,f as je}from"../chunks/index.Vbt9v2Aa.js";import{g as Fe,U as Oe}from"../chunks/ui.films.0GeLxFJO.js";import{e as fe,w as ze}from"../chunks/searchFilm.q046qK5L.js";import{a as Ke}from"../chunks/entry.NUIOFjUy.js";import{U as Ne}from"../chunks/ui.button.eDEFvkPg.js";import{p as Re}from"../chunks/stores.PkC-A_-y.js";import{p as X}from"../chunks/index.3YLQEot0.js";import{A as Te}from"../chunks/arrow.68QDVyr3.js";function qe(r){let e,l;return{c(){e=pe("svg"),l=pe("path"),this.h()},l(s){e=ve(s,"svg",{width:!0,height:!0,viewBox:!0,fill:!0,xmlns:!0});var t=E(e);l=ve(t,"path",{d:!0,stroke:!0,"stroke-width":!0,"stroke-linecap":!0,"stroke-linejoin":!0}),E(l).forEach(h),t.forEach(h),this.h()},h(){d(l,"d","M6.66696 3.33317H5.46696C4.72022 3.33317 4.34658 3.33317 4.06136 3.4785C3.81048 3.60633 3.60665 3.81015 3.47882 4.06104C3.3335 4.34625 3.3335 4.7199 3.3335 5.46663V10.5333C3.3335 11.28 3.3335 11.6532 3.47882 11.9384C3.60665 12.1893 3.81048 12.3935 4.06136 12.5213C4.3463 12.6665 4.71949 12.6665 5.46477 12.6665H10.5356C11.2808 12.6665 11.6535 12.6665 11.9384 12.5213C12.1893 12.3935 12.3938 12.1891 12.5216 11.9382C12.6668 11.6533 12.6668 11.2805 12.6668 10.5352V9.33317M13.3335 5.99984V2.6665M13.3335 2.6665H10.0002M13.3335 2.6665L8.66683 7.33317"),d(l,"stroke","white"),d(l,"stroke-width","2"),d(l,"stroke-linecap","round"),d(l,"stroke-linejoin","round"),d(e,"width","16"),d(e,"height","16"),d(e,"viewBox","0 0 16 16"),d(e,"fill","none"),d(e,"xmlns","http://www.w3.org/2000/svg")},m(s,t){H(s,e,t),_(e,l)},p:Z,i:Z,o:Z,d(s){s&&h(e)}}}class Ge extends x{constructor(e){super(),ee(this,e,null,qe,Y,{})}}function Xe(r){let e,l,s,t,a,n,i;return{c(){e=$("label"),l=$("input"),s=B(),t=$("span"),a=J(r[1]),this.h()},l(o){e=y(o,"LABEL",{class:!0});var f=E(e);l=y(f,"INPUT",{type:!0,id:!0,class:!0}),s=L(f),t=y(f,"SPAN",{class:!0});var v=E(t);a=Q(v,r[1]),v.forEach(h),f.forEach(h),this.h()},h(){d(l,"type","checkbox"),d(l,"id",r[0]),l.checked=r[2],d(l,"class","svelte-1lfkvy"),d(t,"class","svelte-1lfkvy"),d(e,"class","checkbox svelte-1lfkvy")},m(o,f){H(o,e,f),_(e,l),_(e,s),_(e,t),_(t,a),n||(i=He(e,"input",r[3]),n=!0)},p(o,[f]){f&1&&d(l,"id",o[0]),f&4&&(l.checked=o[2]),f&2&&W(a,o[1])},i:Z,o:Z,d(o){o&&h(e),n=!1,i()}}}function Ze(r,e,l){let{id:s}=e,{label:t=""}=e,{checked:a=!1}=e;function n(i){Be.call(this,r,i)}return r.$$set=i=>{"id"in i&&l(0,s=i.id),"label"in i&&l(1,t=i.label),"checked"in i&&l(2,a=i.checked)},[s,t,a,n]}class Je extends x{constructor(e){super(),ee(this,e,Ze,Xe,Y,{id:0,label:1,checked:2})}}function ke(r,e,l){const s=r.slice();return s[4]=e[l],s}function be(r){let e,l;function s(...t){return r[2](r[4],...t)}return e=new Je({props:{id:r[4].id,label:r[4].label,checked:r[0]==r[4].id}}),e.$on("input",s),{c(){O(e.$$.fragment)},l(t){z(e.$$.fragment,t)},m(t,a){K(e,t,a),l=!0},p(t,a){r=t;const n={};a&2&&(n.id=r[4].id),a&2&&(n.label=r[4].label),a&3&&(n.checked=r[0]==r[4].id),e.$set(n)},i(t){l||(I(e.$$.fragment,t),l=!0)},o(t){U(e.$$.fragment,t),l=!1},d(t){R(e,t)}}}function Qe(r){let e,l,s=fe(r[1]),t=[];for(let n=0;n<s.length;n+=1)t[n]=be(ke(r,s,n));const a=n=>U(t[n],1,1,()=>{t[n]=null});return{c(){for(let n=0;n<t.length;n+=1)t[n].c();e=ce()},l(n){for(let i=0;i<t.length;i+=1)t[i].l(n);e=ce()},m(n,i){for(let o=0;o<t.length;o+=1)t[o]&&t[o].m(n,i);H(n,e,i),l=!0},p(n,[i]){if(i&3){s=fe(n[1]);let o;for(o=0;o<s.length;o+=1){const f=ke(n,s,o);t[o]?(t[o].p(f,i),I(t[o],1)):(t[o]=be(f),t[o].c(),I(t[o],1),t[o].m(e.parentNode,e))}for(le(),o=s.length;o<t.length;o+=1)a(o);se()}},i(n){if(!l){for(let i=0;i<s.length;i+=1)I(t[i]);l=!0}},o(n){t=t.filter(Boolean);for(let i=0;i<t.length;i+=1)U(t[i]);l=!1},d(n){n&&h(e),Ve(t,n)}}}function We(r,e,l){let{options:s=[]}=e;var t=Le();let{value:a=""}=e;const n=(i,o)=>{l(0,a=o.target.checked?i.id:void 0)};return r.$$set=i=>{"options"in i&&l(1,s=i.options),"value"in i&&l(0,a=i.value)},r.$$.update=()=>{r.$$.dirty&1&&t("change",a)},[a,s,n]}class Ye extends x{constructor(e){super(),ee(this,e,We,Qe,Y,{options:1,value:0})}}function $e(r,e,l){const s=r.slice();return s[20]=e[l],s}function ye(r){let e,l,s,t,a,n,i,o,f,v,c,u,p,S=(r[0].description||"Описание не найдено")+"",m,A,N,F,P,M,q="Плееры",T,C,j,k=r[6].score>0&&we(r),b=r[1]&&Ee(r),G=fe(r[2]),D=[];for(let g=0;g<G.length;g+=1)D[g]=Ie($e(r,G,g));const Pe=g=>U(D[g],1,1,()=>{D[g]=null});return{c(){e=$("section"),l=$("div"),s=$("div"),t=$("iframe"),n=B(),i=$("aside"),o=$("div"),f=$("a"),v=$("div"),k&&k.c(),u=B(),p=$("p"),m=J(S),A=B(),N=$("div"),b&&b.c(),F=B(),P=$("div"),M=$("h4"),M.textContent=q,T=B(),C=$("div");for(let g=0;g<D.length;g+=1)D[g].c();this.h()},l(g){e=y(g,"SECTION",{class:!0});var V=E(e);l=y(V,"DIV",{class:!0});var w=E(l);s=y(w,"DIV",{class:!0});var te=E(s);t=y(te,"IFRAME",{title:!0,sandbox:!0,src:!0,class:!0}),E(t).forEach(h),te.forEach(h),n=L(w),i=y(w,"ASIDE",{class:!0});var re=E(i);o=y(re,"DIV",{class:!0});var ne=E(o);f=y(ne,"A",{href:!0,target:!0});var de=E(f);v=y(de,"DIV",{class:!0});var he=E(v);k&&k.l(he),he.forEach(h),de.forEach(h),u=L(ne),p=y(ne,"P",{class:!0});var me=E(p);m=Q(me,S),me.forEach(h),ne.forEach(h),A=L(re),N=y(re,"DIV",{class:!0});var ae=E(N);b&&b.l(ae),F=L(ae),P=y(ae,"DIV",{class:!0});var ie=E(P);M=y(ie,"H4",{class:!0,"data-svelte-h":!0}),Ae(M)!=="svelte-1y64ufn"&&(M.textContent=q),T=L(ie),C=y(ie,"DIV",{class:!0});var _e=E(C);for(let ue=0;ue<D.length;ue+=1)D[ue].l(_e);_e.forEach(h),ie.forEach(h),ae.forEach(h),re.forEach(h),w.forEach(h),V.forEach(h),this.h()},h(){d(t,"title","player"),t.allowFullscreen="true",d(t,"sandbox","allow-scripts allow-same-origin"),ge(t.src,a=""+(r[3]+r[0].kinopoiskId))||d(t,"src",a),d(t,"class","svelte-ysk4ud"),d(s,"class","player svelte-ysk4ud"),d(v,"class","rating svelte-ysk4ud"),d(f,"href",c=`https://www.kinopoisk.ru/film/${r[5].id}`),d(f,"target","_blank"),d(p,"class","svelte-ysk4ud"),d(o,"class","info svelte-ysk4ud"),d(M,"class","svelte-ysk4ud"),d(C,"class","svelte-ysk4ud"),d(P,"class","sources svelte-ysk4ud"),d(N,"class","actions svelte-ysk4ud"),d(i,"class","svelte-ysk4ud"),d(l,"class","box svelte-ysk4ud"),d(e,"class","svelte-ysk4ud")},m(g,V){H(g,e,V),_(e,l),_(l,s),_(s,t),_(l,n),_(l,i),_(i,o),_(o,f),_(f,v),k&&k.m(v,null),_(o,u),_(o,p),_(p,m),_(i,A),_(i,N),b&&b.m(N,null),_(N,F),_(N,P),_(P,M),_(P,T),_(P,C);for(let w=0;w<D.length;w+=1)D[w]&&D[w].m(C,null);j=!0},p(g,V){if((!j||V&9&&!ge(t.src,a=""+(g[3]+g[0].kinopoiskId)))&&d(t,"src",a),g[6].score>0?k?(k.p(g,V),V&64&&I(k,1)):(k=we(g),k.c(),I(k,1),k.m(v,null)):k&&(le(),U(k,1,1,()=>{k=null}),se()),(!j||V&32&&c!==(c=`https://www.kinopoisk.ru/film/${g[5].id}`))&&d(f,"href",c),(!j||V&1)&&S!==(S=(g[0].description||"Описание не найдено")+"")&&W(m,S),g[1]?b?(b.p(g,V),V&2&&I(b,1)):(b=Ee(g),b.c(),I(b,1),b.m(N,F)):b&&(le(),U(b,1,1,()=>{b=null}),se()),V&268){G=fe(g[2]);let w;for(w=0;w<G.length;w+=1){const te=$e(g,G,w);D[w]?(D[w].p(te,V),I(D[w],1)):(D[w]=Ie(te),D[w].c(),I(D[w],1),D[w].m(C,null))}for(le(),w=G.length;w<D.length;w+=1)Pe(w);se()}},i(g){if(!j){I(k),I(b);for(let V=0;V<G.length;V+=1)I(D[V]);j=!0}},o(g){U(k),U(b),D=D.filter(Boolean);for(let V=0;V<D.length;V+=1)U(D[V]);j=!1},d(g){g&&h(e),k&&k.d(),b&&b.d(),Ve(D,g)}}}function we(r){let e,l=r[6].score+"",s,t,a,n=r[6].platform+"",i,o,f,v;return f=new Ge({}),{c(){e=$("mark"),s=J(l),t=B(),a=$("span"),i=J(n),o=B(),O(f.$$.fragment),this.h()},l(c){e=y(c,"MARK",{class:!0});var u=E(e);s=Q(u,l),u.forEach(h),t=L(c),a=y(c,"SPAN",{class:!0});var p=E(a);i=Q(p,n),p.forEach(h),o=L(c),z(f.$$.fragment,c),this.h()},h(){d(e,"class","svelte-ysk4ud"),oe(e,"okey",r[6].score>3.9&&r[6].score<7),oe(e,"bad",r[6].score<4),d(a,"class","svelte-ysk4ud")},m(c,u){H(c,e,u),_(e,s),H(c,t,u),H(c,a,u),_(a,i),H(c,o,u),K(f,c,u),v=!0},p(c,u){(!v||u&64)&&l!==(l=c[6].score+"")&&W(s,l),(!v||u&64)&&oe(e,"okey",c[6].score>3.9&&c[6].score<7),(!v||u&64)&&oe(e,"bad",c[6].score<4),(!v||u&64)&&n!==(n=c[6].platform+"")&&W(i,n)},i(c){v||(I(f.$$.fragment,c),v=!0)},o(c){U(f.$$.fragment,c),v=!1},d(c){c&&(h(e),h(t),h(a),h(o)),R(f,c)}}}function Ee(r){let e,l,s="Добавить в профиль",t,a,n,i,o;function f(c){r[14](c)}let v={options:r[7]};return r[4]!==void 0&&(v.value=r[4]),n=new Ye({props:v}),Se.push(()=>je(n,"value",f)),n.$on("change",r[15]),{c(){e=$("div"),l=$("h4"),l.textContent=s,t=B(),a=$("div"),O(n.$$.fragment),this.h()},l(c){e=y(c,"DIV",{class:!0});var u=E(e);l=y(u,"H4",{class:!0,"data-svelte-h":!0}),Ae(l)!=="svelte-1yzpk7b"&&(l.textContent=s),t=L(u),a=y(u,"DIV",{class:!0});var p=E(a);z(n.$$.fragment,p),p.forEach(h),u.forEach(h),this.h()},h(){d(l,"class","svelte-ysk4ud"),d(a,"class","svelte-ysk4ud"),d(e,"class","list svelte-ysk4ud")},m(c,u){H(c,e,u),_(e,l),_(e,t),_(e,a),K(n,a,null),o=!0},p(c,u){const p={};!i&&u&16&&(i=!0,p.value=c[4],Ue(()=>i=!1)),n.$set(p)},i(c){o||(I(n.$$.fragment,c),o=!0)},o(c){U(n.$$.fragment,c),o=!1},d(c){c&&h(e),R(n)}}}function xe(r){let e=r[20].name+"",l,s;return{c(){l=J(e),s=B()},l(t){l=Q(t,e),s=L(t)},m(t,a){H(t,l,a),H(t,s,a)},p(t,a){a&4&&e!==(e=t[20].name+"")&&W(l,e)},d(t){t&&(h(l),h(s))}}}function Ie(r){let e,l;function s(){return r[16](r[20])}return e=new Ne({props:{toggle:!0,active:r[3]==r[20].iframe,$$slots:{default:[xe]},$$scope:{ctx:r}}}),e.$on("click",s),{c(){O(e.$$.fragment)},l(t){z(e.$$.fragment,t)},m(t,a){K(e,t,a),l=!0},p(t,a){r=t;const n={};a&12&&(n.active=r[3]==r[20].iframe),a&8388612&&(n.$$scope={dirty:a,ctx:r}),e.$set(n)},i(t){l||(I(e.$$.fragment,t),l=!0)},o(t){U(e.$$.fragment,t),l=!1},d(t){R(e,t)}}}function et(r){let e,l,s=r[0]!=""&&ye(r);return{c(){s&&s.c(),e=ce()},l(t){s&&s.l(t),e=ce()},m(t,a){s&&s.m(t,a),H(t,e,a),l=!0},p(t,[a]){t[0]!=""?s?(s.p(t,a),a&1&&I(s,1)):(s=ye(t),s.c(),I(s,1),s.m(e.parentNode,e)):s&&(le(),U(s,1,1,()=>{s=null}),se())},i(t){l||(I(s),l=!0)},o(t){U(s),l=!1},d(t){t&&h(e),s&&s.d(t)}}}function Ce(r,e,l,s,t,a,n){try{var i=r[a](n),o=i.value}catch(f){return void l(f)}i.done?e(o):Promise.resolve(o).then(s,t)}function De(r){return function(){var e=this,l=arguments;return new Promise(function(s,t){var a=r.apply(e,l);function n(o){Ce(a,s,t,n,i,"next",o)}function i(o){Ce(a,s,t,n,i,"throw",o)}n(void 0)})}}function tt(r,e,l){let s,t;Me(r,Re,C=>l(19,t=C));var a,n,i,o;let{film:f=""}=e;var v,c,u=[],p="",S="",m,A=[{id:"planned",label:"Буду смотреть"},{id:"view",label:"Смотрю"}];function N(C){l(3,p=C)}function F(C,j){return P.apply(this,arguments)}function P(){return P=De(function*(C,j){!j&&c&&(yield X.collection("lists").delete(c.id));var k={user:X.authStore.model.id,film_id:C,status:j};c&&j&&(yield X.collection("lists").update(c.id,k)),!c&&j&&(yield X.collection("lists").create(k)),c=yield X.collection("lists").getFullList({filter:'film_id = "'+m.id+'"'}),c=c[0]}),P.apply(this,arguments)}Ke(De(function*(){var C;l(5,m=Object.fromEntries(t.url.searchParams)),l(0,f=yield Fe(m.id)),ze.add(f),l(2,u=[{name:"Alloha",iframe:"https://attractive-as.allarknow.online/?token=a3fd119d8a9418f6c3f6a7ae628a41&kp="},{name:"Collaps",iframe:"https://api.tobaco.ws/embed/kp/"},{name:"VideoCDN",iframe:"https://49442664434375553.svetacdn.in/sZfbdItt5jeX?kp_id="}]),l(3,p=u[0].iframe);var j=yield fetch("https://kinobox.tv/api/players?kinopoisk="+m.id).then(b=>b.json());j=j.filter(b=>{if(b.source=="Kodik"&&b.iframeUrl)return!0})[0],(C=j)!=null&&C.source&&l(2,u=[...u,{name:j.source,iframe:j.iframeUrl}]);try{var k;l(1,v=X.authStore.isValid),c=yield X.collection("lists").getFullList({filter:'film_id = "'+m.id+'"'}),c=c[0],l(4,S=(k=c)==null?void 0:k.status)}catch{}}));function M(C){S=C,l(4,S)}const q=()=>F(m.id,S),T=C=>N(C.iframe);return r.$$set=C=>{"film"in C&&l(0,f=C.film)},r.$$.update=()=>{r.$$.dirty&15361&&l(6,s={score:(l(10,a=f)==null?void 0:a.ratingKinopoisk)||(l(11,n=f)==null?void 0:n.ratingImdb),platform:l(12,i=f)!=null&&i.ratingKinopoisk?"Кинопоиск":l(13,o=f)!=null&&o.ratingImdb?"IMDB":""})},[f,v,u,p,S,m,s,A,N,F,a,n,i,o,M,q,T]}class lt extends x{constructor(e){super(),ee(this,e,tt,et,Y,{film:0})}}function st(r){let e,l;return e=new Te({props:{left:!0}}),{c(){O(e.$$.fragment)},l(s){z(e.$$.fragment,s)},m(s,t){K(e,s,t),l=!0},p:Z,i(s){l||(I(e.$$.fragment,s),l=!0)},o(s){U(e.$$.fragment,s),l=!1},d(s){R(e,s)}}}function rt(r){let e,l,s,t,a,n=(r[0]??"")+"",i,o,f=(r[1]??"")+"",v,c;return s=new Ne({props:{title:"Назад",nav:!0,vibro:!0,dark:!0,circle:!0,$$slots:{default:[st]},$$scope:{ctx:r}}}),s.$on("click",r[2]),{c(){e=$("section"),l=$("div"),O(s.$$.fragment),t=B(),a=$("h2"),i=J(n),o=$("span"),v=J(f),this.h()},l(u){e=y(u,"SECTION",{class:!0});var p=E(e);l=y(p,"DIV",{class:!0});var S=E(l);z(s.$$.fragment,S),S.forEach(h),t=L(p),a=y(p,"H2",{class:!0});var m=E(a);i=Q(m,n),o=y(m,"SPAN",{class:!0});var A=E(o);v=Q(A,f),A.forEach(h),m.forEach(h),p.forEach(h),this.h()},h(){d(l,"class","back svelte-4j2yli"),d(o,"class","svelte-4j2yli"),d(a,"class","svelte-4j2yli"),d(e,"class","svelte-4j2yli")},m(u,p){H(u,e,p),_(e,l),K(s,l,null),_(e,t),_(e,a),_(a,i),_(a,o),_(o,v),c=!0},p(u,[p]){const S={};p&8&&(S.$$scope={dirty:p,ctx:u}),s.$set(S),(!c||p&1)&&n!==(n=(u[0]??"")+"")&&W(i,n),(!c||p&2)&&f!==(f=(u[1]??"")+"")&&W(v,f)},i(u){c||(I(s.$$.fragment,u),c=!0)},o(u){U(s.$$.fragment,u),c=!1},d(u){u&&h(e),R(s)}}}function nt(r,e,l){let{title:s=""}=e,{year:t=""}=e;const a=()=>history.back();return r.$$set=n=>{"title"in n&&l(0,s=n.title),"year"in n&&l(1,t=n.year)},[s,t,a]}class at extends x{constructor(e){super(),ee(this,e,nt,rt,Y,{title:0,year:1})}}function it(r){var c,u,p,S;let e,l,s,t,a,n,i,o;l=new at({props:{title:((c=r[0])==null?void 0:c.nameRu)||((u=r[0])==null?void 0:u.nameEn)||((p=r[0])==null?void 0:p.nameOriginal),year:(S=r[0])==null?void 0:S.year}});function f(m){r[1](m)}let v={};return r[0]!==void 0&&(v.film=r[0]),t=new lt({props:v}),Se.push(()=>je(t,"film",f)),i=new Oe({props:{type:"recomends"}}),{c(){e=$("div"),O(l.$$.fragment),s=B(),O(t.$$.fragment),n=B(),O(i.$$.fragment),this.h()},l(m){e=y(m,"DIV",{class:!0});var A=E(e);z(l.$$.fragment,A),s=L(A),z(t.$$.fragment,A),n=L(A),z(i.$$.fragment,A),A.forEach(h),this.h()},h(){d(e,"class","page-watch svelte-3zznia")},m(m,A){H(m,e,A),K(l,e,null),_(e,s),K(t,e,null),_(e,n),K(i,e,null),o=!0},p(m,[A]){var P,M,q,T;const N={};A&1&&(N.title=((P=m[0])==null?void 0:P.nameRu)||((M=m[0])==null?void 0:M.nameEn)||((q=m[0])==null?void 0:q.nameOriginal)),A&1&&(N.year=(T=m[0])==null?void 0:T.year),l.$set(N);const F={};!a&&A&1&&(a=!0,F.film=m[0],Ue(()=>a=!1)),t.$set(F)},i(m){o||(I(l.$$.fragment,m),I(t.$$.fragment,m),I(i.$$.fragment,m),o=!0)},o(m){U(l.$$.fragment,m),U(t.$$.fragment,m),U(i.$$.fragment,m),o=!1},d(m){m&&h(e),R(l),R(t),R(i)}}}function ot(r,e,l){var s;function t(a){s=a,l(0,s)}return[s,t]}class ct extends x{constructor(e){super(),ee(this,e,ot,it,Y,{})}}function ft(r){let e,l;return e=new ct({}),{c(){O(e.$$.fragment)},l(s){z(e.$$.fragment,s)},m(s,t){K(e,s,t),l=!0},p:Z,i(s){l||(I(e.$$.fragment,s),l=!0)},o(s){U(e.$$.fragment,s),l=!1},d(s){R(e,s)}}}class bt extends x{constructor(e){super(),ee(this,e,null,ft,Y,{})}}export{bt as component};
