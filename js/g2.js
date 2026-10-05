/* משחק 1.2 – הטבע ממציא: משחק זיכרון + מכונת החיבורים */
(function(){
'use strict';
var PAIRS=[
 {id:'burr',cat:'stick',n:{art:'burr',t:'זֶרַע עִם וָוִים קְטַנִּים'},v:{art:'velcro',t:'סְקוֹטְשׁ (צַמְדָּן)'},fact:'הַוָּוִים שֶׁל הַזֶּרַע נִדְבָּקִים לַבְּגָדִים וְלַפַּרְוָה – כָּךְ נוֹלַד הַסְּקוֹטְשׁ.'},
 {id:'web',cat:'stick',n:{art:'web',t:'קוּרֵי עַכָּבִישׁ'},v:{art:'net',t:'רֶשֶׁת'},fact:'הָעַכָּבִישׁ טוֹוֶה קוּרִים דַּקִּים וַחֲזָקִים שֶׁתּוֹפְסִים וּמַחֲזִיקִים – כְּמוֹ רֶשֶׁת.'},
 {id:'nut',cat:'guard',n:{art:'nut',t:'קְלִפַּת אֱגוֹז'},v:{art:'helmet',t:'קַסְדָּה'},fact:'הַקְּלִפָּה הַקָּשָׁה מְגִנָּה עַל הָאֱגוֹז, כְּמוֹ קַסְדָּה שֶׁמְּגִנָּה עַל הָרֹאשׁ.'},
 {id:'leaf',cat:'guard',n:{art:'leaf',t:'עָלֶה שֶׁהַמַּיִם מַחֲלִיקִים מִמֶּנּוּ'},v:{art:'raincoat',t:'מְעִיל גֶּשֶׁם'},fact:'עַל הֶעָלֶה יֵשׁ שִׁכְבָה דַּקָּה שֶׁל שַׁעֲוָה, וְהַמַּיִם מַחֲלִיקִים מִמֶּנּוּ.'},
 {id:'comb',cat:'shape',n:{art:'honeycomb',t:'חַלַּת דְּבַשׁ'},v:{art:'panel',t:'לוּחַ קַרְטוֹן חָזָק'},fact:'הַמְּשֻׁשִּׁים שֶׁל הַדְּבוֹרִים חֲזָקִים וְקַלִּים – גַּם בּוֹנִים וּמְהַנְדְּסִים מִשְׁתַּמְּשִׁים בַּצּוּרָה הַזֹּאת.'},
 {id:'seed',cat:'shape',n:{art:'samara',t:'זֶרַע שֶׁמִּסְתּוֹבֵב בָּאֲוִיר'},v:{art:'helicopter',t:'מַסּוֹק'},fact:'הַזֶּרַע מִסְתּוֹבֵב כְּמוֹ מַדְחֵף וְיוֹרֵד לְאַט – כְּמוֹ הַכְּנָפַיִם הַמִּסְתּוֹבְבוֹת שֶׁל מַסּוֹק.'}
];
var NATURE=[
 {art:'burr',name:'זֶרַע עִם וָוִים',short:'קוֹץ',does:'לְהִדָּבֵק וְלֹא לִפֹּל'},
 {art:'web',name:'קוּרֵי עַכָּבִישׁ',short:'רֶשֶׁת',does:'לִתְפֹּס וּלְהַחֲזִיק'},
 {art:'nut',name:'קְלִפַּת אֱגוֹז',short:'קְלִפָּה',does:'לְהָגֵן מִפְּנֵי מַכּוֹת'},
 {art:'leaf',name:'עָלֶה עִם שַׁעֲוָה',short:'עָלֶה',does:'לְהַחְלִיק מַיִם וְלִהְיוֹת יָבֵשׁ'},
 {art:'honeycomb',name:'חַלַּת דְּבַשׁ',short:'מְשֻׁשִּׁים',does:'לִהְיוֹת חֲזָקָה וְקַלָּה'},
 {art:'samara',name:'זֶרַע מִסְתּוֹבֵב',short:'סְבִיבוֹן',does:'לָרֶדֶת לְאַט וּבַעֲדִינוּת'}
];
var OBJS=[
 {art:'chair',name:'כִּסֵּא'},{art:'bag',name:'תִּיק'},{art:'hat',name:'כּוֹבַע'},{art:'bottle',name:'בַּקְבּוּק'},
 {art:'shoe',name:'נַעַל'},{art:'umbrella',name:'מִטְרִיָּה'},{art:'spoon',name:'כַּף'},{art:'bicycle',name:'אוֹפַנַּיִם'}
];
var HELP=['לִילָדִים בַּגַּן','לְסָבָא וּלְסָבְתָא','לְחָבֵר בַּכִּתָּה','לַגַּנָּן בְּיַעַר הַמַּאֲכָל','לַמִּשְׁפָּחָה שֶׁלִּי'];
var CATN={stick:'נִדְבָּק אוֹ מַחֲזִיק',guard:'מֵגֵן',shape:'צוּרָה מְיֻחֶדֶת'};
var $=function(id){return document.getElementById(id);};
var cards=[], open=[], found=0, moves=0, lockPair=false, cols=4;

function build(){
  var deck=[]; PAIRS.forEach(function(p){deck.push({pid:p.id,side:'n',art:p.n.art,t:p.n.t}); deck.push({pid:p.id,side:'v',art:p.v.art,t:p.v.t});});
  deck=SH.shuffle(deck);
  var g=$('grid'); g.innerHTML=''; cards=[];
  var row=null;
  deck.forEach(function(c,i){
    var cell=document.createElement('div'); cell.className='mem-cell';
    var b=document.createElement('button'); b.type='button'; b.className='mem-card'; b.tabIndex=i===0?0:-1;
    b.innerHTML='<span class="mem-in"><span class="mem-face mem-front" aria-hidden="true"><span class="mem-q">?</span></span><span class="mem-face mem-back '+(c.side==='n'?'nat':'inv')+'" aria-hidden="true">'+ART[c.art]+'<span class="mem-t">'+c.t+'</span><span class="mem-tag">'+(c.side==='n'?'מֵהַטֶּבַע':'הַמְצָאָה')+'</span></span></span>';
    c.el=b; c.i=i; c.state='closed'; label(c);
    b.addEventListener('click',function(){flip(c);});
    b.addEventListener('keydown',function(e){nav(e,i);});
    cell.appendChild(b); g.appendChild(cell); cards.push(c);
  });
  updMoves();
}
function label(c){
  var n=c.i+1;
  if(c.state==='closed') c.el.setAttribute('aria-label','קְלָף '+n+': סָגוּר');
  else if(c.state==='open') c.el.setAttribute('aria-label','קְלָף '+n+': '+c.t+(c.side==='n'?' – מֵהַטֶּבַע':' – הַמְצָאָה'));
  else c.el.setAttribute('aria-label','קְלָף '+n+': '+c.t+' – נִמְצָא זוּג');
  c.el.setAttribute('aria-disabled',c.state==='matched'?'true':'false');
}
function nav(e,i){
  var k=e.key, n=null, len=cards.length;
  cols=getComputedStyle($('grid')).gridTemplateColumns.split(' ').length||4;
  if(k==='ArrowLeft') n=i+1; else if(k==='ArrowRight') n=i-1; else if(k==='ArrowDown') n=i+cols; else if(k==='ArrowUp') n=i-cols; else if(k==='Home') n=0; else if(k==='End') n=len-1;
  if(n===null) return; e.preventDefault(); if(n<0||n>=len) return;
  cards[i].el.tabIndex=-1; cards[n].el.tabIndex=0; cards[n].el.focus();
}
function flip(c){
  if(open.length===2 && c.state!=='matched'){ open.forEach(function(o){o.state='closed'; o.el.classList.remove('open'); label(o);}); open=[]; }
  if(c.state!=='closed') { if(c.state==='matched') SH.announce(c.t+' – כְּבָר נִמְצָא זוּג'); return; }
  c.state='open'; c.el.classList.add('open'); label(c); SH.sfx.flip(); open.push(c);
  cards.forEach(function(x){x.el.tabIndex=-1;}); c.el.tabIndex=0;
  if(open.length===1){ SH.announce(c.t); return; }
  moves++; updMoves();
  var a=open[0], b=open[1];
  if(a.pid===b.pid){
    var p=PAIRS.filter(function(x){return x.id===a.pid;})[0];
    [a,b].forEach(function(o){o.state='matched'; o.el.classList.add('matched'); label(o);}); open=[]; found++; updMoves();
    SH.feedback($('fb'),'good','זוּג! '+p.n.t+' ← '+p.v.t+'. '+p.fact);
    var li=document.createElement('li'); li.textContent=p.n.t+' ← '+p.v.t; document.querySelector('.nav-task[data-cat="'+p.cat+'"] ul').appendChild(li);
    if(SH.fx()){li.classList.add('pop');}
    if(found===PAIRS.length){ setTimeout(function(){ SH.confetti(); SH.feedback($('fb'),'good','מְצָאתֶם אֶת כָּל הַזּוּגוֹת! הַטֶּבַע הוּא מַמְצִיא גָּדוֹל. עַכְשָׁו – תּוֹרְכֶם לְהַמְצִיא!'); $('to-machine').hidden=false; $('to-machine').focus(); }, 900); }
    else if(found===3){ $('to-machine').hidden=false; }
  } else {
    SH.feedback($('fb'),'try','לֹא זוּג: '+a.t+', '+b.t+'. זִכְרוּ אֵיפֹה הֵם, וְנַסּוּ שׁוּב!');
  }
}
function updMoves(){$('moves').textContent='זוּגוֹת: '+found+' מִתּוֹךְ '+PAIRS.length+' · נִסְיוֹנוֹת: '+moves;}

/* ---- machine ---- */
var r=[0,0], spinning=false;
function drawReel(n){
  var list=n===1?NATURE:OBJS, idx=r[n-1], drum=document.querySelector('#reel'+n+' .reel-drum');
  var N=list.length, ang=360/N, h=drum.parentElement.clientHeight||160, rad=Math.round(h/2/Math.tan(Math.PI/N));
  if(!drum.children.length){ list.forEach(function(it,i){var f=document.createElement('div'); f.className='reel-face'; f.innerHTML=ART[it.art]; drum.appendChild(f);}); }
  Array.prototype.forEach.call(drum.children,function(f,i){f.style.transform='rotateX('+(-i*ang)+'deg) translateZ('+rad+'px)'; f.classList.toggle('cur',i===idx);});
  drum.style.transform='translateZ(-'+rad+'px) rotateX('+(drum._rot||0)+'deg)';
  $('r'+n+'-l').textContent=list[idx].name;
}
function move(n,d,silent){
  var list=n===1?NATURE:OBJS, drum=document.querySelector('#reel'+n+' .reel-drum');
  r[n-1]=(r[n-1]+d+list.length)%list.length; drum._rot=(drum._rot||0)+d*360/list.length; drawReel(n); if(!silent) SH.sfx.tick(); updResult(); if(!silent&&!spinning) SH.announce(list[r[n-1]].name+'. '+$('inv-name').textContent);
}
function updResult(){
  var na=NATURE[r[0]], ob=OBJS[r[1]];
  $('inv-name').innerHTML=''; var s=document.createElement('span'); s.textContent='הַהַמְצָאָה: '+ob.name+'־'+na.short; $('inv-name').appendChild(s);
  $('inv-does').textContent=ob.name+' וְעוֹד '+na.name+' = הַמְצָאָה שֶׁיּוֹדַעַת '+na.does+'.';
}
function spin(){
  if(spinning) return; spinning=true;
  var a=3+Math.floor(Math.random()*NATURE.length), b=4+Math.floor(Math.random()*OBJS.length);
  if(!SH.fx()){ move(1,a,true); move(2,b,true); SH.sfx.good(); spinning=false; SH.announce($('inv-name').textContent); return; }
  var i=0, t=setInterval(function(){ if(i<a) move(1,1); if(i<b) move(2,1); i++; if(i>=Math.max(a,b)){clearInterval(t); spinning=false; SH.sfx.good(); SH.announce($('inv-name').textContent+'. '+$('inv-does').textContent);} },140);
}
function buildHelpers(){
  var g=$('helpers'); HELP.forEach(function(h,i){var b=document.createElement('button'); b.type='button'; b.className='choice'; b.setAttribute('role','radio'); b.setAttribute('aria-checked','false'); b.tabIndex=i===0?0:-1; b.dataset.v=h; b.textContent=h; g.appendChild(b);});
  var items=function(){return Array.prototype.slice.call(g.querySelectorAll('[role=radio]'));};
  function sel(b){items().forEach(function(x){x.setAttribute('aria-checked',String(x===b)); x.tabIndex=x===b?0:-1;}); SH.sfx.click();}
  g.addEventListener('click',function(e){var b=e.target.closest('[role=radio]'); if(b) sel(b);});
  g.addEventListener('keydown',function(e){var it=items(),i=it.indexOf(document.activeElement),n=null; if(i<0) return; if(e.key==='ArrowLeft'||e.key==='ArrowDown') n=(i+1)%it.length; else if(e.key==='ArrowRight'||e.key==='ArrowUp') n=(i-1+it.length)%it.length; else if(e.key===' '||e.key==='Enter'){e.preventDefault(); sel(it[i]); return;} if(n!==null){e.preventDefault(); it[n].focus(); sel(it[n]);}});
}
var saved=0;
function saveInv(){
  var h=$('helpers').querySelector('[aria-checked="true"]');
  if(!h){ SH.feedback($('fb2'),'try','בַּחֲרוּ לְמִי הַהַמְצָאָה עוֹזֶרֶת.'); return; }
  var na=NATURE[r[0]], ob=OBJS[r[1]];
  var g=$('gallery'); var e=g.querySelector('.empty'); if(e) e.remove();
  var li=document.createElement('li'); li.className='inv-card';
  li.innerHTML='<span class="inv-arts" aria-hidden="true">'+ART[na.art]+'<b>+</b>'+ART[ob.art]+'</span><strong></strong><span></span>';
  li.querySelector('strong').textContent=ob.name+'־'+na.short;
  li.querySelector('span:last-child').textContent='הַחִבּוּר שֶׁלָּנוּ הוּא '+ob.name+' וְעוֹד '+na.name+', וְזֶה עוֹזֵר '+h.dataset.v+'.';
  g.appendChild(li); saved++;
  SH.feedback($('fb2'),'good','אֵיזוֹ הַמְצָאָה! '+li.querySelector('span:last-child').textContent+' רוֹצִים לְהַמְצִיא עוֹד אַחַת?');
  if(saved===1){ $('wonder').hidden=false; SH.complete('g2'); SH.confetti(); }
}

document.addEventListener('DOMContentLoaded',function(){
  document.querySelectorAll('[data-a]').forEach(function(e){e.innerHTML=ART[e.dataset.a]||'';});
  build(); buildHelpers();
  $('to-machine').addEventListener('click',function(){$('s-memory').hidden=true; $('s-machine').hidden=false; drawReel(1); drawReel(2); updResult(); $('mach-h').focus(); SH.speak('מְכוֹנַת הַחִבּוּרִים. בַּחֲרוּ רַעְיוֹן מֵהַטֶּבַע וְחֵפֶץ.');});
  document.querySelectorAll('[data-reel]').forEach(function(b){b.addEventListener('click',function(){move(+b.dataset.reel,+b.dataset.d);});});
  $('spin').addEventListener('click',spin);
  $('save-inv').addEventListener('click',saveInv);
  window.addEventListener('resize',function(){ if(!$('s-machine').hidden){drawReel(1);drawReel(2);} });
});
})();
