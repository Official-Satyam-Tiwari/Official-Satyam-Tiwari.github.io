(()=>{const el=document.getElementById('worldmap');if(!el)return;
const P=[
[50.0647,19.9450,'h','Kraków, Poland','PhD at Jagiellonian University (J-PET)<br>JS2026 · J-PET General Meetings · MCSB 2026 · New Trends 2025'],
[38.5449,-121.7405,'c','Davis, USA','Total-Body PET 2026: poster + <b>Presentation Award</b>'],
[37.1773,-3.5986,'c','Granada, Spain','IEEE NSS/MIC/RTSD 2026: poster'],
[39.4699,-0.3763,'c','Valencia, Spain','FTMI-TBPET-PSMR 2026: talk'],
[46.0569,14.5058,'c','Ljubljana, Slovenia','EMIM 2026: poster'],
[51.8126,5.8372,'s','Nijmegen, Netherlands','AI in Medical Imaging Summer School 2025 (Radboud)'],
[19.1334,72.9133,'s','Mumbai, India','MSc Physics, IIT Bombay'],
[28.6139,77.2090,'s','Delhi, India','BSc (Hons.) Physics, University of Delhi']];
function init(){const css=document.createElement('link');css.rel='stylesheet';css.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';document.head.appendChild(css);
 const sc=document.createElement('script');sc.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';sc.onload=()=>{
  const m=L.map(el,{scrollWheelZoom:false,worldCopyJump:true,zoomControl:true,attributionControl:true});
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:12}).addTo(m);
  const home=[P[0][0],P[0][1]];
  P.forEach(([la,lo,k,t,d],i)=>{if(i)L.polyline([home,[la,lo]],{color:k==='c'?'#6ee7c8':'#8aa8ff',weight:1,opacity:.35,dashArray:'3 5'}).addTo(m);
   L.marker([la,lo],{icon:L.divIcon({className:'',html:`<div class="pin ${k==='c'?'':k}"></div>`,iconSize:[14,14]}),title:t,keyboard:true}).bindPopup(`<b>${t}</b><br>${d}`).addTo(m)});
  m.fitBounds(P.map(p=>[p[0],p[1]]),{padding:[30,30]})};document.body.appendChild(sc)}
const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){io.disconnect();init()}},{rootMargin:'300px'});io.observe(el)})();
