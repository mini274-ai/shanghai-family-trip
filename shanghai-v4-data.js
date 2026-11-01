/* 상하이 가족여행 — 확정판 · 2026. 11. 1
   시간표 154개 시간 구간. 상태 태그·범례 없음(완성본).
   메인 안내(날짜별 요약)와 '집에서 집까지 · 상세 시간표'가 함께 쓰는 공통 데이터.
   R(시간, 무엇을 하는가, 이해할 점, { tags, sum, hi, fl, ph })
   - tags : 상태 표시. '!'로 시작하면 주의 표시
   - sum  : 메인 요약 항목(time 지정 가능, notime이면 시각 생략)
   - hi   : 하이라이트 / fl : 비행 구간 / ph : 이 줄에 붙는 사진 ID
   블록 g: true = 가이드 요청시간과 비교 / false = 가이드 없음 / 'team' = 동행 팀 미정 */
(function () {
  function R(t, w, n, o) {
    o = o || {};
    return { t: t, w: w, n: n, tags: o.tags || [], sum: o.sum || null, hi: !!o.hi, fl: !!o.fl, ph: o.ph || [] };
  }
  var ORIG = '원본 파일 그대로(수정 없음)';
  var WEB = '웹용 사본: EXIF 방향 적용, 긴 변 1800px로 비율 유지 축소, JPEG 재저장 · 크롭·색 보정·합성 없음';
  var WM = 'Wikimedia Commons';
  var L = {
    'CC BY-SA 4.0': 'https://creativecommons.org/licenses/by-sa/4.0/',
    'CC BY-SA 3.0': 'https://creativecommons.org/licenses/by-sa/3.0/',
    'CC BY 4.0': 'https://creativecommons.org/licenses/by/4.0/',
    'CC BY 2.0': 'https://creativecommons.org/licenses/by/2.0/',
    'CC0': 'https://creativecommons.org/publicdomain/zero/1.0/',
    'Unsplash License': 'https://unsplash.com/license'
  };
  function P(file, orig, title, cap, author, site, src, lic, edit, w, h) {
    return { file: file, orig: orig, title: title, cap: cap, author: author, site: site, src: src, lic: lic, licUrl: L[lic], edit: edit, w: w, h: h };
  }

  window.SH_V4 = {
    meta: '확정판 · 2026. 11. 1',
    legend: [],
    maps: {
      gimhae: ['김해공항 지도', 'Gimhae+International+Airport'],
      pudong: ['푸둥공항 지도', 'Shanghai+Pudong+International+Airport'],
      hotel: ['호텔 지도', 'Crowne+Plaza+Shanghai+Nanjing+Road'],
      yuyuan: ['예원 지도', 'Yu+Garden+Shanghai'],
      bfc: ['BFC 지도', 'Bund+Finance+Center+Shanghai'],
      disney: ['디즈니랜드 지도', 'Shanghai+Disneyland'],
      supec: ['도시계획전시관 지도', 'Shanghai+Urban+Planning+Exhibition+Center'],
      raffles: ['래플스시티 지도', 'Raffles+City+Shanghai'],
      nanjing: ['난징동루 지도', 'Nanjing+Road+East+Shanghai'],
      bund: ['와이탄 지도', 'The+Bund+Shanghai'],
      wukang: ['우캉루 지도', 'Wukang+Mansion+Shanghai'],
      xtd: ['신톈디 지도', 'Xintiandi+Shanghai'],
      kpg: ['임시정부청사 지도', 'Provisional+Government+of+the+Republic+of+Korea+Site+Shanghai'],
      fuxing: ['푸싱공원 지도', 'Fuxing+Park+Shanghai'],
      marquis: ['만찬 장소 지도', 'Shanghai+Marriott+Marquis+City+Centre'],
      ljz: ['루자쭈이 지도', 'Lujiazui+Shanghai'],
      slp: ['십육포 부두 지도', 'Shiliupu+Wharf+Shanghai'],
      square: ['인민광장 지도', 'People%27s+Square+Shanghai'],
      lzx: ['라오정싱 지도', 'Lao+Zheng+Xing+Restaurant+Fuzhou+Road+Shanghai'],
      dtf: ['딘타이펑 지도', 'Din+Tai+Fung+Xintiandi+Shanghai'],
      lbl: ['뤼보랑 지도', 'Lubolang+Restaurant+Yuyuan+Shanghai']
    },
    days: [
      {
        id: 'day1', n: 1, date: '2/18', dow: '목', dowLong: '목요일', en: '2027. 2. 18 · THU',
        title: '집결, 출국, 상하이 도착, 예원 등불',
        purpose: '남외동 본가에 모여 차 세 대로 김해공항, 점심 비행기로 상하이. 호텔에 짐을 풀고 저녁에 예원 등불을 봅니다.',
        tz: '한국시각 → 중국시각',
        key: [['08:30', '본가 출발'], ['09:45', '체크인 구역 집결']],
        walk: [['오늘의 걷기', '4~6천 보']],
        noGuide: '가이드·버스 동행 · 공항 미팅부터 등불까지',
        sections: [
          { blocks: [{
            label: '', short: '한국 · 한국시각', tz: '한국시각', g: false,
            title: 'A. 한국 — 자택에서 김해공항 출국까지',
            intro: '출발 기준은 07:30 태화 집결, 08:00 공항버스다. 각 집에서 집결지까지 30분 걸린다는 가정이다.',
            rows: [
              R('07:00~07:30', '기상·세면·옷 입기', '캐리어는 전날 준비한다.'),
              R('07:30~07:50', '아침은 각자 집에서', '안 먹어도 된다.'),
              R('07:50~08:10', '여권·휴대전화·지갑·약·짐 최종 확인, 차에 싣기', '여권은 캐리어 깊숙이 넣지 않는다.'),
              R('08:10~08:30', '송정동·매곡동 → 남외동 본가', '08:30까지 모인다.'),
              R('08:30~09:30', '남외동 본가에서 차 세 대로 김해국제공항', '약 1시간 5분.', { sum: { title: '본가에서 차 세 대로 출발 → 김해공항', note: '약 1시간 5분', map: 'gimhae' } }),
              R('09:30~09:45', '출발층 앞 하차·주차', '짐과 가족은 먼저 내리고, 운전자만 P2 주차.', { ph: ['P25'], sum: { notime: true, title: '국제선 출발층 앞 — 짐과 가족은 먼저 내리고, 운전자만 P2 주차', note: '다자녀 등록 차량 50% · 차면 가람주차장(무료 셔틀)' } }),
              R('09:45~10:00', '국제선 출발층 · 중국동방항공 체크인 구역 10명 집결', '인원·짐 확인.', { sum: { title: '국제선 출발층 · 중국동방항공 체크인 구역 10명 집결', note: '출발 2시간 50분 전 · 체크인 → 보안·출국심사' } }),
              R('10:00~10:35', '체크인·수하물 위탁', ''),
              R('10:35~11:05', '보안검색·출국심사', ''),
              R('11:05~11:40', '면세구역 푸드코트에서 각자 점심', '우동·국밥·돈가스, 안 먹을 사람은 카페.', { sum: { title: '면세구역 푸드코트 · 각자 점심', note: '우동·국밥·돈가스 · 안 먹을 사람은 카페' } }),
              R('11:40~11:55', '화장실·탑승구 도착·10명 확인', ''),
              R('11:55~12:20', '탑승', ''),
              R('12:20~12:35', '착석·출발 준비', ''),
              R('12:35 한국 → 13:25 중국', 'MU5044 비행', '시차를 반영하면 예정 비행시간은 1시간 50분.', { fl: true, sum: { time: '12:35', title: 'MU5044 김해 출발 → 13:25 푸둥 도착', note: '비행 1시간 50분(시차 반영) · 도착부터 중국시각, 한국보다 1시간 느림', map: 'pudong' } })
            ]
          }] },
          { blocks: [{
            label: '', short: '중국 · 중국시각', tz: '중국시각', g: true,
            title: 'B. 중국 — 도착부터 체크인·저녁·등불까지',
            intro: '여기부터 중국시각이다. 공항과 호텔 사이에 관광이나 쇼핑은 넣지 않았다. 저녁을 먼저 먹고 해가 진 뒤 등불을 본다.',
            rows: [
              R('13:25~13:45', '항공기에서 내리기·입국심사 구역으로 이동', '13:25 도착 즉시 공항 밖으로 나오는 것이 아니다.', { ph: ['P26'] }),
              R('13:45~14:15', '입국심사', '서류·입국요건을 미리 갖춘 상태를 전제한다. 대기는 변동.'),
              R('14:15~14:35', '캐리어 찾기·세관 통과', '각 가족이 자기 짐을 확인한다.'),
              R('14:35~14:50', '화장실·기사 미팅·차량 이동·짐 적재', '이름표·차량번호·미팅 지점을 사전에 확인한다.'),
              R('14:50~15:55', '예약 차량으로 호텔 이동', '65분 배정. 교통상황에 따라 더 걸릴 수 있다.', { sum: { notime: true, title: '입국·짐 찾기 → 가이드 미팅 → 버스로 호텔', note: '입국장에서 여행사(요모) 미팅보드 · 체크인 뒤 17:20까지 객실 휴식 또는 난징동루 구경', map: 'hotel' } }),
              R('15:55~16:15', '체크인·5객실 배정·객실 입실', '호텔 도착과 객실 입실 완료는 다르다.'),
              R('16:15~17:20', '객실 휴식 또는 난징동루 구경', '각자 고른다. 난징동루 보행자거리는 호텔 정문 바로 앞이다.'),
              R('17:20~17:30', '로비 집결·버스 탑승', '17:30에 출발한다.'),
              R('17:30~18:00', '버스로 BFC 이동·착석', '퇴근 시간이라 30분을 잡았다.', { ph: ['P28'] }),
              R('18:00~19:00', '가족 10명 저녁식사', '', { sum: { title: '푸티엔 BFC점에서 저녁', note: '10인 예약 · 17:20 로비 집결, 17:30 버스', map: 'bfc' } }),
              R('19:00~19:15', '걸어서 예원으로', '식당에서 도보 10분.'),
              R('19:15~20:15', '예원 등불축제 60분 관람', '해가 진 뒤라 등불이 가장 잘 보인다.', { hi: true, ph: ['P07'], sum: { title: '예원 등불축제 60분', note: '식당에서 걸어서 10분 · 입장권은 여행사가 준비', map: 'yuyuan' } }),
              R('20:15~20:45', '버스로 호텔 귀환', '버스 타는 곳은 가이드가 정한다.', { sum: { title: '버스로 호텔 귀환', note: '예원 근처에서 버스 · 21시 전 호텔', map: 'hotel' } }),
              R('20:45~21:15', '샤워·다음 날 디즈니팀 가방 준비', '여권·티켓·충전·방한 준비 등을 점검한다.'),
              R('21:15~22:00', '객실 휴식·취침 준비', '디즈니팀은 가능한 일찍 마무리한다.')
            ]
          }] }
        ],
        notes: [],
        checks: []
      },
      {
        id: 'day2', n: 2, date: '2/19', dow: '금', dowLong: '금요일', en: '2027. 2. 19 · FRI',
        title: '디즈니팀과 시내팀, 각자의 하루',
        purpose: '두 팀은 식사·귀환을 맞추지 않습니다. 디즈니팀은 22시, 시내팀은 19시 전후 호텔로 돌아옵니다.',
        tz: '모두 중국시각',
        key: [['07:15', '디즈니팀 출발'], ['09:00', '시내팀 출발']],
        walk: [['디즈니팀', '2만 보'], ['시내팀', '5~6천 보']],
        noGuide: '시내팀은 가이드·버스 동행 · 디즈니팀은 전용차 기사만',
        sections: [
          {
            parallel: true,
            title: '두 팀이 동시에 움직입니다',
            intro: '디즈니팀 4~6명과 시내팀 4~6명(10명에서 디즈니 참가자를 뺀 인원)은 서로 식사·귀환을 맞추지 않는다. 2/19에는 10인 공동 저녁이 없다.',
            foot: '이날은 10명이 다시 모이지 않는다. 다음 전원 합류는 2/20(토) 08:50 로비 집결 → 09:00 호텔 출발(유지 여부 미정).',
            sumNote: '두 팀은 식사·귀환을 맞추지 않습니다',
            blocks: [
              {
                label: '디즈니팀', short: '디즈니팀', tone: 'red', g: false,
                gnote: '가이드 없음 — 귀환 연락은 밴 기사·여행사 별도 비상연락 담당자',
                ph: ['P38'],
                title: 'A. 디즈니팀',
                intro: '호텔 조식 06:30 시작을 이용한다. 08:30 개장 기준. 놀이기구를 정해진 개수만큼 탄다는 보장은 아니다.',
                rows: [
                  R('06:00~06:25', '기상·세면·외출 준비', '가방은 전날 준비한 상태.'),
                  R('06:25~06:30', '조식당으로 이동', '호텔 조식 포함 예약 여부는 별도 확인.'),
                  R('06:30~07:00', '호텔 조식', '디즈니 도착 후 아침부터 먹는 안이 아니다.'),
                  R('07:00~07:10', '화장실·여권과 티켓 확인·로비 집결', '식사 후 객실에서 오래 준비하지 않는다.'),
                  R('07:10~07:15', '참가자 인원 확인·밴 탑승', '사전 준비할 차량과 픽업 연락처 확인.'),
                  R('07:15~08:15', '호텔 → 디즈니 이동', '60분 계획값. 실제 교통·개장시간에 맞춰 조정.', { sum: { title: '전용차로 디즈니 출발', note: '06:30 조식 후 07:10 로비 집결 · 08:15 도착', map: 'disney' } }),
                  R('08:15~08:45', '차량 하차·입구 이동·보안검색·입장 대기', '차량 하차 지점이 곧 파크 입구인 것은 아니다.'),
                  R('08:45~10:30', '우선순위 놀이시설 이용', '가장 원하는 시설부터. 대기에 따라 순서를 바꾼다.', { sum: { notime: true, title: '파크 관람 — 원하는 시설부터', note: '08:30 개장과 함께 입장 · 꼭 탈 것 2~3개를 먼저' } }),
                  R('10:30~10:45', '화장실·물·잠깐 휴식', '서서 기다리는 것은 충분한 휴식으로 계산하지 않는다.'),
                  R('10:45~11:45', '추가 놀이시설·구역 관람', '정해진 시설 수를 채우는 방식은 피한다.'),
                  R('11:45~12:00', '점심 장소 이동·주문 준비', '실제 디즈니 참가자가 함께 먹을 장소를 고른다.'),
                  R('12:00~13:00', '디즈니 내 점심', '시내팀을 만나러 나가지 않는다.', { sum: { notime: true, title: '파크 안 점심 · 오후 착석 휴식', note: '저녁도 파크 안에서 · 시내팀과 만나거나 호텔로 돌아오지 않음' } }),
                  R('13:00~14:00', '실내 공연 또는 카페·착석 휴식', '공연이 없으면 앉아서 쉬는 시간으로 사용.'),
                  R('14:00~15:30', '오후 놀이시설·공연 선택', '퍼레이드가 있으면 실제 회차에 맞춰 이 시간대를 교체.'),
                  R('15:30~16:00', '간식·카페·화장실', '오후 휴식시간을 별도로 확보.'),
                  R('16:00~17:15', '남은 희망 시설·사진', '무조건 모든 인기 시설을 다 타지는 않는다.'),
                  R('17:15~18:00', '파크 내 저녁식사', '야간쇼 직전에 식사를 몰아넣지 않는다.'),
                  R('18:00~19:30', '가벼운 구경·기념품·야간 프로그램 준비', '공연 장소로 이동하는 시간도 포함.'),
                  R('19:30~20:30', '야간쇼 대기·관람을 위한 임시 시간대', '실제 공연시간을 확인한 뒤 바꿔야 하는 블록.'),
                  R('20:30~21:00', '퇴장·화장실·밴 픽업 지점으로 이동', '공연 종료와 차에 타는 시각은 다르다.'),
                  R('21:00~22:00', '밴으로 호텔 귀환', '이 예시의 귀환 목표는 22시. 이전 21:45는 고정 보장이 아니다.', { sum: { title: '야간쇼 후 전용차로 호텔', note: '22:00 호텔 도착 · 출발할 때 가족 카톡방에 알림', map: 'hotel' } }),
                  R('22:00~22:45', '샤워·휴식·취침 준비', '다음 날 출발은 09시. 필요한 준비를 줄인다.')
                ]
              },
              {
                label: '시내팀', short: '시내팀', tone: 'navy', g: true,
                title: 'B. 시내팀 — 디즈니에 안 가는 가족',
                intro: '09시 호텔 출발을 기본으로 한다. 가이드는 10시 시작 요청이므로 선출발·합류 방식 확인 필요. 도시계획전시관 또는 역사박물관 중 한 곳만 선택한다. 아래는 인민광장권 전시시설에 09:30 전후 입장하는 예약을 받는다는 계획이다.',
                after: '08:30 출발을 선택하면 08:30~09:00에 인민광장권 짧은 산책을 넣고 관람은 예약시간에 맞춘다. 시내팀 4~6명+가이드 1명의 차량 정원을 반영한다. 가이드는 10:00~18:30 요청이며 09시 가족 출발과의 합류 방식을 확인한다. 디즈니 야간 차량 연락은 퇴근한 가이드에게 자동으로 맡기는 것이 아니라 별도 담당자를 정한다.',
                rows: [
                  R('07:30~08:00', '기상·세면', '디즈니팀과 동시에 일어날 필요가 없다.'),
                  R('08:00~08:40', '호텔 조식', '아침식사를 여유 있게 한다.'),
                  R('08:40~09:00', '외출 준비·로비 집결', '당일 선택 전시시설을 확인.'),
                  R('09:00~09:20', '전시시설로 이동', '도보 또는 짧은 차량 이동. 실제 시설에 따라 조정.', { sum: { title: '가이드·버스와 출발 → 전시 한 곳 관람', note: '역사박물관 / 도시계획전시관 중 18일 저녁에 고른 곳', map: 'square' } }),
                  R('09:20~09:30', '예약·입장 확인', '입장 대기 여유를 별도로 둔다.'),
                  R('09:30~10:45', '전시 한 곳 관람', '도시 모형 또는 상하이 역사 전시 중심.', { ph: ['P24', 'P09', 'P17'] }),
                  R('10:45~11:00', '화장실·앉아서 쉬기', '관람을 마치고 바로 서두르지 않는다.'),
                  R('11:00~11:30', '인민광장권 산책·래플스시티 이동', '래플스시티는 쇼핑몰이며 실제 식당은 별도 선택.', { ph: ['P01'] }),
                  R('11:30~12:30', '점심식사', '이날 신톈디까지 이동하지 않는다.', { sum: { title: '래플스시티 점심 → 호텔 휴식 또는 카페', note: '서탑불고기 / 페이따추 중 그 자리에서 선택 · 객실 휴식은 원하는 사람만', map: 'raffles' } }),
                  R('12:30~13:00', '휴식조는 호텔 이동 / 나머지는 인근 카페', '모두 호텔에 들어가야 하는 것은 아니다.'),
                  R('13:00~14:30', '선택 휴식·카페·가벼운 쇼핑', '누워 쉬고 싶은 사람은 객실 이용.'),
                  R('14:30~15:15', '난징동루 기념품·상점 구경', '마지막 밤에 쇼핑을 몰아 하지 않도록 한다.', { ph: ['P18'], sum: { notime: true, title: '난징동루 → 와이탄 낮 풍경', note: '난징동루 기념품 구경 뒤 와이탄은 짧게 · 16:20 카페 휴식', map: 'bund' } }),
                  R('15:15~15:45', '와이탄으로 이동', '도보 또는 택시. 체력이 떨어지면 생략.'),
                  R('15:45~16:20', '와이탄 낮 풍경 관람', '긴 종주가 아니라 원하는 구간만 짧게.'),
                  R('16:20~17:00', '카페·착석 휴식', '날씨가 나쁘면 실내에 머문다.'),
                  R('17:00~17:30', '호텔권 저녁식당으로 이동', '이동·배차·착석 포함.'),
                  R('17:30~18:30', '시내팀 저녁식사', '디즈니팀을 기다리지 않고 별도 식사.', { sum: { title: '시내팀 저녁 → 19:00 전후 호텔', note: '라오정싱 / 신야 중 그날 오후에 고른 곳 · 디즈니팀을 기다리지 않음', map: 'lzx' } }),
                  R('18:30~19:00', '호텔 복귀', '이후 객실 휴식.'),
                  R('19:00 이후', '샤워·자유시간·원하는 시각 취침', '디즈니팀이 돌아올 때까지 로비에서 기다릴 필요가 없다.')
                ]
              }
            ]
          }
        ],
        notes: [],
        checks: []
      },
      {
        id: 'day3', n: 3, date: '2/20', dow: '토', dowLong: '토요일', en: '2027. 2. 20 · SAT', badge: '원소절',
        title: '거리 산책, 임시정부청사, 가족 만찬',
        purpose: '오후 선택시간 뒤 18시 만보루 가족 만찬으로 다시 모입니다.',
        tz: '모두 중국시각',
        key: [['09:00', '호텔 출발'], ['17:25', '로비 재집결']],
        walk: [['오늘의 걷기', '5~9천 보']],
        noGuide: '가이드·버스 동행',
        sections: [
          { blocks: [{
            label: '전원', short: '오전 · 전원', g: true,
            title: '오전 거리 산책 → 신톈디 점심 → 임시정부청사',
            intro: '09시 호텔 출발을 현재 기준으로 두되 유지 여부는 미정이다. 가이드 10시 시작과의 합류 방식을 확인한다. 마사지는 희망자만 받는다.',
            rows: [
              R('07:15~07:45', '기상·세면', '전날 늦게 귀환한 가족의 준비시간 확보.'),
              R('07:45~08:30', '호텔 조식', '서둘러 먹고 바로 뛰어나가는 일정은 아니다.'),
              R('08:30~08:50', '외출 준비', '오후 만찬 옷은 객실에 두고 나간다.'),
              R('08:50~09:00', '로비 집결·택시 배차·탑승', '세 차량 목적지를 동일하게 확인.'),
              R('09:00~09:30', '우캉루·우캉대루 쪽으로 이동', '30분 계획값.', { sum: { title: '호텔 출발 → 우캉루·안푸루 산책', note: '버스 · 우캉대루 사진 → 안푸루 카페 거리', map: 'wukang' } }),
              R('09:30~10:30', '우캉대루 외관·우캉루 산책·사진', '거리를 전부 완주할 필요는 없다.', { ph: ['P31'] }),
              R('10:30~10:45', '화장실·잠깐 앉아서 휴식', '이후 안푸루로 이어간다.'),
              R('10:45~11:25', '안푸루 구경·상점 또는 짧은 카페', '실제 영업 중인 곳 중심.'),
              R('11:25~12:00', '집결·택시로 신톈디 이동', '호출과 세 대의 재집결까지 포함.'),
              R('12:00~12:15', '식당 도착·화장실·착석', '12:15는 식사를 시작하는 목표시각.'),
              R('12:15~13:15', '신톈디 점심', '희망 식당은 딘타이펑. 실제 지점 영업·예약 가능성 확인 전이며 필요하면 대체 후보를 받는다.', { ph: ['P06'], sum: { title: '딘타이펑 신톈디점 점심', note: '10인 예약 · 샤오롱바오', map: 'dtf' } }),
              R('13:15~13:30', '임시정부청사 이동·입장 준비', '식당을 멀리 잡으면 이 시간도 바뀐다.'),
              R('13:30~14:15', '대한민국 임시정부청사 관람', '30~45분 계획. 2027 당일 개관·입장 조건 확인.', { ph: ['P08', 'P22'], sum: { notime: true, title: '대한민국 임시정부청사', note: '신톈디에서 도보 5분 · 30~45분 관람', map: 'kpg' } })
            ]
          }] },
          { blocks: [{
            label: '각자 하나', short: '선택시간 · 각자 하나', g: true, choice: true,
            title: '14:15~16:00 선택시간 — 같은 시간에 각자 하나',
            intro: '마사지팀은 이동·접수 후 14:45~15:45 마사지. 비참가자는 신톈디 카페·쇼핑, 푸싱공원 산책, 호텔 복귀 중 하나를 선택한다. 공원 선택자는 공원까지 이동과 호텔 복귀 시간을 포함한다. 희망자가 없으면 마사지 예약을 하지 않는다. 공통 약속은 16:40 전후 호텔 복귀와 17:25 로비 집결이다.',
            choicesAfter: 0,
            choices: [
              { k: '발마사지 희망자', t: '14:45~15:45', d: '발마사지 60분 · 다인실 · 1인 4만원 실비.' },
              { k: '신톈디 카페·쇼핑', d: '마사지팀을 기다리지 않고 바로 시작.', ph: 'P05' },
              { k: '푸싱공원 산책', d: '공원까지 이동과 호텔 복귀 시간 포함.', ph: 'P35' },
              { k: '호텔 복귀·휴식', d: '먼저 돌아가 객실에서 쉰다.' }
            ],
            rows: [
              R('14:15~14:45', '선택활동별 이동·마사지 희망자는 접수', '마사지 비참가자는 기다리지 않고 자기 일정 시작.', { sum: { title: '선택시간 — 각자 하나를 고릅니다', note: '희망자 발마사지 / 신톈디 카페·쇼핑 / 푸싱공원 / 호텔 휴식 — 같은 시간에 동시에 진행', map: 'fuxing' } }),
              R('14:45~15:45', '희망자 발마사지 60분', '근처 매장 확보 전제. 발마사지·다인실·희망자 실비. 바디·목욕형 스파 아님.', { sum: { title: '희망자 발마사지 60분', note: '다인실 · 1인 4만원 실비' } }),
              R('15:45~16:00', '마사지 종료·결제·정리 / 다른 팀도 귀환 준비', '같은 매장에 전원 재집결하지 않는다.')
            ]
          }] },
          { blocks: [{
            label: '전원', short: '저녁 · 전원', g: true,
            title: '호텔 복귀 → 가족 기념 만찬',
            rows: [
              R('16:00~16:40', '각자 호텔로 이동', '먼 장소로 새 관광을 시작하지 않는다.'),
              R('16:40~17:25', '객실 휴식·세면·환복', '마사지를 안 받은 가족도 호텔에서 합류.'),
              R('17:25~17:40', '로비 집결·가족사진·만찬 출발 준비', '여권·소지품 등 개인 물건 정리.', { sum: { title: '로비 재집결', note: '각자 호텔로 돌아와 휴식·환복 후 · 가족사진', map: 'hotel' } }),
              R('17:40~18:00', 'Marriott Marquis의 Man Bao Lou로 이동·착석', '숙소를 옮기는 것이 아니라 식당에 가는 것.'),
              R('18:00~20:00', '가족 10명 Man Bao Lou 별실 기념 만찬', '식사·대화·기념사진. Man Bao Lou 별실 이용은 가족 결정. 실제 예약 확인·메뉴·금액은 별도 확인.', { hi: true, sum: { title: '만보루 별실 가족 기념 만찬', note: '메리어트 마르퀴스 4층, 호텔에서 도보 5분 · 아린이의 수능·입학 축하', map: 'marquis' } }),
              R('20:00~20:20', '숙소로 돌아오기', '컨디션에 따라 도보 또는 차량.'),
              R('20:20~21:30', '휴식·기념품 및 짐 일부 정리', '일요일 귀환이 늦으므로 미리 일부 정리.'),
              R('22:00~22:30 전후', '취침 준비·취침', '다음 날은 08:20 호텔 출발.')
            ]
          }] }
        ],
        notes: [],
        checks: []
      },
      {
        id: 'day4', n: 4, date: '2/21', dow: '일', dowLong: '일요일', en: '2027. 2. 21 · SUN',
        title: '예원 정원, 오후 두 팀, 저녁 유람선',
        purpose: '낮에는 나뉘고, 저녁과 19:30 유람선은 전원 함께합니다.',
        tz: '모두 중국시각',
        key: [['08:20', '호텔 출발'], ['17:15', '식당 합류']],
        walk: [['활동조', '9~11천 보'], ['휴식조', '6천 보']],
        noGuide: '가이드·버스 동행 · 유람선 뒤 호텔까지',
        sections: [
          { blocks: [{
            label: '전원', short: '오전 · 전원', g: true,
            title: 'A. 오전 — 전원 함께 예원',
            intro: '08:20 버스로 호텔 출발. 호텔 출발부터 정원 입장까지 40분.',
            rows: [
              R('06:45~07:15', '기상·세면', '전날 가방을 준비해 둔다.'),
              R('07:15~07:50', '호텔 조식', '35분 배정.'),
              R('07:50~08:10', '외출 준비·여권·예약 확인', '오후 휴식조 여부는 점심 후 최종 결정해도 된다.'),
              R('08:10~08:20', '로비 집결·차량 탑승', '08:20은 객실에서 나오는 시간이 아니라 차량 출발.'),
              R('08:20~08:50', '택시로 예원 입구 부근 이동', '하차 뒤 입구까지의 이동을 포함한 배정.', { sum: { title: '호텔 출발 → 예원 정원 · 구시가지', note: '버스 · 09:00 개장과 함께 입장, 낮의 정원과 호심정', map: 'yuyuan' } }),
              R('08:50~09:00', '예약 확인·입장 준비', '현재 공식 09시 개관 기준. 방문일 재확인.'),
              R('09:00~10:15', '예원 정원 관람', '첫날의 등불과 다른, 낮의 정원 내부 관람.', { ph: ['P30'] }),
              R('10:15~10:30', '화장실·앉아서 쉬기', '계속 서서 관광하지 않는다.'),
              R('10:30~11:15', '구곡교·호심정 주변·구시가지', '차를 마시거나 유료시설을 전부 추가하는 코스는 아니다.', { ph: ['P13'] }),
              R('11:15~11:30', '점심식당 이동·착석', '남상만두점·녹파랑·상하이노반점 중 1곳 희망. 예약·메뉴는 별도 확인.'),
              R('11:30~12:30', '전원 점심식사', '이후 활동조·휴식조로 선택.', { sum: { title: '뤼보랑(绿波廊) 전원 점심', note: '예원 구곡교 옆 · 10인 원탁 · 점심 후 활동조·휴식조로', map: 'lbl' } }),
              R('12:30~12:45', '화장실·두 팀 연락 및 저녁 합류 장소 확인', '17:30 저녁식당에서 다시 만나기로 한다.')
            ]
          }] },
          {
            parallel: true,
            title: '오후 — 활동조와 휴식조로 나뉩니다',
            intro: '오후 팀은 디즈니팀과 반드시 같은 명단이 아니다. 휴식조 여부는 점심 후 최종 결정해도 된다.',
            foot: '두 팀은 17:15~17:30 십육포 인근 저녁식당에서 합류한다. 가족 전원이 호텔에 다시 모일 필요는 없다.',
            sumNote: '오후는 두 팀으로 · 저녁식당에서 합류',
            blocks: [
              {
                label: '활동조', short: '활동조', tone: 'red', g: 'team',
                title: 'B. 오후 활동조 — 와이탄 남단·페리·루자쭈이',
                intro: '아래는 짧은 남단 산책과 편도 페리를 유지한 축소형이다. 도보 600~800m는 와이탄 산책 구간만 뜻하며, 하루 전체 보행거리가 아니다.',
                after: '루자쭈이 체류는 약 65분이다. 전망대의 대기·상하행까지 충분하지 않으면 억지로 넣지 않는다. 전망대가 최우선이면 이 선택 구간을 다시 배분해야 한다. Dragonfly 희망자도 이동·접수·마사지를 모두 이 안에 넣을 수 있는지 확인하며, 토요일 마사지와 중복을 필수로 하지 않는다.',
                rows: [
                  R('12:45~13:05', '와이탄 남단 산책 시작 지점으로 이동', '식당 위치에 맞춰 택시 또는 짧은 도보 선택.'),
                  R('13:05~13:30', '와이탄 남단 600~800m 산책', '사진을 찍으며 짧게 걷는다.', { sum: { notime: true, title: '와이탄 남단 → 페리 → 루자쭈이', note: '원형육교 산책 · IFC 몰 카페 · 전망대는 희망자 실비(전날 신청)', map: 'ljz' } }),
                  R('13:30~14:00', '진링동루 페리 승차 준비·대기·강 건너기', '출항시각 확정이 아니라 전체 과정을 위해 배정한 30분.', { ph: ['P14'] }),
                  R('14:00~14:25', '둥창루 선착장 하선·루자쭈이 목적지 이동', '선착장과 IFC·전망대는 같은 장소가 아니다.', { ph: ['P27'] }),
                  R('14:25~15:30', '전망대 한 곳 또는 IFC·카페·선택 마사지', '모두 하는 것이 아니다. 예약·대기가 맞지 않으면 몰·카페로 단순화.', { ph: ['P33'] }),
                  R('15:30~16:30', '강 서쪽 십육포·저녁식당 쪽으로 복귀', '기본은 택시, 현장 여건에 따라 페리. 왕복 페리 의무 없음.'),
                  R('16:30~17:15', '인근 카페·착석 휴식·화장실', '유람선이 늦어진 시간을 새 관광 대신 여유로 사용.'),
                  R('17:15~17:30', '저녁식당 집결·휴식조와 합류', '10명 모두 모였는지 확인.')
                ]
              },
              {
                label: '휴식조', short: '휴식조', tone: 'navy', g: 'team',
                title: 'C. 오후 휴식조 — 호텔에 돌아갔다가 저녁식당으로 바로 합류',
                rows: [
                  R('12:45~13:15', '택시로 호텔 복귀', '활동조와 별개로 이동.', { sum: { notime: true, title: '버스로 호텔 복귀 · 객실 휴식', note: '16:30 버스로 저녁식당에 바로 합류', map: 'hotel' } }),
                  R('13:15~15:45', '객실 휴식·샤워·원하면 짐 일부 정리', '숙면이나 누워 쉬는 시간을 확보.'),
                  R('15:45~16:15', '외출 준비', '저녁 바람에 대비한 옷·소지품 준비.'),
                  R('16:15~16:30', '차량 호출·로비 집결', '목적지는 호텔이 아니라 저녁식당.'),
                  R('16:30~17:15', '십육포 인근 저녁식당으로 이동', '교통·승하차 여유 포함.'),
                  R('17:15~17:30', '활동조와 합류·착석', '가족 전원이 호텔에 다시 모일 필요는 없다.')
                ]
              }
            ]
          },
          { blocks: [{
            label: '전원', short: '저녁 · 전원', g: true,
            title: 'D. 저녁 — 전원 식사 후 19:30 유람선',
            intro: '19:30 회차, 18:45 집결. 여행사가 예약한 부두·집결지를 따른다.',
            rows: [
              R('17:30~18:30', '십육포 인근에서 저녁식사', '45분 전 집결을 맞추기 위해 가까운 식당을 정한다.', { sum: { title: '십육포 인근 저녁 · 17:15 전원 합류', note: '유람선 집결지에서 15분 안 식당 · 10인 예약', map: 'slp' } }),
              R('18:30~18:45', '예약된 유람선 집결 장소로 이동', '식당에서 실제 집결지까지 15분 안에 도달하는 조건.'),
              R('18:45~19:00', '표·인원 확인·화장실', '19:30은 선착장 도착시간이 아니라 출항시간.'),
              R('19:00~19:30', '승선 대기·안내에 따라 탑승', '상품의 실제 승선 절차를 따른다.'),
              R('19:30~20:15', '황푸강 야경 유람선 45분', '60분 상품이면 뒤의 귀환도 약 15분 늦어진다.', { hi: true, ph: ['P16'], sum: { title: '황푸강 야경 유람선 45분', note: '18:45 집결 · 19:30 출항 · 20:15 하선' } }),
              R('20:15~20:35', '하선·차량 호출·가족 집결', '배가 돌아오자마자 택시를 타는 것은 아니다.'),
              R('20:35~21:05', '호텔로 귀환', '대기·교통에 따라 21:15 전후까지 고려.', { sum: { time: '21:05', title: '버스로 호텔 복귀', note: '하선 후 버스 승차 · 21시 전후 호텔', map: 'hotel' } }),
              R('21:05~21:45', '샤워·마지막 짐 정리', '늦은 밤 쇼핑은 기본 일정에서 제외.'),
              R('22:00~22:30 전후', '취침 준비·취침', '다음 날 조식·체크아웃 준비.')
            ]
          }] }
        ],
        notes: [],
        checks: []
      },
      {
        id: 'day5', n: 5, date: '2/22', dow: '월', dowLong: '월요일', en: '2027. 2. 22 · MON',
        title: '공항, 그리고 각자의 집',
        purpose: '버스로 공항, 비행기로 김해, 주차장에서 각자 차로. 19:30 전후 집에 도착합니다.',
        tz: '중국시각 → 한국시각',
        key: [['09:45', '호텔 출발'], ['19:30 전후', '귀가']],
        walk: [['오늘의 걷기', '자유']],
        noGuide: '가이드·버스 동행 · 공항까지',
        sections: [
          { blocks: [{
            label: '', short: '중국 · 중국시각', tz: '중국시각', g: false,
            title: 'A. 중국 — 호텔에서 푸둥공항 출국까지',
            rows: [
              R('07:00~07:30', '기상·세면', '짐은 전날 대부분 정리한 상태.'),
              R('07:30~08:15', '마지막 호텔 조식', '이날은 관광·쇼핑을 추가하지 않는다.'),
              R('08:15~09:00', '최종 짐 정리·객실 물건 확인', '충전기·금고·욕실·옷장·침대 주변 확인.'),
              R('09:00~09:20', '객실에서 내려와 체크아웃·추가요금 확인', '5객실 모두 처리할 여유를 둔다.'),
              R('09:20~09:35', '로비 집결·10명·캐리어 수 확인·화장실', '각 가정이 자기 짐을 먼저 확인한다.'),
              R('09:35~09:45', '차량에 짐 적재·탑승', '09:45 차량이 출발할 수 있도록 한다.'),
              R('09:45~11:00', '예약 차량으로 푸둥공항 이동', '75분 배정. 실제 터미널은 항공권·항공사 안내 확인.', { sum: { title: '체크아웃 후 버스로 푸둥공항 T1', note: '가이드·버스 동행 · 11:00 공항 도착', map: 'pudong' } }),
              R('11:00~11:15', '하차·짐 회수·출국 카운터 이동', '푸둥 T1은 기존 계획값이며 발권 전후 재확인.', { ph: ['P26'] }),
              R('11:15~11:55', '체크인·수하물 위탁', '남은 가족 수속도 끝났는지 확인.', { sum: { notime: true, title: '출국 수속 · 공항 간단 점심', note: '수속이 길어지면 빠른 식사로 바꾸고 탑승 우선' } }),
              R('11:55~12:30', '출국심사·보안검색', '현장 동선과 안내 순서를 따른다.'),
              R('12:30~13:00', '공항에서 간단한 점심', '수속이 길어지면 빠른 식사로 바꾸고 탑승을 우선.'),
              R('13:00~13:15', '화장실·탑승구 도착', '멀리 있는 상점에 다시 가지 않는다.'),
              R('13:15~13:40', '탑승 안내에 따라 비행기 탑승', '예시 시간. 실제 탑승권·안내가 최종 기준.'),
              R('13:40~13:55', '착석·출발 준비', '소지품 정리.'),
              R('13:55 중국 → 16:50 한국', 'FM829 비행', '시차를 반영하면 예정 비행시간은 1시간 55분.', { fl: true, sum: { time: '13:55', title: 'FM829 푸둥 출발 → 16:50 김해 도착', note: '비행 1시간 55분(시차 반영) · 도착부터 한국시각', map: 'gimhae' } })
            ]
          }] },
          { blocks: [{
            label: '', short: '한국 · 한국시각', tz: '한국시각', g: false,
            title: 'B. 한국 — 김해공항에서 각자 집까지',
            intro: '귀국 후 각자 차로 울산까지.',
            rows: [
              R('16:50~17:10', '항공기 도착·하차·입국심사 구역 이동', '16:50은 차를 타는 시각이 아니다.', { ph: ['P25'] }),
              R('17:10~17:30', '입국심사', '가족별로 심사를 받은 뒤 다시 모인다.'),
              R('17:30~17:50', '캐리어 찾기·세관 통과', ''),
              R('17:50~18:05', '운전자 셋은 차 빼 오기, 나머지는 도착층 앞에서 대기', '', { sum: { title: '입국·짐 찾기 → 운전자가 차를 빼 옴', note: '나머지는 짐과 함께 도착층 앞에서 기다림', map: 'gimhae' } }),
              R('18:05~19:10', '김해국제공항 → 울산', '각자 차로. 1시간 5분.', { sum: { title: '각자 차로 울산', note: '18:05 주차장 출발 · 19:10 남외동 본가' } }),
              R('19:10~19:30', '남외동 본가 → 각자 집', '할아버지·할머니·아들 하차 후 각자 귀가.', { sum: { time: '19:30', title: '각자 집 도착', note: '19:30 전후' } })
            ]
          }] }
        ],
        notes: [],
        checks: []
      }
    ],
    photos: {
      P01: P('photos/gallery-museum.jpg', 'gallery-museum.jpg', '인민광장 전경', '인민광장과 주변 도심 전경 · 전시관 건물·내부 사진 아님', 'King of Hearts', WM, 'https://commons.wikimedia.org/wiki/File:People%27s_Square_Shanghai_November_2017_002.jpg', 'CC BY-SA 4.0', ORIG, 960, 600),
      P02: P('photos/01-shanghai-skyline.jpg', '01-shanghai-skyline.jpg', '상하이 스카이라인 야경', '와이탄에서 바라본 루자쭈이 야경 · 여행지 참고 사진 · 가족 촬영 사진 아님', 'George Dagerotip', 'Unsplash', 'https://unsplash.com/photos/shanghais-skyline-glows-brightly-at-night-54aEjbImVdY', 'Unsplash License', ORIG, 2400, 1600),
      P03: P('photos/05-xiaolongbao.jpg', '05-xiaolongbao.jpg', '샤오롱바오', '샤오롱바오 음식 참고 사진 · 예약 식당·주문 메뉴 아님', 'MR+G', WM, 'https://commons.wikimedia.org/wiki/File:Xiao_long_bao_closeup_in_Shanghai.jpg', 'CC BY 2.0', ORIG, 1071, 957),
      P05: P('photos/04-xintiandi-cafe.jpg', '04-xintiandi-cafe.jpg', '신톈디 카페 거리', '신톈디 카페 거리 참고 · 녹음·야외 좌석은 촬영 계절의 모습 · 사진 속 가게는 예약 식당 아님', 'Ye Massa', 'Unsplash', 'https://unsplash.com/photos/0Z8hYPSroQw', 'Unsplash License', ORIG, 2400, 1600),
      P06: P('photos/gallery-xintiandi.jpg', 'gallery-xintiandi.jpg', '신톈디 거리', '신톈디 거리 · 참고 사진 · 사진 속 사람·가게는 우리 가족·예약 식당과 무관', 'Fabio Achilli', WM, 'https://commons.wikimedia.org/wiki/File:Xintiandi,_Shanghai,_China_(9734263917).jpg', 'CC BY 2.0', ORIG, 960, 688),
      P07: P('photos/gallery-lantern.jpg', 'gallery-lantern.jpg', '예원 등불축제', '과거 예원 등불축제 참고 사진 · 2027년 장식·개최를 뜻하지 않음', 'Augusthaiho', WM, 'https://commons.wikimedia.org/wiki/File:%E8%B1%AB%E5%9B%AD%E5%BA%99%E4%BC%9A04037.jpg', 'CC BY-SA 4.0', ORIG, 1920, 1281),
      P08: P('photos/gallery-kpg.jpg', 'gallery-kpg.jpg', '대한민국 임시정부청사 표지', '상하이 대한민국 임시정부청사 입구 표지', 'Ericmetro', WM, 'https://commons.wikimedia.org/wiki/File:Entrance_wall_of_Provisional_Government_of_ROK_in_Shanghai.JPG', 'CC BY-SA 3.0', ORIG, 1920, 1280),
      P09: P('photos/shanghai-history-museum.jpg', 'Shanghai_History_Museum_20181021.jpg', '상하이역사박물관 외관', '상하이역사박물관 외관 · 선택 시설 B · 참고 사진', 'Simon Wade', WM, 'https://commons.wikimedia.org/wiki/File:Shanghai_History_Museum_20181021.jpg', 'CC BY-SA 4.0', WEB, 1350, 1800),
      P13: P('photos/02-yuyuan-huxinting.jpg', '02-yuyuan-huxinting.jpg', '예원 주변·호심정', '예원 주변 호심정 일대 · 참고 사진 · 모든 장면이 유료 정원 내부는 아님', 'Bruna Santos', 'Unsplash', 'https://unsplash.com/photos/4FkqCVknxk8', 'Unsplash License', ORIG, 2400, 1600),
      P14: P('photos/shanghai-ferry-entrance.jpg', 'Shanghai_Ferry_(40643707811).jpg', '상하이 페리 승선장 입구', '상하이 페리 승선장 입구 참고 사진 · 페리 선박이 아님 · 특정 노선의 현재 입구라고 단정하지 않음 · 저녁 유람선과 별개', 'David Stanley', WM, 'https://commons.wikimedia.org/wiki/File:Shanghai_Ferry_(40643707811).jpg', 'CC BY 2.0', ORIG, 1024, 768),
      P16: P('photos/gallery-cruise.jpg', 'gallery-cruise.jpg', '황푸강 야간 유람선', '황푸강 야간 유람선 참고 사진 · 실제 배·좌석 등급과 다를 수 있음', 'Ding Kezhong', WM, 'https://commons.wikimedia.org/wiki/File:DSC00248%E9%BB%84%E6%B5%A6%E6%B1%9F%E4%B8%8A%E8%A7%82%E5%85%89%E6%B8%B8%E8%88%B9.jpg', 'CC BY-SA 4.0', ORIG, 960, 640),
      P17: P('photos/urban-planning-model-archive.jpg', 'Shanghai_2020_-_Urban_Planning_Exhibition_Center_-_01.jpeg', '도시계획전시관 도시 모형 · 과거 자료', '도시계획전시관의 과거 도시 모형 · 2007년 촬영(파일명의 2020은 촬영연도 아님) · 현재 전시는 다를 수 있음', 'Jordiferrer', WM, 'https://commons.wikimedia.org/wiki/File:Shanghai_2020_-_Urban_Planning_Exhibition_Center_-_01.JPG', 'CC BY-SA 3.0', WEB, 1800, 1350),
      P18: P('photos/gallery-nanjing.jpg', 'gallery-nanjing.jpg', '난징동루', '난징동루 참고 사진 · 야간 촬영(방문은 낮)', 'Chainwit.', WM, 'https://commons.wikimedia.org/wiki/File:2024-Apr_Shanghai_East_Nanjing_Road_at_night_01.jpg', 'CC BY 4.0', ORIG, 960, 720),
      P22: P('photos/kpg-entrance.jpg', 'Entrance_of_Provisional_Government_of_ROK_in_Shanghai.jpeg', '대한민국 임시정부청사 입구', '상하이 대한민국 임시정부청사 입구 · 참고 사진 · 현재 입장 절차·대기줄과 무관', 'Ericmetro', WM, 'https://commons.wikimedia.org/wiki/File:Entrance_of_Provisional_Government_of_ROK_in_Shanghai.JPG', 'CC BY-SA 3.0', WEB, 1200, 1800),
      P24: P('photos/urban-planning-hall.jpg', 'Shanghai_Urban_Planning_Exhibition_Hall.jpg', '상하이 도시계획전시관', '상하이 도시계획전시관 · 선택 시설 A · 참고 사진', 'xiquinhosilva', WM, 'https://commons.wikimedia.org/wiki/File:Shanghai_Urban_Planning_Exhibition_Hall.jpg', 'CC BY 4.0', WEB, 1800, 1197),
      P25: P('photos/gimhae-airport.jpg', 'Airport_Gimhae_1.jpg', '김해공항 전경', '김해공항 전경 · 과거 참고 사진 · 태화 승차장이나 현재 국제선 카운터 위치를 보여주지 않음', 'Brücke-Osteuropa', WM, 'https://commons.wikimedia.org/wiki/File:Airport_Gimhae_1.jpg', 'CC0', WEB, 1800, 1012),
      P26: P('photos/pudong-airport-t1.jpg', '201908_Pudong_International_Airport_Terminal_1.jpg', '푸둥공항 T1 외관', '푸둥공항 T1 외관 · 실제 이용 터미널은 항공권에서 재확인', 'MNXANL', WM, 'https://commons.wikimedia.org/wiki/File:201908_Pudong_International_Airport_Terminal_1.jpg', 'CC BY-SA 4.0', WEB, 1800, 1350),
      P27: P('photos/dongchang-pier.jpg', 'Dongchang_Road_Pier_Building.jpg', '둥창루 선착장', '둥창루 페리 선착장 건물 · 과거 참고 사진 · 출발 쪽 진링동루나 저녁 유람선 집결지 아님', 'WQL', WM, 'https://commons.wikimedia.org/wiki/File:Dongchang_Road_Pier_Building.jpg', 'CC BY-SA 3.0', WEB, 1800, 1350),
      P28: P('photos/bfc-fosun-exterior.jpg', 'Fundación_Fosun_en_Shanghái.jpg', 'BFC 일대 푸싱예술센터 외관', 'BFC 일대 건축 참고 사진 · 식당 사진 아님 · 외부 조형물은 촬영 당시 모습', 'Agomga14', WM, 'https://commons.wikimedia.org/wiki/File:Fundaci%C3%B3n_Fosun_en_Shangh%C3%A1i.jpg', 'CC BY-SA 4.0', WEB, 1800, 1350),
      P30: P('photos/gallery-yuyuan.jpg', 'gallery-yuyuan.jpg', '예원 정원 내부', '예원 정원 내부 · 참고 사진 · 첫날 등불축제와 별개의 낮 관람', 'Hans A. Rosbach', WM, 'https://commons.wikimedia.org/wiki/File:Yu_Gardens_20090724-18.JPG', 'CC BY-SA 3.0', ORIG, 960, 664),
      P31: P('photos/gallery-wukang.jpg', 'gallery-wukang.jpg', '우캉대루', '우캉대루와 주변 거리 · 참고 사진 · 안푸루 상점·영업 상태와 무관', 'N509FZ', WM, 'https://commons.wikimedia.org/wiki/File:Wukang_Mansion_(20191114161507).jpg', 'CC BY-SA 4.0', ORIG, 1920, 1280),
      P33: P('photos/gallery-lujiazui.jpg', 'gallery-lujiazui.jpg', '루자쭈이', '동방명주에서 내려다본 루자쭈이 참고 사진 · 전망대 방문·예약 확정 아님', 'Bechology', WM, 'https://commons.wikimedia.org/wiki/File:Lujiazui_financial_district_from_Oriental_Pearl_Tower_(October_1st_2022).jpg', 'CC BY 4.0', ORIG, 960, 540),
      P34: P('photos/gallery-bund.jpg', 'gallery-bund.jpg', '와이탄 건축 야경', '와이탄 건축 참고 사진 · 야간 촬영', 'Brakeet', WM, 'https://commons.wikimedia.org/wiki/File:Buildings_in_The_Bund_07.jpg', 'CC0', ORIG, 960, 720),
      P35: P('photos/fuxing-park-winter.jpg', 'Fuxing_Park_2226.jpeg', '푸싱공원 겨울 산책로', '푸싱공원의 겨울 풍경 · 과거 참고 사진 · 방문일 날씨와 다를 수 있음', 'J. Patrick Fischer', WM, 'https://commons.wikimedia.org/wiki/File:Fuxing_Park_2226.JPG', 'CC BY-SA 3.0', WEB, 1800, 1200),
      P38: P('photos/03-shanghai-disneyland.jpg', '03-shanghai-disneyland.jpg', '상하이 디즈니랜드 성', '상하이 디즈니랜드 성 전경 · 참고 사진 · 방문일 날씨·운영시간을 보장하지 않음', 'Fayhoo', WM, 'https://commons.wikimedia.org/wiki/File:Enchanted_Storybook_Castle_of_Shanghai_Disneyland.jpg', 'CC BY-SA 3.0', ORIG, 2144, 1424)
    },
    photoUse: { P02: ['표지'], P03: ['최신 운영 조건 · 식사'] },
    photoSkipped: [
      { id: 'P10 · P21', why: '난징동루 야경 · 디즈니 성 근경 — 이 페이지에서는 겹쳐 생략, 메인 안내에서 사용' },
      { id: 'P11', why: 'P07과 같은 등불 장면의 고해상도 중복본' },
      { id: 'P19', why: '상하이박물관 — 시내팀 방문 선택지가 아님' },
      { id: 'P32', why: 'Shang Palace 별실 — Man Bao Lou가 아님' },
      { id: 'P04 · P12 · P15 · P20 · P23 · P29 · P36 · P37', why: '원출처·저작자·이용조건 확인 전이라 공개 페이지에서 제외' }
    ],
    noPhoto: '태화강 고수부지 공항버스 정류장 · 호텔 객실 · 발마사지 매장 · Man Bao Lou는 이번 자료에 실제 사진이 없어 다른 사진으로 대신하지 않았습니다.',
    sources: [
      { label: '태화 공항버스 참고시간표', note: '08:00 출발, 국제선 귀환 18:15·18:55 후보 참고. 2027 공식 확정표가 아니다.', url: 'https://bus-airport.tistory.com/121' },
      { label: '태화공항버스 연락처', note: '한국공항공사 김해공항 공항시설 전화번호 안내 · 052-274-6100', url: 'https://www.airport.co.kr/gimhae/cms/frCon/index.do?CONTENTS_NO=1&MENU_ID=310' },
      { label: '호텔 조식 공식 안내', note: '매일 06:30~10:30', url: 'https://www.ihg.com/crowneplaza/hotels/us/en/shanghai/shahd/hoteldetail/dining' },
      { label: '상하이 디즈니 운영달력', note: '2027-02-19 개장·공연 시각 미확보', url: 'https://www.shanghaidisneyresort.com/en/park-calendar/' },
      { label: '도시계획전시관 관람 안내', note: '공식 안내', url: 'https://www.supec.org.cn/employ-index.html?tab=tab1' },
      { label: '예원 관람 안내', note: '현재 공식 09:00~16:30', url: 'https://www.yugarden.com.cn/page/articleview/message.html' },
      { label: 'Man Bao Lou 안내', note: 'Marriott Marquis City Centre 공식 안내', url: 'https://www.marriott.com/en-us/hotels/shamc-shanghai-marriott-marquis-city-centre/dining/' },
      { label: '상하이시 페리 안내', note: '공식 안내', url: 'https://english.shanghai.gov.cn/en-Individuals-Transportation-PublicTransport/20260813/474fc35ff5a54d51aeeb68b2cb981088.html' },
      { label: '유람선 승선 준비', note: '공식 관광 안내', url: 'https://www.meet-in-shanghai.net/en/news/the-ultimate-guide-for-an-unforgettable-cruise-along-the-huangpu-river-991426/' },
      { label: '19:30~20:15 · 18:45 집결 상품 사례', note: '2027-02-21 좌석·운항 확인 아님', url: 'https://www.klook.com/en-US/activity/207489-shanghai-huangpu-river-night-cruise/' }
    ],
    basis: '기존 일정 근거는 가족이 채택한 v3 기록과 이후 대화의 수정 의견이다. 오래된 2/23~27 원본 날짜는 다시 적용하지 않았다. 위 링크는 v4의 출처 기록이며, 이번 정리에서 여행정보를 모두 새로 검증한 것은 아니다.',
    recheck: ['정기버스 운행과 10인 탑승', '실제 항공권', '조식 포함 여부', '등불축제', '디즈니 개장·공연', '관광시설 개관·예약', '식당·마사지 위치', '유람선 회차·집결지']
  };
})();
