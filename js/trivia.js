/* Trivia engine – solo or 2–4 teams, no timers, no penalties. */
(function(){
var $=function(id){return document.getElementById(id);};
var S='<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">', E='</svg>';
var TI={
 wide:S+'<rect x="8" y="86" width="84" height="6" rx="3" fill="#c9a77a"/><path d="M14 86 40 20h20l26 66" fill="none" stroke="#1a73b8" stroke-width="6" stroke-linejoin="round"/><path d="M27 54h46" stroke="#1a73b8" stroke-width="5"/><circle cx="50" cy="16" r="7" fill="#f7941d"/>'+E,
 narrow:S+'<rect x="8" y="86" width="84" height="6" rx="3" fill="#c9a77a"/><path d="M44 86 47 20h6l3 66" fill="none" stroke="#7446c2" stroke-width="6" stroke-linejoin="round"/><circle cx="50" cy="16" r="7" fill="#f7941d"/>'+E,
 tri:S+'<path d="M50 14 88 82H12z" fill="#e3f6ea" stroke="#177d3e" stroke-width="7" stroke-linejoin="round"/>'+E,
 sq:S+'<rect x="18" y="18" width="64" height="64" fill="#efe8fb" stroke="#7446c2" stroke-width="7" stroke-linejoin="round"/>'+E,
 line:S+'<path d="M50 12v76" stroke="#b85a00" stroke-width="8" stroke-linecap="round"/>'+E,
 drip:S+'<rect x="6" y="30" width="88" height="10" rx="5" fill="#1a73b8"/><circle cx="30" cy="40" r="3" fill="#0a5fa0"/><circle cx="70" cy="40" r="3" fill="#0a5fa0"/><path d="M30 50c-5 8-7 11-7 15a7 7 0 0 0 14 0c0-4-2-7-7-15zM70 50c-5 8-7 11-7 15a7 7 0 0 0 14 0c0-4-2-7-7-15z" fill="#4fb3e8"/><path d="M50 92V74m0 6c-8-2-12-8-12-14 8 1 12 6 12 14zm0-2c7-3 10-8 10-14-7 1-10 6-10 14z" fill="#2bb35b" stroke="#177d3e" stroke-width="2"/><rect x="10" y="90" width="80" height="6" rx="3" fill="#b98c5b"/>'+E,
 usb:S+'<rect x="30" y="34" width="40" height="56" rx="8" fill="#1a73b8"/><rect x="36" y="10" width="28" height="26" rx="3" fill="#cfd8e6" stroke="#8b97ad" stroke-width="3"/><rect x="42" y="16" width="6" height="6" fill="#8b97ad"/><rect x="52" y="16" width="6" height="6" fill="#8b97ad"/><circle cx="50" cy="70" r="7" fill="#ffc83d"/>'+E,
 pin:S+'<path d="M50 92S20 58 20 38a30 30 0 0 1 60 0c0 20-30 54-30 54z" fill="#33c3f0" stroke="#0a5fa0" stroke-width="4"/><circle cx="50" cy="38" r="12" fill="#fff"/>'+E,
 capsule:S+'<g transform="rotate(-35 50 50)"><rect x="14" y="34" width="72" height="32" rx="16" fill="#fff" stroke="#14275c" stroke-width="4"/><path d="M50 34h20a16 16 0 0 1 0 32H50z" fill="#f7941d" stroke="#14275c" stroke-width="4"/><circle cx="26" cy="50" r="7" fill="#14275c"/><circle cx="26" cy="50" r="3" fill="#4fb3e8"/></g>'+E,
 bird:S+'<path d="M8 50 40 44" stroke="#14275c" stroke-width="5" stroke-linecap="round"/><path d="M38 40c6-14 26-18 38-10 10 7 14 22 6 34-8 12-30 14-42 4-6-5-6-16-2-28z" fill="#1e9bd7"/><path d="M50 62c8 6 22 6 30-2-4 14-24 18-34 10z" fill="#f7941d"/><circle cx="54" cy="40" r="5" fill="#fff"/><circle cx="55" cy="40" r="2.5" fill="#14275c"/><path d="M8 50 40 50 38 42z" fill="#2b2b2b"/>'+E,
 tomato:S+'<circle cx="38" cy="58" r="22" fill="#e53935"/><circle cx="66" cy="62" r="18" fill="#ef5350"/><path d="M38 36l-6-8 6 3 4-7 2 8 7-2-5 6" fill="#2bb35b" stroke="#177d3e" stroke-width="2" stroke-linejoin="round"/><path d="M66 44l-4-7 5 3 3-6 2 7 6-1-5 5" fill="#2bb35b" stroke="#177d3e" stroke-width="2" stroke-linejoin="round"/><circle cx="31" cy="50" r="4" fill="#fff" opacity=".6"/>'+E,
 shield:S+'<path d="M50 8 84 20v26c0 22-14 38-34 46C30 84 16 68 16 46V20z" fill="#1a73b8" stroke="#0a5fa0" stroke-width="4"/><path d="M50 22 72 30v16c0 14-9 25-22 31-13-6-22-17-22-31V30z" fill="#e3f1fb"/><path d="M50 34v30M36 48h28" stroke="#1a73b8" stroke-width="6" stroke-linecap="round"/>'+E,
 tent:S+'<rect x="6" y="84" width="88" height="8" rx="4" fill="#e8c88f"/><path d="M14 84V40h72v44z" fill="#b98c5b"/><path d="M14 40h72" stroke="#7a5230" stroke-width="4"/><path d="M8 40 50 14l42 26z" fill="#7446c2"/><rect x="40" y="56" width="20" height="28" fill="#f6e2b8"/><path d="M20 40v44M80 40v44" stroke="#ffc83d" stroke-width="4"/>'+E,
 scroll:S+'<rect x="22" y="22" width="56" height="56" fill="#fff4d6" stroke="#b07a00" stroke-width="3"/><rect x="12" y="14" width="12" height="72" rx="6" fill="#b98c5b"/><rect x="76" y="14" width="12" height="72" rx="6" fill="#b98c5b"/><path d="M32 36h36M32 46h36M32 56h36M32 66h24" stroke="#14275c" stroke-width="3" stroke-linecap="round"/>'+E,
 giftBox:S+'<rect x="14" y="40" width="72" height="50" rx="6" fill="#2bb35b"/><rect x="10" y="30" width="80" height="16" rx="5" fill="#33c46a"/><rect x="44" y="30" width="12" height="60" fill="#ffc83d"/><path d="M50 30c-8-14-26-14-22-2 2 5 14 4 22 2zm0 0c8-14 26-14 22-2-2 5-14 4-22 2z" fill="#ffc83d" stroke="#b07a00" stroke-width="2"/><path d="M50 72c-10-6-14-10-14-15a6 6 0 0 1 14-2 6 6 0 0 1 14 2c0 5-4 9-14 15z" fill="#e0457b"/>'+E,
 wheelchair:S+'<circle cx="42" cy="66" r="22" fill="none" stroke="#14275c" stroke-width="6"/><circle cx="42" cy="66" r="4" fill="#14275c"/><circle cx="78" cy="84" r="6" fill="#14275c"/><path d="M30 18v30h34l14 36" fill="none" stroke="#1a73b8" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><path d="M30 34h26" stroke="#1a73b8" stroke-width="7" stroke-linecap="round"/>'+E,
 glasses:S+'<rect x="8" y="34" width="36" height="30" rx="10" fill="#e3f1fb" stroke="#b98c5b" stroke-width="7"/><rect x="56" y="34" width="36" height="30" rx="10" fill="#e3f1fb" stroke="#b98c5b" stroke-width="7"/><path d="M44 46c4-4 8-4 12 0" fill="none" stroke="#b98c5b" stroke-width="6"/><path d="M16 42l8-4M64 42l8-4" stroke="#fff" stroke-width="4" stroke-linecap="round"/>'+E,
 yes:'<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="11" fill="#177d3e"/><path d="m6.5 12.5 3.5 3.5 7.5-8" fill="none" stroke="#fff" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
 no:'<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="11" fill="#b3261e"/><path d="m7.5 7.5 9 9m0-9-9 9" stroke="#fff" stroke-width="2.8" stroke-linecap="round"/></svg>'
};
function art(k){ return TI[k]||(window.ART&&ART[k])||''; }
var TEAMS=[
 {n:'צֶוֶת כָּחֹל',c:'blue',sh:'<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9" fill="currentColor"/></svg>'},
 {n:'צֶוֶת יָרֹק',c:'green',sh:'<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 3 22 20H2z" fill="currentColor"/></svg>'},
 {n:'צֶוֶת סָגֹל',c:'purple',sh:'<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="4" y="4" width="16" height="16" fill="currentColor"/></svg>'},
 {n:'צֶוֶת כָּתֹם',c:'orange',sh:'<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m12 2 3 6.5 7 .8-5.2 4.7 1.5 7L12 17.4 5.7 21l1.5-7L2 9.3l7-.8z" fill="currentColor"/></svg>'}
];
var GOOD=['נָכוֹן מְאוֹד!','יֹפִי שֶׁל תְּשׁוּבָה!','מְצֻיָּן!','בְּדִיּוּק!','כָּל הַכָּבוֹד!'];
var TRY=['לֹא נוֹרָא – עַכְשָׁיו יוֹדְעִים!','טָעוּת הִיא חֵלֶק מֵהַלְּמִידָה.','נִסִּיתֶם – וְזֶה הָעִקָּר!','גַּם יַזָּמִים טוֹעִים וְלוֹמְדִים.'];
var TYPE={mc:'שְׁאֵלָה אֲמֵרִיקָאִית',tf:'נָכוֹן אוֹ לֹא נָכוֹן?',icon:'בַּחֲרוּ תְּמוּנָה',why:'לָמָּה? – שְׁאֵלַת בּוֹנוּס'};
var setId, set, qs, i=0, phase='main', mode='solo', nTeams=2, teams=[], turn=0, stars=0, right=0, answered=false, cur=null;
var rnd=function(a){return a[Math.floor(Math.random()*a.length)];};

function prep(q){ // build option list with correct flag, shuffled
  var o=q.t==='tf'?[{l:'נָכוֹן',ic:'yes'},{l:'לֹא נָכוֹן',ic:'no'}]:q.o.map(function(x){return typeof x==='string'?{l:x}:x;});
  var a=q.t==='tf'?q.a:0;
  o=o.map(function(x,k){return {l:x.l,art:x.art,ic:x.ic,ok:k===a};});
  if(q.t!=='tf'&&!q.fixed) o=SH.shuffle(o);
  return o;
}
function radio(group,onSel){
  var items=function(){return Array.prototype.slice.call(group.querySelectorAll('[role=radio]'));};
  function sel(b){items().forEach(function(x){x.setAttribute('aria-checked',String(x===b)); x.tabIndex=x===b?0:-1;}); SH.sfx.click(); onSel&&onSel(b.dataset.v);}
  group.addEventListener('click',function(e){var b=e.target.closest('[role=radio]'); if(b) sel(b);});
  group.addEventListener('keydown',function(e){var it=items(),k=it.indexOf(document.activeElement),n=null; if(k<0) return;
    if(e.key==='ArrowLeft'||e.key==='ArrowDown') n=(k+1)%it.length; else if(e.key==='ArrowRight'||e.key==='ArrowUp') n=(k-1+it.length)%it.length; else if(e.key===' '||e.key==='Enter'){e.preventDefault(); sel(it[k]); return;}
    if(n!==null){e.preventDefault(); it[n].focus(); sel(it[n]);}});
}
function show(id){['s-menu','s-setup','s-play','s-end'].forEach(function(s){$(s).hidden=s!==id;});}

/* ---------- menu (no set chosen) ---------- */
function menu(){
  $('t-kicker').textContent='טְרִיוִיָּה'; $('t-title').textContent='טְרִיוִיָּה לְיַזָּמִים צְעִירִים';
  $('instr').textContent='בַּחֲרוּ טְרִיוִיָּה: טְרִיוִיַּת הַיַּזָּמִים הַגְּדוֹלָה, אוֹ טְרִיוִיָּה קְצָרָה לְכָל שִׁעוּר.';
  var ul=$('t-sets'), p=SH.getProgress(); ul.innerHTML='';
  ['big','l1','l2','l3','l4','l5'].forEach(function(k){var s=TRIVIA.sets[k];
    var li=document.createElement('li'); li.innerHTML='<a class="tset c-'+s.color+(k==='big'?' big':'')+'" href="trivia.html?set='+k+'"><span class="tset-art">'+art(s.art)+'</span><span class="tset-b"><span class="lesson"></span><b></b><span class="tset-n"></span></span>'+(p['t-'+k]?'<span class="done-badge">סִיַּמְתֶּם ✓</span>':'')+'</a>';
    li.querySelector('.lesson').textContent=s.kicker; li.querySelector('b').textContent=s.name; li.querySelector('.tset-n').textContent=s.qs.length+' שְׁאֵלוֹת';
    ul.appendChild(li);});
  show('s-menu');
}
/* ---------- setup ---------- */
function setup(){
  $('t-kicker').textContent=set.kicker; $('t-title').textContent=set.name;
  document.title=set.name.replace(/[\u0591-\u05C7]/g,'')+' | משחקי יזמות – שחקים';
  $('instr').textContent=(setId==='big'?'עֶשְׂרִים שְׁאֵלוֹת עַל יַזָּמִים, הַמְצָאוֹת מֵהַטֶּבַע, הַמְצָאוֹת יִשְׂרְאֵלִיּוֹת, מְקוֹרוֹת וְחֶסֶד.':set.qs.length+' שְׁאֵלוֹת עַל הַשִּׁעוּר.')+' אַחֲרֵי כָּל תְּשׁוּבָה יֵשׁ הֶסְבֵּר קָצָר. אֵין שָׁעוֹן – חוֹשְׁבִים בְּנַחַת!';
  $('setup-art').innerHTML=art(set.art);
  if(set.game){ $('to-game').hidden=false; $('to-game').href=set.game; $('to-game-l').textContent='לַמִּשְׂחָק: '+set.gameName; } else $('to-game').hidden=true;
  show('s-setup');
}
function start(){
  i=0; stars=0; right=0; turn=0;
  teams=mode==='teams'?TEAMS.slice(0,nTeams).map(function(t){return {n:t.n,c:t.c,sh:t.sh,score:0};}):[];
  qs=set.qs.map(function(q){return q;});
  show('s-play'); render(); $('t-q').focus();
}
/* ---------- play ---------- */
function board(){
  var b=$('t-score'); b.innerHTML='';
  if(mode==='teams'){
    teams.forEach(function(t,k){var li=document.createElement('li'); li.className='team t-'+t.c+(k===turn?' now':''); if(k===turn) li.setAttribute('aria-current','true');
      li.innerHTML='<span class="sh">'+t.sh+'</span><span class="tn"></span><span class="ts"></span>'; li.querySelector('.tn').textContent=t.n; li.querySelector('.ts').textContent=t.score+' נְקֻדּוֹת'; b.appendChild(li);});
    $('t-turn').hidden=false; $('t-turn').innerHTML='<span class="sh t-'+teams[turn].c+'">'+teams[turn].sh+'</span><span>הַתּוֹר שֶׁל: <b></b></span>'; $('t-turn').querySelector('b').textContent=teams[turn].n;
  } else {
    var li=document.createElement('li'); li.className='team solo'; li.innerHTML=SH.icons.star+'<span class="tn">כּוֹכָבִים</span><span class="ts">'+stars+'</span>'; b.appendChild(li);
    $('t-turn').hidden=true;
  }
}
function render(){
  var q=qs[i], w=phase==='why'; cur={q:w?q.why:q, opts:prep(w?{t:'mc',o:q.why.o}:q), t:w?'why':q.t}; answered=false;
  $('t-prog').textContent='שְׁאֵלָה '+(i+1)+' מִתּוֹךְ '+qs.length+(w?' · בּוֹנוּס':'');
  $('t-bar').style.width=((i+(w?.5:0))/qs.length*100)+'%';
  board();
  $('t-type').textContent=TYPE[cur.t]; $('t-type').className='t-type ty-'+cur.t;
  var a=w?'':(q.art||(q.t==='icon'?'':'')); $('t-art').innerHTML=a?art(a):''; $('t-art').hidden=!a;
  $('t-q').textContent=cur.q.q;
  var box=$('t-opts'); box.innerHTML=''; box.className='t-opts'+(cur.t==='icon'?' icons':'')+(cur.t==='tf'?' tf':'');
  cur.opts.forEach(function(o,k){var b=document.createElement('button'); b.type='button'; b.className='t-opt'; b.dataset.k=k;
    b.innerHTML='<span class="t-num" aria-hidden="true">'+(k+1)+'</span>'+(o.art||o.ic?'<span class="t-ic">'+art(o.art||o.ic)+'</span>':'')+'<span class="t-l"></span><span class="t-mark"></span>';
    b.querySelector('.t-l').textContent=o.l; b.addEventListener('click',function(){answer(k);}); box.appendChild(b);});
  $('t-ex').innerHTML=''; $('t-ex').className='feedback'; $('t-why').hidden=true; $('t-next').hidden=true;
  var card=$('t-card'); card.classList.remove('flip-in'); void card.offsetWidth; card.classList.add('flip-in'); SH.sfx.flip();
  if(SH.S.speech) readQ();
}
function readQ(){ SH.speak(cur.q.q+'. '+cur.opts.map(function(o,k){return 'אֶפְשָׁרוּת '+(k+1)+': '+o.l;}).join('. '),true); }
function answer(k){
  if(answered) return; answered=true;
  var o=cur.opts[k], ok=o.ok, btns=$('t-opts').querySelectorAll('.t-opt');
  btns.forEach(function(b,j){ b.setAttribute('aria-disabled','true'); var oj=cur.opts[j], m=b.querySelector('.t-mark');
    if(oj.ok){ b.classList.add('right'); m.innerHTML=TI.yes+'<span>'+(j===k?'נָכוֹן!':'הַתְּשׁוּבָה הַנְּכוֹנָה')+'</span>'; }
    else if(j===k){ b.classList.add('wrong'); m.innerHTML=TI.no+'<span>הַבְּחִירָה שֶׁלָּכֶם</span>'; }
    else b.classList.add('dim'); });
  if(ok){ right++; if(mode==='teams') teams[turn].score++; else stars++; }
  board();
  var who=mode==='teams'?teams[turn].n+': ':'';
  SH.feedback($('t-ex'), ok?'good':'try', who+(ok?rnd(GOOD)+(mode==='teams'?' נְקֻדָּה לַצֶּוֶת. ':' קִבַּלְתֶּם כּוֹכָב. '):rnd(TRY)+' ')+cur.q.ex);
  if(phase==='main'&&qs[i].why){ $('t-why').hidden=false; $('t-why').focus(); }
  else { $('t-next').hidden=false; $('t-next').textContent=i+1<qs.length?'לַשְּׁאֵלָה הַבָּאָה ←':'לַסִּכּוּם ←'; $('t-next').focus(); }
}
function next(){
  if(phase==='main'&&qs[i].why&&!$('t-why').hidden){ phase='why'; render(); $('t-q').focus(); return; }
  phase='main'; i++;
  if(mode==='teams'){ turn=(turn+1)%teams.length; }
  if(i>=qs.length){ end(); return; }
  render(); $('t-q').focus();
  if(mode==='teams') SH.announce('הַתּוֹר שֶׁל '+teams[turn].n);
}
/* ---------- end ---------- */
function end(){
  show('s-end'); SH.complete('t-'+setId);
  var total=qs.length+qs.filter(function(q){return q.why;}).length;
  var pod=$('podium'); pod.innerHTML='';
  if(mode==='teams'){
    var max=Math.max.apply(null,teams.map(function(t){return t.score;}))||1;
    var top=teams.filter(function(t){return t.score===max;});
    teams.forEach(function(t){var li=document.createElement('li'); li.className='pod t-'+t.c+(t.score===max&&max>0?' top':''); li.style.setProperty('--h',(18+82*t.score/max)+'%');
      li.innerHTML='<span class="pod-s">'+t.score+'</span><span class="pod-bar"><span class="sh">'+t.sh+'</span></span><span class="pod-n"></span>'; li.querySelector('.pod-n').textContent=t.n; li.setAttribute('aria-label',t.n+': '+t.score+' נְקֻדּוֹת'); pod.appendChild(li);});
    pod.hidden=false;
    $('end-h').textContent='כָּל הַצְּוָתִים סִיְּמוּ!';
    $('end-msg').textContent=(max>0?(top.length>1?'תֵּיקוֹ! הֲכִי הַרְבֵּה נְקֻדּוֹת: '+top.map(function(t){return t.n;}).join(' וְ'):'הֲכִי הַרְבֵּה נְקֻדּוֹת: '+top[0].n)+'. ':'')+'אֲבָל הַנִּצָּחוֹן הָאֲמִתִּי: כֻּלָּנוּ לָמַדְנוּ '+total+' דְּבָרִים חֲדָשִׁים הַיּוֹם!';
  } else {
    pod.hidden=true;
    $('end-h').textContent='סִיַּמְתֶּם אֶת הַטְּרִיוִיָּה!';
    var r=right/total, praise=r>=.8?'אַלּוּפִים!':r>=.5?'יָפֶה מְאוֹד!':'כָּל הַכָּבוֹד שֶׁנִּסִּיתֶם!';
    $('end-msg').textContent=praise+' עֲנִיתֶם נָכוֹן עַל '+right+' מִתּוֹךְ '+total+' שְׁאֵלוֹת, וְקִבַּלְתֶּם '+stars+' כּוֹכָבִים. וּמָה שֶׁהֲכִי חָשׁוּב – לְמַדְתֶּם דְּבָרִים חֲדָשִׁים!';
  }
  $('end-stars').innerHTML=mode==='teams'?'':new Array(Math.min(stars,10)+1).join(SH.icons.star);
  $('end-h').focus(); SH.confetti(); SH.speak($('end-h').textContent+' '+$('end-msg').textContent);
}
/* ---------- init ---------- */
document.addEventListener('DOMContentLoaded',function(){
  setId=(location.search.match(/[?&]set=([a-z0-9]+)/)||[])[1];
  set=setId&&TRIVIA.sets[setId];
  $('t-read').innerHTML=SH.icons.speaker+'<span>הַקְרִיאוּ אֶת הַשְּׁאֵלָה</span>';
  if(!('speechSynthesis' in window)) $('t-read').hidden=true;
  $('t-read').addEventListener('click',readQ);
  if(!set){ menu(); return; }
  setup();
  radio($('mode'),function(v){mode=v; $('teams-wrap').hidden=v!=='teams';});
  radio($('nteams'),function(v){nTeams=+v;});
  $('start').addEventListener('click',start);
  $('t-why').addEventListener('click',next);
  $('t-next').addEventListener('click',next);
  $('again').addEventListener('click',function(){setup(); $('setup-h').focus();});
  document.addEventListener('keydown',function(e){
    if($('s-play').hidden||answered||e.altKey||e.ctrlKey||e.metaKey) return;
    if(/^[1-4]$/.test(e.key)){ var k=+e.key-1; if(k<cur.opts.length){ e.preventDefault(); answer(k); } }
  });
});
})();
