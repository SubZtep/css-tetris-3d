import{G as e}from"./vendor.34f1e898.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(o){const s=new URL(e,location),r=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((o,n)=>{const a=new URL(e,s);if(self[t].moduleMap[a])return o(self[t].moduleMap[a]);const i=new Blob([`import * as m from '${a}';`,`${t}.moduleMap['${a}']=m;`],{type:"text/javascript"}),c=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(i),onerror(){n(new Error(`Failed to import: ${e}`)),r(c)},onload(){o(self[t].moduleMap[a]),r(c)}});document.head.appendChild(c)})),self[t].moduleMap={}}}("assets/");let t=!1;const o=new Map;let s;const r=()=>{t=!1;for(const[e,t]of o.entries())s.setProperty(`--${e}`,t);o.clear()},n=()=>{t||requestAnimationFrame(r),t=!0},a=(e,t)=>{o.set(e,t),n()},i=(e,t=!1)=>{if(t)for(const[o,r]of Object.entries(e))s.setProperty(`--${o}`,r);else{for(const[t,s]of Object.entries(e))o.set(t,s);n()}};let c,l={cols:4,rows:4,floors:5};l=new Proxy(l,{set:(e,t,o)=>(e[t]=o,a(t,String(o)),p(),m(),!0)});const p=()=>{c=Array.from(Array.from({length:l.floors},(()=>Array.from({length:l.rows},(()=>Array.from({length:l.cols},(()=>0)))))))};let d,f={edge:0,perspective:0};f=new Proxy(f,{set:(e,t,o)=>(e[t]=o,a(t,`${o}px`),!0)});const m=()=>{const e=d.clientWidth/l.cols,t=d.clientHeight/l.rows;f.edge=Math.min(e,t)/2/1.5,f.perspective=l.floors*f.edge*2},u=()=>{i({perspectiveX:"50%",perspectiveY:"50%"}),m()},v=(e,t,o)=>{let s=(r=d.clientWidth,e/r*100);var r;return s>100-t?s+=Math.pow(Math.abs(100-t-s),o):s<t&&(s-=Math.pow(t-s,o)),s},h=(e,t=10,o=2)=>{if(!e.ctrlKey)return;const s=100-v(e.clientX,t,o)+"%",r=100-v(e.clientY,t,o)+"%";i({perspectiveX:s,perspectiveY:r})},y=({deltaY:e})=>{let t=((e,t)=>{const o=s.getPropertyValue(`--${e}`);return void 0===t?o:t(o)})("perspective",parseFloat);t+=Math.sign(e)*(t<100?1:~~Math.sqrt(t-100+1)),t>0&&a("perspective",`${t}px`)},w=new Proxy({},{get:(e,t)=>(Reflect.has(e,t)||(e[t]=[],b(t)),e[t])}),g=["wheel"],b=e=>{document.addEventListener(e,(t=>{for(const o of w[e]){if(!1===Reflect.apply(o,void 0,[t]))return;!g.includes(e)&&Reflect.has(t,"preventDefault")&&t.preventDefault()}}))};let Z={live:!1,screwAxisX:!1};Z=new Proxy(Z,{set:(e,t,o)=>{const s=Z.tetromino;switch(e[t]=o,t){case"live":R();break;case"tetromino":const{classList:e}=document.querySelector(".tetromino");e.contains(s)?e.replace(s,Z.tetromino):e.add(Z.tetromino);break;default:a(t,String(o))}return!0}});const x={orangeRick:[[0,0,1,0],[1,1,1,0]],hero:[[1,1,1,1],[0,0,0,0]],blueRick:[[1,0,0,0],[1,1,1,0]],teeWee:[[0,1,0,0],[1,1,1,0]],clevelandZ:[[1,1,0,0],[0,1,1,0]],smashboy:[[1,1,0,0],[1,1,0,0]],rhodeIslandZ:[[0,1,1,0],[1,1,0,0]]};Object.freeze(x);const k=(e=0,t=0,o=0,s)=>{let r=x[Z.tetromino];const n=(e=>{let t=e/90;return Math.abs(t)>=4&&(t%=4),t<0&&(t=4+t),t})(Z.rotZ+e),a=((e,t=0,o=0)=>{const s={x:t,y:o};switch(e){case 1:s.x-=2;break;case 2:s.x-=4,s.y-=2;break;case 3:s.y-=4}return s})(n,t,o);r=((e,t=1)=>{for(let o=0;o<t;o++)e=e[0].map(((t,o)=>e.map((e=>e[o])).reverse()));return e})(r,n);for(let i=0;i<r[0].length;i++)for(let e=0;e<r.length;e++)if(r[e][i]){if(!s(i+a.x+Z.posX,e+a.y+Z.posY))return!1}return!0},M=()=>{return(e=Reflect.ownKeys(x))[Math.floor(Math.random()*e.length)];var e};let X;const R=()=>{clearInterval(X),Z.live&&(X=setInterval(P,3e3))},$=()=>{Z.posZ=l.floors-1,Z.tetromino=M(),Z.posX=0,Z.posY=0,Z.rotX=0,Z.rotZ=0},A=(e,t=0,o=0)=>k(e,t,o,((e,t)=>!(e<0||e>=l.cols)&&!(t<0||t>=l.rows))),K=e=>{Z.screwAxisX&&(Z.rotX+=e)},L=e=>{const t=[0,-1,1,-2,2,-3,3,-4,4];for(const o of t)for(const s of t)if(A(e,o,s))return Z.posX+=o,Z.posY+=s,void(Z.rotZ+=e)},j=e=>{A(0,e)&&(Z.posX+=e)},Y=e=>{A(0,0,e)&&(Z.posY+=e)},O=()=>{const e=document.createDocumentFragment();k(0,0,0,((t,o)=>{c[Z.posZ][o][t]=1;const s=(r="mc",document.querySelector(`.pool > .${r}`).cloneNode(!0));var r;return s.classList.add(`floor${Z.posZ}`),s.style.transform=`translate3d(calc(var(--edge) * ${t}), calc(var(--edge) * ${o}), calc(var(--edge) * ${Z.posZ}))`,e.appendChild(s),!0}));const t=document.querySelector(".mason");t.appendChild(e),Z.posZ+1===l.floors-1&&(clearInterval(X),(async e=>{if("default"!==Notification.permission||"denied"!==await Notification.requestPermission()){if("denied"!==Notification.permission)return"granted"===Notification.permission?new Notification(e):void 0;alert(e)}else console.warn("Will alert instead")})("You Died! (×﹏×)"),(e=>{for(;e.firstChild;)e.removeChild(e.lastChild)})(t),l.cols++,l.rows++,l.floors++,p(),Z.live&&(X=setInterval(P,3e3)))},P=(e=-1)=>{if(Z.posZ+=e,console.log([Z.posZ,l.floors]),0===Z.posZ||Z.posZ>=l.floors||!k(0,0,0,((e,t)=>!c[Z.posZ-1][t][e]))){if(e>0)return void Z.posZ--;O(),$()}},S=e=>{if(e.ctrlKey)return;const t=e.metaKey||e.shiftKey||e.altKey;switch(e.code){case"KeyQ":P(1);break;case"KeyE":P();break;case"KeyA":case"ArrowLeft":t?L(-90):j(-1);break;case"KeyD":case"ArrowRight":t?L(90):j(1);break;case"KeyW":case"ArrowUp":t?K(90):Y(-1);break;case"KeyS":case"ArrowDown":t?K(-90):Y(1)}return!1},F=()=>{w.keydown.push(S),w.mouseup.push(u),w.mousedown.push(h),w.mousemove.push(h),w.wheel.push(y),w.keyup.push((({key:e})=>{"Control"===e&&u()})),w.mousedown.push((({buttons:e})=>{3===e&&(f.perspective=f.perspective*l.floors/350)}))};let q;window.addEventListener("load",(()=>{const t=document.querySelector(".container");(e=>{s=e})(t.style),i(Object.assign({perspectiveX:"50%",perspectiveY:"50%"},...Object.entries(l).map((([e,t])=>({[e]:String(t)})))),!0),d=t,m(),new ResizeObserver(m).observe(d),F(),p(),$(),(()=>{q=new e,q.close();const t=q.addFolder("Dimensions");t.add(l,"cols").min(4).max(50).step(1).listen(),t.add(l,"rows").min(4).max(50).step(1).listen(),t.add(l,"floors").min(4).max(50).step(1).listen(),t.open();const o=q.addFolder("Layout");o.add(f,"edge").min(1).step(1).listen(),o.add(f,"perspective").min(0).step(1).listen(),o.open();const s=q.addFolder("State");s.add(Z,"live").listen(),s.add(Z,"screwAxisX").listen(),s.add(Z,"tetromino").options(Object.keys(x)).listen(),s.add(Z,"posX").step(1).listen(),s.add(Z,"posY").step(1).listen(),s.add(Z,"posZ").step(1).listen(),s.add(Z,"rotX").step(1).listen(),s.add(Z,"rotZ").step(1).listen(),s.open()})()}));
