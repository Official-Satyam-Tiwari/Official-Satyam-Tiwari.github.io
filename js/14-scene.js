/* Background scene: a tree that grows bottom→top as you scroll, plus a PET detector ring
   firing back-to-back gamma pairs (lines of response). Colours come from CSS vars, so it follows the theme. */
(()=>{const RM=matchMedia('(prefers-reduced-motion: reduce)').matches,NS='http://www.w3.org/2000/svg';
const host=document.createElement('div');host.id='scene';host.setAttribute('aria-hidden','true');
const el=(t,a,p)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);p&&p.appendChild(e);return e};

/* ---------- tree ---------- */
const tree=el('svg',{class:'tree',viewBox:'0 0 600 1000',preserveAspectRatio:'xMidYMax meet'},host);
let seed=7;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
const parts=[];// {node, start, end} start/end in 0..1 of grow progress
function branch(x,y,ang,len,w,d,t0){
  const x2=x+Math.cos(ang)*len,y2=y-Math.sin(ang)*len,bx=(x+x2)/2+(rnd()-.5)*len*.25,by=(y+y2)/2;
  const t1=t0+.11;
  const p=el('path',{d:`M${x} ${y} Q${bx} ${by} ${x2} ${y2}`,'stroke-width':w,pathLength:1,class:'br'},tree);
  parts.push({n:p,s:t0,e:t1,type:'br'});
  if(d===0||len<14){
    const c=el('circle',{cx:x2,cy:y2,r:7+rnd()*9,class:rnd()<.3?'bud':'lf'},tree);
    parts.push({n:c,s:t1,e:t1+.06,type:'lf'});return}
  const n=d>4?2:2+(rnd()<.4);
  for(let i=0;i<n;i++){const spread=.35+rnd()*.35,a=ang+(i-(n-1)/2)*spread*1.4+(rnd()-.5)*.2;
    branch(x2,y2,a,len*(.68+rnd()*.12),w*.68,d-1,t1-.02)}
}
branch(300,1000,Math.PI/2,165,20,7,0);
const maxE=Math.max(...parts.map(p=>p.e));parts.forEach(p=>{p.s/=maxE;p.e/=maxE});

/* ---------- PET ring ---------- */
const ring=el('svg',{class:'pet',viewBox:'-110 -110 220 220'},host);
const rot=el('g',{class:'rot'},ring);
for(let i=0;i<48;i++){const a=i/48*360;el('rect',{x:-3.4,y:-96,width:6.8,height:14,rx:1.2,transform:`rotate(${a})`,class:'det'},rot)}
el('circle',{r:78,class:'bore'},ring);
const lors=el('g',{},ring);
function fire(){const a=Math.random()*Math.PI*2,o=(Math.random()-.5)*50,c=Math.cos(a),s=Math.sin(a),
  px=-s*o,py=c*o,L=Math.sqrt(89*89-o*o);
  const l=el('line',{x1:px-c*L,y1:py-s*L,x2:px+c*L,y2:py+s*L,class:'lor'},lors);
  el('circle',{cx:px,cy:py,r:2.2,class:'ann'},lors);
  setTimeout(()=>{lors.firstChild&&lors.removeChild(lors.firstChild);lors.firstChild&&lors.removeChild(lors.firstChild)},1600)}

document.body.prepend(host);

/* grow on scroll */
let raf=0;function grow(){raf=0;
  const max=document.documentElement.scrollHeight-innerHeight,p=RM?1:Math.min(1,.12+.95*scrollY/Math.max(1,max));
  for(const q of parts){const k=Math.max(0,Math.min(1,(p-q.s)/(q.e-q.s)));
    if(q.type==='br')q.n.style.strokeDashoffset=1-k;else q.n.style.transform=`scale(${k})`}}
addEventListener('scroll',()=>{raf||(raf=requestAnimationFrame(grow))},{passive:true});
addEventListener('resize',grow);grow();
if(!RM){fire();setInterval(()=>{if(!document.hidden)fire()},900)}else{for(let i=0;i<5;i++)fire()}
})();
