if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let o={};const t=e=>n(e,c),f={module:{uri:c},exports:o,require:t};i[c]=Promise.all(s.map((e=>f[e]||t(e)))).then((e=>(r(...e),o)))}}define(["./workbox-fa446783"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-e0caab2c.js",revision:null},{url:"assets/index-e43a5fad.css",revision:null},{url:"index.html",revision:"57239ae1c04908aff8c48e7773ec0247"},{url:"registerSW.js",revision:"ef3953b2a15bbfa1fbeff9e31c2ddb59"},{url:"pwa-64x64.png",revision:"4a82ec627d1fe15ceb328b5f0d4626b2"},{url:"pwa-192x192.png",revision:"1bba893c4134a208b5ceb9c8f7e8d7dc"},{url:"pwa-512x512.png",revision:"098f299408ee9dcd7ecf461873a9678e"},{url:"maskable-icon-512x512.png",revision:"c8ebd3141216771a9bae244cf6d5d4bf"},{url:"manifest.webmanifest",revision:"b1f798862c8bbf12db87a0fc03825ee1"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
