(()=>{const RM=matchMedia('(prefers-reduced-motion: reduce)').matches,$=q=>document.querySelector(q),mail='satyam.tiwari@doctoral.uj.edu.pl';
const toast=$('#toast');function say(m){toast.textContent=m;toast.classList.add('show');clearTimeout(say.t);say.t=setTimeout(()=>toast.classList.remove('show'),2200)}
function copy(){(navigator.clipboard?navigator.clipboard.writeText(mail):Promise.reject()).then(()=>say('Email copied'),()=>say(mail))}
$('#copymail').onclick=copy;
/* K-40 counter: ~4400 Bq in a 70 kg adult; beta+ branch ~1e-5 */
const t0=performance.now(),k=$('#k40'),q=$('#pos');setInterval(()=>{const s=(performance.now()-t0)/1000,n=s*4400;k.textContent=Math.round(n).toLocaleString();q.textContent=(n*1e-5).toFixed(2)},250);
/* photon trail in header */
const cv=$('#trail'),hero=$('.hero');if(!RM&&matchMedia('(pointer:fine)').matches){const c=cv.getContext('2d');let W,H,pts=[],run=false,col='#6ee7c8';
 const upCol=()=>{col=getComputedStyle(document.body).getPropertyValue('--accent').trim()||col};upCol();setInterval(upCol,600);
 function size(){const d=Math.min(devicePixelRatio||1,2);W=hero.clientWidth;H=hero.clientHeight;cv.width=W*d;cv.height=H*d;c.setTransform(d,0,0,d,0,0)}size();addEventListener('resize',size);
 hero.addEventListener('pointermove',e=>{const r=cv.getBoundingClientRect();pts.push({x:e.clientX-r.left,y:e.clientY-r.top,a:1});if(pts.length>18)pts.shift();if(!run){run=true;requestAnimationFrame(draw)}},{passive:true});
 function draw(){c.clearRect(0,0,W,H);c.strokeStyle=col;c.lineCap='round';c.lineWidth=1.6;
  for(let i=1;i<pts.length;i++){const p=pts[i],q=pts[i-1];c.globalAlpha=p.a*.6;c.beginPath();c.moveTo(q.x,q.y);c.lineTo(p.x,p.y);c.stroke()}
  c.globalAlpha=1;pts.forEach(p=>p.a*=.8);pts=pts.filter(p=>p.a>.05);
  if(pts.length>1)requestAnimationFrame(draw);else{run=false;pts=[];c.clearRect(0,0,W,H)}}}
/* shortcuts */
const dlg=$('#keys'),ids=['research','publications','talks','background','skills','projects','contact'];
addEventListener('keydown',e=>{if(e.ctrlKey||e.metaKey||e.altKey||/input|textarea/i.test(e.target.tagName))return;
 if(e.key==='?'){dlg.open?dlg.close():dlg.showModal();return}if(dlg.open)return;
 if(/^[1-7]$/.test(e.key)){document.getElementById(ids[e.key-1]).scrollIntoView({behavior:RM?'auto':'smooth'})}
 else if(e.key==='t')$('#theme').click();else if(e.key==='e')copy();else if(e.key==='c')open('cv.pdf','_blank')});
/* console easter egg */
console.log('%cHello, curious one.','font:600 16px Inter,sans-serif;color:#6ee7c8');
console.log('%cLooking for a collaborator on PET imaging or detector instrumentation?\nWrite to '+mail+'  (or press ? on the page for shortcuts)','font:13px Inter,sans-serif');
})();
