if(!self.define){let s,e={};const l=(l,i)=>(l=new URL(l+".js",i).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(i,r)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let c={};const u=s=>l(s,n),o={module:{uri:n},exports:c,require:u};e[n]=Promise.all(i.map((s=>o[s]||u(s)))).then((s=>(r(...s),c)))}}define(["./workbox-5b385ed2"],(function(s){"use strict";s.setCacheNameDetails({prefix:"ticketshow-vue"}),self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"css/121.d61ccda2.css",revision:null},{url:"css/425.017622fc.css",revision:null},{url:"css/527.cdfe3f12.css",revision:null},{url:"css/784.d8fbe2a6.css",revision:null},{url:"css/app.530fc568.css",revision:null},{url:"css/chunk-vendors.ee2608ac.css",revision:null},{url:"index.html",revision:"8b74fe59b5c5f45d0a927ce791ffd6b9"},{url:"js/121.7cbad111.js",revision:null},{url:"js/290.3cf6b380.js",revision:null},{url:"js/425.6302e2a1.js",revision:null},{url:"js/527.9cd025eb.js",revision:null},{url:"js/708.7acc8bcd.js",revision:null},{url:"js/784.e0dae391.js",revision:null},{url:"js/app.b14d460f.js",revision:null},{url:"manifest.json",revision:"0a83ce4fd3dd56b6390ea06be31ef5eb"},{url:"robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
