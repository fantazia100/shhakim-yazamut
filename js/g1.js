/* משחק 1.1 – חפץ אחד, מאה שימושים: מיון רעיונות לשלושה סלים */
(function(){
'use strict';
var OBJ=[
 {id:'egg',art:'eggCarton',name:'קֻפְסַת בֵּיצִים',ideas:[
  ['p','מַגָּשׁ לִזְרָעִים קְטַנִּים','שָׂמִים אֲדָמָה בְּכָל גֻּמָּה וְשׁוֹתְלִים זֶרַע.'],
  ['p','מְסַדֵּר לַחֲרוּזִים וּלְמַחֲקִים','כָּל גֻּמָּה הִיא תָּא קָטָן לְמִיּוּן.'],
  ['p','מִשְׂחָק: זוֹרְקִים פְּקָק לַגֻּמָּה','קַל לִבְנוֹת, וּמְשַׂחֲקִים בּוֹ עִם חֲבֵרִים.'],
  ['i','חֲלָלִית שֶׁטָּסָה לַיָּרֵחַ','לַקֻּפְסָה אֵין מָנוֹעַ וְאֵין לָהּ כֹּחַ לָעוּף.'],
  ['i','קֻפְסָה שֶׁמְּטִילָה בֵּיצִים בְּעַצְמָהּ','רַק תַּרְנְגֹלֶת מְטִילָה בֵּיצִים!'],
  ['u','עוֹמְדִים עָלֶיהָ כְּדֵי לְהַגִּיעַ לַמַּדָּף','הַקֻּפְסָה תִּמָּעֵךְ, וְאֶפְשָׁר לִפֹּל וּלְהִפָּגַע.']]},
 {id:'roll',art:'roll',name:'גְּלִיל קַרְטוֹן',ideas:[
  ['p','מַחֲזִיק עֶפְרוֹנוֹת','מַעֲמִידִים אֶת הַגְּלִיל, וְהָעֶפְרוֹנוֹת נִכְנָסִים לְתוֹכוֹ.'],
  ['p','מִשְׁקֶפֶת לְמִשְׂחָק','מְחַבְּרִים שְׁנֵי גְּלִילִים וּמִסְתַּכְּלִים דַּרְכָּם.'],
  ['p','מִנְהָרָה לִמְכוֹנִית צַעֲצוּעַ','הַמְּכוֹנִית נוֹסַעַת בְּתוֹךְ הַגְּלִיל.'],
  ['i','גְּלִיל שֶׁהוֹפֵךְ לְעֵץ אֲמִתִּי','קַרְטוֹן לֹא צוֹמֵחַ וְלֹא הוֹפֵךְ לְעֵץ.'],
  ['i','טִיל שֶׁטָּס עַד הַשֶּׁמֶשׁ','לַגְּלִיל אֵין מָנוֹעַ, וְאִי אֶפְשָׁר לָטוּס עַד הַשֶּׁמֶשׁ.'],
  ['u','צוֹעֲקִים דַּרְכּוֹ לְתוֹךְ הָאֹזֶן שֶׁל חָבֵר','קוֹל חָזָק בָּאֹזֶן עָלוּל לְהַזִּיק לַשְּׁמִיעָה – וְזֶה גַּם לֹא נָעִים לַחָבֵר.']]},
 {id:'spoon',art:'spoon',name:'כַּף עֵץ',ideas:[
  ['p','מְעַרְבְּבִים בָּהּ צֶבַע','הִיא אֲרֻכָּה וַחֲזָקָה, וּמַתְאִימָה לְעִרְבּוּב.'],
  ['p','מַקֵּל שֶׁתּוֹמֵךְ בִּשְׁתִיל','תּוֹקְעִים אוֹתָהּ בָּאֲדָמָה וְקוֹשְׁרִים אֵלֶיהָ אֶת הַשְּׁתִיל.'],
  ['p','מוֹדְדִים בָּהּ אֶת אֹרֶךְ הַשֻּׁלְחָן','סוֹפְרִים כַּמָּה כַּפּוֹת יֵשׁ, כְּמוֹ בְּסַרְגֵּל.'],
  ['i','כַּף שֶׁמְּסַפֶּרֶת סִפּוּרִים','לְכַף עֵץ אֵין פֶּה וְאֵין קוֹל.'],
  ['i','מַטֵּה קֶסֶם שֶׁמַּעֲלִים כָּל דָּבָר','זֶה קֶסֶם – לֹא מַשֶּׁהוּ שֶׁאֶפְשָׁר לִבְנוֹת.'],
  ['u','מְשַׂחֲקִים בָּהּ קְרַב חֲרָבוֹת','אֶפְשָׁר לִפְגֹּעַ בָּעֵינַיִם אוֹ בַּגּוּף.']]},
 {id:'pin',art:'clothespin',name:'אֶטֶב כְּבִיסָה',ideas:[
  ['p','מַחֲזִיק דַּפִּים יַחַד','הָאֶטֶב לוֹחֵץ, וְהַדַּפִּים לֹא מִתְפַּזְּרִים.'],
  ['p','תּוֹלִים צִיּוּרִים עַל חוּט בַּכִּתָּה','כְּמוֹ כְּבִיסָה – רַק עִם צִיּוּרִים!'],
  ['p','סוֹגֵר שַׂקִּית שֶׁלֹּא תִּשָּׁפֵךְ','הָאֶטֶב סוֹגֵר אֶת הַשַּׂקִּית חָזָק.'],
  ['i','אֶטֶב שֶׁעָף כְּמוֹ צִפּוֹר','לְאֶטֶב אֵין כְּנָפַיִם.'],
  ['i','תַּנִּין קָטָן שֶׁמְּדַבֵּר','הָאֶטֶב לֹא חַי וְלֹא מְדַבֵּר – רַק בַּדִּמְיוֹן.'],
  ['u','מַצְמִידִים אוֹתוֹ לָאַף שֶׁל חָבֵר','זֶה כּוֹאֵב, וְזֶה לֹא נָעִים לַחָבֵר.']]},
 {id:'cap',art:'cap',name:'פְּקָק',ideas:[
  ['p','גַּלְגַּלִּים לִמְכוֹנִית מִקַּרְטוֹן','הַפְּקָק עָגֹל – בְּדִיּוּק כְּמוֹ גַּלְגַּל.'],
  ['p','כְּלִי לְמִשְׂחַק דַּמְקָה','צוֹבְעִים פְּקָקִים בִּשְׁנֵי צְבָעִים וּמְשַׂחֲקִים.'],
  ['p','חוֹתֶמֶת לְצִיּוּר','טוֹבְלִים בְּצֶבַע וּמַחְתִּימִים עִגּוּלִים.'],
  ['i','פְּקָק שֶׁהוֹפֵךְ לְמַטְבֵּעַ שֶׁל זָהָב','פְּלַסְטִיק לֹא הוֹפֵךְ לְזָהָב.'],
  ['i','סִירָה שֶׁמַּשִּׁיטָה אֶת כָּל הַכִּתָּה','הַפְּקָק קָטָן מִדַּי – הוּא לֹא יָכוֹל לָשֵׂאת אֶת כֻּלָּנוּ.'],
  ['u','שָׂמִים אוֹתוֹ בַּפֶּה','אֶפְשָׁר לְהִחָנֵק! פְּקָקִים לֹא שָׂמִים בַּפֶּה.']]}
];
var BIN={p:'מַעֲשִׂי',i:'דִּמְיוֹנִי',u:'לֹא בָּטוּחַ'};
var PRAISE=['נָכוֹן!','מְצֻיָּן!','כָּל הַכָּבוֹד!','חֲשַׁבְתֶּם כְּמוֹ מַמְצִיאִים!','יֹפִי שֶׁל מַחְשָׁבָה!'];
var INIT=['לַעֲזֹר לְסַדֵּר אֶת הַכִּתָּה','לְהָכִין צִיּוּר לְסָבְתָא אוֹ לְסָבָא','לְשַׁתֵּף חָבֵר בַּמִּשְׂחָק בַּהַפְסָקָה','לַעֲזֹר לַעֲרֹךְ אֶת הַשֻּׁלְחָן בַּבַּיִת','לְהַגִּיד תּוֹדָה לְמִישֶׁהוּ שֶׁעוֹזֵר לָנוּ'];
var $=function(id){return document.getElementById(id);};
var cur=null, queue=[], idx=0, tries=0, counts, practical=[], done={}, totalPractical=0, busy=false;
var screens=['s-pick','s-sort','s-done','s-card'];
function show(id){screens.forEach(function(s){$(s).hidden=(s!==id);});}

function buildPick(){
  var g=$('objects'); g.innerHTML='';
  OBJ.forEach(function(o){
    var b=document.createElement('button'); b.type='button'; b.className='choice'; b.dataset.id=o.id;
    b.innerHTML=ART[o.art]+'<span>'+o.name+'</span>'+(done[o.id]?'<small>✓ מִיַּנְתֶּם</small>':'<small>6 רַעְיוֹנוֹת</small>');
    b.setAttribute('aria-label',o.name+(done[o.id]?' – כְּבָר מִיַּנְתֶּם':''));
    b.addEventListener('click',function(){start(o);});
    g.appendChild(b);
  });
  var n=Object.keys(done).length;
  $('to-card').hidden=n===0;
  $('g1-total').textContent=n?('עַד עַכְשָׁיו מְצָאתֶם '+totalPractical+' שִׁמּוּשִׁים מַעֲשִׂיִּים. כִּתָּה ב׳: 3 שִׁמּוּשִׁים · כִּתָּה ג׳: 6 וּמַעְלָה.'):'';
}
function start(o){
  cur=o; queue=SH.shuffle(o.ideas); idx=0; counts={p:0,i:0,u:0}; practical=[];
  $('sort-h').textContent=o.name+': מָה עוֹד אֶפְשָׁר לַעֲשׂוֹת אִתּוֹ?';
  $('obj-art').innerHTML=ART[o.art];
  document.querySelectorAll('.bin-n').forEach(function(n){n.textContent='0';});
  $('fb').innerHTML=''; $('fb').className='feedback';
  show('s-sort'); dealCard(); $('sort-h').setAttribute('tabindex','-1'); $('s-sort').scrollIntoView({block:'start'}); $('sort-h').focus({preventScroll:true});
  SH.speak(SH.text($('sort-h')));
}
function dealCard(){
  var c=queue[idx]; tries=0;
  $('card-obj').textContent=cur.name+' ←';
  $('card-text').textContent=c[1];
  $('sort-count').textContent='רַעְיוֹן '+(idx+1)+' מִתּוֹךְ '+queue.length;
  $('sort-bar').style.width=(idx/queue.length*100)+'%';
  var card=$('card'); card.classList.remove('gone','flipped-in'); void card.offsetWidth; card.classList.add('flipped-in');
  SH.sfx.flip(); busy=false;
}
function choose(bin){
  if(busy||!cur) return;
  var c=queue[idx], binEl=document.querySelector('.bin[data-bin="'+bin+'"]');
  if(bin===c[0]){
    busy=true;
    counts[bin]++; document.querySelector('[data-n="'+bin+'"]').textContent=counts[bin];
    if(bin==='p'){practical.push(c[1]);}
    SH.feedback($('fb'),'good',PRAISE[Math.floor(Math.random()*PRAISE.length)]+' '+BIN[bin]+': '+c[2]);
    var card=$('card'); card.classList.add('gone'); binEl.classList.add('got'); setTimeout(function(){binEl.classList.remove('got');},500);
    setTimeout(next, SH.fx()?900:250);
  } else {
    tries++;
    if(tries<2){
      SH.feedback($('fb'),'try','כִּמְעַט! חִשְׁבוּ שׁוּב: הַאִם אֶפְשָׁר לַעֲשׂוֹת אֶת זֶה בֶּאֱמֶת? הַאִם זֶה בָּטוּחַ?');
      if(SH.fx()){binEl.classList.remove('shake'); void binEl.offsetWidth; binEl.classList.add('shake');}
    } else {
      busy=true;
      counts[c[0]]++; document.querySelector('[data-n="'+c[0]+'"]').textContent=counts[c[0]];
      if(c[0]==='p') practical.push(c[1]);
      SH.feedback($('fb'),'info','הַתְּשׁוּבָה: '+BIN[c[0]]+'. '+c[2]+' – נַמְשִׁיךְ לָרַעְיוֹן הַבָּא.');
      $('card').classList.add('gone');
      setTimeout(next, SH.fx()?1600:400);
    }
  }
}
function next(){
  idx++;
  if(idx<queue.length){dealCard(); return;}
  $('sort-bar').style.width='100%';
  if(!done[cur.id]){done[cur.id]=true; totalPractical+=practical.length;}
  $('done-h').textContent='כָּל הַכָּבוֹד! מִיַּנְתֶּם אֶת כָּל הָרַעְיוֹנוֹת שֶׁל '+cur.name+'.';
  var ul=$('uses'); ul.innerHTML='';
  practical.forEach(function(t){var li=document.createElement('li'); li.textContent=t; ul.appendChild(li);});
  show('s-done'); $('done-h').focus(); SH.confetti(); SH.speak(SH.text($('done-h')));
}
function buildCard(){
  var g=$('init'); g.innerHTML='';
  INIT.forEach(function(t){var b=document.createElement('button'); b.type='button'; b.className='choice'; b.setAttribute('role','radio'); b.setAttribute('aria-checked','false'); b.dataset.v=t; b.textContent=t; g.appendChild(b);});
  radio($('who')); radio(g);
}
function radio(group){
  var items=function(){return Array.prototype.slice.call(group.querySelectorAll('[role="radio"]'));};
  items().forEach(function(b,i){b.tabIndex=i===0?0:-1;});
  group.addEventListener('click',function(e){var b=e.target.closest('[role="radio"]'); if(!b) return; select(b);});
  group.addEventListener('keydown',function(e){var it=items(), i=it.indexOf(document.activeElement); if(i<0) return;
    var k=e.key, n=null; if(k==='ArrowDown'||k==='ArrowLeft') n=(i+1)%it.length; else if(k==='ArrowUp'||k==='ArrowRight') n=(i-1+it.length)%it.length; else if(k===' '||k==='Enter'){e.preventDefault(); select(it[i]); return;}
    if(n!==null){e.preventDefault(); it[n].focus(); select(it[n]);}});
  function select(b){items().forEach(function(x){x.setAttribute('aria-checked',String(x===b)); x.tabIndex=x===b?0:-1;}); SH.sfx.click();}
}
function val(group){var s=group.querySelector('[aria-checked="true"]'); return s?s.dataset.v:null;}

document.addEventListener('DOMContentLoaded',function(){
  document.querySelectorAll('[data-a]').forEach(function(e){e.innerHTML=ART[e.dataset.a]||'';});
  buildPick(); buildCard();
  document.querySelectorAll('.bin').forEach(function(b){b.addEventListener('click',function(){choose(b.dataset.bin);});});
  SH.drag($('card'),{targets:function(){return document.querySelectorAll('.bin');},onDrop:function(t){choose(t.dataset.bin);}});
  document.addEventListener('keydown',function(e){
    if($('s-sort').hidden||e.target.tagName==='INPUT') return;
    if(e.key==='1'||e.key==='2'||e.key==='3'){e.preventDefault(); choose(['p','i','u'][+e.key-1]);}
  });
  $('another').addEventListener('click',function(){buildPick(); show('s-pick'); $('pick-h').setAttribute('tabindex','-1'); $('pick-h').focus();});
  function toCard(){show('s-card'); $('card-h').focus();}
  $('to-card').addEventListener('click',toCard); $('to-card2').addEventListener('click',toCard);
  $('own-form').addEventListener('submit',function(e){e.preventDefault(); var v=$('own').value.trim(); if(!v) return;
    var li=document.createElement('li'); li.className='mine'; li.textContent=v+' (הָרַעְיוֹן שֶׁלִּי)'; $('uses').appendChild(li); $('own').value=''; totalPractical++;
    SH.feedback($('fb-own'),'good','הָרַעְיוֹן נוֹסַף לָרְשִׁימָה. אֵין רַעְיוֹן טִפְּשִׁי!');});
  $('make-card').addEventListener('click',function(){
    var w=val($('who')), it=val($('init'));
    if(!w||!it){SH.feedback($('fb2'),'try', !w?'בַּחֲרוּ: אֲנִי יַזָּם אוֹ אֲנִי יַזֶּמֶת.':'בַּחֲרוּ יוֹזְמָה קְטַנָּה לַשָּׁבוּעַ.'); return;}
    $('cert-title').textContent=w; $('cert-init').textContent=it+'.';
    $('flip-wrap').hidden=false; var fc=$('flipcard'); fc.classList.remove('flipped'); void fc.offsetWidth; setTimeout(function(){fc.classList.add('flipped');},60);
    SH.feedback($('fb2'),'good','אֵיזֶה יֹפִי! אֶת מִי הַיּוֹזְמָה שֶׁלָּכֶם תְּשַׂמֵּחַ? סַפְּרוּ לָנוּ בַּשָּׁבוּעַ הַבָּא!');
    SH.complete('g1'); SH.confetti();
    setTimeout(function(){$('cert').setAttribute('tabindex','-1'); $('flip-wrap').scrollIntoView({behavior:SH.fx()?'smooth':'auto',block:'center'});},200);
  });
  $('print').addEventListener('click',function(){window.print();});
});
})();
