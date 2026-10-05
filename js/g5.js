/* משחק 1.5 – ציידי בעיות: מוצאים בעיות בסצנה, כרטיס ציד, ניסוח "איך אפשר...?", אב-טיפוס ותעודה */
(function(){
'use strict';
function S(b){return '<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">'+b+'</svg>';}
var A={
 tapDrip:S('<rect x="20" y="10" width="60" height="70" rx="6" fill="#b9c6dc"/><rect x="26" y="16" width="48" height="30" rx="4" fill="#e3f1fb"/><path d="M44 40h18v6H50v8h-6z" fill="#5b6b95"/><circle cx="47" cy="62" r="3" fill="#1e9bd7"/><circle cx="47" cy="72" r="2.4" fill="#1e9bd7"/><ellipse cx="50" cy="92" rx="30" ry="6" fill="#1e9bd7" opacity=".6"/>'),
 tapHigh:S('<rect x="38" y="6" width="24" height="90" rx="4" fill="#b9c6dc"/><path d="M50 14h20v6H58v6h-8z" fill="#5b6b95"/><path d="M14 96V66" stroke="#b85a00" stroke-width="3" stroke-dasharray="4 3"/><path d="M8 66h12" stroke="#b85a00" stroke-width="3"/><path d="M14 30v-8M10 26l4-4 4 4" stroke="#b85a00" stroke-width="3" fill="none"/>'),
 trash:S('<path d="M28 30h44l-5 62H33z" fill="#2bb35b"/><rect x="24" y="22" width="52" height="10" rx="4" fill="#177d3e"/><path d="M40 40v44M50 40v44M60 40v44" stroke="#177d3e" stroke-width="3"/>'),
 pot:S('<path d="M30 60h40l-6 32H36z" fill="#c25e00"/><path d="M50 60C40 40 30 40 28 30c10 0 18 6 22 18 2-16 10-26 22-28-2 14-10 24-22 40z" fill="#2bb35b"/>'),
 signWater:S('<rect x="15" y="15" width="70" height="50" rx="6" fill="#fff" stroke="#0a5fa0" stroke-width="4"/><path d="M50 24c8 10 12 16 12 22a12 12 0 0 1-24 0c0-6 4-12 12-22z" fill="#1e9bd7"/><rect x="46" y="65" width="8" height="30" fill="#5b6b95"/>'),
 shelfHigh:S('<rect x="14" y="4" width="72" height="92" rx="3" fill="#c99a63"/><rect x="18" y="8" width="64" height="20" fill="#f4e6d0"/><rect x="18" y="32" width="64" height="20" fill="#f4e6d0"/><rect x="18" y="56" width="64" height="18" fill="#f4e6d0"/><rect x="18" y="78" width="64" height="14" fill="#f4e6d0"/>'+[0,1,2,3,4,5,6].map(function(i){var c=['#1a73b8','#e0457b','#2bb35b','#ffc83d','#7446c2','#f7941d','#1e9bd7'][i];return '<rect x="'+(20+i*9)+'" y="10" width="7" height="18" fill="'+c+'"/>';}).join('')),
 booksFloor:S('<g transform="rotate(-12 40 70)"><rect x="14" y="62" width="34" height="10" fill="#1a73b8"/></g><g transform="rotate(18 64 70)"><rect x="48" y="60" width="34" height="10" fill="#e0457b"/></g><rect x="26" y="76" width="36" height="10" fill="#2bb35b"/><path d="M60 50l14 8-14 8z" fill="#ffc83d"/><rect x="30" y="40" width="20" height="26" fill="#7446c2" transform="rotate(-30 40 53)"/>'),
 armchair:S('<rect x="20" y="30" width="60" height="40" rx="10" fill="#7446c2"/><rect x="12" y="46" width="16" height="34" rx="6" fill="#5b2fa6"/><rect x="72" y="46" width="16" height="34" rx="6" fill="#5b2fa6"/><rect x="26" y="58" width="48" height="18" rx="6" fill="#8a5cd6"/><path d="M24 80v12M76 80v12" stroke="#3c1d70" stroke-width="5"/>'),
 lamp:S('<path d="M34 12h32l10 26H24z" fill="#ffc83d"/><rect x="47" y="38" width="6" height="48" fill="#5b6b95"/><ellipse cx="50" cy="90" rx="18" ry="5" fill="#5b6b95"/>'),
 rug:S('<ellipse cx="50" cy="70" rx="44" ry="18" fill="#f7941d"/><ellipse cx="50" cy="70" rx="34" ry="12" fill="#ffd08a"/><ellipse cx="50" cy="70" rx="20" ry="6" fill="#f7941d"/>'),
 blankSign:S('<rect x="46" y="40" width="8" height="56" fill="#8f6a3e"/><rect x="12" y="12" width="76" height="36" rx="5" fill="#fff" stroke="#8f6a3e" stroke-width="4"/><text x="50" y="40" font-size="26" text-anchor="middle" fill="#b85a00" font-weight="800">?</text>'),
 puddle:S('<path d="M10 72c6-14 26-12 34-8 10-8 34-8 40 2 12 2 10 16-4 18H18c-12-2-14-8-8-12z" fill="#1e9bd7" opacity=".75"/><path d="M30 70c8-4 16-4 22 0" stroke="#fff" stroke-width="2.5" fill="none" opacity=".8"/><path d="M76 42l8 14H68z" fill="#ffc83d" stroke="#b07a00" stroke-width="2"/>'),
 gate:S('<rect x="8" y="20" width="10" height="76" fill="#5b6b95"/><rect x="82" y="20" width="10" height="76" fill="#5b6b95"/>'+[0,1,2,3,4,5].map(function(i){return '<rect x="'+(24+i*10)+'" y="30" width="4" height="64" fill="#3a4a7a"/>';}).join('')+'<rect x="18" y="34" width="64" height="5" fill="#3a4a7a"/><rect x="18" y="80" width="64" height="5" fill="#3a4a7a"/>'),
 tree:S('<rect x="44" y="56" width="12" height="40" fill="#8f6a3e"/><circle cx="50" cy="38" r="26" fill="#2bb35b"/><circle cx="34" cy="50" r="16" fill="#22924c"/><circle cx="66" cy="50" r="16" fill="#22924c"/>'),
 recycle:S('<rect x="22" y="24" width="56" height="70" rx="6" fill="#ffc83d"/><rect x="18" y="16" width="64" height="12" rx="4" fill="#b07a00"/><path d="M40 52l10-14 10 14M58 66l-8 12-8-12M36 66h28" stroke="#14275c" stroke-width="4" fill="none" stroke-linejoin="round"/>'),
 benchSun:S('<circle cx="78" cy="18" r="12" fill="#ffc83d"/>'+[0,1,2,3,4,5,6,7].map(function(i){var a=i*Math.PI/4;return '<path d="M'+(78+Math.cos(a)*16).toFixed(1)+' '+(18+Math.sin(a)*16).toFixed(1)+'L'+(78+Math.cos(a)*22).toFixed(1)+' '+(18+Math.sin(a)*22).toFixed(1)+'" stroke="#f7941d" stroke-width="3"/>';}).join('')+'<rect x="10" y="56" width="70" height="8" rx="3" fill="#c25e00"/><rect x="10" y="44" width="70" height="7" rx="3" fill="#c25e00"/><path d="M16 64v26M74 64v26" stroke="#6b3100" stroke-width="5"/>'),
 brokenBench:S('<path d="M8 54h40l4 6-4 4H8z" fill="#c99a63"/><path d="M58 60l34 6v8l-36-4z" fill="#c99a63"/><path d="M14 64v26M86 72v18" stroke="#8f6a3e" stroke-width="5"/><path d="M50 52l6 8-6 6 8 6" stroke="#b3261e" stroke-width="3" fill="none"/>'),
 ball:S('<circle cx="50" cy="60" r="28" fill="#f7941d"/><path d="M22 60h56M50 32v56M30 40q20 20 40 0M30 80q20-20 40 0" stroke="#a84d00" stroke-width="2.5" fill="none"/>'),
 bin:S('<path d="M30 34h40l-4 58H34z" fill="#1a73b8"/><rect x="26" y="26" width="48" height="10" rx="4" fill="#0a5fa0"/>'),
 bottlesFall:S('<rect x="6" y="56" width="88" height="8" rx="3" fill="#c99a63"/><path d="M14 64v32M86 64v32" stroke="#8f6a3e" stroke-width="5"/><rect x="18" y="30" width="12" height="26" rx="3" fill="#9fd4f5" stroke="#1a73b8" stroke-width="2"/><g transform="rotate(50 60 50)"><rect x="54" y="28" width="12" height="26" rx="3" fill="#bfe6d6" stroke="#22924c" stroke-width="2"/></g><g transform="rotate(100 84 76)"><rect x="78" y="62" width="12" height="26" rx="3" fill="#ffd08a" stroke="#b85a00" stroke-width="2"/></g>'),
 lostItems:S('<rect x="10" y="62" width="34" height="22" rx="6" fill="#7446c2"/><rect x="50" y="70" width="40" height="10" rx="5" fill="#e0457b"/><circle cx="66" cy="54" r="10" fill="#1e9bd7"/><rect x="22" y="44" width="18" height="12" rx="3" fill="#2bb35b"/><text x="80" y="36" font-size="26" text-anchor="middle" fill="#b85a00" font-weight="800">?</text>'),
 board:S('<rect x="6" y="14" width="88" height="56" rx="4" fill="#177d3e" stroke="#8f6a3e" stroke-width="5"/><path d="M18 30h30M18 42h44M18 54h22" stroke="#fff" stroke-width="3" opacity=".8"/><rect x="30" y="72" width="40" height="5" fill="#8f6a3e"/>'),
 window:S('<rect x="14" y="10" width="72" height="72" rx="4" fill="#bfe6ff" stroke="#fff" stroke-width="6"/><path d="M50 10v72M14 46h72" stroke="#fff" stroke-width="6"/><circle cx="70" cy="28" r="7" fill="#ffc83d"/>'),
 clock:S('<circle cx="50" cy="50" r="38" fill="#fff" stroke="#14275c" stroke-width="5"/><path d="M50 50V26M50 50l16 10" stroke="#14275c" stroke-width="5" stroke-linecap="round"/>')
};
var STATIONS=[
 {id:'barzia',name:'הַבֶּרֶזִיָּה',bg:'#e3f1fb',items:[
  {id:'drip',art:'tapDrip',x:8,y:38,w:26,name:'בֶּרֶז שֶׁמְּטַפְטֵף',problem:'הַבֶּרֶז מְטַפְטֵף, וְהַמַּיִם נִשְׁפָּכִים עַל הָרִצְפָּה.',when:'כְּשֶׁהַמַּיִם נִשְׁפָּכִים עַל הָרִצְפָּה',who:'לְכֻלָּם',ideas:['שֶׁלֶט מְצֻיָּר: "סוֹגְרִים אֶת הַבֶּרֶז"','מַגָּשׁ שֶׁאוֹסֵף אֶת הַטִּפּוֹת – וּמַשְׁקִים בָּהֶן עֲצִיצִים','בֶּרֶזִיָּה חֲדָשָׁה מִזָּהָב']},
  {id:'high',art:'tapHigh',x:38,y:30,w:22,name:'בֶּרֶז גָּבוֹהַּ',problem:'הַבֶּרֶז גָּבוֹהַּ מִדַּי, וִילָדִים קְטַנִּים לֹא מַגִּיעִים אֵלָיו.',when:'כְּשֶׁהַבֶּרֶז גָּבוֹהַּ מִדַּי',who:'לְיַלְדֵי כִּתָּה א׳',ideas:['שֶׁלֶט חֵץ שֶׁמַּרְאֶה אֵיפֹה יֵשׁ בֶּרֶז נָמוּךְ','כּוֹס רַב־פַּעֲמִית שֶׁחָבֵר גָּדוֹל עוֹזֵר לְמַלֵּא','לְהָזִיז אֶת כָּל בֵּית הַסֵּפֶר']},
  {art:'trash',x:62,y:60,w:14,name:'פַּח אַשְׁפָּה'},{art:'pot',x:80,y:58,w:15,name:'עָצִיץ'},{art:'signWater',x:64,y:6,w:17,name:'שֶׁלֶט "שׁוֹמְרִים עַל הַמַּיִם"'}]},
 {id:'library',name:'הַסִּפְרִיָּה',bg:'#efe8fb',items:[
  {id:'shelf',art:'shelfHigh',x:5,y:32,w:30,name:'מַדָּף גָּבוֹהַּ',problem:'הַסְּפָרִים הָאֲהוּבִים נִמְצָאִים עַל מַדָּף גָּבוֹהַּ מִדַּי.',when:'כְּשֶׁהַסְּפָרִים עַל מַדָּף גָּבוֹהַּ',who:'לִילָדִים קְטַנִּים',ideas:['תֵּבָה נְמוּכָה לַסְּפָרִים הָאֲהוּבִים','רְשִׁימָה מְצֻיֶּרֶת שֶׁל סְפָרִים – וּמְבַקְּשִׁים מֵהַסַּפְרָנִית','מַעֲלִית לְכָל סֵפֶר']},
  {id:'floor',art:'booksFloor',x:38,y:57,w:22,name:'סְפָרִים עַל הָרִצְפָּה',problem:'סְפָרִים מְפֻזָּרִים עַל הָרִצְפָּה – אֵין מָקוֹם בָּרוּר לְהַחְזִיר אוֹתָם.',when:'כְּשֶׁאֵין מָקוֹם לְהַחְזִיר סְפָרִים',who:'לַסַּפְרָנִית',ideas:['תֵּבַת "הַחְזָרַת סְפָרִים" מִקֻּפְסַת קַרְטוֹן','שֶׁלֶט צִבְעוֹנִי לְכָל מַדָּף','לִזְרֹק אֶת כָּל הַסְּפָרִים']},
  {art:'armchair',x:70,y:46,w:24,name:'כֻּרְסָה'},{art:'lamp',x:44,y:20,w:15,name:'מְנוֹרָה'},{art:'rug',x:62,y:62,w:20,name:'שָׁטִיחַ'}]},
 {id:'entrance',name:'הַכְּנִיסָה לְבֵית הַסֵּפֶר',bg:'#fff0dc',items:[
  {id:'nosign',art:'blankSign',x:60,y:26,w:22,name:'לוּחַ שֶׁלֶט רֵיק',problem:'אֵין שֶׁלֶט – מְבַקְּרִים לֹא יוֹדְעִים לְאָן לָלֶכֶת.',when:'כְּשֶׁלֹּא בָּרוּר לְאָן הוֹלְכִים',who:'לִמְבַקְּרִים',ideas:['שֶׁלֶט חִצִּים צִבְעוֹנִי עִם סְמָלִים','מַפָּה מְצֻיֶּרֶת שֶׁל בֵּית הַסֵּפֶר','לִסְגֹּר אֶת הַשַּׁעַר לְכֻלָּם']},
  {id:'puddle',art:'puddle',x:28,y:58,w:24,name:'שְׁלוּלִית',problem:'יֵשׁ שְׁלוּלִית לְיַד הַשַּׁעַר, וְהָרִצְפָּה מַחֲלִיקָה.',when:'כְּשֶׁיֵּשׁ שְׁלוּלִית בַּכְּנִיסָה',who:'לְכֻלָּם',ideas:['שֶׁלֶט אַזְהָרָה: "זְהִירוּת, מַחֲלִיק!"','מִכְתָּב מְנֻמָּס לְאַב הַבַּיִת עִם צִיּוּר שֶׁל הַמָּקוֹם','גֶּשֶׁר עֲנָק מֵעַל הַשְּׁלוּלִית']},
  {art:'gate',x:22,y:20,w:28,name:'שַׁעַר'},{art:'tree',x:2,y:26,w:22,name:'עֵץ'},{art:'recycle',x:86,y:58,w:12,name:'מִתְקַן מִחְזוּר'}]},
 {id:'yard',name:'הֶחָצֵר',bg:'#e2f6e8',items:[
  {id:'shade',art:'benchSun',x:6,y:34,w:30,name:'סַפְסָל בַּשֶּׁמֶשׁ',problem:'אֵין צֵל לְיַד הַסַּפְסָלִים, וְחַם מְאוֹד בַּהַפְסָקָה.',when:'כְּשֶׁחַם וְאֵין צֵל',who:'לִילָדִים בַּהַפְסָקָה',ideas:['לְהַצִּיעַ לַהַנְהָלָה לִשְׁתֹּל עֵץ – וּלְהַשְׁקוֹת אוֹתוֹ יַחַד','שֶׁלֶט "פִּנַּת צֵל" שֶׁמַּרְאֶה אֵיפֹה יֵשׁ צֵל','לְכַבּוֹת אֶת הַשֶּׁמֶשׁ']},
  {id:'broken',art:'brokenBench',x:56,y:52,w:26,name:'סַפְסָל שָׁבוּר',problem:'הַסַּפְסָל שָׁבוּר, וְאִי אֶפְשָׁר לָשֶׁבֶת עָלָיו.',when:'כְּשֶׁהַסַּפְסָל שָׁבוּר',who:'לְמִי שֶׁרוֹצֶה לָשֶׁבֶת',ideas:['שֶׁלֶט "זְהִירוּת, שָׁבוּר" וְהוֹדָעָה לְאַב הַבַּיִת','מִכְתָּב לַהַנְהָלָה עִם צִיּוּר שֶׁל סַפְסָל מְתֻקָּן','לְהַדְבִּיק אֶת הַסַּפְסָל בִּנְיַר דֶּבֶק']},
  {art:'ball',x:42,y:68,w:12,name:'כַּדּוּר'},{art:'tree',x:66,y:10,w:22,name:'עֵץ'},{art:'bin',x:87,y:60,w:11,name:'פַּח'}]},
 {id:'class',name:'הַכִּתָּה שֶׁלָּנוּ',bg:'#fff8d6',items:[
  {id:'bottles',art:'bottlesFall',x:32,y:48,w:28,name:'בַּקְבּוּקִים עַל הַשֻּׁלְחָן',problem:'הַבַּקְבּוּקִים נוֹפְלִים מֵהַשֻּׁלְחָנוֹת – אֵין לָהֶם מָקוֹם.',when:'כְּשֶׁאֵין מָקוֹם לַבַּקְבּוּקִים',who:'לַתַּלְמִידִים בַּכִּתָּה',ideas:['מִתְלֶה לְבַקְבּוּקִים מִקַּרְטוֹן','מַגָּשׁ לְבַקְבּוּקִים עִם מָקוֹם לְכָל אֶחָד','לֹא לִשְׁתּוֹת מַיִם בַּכִּתָּה']},
  {id:'lost',art:'lostItems',x:66,y:62,w:22,name:'חֲפָצִים שֶׁנִּשְׁכְּחוּ',problem:'חֲפָצִים שֶׁנִּשְׁכְּחוּ מְפֻזָּרִים, וְלֹא יוֹדְעִים שֶׁל מִי הֵם.',when:'כְּשֶׁחֲפָצִים הוֹלְכִים לְאִבּוּד',who:'לְמִי שֶׁאִבֵּד מַשֶּׁהוּ',ideas:['תֵּבַת מְצִיאוֹת – כְּדֵי לְקַיֵּם הֲשָׁבַת אֲבֵדָה','תָּוִיּוֹת שֵׁם צִבְעוֹנִיּוֹת לַחֲפָצִים','לִזְרֹק כָּל מָה שֶׁעַל הָרִצְפָּה']},
  {art:'board',x:30,y:2,w:28,name:'לוּחַ'},{art:'window',x:70,y:8,w:18,name:'חַלּוֹן'},{art:'clock',x:6,y:10,w:13,name:'שָׁעוֹן'}]}
];
var WHO=['לִילָדִים קְטַנִּים','לַצֶּוֶת','לִמְבַקְּרִים','לְכֻלָּם'];
var FEEL=['לֹא נָעִים לָהֶם','קָשֶׁה לָהֶם','הֵם מְבֻלְבָּלִים','הֵם מֻדְאָגִים'];
var PRINC=[['גְּמִישׁוּת מַחְשַׁבְתִּית','חֲשַׁבְתֶּם עַל שִׁמּוּשׁ חָדָשׁ לְדָבָר מֻכָּר – כְּמוֹ בְּשִׁעוּר 1.1!'],['חִבּוּר בֵּין עוֹלָמוֹת','חִבַּרְתֶּם שְׁנֵי דְּבָרִים לְרַעְיוֹן חָדָשׁ – כְּמוֹ בְּשִׁעוּר 1.2!'],['יְצִירָתִיּוּת מִתּוֹךְ אִלּוּץ','בּוֹנִים מִמָּה שֶׁיֵּשׁ – כְּמוֹ בְּצַלְאֵל בְּשִׁעוּר 1.3!'],['פִּתְרוֹן בְּעָיָה','בּוֹנִים, בּוֹדְקִים וּמְשַׁפְּרִים – כְּמוֹ בְּאֶתְגַּר הַמִּגְדָּל!']];
var $=function(id){return document.getElementById(id);};
var cur=0, found={}, curItem=null, chosen=null, q={who:null,when:null}, idea=null, princ=null, stars=0;

function allProblems(){var a=[]; STATIONS.forEach(function(s){s.items.forEach(function(it){if(it.problem) a.push(it);});}); return a;}
function radio(group,list,onSel,labels){
  group.innerHTML='';
  list.forEach(function(v,i){var b=document.createElement('button'); b.type='button'; b.className=group.classList.contains('chips')?'chip-btn':'choice'; b.setAttribute('role','radio'); b.setAttribute('aria-checked','false'); b.tabIndex=i===0?0:-1; b.dataset.v=v; b.textContent=labels?labels[i]:v; group.appendChild(b);});
  var items=function(){return Array.prototype.slice.call(group.querySelectorAll('[role=radio]'));};
  function sel(b){items().forEach(function(x){x.setAttribute('aria-checked',String(x===b)); x.tabIndex=x===b?0:-1;}); SH.sfx.click(); onSel&&onSel(b.dataset.v,b);}
  group.onclick=function(e){var b=e.target.closest('[role=radio]'); if(b) sel(b);};
  group.onkeydown=function(e){var it=items(),i=it.indexOf(document.activeElement),n=null; if(i<0) return; if(e.key==='ArrowLeft'||e.key==='ArrowDown') n=(i+1)%it.length; else if(e.key==='ArrowRight'||e.key==='ArrowUp') n=(i-1+it.length)%it.length; else if(e.key===' '||e.key==='Enter'){e.preventDefault(); sel(it[i]); return;} if(n!==null){e.preventDefault(); it[n].focus(); sel(it[n]);}};
}
function val(g){var s=g.querySelector('[aria-checked="true"]'); return s?s.dataset.v:null;}

function renderStations(){
  var g=$('stations'); g.innerHTML='';
  STATIONS.forEach(function(s,i){
    var n=s.items.filter(function(it){return it.problem&&found[it.id];}).length;
    var b=document.createElement('button'); b.type='button'; b.className='st-btn'; b.setAttribute('aria-pressed',String(i===cur));
    b.innerHTML='<span>'+s.name+'</span><span class="st-c">'+n+'/2</span>';
    b.setAttribute('aria-label',s.name+', נִמְצְאוּ '+n+' מִתּוֹךְ 2 בְּעָיוֹת');
    b.addEventListener('click',function(){cur=i; renderStations(); renderScene(); SH.announce(s.name);});
    g.appendChild(b);
  });
  var total=Object.keys(found).length;
  $('found-n').textContent='מְצָאתֶם '+total+' מִתּוֹךְ 10 בְּעָיוֹת';
}
function renderScene(){
  var s=STATIONS[cur], sc=$('scene');
  sc.style.setProperty('--wall',s.bg); sc.dataset.st=s.id;
  $('scene-name').textContent=s.name;
  Array.prototype.slice.call(sc.querySelectorAll('.hot')).forEach(function(x){x.remove();});
  s.items.forEach(function(it){
    var b=document.createElement('button'); b.type='button'; b.className='hot'+(it.problem&&found[it.id]?' found':'');
    b.style.left=it.x+'%'; b.style.top=it.y+'%'; b.style.width=it.w+'%';
    b.innerHTML=A[it.art]+(it.problem&&found[it.id]?'<span class="hot-star" aria-hidden="true">'+SH.icons.star+'</span>':'');
    b.setAttribute('aria-label',it.name+(it.problem&&found[it.id]?' – בְּעָיָה שֶׁמְּצָאתֶם':''));
    b.addEventListener('click',function(){tap(it,b);});
    sc.appendChild(b);
  });
}
function tap(it,b){
  if(!it.problem){ SH.feedback($('fb'),'info',it.name+': זֶה בְּסֵדֶר – זֶה לֹא מַפְרִיעַ לְאַף אֶחָד. חַפְּשׂוּ עוֹד!'); return; }
  if(found[it.id]){ SH.feedback($('fb'),'info','אֶת הַבְּעָיָה הַזֹּאת כְּבָר מְצָאתֶם: '+it.problem); return; }
  curItem=it; b.classList.add('ping');
  $('hc-empty').hidden=true; $('hc-form').hidden=false;
  $('hc-problem').textContent=it.problem;
  var who=WHO.indexOf(it.who)<0?WHO.concat([it.who]):WHO.slice();
  radio($('hc-who'),who); radio($('hc-feel'),FEEL);
  $('fb-hc').innerHTML=''; $('fb-hc').className='feedback';
  SH.sfx.good(); $('hc-h').focus(); SH.speak('מְצָאתֶם בְּעָיָה! '+it.problem+' לְמִי זֶה מַפְרִיעַ?');
  if(window.matchMedia('(max-width:56rem)').matches) $('huntcard').scrollIntoView({behavior:SH.fx()?'smooth':'auto',block:'start'});
}
function saveHunt(){
  var w=val($('hc-who')), f=val($('hc-feel'));
  if(!w||!f){ SH.feedback($('fb-hc'),'try',!w?'בַּחֲרוּ לְמִי זֶה מַפְרִיעַ.':'בַּחֲרוּ אֵיךְ זֶה מַרְגִּישׁ לָהֶם.'); return; }
  found[curItem.id]={who:w,feel:f};
  var li=document.createElement('li'); li.innerHTML=SH.icons.star+'<span></span>'; li.querySelector('span').textContent=curItem.problem; $('found-list').appendChild(li);
  $('hc-form').hidden=true; $('hc-empty').hidden=false;
  var total=Object.keys(found).length;
  renderStations(); renderScene();
  SH.feedback($('fb'),'good','תּוֹדָה שֶׁחֲשַׁבְתֶּם עַל הָרְגָשׁוֹת שֶׁל אֲחֵרִים – זוֹ עַיִן שֶׁל יַזָּמִים! '+(total>=3?'אֶפְשָׁר לְהַמְשִׁיךְ לְאַב־טִיפּוּס, אוֹ לְחַפֵּשׂ עוֹד.':'חַפְּשׂוּ עוֹד בְּעָיוֹת.'));
  if(total>=3){ $('to-build').hidden=false; }
  if(total===10) SH.confetti();
  var nx=document.querySelector('.hot:not(.found)'); (nx||$('stations').querySelector('[aria-pressed="true"]')).focus();
}
function hint(){
  var s=STATIONS[cur], left=s.items.filter(function(it){return it.problem&&!found[it.id];});
  if(!left.length){ var nxt=STATIONS.findIndex(function(st){return st.items.some(function(it){return it.problem&&!found[it.id];});}); SH.feedback($('fb'),'info',nxt<0?'מְצָאתֶם אֶת כָּל הַבְּעָיוֹת!':'בַּתַּחֲנָה הַזֹּאת מְצָאתֶם הַכֹּל. נַסּוּ אֶת '+STATIONS[nxt].name+'.'); return; }
  var it=left[0]; var btns=$('scene').querySelectorAll('.hot'); var idx=s.items.indexOf(it);
  var b=btns[idx]; b.classList.remove('hinted'); void b.offsetWidth; b.classList.add('hinted'); setTimeout(function(){b.classList.remove('hinted');},3000);
  SH.feedback($('fb'),'info','רֶמֶז: הִסְתַּכְּלוּ טוֹב עַל '+it.name+'. לְמִי זֶה יָכוֹל לְהַפְרִיעַ?');
}
/* ---- build ---- */
function toBuild(){
  $('s-hunt').hidden=true; $('s-build').hidden=false;
  var list=allProblems().filter(function(it){return found[it.id];});
  radio($('pick'),list.map(function(it){return it.id;}),function(v){ chosen=list.filter(function(x){return x.id===v;})[0]; setupQ(); },list.map(function(it){return it.problem;}));
  ['step2','step3','step4'].forEach(function(s){$(s).hidden=true;}); $('to-wall').hidden=true; chosen=null;
  $('build-h').focus(); SH.speak('מִבְּעָיָה לְאַב־טִיפּוּס. בַּחֲרוּ בְּעָיָה אַחַת שֶׁנִּפְתֹּר לְמַעַן אֲחֵרִים.');
}
function setupQ(){
  q={who:null,when:null}; idea=null; princ=null;
  $('step2').hidden=false; $('step3').hidden=true; $('step4').hidden=true; $('to-wall').hidden=true;
  var who=WHO.indexOf(chosen.who)<0?[chosen.who].concat(WHO):WHO.slice();
  var others=SH.shuffle(allProblems().filter(function(x){return x!==chosen;})).slice(0,2).map(function(x){return x.when;});
  radio($('q-who'),who,function(v){q.who=v; updQ();});
  radio($('q-when'),SH.shuffle([chosen.when].concat(others)),function(v){
    if(v!==chosen.when){ SH.feedback($('fb2'),'try','הַחֵלֶק הַזֶּה מְתָאֵר בְּעָיָה אַחֶרֶת. בַּחֲרוּ מָה שֶׁמַּתְאִים לַבְּעָיָה שֶׁלָּנוּ: '+chosen.problem); q.when=null; updQ(); return; }
    q.when=v; updQ(); });
  updQ();
}
function updQ(){
  $('question').textContent='אֵיךְ אֶפְשָׁר לַעֲזֹר '+(q.who||'___')+' '+(q.when||'___')+'?';
  if(q.who&&q.when&&$('step3').hidden){
    SH.feedback($('fb2'),'good','שְׁאֵלָה מְצֻיֶּנֶת! הִיא פּוֹתַחַת הַרְבֵּה רַעְיוֹנוֹת.');
    $('step3').hidden=false;
    radio($('ideas'),chosen.ideas.map(function(_,i){return String(i);}),function(v){
      if(v==='2'){ SH.feedback($('fb2'),'try','רַעְיוֹן מַצְחִיק! אֲבָל אִי אֶפְשָׁר לִבְנוֹת אוֹתוֹ, אוֹ שֶׁהוּא לֹא בֶּאֱמֶת עוֹזֵר. בַּחֲרוּ פִּתְרוֹן שֶׁאֲנַחְנוּ יְכוֹלִים לַעֲשׂוֹת.'); idea=null; return; }
      idea=chosen.ideas[+v]; SH.feedback($('fb2'),'good','פִּתְרוֹן שֶׁאֶפְשָׁר לִבְנוֹת – וְהוּא עוֹזֵר לַאֲחֵרִים!');
      if($('step4').hidden){ $('step4').hidden=false; radio($('princ'),PRINC.map(function(p){return p[0];}),function(pv){ princ=pv; var p=PRINC.filter(function(x){return x[0]===pv;})[0]; SH.feedback($('fb2'),'good',p[1]); $('to-wall').hidden=false; }); }
    },chosen.ideas);
    shuffleChildren($('ideas'));
  }
}
function shuffleChildren(g){var k=SH.shuffle(Array.prototype.slice.call(g.children)); k.forEach(function(c,i){g.appendChild(c); c.tabIndex=i===0?0:-1;});}
function toWall(){
  $('s-build').hidden=true; $('s-wall').hidden=false;
  var p=$('poster'); p.innerHTML='<p class="p-k">הַשְּׁאֵלָה שֶׁלָּנוּ</p><h3></h3><p class="p-k">אַב־הַטִּיפּוּס</p><p class="p-idea"></p><p class="p-princ"></p><div class="p-art" aria-hidden="true">'+A[chosen.art]+'</div>';
  p.querySelector('h3').textContent=SH.text($('question')); p.querySelector('.p-idea').textContent=idea; p.querySelector('.p-princ').textContent='הָעִקָּרוֹן: '+princ;
  radio($('feel2'),['שְׂמֵחִים','גֵּאִים','מְרֻגָּשִׁים'],function(){SH.feedback($('fb3'),'good','זֶה הָאֹשֶׁר שֶׁבַּנְּתִינָה – עוֹשִׂים טוֹב לַאֲחֵרִים וּמַרְגִּישִׁים טוֹב!');});
  $('wall-h').focus();
}
document.addEventListener('DOMContentLoaded',function(){
  document.querySelectorAll('[data-a]').forEach(function(e){e.innerHTML=ART[e.dataset.a]||'';});
  renderStations(); renderScene();
  $('hint').addEventListener('click',hint);
  $('hc-save').addEventListener('click',saveHunt);
  $('to-build').addEventListener('click',toBuild);
  $('back-hunt').addEventListener('click',function(){$('s-build').hidden=true; $('s-hunt').hidden=false; $('stations').querySelector('[aria-pressed="true"]').focus();});
  $('to-wall').addEventListener('click',toWall);
  $('star').addEventListener('click',function(){ if(stars>=5){SH.announce('כְּבָר יֵשׁ 5 כּוֹכָבִים!'); return;} stars++; $('stars').innerHTML=new Array(stars+1).join(SH.icons.star)+'<span class="sr-only">'+stars+' כּוֹכָבִים</span>'; SH.sfx.good(); });
  radio($('title'),['צַיַּד בְּעָיוֹת','צַיֶּדֶת בְּעָיוֹת']);
  $('cert-btn').addEventListener('click',function(){
    var t=val($('title')); if(!t){SH.feedback($('fb3'),'try','בַּחֲרוּ: צַיַּד בְּעָיוֹת אוֹ צַיֶּדֶת בְּעָיוֹת.'); return;}
    $('cert-title').textContent=t; $('cert-wrap').hidden=false; SH.complete('g5'); SH.confetti();
    SH.feedback($('fb3'),'good','כָּל הַכָּבוֹד! סִיַּמְתֶּם אֶת הַתַּחֲנָה הָרִאשׁוֹנָה בְּסַרְגֵּל הַיַּזָּמוּת.');
    $('cert').setAttribute('tabindex','-1'); setTimeout(function(){$('cert').focus(); $('cert').scrollIntoView({behavior:SH.fx()?'smooth':'auto',block:'center'});},100);
  });
  $('print').addEventListener('click',function(){window.print();});
  $('hunt-more').addEventListener('click',function(){ $('s-wall').hidden=true; $('cert-wrap').hidden=true; $('fb3').innerHTML=''; $('fb3').className='feedback'; toBuild(); });
});
})();
