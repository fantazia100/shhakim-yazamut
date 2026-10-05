document.addEventListener('DOMContentLoaded',function(){
  document.querySelectorAll('[data-art]').forEach(function(el){el.innerHTML=ART[el.dataset.art]||'';});
  document.querySelectorAll('.gcard .play').forEach(function(el){el.innerHTML=SH.icons.arrowL;});
  function render(){
    var p=SH.getProgress(), n=0, pips='';
    ['g1','g2','g3','g4','g5'].forEach(function(g){var d=!!p[g]; if(d) n++; pips+='<span class="pip'+(d?' done':'')+'"></span>'; var c=document.querySelector('[data-game="'+g+'"]'); if(c) c.classList.toggle('done',d);});
    document.querySelectorAll('[data-trivia]').forEach(function(t){t.classList.toggle('done',!!p[t.dataset.trivia]);});
    document.getElementById('pips').innerHTML=pips;
    document.getElementById('pips-sr').textContent='סִיַּמְתֶּם '+n+' מִתּוֹךְ 5 מִשְׂחָקִים';
  }
  render();
  var r=document.getElementById('reset-progress');
  if(r) r.addEventListener('click',function(){try{localStorage.removeItem('shhakim-yazamut-progress');}catch(e){} render(); SH.announce('ההתקדמות אופסה');});
});
