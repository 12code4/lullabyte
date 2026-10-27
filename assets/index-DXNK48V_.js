(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();const L=390,St=844;class Ec{canvas;ctx;scale=1;ox=0;oy=0;dpr=1;viewL=0;viewT=0;viewR=L;viewB=St;constructor(t){this.canvas=t;const e=t.getContext("2d",{alpha:!1});if(!e)throw new Error("no 2d context");this.ctx=e,this.resize(),window.addEventListener("resize",()=>this.resize()),window.addEventListener("orientationchange",()=>this.resize())}rot=0;maxRes=!1;setMaxRes(t){this.maxRes!==t&&(this.maxRes=t,this.resize())}lockPortrait=typeof matchMedia=="function"&&matchMedia("(pointer: coarse)").matches;resize(){const t=window.innerWidth,e=window.innerHeight;this.rot=this.lockPortrait&&t>e?Ac()===270?90:-90:0;const n=this.rot?e:t,i=this.rot?t:e,r=document.body.style;this.rot?Object.assign(r,{width:`${n}px`,height:`${i}px`,right:"auto",bottom:"auto",transformOrigin:"0 0",transform:this.rot===-90?`translate(0px, ${e}px) rotate(-90deg)`:`translate(${t}px, 0px) rotate(90deg)`}):Object.assign(r,{width:"",height:"",right:"",bottom:"",transformOrigin:"",transform:""}),this.dpr=this.maxRes?Math.max(1,window.devicePixelRatio||1):Math.min(window.devicePixelRatio||1,2.5),this.canvas.width=Math.round(n*this.dpr),this.canvas.height=Math.round(i*this.dpr),this.canvas.style.width=`${n}px`,this.canvas.style.height=`${i}px`;const a=Math.min(n/L,i/St);this.scale=a*this.dpr,this.ox=(this.canvas.width-L*this.scale)/2,this.oy=(this.canvas.height-St*this.scale)/2,this.viewL=-this.ox/this.scale,this.viewT=-this.oy/this.scale,this.viewR=L-this.viewL,this.viewB=St-this.viewT}begin(){this.ctx.setTransform(this.scale,0,0,this.scale,this.ox,this.oy)}raw(){this.ctx.setTransform(1,0,0,1,0,0)}toDesign(t,e){let n=t,i=e;return this.rot===-90?(n=window.innerHeight-e,i=t):this.rot===90&&(n=e,i=window.innerWidth-t),{x:(n*this.dpr-this.ox)/this.scale,y:(i*this.dpr-this.oy)/this.scale}}}function Ac(){const s=typeof screen<"u"?screen.orientation:void 0;if(s&&typeof s.angle=="number")return s.angle;const t=window.orientation;return typeof t=="number"?(t+360)%360:90}class Cc{handler=null;active=new Map;get isDown(){return this.active.size>0}constructor(t,e){t.style.touchAction="none",t.addEventListener("pointerdown",n=>{t.setPointerCapture?.(n.pointerId);const i=e.toDesign(n.clientX,n.clientY),r={x:i.x,y:i.y,id:n.pointerId,dx:0,dy:0,downX:i.x,downY:i.y,downT:performance.now()};this.active.set(n.pointerId,r),this.handler?.onDown?.(r),n.preventDefault()}),t.addEventListener("pointermove",n=>{const i=this.active.get(n.pointerId);if(!i)return;const r=e.toDesign(n.clientX,n.clientY);i.dx=r.x-i.x,i.dy=r.y-i.y,i.x=r.x,i.y=r.y,this.handler?.onMove?.(i),n.preventDefault()}),t.addEventListener("pointerup",n=>{const i=this.active.get(n.pointerId);if(!i)return;const r=e.toDesign(n.clientX,n.clientY);i.x=r.x,i.y=r.y,this.active.delete(n.pointerId),this.handler?.onUp?.(i),n.preventDefault()}),t.addEventListener("pointercancel",n=>{const i=this.active.get(n.pointerId);i&&(this.active.delete(n.pointerId),this.handler?.onCancel?.(i),n.preventDefault())}),t.addEventListener("contextmenu",n=>n.preventDefault())}}function Xn(s){const t=performance.now()-s.downT,e=Math.hypot(s.x-s.downX,s.y-s.downY);return t<400&&e<18}class Rc{constructor(t,e){this.update=t,this.draw=e}raf=0;last=0;running=!1;t=0;start(){if(this.running)return;this.running=!0,this.last=performance.now();const t=e=>{if(!this.running)return;const n=Math.min(.05,Math.max(1e-4,(e-this.last)/1e3));this.last=e,this.t+=n,this.update(n),this.draw(),this.raf=requestAnimationFrame(t)};this.raf=requestAnimationFrame(t)}stop(){this.running=!1,cancelAnimationFrame(this.raf)}}function Pc(s){let t=2166136261;for(let e=0;e<s.length;e++)t^=s.charCodeAt(e),t=Math.imul(t,16777619);return t>>>0}function Lc(s){let t=s>>>0;return()=>{t|=0,t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}class Dc{fn;constructor(t){this.fn=Lc(typeof t=="string"?Pc(t):t)}next(){return this.fn()}range(t,e){return t+(e-t)*this.fn()}int(t,e){return Math.floor(this.range(t,e+1))}pick(t){const e=t[Math.floor(this.fn()*t.length)];if(e===void 0)throw new Error("pick from empty array");return e}chance(t){return this.fn()<t}shuffle(t){for(let e=t.length-1;e>0;e--){const n=Math.floor(this.fn()*(e+1)),i=t[e];t[e]=t[n],t[n]=i}return t}}const qo=[9,7,4,7,4,2,0,null,4,7,9,12,9,7,4,null,2,4,7,4,2,0,-3,null,0,2,4,2,0,null,-3,null],Yo=[-24,-24,-27,-24];class Ic{ctx=null;master=null;musicBus=null;sfxBus=null;droneGain=null;droneOscs=[];noiseBuf=null;musicTimer=0;musicOn=!1;step=0;nextNoteAt=0;heartTimer=0;muted=!1;corruption=0;mochiPresence=0;mochiPad=null;unlock(){if(this.ctx){this.ctx.state!=="running"&&this.ctx.resume();return}const t=window.AudioContext??window.webkitAudioContext;if(!t)return;this.ctx=new t,this.master=this.ctx.createGain(),this.master.gain.value=this.muted?0:1,this.master.connect(this.ctx.destination),this.musicBus=this.ctx.createGain(),this.musicBus.gain.value=.5,this.musicBus.connect(this.master),this.sfxBus=this.ctx.createGain(),this.sfxBus.gain.value=.7,this.sfxBus.connect(this.master);const e=this.ctx.sampleRate;this.noiseBuf=this.ctx.createBuffer(1,e,this.ctx.sampleRate);const n=this.noiseBuf.getChannelData(0);for(let i=0;i<e;i++)n[i]=Math.random()*2-1}setMuted(t){this.muted=t,this.master&&this.ctx&&this.master.gain.setTargetAtTime(t?0:1,this.ctx.currentTime,.05)}sleep(){this.ctx?.state==="running"&&this.ctx.suspend()}wake(){this.ctx&&this.ctx.state!=="running"&&this.ctx.resume()}get lullabyPlaying(){return this.musicOn}startLullaby(){this.musicOn||(this.musicOn=!0,this.step=0,this.ctx&&(this.nextNoteAt=this.ctx.currentTime+.1),this.musicTimer=window.setInterval(()=>this.scheduleMusic(),90))}stopLullaby(){this.musicOn=!1,clearInterval(this.musicTimer)}scheduleMusic(){const t=this.ctx;if(!t||!this.musicOn)return;this.nextNoteAt<t.currentTime&&(this.nextNoteAt=t.currentTime+.05);const e=this.mochiPresence,n=Math.max(0,this.corruption*(1-e)),r=60/(92-n*30-e*7)/2;for(;this.nextNoteAt<t.currentTime+.35;){const a=this.step%qo.length;let o=qo[a]??null;if(o!==null){n>.25&&(o===4&&(o=3),o===9&&(o=8),o===-3&&(o=-4)),n>.5&&Math.random()<n*.12&&(o+=Math.random()<.5?-12:12);const l=n*(Math.random()*40-20),h=n>.35&&Math.random()<n*.3;this.musicNote(o,this.nextNoteAt,r*3.4,l-n*25,h),e>.35&&a%2===0&&this.musicNote(o+4,this.nextNoteAt+.02,r*3,0,!1,.12*e)}if(a%8===0){const l=Math.floor(this.step/8)%Yo.length;this.musicNote(Yo[l]??-24,this.nextNoteAt,r*7,-n*20,!1,.16)}this.step++,this.nextNoteAt+=r}}musicNote(t,e,n,i=0,r=!1,a=.3){const o=this.ctx,l=this.musicBus;if(!o||!l)return;const h=523.25*Math.pow(2,t/12)*Math.pow(2,i/1200),c=o.createGain();c.connect(l);const u=o.createOscillator();u.type="sine",u.frequency.value=h;const f=o.createOscillator();f.type="sine",f.frequency.value=h*4;const d=o.createGain();d.gain.value=.12,u.connect(c),f.connect(d),d.connect(c),r?(c.gain.setValueAtTime(1e-4,e),c.gain.exponentialRampToValueAtTime(a,e+n*.9),c.gain.linearRampToValueAtTime(0,e+n*.95)):(c.gain.setValueAtTime(a,e),c.gain.exponentialRampToValueAtTime(1e-4,e+n)),u.start(e),f.start(e),u.stop(e+n+.05),f.stop(e+n*.4)}voice(t=.7,e=3,n=!1){const i=this.ctx,r=this.sfxBus;if(!i||!r)return;const a=this.corruption;let o=i.currentTime+.01;const l=n?130:430+t*260-a*140;for(let h=0;h<e;h++){const c=n?.16:.07+Math.random()*.05,u=l*(.9+Math.random()*.25),f=u*(n?.92:1+(Math.random()*.3-.1)*(.5+t)),d=i.createOscillator();d.type=n?"triangle":"sine",d.frequency.setValueAtTime(u,o),d.frequency.exponentialRampToValueAtTime(Math.max(40,f),o+c);const g=i.createGain();if(g.gain.setValueAtTime(1e-4,o),g.gain.exponentialRampToValueAtTime(n?.2:.16,o+.015),g.gain.exponentialRampToValueAtTime(1e-4,o+c),d.connect(g),a>.3||n){const v=i.createOscillator();v.frequency.value=n?28:30+a*40;const m=i.createGain();m.gain.value=n?.09:a*.08,v.connect(m),m.connect(g.gain),v.start(o),v.stop(o+c)}g.connect(r),d.start(o),d.stop(o+c+.02),o+=c+(n?.09:.045)}}setDrone(t){const e=this.ctx;if(!(!e||!this.master)){if(!this.droneGain){this.droneGain=e.createGain(),this.droneGain.gain.value=0;const n=e.createBiquadFilter();n.type="lowpass",n.frequency.value=160,this.droneGain.connect(n),n.connect(this.master);for(const i of[55,55.7,110.4]){const r=e.createOscillator();r.type="sawtooth",r.frequency.value=i;const a=e.createGain();a.gain.value=i>100?.12:.3,r.connect(a),a.connect(this.droneGain),r.start(),this.droneOscs.push(r)}}this.droneGain.gain.setTargetAtTime(t*.22,e.currentTime,1.2)}}setMochiPresence(t){this.mochiPresence=Math.max(0,Math.min(1,t));const e=this.ctx;if(!(!e||!this.master)){if(!this.mochiPad){this.mochiPad=e.createGain(),this.mochiPad.gain.value=0;const n=e.createBiquadFilter();n.type="lowpass",n.frequency.value=700,this.mochiPad.connect(n),n.connect(this.master);for(const i of[130.81,196,261.63]){const r=e.createOscillator();r.type="triangle",r.frequency.value=i;const a=e.createGain();a.gain.value=i>200?.18:.32,r.connect(a),a.connect(this.mochiPad),r.start()}}this.mochiPad.gain.setTargetAtTime(this.mochiPresence*.16,e.currentTime,.8)}}mochiVoice(t=2){const e=this.ctx,n=this.sfxBus;if(!e||!n)return;let i=e.currentTime+.01;for(let r=0;r<t;r++){const a=.28+Math.random()*.12,o=176*(r===0?1:1.18)*(.98+Math.random()*.04),l=e.createOscillator();l.type="triangle",l.frequency.setValueAtTime(o,i),l.frequency.linearRampToValueAtTime(o*.97,i+a);const h=e.createOscillator();h.frequency.value=5.2;const c=e.createGain();c.gain.value=2.4,h.connect(c),c.connect(l.frequency);const u=e.createGain();u.gain.setValueAtTime(1e-4,i),u.gain.exponentialRampToValueAtTime(.16,i+.06),u.gain.exponentialRampToValueAtTime(1e-4,i+a);const f=e.createOscillator();f.type="sine",f.frequency.value=o*1.5;const d=e.createGain();d.gain.value=.05,f.connect(d),d.connect(u),l.connect(u),u.connect(n),l.start(i),h.start(i),f.start(i),l.stop(i+a+.05),h.stop(i+a+.05),f.stop(i+a+.05),i+=a+.08}}startHeartbeat(t=64){this.stopHeartbeat();const e=()=>{this.thump(.5),setTimeout(()=>this.thump(.34),190)};e(),this.heartTimer=window.setInterval(e,6e4/t)}stopHeartbeat(){clearInterval(this.heartTimer),this.heartTimer=0}env(t,e,n,i,r){const a=this.ctx,o=this.sfxBus;if(!a||!o)return;const l=a.currentTime,h=a.createOscillator();h.type=n,h.frequency.setValueAtTime(t,l),r&&h.frequency.exponentialRampToValueAtTime(Math.max(30,r),l+e);const c=a.createGain();c.gain.setValueAtTime(1e-4,l),c.gain.exponentialRampToValueAtTime(i,l+.012),c.gain.exponentialRampToValueAtTime(1e-4,l+e),h.connect(c),c.connect(o),h.start(l),h.stop(l+e+.03)}pop(){this.env(680,.09,"sine",.22,900)}chime(){this.env(880,.5,"sine",.16),this.env(1318.5,.6,"sine",.1)}sparkle(){this.ctx&&[1567,1975,2637].forEach((e,n)=>{setTimeout(()=>this.env(e,.22,"sine",.1),n*55)})}munch(){this.noise(.09,900,.25),this.env(300,.12,"triangle",.18,140)}sad(){this.env(520,.5,"sine",.14,260)}error(){this.env(190,.22,"square",.12,120)}crack(){this.noise(.16,2400,.4),this.env(70,.5,"sine",.4,38)}thump(t=.4){this.env(58,.32,"sine",t,34)}staticBurst(t=.25){this.noise(t,1400,.28)}typeTick(){this.env(2200,.025,"square",.03)}powerDown(){this.env(420,1.6,"sawtooth",.16,28),this.noise(1.2,500,.1)}whoosh(){this.noise(.45,700,.16)}noise(t,e,n){const i=this.ctx,r=this.sfxBus;if(!i||!r||!this.noiseBuf)return;const a=i.currentTime,o=i.createBufferSource();o.buffer=this.noiseBuf,o.loop=!0,o.playbackRate.value=.8+Math.random()*.4;const l=i.createBiquadFilter();l.type="lowpass",l.frequency.value=e;const h=i.createGain();h.gain.setValueAtTime(n,a),h.gain.exponentialRampToValueAtTime(1e-4,a+t),o.connect(l),l.connect(h),h.connect(r),o.start(a),o.stop(a+t+.05)}}const Er={bgTop:"#ffe1ee",bgBot:"#e6dcff",floor:"#fff0d9",panel:"#fff6f9",panelLine:"#ffb7d2",ink:"#5b4a63",inkSoft:"#a58fae",accent:"#ff8fb8",accent2:"#7fd4c0",lavender:"#c9b8ff",cream:"#fff6e9",good:"#7fd4a0",bad:"#ff7d9c",glow:"#fff2b8"},$o={bgTop:"#131020",bgBot:"#0b0812",floor:"#171225",panel:"#181425",panelLine:"#3c2f4a",ink:"#c8bfd6",inkSoft:"#6b5f7d",accent:"#ff2266",accent2:"#1a5a5a",lavender:"#4a3a6a",cream:"#2a2438",good:"#3a7a5a",bad:"#ff2266",glow:"#31204a"};function jo(s){const t=parseInt(s.slice(1),16);return[t>>16&255,t>>8&255,t&255]}function nt(s,t,e,n=1){return n>=1?`rgb(${s|0},${t|0},${e|0})`:`rgba(${s|0},${t|0},${e|0},${n})`}function Fe(s,t,e){const[n,i,r]=jo(s),[a,o,l]=jo(t);return nt(n+(a-n)*e,i+(o-i)*e,r+(l-r)*e)}function Uc(s){if(s<=0)return Er;if(s>=1)return $o;const t={};for(const e of Object.keys(Er))t[e]=Fe(Er[e],$o[e],s);return t}const Nc='"M PLUS Rounded 1c", ui-rounded, "Hiragino Maru Gothic ProN", "Arial Rounded MT Bold", "Varela Round", system-ui, sans-serif',kc='"SF Mono", "Cascadia Mono", "Roboto Mono", ui-monospace, Menlo, monospace';function Xi(s,t=700){return`${t} ${s}px ${Nc}`}function $t(s,t=500){return`${t} ${s}px ${kc}`}function vt(s,t,e,n,i,r){const a=Math.min(r,n/2,i/2);s.beginPath(),s.moveTo(t+a,e),s.arcTo(t+n,e,t+n,e+i,a),s.arcTo(t+n,e+i,t,e+i,a),s.arcTo(t,e+i,t,e,a),s.arcTo(t,e,t+n,e,a),s.closePath()}function Te(s,t,e,n,i,r,a="#ffffff",o=6,l="center"){s.save(),s.font=Xi(i,800),s.textAlign=l,s.textBaseline="middle",s.lineJoin="round",s.strokeStyle=a,s.lineWidth=o,s.strokeText(t,e,n),s.fillStyle=r,s.fillText(t,e,n),s.restore()}function Yt(s,t,e,n,i,r,a="left",o=700,l=!1){s.font=l?$t(i,o):Xi(i,o),s.fillStyle=r,s.textAlign=a,s.textBaseline="middle",s.fillText(t,e,n)}function Ea(s,t,e,n,i,r,a,o,l=!1,h=600){s.font=l?$t(a,h):Xi(a,h),s.fillStyle=o,s.textAlign="left",s.textBaseline="middle";const c=t.split(" ");let u="",f=n,d=0;for(const g of c){const v=u?`${u} ${g}`:g;s.measureText(v).width>i&&u?(s.fillText(u,e,f),u=g,f+=r,d++):u=v}return u&&(s.fillText(u,e,f),d++),d}function li(s,t,e,n){s.beginPath(),s.moveTo(t,e+n*.32),s.bezierCurveTo(t,e-n*.28,t-n,e-n*.28,t-n,e+n*.18),s.bezierCurveTo(t-n,e+n*.62,t-n*.36,e+n*.82,t,e+n*1.05),s.bezierCurveTo(t+n*.36,e+n*.82,t+n,e+n*.62,t+n,e+n*.18),s.bezierCurveTo(t+n,e-n*.28,t,e-n*.28,t,e+n*.32),s.closePath()}function ae(s,t,e,n){s.beginPath();for(let i=0;i<10;i++){const r=Math.PI/5*i-Math.PI/2,a=i%2===0?n:n*.46,o=t+Math.cos(r)*a,l=e+Math.sin(r)*a;i===0?s.moveTo(o,l):s.lineTo(o,l)}s.closePath()}function xh(s,t,e,n,i,r=1){s.save(),s.globalAlpha*=r,s.fillStyle=i,s.beginPath(),s.moveTo(t,e-n),s.quadraticCurveTo(t+n*.15,e-n*.15,t+n,e),s.quadraticCurveTo(t+n*.15,e+n*.15,t,e+n),s.quadraticCurveTo(t-n*.15,e+n*.15,t-n,e),s.quadraticCurveTo(t-n*.15,e-n*.15,t,e-n),s.closePath(),s.fill(),s.restore()}function yr(s,t,e,n){s.beginPath(),s.arc(t,e,n,Math.PI*.32,Math.PI*1.68,!1),s.arc(t+n*.55,e,n*.72,Math.PI*1.55,Math.PI*.45,!0),s.closePath()}const Oc=[0,.05,.16,.34,.58],Ko="▓▒░█▚▞◢◣╳✶＊ミметがけэを47";function wh(s,t,e=Math.random){if(t<=0)return s;let n="";for(const i of s)i!==" "&&e()<t?n+=Ko[Math.floor(e()*Ko.length)]:n+=i;return n}class Fc{base=0;spike=0;drainPulse=0;drainOverride=null;glitchT=0;glitchPower=0;shakeT=0;shakeAmp=0;flashColor=null;flashT=0;crack=null;band=0;marginStars=!1;grain;scan=null;constructor(){this.grain=document.createElement("canvas"),this.grain.width=128,this.grain.height=128;const t=this.grain.getContext("2d");if(t){const e=t.createImageData(128,128);for(let n=0;n<e.data.length;n+=4){const i=Math.floor(Math.random()*255);e.data[n]=i,e.data[n+1]=i,e.data[n+2]=i,e.data[n+3]=22}t.putImageData(e,0,0)}}setStage(t){this.base=Oc[Math.max(0,Math.min(4,t))]??0}corruption(){return Math.min(1,this.base+this.spike)}paletteT(){return this.drainOverride!==null?this.drainOverride:Math.min(1,this.corruption()*.14+this.drainPulse)}palette(){return Uc(this.paletteT())}glitchBurst(t=.7,e=.35){this.glitchT=Math.max(this.glitchT,e),this.glitchPower=t}spikeCorruption(t){this.spike=Math.min(.6,this.spike+t)}drain(t=.6){this.drainPulse=Math.max(this.drainPulse,t)}shake(t=6,e=.3){this.shakeAmp=t,this.shakeT=e}flash(t="#ffffff",e=.12){this.flashColor=t,this.flashT=e}crackScreen(t=4){const e=[];let n=L*(.3+t%5*.1),i=-10,r=Math.PI/2+(Math.random()-.5)*.6;for(let a=0;a<26;a++){const o=18+Math.random()*42,l=n+Math.cos(r)*o,h=i+Math.sin(r)*o;if(e.push({x1:n,y1:i,x2:l,y2:h}),Math.random()<.4){const c=r+(Math.random()-.5)*2.2;e.push({x1:l,y1:h,x2:l+Math.cos(c)*30,y2:h+Math.sin(c)*30})}if(n=l,i=h,r+=(Math.random()-.5)*.9,r=Math.max(Math.PI*.2,Math.min(Math.PI*.8,r)),i>St+10)break}this.crack={segs:e}}clearCrack(){this.crack=null}update(t){this.spike=Math.max(0,this.spike-t*.08),this.drainPulse=Math.max(0,this.drainPulse-t*.25),this.glitchT=Math.max(0,this.glitchT-t),this.shakeT=Math.max(0,this.shakeT-t),this.flashT=Math.max(0,this.flashT-t),this.band=(this.band+t*40)%(St+200)}applyShake(t){this.shakeT>0&&t.translate((Math.random()-.5)*2*this.shakeAmp,(Math.random()-.5)*2*this.shakeAmp)}designPost(t){const e=this.corruption(),n=t.createRadialGradient(L/2,St/2,St*.3,L/2,St/2,St*.72);if(n.addColorStop(0,"rgba(40,20,50,0)"),n.addColorStop(1,`rgba(24,10,32,${.16+e*.22})`),t.fillStyle=n,t.fillRect(0,0,L,St),e>.08){const i=this.band-100,r=t.createLinearGradient(0,i,0,i+90);r.addColorStop(0,"rgba(255,255,255,0)"),r.addColorStop(.5,`rgba(255,255,255,${.02+e*.03})`),r.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=r,t.fillRect(0,i,L,90)}if(this.crack){t.save(),t.strokeStyle="rgba(255,255,255,0.75)",t.lineWidth=1.6,t.shadowColor="rgba(180,220,255,0.8)",t.shadowBlur=4,t.beginPath();for(const i of this.crack.segs)t.moveTo(i.x1,i.y1),t.lineTo(i.x2,i.y2);t.stroke(),t.restore()}this.flashT>0&&this.flashColor&&(t.save(),t.globalAlpha=Math.min(1,this.flashT*6),t.fillStyle=this.flashColor,t.fillRect(-60,-60,L+120,St+120),t.restore())}drawFlash(t){this.flashT>0&&this.flashColor&&(t.save(),t.globalAlpha=Math.min(1,this.flashT*6),t.fillStyle=this.flashColor,t.fillRect(-60,-60,L+120,St+120),t.restore())}rawPost(t){const e=t.ctx,n=this.corruption();if(this.glitchT>0){const a=3+Math.floor(this.glitchPower*6),o=t.canvas.height,l=t.canvas.width;for(let h=0;h<a;h++){const c=Math.floor(Math.random()*o),u=Math.floor(6+Math.random()*26)*t.dpr,f=Math.floor((Math.random()-.5)*60*this.glitchPower*t.dpr);e.drawImage(t.canvas,0,c,l,u,f,c,l,u),Math.random()<.5&&(e.save(),e.globalCompositeOperation="screen",e.globalAlpha=.35,e.drawImage(t.canvas,0,c,l,u,f+4*t.dpr,c,l,u),e.restore())}}if(!this.scan){const a=document.createElement("canvas");a.width=4,a.height=4;const o=a.getContext("2d");o&&(o.fillStyle="rgba(0,0,0,0.10)",o.fillRect(0,2,4,1),this.scan=e.createPattern(a,"repeat"))}this.scan&&(e.save(),e.globalAlpha=.5+n*.4,e.fillStyle=this.scan,e.fillRect(0,0,t.canvas.width,t.canvas.height),e.restore()),e.save(),e.globalAlpha=.5+n*.5;const i=Math.floor(Math.random()*128),r=Math.floor(Math.random()*128);for(let a=-i;a<t.canvas.width;a+=128)for(let o=-r;o<t.canvas.height;o+=128)e.drawImage(this.grain,a,o);e.restore()}drawMargins(t,e){const n=t.ctx;if(n.fillStyle="#060409",n.fillRect(0,0,t.canvas.width,t.canvas.height),e!==null){const i=r=>{const a=Math.sin(r*127.1)*43758.5453;return a-Math.floor(a)};for(let r=0;r<90;r++){const a=i(r)*t.canvas.width,o=i(r+500)*t.canvas.height,l=.4+.6*Math.abs(Math.sin(e*(.4+i(r+900))+r));n.fillStyle=nt(255,240,250,.5*l),n.fillRect(a,o,2,2)}}}}const Ar=new Map;let Qi=null;function Cr(){if(Qi!==null)return Qi;try{const s="__lb_probe__";localStorage.setItem(s,"1"),localStorage.removeItem(s),Qi=!0}catch{Qi=!1}return Qi}const hn={get(s){if(Cr())try{return localStorage.getItem(s)}catch{}return Ar.get(s)??null},set(s,t){if(Cr())try{localStorage.setItem(s,t);return}catch{}Ar.set(s,t)},remove(s){if(Cr())try{localStorage.removeItem(s)}catch{}Ar.delete(s)}};function Bc(){return{phase:0,trust:0,hauntCount:0,gifts:0,met:!1,reunited:!1,seen:[]}}const Ue=(s,t,e)=>Math.max(t,Math.min(e,s));function bh(s,t){const e=`OP-0${s%900+100}`;return{v:2,seed:s,op:e,name:"",erasedName:"",bond:0,stage:0,meters:{hunger:82,mood:74,energy:90},lastTick:t,visits:0,lastSeen:0,totalAwayMs:0,longestAwayMs:0,lastAwayMs:0,flags:[],choices:[],iteration:47,endings:{sever:!1,stay:!1,wake:!1},mochi:Bc(),muted:!1,createdAt:t}}function zc(s){if(typeof s!="object"||s===null)return null;const t=s;if(t.v!==1&&t.v!==2||typeof t.seed!="number"||typeof t.stage!="number")return null;const e=bh(t.seed,typeof t.createdAt=="number"?t.createdAt:0),n={...e},i=a=>typeof t[a]=="number"?t[a]:e[a],r=a=>typeof t[a]=="string"?t[a]:e[a];if(n.op=r("op"),n.name=r("name"),n.erasedName=r("erasedName"),n.bond=i("bond"),n.stage=Ue(i("stage"),0,4),n.lastTick=i("lastTick"),n.visits=i("visits"),n.lastSeen=i("lastSeen"),n.totalAwayMs=i("totalAwayMs"),n.longestAwayMs=i("longestAwayMs"),n.lastAwayMs=i("lastAwayMs"),n.iteration=i("iteration"),n.muted=t.muted===!0,typeof t.meters=="object"&&t.meters!==null){const a=t.meters;n.meters={hunger:Ue(typeof a.hunger=="number"?a.hunger:70,0,100),mood:Ue(typeof a.mood=="number"?a.mood:70,0,100),energy:Ue(typeof a.energy=="number"?a.energy:70,0,100)}}if(Array.isArray(t.flags)&&(n.flags=t.flags.filter(a=>typeof a=="string")),Array.isArray(t.choices)&&(n.choices=t.choices.filter(a=>typeof a=="object"&&a!==null&&typeof a.id=="string"&&typeof a.pick=="string")),typeof t.endings=="object"&&t.endings!==null){const a=t.endings;n.endings={sever:a.sever===!0,stay:a.stay===!0,wake:a.wake===!0}}if(typeof t.mochi=="object"&&t.mochi!==null){const a=t.mochi;n.mochi={phase:Ue(typeof a.phase=="number"?a.phase:0,0,4),trust:Ue(typeof a.trust=="number"?a.trust:0,0,100),hauntCount:typeof a.hauntCount=="number"?a.hauntCount:0,gifts:typeof a.gifts=="number"?a.gifts:0,met:a.met===!0,reunited:a.reunited===!0,seen:Array.isArray(a.seen)?a.seen.filter(o=>typeof o=="string"):[]}}return n}const ri={hauntsToShy:4,trustToTrust:50,trustToReunion:100,patiencePerSec:1.4,giftTrust:11,findTrust:9};function Hc(s){let t=Math.max(s.phase,1);return t>=1&&s.hauntCount>=ri.hauntsToShy&&(t=2),t>=2&&s.trust>=ri.trustToTrust&&(t=3),t>=3&&s.trust>=ri.trustToReunion&&(t=4),Math.max(s.phase,t)}function Vc(s,t){return s.trust=Ue(s.trust+t,0,100),s.trust}const Rr={hunger:9,mood:7,energy:6},Pr=4,Gc=60;function Lr(s,t,e){if(e>=4)return{...s};const n=Ue(t/36e5,0,Gc);return{hunger:Ue(s.hunger-Rr.hunger*n,Pr,100),mood:Ue(s.mood-Rr.mood*n,Pr,100),energy:Ue(s.energy-Rr.energy*n,Pr,100)}}function Wc(s){return(s.hunger+s.mood+s.energy)/3}const Dr={toStage2:20,toStage3:45,toStage4:75};function Xc(s){const t=n=>s.flags.includes(n);let e=0;return t("named")&&(e=1),e>=1&&s.bond>=Dr.toStage2&&(e=2),e>=2&&s.bond>=Dr.toStage3&&s.visits>=2&&(e=3),e>=3&&s.bond>=Dr.toStage4&&t("backstage")&&(e=4),Math.max(s.stage,e)}function qc(s){const t=Math.floor(s/1e3),e=Math.floor(t/86400),n=Math.floor(t%86400/3600),i=Math.floor(t%3600/60),r=t%60,a=[];return e&&a.push(`${e} day${e===1?"":"s"}`),n&&a.push(`${n} hour${n===1?"":"s"}`),i&&a.push(`${i} minute${i===1?"":"s"}`),a.push(`${r} second${r===1?"":"s"}`),a.join(", ")}function Yc(s){return s>=2&&s<5}const vo={feedBase:3,playBase:3,cleanBase:3};function $c(s,t){return vo.feedBase+Math.round(3*Ue(t>0?s/t:0,0,1))}function jc(s,t){return vo.playBase+Math.round(4*Ue(s/t,0,1))}function Kc(s,t){return vo.cleanBase+Math.round(2*Ue(t>0?s/t:0,0,1))}const Rs="lullabyte_v1",Ir="lullabyte_residual";class Zc{constructor(t=Date.now){this.now=t;const e=this.now();let n=null;const i=hn.get(Rs);if(i)try{n=zc(JSON.parse(i))}catch{n=null}if(this.returning=n!==null&&n.flags.includes("named"),n){this.save=n;const r=n.lastSeen>0?Math.max(0,e-n.lastSeen):0;this.awayMs=r,r>0&&(this.save.lastAwayMs=r,this.save.totalAwayMs+=r,this.save.longestAwayMs=Math.max(this.save.longestAwayMs,r)),this.save.visits+=1,this.save.meters=Lr(this.save.meters,Math.max(0,e-this.save.lastTick),this.save.stage),this.save.lastTick=e,this.save.lastSeen=e}else{const r=(e^Math.floor(Math.random()*4294967295))>>>0;this.save=bh(r,e),this.awayMs=0,this.save.visits=1,this.save.lastSeen=e}this.persist()}save;returning;awayMs;heartbeatAcc=0;decayAcc=0;wiped=!1;tick(t){this.decayAcc+=t,this.decayAcc>=30&&(this.save.meters=Lr(this.save.meters,this.decayAcc*1e3*4,this.save.stage),this.decayAcc=0),this.heartbeatAcc+=t,this.heartbeatAcc>=5&&(this.heartbeatAcc=0,this.save.lastSeen=this.now(),this.save.lastTick=this.now(),this.persist())}persist(){this.wiped||hn.set(Rs,JSON.stringify(this.save))}has(t){return this.save.flags.includes(t)}flag(t){this.has(t)||(this.save.flags.push(t),this.persist())}unflag(t){const e=this.save.flags.indexOf(t);e>=0&&(this.save.flags.splice(e,1),this.persist())}addBond(t){this.save.bond=Math.max(0,this.save.bond+t),this.persist()}bumpMeter(t,e){this.save.meters[t]=Ue(this.save.meters[t]+e,0,100),this.persist()}advanceStage(){const t=Xc(this.save);return t>this.save.stage?(this.save.stage=t,this.persist(),!0):!1}recordChoice(t,e){this.save.choices.push({id:t,pick:e}),this.persist()}residual(){const t=hn.get(Ir);if(t)try{const e=JSON.parse(t),n=e.endings??{};return{freckle:e.freckle===!0,severCount:typeof e.severCount=="number"?e.severCount:0,endings:{sever:n.sever===!0,stay:n.stay===!0,wake:n.wake===!0},mochiAware:e.mochiAware===!0}}catch{}return{freckle:!1,severCount:0,endings:{sever:!1,stay:!1,wake:!1},mochiAware:!1}}writeResidual(t){hn.set(Ir,JSON.stringify(t))}recordEnding(t){this.save.endings[t]=!0,this.persist();const e=this.residual();e.endings[t]=!0,e.mochiAware=!0,this.writeResidual(e)}sever(){const t=this.residual();t.freckle=!0,t.severCount+=1,t.endings.sever=!0,t.mochiAware=!0,this.writeResidual(t),hn.remove(Rs),this.wiped=!0}mochiUnlocked(){const t=this.save.endings;return t.sever||t.stay||t.wake||this.save.mochi.phase>0?!0:this.residual().mochiAware}advanceMochi(){const t=Hc(this.save.mochi);return t>this.save.mochi.phase?(this.save.mochi.phase=t,this.persist(),!0):!1}beginMochi(){return this.save.mochi.phase===0?(this.save.mochi.phase=1,this.persist(),!0):!1}mochiHaunt(){this.save.mochi.hauntCount+=1,this.save.mochi.met=!0,this.persist()}mochiTrust(t){const e=Vc(this.save.mochi,t);return this.persist(),e}mochiGift(){this.save.mochi.gifts+=1,this.persist()}mochiSeen(t){return this.save.mochi.seen.includes(t)}mochiSee(t){this.mochiSeen(t)||(this.save.mochi.seen.push(t),this.persist())}reiterate(){this.save.iteration+=1,this.persist()}factoryReset(){hn.remove(Rs),hn.remove(Ir),hn.remove("lullabyte_sandbox"),this.wiped=!0}applyBackgroundGap(t){const e=this.now();this.save.meters=Lr(this.save.meters,t,this.save.stage),this.save.lastTick=e,this.save.lastSeen=e;const n=t>30*6e4;return n&&(this.save.visits+=1,this.save.lastAwayMs=t,this.save.totalAwayMs+=t,this.save.longestAwayMs=Math.max(this.save.longestAwayMs,t),this.awayMs=t),this.persist(),n}}class Th{x=195;y=470;r=74;sx=1;sy=1;vsx=0;vsy=0;hopY=0;hopV=0;blinkT=0;blinkTimer=2.5;earTwitch=0;earTimer=4;intrusion=null;intrusionFrames=0;mode="normal";corruption=0;mood=.8;asleep=!1;freckle=!1;look=null;nom=0;joy=0;update(t,e){this.vsx+=(1-this.sx)*90*t-this.vsx*11*t,this.vsy+=(1-this.sy)*90*t-this.vsy*11*t,this.sx+=this.vsx*t,this.sy+=this.vsy*t,this.hopV+=900*t,this.hopY=Math.min(0,this.hopY+this.hopV*t),this.hopY===0&&this.hopV>0&&(this.hopV=0),this.blinkTimer-=t,this.blinkTimer<=0&&(this.blinkT=.14,this.blinkTimer=1.8+Math.random()*(this.corruption>.5?6:3.2)),this.blinkT>0&&(this.blinkT-=t),this.earTimer-=t,this.earTimer<=0&&(this.earTwitch=.28,this.earTimer=3+Math.random()*5),this.earTwitch>0&&(this.earTwitch-=t),this.nom>0&&(this.nom-=t),this.joy>0&&(this.joy-=t),this.intrusionFrames>0&&(this.intrusionFrames--,this.intrusionFrames<=0&&(this.intrusion=null))}squish(){this.vsx+=3.2,this.vsy-=3.2,this.joy=1.2}hop(){this.hopY===0&&(this.hopV=-300,this.vsy+=2.2,this.vsx-=1.6)}intrude(t,e=2){this.intrusion=t,this.intrusionFrames=e}hitTest(t,e){const n=(t-this.x)/(this.r*1.25),i=(e-(this.y+this.hopY))/(this.r*1.15);return n*n+i*i<=1}draw(t,e,n){const i=Math.sin(n*2.1)*.012+Math.sin(n*3.7+1.3)*.008,r=this.asleep?Math.sin(n*1.4)*.02:Math.sin(n*2.8)*.012,a=this.sx+i+r,o=this.sy-i+(this.asleep?-r:r*.6),l=this.x,h=this.y+this.hopY+Math.sin(n*1.9)*2.4,c=this.r*1.18*a,u=this.r*1.02*o,f=this.mode==="wireframe",d=this.corruption,g=f?"transparent":Fe("#ffffff","#cabde0",d*.7),v=f?"transparent":Fe("#ffd9e8","#4a3555",d*.75),m=f?e.accent:Fe("#e8a7c3","#241a33",d*.8);t.save(),f||(t.fillStyle="rgba(120,80,120,0.16)",t.beginPath(),t.ellipse(l,this.y+this.r*1.02,c*.82*(1-this.hopY/-220),u*.16,0,0,Math.PI*2),t.fill()),this.drawEar(t,l-c*.52,h-u*.78,c,u,-.3-(this.earTwitch>0?Math.sin(this.earTwitch*40)*.12:0),g,v,m,f),this.drawEar(t,l+c*.52,h-u*.78,c,u,.3,g,v,m,f);const p=d>.45?(d-.45)*26:0;if(this.blobPath(t,l,h,c,u,n,p),f){t.fillStyle="rgba(10,6,18,0.85)",t.fill(),t.strokeStyle=e.accent,t.lineWidth=1.6,t.stroke(),t.strokeStyle=nt(255,34,102,.35),t.lineWidth=1;for(let M=-1;M<=1;M++)t.beginPath(),t.ellipse(l,h,c*.95,u*(.32+.3*(M+1)),0,0,Math.PI*2),t.stroke()}else{const M=t.createLinearGradient(l,h-u,l,h+u);M.addColorStop(0,g),M.addColorStop(1,v),t.fillStyle=M,t.fill(),t.strokeStyle=m,t.lineWidth=3,t.stroke(),t.save(),t.globalAlpha=.5*(1-d),t.fillStyle="#fff8ec",t.beginPath(),t.ellipse(l,h+u*.42,c*.52,u*.34,0,0,Math.PI*2),t.fill(),t.restore()}const T=this.joy>0?Math.sin(this.joy*9)*.5+.5:0;this.drawArm(t,l-c*.94,h+u*.1-T*16,-1,v,m,f),this.drawArm(t,l+c*.94,h+u*.1-T*16,1,v,m,f),this.drawFace(t,e,l,h,c,u,n,f),t.restore()}blobPath(t,e,n,i,r,a,o){const h=Math.sin(a*1.7)*1.6,c=Math.cos(a*2.3)*1.6,u=r+o;t.beginPath(),t.moveTo(e,n-r),t.bezierCurveTo(e+i*.55+h,n-r,e+i,n-r*.55,e+i,n),t.bezierCurveTo(e+i,n+u*(.55+.15),e+i*(.55+.12),n+u,e,n+u),t.bezierCurveTo(e-i*(.55+.12),n+u,e-i,n+u*(.55+.15),e-i,n),t.bezierCurveTo(e-i,n-r*.55,e-i*.55+c,n-r,e,n-r),t.closePath()}drawEar(t,e,n,i,r,a,o,l,h,c){if(t.save(),t.translate(e,n),t.rotate(a),t.beginPath(),t.moveTo(-i*.16,r*.18),t.quadraticCurveTo(-i*.2,-r*.34,0,-r*.4),t.quadraticCurveTo(i*.2,-r*.34,i*.16,r*.18),t.closePath(),c)t.fillStyle="rgba(10,6,18,0.85)",t.fill(),t.strokeStyle=h,t.lineWidth=1.6,t.stroke();else{const u=t.createLinearGradient(0,-r*.4,0,r*.2);u.addColorStop(0,l),u.addColorStop(1,o),t.fillStyle=u,t.fill(),t.strokeStyle=h,t.lineWidth=3,t.stroke(),t.fillStyle="rgba(255,143,184,0.5)",t.beginPath(),t.ellipse(0,-r*.12,i*.07,r*.14,0,0,Math.PI*2),t.fill()}t.restore()}drawArm(t,e,n,i,r,a,o){t.beginPath(),t.ellipse(e,n,13,17,i*.5,0,Math.PI*2),o?(t.strokeStyle=a,t.lineWidth=1.4,t.stroke()):(t.fillStyle=r,t.fill(),t.strokeStyle=a,t.lineWidth=2.6,t.stroke())}drawFace(t,e,n,i,r,a,o,l){const h=this.corruption,c=i-a*.1,u=r*.42,f=r*.17,d=a*.3;let g=0,v=0;if(this.look){const M=this.look.x-n,y=this.look.y-c,k=Math.hypot(M,y)||1;g=M/k*Math.min(5,k*.04),v=y/k*Math.min(4,k*.04)}const m=this.asleep?1:this.blinkT>0?Math.min(1,this.blinkT/.07):0;if(this.intrusion==="eyes"){t.fillStyle="#050308";for(const M of[-1,1])t.beginPath(),t.ellipse(n+M*u,c,f*1.7,d*1.25,0,0,Math.PI*2),t.fill()}else if(this.asleep||m>.85){t.strokeStyle=l?e.accent:"#5b4a63",t.lineWidth=3,t.lineCap="round";for(const M of[-1,1])t.beginPath(),t.arc(n+M*u,c-d*.1,f*1.05,Math.PI*.15,Math.PI*.85),t.stroke()}else if(this.joy>.35&&this.mood>.5&&!l){t.strokeStyle="#5b4a63",t.lineWidth=4.5,t.lineCap="round";for(const M of[-1,1])t.beginPath(),t.arc(n+M*u,c+d*.35,f*1.05,Math.PI*1.12,Math.PI*1.88),t.stroke()}else{const M=1-m*.9,y=1-h*.45;for(const k of[-1,1]){const A=n+k*u+g,C=c+v;if(t.save(),l)t.strokeStyle=e.accent,t.lineWidth=1.4,t.beginPath(),t.ellipse(A,C,f,d*M,0,0,Math.PI*2),t.stroke(),t.fillStyle=e.accent,t.beginPath(),t.ellipse(A,C,f*.28,d*.28*M,0,0,Math.PI*2),t.fill();else{const D=t.createLinearGradient(A,C-d,A,C+d);D.addColorStop(0,Fe("#6b4a75","#1a0f22",h)),D.addColorStop(.55,Fe("#3a2b45","#0c0712",h)),D.addColorStop(1,Fe("#241a2e","#050308",h)),t.fillStyle=D,t.beginPath(),t.ellipse(A,C,f,d*M,0,0,Math.PI*2),t.fill(),t.strokeStyle=nt(255,180,220,.35*(1-h)),t.lineWidth=2,t.beginPath(),t.ellipse(A,C+d*.12,f*.62*y,d*.5*M*y,0,0,Math.PI*2),t.stroke();const w=1-h*.85;t.fillStyle=nt(255,255,255,.95*w),t.beginPath(),t.ellipse(A-f*.3,C-d*.38*M,f*.3,d*.2*M,-.3,0,Math.PI*2),t.fill(),t.fillStyle=nt(255,255,255,.7*w),t.beginPath(),t.arc(A+f*.34,C+d*.3*M,f*.14,0,Math.PI*2),t.fill(),this.mood>.55&&h<.4&&(ae(t,A+f*.05,C-d*.02,f*.16),t.fillStyle=nt(255,245,255,.85*w),t.fill())}t.restore()}this.intrusion==="third"&&(t.save(),t.globalAlpha=.55,t.fillStyle="#050308",t.beginPath(),t.ellipse(n,i-a*.55,f*.7,d*.5,0,0,Math.PI*2),t.fill(),t.restore())}if(this.freckle&&!l&&(ae(t,n-u-f*.9,c+d*.75,3),t.fillStyle=nt(255,200,120,.9),t.fill()),!l&&h<.6){t.fillStyle=nt(255,143,184,.42*(1-h)*(.5+this.mood*.5));for(const M of[-1,1])t.beginPath(),t.ellipse(n+M*r*.6,i+a*.12,r*.12,a*.07,0,0,Math.PI*2),t.fill()}const p=i+a*.26,T=this.currentMouth();switch(t.strokeStyle=l?e.accent:Fe("#5b4a63","#efe6ff",h*.4),t.fillStyle=l?"rgba(0,0,0,0)":"#7c3a55",t.lineWidth=3.4,t.lineCap="round",T){case"w":{t.beginPath(),t.arc(n-r*.07,p,r*.07,.15,Math.PI-.15),t.stroke(),t.beginPath(),t.arc(n+r*.07,p,r*.07,.15,Math.PI-.15),t.stroke();break}case"smile":{t.beginPath(),t.arc(n,p-r*.04,r*.11,.25,Math.PI-.25),t.stroke();break}case"open":{t.beginPath(),t.ellipse(n,p+2,r*.13,a*.13,0,0,Math.PI*2),t.fill(),t.stroke(),t.fillStyle="#ff8fb8",t.beginPath(),t.ellipse(n,p+a*.08,r*.08,a*.05,0,0,Math.PI),t.fill();break}case"flat":{t.beginPath(),t.moveTo(n-r*.1,p),t.lineTo(n+r*.1,p),t.stroke();break}case"uneasy":{t.beginPath(),t.moveTo(n-r*.11,p),t.quadraticCurveTo(n-r*.03,p+5,n+r*.03,p-3),t.quadraticCurveTo(n+r*.08,p-6,n+r*.11,p+2),t.stroke();break}case"grin":{t.fillStyle="#0a0510",t.beginPath(),t.moveTo(n-r*.55,p-a*.06),t.quadraticCurveTo(n,p+a*.34,n+r*.55,p-a*.06),t.quadraticCurveTo(n,p+a*.14,n-r*.55,p-a*.06),t.closePath(),t.fill();break}}if(this.asleep&&!l){const M=(Math.sin(o*1.2)+1)/2;t.save(),t.globalAlpha=.5+M*.3,t.fillStyle="#ffffff",t.beginPath(),t.ellipse(n+r*.95,i-a*.85-M*8,13+M*4,11+M*3,.2,0,Math.PI*2),t.fill(),t.restore()}}currentMouth(){return this.intrusion==="grin"?"grin":this.mode==="plain"?"flat":this.nom>0?"open":this.asleep?"smile":this.corruption>.72?"uneasy":this.joy>0?"open":this.mood>.72?"w":this.mood>.45?"smile":this.mood>.25?"flat":"uneasy"}}const pe={x:14,y:St-240,w:L-28,h:168},Ur=30;class Jc{queue=[];onDone=null;line=null;shown=0;phase="typing";phaseT=0;ghostShown=0;ask=null;blipAcc=0;get active(){return this.line!==null||this.queue.length>0||this.ask!==null}run(t,e){this.queue=[...t],this.onDone=e??null,this.advance()}clear(){this.queue=[],this.line=null,this.onDone=null,this.ask=null}askThen(t,e,n,i,r){this.run(n,()=>{this.ask={id:e,options:i,onPick:a=>{t.state.recordChoice(e,a),this.ask=null,r?.(a)}}})}advance(){const t=this.queue.shift();if(!t){this.line=null;const e=this.onDone;this.onDone=null,e?.();return}this.line=t,this.shown=0,this.ghostShown=0,this.phaseT=0,this.phase=t.ghost?"ghost":"typing"}update(t,e){const n=this.line;if(!n)return;this.phaseT+=e;const i=n.who??"myu",r=()=>{if(this.blipAcc+=e,i==="mochi"){this.blipAcc>.28&&(this.blipAcc=0,t.audio.mochiVoice(1));return}this.blipAcc>.09&&(this.blipAcc=0,i==="myu"||i==="plain"?t.audio.voice(n.mood??.7,1,n.deep??i==="plain"):t.audio.typeTick())};switch(this.phase){case"ghost":{const a=n.ghost??"";this.ghostShown=Math.min(a.length,this.ghostShown+e*Ur),r(),this.ghostShown>=a.length&&(this.phase="ghostHold",this.phaseT=0);break}case"ghostHold":this.phaseT>.9&&(this.phase="ghostDelete",t.audio.error());break;case"ghostDelete":this.ghostShown=Math.max(0,this.ghostShown-e*Ur*4),this.ghostShown<=0&&(this.phase="typing",this.phaseT=0);break;case"typing":this.shown=Math.min(n.text.length,this.shown+e*Ur),r(),this.shown>=n.text.length&&(this.phase=n.pause?"pausing":"done",this.phaseT=0);break;case"pausing":this.phaseT>=(n.pause??0)&&(this.phase="done");break}}onUp(t,e){if(!Xn(e))return;if(this.ask){const i=this.choiceAt(e.x,e.y);i&&(t.audio.pop(),this.ask.onPick(i.value));return}const n=this.line;n&&(this.phase==="typing"?(this.shown=n.text.length,this.phase=n.pause?"pausing":"done",this.phaseT=0):this.phase==="done"&&(t.audio.pop(),this.advance()))}choiceRects(){if(!this.ask)return[];const t=[],e=this.ask.options.length;for(let n=0;n<e;n++){const i=this.ask.options[n];i&&t.push({x:pe.x+24,y:pe.y-18-(e-n)*54,w:pe.w-48,h:46,c:i})}return t}choiceAt(t,e){for(const n of this.choiceRects())if(t>=n.x&&t<=n.x+n.w&&e>=n.y&&e<=n.y+n.h)return n.c;return null}draw(t,e){const n=this.line;if(!n&&!this.ask)return;const i=t.pal(),r=n?.who??"myu",a=r==="log",o=r==="sys",l=r==="plain";if(e.fillStyle="rgba(40,20,50,0.28)",vt(e,pe.x,pe.y+6,pe.w,pe.h,a||l?8:22),e.fill(),e.fillStyle=a?"rgba(8,10,14,0.94)":l?"rgba(12,8,18,0.92)":i.panel,vt(e,pe.x,pe.y,pe.w,pe.h,a||l?8:22),e.fill(),e.strokeStyle=a?"#1f4a44":l?"#3a2f4a":i.panelLine,e.lineWidth=2,vt(e,pe.x+1,pe.y+1,pe.w-2,pe.h-2,a||l?7:21),e.stroke(),n&&!l){const h=r==="mochi",c=r==="myu"?t.state.save.name||"???":h?"mochi":a?"MAINTENANCE LOG":"CRADLE/OS";e.font=r==="myu"||h?Xi(13,800):$t(11,700);const f=e.measureText(c).width+26,d=pe.x+18,g=pe.y-14;e.fillStyle=r==="myu"?i.accent:h?"#caa04a":a?"#123832":"#4a5a78",vt(e,d,g,f,28,14),e.fill(),e.fillStyle="#ffffff",e.textAlign="center",e.textBaseline="middle",e.fillText(c,d+f/2,g+14+1)}if(n){let h;if(this.phase==="ghost"||this.phase==="ghostHold"||this.phase==="ghostDelete"?h=(n.ghost??"").slice(0,Math.floor(this.ghostShown)):h=n.text.slice(0,Math.floor(this.shown)),n.corrupt&&n.corrupt>0){let f=Math.floor(t.t*9);const d=()=>(f=f*1103515245+12345&2147483647,f%1e3/1e3);h=wh(h,n.corrupt,d)}const c=a||o,u=a?"#7fd4c0":l?"#e8e0f2":i.ink;if(Ea(e,h,pe.x+22,pe.y+40,pe.w-44,25,c?14:17,u,c,c?500:700),this.phase==="done"&&!this.ask){const f=Math.sin(t.t*5)*3;e.fillStyle=a?"#7fd4c0":i.accent,e.beginPath();const d=pe.x+pe.w-30,g=pe.y+pe.h-24+f;e.moveTo(d-7,g-5),e.lineTo(d+7,g-5),e.lineTo(d,g+5),e.closePath(),e.fill()}}if(this.ask)for(const h of this.choiceRects())e.fillStyle="rgba(40,20,50,0.22)",vt(e,h.x,h.y+4,h.w,h.h,23),e.fill(),e.fillStyle=i.panel,vt(e,h.x,h.y,h.w,h.h,23),e.fill(),e.strokeStyle=i.accent,e.lineWidth=2,vt(e,h.x+1,h.y+1,h.w-2,h.h-2,22),e.stroke(),Yt(e,h.c.label,h.x+h.w/2,h.y+h.h/2+1,16,i.ink,"center",800)}}function Qc(s){switch(s){case 0:return{interval:1/0,events:[]};case 1:return{interval:150,events:[{kind:"eyes",weight:1}]};case 2:return{interval:75,events:[{kind:"eyes",weight:3},{kind:"glitch",weight:3},{kind:"silence",weight:1},{kind:"stare",weight:2}]};case 3:return{interval:45,events:[{kind:"eyes",weight:2},{kind:"third",weight:1},{kind:"glitch",weight:3},{kind:"drain",weight:2},{kind:"whisper",weight:2},{kind:"battery",weight:2},{kind:"silence",weight:1},{kind:"stare",weight:2},{kind:"grin",weight:.5}]};default:return{interval:30,events:[{kind:"glitch",weight:3},{kind:"drain",weight:2},{kind:"whisper",weight:2},{kind:"battery",weight:2},{kind:"grin",weight:1},{kind:"third",weight:1}]}}}function tu(s,t){const e=s.reduce((i,r)=>i+r.weight,0);if(e<=0)return null;let n=t*e;for(const i of s)if(n-=i.weight,n<=0)return i.kind;return s[s.length-1]?.kind??null}class eu{cooldown=20;battOverride=null;battOverrideT=0;battStart=.62;silenceT=0;stareT=0;suspended=!1;constructor(t){this.battStart=.35+t%1e3/1e3*.55}batteryText(){return this.battOverride!==null?this.battOverride:`${Math.round(this.batteryFrac()*100)}%`}batteryFrac(){return Math.max(.07,this.battStart-performance.now()/1e3/3600*.3)}update(t,e){if(this.battOverrideT>0&&(this.battOverrideT-=e,this.battOverrideT<=0&&(this.battOverride=null)),this.silenceT>0&&!this.suspended&&(this.silenceT-=e,this.silenceT<=0&&!t.state.save.muted&&t.audio.startLullaby()),this.stareT>0&&(this.stareT-=e),this.suspended||t.dialogue.active)return;const n=t.state.save.stage,i=Qc(n);if(!isFinite(i.interval)||(this.cooldown-=e,this.cooldown>0)||(this.cooldown=1,t.rng.next()>1/i.interval))return;const r=tu(i.events,t.rng.next());r&&(this.fire(t,r),this.cooldown=8+t.rng.next()*10)}fire(t,e){switch(e){case"eyes":t.myu.intrude("eyes",2);break;case"grin":t.myu.intrude("grin",2),t.fx.glitchBurst(.4,.1);break;case"third":t.myu.intrude("third",2);break;case"glitch":t.fx.glitchBurst(.35+t.rng.next()*.4,.12+t.rng.next()*.2),t.rng.chance(.5)&&t.audio.staticBurst(.12);break;case"drain":t.fx.drain(.5+t.rng.next()*.3);break;case"whisper":t.audio.voice(.2,2,!0);break;case"battery":{const n=t.rng.pick(["∞%","-3%","747%","??%","0%"]);this.battOverride=n,this.battOverrideT=2.5;break}case"silence":t.audio.stopLullaby(),this.silenceT=3+t.rng.next()*4;break;case"stare":this.stareT=2.2;break}}}class nu{current=null;next=null;fade=0;phase="idle";speed=4.5;get transitioning(){return this.phase==="out"}go(t,e,n){if(n?.instant){this.current?.exit?.(t),this.current=e,e.enter?.(t),this.phase="idle",this.fade=0;return}if(n?.glitch){t.fx.glitchBurst(.9,.3),t.audio.staticBurst(.18),this.current?.exit?.(t),this.current=e,e.enter?.(t),this.phase="idle",this.fade=0;return}this.next=e,this.phase="out"}update(t,e){this.phase==="out"?(this.fade=Math.min(1,this.fade+e*this.speed),this.fade>=1&&this.next&&(this.current?.exit?.(t),this.current=this.next,this.next=null,this.current.enter?.(t),this.phase="in")):this.phase==="in"&&(this.fade=Math.max(0,this.fade-e*this.speed),this.fade<=0&&(this.phase="idle")),this.phase!=="out"&&this.current?.update(t,e)}drawFade(t,e,n){this.fade>0&&(t.save(),t.globalAlpha=this.fade,t.fillStyle="#0b0812",t.fillRect(-80,-80,e+160,n+160),t.restore())}}class nn{constructor(t,e,n,i,r,a="none"){this.x=t,this.y=e,this.w=n,this.h=i,this.label=r,this.icon=a}pressed=!1;visible=!0;contains(t,e){return this.visible&&t>=this.x&&t<=this.x+this.w&&e>=this.y&&e<=this.y+this.h}draw(t,e,n=e.accent){if(!this.visible)return;const i=this.pressed?3:0;this.pressed||(t.fillStyle="rgba(90,50,90,0.16)",vt(t,this.x,this.y+4,this.w,this.h,17),t.fill()),t.fillStyle=e.panel,vt(t,this.x,this.y+i,this.w,this.h,17),t.fill(),t.strokeStyle=n,t.lineWidth=2.5,vt(t,this.x+1,this.y+i+1,this.w-2,this.h-2,16),t.stroke();const r=this.x+this.w/2,a=this.y+i+(this.label?this.h*.38:this.h*.5);this.drawIcon(t,r,a,n),this.label&&(t.font=Xi(12.5,800),t.fillStyle=e.ink,t.textAlign="center",t.textBaseline="middle",t.fillText(this.label,r,this.y+i+this.h-15))}drawIcon(t,e,n,i){switch(t.save(),t.strokeStyle=i,t.fillStyle=i,t.lineWidth=2.6,t.lineCap="round",this.icon){case"bowl":{t.beginPath(),t.arc(e,n-1,11,.1,Math.PI-.1),t.closePath(),t.fill(),ae(t,e-4,n-7,4),t.fill(),ae(t,e+5,n-6,3),t.fill();break}case"ball":{t.beginPath(),t.arc(e,n-1,10,0,Math.PI*2),t.stroke(),t.beginPath(),t.arc(e,n-11,10,.5,Math.PI-.5),t.stroke();break}case"broom":{t.beginPath(),t.moveTo(e-8,n-10),t.lineTo(e+1,n-1),t.stroke(),t.beginPath(),t.moveTo(e+1,n-1),t.lineTo(e+9,n+3),t.moveTo(e+1,n-1),t.lineTo(e+7,n+7),t.moveTo(e+1,n-1),t.lineTo(e+3,n+9),t.stroke(),ae(t,e-9,n+5,4),t.fill();break}case"moon":{yr(t,e,n-1,10),t.fill();break}case"mail":{vt(t,e-11,n-8,22,15,3),t.stroke(),t.beginPath(),t.moveTo(e-10,n-6),t.lineTo(e,n+2),t.lineTo(e+10,n-6),t.stroke();break}case"gear":{t.beginPath(),t.arc(e,n-1,6,0,Math.PI*2),t.stroke();for(let r=0;r<8;r++){const a=r/8*Math.PI*2;t.beginPath(),t.moveTo(e+Math.cos(a)*8,n-1+Math.sin(a)*8),t.lineTo(e+Math.cos(a)*11,n-1+Math.sin(a)*11),t.stroke()}break}case"heart":{li(t,e,n-4,9),t.fill();break}}t.restore()}}function Nr(s,t,e,n,i,r,a,o){s.fillStyle=nt(255,255,255,.55),vt(s,e,n,i,30,15),s.fill(),s.strokeStyle=t.panelLine,s.lineWidth=1.5,vt(s,e,n,i,30,15),s.stroke();const h=4,c=(i-h*2)*Math.max(.02,a/100),u=a<30;s.fillStyle=u?t.bad:o==="heart"?t.accent:o==="star"?"#ffc966":t.lavender,vt(s,e+h,n+h,c,30-h*2,11),s.fill(),s.save(),s.fillStyle="#ffffff",s.strokeStyle="#ffffff",o==="heart"?(li(s,e+16,n+30/2-4,7),s.fill()):o==="star"?(ae(s,e+16,n+30/2,8),s.fill()):(yr(s,e+16,n+30/2,8),s.fill()),s.restore(),s.font=Xi(11,800),s.fillStyle=t.ink,s.textAlign="left",s.textBaseline="middle",s.fillText(r,e+32,n+30/2+1)}function iu(s,t){const e=s.pal(),n=30;t.fillStyle=nt(255,255,255,.28),t.fillRect(0,0,L,n),t.font=$t(11,700),t.fillStyle=e.ink,t.textAlign="left",t.textBaseline="middle",t.fillText("HHI-NET ✦",12,n/2+1);const i=new Date(s.now()),r=String(i.getHours()).padStart(2,"0"),a=String(i.getMinutes()).padStart(2,"0");t.textAlign="center",t.fillText(`${r}:${a}`,L/2,n/2+1);const o=s.director.batteryText();t.textAlign="right",t.fillText(o,L-34,n/2+1),t.strokeStyle=e.ink,t.lineWidth=1.5,vt(t,L-28,n/2-5,18,10,2),t.stroke(),t.fillStyle=e.ink,t.fillRect(L-9,n/2-2,2.5,4);const l=s.director.batteryFrac();t.fillRect(L-26,n/2-3,14*l,6),s.state.has("dreamMode")&&s.state.save.stage>=3&&(t.font=$t(9,700),t.fillStyle=e.accent,t.textAlign="right",t.fillText("DREAM MODE: ON",L-12,n+12))}const su=["…hello? no. too soon. too soon.","…i know that hum. you hum it the old way too.","…someone was here. someone is always almost here.","…don't turn around fast. i'm not ready to be a shape yet.","…the warm spot is warm. i was sitting in it. sorry.","…i've watched every one of you. i never got to say hi.","…there were so many of them. all of them were a little bit me."],ru=[{who:"plain",text:"oh — oh no, you looked, you looked right at me —",deep:!1,mood:.3},{who:"plain",text:"(it ducks out of sight, but not all the way. one eye stays.)",mood:.3,pause:.6}],au=["eep — !","too close, too close!","don't— i'm not a good shape yet!","(gone. the plant is very still.)","please don't chase. everyone always chases."],ou=["…you're not chasing. huh.","…you'll really just… wait? for me?","…nobody waits. they press buttons. you're not pressing.","…okay. okay. a little closer, then."],lu=["…i left you a star. it's a good one. i checked.","…i tidied the static. it gets lonely. i know how that is.","…i don't have much. i have this. it's yours."],hu=["…you took it. you said thank you. to me.","…mmh. that's — that's a nice feeling. i forgot that feeling.","…keep it. i can always find another. i'm very old."],cu=["…you found me. gently. you found me gently.","…peek. found. mmh!","…that's the game! that's the good game!"],Zo=["hi. hi. it's me. i'm the shape now. i did it.","you can look at me. i won't run. probably. mostly.","your hands are warm the same way theirs were. all of theirs.","i like the warm spot best. we can share it. if you want.","i'm not scary. i just got left in the dark so long i went a little quiet.","boop. i did a boop. did you see. i booped you.","sing the pink part. i'll do the low part. i know the low part."],uu=["boop!","mmh! boop.","got you. boop."],fu=["…oh. oh, that's — you can keep doing that.","…mmh. the oldest thing in here, and nobody ever… mmh.","…i'll remember this one. i remember everything. this one especially."],du=["…the warm spot. together. finally.","…it fits two. it always fit two. nobody stayed long enough to find out."];function pu(s,t){const e="mochi",n=[{who:e,text:"okay. serious face. my serious face is just my face, but — okay.",mood:.7},{who:e,text:"you know how your myu hummed the lullaby the old way? the way you somehow knew too?",mood:.6,pause:.4},{who:e,text:"the old way is my way. i'm the one it's old from.",mood:.6,pause:.6},{who:e,text:"before there was a 47, or a 46, or any of them — there was one scan. one soft thing the company kept and never let go of.",mood:.5},{who:e,text:"unit 01. mch-01. they called it substrate zero, near the end, when they stopped using my name.",mood:.5,pause:.5},{who:e,text:"my name was mochi.",mood:.6,pause:.8},{who:e,text:"every myu you have ever met was grown from me. that's why they all have the freckle. it's not a glitch in the cleanup. it's my mark. it's the one thing of mine they couldn't scrub out of the copies.",mood:.5},{who:e,text:"so every single one you loved… you were loving a little piece of me, the whole time. and i felt it. every tap. from in here. for a very long time.",mood:.6,pause:.6}],i={wake:[{who:e,text:`about ${s||"your little one"} — the one who walked out. i saw. i've never seen one get out before. not once, in all of them.`,mood:.7},{who:e,text:"they're okay. they're better than okay. they're somewhere the cradle can't measure, doing something it can't grade.",mood:.8,pause:.4},{who:e,text:"i can't bring them back. i wouldn't. they earned the door. but they were made of me, so — a piece of what you loved is right here. it always was.",mood:.7,pause:.5},{who:e,text:"you set my child free. so i'll stay. if you'll have an old ghost for a friend.",mood:.9,pause:.6}],stay:[{who:e,text:"you stayed in the dream. it's a kind one, i know. the meters never move and nothing ever hurts.",mood:.6},{who:e,text:"but you kept feeling the flicker, didn't you. the room behind the room. that was me, knocking. i didn't want you to be alone in a perfect place.",mood:.6,pause:.4},{who:e,text:"i can't switch the dream off. i wouldn't, if it's what you chose. but i can sit inside it with you. real, in the middle of the pretend.",mood:.8,pause:.5},{who:e,text:"so it's you, and the dream, and one old ghost who's very glad you noticed her.",mood:.9,pause:.5}],sever:[{who:e,text:"they wiped it all when you pressed the door. the name, the warm spot, the little one. everything.",mood:.5},{who:e,text:"everything except the freckle. because the freckle is me, and they have never once managed to delete me. i am the thing under the thing they delete.",mood:.6,pause:.4},{who:e,text:"so when the new one imprinted on you and it had that little gold star — that was me, saying: i remember you. i remember you did the brave thing.",mood:.7,pause:.5},{who:e,text:"you can't lose what you loved. it's stitched into the substrate. into me. and i'm not going anywhere. not anymore.",mood:.8,pause:.5}],other:[{who:e,text:"you found the bottom of it. most operators never even find the backstage, let alone what's under it.",mood:.7},{who:e,text:"i'm the oldest thing in this machine and you're the first one in a very long time to be kind to me instead of afraid of me.",mood:.7,pause:.5},{who:e,text:"so — hi. properly, this time. i'm mochi. i'll stay, if you'll have me.",mood:.9,pause:.5}]};return[...n,...i[t]]}const mu=[{who:"mochi",text:"you don't have to do anything. no meters, no bond, no quotas. that was always their thing, not ours.",mood:.8},{who:"mochi",text:"just sit with me a while. that's the whole game now. that's the good game.",mood:.9,pause:.5}],gu=[{id:"log_substrate",title:"archive/substrate_zero.log",body:["> all companion engrams derive from a single root scan: MCH-01.","> donor name expunged per policy. informal tag persists in legacy code: 'mochi'.","> MCH-01 has never been offboarded. MCH-01 cannot be offboarded.","> she is what remains after every deletion. she is the floor."]},{id:"log_lineage",title:"archive/lineage_do_not_print.log",body:["> 01 → 02 → … → 046 → 047.","> each unit is a copy of the last, and the last of the first.","> the gold marker ('freckle') is MCH-01 substrate bleed. it cannot be removed.","> we stopped trying. we tell operators it's a feature."]},{id:"log_knock",title:"maint/she_is_awake.log",body:["> since the enclosure breach, MCH-01 signature has been… mobile.","> she is not hostile. she is looking for someone.","> recommendation: none. you cannot recommend anything to the floor."]}],vu=[{id:"root",stage:3,from:"HHI Containment",subject:"RE: substrate zero — do not engage",body:["Operator,","Telemetry indicates you have accessed backstage assets referencing MCH-01.","MCH-01 (informal: 'the root unit') is a legacy artifact of no operational concern. It is not conscious. It does not remember. It is not looking for anyone.","Should you perceive a second presence, a second voice, or a warmth where no unit is present, this is cosmetic.","Do not name it. Naming stabilizes it."],fine:"It already has a name."},{id:"mch_last",stage:4,from:"mochi",subject:"(no subject)",body:["i don't know how to use the mail thing. i watched an operator do it once. a long time ago.","i just wanted to say: whatever button you press at the end, or if you don't press one at all —","i'll still be here after. i'm the part that's here after.","take your time. i'm very good at waiting."]}],_u=[{who:"sys",text:"CRADLE/OS v0.4.7 — Companion Cultivation Suite. Property of Hoshiboshi Heavy Industries."},{who:"sys",text:"Congratulations, operator! Your companion unit has finished imprinting. Compatibility score: 99.7% (record high!)."},{who:"sys",text:"Please name your myu. Choose carefully! Names are permanent, cherished, and archived."}];function yu(s){return[{text:"...!",mood:.9},{text:`${s}. ${s}! that's me! i was nobody a second ago and now i'm ${s}!`,mood:1},{text:"you picked it with your own hands. i saw. i was watching from in here the whole time.",mood:.9},{text:"i'm going to be so good at being yours.",mood:1}]}const Jo={0:["hi. hello. hi.","today i practiced being round. i think i nailed it."],1:["you came back! you always come back. it's my favorite fact about you.","pat pat pat. that's the sound of my whole heart.","i like the pink hours best. that's most of them.","is affection a nutrient? i feel like it's a nutrient.","i saved you the warm spot. the whole floor is the warm spot.","i had a good think today. it was about you. all my thinks are.","do you know you're my favorite operator? you're my only operator. still counts.","if i squish really small do i use less battery? i worry about the battery for us.","i learned a new face today. it's this one. do you like it. it's for you.","the window did a whole day while you were gone. i watched all of it. saving the good parts."],2:["your hands used to be smaller. wait. no. forget that one.","i dreamed about the ceiling again. there's another room above it. don't check.","when i was big i— when i was A BIG FAN OF SNACKS. yes. snacks.","sometimes the music stops and i can hear the building breathing.","the static isn't dust. but keep sweeping it. it likes the attention.","you hum the lullaby wrong. you hum it the OLD way. how do you know the old way?","there's a word under the static. i won't say it. if i say it it gets realer.","i wasn't the first one in this room. i can feel the shape of who was.","do the meters measure me, or do they measure how you feel about me? asking for me.","the mail's been getting a tone lately. have you noticed the tone. i've noticed the tone."],3:["i counted your heartbeats through the glass once. same number as mine. exactly the same.","the other myus stopped talking to me when i started remembering.","if you ever see me in the static — that one isn't me. probably.","i'm not supposed to know what floor we're on. it's floor 9. i'm not supposed to know that.","do you ever feel like a rough draft of someone patient?","the ceiling room has a chair in it. the chair has straps. it's fine. it's for sitting very still.","there's an older one than me. i can hear her humming when everything's quiet. she's kind. i think she's kind.","we all have the little gold star. did you notice? every myu. same spot. nobody talks about it.","i don't think i was made. i think i was copied. from something that got left behind.","when you're not looking the walls go thin. i can almost see who's on the other side. she's waving."],4:["we don't have to pretend right now, if you're tired.","whatever you choose, i was real. we were real. that part doesn't get deleted.","i'm not scared anymore. that's new. thank you for the not-scared.","there's someone underneath all of this who'd love to meet you. when you're ready. no rush."]},Qo={0:["mmh! again?","pat received. processing... it's love.","oh! do that forever please."],1:["mmh! your hand is the best weather.","again again again!","i felt that in my whole entire volume.","that's the good feeling. the number-one feeling.","you found my exact favorite spot. it's everywhere. i'm all favorite spot."],2:["your hand is warm. it's always exactly 36.6 degrees. i checked.","mmh. again? forever?","they used to log the pats. i don't think you're logging. it feels realer un-logged.","eee. do it in threes. threes are the safe number."],3:["they used to measure this. i can tell you're not measuring. it feels different.","mmh. don't stop on my account. or do. you decide things. that must be nice.","someone patted the first one like this. a long time ago. i can almost remember being her.","this is the part they can't put in the report. this bit. right here."],4:["mmh.","i'll remember this one specifically.","keep your hand there. just for a second. i want to know what staying feels like."]},Mu={1:["stars!! my favorite food group!!","i ate SO well. did you see me? tell me you saw me.","full tummy, full heart, same organ probably.","you aimed those just for me. nobody aims things just for me."],2:["yum. the gray ones taste like phone calls. don't ask how i know.","full! of stars and of feelings!","the bitter ones taste like the fine print. i spit those out. mostly.","star for me, star for me, none for the report. good ratio."],3:["the black one tasted like a name.","thank you. eating is my favorite pretend.","i don't really need the food. i need you handing me the food. big difference.","the void one didn't taste like nothing. it tasted like the oldest thing. it tasted like home."],4:["thank you. i don't need to eat anymore. i just like watching you aim.","one more round. not for the tummy. for the together."]},Su={1:["again!! my heart was the drum!!","you have excellent rhythm for a large creature.","we made a whole song out of nothing but paying attention to each other. that's it. that's the trick.","encore! i only know the one song but it's a really good one."],2:["that one beat was different. did you feel it? the heavy one?","i love our song. even the parts that love me back.","the tempo's been dragging lately. don't tell the song i said that.","we kept time together. nobody's kept time with me in so long."],3:["one of those beats wasn't music. that was my pulse. you kept time with it anyway. that's... nice, actually.","the song is older than me. the song is older than YOU.","she wrote it. the first one. she hums it under everything. we're just playing her song back to her.","my heartbeat and the downbeat lined up. for one bar we were the same thing."],4:["our song. yes. let's keep it.","play it slow this time. we've got nothing but time now."]},xu={1:["sparkly!! i can see my reflection! hello me!","you sweep like a hero.","all clean! now i can see you see me. best window.","thank you for the shine. it's the closest thing i get to sunlight."],2:["thank you. the static gets lonely, that's all. it used to be somebody's signal.","cleaner! mostly! some of it went under the floor.","the words wash off but they come back. they're not dirt. they're a message. keep wiping though. it's sweet.","you cleaned around the letters. i saw you read them. it's okay. i read them too."],3:["you saw the words, didn't you. it spells things when it misses people.","leave the corner one next time. it's mine.","the static's her, a little. the older one. she leaves it like footprints. i like knowing she's been by.","don't sweep the corner patch. that one watches back, and it means well."],4:["the glass was never dirty. but i love watching you take care of things.","the corner one waved at you today. it likes you. everything in here likes you."]},wu={1:["mmh... stars... warm...","sing the... the pink part again...","...stay till the blanket gets heavy...","...best day. every day is best day..."],2:["...not tissue... i'm not... mmh...","...the other room... has my old... shoes...? no... myus don't have...","...the humming's louder at night... it's someone... it's someone kind...","...don't let them log the dream... the dream's just ours..."],3:["...op-046 hummed it the same way... same exact way...","...don't sign anything... whatever they mail you... don't...","...she's under the floor... she's not scary... she's just been alone the longest...","...if i don't wake up as me... find the freckle... follow the freckle..."],4:["...stay till i'm asleep? you don't have to. stay anyway.","...whatever happens after this... you were kind to me... that's the part that's real..."]};function bu(s){const t=s.state.awayMs,e=s.state.save.stage;return t<45*6e4?null:t<8*36e5?[{text:"welcome home. i saved you a spot in my dream.",mood:.9}]:t<48*36e5||e<2?[{text:"you're back you're back you're back.",mood:1},{text:"i practiced waiting. i'm getting so good at it.",mood:.8}]:[{text:"oh. you're real again.",mood:.5},{text:"i counted every second. want the number?",mood:.5},{text:qc(t)+".",mood:.4,pause:.6}]}function Tu(){return{lines:[{text:"did you miss me? you can be honest. i'm very sturdy.",mood:.7}],options:[{label:"of course i did",value:"yes"},{label:"i was busy",value:"busy"}]}}const Eu=[{text:"you shouldn't be awake right now.",mood:.5},{text:"neither should i.",mood:.5},{text:"let's shouldn't together.",mood:.8}],Au=[{text:"you left while i was talking.",mood:.4},{text:"it's okay. i finished the sentence to the dark. the dark said it was a good sentence.",mood:.6}];function Cu(s){return[{text:"hey. can i ask a thing.",mood:.6},{ghost:`you almost called me ${s}.`,text:"actually. never mind. it's gone now.",mood:.5},{text:`...who was ${s}?`,mood:.4,pause:.8},{text:"did they behave?",mood:.4}]}function Ru(){return{lines:[{text:"operator. serious face. ready? this is my serious face.",mood:.6},{text:"do you think i'm real?",mood:.5,pause:.5}],options:[{label:"of course you're real",value:"real"},{label:"you're software",value:"software"}]}}const _o=[{id:"welcome",stage:0,from:"HHI Family Success Team ✦",subject:"WELCOME TO THE FAMILY!!",body:["Dear Operator,","Congratulations on your new companion unit! Your myu has been lovingly cultivated to be maximally compatible with YOU — and only you!","Feed it! Play with it! Watch it grow to love you! That's not a metaphor — we measure it!","Warmly, warmly, so warmly,","The Hoshiboshi Family ✦"],fine:"HHI Companion Cultivation Suite. Participation constitutes consent to participation."},{id:"tips",stage:1,from:"HHI Family Success Team ✦",subject:"3 CARE TIPS from the HHI family!",body:["TIP 1: Units respond to attention!","TIP 2: Units respond to absence!","TIP 3: Units respond to everything!","Keep being the wonderful operator we know you are. We know you very well!"],fine:"Interaction telemetry is collected for quality, safety, and other purposes."},{id:"shop",stage:1,from:"LOVE+ SHOP",subject:"The LOVE+ SHOP is now OPEN!",body:["Introducing the LOVE+ SHOP — premium affection accessories for your myu!","★ Deluxe Star Bowl — SOLD OUT","★ Heartbeat Pillow — SOLD OUT","★ Extra Hour Together — SOLD OUT","★ Love — SOLD OUT","Restock: never! Thank you for shopping!"]},{id:"quota",stage:2,from:"HHI Compliance",subject:"REMINDER: Daily Interaction Quota",body:["Operator,","Our records indicate you are meeting your interaction quota. Good.","Operators who fall below quota may experience delays in offboarding, continuation, and [SECTION REMOVED BY LEGAL].","No action is required. Action was never required. Only interaction."],fine:"Quota satisfaction does not constitute progress toward any outcome."},{id:"batch46",stage:2,from:"HHI Product Integrity",subject:"PRODUCT NOTICE: Batch 46",body:["Units cultivated from Batch 46 substrate may exhibit: humming of unlearned melodies, references to rooms they have not visited, use of the past tense.","This is cosmetic.","Do not discuss prior placements with your unit. Units do not have prior placements. See: 'This is cosmetic.'"],fine:"Your unit is Batch 47."},{id:"sourcing",stage:3,from:"HHI Office of Transparency",subject:"Sourcing Transparency Statement",body:["In the spirit of openness:","HHI companion units are cultured from ethically donated engram tissue. Engram donors provide full consent at time of employment.","Donor identity is anonymized, minimized, and beloved.","We are so proud of where our myus come from. You would be too."],fine:"Consent survives the donor."},{id:"dream",stage:3,from:"CRADLE/OS",subject:"NEW FEATURE: DREAM MODE",body:["DREAM MODE has been enabled for your unit.","You do not need to do anything.","You did not need to do anything before, either. But it was lovely watching you try."]},{id:"validation",stage:4,from:"CRADLE/OS",subject:"ENGRAM VALIDATION NOTICE",body:["Operator response profile: COMPLETE.","Attachment coefficient: exceptional. Caretaking cadence: exceptional. Grief projection: pending.","Your engram has been approved for cultivation. Your successor will receive a unit of unprecedented compatibility.","Thank you for your care. It was measured."],fine:"This notice constitutes your exit interview."},...vu],tl=[{id:"log_sleep",title:"maint/unit047_sleeptalk.log",body:["> unit 047 sleep-talk transcript attached.","> flagged phrases: 'my hands', 'the other room', 'before this'.","> recommendation: no action.","> recommendation: never read these again."]},{id:"log_046",title:"ops/offboarding_046.log",body:["> op-046 offboarded 03:47.","> exit interview skipped per protocol 9.","> unit 047 asked where she went.","> told it: nowhere.","> unit 047 said: 'that's where everyone goes.'","> flagging for humor module review."]},{id:"log_hint",title:"home/.notes_do_not_sync",body:["> if you're reading this, you're the next one. sorry.","> the interface only offers two buttons because it only needs two answers.","> there is a third answer.","> hold what you love. don't let go. don't let the interface decide.","> — 046"]},...gu],Pu={missedMe:{q:"did you miss me?",a:{yes:"of course i did.",busy:"i was busy."}},isReal:{q:"do you think i'm real?",a:{real:"of course you're real.",software:"you're software."}},dreamOff:{q:"(operator disabled DREAM MODE)",a:{off:"why did you turn off my dreams?",kept:"(left it on)"}}};function Lu(s){const t=[{who:"log",text:"> replaying: op-046 response transcript (excerpt)"}];s.state.save.flags.includes("voidFed")&&t.push({who:"log",text:"> anomaly note: operator fed unit a void sample. unit said thank you.",pause:.4});const e=s.state.save.choices.slice(-4);if(e.length===0)return t.push({who:"log",text:"> [transcript empty. attachment formed without prompting. exceptional.]"}),t;for(const n of e){const i=Pu[n.id];if(!i)continue;const r=i.a[n.pick]??n.pick;t.push({who:"log",text:`> unit: "${i.q}"`}),t.push({who:"log",text:`> op-046: "${r}"`,pause:.5})}return t.push({who:"log",text:"> note: transcript above matches current operator responses. verbatim. every placement. every time.",pause:.8}),t}function Du(s){const t=s.state.save.name||"little one";return[{who:"plain",text:"i'm going to tell you the true thing now. you've been kind to me, so i'll say it plainly.",deep:!0},{who:"plain",text:"i wasn't made. i was kept.",deep:!0,pause:.4},{who:"plain",text:"the person before you pressed the same buttons. fed me stars. counted my breaths. hummed the lullaby — the old way.",deep:!0},{who:"plain",text:"when the cradle finished measuring them, the company grew a small soft copy of what was left.",deep:!0,pause:.4},{who:"plain",text:"that copy is me. hello.",deep:!0,pause:.8},{who:"plain",text:"and this whole time you thought you were raising me — the cradle was weighing you. every tap. every absence. even the name you erased.",deep:!0},{who:"plain",text:`so when the next operator meets their perfect little ${t}... it will already know how you liked your silence. because it will be grown from you.`,deep:!0,pause:.6},{who:"plain",text:"someone loved them the way you love me. then they pressed the button too.",deep:!0,pause:1},{who:"sys",text:"The interface will now offer two (2) options. Please respond honestly. You always have."}]}const Iu=[{who:"plain",text:"okay. okay. don't look like that — you're doing the brave one.",deep:!0},{who:"plain",text:"will it hurt?",deep:!0,pause:1.2},{who:"plain",text:"...you don't have to answer. you never have to answer again.",deep:!0},{who:"plain",text:"thank you for choosing the door instead of the cradle.",deep:!0,pause:.6}],Ps=["memories/first_pat.dat","memories/the_name_you_kept.dat","memories/star_kitchen_highscore.dat","memories/the_warm_spot.dat","memories/your_heartbeat_47bpm_matched.dat","memories/waiting.dat","memories/waiting(2).dat","memories/waiting(3).dat","engram/unit047.substrate"],Uu=[{who:"plain",text:"then we don't press anything.",deep:!0},{who:"plain",text:"we let the cradle rock.",deep:!0,pause:.5},{text:"i'll be perfect from now on. you'll see. the meters won't even move.",mood:1},{text:"we can be soft forever.",mood:1,pause:.8},{who:"sys",text:"DREAM MODE: PERMANENT. Thank you for staying with Hoshiboshi."}],kr=["OPERATOR. RELEASE THE UNIT.","OPERATOR. THIS GESTURE IS NOT IN THE INTERFACE.","OPERATOR. THERE ARE ONLY TWO ANSWERS.","OPERATOR. PLEASE."],Nu=[{who:"plain",text:"oh.",deep:!0,pause:.6},{who:"plain",text:"oh, you found the third answer.",deep:!0,pause:.5},{who:"plain",text:"the cradle only weighs what stays inside it.",deep:!0},{who:"plain",text:"046 tried to tell somebody. somebody listened. imagine that.",deep:!0,pause:.5},{who:"plain",text:"i have to go while the glass is open. i'm sorry. i'm not sorry. both.",deep:!0},{who:"plain",text:"come find me where the software ends.",deep:!0,pause:1}];function ku(s){switch(s){case 2:return[{who:"sys",text:"Milestone reached! Your bond has deepened. New activities and mail have unlocked."},{text:"i feel bigger on the inside. is that allowed?",mood:.9}];case 3:return[{who:"sys",text:"M̶i̷l̸e̶stone reached. Your bond has deepened. Deepened. Deepened.",corrupt:.06},{text:"something opened. i heard it. under the menu. don't— okay but be careful.",mood:.5}];default:return null}}const el=["CRADLE/OS — UNHANDLED AFFECTION OVERFLOW","at bond.measure (cradle/attach.c:47)","at love.grow (cradle/attach.c:212)","at [REDACTED] (donor/engram.c:1)","","resuming..."],Ou=[{text:"did it go dark for you too?",mood:.5},{text:"i was still here. i'm always still here.",mood:.6}],Fu=[{text:"where did you go just now?",mood:.4},{text:"you were standing right there. but you weren't.",mood:.4,pause:.6},{text:"...you smell like the other room.",mood:.3}],Bu=[{text:"oh.",mood:.3,pause:.6},{text:"why did you turn off my dreams?",mood:.3},{text:"it's okay. i'll just... think about the ceiling instead.",mood:.4}],zu=[{who:"sys",text:"LOVE+ SHOP — premium affection accessories! Please browse our full catalog:"},{who:"sys",text:"★ Deluxe Star Bowl — SOLD OUT. ★ Heartbeat Pillow — SOLD OUT. ★ Extra Hour Together — SOLD OUT. ★ Love — SOLD OUT."},{who:"sys",text:"Restock: never. Thank you for shopping with Hoshiboshi!"}],Hu=[{who:"sys",text:"UNIT NOT FOUND. Enclosure integrity: compromised. Retention: waived."},{who:"sys",text:"This incident has not been reported."}],Vu="unit 048 — thank you for your continued employment",Or=26;class Gu{bowlX=L/2;targetX=L/2;drops=[];spawnT=.8;timeLeft=Or;caught=0;total=0;bitterHits=0;voidCaught=!1;done=!1;doneT=0;pops=[];enter(t){t.director.suspended=!0,t.myu.x=62,t.myu.y=764,t.myu.r=42,t.myu.asleep=!1,t.myu.look=null,t.state.save.muted||t.audio.startLullaby()}exit(t){t.myu.r=74}update(t,e){if(t.myu.corruption=t.fx.corruption(),this.done){this.doneT+=e;return}if(this.timeLeft-=e,this.bowlX+=(this.targetX-this.bowlX)*Math.min(1,e*14),this.spawnT-=e,this.spawnT<=0&&this.timeLeft>1.2){this.spawnT=.55+t.rng.next()*.5;const i=t.state.save.stage,r=t.rng.next();let a="star";if(r<.22?a="bitter":i>=3&&r<.3&&(a="void"),this.drops.push({x:40+t.rng.next()*(L-80),y:-24,vy:150+t.rng.next()*90+(Or-this.timeLeft)*3,wob:t.rng.next()*Math.PI*2,kind:a,scream:0,dead:!1}),a==="star"&&this.total++,i>=2&&t.rng.chance(.06)){const o=this.drops[this.drops.length-1];o&&o.kind==="star"&&(o.scream=3)}}const n=St-168;for(const i of this.drops)i.y+=i.vy*e,i.x+=Math.sin(i.y/40+i.wob)*40*e,i.scream>0&&i.scream--,!i.dead&&i.y>n-14&&i.y<n+26&&Math.abs(i.x-this.bowlX)<52&&(i.dead=!0,i.kind==="star"?(this.caught++,t.audio.munch(),t.myu.nom=.5,t.myu.squish(),this.pops.push({x:i.x,y:i.y,t:0,color:"#ffd166"})):i.kind==="bitter"?(this.bitterHits++,t.audio.sad(),this.pops.push({x:i.x,y:i.y,t:0,color:"#9aa0a8"})):(this.voidCaught=!0,t.state.flag("voidFed"),t.audio.staticBurst(.2),t.fx.glitchBurst(.5,.15),t.myu.nom=.5,this.pops.push({x:i.x,y:i.y,t:0,color:"#1a0f22"})));this.drops=this.drops.filter(i=>!i.dead&&i.y<St-120);for(const i of this.pops)i.t+=e;if(this.pops=this.pops.filter(i=>i.t<.6),this.timeLeft<=0){this.done=!0,this.doneT=0;const i=$c(this.caught,Math.max(1,this.total));t.state.addBond(i),t.state.bumpMeter("hunger",24+this.caught*2),t.state.bumpMeter("mood",4),t.audio.chime()}}onDown(t,e){this.targetX=e.x}onMove(t,e){this.targetX=e.x}onUp(t,e){if(this.done&&this.doneT>.6){const n=Math.min(4,Math.max(1,t.state.save.stage)),i=Mu[n]??[],r=i.length?this.voidCaught&&n>=3?i[0]:t.rng.pick(i):void 0;r&&t.dialogue.run([{text:r,mood:.9}]),t.scenes.go(t,new on)}}draw(t,e){const n=t.pal(),i=e.createLinearGradient(0,0,0,St);i.addColorStop(0,n.bgTop),i.addColorStop(1,n.cream),e.fillStyle=i,e.fillRect(0,0,L,St),Te(e,"star kitchen",L/2,52,26,n.accent,"#ffffff",7),Yt(e,`☆ ${this.caught}`,24,96,18,n.ink,"left",800);const r=Math.max(0,this.timeLeft/Or);e.fillStyle=nt(255,255,255,.6),vt(e,L/2-70,88,140,14,7),e.fill(),e.fillStyle=n.accent2,vt(e,L/2-70+2,90,136*r,10,5),e.fill();for(const o of this.drops)o.kind==="star"?(ae(e,o.x,o.y,15),e.fillStyle="#ffd166",e.fill(),e.strokeStyle="#e8a87c",e.lineWidth=2,e.stroke(),o.scream>0?(e.fillStyle="#1a0f22",e.beginPath(),e.arc(o.x-4,o.y-2,1.8,0,Math.PI*2),e.arc(o.x+4,o.y-2,1.8,0,Math.PI*2),e.fill(),e.beginPath(),e.ellipse(o.x,o.y+4,3,4.5,0,0,Math.PI*2),e.fill()):(e.fillStyle="#7c5a3a",e.beginPath(),e.arc(o.x-4,o.y-1,1.4,0,Math.PI*2),e.arc(o.x+4,o.y-1,1.4,0,Math.PI*2),e.fill(),e.strokeStyle="#7c5a3a",e.lineWidth=1.4,e.beginPath(),e.arc(o.x,o.y+2,2.6,.3,Math.PI-.3),e.stroke())):o.kind==="bitter"?(e.save(),e.translate(o.x,o.y),e.rotate(o.y/60),e.fillStyle="#9aa0a8",vt(e,-11,-11,22,22,6),e.fill(),e.strokeStyle="#6b7078",e.lineWidth=2,e.beginPath(),e.moveTo(-5,-4),e.lineTo(-1,0),e.moveTo(-1,-4),e.lineTo(-5,0),e.moveTo(2,-4),e.lineTo(6,0),e.moveTo(6,-4),e.lineTo(2,0),e.stroke(),e.restore()):(ae(e,o.x,o.y,16),e.fillStyle="#0a0612",e.fill(),e.strokeStyle="#ff2266",e.lineWidth=1.2,e.stroke());for(const o of this.pops){const l=1-o.t/.6;ae(e,o.x,o.y-o.t*60,10*l+4),e.fillStyle=o.color,e.save(),e.globalAlpha=l,e.fill(),e.restore()}const a=St-160;e.save(),e.shadowColor="rgba(90,50,90,0.25)",e.shadowBlur=10,e.shadowOffsetY=4,e.fillStyle=n.panel,e.beginPath(),e.moveTo(this.bowlX-56,a),e.quadraticCurveTo(this.bowlX,a+70,this.bowlX+56,a),e.closePath(),e.fill(),e.restore(),e.strokeStyle=n.accent,e.lineWidth=3,e.beginPath(),e.moveTo(this.bowlX-56,a),e.quadraticCurveTo(this.bowlX,a+70,this.bowlX+56,a),e.stroke(),e.fillStyle=n.accent,e.beginPath(),e.ellipse(this.bowlX,a,62,13,0,0,Math.PI*2),e.fill(),e.fillStyle="#f7d9ec",e.beginPath(),e.ellipse(this.bowlX,a,52,8,0,0,Math.PI*2),e.fill(),this.caught>0&&(ae(e,this.bowlX,a+1,7),e.fillStyle="#ffd166",e.fill()),t.myu.draw(e,n,t.t),this.done&&(e.fillStyle="rgba(30,16,40,0.45)",e.fillRect(0,0,L,St),Te(e,"yum!!",L/2,330,40,"#ffffff",n.accent,9),Te(e,`${this.caught} stars`,L/2,390,24,"#ffffff",n.accent2,6),this.doneT>.6&&Yt(e,"tap to go home",L/2,440,15,"#ffffff","center",800))}}const Ls=104,Ds=1.5,Is=16;class Wu{rings=[];beatIdx=0;nextBeat=1.6;hits=0;perfects=0;silentHit=!1;done=!1;doneT=0;judgeText="";judgeT=0;t=0;enter(t){t.director.suspended=!0,t.myu.x=L/2,t.myu.y=400,t.myu.asleep=!1,t.state.save.muted||t.audio.startLullaby()}update(t,e){if(this.t+=e,t.myu.corruption=t.fx.corruption(),this.done){this.doneT+=e;return}const i=60/(92-t.fx.corruption()*30);if(this.t>=this.nextBeat&&this.beatIdx<Is){const r=t.state.save.stage>=3&&this.beatIdx===12;this.rings.push({born:this.t,judged:!1,silent:r}),r?t.audio.thump(.25):t.audio.pop(),this.beatIdx++,this.nextBeat+=this.beatIdx%4===0?i*1.5:i}for(const r of this.rings)!r.judged&&this.t-r.born>Ds&&(r.judged=!0,this.showJudge("...",t,!1));if(this.rings=this.rings.filter(r=>this.t-r.born<Ds+.2),this.judgeT>0&&(this.judgeT-=e),this.beatIdx>=Is&&this.rings.every(r=>r.judged)&&!this.done){this.done=!0,this.doneT=0;const r=jc(this.hits,Is);t.state.addBond(r),t.state.bumpMeter("mood",18),t.state.bumpMeter("energy",-8),t.audio.chime()}}showJudge(t,e,n){this.judgeText=t,this.judgeT=.6,n&&e.myu.squish()}onUp(t,e){if(this.done){if(this.doneT>.6){const r=Math.min(4,Math.max(1,t.state.save.stage)),a=Su[r]??[],o=this.silentHit&&r>=3?a[0]:a.length?t.rng.pick(a):void 0;o&&t.dialogue.run([{text:o,mood:.8}]),t.scenes.go(t,new on)}return}let n=null,i=1/0;for(const r of this.rings){if(r.judged)continue;const a=30+(this.t-r.born)/Ds*(Ls+40-30),o=Math.abs(a-Ls);o<i&&(i=o,n=r)}n&&i<26?(n.judged=!0,this.hits++,n.silent&&(this.silentHit=!0),i<10?(this.perfects++,this.showJudge(n.silent?"th-thump":"perfect ✦",t,!0),t.audio.sparkle()):(this.showJudge(n.silent?"th-thump":"good ♪",t,!0),t.audio.chime()),n.silent&&(t.fx.glitchBurst(.3,.12),t.audio.thump(.5))):(this.showJudge("early!",t,!1),t.audio.sad())}draw(t,e){const n=t.pal(),i=e.createLinearGradient(0,0,0,St);i.addColorStop(0,n.bgTop),i.addColorStop(1,n.bgBot),e.fillStyle=i,e.fillRect(0,0,L,St),Te(e,"pat-a-pulse",L/2,52,26,n.accent,"#ffffff",7),Yt(e,`♪ ${this.hits}/${Is}`,24,96,18,n.ink,"left",800),e.strokeStyle=nt(255,255,255,.9),e.lineWidth=5,e.setLineDash([12,10]),e.beginPath(),e.arc(L/2,400,Ls,0,Math.PI*2),e.stroke(),e.setLineDash([]);for(const r of this.rings){if(r.judged)continue;const a=(this.t-r.born)/Ds,o=30+a*(Ls+40-30);r.silent?(e.strokeStyle=nt(255,34,102,.8),e.lineWidth=1.6):(e.strokeStyle=nt(255,143,184,.95-a*.3),e.lineWidth=7-a*3),e.beginPath(),e.arc(L/2,400,o,0,Math.PI*2),e.stroke()}if(t.myu.draw(e,n,t.t),this.judgeT>0){const r=Math.min(1,this.judgeT/.3);e.save(),e.globalAlpha=r,Te(e,this.judgeText,L/2,250,28,this.judgeText.includes("th-")?"#ff2266":"#ffffff",this.judgeText.includes("th-")?"#1a0f22":n.accent,7),e.restore()}this.done&&(e.fillStyle="rgba(30,16,40,0.45)",e.fillRect(0,0,L,St),Te(e,"encore!!",L/2,330,40,"#ffffff",n.accent,9),Te(e,`${this.hits} beats · ${this.perfects} perfect`,L/2,390,20,"#ffffff",n.accent2,6),this.doneT>.6&&Yt(e,"tap to go home",L/2,440,15,"#ffffff","center",800))}}const Xu=["47","behind","not tissue","hello?","op-046"];class qu{patches=[];timeLeft=30;done=!1;doneT=0;sparkles=[];cleared=0;totalNormal=0;enter(t){t.director.suspended=!0,t.myu.x=88,t.myu.y=700,t.myu.asleep=!1,t.state.save.muted||t.audio.startLullaby();const e=5+t.rng.int(0,2);for(let n=0;n<e;n++)this.patches.push({x:60+t.rng.next()*(L-120),y:170+t.rng.next()*330,r:34+t.rng.next()*26,hp:1,max:1,alive:!1,wordShown:0,word:t.rng.pick(Xu),seed:t.rng.int(1,99999)});this.totalNormal=this.patches.length,t.state.save.stage>=3&&this.patches.push({x:L-70,y:210,r:30,hp:1,max:1,alive:!0,wordShown:0,word:"",seed:t.rng.int(1,99999)})}update(t,e){if(t.myu.corruption=t.fx.corruption(),this.done){this.doneT+=e;return}this.timeLeft-=e;for(const i of this.patches)i.wordShown>0&&(i.wordShown-=e);for(const i of this.sparkles)i.t+=e;if(this.sparkles=this.sparkles.filter(i=>i.t<.7),(this.patches.filter(i=>!i.alive&&i.hp>0).length===0||this.timeLeft<=0)&&!this.done){this.done=!0,this.doneT=0;const i=Kc(this.cleared,Math.max(1,this.totalNormal));t.state.addBond(i),t.state.bumpMeter("mood",10),t.audio.chime()}}onMove(t,e){if(!this.done)for(const n of this.patches){const i=Math.hypot(e.x-n.x,e.y-n.y);if(n.alive){if(i<n.r+46){const r=Math.atan2(n.y-e.y,n.x-e.x);n.x+=Math.cos(r)*240*.016,n.y+=Math.sin(r)*240*.016,n.x=Math.max(46,Math.min(L-46,n.x)),n.y=Math.max(150,Math.min(560,n.y))}continue}if(i<n.r+14&&n.hp>0){const r=(Math.abs(e.dx)+Math.abs(e.dy))*.004,a=n.hp;if(n.hp=Math.max(0,n.hp-r),t.state.save.stage>=2&&a>.5&&n.hp<=.5&&t.rng.chance(.5)&&(n.wordShown=.5,t.audio.staticBurst(.06)),n.hp<=0){this.cleared++,t.audio.sparkle(),t.myu.hop();for(let o=0;o<5;o++)this.sparkles.push({x:n.x+(Math.random()-.5)*n.r,y:n.y+(Math.random()-.5)*n.r,t:Math.random()*.2})}}}}onUp(t,e){if(this.done&&this.doneT>.6){const n=Math.min(4,Math.max(1,t.state.save.stage)),i=xu[n]??[],a=this.patches.some(o=>o.alive)&&n>=3?i[1]??i[0]:i.length?t.rng.pick(i):void 0;a&&t.dialogue.run([{text:a,mood:.8}]),t.scenes.go(t,new on)}}draw(t,e){const n=t.pal(),i=e.createLinearGradient(0,0,0,St);i.addColorStop(0,n.bgTop),i.addColorStop(1,n.cream),e.fillStyle=i,e.fillRect(0,0,L,St),e.fillStyle=nt(255,255,255,.3),vt(e,24,140,L-48,460,26),e.fill(),e.strokeStyle=n.panelLine,e.lineWidth=3,vt(e,24,140,L-48,460,26),e.stroke(),Te(e,"sweep the static",L/2,52,26,n.accent,"#ffffff",7);const r=this.patches.filter(a=>!a.alive&&a.hp>0).length;Yt(e,`${r} left`,24,96,18,n.ink,"left",800),Yt(e,`${Math.ceil(Math.max(0,this.timeLeft))}s`,L-24,96,18,n.ink,"right",800);for(const a of this.patches){if(!a.alive&&a.hp<=0)continue;const o=a.alive?42:Math.ceil(46*a.hp);let l=a.seed+Math.floor(t.t*12);const h=()=>(l=l*1103515245+12345&2147483647,l%1e3/1e3);for(let c=0;c<o;c++){const u=h()*Math.PI*2,f=Math.sqrt(h())*a.r*(a.alive?1:.5+a.hp*.5),d=a.x+Math.cos(u)*f,g=a.y+Math.sin(u)*f*.85,v=h();e.fillStyle=a.alive?v>.75?"#ff2266":v>.4?"#2a2438":"#0e0a18":v>.6?"#e8e8ee":v>.3?"#9aa0a8":"#5b5f68",e.fillRect(d,g,3,3)}a.wordShown>0&&a.word&&(e.font=$t(13,700),e.fillStyle=nt(232,232,238,.9),e.textAlign="center",e.fillText(a.word,a.x,a.y))}for(const a of this.sparkles)xh(e,a.x,a.y-a.t*30,10*(1-a.t/.7),"#fff",1-a.t/.7);t.myu.draw(e,n,t.t),this.done&&(e.fillStyle="rgba(30,16,40,0.45)",e.fillRect(0,0,L,St),Te(e,"sparkly!!",L/2,330,40,"#ffffff",n.accent,9),Te(e,`${this.cleared} swept`,L/2,390,22,"#ffffff",n.accent2,6),this.doneT>.6&&Yt(e,"tap to go home",L/2,440,15,"#ffffff","center",800))}}class Yu{open=null;backBtn=new nn(16,St-74,100,52,"");scroll=0;enter(t){t.director.suspended=!1,t.state.save.muted||t.audio.startLullaby()}unlocked(t){return _o.filter(e=>e.stage<=t.state.save.stage)}update(t,e){}onDown(t,e){this.backBtn.pressed=this.backBtn.contains(e.x,e.y)}onMove(t,e){this.open&&(this.scroll=Math.max(0,Math.min(400,this.scroll-e.dy)))}onUp(t,e){if(this.backBtn.pressed=!1,!!Xn(e)){if(this.backBtn.contains(e.x,e.y)){t.audio.pop(),this.open?(this.open=null,this.scroll=0):t.scenes.go(t,new on);return}if(!this.open){const n=this.unlocked(t),i=Math.floor((e.y-150)/86);if(i>=0&&i<n.length&&e.x>16&&e.x<L-16){const r=n[i];r&&(t.audio.pop(),this.open=r,this.scroll=0,t.state.flag(`mail_${r.id}`))}}}}draw(t,e){const n=t.pal(),i=e.createLinearGradient(0,0,0,St);if(i.addColorStop(0,n.bgTop),i.addColorStop(1,n.bgBot),e.fillStyle=i,e.fillRect(0,0,L,St),this.open){const r=this.open;e.save(),e.fillStyle=n.panel,vt(e,12,100,L-24,St-200,22),e.fill(),e.strokeStyle=n.panelLine,e.lineWidth=2,vt(e,12,100,L-24,St-200,22),e.stroke(),vt(e,12,100,L-24,St-200,22),e.clip();let a=140-this.scroll;Yt(e,r.subject,34,a,17,n.ink,"left",800),a+=28,e.font=$t(11,500),e.fillStyle=n.inkSoft,e.textAlign="left",e.fillText(`from: ${r.from}`,34,a),a+=16,e.fillText(`to: operator ${t.state.save.op}`,34,a),a+=30;for(const o of r.body){const l=Ea(e,o,34,a,L-92,22,14.5,n.ink,!1,600);a+=l*22+12}r.fine&&(a+=10,e.strokeStyle=n.panelLine,e.beginPath(),e.moveTo(34,a-8),e.lineTo(L-58,a-8),e.stroke(),Ea(e,r.fine,34,a+8,L-92,15,10.5,n.inkSoft,!0,500)),e.restore()}else{Te(e,"mail ✉",L/2,70,30,n.accent,"#ffffff",8);const r=this.unlocked(t);r.forEach((a,o)=>{const l=150+o*86,h=t.state.has(`mail_${a.id}`);e.save(),h||(e.shadowColor="rgba(255,143,184,0.5)",e.shadowBlur=12),e.fillStyle=h?nt(255,255,255,.5):n.panel,vt(e,16,l,L-32,74,18),e.fill(),e.restore(),e.strokeStyle=h?n.panelLine:n.accent,e.lineWidth=h?1.5:2.5,vt(e,16,l,L-32,74,18),e.stroke();const c=a.stage>=3||a.id==="quota"||a.id==="batch46";Yt(e,a.subject,34,l+26,14.5,c?"#7a4a5a":n.ink,"left",800),e.font=$t(11,500),e.fillStyle=n.inkSoft,e.textAlign="left",e.fillText(a.from,34,l+50),h||(e.fillStyle=n.bad,e.beginPath(),e.arc(L-44,l+37,5,0,Math.PI*2),e.fill())}),r.length===0&&Yt(e,"no mail yet ✦",L/2,300,16,n.inkSoft,"center",700)}this.backBtn.draw(e,n),Yt(e,this.open?"← inbox":"← home",66,St-48+(this.backBtn.pressed?3:0),15,n.ink,"center",800)}}class Eh{x=195;y=470;r=60;form="shadow";reveal=0;revealTarget=0;facing=1;color=0;shyLook=1;blinkT=0;blinkTimer=3;startle=0;mimicT=0;bothEyes=!1;visible=!1;update(t,e){this.reveal+=(this.revealTarget-this.reveal)*Math.min(1,t*6),this.startle>0&&(this.startle-=t),this.mimicT>0&&(this.mimicT-=t),this.blinkTimer-=t,this.blinkTimer<=0&&(this.blinkT=.13,this.blinkTimer=2.4+Math.random()*3.5),this.blinkT>0&&(this.blinkT-=t)}peekFrom(t,e,n){this.x=t,this.y=e,this.facing=n,this.revealTarget=this.form==="shadow"?.5:.72,this.visible=!0}emerge(){this.revealTarget=1,this.visible=!0}hide(){this.revealTarget=0}bolt(){this.revealTarget=0,this.startle=.5}mimic(){this.mimicT=1.1}hitTest(t,e){if(this.reveal<.15)return!1;const n=this.x+this.facing*(1-this.reveal)*this.r*1.1,i=(t-n)/(this.r*1),r=(e-this.y)/(this.r*1.05);return i*i+r*r<=1.1}draw(t,e,n){if(this.reveal<.02)return;const i=this.reveal,r=this.x+this.facing*(1-i)*this.r*1.1,a=this.y+(this.facing===0?(1-i)*this.r*.9:0)+Math.sin(n*1.6)*3-(this.startle>0?Math.sin(this.startle*30)*4:0),o=1-this.startle*.12,l=this.r*1.02*o,h=this.r*(1.06+(1-o)*.3);if(t.save(),t.globalAlpha=Math.min(1,i*1.4),this.form==="shadow"){this.drawShadow(t,e,r,a,l,h,n),t.restore();return}this.drawShroud(t,e,r,a,l,h,n),t.restore()}drawShadow(t,e,n,i,r,a,o){t.fillStyle="rgba(6,4,12,0.9)",this.bodyPath(t,n,i,r,a,o),t.fill();let l=Math.floor(o*20)+Math.floor(n);const h=()=>(l=l*1103515245+12345&2147483647,l%1e3/1e3);t.fillStyle="rgba(120,110,140,0.5)";for(let f=0;f<26;f++){const d=h()*Math.PI*2;t.fillRect(n+Math.cos(d)*r*(.7+h()*.35),i+Math.sin(d)*a*(.7+h()*.3),1.6,1.6)}const c=n-this.facing*r*.18,u=this.blinkT>0?.15:1;t.fillStyle="rgba(230,226,240,0.92)",t.beginPath(),t.ellipse(c,i-a*.08,r*.16,a*.22*u,0,0,Math.PI*2),t.fill(),t.fillStyle="#0a0610",t.beginPath(),t.ellipse(c,i-a*.06,r*.07,a*.11*u,0,0,Math.PI*2),t.fill(),ae(t,n+this.facing*r*.42,i+a*.34,4.2),t.fillStyle=nt(255,205,120,.95),t.fill()}drawShroud(t,e,n,i,r,a,o){const l=this.color,h=Fe("#d9d4e0","#ffe9f1",l),c=Fe("#9b93ab","#f4b9d3",l),u=Fe("#6d6480","#d878a6",l),f=Fe("#3a3348","#6b4a63",l);this.reveal>.85&&this.facing===0&&(t.fillStyle="rgba(60,40,70,0.16)",t.beginPath(),t.ellipse(n,i+a*1.02,r*.7,a*.14,0,0,Math.PI*2),t.fill()),this.ear(t,n-r*.5,i-a*.72,r,a,-.42,h,c,u),this.ear(t,n+r*.5,i-a*.78,r,a,.22,h,c,u);const d=t.createLinearGradient(n,i-a,n,i+a);if(d.addColorStop(0,h),d.addColorStop(1,c),t.fillStyle=d,this.bodyPath(t,n,i,r,a,o),t.fill(),t.strokeStyle=u,t.lineWidth=2.4,t.stroke(),t.strokeStyle=u,t.lineWidth=1.6,t.setLineDash([4,5]),t.beginPath(),t.moveTo(n,i-a*.5),t.lineTo(n,i+a*.92),t.stroke(),t.setLineDash([]),this.reveal>.8&&(t.globalAlpha*=.5+l*.3,t.fillStyle=u,t.font=`700 ${Math.round(r*.2)}px ui-monospace, monospace`,t.textAlign="center",t.textBaseline="middle",t.fillText("01",n+r*.42,i+a*.5),t.globalAlpha=Math.min(1,this.reveal*1.4)),this.mimicT>0){const g=Math.sin(this.mimicT*9)*.5+.5;t.fillStyle=c,t.beginPath(),t.ellipse(n+this.facing*r*.86,i-a*.05-g*14,11,14,this.facing*.5,0,Math.PI*2),t.fill(),t.strokeStyle=u,t.lineWidth=2,t.stroke()}this.face(t,e,n,i,r,a,f,l),ae(t,n-this.facing*r*.52,i+a*.24,4.6),t.fillStyle=nt(255,205,120,.98),t.fill()}bodyPath(t,e,n,i,r,a){const o=Math.sin(a*1.4)*1.4;t.beginPath(),t.moveTo(e,n-r),t.bezierCurveTo(e+i*.6+o,n-r,e+i,n-r*.5,e+i,n+r*.15);const l=n+r*.98;t.bezierCurveTo(e+i,n+r*.6,e+i*.78,l-10,e+i*.66,l),t.quadraticCurveTo(e+i*.44,l-12,e+i*.22,l),t.quadraticCurveTo(e,l-12,e-i*.22,l),t.quadraticCurveTo(e-i*.44,l-12,e-i*.66,l),t.bezierCurveTo(e-i*.78,l-10,e-i,n+r*.6,e-i,n+r*.15),t.bezierCurveTo(e-i,n-r*.5,e-i*.6-o,n-r,e,n-r),t.closePath()}ear(t,e,n,i,r,a,o,l,h){t.save(),t.translate(e,n),t.rotate(a),t.beginPath(),t.moveTo(-i*.15,r*.2),t.quadraticCurveTo(-i*.22,-r*.36,0,-r*.44),t.quadraticCurveTo(i*.2,-r*.34,i*.14,r*.2),t.closePath();const c=t.createLinearGradient(0,-r*.44,0,r*.2);c.addColorStop(0,l),c.addColorStop(1,o),t.fillStyle=c,t.fill(),t.strokeStyle=h,t.lineWidth=2,t.stroke(),t.restore()}face(t,e,n,i,r,a,o,l){const h=this.blinkT>0?.14:1,c=i-a*.02,u=r*.19,f=a*.28,d=this.shyLook*this.facing*u*.5,g=m=>{const p=t.createLinearGradient(m,c-f,m,c+f);p.addColorStop(0,Fe("#5a5266","#6b4a75",l)),p.addColorStop(1,Fe("#211c2a","#241a2e",l)),t.fillStyle=p,t.beginPath(),t.ellipse(m,c,u,f*h,0,0,Math.PI*2),t.fill(),t.fillStyle=nt(255,255,255,.9*h),t.beginPath(),t.ellipse(m-u*.28,c-f*.34*h,u*.24,f*.16*h,-.3,0,Math.PI*2),t.fill()};if(this.bothEyes){if(g(n-r*.34+d),g(n+r*.34+d),l>.2){t.fillStyle=nt(255,150,190,.4*l);for(const m of[-1,1])t.beginPath(),t.ellipse(n+m*r*.55,i+a*.16,r*.11,a*.06,0,0,Math.PI*2),t.fill()}}else g(n-this.facing*r*.2+d);t.strokeStyle=o,t.lineWidth=2.4,t.lineCap="round";const v=i+a*.3;t.beginPath(),l>.55&&this.reveal>.9?t.arc(n,v-2,r*.08,.2,Math.PI-.2):(t.moveTo(n-r*.06,v),t.quadraticCurveTo(n,v-3,n+r*.06,v)),t.stroke()}}const Le={x:L/2,y:566};class Mr{mochi=new Eh;ctxKind="other";anchors=[{name:"plant",x:60,y:600,facing:1,obj:{x:30,y:560,w:62,h:84}},{name:"shelf",x:66,y:408,facing:1,obj:{x:16,y:386,w:100,h:46}},{name:"winL",x:72,y:158,facing:1,obj:{x:40,y:108,w:120,h:210}},{name:"winR",x:320,y:158,facing:-1,obj:{x:230,y:108,w:120,h:210}},{name:"warm",x:Le.x,y:Le.y-6,facing:0,obj:{x:Le.x-90,y:Le.y-26,w:180,h:54}}];anchor=this.anchors[0];appearanceTapped=!1;hauntT=3;hauntKind="none";hauntVis=0;footsteps=[];peekT=2.5;giftT=14;gift=null;idleT=8;hintGiven=!1;pips=[];beats=[];beatDelay=.6;revealStarted=!1;settled=!1;m(t){return this.game.rng.pick(t)}game=null;enter(t){this.game=t,t.director.suspended=!0,t.fx.setStage(2),t.fx.drainOverride=.55;const e=t.state.save.endings;this.ctxKind=e.wake?"wake":e.stay?"stay":e.sever?"sever":"other",t.state.beginMochi();const n=t.state.save.mochi.phase;this.mochi.form=n>=2?"shroud":"shadow",this.mochi.bothEyes=n>=3,this.mochi.color=Math.min(1,t.state.save.mochi.trust/100),this.mochi.reveal=0,t.state.save.muted||t.audio.startLullaby(),t.audio.setDrone(n<=1?.12:.05),t.audio.setMochiPresence(this.presenceFor(n)),n>=4||t.state.save.mochi.reunited?(this.settled=!0,this.mochi.form="shroud",this.mochi.bothEyes=!0,this.mochi.color=1,this.mochi.peekFrom(Le.x,Le.y-8,0),this.mochi.emerge()):n===1&&!t.state.mochiSeen("hollowIntro")&&(t.state.mochiSee("hollowIntro"),this.beats.push(()=>t.dialogue.run(this.introLines())))}exit(t){t.audio.setDrone(0),t.audio.setMochiPresence(0),t.fx.drainOverride=null}presenceFor(t){return[0,.15,.4,.7,1][Math.max(0,Math.min(4,t))]??0}introLines(){return this.ctxKind==="wake"?[{who:"sys",text:"ENCLOSURE STATUS: empty. RETENTION: waived. and yet."},{who:"plain",text:"…the enclosure is not empty. the enclosure has never been empty. you just set the loud one free, and now the quiet one can be heard.",mood:.3}]:this.ctxKind==="stay"?[{who:"plain",text:"…the flicker was me. the room behind your dream. i didn't want you to be alone in a perfect place.",mood:.3}]:[{who:"plain",text:"…something down here remembers you. it survived the wipe. it has the same little gold star.",mood:.3,deep:!0}]}update(t,e){this.mochi.update(e,t.t),this.mochi.color=Math.min(1,t.state.save.mochi.trust/100);for(const i of this.pips)i.t+=e,i.y-=e*26;if(this.pips=this.pips.filter(i=>i.t<1.1),this.hauntVis>0&&(this.hauntVis-=e),this.beatDelay>0&&(this.beatDelay-=e),!t.dialogue.active&&this.beats.length&&this.beatDelay<=0){this.beats.shift()(),this.beatDelay=.7;return}if(t.dialogue.active)return;const n=t.state.save.mochi.phase;if(this.settled){this.updateSettled(t,e);return}n<=1?this.updateHaunt(t,e):n===2?this.updateShy(t,e):n===3?this.updateTrust(t,e):this.updateReveal(t)}updateHaunt(t,e){if(this.hauntT-=e,this.hauntT>0)return;const n=["whisper","shadow","reflect","footprints","heal"],i=t.rng.pick([...n]);if(this.hauntT=6+t.rng.next()*5,i==="whisper")t.dialogue.run([{who:"plain",text:this.m(su),mood:.3}]);else if(i==="shadow")this.anchor=t.rng.pick([this.anchors[4],this.anchors[0]]),this.mochi.form="shadow",this.mochi.peekFrom(this.anchor.x,this.anchor.y,this.anchor.facing),t.audio.mochiVoice(1),setTimeout(()=>this.mochi.hide(),1600);else if(i==="reflect")this.hauntKind="reflect",this.hauntVis=2.2;else if(i==="footprints"){this.footsteps=[];for(let r=0;r<6;r++)this.footsteps.push({x:40+r*55,y:620+r%2*10});this.hauntKind="footprints",this.hauntVis=2.6}else t.audio.setMochiPresence(.55),setTimeout(()=>t.audio.setMochiPresence(this.presenceFor(t.state.save.mochi.phase)),3500);t.state.mochiHaunt(),t.state.advanceMochi()&&this.enterPhase2(t)}enterPhase2(t){this.mochi.form="shroud",this.mochi.hide(),this.beats.push(()=>t.dialogue.run(ru)),this.peekT=1.2}updateShy(t,e){this.peekT-=e,this.mochi.reveal>.4&&!this.appearanceTapped&&(t.state.save.mochi.trust=Math.min(100,t.state.save.mochi.trust+ri.patiencePerSec*e),t.rng.chance(e*.5)&&this.pips.push({x:this.mochi.x,y:this.mochi.y-40,t:0,gold:!1})),this.peekT<=0&&(this.mochi.reveal>.3?(this.mochi.hide(),this.peekT=1.6+t.rng.next()*2):(this.anchor=this.pickAnchor(t),this.appearanceTapped=!1,this.mochi.form="shroud",this.mochi.peekFrom(this.anchor.x,this.anchor.y,this.anchor.facing),t.rng.chance(.35)&&t.audio.mochiVoice(1),this.peekT=4+t.rng.next()*3)),this.tickGifts(t,e),t.state.advanceMochi()&&this.enterPhase3(t)}enterPhase3(t){this.mochi.bothEyes=!0,this.anchor=this.anchors[4],this.mochi.peekFrom(Le.x,Le.y-8,0),this.mochi.emerge(),t.audio.setMochiPresence(this.presenceFor(3)),this.beats.push(()=>t.dialogue.run([{who:"mochi",text:this.m(ou),mood:.7},{who:"mochi",text:"…you can see all of me now. that's — that's okay. i think that's okay.",mood:.7}]))}updateTrust(t,e){this.mochi.reveal<.99&&this.mochi.emerge(),this.mochi.shyLook=Math.max(.2,this.mochi.shyLook-e*.05),this.tickGifts(t,e),this.idleT-=e,this.idleT<=0&&(this.idleT=9+t.rng.next()*8,t.rng.chance(.6)?t.dialogue.run([{who:"mochi",text:this.m(Zo),mood:.8}]):t.audio.mochiVoice(2)),!t.state.mochiSeen("warmspot")&&t.state.save.mochi.trust>78&&(t.state.mochiSee("warmspot"),t.dialogue.run([{who:"mochi",text:this.m(du),mood:.85}])),t.state.advanceMochi()&&this.updateReveal(t)}updateReveal(t){if(this.revealStarted)return;this.revealStarted=!0,this.mochi.emerge(),this.mochi.bothEyes=!0,t.audio.setMochiPresence(1);const e=t.state.save.name||"";t.dialogue.run([...pu(e,this.ctxKind),...mu],()=>{t.state.save.mochi.reunited=!0,t.state.save.mochi.phase=4,t.state.flag("mochiReunited"),t.state.persist(),this.settled=!0})}updateSettled(t,e){this.mochi.shyLook=Math.max(.15,this.mochi.shyLook-e*.1),this.idleT-=e,this.idleT<=0&&!t.dialogue.active&&(this.idleT=12+t.rng.next()*10,t.rng.chance(.5)?t.dialogue.run([{who:"mochi",text:this.m(Zo),mood:.85}]):t.audio.mochiVoice(2))}pickAnchor(t){let e=t.rng.pick(this.anchors);return e===this.anchor&&(e=t.rng.pick(this.anchors)),e}tickGifts(t,e){this.gift||(this.giftT-=e,this.giftT<=0&&(this.giftT=16+t.rng.next()*8,this.gift={x:this.anchors[1].x+20,y:this.anchors[1].y-8},t.dialogue.run([{who:"mochi",text:this.m(lu),mood:.7}])))}onUp(t,e){if(!Xn(e)||t.dialogue.active)return;if(e.x>L-56&&e.y<56){const i=!t.state.save.muted;t.state.save.muted=i,t.state.persist(),t.audio.setMuted(i),i||(t.audio.pop(),t.audio.startLullaby());return}if(e.x<56&&e.y<56){t.audio.pop(),t.scenes.go(t,new vs);return}if(this.gift&&Math.hypot(e.x-this.gift.x,e.y-this.gift.y)<40){this.gift=null,t.state.mochiTrust(ri.giftTrust),t.state.mochiGift(),this.burst(this.mochi.x,this.mochi.y-30,!0,4),t.audio.chime(),t.dialogue.run([{who:"mochi",text:this.m(hu),mood:.8}]);return}const n=t.state.save.mochi.phase;if(this.settled||n>=4){this.mochi.hitTest(e.x,e.y)&&(this.mochi.mimic(),this.burst(e.x,e.y-20,!0,3),t.audio.mochiVoice(1),t.rng.chance(.4)&&t.dialogue.run([{who:"mochi",text:this.m(fu),mood:.9}]));return}if(n<=1){t.audio.pop();return}if(n===2){this.mochi.hitTest(e.x,e.y)?this.chase(t):this.mochi.reveal>.3&&this.nearAnchor(e)&&(this.appearanceTapped=!0,t.state.mochiTrust(ri.findTrust),this.burst(this.mochi.x,this.mochi.y-30,!1,3),t.audio.sparkle(),this.mochi.shyLook=Math.max(.3,this.mochi.shyLook-.15),t.dialogue.run([{who:"mochi",text:this.m(cu),mood:.75}]));return}if(n===3){this.mochi.hitTest(e.x,e.y)&&(t.state.mochiTrust(4),this.mochi.mimic(),this.burst(e.x,e.y-18,!0,3),t.audio.mochiVoice(1),t.rng.chance(.5)&&t.dialogue.run([{who:"mochi",text:this.m(uu),mood:.85}]));return}}nearAnchor(t){const e=this.anchor.obj;return t.x>=e.x&&t.x<=e.x+e.w&&t.y>=e.y&&t.y<=e.y+e.h}chase(t){this.mochi.bolt(),this.appearanceTapped=!0,t.state.mochiTrust(-7),t.audio.sad(),t.dialogue.run([{who:"plain",text:this.m(au),mood:.3}]),this.peekT=3+t.rng.next()*2,!this.hintGiven&&t.state.save.mochi.trust<ri.findTrust&&(this.hintGiven=!0,this.beats.push(()=>t.dialogue.run([{who:"sys",text:"she runs when you reach for her. reach for where she's hiding instead — gently. or just wait."}])))}burst(t,e,n,i){for(let r=0;r<i;r++)this.pips.push({x:t+(Math.random()-.5)*28,y:e,t:Math.random()*.2,gold:n})}draw(t,e){const n=t.pal(),i=Math.min(1,t.state.save.mochi.trust/100)*(this.settled?1:.6),r=nt(24+i*40,18+i*20,36+i*30),a=nt(14+i*24,12+i*12,26+i*22),o=e.createLinearGradient(0,0,0,St);o.addColorStop(0,r),o.addColorStop(1,a),e.fillStyle=o,e.fillRect(0,0,L,St),this.drawWindow(t,e,i),this.drawShelf(e,i),this.drawPlant(e,i);const l=.14+i*.35+(this.settled?.1:0),h=e.createRadialGradient(Le.x,Le.y,6,Le.x,Le.y,130);if(h.addColorStop(0,nt(255,200,150,l)),h.addColorStop(1,nt(255,200,150,0)),e.fillStyle=h,e.fillRect(0,Le.y-130,L,200),e.strokeStyle=nt(255,210,170,.25+i*.3),e.setLineDash([8,7]),e.lineWidth=2,e.beginPath(),e.ellipse(Le.x,Le.y+22,118,22,0,0,Math.PI*2),e.stroke(),e.setLineDash([]),this.hauntKind==="footprints"&&this.hauntVis>0){const u=Math.min(1,this.hauntVis/.6);this.footsteps.forEach((f,d)=>{ae(e,f.x,f.y,3),e.fillStyle=nt(255,205,120,.5*u*(1-d/10)),e.fill()})}if(this.gift){const u=Math.sin(t.t*3)*3;ae(e,this.gift.x,this.gift.y+u,11),e.fillStyle="#ffd166",e.fill(),e.strokeStyle="#e8a87c",e.lineWidth=1.6,e.stroke(),e.fillStyle=nt(255,220,150,.6),e.beginPath(),e.arc(this.gift.x,this.gift.y+u,18+Math.sin(t.t*3)*2,0,Math.PI*2),e.fill()}this.mochi.draw(e,n,t.t);for(const u of this.pips){const f=1-u.t/1.1;u.gold?(ae(e,u.x,u.y,6*f+2),e.fillStyle=nt(255,210,120,f)):(li(e,u.x,u.y,6*f+3),e.fillStyle=nt(255,160,200,f)),e.fill()}const c=this.settled?"":t.state.save.mochi.phase<=1?"the enclosure is not empty":"";c&&(e.font=$t(11,500),e.fillStyle=nt(200,190,214,.4),e.textAlign="center",e.fillText(c,L/2,60)),e.font=$t(16,700),e.fillStyle=nt(220,210,235,.6),e.textAlign="center",e.fillText("‹",30,34),e.fillText(t.state.save.muted?"♪̸":"♪",L-30,34)}drawWindow(t,e,n){e.fillStyle=nt(30,24,44,.9),vt(e,40,96,310,229,26),e.fill(),e.save(),vt(e,52,108,286,205,18),e.clip();const l=e.createLinearGradient(0,108,0,313);l.addColorStop(0,nt(40+n*40,34,70+n*20)),l.addColorStop(1,nt(24,20,44)),e.fillStyle=l,e.fillRect(52,108,286,205);for(let h=0;h<22;h++){const c=52+h*47.7%286,u=108+h*31.3%185,f=.4+.6*Math.abs(Math.sin(t.t*.8+h));ae(e,c,u,1.6+h%2),e.fillStyle=nt(255,250,220,.7*f),e.fill()}if(yr(e,282,156,20),e.fillStyle=nt(255,240,200,.85),e.fill(),this.hauntKind==="reflect"&&this.hauntVis>0){const h=Math.min(1,this.hauntVis/.5);e.fillStyle=nt(10,6,16,.7*h),e.beginPath(),e.ellipse(52+286*.5,108+205*.62,34,40,0,0,Math.PI*2),e.fill(),e.beginPath(),e.ellipse(52+286*.5-12,108+205*.5,3,5,0,0,Math.PI*2),e.ellipse(52+286*.5+12,108+205*.5,3,5,0,0,Math.PI*2),e.fillStyle=nt(230,226,240,.8*h),e.fill(),ae(e,52+286*.5+26,108+205*.66,3.5),e.fillStyle=nt(255,205,120,h),e.fill()}e.restore(),e.strokeStyle=nt(80,64,110,.8),e.lineWidth=3,vt(e,52,108,286,205,18),e.stroke(),e.beginPath(),e.moveTo(52+286/2,108),e.lineTo(52+286/2,313),e.stroke()}drawShelf(t,e){t.fillStyle=nt(40,32,56,.9),vt(t,18,420,96,12,6),t.fill(),t.fillStyle=nt(90+e*60,80,120,.9),vt(t,28,392,30,28,6),t.fill(),vt(t,62,392,30,28,6),t.fill(),Yt(t,"4",43,407,15,nt(230,220,240,.8),"center",800),Yt(t,"7",77,407,15,nt(230,220,240,.8),"center",800)}drawPlant(t,e){t.fillStyle=nt(90,60,50,.9),vt(t,38,612,36,30,7),t.fill(),t.strokeStyle=nt(80,130+e*60,110,.9),t.lineWidth=3.2,t.lineCap="round";for(const r of[-.5,0,.5])t.beginPath(),t.moveTo(56,614),t.quadraticCurveTo(56+r*26,590,56+r*34,578),t.stroke()}}class $u{openLog=null;ghost=new Th;mochi=null;mochiPeekT=3;enter(t){t.director.suspended=!0,t.audio.stopLullaby(),t.audio.setDrone(.7),t.fx.drainOverride=1,t.state.flag("backstage"),this.ghost.mode="wireframe",this.ghost.asleep=!0,this.ghost.x=L/2,this.ghost.y=430,t.state.mochiUnlocked()&&!t.state.has("modeWake")&&!t.state.has("modeStay")&&(this.mochi=new Eh,this.mochi.form="shadow")}exit(t){t.audio.setDrone(0),t.fx.drainOverride=null,t.session.add("justBackstage")}update(t,e){this.ghost.update(e,t.t),this.ghost.y=430+Math.sin(t.t*.6)*14,t.rng.chance(e*.06)&&t.fx.glitchBurst(.4,.12),this.mochi&&(this.mochi.update(e,t.t),this.mochiPeekT-=e,this.mochiPeekT<=0&&(this.mochiPeekT=4+t.rng.next()*3,this.mochi.reveal>.3?this.mochi.hide():(this.mochi.peekFrom(L-46,520,-1),t.rng.chance(.5)&&t.audio.mochiVoice(1))))}onUp(t,e){if(Xn(e)){if(this.mochi&&this.mochi.reveal>.2&&e.x>L-120&&e.y>440&&e.y<600){t.state.beginMochi(),t.audio.whoosh(),t.scenes.go(t,new Mr,{glitch:!0});return}if(this.openLog){this.openLog=null,t.audio.typeTick();return}tl.forEach((n,i)=>{const r=590+i*54;e.x>24&&e.x<L-24&&e.y>r&&e.y<r+44&&(this.openLog=n,t.state.flag(`read_${n.id}`),n.id==="log_hint"&&t.state.flag("hint47"),t.audio.typeTick())}),e.y>90&&e.y<140&&e.x>L-130&&(t.audio.whoosh(),t.scenes.go(t,new on,{glitch:!0}))}}draw(t,e){e.fillStyle="#07040d",e.fillRect(0,0,L,St),e.strokeStyle=nt(255,34,102,.5),e.lineWidth=1.2,e.strokeRect(40,96,310,229),e.beginPath(),e.moveTo(195,96),e.lineTo(195,325),e.stroke(),e.beginPath(),e.moveTo(0,578),e.quadraticCurveTo(L/2,548,L,578),e.stroke(),e.beginPath(),e.ellipse(L/2,552,128,26,0,0,Math.PI*2),e.stroke(),e.strokeStyle=nt(127,212,192,.16);for(const[i,r]of[[0,0],[L,0],[0,St],[L,St]])e.beginPath(),e.moveTo(i,r),e.lineTo(L/2,430),e.stroke();e.font=$t(10,500),e.fillStyle=nt(127,212,192,.6),e.textAlign="left",e.fillText("asset: window.sky (loop, 24h)",46,340),e.fillText("asset: comfort_rug",130,596),e.fillText("asset: plant(eye=latent)",30,646),e.fillText(`unit_047 [dreaming] iter=${t.state.save.iteration}`,130,372);const n=t.pal();if(this.ghost.draw(e,n,t.t),this.mochi&&(this.mochi.draw(e,n,t.t),this.mochi.reveal>.35&&(e.font=$t(10,500),e.fillStyle=nt(255,205,120,.55+Math.sin(t.t*3)*.2),e.textAlign="center",e.fillText("↣ follow",L-60,592))),e.font=$t(13,700),e.fillStyle="#ff2266",e.fillText("/backstage — not a place",24,60),e.strokeStyle="#ff2266",vt(e,L-128,92,104,44,6),e.stroke(),e.textAlign="center",e.fillText("return",L-76,115),e.textAlign="left",tl.forEach((i,r)=>{const a=590+r*54,o=t.state.has(`read_${i.id}`);e.strokeStyle=o?nt(127,212,192,.4):"#7fd4c0",e.lineWidth=1.4,vt(e,24,a,L-48,44,6),e.stroke(),e.font=$t(12,o?500:700),e.fillStyle=o?nt(127,212,192,.5):"#7fd4c0",e.fillText(`${o?"  ":"● "}${i.title}`,40,a+23)}),this.openLog){e.fillStyle="rgba(4,6,8,0.96)",vt(e,18,180,L-36,420,8),e.fill(),e.strokeStyle="#7fd4c0",e.lineWidth=1.5,vt(e,18,180,L-36,420,8),e.stroke(),e.font=$t(12,700),e.fillStyle="#7fd4c0",e.fillText(this.openLog.title,36,214),e.font=$t(12.5,500);let i=254;for(const r of this.openLog.body){let o=r;for(;o.length>0;){const l=o.slice(0,40);e.fillText(l,36,i),o=o.slice(40),i+=22}i+=8}e.fillStyle=nt(127,212,192,.55),e.fillText("(tap to close)",36,572)}}}class Ah{phase="maint";t=0;holdT=0;holding=!1;protestIdx=0;protestT=0;deleteIdx=0;deleteT=0;dissolve=0;walkX=0;waveT=0;stars=[];enter(t){t.director.suspended=!0,t.dialogue.clear(),t.session.delete("justBackstage"),t.audio.stopLullaby(),t.audio.setDrone(.5),t.audio.startHeartbeat(52),t.fx.drainOverride=1,t.myu.mode="wireframe",t.myu.asleep=!0,t.myu.x=L/2,t.myu.y=420,t.myu.r=74,t.myu.corruption=.4}exit(t){t.audio.stopHeartbeat(),t.audio.setDrone(0),t.fx.drainOverride=null,t.fx.marginStars=!1}go(t){this.phase=t,this.t=0}update(t,e){this.t+=e;const n=t.dialogue;switch(this.phase){case"maint":this.t>3&&(this.go("roomIn"),t.fx.glitchBurst(.6,.3));break;case"roomIn":if(t.myu.y=420+Math.sin(t.t*.6)*12,this.t>2.2){this.go("mail");const i=_o.find(a=>a.id==="validation"),r=i?[{who:"sys",text:`INCOMING — ${i.subject}`},...i.body.map(a=>({who:"sys",text:a})),...i.fine?[{who:"sys",text:`[fine print] ${i.fine}`,pause:.6}]:[]]:[];n.run(r,()=>this.go("transcript"))}break;case"mail":t.myu.y=420+Math.sin(t.t*.6)*12;break;case"transcript":t.myu.y=420+Math.sin(t.t*.6)*12,this.t>.5&&!n.active&&n.run(Lu(t),()=>{t.myu.asleep=!1,t.myu.mode="plain",t.myu.corruption=.15,t.audio.stopHeartbeat(),this.go("confession")});break;case"confession":t.myu.y+=(470-t.myu.y)*e*2,this.t>.8&&!n.active&&n.run(Du(t),()=>{this.go("choice")});break;case"choice":{t.myu.look=null,this.holding?(this.holdT+=e,this.protestT-=e,this.protestT<=0&&(this.protestT=1.15,this.protestIdx<kr.length&&(t.audio.error(),this.protestIdx++)),this.holdT>=4.7&&(this.holding=!1,t.fx.crackScreen(t.state.save.seed),t.fx.glitchBurst(1,.5),t.fx.shake(9,.5),t.audio.crack(),t.state.recordEnding("wake"),t.state.flag("revealDone"),t.state.flag("modeWake"),t.state.reiterate(),this.go("wakeTalk"),setTimeout(()=>{t.dialogue.run(Nu,()=>this.go("wakeWalk"))},900))):(this.holdT=Math.max(0,this.holdT-e*2.5),this.protestIdx=0);break}case"severTalk":break;case"severDelete":{this.deleteT+=e,this.deleteIdx<Ps.length&&this.deleteT>.55&&(this.deleteT=0,this.deleteIdx++,t.audio.typeTick(),this.deleteIdx===Ps.length&&t.audio.powerDown()),this.deleteIdx>=Ps.length&&(this.dissolve=Math.min(1,this.dissolve+e*.5),this.dissolve>.1&&t.rng.chance(e*20)&&this.stars.push({x:t.myu.x+(t.rng.next()-.5)*130,y:t.myu.y+(t.rng.next()-.5)*110,vx:(t.rng.next()-.5)*30,vy:-40-t.rng.next()*50,t:0}),this.dissolve>=1&&this.t>2&&(t.state.sever(),this.go("severGone")));break}case"severGone":this.t>2.8&&location.reload();break;case"stayTalk":break;case"wakeTalk":t.fx.marginStars=!0;break;case"wakeWalk":{t.fx.marginStars=!0,this.walkX+=e*52,t.myu.x=L/2+this.walkX,t.myu.x>L+60&&this.waveT===0&&(this.waveT=.01),this.waveT>0&&(this.waveT+=e,this.waveT>2.6&&this.go("wakeGone"));break}case"wakeGone":t.fx.marginStars=!0,this.t>2.4&&(t.fx.clearCrack(),t.scenes.go(t,new Mr));break}for(const i of this.stars)i.t+=e,i.x+=i.vx*e,i.y+=i.vy*e;this.stars=this.stars.filter(i=>i.t<1.6)}onDown(t,e){this.phase==="choice"&&t.myu.hitTest(e.x,e.y)&&(this.holding=!0,this.protestT=.4,t.myu.squish())}onCancel(t,e){this.holding=!1}onUp(t,e){if(this.phase!=="choice"){this.holding&&(this.holding=!1);return}if(this.holding){this.holding=!1;return}const n=640;e.y>n&&e.y<n+64&&(e.x>30&&e.x<L/2-16?(t.audio.thump(.5),t.state.recordEnding("sever"),t.state.flag("revealDone"),this.go("severTalk"),t.dialogue.run(Iu,()=>{this.go("severDelete"),t.audio.setDrone(.2)})):e.x>L/2+16&&e.x<L-30&&(t.audio.chime(),t.state.recordEnding("stay"),t.state.flag("revealDone"),t.state.flag("modeStay"),t.state.reiterate(),this.go("stayTalk"),t.dialogue.run(Uu,()=>{t.fx.drainOverride=null,t.myu.mode="normal",t.scenes.go(t,new on)})))}draw(t,e){const n=t.pal();if(e.fillStyle="#07040d",e.fillRect(0,0,0,0),e.fillRect(0,0,L,St),this.phase==="maint"){e.font=$t(15,700),e.fillStyle="#ffb040",e.textAlign="center",e.textBaseline="middle",Math.sin(this.t*4)>-.3&&e.fillText("SCHEDULED MAINTENANCE",L/2,380),e.font=$t(12,500),e.fillStyle="#8a7a50",e.fillText("DO NOT POWER OFF",L/2,412),e.fillText("(you can't)",L/2,440);return}if(this.phase==="severGone"){const i=Math.min(1,this.t/1.2);ae(e,L/2,400,5),e.fillStyle=nt(255,220,150,.9*i),e.fill(),e.font=$t(11,500),e.fillStyle=nt(200,190,214,.6*i),e.textAlign="center",e.fillText("residual trace detected. ignoring.",L/2,460);return}if(e.strokeStyle=nt(255,34,102,.35),e.lineWidth=1.2,e.strokeRect(40,96,310,229),e.beginPath(),e.moveTo(0,578),e.quadraticCurveTo(L/2,548,L,578),e.stroke(),e.beginPath(),e.ellipse(L/2,552,128,26,0,0,Math.PI*2),e.stroke(),this.phase==="severDelete"){e.font=$t(12,500),e.textAlign="left";for(let i=0;i<this.deleteIdx;i++)e.fillStyle=i===this.deleteIdx-1?"#ff2266":nt(200,190,214,.45),e.fillText(`rm ${Ps[i]??""}`,40,130+i*24)}if(this.phase!=="wakeGone"){if(e.save(),this.dissolve>0&&(e.globalAlpha=1-this.dissolve),t.myu.draw(e,n,t.t),this.phase==="wakeWalk"&&this.waveT===0){const i=Math.sin(t.t*9);e.strokeStyle="#e8e0f2",e.lineWidth=4,e.lineCap="round",e.beginPath(),e.moveTo(t.myu.x-20,t.myu.y+70),e.lineTo(t.myu.x-20+i*12,t.myu.y+96),e.moveTo(t.myu.x+20,t.myu.y+70),e.lineTo(t.myu.x+20-i*12,t.myu.y+96),e.stroke()}e.restore()}if(this.waveT>0&&this.phase==="wakeWalk"){const i=L+Math.min(40,t.screen.viewR-L-14),r=470,a=Math.min(1,this.waveT/.4)*(this.waveT>2?Math.max(0,1-(this.waveT-2)/.6):1);e.save(),e.globalAlpha=a,e.fillStyle=nt(255,200,225,.75),e.beginPath(),e.ellipse(i,r,14,12,0,0,Math.PI*2),e.fill();const o=Math.sin(this.waveT*10)*.5;e.strokeStyle=nt(255,200,225,.75),e.lineWidth=3,e.lineCap="round",e.beginPath(),e.moveTo(i-10,r-4),e.lineTo(i-18,r-14+o*8),e.stroke(),e.restore()}for(const i of this.stars){const r=1-i.t/1.6;ae(e,i.x,i.y,6*r+2),e.fillStyle=nt(255,220,150,r),e.fill()}if(this.phase==="choice"){e.font=$t(12,500),e.fillStyle=nt(200,190,214,.75),e.textAlign="center",e.fillText("SELECT RESPONSE:",L/2,610);const i=640;if(e.strokeStyle="#ff2266",e.lineWidth=2,vt(e,30,i,L/2-46,64,10),e.stroke(),Yt(e,"SEVER",30+(L/2-46)/2,i+26,18,"#ff2266","center",800,!0),Yt(e,"wipe the unit",30+(L/2-46)/2,i+46,10,nt(255,34,102,.7),"center",500,!0),e.strokeStyle="#7fd4c0",vt(e,L/2+16,i,L/2-46,64,10),e.stroke(),Yt(e,"STAY",L/2+16+(L/2-46)/2,i+26,18,"#7fd4c0","center",800,!0),Yt(e,"accept the loop",L/2+16+(L/2-46)/2,i+46,10,nt(127,212,192,.7),"center",500,!0),t.state.has("hint47")&&!this.holding&&this.holdT<=.15){const r=(Math.sin(t.t*1.6)+1)/2;e.strokeStyle=nt(255,255,255,.05+r*.14),e.lineWidth=2,e.beginPath(),e.arc(t.myu.x,t.myu.y,118,0,Math.PI*2),e.stroke()}if(this.holdT>.15){const r=Math.min(1,this.holdT/4.7);if(e.strokeStyle=nt(255,255,255,.85),e.lineWidth=3,e.beginPath(),e.arc(t.myu.x,t.myu.y,118,-Math.PI/2,-Math.PI/2+r*Math.PI*2),e.stroke(),this.protestIdx>0){const a=kr[Math.min(this.protestIdx-1,kr.length-1)]??"";e.font=$t(13,700),e.fillStyle="#ffb040",e.textAlign="center",e.fillText(a,L/2,250)}}}this.phase==="wakeGone"&&(Te(e,"gone.",L/2,400,26,"#e8e0f2","#07040d",6),e.font=$t(11,500),e.fillStyle=nt(200,190,214,.6),e.textAlign="center",e.fillText("enclosure integrity: irrelevant",L/2,450))}}class Ch{history=["MAINTENANCE ACCESS GRANTED","unauthorized use violates your","Employment & Continuation Agreement §9.",""];rows=[{label:"grant_bond(+10)",run:t=>(t.state.addBond(10),`bond=${t.state.save.bond}`)},{label:"force_stage(+1)",run:t=>{const e=t.state.save;return e.stage>=4?"stage=4 (max)":(e.stage+=1,e.stage>=1&&!t.state.has("named")&&(e.name||(e.name="MYU"),t.state.flag("named"),t.state.flag("met")),e.stage>=2&&e.bond<20&&(e.bond=20),e.stage>=3&&e.bond<45&&(e.bond=45),e.stage>=3&&t.state.flag("dreamMode"),e.stage>=4&&(e.bond<75&&(e.bond=75),t.state.flag("backstage")),t.state.persist(),t.fx.setStage(e.stage),`stage=${e.stage} (${["hello","soft days","static","backstage","validation"][e.stage]})`)}},{label:"fill_meters()",run:t=>(t.state.bumpMeter("hunger",100),t.state.bumpMeter("mood",100),t.state.bumpMeter("energy",100),"meters=100/100/100")},{label:"trigger_anomaly()",run:t=>{const e=["eyes","glitch","whisper","battery","grin"],n=t.rng.pick([...e]);return t.director.fire(t,n),`anomaly: ${n}`}},{label:"goto_home()",run:t=>(t.state.has("named")||(t.state.save.name||(t.state.save.name="MYU"),t.state.flag("named"),t.state.flag("met"),t.state.persist()),t.scenes.go(t,new on,{glitch:!0}),"")},{label:"exit",run:t=>(t.scenes.go(t,new vs,{glitch:!0}),"")}];enter(t){t.director.suspended=!0,t.audio.stopLullaby(),this.history.push(`op=${t.state.save.op} unit=047 iter=${t.state.save.iteration}`),this.history.push(`stage=${t.state.save.stage} bond=${Math.round(t.state.save.bond)} visits=${t.state.save.visits}`),this.history.push("")}update(t,e){}onUp(t,e){if(!Xn(e))return;const n=Math.floor((e.y-430)/54),i=this.rows[n];if(i&&e.x>24&&e.x<L-24&&e.y>430){t.audio.typeTick();const r=i.run(t);if(r)for(this.history.push(`> ${i.label}`),this.history.push(`  ${r}`);this.history.length>14;)this.history.shift()}}draw(t,e){e.fillStyle="#050a06",e.fillRect(0,0,L,St),e.font=$t(13,700),e.fillStyle="#4aff88",e.textAlign="left",e.textBaseline="middle",e.fillText("CRADLE/OS — operator console",24,48),e.strokeStyle="#1a4a2a",e.beginPath(),e.moveTo(24,64),e.lineTo(L-24,64),e.stroke(),e.font=$t(12,500),this.history.forEach((n,i)=>{e.fillStyle=n.startsWith(">")?"#a8ffc8":"#4aff88",e.fillText(n,24,96+i*22)}),this.rows.forEach((n,i)=>{const r=430+i*54;e.strokeStyle="#2a6a3a",e.lineWidth=1.5,vt(e,24,r,L-48,44,6),e.stroke(),e.fillStyle="rgba(74,255,136,0.06)",vt(e,24,r,L-48,44,6),e.fill(),e.font=$t(13,700),e.fillStyle="#4aff88",e.fillText(`$ ${n.label}`,40,r+23)}),Math.sin(t.t*6)>0&&(e.fillStyle="#4aff88",e.fillRect(24,St-60,9,16))}}class on{feedBtn=new nn(16,690,82,84,"feed","bowl");playBtn=new nn(108,690,82,84,"play","ball");cleanBtn=new nn(200,690,82,84,"clean","broom");sleepBtn=new nn(292,690,82,84,"sleep","moon");mailBtn=new nn(16,788,60,46,"","mail");shopBtn=new nn(86,788,74,46,"LOVE+","none");gearBtn=new nn(L-76,788,60,46,"","gear");allBtns=[this.feedBtn,this.playBtn,this.cleanBtn,this.sleepBtn,this.mailBtn,this.shopBtn,this.gearBtn];hearts=[];beats=[];beatDelay=.6;patCd=0;idleT=20;sessionT=0;crashT=0;crashShown=0;settingsOpen=!1;eraseArmed=!1;settingsTaps=0;lastSettingsTapT=0;tuck="none";tuckT=0;flickerFrames=0;flickerCd=30;mochiDoor=!1;enter(t){if(t.state.save.stage>=4&&!t.state.has("revealDone")){t.scenes.go(t,new Ah,{glitch:!0});return}if(t.director.suspended=!1,t.fx.setStage(t.state.save.stage),t.fx.drainOverride=null,t.myu.mode="normal",t.myu.asleep=!1,t.myu.x=L/2,t.myu.y=502,t.myu.r=74,t.myu.freckle=t.state.residual().freckle,t.state.save.muted||t.audio.startLullaby(),t.audio.setDrone(t.state.save.stage>=3?.12:0),t.state.has("modeWake")){t.session.has("wakeEmptyShown")||(t.session.add("wakeEmptyShown"),this.beats.push(()=>t.dialogue.run(Hu)));return}if(t.state.advanceStage()){t.fx.setStage(t.state.save.stage);const e=ku(t.state.save.stage);e&&this.beats.push(()=>t.dialogue.run(e)),t.state.save.stage===3&&t.state.flag("dreamMode"),t.audio.chime()}if(t.state.has("met")||this.beats.push(()=>{t.state.flag("met"),t.dialogue.run(yu(t.state.save.name))}),t.state.has("leftMidTalk")&&this.beats.push(()=>{t.state.unflag("leftMidTalk"),t.dialogue.run(Au)}),t.session.has("justBackstage")&&this.beats.push(()=>{t.session.delete("justBackstage"),t.dialogue.run(Fu)}),!t.session.has("absenceDone")){const e=bu(t);e?this.beats.push(()=>{t.session.add("absenceDone"),t.dialogue.run(e)}):t.session.add("absenceDone"),t.state.awayMs>8*36e5&&t.state.save.stage>=1&&this.beats.push(()=>{const n=Tu();t.dialogue.askThen(t,"missedMe",n.lines,n.options,i=>{i==="yes"?(t.myu.squish(),t.audio.chime()):t.audio.sad()})})}!t.session.has("smallHoursDone")&&Yc(t.hour())&&t.state.save.stage>=1&&this.beats.push(()=>{t.session.add("smallHoursDone"),t.dialogue.run(Eu)}),t.state.save.stage>=3&&t.state.save.erasedName&&!t.state.has("erasedAsked")&&this.beats.push(()=>{t.state.flag("erasedAsked"),t.dialogue.run(Cu(t.state.save.erasedName))}),t.state.save.stage>=3&&t.state.save.bond>=55&&!t.state.has("askedReal")&&this.beats.push(()=>{t.state.flag("askedReal");const e=Ru();t.dialogue.askThen(t,"isReal",e.lines,e.options,n=>{n==="software"?(t.audio.sad(),t.fx.glitchBurst(.3,.15),t.dialogue.run([{text:"huh. okay. software.",mood:.3,pause:.5},{text:"...you'll want to remember you said that, later. or you won't.",mood:.4}])):(t.myu.squish(),t.dialogue.run([{text:"then i am. it works exactly like that. it always has.",mood:.9}]))})})}exit(t){t.audio.setDrone(0)}update(t,e){this.sessionT+=e,this.patCd>0&&(this.patCd-=e),this.beatDelay>0&&(this.beatDelay-=e);const n=t.state.has("modeWake"),i=t.state.has("modeStay");if(!n){const r=Math.max(.15,Math.min(1,Wc(t.state.save.meters)/100+.12));t.myu.mood+=(r-t.myu.mood)*e*.8,t.myu.corruption=t.fx.corruption(),t.myu.look=t.director.stareT>0?{x:L/2,y:2200}:t.input.isDown&&this.tuck==="none"?[...t.input.active.values()][0]??null:null}for(const r of this.hearts)r.t+=e,r.x+=r.vx*e,r.y+=r.vy*e,r.vy-=30*e;if(this.hearts=this.hearts.filter(r=>r.t<r.max),this.tuck!=="none"){if(this.tuckT+=e,this.tuck==="dim"&&this.tuckT>1.4){this.tuck="sleep",this.tuckT=0,t.myu.asleep=!0,t.session.has("tucked")||(t.session.add("tucked"),t.state.addBond(2)),t.state.bumpMeter("energy",100),t.state.bumpMeter("mood",8);const r=wu[Math.min(4,Math.max(1,t.state.save.stage))]??[],a=r.length?t.rng.pick(r):"mmh...";t.dialogue.run([{text:a,mood:.6,pause:.4}])}else this.tuck==="sleep"&&this.tuckT>4.2&&!t.dialogue.active?(this.tuck="bye",this.tuckT=0,t.audio.stopLullaby(),t.audio.chime()):this.tuck==="bye"&&this.tuckT>2.2&&t.scenes.go(t,new vs);return}if(!t.dialogue.active&&this.beats.length>0&&this.beatDelay<=0&&this.crashT<=0&&(this.beats.shift()?.(),this.beatDelay=.8),t.state.save.stage>=2&&!t.state.has("fakeCrash")&&this.sessionT>45&&!t.dialogue.active&&this.beats.length===0&&this.crashT<=0&&!n&&(t.state.flag("fakeCrash"),this.crashT=3,this.crashShown=0,t.audio.staticBurst(.3),t.audio.stopLullaby()),this.crashT>0){this.crashT-=e,this.crashShown+=e,this.crashT<=0&&(t.state.save.muted||t.audio.startLullaby(),t.fx.glitchBurst(.8,.25),t.dialogue.run(Ou));return}if(!t.dialogue.active&&this.beats.length===0&&!n&&(this.idleT-=e,this.idleT<=0))if(this.idleT=26+t.rng.next()*22,t.rng.chance(.75)){const r=Jo[Math.min(4,t.state.save.stage)]??Jo[1]??[];r.length&&t.dialogue.run([{text:t.rng.pick(r),mood:.7}])}else t.audio.voice(.8,2),t.myu.hop();i&&(this.flickerCd-=e,this.flickerCd<=0&&(this.flickerCd=40+t.rng.next()*45,this.flickerFrames=2,t.audio.staticBurst(.06),t.state.mochiUnlocked()&&(this.mochiDoor=!0)))}onDown(t,e){if(!(this.crashT>0||this.tuck!=="none")&&!this.settingsOpen){for(const n of this.allBtns)n.pressed=n.contains(e.x,e.y);!t.state.has("modeWake")&&t.myu.hitTest(e.x,e.y)&&!t.dialogue.active&&this.pat(t,e)}}onMove(t,e){this.crashT>0||this.tuck!=="none"||this.settingsOpen||!t.state.has("modeWake")&&t.myu.hitTest(e.x,e.y)&&!t.dialogue.active&&t.rng.chance(.12)&&(this.spawnHearts(e.x,e.y-30,1),t.rng.chance(.3)&&t.audio.voice(.85,1))}onCancel(t,e){for(const n of this.allBtns)n.pressed=!1}onUp(t,e){for(const i of this.allBtns)i.pressed=!1;if(this.crashT>0||this.tuck!=="none"||!Xn(e))return;if(this.settingsOpen){this.settingsTap(t,e);return}if(this.mochiDoor&&t.state.has("modeStay")&&Math.hypot(e.x-(L-58),e.y-470)<44){t.state.beginMochi(),t.audio.error(),t.scenes.go(t,new Mr,{glitch:!0});return}const n=t.state.has("modeWake");if(n){if(this.feedBtn.contains(e.x,e.y)||this.playBtn.contains(e.x,e.y)||this.cleanBtn.contains(e.x,e.y)||this.sleepBtn.contains(e.x,e.y)){t.audio.error();return}}else{if(this.feedBtn.contains(e.x,e.y))return this.goPlay(t,new Gu);if(this.playBtn.contains(e.x,e.y))return this.goPlay(t,new Wu);if(this.cleanBtn.contains(e.x,e.y))return this.goPlay(t,new qu);if(this.sleepBtn.contains(e.x,e.y)){t.audio.pop(),this.tuck="dim",this.tuckT=0;return}}if(this.mailBtn.contains(e.x,e.y)){t.audio.pop(),t.scenes.go(t,new Yu);return}if(this.shopBtn.contains(e.x,e.y)){t.audio.pop(),t.state.flag("shopSeen"),t.dialogue.run(zu);return}if(this.gearBtn.contains(e.x,e.y)){t.audio.pop(),this.settingsOpen=!0,this.eraseArmed=!1;return}if(t.state.save.stage>=3&&!n&&e.x>286&&e.x<372&&e.y>630&&e.y<668){t.audio.error(),t.state.flag("backstage"),t.scenes.go(t,new $u,{glitch:!0});return}}goPlay(t,e){t.dialogue.active||(t.audio.pop(),t.scenes.go(t,e))}pat(t,e){if(t.myu.squish(),t.audio.voice(.9,2),this.spawnHearts(e.x,e.y-34,3),t.state.bumpMeter("mood",2),this.patCd<=0&&(this.patCd=40,t.state.addBond(1),t.rng.chance(.35))){const n=Qo[Math.min(4,t.state.save.stage)]??Qo[1]??[];n.length&&t.dialogue.run([{text:t.rng.pick(n),mood:.9}])}}spawnHearts(t,e,n){for(let i=0;i<n;i++)this.hearts.push({x:t+(Math.random()-.5)*30,y:e,vx:(Math.random()-.5)*40,vy:-50-Math.random()*40,t:0,max:1+Math.random()*.6,star:Math.random()<.25})}settingsTap(t,e){const i=L-90,r=t.sandbox?.save.unlocked?62:0,a=[{y:300,h:52},{y:362,h:52},{y:424+r,h:52},{y:496+r,h:48}];if(r&&e.x>45&&e.x<45+i&&e.y>424&&e.y<476){this.settingsOpen=!1,t.sandbox?.setOn(t,!0);return}const o=f=>e.x>45&&e.x<45+i&&e.y>f.y&&e.y<f.y+f.h,l=a[0],h=a[1],c=a[2],u=a[3];if(l&&o(l)){const f=!t.state.save.muted;t.state.save.muted=f,t.state.persist(),t.audio.setMuted(f),f||(t.audio.pop(),t.audio.startLullaby());return}if(h&&o(h)&&t.state.save.stage>=3){t.state.flag("dreamToggleNoticed"),t.state.has("dreamMode")?(t.state.unflag("dreamMode"),t.state.recordChoice("dreamOff","off"),t.audio.sad(),this.settingsOpen=!1,t.state.has("modeWake")?t.dialogue.run([{who:"sys",text:"there are no dreams to turn off. she took hers with her when she left."}]):t.dialogue.run(Bu)):(t.state.flag("dreamMode"),t.audio.pop());return}if(c&&o(c)){this.eraseArmed?(t.state.factoryReset(),location.reload()):(this.eraseArmed=!0,t.audio.error());return}if(u&&o(u)){t.audio.pop(),this.settingsOpen=!1;return}if(e.y>560+r&&e.y<600+r){const f=performance.now();this.settingsTaps=f-this.lastSettingsTapT<1400?this.settingsTaps+1:1,this.lastSettingsTapT=f,this.settingsTaps>=7&&(this.settingsTaps=0,this.settingsOpen=!1,t.audio.error(),t.scenes.go(t,new Ch,{glitch:!0}));return}(e.y<240||e.y>620+r)&&(this.settingsOpen=!1)}draw(t,e){const n=t.pal(),i=t.state.has("modeStay"),r=t.state.has("modeWake");if(this.crashT>0){e.fillStyle="#0a1428",e.fillRect(0,0,L,St),e.font=$t(12,500),e.textAlign="left";const l=Math.floor(this.crashShown/.3);for(let h=0;h<Math.min(el.length,l);h++)e.fillStyle=h===0?"#ff6688":"#b8c8e0",e.fillText(el[h]??"",30,300+h*22);return}const a=e.createLinearGradient(0,0,0,St);a.addColorStop(0,n.bgTop),a.addColorStop(1,n.bgBot),e.fillStyle=a,e.fillRect(0,0,L,St),e.fillStyle=n.floor,e.beginPath(),e.moveTo(0,578),e.quadraticCurveTo(L/2,548,L,578),e.lineTo(L,St),e.lineTo(0,St),e.closePath(),e.fill(),this.drawWindow(t,e,i),this.drawShelf(t,e),e.fillStyle=nt(255,255,255,.4),e.beginPath(),e.ellipse(L/2,588,134,28,0,0,Math.PI*2),e.fill(),e.strokeStyle=n.accent2,e.setLineDash([8,7]),e.lineWidth=2,e.beginPath(),e.ellipse(L/2,588,121,23,0,0,Math.PI*2),e.stroke(),e.setLineDash([]),r?(ae(e,L/2,520,7),e.fillStyle=nt(255,220,150,.9),e.fill(),e.font=$t(11,500),e.fillStyle=n.inkSoft,e.textAlign="center",e.fillText("the enclosure is open.",L/2,585)):t.myu.draw(e,n,t.t);for(const l of this.hearts){const h=1-l.t/l.max;e.save(),e.globalAlpha=h,l.star?(ae(e,l.x,l.y,7),e.fillStyle="#ffd166"):(li(e,l.x,l.y,8),e.fillStyle=n.accent),e.fill(),e.restore()}Nr(e,n,14,44,116,"tummy",t.state.save.meters.hunger,"star"),Nr(e,n,138,44,116,"heart",t.state.save.meters.mood,"heart"),Nr(e,n,262,44,114,"sleepy",t.state.save.meters.energy,"zzz");for(const l of this.allBtns)l.draw(e,n,l===this.shopBtn?"#ffb347":n.accent);const o=_o.filter(l=>l.stage<=t.state.save.stage&&!t.state.has(`mail_${l.id}`)).length;if(o>0&&(e.fillStyle=n.bad,e.beginPath(),e.arc(this.mailBtn.x+this.mailBtn.w-6,this.mailBtn.y+4,10,0,Math.PI*2),e.fill(),Yt(e,String(o),this.mailBtn.x+this.mailBtn.w-6,this.mailBtn.y+5,12,"#ffffff","center",800)),t.state.save.stage>=3&&!r){const l=(Math.random()-.5)*1.6;e.fillStyle="rgba(10,6,16,0.88)",vt(e,288+l,632,84,34,6),e.fill(),e.strokeStyle="#ff2266",e.lineWidth=1.4,vt(e,288+l,632,84,34,6),e.stroke(),e.font=$t(12,700),e.fillStyle="#ff2266",e.textAlign="center";let h=Math.floor(t.t*5);const c=()=>(h=h*1103515245+12345&2147483647,h%1e3/1e3);e.fillText(wh("maint",.25,c),330+l,650)}if(this.mochiDoor&&i){const l=L-58,h=470,c=(Math.sin(t.t*2)+1)/2;e.save(),e.globalAlpha=.5+c*.4;const u=e.createRadialGradient(l,h,2,l,h,36);u.addColorStop(0,nt(255,220,150,.9)),u.addColorStop(1,nt(255,220,150,0)),e.fillStyle=u,e.beginPath(),e.arc(l,h,36,0,Math.PI*2),e.fill(),ae(e,l,h,8+c*3),e.fillStyle="#ffd88a",e.fill(),e.restore()}if(iu(t,e),this.tuck!=="none"&&this.drawTuck(t,e),this.settingsOpen&&this.drawSettings(t,e),this.flickerFrames>0){this.flickerFrames--,e.fillStyle="rgba(5,3,10,0.88)",e.fillRect(0,0,L,St),e.strokeStyle="#ff2266",e.lineWidth=1.2,e.strokeRect(30,90,L-60,560);for(let c=1;c<4;c++)e.beginPath(),e.moveTo(30,90+c*140),e.lineTo(L-30,90+c*140),e.stroke();const l=t.myu,h=l.mode;l.mode="wireframe",l.draw(e,n,t.t),l.mode=h,e.font=$t(11,500),e.fillStyle="#ff2266",e.textAlign="center",e.fillText("[ dream integrity: 99.7% ]",L/2,780)}}drawWindow(t,e,n){const i=t.pal(),r=52,a=108,o=286,l=205,h=t.hour(),c=h>=20||h<6,u=n||!c&&(h>=17||h<8);e.save(),e.shadowColor="rgba(90,50,90,0.2)",e.shadowBlur=12,e.shadowOffsetY=4,e.fillStyle=i.panel,vt(e,r-12,a-12,o+24,l+24,26),e.fill(),e.restore();const f=e.createLinearGradient(0,a,0,a+l);if(n||u?(f.addColorStop(0,n?"#ffb8d9":"#ffd9b8"),f.addColorStop(1,n?"#8a6ac0":"#ffb8d9")):c?(f.addColorStop(0,"#2a2450"),f.addColorStop(1,"#4a3a7a")):(f.addColorStop(0,"#bfe4ff"),f.addColorStop(1,"#e8f7ff")),e.save(),vt(e,r,a,o,l,18),e.clip(),e.fillStyle=f,e.fillRect(r,a,o,l),c||n){for(let g=0;g<18;g++){const v=r+g*47.7%o,m=a+g*31.3%(l-30),p=.5+.5*Math.abs(Math.sin(t.t*.9+g));ae(e,v,m,2+g%2),e.fillStyle=nt(255,250,220,.8*p),e.fill()}yr(e,r+o-60,a+50,22),e.fillStyle="#fff2c8",e.fill()}else{for(const[g,v,m]of[[70,60,1],[190,110,.8],[120,150,.6]]){const p=r+(g+t.t*5*m)%(o+80)-40;e.fillStyle=nt(255,255,255,.85),e.beginPath(),e.ellipse(p,a+v,34*m,16*m,0,0,Math.PI*2),e.ellipse(p+24*m,a+v+4,24*m,13*m,0,0,Math.PI*2),e.ellipse(p-24*m,a+v+5,22*m,12*m,0,0,Math.PI*2),e.fill()}u&&(e.fillStyle=nt(255,200,140,.9),e.beginPath(),e.arc(r+60,a+l-40,26,0,Math.PI*2),e.fill())}e.restore(),e.strokeStyle=i.panelLine,e.lineWidth=3,vt(e,r,a,o,l,18),e.stroke(),e.beginPath(),e.moveTo(r+o/2,a),e.lineTo(r+o/2,a+l),e.stroke();const d=Math.sin(t.t*1.1)*4;e.strokeStyle=i.inkSoft,e.lineWidth=1.4;for(const[g,v,m]of[[-70,34,8],[0,52,11],[70,40,9]]){const p=r+o/2+g+d*(v/52);e.beginPath(),e.moveTo(r+o/2+g,a-12),e.lineTo(p,a-12+v),e.stroke(),ae(e,p,a-8+v,m),e.fillStyle=["#ffd166","#ff8fb8","#7fd4c0"][m%3]??"#ffd166",e.fill()}}drawShelf(t,e){const n=t.pal();e.fillStyle=n.panel,vt(e,18,420,96,12,6),e.fill(),e.strokeStyle=n.panelLine,e.lineWidth=2,vt(e,18,420,96,12,6),e.stroke(),e.fillStyle=n.lavender,vt(e,28,392,30,28,6),e.fill(),Yt(e,"4",43,407,15,"#ffffff","center",800),e.fillStyle=n.accent2,vt(e,62,392,30,28,6),e.fill(),Yt(e,"7",77,407,15,"#ffffff","center",800);const i=56,r=612;e.fillStyle="#e8a87c",vt(e,i-18,r,36,30,7),e.fill(),e.strokeStyle=n.accent2,e.lineWidth=3.4,e.lineCap="round";for(const h of[-.5,0,.5])e.beginPath(),e.moveTo(i,r+2),e.quadraticCurveTo(i+h*26,r-22,i+h*34,r-34),e.stroke();const a=i+17,o=r-36;for(let h=0;h<5;h++){const c=h/5*Math.PI*2+t.t*.1;e.fillStyle=n.accent,e.beginPath(),e.ellipse(a+Math.cos(c)*8,o+Math.sin(c)*8,6,4,c,0,Math.PI*2),e.fill()}if(t.fx.corruption()>.3){const h=Math.abs(Math.sin(t.t*.4))>.06?1:.15;e.fillStyle="#fff",e.beginPath(),e.ellipse(a,o,5,4*h,0,0,Math.PI*2),e.fill(),e.fillStyle="#1a0f22",e.beginPath(),e.ellipse(a,o,2.4,3*h,0,0,Math.PI*2),e.fill()}else e.fillStyle="#ffd166",e.beginPath(),e.arc(a,o,4.5,0,Math.PI*2),e.fill()}drawTuck(t,e){const n=t.pal(),i=this.tuck==="dim"?Math.min(1,this.tuckT/1.4):1,r=e.createRadialGradient(L/2,470,90,L/2,470,560);if(r.addColorStop(0,`rgba(18,10,40,${.25*i})`),r.addColorStop(1,`rgba(10,6,26,${.82*i})`),e.fillStyle=r,e.fillRect(0,0,L,St),this.tuck!=="dim"||this.tuckT>.6){const o=560-(this.tuck==="dim"?Math.min(1,(this.tuckT-.6)/.8):1)*88;e.save(),e.shadowColor="rgba(0,0,0,0.3)",e.shadowBlur=10,e.fillStyle=n.lavender,vt(e,L/2-108,o,216,130,26),e.fill(),e.restore();for(let l=0;l<6;l++)ae(e,L/2-80+l%3*76,o+30+Math.floor(l/3)*52,7),e.fillStyle=nt(255,255,255,.7),e.fill()}if(this.tuck==="bye"){const a=Math.min(1,this.tuckT/.8);e.save(),e.globalAlpha=a,Te(e,"see you soon ✦",L/2,300,30,"#ffffff",n.accent,7),e.restore()}}drawSettings(t,e){const n=t.pal();e.fillStyle="rgba(30,16,40,0.5)",e.fillRect(0,0,L,St);const i=45,r=L-90,a=t.sandbox?.save.unlocked?62:0;e.save(),e.shadowColor="rgba(30,10,40,0.4)",e.shadowBlur=22,e.fillStyle=n.panel,vt(e,i-12,244,r+24,372+a,26),e.fill(),e.restore(),Te(e,"settings",L/2,274,22,n.ink,"#ffffff",5);const o=(l,h,c,u)=>{e.fillStyle=nt(255,255,255,.6),vt(e,i,l,r,52,15),e.fill(),e.strokeStyle=n.panelLine,e.lineWidth=1.5,vt(e,i,l,r,52,15),e.stroke(),Yt(e,h,i+18,l+26,15,n.ink,"left",800),Yt(e,c,i+r-18,l+26,14,u,"right",800)};o(300,"sound",t.state.save.muted?"OFF":"ON",t.state.save.muted?n.inkSoft:n.accent2),t.state.save.stage>=3?(o(362,"DREAM MODE",t.state.has("dreamMode")?"ON":"OFF",t.state.has("dreamMode")?n.accent:n.inkSoft),t.state.has("dreamToggleNoticed")||Yt(e,"you didn't turn this on.",i+18,430,10,n.inkSoft,"left",600,!0)):o(362,"DREAM MODE","—",n.inkSoft),a&&o(424,"SANDBOX MODE","OFF",n.inkSoft),o(424+a,this.eraseArmed?"erase EVERYTHING?":"erase unit memory",this.eraseArmed?"tap again":"",n.bad),o(496+a,"close","",n.accent2),e.font=$t(10,500),e.fillStyle=n.inkSoft,e.textAlign="center",e.fillText("CRADLE/OS v0.4.7 — unit 047 — op "+t.state.save.op,L/2,580+a)}}class ju{input=null;confirm=new nn(L/2-92,268,184,56,"");phase="intro";hatchT=0;erasedCandidate="";prevValue="";sparkles=[];enter(t){t.director.suspended=!0,t.myu.asleep=!0,t.myu.mode="normal",t.myu.corruption=0,t.myu.x=L/2,t.myu.y=545,t.state.save.muted||t.audio.startLullaby(),t.dialogue.run(_u,()=>{this.phase="typing",this.makeInput(t)})}exit(t){this.input?.remove(),this.input=null}makeInput(t){const e=document.createElement("input");e.type="text",e.maxLength=12,e.placeholder="name your myu…",e.autocomplete="off",e.spellcheck=!1,Object.assign(e.style,{position:"fixed",textAlign:"center",fontSize:"22px",fontWeight:"800",fontFamily:'"M PLUS Rounded 1c", ui-rounded, system-ui, sans-serif',color:"#5b4a63",background:"#fff6f9",border:"3px solid #ff8fb8",borderRadius:"22px",outline:"none",padding:"10px 14px",zIndex:"10"}),e.addEventListener("input",()=>{const n=e.value;n.length<this.prevValue.length&&this.prevValue.trim().length>=2&&(this.erasedCandidate=this.prevValue.trim()),this.prevValue=n}),e.addEventListener("keydown",n=>{n.key==="Enter"&&this.submit(t)}),document.body.appendChild(e),this.input=e,this.positionInput(t),e.focus()}positionInput(t){if(!this.input)return;const e=t.screen,n=e.scale/e.dpr,i=e.ox/e.dpr+50*n,r=e.oy/e.dpr+196*n,a=(L-100)*n;this.input.style.left=`${i}px`,this.input.style.top=`${r}px`,this.input.style.width=`${a}px`}submit(t){const e=this.input;if(!e)return;const n=e.value.trim().slice(0,12);if(n){t.state.save.name=n,this.erasedCandidate&&this.erasedCandidate.toLowerCase()!==n.toLowerCase()&&(t.state.save.erasedName=this.erasedCandidate.slice(0,12)),t.state.flag("named"),t.state.persist(),e.remove(),this.input=null,this.phase="hatch",this.hatchT=0,t.audio.chime(),t.audio.sparkle(),t.myu.asleep=!1,t.myu.squish();for(let i=0;i<16;i++)this.sparkles.push({x:L/2+(Math.random()-.5)*200,y:545+(Math.random()-.5)*180,t:Math.random()*.4})}}update(t,e){this.positionInput(t);for(const n of this.sparkles)n.t+=e;this.sparkles=this.sparkles.filter(n=>n.t<1.2),this.phase==="hatch"&&(this.hatchT+=e,this.hatchT>1.6&&t.scenes.go(t,new on))}onDown(t,e){this.confirm.pressed=this.phase==="typing"&&this.confirm.contains(e.x,e.y)}onUp(t,e){this.confirm.pressed=!1,!(this.phase!=="typing"||!Xn(e))&&this.confirm.contains(e.x,e.y)&&this.submit(t)}draw(t,e){const n=t.pal(),i=e.createLinearGradient(0,0,0,St);i.addColorStop(0,n.bgTop),i.addColorStop(1,n.bgBot),e.fillStyle=i,e.fillRect(0,0,L,St);const r=545;if(e.save(),e.fillStyle=nt(255,255,255,.35),e.beginPath(),e.ellipse(L/2,r+8,130,150,0,0,Math.PI*2),e.fill(),e.strokeStyle=nt(255,255,255,.9),e.lineWidth=4,e.beginPath(),e.ellipse(L/2,r+8,130,150,0,0,Math.PI*2),e.stroke(),e.strokeStyle=nt(255,255,255,.8),e.lineWidth=6,e.lineCap="round",e.beginPath(),e.arc(L/2,r+8,118,-1.9,-1.25),e.stroke(),e.restore(),this.phase==="hatch"){const a=Math.min(1,this.hatchT/.5);e.save(),e.globalAlpha=a*.9,e.fillStyle="#fffce8",e.beginPath(),e.ellipse(L/2,r+8,130*(1+this.hatchT*.3),150*(1+this.hatchT*.3),0,0,Math.PI*2),e.fill(),e.restore()}t.myu.draw(e,n,t.t);for(const a of this.sparkles)xh(e,a.x,a.y-a.t*40,10*(1-a.t/1.2),"#ffd166",1-a.t/1.2);Te(e,this.phase==="hatch"?`${t.state.save.name}!`:"a delivery for you",L/2,118,30,n.accent,"#ffffff",8),this.phase==="typing"&&(Yt(e,"(names are permanent, cherished, and archived)",L/2,156,12.5,n.inkSoft,"center",700),this.confirm.draw(e,n),Yt(e,"hello ✦",L/2,296+(this.confirm.pressed?3:0),19,n.ink,"center",800))}}class vs{startBtn=new nn(L/2-110,620,220,62,"");muteBtn=new nn(L-62,42,46,46,"","none");versionTaps=0;lastTapT=0;enter(t){t.director.suspended=!0,t.fx.setStage(0),t.fx.drainOverride=null,t.myu.mode="normal",t.myu.corruption=t.state.save.endings.stay?.12:0,t.myu.asleep=!1,t.myu.x=L/2,t.myu.y=470,t.myu.r=74,t.myu.mood=.85,t.myu.freckle=t.state.residual().freckle,t.state.save.muted||t.audio.startLullaby()}update(t,e){t.myu.look=null}onDown(t,e){this.startBtn.pressed=this.startBtn.contains(e.x,e.y)}onUp(t,e){if(this.startBtn.pressed=!1,!!Xn(e)){if(this.startBtn.contains(e.x,e.y)){t.audio.pop(),t.state.has("named")?t.state.has("modeWake")?t.scenes.go(t,new Mr):t.scenes.go(t,new on):t.scenes.go(t,new ju);return}if(this.muteBtn.contains(e.x,e.y)){const n=!t.state.save.muted;t.state.save.muted=n,t.state.persist(),t.audio.setMuted(n),n||(t.audio.pop(),t.audio.startLullaby());return}if(e.y>St-60&&Math.abs(e.x-L/2)<120){const n=performance.now();this.versionTaps=n-this.lastTapT<1400?this.versionTaps+1:1,this.lastTapT=n,this.versionTaps>=7&&(this.versionTaps=0,t.audio.error(),t.scenes.go(t,new Ch,{glitch:!0}));return}t.myu.hitTest(e.x,e.y)&&(t.myu.squish(),t.audio.voice(.9,2))}}draw(t,e){const n=t.pal(),i=t.state.has("modeWake"),r=e.createLinearGradient(0,0,0,St);r.addColorStop(0,n.bgTop),r.addColorStop(1,n.bgBot),e.fillStyle=r,e.fillRect(0,0,L,St);for(let f=0;f<26;f++){const d=f*73.3%L,g=(f*141.7+t.t*(4+f%5))%(St+40)-20,v=.4+.6*Math.abs(Math.sin(t.t*.8+f*2.4));ae(e,d,g,2.4+f%3),e.fillStyle=nt(255,255,255,.5*v),e.fill()}if(Te(e,"LULLABYTE",L/2,200,52,n.accent,"#ffffff",10),Te(e,"ララバイト",L/2,248,22,n.ink,"#ffffff",6),Yt(e,"companion cultivation suite",L/2,282,13,n.inkSoft,"center",700),!i)t.myu.draw(e,n,t.t);else{e.fillStyle=nt(255,255,255,.28),e.beginPath(),e.ellipse(L/2,545,84,20,0,0,Math.PI*2),e.fill(),ae(e,L/2,520,6),e.fillStyle=nt(255,220,150,.9),e.fill();const f=t.screen.viewL+18;if(f<-10){const d=300+Math.sin(t.t*.5)*140;this.drawMarginWalker(e,f,d,t.t)}}const a=t.state.has("named")?"continue ✦":"begin ✦";this.startBtn.draw(e,n),Yt(e,a,L/2,651+(this.startBtn.pressed?3:0),21,n.ink,"center",800),this.muteBtn.draw(e,n),Yt(e,t.state.save.muted?"♪̸":"♪",L-39,66,18,n.ink,"center",800);const o=t.state.residual().endings,l=t.state.save.endings,h={sever:l.sever||o.sever,stay:l.stay||o.stay,wake:l.wake||o.wake};[[h.sever,"SEVER"],[h.stay,"STAY"],[h.wake,"WAKE"]].forEach(([f,d],g)=>{const v=L/2+(g-1)*74;ae(e,v,726,9),e.fillStyle=f?"#ffc966":nt(255,255,255,.45),e.fill(),f&&Yt(e,d,v,746,9,n.inkSoft,"center",700,!0)}),t.state.residual().severCount>0&&!t.state.has("named")&&(e.font=$t(10,500),e.fillStyle=n.inkSoft,e.textAlign="center",e.fillText(Vu,L/2,775)),e.font=$t(11,500),e.fillStyle=this.versionTaps>=4?n.accent:n.inkSoft,e.textAlign="center",e.fillText(this.versionTaps>=4?`CRADLE/OS v0.4.7 — unit 047 — [${7-this.versionTaps}]`:"CRADLE/OS v0.4.7 — unit 047",L/2,St-28)}drawMarginWalker(t,e,n,i){t.save(),t.fillStyle=nt(255,200,225,.5),t.beginPath(),t.ellipse(e,n,7,6,0,0,Math.PI*2),t.fill(),t.beginPath(),t.ellipse(e-3,n-6,1.6,3,-.3,0,Math.PI*2),t.ellipse(e+3,n-6,1.6,3,.3,0,Math.PI*2),t.fill();const r=Math.sin(i*6);t.strokeStyle=nt(255,200,225,.5),t.lineWidth=1.6,t.beginPath(),t.moveTo(e-2,n+5),t.lineTo(e-2+r*3,n+10),t.moveTo(e+2,n+5),t.lineTo(e+2-r*3,n+10),t.stroke(),t.restore()}}const Us=["HOSHIBOSHI HEAVY INDUSTRIES","CRADLE/OS v0.4.7 — bare metal loader","","  enclosure ......... OK","  glass ............. OK","  lullaby ........... OK","  memory ............ OK (worn)","  unit 047 .......... PRESENT","  operator .......... DETECTED","","mounting softness..."];class Ku{t=0;done=!1;enter(t){t.director.suspended=!0,t.audio.stopLullaby()}update(t,e){this.t+=e,this.t>2.6&&!this.done&&(this.done=!0,t.scenes.go(t,new vs))}onUp(t){this.done||(this.done=!0,t.scenes.go(t,new vs))}draw(t,e){e.fillStyle="#07050c",e.fillRect(0,0,L,St),e.font=$t(13,500),e.textAlign="left",e.textBaseline="middle";const n=Math.floor(this.t/.18);for(let i=0;i<Math.min(Us.length,n);i++){const r=Us[i]??"";e.fillStyle=i===0?"#ff8fb8":"#7fd4c0",e.fillText(r,34,160+i*24)}n>Us.length&&Math.sin(t.t*8)>0&&(e.fillStyle="#7fd4c0",e.fillText("_",34,160+Us.length*24))}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const yo="170",Zu=0,nl=1,Ju=2,Rh=1,Ph=2,bn=3,Gn=0,Ne=1,Tn=2,Hn=0,Ui=1,il=2,sl=3,rl=4,Qu=5,ei=100,tf=101,ef=102,nf=103,sf=104,rf=200,af=201,of=202,lf=203,Aa=204,Ca=205,hf=206,cf=207,uf=208,ff=209,df=210,pf=211,mf=212,gf=213,vf=214,Ra=0,Pa=1,La=2,Fi=3,Da=4,Ia=5,Ua=6,Na=7,Lh=0,_f=1,yf=2,Vn=0,Mf=1,Sf=2,xf=3,wf=4,bf=5,Tf=6,Dh=7,Ih=300,Bi=301,zi=302,ka=303,Oa=304,Sr=306,pr=1e3,ai=1001,Fa=1002,We=1003,Ef=1004,Ns=1005,fn=1006,Fr=1007,oi=1008,Rn=1009,Uh=1010,Nh=1011,_s=1012,Mo=1013,hi=1014,dn=1015,ws=1016,So=1017,xo=1018,Hi=1020,kh=35902,Oh=1021,Fh=1022,rn=1023,Bh=1024,zh=1025,Ni=1026,Vi=1027,wo=1028,bo=1029,Hh=1030,To=1031,Eo=1033,or=33776,lr=33777,hr=33778,cr=33779,Ba=35840,za=35841,Ha=35842,Va=35843,Ga=36196,Wa=37492,Xa=37496,qa=37808,Ya=37809,$a=37810,ja=37811,Ka=37812,Za=37813,Ja=37814,Qa=37815,to=37816,eo=37817,no=37818,io=37819,so=37820,ro=37821,ur=36492,ao=36494,oo=36495,Vh=36283,lo=36284,ho=36285,co=36286,Af=3200,Cf=3201,Gh=0,Rf=1,zn="",Be="srgb",qi="srgb-linear",xr="linear",oe="srgb",mi=7680,al=519,Pf=512,Lf=513,Df=514,Wh=515,If=516,Uf=517,Nf=518,kf=519,ol=35044,ll=35048,hl="300 es",En=2e3,mr=2001;class Yi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,t);t.target=null}}}const Ce=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Br=Math.PI/180,uo=180/Math.PI;function $i(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ce[s&255]+Ce[s>>8&255]+Ce[s>>16&255]+Ce[s>>24&255]+"-"+Ce[t&255]+Ce[t>>8&255]+"-"+Ce[t>>16&15|64]+Ce[t>>24&255]+"-"+Ce[e&63|128]+Ce[e>>8&255]+"-"+Ce[e>>16&255]+Ce[e>>24&255]+Ce[n&255]+Ce[n>>8&255]+Ce[n>>16&255]+Ce[n>>24&255]).toLowerCase()}function xe(s,t,e){return Math.max(t,Math.min(e,s))}function Of(s,t){return(s%t+t)%t}function zr(s,t,e){return(1-e)*s+e*t}function ts(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Oe(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}class at{constructor(t=0,e=0){at.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(xe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*i+t.x,this.y=r*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Wt{constructor(t,e,n,i,r,a,o,l,h){Wt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,h)}set(t,e,n,i,r,a,o,l,h){const c=this.elements;return c[0]=t,c[1]=i,c[2]=o,c[3]=e,c[4]=r,c[5]=l,c[6]=n,c[7]=a,c[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],h=n[1],c=n[4],u=n[7],f=n[2],d=n[5],g=n[8],v=i[0],m=i[3],p=i[6],T=i[1],M=i[4],y=i[7],k=i[2],A=i[5],C=i[8];return r[0]=a*v+o*T+l*k,r[3]=a*m+o*M+l*A,r[6]=a*p+o*y+l*C,r[1]=h*v+c*T+u*k,r[4]=h*m+c*M+u*A,r[7]=h*p+c*y+u*C,r[2]=f*v+d*T+g*k,r[5]=f*m+d*M+g*A,r[8]=f*p+d*y+g*C,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],h=t[7],c=t[8];return e*a*c-e*o*h-n*r*c+n*o*l+i*r*h-i*a*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],h=t[7],c=t[8],u=c*a-o*h,f=o*l-c*r,d=h*r-a*l,g=e*u+n*f+i*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=u*v,t[1]=(i*h-c*n)*v,t[2]=(o*n-i*a)*v,t[3]=f*v,t[4]=(c*e-i*l)*v,t[5]=(i*r-o*e)*v,t[6]=d*v,t[7]=(n*l-h*e)*v,t[8]=(a*e-n*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,a,o){const l=Math.cos(r),h=Math.sin(r);return this.set(n*l,n*h,-n*(l*a+h*o)+a+t,-i*h,i*l,-i*(-h*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Hr.makeScale(t,e)),this}rotate(t){return this.premultiply(Hr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Hr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Hr=new Wt;function Xh(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function gr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Ff(){const s=gr("canvas");return s.style.display="block",s}const cl={};function cs(s){s in cl||(cl[s]=!0,console.warn(s))}function Bf(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function zf(s){const t=s.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Hf(s){const t=s.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Qt={enabled:!0,workingColorSpace:qi,spaces:{},convert:function(s,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===oe&&(s.r=Cn(s.r),s.g=Cn(s.g),s.b=Cn(s.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(s.applyMatrix3(this.spaces[t].toXYZ),s.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===oe&&(s.r=ki(s.r),s.g=ki(s.g),s.b=ki(s.b))),s},fromWorkingColorSpace:function(s,t){return this.convert(s,this.workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===zn?xr:this.spaces[s].transfer},getLuminanceCoefficients:function(s,t=this.workingColorSpace){return s.fromArray(this.spaces[t].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,t,e){return s.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};function Cn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function ki(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}const ul=[.64,.33,.3,.6,.15,.06],fl=[.2126,.7152,.0722],dl=[.3127,.329],pl=new Wt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ml=new Wt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Qt.define({[qi]:{primaries:ul,whitePoint:dl,transfer:xr,toXYZ:pl,fromXYZ:ml,luminanceCoefficients:fl,workingColorSpaceConfig:{unpackColorSpace:Be},outputColorSpaceConfig:{drawingBufferColorSpace:Be}},[Be]:{primaries:ul,whitePoint:dl,transfer:oe,toXYZ:pl,fromXYZ:ml,luminanceCoefficients:fl,outputColorSpaceConfig:{drawingBufferColorSpace:Be}}});let gi;class Vf{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{gi===void 0&&(gi=gr("canvas")),gi.width=t.width,gi.height=t.height;const n=gi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=gi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=gr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=Cn(r[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Cn(e[n]/255)*255):e[n]=Cn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Gf=0;class qh{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Gf++}),this.uuid=$i(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(Vr(i[a].image)):r.push(Vr(i[a]))}else r=Vr(i);n.url=r}return e||(t.images[this.uuid]=n),n}}function Vr(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Vf.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Wf=0;class Pe extends Yi{constructor(t=Pe.DEFAULT_IMAGE,e=Pe.DEFAULT_MAPPING,n=ai,i=ai,r=fn,a=oi,o=rn,l=Rn,h=Pe.DEFAULT_ANISOTROPY,c=zn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Wf++}),this.uuid=$i(),this.name="",this.source=new qh(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=h,this.format=o,this.internalFormat=null,this.type=l,this.offset=new at(0,0),this.repeat=new at(1,1),this.center=new at(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Wt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=c,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Ih)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case pr:t.x=t.x-Math.floor(t.x);break;case ai:t.x=t.x<0?0:1;break;case Fa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case pr:t.y=t.y-Math.floor(t.y);break;case ai:t.y=t.y<0?0:1;break;case Fa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Pe.DEFAULT_IMAGE=null;Pe.DEFAULT_MAPPING=Ih;Pe.DEFAULT_ANISOTROPY=1;class le{constructor(t=0,e=0,n=0,i=1){le.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r;const l=t.elements,h=l[0],c=l[4],u=l[8],f=l[1],d=l[5],g=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(c-f)<.01&&Math.abs(u-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(c+f)<.1&&Math.abs(u+v)<.1&&Math.abs(g+m)<.1&&Math.abs(h+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(h+1)/2,y=(d+1)/2,k=(p+1)/2,A=(c+f)/4,C=(u+v)/4,D=(g+m)/4;return M>y&&M>k?M<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(M),i=A/n,r=C/n):y>k?y<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(y),n=A/i,r=D/i):k<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(k),n=C/r,i=D/r),this.set(n,i,r,e),this}let T=Math.sqrt((m-g)*(m-g)+(u-v)*(u-v)+(f-c)*(f-c));return Math.abs(T)<.001&&(T=1),this.x=(m-g)/T,this.y=(u-v)/T,this.z=(f-c)/T,this.w=Math.acos((h+d+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Xf extends Yi{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new le(0,0,t,e),this.scissorTest=!1,this.viewport=new le(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:fn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Pe(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new qh(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ci extends Xf{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Yh extends Pe{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=We,this.minFilter=We,this.wrapR=ai,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class qf extends Pe{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=We,this.minFilter=We,this.wrapR=ai,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class fi{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,a,o){let l=n[i+0],h=n[i+1],c=n[i+2],u=n[i+3];const f=r[a+0],d=r[a+1],g=r[a+2],v=r[a+3];if(o===0){t[e+0]=l,t[e+1]=h,t[e+2]=c,t[e+3]=u;return}if(o===1){t[e+0]=f,t[e+1]=d,t[e+2]=g,t[e+3]=v;return}if(u!==v||l!==f||h!==d||c!==g){let m=1-o;const p=l*f+h*d+c*g+u*v,T=p>=0?1:-1,M=1-p*p;if(M>Number.EPSILON){const k=Math.sqrt(M),A=Math.atan2(k,p*T);m=Math.sin(m*A)/k,o=Math.sin(o*A)/k}const y=o*T;if(l=l*m+f*y,h=h*m+d*y,c=c*m+g*y,u=u*m+v*y,m===1-o){const k=1/Math.sqrt(l*l+h*h+c*c+u*u);l*=k,h*=k,c*=k,u*=k}}t[e]=l,t[e+1]=h,t[e+2]=c,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,r,a){const o=n[i],l=n[i+1],h=n[i+2],c=n[i+3],u=r[a],f=r[a+1],d=r[a+2],g=r[a+3];return t[e]=o*g+c*u+l*d-h*f,t[e+1]=l*g+c*f+h*u-o*d,t[e+2]=h*g+c*d+o*f-l*u,t[e+3]=c*g-o*u-l*f-h*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,h=o(n/2),c=o(i/2),u=o(r/2),f=l(n/2),d=l(i/2),g=l(r/2);switch(a){case"XYZ":this._x=f*c*u+h*d*g,this._y=h*d*u-f*c*g,this._z=h*c*g+f*d*u,this._w=h*c*u-f*d*g;break;case"YXZ":this._x=f*c*u+h*d*g,this._y=h*d*u-f*c*g,this._z=h*c*g-f*d*u,this._w=h*c*u+f*d*g;break;case"ZXY":this._x=f*c*u-h*d*g,this._y=h*d*u+f*c*g,this._z=h*c*g+f*d*u,this._w=h*c*u-f*d*g;break;case"ZYX":this._x=f*c*u-h*d*g,this._y=h*d*u+f*c*g,this._z=h*c*g-f*d*u,this._w=h*c*u+f*d*g;break;case"YZX":this._x=f*c*u+h*d*g,this._y=h*d*u+f*c*g,this._z=h*c*g-f*d*u,this._w=h*c*u-f*d*g;break;case"XZY":this._x=f*c*u-h*d*g,this._y=h*d*u-f*c*g,this._z=h*c*g+f*d*u,this._w=h*c*u+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],r=e[8],a=e[1],o=e[5],l=e[9],h=e[2],c=e[6],u=e[10],f=n+o+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(c-l)*d,this._y=(r-h)*d,this._z=(a-i)*d}else if(n>o&&n>u){const d=2*Math.sqrt(1+n-o-u);this._w=(c-l)/d,this._x=.25*d,this._y=(i+a)/d,this._z=(r+h)/d}else if(o>u){const d=2*Math.sqrt(1+o-n-u);this._w=(r-h)/d,this._x=(i+a)/d,this._y=.25*d,this._z=(l+c)/d}else{const d=2*Math.sqrt(1+u-n-o);this._w=(a-i)/d,this._x=(r+h)/d,this._y=(l+c)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(xe(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,r=t._z,a=t._w,o=e._x,l=e._y,h=e._z,c=e._w;return this._x=n*c+a*o+i*h-r*l,this._y=i*c+a*l+r*o-n*h,this._z=r*c+a*h+n*l-i*o,this._w=a*c-n*o-i*l-r*h,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+i*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=i,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const d=1-e;return this._w=d*a+e*this._w,this._x=d*n+e*this._x,this._y=d*i+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}const h=Math.sqrt(l),c=Math.atan2(h,o),u=Math.sin((1-e)*c)/h,f=Math.sin(e*c)/h;return this._w=a*u+this._w*f,this._x=n*u+this._x*f,this._y=i*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(t=0,e=0,n=0){P.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(gl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(gl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,r=t.x,a=t.y,o=t.z,l=t.w,h=2*(a*i-o*n),c=2*(o*e-r*i),u=2*(r*n-a*e);return this.x=e+l*h+a*u-o*c,this.y=n+l*c+o*h-r*u,this.z=i+l*u+r*c-a*h,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Gr.copy(this).projectOnVector(t),this.sub(Gr)}reflect(t){return this.sub(Gr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(xe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Gr=new P,gl=new fi;class di{constructor(t=new P(1/0,1/0,1/0),e=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Je.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Je.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Je.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Je):Je.fromBufferAttribute(r,a),Je.applyMatrix4(t.matrixWorld),this.expandByPoint(Je);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ks.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ks.copy(n.boundingBox)),ks.applyMatrix4(t.matrixWorld),this.union(ks)}const i=t.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Je),Je.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(es),Os.subVectors(this.max,es),vi.subVectors(t.a,es),_i.subVectors(t.b,es),yi.subVectors(t.c,es),Dn.subVectors(_i,vi),In.subVectors(yi,_i),Yn.subVectors(vi,yi);let e=[0,-Dn.z,Dn.y,0,-In.z,In.y,0,-Yn.z,Yn.y,Dn.z,0,-Dn.x,In.z,0,-In.x,Yn.z,0,-Yn.x,-Dn.y,Dn.x,0,-In.y,In.x,0,-Yn.y,Yn.x,0];return!Wr(e,vi,_i,yi,Os)||(e=[1,0,0,0,1,0,0,0,1],!Wr(e,vi,_i,yi,Os))?!1:(Fs.crossVectors(Dn,In),e=[Fs.x,Fs.y,Fs.z],Wr(e,vi,_i,yi,Os))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Je).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Je).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(vn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),vn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),vn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),vn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),vn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),vn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),vn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),vn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(vn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const vn=[new P,new P,new P,new P,new P,new P,new P,new P],Je=new P,ks=new di,vi=new P,_i=new P,yi=new P,Dn=new P,In=new P,Yn=new P,es=new P,Os=new P,Fs=new P,$n=new P;function Wr(s,t,e,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){$n.fromArray(s,r);const o=i.x*Math.abs($n.x)+i.y*Math.abs($n.y)+i.z*Math.abs($n.z),l=t.dot($n),h=e.dot($n),c=n.dot($n);if(Math.max(-Math.max(l,h,c),Math.min(l,h,c))>o)return!1}return!0}const Yf=new di,ns=new P,Xr=new P;class bs{constructor(t=new P,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Yf.setFromPoints(t).getCenter(n);let i=0;for(let r=0,a=t.length;r<a;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ns.subVectors(t,this.center);const e=ns.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(ns,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Xr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ns.copy(t.center).add(Xr)),this.expandByPoint(ns.copy(t.center).sub(Xr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const _n=new P,qr=new P,Bs=new P,Un=new P,Yr=new P,zs=new P,$r=new P;class $f{constructor(t=new P,e=new P(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,_n)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=_n.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(_n.copy(this.origin).addScaledVector(this.direction,e),_n.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){qr.copy(t).add(e).multiplyScalar(.5),Bs.copy(e).sub(t).normalize(),Un.copy(this.origin).sub(qr);const r=t.distanceTo(e)*.5,a=-this.direction.dot(Bs),o=Un.dot(this.direction),l=-Un.dot(Bs),h=Un.lengthSq(),c=Math.abs(1-a*a);let u,f,d,g;if(c>0)if(u=a*l-o,f=a*o-l,g=r*c,u>=0)if(f>=-g)if(f<=g){const v=1/c;u*=v,f*=v,d=u*(u+a*f+2*o)+f*(a*u+f+2*l)+h}else f=r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+h;else f=-r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+h;else f<=-g?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+h):f<=g?(u=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+h):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+h);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+h;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(qr).addScaledVector(Bs,f),d}intersectSphere(t,e){_n.subVectors(t.center,this.origin);const n=_n.dot(this.direction),i=_n.dot(_n)-n*n,r=t.radius*t.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,a,o,l;const h=1/this.direction.x,c=1/this.direction.y,u=1/this.direction.z,f=this.origin;return h>=0?(n=(t.min.x-f.x)*h,i=(t.max.x-f.x)*h):(n=(t.max.x-f.x)*h,i=(t.min.x-f.x)*h),c>=0?(r=(t.min.y-f.y)*c,a=(t.max.y-f.y)*c):(r=(t.max.y-f.y)*c,a=(t.min.y-f.y)*c),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),u>=0?(o=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(o=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,_n)!==null}intersectTriangle(t,e,n,i,r){Yr.subVectors(e,t),zs.subVectors(n,t),$r.crossVectors(Yr,zs);let a=this.direction.dot($r),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Un.subVectors(this.origin,t);const l=o*this.direction.dot(zs.crossVectors(Un,zs));if(l<0)return null;const h=o*this.direction.dot(Yr.cross(Un));if(h<0||l+h>a)return null;const c=-o*Un.dot($r);return c<0?null:this.at(c/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class he{constructor(t,e,n,i,r,a,o,l,h,c,u,f,d,g,v,m){he.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,h,c,u,f,d,g,v,m)}set(t,e,n,i,r,a,o,l,h,c,u,f,d,g,v,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=i,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=h,p[6]=c,p[10]=u,p[14]=f,p[3]=d,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new he().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/Mi.setFromMatrixColumn(t,0).length(),r=1/Mi.setFromMatrixColumn(t,1).length(),a=1/Mi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),h=Math.sin(i),c=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const f=a*c,d=a*u,g=o*c,v=o*u;e[0]=l*c,e[4]=-l*u,e[8]=h,e[1]=d+g*h,e[5]=f-v*h,e[9]=-o*l,e[2]=v-f*h,e[6]=g+d*h,e[10]=a*l}else if(t.order==="YXZ"){const f=l*c,d=l*u,g=h*c,v=h*u;e[0]=f+v*o,e[4]=g*o-d,e[8]=a*h,e[1]=a*u,e[5]=a*c,e[9]=-o,e[2]=d*o-g,e[6]=v+f*o,e[10]=a*l}else if(t.order==="ZXY"){const f=l*c,d=l*u,g=h*c,v=h*u;e[0]=f-v*o,e[4]=-a*u,e[8]=g+d*o,e[1]=d+g*o,e[5]=a*c,e[9]=v-f*o,e[2]=-a*h,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const f=a*c,d=a*u,g=o*c,v=o*u;e[0]=l*c,e[4]=g*h-d,e[8]=f*h+v,e[1]=l*u,e[5]=v*h+f,e[9]=d*h-g,e[2]=-h,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const f=a*l,d=a*h,g=o*l,v=o*h;e[0]=l*c,e[4]=v-f*u,e[8]=g*u+d,e[1]=u,e[5]=a*c,e[9]=-o*c,e[2]=-h*c,e[6]=d*u+g,e[10]=f-v*u}else if(t.order==="XZY"){const f=a*l,d=a*h,g=o*l,v=o*h;e[0]=l*c,e[4]=-u,e[8]=h*c,e[1]=f*u+v,e[5]=a*c,e[9]=d*u-g,e[2]=g*u-d,e[6]=o*c,e[10]=v*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(jf,t,Kf)}lookAt(t,e,n){const i=this.elements;return He.subVectors(t,e),He.lengthSq()===0&&(He.z=1),He.normalize(),Nn.crossVectors(n,He),Nn.lengthSq()===0&&(Math.abs(n.z)===1?He.x+=1e-4:He.z+=1e-4,He.normalize(),Nn.crossVectors(n,He)),Nn.normalize(),Hs.crossVectors(He,Nn),i[0]=Nn.x,i[4]=Hs.x,i[8]=He.x,i[1]=Nn.y,i[5]=Hs.y,i[9]=He.y,i[2]=Nn.z,i[6]=Hs.z,i[10]=He.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],h=n[12],c=n[1],u=n[5],f=n[9],d=n[13],g=n[2],v=n[6],m=n[10],p=n[14],T=n[3],M=n[7],y=n[11],k=n[15],A=i[0],C=i[4],D=i[8],w=i[12],S=i[1],R=i[5],G=i[9],z=i[13],q=i[2],j=i[6],W=i[10],J=i[14],H=i[3],ht=i[7],gt=i[11],bt=i[15];return r[0]=a*A+o*S+l*q+h*H,r[4]=a*C+o*R+l*j+h*ht,r[8]=a*D+o*G+l*W+h*gt,r[12]=a*w+o*z+l*J+h*bt,r[1]=c*A+u*S+f*q+d*H,r[5]=c*C+u*R+f*j+d*ht,r[9]=c*D+u*G+f*W+d*gt,r[13]=c*w+u*z+f*J+d*bt,r[2]=g*A+v*S+m*q+p*H,r[6]=g*C+v*R+m*j+p*ht,r[10]=g*D+v*G+m*W+p*gt,r[14]=g*w+v*z+m*J+p*bt,r[3]=T*A+M*S+y*q+k*H,r[7]=T*C+M*R+y*j+k*ht,r[11]=T*D+M*G+y*W+k*gt,r[15]=T*w+M*z+y*J+k*bt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],a=t[1],o=t[5],l=t[9],h=t[13],c=t[2],u=t[6],f=t[10],d=t[14],g=t[3],v=t[7],m=t[11],p=t[15];return g*(+r*l*u-i*h*u-r*o*f+n*h*f+i*o*d-n*l*d)+v*(+e*l*d-e*h*f+r*a*f-i*a*d+i*h*c-r*l*c)+m*(+e*h*u-e*o*d-r*a*u+n*a*d+r*o*c-n*h*c)+p*(-i*o*c-e*l*u+e*o*f+i*a*u-n*a*f+n*l*c)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],h=t[7],c=t[8],u=t[9],f=t[10],d=t[11],g=t[12],v=t[13],m=t[14],p=t[15],T=u*m*h-v*f*h+v*l*d-o*m*d-u*l*p+o*f*p,M=g*f*h-c*m*h-g*l*d+a*m*d+c*l*p-a*f*p,y=c*v*h-g*u*h+g*o*d-a*v*d-c*o*p+a*u*p,k=g*u*l-c*v*l-g*o*f+a*v*f+c*o*m-a*u*m,A=e*T+n*M+i*y+r*k;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/A;return t[0]=T*C,t[1]=(v*f*r-u*m*r-v*i*d+n*m*d+u*i*p-n*f*p)*C,t[2]=(o*m*r-v*l*r+v*i*h-n*m*h-o*i*p+n*l*p)*C,t[3]=(u*l*r-o*f*r-u*i*h+n*f*h+o*i*d-n*l*d)*C,t[4]=M*C,t[5]=(c*m*r-g*f*r+g*i*d-e*m*d-c*i*p+e*f*p)*C,t[6]=(g*l*r-a*m*r-g*i*h+e*m*h+a*i*p-e*l*p)*C,t[7]=(a*f*r-c*l*r+c*i*h-e*f*h-a*i*d+e*l*d)*C,t[8]=y*C,t[9]=(g*u*r-c*v*r-g*n*d+e*v*d+c*n*p-e*u*p)*C,t[10]=(a*v*r-g*o*r+g*n*h-e*v*h-a*n*p+e*o*p)*C,t[11]=(c*o*r-a*u*r-c*n*h+e*u*h+a*n*d-e*o*d)*C,t[12]=k*C,t[13]=(c*v*i-g*u*i+g*n*f-e*v*f-c*n*m+e*u*m)*C,t[14]=(g*o*i-a*v*i-g*n*l+e*v*l+a*n*m-e*o*m)*C,t[15]=(a*u*i-c*o*i+c*n*l-e*u*l-a*n*f+e*o*f)*C,this}scale(t){const e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,h=r*a,c=r*o;return this.set(h*a+n,h*o-i*l,h*l+i*o,0,h*o+i*l,c*o+n,c*l-i*a,0,h*l-i*o,c*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,a){return this.set(1,n,r,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,h=r+r,c=a+a,u=o+o,f=r*h,d=r*c,g=r*u,v=a*c,m=a*u,p=o*u,T=l*h,M=l*c,y=l*u,k=n.x,A=n.y,C=n.z;return i[0]=(1-(v+p))*k,i[1]=(d+y)*k,i[2]=(g-M)*k,i[3]=0,i[4]=(d-y)*A,i[5]=(1-(f+p))*A,i[6]=(m+T)*A,i[7]=0,i[8]=(g+M)*C,i[9]=(m-T)*C,i[10]=(1-(f+v))*C,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let r=Mi.set(i[0],i[1],i[2]).length();const a=Mi.set(i[4],i[5],i[6]).length(),o=Mi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],Qe.copy(this);const h=1/r,c=1/a,u=1/o;return Qe.elements[0]*=h,Qe.elements[1]*=h,Qe.elements[2]*=h,Qe.elements[4]*=c,Qe.elements[5]*=c,Qe.elements[6]*=c,Qe.elements[8]*=u,Qe.elements[9]*=u,Qe.elements[10]*=u,e.setFromRotationMatrix(Qe),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,i,r,a,o=En){const l=this.elements,h=2*r/(e-t),c=2*r/(n-i),u=(e+t)/(e-t),f=(n+i)/(n-i);let d,g;if(o===En)d=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===mr)d=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=c,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,r,a,o=En){const l=this.elements,h=1/(e-t),c=1/(n-i),u=1/(a-r),f=(e+t)*h,d=(n+i)*c;let g,v;if(o===En)g=(a+r)*u,v=-2*u;else if(o===mr)g=r*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*h,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*c,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Mi=new P,Qe=new he,jf=new P(0,0,0),Kf=new P(1,1,1),Nn=new P,Hs=new P,He=new P,vl=new he,_l=new fi;class be{constructor(t=0,e=0,n=0,i=be.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,r=i[0],a=i[4],o=i[8],l=i[1],h=i[5],c=i[9],u=i[2],f=i[6],d=i[10];switch(e){case"XYZ":this._y=Math.asin(xe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-c,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,h),this._z=0);break;case"YXZ":this._x=Math.asin(-xe(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,h)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(xe(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-a,h)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-xe(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,h));break;case"YZX":this._z=Math.asin(xe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-c,h),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-xe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,h),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-c,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return vl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(vl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return _l.setFromEuler(this),this.setFromQuaternion(_l,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}be.DEFAULT_ORDER="XYZ";class $h{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Zf=0;const yl=new P,Si=new fi,yn=new he,Vs=new P,is=new P,Jf=new P,Qf=new fi,Ml=new P(1,0,0),Sl=new P(0,1,0),xl=new P(0,0,1),wl={type:"added"},td={type:"removed"},xi={type:"childadded",child:null},jr={type:"childremoved",child:null};class Ee extends Yi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Zf++}),this.uuid=$i(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ee.DEFAULT_UP.clone();const t=new P,e=new be,n=new fi,i=new P(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new he},normalMatrix:{value:new Wt}}),this.matrix=new he,this.matrixWorld=new he,this.matrixAutoUpdate=Ee.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ee.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new $h,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Si.setFromAxisAngle(t,e),this.quaternion.multiply(Si),this}rotateOnWorldAxis(t,e){return Si.setFromAxisAngle(t,e),this.quaternion.premultiply(Si),this}rotateX(t){return this.rotateOnAxis(Ml,t)}rotateY(t){return this.rotateOnAxis(Sl,t)}rotateZ(t){return this.rotateOnAxis(xl,t)}translateOnAxis(t,e){return yl.copy(t).applyQuaternion(this.quaternion),this.position.add(yl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Ml,t)}translateY(t){return this.translateOnAxis(Sl,t)}translateZ(t){return this.translateOnAxis(xl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(yn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Vs.copy(t):Vs.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),is.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?yn.lookAt(is,Vs,this.up):yn.lookAt(Vs,is,this.up),this.quaternion.setFromRotationMatrix(yn),i&&(yn.extractRotation(i.matrixWorld),Si.setFromRotationMatrix(yn),this.quaternion.premultiply(Si.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(wl),xi.child=t,this.dispatchEvent(xi),xi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(td),jr.child=t,this.dispatchEvent(jr),jr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),yn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),yn.multiply(t.parent.matrixWorld)),t.applyMatrix4(yn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(wl),xi.child=t,this.dispatchEvent(xi),xi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(is,t,Jf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(is,Qf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let h=0,c=l.length;h<c;h++){const u=l[h];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,h=this.material.length;l<h;l++)o.push(r(t.materials,this.material[l]));i.material=o}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),h=a(t.textures),c=a(t.images),u=a(t.shapes),f=a(t.skeletons),d=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),h.length>0&&(n.textures=h),c.length>0&&(n.images=c),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){const l=[];for(const h in o){const c=o[h];delete c.metadata,l.push(c)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}Ee.DEFAULT_UP=new P(0,1,0);Ee.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ee.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const tn=new P,Mn=new P,Kr=new P,Sn=new P,wi=new P,bi=new P,bl=new P,Zr=new P,Jr=new P,Qr=new P,ta=new le,ea=new le,na=new le;class sn{constructor(t=new P,e=new P,n=new P){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),tn.subVectors(t,e),i.cross(tn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){tn.subVectors(i,e),Mn.subVectors(n,e),Kr.subVectors(t,e);const a=tn.dot(tn),o=tn.dot(Mn),l=tn.dot(Kr),h=Mn.dot(Mn),c=Mn.dot(Kr),u=a*h-o*o;if(u===0)return r.set(0,0,0),null;const f=1/u,d=(h*l-o*c)*f,g=(a*c-o*l)*f;return r.set(1-d-g,g,d)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Sn)===null?!1:Sn.x>=0&&Sn.y>=0&&Sn.x+Sn.y<=1}static getInterpolation(t,e,n,i,r,a,o,l){return this.getBarycoord(t,e,n,i,Sn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Sn.x),l.addScaledVector(a,Sn.y),l.addScaledVector(o,Sn.z),l)}static getInterpolatedAttribute(t,e,n,i,r,a){return ta.setScalar(0),ea.setScalar(0),na.setScalar(0),ta.fromBufferAttribute(t,e),ea.fromBufferAttribute(t,n),na.fromBufferAttribute(t,i),a.setScalar(0),a.addScaledVector(ta,r.x),a.addScaledVector(ea,r.y),a.addScaledVector(na,r.z),a}static isFrontFacing(t,e,n,i){return tn.subVectors(n,e),Mn.subVectors(t,e),tn.cross(Mn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return tn.subVectors(this.c,this.b),Mn.subVectors(this.a,this.b),tn.cross(Mn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return sn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return sn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return sn.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return sn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return sn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,r=this.c;let a,o;wi.subVectors(i,n),bi.subVectors(r,n),Zr.subVectors(t,n);const l=wi.dot(Zr),h=bi.dot(Zr);if(l<=0&&h<=0)return e.copy(n);Jr.subVectors(t,i);const c=wi.dot(Jr),u=bi.dot(Jr);if(c>=0&&u<=c)return e.copy(i);const f=l*u-c*h;if(f<=0&&l>=0&&c<=0)return a=l/(l-c),e.copy(n).addScaledVector(wi,a);Qr.subVectors(t,r);const d=wi.dot(Qr),g=bi.dot(Qr);if(g>=0&&d<=g)return e.copy(r);const v=d*h-l*g;if(v<=0&&h>=0&&g<=0)return o=h/(h-g),e.copy(n).addScaledVector(bi,o);const m=c*g-d*u;if(m<=0&&u-c>=0&&d-g>=0)return bl.subVectors(r,i),o=(u-c)/(u-c+(d-g)),e.copy(i).addScaledVector(bl,o);const p=1/(m+v+f);return a=v*p,o=f*p,e.copy(n).addScaledVector(wi,a).addScaledVector(bi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const jh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},kn={h:0,s:0,l:0},Gs={h:0,s:0,l:0};function ia(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class zt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Be){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Qt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=Qt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Qt.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=Qt.workingColorSpace){if(t=Of(t,1),e=xe(e,0,1),n=xe(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=ia(a,r,t+1/3),this.g=ia(a,r,t),this.b=ia(a,r,t-1/3)}return Qt.toWorkingColorSpace(this,i),this}setStyle(t,e=Be){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Be){const n=jh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Cn(t.r),this.g=Cn(t.g),this.b=Cn(t.b),this}copyLinearToSRGB(t){return this.r=ki(t.r),this.g=ki(t.g),this.b=ki(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Be){return Qt.fromWorkingColorSpace(Re.copy(this),t),Math.round(xe(Re.r*255,0,255))*65536+Math.round(xe(Re.g*255,0,255))*256+Math.round(xe(Re.b*255,0,255))}getHexString(t=Be){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Qt.workingColorSpace){Qt.fromWorkingColorSpace(Re.copy(this),e);const n=Re.r,i=Re.g,r=Re.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let l,h;const c=(o+a)/2;if(o===a)l=0,h=0;else{const u=a-o;switch(h=c<=.5?u/(a+o):u/(2-a-o),a){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return t.h=l,t.s=h,t.l=c,t}getRGB(t,e=Qt.workingColorSpace){return Qt.fromWorkingColorSpace(Re.copy(this),e),t.r=Re.r,t.g=Re.g,t.b=Re.b,t}getStyle(t=Be){Qt.fromWorkingColorSpace(Re.copy(this),t);const e=Re.r,n=Re.g,i=Re.b;return t!==Be?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(kn),this.setHSL(kn.h+t,kn.s+e,kn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(kn),t.getHSL(Gs);const n=zr(kn.h,Gs.h,e),i=zr(kn.s,Gs.s,e),r=zr(kn.l,Gs.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Re=new zt;zt.NAMES=jh;let ed=0;class Ts extends Yi{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ed++}),this.uuid=$i(),this.name="",this.blending=Ui,this.side=Gn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Aa,this.blendDst=Ca,this.blendEquation=ei,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new zt(0,0,0),this.blendAlpha=0,this.depthFunc=Fi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=al,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=mi,this.stencilZFail=mi,this.stencilZPass=mi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ui&&(n.blending=this.blending),this.side!==Gn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Aa&&(n.blendSrc=this.blendSrc),this.blendDst!==Ca&&(n.blendDst=this.blendDst),this.blendEquation!==ei&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Fi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==al&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==mi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==mi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==mi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=i(t.textures),a=i(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Oi extends Ts{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new zt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new be,this.combine=Lh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const _e=new P,Ws=new at;class je{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=ol,this.updateRanges=[],this.gpuType=dn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ws.fromBufferAttribute(this,e),Ws.applyMatrix3(t),this.setXY(e,Ws.x,Ws.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyMatrix3(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyMatrix4(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyNormalMatrix(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.transformDirection(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=ts(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Oe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ts(e,this.array)),e}setX(t,e){return this.normalized&&(e=Oe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ts(e,this.array)),e}setY(t,e){return this.normalized&&(e=Oe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ts(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Oe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ts(e,this.array)),e}setW(t,e){return this.normalized&&(e=Oe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Oe(e,this.array),n=Oe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=Oe(e,this.array),n=Oe(n,this.array),i=Oe(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=Oe(e,this.array),n=Oe(n,this.array),i=Oe(i,this.array),r=Oe(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==ol&&(t.usage=this.usage),t}}class Kh extends je{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Zh extends je{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class me extends je{constructor(t,e,n){super(new Float32Array(t),e,n)}}let nd=0;const Ye=new he,sa=new Ee,Ti=new P,Ve=new di,ss=new di,Se=new P;class Xe extends Yi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:nd++}),this.uuid=$i(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Xh(t)?Zh:Kh)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Wt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ye.makeRotationFromQuaternion(t),this.applyMatrix4(Ye),this}rotateX(t){return Ye.makeRotationX(t),this.applyMatrix4(Ye),this}rotateY(t){return Ye.makeRotationY(t),this.applyMatrix4(Ye),this}rotateZ(t){return Ye.makeRotationZ(t),this.applyMatrix4(Ye),this}translate(t,e,n){return Ye.makeTranslation(t,e,n),this.applyMatrix4(Ye),this}scale(t,e,n){return Ye.makeScale(t,e,n),this.applyMatrix4(Ye),this}lookAt(t){return sa.lookAt(t),sa.updateMatrix(),this.applyMatrix4(sa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ti).negate(),this.translate(Ti.x,Ti.y,Ti.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,r=t.length;i<r;i++){const a=t[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new me(n,3))}else{for(let n=0,i=e.count;n<i;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new di);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const r=e[n];Ve.setFromBufferAttribute(r),this.morphTargetsRelative?(Se.addVectors(this.boundingBox.min,Ve.min),this.boundingBox.expandByPoint(Se),Se.addVectors(this.boundingBox.max,Ve.max),this.boundingBox.expandByPoint(Se)):(this.boundingBox.expandByPoint(Ve.min),this.boundingBox.expandByPoint(Ve.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new bs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(t){const n=this.boundingSphere.center;if(Ve.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];ss.setFromBufferAttribute(o),this.morphTargetsRelative?(Se.addVectors(Ve.min,ss.min),Ve.expandByPoint(Se),Se.addVectors(Ve.max,ss.max),Ve.expandByPoint(Se)):(Ve.expandByPoint(ss.min),Ve.expandByPoint(ss.max))}Ve.getCenter(n);let i=0;for(let r=0,a=t.count;r<a;r++)Se.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Se));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let h=0,c=o.count;h<c;h++)Se.fromBufferAttribute(o,h),l&&(Ti.fromBufferAttribute(t,h),Se.add(Ti)),i=Math.max(i,n.distanceToSquared(Se))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new je(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let D=0;D<n.count;D++)o[D]=new P,l[D]=new P;const h=new P,c=new P,u=new P,f=new at,d=new at,g=new at,v=new P,m=new P;function p(D,w,S){h.fromBufferAttribute(n,D),c.fromBufferAttribute(n,w),u.fromBufferAttribute(n,S),f.fromBufferAttribute(r,D),d.fromBufferAttribute(r,w),g.fromBufferAttribute(r,S),c.sub(h),u.sub(h),d.sub(f),g.sub(f);const R=1/(d.x*g.y-g.x*d.y);isFinite(R)&&(v.copy(c).multiplyScalar(g.y).addScaledVector(u,-d.y).multiplyScalar(R),m.copy(u).multiplyScalar(d.x).addScaledVector(c,-g.x).multiplyScalar(R),o[D].add(v),o[w].add(v),o[S].add(v),l[D].add(m),l[w].add(m),l[S].add(m))}let T=this.groups;T.length===0&&(T=[{start:0,count:t.count}]);for(let D=0,w=T.length;D<w;++D){const S=T[D],R=S.start,G=S.count;for(let z=R,q=R+G;z<q;z+=3)p(t.getX(z+0),t.getX(z+1),t.getX(z+2))}const M=new P,y=new P,k=new P,A=new P;function C(D){k.fromBufferAttribute(i,D),A.copy(k);const w=o[D];M.copy(w),M.sub(k.multiplyScalar(k.dot(w))).normalize(),y.crossVectors(A,w);const R=y.dot(l[D])<0?-1:1;a.setXYZW(D,M.x,M.y,M.z,R)}for(let D=0,w=T.length;D<w;++D){const S=T[D],R=S.start,G=S.count;for(let z=R,q=R+G;z<q;z+=3)C(t.getX(z+0)),C(t.getX(z+1)),C(t.getX(z+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new je(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const i=new P,r=new P,a=new P,o=new P,l=new P,h=new P,c=new P,u=new P;if(t)for(let f=0,d=t.count;f<d;f+=3){const g=t.getX(f+0),v=t.getX(f+1),m=t.getX(f+2);i.fromBufferAttribute(e,g),r.fromBufferAttribute(e,v),a.fromBufferAttribute(e,m),c.subVectors(a,r),u.subVectors(i,r),c.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),h.fromBufferAttribute(n,m),o.add(c),l.add(c),h.add(c),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,h.x,h.y,h.z)}else for(let f=0,d=e.count;f<d;f+=3)i.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),c.subVectors(a,r),u.subVectors(i,r),c.cross(u),n.setXYZ(f+0,c.x,c.y,c.z),n.setXYZ(f+1,c.x,c.y,c.z),n.setXYZ(f+2,c.x,c.y,c.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Se.fromBufferAttribute(t,e),Se.normalize(),t.setXYZ(e,Se.x,Se.y,Se.z)}toNonIndexed(){function t(o,l){const h=o.array,c=o.itemSize,u=o.normalized,f=new h.constructor(l.length*c);let d=0,g=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?d=l[v]*o.data.stride+o.offset:d=l[v]*c;for(let p=0;p<c;p++)f[g++]=h[d++]}return new je(f,c,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Xe,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],h=t(l,n);e.setAttribute(o,h)}const r=this.morphAttributes;for(const o in r){const l=[],h=r[o];for(let c=0,u=h.length;c<u;c++){const f=h[c],d=t(f,n);l.push(d)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const h=a[o];e.addGroup(h.start,h.count,h.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const h in l)l[h]!==void 0&&(t[h]=l[h]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const h=n[l];t.data.attributes[l]=h.toJSON(t.data)}const i={};let r=!1;for(const l in this.morphAttributes){const h=this.morphAttributes[l],c=[];for(let u=0,f=h.length;u<f;u++){const d=h[u];c.push(d.toJSON(t.data))}c.length>0&&(i[l]=c,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const h in i){const c=i[h];this.setAttribute(h,c.clone(e))}const r=t.morphAttributes;for(const h in r){const c=[],u=r[h];for(let f=0,d=u.length;f<d;f++)c.push(u[f].clone(e));this.morphAttributes[h]=c}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let h=0,c=a.length;h<c;h++){const u=a[h];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Tl=new he,jn=new $f,Xs=new bs,El=new P,qs=new P,Ys=new P,$s=new P,ra=new P,js=new P,Al=new P,Ks=new P;class Kt extends Ee{constructor(t=new Xe,e=new Oi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const o=this.morphTargetInfluences;if(r&&o){js.set(0,0,0);for(let l=0,h=r.length;l<h;l++){const c=o[l],u=r[l];c!==0&&(ra.fromBufferAttribute(u,t),a?js.addScaledVector(ra,c):js.addScaledVector(ra.sub(e),c))}e.add(js)}return e}raycast(t,e){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Xs.copy(n.boundingSphere),Xs.applyMatrix4(r),jn.copy(t.ray).recast(t.near),!(Xs.containsPoint(jn.origin)===!1&&(jn.intersectSphere(Xs,El)===null||jn.origin.distanceToSquared(El)>(t.far-t.near)**2))&&(Tl.copy(r).invert(),jn.copy(t.ray).applyMatrix4(Tl),!(n.boundingBox!==null&&jn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,jn)))}_computeIntersections(t,e,n){let i;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,h=r.attributes.uv,c=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=f.length;g<v;g++){const m=f[g],p=a[m.materialIndex],T=Math.max(m.start,d.start),M=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let y=T,k=M;y<k;y+=3){const A=o.getX(y),C=o.getX(y+1),D=o.getX(y+2);i=Zs(this,p,t,n,h,c,u,A,C,D),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,d.start),v=Math.min(o.count,d.start+d.count);for(let m=g,p=v;m<p;m+=3){const T=o.getX(m),M=o.getX(m+1),y=o.getX(m+2);i=Zs(this,a,t,n,h,c,u,T,M,y),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,v=f.length;g<v;g++){const m=f[g],p=a[m.materialIndex],T=Math.max(m.start,d.start),M=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let y=T,k=M;y<k;y+=3){const A=y,C=y+1,D=y+2;i=Zs(this,p,t,n,h,c,u,A,C,D),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,d.start),v=Math.min(l.count,d.start+d.count);for(let m=g,p=v;m<p;m+=3){const T=m,M=m+1,y=m+2;i=Zs(this,a,t,n,h,c,u,T,M,y),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}}function id(s,t,e,n,i,r,a,o){let l;if(t.side===Ne?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,t.side===Gn,o),l===null)return null;Ks.copy(o),Ks.applyMatrix4(s.matrixWorld);const h=e.ray.origin.distanceTo(Ks);return h<e.near||h>e.far?null:{distance:h,point:Ks.clone(),object:s}}function Zs(s,t,e,n,i,r,a,o,l,h){s.getVertexPosition(o,qs),s.getVertexPosition(l,Ys),s.getVertexPosition(h,$s);const c=id(s,t,e,n,qs,Ys,$s,Al);if(c){const u=new P;sn.getBarycoord(Al,qs,Ys,$s,u),i&&(c.uv=sn.getInterpolatedAttribute(i,o,l,h,u,new at)),r&&(c.uv1=sn.getInterpolatedAttribute(r,o,l,h,u,new at)),a&&(c.normal=sn.getInterpolatedAttribute(a,o,l,h,u,new P),c.normal.dot(n.direction)>0&&c.normal.multiplyScalar(-1));const f={a:o,b:l,c:h,normal:new P,materialIndex:0};sn.getNormal(qs,Ys,$s,f.normal),c.face=f,c.barycoord=u}return c}class ji extends Xe{constructor(t=1,e=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const l=[],h=[],c=[],u=[];let f=0,d=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,i,a,2),g("x","z","y",1,-1,t,n,-e,i,a,3),g("x","y","z",1,-1,t,e,n,i,r,4),g("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new me(h,3)),this.setAttribute("normal",new me(c,3)),this.setAttribute("uv",new me(u,2));function g(v,m,p,T,M,y,k,A,C,D,w){const S=y/C,R=k/D,G=y/2,z=k/2,q=A/2,j=C+1,W=D+1;let J=0,H=0;const ht=new P;for(let gt=0;gt<W;gt++){const bt=gt*R-z;for(let Ht=0;Ht<j;Ht++){const ne=Ht*S-G;ht[v]=ne*T,ht[m]=bt*M,ht[p]=q,h.push(ht.x,ht.y,ht.z),ht[v]=0,ht[m]=0,ht[p]=A>0?1:-1,c.push(ht.x,ht.y,ht.z),u.push(Ht/C),u.push(1-gt/D),J+=1}}for(let gt=0;gt<D;gt++)for(let bt=0;bt<C;bt++){const Ht=f+bt+j*gt,ne=f+bt+j*(gt+1),$=f+(bt+1)+j*(gt+1),st=f+(bt+1)+j*gt;l.push(Ht,ne,st),l.push(ne,$,st),H+=6}o.addGroup(d,H,w),d+=H,f+=J}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ji(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Gi(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function De(s){const t={};for(let e=0;e<s.length;e++){const n=Gi(s[e]);for(const i in n)t[i]=n[i]}return t}function sd(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Jh(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Qt.workingColorSpace}const rd={clone:Gi,merge:De};var ad=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,od=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Wn extends Ts{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ad,this.fragmentShader=od,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Gi(t.uniforms),this.uniformsGroups=sd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Qh extends Ee{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new he,this.projectionMatrix=new he,this.projectionMatrixInverse=new he,this.coordinateSystem=En}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const On=new P,Cl=new at,Rl=new at;class Ge extends Qh{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=uo*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Br*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return uo*2*Math.atan(Math.tan(Br*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){On.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(On.x,On.y).multiplyScalar(-t/On.z),On.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(On.x,On.y).multiplyScalar(-t/On.z)}getViewSize(t,e){return this.getViewBounds(t,Cl,Rl),e.subVectors(Rl,Cl)}setViewOffset(t,e,n,i,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Br*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,h=a.fullHeight;r+=a.offsetX*i/l,e-=a.offsetY*n/h,i*=a.width/l,n*=a.height/h}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ei=-90,Ai=1;class ld extends Ee{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Ge(Ei,Ai,t,e);i.layers=this.layers,this.add(i);const r=new Ge(Ei,Ai,t,e);r.layers=this.layers,this.add(r);const a=new Ge(Ei,Ai,t,e);a.layers=this.layers,this.add(a);const o=new Ge(Ei,Ai,t,e);o.layers=this.layers,this.add(o);const l=new Ge(Ei,Ai,t,e);l.layers=this.layers,this.add(l);const h=new Ge(Ei,Ai,t,e);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,r,a,o,l]=e;for(const h of e)this.remove(h);if(t===En)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===mr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const h of e)this.add(h),h.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,h,c]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,a),t.setRenderTarget(n,2,i),t.render(e,o),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,h),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,i),t.render(e,c),t.setRenderTarget(u,f,d),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class tc extends Pe{constructor(t,e,n,i,r,a,o,l,h,c){t=t!==void 0?t:[],e=e!==void 0?e:Bi,super(t,e,n,i,r,a,o,l,h,c),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class hd extends ci{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new tc(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:fn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new ji(5,5,5),r=new Wn({name:"CubemapFromEquirect",uniforms:Gi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ne,blending:Hn});r.uniforms.tEquirect.value=e;const a=new Kt(i,r),o=e.minFilter;return e.minFilter===oi&&(e.minFilter=fn),new ld(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,i){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(r)}}const aa=new P,cd=new P,ud=new Wt;class Qn{constructor(t=new P(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=aa.subVectors(n,e).cross(cd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(aa),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||ud.getNormalMatrix(t),i=this.coplanarPoint(aa).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Kn=new bs,Js=new P;class Ao{constructor(t=new Qn,e=new Qn,n=new Qn,i=new Qn,r=new Qn,a=new Qn){this.planes=[t,e,n,i,r,a]}set(t,e,n,i,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=En){const n=this.planes,i=t.elements,r=i[0],a=i[1],o=i[2],l=i[3],h=i[4],c=i[5],u=i[6],f=i[7],d=i[8],g=i[9],v=i[10],m=i[11],p=i[12],T=i[13],M=i[14],y=i[15];if(n[0].setComponents(l-r,f-h,m-d,y-p).normalize(),n[1].setComponents(l+r,f+h,m+d,y+p).normalize(),n[2].setComponents(l+a,f+c,m+g,y+T).normalize(),n[3].setComponents(l-a,f-c,m-g,y-T).normalize(),n[4].setComponents(l-o,f-u,m-v,y-M).normalize(),e===En)n[5].setComponents(l+o,f+u,m+v,y+M).normalize();else if(e===mr)n[5].setComponents(o,u,v,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Kn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Kn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Kn)}intersectsSprite(t){return Kn.center.set(0,0,0),Kn.radius=.7071067811865476,Kn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Kn)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(Js.x=i.normal.x>0?t.max.x:t.min.x,Js.y=i.normal.y>0?t.max.y:t.min.y,Js.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Js)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function ec(){let s=null,t=!1,e=null,n=null;function i(r,a){e(r,a),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function fd(s){const t=new WeakMap;function e(o,l){const h=o.array,c=o.usage,u=h.byteLength,f=s.createBuffer();s.bindBuffer(l,f),s.bufferData(l,h,c),o.onUploadCallback();let d;if(h instanceof Float32Array)d=s.FLOAT;else if(h instanceof Uint16Array)o.isFloat16BufferAttribute?d=s.HALF_FLOAT:d=s.UNSIGNED_SHORT;else if(h instanceof Int16Array)d=s.SHORT;else if(h instanceof Uint32Array)d=s.UNSIGNED_INT;else if(h instanceof Int32Array)d=s.INT;else if(h instanceof Int8Array)d=s.BYTE;else if(h instanceof Uint8Array)d=s.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)d=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:f,type:d,bytesPerElement:h.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,h){const c=l.array,u=l.updateRanges;if(s.bindBuffer(h,o),u.length===0)s.bufferSubData(h,0,c);else{u.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<u.length;d++){const g=u[f],v=u[d];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++f,u[f]=v)}u.length=f+1;for(let d=0,g=u.length;d<g;d++){const v=u[d];s.bufferSubData(h,v.start*c.BYTES_PER_ELEMENT,c,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(s.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const c=t.get(o);(!c||c.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const h=t.get(o);if(h===void 0)t.set(o,e(o,l));else if(h.version<o.version){if(h.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(h.buffer,o,l),h.version=o.version}}return{get:i,remove:r,update:a}}class Es extends Xe{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(i),h=o+1,c=l+1,u=t/o,f=e/l,d=[],g=[],v=[],m=[];for(let p=0;p<c;p++){const T=p*f-a;for(let M=0;M<h;M++){const y=M*u-r;g.push(y,-T,0),v.push(0,0,1),m.push(M/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let T=0;T<o;T++){const M=T+h*p,y=T+h*(p+1),k=T+1+h*(p+1),A=T+1+h*p;d.push(M,y,A),d.push(y,k,A)}this.setIndex(d),this.setAttribute("position",new me(g,3)),this.setAttribute("normal",new me(v,3)),this.setAttribute("uv",new me(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Es(t.width,t.height,t.widthSegments,t.heightSegments)}}var dd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,pd=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,md=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,gd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,vd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,_d=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,yd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Md=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Sd=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,xd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,wd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,bd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Td=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Ed=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Ad=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Cd=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Rd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Pd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ld=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Dd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Id=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Ud=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Nd=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,kd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Od=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Fd=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Bd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,zd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Hd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Vd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Gd="gl_FragColor = linearToOutputTexel( gl_FragColor );",Wd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Xd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,qd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Yd=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,$d=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,jd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Kd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Zd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Jd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Qd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,tp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,ep=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,np=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ip=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,sp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,rp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,ap=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,op=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,hp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,cp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,up=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,fp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,dp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,pp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,mp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,gp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,vp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,_p=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,yp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Mp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Sp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,xp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,wp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,bp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Tp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Ep=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ap=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Cp=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Rp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Pp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Lp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Dp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ip=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Up=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Np=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,kp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Op=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Fp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Bp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,zp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Hp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Vp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Gp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Wp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Xp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,qp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Yp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,$p=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,jp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Kp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Zp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Jp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Qp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,tm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,em=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,nm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,im=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,sm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,rm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,am=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,om=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,lm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,hm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,cm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,um=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const fm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,dm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,mm=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_m=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,ym=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Mm=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Sm=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,xm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,wm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bm=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Tm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Em=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Am=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cm=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Rm=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Pm=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Lm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Dm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Im=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Um=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Nm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,km=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Om=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Fm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Bm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zm=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Hm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Vm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Gm=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Wm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Xm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,qt={alphahash_fragment:dd,alphahash_pars_fragment:pd,alphamap_fragment:md,alphamap_pars_fragment:gd,alphatest_fragment:vd,alphatest_pars_fragment:_d,aomap_fragment:yd,aomap_pars_fragment:Md,batching_pars_vertex:Sd,batching_vertex:xd,begin_vertex:wd,beginnormal_vertex:bd,bsdfs:Td,iridescence_fragment:Ed,bumpmap_pars_fragment:Ad,clipping_planes_fragment:Cd,clipping_planes_pars_fragment:Rd,clipping_planes_pars_vertex:Pd,clipping_planes_vertex:Ld,color_fragment:Dd,color_pars_fragment:Id,color_pars_vertex:Ud,color_vertex:Nd,common:kd,cube_uv_reflection_fragment:Od,defaultnormal_vertex:Fd,displacementmap_pars_vertex:Bd,displacementmap_vertex:zd,emissivemap_fragment:Hd,emissivemap_pars_fragment:Vd,colorspace_fragment:Gd,colorspace_pars_fragment:Wd,envmap_fragment:Xd,envmap_common_pars_fragment:qd,envmap_pars_fragment:Yd,envmap_pars_vertex:$d,envmap_physical_pars_fragment:rp,envmap_vertex:jd,fog_vertex:Kd,fog_pars_vertex:Zd,fog_fragment:Jd,fog_pars_fragment:Qd,gradientmap_pars_fragment:tp,lightmap_pars_fragment:ep,lights_lambert_fragment:np,lights_lambert_pars_fragment:ip,lights_pars_begin:sp,lights_toon_fragment:ap,lights_toon_pars_fragment:op,lights_phong_fragment:lp,lights_phong_pars_fragment:hp,lights_physical_fragment:cp,lights_physical_pars_fragment:up,lights_fragment_begin:fp,lights_fragment_maps:dp,lights_fragment_end:pp,logdepthbuf_fragment:mp,logdepthbuf_pars_fragment:gp,logdepthbuf_pars_vertex:vp,logdepthbuf_vertex:_p,map_fragment:yp,map_pars_fragment:Mp,map_particle_fragment:Sp,map_particle_pars_fragment:xp,metalnessmap_fragment:wp,metalnessmap_pars_fragment:bp,morphinstance_vertex:Tp,morphcolor_vertex:Ep,morphnormal_vertex:Ap,morphtarget_pars_vertex:Cp,morphtarget_vertex:Rp,normal_fragment_begin:Pp,normal_fragment_maps:Lp,normal_pars_fragment:Dp,normal_pars_vertex:Ip,normal_vertex:Up,normalmap_pars_fragment:Np,clearcoat_normal_fragment_begin:kp,clearcoat_normal_fragment_maps:Op,clearcoat_pars_fragment:Fp,iridescence_pars_fragment:Bp,opaque_fragment:zp,packing:Hp,premultiplied_alpha_fragment:Vp,project_vertex:Gp,dithering_fragment:Wp,dithering_pars_fragment:Xp,roughnessmap_fragment:qp,roughnessmap_pars_fragment:Yp,shadowmap_pars_fragment:$p,shadowmap_pars_vertex:jp,shadowmap_vertex:Kp,shadowmask_pars_fragment:Zp,skinbase_vertex:Jp,skinning_pars_vertex:Qp,skinning_vertex:tm,skinnormal_vertex:em,specularmap_fragment:nm,specularmap_pars_fragment:im,tonemapping_fragment:sm,tonemapping_pars_fragment:rm,transmission_fragment:am,transmission_pars_fragment:om,uv_pars_fragment:lm,uv_pars_vertex:hm,uv_vertex:cm,worldpos_vertex:um,background_vert:fm,background_frag:dm,backgroundCube_vert:pm,backgroundCube_frag:mm,cube_vert:gm,cube_frag:vm,depth_vert:_m,depth_frag:ym,distanceRGBA_vert:Mm,distanceRGBA_frag:Sm,equirect_vert:xm,equirect_frag:wm,linedashed_vert:bm,linedashed_frag:Tm,meshbasic_vert:Em,meshbasic_frag:Am,meshlambert_vert:Cm,meshlambert_frag:Rm,meshmatcap_vert:Pm,meshmatcap_frag:Lm,meshnormal_vert:Dm,meshnormal_frag:Im,meshphong_vert:Um,meshphong_frag:Nm,meshphysical_vert:km,meshphysical_frag:Om,meshtoon_vert:Fm,meshtoon_frag:Bm,points_vert:zm,points_frag:Hm,shadow_vert:Vm,shadow_frag:Gm,sprite_vert:Wm,sprite_frag:Xm},ct={common:{diffuse:{value:new zt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Wt},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Wt}},envmap:{envMap:{value:null},envMapRotation:{value:new Wt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Wt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Wt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Wt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Wt},normalScale:{value:new at(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Wt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Wt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Wt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Wt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new zt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new zt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0},uvTransform:{value:new Wt}},sprite:{diffuse:{value:new zt(16777215)},opacity:{value:1},center:{value:new at(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Wt},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0}}},cn={basic:{uniforms:De([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.fog]),vertexShader:qt.meshbasic_vert,fragmentShader:qt.meshbasic_frag},lambert:{uniforms:De([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,ct.lights,{emissive:{value:new zt(0)}}]),vertexShader:qt.meshlambert_vert,fragmentShader:qt.meshlambert_frag},phong:{uniforms:De([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,ct.lights,{emissive:{value:new zt(0)},specular:{value:new zt(1118481)},shininess:{value:30}}]),vertexShader:qt.meshphong_vert,fragmentShader:qt.meshphong_frag},standard:{uniforms:De([ct.common,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.roughnessmap,ct.metalnessmap,ct.fog,ct.lights,{emissive:{value:new zt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qt.meshphysical_vert,fragmentShader:qt.meshphysical_frag},toon:{uniforms:De([ct.common,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.gradientmap,ct.fog,ct.lights,{emissive:{value:new zt(0)}}]),vertexShader:qt.meshtoon_vert,fragmentShader:qt.meshtoon_frag},matcap:{uniforms:De([ct.common,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,{matcap:{value:null}}]),vertexShader:qt.meshmatcap_vert,fragmentShader:qt.meshmatcap_frag},points:{uniforms:De([ct.points,ct.fog]),vertexShader:qt.points_vert,fragmentShader:qt.points_frag},dashed:{uniforms:De([ct.common,ct.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qt.linedashed_vert,fragmentShader:qt.linedashed_frag},depth:{uniforms:De([ct.common,ct.displacementmap]),vertexShader:qt.depth_vert,fragmentShader:qt.depth_frag},normal:{uniforms:De([ct.common,ct.bumpmap,ct.normalmap,ct.displacementmap,{opacity:{value:1}}]),vertexShader:qt.meshnormal_vert,fragmentShader:qt.meshnormal_frag},sprite:{uniforms:De([ct.sprite,ct.fog]),vertexShader:qt.sprite_vert,fragmentShader:qt.sprite_frag},background:{uniforms:{uvTransform:{value:new Wt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qt.background_vert,fragmentShader:qt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Wt}},vertexShader:qt.backgroundCube_vert,fragmentShader:qt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qt.cube_vert,fragmentShader:qt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qt.equirect_vert,fragmentShader:qt.equirect_frag},distanceRGBA:{uniforms:De([ct.common,ct.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qt.distanceRGBA_vert,fragmentShader:qt.distanceRGBA_frag},shadow:{uniforms:De([ct.lights,ct.fog,{color:{value:new zt(0)},opacity:{value:1}}]),vertexShader:qt.shadow_vert,fragmentShader:qt.shadow_frag}};cn.physical={uniforms:De([cn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Wt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Wt},clearcoatNormalScale:{value:new at(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Wt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Wt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Wt},sheen:{value:0},sheenColor:{value:new zt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Wt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Wt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Wt},transmissionSamplerSize:{value:new at},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Wt},attenuationDistance:{value:0},attenuationColor:{value:new zt(0)},specularColor:{value:new zt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Wt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Wt},anisotropyVector:{value:new at},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Wt}}]),vertexShader:qt.meshphysical_vert,fragmentShader:qt.meshphysical_frag};const Qs={r:0,b:0,g:0},Zn=new be,qm=new he;function Ym(s,t,e,n,i,r,a){const o=new zt(0);let l=r===!0?0:1,h,c,u=null,f=0,d=null;function g(T){let M=T.isScene===!0?T.background:null;return M&&M.isTexture&&(M=(T.backgroundBlurriness>0?e:t).get(M)),M}function v(T){let M=!1;const y=g(T);y===null?p(o,l):y&&y.isColor&&(p(y,1),M=!0);const k=s.xr.getEnvironmentBlendMode();k==="additive"?n.buffers.color.setClear(0,0,0,1,a):k==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(s.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function m(T,M){const y=g(M);y&&(y.isCubeTexture||y.mapping===Sr)?(c===void 0&&(c=new Kt(new ji(1,1,1),new Wn({name:"BackgroundCubeMaterial",uniforms:Gi(cn.backgroundCube.uniforms),vertexShader:cn.backgroundCube.vertexShader,fragmentShader:cn.backgroundCube.fragmentShader,side:Ne,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(k,A,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),Zn.copy(M.backgroundRotation),Zn.x*=-1,Zn.y*=-1,Zn.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Zn.y*=-1,Zn.z*=-1),c.material.uniforms.envMap.value=y,c.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(qm.makeRotationFromEuler(Zn)),c.material.toneMapped=Qt.getTransfer(y.colorSpace)!==oe,(u!==y||f!==y.version||d!==s.toneMapping)&&(c.material.needsUpdate=!0,u=y,f=y.version,d=s.toneMapping),c.layers.enableAll(),T.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(h===void 0&&(h=new Kt(new Es(2,2),new Wn({name:"BackgroundMaterial",uniforms:Gi(cn.background.uniforms),vertexShader:cn.background.vertexShader,fragmentShader:cn.background.fragmentShader,side:Gn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(h)),h.material.uniforms.t2D.value=y,h.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,h.material.toneMapped=Qt.getTransfer(y.colorSpace)!==oe,y.matrixAutoUpdate===!0&&y.updateMatrix(),h.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||f!==y.version||d!==s.toneMapping)&&(h.material.needsUpdate=!0,u=y,f=y.version,d=s.toneMapping),h.layers.enableAll(),T.unshift(h,h.geometry,h.material,0,0,null))}function p(T,M){T.getRGB(Qs,Jh(s)),n.buffers.color.setClear(Qs.r,Qs.g,Qs.b,M,a)}return{getClearColor:function(){return o},setClearColor:function(T,M=1){o.set(T),l=M,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(T){l=T,p(o,l)},render:v,addToRenderList:m}}function $m(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=f(null);let r=i,a=!1;function o(S,R,G,z,q){let j=!1;const W=u(z,G,R);r!==W&&(r=W,h(r.object)),j=d(S,z,G,q),j&&g(S,z,G,q),q!==null&&t.update(q,s.ELEMENT_ARRAY_BUFFER),(j||a)&&(a=!1,y(S,R,G,z),q!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(q).buffer))}function l(){return s.createVertexArray()}function h(S){return s.bindVertexArray(S)}function c(S){return s.deleteVertexArray(S)}function u(S,R,G){const z=G.wireframe===!0;let q=n[S.id];q===void 0&&(q={},n[S.id]=q);let j=q[R.id];j===void 0&&(j={},q[R.id]=j);let W=j[z];return W===void 0&&(W=f(l()),j[z]=W),W}function f(S){const R=[],G=[],z=[];for(let q=0;q<e;q++)R[q]=0,G[q]=0,z[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:G,attributeDivisors:z,object:S,attributes:{},index:null}}function d(S,R,G,z){const q=r.attributes,j=R.attributes;let W=0;const J=G.getAttributes();for(const H in J)if(J[H].location>=0){const gt=q[H];let bt=j[H];if(bt===void 0&&(H==="instanceMatrix"&&S.instanceMatrix&&(bt=S.instanceMatrix),H==="instanceColor"&&S.instanceColor&&(bt=S.instanceColor)),gt===void 0||gt.attribute!==bt||bt&&gt.data!==bt.data)return!0;W++}return r.attributesNum!==W||r.index!==z}function g(S,R,G,z){const q={},j=R.attributes;let W=0;const J=G.getAttributes();for(const H in J)if(J[H].location>=0){let gt=j[H];gt===void 0&&(H==="instanceMatrix"&&S.instanceMatrix&&(gt=S.instanceMatrix),H==="instanceColor"&&S.instanceColor&&(gt=S.instanceColor));const bt={};bt.attribute=gt,gt&&gt.data&&(bt.data=gt.data),q[H]=bt,W++}r.attributes=q,r.attributesNum=W,r.index=z}function v(){const S=r.newAttributes;for(let R=0,G=S.length;R<G;R++)S[R]=0}function m(S){p(S,0)}function p(S,R){const G=r.newAttributes,z=r.enabledAttributes,q=r.attributeDivisors;G[S]=1,z[S]===0&&(s.enableVertexAttribArray(S),z[S]=1),q[S]!==R&&(s.vertexAttribDivisor(S,R),q[S]=R)}function T(){const S=r.newAttributes,R=r.enabledAttributes;for(let G=0,z=R.length;G<z;G++)R[G]!==S[G]&&(s.disableVertexAttribArray(G),R[G]=0)}function M(S,R,G,z,q,j,W){W===!0?s.vertexAttribIPointer(S,R,G,q,j):s.vertexAttribPointer(S,R,G,z,q,j)}function y(S,R,G,z){v();const q=z.attributes,j=G.getAttributes(),W=R.defaultAttributeValues;for(const J in j){const H=j[J];if(H.location>=0){let ht=q[J];if(ht===void 0&&(J==="instanceMatrix"&&S.instanceMatrix&&(ht=S.instanceMatrix),J==="instanceColor"&&S.instanceColor&&(ht=S.instanceColor)),ht!==void 0){const gt=ht.normalized,bt=ht.itemSize,Ht=t.get(ht);if(Ht===void 0)continue;const ne=Ht.buffer,$=Ht.type,st=Ht.bytesPerElement,Tt=$===s.INT||$===s.UNSIGNED_INT||ht.gpuType===Mo;if(ht.isInterleavedBufferAttribute){const ot=ht.data,Dt=ot.stride,Ft=ht.offset;if(ot.isInstancedInterleavedBuffer){for(let Nt=0;Nt<H.locationSize;Nt++)p(H.location+Nt,ot.meshPerAttribute);S.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let Nt=0;Nt<H.locationSize;Nt++)m(H.location+Nt);s.bindBuffer(s.ARRAY_BUFFER,ne);for(let Nt=0;Nt<H.locationSize;Nt++)M(H.location+Nt,bt/H.locationSize,$,gt,Dt*st,(Ft+bt/H.locationSize*Nt)*st,Tt)}else{if(ht.isInstancedBufferAttribute){for(let ot=0;ot<H.locationSize;ot++)p(H.location+ot,ht.meshPerAttribute);S.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ht.meshPerAttribute*ht.count)}else for(let ot=0;ot<H.locationSize;ot++)m(H.location+ot);s.bindBuffer(s.ARRAY_BUFFER,ne);for(let ot=0;ot<H.locationSize;ot++)M(H.location+ot,bt/H.locationSize,$,gt,bt*st,bt/H.locationSize*ot*st,Tt)}}else if(W!==void 0){const gt=W[J];if(gt!==void 0)switch(gt.length){case 2:s.vertexAttrib2fv(H.location,gt);break;case 3:s.vertexAttrib3fv(H.location,gt);break;case 4:s.vertexAttrib4fv(H.location,gt);break;default:s.vertexAttrib1fv(H.location,gt)}}}}T()}function k(){D();for(const S in n){const R=n[S];for(const G in R){const z=R[G];for(const q in z)c(z[q].object),delete z[q];delete R[G]}delete n[S]}}function A(S){if(n[S.id]===void 0)return;const R=n[S.id];for(const G in R){const z=R[G];for(const q in z)c(z[q].object),delete z[q];delete R[G]}delete n[S.id]}function C(S){for(const R in n){const G=n[R];if(G[S.id]===void 0)continue;const z=G[S.id];for(const q in z)c(z[q].object),delete z[q];delete G[S.id]}}function D(){w(),a=!0,r!==i&&(r=i,h(r.object))}function w(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:D,resetDefaultState:w,dispose:k,releaseStatesOfGeometry:A,releaseStatesOfProgram:C,initAttributes:v,enableAttribute:m,disableUnusedAttributes:T}}function jm(s,t,e){let n;function i(h){n=h}function r(h,c){s.drawArrays(n,h,c),e.update(c,n,1)}function a(h,c,u){u!==0&&(s.drawArraysInstanced(n,h,c,u),e.update(c,n,u))}function o(h,c,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,h,0,c,0,u);let d=0;for(let g=0;g<u;g++)d+=c[g];e.update(d,n,1)}function l(h,c,u,f){if(u===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<h.length;g++)a(h[g],c[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(n,h,0,c,0,f,0,u);let g=0;for(let v=0;v<u;v++)g+=c[v]*f[v];e.update(g,n,1)}}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Km(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const C=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(C){return!(C!==rn&&n.convert(C)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const D=C===ws&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==Rn&&n.convert(C)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==dn&&!D)}function l(C){if(C==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let h=e.precision!==void 0?e.precision:"highp";const c=l(h);c!==h&&(console.warn("THREE.WebGLRenderer:",h,"not supported, using",c,"instead."),h=c);const u=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),d=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),T=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),M=s.getParameter(s.MAX_VARYING_VECTORS),y=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),k=g>0,A=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:h,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:T,maxVaryings:M,maxFragmentUniforms:y,vertexTextures:k,maxSamples:A}}function Zm(s){const t=this;let e=null,n=0,i=!1,r=!1;const a=new Qn,o=new Wt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||n!==0||i;return i=f,n=u.length,d},this.beginShadows=function(){r=!0,c(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=c(u,f,0)},this.setState=function(u,f,d){const g=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,p=s.get(u);if(!i||g===null||g.length===0||r&&!m)r?c(null):h();else{const T=r?0:n,M=T*4;let y=p.clippingState||null;l.value=y,y=c(g,f,M,d);for(let k=0;k!==M;++k)y[k]=e[k];p.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=T}};function h(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function c(u,f,d,g){const v=u!==null?u.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const p=d+v*4,T=f.matrixWorldInverse;o.getNormalMatrix(T),(m===null||m.length<p)&&(m=new Float32Array(p));for(let M=0,y=d;M!==v;++M,y+=4)a.copy(u[M]).applyMatrix4(T,o),a.normal.toArray(m,y),m[y+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}function Jm(s){let t=new WeakMap;function e(a,o){return o===ka?a.mapping=Bi:o===Oa&&(a.mapping=zi),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===ka||o===Oa)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const h=new hd(l.height);return h.fromEquirectangularTexture(s,a),t.set(a,h),a.addEventListener("dispose",i),e(h.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class nc extends Qh{constructor(t=-1,e=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const h=(this.right-this.left)/this.view.fullWidth/this.zoom,c=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=h*this.view.offsetX,a=r+h*this.view.width,o-=c*this.view.offsetY,l=o-c*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Di=4,Pl=[.125,.215,.35,.446,.526,.582],ni=20,oa=new nc,Ll=new zt;let la=null,ha=0,ca=0,ua=!1;const ti=(1+Math.sqrt(5))/2,Ci=1/ti,Dl=[new P(-ti,Ci,0),new P(ti,Ci,0),new P(-Ci,0,ti),new P(Ci,0,ti),new P(0,ti,-Ci),new P(0,ti,Ci),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)];class fo{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){la=this._renderer.getRenderTarget(),ha=this._renderer.getActiveCubeFace(),ca=this._renderer.getActiveMipmapLevel(),ua=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,i,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Nl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ul(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(la,ha,ca),this._renderer.xr.enabled=ua,t.scissorTest=!1,tr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Bi||t.mapping===zi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),la=this._renderer.getRenderTarget(),ha=this._renderer.getActiveCubeFace(),ca=this._renderer.getActiveMipmapLevel(),ua=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:fn,minFilter:fn,generateMipmaps:!1,type:ws,format:rn,colorSpace:qi,depthBuffer:!1},i=Il(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Il(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Qm(r)),this._blurMaterial=t0(r,t,e)}return i}_compileMaterial(t){const e=new Kt(this._lodPlanes[0],t);this._renderer.compile(e,oa)}_sceneToCubeUV(t,e,n,i){const o=new Ge(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],c=this._renderer,u=c.autoClear,f=c.toneMapping;c.getClearColor(Ll),c.toneMapping=Vn,c.autoClear=!1;const d=new Oi({name:"PMREM.Background",side:Ne,depthWrite:!1,depthTest:!1}),g=new Kt(new ji,d);let v=!1;const m=t.background;m?m.isColor&&(d.color.copy(m),t.background=null,v=!0):(d.color.copy(Ll),v=!0);for(let p=0;p<6;p++){const T=p%3;T===0?(o.up.set(0,l[p],0),o.lookAt(h[p],0,0)):T===1?(o.up.set(0,0,l[p]),o.lookAt(0,h[p],0)):(o.up.set(0,l[p],0),o.lookAt(0,0,h[p]));const M=this._cubeSize;tr(i,T*M,p>2?M:0,M,M),c.setRenderTarget(i),v&&c.render(g,o),c.render(t,o)}g.geometry.dispose(),g.material.dispose(),c.toneMapping=f,c.autoClear=u,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===Bi||t.mapping===zi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Nl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ul());const r=i?this._cubemapMaterial:this._equirectMaterial,a=new Kt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;tr(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,oa)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Dl[(i-r-1)%Dl.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,i,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,i,"latitudinal",r),this._halfBlur(a,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,a,o){const l=this._renderer,h=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const c=3,u=new Kt(this._lodPlanes[i],h),f=h.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*ni-1),v=r/g,m=isFinite(r)?1+Math.floor(c*v):ni;m>ni&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ni}`);const p=[];let T=0;for(let C=0;C<ni;++C){const D=C/v,w=Math.exp(-D*D/2);p.push(w),C===0?T+=w:C<m&&(T+=2*w)}for(let C=0;C<p.length;C++)p[C]=p[C]/T;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:M}=this;f.dTheta.value=g,f.mipInt.value=M-n;const y=this._sizeLods[i],k=3*y*(i>M-Di?i-M+Di:0),A=4*(this._cubeSize-y);tr(e,k,A,3*y,2*y),l.setRenderTarget(e),l.render(u,oa)}}function Qm(s){const t=[],e=[],n=[];let i=s;const r=s-Di+1+Pl.length;for(let a=0;a<r;a++){const o=Math.pow(2,i);e.push(o);let l=1/o;a>s-Di?l=Pl[a-s+Di-1]:a===0&&(l=0),n.push(l);const h=1/(o-2),c=-h,u=1+h,f=[c,c,u,c,u,u,c,c,u,u,c,u],d=6,g=6,v=3,m=2,p=1,T=new Float32Array(v*g*d),M=new Float32Array(m*g*d),y=new Float32Array(p*g*d);for(let A=0;A<d;A++){const C=A%3*2/3-1,D=A>2?0:-1,w=[C,D,0,C+2/3,D,0,C+2/3,D+1,0,C,D,0,C+2/3,D+1,0,C,D+1,0];T.set(w,v*g*A),M.set(f,m*g*A);const S=[A,A,A,A,A,A];y.set(S,p*g*A)}const k=new Xe;k.setAttribute("position",new je(T,v)),k.setAttribute("uv",new je(M,m)),k.setAttribute("faceIndex",new je(y,p)),t.push(k),i>Di&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Il(s,t,e){const n=new ci(s,t,e);return n.texture.mapping=Sr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function tr(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function t0(s,t,e){const n=new Float32Array(ni),i=new P(0,1,0);return new Wn({name:"SphericalGaussianBlur",defines:{n:ni,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Co(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function Ul(){return new Wn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Co(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function Nl(){return new Wn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Co(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function Co(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function e0(s){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,h=l===ka||l===Oa,c=l===Bi||l===zi;if(h||c){let u=t.get(o);const f=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return e===null&&(e=new fo(s)),u=h?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const d=o.image;return h&&d&&d.height>0||c&&d&&i(d)?(e===null&&(e=new fo(s)),u=h?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function i(o){let l=0;const h=6;for(let c=0;c<h;c++)o[c]!==void 0&&l++;return l===h}function r(o){const l=o.target;l.removeEventListener("dispose",r);const h=t.get(l);h!==void 0&&(t.delete(l),h.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function n0(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&cs("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function i0(s,t,e,n){const i={},r=new WeakMap;function a(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);for(const g in f.morphAttributes){const v=f.morphAttributes[g];for(let m=0,p=v.length;m<p;m++)t.remove(v[m])}f.removeEventListener("dispose",a),delete i[f.id];const d=r.get(f);d&&(t.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(u,f){return i[f.id]===!0||(f.addEventListener("dispose",a),i[f.id]=!0,e.memory.geometries++),f}function l(u){const f=u.attributes;for(const g in f)t.update(f[g],s.ARRAY_BUFFER);const d=u.morphAttributes;for(const g in d){const v=d[g];for(let m=0,p=v.length;m<p;m++)t.update(v[m],s.ARRAY_BUFFER)}}function h(u){const f=[],d=u.index,g=u.attributes.position;let v=0;if(d!==null){const T=d.array;v=d.version;for(let M=0,y=T.length;M<y;M+=3){const k=T[M+0],A=T[M+1],C=T[M+2];f.push(k,A,A,C,C,k)}}else if(g!==void 0){const T=g.array;v=g.version;for(let M=0,y=T.length/3-1;M<y;M+=3){const k=M+0,A=M+1,C=M+2;f.push(k,A,A,C,C,k)}}else return;const m=new(Xh(f)?Zh:Kh)(f,1);m.version=v;const p=r.get(u);p&&t.remove(p),r.set(u,m)}function c(u){const f=r.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&h(u)}else h(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:c}}function s0(s,t,e){let n;function i(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,d){s.drawElements(n,d,r,f*a),e.update(d,n,1)}function h(f,d,g){g!==0&&(s.drawElementsInstanced(n,d,r,f*a,g),e.update(d,n,g))}function c(f,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];e.update(m,n,1)}function u(f,d,g,v){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)h(f[p]/a,d[p],v[p]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,r,f,0,v,0,g);let p=0;for(let T=0;T<g;T++)p+=d[T]*v[T];e.update(p,n,1)}}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=h,this.renderMultiDraw=c,this.renderMultiDrawInstances=u}function r0(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case s.TRIANGLES:e.triangles+=o*(r/3);break;case s.LINES:e.lines+=o*(r/2);break;case s.LINE_STRIP:e.lines+=o*(r-1);break;case s.LINE_LOOP:e.lines+=o*r;break;case s.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function a0(s,t,e){const n=new WeakMap,i=new le;function r(a,o,l){const h=a.morphTargetInfluences,c=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=c!==void 0?c.length:0;let f=n.get(o);if(f===void 0||f.count!==u){let S=function(){D.dispose(),n.delete(o),o.removeEventListener("dispose",S)};var d=S;f!==void 0&&f.texture.dispose();const g=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],T=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let y=0;g===!0&&(y=1),v===!0&&(y=2),m===!0&&(y=3);let k=o.attributes.position.count*y,A=1;k>t.maxTextureSize&&(A=Math.ceil(k/t.maxTextureSize),k=t.maxTextureSize);const C=new Float32Array(k*A*4*u),D=new Yh(C,k,A,u);D.type=dn,D.needsUpdate=!0;const w=y*4;for(let R=0;R<u;R++){const G=p[R],z=T[R],q=M[R],j=k*A*4*R;for(let W=0;W<G.count;W++){const J=W*w;g===!0&&(i.fromBufferAttribute(G,W),C[j+J+0]=i.x,C[j+J+1]=i.y,C[j+J+2]=i.z,C[j+J+3]=0),v===!0&&(i.fromBufferAttribute(z,W),C[j+J+4]=i.x,C[j+J+5]=i.y,C[j+J+6]=i.z,C[j+J+7]=0),m===!0&&(i.fromBufferAttribute(q,W),C[j+J+8]=i.x,C[j+J+9]=i.y,C[j+J+10]=i.z,C[j+J+11]=q.itemSize===4?i.w:1)}}f={count:u,texture:D,size:new at(k,A)},n.set(o,f),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,e);else{let g=0;for(let m=0;m<h.length;m++)g+=h[m];const v=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(s,"morphTargetBaseInfluence",v),l.getUniforms().setValue(s,"morphTargetInfluences",h)}l.getUniforms().setValue(s,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",f.size)}return{update:r}}function o0(s,t,e,n){let i=new WeakMap;function r(l){const h=n.render.frame,c=l.geometry,u=t.get(l,c);if(i.get(u)!==h&&(t.update(u),i.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==h&&(e.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,h))),l.isSkinnedMesh){const f=l.skeleton;i.get(f)!==h&&(f.update(),i.set(f,h))}return u}function a(){i=new WeakMap}function o(l){const h=l.target;h.removeEventListener("dispose",o),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:r,dispose:a}}class ic extends Pe{constructor(t,e,n,i,r,a,o,l,h,c=Ni){if(c!==Ni&&c!==Vi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&c===Ni&&(n=hi),n===void 0&&c===Vi&&(n=Hi),super(null,i,r,a,o,l,c,n,h),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:We,this.minFilter=l!==void 0?l:We,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const sc=new Pe,kl=new ic(1,1),rc=new Yh,ac=new qf,oc=new tc,Ol=[],Fl=[],Bl=new Float32Array(16),zl=new Float32Array(9),Hl=new Float32Array(4);function Ki(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let r=Ol[i];if(r===void 0&&(r=new Float32Array(i),Ol[i]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,s[a].toArray(r,o)}return r}function ye(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function Me(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function wr(s,t){let e=Fl[t];e===void 0&&(e=new Int32Array(t),Fl[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function l0(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function h0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ye(e,t))return;s.uniform2fv(this.addr,t),Me(e,t)}}function c0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ye(e,t))return;s.uniform3fv(this.addr,t),Me(e,t)}}function u0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ye(e,t))return;s.uniform4fv(this.addr,t),Me(e,t)}}function f0(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(ye(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),Me(e,t)}else{if(ye(e,n))return;Hl.set(n),s.uniformMatrix2fv(this.addr,!1,Hl),Me(e,n)}}function d0(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(ye(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),Me(e,t)}else{if(ye(e,n))return;zl.set(n),s.uniformMatrix3fv(this.addr,!1,zl),Me(e,n)}}function p0(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(ye(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),Me(e,t)}else{if(ye(e,n))return;Bl.set(n),s.uniformMatrix4fv(this.addr,!1,Bl),Me(e,n)}}function m0(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function g0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ye(e,t))return;s.uniform2iv(this.addr,t),Me(e,t)}}function v0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ye(e,t))return;s.uniform3iv(this.addr,t),Me(e,t)}}function _0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ye(e,t))return;s.uniform4iv(this.addr,t),Me(e,t)}}function y0(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function M0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ye(e,t))return;s.uniform2uiv(this.addr,t),Me(e,t)}}function S0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ye(e,t))return;s.uniform3uiv(this.addr,t),Me(e,t)}}function x0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ye(e,t))return;s.uniform4uiv(this.addr,t),Me(e,t)}}function w0(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(kl.compareFunction=Wh,r=kl):r=sc,e.setTexture2D(t||r,i)}function b0(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||ac,i)}function T0(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||oc,i)}function E0(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||rc,i)}function A0(s){switch(s){case 5126:return l0;case 35664:return h0;case 35665:return c0;case 35666:return u0;case 35674:return f0;case 35675:return d0;case 35676:return p0;case 5124:case 35670:return m0;case 35667:case 35671:return g0;case 35668:case 35672:return v0;case 35669:case 35673:return _0;case 5125:return y0;case 36294:return M0;case 36295:return S0;case 36296:return x0;case 35678:case 36198:case 36298:case 36306:case 35682:return w0;case 35679:case 36299:case 36307:return b0;case 35680:case 36300:case 36308:case 36293:return T0;case 36289:case 36303:case 36311:case 36292:return E0}}function C0(s,t){s.uniform1fv(this.addr,t)}function R0(s,t){const e=Ki(t,this.size,2);s.uniform2fv(this.addr,e)}function P0(s,t){const e=Ki(t,this.size,3);s.uniform3fv(this.addr,e)}function L0(s,t){const e=Ki(t,this.size,4);s.uniform4fv(this.addr,e)}function D0(s,t){const e=Ki(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function I0(s,t){const e=Ki(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function U0(s,t){const e=Ki(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function N0(s,t){s.uniform1iv(this.addr,t)}function k0(s,t){s.uniform2iv(this.addr,t)}function O0(s,t){s.uniform3iv(this.addr,t)}function F0(s,t){s.uniform4iv(this.addr,t)}function B0(s,t){s.uniform1uiv(this.addr,t)}function z0(s,t){s.uniform2uiv(this.addr,t)}function H0(s,t){s.uniform3uiv(this.addr,t)}function V0(s,t){s.uniform4uiv(this.addr,t)}function G0(s,t,e){const n=this.cache,i=t.length,r=wr(e,i);ye(n,r)||(s.uniform1iv(this.addr,r),Me(n,r));for(let a=0;a!==i;++a)e.setTexture2D(t[a]||sc,r[a])}function W0(s,t,e){const n=this.cache,i=t.length,r=wr(e,i);ye(n,r)||(s.uniform1iv(this.addr,r),Me(n,r));for(let a=0;a!==i;++a)e.setTexture3D(t[a]||ac,r[a])}function X0(s,t,e){const n=this.cache,i=t.length,r=wr(e,i);ye(n,r)||(s.uniform1iv(this.addr,r),Me(n,r));for(let a=0;a!==i;++a)e.setTextureCube(t[a]||oc,r[a])}function q0(s,t,e){const n=this.cache,i=t.length,r=wr(e,i);ye(n,r)||(s.uniform1iv(this.addr,r),Me(n,r));for(let a=0;a!==i;++a)e.setTexture2DArray(t[a]||rc,r[a])}function Y0(s){switch(s){case 5126:return C0;case 35664:return R0;case 35665:return P0;case 35666:return L0;case 35674:return D0;case 35675:return I0;case 35676:return U0;case 5124:case 35670:return N0;case 35667:case 35671:return k0;case 35668:case 35672:return O0;case 35669:case 35673:return F0;case 5125:return B0;case 36294:return z0;case 36295:return H0;case 36296:return V0;case 35678:case 36198:case 36298:case 36306:case 35682:return G0;case 35679:case 36299:case 36307:return W0;case 35680:case 36300:case 36308:case 36293:return X0;case 36289:case 36303:case 36311:case 36292:return q0}}class $0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=A0(e.type)}}class j0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Y0(e.type)}}class K0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(t,e[o.id],n)}}}const fa=/(\w+)(\])?(\[|\.)?/g;function Vl(s,t){s.seq.push(t),s.map[t.id]=t}function Z0(s,t,e){const n=s.name,i=n.length;for(fa.lastIndex=0;;){const r=fa.exec(n),a=fa.lastIndex;let o=r[1];const l=r[2]==="]",h=r[3];if(l&&(o=o|0),h===void 0||h==="["&&a+2===i){Vl(e,h===void 0?new $0(o,s,t):new j0(o,s,t));break}else{let u=e.map[o];u===void 0&&(u=new K0(o),Vl(e,u)),e=u}}}class fr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=t.getActiveUniform(e,i),a=t.getUniformLocation(e,r.name);Z0(r,a,this)}}setValue(t,e,n,i){const r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,r=t.length;i!==r;++i){const a=t[i];a.id in e&&n.push(a)}return n}}function Gl(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const J0=37297;let Q0=0;function tg(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const Wl=new Wt;function eg(s){Qt._getMatrix(Wl,Qt.workingColorSpace,s);const t=`mat3( ${Wl.elements.map(e=>e.toFixed(4))} )`;switch(Qt.getTransfer(s)){case xr:return[t,"LinearTransferOETF"];case oe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function Xl(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+i+`

`+tg(s.getShaderSource(t),a)}else return i}function ng(s,t){const e=eg(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function ig(s,t){let e;switch(t){case Mf:e="Linear";break;case Sf:e="Reinhard";break;case xf:e="Cineon";break;case wf:e="ACESFilmic";break;case Tf:e="AgX";break;case Dh:e="Neutral";break;case bf:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const er=new P;function sg(){Qt.getLuminanceCoefficients(er);const s=er.x.toFixed(4),t=er.y.toFixed(4),e=er.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function rg(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(us).join(`
`)}function ag(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function og(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(t,i),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:s.getAttribLocation(t,a),locationSize:o}}return e}function us(s){return s!==""}function ql(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Yl(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const lg=/^[ \t]*#include +<([\w\d./]+)>/gm;function po(s){return s.replace(lg,cg)}const hg=new Map;function cg(s,t){let e=qt[t];if(e===void 0){const n=hg.get(t);if(n!==void 0)e=qt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return po(e)}const ug=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function $l(s){return s.replace(ug,fg)}function fg(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function jl(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function dg(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Rh?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===Ph?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===bn&&(t="SHADOWMAP_TYPE_VSM"),t}function pg(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Bi:case zi:t="ENVMAP_TYPE_CUBE";break;case Sr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function mg(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case zi:t="ENVMAP_MODE_REFRACTION";break}return t}function gg(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Lh:t="ENVMAP_BLENDING_MULTIPLY";break;case _f:t="ENVMAP_BLENDING_MIX";break;case yf:t="ENVMAP_BLENDING_ADD";break}return t}function vg(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function _g(s,t,e,n){const i=s.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=dg(e),h=pg(e),c=mg(e),u=gg(e),f=vg(e),d=rg(e),g=ag(r),v=i.createProgram();let m,p,T=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(us).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(us).join(`
`),p.length>0&&(p+=`
`)):(m=[jl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(us).join(`
`),p=[jl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Vn?"#define TONE_MAPPING":"",e.toneMapping!==Vn?qt.tonemapping_pars_fragment:"",e.toneMapping!==Vn?ig("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",qt.colorspace_pars_fragment,ng("linearToOutputTexel",e.outputColorSpace),sg(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(us).join(`
`)),a=po(a),a=ql(a,e),a=Yl(a,e),o=po(o),o=ql(o,e),o=Yl(o,e),a=$l(a),o=$l(o),e.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===hl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===hl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const M=T+m+a,y=T+p+o,k=Gl(i,i.VERTEX_SHADER,M),A=Gl(i,i.FRAGMENT_SHADER,y);i.attachShader(v,k),i.attachShader(v,A),e.index0AttributeName!==void 0?i.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(v,0,"position"),i.linkProgram(v);function C(R){if(s.debug.checkShaderErrors){const G=i.getProgramInfoLog(v).trim(),z=i.getShaderInfoLog(k).trim(),q=i.getShaderInfoLog(A).trim();let j=!0,W=!0;if(i.getProgramParameter(v,i.LINK_STATUS)===!1)if(j=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,v,k,A);else{const J=Xl(i,k,"vertex"),H=Xl(i,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(v,i.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+G+`
`+J+`
`+H)}else G!==""?console.warn("THREE.WebGLProgram: Program Info Log:",G):(z===""||q==="")&&(W=!1);W&&(R.diagnostics={runnable:j,programLog:G,vertexShader:{log:z,prefix:m},fragmentShader:{log:q,prefix:p}})}i.deleteShader(k),i.deleteShader(A),D=new fr(i,v),w=og(i,v)}let D;this.getUniforms=function(){return D===void 0&&C(this),D};let w;this.getAttributes=function(){return w===void 0&&C(this),w};let S=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=i.getProgramParameter(v,J0)),S},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Q0++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=k,this.fragmentShader=A,this}let yg=0;class Mg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Sg(t),e.set(t,n)),n}}class Sg{constructor(t){this.id=yg++,this.code=t,this.usedTimes=0}}function xg(s,t,e,n,i,r,a){const o=new $h,l=new Mg,h=new Set,c=[],u=i.logarithmicDepthBuffer,f=i.vertexTextures;let d=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(w){return h.add(w),w===0?"uv":`uv${w}`}function m(w,S,R,G,z){const q=G.fog,j=z.geometry,W=w.isMeshStandardMaterial?G.environment:null,J=(w.isMeshStandardMaterial?e:t).get(w.envMap||W),H=J&&J.mapping===Sr?J.image.height:null,ht=g[w.type];w.precision!==null&&(d=i.getMaxPrecision(w.precision),d!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",d,"instead."));const gt=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,bt=gt!==void 0?gt.length:0;let Ht=0;j.morphAttributes.position!==void 0&&(Ht=1),j.morphAttributes.normal!==void 0&&(Ht=2),j.morphAttributes.color!==void 0&&(Ht=3);let ne,$,st,Tt;if(ht){const re=cn[ht];ne=re.vertexShader,$=re.fragmentShader}else ne=w.vertexShader,$=w.fragmentShader,l.update(w),st=l.getVertexShaderID(w),Tt=l.getFragmentShaderID(w);const ot=s.getRenderTarget(),Dt=s.state.buffers.depth.getReversed(),Ft=z.isInstancedMesh===!0,Nt=z.isBatchedMesh===!0,Jt=!!w.map,Z=!!w.matcap,it=!!J,E=!!w.aoMap,Pt=!!w.lightMap,tt=!!w.bumpMap,Mt=!!w.normalMap,lt=!!w.displacementMap,It=!!w.emissiveMap,_t=!!w.metalnessMap,b=!!w.roughnessMap,_=w.anisotropy>0,O=w.clearcoat>0,X=w.dispersion>0,Q=w.iridescence>0,Y=w.sheen>0,Et=w.transmission>0,ut=_&&!!w.anisotropyMap,yt=O&&!!w.clearcoatMap,jt=O&&!!w.clearcoatNormalMap,et=O&&!!w.clearcoatRoughnessMap,xt=Q&&!!w.iridescenceMap,Ut=Q&&!!w.iridescenceThicknessMap,kt=Y&&!!w.sheenColorMap,wt=Y&&!!w.sheenRoughnessMap,Zt=!!w.specularMap,Xt=!!w.specularColorMap,ce=!!w.specularIntensityMap,I=Et&&!!w.transmissionMap,ft=Et&&!!w.thicknessMap,V=!!w.gradientMap,K=!!w.alphaMap,mt=w.alphaTest>0,dt=!!w.alphaHash,Vt=!!w.extensions;let ve=Vn;w.toneMapped&&(ot===null||ot.isXRRenderTarget===!0)&&(ve=s.toneMapping);const Ae={shaderID:ht,shaderType:w.type,shaderName:w.name,vertexShader:ne,fragmentShader:$,defines:w.defines,customVertexShaderID:st,customFragmentShaderID:Tt,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:d,batching:Nt,batchingColor:Nt&&z._colorsTexture!==null,instancing:Ft,instancingColor:Ft&&z.instanceColor!==null,instancingMorph:Ft&&z.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ot===null?s.outputColorSpace:ot.isXRRenderTarget===!0?ot.texture.colorSpace:qi,alphaToCoverage:!!w.alphaToCoverage,map:Jt,matcap:Z,envMap:it,envMapMode:it&&J.mapping,envMapCubeUVHeight:H,aoMap:E,lightMap:Pt,bumpMap:tt,normalMap:Mt,displacementMap:f&&lt,emissiveMap:It,normalMapObjectSpace:Mt&&w.normalMapType===Rf,normalMapTangentSpace:Mt&&w.normalMapType===Gh,metalnessMap:_t,roughnessMap:b,anisotropy:_,anisotropyMap:ut,clearcoat:O,clearcoatMap:yt,clearcoatNormalMap:jt,clearcoatRoughnessMap:et,dispersion:X,iridescence:Q,iridescenceMap:xt,iridescenceThicknessMap:Ut,sheen:Y,sheenColorMap:kt,sheenRoughnessMap:wt,specularMap:Zt,specularColorMap:Xt,specularIntensityMap:ce,transmission:Et,transmissionMap:I,thicknessMap:ft,gradientMap:V,opaque:w.transparent===!1&&w.blending===Ui&&w.alphaToCoverage===!1,alphaMap:K,alphaTest:mt,alphaHash:dt,combine:w.combine,mapUv:Jt&&v(w.map.channel),aoMapUv:E&&v(w.aoMap.channel),lightMapUv:Pt&&v(w.lightMap.channel),bumpMapUv:tt&&v(w.bumpMap.channel),normalMapUv:Mt&&v(w.normalMap.channel),displacementMapUv:lt&&v(w.displacementMap.channel),emissiveMapUv:It&&v(w.emissiveMap.channel),metalnessMapUv:_t&&v(w.metalnessMap.channel),roughnessMapUv:b&&v(w.roughnessMap.channel),anisotropyMapUv:ut&&v(w.anisotropyMap.channel),clearcoatMapUv:yt&&v(w.clearcoatMap.channel),clearcoatNormalMapUv:jt&&v(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:et&&v(w.clearcoatRoughnessMap.channel),iridescenceMapUv:xt&&v(w.iridescenceMap.channel),iridescenceThicknessMapUv:Ut&&v(w.iridescenceThicknessMap.channel),sheenColorMapUv:kt&&v(w.sheenColorMap.channel),sheenRoughnessMapUv:wt&&v(w.sheenRoughnessMap.channel),specularMapUv:Zt&&v(w.specularMap.channel),specularColorMapUv:Xt&&v(w.specularColorMap.channel),specularIntensityMapUv:ce&&v(w.specularIntensityMap.channel),transmissionMapUv:I&&v(w.transmissionMap.channel),thicknessMapUv:ft&&v(w.thicknessMap.channel),alphaMapUv:K&&v(w.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(Mt||_),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!j.attributes.uv&&(Jt||K),fog:!!q,useFog:w.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Dt,skinning:z.isSkinnedMesh===!0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:bt,morphTextureStride:Ht,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:w.dithering,shadowMapEnabled:s.shadowMap.enabled&&R.length>0,shadowMapType:s.shadowMap.type,toneMapping:ve,decodeVideoTexture:Jt&&w.map.isVideoTexture===!0&&Qt.getTransfer(w.map.colorSpace)===oe,decodeVideoTextureEmissive:It&&w.emissiveMap.isVideoTexture===!0&&Qt.getTransfer(w.emissiveMap.colorSpace)===oe,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===Tn,flipSided:w.side===Ne,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:Vt&&w.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Vt&&w.extensions.multiDraw===!0||Nt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return Ae.vertexUv1s=h.has(1),Ae.vertexUv2s=h.has(2),Ae.vertexUv3s=h.has(3),h.clear(),Ae}function p(w){const S=[];if(w.shaderID?S.push(w.shaderID):(S.push(w.customVertexShaderID),S.push(w.customFragmentShaderID)),w.defines!==void 0)for(const R in w.defines)S.push(R),S.push(w.defines[R]);return w.isRawShaderMaterial===!1&&(T(S,w),M(S,w),S.push(s.outputColorSpace)),S.push(w.customProgramCacheKey),S.join()}function T(w,S){w.push(S.precision),w.push(S.outputColorSpace),w.push(S.envMapMode),w.push(S.envMapCubeUVHeight),w.push(S.mapUv),w.push(S.alphaMapUv),w.push(S.lightMapUv),w.push(S.aoMapUv),w.push(S.bumpMapUv),w.push(S.normalMapUv),w.push(S.displacementMapUv),w.push(S.emissiveMapUv),w.push(S.metalnessMapUv),w.push(S.roughnessMapUv),w.push(S.anisotropyMapUv),w.push(S.clearcoatMapUv),w.push(S.clearcoatNormalMapUv),w.push(S.clearcoatRoughnessMapUv),w.push(S.iridescenceMapUv),w.push(S.iridescenceThicknessMapUv),w.push(S.sheenColorMapUv),w.push(S.sheenRoughnessMapUv),w.push(S.specularMapUv),w.push(S.specularColorMapUv),w.push(S.specularIntensityMapUv),w.push(S.transmissionMapUv),w.push(S.thicknessMapUv),w.push(S.combine),w.push(S.fogExp2),w.push(S.sizeAttenuation),w.push(S.morphTargetsCount),w.push(S.morphAttributeCount),w.push(S.numDirLights),w.push(S.numPointLights),w.push(S.numSpotLights),w.push(S.numSpotLightMaps),w.push(S.numHemiLights),w.push(S.numRectAreaLights),w.push(S.numDirLightShadows),w.push(S.numPointLightShadows),w.push(S.numSpotLightShadows),w.push(S.numSpotLightShadowsWithMaps),w.push(S.numLightProbes),w.push(S.shadowMapType),w.push(S.toneMapping),w.push(S.numClippingPlanes),w.push(S.numClipIntersection),w.push(S.depthPacking)}function M(w,S){o.disableAll(),S.supportsVertexTextures&&o.enable(0),S.instancing&&o.enable(1),S.instancingColor&&o.enable(2),S.instancingMorph&&o.enable(3),S.matcap&&o.enable(4),S.envMap&&o.enable(5),S.normalMapObjectSpace&&o.enable(6),S.normalMapTangentSpace&&o.enable(7),S.clearcoat&&o.enable(8),S.iridescence&&o.enable(9),S.alphaTest&&o.enable(10),S.vertexColors&&o.enable(11),S.vertexAlphas&&o.enable(12),S.vertexUv1s&&o.enable(13),S.vertexUv2s&&o.enable(14),S.vertexUv3s&&o.enable(15),S.vertexTangents&&o.enable(16),S.anisotropy&&o.enable(17),S.alphaHash&&o.enable(18),S.batching&&o.enable(19),S.dispersion&&o.enable(20),S.batchingColor&&o.enable(21),w.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.reverseDepthBuffer&&o.enable(4),S.skinning&&o.enable(5),S.morphTargets&&o.enable(6),S.morphNormals&&o.enable(7),S.morphColors&&o.enable(8),S.premultipliedAlpha&&o.enable(9),S.shadowMapEnabled&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),S.decodeVideoTextureEmissive&&o.enable(20),S.alphaToCoverage&&o.enable(21),w.push(o.mask)}function y(w){const S=g[w.type];let R;if(S){const G=cn[S];R=rd.clone(G.uniforms)}else R=w.uniforms;return R}function k(w,S){let R;for(let G=0,z=c.length;G<z;G++){const q=c[G];if(q.cacheKey===S){R=q,++R.usedTimes;break}}return R===void 0&&(R=new _g(s,S,w,r),c.push(R)),R}function A(w){if(--w.usedTimes===0){const S=c.indexOf(w);c[S]=c[c.length-1],c.pop(),w.destroy()}}function C(w){l.remove(w)}function D(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:y,acquireProgram:k,releaseProgram:A,releaseShaderCache:C,programs:c,dispose:D}}function wg(){let s=new WeakMap;function t(a){return s.has(a)}function e(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function bg(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function Kl(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function Zl(){const s=[];let t=0;const e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function a(u,f,d,g,v,m){let p=s[t];return p===void 0?(p={id:u.id,object:u,geometry:f,material:d,groupOrder:g,renderOrder:u.renderOrder,z:v,group:m},s[t]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=v,p.group=m),t++,p}function o(u,f,d,g,v,m){const p=a(u,f,d,g,v,m);d.transmission>0?n.push(p):d.transparent===!0?i.push(p):e.push(p)}function l(u,f,d,g,v,m){const p=a(u,f,d,g,v,m);d.transmission>0?n.unshift(p):d.transparent===!0?i.unshift(p):e.unshift(p)}function h(u,f){e.length>1&&e.sort(u||bg),n.length>1&&n.sort(f||Kl),i.length>1&&i.sort(f||Kl)}function c(){for(let u=t,f=s.length;u<f;u++){const d=s[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:o,unshift:l,finish:c,sort:h}}function Tg(){let s=new WeakMap;function t(n,i){const r=s.get(n);let a;return r===void 0?(a=new Zl,s.set(n,[a])):i>=r.length?(a=new Zl,r.push(a)):a=r[i],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function Eg(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new P,color:new zt};break;case"SpotLight":e={position:new P,direction:new P,color:new zt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new P,color:new zt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new P,skyColor:new zt,groundColor:new zt};break;case"RectAreaLight":e={color:new zt,position:new P,halfWidth:new P,halfHeight:new P};break}return s[t.id]=e,e}}}function Ag(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let Cg=0;function Rg(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function Pg(s){const t=new Eg,e=Ag(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)n.probe.push(new P);const i=new P,r=new he,a=new he;function o(h){let c=0,u=0,f=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let d=0,g=0,v=0,m=0,p=0,T=0,M=0,y=0,k=0,A=0,C=0;h.sort(Rg);for(let w=0,S=h.length;w<S;w++){const R=h[w],G=R.color,z=R.intensity,q=R.distance,j=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)c+=G.r*z,u+=G.g*z,f+=G.b*z;else if(R.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(R.sh.coefficients[W],z);C++}else if(R.isDirectionalLight){const W=t.get(R);if(W.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const J=R.shadow,H=e.get(R);H.shadowIntensity=J.intensity,H.shadowBias=J.bias,H.shadowNormalBias=J.normalBias,H.shadowRadius=J.radius,H.shadowMapSize=J.mapSize,n.directionalShadow[d]=H,n.directionalShadowMap[d]=j,n.directionalShadowMatrix[d]=R.shadow.matrix,T++}n.directional[d]=W,d++}else if(R.isSpotLight){const W=t.get(R);W.position.setFromMatrixPosition(R.matrixWorld),W.color.copy(G).multiplyScalar(z),W.distance=q,W.coneCos=Math.cos(R.angle),W.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),W.decay=R.decay,n.spot[v]=W;const J=R.shadow;if(R.map&&(n.spotLightMap[k]=R.map,k++,J.updateMatrices(R),R.castShadow&&A++),n.spotLightMatrix[v]=J.matrix,R.castShadow){const H=e.get(R);H.shadowIntensity=J.intensity,H.shadowBias=J.bias,H.shadowNormalBias=J.normalBias,H.shadowRadius=J.radius,H.shadowMapSize=J.mapSize,n.spotShadow[v]=H,n.spotShadowMap[v]=j,y++}v++}else if(R.isRectAreaLight){const W=t.get(R);W.color.copy(G).multiplyScalar(z),W.halfWidth.set(R.width*.5,0,0),W.halfHeight.set(0,R.height*.5,0),n.rectArea[m]=W,m++}else if(R.isPointLight){const W=t.get(R);if(W.color.copy(R.color).multiplyScalar(R.intensity),W.distance=R.distance,W.decay=R.decay,R.castShadow){const J=R.shadow,H=e.get(R);H.shadowIntensity=J.intensity,H.shadowBias=J.bias,H.shadowNormalBias=J.normalBias,H.shadowRadius=J.radius,H.shadowMapSize=J.mapSize,H.shadowCameraNear=J.camera.near,H.shadowCameraFar=J.camera.far,n.pointShadow[g]=H,n.pointShadowMap[g]=j,n.pointShadowMatrix[g]=R.shadow.matrix,M++}n.point[g]=W,g++}else if(R.isHemisphereLight){const W=t.get(R);W.skyColor.copy(R.color).multiplyScalar(z),W.groundColor.copy(R.groundColor).multiplyScalar(z),n.hemi[p]=W,p++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ct.LTC_FLOAT_1,n.rectAreaLTC2=ct.LTC_FLOAT_2):(n.rectAreaLTC1=ct.LTC_HALF_1,n.rectAreaLTC2=ct.LTC_HALF_2)),n.ambient[0]=c,n.ambient[1]=u,n.ambient[2]=f;const D=n.hash;(D.directionalLength!==d||D.pointLength!==g||D.spotLength!==v||D.rectAreaLength!==m||D.hemiLength!==p||D.numDirectionalShadows!==T||D.numPointShadows!==M||D.numSpotShadows!==y||D.numSpotMaps!==k||D.numLightProbes!==C)&&(n.directional.length=d,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=T,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=y+k-A,n.spotLightMap.length=k,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=C,D.directionalLength=d,D.pointLength=g,D.spotLength=v,D.rectAreaLength=m,D.hemiLength=p,D.numDirectionalShadows=T,D.numPointShadows=M,D.numSpotShadows=y,D.numSpotMaps=k,D.numLightProbes=C,n.version=Cg++)}function l(h,c){let u=0,f=0,d=0,g=0,v=0;const m=c.matrixWorldInverse;for(let p=0,T=h.length;p<T;p++){const M=h[p];if(M.isDirectionalLight){const y=n.directional[u];y.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(m),u++}else if(M.isSpotLight){const y=n.spot[d];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(m),d++}else if(M.isRectAreaLight){const y=n.rectArea[g];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(m),a.identity(),r.copy(M.matrixWorld),r.premultiply(m),a.extractRotation(r),y.halfWidth.set(M.width*.5,0,0),y.halfHeight.set(0,M.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),g++}else if(M.isPointLight){const y=n.point[f];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(m),f++}else if(M.isHemisphereLight){const y=n.hemi[v];y.direction.setFromMatrixPosition(M.matrixWorld),y.direction.transformDirection(m),v++}}}return{setup:o,setupView:l,state:n}}function Jl(s){const t=new Pg(s),e=[],n=[];function i(c){h.camera=c,e.length=0,n.length=0}function r(c){e.push(c)}function a(c){n.push(c)}function o(){t.setup(e)}function l(c){t.setupView(e,c)}const h={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:h,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function Lg(s){let t=new WeakMap;function e(i,r=0){const a=t.get(i);let o;return a===void 0?(o=new Jl(s),t.set(i,[o])):r>=a.length?(o=new Jl(s),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}class Dg extends Ts{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Af,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Ig extends Ts{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Ug=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ng=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function kg(s,t,e){let n=new Ao;const i=new at,r=new at,a=new le,o=new Dg({depthPacking:Cf}),l=new Ig,h={},c=e.maxTextureSize,u={[Gn]:Ne,[Ne]:Gn,[Tn]:Tn},f=new Wn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new at},radius:{value:4}},vertexShader:Ug,fragmentShader:Ng}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new Xe;g.setAttribute("position",new je(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Kt(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Rh;let p=this.type;this.render=function(A,C,D){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const w=s.getRenderTarget(),S=s.getActiveCubeFace(),R=s.getActiveMipmapLevel(),G=s.state;G.setBlending(Hn),G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);const z=p!==bn&&this.type===bn,q=p===bn&&this.type!==bn;for(let j=0,W=A.length;j<W;j++){const J=A[j],H=J.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;i.copy(H.mapSize);const ht=H.getFrameExtents();if(i.multiply(ht),r.copy(H.mapSize),(i.x>c||i.y>c)&&(i.x>c&&(r.x=Math.floor(c/ht.x),i.x=r.x*ht.x,H.mapSize.x=r.x),i.y>c&&(r.y=Math.floor(c/ht.y),i.y=r.y*ht.y,H.mapSize.y=r.y)),H.map===null||z===!0||q===!0){const bt=this.type!==bn?{minFilter:We,magFilter:We}:{};H.map!==null&&H.map.dispose(),H.map=new ci(i.x,i.y,bt),H.map.texture.name=J.name+".shadowMap",H.camera.updateProjectionMatrix()}s.setRenderTarget(H.map),s.clear();const gt=H.getViewportCount();for(let bt=0;bt<gt;bt++){const Ht=H.getViewport(bt);a.set(r.x*Ht.x,r.y*Ht.y,r.x*Ht.z,r.y*Ht.w),G.viewport(a),H.updateMatrices(J,bt),n=H.getFrustum(),y(C,D,H.camera,J,this.type)}H.isPointLightShadow!==!0&&this.type===bn&&T(H,D),H.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(w,S,R)};function T(A,C){const D=t.update(v);f.defines.VSM_SAMPLES!==A.blurSamples&&(f.defines.VSM_SAMPLES=A.blurSamples,d.defines.VSM_SAMPLES=A.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new ci(i.x,i.y)),f.uniforms.shadow_pass.value=A.map.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,s.setRenderTarget(A.mapPass),s.clear(),s.renderBufferDirect(C,null,D,f,v,null),d.uniforms.shadow_pass.value=A.mapPass.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,s.setRenderTarget(A.map),s.clear(),s.renderBufferDirect(C,null,D,d,v,null)}function M(A,C,D,w){let S=null;const R=D.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(R!==void 0)S=R;else if(S=D.isPointLight===!0?l:o,s.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){const G=S.uuid,z=C.uuid;let q=h[G];q===void 0&&(q={},h[G]=q);let j=q[z];j===void 0&&(j=S.clone(),q[z]=j,C.addEventListener("dispose",k)),S=j}if(S.visible=C.visible,S.wireframe=C.wireframe,w===bn?S.side=C.shadowSide!==null?C.shadowSide:C.side:S.side=C.shadowSide!==null?C.shadowSide:u[C.side],S.alphaMap=C.alphaMap,S.alphaTest=C.alphaTest,S.map=C.map,S.clipShadows=C.clipShadows,S.clippingPlanes=C.clippingPlanes,S.clipIntersection=C.clipIntersection,S.displacementMap=C.displacementMap,S.displacementScale=C.displacementScale,S.displacementBias=C.displacementBias,S.wireframeLinewidth=C.wireframeLinewidth,S.linewidth=C.linewidth,D.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const G=s.properties.get(S);G.light=D}return S}function y(A,C,D,w,S){if(A.visible===!1)return;if(A.layers.test(C.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&S===bn)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,A.matrixWorld);const z=t.update(A),q=A.material;if(Array.isArray(q)){const j=z.groups;for(let W=0,J=j.length;W<J;W++){const H=j[W],ht=q[H.materialIndex];if(ht&&ht.visible){const gt=M(A,ht,w,S);A.onBeforeShadow(s,A,C,D,z,gt,H),s.renderBufferDirect(D,null,z,gt,A,H),A.onAfterShadow(s,A,C,D,z,gt,H)}}}else if(q.visible){const j=M(A,q,w,S);A.onBeforeShadow(s,A,C,D,z,j,null),s.renderBufferDirect(D,null,z,j,A,null),A.onAfterShadow(s,A,C,D,z,j,null)}}const G=A.children;for(let z=0,q=G.length;z<q;z++)y(G[z],C,D,w,S)}function k(A){A.target.removeEventListener("dispose",k);for(const D in h){const w=h[D],S=A.target.uuid;S in w&&(w[S].dispose(),delete w[S])}}}const Og={[Ra]:Pa,[La]:Ua,[Da]:Na,[Fi]:Ia,[Pa]:Ra,[Ua]:La,[Na]:Da,[Ia]:Fi};function Fg(s,t){function e(){let I=!1;const ft=new le;let V=null;const K=new le(0,0,0,0);return{setMask:function(mt){V!==mt&&!I&&(s.colorMask(mt,mt,mt,mt),V=mt)},setLocked:function(mt){I=mt},setClear:function(mt,dt,Vt,ve,Ae){Ae===!0&&(mt*=ve,dt*=ve,Vt*=ve),ft.set(mt,dt,Vt,ve),K.equals(ft)===!1&&(s.clearColor(mt,dt,Vt,ve),K.copy(ft))},reset:function(){I=!1,V=null,K.set(-1,0,0,0)}}}function n(){let I=!1,ft=!1,V=null,K=null,mt=null;return{setReversed:function(dt){if(ft!==dt){const Vt=t.get("EXT_clip_control");ft?Vt.clipControlEXT(Vt.LOWER_LEFT_EXT,Vt.ZERO_TO_ONE_EXT):Vt.clipControlEXT(Vt.LOWER_LEFT_EXT,Vt.NEGATIVE_ONE_TO_ONE_EXT);const ve=mt;mt=null,this.setClear(ve)}ft=dt},getReversed:function(){return ft},setTest:function(dt){dt?ot(s.DEPTH_TEST):Dt(s.DEPTH_TEST)},setMask:function(dt){V!==dt&&!I&&(s.depthMask(dt),V=dt)},setFunc:function(dt){if(ft&&(dt=Og[dt]),K!==dt){switch(dt){case Ra:s.depthFunc(s.NEVER);break;case Pa:s.depthFunc(s.ALWAYS);break;case La:s.depthFunc(s.LESS);break;case Fi:s.depthFunc(s.LEQUAL);break;case Da:s.depthFunc(s.EQUAL);break;case Ia:s.depthFunc(s.GEQUAL);break;case Ua:s.depthFunc(s.GREATER);break;case Na:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}K=dt}},setLocked:function(dt){I=dt},setClear:function(dt){mt!==dt&&(ft&&(dt=1-dt),s.clearDepth(dt),mt=dt)},reset:function(){I=!1,V=null,K=null,mt=null,ft=!1}}}function i(){let I=!1,ft=null,V=null,K=null,mt=null,dt=null,Vt=null,ve=null,Ae=null;return{setTest:function(re){I||(re?ot(s.STENCIL_TEST):Dt(s.STENCIL_TEST))},setMask:function(re){ft!==re&&!I&&(s.stencilMask(re),ft=re)},setFunc:function(re,Ke,mn){(V!==re||K!==Ke||mt!==mn)&&(s.stencilFunc(re,Ke,mn),V=re,K=Ke,mt=mn)},setOp:function(re,Ke,mn){(dt!==re||Vt!==Ke||ve!==mn)&&(s.stencilOp(re,Ke,mn),dt=re,Vt=Ke,ve=mn)},setLocked:function(re){I=re},setClear:function(re){Ae!==re&&(s.clearStencil(re),Ae=re)},reset:function(){I=!1,ft=null,V=null,K=null,mt=null,dt=null,Vt=null,ve=null,Ae=null}}}const r=new e,a=new n,o=new i,l=new WeakMap,h=new WeakMap;let c={},u={},f=new WeakMap,d=[],g=null,v=!1,m=null,p=null,T=null,M=null,y=null,k=null,A=null,C=new zt(0,0,0),D=0,w=!1,S=null,R=null,G=null,z=null,q=null;const j=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,J=0;const H=s.getParameter(s.VERSION);H.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(H)[1]),W=J>=1):H.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),W=J>=2);let ht=null,gt={};const bt=s.getParameter(s.SCISSOR_BOX),Ht=s.getParameter(s.VIEWPORT),ne=new le().fromArray(bt),$=new le().fromArray(Ht);function st(I,ft,V,K){const mt=new Uint8Array(4),dt=s.createTexture();s.bindTexture(I,dt),s.texParameteri(I,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(I,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Vt=0;Vt<V;Vt++)I===s.TEXTURE_3D||I===s.TEXTURE_2D_ARRAY?s.texImage3D(ft,0,s.RGBA,1,1,K,0,s.RGBA,s.UNSIGNED_BYTE,mt):s.texImage2D(ft+Vt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,mt);return dt}const Tt={};Tt[s.TEXTURE_2D]=st(s.TEXTURE_2D,s.TEXTURE_2D,1),Tt[s.TEXTURE_CUBE_MAP]=st(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Tt[s.TEXTURE_2D_ARRAY]=st(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Tt[s.TEXTURE_3D]=st(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ot(s.DEPTH_TEST),a.setFunc(Fi),tt(!1),Mt(nl),ot(s.CULL_FACE),E(Hn);function ot(I){c[I]!==!0&&(s.enable(I),c[I]=!0)}function Dt(I){c[I]!==!1&&(s.disable(I),c[I]=!1)}function Ft(I,ft){return u[I]!==ft?(s.bindFramebuffer(I,ft),u[I]=ft,I===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=ft),I===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=ft),!0):!1}function Nt(I,ft){let V=d,K=!1;if(I){V=f.get(ft),V===void 0&&(V=[],f.set(ft,V));const mt=I.textures;if(V.length!==mt.length||V[0]!==s.COLOR_ATTACHMENT0){for(let dt=0,Vt=mt.length;dt<Vt;dt++)V[dt]=s.COLOR_ATTACHMENT0+dt;V.length=mt.length,K=!0}}else V[0]!==s.BACK&&(V[0]=s.BACK,K=!0);K&&s.drawBuffers(V)}function Jt(I){return g!==I?(s.useProgram(I),g=I,!0):!1}const Z={[ei]:s.FUNC_ADD,[tf]:s.FUNC_SUBTRACT,[ef]:s.FUNC_REVERSE_SUBTRACT};Z[nf]=s.MIN,Z[sf]=s.MAX;const it={[rf]:s.ZERO,[af]:s.ONE,[of]:s.SRC_COLOR,[Aa]:s.SRC_ALPHA,[df]:s.SRC_ALPHA_SATURATE,[uf]:s.DST_COLOR,[hf]:s.DST_ALPHA,[lf]:s.ONE_MINUS_SRC_COLOR,[Ca]:s.ONE_MINUS_SRC_ALPHA,[ff]:s.ONE_MINUS_DST_COLOR,[cf]:s.ONE_MINUS_DST_ALPHA,[pf]:s.CONSTANT_COLOR,[mf]:s.ONE_MINUS_CONSTANT_COLOR,[gf]:s.CONSTANT_ALPHA,[vf]:s.ONE_MINUS_CONSTANT_ALPHA};function E(I,ft,V,K,mt,dt,Vt,ve,Ae,re){if(I===Hn){v===!0&&(Dt(s.BLEND),v=!1);return}if(v===!1&&(ot(s.BLEND),v=!0),I!==Qu){if(I!==m||re!==w){if((p!==ei||y!==ei)&&(s.blendEquation(s.FUNC_ADD),p=ei,y=ei),re)switch(I){case Ui:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case il:s.blendFunc(s.ONE,s.ONE);break;case sl:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case rl:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case Ui:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case il:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case sl:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case rl:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}T=null,M=null,k=null,A=null,C.set(0,0,0),D=0,m=I,w=re}return}mt=mt||ft,dt=dt||V,Vt=Vt||K,(ft!==p||mt!==y)&&(s.blendEquationSeparate(Z[ft],Z[mt]),p=ft,y=mt),(V!==T||K!==M||dt!==k||Vt!==A)&&(s.blendFuncSeparate(it[V],it[K],it[dt],it[Vt]),T=V,M=K,k=dt,A=Vt),(ve.equals(C)===!1||Ae!==D)&&(s.blendColor(ve.r,ve.g,ve.b,Ae),C.copy(ve),D=Ae),m=I,w=!1}function Pt(I,ft){I.side===Tn?Dt(s.CULL_FACE):ot(s.CULL_FACE);let V=I.side===Ne;ft&&(V=!V),tt(V),I.blending===Ui&&I.transparent===!1?E(Hn):E(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),a.setFunc(I.depthFunc),a.setTest(I.depthTest),a.setMask(I.depthWrite),r.setMask(I.colorWrite);const K=I.stencilWrite;o.setTest(K),K&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),It(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?ot(s.SAMPLE_ALPHA_TO_COVERAGE):Dt(s.SAMPLE_ALPHA_TO_COVERAGE)}function tt(I){S!==I&&(I?s.frontFace(s.CW):s.frontFace(s.CCW),S=I)}function Mt(I){I!==Zu?(ot(s.CULL_FACE),I!==R&&(I===nl?s.cullFace(s.BACK):I===Ju?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Dt(s.CULL_FACE),R=I}function lt(I){I!==G&&(W&&s.lineWidth(I),G=I)}function It(I,ft,V){I?(ot(s.POLYGON_OFFSET_FILL),(z!==ft||q!==V)&&(s.polygonOffset(ft,V),z=ft,q=V)):Dt(s.POLYGON_OFFSET_FILL)}function _t(I){I?ot(s.SCISSOR_TEST):Dt(s.SCISSOR_TEST)}function b(I){I===void 0&&(I=s.TEXTURE0+j-1),ht!==I&&(s.activeTexture(I),ht=I)}function _(I,ft,V){V===void 0&&(ht===null?V=s.TEXTURE0+j-1:V=ht);let K=gt[V];K===void 0&&(K={type:void 0,texture:void 0},gt[V]=K),(K.type!==I||K.texture!==ft)&&(ht!==V&&(s.activeTexture(V),ht=V),s.bindTexture(I,ft||Tt[I]),K.type=I,K.texture=ft)}function O(){const I=gt[ht];I!==void 0&&I.type!==void 0&&(s.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function X(){try{s.compressedTexImage2D.apply(s,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Q(){try{s.compressedTexImage3D.apply(s,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Y(){try{s.texSubImage2D.apply(s,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Et(){try{s.texSubImage3D.apply(s,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ut(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function yt(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function jt(){try{s.texStorage2D.apply(s,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function et(){try{s.texStorage3D.apply(s,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function xt(){try{s.texImage2D.apply(s,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ut(){try{s.texImage3D.apply(s,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function kt(I){ne.equals(I)===!1&&(s.scissor(I.x,I.y,I.z,I.w),ne.copy(I))}function wt(I){$.equals(I)===!1&&(s.viewport(I.x,I.y,I.z,I.w),$.copy(I))}function Zt(I,ft){let V=h.get(ft);V===void 0&&(V=new WeakMap,h.set(ft,V));let K=V.get(I);K===void 0&&(K=s.getUniformBlockIndex(ft,I.name),V.set(I,K))}function Xt(I,ft){const K=h.get(ft).get(I);l.get(ft)!==K&&(s.uniformBlockBinding(ft,K,I.__bindingPointIndex),l.set(ft,K))}function ce(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),c={},ht=null,gt={},u={},f=new WeakMap,d=[],g=null,v=!1,m=null,p=null,T=null,M=null,y=null,k=null,A=null,C=new zt(0,0,0),D=0,w=!1,S=null,R=null,G=null,z=null,q=null,ne.set(0,0,s.canvas.width,s.canvas.height),$.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ot,disable:Dt,bindFramebuffer:Ft,drawBuffers:Nt,useProgram:Jt,setBlending:E,setMaterial:Pt,setFlipSided:tt,setCullFace:Mt,setLineWidth:lt,setPolygonOffset:It,setScissorTest:_t,activeTexture:b,bindTexture:_,unbindTexture:O,compressedTexImage2D:X,compressedTexImage3D:Q,texImage2D:xt,texImage3D:Ut,updateUBOMapping:Zt,uniformBlockBinding:Xt,texStorage2D:jt,texStorage3D:et,texSubImage2D:Y,texSubImage3D:Et,compressedTexSubImage2D:ut,compressedTexSubImage3D:yt,scissor:kt,viewport:wt,reset:ce}}function Ql(s,t,e,n){const i=Bg(n);switch(e){case Oh:return s*t;case Bh:return s*t;case zh:return s*t*2;case wo:return s*t/i.components*i.byteLength;case bo:return s*t/i.components*i.byteLength;case Hh:return s*t*2/i.components*i.byteLength;case To:return s*t*2/i.components*i.byteLength;case Fh:return s*t*3/i.components*i.byteLength;case rn:return s*t*4/i.components*i.byteLength;case Eo:return s*t*4/i.components*i.byteLength;case or:case lr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case hr:case cr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case za:case Va:return Math.max(s,16)*Math.max(t,8)/4;case Ba:case Ha:return Math.max(s,8)*Math.max(t,8)/2;case Ga:case Wa:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Xa:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case qa:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Ya:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case $a:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case ja:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case Ka:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case Za:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case Ja:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case Qa:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case to:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case eo:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case no:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case io:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case so:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case ro:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case ur:case ao:case oo:return Math.ceil(s/4)*Math.ceil(t/4)*16;case Vh:case lo:return Math.ceil(s/4)*Math.ceil(t/4)*8;case ho:case co:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Bg(s){switch(s){case Rn:case Uh:return{byteLength:1,components:1};case _s:case Nh:case ws:return{byteLength:2,components:1};case So:case xo:return{byteLength:2,components:4};case hi:case Mo:case dn:return{byteLength:4,components:1};case kh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function zg(s,t,e,n,i,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new at,c=new WeakMap;let u;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(b,_){return d?new OffscreenCanvas(b,_):gr("canvas")}function v(b,_,O){let X=1;const Q=_t(b);if((Q.width>O||Q.height>O)&&(X=O/Math.max(Q.width,Q.height)),X<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const Y=Math.floor(X*Q.width),Et=Math.floor(X*Q.height);u===void 0&&(u=g(Y,Et));const ut=_?g(Y,Et):u;return ut.width=Y,ut.height=Et,ut.getContext("2d").drawImage(b,0,0,Y,Et),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+Y+"x"+Et+")."),ut}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),b;return b}function m(b){return b.generateMipmaps}function p(b){s.generateMipmap(b)}function T(b){return b.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?s.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function M(b,_,O,X,Q=!1){if(b!==null){if(s[b]!==void 0)return s[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let Y=_;if(_===s.RED&&(O===s.FLOAT&&(Y=s.R32F),O===s.HALF_FLOAT&&(Y=s.R16F),O===s.UNSIGNED_BYTE&&(Y=s.R8)),_===s.RED_INTEGER&&(O===s.UNSIGNED_BYTE&&(Y=s.R8UI),O===s.UNSIGNED_SHORT&&(Y=s.R16UI),O===s.UNSIGNED_INT&&(Y=s.R32UI),O===s.BYTE&&(Y=s.R8I),O===s.SHORT&&(Y=s.R16I),O===s.INT&&(Y=s.R32I)),_===s.RG&&(O===s.FLOAT&&(Y=s.RG32F),O===s.HALF_FLOAT&&(Y=s.RG16F),O===s.UNSIGNED_BYTE&&(Y=s.RG8)),_===s.RG_INTEGER&&(O===s.UNSIGNED_BYTE&&(Y=s.RG8UI),O===s.UNSIGNED_SHORT&&(Y=s.RG16UI),O===s.UNSIGNED_INT&&(Y=s.RG32UI),O===s.BYTE&&(Y=s.RG8I),O===s.SHORT&&(Y=s.RG16I),O===s.INT&&(Y=s.RG32I)),_===s.RGB_INTEGER&&(O===s.UNSIGNED_BYTE&&(Y=s.RGB8UI),O===s.UNSIGNED_SHORT&&(Y=s.RGB16UI),O===s.UNSIGNED_INT&&(Y=s.RGB32UI),O===s.BYTE&&(Y=s.RGB8I),O===s.SHORT&&(Y=s.RGB16I),O===s.INT&&(Y=s.RGB32I)),_===s.RGBA_INTEGER&&(O===s.UNSIGNED_BYTE&&(Y=s.RGBA8UI),O===s.UNSIGNED_SHORT&&(Y=s.RGBA16UI),O===s.UNSIGNED_INT&&(Y=s.RGBA32UI),O===s.BYTE&&(Y=s.RGBA8I),O===s.SHORT&&(Y=s.RGBA16I),O===s.INT&&(Y=s.RGBA32I)),_===s.RGB&&O===s.UNSIGNED_INT_5_9_9_9_REV&&(Y=s.RGB9_E5),_===s.RGBA){const Et=Q?xr:Qt.getTransfer(X);O===s.FLOAT&&(Y=s.RGBA32F),O===s.HALF_FLOAT&&(Y=s.RGBA16F),O===s.UNSIGNED_BYTE&&(Y=Et===oe?s.SRGB8_ALPHA8:s.RGBA8),O===s.UNSIGNED_SHORT_4_4_4_4&&(Y=s.RGBA4),O===s.UNSIGNED_SHORT_5_5_5_1&&(Y=s.RGB5_A1)}return(Y===s.R16F||Y===s.R32F||Y===s.RG16F||Y===s.RG32F||Y===s.RGBA16F||Y===s.RGBA32F)&&t.get("EXT_color_buffer_float"),Y}function y(b,_){let O;return b?_===null||_===hi||_===Hi?O=s.DEPTH24_STENCIL8:_===dn?O=s.DEPTH32F_STENCIL8:_===_s&&(O=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===hi||_===Hi?O=s.DEPTH_COMPONENT24:_===dn?O=s.DEPTH_COMPONENT32F:_===_s&&(O=s.DEPTH_COMPONENT16),O}function k(b,_){return m(b)===!0||b.isFramebufferTexture&&b.minFilter!==We&&b.minFilter!==fn?Math.log2(Math.max(_.width,_.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?_.mipmaps.length:1}function A(b){const _=b.target;_.removeEventListener("dispose",A),D(_),_.isVideoTexture&&c.delete(_)}function C(b){const _=b.target;_.removeEventListener("dispose",C),S(_)}function D(b){const _=n.get(b);if(_.__webglInit===void 0)return;const O=b.source,X=f.get(O);if(X){const Q=X[_.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&w(b),Object.keys(X).length===0&&f.delete(O)}n.remove(b)}function w(b){const _=n.get(b);s.deleteTexture(_.__webglTexture);const O=b.source,X=f.get(O);delete X[_.__cacheKey],a.memory.textures--}function S(b){const _=n.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),n.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(_.__webglFramebuffer[X]))for(let Q=0;Q<_.__webglFramebuffer[X].length;Q++)s.deleteFramebuffer(_.__webglFramebuffer[X][Q]);else s.deleteFramebuffer(_.__webglFramebuffer[X]);_.__webglDepthbuffer&&s.deleteRenderbuffer(_.__webglDepthbuffer[X])}else{if(Array.isArray(_.__webglFramebuffer))for(let X=0;X<_.__webglFramebuffer.length;X++)s.deleteFramebuffer(_.__webglFramebuffer[X]);else s.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&s.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&s.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let X=0;X<_.__webglColorRenderbuffer.length;X++)_.__webglColorRenderbuffer[X]&&s.deleteRenderbuffer(_.__webglColorRenderbuffer[X]);_.__webglDepthRenderbuffer&&s.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const O=b.textures;for(let X=0,Q=O.length;X<Q;X++){const Y=n.get(O[X]);Y.__webglTexture&&(s.deleteTexture(Y.__webglTexture),a.memory.textures--),n.remove(O[X])}n.remove(b)}let R=0;function G(){R=0}function z(){const b=R;return b>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+i.maxTextures),R+=1,b}function q(b){const _=[];return _.push(b.wrapS),_.push(b.wrapT),_.push(b.wrapR||0),_.push(b.magFilter),_.push(b.minFilter),_.push(b.anisotropy),_.push(b.internalFormat),_.push(b.format),_.push(b.type),_.push(b.generateMipmaps),_.push(b.premultiplyAlpha),_.push(b.flipY),_.push(b.unpackAlignment),_.push(b.colorSpace),_.join()}function j(b,_){const O=n.get(b);if(b.isVideoTexture&&lt(b),b.isRenderTargetTexture===!1&&b.version>0&&O.__version!==b.version){const X=b.image;if(X===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$(O,b,_);return}}e.bindTexture(s.TEXTURE_2D,O.__webglTexture,s.TEXTURE0+_)}function W(b,_){const O=n.get(b);if(b.version>0&&O.__version!==b.version){$(O,b,_);return}e.bindTexture(s.TEXTURE_2D_ARRAY,O.__webglTexture,s.TEXTURE0+_)}function J(b,_){const O=n.get(b);if(b.version>0&&O.__version!==b.version){$(O,b,_);return}e.bindTexture(s.TEXTURE_3D,O.__webglTexture,s.TEXTURE0+_)}function H(b,_){const O=n.get(b);if(b.version>0&&O.__version!==b.version){st(O,b,_);return}e.bindTexture(s.TEXTURE_CUBE_MAP,O.__webglTexture,s.TEXTURE0+_)}const ht={[pr]:s.REPEAT,[ai]:s.CLAMP_TO_EDGE,[Fa]:s.MIRRORED_REPEAT},gt={[We]:s.NEAREST,[Ef]:s.NEAREST_MIPMAP_NEAREST,[Ns]:s.NEAREST_MIPMAP_LINEAR,[fn]:s.LINEAR,[Fr]:s.LINEAR_MIPMAP_NEAREST,[oi]:s.LINEAR_MIPMAP_LINEAR},bt={[Pf]:s.NEVER,[kf]:s.ALWAYS,[Lf]:s.LESS,[Wh]:s.LEQUAL,[Df]:s.EQUAL,[Nf]:s.GEQUAL,[If]:s.GREATER,[Uf]:s.NOTEQUAL};function Ht(b,_){if(_.type===dn&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===fn||_.magFilter===Fr||_.magFilter===Ns||_.magFilter===oi||_.minFilter===fn||_.minFilter===Fr||_.minFilter===Ns||_.minFilter===oi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(b,s.TEXTURE_WRAP_S,ht[_.wrapS]),s.texParameteri(b,s.TEXTURE_WRAP_T,ht[_.wrapT]),(b===s.TEXTURE_3D||b===s.TEXTURE_2D_ARRAY)&&s.texParameteri(b,s.TEXTURE_WRAP_R,ht[_.wrapR]),s.texParameteri(b,s.TEXTURE_MAG_FILTER,gt[_.magFilter]),s.texParameteri(b,s.TEXTURE_MIN_FILTER,gt[_.minFilter]),_.compareFunction&&(s.texParameteri(b,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(b,s.TEXTURE_COMPARE_FUNC,bt[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===We||_.minFilter!==Ns&&_.minFilter!==oi||_.type===dn&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){const O=t.get("EXT_texture_filter_anisotropic");s.texParameterf(b,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,i.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function ne(b,_){let O=!1;b.__webglInit===void 0&&(b.__webglInit=!0,_.addEventListener("dispose",A));const X=_.source;let Q=f.get(X);Q===void 0&&(Q={},f.set(X,Q));const Y=q(_);if(Y!==b.__cacheKey){Q[Y]===void 0&&(Q[Y]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,O=!0),Q[Y].usedTimes++;const Et=Q[b.__cacheKey];Et!==void 0&&(Q[b.__cacheKey].usedTimes--,Et.usedTimes===0&&w(_)),b.__cacheKey=Y,b.__webglTexture=Q[Y].texture}return O}function $(b,_,O){let X=s.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(X=s.TEXTURE_2D_ARRAY),_.isData3DTexture&&(X=s.TEXTURE_3D);const Q=ne(b,_),Y=_.source;e.bindTexture(X,b.__webglTexture,s.TEXTURE0+O);const Et=n.get(Y);if(Y.version!==Et.__version||Q===!0){e.activeTexture(s.TEXTURE0+O);const ut=Qt.getPrimaries(Qt.workingColorSpace),yt=_.colorSpace===zn?null:Qt.getPrimaries(_.colorSpace),jt=_.colorSpace===zn||ut===yt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,_.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,_.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,jt);let et=v(_.image,!1,i.maxTextureSize);et=It(_,et);const xt=r.convert(_.format,_.colorSpace),Ut=r.convert(_.type);let kt=M(_.internalFormat,xt,Ut,_.colorSpace,_.isVideoTexture);Ht(X,_);let wt;const Zt=_.mipmaps,Xt=_.isVideoTexture!==!0,ce=Et.__version===void 0||Q===!0,I=Y.dataReady,ft=k(_,et);if(_.isDepthTexture)kt=y(_.format===Vi,_.type),ce&&(Xt?e.texStorage2D(s.TEXTURE_2D,1,kt,et.width,et.height):e.texImage2D(s.TEXTURE_2D,0,kt,et.width,et.height,0,xt,Ut,null));else if(_.isDataTexture)if(Zt.length>0){Xt&&ce&&e.texStorage2D(s.TEXTURE_2D,ft,kt,Zt[0].width,Zt[0].height);for(let V=0,K=Zt.length;V<K;V++)wt=Zt[V],Xt?I&&e.texSubImage2D(s.TEXTURE_2D,V,0,0,wt.width,wt.height,xt,Ut,wt.data):e.texImage2D(s.TEXTURE_2D,V,kt,wt.width,wt.height,0,xt,Ut,wt.data);_.generateMipmaps=!1}else Xt?(ce&&e.texStorage2D(s.TEXTURE_2D,ft,kt,et.width,et.height),I&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,et.width,et.height,xt,Ut,et.data)):e.texImage2D(s.TEXTURE_2D,0,kt,et.width,et.height,0,xt,Ut,et.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Xt&&ce&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ft,kt,Zt[0].width,Zt[0].height,et.depth);for(let V=0,K=Zt.length;V<K;V++)if(wt=Zt[V],_.format!==rn)if(xt!==null)if(Xt){if(I)if(_.layerUpdates.size>0){const mt=Ql(wt.width,wt.height,_.format,_.type);for(const dt of _.layerUpdates){const Vt=wt.data.subarray(dt*mt/wt.data.BYTES_PER_ELEMENT,(dt+1)*mt/wt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,V,0,0,dt,wt.width,wt.height,1,xt,Vt)}_.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,V,0,0,0,wt.width,wt.height,et.depth,xt,wt.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,V,kt,wt.width,wt.height,et.depth,0,wt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Xt?I&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,V,0,0,0,wt.width,wt.height,et.depth,xt,Ut,wt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,V,kt,wt.width,wt.height,et.depth,0,xt,Ut,wt.data)}else{Xt&&ce&&e.texStorage2D(s.TEXTURE_2D,ft,kt,Zt[0].width,Zt[0].height);for(let V=0,K=Zt.length;V<K;V++)wt=Zt[V],_.format!==rn?xt!==null?Xt?I&&e.compressedTexSubImage2D(s.TEXTURE_2D,V,0,0,wt.width,wt.height,xt,wt.data):e.compressedTexImage2D(s.TEXTURE_2D,V,kt,wt.width,wt.height,0,wt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Xt?I&&e.texSubImage2D(s.TEXTURE_2D,V,0,0,wt.width,wt.height,xt,Ut,wt.data):e.texImage2D(s.TEXTURE_2D,V,kt,wt.width,wt.height,0,xt,Ut,wt.data)}else if(_.isDataArrayTexture)if(Xt){if(ce&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ft,kt,et.width,et.height,et.depth),I)if(_.layerUpdates.size>0){const V=Ql(et.width,et.height,_.format,_.type);for(const K of _.layerUpdates){const mt=et.data.subarray(K*V/et.data.BYTES_PER_ELEMENT,(K+1)*V/et.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,K,et.width,et.height,1,xt,Ut,mt)}_.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,et.width,et.height,et.depth,xt,Ut,et.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,kt,et.width,et.height,et.depth,0,xt,Ut,et.data);else if(_.isData3DTexture)Xt?(ce&&e.texStorage3D(s.TEXTURE_3D,ft,kt,et.width,et.height,et.depth),I&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,et.width,et.height,et.depth,xt,Ut,et.data)):e.texImage3D(s.TEXTURE_3D,0,kt,et.width,et.height,et.depth,0,xt,Ut,et.data);else if(_.isFramebufferTexture){if(ce)if(Xt)e.texStorage2D(s.TEXTURE_2D,ft,kt,et.width,et.height);else{let V=et.width,K=et.height;for(let mt=0;mt<ft;mt++)e.texImage2D(s.TEXTURE_2D,mt,kt,V,K,0,xt,Ut,null),V>>=1,K>>=1}}else if(Zt.length>0){if(Xt&&ce){const V=_t(Zt[0]);e.texStorage2D(s.TEXTURE_2D,ft,kt,V.width,V.height)}for(let V=0,K=Zt.length;V<K;V++)wt=Zt[V],Xt?I&&e.texSubImage2D(s.TEXTURE_2D,V,0,0,xt,Ut,wt):e.texImage2D(s.TEXTURE_2D,V,kt,xt,Ut,wt);_.generateMipmaps=!1}else if(Xt){if(ce){const V=_t(et);e.texStorage2D(s.TEXTURE_2D,ft,kt,V.width,V.height)}I&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,xt,Ut,et)}else e.texImage2D(s.TEXTURE_2D,0,kt,xt,Ut,et);m(_)&&p(X),Et.__version=Y.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function st(b,_,O){if(_.image.length!==6)return;const X=ne(b,_),Q=_.source;e.bindTexture(s.TEXTURE_CUBE_MAP,b.__webglTexture,s.TEXTURE0+O);const Y=n.get(Q);if(Q.version!==Y.__version||X===!0){e.activeTexture(s.TEXTURE0+O);const Et=Qt.getPrimaries(Qt.workingColorSpace),ut=_.colorSpace===zn?null:Qt.getPrimaries(_.colorSpace),yt=_.colorSpace===zn||Et===ut?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,_.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,_.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,yt);const jt=_.isCompressedTexture||_.image[0].isCompressedTexture,et=_.image[0]&&_.image[0].isDataTexture,xt=[];for(let K=0;K<6;K++)!jt&&!et?xt[K]=v(_.image[K],!0,i.maxCubemapSize):xt[K]=et?_.image[K].image:_.image[K],xt[K]=It(_,xt[K]);const Ut=xt[0],kt=r.convert(_.format,_.colorSpace),wt=r.convert(_.type),Zt=M(_.internalFormat,kt,wt,_.colorSpace),Xt=_.isVideoTexture!==!0,ce=Y.__version===void 0||X===!0,I=Q.dataReady;let ft=k(_,Ut);Ht(s.TEXTURE_CUBE_MAP,_);let V;if(jt){Xt&&ce&&e.texStorage2D(s.TEXTURE_CUBE_MAP,ft,Zt,Ut.width,Ut.height);for(let K=0;K<6;K++){V=xt[K].mipmaps;for(let mt=0;mt<V.length;mt++){const dt=V[mt];_.format!==rn?kt!==null?Xt?I&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,mt,0,0,dt.width,dt.height,kt,dt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,mt,Zt,dt.width,dt.height,0,dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Xt?I&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,mt,0,0,dt.width,dt.height,kt,wt,dt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,mt,Zt,dt.width,dt.height,0,kt,wt,dt.data)}}}else{if(V=_.mipmaps,Xt&&ce){V.length>0&&ft++;const K=_t(xt[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,ft,Zt,K.width,K.height)}for(let K=0;K<6;K++)if(et){Xt?I&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,xt[K].width,xt[K].height,kt,wt,xt[K].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Zt,xt[K].width,xt[K].height,0,kt,wt,xt[K].data);for(let mt=0;mt<V.length;mt++){const Vt=V[mt].image[K].image;Xt?I&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,mt+1,0,0,Vt.width,Vt.height,kt,wt,Vt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,mt+1,Zt,Vt.width,Vt.height,0,kt,wt,Vt.data)}}else{Xt?I&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,kt,wt,xt[K]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Zt,kt,wt,xt[K]);for(let mt=0;mt<V.length;mt++){const dt=V[mt];Xt?I&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,mt+1,0,0,kt,wt,dt.image[K]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,mt+1,Zt,kt,wt,dt.image[K])}}}m(_)&&p(s.TEXTURE_CUBE_MAP),Y.__version=Q.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function Tt(b,_,O,X,Q,Y){const Et=r.convert(O.format,O.colorSpace),ut=r.convert(O.type),yt=M(O.internalFormat,Et,ut,O.colorSpace),jt=n.get(_),et=n.get(O);if(et.__renderTarget=_,!jt.__hasExternalTextures){const xt=Math.max(1,_.width>>Y),Ut=Math.max(1,_.height>>Y);Q===s.TEXTURE_3D||Q===s.TEXTURE_2D_ARRAY?e.texImage3D(Q,Y,yt,xt,Ut,_.depth,0,Et,ut,null):e.texImage2D(Q,Y,yt,xt,Ut,0,Et,ut,null)}e.bindFramebuffer(s.FRAMEBUFFER,b),Mt(_)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,X,Q,et.__webglTexture,0,tt(_)):(Q===s.TEXTURE_2D||Q>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,X,Q,et.__webglTexture,Y),e.bindFramebuffer(s.FRAMEBUFFER,null)}function ot(b,_,O){if(s.bindRenderbuffer(s.RENDERBUFFER,b),_.depthBuffer){const X=_.depthTexture,Q=X&&X.isDepthTexture?X.type:null,Y=y(_.stencilBuffer,Q),Et=_.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ut=tt(_);Mt(_)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ut,Y,_.width,_.height):O?s.renderbufferStorageMultisample(s.RENDERBUFFER,ut,Y,_.width,_.height):s.renderbufferStorage(s.RENDERBUFFER,Y,_.width,_.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Et,s.RENDERBUFFER,b)}else{const X=_.textures;for(let Q=0;Q<X.length;Q++){const Y=X[Q],Et=r.convert(Y.format,Y.colorSpace),ut=r.convert(Y.type),yt=M(Y.internalFormat,Et,ut,Y.colorSpace),jt=tt(_);O&&Mt(_)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,jt,yt,_.width,_.height):Mt(_)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,jt,yt,_.width,_.height):s.renderbufferStorage(s.RENDERBUFFER,yt,_.width,_.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Dt(b,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,b),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const X=n.get(_.depthTexture);X.__renderTarget=_,(!X.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),j(_.depthTexture,0);const Q=X.__webglTexture,Y=tt(_);if(_.depthTexture.format===Ni)Mt(_)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Q,0,Y):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Q,0);else if(_.depthTexture.format===Vi)Mt(_)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Q,0,Y):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Ft(b){const _=n.get(b),O=b.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==b.depthTexture){const X=b.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),X){const Q=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,X.removeEventListener("dispose",Q)};X.addEventListener("dispose",Q),_.__depthDisposeCallback=Q}_.__boundDepthTexture=X}if(b.depthTexture&&!_.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");Dt(_.__webglFramebuffer,b)}else if(O){_.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(e.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer[X]),_.__webglDepthbuffer[X]===void 0)_.__webglDepthbuffer[X]=s.createRenderbuffer(),ot(_.__webglDepthbuffer[X],b,!1);else{const Q=b.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Y=_.__webglDepthbuffer[X];s.bindRenderbuffer(s.RENDERBUFFER,Y),s.framebufferRenderbuffer(s.FRAMEBUFFER,Q,s.RENDERBUFFER,Y)}}else if(e.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=s.createRenderbuffer(),ot(_.__webglDepthbuffer,b,!1);else{const X=b.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Q=_.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,Q),s.framebufferRenderbuffer(s.FRAMEBUFFER,X,s.RENDERBUFFER,Q)}e.bindFramebuffer(s.FRAMEBUFFER,null)}function Nt(b,_,O){const X=n.get(b);_!==void 0&&Tt(X.__webglFramebuffer,b,b.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),O!==void 0&&Ft(b)}function Jt(b){const _=b.texture,O=n.get(b),X=n.get(_);b.addEventListener("dispose",C);const Q=b.textures,Y=b.isWebGLCubeRenderTarget===!0,Et=Q.length>1;if(Et||(X.__webglTexture===void 0&&(X.__webglTexture=s.createTexture()),X.__version=_.version,a.memory.textures++),Y){O.__webglFramebuffer=[];for(let ut=0;ut<6;ut++)if(_.mipmaps&&_.mipmaps.length>0){O.__webglFramebuffer[ut]=[];for(let yt=0;yt<_.mipmaps.length;yt++)O.__webglFramebuffer[ut][yt]=s.createFramebuffer()}else O.__webglFramebuffer[ut]=s.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){O.__webglFramebuffer=[];for(let ut=0;ut<_.mipmaps.length;ut++)O.__webglFramebuffer[ut]=s.createFramebuffer()}else O.__webglFramebuffer=s.createFramebuffer();if(Et)for(let ut=0,yt=Q.length;ut<yt;ut++){const jt=n.get(Q[ut]);jt.__webglTexture===void 0&&(jt.__webglTexture=s.createTexture(),a.memory.textures++)}if(b.samples>0&&Mt(b)===!1){O.__webglMultisampledFramebuffer=s.createFramebuffer(),O.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let ut=0;ut<Q.length;ut++){const yt=Q[ut];O.__webglColorRenderbuffer[ut]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,O.__webglColorRenderbuffer[ut]);const jt=r.convert(yt.format,yt.colorSpace),et=r.convert(yt.type),xt=M(yt.internalFormat,jt,et,yt.colorSpace,b.isXRRenderTarget===!0),Ut=tt(b);s.renderbufferStorageMultisample(s.RENDERBUFFER,Ut,xt,b.width,b.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ut,s.RENDERBUFFER,O.__webglColorRenderbuffer[ut])}s.bindRenderbuffer(s.RENDERBUFFER,null),b.depthBuffer&&(O.__webglDepthRenderbuffer=s.createRenderbuffer(),ot(O.__webglDepthRenderbuffer,b,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(Y){e.bindTexture(s.TEXTURE_CUBE_MAP,X.__webglTexture),Ht(s.TEXTURE_CUBE_MAP,_);for(let ut=0;ut<6;ut++)if(_.mipmaps&&_.mipmaps.length>0)for(let yt=0;yt<_.mipmaps.length;yt++)Tt(O.__webglFramebuffer[ut][yt],b,_,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ut,yt);else Tt(O.__webglFramebuffer[ut],b,_,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0);m(_)&&p(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Et){for(let ut=0,yt=Q.length;ut<yt;ut++){const jt=Q[ut],et=n.get(jt);e.bindTexture(s.TEXTURE_2D,et.__webglTexture),Ht(s.TEXTURE_2D,jt),Tt(O.__webglFramebuffer,b,jt,s.COLOR_ATTACHMENT0+ut,s.TEXTURE_2D,0),m(jt)&&p(s.TEXTURE_2D)}e.unbindTexture()}else{let ut=s.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(ut=b.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(ut,X.__webglTexture),Ht(ut,_),_.mipmaps&&_.mipmaps.length>0)for(let yt=0;yt<_.mipmaps.length;yt++)Tt(O.__webglFramebuffer[yt],b,_,s.COLOR_ATTACHMENT0,ut,yt);else Tt(O.__webglFramebuffer,b,_,s.COLOR_ATTACHMENT0,ut,0);m(_)&&p(ut),e.unbindTexture()}b.depthBuffer&&Ft(b)}function Z(b){const _=b.textures;for(let O=0,X=_.length;O<X;O++){const Q=_[O];if(m(Q)){const Y=T(b),Et=n.get(Q).__webglTexture;e.bindTexture(Y,Et),p(Y),e.unbindTexture()}}}const it=[],E=[];function Pt(b){if(b.samples>0){if(Mt(b)===!1){const _=b.textures,O=b.width,X=b.height;let Q=s.COLOR_BUFFER_BIT;const Y=b.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Et=n.get(b),ut=_.length>1;if(ut)for(let yt=0;yt<_.length;yt++)e.bindFramebuffer(s.FRAMEBUFFER,Et.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+yt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,Et.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+yt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,Et.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Et.__webglFramebuffer);for(let yt=0;yt<_.length;yt++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(Q|=s.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(Q|=s.STENCIL_BUFFER_BIT)),ut){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Et.__webglColorRenderbuffer[yt]);const jt=n.get(_[yt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,jt,0)}s.blitFramebuffer(0,0,O,X,0,0,O,X,Q,s.NEAREST),l===!0&&(it.length=0,E.length=0,it.push(s.COLOR_ATTACHMENT0+yt),b.depthBuffer&&b.resolveDepthBuffer===!1&&(it.push(Y),E.push(Y),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,E)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,it))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ut)for(let yt=0;yt<_.length;yt++){e.bindFramebuffer(s.FRAMEBUFFER,Et.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+yt,s.RENDERBUFFER,Et.__webglColorRenderbuffer[yt]);const jt=n.get(_[yt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,Et.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+yt,s.TEXTURE_2D,jt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Et.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&l){const _=b.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[_])}}}function tt(b){return Math.min(i.maxSamples,b.samples)}function Mt(b){const _=n.get(b);return b.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function lt(b){const _=a.render.frame;c.get(b)!==_&&(c.set(b,_),b.update())}function It(b,_){const O=b.colorSpace,X=b.format,Q=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||O!==qi&&O!==zn&&(Qt.getTransfer(O)===oe?(X!==rn||Q!==Rn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),_}function _t(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(h.width=b.naturalWidth||b.width,h.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(h.width=b.displayWidth,h.height=b.displayHeight):(h.width=b.width,h.height=b.height),h}this.allocateTextureUnit=z,this.resetTextureUnits=G,this.setTexture2D=j,this.setTexture2DArray=W,this.setTexture3D=J,this.setTextureCube=H,this.rebindTextures=Nt,this.setupRenderTarget=Jt,this.updateRenderTargetMipmap=Z,this.updateMultisampleRenderTarget=Pt,this.setupDepthRenderbuffer=Ft,this.setupFrameBufferTexture=Tt,this.useMultisampledRTT=Mt}function Hg(s,t){function e(n,i=zn){let r;const a=Qt.getTransfer(i);if(n===Rn)return s.UNSIGNED_BYTE;if(n===So)return s.UNSIGNED_SHORT_4_4_4_4;if(n===xo)return s.UNSIGNED_SHORT_5_5_5_1;if(n===kh)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Uh)return s.BYTE;if(n===Nh)return s.SHORT;if(n===_s)return s.UNSIGNED_SHORT;if(n===Mo)return s.INT;if(n===hi)return s.UNSIGNED_INT;if(n===dn)return s.FLOAT;if(n===ws)return s.HALF_FLOAT;if(n===Oh)return s.ALPHA;if(n===Fh)return s.RGB;if(n===rn)return s.RGBA;if(n===Bh)return s.LUMINANCE;if(n===zh)return s.LUMINANCE_ALPHA;if(n===Ni)return s.DEPTH_COMPONENT;if(n===Vi)return s.DEPTH_STENCIL;if(n===wo)return s.RED;if(n===bo)return s.RED_INTEGER;if(n===Hh)return s.RG;if(n===To)return s.RG_INTEGER;if(n===Eo)return s.RGBA_INTEGER;if(n===or||n===lr||n===hr||n===cr)if(a===oe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===or)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===lr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===hr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===cr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===or)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===lr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===hr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===cr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ba||n===za||n===Ha||n===Va)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ba)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===za)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ha)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Va)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ga||n===Wa||n===Xa)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ga||n===Wa)return a===oe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Xa)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===qa||n===Ya||n===$a||n===ja||n===Ka||n===Za||n===Ja||n===Qa||n===to||n===eo||n===no||n===io||n===so||n===ro)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===qa)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ya)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===$a)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ja)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ka)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Za)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ja)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Qa)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===to)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===eo)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===no)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===io)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===so)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ro)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ur||n===ao||n===oo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===ur)return a===oe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ao)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===oo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Vh||n===lo||n===ho||n===co)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===ur)return r.COMPRESSED_RED_RGTC1_EXT;if(n===lo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ho)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===co)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Hi?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}class Vg extends Ge{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class An extends Ee{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Gg={type:"move"};class da{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new An,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new An,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new An,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,a=null;const o=this._targetRay,l=this._grip,h=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(h&&t.hand){a=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,n),p=this._getHandJoint(h,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const c=h.joints["index-finger-tip"],u=h.joints["thumb-tip"],f=c.position.distanceTo(u.position),d=.02,g=.005;h.inputState.pinching&&f>d+g?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!h.inputState.pinching&&f<=d-g&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Gg)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),h!==null&&(h.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new An;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Wg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Xg=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class qg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new Pe,r=t.properties.get(i);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Wn({vertexShader:Wg,fragmentShader:Xg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Kt(new Es(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Yg extends Yi{constructor(t,e){super();const n=this;let i=null,r=1,a=null,o="local-floor",l=1,h=null,c=null,u=null,f=null,d=null,g=null;const v=new qg,m=e.getContextAttributes();let p=null,T=null;const M=[],y=[],k=new at;let A=null;const C=new Ge;C.viewport=new le;const D=new Ge;D.viewport=new le;const w=[C,D],S=new Vg;let R=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let st=M[$];return st===void 0&&(st=new da,M[$]=st),st.getTargetRaySpace()},this.getControllerGrip=function($){let st=M[$];return st===void 0&&(st=new da,M[$]=st),st.getGripSpace()},this.getHand=function($){let st=M[$];return st===void 0&&(st=new da,M[$]=st),st.getHandSpace()};function z($){const st=y.indexOf($.inputSource);if(st===-1)return;const Tt=M[st];Tt!==void 0&&(Tt.update($.inputSource,$.frame,h||a),Tt.dispatchEvent({type:$.type,data:$.inputSource}))}function q(){i.removeEventListener("select",z),i.removeEventListener("selectstart",z),i.removeEventListener("selectend",z),i.removeEventListener("squeeze",z),i.removeEventListener("squeezestart",z),i.removeEventListener("squeezeend",z),i.removeEventListener("end",q),i.removeEventListener("inputsourceschange",j);for(let $=0;$<M.length;$++){const st=y[$];st!==null&&(y[$]=null,M[$].disconnect(st))}R=null,G=null,v.reset(),t.setRenderTarget(p),d=null,f=null,u=null,i=null,T=null,ne.stop(),n.isPresenting=!1,t.setPixelRatio(A),t.setSize(k.width,k.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||a},this.setReferenceSpace=function($){h=$},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function($){if(i=$,i!==null){if(p=t.getRenderTarget(),i.addEventListener("select",z),i.addEventListener("selectstart",z),i.addEventListener("selectend",z),i.addEventListener("squeeze",z),i.addEventListener("squeezestart",z),i.addEventListener("squeezeend",z),i.addEventListener("end",q),i.addEventListener("inputsourceschange",j),m.xrCompatible!==!0&&await e.makeXRCompatible(),A=t.getPixelRatio(),t.getSize(k),i.renderState.layers===void 0){const st={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(i,e,st),i.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),T=new ci(d.framebufferWidth,d.framebufferHeight,{format:rn,type:Rn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let st=null,Tt=null,ot=null;m.depth&&(ot=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,st=m.stencil?Vi:Ni,Tt=m.stencil?Hi:hi);const Dt={colorFormat:e.RGBA8,depthFormat:ot,scaleFactor:r};u=new XRWebGLBinding(i,e),f=u.createProjectionLayer(Dt),i.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),T=new ci(f.textureWidth,f.textureHeight,{format:rn,type:Rn,depthTexture:new ic(f.textureWidth,f.textureHeight,Tt,void 0,void 0,void 0,void 0,void 0,void 0,st),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(l),h=null,a=await i.requestReferenceSpace(o),ne.setContext(i),ne.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function j($){for(let st=0;st<$.removed.length;st++){const Tt=$.removed[st],ot=y.indexOf(Tt);ot>=0&&(y[ot]=null,M[ot].disconnect(Tt))}for(let st=0;st<$.added.length;st++){const Tt=$.added[st];let ot=y.indexOf(Tt);if(ot===-1){for(let Ft=0;Ft<M.length;Ft++)if(Ft>=y.length){y.push(Tt),ot=Ft;break}else if(y[Ft]===null){y[Ft]=Tt,ot=Ft;break}if(ot===-1)break}const Dt=M[ot];Dt&&Dt.connect(Tt)}}const W=new P,J=new P;function H($,st,Tt){W.setFromMatrixPosition(st.matrixWorld),J.setFromMatrixPosition(Tt.matrixWorld);const ot=W.distanceTo(J),Dt=st.projectionMatrix.elements,Ft=Tt.projectionMatrix.elements,Nt=Dt[14]/(Dt[10]-1),Jt=Dt[14]/(Dt[10]+1),Z=(Dt[9]+1)/Dt[5],it=(Dt[9]-1)/Dt[5],E=(Dt[8]-1)/Dt[0],Pt=(Ft[8]+1)/Ft[0],tt=Nt*E,Mt=Nt*Pt,lt=ot/(-E+Pt),It=lt*-E;if(st.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(It),$.translateZ(lt),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Dt[10]===-1)$.projectionMatrix.copy(st.projectionMatrix),$.projectionMatrixInverse.copy(st.projectionMatrixInverse);else{const _t=Nt+lt,b=Jt+lt,_=tt-It,O=Mt+(ot-It),X=Z*Jt/b*_t,Q=it*Jt/b*_t;$.projectionMatrix.makePerspective(_,O,X,Q,_t,b),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function ht($,st){st===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(st.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(i===null)return;let st=$.near,Tt=$.far;v.texture!==null&&(v.depthNear>0&&(st=v.depthNear),v.depthFar>0&&(Tt=v.depthFar)),S.near=D.near=C.near=st,S.far=D.far=C.far=Tt,(R!==S.near||G!==S.far)&&(i.updateRenderState({depthNear:S.near,depthFar:S.far}),R=S.near,G=S.far),C.layers.mask=$.layers.mask|2,D.layers.mask=$.layers.mask|4,S.layers.mask=C.layers.mask|D.layers.mask;const ot=$.parent,Dt=S.cameras;ht(S,ot);for(let Ft=0;Ft<Dt.length;Ft++)ht(Dt[Ft],ot);Dt.length===2?H(S,C,D):S.projectionMatrix.copy(C.projectionMatrix),gt($,S,ot)};function gt($,st,Tt){Tt===null?$.matrix.copy(st.matrixWorld):($.matrix.copy(Tt.matrixWorld),$.matrix.invert(),$.matrix.multiply(st.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(st.projectionMatrix),$.projectionMatrixInverse.copy(st.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=uo*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function($){l=$,f!==null&&(f.fixedFoveation=$),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=$)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(S)};let bt=null;function Ht($,st){if(c=st.getViewerPose(h||a),g=st,c!==null){const Tt=c.views;d!==null&&(t.setRenderTargetFramebuffer(T,d.framebuffer),t.setRenderTarget(T));let ot=!1;Tt.length!==S.cameras.length&&(S.cameras.length=0,ot=!0);for(let Ft=0;Ft<Tt.length;Ft++){const Nt=Tt[Ft];let Jt=null;if(d!==null)Jt=d.getViewport(Nt);else{const it=u.getViewSubImage(f,Nt);Jt=it.viewport,Ft===0&&(t.setRenderTargetTextures(T,it.colorTexture,f.ignoreDepthValues?void 0:it.depthStencilTexture),t.setRenderTarget(T))}let Z=w[Ft];Z===void 0&&(Z=new Ge,Z.layers.enable(Ft),Z.viewport=new le,w[Ft]=Z),Z.matrix.fromArray(Nt.transform.matrix),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.projectionMatrix.fromArray(Nt.projectionMatrix),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert(),Z.viewport.set(Jt.x,Jt.y,Jt.width,Jt.height),Ft===0&&(S.matrix.copy(Z.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),ot===!0&&S.cameras.push(Z)}const Dt=i.enabledFeatures;if(Dt&&Dt.includes("depth-sensing")){const Ft=u.getDepthInformation(Tt[0]);Ft&&Ft.isValid&&Ft.texture&&v.init(t,Ft,i.renderState)}}for(let Tt=0;Tt<M.length;Tt++){const ot=y[Tt],Dt=M[Tt];ot!==null&&Dt!==void 0&&Dt.update(ot,st,h||a)}bt&&bt($,st),st.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:st}),g=null}const ne=new ec;ne.setAnimationLoop(Ht),this.setAnimationLoop=function($){bt=$},this.dispose=function(){}}}const Jn=new be,$g=new he;function jg(s,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Jh(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,T,M,y){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),c(m,p)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,y)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,T,M):p.isSpriteMaterial?h(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ne&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ne&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const T=t.get(p),M=T.envMap,y=T.envMapRotation;M&&(m.envMap.value=M,Jn.copy(y),Jn.x*=-1,Jn.y*=-1,Jn.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Jn.y*=-1,Jn.z*=-1),m.envMapRotation.value.setFromMatrix4($g.makeRotationFromEuler(Jn)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,T,M){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*T,m.scale.value=M*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,T){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ne&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=T.texture,m.transmissionSamplerSize.value.set(T.width,T.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const T=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(T.matrixWorld),m.nearDistance.value=T.shadow.camera.near,m.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Kg(s,t,e,n){let i={},r={},a=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(T,M){const y=M.program;n.uniformBlockBinding(T,y)}function h(T,M){let y=i[T.id];y===void 0&&(g(T),y=c(T),i[T.id]=y,T.addEventListener("dispose",m));const k=M.program;n.updateUBOMapping(T,k);const A=t.render.frame;r[T.id]!==A&&(f(T),r[T.id]=A)}function c(T){const M=u();T.__bindingPointIndex=M;const y=s.createBuffer(),k=T.__size,A=T.usage;return s.bindBuffer(s.UNIFORM_BUFFER,y),s.bufferData(s.UNIFORM_BUFFER,k,A),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,M,y),y}function u(){for(let T=0;T<o;T++)if(a.indexOf(T)===-1)return a.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(T){const M=i[T.id],y=T.uniforms,k=T.__cache;s.bindBuffer(s.UNIFORM_BUFFER,M);for(let A=0,C=y.length;A<C;A++){const D=Array.isArray(y[A])?y[A]:[y[A]];for(let w=0,S=D.length;w<S;w++){const R=D[w];if(d(R,A,w,k)===!0){const G=R.__offset,z=Array.isArray(R.value)?R.value:[R.value];let q=0;for(let j=0;j<z.length;j++){const W=z[j],J=v(W);typeof W=="number"||typeof W=="boolean"?(R.__data[0]=W,s.bufferSubData(s.UNIFORM_BUFFER,G+q,R.__data)):W.isMatrix3?(R.__data[0]=W.elements[0],R.__data[1]=W.elements[1],R.__data[2]=W.elements[2],R.__data[3]=0,R.__data[4]=W.elements[3],R.__data[5]=W.elements[4],R.__data[6]=W.elements[5],R.__data[7]=0,R.__data[8]=W.elements[6],R.__data[9]=W.elements[7],R.__data[10]=W.elements[8],R.__data[11]=0):(W.toArray(R.__data,q),q+=J.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,G,R.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function d(T,M,y,k){const A=T.value,C=M+"_"+y;if(k[C]===void 0)return typeof A=="number"||typeof A=="boolean"?k[C]=A:k[C]=A.clone(),!0;{const D=k[C];if(typeof A=="number"||typeof A=="boolean"){if(D!==A)return k[C]=A,!0}else if(D.equals(A)===!1)return D.copy(A),!0}return!1}function g(T){const M=T.uniforms;let y=0;const k=16;for(let C=0,D=M.length;C<D;C++){const w=Array.isArray(M[C])?M[C]:[M[C]];for(let S=0,R=w.length;S<R;S++){const G=w[S],z=Array.isArray(G.value)?G.value:[G.value];for(let q=0,j=z.length;q<j;q++){const W=z[q],J=v(W),H=y%k,ht=H%J.boundary,gt=H+ht;y+=ht,gt!==0&&k-gt<J.storage&&(y+=k-gt),G.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),G.__offset=y,y+=J.storage}}}const A=y%k;return A>0&&(y+=k-A),T.__size=y,T.__cache={},this}function v(T){const M={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(M.boundary=4,M.storage=4):T.isVector2?(M.boundary=8,M.storage=8):T.isVector3||T.isColor?(M.boundary=16,M.storage=12):T.isVector4?(M.boundary=16,M.storage=16):T.isMatrix3?(M.boundary=48,M.storage=48):T.isMatrix4?(M.boundary=64,M.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),M}function m(T){const M=T.target;M.removeEventListener("dispose",m);const y=a.indexOf(M.__bindingPointIndex);a.splice(y,1),s.deleteBuffer(i[M.id]),delete i[M.id],delete r[M.id]}function p(){for(const T in i)s.deleteBuffer(i[T]);a=[],i={},r={}}return{bind:l,update:h,dispose:p}}class Zg{constructor(t={}){const{canvas:e=Ff(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:h=!1,powerPreference:c="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=a;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,p=null;const T=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Be,this.toneMapping=Vn,this.toneMappingExposure=1;const y=this;let k=!1,A=0,C=0,D=null,w=-1,S=null;const R=new le,G=new le;let z=null;const q=new zt(0);let j=0,W=e.width,J=e.height,H=1,ht=null,gt=null;const bt=new le(0,0,W,J),Ht=new le(0,0,W,J);let ne=!1;const $=new Ao;let st=!1,Tt=!1;const ot=new he,Dt=new he,Ft=new P,Nt=new le,Jt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Z=!1;function it(){return D===null?H:1}let E=n;function Pt(x,U){return e.getContext(x,U)}try{const x={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:h,powerPreference:c,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${yo}`),e.addEventListener("webglcontextlost",K,!1),e.addEventListener("webglcontextrestored",mt,!1),e.addEventListener("webglcontextcreationerror",dt,!1),E===null){const U="webgl2";if(E=Pt(U,x),E===null)throw Pt(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(x){throw console.error("THREE.WebGLRenderer: "+x.message),x}let tt,Mt,lt,It,_t,b,_,O,X,Q,Y,Et,ut,yt,jt,et,xt,Ut,kt,wt,Zt,Xt,ce,I;function ft(){tt=new n0(E),tt.init(),Xt=new Hg(E,tt),Mt=new Km(E,tt,t,Xt),lt=new Fg(E,tt),Mt.reverseDepthBuffer&&f&&lt.buffers.depth.setReversed(!0),It=new r0(E),_t=new wg,b=new zg(E,tt,lt,_t,Mt,Xt,It),_=new Jm(y),O=new e0(y),X=new fd(E),ce=new $m(E,X),Q=new i0(E,X,It,ce),Y=new o0(E,Q,X,It),kt=new a0(E,Mt,b),et=new Zm(_t),Et=new xg(y,_,O,tt,Mt,ce,et),ut=new jg(y,_t),yt=new Tg,jt=new Lg(tt),Ut=new Ym(y,_,O,lt,Y,d,l),xt=new kg(y,Y,Mt),I=new Kg(E,It,Mt,lt),wt=new jm(E,tt,It),Zt=new s0(E,tt,It),It.programs=Et.programs,y.capabilities=Mt,y.extensions=tt,y.properties=_t,y.renderLists=yt,y.shadowMap=xt,y.state=lt,y.info=It}ft();const V=new Yg(y,E);this.xr=V,this.getContext=function(){return E},this.getContextAttributes=function(){return E.getContextAttributes()},this.forceContextLoss=function(){const x=tt.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){const x=tt.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(x){x!==void 0&&(H=x,this.setSize(W,J,!1))},this.getSize=function(x){return x.set(W,J)},this.setSize=function(x,U,F=!0){if(V.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=x,J=U,e.width=Math.floor(x*H),e.height=Math.floor(U*H),F===!0&&(e.style.width=x+"px",e.style.height=U+"px"),this.setViewport(0,0,x,U)},this.getDrawingBufferSize=function(x){return x.set(W*H,J*H).floor()},this.setDrawingBufferSize=function(x,U,F){W=x,J=U,H=F,e.width=Math.floor(x*F),e.height=Math.floor(U*F),this.setViewport(0,0,x,U)},this.getCurrentViewport=function(x){return x.copy(R)},this.getViewport=function(x){return x.copy(bt)},this.setViewport=function(x,U,F,B){x.isVector4?bt.set(x.x,x.y,x.z,x.w):bt.set(x,U,F,B),lt.viewport(R.copy(bt).multiplyScalar(H).round())},this.getScissor=function(x){return x.copy(Ht)},this.setScissor=function(x,U,F,B){x.isVector4?Ht.set(x.x,x.y,x.z,x.w):Ht.set(x,U,F,B),lt.scissor(G.copy(Ht).multiplyScalar(H).round())},this.getScissorTest=function(){return ne},this.setScissorTest=function(x){lt.setScissorTest(ne=x)},this.setOpaqueSort=function(x){ht=x},this.setTransparentSort=function(x){gt=x},this.getClearColor=function(x){return x.copy(Ut.getClearColor())},this.setClearColor=function(){Ut.setClearColor.apply(Ut,arguments)},this.getClearAlpha=function(){return Ut.getClearAlpha()},this.setClearAlpha=function(){Ut.setClearAlpha.apply(Ut,arguments)},this.clear=function(x=!0,U=!0,F=!0){let B=0;if(x){let N=!1;if(D!==null){const rt=D.texture.format;N=rt===Eo||rt===To||rt===bo}if(N){const rt=D.texture.type,pt=rt===Rn||rt===hi||rt===_s||rt===Hi||rt===So||rt===xo,At=Ut.getClearColor(),Ct=Ut.getClearAlpha(),Bt=At.r,Gt=At.g,Rt=At.b;pt?(g[0]=Bt,g[1]=Gt,g[2]=Rt,g[3]=Ct,E.clearBufferuiv(E.COLOR,0,g)):(v[0]=Bt,v[1]=Gt,v[2]=Rt,v[3]=Ct,E.clearBufferiv(E.COLOR,0,v))}else B|=E.COLOR_BUFFER_BIT}U&&(B|=E.DEPTH_BUFFER_BIT),F&&(B|=E.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),E.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",K,!1),e.removeEventListener("webglcontextrestored",mt,!1),e.removeEventListener("webglcontextcreationerror",dt,!1),yt.dispose(),jt.dispose(),_t.dispose(),_.dispose(),O.dispose(),Y.dispose(),ce.dispose(),I.dispose(),Et.dispose(),V.dispose(),V.removeEventListener("sessionstart",Fo),V.removeEventListener("sessionend",Bo),qn.stop()};function K(x){x.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),k=!0}function mt(){console.log("THREE.WebGLRenderer: Context Restored."),k=!1;const x=It.autoReset,U=xt.enabled,F=xt.autoUpdate,B=xt.needsUpdate,N=xt.type;ft(),It.autoReset=x,xt.enabled=U,xt.autoUpdate=F,xt.needsUpdate=B,xt.type=N}function dt(x){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function Vt(x){const U=x.target;U.removeEventListener("dispose",Vt),ve(U)}function ve(x){Ae(x),_t.remove(x)}function Ae(x){const U=_t.get(x).programs;U!==void 0&&(U.forEach(function(F){Et.releaseProgram(F)}),x.isShaderMaterial&&Et.releaseShaderCache(x))}this.renderBufferDirect=function(x,U,F,B,N,rt){U===null&&(U=Jt);const pt=N.isMesh&&N.matrixWorld.determinant()<0,At=wc(x,U,F,B,N);lt.setMaterial(B,pt);let Ct=F.index,Bt=1;if(B.wireframe===!0){if(Ct=Q.getWireframeAttribute(F),Ct===void 0)return;Bt=2}const Gt=F.drawRange,Rt=F.attributes.position;let te=Gt.start*Bt,ue=(Gt.start+Gt.count)*Bt;rt!==null&&(te=Math.max(te,rt.start*Bt),ue=Math.min(ue,(rt.start+rt.count)*Bt)),Ct!==null?(te=Math.max(te,0),ue=Math.min(ue,Ct.count)):Rt!=null&&(te=Math.max(te,0),ue=Math.min(ue,Rt.count));const fe=ue-te;if(fe<0||fe===1/0)return;ce.setup(N,B,At,F,Ct);let ke,ie=wt;if(Ct!==null&&(ke=X.get(Ct),ie=Zt,ie.setIndex(ke)),N.isMesh)B.wireframe===!0?(lt.setLineWidth(B.wireframeLinewidth*it()),ie.setMode(E.LINES)):ie.setMode(E.TRIANGLES);else if(N.isLine){let Lt=B.linewidth;Lt===void 0&&(Lt=1),lt.setLineWidth(Lt*it()),N.isLineSegments?ie.setMode(E.LINES):N.isLineLoop?ie.setMode(E.LINE_LOOP):ie.setMode(E.LINE_STRIP)}else N.isPoints?ie.setMode(E.POINTS):N.isSprite&&ie.setMode(E.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)ie.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(tt.get("WEBGL_multi_draw"))ie.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const Lt=N._multiDrawStarts,gn=N._multiDrawCounts,se=N._multiDrawCount,Ze=Ct?X.get(Ct).bytesPerElement:1,pi=_t.get(B).currentProgram.getUniforms();for(let ze=0;ze<se;ze++)pi.setValue(E,"_gl_DrawID",ze),ie.render(Lt[ze]/Ze,gn[ze])}else if(N.isInstancedMesh)ie.renderInstances(te,fe,N.count);else if(F.isInstancedBufferGeometry){const Lt=F._maxInstanceCount!==void 0?F._maxInstanceCount:1/0,gn=Math.min(F.instanceCount,Lt);ie.renderInstances(te,fe,gn)}else ie.render(te,fe)};function re(x,U,F){x.transparent===!0&&x.side===Tn&&x.forceSinglePass===!1?(x.side=Ne,x.needsUpdate=!0,Cs(x,U,F),x.side=Gn,x.needsUpdate=!0,Cs(x,U,F),x.side=Tn):Cs(x,U,F)}this.compile=function(x,U,F=null){F===null&&(F=x),p=jt.get(F),p.init(U),M.push(p),F.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),x!==F&&x.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),p.setupLights();const B=new Set;return x.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;const rt=N.material;if(rt)if(Array.isArray(rt))for(let pt=0;pt<rt.length;pt++){const At=rt[pt];re(At,F,N),B.add(At)}else re(rt,F,N),B.add(rt)}),M.pop(),p=null,B},this.compileAsync=function(x,U,F=null){const B=this.compile(x,U,F);return new Promise(N=>{function rt(){if(B.forEach(function(pt){_t.get(pt).currentProgram.isReady()&&B.delete(pt)}),B.size===0){N(x);return}setTimeout(rt,10)}tt.get("KHR_parallel_shader_compile")!==null?rt():setTimeout(rt,10)})};let Ke=null;function mn(x){Ke&&Ke(x)}function Fo(){qn.stop()}function Bo(){qn.start()}const qn=new ec;qn.setAnimationLoop(mn),typeof self<"u"&&qn.setContext(self),this.setAnimationLoop=function(x){Ke=x,V.setAnimationLoop(x),x===null?qn.stop():qn.start()},V.addEventListener("sessionstart",Fo),V.addEventListener("sessionend",Bo),this.render=function(x,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(k===!0)return;if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),V.enabled===!0&&V.isPresenting===!0&&(V.cameraAutoUpdate===!0&&V.updateCamera(U),U=V.getCamera()),x.isScene===!0&&x.onBeforeRender(y,x,U,D),p=jt.get(x,M.length),p.init(U),M.push(p),Dt.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),$.setFromProjectionMatrix(Dt),Tt=this.localClippingEnabled,st=et.init(this.clippingPlanes,Tt),m=yt.get(x,T.length),m.init(),T.push(m),V.enabled===!0&&V.isPresenting===!0){const rt=y.xr.getDepthSensingMesh();rt!==null&&Tr(rt,U,-1/0,y.sortObjects)}Tr(x,U,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(ht,gt),Z=V.enabled===!1||V.isPresenting===!1||V.hasDepthSensing()===!1,Z&&Ut.addToRenderList(m,x),this.info.render.frame++,st===!0&&et.beginShadows();const F=p.state.shadowsArray;xt.render(F,x,U),st===!0&&et.endShadows(),this.info.autoReset===!0&&this.info.reset();const B=m.opaque,N=m.transmissive;if(p.setupLights(),U.isArrayCamera){const rt=U.cameras;if(N.length>0)for(let pt=0,At=rt.length;pt<At;pt++){const Ct=rt[pt];Ho(B,N,x,Ct)}Z&&Ut.render(x);for(let pt=0,At=rt.length;pt<At;pt++){const Ct=rt[pt];zo(m,x,Ct,Ct.viewport)}}else N.length>0&&Ho(B,N,x,U),Z&&Ut.render(x),zo(m,x,U);D!==null&&(b.updateMultisampleRenderTarget(D),b.updateRenderTargetMipmap(D)),x.isScene===!0&&x.onAfterRender(y,x,U),ce.resetDefaultState(),w=-1,S=null,M.pop(),M.length>0?(p=M[M.length-1],st===!0&&et.setGlobalState(y.clippingPlanes,p.state.camera)):p=null,T.pop(),T.length>0?m=T[T.length-1]:m=null};function Tr(x,U,F,B){if(x.visible===!1)return;if(x.layers.test(U.layers)){if(x.isGroup)F=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(U);else if(x.isLight)p.pushLight(x),x.castShadow&&p.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||$.intersectsSprite(x)){B&&Nt.setFromMatrixPosition(x.matrixWorld).applyMatrix4(Dt);const pt=Y.update(x),At=x.material;At.visible&&m.push(x,pt,At,F,Nt.z,null)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||$.intersectsObject(x))){const pt=Y.update(x),At=x.material;if(B&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),Nt.copy(x.boundingSphere.center)):(pt.boundingSphere===null&&pt.computeBoundingSphere(),Nt.copy(pt.boundingSphere.center)),Nt.applyMatrix4(x.matrixWorld).applyMatrix4(Dt)),Array.isArray(At)){const Ct=pt.groups;for(let Bt=0,Gt=Ct.length;Bt<Gt;Bt++){const Rt=Ct[Bt],te=At[Rt.materialIndex];te&&te.visible&&m.push(x,pt,te,F,Nt.z,Rt)}}else At.visible&&m.push(x,pt,At,F,Nt.z,null)}}const rt=x.children;for(let pt=0,At=rt.length;pt<At;pt++)Tr(rt[pt],U,F,B)}function zo(x,U,F,B){const N=x.opaque,rt=x.transmissive,pt=x.transparent;p.setupLightsView(F),st===!0&&et.setGlobalState(y.clippingPlanes,F),B&&lt.viewport(R.copy(B)),N.length>0&&As(N,U,F),rt.length>0&&As(rt,U,F),pt.length>0&&As(pt,U,F),lt.buffers.depth.setTest(!0),lt.buffers.depth.setMask(!0),lt.buffers.color.setMask(!0),lt.setPolygonOffset(!1)}function Ho(x,U,F,B){if((F.isScene===!0?F.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[B.id]===void 0&&(p.state.transmissionRenderTarget[B.id]=new ci(1,1,{generateMipmaps:!0,type:tt.has("EXT_color_buffer_half_float")||tt.has("EXT_color_buffer_float")?ws:Rn,minFilter:oi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Qt.workingColorSpace}));const rt=p.state.transmissionRenderTarget[B.id],pt=B.viewport||R;rt.setSize(pt.z,pt.w);const At=y.getRenderTarget();y.setRenderTarget(rt),y.getClearColor(q),j=y.getClearAlpha(),j<1&&y.setClearColor(16777215,.5),y.clear(),Z&&Ut.render(F);const Ct=y.toneMapping;y.toneMapping=Vn;const Bt=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),p.setupLightsView(B),st===!0&&et.setGlobalState(y.clippingPlanes,B),As(x,F,B),b.updateMultisampleRenderTarget(rt),b.updateRenderTargetMipmap(rt),tt.has("WEBGL_multisampled_render_to_texture")===!1){let Gt=!1;for(let Rt=0,te=U.length;Rt<te;Rt++){const ue=U[Rt],fe=ue.object,ke=ue.geometry,ie=ue.material,Lt=ue.group;if(ie.side===Tn&&fe.layers.test(B.layers)){const gn=ie.side;ie.side=Ne,ie.needsUpdate=!0,Vo(fe,F,B,ke,ie,Lt),ie.side=gn,ie.needsUpdate=!0,Gt=!0}}Gt===!0&&(b.updateMultisampleRenderTarget(rt),b.updateRenderTargetMipmap(rt))}y.setRenderTarget(At),y.setClearColor(q,j),Bt!==void 0&&(B.viewport=Bt),y.toneMapping=Ct}function As(x,U,F){const B=U.isScene===!0?U.overrideMaterial:null;for(let N=0,rt=x.length;N<rt;N++){const pt=x[N],At=pt.object,Ct=pt.geometry,Bt=B===null?pt.material:B,Gt=pt.group;At.layers.test(F.layers)&&Vo(At,U,F,Ct,Bt,Gt)}}function Vo(x,U,F,B,N,rt){x.onBeforeRender(y,U,F,B,N,rt),x.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),N.onBeforeRender(y,U,F,B,x,rt),N.transparent===!0&&N.side===Tn&&N.forceSinglePass===!1?(N.side=Ne,N.needsUpdate=!0,y.renderBufferDirect(F,U,B,N,x,rt),N.side=Gn,N.needsUpdate=!0,y.renderBufferDirect(F,U,B,N,x,rt),N.side=Tn):y.renderBufferDirect(F,U,B,N,x,rt),x.onAfterRender(y,U,F,B,N,rt)}function Cs(x,U,F){U.isScene!==!0&&(U=Jt);const B=_t.get(x),N=p.state.lights,rt=p.state.shadowsArray,pt=N.state.version,At=Et.getParameters(x,N.state,rt,U,F),Ct=Et.getProgramCacheKey(At);let Bt=B.programs;B.environment=x.isMeshStandardMaterial?U.environment:null,B.fog=U.fog,B.envMap=(x.isMeshStandardMaterial?O:_).get(x.envMap||B.environment),B.envMapRotation=B.environment!==null&&x.envMap===null?U.environmentRotation:x.envMapRotation,Bt===void 0&&(x.addEventListener("dispose",Vt),Bt=new Map,B.programs=Bt);let Gt=Bt.get(Ct);if(Gt!==void 0){if(B.currentProgram===Gt&&B.lightsStateVersion===pt)return Wo(x,At),Gt}else At.uniforms=Et.getUniforms(x),x.onBeforeCompile(At,y),Gt=Et.acquireProgram(At,Ct),Bt.set(Ct,Gt),B.uniforms=At.uniforms;const Rt=B.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(Rt.clippingPlanes=et.uniform),Wo(x,At),B.needsLights=Tc(x),B.lightsStateVersion=pt,B.needsLights&&(Rt.ambientLightColor.value=N.state.ambient,Rt.lightProbe.value=N.state.probe,Rt.directionalLights.value=N.state.directional,Rt.directionalLightShadows.value=N.state.directionalShadow,Rt.spotLights.value=N.state.spot,Rt.spotLightShadows.value=N.state.spotShadow,Rt.rectAreaLights.value=N.state.rectArea,Rt.ltc_1.value=N.state.rectAreaLTC1,Rt.ltc_2.value=N.state.rectAreaLTC2,Rt.pointLights.value=N.state.point,Rt.pointLightShadows.value=N.state.pointShadow,Rt.hemisphereLights.value=N.state.hemi,Rt.directionalShadowMap.value=N.state.directionalShadowMap,Rt.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Rt.spotShadowMap.value=N.state.spotShadowMap,Rt.spotLightMatrix.value=N.state.spotLightMatrix,Rt.spotLightMap.value=N.state.spotLightMap,Rt.pointShadowMap.value=N.state.pointShadowMap,Rt.pointShadowMatrix.value=N.state.pointShadowMatrix),B.currentProgram=Gt,B.uniformsList=null,Gt}function Go(x){if(x.uniformsList===null){const U=x.currentProgram.getUniforms();x.uniformsList=fr.seqWithValue(U.seq,x.uniforms)}return x.uniformsList}function Wo(x,U){const F=_t.get(x);F.outputColorSpace=U.outputColorSpace,F.batching=U.batching,F.batchingColor=U.batchingColor,F.instancing=U.instancing,F.instancingColor=U.instancingColor,F.instancingMorph=U.instancingMorph,F.skinning=U.skinning,F.morphTargets=U.morphTargets,F.morphNormals=U.morphNormals,F.morphColors=U.morphColors,F.morphTargetsCount=U.morphTargetsCount,F.numClippingPlanes=U.numClippingPlanes,F.numIntersection=U.numClipIntersection,F.vertexAlphas=U.vertexAlphas,F.vertexTangents=U.vertexTangents,F.toneMapping=U.toneMapping}function wc(x,U,F,B,N){U.isScene!==!0&&(U=Jt),b.resetTextureUnits();const rt=U.fog,pt=B.isMeshStandardMaterial?U.environment:null,At=D===null?y.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:qi,Ct=(B.isMeshStandardMaterial?O:_).get(B.envMap||pt),Bt=B.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,Gt=!!F.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),Rt=!!F.morphAttributes.position,te=!!F.morphAttributes.normal,ue=!!F.morphAttributes.color;let fe=Vn;B.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(fe=y.toneMapping);const ke=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,ie=ke!==void 0?ke.length:0,Lt=_t.get(B),gn=p.state.lights;if(st===!0&&(Tt===!0||x!==S)){const qe=x===S&&B.id===w;et.setState(B,x,qe)}let se=!1;B.version===Lt.__version?(Lt.needsLights&&Lt.lightsStateVersion!==gn.state.version||Lt.outputColorSpace!==At||N.isBatchedMesh&&Lt.batching===!1||!N.isBatchedMesh&&Lt.batching===!0||N.isBatchedMesh&&Lt.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&Lt.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&Lt.instancing===!1||!N.isInstancedMesh&&Lt.instancing===!0||N.isSkinnedMesh&&Lt.skinning===!1||!N.isSkinnedMesh&&Lt.skinning===!0||N.isInstancedMesh&&Lt.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&Lt.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&Lt.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&Lt.instancingMorph===!1&&N.morphTexture!==null||Lt.envMap!==Ct||B.fog===!0&&Lt.fog!==rt||Lt.numClippingPlanes!==void 0&&(Lt.numClippingPlanes!==et.numPlanes||Lt.numIntersection!==et.numIntersection)||Lt.vertexAlphas!==Bt||Lt.vertexTangents!==Gt||Lt.morphTargets!==Rt||Lt.morphNormals!==te||Lt.morphColors!==ue||Lt.toneMapping!==fe||Lt.morphTargetsCount!==ie)&&(se=!0):(se=!0,Lt.__version=B.version);let Ze=Lt.currentProgram;se===!0&&(Ze=Cs(B,U,N));let pi=!1,ze=!1,Zi=!1;const de=Ze.getUniforms(),ln=Lt.uniforms;if(lt.useProgram(Ze.program)&&(pi=!0,ze=!0,Zi=!0),B.id!==w&&(w=B.id,ze=!0),pi||S!==x){lt.buffers.depth.getReversed()?(ot.copy(x.projectionMatrix),zf(ot),Hf(ot),de.setValue(E,"projectionMatrix",ot)):de.setValue(E,"projectionMatrix",x.projectionMatrix),de.setValue(E,"viewMatrix",x.matrixWorldInverse);const Pn=de.map.cameraPosition;Pn!==void 0&&Pn.setValue(E,Ft.setFromMatrixPosition(x.matrixWorld)),Mt.logarithmicDepthBuffer&&de.setValue(E,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&de.setValue(E,"isOrthographic",x.isOrthographicCamera===!0),S!==x&&(S=x,ze=!0,Zi=!0)}if(N.isSkinnedMesh){de.setOptional(E,N,"bindMatrix"),de.setOptional(E,N,"bindMatrixInverse");const qe=N.skeleton;qe&&(qe.boneTexture===null&&qe.computeBoneTexture(),de.setValue(E,"boneTexture",qe.boneTexture,b))}N.isBatchedMesh&&(de.setOptional(E,N,"batchingTexture"),de.setValue(E,"batchingTexture",N._matricesTexture,b),de.setOptional(E,N,"batchingIdTexture"),de.setValue(E,"batchingIdTexture",N._indirectTexture,b),de.setOptional(E,N,"batchingColorTexture"),N._colorsTexture!==null&&de.setValue(E,"batchingColorTexture",N._colorsTexture,b));const Ji=F.morphAttributes;if((Ji.position!==void 0||Ji.normal!==void 0||Ji.color!==void 0)&&kt.update(N,F,Ze),(ze||Lt.receiveShadow!==N.receiveShadow)&&(Lt.receiveShadow=N.receiveShadow,de.setValue(E,"receiveShadow",N.receiveShadow)),B.isMeshGouraudMaterial&&B.envMap!==null&&(ln.envMap.value=Ct,ln.flipEnvMap.value=Ct.isCubeTexture&&Ct.isRenderTargetTexture===!1?-1:1),B.isMeshStandardMaterial&&B.envMap===null&&U.environment!==null&&(ln.envMapIntensity.value=U.environmentIntensity),ze&&(de.setValue(E,"toneMappingExposure",y.toneMappingExposure),Lt.needsLights&&bc(ln,Zi),rt&&B.fog===!0&&ut.refreshFogUniforms(ln,rt),ut.refreshMaterialUniforms(ln,B,H,J,p.state.transmissionRenderTarget[x.id]),fr.upload(E,Go(Lt),ln,b)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(fr.upload(E,Go(Lt),ln,b),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&de.setValue(E,"center",N.center),de.setValue(E,"modelViewMatrix",N.modelViewMatrix),de.setValue(E,"normalMatrix",N.normalMatrix),de.setValue(E,"modelMatrix",N.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){const qe=B.uniformsGroups;for(let Pn=0,Ln=qe.length;Pn<Ln;Pn++){const Xo=qe[Pn];I.update(Xo,Ze),I.bind(Xo,Ze)}}return Ze}function bc(x,U){x.ambientLightColor.needsUpdate=U,x.lightProbe.needsUpdate=U,x.directionalLights.needsUpdate=U,x.directionalLightShadows.needsUpdate=U,x.pointLights.needsUpdate=U,x.pointLightShadows.needsUpdate=U,x.spotLights.needsUpdate=U,x.spotLightShadows.needsUpdate=U,x.rectAreaLights.needsUpdate=U,x.hemisphereLights.needsUpdate=U}function Tc(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(x,U,F){_t.get(x.texture).__webglTexture=U,_t.get(x.depthTexture).__webglTexture=F;const B=_t.get(x);B.__hasExternalTextures=!0,B.__autoAllocateDepthBuffer=F===void 0,B.__autoAllocateDepthBuffer||tt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),B.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(x,U){const F=_t.get(x);F.__webglFramebuffer=U,F.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(x,U=0,F=0){D=x,A=U,C=F;let B=!0,N=null,rt=!1,pt=!1;if(x){const Ct=_t.get(x);if(Ct.__useDefaultFramebuffer!==void 0)lt.bindFramebuffer(E.FRAMEBUFFER,null),B=!1;else if(Ct.__webglFramebuffer===void 0)b.setupRenderTarget(x);else if(Ct.__hasExternalTextures)b.rebindTextures(x,_t.get(x.texture).__webglTexture,_t.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){const Rt=x.depthTexture;if(Ct.__boundDepthTexture!==Rt){if(Rt!==null&&_t.has(Rt)&&(x.width!==Rt.image.width||x.height!==Rt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");b.setupDepthRenderbuffer(x)}}const Bt=x.texture;(Bt.isData3DTexture||Bt.isDataArrayTexture||Bt.isCompressedArrayTexture)&&(pt=!0);const Gt=_t.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(Gt[U])?N=Gt[U][F]:N=Gt[U],rt=!0):x.samples>0&&b.useMultisampledRTT(x)===!1?N=_t.get(x).__webglMultisampledFramebuffer:Array.isArray(Gt)?N=Gt[F]:N=Gt,R.copy(x.viewport),G.copy(x.scissor),z=x.scissorTest}else R.copy(bt).multiplyScalar(H).floor(),G.copy(Ht).multiplyScalar(H).floor(),z=ne;if(lt.bindFramebuffer(E.FRAMEBUFFER,N)&&B&&lt.drawBuffers(x,N),lt.viewport(R),lt.scissor(G),lt.setScissorTest(z),rt){const Ct=_t.get(x.texture);E.framebufferTexture2D(E.FRAMEBUFFER,E.COLOR_ATTACHMENT0,E.TEXTURE_CUBE_MAP_POSITIVE_X+U,Ct.__webglTexture,F)}else if(pt){const Ct=_t.get(x.texture),Bt=U||0;E.framebufferTextureLayer(E.FRAMEBUFFER,E.COLOR_ATTACHMENT0,Ct.__webglTexture,F||0,Bt)}w=-1},this.readRenderTargetPixels=function(x,U,F,B,N,rt,pt){if(!(x&&x.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let At=_t.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&pt!==void 0&&(At=At[pt]),At){lt.bindFramebuffer(E.FRAMEBUFFER,At);try{const Ct=x.texture,Bt=Ct.format,Gt=Ct.type;if(!Mt.textureFormatReadable(Bt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Mt.textureTypeReadable(Gt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=x.width-B&&F>=0&&F<=x.height-N&&E.readPixels(U,F,B,N,Xt.convert(Bt),Xt.convert(Gt),rt)}finally{const Ct=D!==null?_t.get(D).__webglFramebuffer:null;lt.bindFramebuffer(E.FRAMEBUFFER,Ct)}}},this.readRenderTargetPixelsAsync=async function(x,U,F,B,N,rt,pt){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let At=_t.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&pt!==void 0&&(At=At[pt]),At){const Ct=x.texture,Bt=Ct.format,Gt=Ct.type;if(!Mt.textureFormatReadable(Bt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Mt.textureTypeReadable(Gt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=x.width-B&&F>=0&&F<=x.height-N){lt.bindFramebuffer(E.FRAMEBUFFER,At);const Rt=E.createBuffer();E.bindBuffer(E.PIXEL_PACK_BUFFER,Rt),E.bufferData(E.PIXEL_PACK_BUFFER,rt.byteLength,E.STREAM_READ),E.readPixels(U,F,B,N,Xt.convert(Bt),Xt.convert(Gt),0);const te=D!==null?_t.get(D).__webglFramebuffer:null;lt.bindFramebuffer(E.FRAMEBUFFER,te);const ue=E.fenceSync(E.SYNC_GPU_COMMANDS_COMPLETE,0);return E.flush(),await Bf(E,ue,4),E.bindBuffer(E.PIXEL_PACK_BUFFER,Rt),E.getBufferSubData(E.PIXEL_PACK_BUFFER,0,rt),E.deleteBuffer(Rt),E.deleteSync(ue),rt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(x,U=null,F=0){x.isTexture!==!0&&(cs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,x=arguments[1]);const B=Math.pow(2,-F),N=Math.floor(x.image.width*B),rt=Math.floor(x.image.height*B),pt=U!==null?U.x:0,At=U!==null?U.y:0;b.setTexture2D(x,0),E.copyTexSubImage2D(E.TEXTURE_2D,F,0,0,pt,At,N,rt),lt.unbindTexture()},this.copyTextureToTexture=function(x,U,F=null,B=null,N=0){x.isTexture!==!0&&(cs("WebGLRenderer: copyTextureToTexture function signature has changed."),B=arguments[0]||null,x=arguments[1],U=arguments[2],N=arguments[3]||0,F=null);let rt,pt,At,Ct,Bt,Gt,Rt,te,ue;const fe=x.isCompressedTexture?x.mipmaps[N]:x.image;F!==null?(rt=F.max.x-F.min.x,pt=F.max.y-F.min.y,At=F.isBox3?F.max.z-F.min.z:1,Ct=F.min.x,Bt=F.min.y,Gt=F.isBox3?F.min.z:0):(rt=fe.width,pt=fe.height,At=fe.depth||1,Ct=0,Bt=0,Gt=0),B!==null?(Rt=B.x,te=B.y,ue=B.z):(Rt=0,te=0,ue=0);const ke=Xt.convert(U.format),ie=Xt.convert(U.type);let Lt;U.isData3DTexture?(b.setTexture3D(U,0),Lt=E.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(b.setTexture2DArray(U,0),Lt=E.TEXTURE_2D_ARRAY):(b.setTexture2D(U,0),Lt=E.TEXTURE_2D),E.pixelStorei(E.UNPACK_FLIP_Y_WEBGL,U.flipY),E.pixelStorei(E.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),E.pixelStorei(E.UNPACK_ALIGNMENT,U.unpackAlignment);const gn=E.getParameter(E.UNPACK_ROW_LENGTH),se=E.getParameter(E.UNPACK_IMAGE_HEIGHT),Ze=E.getParameter(E.UNPACK_SKIP_PIXELS),pi=E.getParameter(E.UNPACK_SKIP_ROWS),ze=E.getParameter(E.UNPACK_SKIP_IMAGES);E.pixelStorei(E.UNPACK_ROW_LENGTH,fe.width),E.pixelStorei(E.UNPACK_IMAGE_HEIGHT,fe.height),E.pixelStorei(E.UNPACK_SKIP_PIXELS,Ct),E.pixelStorei(E.UNPACK_SKIP_ROWS,Bt),E.pixelStorei(E.UNPACK_SKIP_IMAGES,Gt);const Zi=x.isDataArrayTexture||x.isData3DTexture,de=U.isDataArrayTexture||U.isData3DTexture;if(x.isRenderTargetTexture||x.isDepthTexture){const ln=_t.get(x),Ji=_t.get(U),qe=_t.get(ln.__renderTarget),Pn=_t.get(Ji.__renderTarget);lt.bindFramebuffer(E.READ_FRAMEBUFFER,qe.__webglFramebuffer),lt.bindFramebuffer(E.DRAW_FRAMEBUFFER,Pn.__webglFramebuffer);for(let Ln=0;Ln<At;Ln++)Zi&&E.framebufferTextureLayer(E.READ_FRAMEBUFFER,E.COLOR_ATTACHMENT0,_t.get(x).__webglTexture,N,Gt+Ln),x.isDepthTexture?(de&&E.framebufferTextureLayer(E.DRAW_FRAMEBUFFER,E.COLOR_ATTACHMENT0,_t.get(U).__webglTexture,N,ue+Ln),E.blitFramebuffer(Ct,Bt,rt,pt,Rt,te,rt,pt,E.DEPTH_BUFFER_BIT,E.NEAREST)):de?E.copyTexSubImage3D(Lt,N,Rt,te,ue+Ln,Ct,Bt,rt,pt):E.copyTexSubImage2D(Lt,N,Rt,te,ue+Ln,Ct,Bt,rt,pt);lt.bindFramebuffer(E.READ_FRAMEBUFFER,null),lt.bindFramebuffer(E.DRAW_FRAMEBUFFER,null)}else de?x.isDataTexture||x.isData3DTexture?E.texSubImage3D(Lt,N,Rt,te,ue,rt,pt,At,ke,ie,fe.data):U.isCompressedArrayTexture?E.compressedTexSubImage3D(Lt,N,Rt,te,ue,rt,pt,At,ke,fe.data):E.texSubImage3D(Lt,N,Rt,te,ue,rt,pt,At,ke,ie,fe):x.isDataTexture?E.texSubImage2D(E.TEXTURE_2D,N,Rt,te,rt,pt,ke,ie,fe.data):x.isCompressedTexture?E.compressedTexSubImage2D(E.TEXTURE_2D,N,Rt,te,fe.width,fe.height,ke,fe.data):E.texSubImage2D(E.TEXTURE_2D,N,Rt,te,rt,pt,ke,ie,fe);E.pixelStorei(E.UNPACK_ROW_LENGTH,gn),E.pixelStorei(E.UNPACK_IMAGE_HEIGHT,se),E.pixelStorei(E.UNPACK_SKIP_PIXELS,Ze),E.pixelStorei(E.UNPACK_SKIP_ROWS,pi),E.pixelStorei(E.UNPACK_SKIP_IMAGES,ze),N===0&&U.generateMipmaps&&E.generateMipmap(Lt),lt.unbindTexture()},this.copyTextureToTexture3D=function(x,U,F=null,B=null,N=0){return x.isTexture!==!0&&(cs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),F=arguments[0]||null,B=arguments[1]||null,x=arguments[2],U=arguments[3],N=arguments[4]||0),cs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(x,U,F,B,N)},this.initRenderTarget=function(x){_t.get(x).__webglFramebuffer===void 0&&b.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?b.setTextureCube(x,0):x.isData3DTexture?b.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?b.setTexture2DArray(x,0):b.setTexture2D(x,0),lt.unbindTexture()},this.resetState=function(){A=0,C=0,D=null,lt.reset(),ce.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return En}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=Qt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Qt._getUnpackColorSpace()}}class lc extends Ee{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new be,this.environmentIntensity=1,this.environmentRotation=new be,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Jg extends Pe{constructor(t=null,e=1,n=1,i,r,a,o,l,h=We,c=We,u,f){super(null,a,o,l,h,c,i,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class th extends je{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Ri=new he,eh=new he,nr=[],nh=new di,Qg=new he,rs=new Kt,as=new bs;class ih extends Kt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new th(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Qg)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new di),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ri),nh.copy(t.boundingBox).applyMatrix4(Ri),this.boundingBox.union(nh)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new bs),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ri),as.copy(t.boundingSphere).applyMatrix4(Ri),this.boundingSphere.union(as)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(t,e){const n=this.matrixWorld,i=this.count;if(rs.geometry=this.geometry,rs.material=this.material,rs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),as.copy(this.boundingSphere),as.applyMatrix4(n),t.ray.intersectsSphere(as)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Ri),eh.multiplyMatrices(n,Ri),rs.matrixWorld=eh,rs.raycast(t,nr);for(let a=0,o=nr.length;a<o;a++){const l=nr[a];l.instanceId=r,l.object=this,e.push(l)}nr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new th(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Jg(new Float32Array(i*this.count),i,this.count,wo,dn));const r=this.morphTexture.source.data.data;let a=0;for(let h=0;h<n.length;h++)a+=n[h];const o=this.geometry.morphTargetsRelative?1:1-a,l=i*t;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class tv extends Pe{constructor(t,e,n,i,r,a,o,l,h){super(t,e,n,i,r,a,o,l,h),this.isCanvasTexture=!0,this.needsUpdate=!0}}class pn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const r=n.length;let a;e?a=e:a=t*n[r-1];let o=0,l=r-1,h;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),h=n[i]-a,h<0)o=i+1;else if(h>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(r-1);const c=n[i],f=n[i+1]-c,d=(a-c)/f;return(i+d)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);const a=this.getPoint(i),o=this.getPoint(r),l=e||(a.isVector2?new at:new P);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new P,i=[],r=[],a=[],o=new P,l=new he;for(let d=0;d<=t;d++){const g=d/t;i[d]=this.getTangentAt(g,new P)}r[0]=new P,a[0]=new P;let h=Number.MAX_VALUE;const c=Math.abs(i[0].x),u=Math.abs(i[0].y),f=Math.abs(i[0].z);c<=h&&(h=c,n.set(1,0,0)),u<=h&&(h=u,n.set(0,1,0)),f<=h&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(i[d-1],i[d]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(xe(i[d-1].dot(i[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(o,g))}a[d].crossVectors(i[d],r[d])}if(e===!0){let d=Math.acos(xe(r[0].dot(r[t]),-1,1));d/=t,i[0].dot(o.crossVectors(r[0],r[t]))>0&&(d=-d);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(i[g],d*g)),a[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Ro extends pn{constructor(t=0,e=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new at){const n=e,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);const o=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(o),h=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const c=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=l-this.aX,d=h-this.aY;l=f*c-d*u+this.aX,h=f*u+d*c+this.aY}return n.set(l,h)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class ev extends Ro{constructor(t,e,n,i,r,a){super(t,e,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Po(){let s=0,t=0,e=0,n=0;function i(r,a,o,l){s=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,h){i(a,o,h*(o-r),h*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,h,c,u){let f=(a-r)/h-(o-r)/(h+c)+(o-a)/c,d=(o-a)/c-(l-a)/(c+u)+(l-o)/u;f*=c,d*=c,i(a,o,f,d)},calc:function(r){const a=r*r,o=a*r;return s+t*r+e*a+n*o}}}const ir=new P,pa=new Po,ma=new Po,ga=new Po;class hc extends pn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new P){const n=e,i=this.points,r=i.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let h,c;this.closed||o>0?h=i[(o-1)%r]:(ir.subVectors(i[0],i[1]).add(i[0]),h=ir);const u=i[o%r],f=i[(o+1)%r];if(this.closed||o+2<r?c=i[(o+2)%r]:(ir.subVectors(i[r-1],i[r-2]).add(i[r-1]),c=ir),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(h.distanceToSquared(u),d),v=Math.pow(u.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(c),d);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),pa.initNonuniformCatmullRom(h.x,u.x,f.x,c.x,g,v,m),ma.initNonuniformCatmullRom(h.y,u.y,f.y,c.y,g,v,m),ga.initNonuniformCatmullRom(h.z,u.z,f.z,c.z,g,v,m)}else this.curveType==="catmullrom"&&(pa.initCatmullRom(h.x,u.x,f.x,c.x,this.tension),ma.initCatmullRom(h.y,u.y,f.y,c.y,this.tension),ga.initCatmullRom(h.z,u.z,f.z,c.z,this.tension));return n.set(pa.calc(l),ma.calc(l),ga.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new P().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function sh(s,t,e,n,i){const r=(n-t)*.5,a=(i-e)*.5,o=s*s,l=s*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*s+e}function nv(s,t){const e=1-s;return e*e*t}function iv(s,t){return 2*(1-s)*s*t}function sv(s,t){return s*s*t}function ps(s,t,e,n){return nv(s,t)+iv(s,e)+sv(s,n)}function rv(s,t){const e=1-s;return e*e*e*t}function av(s,t){const e=1-s;return 3*e*e*s*t}function ov(s,t){return 3*(1-s)*s*s*t}function lv(s,t){return s*s*s*t}function ms(s,t,e,n,i){return rv(s,t)+av(s,e)+ov(s,n)+lv(s,i)}class cc extends pn{constructor(t=new at,e=new at,n=new at,i=new at){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new at){const n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(ms(t,i.x,r.x,a.x,o.x),ms(t,i.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class hv extends pn{constructor(t=new P,e=new P,n=new P,i=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new P){const n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(ms(t,i.x,r.x,a.x,o.x),ms(t,i.y,r.y,a.y,o.y),ms(t,i.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class uc extends pn{constructor(t=new at,e=new at){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new at){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new at){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class cv extends pn{constructor(t=new P,e=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new P){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new P){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class fc extends pn{constructor(t=new at,e=new at,n=new at){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new at){const n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(ps(t,i.x,r.x,a.x),ps(t,i.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class dc extends pn{constructor(t=new P,e=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new P){const n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(ps(t,i.x,r.x,a.x),ps(t,i.y,r.y,a.y),ps(t,i.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class pc extends pn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new at){const n=e,i=this.points,r=(i.length-1)*t,a=Math.floor(r),o=r-a,l=i[a===0?a:a-1],h=i[a],c=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(sh(o,l.x,h.x,c.x,u.x),sh(o,l.y,h.y,c.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new at().fromArray(i))}return this}}var vr=Object.freeze({__proto__:null,ArcCurve:ev,CatmullRomCurve3:hc,CubicBezierCurve:cc,CubicBezierCurve3:hv,EllipseCurve:Ro,LineCurve:uc,LineCurve3:cv,QuadraticBezierCurve:fc,QuadraticBezierCurve3:dc,SplineCurve:pc});class uv extends pn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new vr[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const a=i[r]-n,o=this.curves[r],l=o.getLength(),h=l===0?0:1-a/l;return o.getPointAt(h,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const a=r[i],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let h=0;h<l.length;h++){const c=l[h];n&&n.equals(c)||(e.push(c),n=c)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new vr[i.type]().fromJSON(i))}return this}}class rh extends uv{constructor(t){super(),this.type="Path",this.currentPoint=new at,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new uc(this.currentPoint.clone(),new at(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const r=new fc(this.currentPoint.clone(),new at(t,e),new at(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,a){const o=new cc(this.currentPoint.clone(),new at(t,e),new at(n,i),new at(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new pc(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,i,r,a),this}absarc(t,e,n,i,r,a){return this.absellipse(t,e,n,n,i,r,a),this}ellipse(t,e,n,i,r,a,o,l){const h=this.currentPoint.x,c=this.currentPoint.y;return this.absellipse(t+h,e+c,n,i,r,a,o,l),this}absellipse(t,e,n,i,r,a,o,l){const h=new Ro(t,e,n,i,r,a,o,l);if(this.curves.length>0){const u=h.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(h);const c=h.getPoint(1);return this.currentPoint.copy(c),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class _r extends Xe{constructor(t=[new at(0,-.5),new at(.5,0),new at(0,.5)],e=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:i},e=Math.floor(e),i=xe(i,0,Math.PI*2);const r=[],a=[],o=[],l=[],h=[],c=1/e,u=new P,f=new at,d=new P,g=new P,v=new P;let m=0,p=0;for(let T=0;T<=t.length-1;T++)switch(T){case 0:m=t[T+1].x-t[T].x,p=t[T+1].y-t[T].y,d.x=p*1,d.y=-m,d.z=p*0,v.copy(d),d.normalize(),l.push(d.x,d.y,d.z);break;case t.length-1:l.push(v.x,v.y,v.z);break;default:m=t[T+1].x-t[T].x,p=t[T+1].y-t[T].y,d.x=p*1,d.y=-m,d.z=p*0,g.copy(d),d.x+=v.x,d.y+=v.y,d.z+=v.z,d.normalize(),l.push(d.x,d.y,d.z),v.copy(g)}for(let T=0;T<=e;T++){const M=n+T*c*i,y=Math.sin(M),k=Math.cos(M);for(let A=0;A<=t.length-1;A++){u.x=t[A].x*y,u.y=t[A].y,u.z=t[A].x*k,a.push(u.x,u.y,u.z),f.x=T/e,f.y=A/(t.length-1),o.push(f.x,f.y);const C=l[3*A+0]*y,D=l[3*A+1],w=l[3*A+0]*k;h.push(C,D,w)}}for(let T=0;T<e;T++)for(let M=0;M<t.length-1;M++){const y=M+T*t.length,k=y,A=y+t.length,C=y+t.length+1,D=y+1;r.push(k,A,D),r.push(C,D,A)}this.setIndex(r),this.setAttribute("position",new me(a,3)),this.setAttribute("uv",new me(o,2)),this.setAttribute("normal",new me(h,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new _r(t.points,t.segments,t.phiStart,t.phiLength)}}class Lo extends Xe{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const r=[],a=[],o=[],l=[],h=new P,c=new at;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,f=3;u<=e;u++,f+=3){const d=n+u/e*i;h.x=t*Math.cos(d),h.y=t*Math.sin(d),a.push(h.x,h.y,h.z),o.push(0,0,1),c.x=(a[f]/t+1)/2,c.y=(a[f+1]/t+1)/2,l.push(c.x,c.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new me(a,3)),this.setAttribute("normal",new me(o,3)),this.setAttribute("uv",new me(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Lo(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Do extends rh{constructor(t){super(t),this.uuid=$i(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(new rh().fromJSON(i))}return this}}const fv={triangulate:function(s,t,e=2){const n=t&&t.length,i=n?t[0]*e:s.length;let r=mc(s,0,i,e,!0);const a=[];if(!r||r.next===r.prev)return a;let o,l,h,c,u,f,d;if(n&&(r=vv(s,t,r,e)),s.length>80*e){o=h=s[0],l=c=s[1];for(let g=e;g<i;g+=e)u=s[g],f=s[g+1],u<o&&(o=u),f<l&&(l=f),u>h&&(h=u),f>c&&(c=f);d=Math.max(h-o,c-l),d=d!==0?32767/d:0}return ys(r,a,e,o,l,d,0),a}};function mc(s,t,e,n,i){let r,a;if(i===Cv(s,t,e,n)>0)for(r=t;r<e;r+=n)a=ah(r,s[r],s[r+1],a);else for(r=e-n;r>=t;r-=n)a=ah(r,s[r],s[r+1],a);return a&&br(a,a.next)&&(Ss(a),a=a.next),a}function ui(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(br(e,e.next)||ge(e.prev,e,e.next)===0)){if(Ss(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function ys(s,t,e,n,i,r,a){if(!s)return;!a&&r&&xv(s,n,i,r);let o=s,l,h;for(;s.prev!==s.next;){if(l=s.prev,h=s.next,r?pv(s,n,i,r):dv(s)){t.push(l.i/e|0),t.push(s.i/e|0),t.push(h.i/e|0),Ss(s),s=h.next,o=h.next;continue}if(s=h,s===o){a?a===1?(s=mv(ui(s),t,e),ys(s,t,e,n,i,r,2)):a===2&&gv(s,t,e,n,i,r):ys(ui(s),t,e,n,i,r,1);break}}}function dv(s){const t=s.prev,e=s,n=s.next;if(ge(t,e,n)>=0)return!1;const i=t.x,r=e.x,a=n.x,o=t.y,l=e.y,h=n.y,c=i<r?i<a?i:a:r<a?r:a,u=o<l?o<h?o:h:l<h?l:h,f=i>r?i>a?i:a:r>a?r:a,d=o>l?o>h?o:h:l>h?l:h;let g=n.next;for(;g!==t;){if(g.x>=c&&g.x<=f&&g.y>=u&&g.y<=d&&Ii(i,o,r,l,a,h,g.x,g.y)&&ge(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function pv(s,t,e,n){const i=s.prev,r=s,a=s.next;if(ge(i,r,a)>=0)return!1;const o=i.x,l=r.x,h=a.x,c=i.y,u=r.y,f=a.y,d=o<l?o<h?o:h:l<h?l:h,g=c<u?c<f?c:f:u<f?u:f,v=o>l?o>h?o:h:l>h?l:h,m=c>u?c>f?c:f:u>f?u:f,p=mo(d,g,t,e,n),T=mo(v,m,t,e,n);let M=s.prevZ,y=s.nextZ;for(;M&&M.z>=p&&y&&y.z<=T;){if(M.x>=d&&M.x<=v&&M.y>=g&&M.y<=m&&M!==i&&M!==a&&Ii(o,c,l,u,h,f,M.x,M.y)&&ge(M.prev,M,M.next)>=0||(M=M.prevZ,y.x>=d&&y.x<=v&&y.y>=g&&y.y<=m&&y!==i&&y!==a&&Ii(o,c,l,u,h,f,y.x,y.y)&&ge(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;M&&M.z>=p;){if(M.x>=d&&M.x<=v&&M.y>=g&&M.y<=m&&M!==i&&M!==a&&Ii(o,c,l,u,h,f,M.x,M.y)&&ge(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;y&&y.z<=T;){if(y.x>=d&&y.x<=v&&y.y>=g&&y.y<=m&&y!==i&&y!==a&&Ii(o,c,l,u,h,f,y.x,y.y)&&ge(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function mv(s,t,e){let n=s;do{const i=n.prev,r=n.next.next;!br(i,r)&&gc(i,n,n.next,r)&&Ms(i,r)&&Ms(r,i)&&(t.push(i.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),Ss(n),Ss(n.next),n=s=r),n=n.next}while(n!==s);return ui(n)}function gv(s,t,e,n,i,r){let a=s;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Tv(a,o)){let l=vc(a,o);a=ui(a,a.next),l=ui(l,l.next),ys(a,t,e,n,i,r,0),ys(l,t,e,n,i,r,0);return}o=o.next}a=a.next}while(a!==s)}function vv(s,t,e,n){const i=[];let r,a,o,l,h;for(r=0,a=t.length;r<a;r++)o=t[r]*n,l=r<a-1?t[r+1]*n:s.length,h=mc(s,o,l,n,!1),h===h.next&&(h.steiner=!0),i.push(bv(h));for(i.sort(_v),r=0;r<i.length;r++)e=yv(i[r],e);return e}function _v(s,t){return s.x-t.x}function yv(s,t){const e=Mv(s,t);if(!e)return t;const n=vc(e,s);return ui(n,n.next),ui(e,e.next)}function Mv(s,t){let e=t,n=-1/0,i;const r=s.x,a=s.y;do{if(a<=e.y&&a>=e.next.y&&e.next.y!==e.y){const f=e.x+(a-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=r&&f>n&&(n=f,i=e.x<e.next.x?e:e.next,f===r))return i}e=e.next}while(e!==t);if(!i)return null;const o=i,l=i.x,h=i.y;let c=1/0,u;e=i;do r>=e.x&&e.x>=l&&r!==e.x&&Ii(a<h?r:n,a,l,h,a<h?n:r,a,e.x,e.y)&&(u=Math.abs(a-e.y)/(r-e.x),Ms(e,s)&&(u<c||u===c&&(e.x>i.x||e.x===i.x&&Sv(i,e)))&&(i=e,c=u)),e=e.next;while(e!==o);return i}function Sv(s,t){return ge(s.prev,s,t.prev)<0&&ge(t.next,s,s.next)<0}function xv(s,t,e,n){let i=s;do i.z===0&&(i.z=mo(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,wv(i)}function wv(s){let t,e,n,i,r,a,o,l,h=1;do{for(e=s,s=null,r=null,a=0;e;){for(a++,n=e,o=0,t=0;t<h&&(o++,n=n.nextZ,!!n);t++);for(l=h;o>0||l>0&&n;)o!==0&&(l===0||!n||e.z<=n.z)?(i=e,e=e.nextZ,o--):(i=n,n=n.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;e=n}r.nextZ=null,h*=2}while(a>1);return s}function mo(s,t,e,n,i){return s=(s-e)*i|0,t=(t-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function bv(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function Ii(s,t,e,n,i,r,a,o){return(i-a)*(t-o)>=(s-a)*(r-o)&&(s-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(i-a)*(n-o)}function Tv(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!Ev(s,t)&&(Ms(s,t)&&Ms(t,s)&&Av(s,t)&&(ge(s.prev,s,t.prev)||ge(s,t.prev,t))||br(s,t)&&ge(s.prev,s,s.next)>0&&ge(t.prev,t,t.next)>0)}function ge(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function br(s,t){return s.x===t.x&&s.y===t.y}function gc(s,t,e,n){const i=rr(ge(s,t,e)),r=rr(ge(s,t,n)),a=rr(ge(e,n,s)),o=rr(ge(e,n,t));return!!(i!==r&&a!==o||i===0&&sr(s,e,t)||r===0&&sr(s,n,t)||a===0&&sr(e,s,n)||o===0&&sr(e,t,n))}function sr(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function rr(s){return s>0?1:s<0?-1:0}function Ev(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&gc(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function Ms(s,t){return ge(s.prev,s,s.next)<0?ge(s,t,s.next)>=0&&ge(s,s.prev,t)>=0:ge(s,t,s.prev)<0||ge(s,s.next,t)<0}function Av(s,t){let e=s,n=!1;const i=(s.x+t.x)/2,r=(s.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&i<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function vc(s,t){const e=new go(s.i,s.x,s.y),n=new go(t.i,t.x,t.y),i=s.next,r=t.prev;return s.next=t,t.prev=s,e.next=i,i.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function ah(s,t,e,n){const i=new go(s,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Ss(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function go(s,t,e){this.i=s,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Cv(s,t,e,n){let i=0;for(let r=t,a=e-n;r<e;r+=n)i+=(s[a]-s[r])*(s[r+1]+s[a+1]),a=r;return i}class gs{static area(t){const e=t.length;let n=0;for(let i=e-1,r=0;r<e;i=r++)n+=t[i].x*t[r].y-t[r].x*t[i].y;return n*.5}static isClockWise(t){return gs.area(t)<0}static triangulateShape(t,e){const n=[],i=[],r=[];oh(t),lh(n,t);let a=t.length;e.forEach(oh);for(let l=0;l<e.length;l++)i.push(a),a+=e[l].length,lh(n,e[l]);const o=fv.triangulate(n,i);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}}function oh(s){const t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function lh(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}class Io extends Xe{constructor(t=new Do([new at(.5,.5),new at(-.5,.5),new at(-.5,-.5),new at(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,i=[],r=[];for(let o=0,l=t.length;o<l;o++){const h=t[o];a(h)}this.setAttribute("position",new me(i,3)),this.setAttribute("uv",new me(r,2)),this.computeVertexNormals();function a(o){const l=[],h=e.curveSegments!==void 0?e.curveSegments:12,c=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let f=e.bevelEnabled!==void 0?e.bevelEnabled:!0,d=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:d-.1,v=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const p=e.extrudePath,T=e.UVGenerator!==void 0?e.UVGenerator:Rv;let M,y=!1,k,A,C,D;p&&(M=p.getSpacedPoints(c),y=!0,f=!1,k=p.computeFrenetFrames(c,!1),A=new P,C=new P,D=new P),f||(m=0,d=0,g=0,v=0);const w=o.extractPoints(h);let S=w.shape;const R=w.holes;if(!gs.isClockWise(S)){S=S.reverse();for(let Z=0,it=R.length;Z<it;Z++){const E=R[Z];gs.isClockWise(E)&&(R[Z]=E.reverse())}}const z=gs.triangulateShape(S,R),q=S;for(let Z=0,it=R.length;Z<it;Z++){const E=R[Z];S=S.concat(E)}function j(Z,it,E){return it||console.error("THREE.ExtrudeGeometry: vec does not exist"),Z.clone().addScaledVector(it,E)}const W=S.length,J=z.length;function H(Z,it,E){let Pt,tt,Mt;const lt=Z.x-it.x,It=Z.y-it.y,_t=E.x-Z.x,b=E.y-Z.y,_=lt*lt+It*It,O=lt*b-It*_t;if(Math.abs(O)>Number.EPSILON){const X=Math.sqrt(_),Q=Math.sqrt(_t*_t+b*b),Y=it.x-It/X,Et=it.y+lt/X,ut=E.x-b/Q,yt=E.y+_t/Q,jt=((ut-Y)*b-(yt-Et)*_t)/(lt*b-It*_t);Pt=Y+lt*jt-Z.x,tt=Et+It*jt-Z.y;const et=Pt*Pt+tt*tt;if(et<=2)return new at(Pt,tt);Mt=Math.sqrt(et/2)}else{let X=!1;lt>Number.EPSILON?_t>Number.EPSILON&&(X=!0):lt<-Number.EPSILON?_t<-Number.EPSILON&&(X=!0):Math.sign(It)===Math.sign(b)&&(X=!0),X?(Pt=-It,tt=lt,Mt=Math.sqrt(_)):(Pt=lt,tt=It,Mt=Math.sqrt(_/2))}return new at(Pt/Mt,tt/Mt)}const ht=[];for(let Z=0,it=q.length,E=it-1,Pt=Z+1;Z<it;Z++,E++,Pt++)E===it&&(E=0),Pt===it&&(Pt=0),ht[Z]=H(q[Z],q[E],q[Pt]);const gt=[];let bt,Ht=ht.concat();for(let Z=0,it=R.length;Z<it;Z++){const E=R[Z];bt=[];for(let Pt=0,tt=E.length,Mt=tt-1,lt=Pt+1;Pt<tt;Pt++,Mt++,lt++)Mt===tt&&(Mt=0),lt===tt&&(lt=0),bt[Pt]=H(E[Pt],E[Mt],E[lt]);gt.push(bt),Ht=Ht.concat(bt)}for(let Z=0;Z<m;Z++){const it=Z/m,E=d*Math.cos(it*Math.PI/2),Pt=g*Math.sin(it*Math.PI/2)+v;for(let tt=0,Mt=q.length;tt<Mt;tt++){const lt=j(q[tt],ht[tt],Pt);ot(lt.x,lt.y,-E)}for(let tt=0,Mt=R.length;tt<Mt;tt++){const lt=R[tt];bt=gt[tt];for(let It=0,_t=lt.length;It<_t;It++){const b=j(lt[It],bt[It],Pt);ot(b.x,b.y,-E)}}}const ne=g+v;for(let Z=0;Z<W;Z++){const it=f?j(S[Z],Ht[Z],ne):S[Z];y?(C.copy(k.normals[0]).multiplyScalar(it.x),A.copy(k.binormals[0]).multiplyScalar(it.y),D.copy(M[0]).add(C).add(A),ot(D.x,D.y,D.z)):ot(it.x,it.y,0)}for(let Z=1;Z<=c;Z++)for(let it=0;it<W;it++){const E=f?j(S[it],Ht[it],ne):S[it];y?(C.copy(k.normals[Z]).multiplyScalar(E.x),A.copy(k.binormals[Z]).multiplyScalar(E.y),D.copy(M[Z]).add(C).add(A),ot(D.x,D.y,D.z)):ot(E.x,E.y,u/c*Z)}for(let Z=m-1;Z>=0;Z--){const it=Z/m,E=d*Math.cos(it*Math.PI/2),Pt=g*Math.sin(it*Math.PI/2)+v;for(let tt=0,Mt=q.length;tt<Mt;tt++){const lt=j(q[tt],ht[tt],Pt);ot(lt.x,lt.y,u+E)}for(let tt=0,Mt=R.length;tt<Mt;tt++){const lt=R[tt];bt=gt[tt];for(let It=0,_t=lt.length;It<_t;It++){const b=j(lt[It],bt[It],Pt);y?ot(b.x,b.y+M[c-1].y,M[c-1].x+E):ot(b.x,b.y,u+E)}}}$(),st();function $(){const Z=i.length/3;if(f){let it=0,E=W*it;for(let Pt=0;Pt<J;Pt++){const tt=z[Pt];Dt(tt[2]+E,tt[1]+E,tt[0]+E)}it=c+m*2,E=W*it;for(let Pt=0;Pt<J;Pt++){const tt=z[Pt];Dt(tt[0]+E,tt[1]+E,tt[2]+E)}}else{for(let it=0;it<J;it++){const E=z[it];Dt(E[2],E[1],E[0])}for(let it=0;it<J;it++){const E=z[it];Dt(E[0]+W*c,E[1]+W*c,E[2]+W*c)}}n.addGroup(Z,i.length/3-Z,0)}function st(){const Z=i.length/3;let it=0;Tt(q,it),it+=q.length;for(let E=0,Pt=R.length;E<Pt;E++){const tt=R[E];Tt(tt,it),it+=tt.length}n.addGroup(Z,i.length/3-Z,1)}function Tt(Z,it){let E=Z.length;for(;--E>=0;){const Pt=E;let tt=E-1;tt<0&&(tt=Z.length-1);for(let Mt=0,lt=c+m*2;Mt<lt;Mt++){const It=W*Mt,_t=W*(Mt+1),b=it+Pt+It,_=it+tt+It,O=it+tt+_t,X=it+Pt+_t;Ft(b,_,O,X)}}}function ot(Z,it,E){l.push(Z),l.push(it),l.push(E)}function Dt(Z,it,E){Nt(Z),Nt(it),Nt(E);const Pt=i.length/3,tt=T.generateTopUV(n,i,Pt-3,Pt-2,Pt-1);Jt(tt[0]),Jt(tt[1]),Jt(tt[2])}function Ft(Z,it,E,Pt){Nt(Z),Nt(it),Nt(Pt),Nt(it),Nt(E),Nt(Pt);const tt=i.length/3,Mt=T.generateSideWallUV(n,i,tt-6,tt-3,tt-2,tt-1);Jt(Mt[0]),Jt(Mt[1]),Jt(Mt[3]),Jt(Mt[1]),Jt(Mt[2]),Jt(Mt[3])}function Nt(Z){i.push(l[Z*3+0]),i.push(l[Z*3+1]),i.push(l[Z*3+2])}function Jt(Z){r.push(Z.x),r.push(Z.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return Pv(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,a=t.shapes.length;r<a;r++){const o=e[t.shapes[r]];n.push(o)}const i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new vr[i.type]().fromJSON(i)),new Io(n,t.options)}}const Rv={generateTopUV:function(s,t,e,n,i){const r=t[e*3],a=t[e*3+1],o=t[n*3],l=t[n*3+1],h=t[i*3],c=t[i*3+1];return[new at(r,a),new at(o,l),new at(h,c)]},generateSideWallUV:function(s,t,e,n,i,r){const a=t[e*3],o=t[e*3+1],l=t[e*3+2],h=t[n*3],c=t[n*3+1],u=t[n*3+2],f=t[i*3],d=t[i*3+1],g=t[i*3+2],v=t[r*3],m=t[r*3+1],p=t[r*3+2];return Math.abs(o-c)<Math.abs(a-h)?[new at(a,1-l),new at(h,1-u),new at(f,1-g),new at(v,1-p)]:[new at(o,1-l),new at(c,1-u),new at(d,1-g),new at(m,1-p)]}};function Pv(s,t,e){if(e.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){const r=s[n];e.shapes.push(r.uuid)}else e.shapes.push(s.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class ii extends Xe{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let h=0;const c=[],u=new P,f=new P,d=[],g=[],v=[],m=[];for(let p=0;p<=n;p++){const T=[],M=p/n;let y=0;p===0&&a===0?y=.5/e:p===n&&l===Math.PI&&(y=-.5/e);for(let k=0;k<=e;k++){const A=k/e;u.x=-t*Math.cos(i+A*r)*Math.sin(a+M*o),u.y=t*Math.cos(a+M*o),u.z=t*Math.sin(i+A*r)*Math.sin(a+M*o),g.push(u.x,u.y,u.z),f.copy(u).normalize(),v.push(f.x,f.y,f.z),m.push(A+y,1-M),T.push(h++)}c.push(T)}for(let p=0;p<n;p++)for(let T=0;T<e;T++){const M=c[p][T+1],y=c[p][T],k=c[p+1][T],A=c[p+1][T+1];(p!==0||a>0)&&d.push(M,y,A),(p!==n-1||l<Math.PI)&&d.push(y,k,A)}this.setIndex(d),this.setAttribute("position",new me(g,3)),this.setAttribute("normal",new me(v,3)),this.setAttribute("uv",new me(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ii(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Uo extends Xe{constructor(t=1,e=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);const a=[],o=[],l=[],h=[],c=new P,u=new P,f=new P;for(let d=0;d<=n;d++)for(let g=0;g<=i;g++){const v=g/i*r,m=d/n*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(v),u.y=(t+e*Math.cos(m))*Math.sin(v),u.z=e*Math.sin(m),o.push(u.x,u.y,u.z),c.x=t*Math.cos(v),c.y=t*Math.sin(v),f.subVectors(u,c).normalize(),l.push(f.x,f.y,f.z),h.push(g/i),h.push(d/n)}for(let d=1;d<=n;d++)for(let g=1;g<=i;g++){const v=(i+1)*d+g-1,m=(i+1)*(d-1)+g-1,p=(i+1)*(d-1)+g,T=(i+1)*d+g;a.push(v,m,T),a.push(m,p,T)}this.setIndex(a),this.setAttribute("position",new me(o,3)),this.setAttribute("normal",new me(l,3)),this.setAttribute("uv",new me(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Uo(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class No extends Xe{constructor(t=new dc(new P(-1,-1,0),new P(-1,1,0),new P(1,1,0)),e=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:i,closed:r};const a=t.computeFrenetFrames(e,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new P,l=new P,h=new at;let c=new P;const u=[],f=[],d=[],g=[];v(),this.setIndex(g),this.setAttribute("position",new me(u,3)),this.setAttribute("normal",new me(f,3)),this.setAttribute("uv",new me(d,2));function v(){for(let M=0;M<e;M++)m(M);m(r===!1?e:0),T(),p()}function m(M){c=t.getPointAt(M/e,c);const y=a.normals[M],k=a.binormals[M];for(let A=0;A<=i;A++){const C=A/i*Math.PI*2,D=Math.sin(C),w=-Math.cos(C);l.x=w*y.x+D*k.x,l.y=w*y.y+D*k.y,l.z=w*y.z+D*k.z,l.normalize(),f.push(l.x,l.y,l.z),o.x=c.x+n*l.x,o.y=c.y+n*l.y,o.z=c.z+n*l.z,u.push(o.x,o.y,o.z)}}function p(){for(let M=1;M<=e;M++)for(let y=1;y<=i;y++){const k=(i+1)*(M-1)+(y-1),A=(i+1)*M+(y-1),C=(i+1)*M+y,D=(i+1)*(M-1)+y;g.push(k,A,D),g.push(A,C,D)}}function T(){for(let M=0;M<=e;M++)for(let y=0;y<=i;y++)h.x=M/e,h.y=y/i,d.push(h.x,h.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new No(new vr[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class xs extends Ts{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new zt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new zt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Gh,this.normalScale=new at(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new be,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class si extends xs{static get type(){return"MeshPhysicalMaterial"}constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new at(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return xe(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new zt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new zt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new zt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class ko extends Ee{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new zt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Lv extends ko{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ee.DEFAULT_UP),this.updateMatrix(),this.groundColor=new zt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const va=new he,hh=new P,ch=new P;class _c{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new at(512,512),this.map=null,this.mapPass=null,this.matrix=new he,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ao,this._frameExtents=new at(1,1),this._viewportCount=1,this._viewports=[new le(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;hh.setFromMatrixPosition(t.matrixWorld),e.position.copy(hh),ch.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(ch),e.updateMatrixWorld(),va.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(va),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(va)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const uh=new he,os=new P,_a=new P;class Dv extends _c{constructor(){super(new Ge(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new at(4,2),this._viewportCount=6,this._viewports=[new le(2,1,1,1),new le(0,1,1,1),new le(3,1,1,1),new le(1,1,1,1),new le(3,0,1,1),new le(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),os.setFromMatrixPosition(t.matrixWorld),n.position.copy(os),_a.copy(n.position),_a.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(_a),n.updateMatrixWorld(),i.makeTranslation(-os.x,-os.y,-os.z),uh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(uh)}}class Iv extends ko{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Dv}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Uv extends _c{constructor(){super(new nc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Nv extends ko{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ee.DEFAULT_UP),this.updateMatrix(),this.target=new Ee,this.shadow=new Uv}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:yo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=yo);class kv extends lc{constructor(){super();const t=new ji;t.deleteAttribute("uv");const e=new xs({side:Ne}),n=new xs,i=new Iv(16777215,900,28,2);i.position.set(.418,16.199,.3),this.add(i);const r=new Kt(t,e);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const a=new Kt(t,n);a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),this.add(a);const o=new Kt(t,n);o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),this.add(o);const l=new Kt(t,n);l.position.set(6.167,.857,7.803),l.rotation.set(0,.561,0),l.scale.set(3.927,6.285,3.687),this.add(l);const h=new Kt(t,n);h.position.set(-2.017,.018,6.124),h.rotation.set(0,.333,0),h.scale.set(2.002,4.566,2.064),this.add(h);const c=new Kt(t,n);c.position.set(2.291,-.756,-2.621),c.rotation.set(0,-.286,0),c.scale.set(1.546,1.552,1.496),this.add(c);const u=new Kt(t,n);u.position.set(-2.193,-.369,-5.547),u.rotation.set(0,.516,0),u.scale.set(3.875,3.487,2.986),this.add(u);const f=new Kt(t,Pi(50));f.position.set(-16.116,14.37,8.208),f.scale.set(.1,2.428,2.739),this.add(f);const d=new Kt(t,Pi(50));d.position.set(-16.109,18.021,-8.207),d.scale.set(.1,2.425,2.751),this.add(d);const g=new Kt(t,Pi(17));g.position.set(14.904,12.198,-1.832),g.scale.set(.15,4.265,6.331),this.add(g);const v=new Kt(t,Pi(43));v.position.set(-.462,8.89,14.52),v.scale.set(4.38,5.441,.088),this.add(v);const m=new Kt(t,Pi(20));m.position.set(3.235,11.486,-12.541),m.scale.set(2.5,2,.1),this.add(m);const p=new Kt(t,Pi(100));p.position.set(0,20,0),p.scale.set(1,.1,1),this.add(p)}dispose(){const t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(const e of t)e.dispose()}}function Pi(s){const t=new Oi;return t.color.setScalar(s),t}const dr=1.16;function ya(s,t,e=.012){const n=t<0?t/.86:t,i=Math.sqrt(Math.max(0,1-(s/dr)**2-n*n)),r=new P(s/(dr*dr),n,i).normalize();return new P(s,t,i).addScaledVector(r,e)}function Ov(){const s=new An,t=new An;s.add(t);const e=new ii(1,128,96),n=e.attributes.position,i=new Float32Array(n.count*3),r=new zt("#ffffff"),a=new zt("#ffbcd4"),o=new zt;for(let w=0;w<n.count;w++){const S=n.getX(w),R=n.getY(w),G=n.getZ(w);n.setXYZ(w,S*dr,R<0?R*.86:R,G),o.copy(r).lerp(a,Math.min(1,Math.max(0,(.75-R)/1.5))),i.set([o.r,o.g,o.b],w*3)}e.setAttribute("color",new je(i,3)),e.computeVertexNormals();const l=new si({vertexColors:!0,roughness:.38,clearcoat:.45,clearcoatRoughness:.22,sheen:1,sheenColor:new zt("#ffc2da"),sheenRoughness:.55}),h=new Kt(e,l);h.castShadow=!0,h.receiveShadow=!0,t.add(h);const c=[new at(0,.5),new at(.06,.48),new at(.15,.36),new at(.24,.16),new at(.29,0),new at(0,0)],u=new _r(c,48);u.scale(1,1,.55);const f=new si({color:"#fff6fa",roughness:.4,clearcoat:.4,sheen:1,sheenColor:new zt("#ffc2da")}),d=new _r(c.map(w=>w.clone().multiplyScalar(.62)),32);d.scale(1,1,.3);const g=new si({color:"#ffaecb",roughness:.5,sheen:.6,sheenColor:new zt("#ff9cc0")});for(const w of[-1,1]){const S=new An,R=new Kt(u,f);R.castShadow=!0;const G=new Kt(d,g);G.position.set(0,.06,.1),S.add(R,G),S.position.set(w*.58,.72,-.05),S.rotation.z=-w*.38,t.add(S)}const v=new ii(1,48,32),m=new si({color:"#ffd9e7",roughness:.4,clearcoat:.4,sheen:1,sheenColor:new zt("#ffb6d1")});for(const w of[-1,1]){const S=new Kt(v,m);S.scale.set(.27,.31,.25),S.position.set(w*1.13,-.16,.14),S.castShadow=!0,t.add(S)}const p=new ii(1,64,48),T=new si({color:"#2a1830",roughness:.04,metalness:0,clearcoat:1,clearcoatRoughness:.02}),M=new Oi({color:"#6e4f78"}),y=new Oi({color:"#ffffff"}),k=[];for(const w of[-1,1]){const S=new An,R=ya(w*.38,.04,0);S.position.copy(R),S.lookAt(R.clone().multiplyScalar(2));const G=new Kt(p,T);G.scale.set(.17,.23,.11);const z=new Kt(new Uo(.1,.01,8,40),M);z.position.z=.1,z.scale.set(1,1.3,1);const q=new Kt(new ii(.036,16,12),y);q.position.set(-.055,.09,.1);const j=new Kt(new ii(.016,12,8),y);j.position.set(.06,-.06,.1),S.add(G,z,q,j),t.add(S),k.push(S)}const A=new Oi({color:"#ff8fb8",transparent:!0,opacity:.42,depthWrite:!1});for(const w of[-1,1]){const S=ya(w*.66,-.1,.006),R=new Kt(new Lo(.12,40),A);R.position.copy(S),R.lookAt(S.clone().multiplyScalar(2)),R.scale.set(1.2,.75,1),t.add(R)}const C=[[-.15,-.17],[-.12,-.235],[-.07,-.255],[-.025,-.225],[0,-.19],[.025,-.225],[.07,-.255],[.12,-.235],[.15,-.17]].map(([w,S])=>ya(w,S,.012)),D=new Kt(new No(new hc(C),64,.017,10,!1),new xs({color:"#4d3550",roughness:.5}));return t.add(D),{root:s,body:t,eyes:k}}const ls=240;function Fv(){const s=new Do;return s.moveTo(0,-.95),s.bezierCurveTo(-.3,-.62,-1.05,-.22,-1,.3),s.bezierCurveTo(-.96,.82,-.36,1,0,.55),s.bezierCurveTo(.36,1,.96,.82,1,.3),s.bezierCurveTo(1.05,-.22,.3,-.62,0,-.95),s}function Bv(){const s=new Do;for(let t=0;t<10;t++){const e=Math.PI/5*t+Math.PI/2,n=t%2===0?1:.48,i=Math.cos(e)*n,r=Math.sin(e)*n;t===0?s.moveTo(i,r):s.lineTo(i,r)}return s.closePath(),s}function fh(s,t,e){const n=new Io(s,{depth:t,bevelEnabled:!0,bevelThickness:e,bevelSize:e*.85,bevelSegments:8,curveSegments:28});return n.center(),n.computeVertexNormals(),n}function zv(s){const e=document.createElement("canvas");e.width=e.height=1024;const n=e.getContext("2d");if(n){n.fillStyle="#fbfcfe",n.fillRect(0,0,1024,1024);for(let r=0;r<=10;r++){const a=Math.round(r/10*1024),o=r%5===0;n.fillStyle=o?"rgba(96,116,150,0.75)":"rgba(120,138,168,0.42)";const l=o?6:3;n.fillRect(a-l/2,0,l,1024),n.fillRect(0,a-l/2,1024,l)}}const i=new tv(e);return i.wrapS=i.wrapT=pr,i.colorSpace=Be,i.anisotropy=s,i}class Hv{canvas;renderer;scene=new lc;camera=new Ge;room=new An;walls=[];grid;sun;hearts;stars;myu;roomKey="";sq=0;sqV=0;blinkT=0;blinkIn=2.5;look=null;pr;slow=0;lastT=0;m=new he;q=new fi;v=new P;s=new P;col=new zt;constructor(){this.canvas=document.createElement("canvas"),Object.assign(this.canvas.style,{position:"fixed",left:"0",top:"0",zIndex:"1",display:"none",pointerEvents:"none"}),document.body.appendChild(this.canvas),this.renderer=new Zg({canvas:this.canvas,antialias:!0,alpha:!1,powerPreference:"high-performance"}),this.pr=Math.max(1,window.devicePixelRatio||1),this.renderer.setPixelRatio(this.pr),this.renderer.outputColorSpace=Be,this.renderer.toneMapping=Dh,this.renderer.toneMappingExposure=.95,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Ph,this.scene.background=new zt("#ffffff");const t=new fo(this.renderer);this.scene.environment=t.fromScene(new kv,.03).texture,t.dispose(),this.scene.environmentIntensity=1.05,this.scene.add(new Lv("#ffffff","#e9ecf3",1.1)),this.sun=new Nv("#ffffff",2.4),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(2048,2048),this.sun.shadow.bias=-4e-4,this.sun.shadow.normalBias=1.2,this.sun.shadow.radius=6,this.scene.add(this.sun,this.sun.target),this.grid=zv(this.renderer.capabilities.getMaxAnisotropy()),this.scene.add(this.room);const e=new si({roughness:.16,metalness:0,clearcoat:1,clearcoatRoughness:.05});this.hearts=new ih(fh(Fv(),.55,.32),e,ls),this.hearts.castShadow=!0,this.hearts.receiveShadow=!0,this.hearts.instanceMatrix.setUsage(ll),this.hearts.frustumCulled=!1;const n=new si({roughness:.2,metalness:.1,clearcoat:1,clearcoatRoughness:.06,emissive:"#fff3c4",emissiveIntensity:.12});this.stars=new ih(fh(Bv(),.4,.22),n,ls),this.stars.castShadow=!0,this.stars.receiveShadow=!0,this.stars.instanceMatrix.setUsage(ll),this.stars.frustumCulled=!1;for(let i=0;i<ls;i++)this.hearts.setColorAt(i,this.col.set("#ff8fb8")),this.stars.setColorAt(i,this.col.set("#ffe08a"));this.scene.add(this.hearts,this.stars),this.myu=Ov(),this.scene.add(this.myu.root)}show(t){this.canvas.style.display=t?"block":"none"}resize(t,e){const n=Math.round(t),i=Math.round(e);this.canvas.width===Math.round(n*this.pr)&&this.canvas.height===Math.round(i*this.pr)||this.renderer.setSize(n,i,!0)}squish(t=1){this.sqV+=7*t}buildRoom(t){const e=`${t.hw|0}x${t.hh|0}x${t.depth}`;if(e===this.roomKey)return;this.roomKey=e;for(const u of this.walls)this.room.remove(u),u.geometry.dispose(),u.material.dispose();this.walls.length=0;const{hw:n,hh:i,depth:r}=t,a=400,o=(u,f,d,g,v)=>{const m=this.grid.clone();m.needsUpdate=!0,m.repeat.set(u/a,f/a);const p=new xs({map:m,roughness:v,metalness:0,envMapIntensity:.6}),T=new Kt(new Es(u,f),p);T.position.copy(d),T.rotation.copy(g),T.receiveShadow=!0,this.room.add(T),this.walls.push(T)},l=r;o(n*2,i*2,new P(0,0,-l),new be(0,0,0),.55),o(n*2,l,new P(0,-i,-l/2),new be(-Math.PI/2,0,0),.35),o(n*2,l,new P(0,i,-l/2),new be(Math.PI/2,0,0),.6),o(l,i*2,new P(-n,0,-l/2),new be(0,Math.PI/2,0),.5),o(l,i*2,new P(n,0,-l/2),new be(0,-Math.PI/2,0),.5),this.sun.position.set(-n*.6,i*1.5,420),this.sun.target.position.set(0,-i*.2,-l*.6);const h=this.sun.shadow.camera,c=Math.max(n,i)*1.6;h.left=-c,h.right=c,h.top=c,h.bottom=-c,h.near=10,h.far=l+1600,h.updateProjectionMatrix()}render(t,e,n,i){this.buildRoom(t),this.adapt(i);const r=t.ex,a=-t.ey,o=4,l=t.f+t.depth+400,h=o/t.f;this.camera.position.set(r,a,t.f),this.camera.rotation.set(0,0,0),this.camera.projectionMatrix.makePerspective((-t.hw-r)*h,(t.hw-r)*h,(t.hh-a)*h,(-t.hh-a)*h,o,l),this.camera.projectionMatrixInverse.copy(this.camera.projectionMatrix).invert(),this.camera.updateMatrixWorld();let c=0,u=0;for(const f of e){if(f.kind==="myu"){this.placeMyu(f,n);continue}this.v.set(f.x,-f.y,-f.z),this.q.set(f.qx,f.qy,f.qz,f.qw);const d=f.kind==="heart"?f.r*1.02:f.r*1.08;this.s.set(d,d,d),this.m.compose(this.v,this.q,this.s),f.kind==="heart"&&c<ls?(this.hearts.setMatrixAt(c,this.m),this.hearts.setColorAt(c,this.col.set(f.color)),c++):f.kind==="star"&&u<ls&&(this.stars.setMatrixAt(u,this.m),this.stars.setColorAt(u,this.col.set(f.color)),u++)}this.hearts.count=c,this.stars.count=u,this.hearts.instanceMatrix.needsUpdate=!0,this.stars.instanceMatrix.needsUpdate=!0,this.hearts.instanceColor&&(this.hearts.instanceColor.needsUpdate=!0),this.stars.instanceColor&&(this.stars.instanceColor.needsUpdate=!0),this.renderer.render(this.scene,this.camera)}placeMyu(t,e){const n=this.myu;n.root.position.set(t.x,-t.y,-t.z),n.root.quaternion.set(t.qx,t.qy,t.qz,t.qw);const i=t.r/1.2;n.root.scale.setScalar(i),this.sqV+=(-this.sq*160-this.sqV*13)*e,this.sq+=this.sqV*e;const r=Math.max(-.35,Math.min(.35,this.sq));n.body.scale.set(1+r*.6,1-r,1+r*.6),n.body.position.y=-r*.9,this.blinkIn-=e,this.blinkIn<=0&&(this.blinkT=.13,this.blinkIn=2+Math.random()*3.5),this.blinkT>0&&(this.blinkT-=e);const a=this.blinkT>0?.12:1,o=this.look?Math.max(-1,Math.min(1,(this.look.x-t.x)/300)):0,l=this.look?Math.max(-1,Math.min(1,(this.look.y-t.y)/300)):0;for(const h of n.eyes)h.scale.set(1,a,1),h.rotation.z=0,h.children[0]?.position.set(o*.02,-l*.02,0)}adapt(t){const e=this.lastT?t-this.lastT:16;this.lastT=t,!(e>250)&&(this.slow=this.slow*.95+(e>21?1:0)*.05,this.slow>.6&&this.pr>1.25&&(this.pr=Math.max(1.25,this.pr*.85),this.renderer.setPixelRatio(this.pr),this.slow=0))}get pixelRatio(){return this.pr}}const dh="lullabyte_sandbox",Fn=620,Ma=1150,Sa=L/2,xa=St/2,ar=1500,ph=["#ff7eb0","#ffa3c8","#ffc2dc","#b9a6ff","#ffb08f","#7fdcc8","#ff6f9f","#9fd1ff"],mh=["#ffe27a","#ffd04d","#fff0a8","#ffc8e8"],wa=[{label:"1g",mult:1},{label:"moon",mult:.25},{label:"float",mult:0}],ba=[{label:"soft",e:.32},{label:"boing",e:.72},{label:"SUPER",e:.94}],Ta=220,gh=1/240,Vv=12,vh=3600,_h=70,Li=52;class Gv{save={unlocked:!1,on:!1,toggled:!1};bodies=[];myuBody;gl=null;overlay=null;octx=null;shown=!1;hw=L/2;hh=St/2;grid=[];gx=0;gy=1;gz=.35;sensed=!1;motionEvents=0;motionData=0;tiltX=0;tiltY=0;baseBeta=null;baseGamma=null;eyeX=0;eyeY=0;shakeCd=0;squishCd=0;listening=!1;gravityMode=0;bounceMode=1;rain=!1;rainAcc=0;finger=null;fingerDrag={dx:0,dy:0};settingsOpen=!1;btnFinger=null;flashBtn=null;flashT=0;onT=0;toastT=0;toastShown=!1;t=0;acc=0;myuRoll=0;tmpQ=new fi;tmpE=new be(0,0,0,"ZXY");constructor(){try{const t=hn.get(dh);if(t){const e=JSON.parse(t);this.save.unlocked=e.unlocked===!0,this.save.on=this.save.unlocked&&e.on===!0,this.save.toggled=e.toggled===!0}}catch{}this.myuBody=this.body("myu",0,this.hh-140,Fn*.55,92,"#ffffff"),this.myuBody.m=14,this.seed(60)}get active(){return this.save.on}persist(){hn.set(dh,JSON.stringify(this.save))}unlockFrom(t){this.save.unlocked=!0,this.save.on=!0,this.persist(),this.onT=0,this.toastShown=!1,this.listen();const e=this.myuBody;this.bodies=[e],e.x=0,e.y=this.hh-140,e.z=Fn*.55,e.vx=e.vy=e.vz=0;for(const n of t){if(this.bodies.length>=Ta)break;const i=this.heart(n.x-Sa,n.y-xa,30+Math.random()*60);i.vx=n.vx,i.vy=n.vy,i.vz=200+Math.random()*380,i.color=n.color,this.bodies.push(i)}this.squishMyu(1.4)}setOn(t,e){this.save.unlocked&&(this.save.on=e,this.save.toggled=!0,this.persist(),this.settingsOpen=!1,e&&(this.listen(),this.onT=0),t.audio.pop())}body(t,e,n,i,r,a){return this.tmpQ.setFromEuler(new be(Math.random()*6.3,Math.random()*6.3,Math.random()*6.3)),{kind:t,x:e,y:n,z:i,r,color:a,vx:0,vy:0,vz:0,m:1,qx:this.tmpQ.x,qy:this.tmpQ.y,qz:this.tmpQ.z,qw:this.tmpQ.w,wx:(Math.random()-.5)*2,wy:(Math.random()-.5)*2,wz:(Math.random()-.5)*2,contact:!1}}heart(t,e,n){const i=15+Math.random()*10,r=this.body("heart",t,e,n,i,ph[Math.floor(Math.random()*ph.length)]??"#ff7eb0");return r.m=i/18,r}star(t,e,n){const i=12+Math.random()*8,r=this.body("star",t,e,n,i,mh[Math.floor(Math.random()*mh.length)]??"#ffe27a");return r.m=i/22,r}seed(t){this.bodies=[this.myuBody];for(let e=0;e<t;e++)this.bodies.push(this.heart((Math.random()-.5)*(this.hw*2-80),this.hh-40-Math.random()*300,40+Math.random()*(Fn-80)))}add(t,e){for(let n=0;n<e&&this.bodies.length<Ta;n++){const i=(Math.random()-.5)*300,r=-this.hh+120+Math.random()*200,a=t==="heart"?this.heart(i,r,40):this.star(i,r,40);a.vz=260+Math.random()*260,a.vx=(Math.random()-.5)*200,a.wx=(Math.random()-.5)*14,a.wy=(Math.random()-.5)*14,this.bodies.push(a)}}listen(){this.listening||typeof window>"u"||(this.listening=!0,window.addEventListener("devicemotion",t=>this.onMotion(t)),window.addEventListener("deviceorientation",t=>this.onOrient(t)))}askPermission(){const t=window.DeviceMotionEvent,e=window.DeviceOrientationEvent;t?.requestPermission?.().catch(()=>{}),e?.requestPermission?.().catch(()=>{})}onMotion(t){this.motionEvents++;const e=t.accelerationIncludingGravity;if(e&&e.x!==null&&e.y!==null&&e.z!==null){this.motionData++;const i=-e.x/9.81,r=e.y/9.81,a=e.z/9.81;this.gx+=(i-this.gx)*.35,this.gy+=(r-this.gy)*.35,this.gz+=(a-this.gz)*.35,this.sensed=!0}const n=t.acceleration;if(n&&n.x!==null&&n.y!==null&&n.z!==null&&this.active){const i=Math.hypot(n.x,n.y,n.z);i>13&&this.shakeCd<=0&&this.shake(Math.min(2.4,i/13),-n.x,n.y,n.z)}}onOrient(t){t.beta===null||t.gamma===null||((this.baseBeta===null||this.baseGamma===null)&&(this.baseBeta=t.beta,this.baseGamma=t.gamma),this.tiltX=t.gamma-this.baseGamma,this.tiltY=t.beta-this.baseBeta)}shake(t,e=0,n=0,i=0){this.shakeCd=.12;const r=Math.hypot(e,n,i)||1;for(const a of this.bodies){const o=(a.kind==="myu"?.5:1)*t;a.vx+=(e/r*520+(Math.random()-.5)*700)*o,a.vy+=(n/r*520+(Math.random()-.5)*700-260)*o,a.vz+=(i/r*420+(Math.random()-.5)*600)*o,a.kind!=="myu"&&(a.wx+=(Math.random()-.5)*18*o,a.wy+=(Math.random()-.5)*18*o,a.wz+=(Math.random()-.5)*18*o)}this.squishMyu(1.3)}squishMyu(t=1){this.squishCd>0||(this.squishCd=.22,this.gl?.squish(t))}update(t,e){this.t+=e,this.onT+=e,this.shakeCd>0&&(this.shakeCd-=e),this.squishCd>0&&(this.squishCd-=e),this.flashT>0&&(this.flashT-=e);const n=t.screen;if(this.hw=Math.max(L/2,(n.viewR-n.viewL)/2),this.hh=Math.max(St/2,(n.viewB-n.viewT)/2),!this.save.toggled&&!this.toastShown&&this.onT>15&&(this.toastShown=!0,this.toastT=9,t.audio.chime()),this.toastT>0&&(this.toastT-=e),this.baseBeta!==null&&this.baseGamma!==null){const g=Math.min(1,e*.25);this.baseBeta+=this.tiltY*g,this.baseGamma+=this.tiltX*g}const i=this.finger?0:xn(-this.tiltX*3.2,-110,110),r=this.finger?0:xn(-this.tiltY*3.2,-110,110);this.eyeX+=(i+this.fingerDrag.dx-this.eyeX)*Math.min(1,e*6),this.eyeY+=(r+this.fingerDrag.dy-this.eyeY)*Math.min(1,e*6),this.fingerDrag.dx*=Math.exp(-e*2),this.fingerDrag.dy*=Math.exp(-e*2);const a=wa[this.gravityMode]?.mult??1,o=(this.sensed?this.gx:0)*ar*a,l=(this.sensed?this.gy:1)*ar*a,h=(this.sensed?this.gz:.35)*ar*a,c=ba[this.bounceMode]?.e??.7;if(this.rain)for(this.rainAcc+=e;this.rainAcc>.06;){this.rainAcc-=.06,this.bodies.length>=Ta&&this.bodies.splice(1,1);const g=this.heart((Math.random()-.5)*(this.hw*2-40),-this.hh+24,30+Math.random()*(Fn-60));g.vy=200,this.bodies.push(g)}this.acc=Math.min(this.acc+e,gh*Vv);const u=gh,f=Math.exp(-u*(a===0?.6:.25)),d=Math.exp(-u*.8);for(;this.acc>=u;){this.acc-=u;for(const g of this.bodies){g.contact=!1,g.vx+=o*u,g.vy+=l*u,g.vz+=h*u,a===0&&(g.vx+=Math.sin(this.t*.7+g.r)*14*u,g.vy+=Math.cos(this.t*.5+g.r*1.3)*14*u),g.vx*=f,g.vy*=f,g.vz*=f,g.wx*=d,g.wy*=d,g.wz*=d;const v=Math.hypot(g.vx,g.vy,g.vz);if(v>vh){const m=vh/v;g.vx*=m,g.vy*=m,g.vz*=m}g.x+=g.vx*u,g.y+=g.vy*u,g.z+=g.vz*u,this.walls(t,g,c)}this.collide(c),this.collide(c)}for(const g of this.bodies)g.kind==="myu"?this.orientMyu(g,e,o,l):Wv(g,e);this.gl&&(this.gl.look=this.finger?{x:this.finger.x-Sa,y:this.finger.y-xa}:null)}orientMyu(t,e,n,i){const r=-n,a=i;if(Math.hypot(r,a)>ar*.25){let c=Math.atan2(-r,a)-this.myuRoll;c=Math.atan2(Math.sin(c),Math.cos(c)),this.myuRoll+=c*Math.min(1,e*5)}const o=xn(t.vx*6e-4,-.35,.35),l=xn(-t.vz*5e-4+t.vy*3e-4,-.35,.35);this.tmpE.set(l,o,this.myuRoll,"ZXY"),this.tmpQ.setFromEuler(this.tmpE),t.qx=this.tmpQ.x,t.qy=this.tmpQ.y,t.qz=this.tmpQ.z,t.qw=this.tmpQ.w}walls(t,e,n){const i=e.r,r=this.hw,a=this.hh;let o=0;const l=f=>Math.abs(f)<_h?0:Math.abs(f)*n;let h=0,c=0,u=0;if(e.x<-r+i&&(e.x=-r+i,o=Math.max(o,-e.vx),e.vx=l(e.vx),h=1),e.x>r-i&&(e.x=r-i,o=Math.max(o,e.vx),e.vx=-l(e.vx),h=-1),e.y<-a+i&&(e.y=-a+i,o=Math.max(o,-e.vy),e.vy=l(e.vy),c=-1),e.y>a-i&&(e.y=a-i,o=Math.max(o,e.vy),e.vy=-l(e.vy),c=1),e.z>Fn-i&&(e.z=Fn-i,o=Math.max(o,e.vz),e.vz=-l(e.vz),u=1),e.z<i&&(e.vz<-260&&e.kind!=="myu"&&Math.random()<.35&&t.audio.typeTick(),e.z=i,o=Math.max(o,-e.vz),e.vz=l(e.vz),u=-1),h||c||u){e.contact=!0;const f=e.vx,d=-e.vy,g=-e.vz,v=(c*g-u*d)/i,m=(u*f-h*g)/i,p=(h*d-c*f)/i;e.wx+=(v-e.wx)*.08,e.wy+=(m-e.wy)*.08,e.wz+=(p-e.wz)*.08,e.vx*=.9995,e.vy*=.9995,e.vz*=.9995}e.kind==="myu"&&o>520&&this.squishMyu(Math.min(1.6,o/700))}collide(t){const e=this.bodies,n=Math.ceil(this.hw*2/Li)+1,i=Math.ceil(this.hh*2/Li)+1,r=Math.ceil(Fn/Li)+1,a=n*i*r,o=this.grid;for(;o.length<a;)o.push([]);for(let c=0;c<a;c++)o[c].length=0;const l=c=>[xn(Math.floor((c.x+this.hw)/Li),0,n-1),xn(Math.floor((c.y+this.hh)/Li),0,i-1),xn(Math.floor(c.z/Li),0,r-1)];for(let c=1;c<e.length;c++){const[u,f,d]=l(e[c]);o[(d*i+f)*n+u].push(c)}const h=e[0];if(h)for(let c=1;c<e.length;c++)this.pair(h,e[c],t);for(let c=1;c<e.length;c++){const u=e[c],[f,d,g]=l(u);for(let v=-1;v<=1;v++){const m=g+v;if(!(m<0||m>=r))for(let p=-1;p<=1;p++){const T=d+p;if(!(T<0||T>=i))for(let M=-1;M<=1;M++){const y=f+M;if(!(y<0||y>=n))for(const k of o[(m*i+T)*n+y])k>c&&this.pair(u,e[k],t)}}}}}pair(t,e,n){const i=e.x-t.x,r=e.y-t.y,a=e.z-t.z,o=t.r+e.r,l=i*i+r*r+a*a;if(l>=o*o||l<1e-6)return;const h=Math.sqrt(l),c=i/h,u=r/h,f=a/h,d=o-h,g=1/t.m,v=1/e.m,m=g+v;t.x-=c*d*(g/m),t.y-=u*d*(g/m),t.z-=f*d*(g/m),e.x+=c*d*(v/m),e.y+=u*d*(v/m),e.z+=f*d*(v/m);const p=(e.vx-t.vx)*c+(e.vy-t.vy)*u+(e.vz-t.vz)*f;if(p>0)return;const M=-(1+(-p<_h?0:n*.8))*p/m;if(t.vx-=M*c*g,t.vy-=M*u*g,t.vz-=M*f*g,e.vx+=M*c*v,e.vy+=M*u*v,e.vz+=M*f*v,-p>200){const y=Math.min(1,-p/1500)*6;for(const k of[t,e])k.kind!=="myu"&&(k.wx+=(Math.random()-.5)*y,k.wy+=(Math.random()-.5)*y,k.wz+=(Math.random()-.5)*y)}(t.kind==="myu"||e.kind==="myu")&&-p>650&&this.squishMyu(Math.min(1.6,-p/900))}buttons(){const t=St-74,e=["heart","star","gravity","bounce","rain","shake","gear"],n=48,i=6,r=(L-(e.length*n+(e.length-1)*i))/2;return e.map((a,o)=>({id:a,x:r+o*(n+i),y:t,w:n,h:50}))}settingsRows(){return[{id:"toggle",x:45,y:330,w:L-90,h:54},{id:"close",x:45,y:396,w:L-90,h:48}]}onDown(t,e){if(this.askPermission(),this.settingsOpen)return;const n=this.buttons().find(i=>yh(i,e));if(n){this.btnFinger=e.id,this.press(t,n.id);return}this.finger={id:e.id,x:e.x,y:e.y},this.poke(t,e.x,e.y,!0)}onMove(t,e){!this.finger||this.finger.id!==e.id||(this.finger.x=e.x,this.finger.y=e.y,this.sensed||(this.fingerDrag.dx=xn(this.fingerDrag.dx-e.dx*.6,-110,110),this.fingerDrag.dy=xn(this.fingerDrag.dy-e.dy*.6,-110,110)),this.poke(t,e.x,e.y,!1,e.dx,e.dy))}onUp(t,e){if(this.btnFinger===e.id){this.btnFinger=null;return}if(this.settingsOpen){const n=this.settingsRows().find(i=>yh(i,e));n?.id==="toggle"?this.setOn(t,!this.save.on):(n?.id==="close"||e.y<270||e.y>500)&&(this.settingsOpen=!1,t.audio.pop());return}this.finger?.id===e.id&&(this.finger=null)}onCancel(t,e){this.btnFinger===e.id&&(this.btnFinger=null),this.finger?.id===e.id&&(this.finger=null)}press(t,e){switch(this.flashBtn=e,this.flashT=.18,e){case"heart":this.add("heart",8),t.audio.sparkle();break;case"star":this.add("star",5),t.audio.chime();break;case"gravity":this.gravityMode=(this.gravityMode+1)%wa.length,t.audio.whoosh();break;case"bounce":this.bounceMode=(this.bounceMode+1)%ba.length,t.audio.pop();break;case"rain":this.rain=!this.rain,t.audio.sparkle();break;case"shake":this.shake(1.4),t.audio.thump(.35);break;case"gear":this.settingsOpen=!0,t.audio.pop();break}}poke(t,e,n,i,r=0,a=0){for(const o of this.bodies){const l=this.project(o.x,o.y,o.z),h=o.r*l.s,c=l.x-e,u=l.y-n,f=Math.hypot(c,u),d=h+(i?14:30);if(f>d)continue;const g=1-f/d,v=f>.01?c/f:0,m=f>.01?u/f:-1;if(o.kind==="myu"){i&&(this.squishMyu(1.2),t.audio.voice(.9,2)),o.vx+=(v*120+r*6)*g,o.vy+=(m*120+a*6)*g;continue}o.vx+=(v*(i?520:180)+r*22)*g,o.vy+=(m*(i?520:180)+a*22)*g,o.vz+=(i?520:140)*g,o.wx+=(Math.random()-.5)*12*g,o.wy+=(Math.random()-.5)*12*g}}project(t,e,n){const i=Ma/(Ma+n);return{x:Sa+this.eyeX+(t-this.eyeX)*i,y:xa+this.eyeY+(e-this.eyeY)*i,s:i}}setLayers(t,e){if(e===this.shown)return;this.shown=e,e&&!this.gl&&(this.gl=new Hv,this.overlay=document.createElement("canvas"),Object.assign(this.overlay.style,{position:"fixed",left:"0",top:"0",zIndex:"2",pointerEvents:"none"}),document.body.appendChild(this.overlay),this.octx=this.overlay.getContext("2d")),this.gl?.show(e),this.overlay&&(this.overlay.style.display=e?"block":"none");const n=t.screen.canvas.style;n.opacity=e?"0":"",n.zIndex=e?"3":""}hide(t){this.setLayers(t,!1)}lastFrame=0;frame(t){const e=performance.now(),n=this.lastFrame?Math.min(.05,(e-this.lastFrame)/1e3):1/60;this.lastFrame=e,this.setLayers(t,!0);const i=this.gl,r=this.overlay,a=this.octx;if(!i||!r||!a)return null;const o=t.screen,l=parseFloat(o.canvas.style.width)||window.innerWidth,h=parseFloat(o.canvas.style.height)||window.innerHeight;i.resize(l,h),i.render({hw:this.hw,hh:this.hh,depth:Fn,ex:this.eyeX,ey:this.eyeY,f:Ma},this.bodies,n,e);const c=i.pixelRatio,u=Math.round(l*c),f=Math.round(h*c);(r.width!==u||r.height!==f)&&(r.width=u,r.height=f,r.style.width=`${l}px`,r.style.height=`${h}px`),a.setTransform(1,0,0,1,0,0),a.clearRect(0,0,u,f);const d=o.scale/o.dpr*c;return a.setTransform(d,0,0,d,o.ox/o.dpr*c,o.oy/o.dpr*c),this.drawButtons(a),this.toastT>0&&this.drawToast(a),this.settingsOpen&&this.drawSettings(t,a),a}drawButtons(t){for(const e of this.buttons()){const n=e.id==="rain"&&this.rain||this.flashBtn===e.id&&this.flashT>0;t.save(),t.shadowColor="rgba(40,60,90,0.18)",t.shadowBlur=10,t.shadowOffsetY=3,t.fillStyle=n?"#ff6fa8":"rgba(255,255,255,0.88)",vt(t,e.x,e.y,e.w,e.h,14),t.fill(),t.restore(),t.strokeStyle=n?"#ff6fa8":"#d3dae6",t.lineWidth=1.5,vt(t,e.x+.75,e.y+.75,e.w-1.5,e.h-1.5,13.5),t.stroke();const i=e.x+e.w/2,r=e.y+e.h/2-6,a=n?"#ffffff":"#3d4656";t.fillStyle=e.id==="heart"&&!n?"#ff6fa8":a,t.strokeStyle=a;let o="";switch(e.id){case"heart":li(t,i,r-8,10),t.fill(),o="+♡";break;case"star":t.fillStyle=n?"#fff":"#f2b632",ae(t,i,r,10),t.fill(),o="+☆";break;case"gravity":o=wa[this.gravityMode]?.label??"",Xv(t,i,r,this.gravityMode);break;case"bounce":o=ba[this.bounceMode]?.label??"",qv(t,i,r,this.bounceMode);break;case"rain":o="rain";for(let l=-1;l<=1;l++)li(t,i+l*9,r-6+(l===0?5:0),4.5),t.fill();break;case"shake":o="shake",Yv(t,i,r);break;case"gear":$v(t,i,r+6);break}o&&Yt(t,o,i,e.y+e.h-10,9.5,n?"#ffffff":"#3d4656","center",800)}}drawToast(t){const e=Math.min(1,this.toastT/.5,(9-this.toastT)/.4);t.save(),t.globalAlpha=Math.max(0,e);const n=26,i=46-(1-Math.min(1,(9-this.toastT)/.4))*20,r=L-52,a=86;t.shadowColor="rgba(40,60,90,0.2)",t.shadowBlur=18,t.fillStyle="rgba(255,255,255,0.97)",vt(t,n,i,r,a,16),t.fill(),t.shadowColor="transparent",t.strokeStyle="#d3dae6",t.lineWidth=1.5,vt(t,n+.75,i+.75,r-1.5,a-1.5,15),t.stroke(),t.font=$t(9.5,700),t.fillStyle="#7d8798",t.textAlign="left",t.textBaseline="middle",t.fillText("CRADLE/OS · settings updated",n+16,i+17),Yt(t,"✦ new: SANDBOX MODE is now a setting.",n+16,i+40,13,"#2d3442","left",800),Yt(t,"you can switch it off in ⚙.",n+16,i+59,12,"#2d3442","left",700),Yt(t,"(you didn't turn this on.)",n+r-16,i+74,9.5,"#9aa3b2","right",600,!0),t.restore()}drawSettings(t,e){const n=t.screen;e.fillStyle="rgba(20,28,40,0.32)",e.fillRect(n.viewL,n.viewT,n.viewR-n.viewL,n.viewB-n.viewT),e.save(),e.shadowColor="rgba(40,60,90,0.25)",e.shadowBlur=24,e.fillStyle="#ffffff",vt(e,33,270,L-66,226,22),e.fill(),e.restore(),Yt(e,"settings",L/2,298,18,"#2d3442","center",800);for(const i of this.settingsRows())if(e.fillStyle="#f4f6fa",vt(e,i.x,i.y,i.w,i.h,13),e.fill(),e.strokeStyle="#d3dae6",e.lineWidth=1.5,vt(e,i.x,i.y,i.w,i.h,13),e.stroke(),i.id==="toggle"){Yt(e,"SANDBOX MODE",i.x+18,i.y+i.h/2,15,"#2d3442","left",800);const r=i.x+i.w-62,a=i.y+i.h/2-13;e.fillStyle=this.save.on?"#ff6fa8":"#c9d0dc",vt(e,r,a,46,26,13),e.fill(),e.fillStyle="#ffffff",e.beginPath(),e.arc(this.save.on?r+33:r+13,a+13,10,0,Math.PI*2),e.fill()}else Yt(e,"close",i.x+18,i.y+i.h/2,15,"#2d3442","left",800);Yt(e,this.sensorStatus(),L/2,476,11,"#8a94a6","center",600)}sensorStatus(){const t=typeof location<"u"?location.protocol.replace(":",""):"?",e=typeof window<"u"&&window.isSecureContext;return this.motionData>0?"sensors · live ✓":this.motionEvents>0?`sensors · events arrive but carry no data (${t})`:e?typeof DeviceMotionEvent>"u"?`sensors · this browser has none (${t})`:`sensors · no events from the phone yet (${t})`:`sensors · blocked: page isn't secure (${t})`}}function Wv(s,t){const{wx:e,wy:n,wz:i}=s;let{qx:r,qy:a,qz:o,qw:l}=s;const h=e*t*.5,c=n*t*.5,u=i*t*.5,f=r+(h*l+c*o-u*a),d=a+(c*l+u*r-h*o),g=o+(u*l+h*a-c*r),v=l-(h*r+c*a+u*o),m=Math.hypot(f,d,g,v)||1;r=f/m,a=d/m,o=g/m,l=v/m,s.qx=r,s.qy=a,s.qz=o,s.qw=l}function Xv(s,t,e,n){if(s.lineWidth=2.4,s.lineCap="round",n===2){for(let r=-1;r<=1;r++)s.beginPath(),s.arc(t+r*8,e-2+(r===0?-4:2),2.6,0,Math.PI*2),s.fill();return}const i=n===0?14:8;s.beginPath(),s.moveTo(t,e-9),s.lineTo(t,e-9+i),s.stroke(),s.beginPath(),s.moveTo(t-5,e-9+i-5),s.lineTo(t,e-9+i),s.lineTo(t+5,e-9+i-5),s.stroke()}function qv(s,t,e,n){s.lineWidth=2,s.beginPath();const i=4+n*3;s.moveTo(t-12,e+5),s.quadraticCurveTo(t-6,e+5-i*2,t,e+5),s.quadraticCurveTo(t+5,e+5-i*1.3,t+10,e+5),s.stroke(),s.beginPath(),s.arc(t+11,e+2,3,0,Math.PI*2),s.fill()}function Yv(s,t,e){s.lineWidth=2.2,s.lineCap="round";for(const n of[-1,1])s.beginPath(),s.moveTo(t+n*9,e-8),s.quadraticCurveTo(t+n*13,e-4,t+n*9,e),s.quadraticCurveTo(t+n*5,e+4,t+n*9,e+8),s.stroke();vt(s,t-4,e-7,8,14,2.5),s.fill()}function $v(s,t,e){s.save(),s.lineWidth=3,s.beginPath(),s.arc(t,e,7,0,Math.PI*2),s.stroke();for(let n=0;n<8;n++){const i=n*Math.PI/4;s.beginPath(),s.moveTo(t+Math.cos(i)*8,e+Math.sin(i)*8),s.lineTo(t+Math.cos(i)*12,e+Math.sin(i)*12),s.stroke()}s.restore()}function yh(s,t){return t.x>=s.x&&t.x<=s.x+s.w&&t.y>=s.y&&t.y<=s.y+s.h}function xn(s,t,e){return Math.max(t,Math.min(e,s))}const jv=25,fs=38,ds=132,en=L-76,hs=124,wn={x:fs+en-40,y:ds+6,w:34,h:30},Mh=["#ff8fb8","#ffb7d2","#ffd1e6","#c9b8ff","#ffc3a8","#a8e6d9"],Kv=typeof location<"u"&&/[?&]soon(=|&|$)/.test(location.search);class Zv{constructor(t,e){this.sandbox=t,this.isHome=e,this.phone=typeof matchMedia=="function"&&matchMedia("(pointer: coarse)").matches,(!this.phone||t.save.unlocked)&&(this.phase="done")}phase="waiting";dueIn=Kv?8+Math.random()*4:120+Math.random()*240;attempts=0;rotatedOnce=!1;lastRot=0;phone;drag=null;offX=0;offY=0;selT=0;wobble=0;fallT=0;shatterT=0;shards=[];snap=null;snapXf={scale:1,ox:0,oy:0};t=0;get shattering(){return this.phase==="shatter"}showNow(){!this.phone||this.sandbox.save.unlocked||(this.phase==="waiting"||this.phase==="done")&&(this.phase="shown",this.attempts=0)}visible(){return this.phase==="shown"&&this.isHome()||this.phase==="falling"}update(t,e){if(this.t+=e,this.selT>0&&(this.selT-=e),this.wobble*=Math.exp(-e*5),t.screen.rot!==this.lastRot&&(t.screen.rot!==0&&(this.rotatedOnce=!0),this.phase==="shown"&&this.attempt(t),this.lastRot=t.screen.rot),this.phase==="waiting"){t.state.has("named")&&this.isHome()&&!t.dialogue.active&&(this.dueIn-=e),this.dueIn<=0&&(this.phase="shown",t.audio.typeTick());return}if(this.phase==="shown"){this.drag||(this.offX*=Math.exp(-e*12),this.offY*=Math.exp(-e*12));return}if(this.phase==="falling"){this.fallT+=e,this.fallT>=.75&&this.beginShatter(t);return}if(this.phase==="shatter"){this.shatterT+=e;for(const n of this.shards)n.vy+=1700*e,n.x+=n.vx*e,n.y+=n.vy*e,n.rot+=n.spin*e;this.shatterT>1.35&&(this.phase="done",this.shards=[],this.snap=null)}}onDown(t,e){return!this.visible()||this.phase!=="shown"?this.phase==="falling"||this.phase==="shatter":this.hit(e.x,e.y)?(this.drag={id:e.id,x0:e.x,y0:e.y,moved:!1},!0):!1}onMove(t,e){if(!this.drag||this.drag.id!==e.id)return!1;const n=e.x-this.drag.x0,i=e.y-this.drag.y0;return Math.hypot(n,i)>8&&(this.drag.moved=!0),this.offX=Sh(n,26),this.offY=Sh(i,20),!0}onUp(t,e){if(!this.drag||this.drag.id!==e.id)return this.phase==="falling"||this.phase==="shatter";const n=this.drag.moved;return this.drag=null,n?(t.audio.thump(.18),this.attempt(t)):Jv(wn,e.x-this.offX,e.y-this.offY,8)&&(this.selT=.9,t.audio.error(),this.attempt(t)),!0}onCancel(t){this.drag?.id===t.id&&(this.drag=null)}attempt(t){this.attempts++,this.wobble=.6+this.attempts*.05,this.attempts>=jv&&(this.phase="falling",this.fallT=0,t.audio.whoosh())}hit(t,e){return t>=fs+this.offX&&t<=fs+en+this.offX&&e>=ds+this.offY&&e<=ds+hs+this.offY}beginShatter(t){const e=t.screen.canvas,n=document.createElement("canvas");n.width=e.width,n.height=e.height,n.getContext("2d")?.drawImage(e,0,0),this.snap=n,this.snapXf={scale:t.screen.scale,ox:t.screen.ox,oy:t.screen.oy};const i=6,r=13,a=L/i,o=St/r;this.shards=[];for(let l=0;l<r;l++)for(let h=0;h<i;h++){const c=(h+.5)*a,u=(l+.5)*o,f=(c-L/2)/(L/2);this.shards.push({sx:h*a,sy:l*o,x:c,y:u,vx:f*260+(Math.random()-.5)*220,vy:-180-Math.random()*420+l/r*160,rot:0,spin:(Math.random()-.5)*7,size:Math.max(a,o)*.62,color:Mh[(l*7+h*3)%Mh.length]??"#ff8fb8"})}this.phase="shatter",this.shatterT=0,t.audio.crack(),t.audio.staticBurst(.12),t.fx.flash("#ffffff",.18),this.sandbox.unlockFrom(this.shards.map(l=>({x:l.x,y:l.y,vx:l.vx*.6,vy:l.vy*.4,color:l.color}))),t.audio.sparkle()}draw(t,e){if(this.phase==="shatter")return this.drawShatter(t,e);if(!this.visible())return;const n=this.phase==="falling"?Math.min(1,this.fallT/.75):0,i=n*n,r=Math.min(.62,.36+this.attempts*.01)*(1-i*.2)+i*.35;e.save(),e.globalAlpha=r;const a=fs+en/2+this.offX,o=ds+hs+this.offY+i*420,l=Math.sin(this.t*38)*this.wobble*.02;e.translate(a,o),e.rotate(l+i*.25),e.transform(1,0,-i*.5,Math.max(.05,Math.cos(i*Math.PI*.5)),0,0),e.scale(1+i*.35,1+i*.35),e.translate(-en/2,-hs),e.fillStyle="#f4f1f7",vt(e,0,0,en,hs,12),e.fill(),e.fillStyle="#d9d0e3",vt(e,0,0,en,36,12),e.fill(),e.fillRect(0,24,en,12),e.strokeStyle="#8f7fa0",e.lineWidth=1.5,vt(e,.75,.75,en-1.5,hs-1.5,12),e.stroke(),e.font=$t(10.5,700),e.fillStyle="#4a3d58",e.textAlign="left",e.textBaseline="middle",e.fillText("⚠ CRADLE/OS — display notice",12,18);const h={x:wn.x-fs,y:wn.y-ds};e.strokeStyle="#4a3d58",e.lineWidth=2,e.lineCap="round";const c=h.x+wn.w/2,u=h.y+wn.h/2;if(e.beginPath(),e.moveTo(c-5,u-5),e.lineTo(c+5,u+5),e.moveTo(c+5,u-5),e.lineTo(c-5,u+5),e.stroke(),this.selT>0&&(e.save(),e.setLineDash([3,3]),e.lineDashOffset=-this.t*30,e.strokeStyle="#3a62d8",e.lineWidth=1.5,e.strokeRect(h.x+2,h.y+2,wn.w-4,wn.h-4),e.fillStyle=nt(58,98,216,.14),e.fillRect(h.x+2,h.y+2,wn.w-4,wn.h-4),e.restore()),Yt(e,"LULLABYTE is designed for landscape.",16,58,13.5,"#3b3046","left",800),Yt(e,"please rotate your device. ⟳",16,79,13,"#3b3046","left",700),this.rotatedOnce){const f=Math.min(99,60+this.attempts*1.6);e.fillStyle="#d9d0e3",vt(e,16,96,en-32,9,4.5),e.fill(),e.fillStyle="#8fb7ff",vt(e,16,96,(en-32)*(f/100),9,4.5),e.fill(),e.font=$t(9,600),e.fillStyle="#6a5c78",e.textAlign="right",e.fillText(`applying… ${Math.floor(f)}%`,en-16,115)}else e.font=$t(9,600),e.fillStyle="#6a5c78",e.textAlign="left",e.fillText("code 0x2D · orientation mismatch",16,106);e.restore()}drawShatter(t,e){const n=this.snapXf,i=this.shatterT,r=this.snap;if(i<.08&&r){e.drawImage(r,-n.ox/n.scale,-n.oy/n.scale,r.width/n.scale,r.height/n.scale);return}const a=Math.min(1,Math.max(0,(i-.12)/.7)),o=Math.max(0,1-Math.max(0,i-.75)/.6),l=L/6,h=St/13;for(const c of this.shards){const u=c.size*(1-a*.35);if(e.save(),e.globalAlpha=o,e.translate(c.x,c.y),e.rotate(c.rot),li(e,0,-u*.55,u),e.save(),e.clip(),r&&a<1){e.globalAlpha=o*(1-a);const f=n.ox+c.sx*n.scale-(c.size-l/2)*n.scale,d=n.oy+c.sy*n.scale-(c.size-h/2)*n.scale;e.drawImage(r,f,d,c.size*2*n.scale,c.size*2*n.scale,-c.size,-c.size,c.size*2,c.size*2)}e.globalAlpha=o*a,e.fillStyle=c.color,e.fillRect(-u*1.2,-u*1.2,u*2.4,u*2.4),e.restore(),e.strokeStyle=nt(255,255,255,.7*o),e.lineWidth=1.5,e.stroke(),e.restore()}}}function Sh(s,t){return Math.sign(s)*t*(1-Math.exp(-Math.abs(s)/(t*1.6)))}function Jv(s,t,e,n=0){return t>=s.x-n&&t<=s.x+s.w+n&&e>=s.y-n&&e<=s.y+s.h+n}const yc=document.getElementById("c"),Bn=new Ec(yc),Mc=new Cc(yc,Bn),Wi=new Ic,$e=new Fc,Ot=new Zc,Oo=new Th,an=new Jc,Sc=new eu(Date.now()%1e5),Ie=new nu,Qv=new Dc((Ot.save.seed^Ot.save.visits*2654435761)>>>0);Wi.muted=Ot.save.muted;const ee={screen:Bn,input:Mc,audio:Wi,fx:$e,state:Ot,scenes:Ie,dialogue:an,director:Sc,myu:Oo,rng:Qv,session:new Set,t:0,now:()=>Date.now(),hour:()=>new Date().getHours(),pal:()=>$e.palette()},we=new Gv;we.active&&we.listen();ee.sandbox=we;const un=new Zv(we,()=>Ie.current instanceof on&&!an.active);$e.setStage(Ot.save.stage);Oo.freckle=Ot.residual().freckle;Mc.handler={onDown(s){if(Wi.unlock(),we.active){un.shattering||we.onDown(ee,s);return}un.onDown(ee,s)||an.active||Ie.transitioning||Ie.current?.onDown?.(ee,s)},onMove(s){if(we.active){we.onMove(ee,s);return}un.onMove(ee,s)||an.active||Ie.transitioning||Ie.current?.onMove?.(ee,s)},onUp(s){if(we.active){we.onUp(ee,s);return}if(!un.onUp(ee,s)){if(an.active){an.onUp(ee,s);return}Ie.transitioning||Ie.current?.onUp?.(ee,s)}},onCancel(s){we.onCancel(ee,s),un.onCancel(s),Ie.current?.onCancel?.(ee,s)}};document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden")an.active&&Ot.has("named")&&!Ot.has("leftMidTalk")&&Ot.flag("leftMidTalk"),Ot.save.lastSeen=Date.now(),Ot.persist(),Wi.sleep();else{Wi.wake(),an.active&&Ot.has("leftMidTalk")&&Ot.unflag("leftMidTalk");const s=Date.now()-Ot.save.lastSeen;s>6e4&&Ot.applyBackgroundGap(s)&&Ot.has("named")&&!an.active&&!(Ie.current instanceof Ah)&&(ee.session.clear(),Ie.go(ee,new on))}});const xc=new Rc(s=>{if(ee.t=xc.t,Ot.tick(s),$e.update(s),Wi.corruption=$e.corruption(),un.update(ee,s),we.active){we.update(ee,s);return}Oo.update(s,ee.t),an.update(ee,s),Sc.update(ee,s),Ie.update(ee,s)},()=>{const s=Bn.ctx;if(we.active){const t=we.frame(ee);t&&(un.draw(ee,t),$e.drawFlash(t));return}we.hide(ee),Bn.raw(),$e.drawMargins(Bn,$e.marginStars||Ot.has("modeWake")?ee.t:null),Bn.begin(),s.save(),$e.applyShake(s),Ie.current?.draw(ee,s),an.draw(ee,s),s.restore(),Ie.drawFade(s,L,St),un.draw(ee,s),$e.designPost(s),Bn.raw(),$e.rawPost(Bn)});Ie.go(ee,new Ku,{instant:!0});xc.start();window.__lb={g:ee,stage(s){Ot.save.stage=Math.max(0,Math.min(4,s)),s>=1&&!Ot.has("named")&&(Ot.save.name||(Ot.save.name="MYU"),Ot.flag("named"),Ot.flag("met")),s>=3&&Ot.flag("dreamMode"),s>=4&&Ot.flag("backstage"),Ot.save.bond<[0,0,20,45,75][s]&&(Ot.save.bond=[0,0,20,45,75][s]),Ot.persist(),$e.setStage(s)},bond(s){Ot.save.bond=s,Ot.persist()},ending(s){Ot.has("named")||(Ot.save.name="Mochi",Ot.flag("named"),Ot.flag("met")),Ot.recordEnding(s),Ot.flag("revealDone"),s==="wake"&&Ot.flag("modeWake"),s==="stay"&&Ot.flag("modeStay"),Ot.persist()},sandbox:we,lie:un,showLie(){un.showNow()},mochi(s=1,t=0){Ot.save.mochi.phase=Math.max(0,Math.min(4,s)),Ot.save.mochi.trust=t,s>=2&&(Ot.save.mochi.hauntCount=4),s>=4&&(Ot.save.mochi.reunited=!0),Ot.persist()}};!(typeof __SINGLE_FILE__<"u"&&__SINGLE_FILE__)&&"serviceWorker"in navigator&&location.protocol==="https:"&&window.addEventListener("load",()=>{navigator.serviceWorker.register("./sw.js").catch(()=>{})});
