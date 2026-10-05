/* שחקים – משחקי יזמות | ספרייה משותפת: הגדרות, הקראה, צלילים, התקדמות, גרירה */
(function(){
'use strict';
var KEY='shhakim-yazamut-settings', PKEY='shhakim-yazamut-progress';
var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
var defaults={sound:true, speech:false, fx:!reduce, timers:false, big:false};
var S={};
try{S=Object.assign({},defaults,JSON.parse(localStorage.getItem(KEY)||'{}'));}catch(e){S=Object.assign({},defaults);}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}
function applyClasses(){
  var h=document.documentElement;
  h.classList.toggle('fx',!!S.fx);
  h.classList.toggle('big-text',!!S.big);
}
applyClasses();

/* ---------- icons (inline SVG, no emoji) ---------- */
var I={
 gear:'<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M19.4 13a7.7 7.7 0 0 0 0-2l2.1-1.6-2-3.5-2.5 1a7.6 7.6 0 0 0-1.7-1L15 3.2h-4l-.4 2.7a7.6 7.6 0 0 0-1.7 1l-2.5-1-2 3.5L6.6 11a7.7 7.7 0 0 0 0 2l-2.1 1.6 2 3.5 2.5-1a7.6 7.6 0 0 0 1.7 1l.4 2.7h4l.4-2.7a7.6 7.6 0 0 0 1.7-1l2.5 1 2-3.5zM13 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z" transform="translate(-1 0)"/></svg>',
 speaker:'<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M3 9v6h4l5 4V5L7 9zm13.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z"/></svg>',
 home:'<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 3 2 12h3v8h5v-5h4v5h5v-8h3z"/></svg>',
 check:'<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="11" fill="#177d3e"/><path d="m6.5 12.5 3.5 3.5 7.5-8" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
 think:'<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="11" fill="#b85a00"/><path d="M9.2 9.3a2.9 2.9 0 1 1 4 2.7c-.8.4-1.2 1-1.2 1.8v.6" fill="none" stroke="#fff" stroke-width="2.3" stroke-linecap="round"/><circle cx="12" cy="17.6" r="1.4" fill="#fff"/></svg>',
 star:'<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="#ffc83d" stroke="#b07a00" stroke-width="1" d="m12 2 3 6.5 7 .8-5.2 4.7 1.5 7L12 17.4 5.7 21l1.5-7L2 9.3l7-.8z"/></svg>',
 heart:'<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="#e0457b" d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z"/></svg>',
 play:'<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M16 5v14L5 12z"/></svg>',
 bulb:'<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="#ffc83d" stroke="#8a5a00" stroke-width="1.2" d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/><rect x="8.5" y="18" width="7" height="2" rx="1" fill="#14275c"/><rect x="9.5" y="21" width="5" height="1.6" rx=".8" fill="#14275c"/></svg>',
 redo:'<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 5V1L7 6l5 5V7a5 5 0 1 1-5 5H5a7 7 0 1 0 7-7z"/></svg>',
 arrowL:'<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M15 5 8 12l7 7"/></svg>'
};

/* ---------- speech (Web Speech API, he-IL) ---------- */
var synth=window.speechSynthesis||null, heVoice=null;
function pickVoice(){ if(!synth) return; var vs=synth.getVoices()||[]; heVoice=vs.filter(function(v){return /^he|^iw/i.test(v.lang);})[0]||null; }
if(synth){pickVoice(); if('onvoiceschanged' in synth) synth.onvoiceschanged=pickVoice;}
function speak(text,force){
  if(!synth||!text) return;
  if(!force && !S.speech) return;
  try{ synth.cancel(); var u=new SpeechSynthesisUtterance(String(text).replace(/\s+/g,' ').trim()); u.lang='he-IL'; if(heVoice) u.voice=heVoice; u.rate=0.9; synth.speak(u);}catch(e){}
}

/* ---------- sound (WebAudio, generated tones, no files) ---------- */
var ac=null;
function tone(freq,start,dur,type,vol){
  if(!S.sound) return;
  try{
    ac=ac||new (window.AudioContext||window.webkitAudioContext)();
    if(ac.state==='suspended') ac.resume();
    var o=ac.createOscillator(), g=ac.createGain(), t=ac.currentTime+(start||0);
    o.type=type||'sine'; o.frequency.setValueAtTime(freq,t);
    g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(vol||0.18,t+0.02); g.gain.exponentialRampToValueAtTime(0.0001,t+(dur||0.2));
    o.connect(g); g.connect(ac.destination); o.start(t); o.stop(t+(dur||0.2)+0.05);
  }catch(e){}
}
var sfx={
  good:function(){tone(660,0,.15,'triangle');tone(880,.12,.22,'triangle');},
  soft:function(){tone(392,0,.18,'sine',.14);tone(349,.15,.25,'sine',.12);},
  click:function(){tone(520,0,.06,'square',.06);},
  flip:function(){tone(300,0,.08,'triangle',.1);tone(450,.05,.08,'triangle',.08);},
  win:function(){[523,659,784,1047].forEach(function(f,i){tone(f,i*.13,.3,'triangle',.16);});},
  fall:function(){tone(300,0,.25,'sawtooth',.08);tone(180,.2,.35,'sawtooth',.07);},
  tick:function(){tone(1000,0,.04,'square',.04);}
};

/* ---------- live region + visible feedback ---------- */
function ensureLive(){var l=document.getElementById('sr-live'); if(!l){l=document.createElement('div');l.id='sr-live';l.className='sr-only';l.setAttribute('aria-live','polite');l.setAttribute('aria-atomic','true');document.body.appendChild(l);} return l;}
function announce(msg){var l=ensureLive(); l.textContent=''; setTimeout(function(){l.textContent=msg;},60);}
/* feedback(el, kind:'good'|'try'|'info', text) – visible + aria-live (el has aria-live) + optional speech */
function feedback(el,kind,text){
  if(!el) return;
  el.className='feedback'+(kind==='good'?' good':kind==='try'?' try':'');
  el.innerHTML=(kind==='good'?I.check:kind==='try'?I.think:'')+'<span></span>';
  el.querySelector('span').textContent=text;
  if(S.fx){el.classList.remove('pop'); void el.offsetWidth; el.classList.add('pop');}
  if(kind==='good') sfx.good(); else if(kind==='try') sfx.soft();
  speak(text);
}

/* ---------- confetti ---------- */
function confetti(){
  sfx.win();
  if(!S.fx) return;
  var box=document.createElement('div'); box.className='confetti'; box.setAttribute('aria-hidden','true');
  var cols=['#1e9bd7','#2bb35b','#8a5cd6','#f7941d','#ffc83d'];
  for(var i=0;i<70;i++){var p=document.createElement('i'); p.style.left=(Math.random()*100)+'%'; p.style.background=cols[i%cols.length];
    p.style.setProperty('--dx',(Math.random()*30-15)+'vw'); p.style.setProperty('--rot',(Math.random()*900-450)+'deg'); p.style.animationDelay=(Math.random()*.6)+'s'; box.appendChild(p);}
  document.body.appendChild(box); setTimeout(function(){box.remove();},3500);
}

/* ---------- progress ---------- */
function getProgress(){try{return JSON.parse(localStorage.getItem(PKEY)||'{}');}catch(e){return {};}}
function complete(id){var p=getProgress(); p[id]=true; try{localStorage.setItem(PKEY,JSON.stringify(p));}catch(e){}}

/* ---------- settings UI (injected into header) ---------- */
var LABELS={
  sound:['צְלִילִים','צְלִילִים קְצָרִים שֶׁל הַצְלָחָה וּמַשּׁוֹב'],
  speech:['הַקְרָאָה אוֹטוֹמָטִית','הַמַּחְשֵׁב מַקְרִיא הוֹרָאוֹת וּמַשּׁוֹב'],
  fx:['תְּלַת־מֵמַד וּתְנוּעָה','הֲפִיכַת קְלָפִים, הֲטָיָה וְקוֹנְפֶטִי'],
  timers:['שָׁעוֹן חוֹל בַּמִּשְׂחָקִים','כְּבוּי = מְשַׂחֲקִים בְּלִי לַחַץ זְמַן'],
  big:['אוֹתִיּוֹת גְּדוֹלוֹת','מַגְדִּיל אֶת כָּל הַטֶּקְסְט']
};
function buildSettings(){
  var bar=document.querySelector('.topbar .wrap'); if(!bar) return;
  var btn=document.createElement('button'); btn.type='button'; btn.className='btn light small'; btn.id='settings-btn';
  btn.setAttribute('aria-expanded','false'); btn.setAttribute('aria-controls','settings-panel');
  btn.innerHTML=I.gear+'<span>הַגְדָּרוֹת</span>';
  var panel=document.createElement('div'); panel.className='settings-panel'; panel.id='settings-panel'; panel.hidden=true;
  panel.setAttribute('role','region'); panel.setAttribute('aria-label','הַגְדָּרוֹת נְגִישׁוּת');
  var html='<h2>הַגְדָּרוֹת</h2>';
  Object.keys(LABELS).forEach(function(k){
    html+='<button type="button" class="toggle" data-set="'+k+'" aria-pressed="'+(!!S[k])+'"><span><strong>'+LABELS[k][0]+'</strong><br><small>'+LABELS[k][1]+'</small></span><span class="knob" aria-hidden="true"></span></button>';
  });
  if(!synth) html+='<p class="settings-note">הַדַּפְדְּפָן הַזֶּה לֹא תּוֹמֵךְ בְּהַקְרָאָה.</p>';
  else html+='<p class="settings-note" id="voice-note"></p>';
  html+='<p class="settings-note"><a href="'+(document.body.dataset.root||'')+'negishut.html">הַצְהָרַת נְגִישׁוּת</a></p>';
  panel.innerHTML=html;
  var spacer=bar.querySelector('.spacer'); bar.appendChild(btn); bar.appendChild(panel);
  btn.addEventListener('click',function(){var open=panel.hidden; panel.hidden=!open; btn.setAttribute('aria-expanded',String(open)); if(open){var f=panel.querySelector('.toggle'); f&&f.focus(); var vn=document.getElementById('voice-note'); if(vn){pickVoice(); vn.textContent=heVoice?'נִמְצָא קוֹל עִבְרִי לְהַקְרָאָה.':'לֹא נִמְצָא קוֹל עִבְרִי בַּמַּכְשִׁיר – הַהַקְרָאָה עֲלוּלָה לֹא לַעֲבֹד.';}}});
  panel.addEventListener('click',function(e){var t=e.target.closest('.toggle'); if(!t) return; var k=t.dataset.set; S[k]=!S[k]; t.setAttribute('aria-pressed',String(S[k])); save(); applyClasses(); if(k==='speech'&&S.speech) speak('הַהַקְרָאָה פּוֹעֶלֶת',true); if(k==='sound'&&S.sound) sfx.good(); if(k==='speech'&&!S.speech&&synth) synth.cancel(); document.dispatchEvent(new CustomEvent('sh-settings',{detail:{key:k,value:S[k]}}));});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!panel.hidden){panel.hidden=true;btn.setAttribute('aria-expanded','false');btn.focus();}});
  document.addEventListener('click',function(e){if(!panel.hidden&&!panel.contains(e.target)&&e.target!==btn&&!btn.contains(e.target)){panel.hidden=true;btn.setAttribute('aria-expanded','false');}});
}

/* read-aloud buttons: <button data-read="#id"> */
function wireRead(root){
  (root||document).querySelectorAll('[data-read]').forEach(function(b){
    if(b._wired) return; b._wired=true;
    if(!synth){b.hidden=true; return;}
    b.addEventListener('click',function(){var sel=b.getAttribute('data-read'); var t=document.querySelector(sel); if(t) speak(t.innerText||t.textContent,true);});
  });
}

/* tilt effect for [data-tilt] (fine pointers only, fx on) */
function wireTilt(){
  if(!(window.matchMedia&&matchMedia('(hover:hover) and (pointer:fine)').matches)) return;
  document.addEventListener('pointermove',function(e){
    var el=e.target.closest&&e.target.closest('[data-tilt]'); 
    document.querySelectorAll('[data-tilt].tilting').forEach(function(x){if(x!==el){x.style.transform='';x.classList.remove('tilting');}});
    if(!el||!S.fx) return;
    var r=el.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
    el.classList.add('tilting'); el.style.transform='rotateY('+(x*10)+'deg) rotateX('+(-y*10)+'deg) translateZ(0)';
  });
}

/* ---------- pointer drag helper (touch + mouse). Keyboard/click alternatives are provided by each game. ----------
   SH.drag(el,{targets:()=>NodeList, onDrop:(target)=>{}, onTap:()=>{}}) */
function drag(el,opt){
  var sx,sy,ghost=null,moved=false,hot=null,pid=null;
  el.addEventListener('pointerdown',function(e){
    if(e.button!==undefined&&e.button!==0) return;
    if(el.getAttribute('aria-disabled')==='true') return;
    var inner=e.target.closest&&e.target.closest('button,a,input'); if(inner&&inner!==el) return;
    sx=e.clientX; sy=e.clientY; moved=false; pid=e.pointerId;
    try{el.setPointerCapture(pid);}catch(_){}
  });
  el.addEventListener('pointermove',function(e){
    if(pid!==e.pointerId) return;
    var dx=e.clientX-sx, dy=e.clientY-sy;
    if(!moved && Math.hypot(dx,dy)<10) return;
    if(!moved){moved=true; var r=el.getBoundingClientRect(); ghost=el.cloneNode(true); ghost.removeAttribute('id'); ghost.classList.add('dragging'); ghost.setAttribute('aria-hidden','true'); ghost.style.width=r.width+'px'; ghost.style.height=r.height+'px'; ghost.style.left=r.left+'px'; ghost.style.top=r.top+'px'; ghost._ox=sx-r.left; ghost._oy=sy-r.top; document.body.appendChild(ghost); el.style.opacity='.35';}
    ghost.style.left=(e.clientX-ghost._ox)+'px'; ghost.style.top=(e.clientY-ghost._oy)+'px';
    var under=document.elementFromPoint(e.clientX,e.clientY), t=null;
    var ts=Array.prototype.slice.call(opt.targets());
    if(under) t=ts.filter(function(x){return x===under||x.contains(under);})[0]||null;
    if(hot&&hot!==t) hot.classList.remove('drop-hot');
    hot=t; if(hot) hot.classList.add('drop-hot');
    e.preventDefault();
  });
  function end(e){
    if(pid!==e.pointerId) return; pid=null;
    try{el.releasePointerCapture(e.pointerId);}catch(_){}
    if(moved){ el._noClick=true; setTimeout(function(){el._noClick=false;},400); if(ghost) ghost.remove(); ghost=null; el.style.opacity=''; if(hot){hot.classList.remove('drop-hot'); var h=hot; hot=null; opt.onDrop&&opt.onDrop(h);} }
    else if(e.type==='pointerup' && opt.onTap){ /* click handler handles taps */ }
  }
  el.addEventListener('pointerup',end); el.addEventListener('pointercancel',end);
  el.style.touchAction='none';
}

document.addEventListener('click',function(e){var t=e.target; while(t&&t!==document){ if(t._noClick){t._noClick=false; e.stopImmediatePropagation(); e.preventDefault(); return;} t=t.parentNode; }},true);
function shuffle(a){a=a.slice(); for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)); var t=a[i]; a[i]=a[j]; a[j]=t;} return a;}

window.SH={S:S,save:save,speak:speak,sfx:sfx,announce:announce,feedback:feedback,confetti:confetti,complete:complete,getProgress:getProgress,drag:drag,shuffle:shuffle,icons:I,wireRead:wireRead,
  fx:function(){return !!S.fx;}, timers:function(){return !!S.timers;}, setTimers:function(v){S.timers=!!v;save(); var t=document.querySelector('.toggle[data-set="timers"]'); if(t) t.setAttribute('aria-pressed',String(S.timers));}};

document.addEventListener('DOMContentLoaded',function(){
  buildSettings(); wireRead(); wireTilt(); ensureLive();
  document.querySelectorAll('[data-icon]').forEach(function(x){x.insertAdjacentHTML('afterbegin',I[x.dataset.icon]||'');});
});
})();
