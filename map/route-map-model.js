/* Pure calculations: no DOM, no network. All durations are minutes unless named otherwise.
   2026-11-07: 금요일 시내팀은 걸어서 다님 — 낮 휴식에서 공유 버스 지연을 빼지 않고, 오전은 걷는 시간으로 출발 시각을 비교합니다. */
(function(root){
'use strict';
const provider='fossgis-osrm-v5',conditions='no-live-traffic-v1';
const coordKey=c=>c.map(n=>Number(n).toFixed(6)).join(',');
const same=(a,b)=>coordKey(a)===coordKey(b);
const key=(a,b,mode)=>[provider,mode,conditions,coordKey(a),coordKey(b)].join('|');
const minutes=s=>{const m=String(s).match(/(\d\d):(\d\d)/);return m?+m[1]*60 + +m[2]:null;};
const clock=n=>{if(n==null)return '미산출';const total=Math.round(n);return `${String(Math.floor(total/60)%24).padStart(2,'0')}:${String(total%60).padStart(2,'0')}`;};
function point(id,places,hotel){return id==='hotel'&&hotel?hotel.coord:places[id].coord;}
function lookup(a,b,mode,cache){if(!['car','foot'].includes(mode))return null;if(same(a,b))return {durationSeconds:0,distanceMeters:0,geometry:null,provider:'같은 지도 위치',queriedAt:'',samePoint:true};const r=cache[key(a,b,mode)];return r && Number.isFinite(r.durationSeconds) && Number.isFinite(r.distanceMeters)?r:null;}
function resolve(leg,data,places,hotel,cache){
 const from=leg.from||data.visits[leg.fromVisit].place,to=leg.to||data.visits[leg.toVisit].place;
 const a=point(from,places,hotel),b=point(to,places,hotel);
 let mode=leg.mode,modeChanged=false;
 if(mode==='inside'&&!same(a,b)){mode=data.options.eveningMode;modeChanged=true;}
 const route=leg.concept?null:lookup(a,b,mode,cache);
 return {...leg,from,to,fromCoord:a,toCoord:b,mode,modeChanged,route,vehicleId:mode==='car'?'coach-1':null,occupied:mode==='car'?leg.occupied!==false:false};
}
function coach(day,data,places,hotel,cache){
 const ids=[...new Set(data.journeys.filter(j=>j.day===day).flatMap(j=>j.legIds))];
 const occupied=ids.map(id=>resolve(data.legs[id],data,places,hotel,cache)).filter(l=>l.mode==='car'&&!same(l.fromCoord,l.toCoord)).sort((a,b)=>(minutes(a.plan.time)??0)-(minutes(b.plan.time)??0));
 const result=[];
 for(const l of occupied){const prev=result.at(-1);if(prev&&!same(prev.toCoord,l.fromCoord)){
   result.push({id:`empty-${prev.id}-${l.id}`,day,team:'vehicle',from:prev.to,to:l.from,fromCoord:prev.toCoord,toCoord:l.fromCoord,mode:'car',occupied:false,vehicleId:'coach-1',plan:{time:'앞 운행 후 → 다음 탑승 전',minutes:null},afterLeg:prev.id,beforeLeg:l.id,route:lookup(prev.toCoord,l.fromCoord,'car',cache),note:day===2&&prev.to==='disneyDrop'?'디즈니팀 하차 후 시내팀이 처음 타는 곳으로. 오전 시내팀은 걸어서 다닙니다.':'다음 승차 권역으로 이동하는 필요한 빈 차 구간. 정확한 배차시각은 미정.'});
 }result.push(l);}
 return result;
}
function totals(resolved){
 const result={car:{minutes:0,km:0,known:0,total:0},foot:{minutes:0,km:0,known:0,total:0},ferry:{count:0,minutes:null}};
 for(const l of resolved){if(l.mode==='ferry'){result.ferry.count++;continue;}const t=result[l.mode];if(!t)continue;t.total++;if(l.route){t.minutes+=l.route.durationSeconds/60;t.km+=l.route.distanceMeters/1000;t.known++;}}
 for(const t of [result.car,result.foot]){t.complete=t.known===t.total;t.value=t.complete?t.minutes:null;}
 return result;
}
function journeyMetrics(j,data,places,hotel,cache){return totals(j.legIds.map(id=>resolve(data.legs[id],data,places,hotel,cache)));}
function routeDelta(from,to,mode,places,hotel,cache,baseMode=mode){const a=lookup(point(from,places),point(to,places),baseMode,cache),b=lookup(point(from,places,hotel),point(to,places,hotel),mode,cache);return a&&b?(b.durationSeconds-a.durationSeconds)/60:null;}
function sharedBus(places,hotel,cache,buffer=15){
 const out=lookup(point('hotel',places,hotel),point('disneyDrop',places),'car',cache),back=lookup(point('disneyDrop',places),point('hotel',places,hotel),'car',cache);
 if(!out||!back)return null;
 const calc=extra=>Math.max(540,435+Math.max(60,out.durationSeconds/60+extra)+10+back.durationSeconds/60+extra+10);
 return {earliest:calc(buffer),later:calc(buffer+15),drop:435+Math.max(60,out.durationSeconds/60+buffer),outMinutes:out.durationSeconds/60,backMinutes:back.durationSeconds/60,buffer,dropMinutes:10,loadMinutes:10,delay:Math.max(0,calc(buffer)-540)};
}
function restAndDeadlines(data,places,hotel,cache,buffer=15){
 const d=(a,b,m='car')=>routeDelta(a,b,m,places,hotel,cache);
 const shared=sharedBus(places,hotel,cache,buffer);
 const sum=(...xs)=>xs.every(x=>x!==null)?xs.reduce((a,b)=>a+b,0):null;
 // 금요일 시내팀은 걸어서 다니므로 낮 휴식은 점심 뒤 호텔 왕복과 난징동루 걷는 시간 차이만 반영합니다(공유 버스 지연 없음).
 const friday=sum(d('raffles','hotel','foot'),d('hotel','nanjing','foot'));
 // 오전: 09:00 출발·09:10 도착 원안. 걷는 시간이 늘면 그만큼 일찍 나서는 것으로 비교합니다.
 const museum=data.options.museum||'history',walkAM=d('hotel',museum,'foot');
 const saturday=d('kpg','hotel');
 const sunday=sum(d('lubolang','hotel'),d('hotel','laojitang'));
 const toDinner=d('hotel','manbao',data.options.banquetMode);
 const airport=d('hotel','pvg');
 const rest=[
  {day:2,planned:90,available:!data.options.hotelRest||data.options.day2Rest!=='hotel'?0:friday===null?null:90-friday,note:'점심 뒤 호텔 왕복·난징동루 걷는 시간 차이만큼 줄거나 늚. 오전은 출발 시각으로 맞춤.'},
  {day:3,planned:60,available:!data.options.hotelRest?0:saturday===null?null:60-saturday,note:'호텔 휴식 선택자의 14:45–15:45 블록. 16:40 이후 만찬 준비는 순수 휴식으로 더하지 않음.'},
  {day:4,planned:150,available:!data.options.hotelRest?0:sunday===null?null:150-sunday,note:'입실·출발 양방향 증감 반영. 외출 준비·집결 45분 보존. 샤워·짐 정리가 포함될 수 있는 원안 휴식 블록.'}
 ];
 return {rest,shared,fridayDeparture:walkAM===null?null:540-walkAM,fridayWalk:lookup(point('hotel',places,hotel),point(museum,places),'foot',cache),airportDeparture:airport===null?null:585-airport,airportDeadline:660,airportMargin:175,
   photo:!data.options.hotelRest?'외부에서 만나므로 호텔 로비 사진 장소 변경 필요':toDinner===null?'호텔→만보루 경로 미조회':toDinner>1?`사진·출발을 약 ${Math.ceil(toDinner)}분 앞당기는 조정 필요`:'17:25 가족사진 · 원안 창 유지',
   sundayArrival:!data.options.hotelRest?null:(d('lubolang','hotel')===null?null:795+d('lubolang','hotel')),
   sundayRestEnd:!data.options.hotelRest?null:(d('hotel','laojitang')===null?null:945-d('hotel','laojitang')),
   sundayDeparture:!data.options.hotelRest?null:(d('hotel','laojitang')===null?null:990-d('hotel','laojitang')),
   cruiseRoute:lookup(point('laojitang',places),point('cruise',places),'foot',cache),
   dinnerDelta:toDinner
 };
}
function missingQueries(data,places,hotel,cache){
 const requested=new Map();
 function add(a,b,mode){if(!['car','foot'].includes(mode)||same(a,b))return;const k=key(a,b,mode);if(!lookup(a,b,mode,cache))requested.set(k,{key:k,a,b,mode});}
 const ids=[...new Set(data.journeys.flatMap(j=>j.legIds))];
 for(const id of ids){const l=resolve(data.legs[id],data,places,hotel,cache);if(!l.concept)add(l.fromCoord,l.toCoord,l.mode);}
 for(let day=1;day<=5;day++)for(const l of coach(day,data,places,hotel,cache))add(l.fromCoord,l.toCoord,l.mode);
 // Both directions, cost-free mode alternatives, and preserved-rest anchors for a fair comparison.
 for(const [a,b,m] of [['hotel','manbao','car'],['manbao','hotel','car'],['hotel','manbao','foot'],['manbao','hotel','foot'],['hotel','nanjing','foot'],['nanjing','hotel','foot'],['raffles','hotel','foot'],['kpg','hotel','car'],['lubolang','hotel','car'],['hotel','laojitang','car'],['hotel','disneyDrop','car'],['disneyDrop','hotel','car'],['hotel','pvg','car']])add(point(a,places,hotel),point(b,places,hotel),m);
 return [...requested.values()];
}
function aggregateVehicle(data,places,hotel,cache){const all=[1,2,3,4,5].flatMap(day=>coach(day,data,places,hotel,cache));return {occupied:totals(all.filter(x=>x.occupied)).car,empty:totals(all.filter(x=>!x.occupied)).car,legs:all};}
const api={provider,conditions,key,coordKey,same,minutes,clock,point,lookup,resolve,coach,totals,journeyMetrics,routeDelta,sharedBus,restAndDeadlines,missingQueries,aggregateVehicle};root.RouteModel=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
