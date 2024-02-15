import{S as L,i as n,a as w}from"./assets/vendor-5401a4b0.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();const S=document.querySelector(".form"),l=document.querySelector(".gallery"),d=document.querySelector("input"),i=document.querySelector(".load-more");let u="",y=1,f=0,p=0;const $=new L(".gallery a",{captions:!0,captionType:"attr",captionsData:"alt",captionPosition:"bottom",captionSelector:"img",captionDelay:250});function g(){const r=document.createElement("span");r.classList.add("loader"),i.parentNode.insertBefore(r,i.nextSibling)}function h(){const r=document.querySelector(".loader");r&&r.remove()}function v(){i.style.display="block"}function q(){i.style.display="none"}S.addEventListener("submit",async r=>{if(r.preventDefault(),u=d.value.trim(),u===""){n.error({message:"Your request is missing. Please fill out the form",position:"topCenter"});return}l.innerHTML="",g();try{await b()}catch(a){n.error({message:`An error occurred: ${a.message}`,position:"topCenter"})}finally{h()}d.value=""});async function b(){const t=`https://pixabay.com/api/?key=42356211-e192fc2ea90e5ac732e43fabf&q=${u}&image_type=photo&orientation=horizontal&safesearch=true&page=${y}&per_page=15`;try{const s=await w.get(t);!s.data.hits||s.data.hits.length===0?n.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topCenter"}):(f=s.data.totalHits,P(s.data),l.querySelectorAll(".gallery-item").length<f?(v(),m()):(q(),m(),n.info({message:"We're sorry, but you've reached the end of search results.",position:"topCenter"})))}catch{throw new Error("Failed to fetch images from the server")}}function P(r){const a=r.hits.map(t=>`
      <li class="gallery-item">
        <a href="${t.largeImageURL}">
          <img class="gallery-image" src="${t.webformatURL}" alt="${t.tags}">
        </a>
        <p><b>Likes: </b>${t.likes}</p>
        <p><b>Views: </b>${t.views}</p>
        <p><b>Comments: </b>${t.comments}</p>
        <p><b>Downloads: </b>${t.downloads}</p>
      </li>`).join("");if(l.insertAdjacentHTML("beforeend",a),p===0){const t=l.querySelector(".gallery-item");if(t){const{height:s}=t.getBoundingClientRect();p=s}}$.refresh()}function m(){window.scrollBy({top:p*2,behavior:"smooth"})}i.addEventListener("click",async()=>{y++,g();try{await b()}catch(r){n.error({message:`An error occurred: ${r.message}`,position:"topCenter"})}finally{h()}});
//# sourceMappingURL=commonHelpers.js.map
