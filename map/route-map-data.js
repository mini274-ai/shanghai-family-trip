/* Map-only itinerary overrides. Original SH_V4 / SH_SCHED files are never written.
   2026-11-07: 금요일 시내팀은 걸어서 다님(사용자 지시). 바꾼 곳은 '동선 지도 스타일 정리'의 자료 변경 메모 참고. */
(function (root) {
  'use strict';
  const meta = {
    title: '지도에서 보는 우리 여행', timezone: 'Asia/Shanghai', dates: ['2/18 목','2/19 금','2/20 토','2/21 일','2/22 월'],
    source: '상하이 여행 상세.pdf', checked: '2026-11-07',
    titles: ['상하이에 도착하는 날','두 팀의 금요일, 버스는 한 대','거리 산책과 가족 만찬','강을 건너거나, 잠시 쉬거나','여유를 남기고 공항으로'],
    summaries: ['공항 → 호텔 → BFC → 예원 등불 → 호텔','디즈니팀은 버스로, 시내팀은 걸어서 하루 동안 따로','우캉루 · 신톈디 · 선택활동 · 만보루','예원에서 출발한 두 팀이 17:15 BFC에서 만납니다','호텔 09:45 출발 원안 · 공항 11:00 도착 유지'],
    notes: [
      '첫날 난징동루 산책은 선택입니다. 객실에서 쉬어도 됩니다.',
      '시내팀은 가이드와 걸어서 다닙니다. 버스는 아침에 디즈니팀을 태워다 주고, 오후부터 필요할 때 시내팀이 씁니다.',
      '호텔 휴식팀은 신톈디 재집결 없이 호텔에 머뭅니다. 밖에 있는 가족만 16:00에 탑승합니다.',
      '페리와 야경 유람선은 다른 배입니다. 휴식팀은 버스로 호텔을 왕복하고 BFC에서 합류합니다.',
      '13:55 출발편의 수속 여유 2시간 55분을 유지합니다. 비교 호텔이 멀어지면 호텔 출발을 앞당깁니다.'
    ],
    overrides: [
      ['차량','PDF의 별도 전용차 → 22인승 1대. 금요일 시내팀은 걸어서(2026-11-07 지시), 버스는 오후부터 필요할 때.'],
      ['신톈디 점심','딘타이펑 신톈디점 → 식사 권역으로 표시. 대체 식당 미정.'],
      ['마사지','PDF 60분 / 후속 상담 90분. 점포·상품 확정 전이며 시간표 자동 변경 없음.'],
      ['일요일','호텔 왕복은 버스, 합류는 라오지탕 BFC 17:15.'],
      ['운영시각','디즈니·등불·페리·유람선의 2027년 운항·공연 확정값이 아님.']
    ]
  };
  const defaults = { day: 0, team: 'both', museum: 'history', dinner: 'laozhengxing', day1Walk: false, day2Rest: 'hotel', activity: 'cafe', viewpoint: 'ifc', hotelRest: true, banquetMode: 'foot', eveningMode: 'foot' };
  const pages = {1:'26–27',2:'29–32',3:'33–35',4:'37–40',5:'41–42'};
  function build(options = {}) {
    const o = {...defaults, ...options}, visits = {}, legs = {}, journeys = [], connections = [];
    let serial = 0;
    function path(day,team,label,base) {
      const item = {id:`d${day}-${team}`,day,team,label,visitIds: base ? [...base.visitIds] : [],legIds:base ? [...base.legIds] : []};
      const api = {item,
        at(place,time,title,note='',kind='stay') {
          const id=`d${day}-${team}-v${++serial}`;
          visits[id]={id,day,team,place,time,title,note,kind,source:{kind:'plan',file:meta.source,pages:pages[day]}};
          item.visitIds.push(id);return api;
        },
        go(place,mode,time,allocated,title,note='',extra={}) {
          const fromVisit=item.visitIds.at(-1);api.at(place,time.split('–').at(-1),title,note,'arrival');const toVisit=item.visitIds.at(-1);
          const id=`d${day}-${team}-l${++serial}`;
          legs[id]={id,fromVisit,toVisit,day,team,mode,vehicleId:mode==='car'?'coach-1':null,occupied:mode==='car',plan:{time,minutes:allocated},source:{kind:'plan',file:meta.source,pages:pages[day]},optional:false,...extra};
          item.legIds.push(id);return api;
        },
        done(){journeys.push(item);return item;}
      };return api;
    }
    function deadhead(day,from,to,note,afterLeg=null,beforeLeg=null){connections.push({id:`d${day}-empty-${connections.length+1}`,day,team:'vehicle',from,to,mode:'car',vehicleId:'coach-1',occupied:false,plan:{time:'배차 확인',minutes:null},note,afterLeg,beforeLeg,source:{kind:'required-connection',file:'최신 지시서'}});}
    function tail(pathApi,shared) {pathApi.item.legIds.push(...shared.legIds);pathApi.item.visitIds.push(...shared.visitIds);return pathApi;}
    // Arrival. Airport processing is a stay, not road travel.
    let a=path(1,'all','전원').at('pvg','13:25–14:50','상하이 도착 · 입국과 수하물','입국·수하물·가이드 만남. 중국 현지시각.');
    a.go('hotel','car','14:50–15:55',65,'호텔 도착').at('hotel','15:55–16:15','체크인');
    if(o.day1Walk) a.go('nanjing','foot','16:15–17:20',null,'선택: 난징동루 산책','왕복과 구경을 합해 확보한 65분. 산책 종점은 자유입니다.',{optional:true}).go('hotel','foot','17:20까지',null,'호텔로 돌아오기','17:20 집결을 지킬 수 있는 범위에서 산책.',{optional:true});
    else a.at('hotel','16:15–17:20','객실 휴식','65분의 선택 휴식. 산책을 선택한 가족만 나갑니다.','rest');
    a.at('hotel','17:20–17:30','로비 집결 · 탑승').go('putien','car','17:30–18:00',30,'BFC 도착','몰 내부 이동·착석을 포함한 배정시간.').at('putien','18:00–19:00','푸티엔 저녁').go('lantern','foot','19:00–19:15',15,'예원 등불 구역으로').at('lantern','19:15–20:15','등불·상점가 관람','예원 정원 관람과 구분.').go('hotel','car','20:15–20:45',30,'호텔 귀환').done();
    // Friday: two human journeys, one coach. 디즈니팀 시각은 PDF 그대로, 시내팀은 걸어서(2026-11-07 지시).
    const d=path(2,'disney','디즈니팀').at('hotel','07:00–07:15','호텔 집결').go('disneyDrop','car','07:15–08:15',60,'디즈니 하차','22인승 버스 한 대. 실제 하차장은 배차 확인.').go('disney','foot','08:15–08:45',30,'보행 · 보안검색 · 입장','입구·하차 위치 미정으로 이동거리 미산출.',{concept:true}).at('disney','08:45–19:30','파크에서 보내는 하루','점심 12:00 / 저녁 17:15. 내부 놀이기구 동선 미산출.').at('disney','19:30–20:30','야간쇼 계획','2027년 공연 시간 확정 아님.').go('disneyDrop','foot','20:30–21:00',30,'퇴장 · 픽업 지점으로','보행·집결 포함.',{concept:true}).go('hotel','car','21:00–22:00',60,'호텔 귀환').done();
    const c=path(2,'city','시내팀').at('hotel','09:00','호텔 출발','가이드와 걸어서 출발. 버스는 아침에 디즈니팀을 태워다 줍니다.').go(o.museum,'foot','09:00–09:10',10,'전시시설 도착','가이드와 걸어서 약 10분.').at(o.museum,'09:10–09:30','예약 확인 · 입장').at(o.museum,'09:30–10:45','한 곳만 관람','역사박물관 / 도시계획전시관 중 선택.').at(o.museum,'10:45–11:00','화장실 · 쉬는 시간').go('raffles','foot','11:00–11:30',30,'래플스시티로').at('raffles','11:30–12:30','몰 안에서 점심','서탑불고기·페이따추 우선, 현장 선택.');
    if(o.hotelRest && o.day2Rest==='hotel') c.go('hotel','foot','12:30–13:00',30,'낮 호텔 복귀','걸어서 약 6분.').at('hotel','13:00–14:30','호텔 휴식','원안 90분.','rest').go('nanjing','foot','14:30',null,'난징동루로');
    else c.at('raffles','12:30–14:30','인근 카페에서 휴식','점포 미지정. 낮 호텔 복귀를 하지 않는 선택.').go('nanjing','foot','14:30',null,'난징동루로');
    c.at('nanjing','14:30–15:15','보행가 구경').go('bund','foot','15:15–15:45',30,'와이탄으로','힘들면 버스 이용 협의.').at('bund','15:45–16:20','와이탄 산책').at('bund','16:20–17:00','카페에서 휴식','와이탄 권역, 점포 미정.').go(o.dinner,o.eveningMode,'17:00–17:30',30,'저녁 식당으로',o.eveningMode==='car'?'버스로 바꾼 선택. 원안은 걸어서.':'걸어서 이동 · 힘들면 버스.').at(o.dinner,'17:30–18:30','시내팀 저녁','라오정싱 또는 신야 한 곳.').go('hotel',o.dinner==='xinya'?'inside':o.eveningMode,'18:30–19:00',30,'호텔 귀환','신야는 기준 호텔 건물의 고정 식당입니다.').done();
    // 시내팀이 버스를 쓰는 선택(저녁 버스 등)이 있을 때만 디즈니 하차 뒤 시내팀 승차 권역으로 빈 차가 이동합니다. 걸어서 다니면 버스는 21:00 픽업까지 시내팀 운행 없음.
    const cityCars=c.item.legIds.filter(id=>legs[id].mode==='car');
    if(cityCars.length){
      const first=legs[cityCars[0]];
      deadhead(2,'disneyDrop',visits[first.fromVisit].place,'디즈니 하차 후 시내팀이 처음 타는 곳으로. 오전 시내팀은 걸어서 다닙니다.',d.legIds[0],first.id);
      // Walking gaps require the same coach to reposition, not teleport.
      for(let i=1;i<cityCars.length;i++){const prev=legs[cityCars[i-1]],next=legs[cityCars[i]];const from=visits[prev.toVisit].place,to=visits[next.fromVisit].place;if(from!==to)deadhead(2,from,to,'시내팀이 걷는 동안 다음 승차 권역으로 빈 차 이동.',prev.id,next.id);}
      const lastCity=cityCars.at(-1);
      deadhead(2,visits[legs[lastCity].toVisit].place,'disneyDrop','시내팀 운행 후 디즈니 21:00 픽업을 위한 빈 차 이동.',lastCity,d.legIds.at(-1));
    }
    // Saturday common morning. Alternative outside activities never occur in sequence.
    const morning=path(3,'common','전원').at('hotel','08:50–09:00','로비 집결').go('wukang','car','09:00–09:30',30,'우캉대루로').at('wukang','09:30–10:30','우캉대루·우캉루 산책').at('wukang','10:30–10:45','잠시 쉬기').go('anfu','foot','10:45',null,'안푸루 권역으로','산책 시작·끝 미정으로 거리를 계산하지 않습니다.',{concept:true}).at('anfu','10:45–11:25','거리·카페 구경').go('xintiandi','car','11:25–12:00',35,'신톈디로','집결을 포함한 배정시간.').at('xintiandi','12:00–12:15','식당 이동 · 착석').at('xintiandi','12:15–13:15','신톈디 점심','확정 식당이 아닌 식사 권역.').go('kpg','foot','13:15–13:30',15,'임시정부청사로').at('kpg','13:30–14:15','임시정부청사 관람');
    const outside=path(3,'outside','선택활동팀',morning.item);
    const activityPlace=o.activity==='park'?'fuxing':'xintiandi';
    outside.go(activityPlace,'foot','14:15–14:45',30,o.activity==='park'?'푸싱공원으로':'선택활동 권역으로','점포 내부 이동·접수 별도.').at(activityPlace,'14:45–15:45',o.activity==='park'?'푸싱공원 산책':o.activity==='massage'?'선택: 발마사지':'카페·쇼핑',o.activity==='massage'?'PDF 60분 / 후속 상품 90분. 예약 전 소요시간 확인.':'다른 선택활동과 합산하지 않습니다.');
    if(activityPlace!=='xintiandi')outside.go('xintiandi','foot','15:45–16:00',15,'신톈디 재집결');else outside.at('xintiandi','15:45–16:00','외부 활동팀 재집결');
    const rest=path(3,'rest','호텔 휴식팀',morning.item);
    if(o.hotelRest){
      outside.go('hotel','car','16:00–16:40',40,'외부 활동팀 호텔 복귀').at('hotel','16:40–17:25','휴식 · 만찬 준비','45분 전체가 순수 객실 휴식은 아닙니다.');
      rest.go('hotel','car','14:15–14:45',30,'버스로 호텔 복귀').at('hotel','14:45–15:45','호텔 휴식','이미 호텔에 있으므로 신톈디에 다시 가지 않습니다.','rest').at('hotel','15:45–17:25','호텔에서 자유시간 · 만찬 준비');
      deadhead(3,'xintiandi','kpg','점심 후 버스는 청사 관람을 마친 휴식팀의 승차 권역으로 이동. 정확한 승차 문은 확인.',morning.item.legIds.findLast(id=>legs[id].mode==='car'),rest.item.legIds.at(-1));
      deadhead(3,'hotel','xintiandi','휴식팀 하차 후 16:00 외부 활동팀 픽업. 정확한 출발 배차시각은 미정.',rest.item.legIds.at(-1),outside.item.legIds.at(-1));
      const evening=path(3,'evening','전원').at('hotel','17:25–17:40','호텔 로비 가족사진').go('manbao',o.banquetMode,'17:40–18:00',20,'만보루로 · 착석','도보 원안. 멀어진 호텔은 수단을 직접 바꿔 비교하세요.').at('manbao','18:00–20:00','가족 기념 만찬').go('hotel',o.banquetMode,'20:00–20:20',20,'호텔 귀환');
      tail(outside,evening.item).done();tail(rest,evening.item).done();
    }else{
      rest.go('xintiandi','foot','14:15–14:45',30,'신톈디 인근에서 머물기','가상 비교: 낮 호텔 휴식을 외부 체류로 변경.').at('xintiandi','14:45–17:25','인근 휴식 · 만찬 대기','카페 점포 미정. 객실 휴식으로 집계하지 않습니다.');
      outside.at('xintiandi','16:00–17:25','외부에서 쉬며 만찬 대기','가상 비교: 호텔 복귀 생략.');
      const evening=path(3,'evening','전원').at('xintiandi','17:25','가족사진 장소 재협의 필요','호텔 로비 사진은 유지할 수 없는 가상 시나리오.').go('manbao','car','17:25–18:00',35,'만보루로 직접 이동','새 연결 경로.').at('manbao','18:00–20:00','가족 기념 만찬').go('hotel',o.banquetMode,'20:00–20:20',20,'호텔 귀환');
      tail(outside,evening.item).done();tail(rest,evening.item).done();
    }
    // Sunday common morning and evening are shared IDs, never double-counted for the coach.
    const sun=path(4,'common','전원').at('hotel','08:10–08:20','로비 집결').go('yuyuan','car','08:20–08:50',30,'예원 정원으로').at('yuyuan','08:50–09:00','입장 준비').at('yuyuan','09:00–10:15','예원 정원 관람','정원 내부 산책거리 제외.').at('yuyuan','10:15–10:30','화장실 · 휴식').go('bridge','foot','10:30',null,'구곡교·호심정으로').at('bridge','10:30–11:15','구시가지 구경').go('lubolang','foot','11:15–11:30',15,'뤼보랑으로 · 착석').at('lubolang','11:30–12:30','점심').at('lubolang','12:30–12:45','두 팀으로 나눌 준비');
    const active=path(4,'active','활동팀',sun.item).go('bundSouth','foot','12:45–13:05',20,'와이탄 남단으로').at('bundSouth','13:05–13:30','강변 산책','선착장 주변 권역. 관람 보행 미산출.').go('jinling','inside','13:30',null,'진링동루 승선').go('dongchang','ferry','13:30–14:00',30,'페리로 강 건너기','대기·승하선 포함 계획. 파란 개념선은 실제 선박 항적이 아닙니다.').go('ring','foot','14:00–14:25',25,'루자쭈이 육교로');
    active.go(o.viewpoint,'foot','14:25',null,o.viewpoint==='tower'?'상하이타워 선택':'IFC 카페 선택').at(o.viewpoint,'14:25–15:30',o.viewpoint==='tower'?'전망대 선택 · 시간 확인 필요':'육교·IFC 카페',o.viewpoint==='tower'?'입장·대기·관람을 이 65분 안에 마칠 수 있는지 별도 확인. 카페 코스와 합산하지 않음.':'육교와 몰 사이 이동도 이 체류 블록에 포함.').go('dongchang','foot','15:30–16:30',null,'둥창루로 돌아가기','이후 페리·BFC 도보까지 세 구간을 합해 60분 배정.',{group:'d4-return'}).go('jinling','ferry','15:30–16:30',null,'페리로 서쪽 복귀','십육포 직행 페리가 아닙니다.',{group:'d4-return'}).go('laojitang','foot','15:30–16:30',null,'BFC 권역으로 걷기','세 구간 공동 배정 60분.',{group:'d4-return'}).at('laojitang','16:30–17:15','BFC 인근 카페·휴식','카페 점포 미지정.');
    const resting=path(4,'rest','휴식팀',sun.item);
    if(o.hotelRest)resting.go('hotel','car','12:45–13:15',30,'버스로 호텔 복귀').at('hotel','13:15–15:45','객실 휴식 150분','PDF의 휴식 블록이며 샤워·짐 정리 포함 가능. 이후 준비 45분은 제외.','rest').at('hotel','15:45–16:15','외출 준비').at('hotel','16:15–16:30','로비 집결 · 탑승').go('laojitang','car','16:30–17:15',45,'버스로 BFC 재합류');
    else resting.at('lubolang','12:45–16:30','예원 인근에서 외부 휴식','가상 비교: 카페 미지정, 객실 휴식 없음.').go('laojitang','car','16:30–17:15',45,'BFC 재합류','호텔 왕복 대신 예원→BFC 직접 연결.');
    const night=path(4,'evening','전원').at('laojitang','17:15–17:30','두 팀이 다시 만나는 곳','BFC 남구 4층 라오지탕.','reunion').at('laojitang','17:30–18:30','라오지탕 저녁').go('cruise','foot','18:30–18:45',15,'십육포 승선 권역으로','정확한 부두 미정이므로 표시 경로는 권역 간 참고.').at('cruise','18:45–19:30','유람선 집결 · 표 확인 · 탑승','18:45 집결 고정. 실제 게이트는 예약 안내.').at('cruise','19:30–20:15','황푸강 야경 유람선','현재 계획 회차. 항로 미확인으로 임의 루프를 그리지 않습니다.','cruise').at('cruise','20:15–20:35','하선 · 버스 탑승').go('hotel','car','20:35–21:05',30,'호텔 귀환');
    tail(active,night.item).done();tail(resting,night.item).done();
    const sunRestCar=resting.item.legIds.filter(id=>legs[id].mode==='car');
    for(let i=1;i<sunRestCar.length;i++){const x=legs[sunRestCar[i-1]],y=legs[sunRestCar[i]],from=visits[x.toVisit].place,to=visits[y.fromVisit].place;if(from!==to)deadhead(4,from,to,'산책·식사·유람선 중 버스가 다음 승차 권역으로 이동. 배차시각은 미정.',x.id,y.id);}
    // Return: flight/processing kept separate from ground transport.
    path(5,'all','전원').at('hotel','09:00–09:20','체크아웃').at('hotel','09:20–09:45','로비 집결 · 짐 싣기').go('pvg','car','09:45–11:00',75,'푸둥공항 T1 도착','11:00 도착을 유지하도록 숙소별 출발시간 비교.').at('pvg','11:00–11:15','하차 · 카운터로').at('pvg','11:15–11:55','체크인 · 수하물').at('pvg','11:55–12:30','출국심사 · 보안검색').at('pvg','12:30–13:00','간단한 점심').at('pvg','13:00–13:15','탑승구로').at('pvg','13:15–13:55','탑승 · 출발 준비','13:55 FM829 출발 계획. 중국 현지시각.').done();
    return {options:o,visits,legs,journeys,connections};
  }
  const api={meta,defaults,build};root.RouteData=api;
  if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
