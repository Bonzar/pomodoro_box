if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const f=e||("document"in self?document.currentScript.src:"")||location.href;if(i[f])return;let o={};const t=e=>n(e,f),l={module:{uri:f},exports:o,require:t};i[f]=Promise.all(s.map((e=>l[e]||t(e)))).then((e=>(r(...e),o)))}}define(["./workbox-6f8d8d85"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-82f15bba.js",revision:null},{url:"assets/index-a90b4a66.css",revision:null},{url:"index.html",revision:"15e8e7e2ea3638ca5b87c8218377efa1"},{url:"registerSW.js",revision:"ef3953b2a15bbfa1fbeff9e31c2ddb59"},{url:"pwa-64x64.png",revision:"39e7bf429228e51126d6dd8c17995958"},{url:"pwa-192x192.png",revision:"3223006e12604279f804584276bff457"},{url:"pwa-512x512.png",revision:"ae54835724bc71f639691973fdf3ae7b"},{url:"maskable-icon-512x512.png",revision:"b677bd6170f1b0d47c40b8f1f7799b03"},{url:"manifest.webmanifest",revision:"5685b8cdcbf3db6e51139fd15763bb1e"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
