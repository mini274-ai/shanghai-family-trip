(function(){
'use strict';
const D=window.RouteData,M=window.RouteModel,P=window.ROUTE_PLACES;
if(!D||!M||!P){document.getElementById('map-error').hidden=false;document.getElementById('map-error').textContent='지도 자료를 불러오지 못했습니다. 기존 상세 시간표를 이용해 주세요.';return;}
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt=n=>new Intl.NumberFormat('ko-KR').format(Math.round(n));
const round5=n=>Math.ceil(n/5)*5;
const approx=n=>n==null?'<span class="unqueried">미조회</span>':`약 ${fmt(n)}분`;
const modes={car:'버스',foot:'도보',ferry:'페리',inside:'권역 내 이동'};
const symbol={car:'▰',foot:'↗',ferry:'≈',inside:'·'};
const state={...D.defaults,buffer:15,highlight:false};
try{const h=new URLSearchParams(location.hash.slice(1));const day=+h.get('day');if(Number.isInteger(day)&&day>=0&&day<=5)state.day=day;const t=h.get('team');if(['both','city','disney','outside','rest','active','vehicle'].includes(t))state.team=t;}catch{}
let saved={};try{saved=JSON.parse(localStorage.getItem('shanghai-route-hotels-v1')||'{}');}catch{}
let hotels=(Array.isArray(saved.hotels)?saved.hotels:[]).filter(h=>h&&['B','C'].includes(h.id)&&Array.isArray(h.coord)&&validCoords(h.coord[1],h.coord[0])).slice(0,2).map(h=>({...h,name:String(h.name||'위치 비교용 핀').slice(0,70),address:String(h.address||'').slice(0,140)}));
let prices=saved.prices||{},cache={...(window.ROUTE_CACHE||{})},dynamic={};
try{const stored=JSON.parse(localStorage.getItem('shanghai-route-cache-v1')||'{}');for(const [k,r] of Object.entries(stored)){if(k.startsWith('fossgis-osrm-v5|')&&r&&Number.isFinite(r.durationSeconds)&&Number.isFinite(r.distanceMeters)&&r.geometry?.type==='LineString'&&r.geometry.coordinates?.every(c=>Array.isArray(c)&&c.length===2&&c.every(Number.isFinite)))dynamic[k]=r;}Object.assign(cache,dynamic);}catch{}
let data=D.build(state),map=null,routeGroup=null,pinGroup=null,markerByPlace={},selectedVisit=null,picking=false,editingId=null,queryAbort=null,busy=false;
const colors={1:'#273a56',2:'#416c94',3:'#467968',4:'#a88038',5:'#78728c'};
function validCoords(lat,lon){return Number.isFinite(Number(lat))&&Number.isFinite(Number(lon))&&+lat>=30.7&&+lat<=31.7&&+lon>=120.9&&+lon<=122;}
function persist(){try{localStorage.setItem('shanghai-route-hotels-v1',JSON.stringify({hotels,prices}));}catch{}}
function allHotels(){return [{id:'A',name:'크라운플라자 난징로드',coord:P.hotel.coord},...hotels];}
function selectedJourneys(){return data.journeys.filter(j=>(!state.day||j.day===state.day)&&(state.team==='both'||state.team==='vehicle'||!state.day||j.team===state.team||j.team==='all'));}
function visibleLegs(){if(state.team==='vehicle'&&state.day)return M.coach(state.day,data,P,null,cache);return [...new Set(selectedJourneys().flatMap(j=>j.legIds))].map(id=>M.resolve(data.legs[id],data,P,null,cache));}
function updateHash(){try{history.replaceState(null,'',`${location.pathname}${location.search}#day=${state.day}&team=${state.team}`);}catch{}}
function metricText(t){if(!t.total)return '해당 없음';if(!t.known)return '미조회';return `약 ${fmt(t.minutes)}분${t.complete?'':' + 미조회'}`;}
function coverage(t){return `${t.known}/${t.total}구간 조회${t.km?` · ${t.km.toFixed(1)}km`:''}`;}
function routeText(l){const r=l.route;if(l.mode==='ferry')return '양안 연결 개념선 · 대기·항행시간 미산출';if(l.mode==='inside')return '권역 내부 · 거리 미산출';if(!r)return '지도 미조회 · 실제 경로가 아닌 연결선';if(r.samePoint)return '같은 지도 위치 · 건물 내부 이동 별도';return `지도 약 ${fmt(r.durationSeconds/60)}분 · ${(r.distanceMeters/1000).toFixed(1)}km${l.mode==='car'?' · 교통 미반영':''}`;}
function planText(l){if(l.group==='d4-return')return '이 세 구간 전체에 60분 배정';return l.plan.minutes===null?'배정시간 개별 미분리':`계획 배정 ${l.plan.minutes}분`;}
function setDay(day){state.day=day;state.team='both';selectedVisit=null;render();updateHash();}
function renderDays(){ $('#days').innerHTML=[0,1,2,3,4,5].map(d=>`<button type="button" class="day-tab ${state.day===d?'active':''}" data-day="${d}" aria-pressed="${state.day===d}"><span class="en">${d?'Day '+d:'전체'}</span><span class="date">${d?D.meta.dates[d-1]:'4박 5일'}</span></button>`).join('');$$('[data-day]').forEach(b=>b.addEventListener('click',()=>setDay(+b.dataset.day)));}
function renderFilters(){
 let html='';
 const teamsets={2:[['both','두 팀'],['city','시내팀'],['disney','디즈니팀'],['vehicle','버스 운행']],3:[['both','두 선택팀'],['outside','외부 활동'],['rest','호텔 휴식'],['vehicle','버스 운행']],4:[['both','두 팀'],['active','활동팀'],['rest','휴식팀'],['vehicle','버스 운행']]};
 if(teamsets[state.day])html+=`<div class="segmented team-picker" aria-label="팀 선택">${teamsets[state.day].map(([v,t])=>`<button type="button" data-team="${v}" class="${state.team===v?'active':''}" aria-pressed="${state.team===v}">${t}</button>`).join('')}</div>`;
 const select=(id,label,opts,val)=>`<label>${label}<select id="${id}">${opts.map(([v,t])=>`<option value="${v}" ${val===v?'selected':''}>${t}</option>`).join('')}</select></label>`;
 if(state.day===1)html+=`<label class="check-label"><input id="day1-walk" type="checkbox" ${state.day1Walk?'checked':''}>첫날 난징동루 선택 산책</label>`;
 if(state.day===2){html+=select('museum','전시 한 곳',[['history','상하이역사박물관'],['planning','도시계획전시관']],state.museum)+select('dinner','저녁 한 곳',[['laozhengxing','라오정싱 푸저우루'],['xinya','신야 난징동루']],state.dinner)+select('day2-rest','점심 후',[['hotel','호텔 휴식'],['cafe','인근 카페']],state.day2Rest)+select('evening-mode','저녁 이동',[['car','버스'],['foot','도보']],state.eveningMode);}
 if(state.day===3)html+=select('activity','외부 활동 한 곳',[['cafe','신톈디 카페·쇼핑'],['massage','마사지 (시간 확인)'],['park','푸싱공원']],state.activity);
 if(state.day===4)html+=select('viewpoint','루자쭈이 선택',[['ifc','육교·IFC 카페'],['tower','상하이타워 전망대']],state.viewpoint);
 $('#filters').innerHTML=html;
 $$('[data-team]').forEach(b=>b.addEventListener('click',()=>{state.team=b.dataset.team;render();updateHash();}));
 for(const [id,prop] of [['museum','museum'],['dinner','dinner'],['day2-rest','day2Rest'],['activity','activity'],['viewpoint','viewpoint'],['evening-mode','eveningMode']])if($('#'+id))$('#'+id).addEventListener('change',e=>{state[prop]=e.target.value;render();});
 if($('#day1-walk'))$('#day1-walk').addEventListener('change',e=>{state.day1Walk=e.target.checked;render();});
}
function renderTimeline(){
 const target=$('#timeline');
 if(!state.day){$('#list-title').textContent='우리 여행의 닷새';target.innerHTML=D.meta.titles.map((t,i)=>`<button class="day-summary" type="button" data-summary="${i+1}"><span class="mini-day">Day ${i+1}</span><span class="mini-date">${D.meta.dates[i]}</span><h4>${esc(t)} <span aria-hidden="true">↗</span></h4><p>${esc(D.meta.summaries[i])}</p><span class="mini-rest">${['16:15 체크인 후 선택 휴식','시내팀 낮 호텔 복귀 · 버스 순환','14:15 호텔 휴식 선택 · 17:25 가족사진','휴식팀 원안 150분 · 17:15 BFC 재합류','11:00 공항 도착 · 수속 여유 유지'][i]}</span></button>`).join('');$$('[data-summary]').forEach(b=>b.addEventListener('click',()=>setDay(+b.dataset.summary)));return;}
 if(state.team==='vehicle'){
  $('#list-title').textContent='22인승 버스 한 대의 순서';
  target.innerHTML=`<p class="visit-note" style="padding:12px 20px">승객 운행 사이에 필요한 빈 차 이동을 포함합니다. 순서를 보여주는 운행안이며 배차 확정표가 아닙니다.</p>`+M.coach(state.day,data,P,null,cache).map((l,i)=>`<article class="visit-card"><span class="visit-time">${l.occupied?'원안 '+esc(l.plan.time):'앞 운행 후 · 다음 탑승 전'}</span><strong class="visit-title">${i+1}. ${esc(P[l.from].name)} → ${esc(P[l.to].name)}</strong><div class="leg-chip ${l.occupied?'':'empty'}"><strong>${l.occupied?'▰ 승객 탑승':'▱ 빈 차 · 가족 탑승시간 제외'}</strong><br>${routeText(l)}<span class="plan">${l.occupied?planText(l):esc(l.note)}</span></div>${state.day===2&&l.occupied&&l.from==='hotel'&&['history','planning'].includes(l.to)?'<p class="visit-note">이 구간의 원안 09:00는 공유차량 복귀 뒤로 조정합니다. 지도 아래 출발 범위를 확인하세요.</p>':''}</article>`).join('');return;
 }
 $('#list-title').textContent=`Day ${state.day} · 방문 순서`;
 target.innerHTML=selectedJourneys().map(j=>{
 const byVisit=new Map(j.legIds.map(id=>[data.legs[id].toVisit,M.resolve(data.legs[id],data,P,null,cache)]));
 return `<div class="journey-label">${esc(j.label)}<small>${['all'].includes(j.team)?'순서대로':'같은 날 병행 · 공통 일정 포함'}</small></div>`+j.visitIds.map((id,i)=>{const v=data.visits[id],l=byVisit.get(id);return `<article class="visit-card ${v.kind} ${id===selectedVisit?'selected':''}" data-visit-card="${id}"><button type="button" class="visit-main" data-visit="${id}"><span class="visit-time">${esc(v.time)}</span><span class="visit-title"><span class="visit-order">${i+1}.</span> ${esc(v.title)}</span><span class="visit-place">${esc(P[v.place].name)}</span></button>${v.note?`<p class="visit-note">${esc(v.note)}</p>`:''}${l?`<div class="leg-chip"><strong>${symbol[l.mode]} ${modes[l.mode]}</strong> · ${routeText(l)}<span class="plan">${planText(l)}</span></div><details><summary>이동 근거</summary><span>${esc(D.meta.source)} ${v.source.pages}쪽 · ${esc(l.plan.time)}</span>${l.route?.url?`<a href="${esc(l.route.url)}" target="_blank" rel="noopener">길찾기 원자료 · ${esc(l.route.queriedAt.slice(0,10))} ↗</a>`:'<p>실측 시간·경로 형상은 확인되지 않았습니다.</p>'}</details>`:''}</article>`;}).join('');
 }).join('');
 $$('[data-visit]').forEach(b=>b.addEventListener('click',()=>selectVisit(b.dataset.visit,true,false)));
}
function renderInsight(){
 const insight=$('#day-insight');
 if(!state.day){insight.innerHTML=`<div class="metric-row"><div class="metric"><span class="metric-label">닷새의 기준 호텔</span><span class="metric-value">한 곳에서 4박</span><small>출발 · 낮 휴식 · 밤 귀환</small></div><div class="metric"><span class="metric-label">금요일 공유 차량</span><span class="metric-value">버스 1대</span><small>디즈니 ↔ 호텔 ↔ 시내</small></div><div class="metric"><span class="metric-label">낮 호텔 복귀</span><span class="metric-value">${state.hotelRest?'금 · 토 · 일':'외부 체류'}</span><small>${state.hotelRest?'각자 쉬는 선택을 포함':'호텔 낮 복귀 생략 · 가상 비교'}</small></div></div><p>공항과 디즈니는 도심보다 멀리 있습니다. <strong>도심 확대</strong>로 바꾸면 식당·산책·호텔 왕복을 자세히 볼 수 있습니다.</p>`;return;}
 const js=selectedJourneys();let content='';
 if(state.team==='vehicle'){
  const legs=M.coach(state.day,data,P,null,cache),ride=M.totals(legs.filter(l=>l.occupied)).car,empty=M.totals(legs.filter(l=>!l.occupied)).car;
  content=`<div class="metric-row">${[[ride,'승객 있는 운행'],[empty,'빈 차 운행']].map(([t,label])=>`<div class="metric"><span class="metric-label">${label}</span><span class="metric-value">${metricText(t)}</span><small>${coverage(t)}</small></div>`).join('')}<div class="metric"><span class="metric-label">차량</span><span class="metric-value">22인승 1대</span><small>공통 구간 한 번만 합산</small></div></div>`;
 }else{
  content=js.map(j=>{const t=M.journeyMetrics(j,data,P,null,cache);return `<div class="insight-callout"><strong>${esc(j.label)}</strong> · 탑승 ${metricText(t.car)} / 이동 도보 ${t.foot.known?t.foot.km.toFixed(1)+'km · '+metricText(t.foot):'미산출'}<p style="font-size:11px">${coverage(t.car)} 차량 · ${coverage(t.foot)} 도보${t.ferry.count?' · 페리 2회 시간 미산출':''}. 관람·파크 내부 걸음 제외.</p></div>`;}).join('');
 }
 content+=`<p>${esc(D.meta.notes[state.day-1])}</p>`;
 if(state.day===2){const s=M.sharedBus(P,null,cache,state.buffer);content+=`<div class="insight-callout"><strong>공유 버스 기준 시내팀 출발 ${s?`${M.clock(round5(s.earliest))}–${M.clock(round5(s.later))} 참고`:'미산출'}</strong><p>${s?`원안 09:00보다 약 ${fmt(s.delay)}분 이상 늦어질 수 있습니다. 디즈니 하차 10분·시내팀 탑승 10분·차량 편도 여유 ${state.buffer}분을 둔 비교용 계산입니다.`:'왕복 경로 조회 후 계산합니다.'} 정확한 배차는 가이드와 확인해야 합니다.</p></div>`;}
 if(state.day===4)content+=`<div class="insight-callout"><strong>17:15 라오지탕 BFC에서 재합류</strong><p>휴식팀 원안: 13:15–15:45 휴식 · 15:45–16:30 준비·집결 · 16:30 버스 출발. ${state.viewpoint==='tower'?'전망대 선택 시 입장·대기·관람을 포함한 65분 창의 가능 여부는 미확인입니다.':''}</p></div>`;
 if(state.day===3&&state.activity==='massage')content+='<div class="insight-callout"><strong>마사지 시간은 확인이 필요합니다.</strong><p>원안 60분과 최근 90분 상품이 다릅니다. 90분을 선택하면 15:45 재집결 준비와 충돌하므로 운영 조정이 필요합니다.</p></div>';
 insight.innerHTML=content;
}
function initMap(){
 if(!window.L){$('#map').innerHTML='<div class="map-loading">지도 연결을 사용할 수 없습니다.<br>날짜별 일정과 장소 링크는 계속 이용할 수 있습니다.</div>';$('#map-error').hidden=false;$('#map-error').textContent='지도 라이브러리를 불러오지 못했습니다. 일정·비교 목록은 계속 이용할 수 있습니다.';return;}
 try{
  $('#map').innerHTML='';map=L.map('map',{scrollWheelZoom:false,zoomControl:true}).setView([31.225,121.49],13);
  let failures=0,loads=0;const tile=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors · <a href="https://www.openstreetmap.org/fixthemap">지도 수정</a>'});
  tile.on('tileerror',()=>{failures++;if(failures>=3&&!loads){$('#map-error').hidden=false;$('#map-error').textContent='지도 배경 연결이 원활하지 않습니다. 장소 표식·저장된 경로·오른쪽 일정은 계속 볼 수 있습니다.';}}).on('tileload',()=>{loads++;$('#map-error').hidden=true;});tile.addTo(map);
  routeGroup=L.layerGroup().addTo(map);pinGroup=L.layerGroup().addTo(map);
  map.on('click',e=>{if(!picking)return;choosePoint(e.latlng.lat,e.latlng.lng);});
 }catch(e){$('#map-error').hidden=false;$('#map-error').textContent='지도를 열지 못했습니다. 날짜별 일정 목록을 이용해 주세요.';map=null;}
}
function fit(kind='route'){
 if(!map)return;$$('.map-toolbar button').forEach(b=>b.classList.remove('active'));$('#'+({'route':'fit-route',city:'city-view',region:'region-view'}[kind])).classList.add('active');
 if(kind==='city'){map.fitBounds([[31.199,121.427],[31.248,121.510]],{padding:[20,20]});return;}
 if(kind==='region'){map.fitBounds([[31.123,121.43],[31.248,121.811]],{padding:[20,20]});return;}
 const pts=visibleLegs().flatMap(l=>[l.fromCoord,l.toCoord]).map(c=>[c[1],c[0]]);pts.push([P.hotel.coord[1],P.hotel.coord[0]]);if(pts.length)map.fitBounds(pts,{padding:[35,35],maxZoom:15});
}
function markerIcon(label,type=''){return L.divIcon({className:'map-marker',html:`<span class="map-pin ${type}">${esc(label)}</span>`,iconSize:[type==='hotel'?36:30,type==='hotel'?36:30],iconAnchor:[16,16]});}
function drawMap(keepView=false){
 if(!map)return;routeGroup.clearLayers();pinGroup.clearLayers();markerByPlace={};
 const allLegs=visibleLegs();const legs=state.day?allLegs:allLegs.filter(l=>l.mode==='car'||l.mode==='ferry');
 legs.forEach(l=>{
  if(M.same(l.fromCoord,l.toCoord))return;
  const coords=l.route?.geometry?.coordinates||[l.fromCoord,l.toCoord];
  const conceptual=!l.route||l.mode==='ferry';const returnLeg=l.to==='hotel'||l.from==='hotel';
  const color=!l.occupied&&l.mode==='car'?'#8c919b':l.mode==='ferry'?'#3b79a0':state.day?(l.team==='active'||l.team==='outside'?'#467968':l.team==='rest'?'#a88038':l.team==='disney'?'#416c94':'#273a56'):colors[l.day];
  const focused=l.toVisit===selectedVisit;
  const line=L.polyline(coords.map(c=>[c[1],c[0]]),{color:focused?'#b28233':color,weight:focused?7:state.highlight&&returnLeg?6:l.mode==='car'?3.4:2.7,opacity:state.highlight&&!returnLeg?.18:state.day?.82:.60,dashArray:conceptual?'2 7':!l.occupied&&l.mode==='car'?'8 9':l.mode==='foot'?'8 5':null}).addTo(routeGroup);
  line.bindTooltip(`${P[l.from].name} → ${P[l.to].name} · ${modes[l.mode]}${conceptual?' · 연결 개념선':''}`,{sticky:true});
  if(l.toVisit)line.on('click',()=>selectVisit(l.toVisit,false,true));
  if(coords.length>1){const index=Math.max(1,Math.floor(coords.length/2)),a=coords[index-1],b=coords[index];const angle=Math.atan2(-(b[1]-a[1]),(b[0]-a[0])*Math.cos(b[1]*Math.PI/180))*180/Math.PI;
   L.marker([b[1],b[0]],{interactive:false,keyboard:false,icon:L.divIcon({className:'route-arrow',html:`<span style="display:block;transform:rotate(${angle}deg);color:${color};opacity:${state.highlight&&!returnLeg?.2:.9}">➤</span>`,iconSize:[16,16],iconAnchor:[8,8]})}).addTo(routeGroup);
  }
 });
 const visitIds=[...new Set(selectedJourneys().flatMap(j=>j.visitIds))];let places=[];
 if(state.team==='vehicle'&&state.day)places=[...new Set(legs.flatMap(l=>[l.from,l.to]))];else places=[...new Set(state.day?visitIds.map(id=>data.visits[id].place):legs.flatMap(l=>[l.from,l.to]))];
 if(!places.includes('hotel'))places.unshift('hotel');
 const groups=new Map();places.forEach((id,i)=>{const k=M.coordKey(P[id].coord);if(!groups.has(k))groups.set(k,{ids:[],num:i+1});groups.get(k).ids.push(id);});
 let num=0;
 groups.forEach(g=>{const isHotel=g.ids.includes('hotel'),id=isHotel?'hotel':g.ids[0],c=P[id].coord;num++;
  const marker=L.marker([c[1],c[0]],{icon:markerIcon(isHotel?'H':num,isHotel?'hotel':''),title:g.ids.map(x=>P[x].name).join(' / '),zIndexOffset:isHotel?1000:0}).addTo(pinGroup);
  const ids=visitIds.filter(v=>g.ids.includes(data.visits[v].place));
  marker.on('click',()=>{if(picking){choosePoint(c[1],c[0]);return;}if(ids.length)selectVisit(ids[0],false,true);else showPlace(id);});
  marker.bindTooltip(isHotel?'우리 호텔':P[id].name,{direction:'top',offset:[0,-10]});
  marker.bindPopup(`<strong>${g.ids.map(x=>esc(P[x].name)).join(' / ')}</strong><p>${esc(P[id].precision)}</p>${ids.slice(0,14).map(v=>`<button type="button" data-popup-visit="${v}">Day ${data.visits[v].day} · ${esc(data.visits[v].time)} ${esc(data.visits[v].title)}</button>`).join('')}`);
  marker.on('popupopen',()=>{$$('[data-popup-visit]').forEach(b=>b.addEventListener('click',()=>{const v=data.visits[b.dataset.popupVisit];if(state.day!==v.day){state.day=v.day;state.team='both';render(true);}selectVisit(v.id,true,true);}));});
  for(const p of g.ids)markerByPlace[p]=marker;
 });
 hotels.forEach(h=>{const marker=L.marker([h.coord[1],h.coord[0]],{icon:markerIcon(h.id,'candidate'),title:h.name,draggable:false,zIndexOffset:1100}).addTo(pinGroup);marker.bindPopup(`<strong>${esc(h.id+' · '+h.name)}</strong><p>위치 비교용 핀 · 호텔 실재·예약 가능 여부 미확인</p><p>${esc(h.address)}</p>`);});
 if(!keepView)fit();
}
function selectVisit(id,pan=true,scroll=true){
 const v=data.visits[id];if(!v)return;
 selectedVisit=id;$$('[data-visit-card]').forEach(c=>c.classList.toggle('selected',c.dataset.visitCard===id));
 showPlace(v.place);
 if(map){drawMap(true);if(pan){const leg=visibleLegs().find(l=>l.toVisit===id);if(leg?.route?.geometry&&!M.same(leg.fromCoord,leg.toCoord))map.fitBounds(leg.route.geometry.coordinates.map(c=>[c[1],c[0]]),{padding:[45,45],maxZoom:16});else map.flyTo([P[v.place].coord[1],P[v.place].coord[0]],Math.max(map.getZoom(),15),{duration:.5});}}
 if(scroll){const card=$(`[data-visit-card="${id}"]`);if(card){const list=$('#timeline');list.scrollTo({top:list.scrollTop+card.getBoundingClientRect().top-list.getBoundingClientRect().top,behavior:'smooth'});}else if(!state.day){state.day=v.day;state.team='both';render(true);selectVisit(id,pan,true);}}
}
function showPlace(id){
 const p=P[id];const matches=[...new Set(selectedJourneys().flatMap(j=>j.visitIds))].map(v=>data.visits[v]).filter(v=>v.place===id);
 const photo=window.SH_V4?.photos?.[p.photoRef];
 const file=photo&&(photo.file||photo.src);
 const safePhoto=file&&/^(\.\/)?photos\//.test(file)?file:null;
 $('#place-detail').innerHTML=`${safePhoto?`<figure><img src="${esc(safePhoto)}" alt="${esc(photo.cap||p.name)}"><figcaption>${esc(photo.cap)} · <a href="${esc(photo.src)}" target="_blank" rel="noopener">${esc(photo.author)} / ${esc(photo.lic)}</a></figcaption></figure>`:''}<span class="eyebrow">PLACE & VISITS</span><h3>${esc(p.name)}</h3><p class="chinese" lang="zh-Hans">${esc(p.zh)}</p><p>${esc(p.address)}${p.address?' · ':''}${esc(p.precision)}</p><p>${esc(p.note)}</p><ul>${matches.slice(0,12).map(v=>`<li>Day ${v.day} · ${esc(v.time)} — ${esc(v.title)}</li>`).join('')}</ul><div class="detail-links"><a href="https://www.openstreetmap.org/?mlat=${p.coord[1]}&mlon=${p.coord[0]}#map=17/${p.coord[1]}/${p.coord[0]}" target="_blank" rel="noopener">지도에서 위치 보기 ↗</a><a href="https://uri.amap.com/search?keyword=${encodeURIComponent(p.zh+' '+p.address)}&city=上海" target="_blank" rel="noopener">고덕에서 이름 검색 ↗</a></div><details style="font-size:11px;margin-top:12px;color:var(--muted)"><summary>좌표 근거</summary><a href="${esc(p.source.url)}" target="_blank" rel="noopener">${esc(p.source.provider)}</a> · ${esc(p.source.checked)} · ${esc(p.source.method)} · WGS84 [${p.coord.join(', ')}]${p.source.also?`<br><a href="${esc(p.source.also)}" target="_blank" rel="noopener">관련 공식 안내 ↗</a>`:''}</details>`;
}
function renderHotels(){
 const cards=allHotels().map(h=>`<article class="hotel-card ${h.id==='A'?'baseline':'candidate'}"><header><div><span class="hotel-label">${h.id==='A'?'A · 현재 기준 호텔':h.id+' · 위치 비교용 핀'}</span><h3>${esc(h.name)}</h3></div>${h.id==='A'?'':`<button class="remove-hotel" type="button" data-remove="${h.id}" aria-label="비교 ${h.id} 삭제">삭제</button>`}</header><p>${h.id==='A'?'九江路700号 · 난징동루 보행가 옆':esc(h.address||'실제 호텔·예약 가능 여부 미확인')}</p><span class="coord">${h.coord[1].toFixed(5)}, ${h.coord[0].toFixed(5)} · WGS84</span><div class="mini-actions"><button type="button" data-hotel-pan="${h.id}">지도에서 보기</button>${h.id==='A'?'':`<button type="button" data-hotel-edit="${h.id}">위치 수정</button>`}</div><label>5객실 · 4박 확인된 총액 (원)<input type="number" min="0" step="1" inputmode="numeric" data-price="${h.id}" aria-label="${h.id} 호텔 5객실 4박 총액" placeholder="입력한 경우만 가격 비교" value="${esc(prices[h.id]??'')}"></label></article>`);
 while(cards.length<3)cards.push(`<div class="hotel-card empty"><span class="hotel-label">${cards.length===1?'B':'C'} · 나란히 비교하기</span><h3>다른 시작점을 골라 보세요</h3><p>같은 관광지, 같은 식당.<br>호텔의 위치만 달라집니다.</p></div>`);
 $('#hotel-cards').innerHTML=cards.join('');
 $$('[data-remove]').forEach(b=>b.addEventListener('click',()=>{hotels=hotels.filter(h=>h.id!==b.dataset.remove);delete prices[b.dataset.remove];persist();renderHotels();renderComparison();drawMap(true);}));
 $$('[data-price]').forEach(input=>input.addEventListener('change',()=>{const n=Number(input.value);prices[input.dataset.price]=input.value!==''&&Number.isFinite(n)&&n>=0?n:null;persist();renderComparison();}));
 $$('[data-hotel-pan]').forEach(b=>b.addEventListener('click',()=>{const h=allHotels().find(x=>x.id===b.dataset.hotelPan);if(map)map.flyTo([h.coord[1],h.coord[0]],15);$('#journey').scrollIntoView({behavior:'smooth'});}));
 $$('[data-hotel-edit]').forEach(b=>b.addEventListener('click',()=>{const h=hotels.find(x=>x.id===b.dataset.hotelEdit);editingId=h.id;$('#candidate-name').value=h.name;$('#candidate-address').value=h.address;$('#candidate-lat').value=h.coord[1];$('#candidate-lon').value=h.coord[0];$('#candidate-form button[type=submit]').textContent=h.id+' 위치 변경';$('#candidate-feedback').textContent='수정할 좌표를 입력하거나 지도에서 다시 고르세요.';$('#candidate-form').scrollIntoView({behavior:'smooth'});}));
}
function table(headers,rows){return `<div class="comparison-table-wrap"><table><thead><tr><th scope="col">비교 항목</th>${headers.map(h=>`<th scope="col">${esc(h.id+' · '+h.name)}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr><th scope="row">${r.label}</th>${r.cells.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;}
function restCell(x,base){if(x.available===null)return '<span class="unqueried">경로 미조회</span>';return `<strong class="${x.available<0?'conflict':''}">${x.available<0?'시간 충돌 ':''}${approx(x.available)}</strong><small>원안 ${x.planned}분${base?.available!=null?` · A 대비 ${x.available-base.available>=0?'+':''}${fmt(x.available-base.available)}분`:''}</small>`;}
function renderComparison(){
 const hs=allHotels(),r=hs.map(h=>M.restAndDeadlines(data,P,h,cache,state.buffer)),v=hs.map(h=>M.aggregateVehicle(data,P,h,cache));
 const rows=[{label:'숙박비 · 5객실 4박',cells:hs.map(h=>Number.isFinite(prices[h.id])?`<strong>${fmt(prices[h.id])}원</strong><small>사용자 입력액${h.id!=='A'&&Number.isFinite(prices.A)?` · A 대비 ${prices[h.id]-prices.A>=0?'+':''}${fmt(prices[h.id]-prices.A)}원`:''}</small>`:'가격 비교 없음')},
  {label:'금요일 시내팀 출발 범위',cells:r.map(x=>x.shared?`<strong>${M.clock(round5(x.shared.earliest))}–${M.clock(round5(x.shared.later))}</strong><small>공유차량 비교 계산 · 원안 09:00</small>`:'왕복 경로 미조회')},
  ...[0,1,2].map((n)=>({label:['금요일 · 시내팀 호텔 휴식','토요일 · 호텔 휴식 선택자','일요일 · 휴식팀 호텔 휴식'][n],cells:r.map(x=>restCell(x.rest[n],r[0].rest[n]))})),
  {label:'일요일 휴식 시간대',cells:r.map(x=>!state.hotelRest?'외부 체류 · 객실 휴식 없음':x.sundayArrival==null||x.sundayRestEnd==null?'경로 미조회':`<strong>${M.clock(Math.round(x.sundayArrival))}–${M.clock(Math.round(x.sundayRestEnd))}</strong><small>입실~휴식 종료 · 이후 준비·집결 45분 보존<br>BFC 17:15 합류를 위해 ${M.clock(Math.round(x.sundayDeparture))} 출발 참고</small>`)},
  {label:'토요일 17:25 가족사진',cells:r.map(x=>esc(x.photo))},
  {label:'유람선 집결 · 일요일 18:45',cells:r.map(x=>`<strong>BFC·십육포 위치 고정</strong><small>권역 간 ${x.cruiseRoute?`도보 약 ${fmt(x.cruiseRoute.durationSeconds/60)}분`:'미조회'} / 계획 15분. 실제 게이트·몰 하행·대기 확인 전 도착 보장 불가.</small>`)},
  {label:'귀국일 호텔 출발 비교',cells:r.map(x=>x.airportDeparture===null?'공항 경로 미조회':`<strong>${M.clock(Math.round(x.airportDeparture))} 참고</strong><small>원안 09:45에 경로 증감 반영<br>11:00 도착 · 13:55 출발까지 2시간 55분 유지</small>`)},
  {label:'닷새 차량 운행 · 승객 있음',cells:v.map(x=>`<strong>${metricText(x.occupied)}</strong><small>${coverage(x.occupied)} · 공통 구간 중복 제외</small>`)},
  {label:'닷새 차량 운행 · 빈 차',cells:v.map(x=>`<strong>${metricText(x.empty)}</strong><small>${coverage(x.empty)} · 가족 탑승시간 제외</small>`)},
  {label:'첫날 난징동루 선택 왕복',cells:hs.map(h=>{const a=M.lookup(h.coord,P.nanjing.coord,'foot',cache),b=M.lookup(P.nanjing.coord,h.coord,'foot',cache);return a&&b?`<strong>약 ${fmt((a.durationSeconds+b.durationSeconds)/60)}분 · ${((a.distanceMeters+b.distanceMeters)/1000).toFixed(1)}km</strong><small>구경 시간 별도 · 목적지 위치 고정</small>`:'왕복 도보 미조회';})},
  {label:'만보루 편도 이동',cells:hs.map(h=>{const a=M.lookup(h.coord,P.manbao.coord,state.banquetMode,cache);return a?`<strong>${modes[state.banquetMode]} 약 ${fmt(a.durationSeconds/60)}분 · ${(a.distanceMeters/1000).toFixed(1)}km</strong><small>${state.banquetMode==='car'?'원안 도보에서 버스로 바꾼 비교. ':''}${a.durationSeconds>1200&&state.banquetMode==='foot'?'20분 이동·착석 창 초과. 버스 전환 또는 시간 조정 필요.':'몰·호텔 내부 이동·착석 별도.'}</small>`:'경로 미조회';})}
 ];
 let html=`<h3 class="table-title">이동이 늘면, 쉬는 시간은 어떻게 달라질까요?</h3><p class="table-sub">${hs.length===1?'A는 현재 호텔 기준입니다. B·C를 추가하면 같은 조건으로 나란히 표시됩니다.':'호텔 이름은 입력값이며 위치 비교 결과가 호텔의 품질·예약 가능성을 뜻하지 않습니다.'} 시간은 비교용 예상이며 0분으로 비어 있는 경로를 채우지 않습니다.</p>`+table(hs,rows);
 const details=data.journeys.map(j=>({label:`Day ${j.day} · ${j.label}`,cells:hs.map(h=>{const t=M.journeyMetrics(j,data,P,h,cache);return `<strong>탑승 ${metricText(t.car)}</strong><small>${coverage(t.car)}</small><strong>도보 ${t.foot.known?t.foot.km.toFixed(1)+'km':'미산출'} · ${metricText(t.foot)}</strong><small>${coverage(t.foot)}${t.ferry.count?' · 페리 시간 별도 미산출':''}</small>`;})}));
 html+=`<details class="report-detail"><summary>날짜·팀별 탑승시간과 도보거리 보기</summary><p class="table-sub">사람의 이동만 합산합니다. 관람·파크 내부 걸음·페리 대기·건물 안 이동은 제외됩니다. 두 팀의 공통 구간은 각 팀에 표시하지만 차량 합계에는 한 번만 포함합니다.</p>${table(hs,details)}</details>`;
 const returnSpecs=[{label:'금요일 · 점심 후 호텔 왕복',pairs:[['raffles','hotel','car'],['hotel','nanjing','foot']]},{label:'토요일 · 호텔 휴식팀 낮 왕복',pairs:[['kpg','hotel','car'],['hotel','manbao',state.banquetMode]]},{label:'토요일 · 외부 활동팀 호텔 경유',pairs:[['xintiandi','hotel','car'],['hotel','manbao',state.banquetMode]]},{label:'일요일 · 휴식팀 호텔 왕복',pairs:[['lubolang','hotel','car'],['hotel','laojitang','car']]}];
 html+=`<details class="report-detail"><summary>낮 호텔 왕복 구간 따로 보기</summary>${table(hs,returnSpecs.map(s=>({label:s.label,cells:hs.map(h=>{if(!state.hotelRest)return '가상 비교에서 낮 호텔 경유 생략';if(s===returnSpecs[0]&&state.day2Rest!=='hotel')return '금요일 카페 휴식 선택';const values=s.pairs.map(([a,b,m])=>M.lookup(M.point(a,P,h),M.point(b,P,h),m,cache));return values.every(Boolean)?`<strong>약 ${fmt(values.reduce((t,r)=>t+r.durationSeconds/60,0))}분</strong><small>${s.pairs.map(([a,b,m],i)=>`${esc(P[a].name)} → ${esc(P[b].name)}: ${modes[m]} ${fmt(values[i].durationSeconds/60)}분`).join('<br>')}</small>`:'왕복 중 미조회 구간 있음';})})))}</details>`;
 $('#comparison-results').innerHTML=html;
 $('#keep-rest').classList.toggle('active',state.hotelRest);$('#skip-rest').classList.toggle('active',!state.hotelRest);
 $('#keep-rest').setAttribute('aria-pressed',String(state.hotelRest));$('#skip-rest').setAttribute('aria-pressed',String(!state.hotelRest));
 $('#scenario-banner').hidden=state.hotelRest;
 $('#scenario-note').textContent=state.hotelRest?'원안의 낮 호텔 휴식과 만보루·BFC·공항 도착 기준을 유지합니다.':'가상 비교입니다. 금·토·일 낮 호텔 왕복을 외부 체류로 바꿉니다. 토요일 호텔 로비 가족사진은 장소를 다시 정해야 합니다.';
}
function choosePoint(lat,lon){
 if(!validCoords(lat,lon)){$('#pin-prompt').textContent='상하이 여행권역 안의 위치를 골라 주세요.';return;}
 $('#candidate-lat').value=Number(lat).toFixed(6);$('#candidate-lon').value=Number(lon).toFixed(6);
 if(!$('#candidate-name').value)$('#candidate-name').value=`위치 비교용 핀 ${editingId||(!hotels.some(h=>h.id==='B')?'B':'C')}`;
 picking=false;$('#pin-prompt').hidden=true;$('#map').style.cursor='';$('#candidate-feedback').textContent='위치를 골랐습니다. 이름·주소를 확인하고 비교에 추가하세요.';$('#candidate-form').scrollIntoView({behavior:'smooth'});$('#candidate-name').focus({preventScroll:true});
}
function startPick(){if(!map){$('#candidate-feedback').textContent='지도가 연결되지 않았습니다. WGS84 위도·경도를 직접 입력하세요.';return;}if(hotels.length>=2&&!editingId){$('#candidate-feedback').textContent='비교 핀은 최대 2개입니다. 기존 위치를 수정하거나 삭제하세요.';return;}picking=true;$('#pin-prompt').hidden=false;$('#pin-prompt').innerHTML='비교할 위치를 지도에서 누르세요. 실제 호텔인지 확인한 핀은 아닙니다. <button type="button" id="stop-pick" style="color:white;text-decoration:underline">취소</button>';$('#stop-pick').onclick=()=>{picking=false;$('#pin-prompt').hidden=true;$('#map').style.cursor='';};$('#map').style.cursor='crosshair';$('#journey').scrollIntoView({behavior:'smooth'});fit('city');}
async function queryRoutes(){
 if(busy)return;
 // Include baseline and all candidates, deduplicate by coordinates/mode/provider/conditions.
 const wanted=new Map();allHotels().forEach(h=>M.missingQueries(data,P,h,cache).forEach(q=>wanted.set(q.key,q)));
 if(!wanted.size){$('#query-status').textContent='선택한 조건의 경로가 모두 저장되어 있습니다.';return;}
 busy=true;queryAbort=new AbortController();$('#query-routes').disabled=true;$('#cancel-query').hidden=false;
 let done=0,failed=0;const n=wanted.size;
 for(const q of wanted.values()){
  if(queryAbort.signal.aborted)break;
  $('#query-status').textContent=`${done}/${n}구간 조회 · 초당 1회 이하 · 실패 ${failed}건`;
  const url=`https://routing.openstreetmap.de/routed-${q.mode}/route/v1/driving/${M.coordKey(q.a)};${M.coordKey(q.b)}?overview=full&geometries=geojson&steps=false`;
  const timeout=new AbortController(),handle=setTimeout(()=>timeout.abort(),14000),abort=()=>timeout.abort();queryAbort.signal.addEventListener('abort',abort,{once:true});
  try{const response=await fetch(url,{signal:timeout.signal});if(!response.ok)throw Error('http');const json=await response.json();const rr=json.routes?.[0];if(json.code!=='Ok'||!rr||!Number.isFinite(rr.duration)||!Number.isFinite(rr.distance))throw Error('route');
   const r={mode:q.mode,provider:'FOSSGIS OSRM / OpenStreetMap',url,queriedAt:new Date().toISOString(),conditions:'WGS84 · no live/future traffic · car not coach-specific',durationSeconds:rr.duration,distanceMeters:rr.distance,geometry:rr.geometry,snapDistances:json.waypoints?.map(w=>w.distance)||[],error:null};cache[q.key]=r;dynamic[q.key]=r;
  }catch(e){failed++;}finally{clearTimeout(handle);queryAbort.signal.removeEventListener('abort',abort);}
  done++;if(done%5===0){renderComparison();renderInsight();}
  if(!queryAbort.signal.aborted&&done<n)await new Promise(resolve=>setTimeout(resolve,1100));
 }
 const stopped=queryAbort.signal.aborted;busy=false;queryAbort=null;$('#query-routes').disabled=false;$('#cancel-query').hidden=true;
 try{localStorage.setItem('shanghai-route-cache-v1',JSON.stringify(dynamic));}catch{}
 $('#query-status').textContent=`${stopped?'중단':'조회 완료'}: ${done}구간 중 ${done-failed}건 저장${failed?` · ${failed}건 실패, 미조회로 유지`:''}. 미래 교통·22인승 통행은 반영되지 않습니다.`;
 renderComparison();renderInsight();renderTimeline();drawMap(true);
}
function render(keepView=false){
 data=D.build(state);renderDays();renderFilters();
 $('#day-eyebrow').textContent=state.day?`DAY ${state.day} · ${D.meta.dates[state.day-1]}`:'OUR FIVE DAYS';
 $('#day-title').textContent=state.day?D.meta.titles[state.day-1]:'닷새의 길을 한눈에';
 $('#day-description').textContent=state.day?D.meta.summaries[state.day-1]:'도심에서 디즈니와 푸둥공항까지, 여행의 전체 범위입니다.';
 renderTimeline();renderInsight();drawMap(keepView);renderComparison();
}
$('#candidate-form').addEventListener('submit',e=>{
 e.preventDefault();const lat=Number($('#candidate-lat').value),lon=Number($('#candidate-lon').value);
 if(!validCoords(lat,lon)){$('#candidate-feedback').textContent='위도 30.7–31.7, 경도 120.9–122.0 범위의 WGS84 좌표를 확인하세요.';return;}
 if(hotels.length>=2&&!editingId){$('#candidate-feedback').textContent='최대 2곳까지 비교할 수 있습니다.';return;}
 const id=editingId||(!hotels.some(h=>h.id==='B')?'B':'C'),hotel={id,name:$('#candidate-name').value.trim()||`위치 비교용 핀 ${id}`,address:$('#candidate-address').value.trim(),coord:[lon,lat]};
 hotels=hotels.filter(h=>h.id!==id).concat(hotel).sort((a,b)=>a.id.localeCompare(b.id));persist();editingId=null;
 $('#candidate-form').reset();$('#candidate-form button[type=submit]').textContent='비교에 추가';$('#candidate-feedback').textContent='위치를 추가했습니다. 새 좌표에 해당하는 경로만 사용하며, 미조회 값은 아래 버튼으로 조회할 수 있습니다.';
 renderHotels();renderComparison();drawMap(true);
});
$('#pick-location').addEventListener('click',startPick);
$('#fit-route').addEventListener('click',()=>fit('route'));$('#city-view').addEventListener('click',()=>fit('city'));$('#region-view').addEventListener('click',()=>fit('region'));
$('#highlight-return').addEventListener('change',e=>{state.highlight=e.target.checked;drawMap(true);});
$('#keep-rest').addEventListener('click',()=>{state.hotelRest=true;render(true);});$('#skip-rest').addEventListener('click',()=>{state.hotelRest=false;render(true);});
$('#buffer').addEventListener('change',e=>{state.buffer=Number(e.target.value);renderInsight();renderComparison();});$('#banquet-mode').addEventListener('change',e=>{state.banquetMode=e.target.value;render(true);});
$('#query-routes').addEventListener('click',queryRoutes);$('#cancel-query').addEventListener('click',()=>queryAbort?.abort());
$('#source-notes').innerHTML=`<p>계획 근거: 「${esc(D.meta.source)}」 78쪽 중 26–27, 29–35, 37–42쪽을 이미지로 확인했습니다. 최신 지시서의 변경 사항을 지도 전용 데이터에 적용했으며 기존 일정 파일은 수정하지 않았습니다.</p><ul>${D.meta.overrides.map(([a,b])=>`<li><strong>${esc(a)}</strong> · ${esc(b)}</li>`).join('')}</ul><p>위치·도로 데이터 확인: 2026-11-06. 호텔은 IHG 주소와 OSM 영문명을 대조했습니다. 디즈니 주차 표식은 주차 권역 참조점이며 정확한 버스 하차장이 아닙니다. BFC 두 식당은 몰 좌표를 공유합니다. 유람선은 십육포 권역까지만 표시하며 항로를 만들지 않았습니다. 구역 대표점 간 경로는 출입문부터의 실측값이 아닙니다.</p><p>추가 확인: 호텔·디즈니 버스 승하차점, 일요일 유람선 부두, 동금선 당일 통제, 신톈디 점심 식당, 마사지 시간·점포, 금요일 공유차량 배차. 순수 객실 휴식과 씻기·짐 정리의 세부 분리는 원자료에 없어 계획 휴식 블록으로 표시합니다.</p>`;
initMap();renderHotels();render();
})();
