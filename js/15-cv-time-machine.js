(()=>{
  const root=document.getElementById('time-machine');
  if(!root)return;
  const range=document.getElementById('tm-range'),year=document.getElementById('tm-year'),
        status=document.getElementById('tm-status'),play=document.getElementById('tm-play');
  const min=+range.min,max=+range.max,items=[...document.querySelectorAll('#background [data-from]')];
  const eras=[{to:2022,text:'Delhi → IIT Bombay · finding my feet in physics'},
              {to:2024,text:'The pivot: from particle physics to PET imaging'},
              {to:2028,text:'Kraków · J-PET · CT-less attenuation correction'}];
  let timer=null;

  function render(){
    const y=+range.value;
    year.textContent=y;
    range.style.setProperty('--fill',((y-min)/(max-min)*100)+'%');
    let n=0;
    items.forEach(el=>{
      const on=y>=+el.dataset.from&&y<=+el.dataset.to;
      el.classList.toggle('tm-active',on);
      el.classList.toggle('tm-faded',!on);
      if(on)n++;
    });
    status.textContent=eras.find(e=>y<=e.to).text+' · '+n+' highlight'+(n===1?'':'s')+' in '+y;
  }
  function stop(){
    if(!timer)return;
    clearInterval(timer);timer=null;
    play.textContent='▶';play.setAttribute('aria-pressed','false');play.setAttribute('aria-label','Play timeline');
  }
  play.addEventListener('click',()=>{
    if(timer){stop();return}
    if(+range.value>=max)range.value=min;
    render();
    play.textContent='❚❚';play.setAttribute('aria-pressed','true');play.setAttribute('aria-label','Pause timeline');
    timer=setInterval(()=>{
      if(+range.value>=max){stop();return}
      range.value=+range.value+1;render();
    },900);
  });
  range.addEventListener('input',()=>{stop();render()});
  render();
})();
