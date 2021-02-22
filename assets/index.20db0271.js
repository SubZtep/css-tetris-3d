import{G as e}from"./vendor.34f1e898.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(o){const r=new URL(e,location),s=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((o,n)=>{const a=new URL(e,r);if(self[t].moduleMap[a])return o(self[t].moduleMap[a]);const c=new Blob([`import * as m from '${a}';`,`${t}.moduleMap['${a}']=m;`],{type:"text/javascript"}),l=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(c),onerror(){n(new Error(`Failed to import: ${e}`)),s(l)},onload(){o(self[t].moduleMap[a]),s(l)}});document.head.appendChild(l)})),self[t].moduleMap={}}}("/assets/");let t=!1;const o=new Map;let r;const s=()=>{t=!1;for(const[e,t]of o.entries())r.setProperty(`--${e}`,t);o.clear()},n=()=>{t||requestAnimationFrame(s),t=!0},a=(e,t)=>{o.set(e,t),n()},c=e=>{for(const[t,r]of Object.entries(e))o.set(t,r);n()},l=(e,t)=>{const o=r.getPropertyValue(`--${e}`);return void 0===t?o:t(o)},d=e=>{for(const[t,o]of Object.entries(e))r.setProperty(`--${t}`,o)},i=new Proxy({},{get:(e,t)=>(Reflect.has(e,t)||(e[t]=[],u(t)),e[t])}),p=["wheel"],u=e=>{document.addEventListener(e,(t=>{for(const o of i[e])Reflect.apply(o,void 0,[t])&&!p.includes(e)&&Reflect.has(t,"preventDefault")&&t.preventDefault()}))},m=(e,t)=>t/e*100,f=e=>e[0].map(((t,o)=>e.map((e=>e[o])).reverse()));let h,v={cols:4,rows:4,floors:5};v=new Proxy(v,{set:(e,t,o)=>(e[t]=o,a(t,String(o)),X(),P(),!0)});const b={orangeRick:[[0,0,1,0],[1,1,1,0]],hero:[[1,1,1,1],[0,0,0,0]],blueRick:[[1,0,0,0],[1,1,1,0]],teeWee:[[0,1,0,0],[1,1,1,0]],clevelandZ:[[1,1,0,0],[0,1,1,0]],smashboy:[[1,1,0,0],[1,1,0,0]],rhodeIslandZ:[[0,1,1,0],[1,1,0,0]]};Object.freeze(b);const w=(e,t=0,o=0,r)=>{let s=b[$.block],n=($.rotZ+e)/90;switch(Math.abs(n)>=4&&(n%=4),n<0&&(n=4+n),n){case 1:t-=2;break;case 2:t-=4,o-=2;break;case 3:o-=4}for(let a=0;a<n;a++)s=f(s);for(let a=0;a<s[0].length;a++)for(let e=0;e<s.length;e++)if(s[e][a]){if(!r(a+t+$.posX,e+o+$.posY))return!1}return!0},y=(e,t=0,o=0)=>w(e,t,o,((e,t)=>!(e<0||e>=v.cols)&&!(t<0||t>=v.rows))),g=e=>{let t=$.rotX+e;console.log("Rotate X",t)},k=e=>{const t=[0,-1,1,-2,2,-3,3,-4,4];for(const o of t)for(const r of t)if(y(e,o,r))return $.posX+=o,$.posY+=r,$.rotZ+=e,!0;return!1},M=e=>!!y(0,e)&&($.posX+=e,!0),F=e=>!!y(0,0,e)&&($.posY+=e,!0),R={set:(e,t,o)=>{switch(t){case"live":clearInterval(h),o&&(h=setInterval(K,3e3));break;case"block":$.block?document.querySelector(".block").classList.replace($.block,o):document.querySelector(".block").classList.add(o);break;case"rotateMode":a("radius",(o?parseFloat(l("edge"))/4:0)+"px");break;default:a(t,String(o))}return e[t]=o,!0}};let L,$={live:!0,rotateMode:!1};$=new Proxy($,R);const X=()=>{L=Array.from(Array.from({length:v.floors},(()=>Array.from({length:v.rows},(()=>Array.from({length:v.cols},(()=>0))))))),$.live&&(h=setInterval(K,3e3))},j=()=>{return(e=Reflect.ownKeys(b))[Math.floor(Math.random()*e.length)];var e},S=()=>{$.currentFloor=v.floors-1,$.block=j(),$.posX=0,$.posY=0,$.rotX=0,$.rotZ=0},A=()=>{const e=document.createDocumentFragment();w(0,0,0,((t,o)=>{L[$.currentFloor][o][t]=1;const r=(s="mc",document.querySelector(`.pool > .${s}`).cloneNode(!0));var s;return r.classList.add(`floor${$.currentFloor}`),r.style.transform=`translate3d(calc(var(--edge) * ${t}), calc(var(--edge) * ${o}), calc(var(--edge) * ${$.currentFloor}))`,e.appendChild(r),!0}));const t=document.querySelector(".mason");t.appendChild(e),$.currentFloor+1===v.floors-1&&(clearInterval(h),confirm("(×﹏×)\n\nContinue?")||(document.location.href="https://github.com/SubZtep/css-tetris-3d#readme"),(e=>{for(;e.firstChild;)e.removeChild(e.lastChild)})(t),v.cols++,v.rows++,v.floors++,X())},K=(e=-1)=>{$.currentFloor+=e,0!==$.currentFloor&&w(0,0,0,((e,t)=>!L[$.currentFloor-1][t][e]))||(A(),S())};let O,Y=!1;let x,E={edge:0,perspective:0};E=new Proxy(E,{set:(e,t,o)=>(e[t]=o,a(t,`${o}px`),!0)});const P=()=>{const{clientWidth:e,clientHeight:t}=x,o=Math.min(e/v.cols,t/v.rows);E.edge=o/2,E.perspective=v.floors*E.edge*2},C=({buttons:e,clientX:t,clientY:o})=>{if(!Y){if(1===e){const{clientWidth:e,clientHeight:r}=x,s=40,n=2.2;let a=m(e,t);a>100-s?a+=Math.pow(Math.abs(100-s-a),n):a<s&&(a-=Math.pow(s-a,n));let l=m(r,o);return l>100-s?l+=Math.pow(Math.abs(100-s-l),n):l<s&&(l-=Math.pow(s-l,n)),c({perspectiveX:100-a+"%",perspectiveY:100-l+"%"}),!0}return!1}};window.addEventListener("load",(()=>{const t=document.querySelector(".container");x=t,P(),(e=>(r=e.style,d))(t)(Object.assign({perspectiveX:"50%",perspectiveY:"50%",radius:"0px"},...Object.entries(v).map((([e,t])=>({[e]:String(t)}))))),new ResizeObserver(P).observe(x),i.mousedown.push((e=>{Y||(1===e.buttons&&(E.perspective=E.perspective*v.floors*2),C(e))})),i.mouseup.push((()=>{c({perspectiveX:"50%",perspectiveY:"50%"}),P()})),i.mousemove.push(C),i.wheel.push((({deltaY:e})=>{let t=l("perspective",parseFloat);t+=100*Math.sign(e),t>0&&a("perspective",`${t}px`)})),i.keydown.push((({code:e,altKey:t,ctrlKey:o})=>{if(o)return!1;const r=(!t||!$.rotateMode)&&(t||$.rotateMode);switch(e){case"KeyR":$.rotateMode=!$.rotateMode;break;case"KeyQ":K(1);break;case"KeyE":K();break;case"KeyA":case"ArrowLeft":r?k(-90):M(-1);break;case"KeyD":case"ArrowRight":r?k(90):M(1);break;case"KeyW":case"ArrowUp":r?g(90):F(-1);break;case"KeyS":case"ArrowDown":r?g(-90):F(1);break;default:return!1}return!0})),X(),S(),(()=>{O=new e,O.close(),O.domElement.addEventListener("mousedown",(()=>Y=!0)),O.domElement.addEventListener("mouseup",(()=>Y=!1));const t=O.addFolder("Dimensions");t.add(v,"cols").min(4).step(1).listen(),t.add(v,"rows").min(4).step(1).listen(),t.add(v,"floors").min(4).step(1).listen(),t.open();const o=O.addFolder("Layout");o.add(E,"edge").min(1).step(1).listen(),o.add(E,"perspective").min(0).step(1).listen(),o.open();const r=O.addFolder("State");r.add($,"live").listen(),r.add($,"rotateMode").listen(),r.add($,"currentFloor").step(1).listen(),r.add($,"block").options(Object.keys(b)).listen(),r.add($,"posX").step(1).listen(),r.add($,"posY").step(1).listen(),r.add($,"rotX").step(1).listen(),r.add($,"rotZ").step(1).listen(),r.open()})()}));
