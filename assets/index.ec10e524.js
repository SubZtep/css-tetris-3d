var e=Object.assign;import{G as t}from"./vendor.34f1e898.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(o){const r=new URL(e,location),s=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((o,n)=>{const c=new URL(e,r);if(self[t].moduleMap[c])return o(self[t].moduleMap[c]);const l=new Blob([`import * as m from '${c}';`,`${t}.moduleMap['${c}']=m;`],{type:"text/javascript"}),a=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(l),onerror(){n(new Error(`Failed to import: ${e}`)),s(a)},onload(){o(self[t].moduleMap[c]),s(a)}});document.head.appendChild(a)})),self[t].moduleMap={}}}("assets/");let o=!1;const r=new Map;let s;const n=()=>{o=!1;for(const[e,t]of r.entries())s.setProperty(`--${e}`,t);r.clear()},c=()=>{o||requestAnimationFrame(n),o=!0},l=(e,t)=>{r.set(e,t),c()},a=e=>{for(const[t,o]of Object.entries(e))r.set(t,o);c()},i=e=>{for(const[t,o]of Object.entries(e))s.setProperty(`--${t}`,o)},d=new Proxy({},{get:(e,t)=>(Reflect.has(e,t)||(e[t]=[],u(t)),e[t])}),p=["wheel"],u=e=>{document.addEventListener(e,(t=>{for(const o of d[e])Reflect.apply(o,void 0,[t])&&!p.includes(e)&&Reflect.has(t,"preventDefault")&&t.preventDefault()}))};let m,f={cols:4,rows:4,floors:5};f=new Proxy(f,{set:(e,t,o)=>(e[t]=o,l(t,String(o)),R(),P(),!0)});const h={orangeRick:[[0,0,1,0],[1,1,1,0]],hero:[[1,1,1,1],[0,0,0,0]],blueRick:[[1,0,0,0],[1,1,1,0]],teeWee:[[0,1,0,0],[1,1,1,0]],clevelandZ:[[1,1,0,0],[0,1,1,0]],smashboy:[[1,1,0,0],[1,1,0,0]],rhodeIslandZ:[[0,1,1,0],[1,1,0,0]]};Object.freeze(h);const v=(e,t=0,o=0,r)=>{let s=h[L.block],n=(L.rotZ+e)/90;switch(Math.abs(n)>=4&&(n%=4),n<0&&(n=4+n),n){case 1:t-=2;break;case 2:t-=4,o-=2;break;case 3:o-=4}for(let c=0;c<n;c++)s=Y(s);for(let c=0;c<s[0].length;c++)for(let e=0;e<s.length;e++)if(s[e][c]){if(!r(c+t+L.posX,e+o+L.posY))return!1}return!0},y=(e,t=0,o=0)=>v(e,t,o,((e,t)=>!(e<0||e>=f.cols)&&!(t<0||t>=f.rows))),b=e=>{let t=L.rotX+e;console.log("Rotate X",t)},w=e=>{const t=[0,-1,1,-2,2,-3,3,-4,4];for(const o of t)for(const r of t)if(y(e,o,r))return L.posX+=o,L.posY+=r,L.rotZ+=e,!0;return!1},g=e=>!!y(0,e)&&(L.posX+=e,!0),k=e=>!!y(0,0,e)&&(L.posY+=e,!0),M={set:(e,t,o)=>{switch(t){case"live":clearInterval(m),o&&(m=setInterval(j,3e3));break;case"block":L.block?document.querySelector(".block").classList.replace(L.block,o):document.querySelector(".block").classList.add(o);break;case"rotateMode":l("radius",(o?parseFloat(((e,t)=>{const o=s.getPropertyValue(`--${e}`);return void 0===t?o:t(o)})("edge"))/4:0)+"px");break;default:l(t,String(o))}return e[t]=o,!0}};let F,L={live:!1,rotateMode:!1};L=new Proxy(L,M);const R=()=>{F=Array.from(Array.from({length:f.floors},(()=>Array.from({length:f.rows},(()=>Array.from({length:f.cols},(()=>0))))))),L.live&&(m=setInterval(j,3e3))},X=()=>{L.currentFloor=f.floors-1,L.block=O(Reflect.ownKeys(h)),L.posX=0,L.posY=0,L.rotX=0,L.rotZ=0},$=()=>{const e=document.createDocumentFragment();v(0,0,0,((t,o)=>{F[L.currentFloor][o][t]=1;const r=(s="mc",document.querySelector(`.pool > .${s}`).cloneNode(!0));var s;return r.classList.add(`floor${L.currentFloor}`),r.style.transform=`translate3d(calc(var(--edge) * ${t}), calc(var(--edge) * ${o}), calc(var(--edge) * ${L.currentFloor}))`,e.appendChild(r),!0}));const t=document.querySelector(".mason");t.appendChild(e),L.currentFloor+1===f.floors-1&&(clearInterval(m),(e=>{for(;e.firstChild;)e.removeChild(e.lastChild)})(t),f.cols++,f.rows++,f.floors++,R())},j=(e=-1)=>{L.currentFloor+=e,0!==L.currentFloor&&v(0,0,0,((e,t)=>!F[L.currentFloor-1][t][e]))||($(),X())},K=(e,t)=>t/e*100,O=e=>e[Math.floor(Math.random()*e.length)],Y=e=>e[0].map(((t,o)=>e.map((e=>e[o])).reverse()));let x,A=!1;let S,E={edge:0,perspective:0};E=new Proxy(E,{set:(e,t,o)=>(e[t]=o,l(t,`${o}px`),!0)});const P=()=>{const{clientWidth:e,clientHeight:t}=S,o=Math.min(e/f.cols,t/f.rows);E.edge=o/2,E.perspective=f.floors*E.edge*2},U=({buttons:t,clientX:o,clientY:r})=>{if(A)return;const{px:s,py:n}=(({clientWidth:e,clientHeight:t,clientX:o,clientY:r})=>{const s=13,n=1.3;let c=K(e,o);c>87?c+=Math.pow(Math.abs(87-c),n):c<s&&(c-=Math.pow(s-c,n));let l=K(t,r);return l>87?l+=Math.pow(Math.abs(87-l),n):l<s&&(l-=Math.pow(s-l,n)),{px:c,py:l}})(e(e({},S),{clientX:o,clientY:r}));return a({perspectiveX:100-s+"%",perspectiveY:100-n+"%"}),!0},q=e=>{if(e.ctrlKey)return!1;const t=e.metaKey||e.shiftKey||e.altKey||e.ctrlKey;switch(e.code){case"KeyQ":j(1);break;case"KeyE":j();break;case"KeyA":case"ArrowLeft":t?w(-90):g(-1);break;case"KeyD":case"ArrowRight":t?w(90):g(1);break;case"KeyW":case"ArrowUp":t?b(90):k(-1);break;case"KeyS":case"ArrowDown":t?b(-90):k(1);break;default:return!1}return!0};window.addEventListener("load",(()=>{const e=document.querySelector(".container");S=e,P(),(e=>(s=e.style,i))(e)(Object.assign({perspectiveX:"50%",perspectiveY:"50%",radius:"0px"},...Object.entries(f).map((([e,t])=>({[e]:String(t)}))))),new ResizeObserver(P).observe(S),d.mousedown.push((e=>{A||(1===e.buttons&&(E.perspective=E.perspective*f.floors/350),U(e))})),d.mouseup.push((()=>{a({perspectiveX:"50%",perspectiveY:"50%"}),P()})),d.mousemove.push(U),d.wheel.push(),d.keydown.push(q),R(),X(),(()=>{x=new t,x.close(),x.domElement.addEventListener("mousedown",(()=>A=!0)),x.domElement.addEventListener("mouseup",(()=>A=!1));const e=x.addFolder("Dimensions");e.add(f,"cols").min(4).step(1).listen(),e.add(f,"rows").min(4).step(1).listen(),e.add(f,"floors").min(4).step(1).listen(),e.open();const o=x.addFolder("Layout");o.add(E,"edge").min(1).step(1).listen(),o.add(E,"perspective").min(0).step(1).listen(),o.open();const r=x.addFolder("State");r.add(L,"live").listen(),r.add(L,"rotateMode").listen(),r.add(L,"currentFloor").step(1).listen(),r.add(L,"block").options(Object.keys(h)).listen(),r.add(L,"posX").step(1).listen(),r.add(L,"posY").step(1).listen(),r.add(L,"rotX").step(1).listen(),r.add(L,"rotZ").step(1).listen(),r.open()})()}));
