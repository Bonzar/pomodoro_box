if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let t={};const c=e=>n(e,o),d={module:{uri:o},exports:t,require:c};i[o]=Promise.all(s.map((e=>d[e]||c(e)))).then((e=>(r(...e),t)))}}define(["./workbox-fa446783"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-a998e321.js",revision:null},{url:"assets/index-d9eef318.css",revision:null},{url:"index.html",revision:"49e743e316cb1bb3364b83d93d5a476c"},{url:"registerSW.js",revision:"ef3953b2a15bbfa1fbeff9e31c2ddb59"},{url:"pwa-64x64.png",revision:"4a82ec627d1fe15ceb328b5f0d4626b2"},{url:"pwa-192x192.png",revision:"1bba893c4134a208b5ceb9c8f7e8d7dc"},{url:"pwa-512x512.png",revision:"098f299408ee9dcd7ecf461873a9678e"},{url:"maskable-icon-512x512.png",revision:"c8ebd3141216771a9bae244cf6d5d4bf"},{url:"manifest.webmanifest",revision:"b1f798862c8bbf12db87a0fc03825ee1"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
