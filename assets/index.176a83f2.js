import{G as e}from"./vendor.34f1e898.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(o){const s=new URL(e,location),r=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((o,n)=>{const a=new URL(e,s);if(self[t].moduleMap[a])return o(self[t].moduleMap[a]);const i=new Blob([`import * as m from '${a}';`,`${t}.moduleMap['${a}']=m;`],{type:"text/javascript"}),c=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(i),onerror(){n(new Error(`Failed to import: ${e}`)),r(c)},onload(){o(self[t].moduleMap[a]),r(c)}});document.head.appendChild(c)})),self[t].moduleMap={}}}("assets/");let t=!1;const o=new Map;let s;const r=()=>{t=!1;for(const[e,t]of o.entries())s.setProperty(`--${e}`,t);o.clear()},n=()=>{t||requestAnimationFrame(r),t=!0},a=(e,t)=>{o.set(e,t),n()},i=(e,t=!1)=>{if(t)for(const[o,r]of Object.entries(e))s.setProperty(`--${o}`,r);else{for(const[t,s]of Object.entries(e))o.set(t,s);n()}};let c,l={cols:4,rows:4,floors:5};l=new Proxy(l,{set:(e,t,o)=>(e[t]=o,a(t,String(o)),p(),m(),!0)});const p=()=>{c=Array.from(Array.from({length:l.floors},(()=>Array.from({length:l.rows},(()=>Array.from({length:l.cols},(()=>0)))))))};let d,f={edge:0,perspective:0};f=new Proxy(f,{set:(e,t,o)=>(e[t]=o,a(t,`${o}px`),!0)});const m=()=>{const e=d.clientWidth/l.cols,t=d.clientHeight/l.rows;f.edge=Math.min(e,t)/2,f.perspective=l.floors*f.edge*2},u=()=>{i({perspectiveX:"50%",perspectiveY:"50%"}),m()},v=(e,t,o)=>{let s=(r=d.clientWidth,e/r*100);var r;return s>100-t?s+=Math.pow(Math.abs(100-t-s),o):s<t&&(s-=Math.pow(t-s,o)),s},h=(e,t=10,o=2)=>{if(!e.ctrlKey)return;const s=100-v(e.clientX,t,o)+"%",r=100-v(e.clientY,t,o)+"%";i({perspectiveX:s,perspectiveY:r})},w=({deltaY:e})=>{let t=((e,t)=>{const o=s.getPropertyValue(`--${e}`);return void 0===t?o:t(o)})("perspective",parseFloat);t+=Math.sign(e)*(t<100?1:~~Math.sqrt(t-100+1)),t>0&&a("perspective",`${t}px`)},y=new Proxy({},{get:(e,t)=>(Reflect.has(e,t)||(e[t]=[],g(t)),e[t])}),b=["wheel"],g=e=>{document.addEventListener(e,(t=>{for(const o of y[e]){if(!1===Reflect.apply(o,void 0,[t]))return;!b.includes(e)&&Reflect.has(t,"preventDefault")&&t.preventDefault()}}))};let k={live:!1,screwAxisX:!1};k=new Proxy(k,{set:(e,t,o)=>{const s=k.tetromino;switch(e[t]=o,t){case"live":A();break;case"screwAxisX":a("backface",o?"visible":"hidden");break;case"tetromino":const{classList:e}=document.querySelector(".tetromino");e.contains(s)?e.replace(s,k.tetromino):e.add(k.tetromino);break;default:a(t,String(o))}return!0}});const x={orangeRick:[[0,0,1,0],[1,1,1,0]],hero:[[1,1,1,1],[0,0,0,0]],blueRick:[[1,0,0,0],[1,1,1,0]],teeWee:[[0,1,0,0],[1,1,1,0]],clevelandZ:[[1,1,0,0],[0,1,1,0]],smashboy:[[1,1,0,0],[1,1,0,0]],rhodeIslandZ:[[0,1,1,0],[1,1,0,0]]};Object.freeze(x);const Z=(e=0,t=0,o=0,s)=>{let r=x[k.tetromino];const n=(e=>{let t=e/90;return Math.abs(t)>=4&&(t%=4),t<0&&(t=4+t),t})(k.rotZ+e),a=((e,t=0,o=0)=>{const s={x:t,y:o};switch(e){case 1:s.x-=2;break;case 2:s.x-=4,s.y-=2;break;case 3:s.y-=4}return s})(n,t,o);r=((e,t=1)=>{for(let o=0;o<t;o++)e=e[0].map(((t,o)=>e.map((e=>e[o])).reverse()));return e})(r,n);for(let i=0;i<r[0].length;i++)for(let e=0;e<r.length;e++)if(r[e][i]){if(!s(i+a.x+k.posX,e+a.y+k.posY))return!1}return!0},X=()=>{return(e=Reflect.ownKeys(x))[Math.floor(Math.random()*e.length)];var e};let M;const A=()=>{clearInterval(M),k.live&&(M=setInterval(P,3e3))},R=()=>{k.posZ=l.floors-1,k.tetromino=X(),k.posX=0,k.posY=0,k.rotX=0,k.rotZ=0},$=(e,t=0,o=0)=>Z(e,t,o,((e,t)=>!(e<0||e>=l.cols)&&!(t<0||t>=l.rows))),K=e=>{k.screwAxisX&&(k.rotX+=e)},L=e=>{const t=[0,-1,1,-2,2,-3,3,-4,4];for(const o of t)for(const s of t)if($(e,o,s))return k.posX+=o,k.posY+=s,void(k.rotZ+=e)},j=e=>{$(0,e)&&(k.posX+=e)},Y=e=>{$(0,0,e)&&(k.posY+=e)},O=()=>{const e=document.createDocumentFragment();Z(0,0,0,((t,o)=>{c[k.posZ][o][t]=1;const s=(r="mc",document.querySelector(`.pool > .${r}`).cloneNode(!0));var r;return s.classList.add(`floor${k.posZ}`),s.style.transform=`translate3d(calc(var(--edge) * ${t}), calc(var(--edge) * ${o}), calc(var(--edge) * ${k.posZ}))`,e.appendChild(s),!0}));const t=document.querySelector(".mason");t.appendChild(e),k.posZ+1===l.floors-1&&(clearInterval(M),(async e=>{if("default"!==Notification.permission||"denied"!==await Notification.requestPermission()){if("denied"!==Notification.permission)return"granted"===Notification.permission?new Notification(e):void 0;alert(e)}else console.warn("Will alert instead")})("You Died! (×﹏×)"),(e=>{for(;e.firstChild;)e.removeChild(e.lastChild)})(t),l.cols++,l.rows++,l.floors++,p(),k.live&&(M=setInterval(P,3e3)))},P=(e=-1)=>{if(k.posZ+=e,console.log([k.posZ,l.floors]),0===k.posZ||k.posZ>=l.floors||!Z(0,0,0,((e,t)=>!c[k.posZ-1][t][e]))){if(e>0)return void k.posZ--;O(),R()}},S=e=>{if(e.ctrlKey)return;const t=e.metaKey||e.shiftKey||e.altKey;switch(e.code){case"KeyQ":P(1);break;case"KeyE":P();break;case"KeyA":case"ArrowLeft":t?L(-90):j(-1);break;case"KeyD":case"ArrowRight":t?L(90):j(1);break;case"KeyW":case"ArrowUp":t?K(90):Y(-1);break;case"KeyS":case"ArrowDown":t?K(-90):Y(1)}return!1},F=()=>{y.keydown.push(S),y.mouseup.push(u),y.mousedown.push(h),y.mousemove.push(h),y.wheel.push(w),y.keyup.push((({key:e})=>{"Control"===e&&u()})),y.mousedown.push((({buttons:e})=>{3===e&&(f.perspective=f.perspective*l.floors/350)}))};let q;window.addEventListener("load",(()=>{const t=document.querySelector(".container");(e=>{s=e})(t.style),i(Object.assign({perspectiveX:"50%",perspectiveY:"50%",backface:"hidden"},...Object.entries(l).map((([e,t])=>({[e]:String(t)})))),!0),d=t,m(),new ResizeObserver(m).observe(d),F(),p(),R(),(()=>{q=new e,q.close();const t=q.addFolder("Dimensions");t.add(l,"cols").min(4).max(50).step(1).listen(),t.add(l,"rows").min(4).max(50).step(1).listen(),t.add(l,"floors").min(4).max(50).step(1).listen(),t.open();const o=q.addFolder("Layout");o.add(f,"edge").min(1).step(1).listen(),o.add(f,"perspective").min(0).step(1).listen(),o.open();const s=q.addFolder("State");s.add(k,"live").listen(),s.add(k,"screwAxisX").listen(),s.add(k,"tetromino").options(Object.keys(x)).listen(),s.add(k,"posX").step(1).listen(),s.add(k,"posY").step(1).listen(),s.add(k,"posZ").step(1).listen(),s.add(k,"rotX").step(1).listen(),s.add(k,"rotZ").step(1).listen(),s.open()})()}));
