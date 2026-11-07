/* 상하이 가족여행 · 식당 안내 데이터 (2026. 11. 1 확정판)
   출처: 식당 안내 지시문 v1.1 + 업로드사진_전체출처.csv. 사진 파일은 dining/ 폴더(ASCII 이름 사본). */
(function () {
  var YOMO = 'https://yomo.co.kr/estimate/ViNaeHg7tn5vq';
  var YT = '요모 견적서에 해당 식당 사진으로 제공됨. 원촬영자 미표기.';
  var MICH = 'https://guide.michelin.com/en/shanghai-municipality/shanghai/restaurant/lao-zheng-xing-huangpu';
  var MICH_T = 'MICHELIN Guide의 Lao Zheng Xing 식당 페이지. 원저작자 표기는 해당 페이지 확인.';
  var GRACE = 'https://graceblog.tw/blog/post/lubolang';
  var GRACE_N = '2025-08-07 게시된 예원 녹파랑 방문기 사진. 현재 메뉴 제공 여부는 별도 확인.';
  var IHG = 'https://www.ihg.com/crowneplaza/hotels/us/en/shanghai/shahd/hoteldetail/photos-tours';
  var L8 = 'https://www.lemon8-app.com/@ssbyae09/7440771281517150721?region=jp';
  var L8_N = '2024년 투숙객 사진, 2027년 메뉴는 다를 수 있음. 원본의 문구·워터마크·콜라주를 그대로 보존.';
  var TRIPM = 'https://www.trip.com/moments/detail/shanghai-2-124254894/';
  var TRIPM_N = '2024-09-07 게시된 라오지탕 BFC점(南区 4F S415) 방문 후기 사진. 현재 메뉴 제공 여부는 별도 확인.';
  var SUNYA_SRC = 'https://www.jfdaily.com/sgh/detail?id=4072185';
  var SUNYA_N = '2026-10-11 上观新闻 신야 기사 사진(촬영 王勇·闵栋·张静芝·马健). 현재 메뉴 제공 여부는 별도 확인.';
  var DDD_SRC = 'https://www.trvlogue.com/zh-Hant/diandude-shanghai-xintiandi-dimsum';
  var DDD_N = '点都德(中海环宇荟店) 방문기 사진(수집 2026-11-07). 촬영일·재게시 허락 미확인, 저작권은 원 권리자. 현재 메뉴 제공 여부는 별도 확인.';
  function p(f, d, s, u, n, lic, licUrl) { return { f: 'dining/' + f, d: d, s: s, u: u, n: n || '', lic: lic || '', licUrl: licUrl || '' }; }

  var R = {
    putien: { ko: '푸티엔', zh: '莆田 PUTIEN', branch: 'BFC점 · BFC(复星外滩金融中心) 中山东二路600号', status: '예약',
      what: '싱가포르에서 시작한 푸젠(福建·興化) 요리 체인. 간이 세지 않고 맵지 않습니다. 해산물 요리 비중이 커서 돼지·닭·채소 메뉴를 섞어 주문합니다.',
      price: '¥125', priceSrc: '',
      notes: ['호텔에서 17:30 버스로 이동', '식사 뒤 걸어서 예원 등불축제로(10분)'],
      map: 'PUTIEN BFC Shanghai',
      photos: [
        p('putien-sign.jpg', '푸티엔 BFC점 간판', 'Ctrip 이용자 사진. 매장 확인: https://www.putien.com/zh-hans/restaurant-locator/', 'https://you.ctrip.com/food/ctripyouyoustar2/22603057-dianping.html', '莆田 PUTIEN BFC外滩金融中心店. Ctrip 해당 지점 사진과 공식 매장 안내의 외관 대조.'),
        p('putien-1.jpg', '음식', YT, YOMO, '여행사 제공, 촬영 지점 미확인 (BFC점 — 요모 표기)'),
        p('putien-2.jpg', '음식', YT, YOMO, '여행사 제공, 촬영 지점 미확인 (BFC점 — 요모 표기)')
      ] },
    laojitang: { ko: '라오지탕', zh: '老吉堂', branch: 'BFC점 · BFC(复星外滩金融中心) 남쪽 동 4층 S415', status: '예약',
      what: '상하이 본방요리(本帮菜). 베이징 매장이 미쉐린 1스타를 받았던 브랜드의 상하이 첫 매장입니다. 돼지고기 조림(红烧肉)처럼 맵지 않고 달고 짭짤한 요리가 많습니다. 점심 뤼보랑과 겹치지 않게 요리 위주로 주문합니다.', price: '¥220', priceSrc: '요모 앱 기준',
      notes: ['활동조·휴식조가 17:15 여기서 합류', '식사 뒤 걸어서 유람선 부두로(5분) · 18:45 집결'],
      map: '老吉堂 外滩金融中心',
      photos: [
        p('laojitang-sign.jpg', '라오지탕 BFC점 간판', 'BFC 쇼핑몰 공식 매장 소개', 'https://www.bfcsh.com/index.php?a=show&c=Store&id=140&language=zh&m=Mobile', 'BFC 쇼핑몰 공식 매장 소개 사진.'),
        p('laojitang-pork.jpg', '돼지고기 조림 鸽蛋红烧肉', 'Trip.com Moments · PhenixSolaire555 2024-09-07', TRIPM, TRIPM_N),
        p('laojitang-eel.jpg', '장어채 볶음 响油鳝糊', 'Trip.com Moments · PhenixSolaire555 2024-09-07', TRIPM, TRIPM_N)
      ] },
    xita: { label: '선택 1', ko: '서탑불고기', zh: '西塔老太太泥炉烤肉', branch: '래플스시티점',
      what: '선양 시타(西塔) 코리아타운에서 시작한 숯불구이 체인. 한국식 고기구이에 가깝습니다.', price: '¥150', priceSrc: '', notes: [],
      photos: [
        p('xita-2.jpg', '고기 모둠', YT, YOMO, '여행사 제공, 촬영 지점 미확인 (래플스시티 — 요모 표기)'),
        p('xita-sign.jpg', '서탑불고기 간판', 'KKday 상하이 西塔老太太 상품 소개', 'https://www.kkday.com/zh-cn/product/569422', '상하이 여러 지점 공통 상품에 실린 사진. 래플스시티점 간판이라고 확인되지 않았습니다.')
      ] },
    feidachu: { label: '선택 2', ko: '페이따추', zh: '费大厨辣椒炒肉', branch: '인민광장 래플스시티점',
      what: '후난(湖南) 요리 체인. 간판 메뉴가 고추 돼지고기볶음(辣椒炒肉)이라 기본이 맵습니다. 안 맵게 주문합니다.', price: '¥100', priceSrc: '', notes: [],
      photos: [
        p('feidachu-sign.jpg', '페이따추 인민광장 래플스시티점 간판', 'Trip.com 매장 사진', 'https://www.trip.com/restaurant/china/shanghai/detail/restaurant-136418432/', '费大厨辣椒炒肉 人广来福士店. Trip.com 해당 지점의 매장 대표 사진.'),
        p('feidachu-1.jpg', '고추 돼지고기볶음', YT, YOMO, '여행사 제공, 촬영 지점 미확인 · 원본 400×286')
      ] },
    lzx: { label: '선택 1', ko: '라오정싱', zh: '老正兴菜馆', branch: '福州路店 · 福州路556号 · 호텔 도보 10분 안팎',
      what: '상하이 본방요리(本帮菜) 노포. 미쉐린 가이드에 소개. 간장 베이스의 달고 짭짤한 상하이 맛. 생선·새우 대표 메뉴가 많아 돼지·닭·계란·채소로 구성을 요청합니다.',
      price: '약 ¥155', priceSrc: '', notes: ['호텔에서 걸어서 10분 · 버스로 가도 됩니다'], map: '老正兴菜馆 福州路556号',
      photos: [
        p('lzx-sign.jpg', '노정흥 푸저우루점 간판', MICH_T, MICH, '福州路556号 — MICHELIN 해당 식당 페이지 · 원본 500×500'),
        p('lzx-2.jpg', '노정흥 음식', MICH_T, MICH, '福州路556号 — MICHELIN 해당 식당 페이지 · 원본 500×500')
      ] },
    sunya: { label: '선택 2', ko: '신야', zh: '新雅粤菜馆', branch: '南京东路719号 · 우리 호텔 건물 1층',
      what: '1926년 문을 연 광둥요리 노포. 딤섬과 광둥식 볶음, 맵지 않습니다. 호텔 1층이라 비가 오거나 피곤한 날 이동 없이 갑니다.', price: '¥150 안팎', priceSrc: '', notes: [], map: '新雅粤菜馆 南京东路719号',
      photos: [
        p('sunya-1.jpg', '신야 난징동루점 외관', 'N509FZ / Wikimedia Commons / Sunya Cantonese Restaurant (20260825073154).jpg', 'https://commons.wikimedia.org/wiki/File:Sunya_Cantonese_Restaurant_(20260825073154).jpg', '南京东路719号 — 촬영일 2026-08-25 · 화면용으로 크기를 줄임', 'CC BY-SA 4.0', 'https://creativecommons.org/licenses/by-sa/4.0/'),
        p('sunya-shrimp.png', '새우살 볶음 新雅滑虾仁', '上观新闻, 2026-10-11', SUNYA_SRC, SUNYA_N),
        p('sunya-beef.png', '굴소스 소고기 蚝油牛肉', '上观新闻, 2026-10-11', SUNYA_SRC, SUNYA_N),
        p('sunya-fish.jpg', '훈제 병어 沙律烟鲳鱼', '上观新闻, 2026-10-11', SUNYA_SRC, SUNYA_N)
      ] },
    ddd: { ko: '점도덕', zh: '点都德', branch: '환위후이점 · 黄陂南路838弄 中海环宇荟 B1층 B125호 · 지하철 9·13호선 마당루(马当路)역 위, 신톈디 남쪽 · 임시정부청사까지 걸어서 15분 안팎', status: '예약',
      what: '1933년 광저우에서 시작한 광둥 딤섬 전문점. 홍미창펀(金莎红米肠)·새우 샤오마이·샤오롱바오·차슈빠오·에그타르트·죽·볶음면이 대표 메뉴이고, 맵지 않아 아이들과 어르신 모두 먹기 편합니다. 영업 09:00~21:30, 자리에서 QR로 주문합니다.',
      price: '¥100 안팎', priceSrc: 'Ctrip 1인 평균 ¥104 · 2026-11-07 확인',
      notes: ['12:15 · 10인 예약', '식당은 지하 1층(B1)', '식사 뒤 걸어서 임시정부청사(15분) · 힘들면 버스'],
      map: '点都德 中海环宇荟店 上海',
      photos: [
        p('ddd-sign.jpg', '점도덕 환위후이점 입구와 간판', 'TRVLOGUE(바 바나나푸딩) 방문기', DDD_SRC, DDD_N),
        p('ddd-changfen.jpg', '홍미창펀 金莎红米肠 — 새우를 감싼 붉은 쌀피 롤', 'TRVLOGUE(바 바나나푸딩) 방문기', DDD_SRC, DDD_N),
        p('ddd-shaomai.jpg', '새우 샤오마이 鲜虾烧卖', 'TRVLOGUE(바 바나나푸딩) 방문기', DDD_SRC, DDD_N),
        p('ddd-xlb.jpg', '샤오롱바오 灌汤酱汁小笼包', 'TRVLOGUE(바 바나나푸딩) 방문기', DDD_SRC, DDD_N)
      ] },
    mbl: { ko: '만보루', zh: '满宝楼 · Man Bao Lou Chinese Restaurant', status: '기념 만찬',
      branch: 'Shanghai Marriott Marquis City Centre (上海雅居乐万豪侯爵酒店) 4층 · 西藏中路555号 · 우리 호텔에서 도보 5분',
      occasion: '아린이의 수능과 대학 입학을 축하하는 저녁. 열 명이 별실 한 방에.',
      what: '중국요리(광둥·상하이). 별실 10개, 가장 큰 별실 20명. 저녁 17:30~21:00.',
      price: '단품 ¥500 안팎', priceSrc: '봉사료 포함 · 별실 최소 ¥5,000',
      notes: ['코스가 아니라 단품으로 10인분. 아린이가 두 접시를 고릅니다. 아이들 몫으로 볶음밥·새우튀김·탕수육·계란탕을 넣습니다', '17:25 호텔 로비에서 가족사진을 찍고 걸어서 갑니다(5분)'],
      map: 'Shanghai Marriott Marquis City Centre',
      photos: [
        p('mbl-room.jpg', '만보루 별실', '新旅行 2019-10-12 보도', 'https://www.xinlvxing.com.cn/news/20191012/560.shtml', '2019년 리뉴얼 보도 사진, 예약된 방과 다를 수 있음.'),
        p('mbl-1.jpg', '백조 모양 딤섬', YT, YOMO, '여행사 제공, 촬영 지점 미확인 (메리어트 마르퀴스 시티센터 4층 — 요모 표기)'),
        p('mbl-marriott.jpg', '메리어트 마르퀴스 호텔 간판', '淘最厨房 / 搜狐 / 2026-01-01 게시', 'https://m.sohu.com/a/971559320_421713/', '만보루가 입점한 호텔의 건물 밖 간판. 만보루 출입구 간판이 아닙니다.')
      ] },
    lbl: { ko: '뤼보랑(녹파랑)', zh: '绿波廊', branch: '豫园路115号 · 예원 구곡교(九曲桥) 옆', status: '예약',
      what: '호심정·구곡교가 보이는 자리. 1979년부터 국빈 연회를 치러 온 상하이 요리 식당(엘리자베스 2세·클린턴 방문). 딤섬 페이스트리(眉毛酥·枣泥酥)와 본방요리.',
      price: '¥150 안팎', priceSrc: '', notes: ['10인 원탁 예약 · 예원 정원을 보고 걸어서 갑니다'], map: '绿波廊 豫园路115号',
      photos: [
        p('lbl-front.jpg', '뤼보랑 간판·외관', 'GRACE幸福漫步 2025-08-07', GRACE, GRACE_N),
        p('lbl-dimsum.jpg', '목련 모양 딤섬 春见玉兰酥', 'GRACE幸福漫步 2025-08-07', GRACE, GRACE_N),
        p('lbl-rice.jpg', '금수 볶음밥 锦绣炒饭', 'GRACE幸福漫步 2025-08-07', GRACE, GRACE_N)
      ] },
    lfd: { ko: '상하이 라오판뎬', zh: '上海老饭店', branch: '福佑路242号', status: '',
      what: '1875년 창업 본방요리 원조.', price: '', priceSrc: '', notes: [],
      photos: [
        p('lfd-sign.jpg', '上海老饭店 푸유루점 · 2023년', '上观新闻, 2023-01-18', 'https://sghexport.shobserver.com/html/baijiahao/2023/01/18/944949.html', '2023년 재개장 기사 사진.'),
        p('lfd-2.jpg', '음식', YT, YOMO, '여행사 제공, 촬영 지점 미확인 (예원 일대 — 요모 표기)')
      ] },
    laolao: { ko: '그랜마', zh: '上海姥姥家常饭馆', branch: '福州路70号', status: '예약',
      what: '상하이 가정식(家常菜). 한국 손님에게 알려진 집.', price: '¥150', priceSrc: '',
      notes: ['‘그랜마스 홈’ 체인과 다른 식당입니다.'], map: '上海姥姥家常饭馆 福州路70号',
      photos: [
        p('laolao-sign.jpg', '上海姥姥家常饭馆 간판', 'City News Service / SHINE, 2025-01-09', 'https://www.citynewsservice.cn/articles/cns/city-news/skewers-hotpot-and-the-era-show-south-koreas-picks-in-shanghai-okw56ykj', '福州路70号. 요모 원문 확인 자료의 상호 기준.'),
        p('laolao-1.jpg', '음식', YT, YOMO, '여행사 제공, 촬영 지점 미확인')
      ] },
    fucun: { ko: '푸춘', zh: '福村', branch: '老码头店 · 外马路453号 一号库 1~2层', status: '예약',
      what: '장쑤·저장 요리. 황푸강이 보이는 老码头 자리. 영파식 게 볶음과 취하(술에 재운 민물새우)가 대표 메뉴라 돼지·닭·계란 요리를 섞어 주문합니다.', price: '¥150', priceSrc: '', notes: [], map: '福村 老码头 外马路453号',
      photos: [
        p('fucun-plaque.jpg', '福村 老码头店', 'Trip.com 해당 식당 방문 후기 사진', 'https://hk.trip.com/restaurant/china/shanghai/detail/restaurant-141017026/', '福村味道라고 적힌 매장 안쪽 현판. 출입구 간판이 아니며 외부 간판 사진은 아직 없음.'),
        p('fucun-1.jpg', '음식', YT, YOMO, '여행사 제공, 촬영 지점 미확인')
      ] }
  };

  window.SH_DINING = {
    grid: [
      { date: '2/18 목', cells: [
        { meal: '아침', items: [{ name: '집에서 각자' }] },
        { meal: '점심', items: [{ name: '김해공항 면세구역 푸드코트 · 각자' }] },
        { meal: '저녁', items: [{ name: '푸티엔 BFC점', status: '예약', href: '#d18' }] }] },
      { date: '2/19 금', cells: [
        { meal: '아침', items: [{ name: '호텔 조식', href: '#breakfast' }] },
        { meal: '점심', items: [{ team: '시내팀', name: '래플스시티 몰 안', status: '자유식', href: '#d19' }, { team: '디즈니팀', name: '파크 안', status: '자유식', href: '#d19-disney' }] },
        { meal: '저녁', items: [{ team: '시내팀', name: '라오정싱 / 신야', status: '자유식', href: '#d19' }, { team: '디즈니팀', name: '파크 안', status: '자유식', href: '#d19-disney' }] }] },
      { date: '2/20 토', cells: [
        { meal: '아침', items: [{ name: '호텔 조식', href: '#breakfast' }] },
        { meal: '점심', items: [{ name: '점도덕 环宇荟점', status: '예약', href: '#d20' }] },
        { meal: '저녁', items: [{ name: '만보루 별실', status: '기념 만찬', href: '#d20-dinner' }] }] },
      { date: '2/21 일', cells: [
        { meal: '아침', items: [{ name: '호텔 조식', href: '#breakfast' }] },
        { meal: '점심', items: [{ name: '뤼보랑 绿波廊', status: '예약', href: '#d21' }] },
        { meal: '저녁', items: [{ name: '라오지탕 老吉堂', status: '예약', href: '#d21-dinner' }] }] },
      { date: '2/22 월', cells: [
        { meal: '아침', items: [{ name: '호텔 조식', href: '#breakfast' }] },
        { meal: '점심', items: [{ name: '상하이 푸둥국제공항 간단식', href: '#d22' }] },
        { meal: '저녁', items: [{ name: '집에서' }] }] }
    ],
    breakfast: {
      photos: [
        p('bf-1.jpg', '금래 전일식당 뷔페 공간', 'IHG / Crowne Plaza Shanghai Nanjing Road 공식 사진', IHG, '공식 사진 속 음식 전체가 조식에 제공된다는 의미는 아님.'),
        p('bf-2.jpg', '금래 전일식당 좌석과 베이커리 공간', 'IHG / Crowne Plaza Shanghai Nanjing Road 공식 사진', IHG, '촬영일 미상.'),
        p('bf-5.jpg', '달걀요리·따뜻한 음식·딤섬', '@ssbyae09 / Lemon8', L8, L8_N),
        p('bf-6.jpg', '죽·면요리·중식 코너', '@ssbyae09 / Lemon8', L8, L8_N)
      ]
    },
    days: [
      { id: 'd18', date: '2월 18일 목요일', meals: [
        { title: '저녁', time: '18:00~19:00', who: '10인', area: 'BFC 안', status: '예약',
          groups: [{ cards: [R.putien] }] }] },
      { id: 'd19', date: '2월 19일 금요일', note: '두 팀 분리 · 금요일은 두 팀이 한 끼도 같이 먹지 않습니다', meals: [
        { title: '시내팀 · 점심', time: '11:30~12:30', who: '조부모 + 디즈니에 안 가는 가족 · 가이드 동행', area: '래플스시티(来福士广场, 西藏中路268号)', status: '자유식',
          lines: ['아래 두 곳 중 하나를 그 자리에서 고릅니다 · 예약 없음', '몰 안 다른 식당도 됩니다'],
          groups: [{ cards: [R.xita, R.feidachu] }] },
        { title: '시내팀 · 저녁', time: '17:30~18:30', who: '시내팀', area: '호텔 도보권', status: '자유식',
          lines: ['아래 두 곳 중 하나를 그날 오후에 골라 가이드가 전화로 예약합니다'],
          groups: [{ cards: [R.lzx, R.sunya] }] },
        { id: 'd19-disney', title: '디즈니팀 · 점심·저녁', time: '점심 12:00 · 저녁 17:15', who: '디즈니팀 · 버스 07:15 출발, 22:00 호텔', area: '상하이 디즈니랜드 파크 안', status: '자유식',
          lines: ['두 끼 모두 파크 안 퀵서비스, 그때 있는 구역에서 현장 선택. 예약 없음'],
          groups: [{ cards: [{ label: '파크 안 · 참고 4곳', ko: '상하이 디즈니랜드', zh: '上海迪士尼乐园', status: '',
            spots: [
            { zone: '판타지랜드', kind: '중식', ko: '탕글드 트리 태번', zh: '老藤树食栈', menu: '돼지고기 롤 덮밥',
              photo: p('disney/01_tangled_exterior.jpg', '탕글드 트리 태번 외관', 'Shanghai Disney Resort 공식 식당 안내', 'https://www.shanghaidisneyresort.com/en/experience/restaurant/tangled-tree-tavern/', '공식 홍보 사진 · 메뉴와 운영은 바뀔 수 있음') },
            { zone: '판타지랜드', kind: '피자', ko: '피노키오 빌리지 키친', zh: '皮诺丘乡村厨房', menu: '곰돌이 푸 피자 · 오리구이 피자',
              photo: p('disney/04_pinocchio_exterior.jpg', '피노키오 빌리지 키친 외관', 'Trip.com 식당 페이지', 'https://hk.trip.com/restaurant/china/shanghai/detail/pinocchio-village-kitchen-28326106/', 'Trip.com 외관 사진 · 메뉴와 운영은 바뀔 수 있음') },
            { zone: '투모로우랜드', kind: '버거', ko: '스타게이저 그릴', zh: '星露台餐厅', menu: '햄버거 세트 · 월-E 카레라이스',
              photo: p('disney/07_stargazer_exterior.jpeg', '스타게이저 그릴 외관', 'Shanghai Disney Resort 공식 식당 안내', 'https://www.shanghaidisneyresort.com/en/experience/restaurant/stargazer-grill/', '공식 홍보 사진 · 메뉴와 운영은 바뀔 수 있음') },
            { zone: '트레저 코브', kind: '바비큐', ko: '바르보사 바운티', zh: '巴波萨烧烤', menu: '바비큐 돼지갈비와 코코넛 밥',
              photo: p('disney/10_barbossa_exterior.jpg', '바르보사 바운티 외관', 'Disney D23', 'https://d23.com/a-to-z/barbossas-bounty/', '과거 공식 외관 사진 · 메뉴와 운영은 바뀔 수 있음') }
          ],
            price: '¥150~250', priceSrc: '한 끼 기준 · 세트 80~120 · 간식 50~60 · 음료 30~40',
            rows: [
              { k: '식비', v: '같이 내는 돈에 들어 있습니다' },
              { k: '주문', v: '앱 모바일 주문 가능' },
              { k: '간식', v: '포장 간식 반입 가능 · 유리병·가열 필요 음식 불가' },
              { k: '안 가는 곳', v: '성 안 캐릭터 다이닝(皇家宴会厅) · 예약제·고가' }
            ],
            notes: [] }] }] }] },
      { id: 'd20', date: '2월 20일 토요일', meals: [
        { title: '점심', time: '12:15~13:15', who: '10인', area: '신톈디', status: '예약', groups: [{ cards: [R.ddd] }] },
        { id: 'd20-dinner', title: '기념 만찬', time: '18:00~20:00', who: '10인 별실', area: '메리어트 마르퀴스 4층', status: '기념 만찬', groups: [{ cards: [R.mbl] }] }] },
      { id: 'd21', date: '2월 21일 일요일', meals: [
        { title: '점심', time: '11:30~12:30', who: '10인', area: '예원', status: '예약',
          groups: [{ cards: [R.lbl] }] },
        { id: 'd21-dinner', title: '저녁', time: '17:30~18:30', who: '10인', area: 'BFC 안', status: '예약',
          groups: [{ cards: [R.laojitang] }] }] },
      { id: 'd22', date: '2월 22일 월요일', meals: [
        { title: '점심', time: '12:30~13:00', who: '10인', area: '상하이 푸둥국제공항',
          lines: ['출국 수속 뒤 탑승구 근처에서 간단식', '저녁은 집에서'] }] }
    ]
  };
})();
