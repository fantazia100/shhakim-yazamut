/* משחק 1.4 – אתגר המגדל: בנייה תלת־ממדית (Three.js מקומי), בדיקה ושיפור בסבבים */
(function(){
'use strict';
var MAXS=15, MAXC=4;
var BASES={wide:{s:3,h:8,cap:6,name:'בָּסִיס רָחָב',r0:9,r1:5},narrow:{s:2,h:12,cap:2.5,name:'בָּסִיס צַר',r0:3,r1:1.5}};
var LV={tri:{s:3,h:12,load:.5,name:'מְשֻׁלָּשׁ'},sq:{s:4,h:14,load:1.5,name:'רִבּוּעַ'},one:{s:1,h:20,load:2.5,name:'קַשִּׁית זְקוּפָה'}};
var $=function(id){return document.getElementById(id);};
var st={base:'wide',levels:[],pom:false}, round=1, rounds=[], tip=null, testing=false;

function strawsUsed(){return BASES[st.base].s+st.levels.reduce(function(a,l){return a+LV[l.t].s;},0);}
function clipsUsed(){return st.levels.filter(function(l){return l.clip;}).length;}
function height(){return BASES[st.base].h+st.levels.reduce(function(a,l){return a+LV[l.t].h;},0)+(st.pom?4:0);}
function physics(){
  var load=0; st.levels.forEach(function(l){load+=Math.max(0,LV[l.t].load-(l.clip?1:0));});
  load+=Math.max(0,st.levels.length-3)*.5+(st.pom?.3:0);
  var cap=BASES[st.base].cap; return {load:load,cap:cap,stands:load<=cap,margin:cap-load};
}
function snapshot(){return JSON.parse(JSON.stringify(st));}

/* ---------- UI ---------- */
function renderUI(){
  var su=strawsUsed(), cu=clipsUsed();
  var sh=''; for(var i=0;i<MAXS;i++) sh+='<i class="'+(i<su?'used':'')+'"></i>'; $('straws').innerHTML=sh;
  var ch=''; for(var j=0;j<MAXC;j++) ch+='<i class="'+(j<cu?'used':'')+'"></i>'; $('clips').innerHTML=ch;
  $('straw-n').textContent='נִשְׁאֲרוּ '+(MAXS-su)+' מִתּוֹךְ '+MAXS;
  $('clip-n').textContent='נִשְׁאֲרוּ '+(MAXC-cu)+' מִתּוֹךְ '+MAXC;
  document.querySelectorAll('[data-add]').forEach(function(b){var ok=su+LV[b.dataset.add].s<=MAXS; b.setAttribute('aria-disabled',String(!ok));});
  $('clip').setAttribute('aria-disabled',String(!(cu<MAXC && st.levels.some(function(l){return !l.clip;}))));
  $('undo').setAttribute('aria-disabled',String(!st.levels.length));
  var pom=$('pom'); pom.setAttribute('aria-pressed',String(st.pom)); pom.textContent=st.pom?'הַפּוֹנְפּוֹן בָּרֹאשׁ ✓':'שִׂימוּ פּוֹנְפּוֹן בָּרֹאשׁ';
  var ol=$('levels'); ol.innerHTML='';
  var li=document.createElement('li'); li.className='lv-base'; li.textContent=BASES[st.base].name; ol.appendChild(li);
  st.levels.forEach(function(l,i){var x=document.createElement('li'); x.textContent='קוֹמָה '+(i+1)+': '+LV[l.t].name+(l.clip?' + מְהַדֵּק':''); x.className='lv-'+l.t; ol.appendChild(x);});
  if(st.pom){var p=document.createElement('li'); p.className='lv-pom'; p.textContent='פּוֹנְפּוֹן'; ol.appendChild(p);}
  $('h-read').textContent='גֹּבַהּ: '+height()+' ס"מ';
  $('viewer').setAttribute('aria-label',describe());
  View.build(st);
}
function describe(){
  return 'מִגְדָּל בְּגֹבַהּ '+height()+' ס"מ: '+BASES[st.base].name+(st.levels.length?', '+st.levels.map(function(l,i){return 'קוֹמָה '+(i+1)+' '+LV[l.t].name+(l.clip?' עִם מְהַדֵּק':'');}).join(', '):', עוֹד בְּלִי קוֹמוֹת')+(st.pom?', וּפוֹנְפּוֹן בָּרֹאשׁ':'');
}
function add(t){
  if(testing) return;
  if(strawsUsed()+LV[t].s>MAXS){SH.feedback($('fb'),'try','אֵין מַסְפִּיק קַשִּׁיּוֹת לְ'+LV[t].name+'. נִשְׁאֲרוּ '+(MAXS-strawsUsed())+'. אוּלַי קוֹמָה אַחֶרֶת?'); return;}
  st.levels.push({t:t,clip:false}); SH.sfx.click(); renderUI();
  SH.announce('נוֹסְפָה קוֹמָה '+st.levels.length+': '+LV[t].name+'. גֹּבַהּ '+height()+' ס"מ. נִשְׁאֲרוּ '+(MAXS-strawsUsed())+' קַשִּׁיּוֹת.');
}
function clip(){
  if(testing) return;
  if(clipsUsed()>=MAXC){SH.feedback($('fb'),'try','הִשְׁתַּמַּשְׁתֶּם בְּכָל 4 הַמְּהַדְּקִים.'); return;}
  for(var i=st.levels.length-1;i>=0;i--){ if(!st.levels[i].clip){ st.levels[i].clip=true; SH.sfx.click(); renderUI(); SH.announce('קוֹמָה '+(i+1)+' חֻזְּקָה בִּמְהַדֵּק.'); return; } }
  SH.feedback($('fb'),'try','אֵין קוֹמָה לְחַזֵּק. הוֹסִיפוּ קוֹמָה קֹדֶם.');
}
function undo(){ if(testing||!st.levels.length) return; st.levels.pop(); renderUI(); SH.announce('הַקּוֹמָה הָעֶלְיוֹנָה הוּרְדָה. גֹּבַהּ '+height()+' ס"מ.'); }
function setBase(v){
  if(testing) return;
  var diff=BASES[v].s-BASES[st.base].s;
  if(strawsUsed()+diff>MAXS){SH.feedback($('fb'),'try','אֵין מַסְפִּיק קַשִּׁיּוֹת לְבָסִיס רָחָב. הוֹרִידוּ קוֹמָה קֹדֶם.'); syncBase(); return;}
  st.base=v; renderUI(); SH.announce(BASES[v].name+'. גֹּבַהּ '+height()+' ס"מ.');
}
function syncBase(){document.querySelectorAll('#base [role=radio]').forEach(function(b){b.setAttribute('aria-checked',String(b.dataset.v===st.base)); b.tabIndex=b.dataset.v===st.base?0:-1;});}

function analyze(res){
  var w=[], n=[];
  var tri=st.levels.filter(function(l){return l.t==='tri';}).length, sq=st.levels.filter(function(l){return l.t==='sq';}).length,
      one=st.levels.filter(function(l){return l.t==='one'&&!l.clip;}).length, cl=clipsUsed();
  if(st.base==='wide') w.push('הַבָּסִיס הָרָחָב הֶחֱזִיק יַצִּיב.'); else if(res.stands) w.push('הַבָּסִיס הַצַּר הֶחֱזִיק – יָפֶה!'); else n.push('הַבָּסִיס הַצַּר לֹא הֶחֱזִיק אֶת הַמִּשְׁקָל.');
  if(tri) w.push('הַמְּשֻׁלָּשִׁים חִזְּקוּ אֶת הַמִּגְדָּל.');
  if(cl) w.push('הַמְּהַדְּקִים חִזְּקוּ אֶת הַחִבּוּרִים.');
  if(sq&&(!res.stands||res.margin<1.5)) n.push('הָרִבּוּעִים הִתְנַדְנְדוּ.');
  if(one&&(!res.stands||res.margin<1.5)) n.push('הַקַּשִּׁיּוֹת הַבּוֹדְדוֹת הִתְכּוֹפְפוּ.');
  if(st.levels.length>4&&!res.stands) n.push('הַמִּגְדָּל גָּבוֹהַּ וְכָבֵד לְמַעְלָה.');
  if(res.stands) w.push('הַמִּגְדָּל עָמַד לְבַד!');
  if(res.stands && MAXS-strawsUsed()>=1) n.push('נִשְׁאֲרוּ קַשִּׁיּוֹת – אֶפְשָׁר לְהַגְבִּיהַּ עוֹד.');
  if(!n.length) n.push('הַכֹּל עָבַד! אֵיךְ אֶפְשָׁר לְהַגְבִּיהַּ עוֹד יוֹתֵר?');
  if(!w.length) w.push('נִסִּינוּ – וְלָמַדְנוּ מַשֶּׁהוּ חָדָשׁ.');
  return {w:w,n:n};
}
function changes(a,b){
  var c=[]; if(!a) return '–';
  if(a.base!==b.base) c.push(b.base==='wide'?'בָּסִיס רָחָב בִּמְקוֹם צַר':'בָּסִיס צַר בִּמְקוֹם רָחָב');
  ['tri','sq','one'].forEach(function(t){var x=a.levels.filter(function(l){return l.t===t;}).length, y=b.levels.filter(function(l){return l.t===t;}).length;
    if(y>x) c.push('יוֹתֵר '+{tri:'מְשֻׁלָּשִׁים',sq:'רִבּוּעִים',one:'קַשִּׁיּוֹת זְקוּפוֹת'}[t]); else if(y<x) c.push('פָּחוֹת '+{tri:'מְשֻׁלָּשִׁים',sq:'רִבּוּעִים',one:'קַשִּׁיּוֹת זְקוּפוֹת'}[t]);});
  var ca=a.levels.filter(function(l){return l.clip;}).length, cb=b.levels.filter(function(l){return l.clip;}).length;
  if(cb>ca) c.push('הוֹסַפְנוּ מְהַדְּקִים'); else if(cb<ca) c.push('פָּחוֹת מְהַדְּקִים');
  return c.length?c.join(', '):'בְּלִי שִׁנּוּי';
}
function nChanges(a,b){ var c=changes(a,b); return (c==='–'||c==='בְּלִי שִׁנּוּי')?0:c.split(', ').length; }
function tipUsed(t,a,b){
  if(!t||!a) return null;
  var cnt=function(s,k){return s.levels.filter(function(l){return l.t===k;}).length;}, cl=function(s){return s.levels.filter(function(l){return l.clip;}).length;};
  if(t==='tri') return cnt(b,'tri')>cnt(a,'tri');
  if(t==='base') return b.base==='wide';
  if(t==='clip') return cl(b)>cl(a);
  return null;
}
function test(){
  if(testing) return;
  if(!st.levels.length){SH.feedback($('fb'),'try','הוֹסִיפוּ לְפָחוֹת קוֹמָה אַחַת לִפְנֵי הַבְּדִיקָה.'); return;}
  if(!st.pom){SH.feedback($('fb'),'try','שִׂימוּ אֶת הַפּוֹנְפּוֹן בָּרֹאשׁ – זֶה חֵלֶק מֵהָאֶתְגָּר!'); $('pom').focus(); return;}
  testing=true; stopTimer();
  var res=physics(), h=height();
  SH.feedback($('fb'),'info','בּוֹדְקִים... יָדַיִם לְמַעְלָה!'); showViewer();
  View.test(res,function(){
    var prev=rounds.length?rounds[rounds.length-1]:null;
    rounds.push({n:round,h:h,stands:res.stands,snap:snapshot(),chg:changes(prev&&prev.snap,st),nchg:nChanges(prev&&prev.snap,st),tip:round>1?tip:null,tipUsed:round>1?tipUsed(tip,prev&&prev.snap,st):null});
    renderResults();
    if(res.stands){ SH.feedback($('fb'),'good',(res.margin<1?'הַמִּגְדָּל עוֹמֵד – אֲבָל מִתְנַדְנֵד קְצָת. ':'הַמִּגְדָּל עוֹמֵד! ')+'גֹּבַהּ: '+h+' ס"מ.'); SH.confetti(); }
    else { SH.sfx.fall(); SH.feedback($('fb'),'try','הַמִּגְדָּל נָפַל – וְזֶה בְּסֵדֶר! לוֹקְחִים נְשִׁימָה, וְלוֹמְדִים מִזֶּה. יַזָּמִים לוֹמְדִים מִכָּל נְפִילָה.'); }
    var a=analyze(res);
    $('worked').innerHTML=a.w.map(function(t){return '<li>'+t+'</li>';}).join('');
    $('notworked').innerHTML=a.n.map(function(t){return '<li>'+t+'</li>';}).join('');
    tip=null; document.querySelectorAll('#tips [role=radio]').forEach(function(b,i){b.setAttribute('aria-checked','false'); b.tabIndex=i?-1:0;});
    $('controls').hidden=true; $('stop').hidden=false; $('stop-h').focus();
    if(round>=2){ $('end').hidden=false; SH.complete('g4'); }
  });
}
function renderResults(){
  $('results').hidden=false;
  $('res-body').innerHTML=rounds.map(function(r){return '<tr><td>'+r.n+'</td><td>'+r.h+' ס"מ</td><td>'+(r.stands?'כֵּן':'נָפַל')+'</td><td>'+r.chg+'</td></tr>';}).join('');
  var imp=$('improve'); var msg='';
  if(rounds.length>=2){
    var a=rounds[rounds.length-2], b=rounds[rounds.length-1], extra='';
    if(b.tipUsed===true) extra+=' הִשְׁתַּמַּשְׁתֶּם בָּרֶמֶז שֶׁבְּחַרְתֶּם ✓';
    if(b.nchg>1) extra+=' שִׁנִּיתֶם כַּמָּה דְּבָרִים יַחַד – בַּסֶּבֶב הַבָּא נַסּוּ לְשַׁנּוֹת דָּבָר אֶחָד, וְתִרְאוּ מָה קוֹרֶה.';
    if(b.stands&&!a.stands) msg='בַּסֶּבֶב הַזֶּה הַמִּגְדָּל עָמַד – שִׁפּוּר גָּדוֹל! גֹּבַהּ '+b.h+' ס"מ.';
    else if(b.stands&&a.stands&&b.h>a.h) msg='שִׁפַּרְתֶּם בְּ־'+(b.h-a.h)+' ס"מ: מִ־'+a.h+' לְ־'+b.h+' ס"מ!';
    else if(b.stands) msg='הַמִּגְדָּל עָמַד שׁוּב. מָה עוֹד אֶפְשָׁר לְנַסּוֹת?';
    else msg='גַּם נְפִילָה מְלַמֶּדֶת. רוֹצִים לְנַסּוֹת סֶבֶב נוֹסָף?';
    msg+=extra;
  }
  imp.textContent=msg;
}
function nextRound(){
  if(!tip){SH.feedback($('fb'),'try','בַּחֲרוּ רֶמֶז אֶחָד לְנַסּוֹת בַּסֶּבֶב הַבָּא.'); return;}
  round++; testing=false; st={base:st.base,levels:[],pom:false}; syncBase(); View.reset();
  $('round-h').textContent='סֶבֶב '+round+(tip?' · הָרֶמֶז שֶׁלָּנוּ: '+SH.text(document.querySelector('#tips [data-v="'+tip+'"]')):'');
  $('stop').hidden=true; $('controls').hidden=false; $('fb').innerHTML=''; $('fb').className='feedback';
  $('next-round').textContent='לַסֶּבֶב הַבָּא – מְשַׁפְּרִים!';
  renderUI(); $('s-play').scrollIntoView({block:'start'}); $('round-h').focus({preventScroll:true}); SH.speak(SH.text($('round-h'))); startTimer();
}
function showViewer(){
  var v=$('viewer'), r=v.getBoundingClientRect(), top=(document.querySelector('.topbar')||{}).offsetHeight||0;
  if(r.top<top||r.bottom>innerHeight) v.scrollIntoView({block:'center',behavior:SH.fx()?'smooth':'auto'});
}
function restart(){
  round=1; rounds=[]; tip=null; testing=false; st={base:'wide',levels:[],pom:false}; syncBase(); View.reset();
  $('res-body').innerHTML=''; $('improve').textContent=''; $('results').hidden=true; $('end').hidden=true;
  $('round-h').textContent='סֶבֶב 1'; $('stop').hidden=true; $('controls').hidden=false; $('fb').innerHTML=''; $('fb').className='feedback';
  renderUI(); $('s-play').scrollIntoView({block:'start'}); $('round-h').focus({preventScroll:true}); SH.speak('סֶבֶב 1. בַּחֲרוּ בָּסִיס וְהוֹסִיפוּ קוֹמוֹת.'); startTimer();
}
/* ---------- optional hourglass ---------- */
var tLeft=0,tInt=null,paused=false;
function startTimer(){ stopTimer(); var hg=$('hourglass'); if(!SH.timers()){hg.hidden=true; return;} tLeft=120; paused=false; hg.hidden=false; $('hg-pause').textContent='עֲצִירָה'; drawT();
  tInt=setInterval(function(){ if(paused) return; tLeft--; drawT(); if(tLeft===30) SH.announce('נִשְׁאֲרוּ 30 שְׁנִיּוֹת'); if(tLeft<=0){ stopTimer(); SH.announce('הַזְּמַן נִגְמַר – יָדַיִם לְמַעְלָה!'); if(!st.pom) st.pom=true; renderUI(); test(); } },1000); }
function drawT(){var m=Math.floor(tLeft/60),s=tLeft%60; $('hg-time').textContent=m+':'+(s<10?'0':'')+s; $('hourglass').classList.toggle('low',tLeft<=30);}
function stopTimer(){ if(tInt){clearInterval(tInt); tInt=null;} }

/* ---------- 3D view (Three.js) with 2D fallback ---------- */
var View=(function(){
  var T=window.THREE, ok=false, renderer, scene, camera, root, pivot, tower, az=0.6, fallen=false, cd=null, cy=null, raf=null, anim=null, needs=true, lastH=40, el, texCache={};
  var COLORS=['#1e9bd7','#2bb35b','#8a5cd6','#f7941d'];
  function webgl(){ try{ var c=document.createElement('canvas'); return !!(window.WebGLRenderingContext&&(c.getContext('webgl2')||c.getContext('webgl'))); }catch(e){return false;} }
  function init(){
    el=$('viewer');
    if(!T||!webgl()){ fallback(); return; }
    try{
      renderer=new T.WebGLRenderer({antialias:true,alpha:true}); renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
      renderer.shadowMap.enabled=true; renderer.shadowMap.type=T.PCFSoftShadowMap;
      if('outputColorSpace' in renderer) renderer.outputColorSpace=T.SRGBColorSpace;
      renderer.domElement.setAttribute('aria-hidden','true'); el.appendChild(renderer.domElement);
      scene=new T.Scene();
      camera=new T.PerspectiveCamera(38,1,1,3000);
      scene.add(new T.HemisphereLight(0xffffff,0x9fb3d1,1.1));
      var d=new T.DirectionalLight(0xffffff,1.6); d.position.set(70,160,90); d.castShadow=true; d.shadow.mapSize.set(1024,1024);
      var sc=d.shadow.camera; sc.left=-120; sc.right=120; sc.top=200; sc.bottom=-60; sc.near=10; sc.far=500; scene.add(d);
      var table=new T.Mesh(new T.CylinderGeometry(75,75,5,64),new T.MeshStandardMaterial({color:0xe4c79d,roughness:.8}));
      table.position.y=-2.5; table.receiveShadow=true; scene.add(table);
      var rim=new T.Mesh(new T.TorusGeometry(75,1.4,12,96),new T.MeshStandardMaterial({color:0xc9a77a,roughness:.7})); rim.rotation.x=Math.PI/2; rim.position.y=0; scene.add(rim);
      root=new T.Group(); pivot=new T.Group(); tower=new T.Group(); pivot.add(tower); root.add(pivot); scene.add(root);
      ok=true; resize(); window.addEventListener('resize',resize);
      var drag=null;
      renderer.domElement.addEventListener('pointerdown',function(e){drag={x:e.clientX,az:az}; try{renderer.domElement.setPointerCapture(e.pointerId);}catch(_){}});
      renderer.domElement.addEventListener('pointermove',function(e){if(!drag) return; az=drag.az-(e.clientX-drag.x)*0.01; needs=true; kick();});
      ['pointerup','pointercancel'].forEach(function(t){renderer.domElement.addEventListener(t,function(){drag=null;});});
      renderer.domElement.style.touchAction='pan-y';
      document.addEventListener('sh-settings',function(e){if(e.detail.key==='fx') kick();});
      kick();
    }catch(e){ ok=false; fallback(); }
  }
  function tex(color){
    if(texCache[color]) return texCache[color];
    var c=document.createElement('canvas'); c.width=16; c.height=64; var g=c.getContext('2d');
    g.fillStyle='#ffffff'; g.fillRect(0,0,16,64); g.fillStyle=color; for(var y=0;y<64;y+=16){g.fillRect(0,y,16,9);}
    var t=new T.CanvasTexture(c); t.wrapS=t.wrapT=T.RepeatWrapping; if('colorSpace' in t) t.colorSpace=T.SRGBColorSpace; texCache[color]=t; return t;
  }
  var ci=0;
  function straw(a,b){
    var dir=new T.Vector3().subVectors(b,a), len=dir.length();
    var t=tex(COLORS[ci++%COLORS.length]).clone(); t.needsUpdate=true; t.repeat.set(1,len/7);
    var m=new T.Mesh(new T.CylinderGeometry(.8,.8,len,12),new T.MeshStandardMaterial({map:t,roughness:.6}));
    m.position.copy(a).add(b).multiplyScalar(.5); m.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),dir.normalize()); m.castShadow=true; tower.add(m);
  }
  function band(p,clip){
    var m=new T.Mesh(clip?new T.TorusGeometry(2,.55,10,24):new T.SphereGeometry(1.35,12,10),new T.MeshStandardMaterial({color:clip?0x9aa6bf:0xf6f1e4,metalness:clip?.8:0,roughness:clip?.25:.9}));
    m.position.copy(p); if(clip) m.rotation.x=Math.PI/2; m.castShadow=true; tower.add(m);
  }
  function ring(r,y,n,rot){var p=[];for(var i=0;i<n;i++){var a=rot+i*Math.PI*2/n;p.push(new T.Vector3(Math.cos(a)*r,y,Math.sin(a)*r));}return p;}
  function build(s){
    if(!ok){ draw2d(s,0); return; }
    while(tower.children.length){var c=tower.children.pop(); c.geometry&&c.geometry.dispose(); if(c.material){c.material.map&&c.material.map.dispose(); c.material.dispose();}}
    ci=0; fallen=false; pivot.rotation.set(0,0,0); pivot.position.set(0,0,0); tower.position.set(0,0,0);
    var B=BASES[s.base], y=0, top;
    if(s.base==='wide'){ var bot=ring(B.r0,0,3,0); top=ring(B.r1,B.h,3,Math.PI/3); bot.forEach(function(p,i){straw(p,top[i]);}); }
    else { var b1=[new T.Vector3(-B.r0,0,0),new T.Vector3(B.r0,0,0)], t1=[new T.Vector3(B.r1,B.h,0),new T.Vector3(-B.r1,B.h,0)]; straw(b1[0],t1[0]); straw(b1[1],t1[1]); top=[new T.Vector3(0,B.h,0)]; }
    y=B.h; var r=B.r1, rot=0;
    top.forEach(function(p){band(p);});
    s.levels.forEach(function(l){
      var L=LV[l.t], ny=y+L.h, nt;
      if(l.t==='tri'){ var nr=Math.max(1.6,r*.86); var from=ring(r,y,3,rot); nt=ring(nr,ny,3,rot+Math.PI/3); from.forEach(function(p,i){straw(p,nt[i]); straw(p,nt[(i+2)%3]);}); r=nr; rot+=Math.PI/3; }
      else if(l.t==='sq'){ var f4=ring(r,y,4,rot); nt=ring(r,ny,4,rot); f4.forEach(function(p,i){straw(p,nt[i]);}); }
      else { var c0=new T.Vector3(0,y,0); nt=[new T.Vector3(0,ny,0)]; straw(c0,nt[0]); r=.01; }
      nt.forEach(function(p){band(p);}); if(l.clip) band(new T.Vector3(0,ny-1.2,0),true);
      y=ny;
    });
    if(s.pom){ var g=new T.IcosahedronGeometry(3.4,3), pos=g.attributes.position; for(var i=0;i<pos.count;i++){var v=new T.Vector3().fromBufferAttribute(pos,i); v.multiplyScalar(1+(Math.sin(i*12.9898)*43758.5453%1)*.12); pos.setXYZ(i,v.x,v.y,v.z);} g.computeVertexNormals();
      var pm=new T.Mesh(g,new T.MeshStandardMaterial({color:0xf7941d,roughness:1})); pm.position.set(0,y+3,0); pm.castShadow=true; tower.add(pm); }
    lastH=Math.max(30,y+6); needs=true; kick();
  }
  function resize(){ if(!ok) return; var w=el.clientWidth, h=el.clientHeight; renderer.setSize(w,h,false); camera.aspect=w/h; camera.updateProjectionMatrix(); needs=true; kick(); }
  function frame(t){
    raf=null;
    var running=false;
    if(anim){ running=anim(t)!==false; if(!running) anim=null; }
    if(SH.fx()&&!anim&&!document.hidden){ az+=0.0025; running=true; }
    var td=fallen?Math.max(70,lastH*1.05+30):Math.max(70,lastH*1.45+28), tty=fallen?6:Math.min(lastH*.47,95);
    if(cd===null||!SH.fx()){cd=td; cy=tty;} else { cd+=(td-cd)*.06; cy+=(tty-cy)*.06; if(Math.abs(td-cd)>.5||Math.abs(tty-cy)>.3) running=true; }
    camera.position.set(Math.sin(az)*cd,cy+cd*.3,Math.cos(az)*cd); camera.lookAt(0,cy,0);
    renderer.render(scene,camera); needs=false;
    if(running||anim) raf=requestAnimationFrame(frame);
  }
  function kick(){ if(ok&&!raf) raf=requestAnimationFrame(frame); }
  function test(res,done){
    if(!ok){ testing2d(res,done); return; }
    var dir=Math.random()<.5?1:-1, edge=(st.base==='wide'?BASES.wide.r0*.5:BASES.narrow.r0)*dir, t0=null;
    pivot.position.set(edge,0,0); tower.position.set(-edge,0,0);
    if(!SH.fx()){ if(!res.stands){pivot.rotation.z=-dir*1.45; fallen=true;} needs=true; kick(); setTimeout(done,60); return; }
    var wob=res.stands?(res.margin<1?.06:.025):.07, ang=0, vel=0;
    anim=function(t){ if(t0===null) t0=t; var e=(t-t0)/1000;
      if(e<1.2){ pivot.rotation.z=-dir*Math.sin(e*14)*wob*(1-e/1.4); return true; }
      if(res.stands){ pivot.rotation.z=0; done(); return false; }
      vel+=0.0009+Math.sin(ang)*0.006; ang+=vel; if(ang>=1.45){ ang=1.45; pivot.rotation.z=-dir*ang; fallen=true; kick(); done(); return false; }
      pivot.rotation.z=-dir*ang; return true; };
    kick();
  }
  function reset(){ if(!ok){draw2d(st,0);return;} fallen=false; pivot.rotation.set(0,0,0); needs=true; kick(); }
  function rotate(d){ az+=d; needs=true; kick(); }
  /* ---- 2D fallback (SVG side view) ---- */
  function fallback(){ ok=false; el=$('viewer'); $('no3d').hidden=false; }
  function draw2d(s,fallAng){
    var box=$('no3d'); if(!box) return; var H=height()+10, W=60, y=H-2, parts='';
    var B=BASES[s.base]; var bw=s.base==='wide'?36:12;
    parts+='<path d="M'+(W/2-bw/2)+' '+y+'L'+(W/2-bw/4)+' '+(y-B.h)+'M'+(W/2+bw/2)+' '+y+'L'+(W/2+bw/4)+' '+(y-B.h)+'" stroke="#1a73b8" stroke-width="1.6"/>';
    var r=bw/4; y-=B.h;
    s.levels.forEach(function(l){var L=LV[l.t];
      if(l.t==='tri'){var nr=Math.max(2,r*.86); parts+='<path d="M'+(W/2-r)+' '+y+'L'+(W/2+nr)+' '+(y-L.h)+'M'+(W/2+r)+' '+y+'L'+(W/2-nr)+' '+(y-L.h)+'M'+(W/2-nr)+' '+(y-L.h)+'H'+(W/2+nr)+'" stroke="#2bb35b" stroke-width="1.6"/>'; r=nr;}
      else if(l.t==='sq'){parts+='<rect x="'+(W/2-r)+'" y="'+(y-L.h)+'" width="'+(2*r)+'" height="'+L.h+'" fill="none" stroke="#7446c2" stroke-width="1.6"/>';}
      else {parts+='<path d="M'+(W/2)+' '+y+'V'+(y-L.h)+'" stroke="#f7941d" stroke-width="1.6"/>'; r=.5;}
      if(l.clip) parts+='<circle cx="'+(W/2)+'" cy="'+(y-L.h+1)+'" r="1.4" fill="#9aa6bf"/>';
      y-=L.h;});
    if(s.pom) parts+='<circle cx="'+(W/2)+'" cy="'+(y-2.5)+'" r="3" fill="#f7941d"/>';
    box.innerHTML='<svg viewBox="0 0 '+W+' '+H+'" aria-hidden="true" style="height:100%;width:auto"><rect x="0" y="'+(H-2)+'" width="'+W+'" height="2" fill="#c9a77a"/><g style="transform-origin:'+(W/2+bw/2)+'px '+(H-2)+'px;transform:rotate('+(fallAng||0)+'deg);transition:transform 1s ease-in">'+parts+'</g></svg>';
  }
  function testing2d(res,done){ if(!res.stands){ var g=$('no3d').querySelector('g'); if(g) g.style.transform='rotate(80deg)'; } setTimeout(done,SH.fx()?1000:50); }
  return {init:init,build:build,test:test,reset:reset,rotate:rotate};
})();

function radio(group,onSel){
  var items=function(){return Array.prototype.slice.call(group.querySelectorAll('[role=radio]'));};
  function sel(b){items().forEach(function(x){x.setAttribute('aria-checked',String(x===b)); x.tabIndex=x===b?0:-1;}); SH.sfx.click(); onSel&&onSel(b.dataset.v);}
  var s=items().filter(function(x){return x.getAttribute('aria-checked')==='true';})[0]||items()[0]; items().forEach(function(x){x.tabIndex=x===s?0:-1;});
  group.addEventListener('click',function(e){var b=e.target.closest('[role=radio]'); if(b) sel(b);});
  group.addEventListener('keydown',function(e){var it=items(),i=it.indexOf(document.activeElement),n=null; if(i<0) return; if(e.key==='ArrowLeft'||e.key==='ArrowDown') n=(i+1)%it.length; else if(e.key==='ArrowRight'||e.key==='ArrowUp') n=(i-1+it.length)%it.length; else if(e.key===' '||e.key==='Enter'){e.preventDefault(); sel(it[i]); return;} if(n!==null){e.preventDefault(); it[n].focus(); sel(it[n]);}});
}

document.addEventListener('DOMContentLoaded',function(){
  var to=$('timer-opt'); to.setAttribute('aria-pressed',String(SH.timers()));
  to.addEventListener('click',function(){SH.setTimers(!SH.timers()); to.setAttribute('aria-pressed',String(SH.timers()));});
  document.addEventListener('sh-settings',function(e){ if(e.detail.key==='timers'){ to.setAttribute('aria-pressed',String(e.detail.value)); if(!e.detail.value){stopTimer(); $('hourglass').hidden=true;} } });
  $('start').addEventListener('click',function(){ $('s-start').hidden=true; $('s-play').hidden=false; View.init(); renderUI(); $('s-play').scrollIntoView({block:'start'}); $('round-h').focus({preventScroll:true}); SH.speak('סֶבֶב 1. בַּחֲרוּ בָּסִיס וְהוֹסִיפוּ קוֹמוֹת.'); startTimer(); });
  radio($('base'),setBase);
  radio($('tips'),function(v){tip=v; var m={tri:'נְנַסֶּה יוֹתֵר מְשֻׁלָּשִׁים.',base:'נְנַסֶּה בָּסִיס רָחָב.',small:'נְנַסֶּה קֹדֶם בְּקָטָן.',clip:'נְחַזֵּק בִּמְהַדְּקִים.'}; SH.announce('בְּחַרְתֶּם: '+m[v]);});
  document.querySelectorAll('[data-add]').forEach(function(b){b.addEventListener('click',function(){add(b.dataset.add);});});
  $('clip').addEventListener('click',clip); $('undo').addEventListener('click',undo);
  $('pom').addEventListener('click',function(){ if(testing) return; if(!st.levels.length){SH.feedback($('fb'),'try','בְּנוּ קֹדֶם קוֹמָה אַחַת לְפָחוֹת.'); return;} st.pom=!st.pom; renderUI(); SH.announce(st.pom?'הַפּוֹנְפּוֹן בָּרֹאשׁ':'הַפּוֹנְפּוֹן הוּרַד'); });
  $('test').addEventListener('click',test);
  $('next-round').addEventListener('click',nextRound); $('restart').addEventListener('click',restart);
  $('rot-r').addEventListener('click',function(){View.rotate(-.5);}); $('rot-l').addEventListener('click',function(){View.rotate(.5);});
  $('hg-pause').addEventListener('click',function(){paused=!paused; this.textContent=paused?'הַמְשָׁכָה':'עֲצִירָה'; SH.announce(paused?'הַשָּׁעוֹן נֶעֱצַר':'הַשָּׁעוֹן מַמְשִׁיךְ');});
  $('hg-off').addEventListener('click',function(){stopTimer(); $('hourglass').hidden=true; SH.announce('הַשָּׁעוֹן כָּבוּי');});
});
})();
