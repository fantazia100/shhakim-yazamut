/* משחק 1.3 – בצלאל בונה: בנייה תחת אילוץ חומרים */
(function(){
'use strict';
var MAT={
 box:{art:'box',one:'קֻפְסַת קַרְטוֹן',many:'קֻפְסָאוֹת',n:1},
 roll:{art:'rolls2',one:'גְּלִיל',many:'גְּלִילִים',n:2},
 cap:{art:'caps',one:'פְּקָק',many:'פְּקָקִים',n:4},
 pin:{art:'pins',one:'אֶטֶב',many:'אֲטָבִים',n:5},
 string:{art:'string',one:'חוּט (מֶטֶר)',many:'חוּטִים',n:1},
 tape:{art:'tape',one:'נְיַר דֶּבֶק',many:'נְיַר דֶּבֶק',n:1},
 paper:{art:'paper',one:'דַּף צִבְעוֹנִי',many:'דַּפִּים',n:1}
};
var NOT=[{art:'scissors',name:'מִסְפָּרַיִם חַדִּים',why:'מִסְפָּרַיִם חַדִּים לֹא בַּשַּׂקִּית – וְהֵם גַּם מְסֻכָּנִים.'},{art:'glueGun',name:'אֶקְדַּח דֶּבֶק חַם',why:'דֶּבֶק חַם לֹא בַּשַּׂקִּית – הוּא שׂוֹרֵף, וְרַק מְבֻגָּרִים מִשְׁתַּמְּשִׁים בּוֹ.'},{art:'glassBottle',name:'בַּקְבּוּק זְכוּכִית',why:'בַּקְבּוּק זְכוּכִית לֹא בַּשַּׂקִּית – וְהוּא עָלוּל לְהִשָּׁבֵר.'}];
var MISSIONS=[
 {id:'pencil',art:'pencilCup',name:'מַחֲזִיק עֶפְרוֹנוֹת',desc:'שֶׁהָעֶפְרוֹנוֹת שֶׁל חָבֵר לֹא יִתְפַּזְּרוּ עַל הַשֻּׁלְחָן.',slots:[
   {id:'base',label:'בָּסִיס יַצִּיב',hint:'מָה יַעֲזֹר לַמַּחֲזִיק לַעֲמֹד בְּלִי לִפֹּל?',acc:{box:1,cap:4}},
   {id:'cells',label:'תָּאִים לָעֶפְרוֹנוֹת',hint:'בְּתוֹךְ מָה יַעַמְדוּ הָעֶפְרוֹנוֹת?',acc:{roll:2,box:1}},
   {id:'join',label:'חִבּוּר',hint:'אֵיךְ נְחַבֵּר אֶת הַחֲלָקִים?',acc:{tape:1,pin:2,string:1}},
   {id:'deco',label:'קִשּׁוּט וְשֵׁם (לֹא חוֹבָה)',hint:'מַשֶּׁהוּ צִבְעוֹנִי לִכְתֹּב עָלָיו שֵׁם.',acc:{paper:1},opt:true}]},
 {id:'hat',art:'hatHook',name:'מִתְלֶה לְכוֹבַע',desc:'שֶׁהַכּוֹבַע שֶׁל חָבֵר לֹא יִפֹּל וְלֹא יֵעָלֵם.',slots:[
   {id:'pole',label:'עַמּוּד',hint:'מָה אָרֹךְ וְיָכוֹל לַעֲמֹד זָקוּף?',acc:{roll:2}},
   {id:'base',label:'בָּסִיס כָּבֵד',hint:'מָה יַחֲזִיק אֶת הָעַמּוּד שֶׁלֹּא יִפֹּל?',acc:{box:1,cap:4}},
   {id:'hook',label:'וָו לַכּוֹבַע',hint:'עַל מָה אֶפְשָׁר לִתְלוֹת כּוֹבַע?',acc:{pin:2,string:1}},
   {id:'join',label:'חִבּוּר',hint:'אֵיךְ נְחַבֵּר אֶת הָעַמּוּד לַבָּסִיס?',acc:{tape:1,string:1}},
   {id:'deco',label:'קִשּׁוּט (לֹא חוֹבָה)',hint:'מַשֶּׁהוּ צִבְעוֹנִי.',acc:{paper:1},opt:true}]},
 {id:'game',art:'game',name:'מִשְׂחָק לַהַפְסָקָה',desc:'זוֹרְקִים לַמַּטָּרָה וּמְשַׂחֲקִים יַחַד – אַף אֶחָד לֹא נִשְׁאָר לְבַד.',slots:[
   {id:'target',label:'מַטָּרָה',hint:'לְתוֹךְ מָה יִזְרְקוּ?',acc:{box:1,roll:2}},
   {id:'pieces',label:'כְּלֵי זְרִיקָה',hint:'מָה קַל וּבָטוּחַ לִזְרֹק?',acc:{cap:4,paper:1}},
   {id:'line',label:'קַו זְרִיקָה',hint:'מֵאֵיפֹה זוֹרְקִים? צָרִיךְ לְסַמֵּן קַו.',acc:{string:1,tape:1}},
   {id:'sign',label:'שֶׁלֶט עִם הַחֻקִּים (לֹא חוֹבָה)',hint:'עַל מָה כּוֹתְבִים אֶת הַחֻקִּים?',acc:{paper:1},opt:true}]},
 {id:'tape',art:'tapeStand',name:'מִתְקָן לִנְיַר דֶּבֶק',desc:'שֶׁיִּהְיֶה קַל לְכֻלָּם לְהִשְׁתַּמֵּשׁ בִּנְיַר הַדֶּבֶק בַּכִּתָּה.',slots:[
   {id:'body',label:'גּוּף כָּבֵד',hint:'מָה יִהְיֶה הַגּוּף שֶׁל הַמִּתְקָן?',acc:{box:1}},
   {id:'axle',label:'צִיר לַגָּלִיל',hint:'עַל מָה יִסְתּוֹבֵב גְּלִיל נְיַר הַדֶּבֶק?',acc:{roll:1,string:1}},
   {id:'feet',label:'רַגְלַיִם שֶׁלֹּא יַחְלִיקוּ',hint:'מָה נָשִׂים מִתַּחַת לַמִּתְקָן?',acc:{cap:4,pin:4}},
   {id:'deco',label:'קִשּׁוּט (לֹא חוֹבָה)',hint:'מַשֶּׁהוּ צִבְעוֹנִי.',acc:{paper:1},opt:true}]}
];
var HELPS=['לְחָבֵר בַּכִּתָּה','לַמּוֹרָה','לִילָדֵי כִּתָּה א\'','לְכָל הַכִּתָּה'];
var $=function(id){return document.getElementById(id);};
var level='b', mission=null, counts={}, slots=[], selected=null, removed=null;
function qtyName(m,q){return q===1?MAT[m].one:(q+' '+MAT[m].many);}
function show(id){['s-intro','s-build','s-show'].forEach(function(s){$(s).hidden=s!==id;});}

function solvable(ms,c){
  var req=ms.slots.filter(function(s){return !s.opt;});
  function dfs(i,cc){ if(i===req.length) return true; var acc=req[i].acc;
    for(var m in acc){ if((cc[m]||0)>=acc[m]){ var n=Object.assign({},cc); n[m]-=acc[m]; if(dfs(i+1,n)) return true; } } return false; }
  return dfs(0,c);
}
function radio(group,onSel){
  var items=function(){return Array.prototype.slice.call(group.querySelectorAll('[role=radio]'));};
  var s=items().filter(function(x){return x.getAttribute('aria-checked')==='true';})[0]||items()[0];
  items().forEach(function(x){x.tabIndex=x===s?0:-1;});
  function sel(b){items().forEach(function(x){x.setAttribute('aria-checked',String(x===b)); x.tabIndex=x===b?0:-1;}); SH.sfx.click(); onSel&&onSel(b.dataset.v);}
  group.addEventListener('click',function(e){var b=e.target.closest('[role=radio]'); if(b) sel(b);});
  group.addEventListener('keydown',function(e){var it=items(),i=it.indexOf(document.activeElement),n=null; if(i<0) return; if(e.key==='ArrowLeft'||e.key==='ArrowDown') n=(i+1)%it.length; else if(e.key==='ArrowRight'||e.key==='ArrowUp') n=(i-1+it.length)%it.length; else if(e.key===' '||e.key==='Enter'){e.preventDefault(); sel(it[i]); return;} if(n!==null){e.preventDefault(); it[n].focus(); sel(it[n]);}});
}
function val(g){var s=g.querySelector('[aria-checked="true"]'); return s?s.dataset.v:null;}

function buildMissions(){
  var g=$('missions'); g.innerHTML='';
  MISSIONS.forEach(function(ms){var b=document.createElement('button'); b.type='button'; b.className='choice';
    b.innerHTML=ART[ms.art]+'<span>'+ms.name+'</span><small>'+ms.desc+'</small>'; b.addEventListener('click',function(){start(ms);}); g.appendChild(b);});
}
function start(ms){
  mission=ms; selected=null; removed=null; counts={};
  Object.keys(MAT).forEach(function(k){counts[k]=MAT[k].n;});
  if(level==='g'){
    var cand=Object.keys(MAT).filter(function(k){var c=Object.assign({},counts); c[k]=0; return solvable(ms,c) && ms.slots.some(function(s){return !s.opt && s.acc[k];});});
    if(cand.length){ removed=cand[Math.floor(Math.random()*cand.length)]; counts[removed]=0; }
  }
  slots=ms.slots.map(function(s){return Object.assign({placed:null,qty:0},s);});
  $('build-h').textContent='הַמְּשִׂימָה: '+ms.name;
  $('build-sub').textContent=ms.desc;
  var lot=$('lottery'); lot.hidden=!removed; if(removed) lot.textContent='הַחֹמֶר שֶׁיָּצָא בַּהַגְרָלָה: '+MAT[removed].one+'. בּוֹנִים בְּלִי הַחֹמֶר הַזֶּה!';
  renderMats(); renderSlots(); $('fb').innerHTML=''; $('fb').className='feedback';
  show('s-build'); $('build-h').focus();
  SH.speak($('build-h').textContent+'. '+ms.desc+(removed?' '+lot.textContent:''));
  startTimer();
}
function renderMats(){
  var g=$('mats'); g.innerHTML='';
  Object.keys(MAT).forEach(function(k){
    var b=document.createElement('button'); b.type='button'; b.className='mat'; b.dataset.m=k;
    var c=counts[k], out=c===0;
    b.innerHTML=ART[MAT[k].art]+'<span class="mat-n">'+MAT[k].one+'</span><span class="mat-c">'+(k===removed?'יָצָא בַּהַגְרָלָה':out?'נִגְמַר':'נִשְׁאֲרוּ: '+c)+'</span>';
    b.setAttribute('aria-pressed',String(selected===k));
    b.setAttribute('aria-label',MAT[k].one+', '+(k===removed?'יָצָא בַּהַגְרָלָה':out?'נִגְמַר':'נִשְׁאֲרוּ '+c));
    if(out){b.setAttribute('aria-disabled','true'); b.classList.add('out');}
    b.addEventListener('click',function(){ if(b._noClick){b._noClick=false;return;} if(out){SH.feedback($('fb'),'try',k===removed?'הַחֹמֶר הַזֶּה יָצָא בַּהַגְרָלָה – חַפְּשׂוּ דֶּרֶךְ אַחֶרֶת!':'נִגְמַר: '+MAT[k].one+'. אֶפְשָׁר לְהַחְזִיר חֹמֶר מִשֻּׁלְחַן הָעֲבוֹדָה, אוֹ לְנַסּוֹת חֹמֶר אַחֵר.'); return;}
      selected=selected===k?null:k; renderMats(); if(selected){SH.sfx.click(); SH.announce('בְּחַרְתֶּם '+MAT[k].one+'. עַכְשָׁו בַּחֲרוּ חֵלֶק בְּשֻׁלְחַן הָעֲבוֹדָה.');} var nb=document.querySelector('.mat[data-m="'+k+'"]'); nb&&nb.focus(); });
    if(!out) SH.drag(b,{targets:function(){return document.querySelectorAll('.slot');},onDrop:function(t){selected=k; placeInto(+t.dataset.i);}});
    g.appendChild(b);
  });
  var n=$('notmats'); if(!n.children.length){ NOT.forEach(function(x){var b=document.createElement('button'); b.type='button'; b.className='mat forbidden'; b.innerHTML=ART[x.art]+'<span class="mat-n">'+x.name+'</span>'; b.setAttribute('aria-label',x.name+' – לֹא בַּשַּׂקִּית');
    b.addEventListener('click',function(){SH.feedback($('fb'),'try',x.why+' בְּצַלְאֵל בָּנָה מִמָּה שֶׁהָיָה – וְגַם אֲנַחְנוּ!');});
    SH.drag(b,{targets:function(){return document.querySelectorAll('.slot');},onDrop:function(){SH.feedback($('fb'),'try',x.why+' בּוֹנִים רַק מִמָּה שֶׁבַּשַּׂקִּית.');}});
    n.appendChild(b);}); }
}
function renderSlots(){
  var g=$('slots'); g.innerHTML='';
  slots.forEach(function(s,i){
    var b=document.createElement('button'); b.type='button'; b.className='slot'+(s.placed?' filled':'')+(s.opt?' opt':''); b.dataset.i=i;
    b.innerHTML='<span class="slot-l">'+s.label+'</span>'+(s.placed?'<span class="slot-art">'+ART[MAT[s.placed].art]+'</span><span class="slot-m">'+qtyName(s.placed,s.qty)+'</span><span class="slot-x">לְהַחְזִיר לַשַּׂקִּית</span>':'<span class="slot-empty">'+(selected?'שִׂימוּ כָּאן':'רֵיק')+'</span>');
    b.setAttribute('aria-label',s.label+': '+(s.placed?qtyName(s.placed,s.qty)+'. לְחִיצָה מַחֲזִירָה לַשַּׂקִּית':'רֵיק'+(selected?'. לְחִיצָה שָׂמָה כָּאן '+MAT[selected].one:'')));
    b.addEventListener('click',function(){
      if(s.placed){ counts[s.placed]+=s.qty; var m=s.placed; s.placed=null; s.qty=0; renderMats(); renderSlots(); SH.feedback($('fb'),'info',MAT[m].one+' חָזַר לַשַּׂקִּית.'); focusSlot(i); return; }
      if(!selected){ SH.feedback($('fb'),'try','בַּחֲרוּ קֹדֶם חֹמֶר מֵהַשַּׂקִּית. רֶמֶז: '+s.hint); return; }
      placeInto(i);
    });
    g.appendChild(b);
  });
}
function focusSlot(i){var e=document.querySelector('.slot[data-i="'+i+'"]'); e&&e.focus();}
function placeInto(i){
  var s=slots[i], m=selected; if(!m) return;
  if(s.placed){ SH.feedback($('fb'),'try','בַּחֵלֶק הַזֶּה כְּבָר יֵשׁ חֹמֶר. לְחִיצָה עָלָיו מַחֲזִירָה אוֹתוֹ לַשַּׂקִּית.'); return; }
  var need=s.acc[m];
  if(!need){ SH.feedback($('fb'),'try',MAT[m].one+' לֹא מַתְאִים לְכָאן. רֶמֶז: '+s.hint); var e=document.querySelector('.slot[data-i="'+i+'"]'); if(e&&SH.fx()){e.classList.add('shake'); setTimeout(function(){e.classList.remove('shake');},500);} return; }
  if(counts[m]<need){ SH.feedback($('fb'),'try','צָרִיךְ '+qtyName(m,need)+', וְנִשְׁאֲרוּ רַק '+counts[m]+'. אוּלַי חֹמֶר אַחֵר יַתְאִים? '+s.hint); return; }
  counts[m]-=need; s.placed=m; s.qty=need; selected=null;
  renderMats(); renderSlots(); focusSlot(i);
  var e=document.querySelector('.slot[data-i="'+i+'"]'); if(e&&SH.fx()) e.classList.add('pop');
  SH.feedback($('fb'),'good',s.label+': '+qtyName(m,need)+'. רַעְיוֹן טוֹב!');
}
function check(){
  var miss=slots.filter(function(s){return !s.opt && !s.placed;});
  if(miss.length){ SH.feedback($('fb'),'try','עוֹד לֹא סִיַּמְנוּ. חָסֵר: '+miss.map(function(s){return s.label;}).join(', ')+'.'); return; }
  stopTimer();
  var used=slots.filter(function(s){return s.placed;}).map(function(s){return qtyName(s.placed,s.qty);});
  var left=Object.keys(counts).filter(function(k){return counts[k]>0;}).map(function(k){return qtyName(k,counts[k]);});
  $('used').textContent='בְּדִיקַת אִלּוּץ ✓ הִשְׁתַּמַּשְׁנוּ רַק בַּשַּׂקִּית: '+used.join(', ')+'.'+(left.length?' נִשְׁאֲרוּ בַּשַּׂקִּית: '+left.join(', ')+'.':'');
  $('tt-model').innerHTML=ART[mission.art];
  $('sentence-l').textContent='בָּנִינוּ '+mission.name+' שֶׁעוֹזֵר...';
  var h=$('helps'); h.innerHTML=''; HELPS.forEach(function(t,i){var b=document.createElement('button'); b.type='button'; b.className='choice'; b.setAttribute('role','radio'); b.setAttribute('aria-checked','false'); b.dataset.v=t; b.textContent=t; h.appendChild(b);});
  if(!h._r){h._r=1; radio(h);} else { Array.prototype.forEach.call(h.children,function(x,i){x.tabIndex=i?-1:0;}); }
  $('end').hidden=true; $('fb3').innerHTML=''; $('fb3').className='feedback';
  show('s-show'); $('show-h').focus(); SH.confetti();
  SH.speak('בְּדִיקַת אִלּוּץ עָבְרָה! תַּעֲרוּכַת דַּקָּה.');
}
/* ---- optional hourglass ---- */
var tLeft=0, tInt=null, paused=false;
function startTimer(){
  stopTimer(); var hg=$('hourglass');
  if(!SH.timers()){ hg.hidden=true; return; }
  tLeft=(level==='g'?10:12)*60; paused=false; hg.hidden=false; $('hg-pause').textContent='עֲצִירָה'; drawT();
  tInt=setInterval(function(){ if(paused) return; tLeft--; drawT();
    if(tLeft===300) SH.announce('נִשְׁאֲרוּ 5 דַּקּוֹת'); if(tLeft===60) SH.announce('נִשְׁאֲרָה דַּקָּה אַחַת');
    if(tLeft<=0){ stopTimer(); SH.feedback($('fb'),'info','הַזְּמַן נִגְמַר! אֶפְשָׁר לְהַמְשִׁיךְ בְּנַחַת – הָעִקָּר לְסַיֵּם יַחַד.'); } },1000);
}
function drawT(){var m=Math.floor(tLeft/60), s=tLeft%60; $('hg-time').textContent=m+':'+(s<10?'0':'')+s; $('hourglass').classList.toggle('low',tLeft<=60);}
function stopTimer(){ if(tInt){clearInterval(tInt); tInt=null;} }

document.addEventListener('DOMContentLoaded',function(){
  document.querySelectorAll('[data-a]').forEach(function(e){e.innerHTML=ART[e.dataset.a]||'';});
  buildMissions();
  radio($('level'),function(v){level=v;});
  radio($('reflect'));
  var to=$('timer-opt'); to.setAttribute('aria-pressed',String(SH.timers()));
  to.addEventListener('click',function(){SH.setTimers(!SH.timers()); to.setAttribute('aria-pressed',String(SH.timers()));});
  document.addEventListener('sh-settings',function(e){ if(e.detail.key==='timers'){ to.setAttribute('aria-pressed',String(e.detail.value)); if(!e.detail.value){stopTimer(); $('hourglass').hidden=true;} } });
  $('hg-pause').addEventListener('click',function(){paused=!paused; this.textContent=paused?'הַמְשָׁכָה':'עֲצִירָה'; SH.announce(paused?'הַשָּׁעוֹן נֶעֱצַר':'הַשָּׁעוֹן מַמְשִׁיךְ');});
  $('hg-off').addEventListener('click',function(){stopTimer(); $('hourglass').hidden=true; SH.announce('הַשָּׁעוֹן כָּבוּי'); $('check').focus();});
  $('check').addEventListener('click',check);
  $('restart').addEventListener('click',function(){stopTimer(); show('s-intro'); $('mission-h').setAttribute('tabindex','-1'); $('mission-h').focus();});
  $('again').addEventListener('click',function(){show('s-intro'); $('mission-h').setAttribute('tabindex','-1'); $('mission-h').focus();});
  $('finish').addEventListener('click',function(){
    var h=val($('helps')), r=val($('reflect'));
    if(!h||!r){SH.feedback($('fb3'),'try',!h?'בַּחֲרוּ לְמִי הַדֶּגֶם עוֹזֵר.':'בַּחֲרוּ: כְּשֶׁיֵּשׁ לָנוּ מְעַט חֳמָרִים, אֲנַחְנוּ...'); return;}
    SH.feedback($('fb3'),'good','בָּנִינוּ '+mission.name+' שֶׁעוֹזֵר '+h+'! וּכְשֶׁיֵּשׁ לָנוּ מְעַט חֳמָרִים – אֲנַחְנוּ '+r+'. בְּחָכְמָה וּבְשִׂמְחָה, כְּמוֹ בְּצַלְאֵל!');
    $('end').hidden=false; SH.complete('g3'); SH.confetti();
  });
});
})();
