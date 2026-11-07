/* OSM-derived place coordinates: WGS84 [longitude, latitude], ODbL. */
window.ROUTE_PLACES = {
  "hotel": {
    "id": "hotel",
    "name": "크라운플라자 난징로드",
    "zh": "上海南新雅皇冠假日酒店",
    "kind": "hotel",
    "coord": [
      121.4723645,
      31.2367321
    ],
    "crs": "WGS84",
    "precision": "호텔 위치점 · 버스 문 앞 위치 미확인",
    "note": "난징동루 보행 출입구와 九江路 차량 승하차는 구분해야 합니다. 호텔 담당자에게 22인승 승하차 위치 확인. OSM의 옛 중문명 대신 IHG의 현재 명칭 사용.",
    "address": "九江路700号 / 南京东路719号",
    "photoRef": null,
    "source": {
      "provider": "OpenStreetMap / Overpass",
      "url": "https://www.openstreetmap.org/node/654578461",
      "checked": "2026-11-06",
      "method": "OSM node",
      "also": "https://www.ihg.com/crowneplaza/hotels/us/en/shanghai/shahd/hoteldetail/directions"
    }
  },
  "pvg": {
    "id": "pvg",
    "name": "푸둥공항 T1",
    "zh": "浦东国际机场 T1",
    "kind": "airport",
    "coord": [
      121.7976852,
      31.1512727
    ],
    "crs": "WGS84",
    "precision": "T1 건물 권역",
    "note": "공항 전체 중심이 아닌 T1 위치입니다. 출발·도착층 및 실제 버스 탑승 문은 배차 안내 기준.",
    "address": "浦东机场1号航站楼",
    "photoRef": null,
    "source": {
      "provider": "OpenStreetMap / Overpass",
      "url": "https://www.openstreetmap.org/way/41128791",
      "checked": "2026-11-06",
      "method": "OSM geometry bounding-box center",
      "also": null
    }
  },
  "nanjing": {
    "id": "nanjing",
    "name": "난징동루 보행가",
    "zh": "南京路步行街",
    "kind": "walk",
    "coord": [
      121.4751845,
      31.2380932
    ],
    "crs": "WGS84",
    "precision": "거리 권역 대표점",
    "note": "정해진 산책 종점은 없습니다. 호텔을 바꿔도 이 보행가 위치는 고정합니다.",
    "address": "",
    "photoRef": "P18",
    "source": {
      "provider": "OpenStreetMap / Overpass",
      "url": "https://www.openstreetmap.org/way/27041875",
      "checked": "2026-11-06",
      "method": "OSM geometry bounding-box center",
      "also": null
    }
  },
  "bfc": {
    "id": "bfc",
    "name": "BFC 외탄금융센터",
    "zh": "外滩金融中心",
    "kind": "area",
    "coord": [
      121.4934263,
      31.228642
    ],
    "crs": "WGS84",
    "precision": "몰 권역 대표점",
    "note": "푸티엔과 라오지탕은 같은 몰 안의 별개 식당입니다. 실내 이동·엘리베이터 시간 별도.",
    "address": "中山东二路600号",
    "photoRef": "P28",
    "source": {
      "provider": "OpenStreetMap / Overpass",
      "url": "https://www.openstreetmap.org/way/520214797",
      "checked": "2026-11-06",
      "method": "OSM geometry bounding-box center",
      "also": "https://www.bfcsh.com/"
    }
  },
  "putien": {
    "id": "putien",
    "name": "푸티엔 BFC점",
    "zh": "莆田 BFC",
    "kind": "restaurant",
    "coord": [
      121.4934263,
      31.228642
    ],
    "crs": "WGS84",
    "precision": "BFC 내부 식당 · 몰 위치 공유",
    "note": "식당 출입문 좌표가 아닌 BFC 몰의 대표점.",
    "address": "中山东二路600号 BFC",
    "photoRef": null,
    "source": {
      "provider": "OpenStreetMap / Overpass",
      "url": "https://www.openstreetmap.org/way/520214797",
      "checked": "2026-11-06",
      "method": "OSM geometry bounding-box center",
      "also": "https://www.bfcsh.com/"
    }
  },
  "laojitang": {
    "id": "laojitang",
    "name": "라오지탕 BFC점",
    "zh": "老吉堂 BFC",
    "kind": "restaurant",
    "coord": [
      121.4934263,
      31.228642
    ],
    "crs": "WGS84",
    "precision": "BFC 내부 식당 · 몰 위치 공유",
    "note": "BFC 공식 입점 안내: 남구 4층. 일요일 두 팀이 이곳에서 만납니다.",
    "address": "BFC商场南区4F",
    "photoRef": null,
    "source": {
      "provider": "OpenStreetMap / Overpass",
      "url": "https://www.openstreetmap.org/way/520214797",
      "checked": "2026-11-06",
      "method": "OSM geometry bounding-box center",
      "also": "https://www.bfcsh.com/index.php?a=show&c=Store&id=140&language=zh&m=Mobile"
    }
  },
  "lantern": {
    "id": "lantern",
    "name": "예원 등불·상점가",
    "zh": "豫园商城",
    "kind": "area",
    "coord": [
      121.4871043,
      31.2285044
    ],
    "crs": "WGS84",
    "precision": "등불·시장 권역",
    "note": "예원 정원 내부 관람과 다릅니다. 2027년 축제 시간과 입장 구역은 미확정.",
    "address": "",
    "photoRef": "P07",
    "source": {
      "provider": "OpenStreetMap / Overpass",
      "url": "https://www.openstreetmap.org/way/62072391",
      "checked": "2026-11-06",
      "method": "OSM geometry bounding-box center",
      "also": null
    }
  },
  "yuyuan": {
    "id": "yuyuan",
    "name": "예원 정원",
    "zh": "豫园",
    "kind": "sight",
    "coord": [
      121.4877542,
      31.2289243
    ],
    "crs": "WGS84",
    "precision": "정원 권역",
    "note": "입구·버스 하차 지점은 현장 안내 기준. 정원 내부 보행은 합계에서 제외합니다.",
    "address": "",
    "photoRef": "P30",
    "source": {
      "provider": "OpenStreetMap / Overpass",
      "url": "https://www.openstreetmap.org/way/40036584",
      "checked": "2026-11-06",
      "method": "OSM geometry bounding-box center",
      "also": null
    }
  },
  "bridge": {
    "id": "bridge",
    "name": "구곡교·호심정",
    "zh": "九曲桥 · 湖心亭",
    "kind": "sight",
    "coord": [
      121.4873825,
      31.2287331
    ],
    "crs": "WGS84",
    "precision": "다리 대표점",
    "note": "호심정은 다리 옆 정자입니다. 구시가지 관람 동선은 자유입니다.",
    "address": "",
    "photoRef": "P13",
    "source": {
      "provider": "OpenStreetMap / Overpass",
      "url": "https://www.openstreetmap.org/way/62072384",
      "checked": "2026-11-06",
      "method": "OSM geometry bounding-box center",
      "also": null
    }
  },
  "huxinting": {
    "id": "huxinting",
    "name": "호심정",
    "zh": "湖心亭",
    "kind": "sight",
    "coord": [
      121.4874209,
      31.2286584
    ],
    "crs": "WGS84",
    "precision": "건물 대표점",
    "note": "",
    "address": "",
    "photoRef": null,
    "source": {
      "provider": "OpenStreetMap / Overpass",
      "url": "https://www.openstreetmap.org/way/228035340",
      "checked": "2026-11-06",
      "method": "OSM geometry bounding-box center",
      "also": null
    }
  },
  "history": {
    "id": "history",
    "name": "상하이역사박물관",
    "zh": "上海市历史博物馆",
    "kind": "museum",
    "coord": [
      121.4666204,
      31.2326171
    ],
    "crs": "WGS84",
    "precision": "장소 대표점",
    "note": "인민광장의 상하이박물관(上海博物馆)과 다른 시설입니다.",
    "address": "南京西路325号",
    "photoRef": "P09",
    "source": {
      "provider": "OpenStreetMap / Overpass",
      "url": "https://www.openstreetmap.org/node/5530017322",
      "checked": "2026-11-06",
      "method": "OSM node",
      "also": null
    }
  },
  "planning": {
    "id": "planning",
    "name": "도시계획전시관",
    "zh": "上海城市规划展示馆",
    "kind": "museum",
    "coord": [
      121.4708818,
      31.2333709
    ],
    "crs": "WGS84",
    "precision": "장소 대표점",
    "note": "역사박물관과 둘 중 한 곳을 선택합니다.",
    "address": "人民大道100号",
    "photoRef": "P24",
    "source": {
      "provider": "OpenStreetMap / Overpass",
      "url": "https://www.openstreetmap.org/way/39763847",
      "checked": "2026-11-06",
      "method": "OSM geometry bounding-box center",
      "also": null
    }
  },
  "raffles": {
    "id": "raffles",
    "name": "인민광장 래플스시티",
    "zh": "来福士广场",
    "kind": "restaurant",
    "coord": [
      121.472107,
      31.2344601
    ],
    "crs": "WGS84",
    "precision": "몰 권역",
    "note": "서탑불고기·페이따추 중 현장 선택. 같은 이름의 다른 래플스시티가 아닙니다.",
    "address": "西藏中路268号",
    "photoRef": null,
    "source": {
      "provider": "OpenStreetMap / Overpass",
      "url": "https://www.openstreetmap.org/way/51317333",
      "checked": "2026-11-06",
      "method": "OSM geometry bounding-box center",
      "also": null
    }
  },
  "laozhengxing": {
    "id": "laozhengxing",
    "name": "라오정싱 푸저우루점",
    "zh": "老正兴 福州路店",
    "kind": "restaurant",
    "coord": [
      121.4756444,
      31.2351312
    ],
    "crs": "WGS84",
    "precision": "장소 대표점",
    "note": "",
    "address": "福州路556号",
    "photoRef": null,
    "source": {
      "provider": "OpenStreetMap / Overpass",
      "url": "https://www.openstreetmap.org/node/6768433009",
      "checked": "2026-11-06",
      "method": "OSM node",
      "also": null
    }
  },
  "xinya": {
    "id": "xinya",
    "name": "신야 난징동루점",
    "zh": "新雅粤菜馆",
    "kind": "restaurant",
    "coord": [
      121.4723645,
      31.2367321
    ],
    "crs": "WGS84",
    "precision": "기준 호텔 건물 위치 공유",
    "note": "南京东路719号. 비교 호텔을 바꿔도 신야는 이곳에 남습니다.",
    "address": "南京东路719号",
    "photoRef": null,
    "source": {
      "provider": "OpenStreetMap / Overpass",
      "url": "https://www.openstreetmap.org/node/654578461",
      "checked": "2026-11-06",
      "method": "OSM node",
      "also": null
    }
  },
  "bund": {
    "id": "bund",
    "name": "와이탄",
    "zh": "外滩",
    "kind": "walk",
    "coord": [
      121.4855611,
      31.2393233
    ],
    "crs": "WGS84",
    "precision": "와이탄 북쪽 관람 권역",
    "note": "난징동루에서 나오는 금요일 관람 권역. 카페는 미지정으로 같은 권역에서 표시합니다.",
    "address": "",
    "photoRef": "P34",
    "source": {
      "provider": "OpenStreetMap / Overpass",
      "url": "https://www.openstreetmap.org/node/1887544304",
      "checked": "2026-11-06",
      "method": "OSM node",
      "also": null
    }
  },
  "bundSouth": {
    "id": "bundSouth",
    "name": "와이탄 남단",
    "zh": "外滩南段",
    "kind": "walk",
    "coord": [
      121.4889614,
      31.2346608
    ],
    "crs": "WGS84",
    "precision": "진링동루 선착장 주변 권역",
    "note": "일요일 강변 산책의 남쪽 권역입니다. 정확한 산책 시작·끝은 미정으로 거리 합산하지 않습니다.",
    "address": "",
    "photoRef": null,
    "source": {
      "provider": "OpenStreetMap / Overpass",
      "url": "https://www.openstreetmap.org/node/530696825",
      "checked": "2026-11-06",
      "method": "OSM node",
      "also": null
    }
  },
  "disney": {
    "id": "disney",
    "name": "상하이 디즈니랜드",
    "zh": "上海迪士尼乐园",
    "kind": "park",
    "coord": [
      121.6561652,
      31.1462592
    ],
    "crs": "WGS84",
    "precision": "파크 권역",
    "note": "이 표식은 파크 위치이며 버스 목적지가 아닙니다. 보안검색·파크 내부 보행 미산출.",
    "address": "",
    "photoRef": "P38",
    "source": {
      "provider": "OpenStreetMap / Overpass",
      "url": "https://www.openstreetmap.org/way/494725605",
      "checked": "2026-11-06",
      "method": "OSM geometry bounding-box center",
      "also": null
    }
  },
  "disneyDrop": {
    "id": "disneyDrop",
    "name": "디즈니 주차·픽업 권역",
    "zh": "Disney Car & Coach Parking 주변",
    "kind": "parking",
    "coord": [
      121.652435,
      31.1388341
    ],
    "crs": "WGS84",
    "precision": "주차장 대표점 · 실제 배차 지점 미정",
    "note": "OSM의 Mickey 주차장 위치를 주차 권역 참조점으로 사용합니다. 공식 주차 안내와 실제 22인승 하차장을 대조해야 합니다. 파크 입구까지는 개념선으로만 표시.",
    "address": "",
    "photoRef": null,
    "source": {
      "provider": "OpenStreetMap / Overpass",
      "url": "https://www.openstreetmap.org/way/602290313",
      "checked": "2026-11-06",
      "method": "OSM geometry bounding-box center",
      "also": "https://www.shanghaidisneyresort.com/en/experience/guest-service/disney-car-and-coach-park"
    }
  },
  "wukang": {
    "id": "wukang",
    "name": "우캉대루·우캉루",
    "zh": "武康大楼 · 武康路",
    "kind": "walk",
    "coord": [
      121.4337007,
      31.2062729
    ],
    "crs": "WGS84",
    "precision": "건물 대표점",
    "note": "건물 주변 거리 산책. 우캉루 전체를 걷는 일정으로 계산하지 않습니다.",
    "address": "",
    "photoRef": "P31",
    "source": {
      "provider": "OpenStreetMap / Overpass",
      "url": "https://www.openstreetmap.org/way/293434151",
      "checked": "2026-11-06",
      "method": "OSM geometry bounding-box center",
      "also": null
    }
  },
  "anfu": {
    "id": "anfu",
    "name": "안푸루",
    "zh": "安福路",
    "kind": "walk",
    "coord": [
      121.4380519,
      31.2155591
    ],
    "crs": "WGS84",
    "precision": "거리 권역 대표점",
    "note": "카페와 버스 집결점은 미지정. 우캉루→안푸루 산책은 연결선만 표시합니다.",
    "address": "",
    "photoRef": null,
    "source": {
      "provider": "OpenStreetMap / Overpass",
      "url": "https://www.openstreetmap.org/way/492977116",
      "checked": "2026-11-06",
      "method": "OSM geometry bounding-box center",
      "also": null
    }
  },
  "xintiandi": {
    "id": "xintiandi",
    "name": "신톈디 점심·선택활동",
    "zh": "新天地",
    "kind": "area",
    "coord": [
      121.4705002,
      31.221944
    ],
    "crs": "WGS84",
    "precision": "식사·카페 권역",
    "note": "2/20 점심은 점도덕 환위후이점(마당루역 위, 신톈디 남쪽), 발마사지는 신톈디 강도천지로 정해졌습니다(2026-11-07). 두 곳 좌표를 확인하지 못해 신톈디 권역으로 표시합니다.",
    "address": "",
    "photoRef": "P06",
    "source": {
      "provider": "OpenStreetMap / Overpass",
      "url": "https://www.openstreetmap.org/way/40325255",
      "checked": "2026-11-06",
      "method": "OSM geometry bounding-box center",
      "also": null
    }
  },
  "kpg": {
    "id": "kpg",
    "name": "대한민국 임시정부청사",
    "zh": "大韩民国临时政府旧址",
    "kind": "sight",
    "coord": [
      121.4701593,
      31.2192213
    ],
    "crs": "WGS84",
    "precision": "장소 대표점",
    "note": "",
    "address": "马当路306弄4号",
    "photoRef": "P22",
    "source": {
      "provider": "OpenStreetMap / Overpass",
      "url": "https://www.openstreetmap.org/node/5530017323",
      "checked": "2026-11-06",
      "method": "OSM node",
      "also": null
    }
  },
  "fuxing": {
    "id": "fuxing",
    "name": "푸싱공원",
    "zh": "复兴公园",
    "kind": "park",
    "coord": [
      121.4644414,
      31.2190673
    ],
    "crs": "WGS84",
    "precision": "공원 권역",
    "note": "선택 산책. 공원 내부 이동 제외.",
    "address": "",
    "photoRef": "P35",
    "source": {
      "provider": "OpenStreetMap / Overpass",
      "url": "https://www.openstreetmap.org/way/39961770",
      "checked": "2026-11-06",
      "method": "OSM geometry bounding-box center",
      "also": null
    }
  },
  "manbao": {
    "id": "manbao",
    "name": "만보루 · 메리어트",
    "zh": "满宝楼 · 上海雅居乐万豪侯爵酒店",
    "kind": "restaurant",
    "coord": [
      121.4686291,
      31.2384641
    ],
    "crs": "WGS84",
    "precision": "호텔 내부 식당 · 건물 대표점",
    "note": "호텔 비교에서도 식당은 이동하지 않습니다. 식당 층까지 이동·착석은 별도.",
    "address": "西藏中路555号",
    "photoRef": null,
    "source": {
      "provider": "OpenStreetMap / Overpass",
      "url": "https://www.openstreetmap.org/node/4347591889",
      "checked": "2026-11-06",
      "method": "OSM node",
      "also": "https://www.marriott.com.cn/hotels/shamc-shanghai-marriott-marquis-city-centre/dining/"
    }
  },
  "lubolang": {
    "id": "lubolang",
    "name": "뤼보랑",
    "zh": "绿波廊",
    "kind": "restaurant",
    "coord": [
      121.4875436,
      31.2284191
    ],
    "crs": "WGS84",
    "precision": "장소 대표점",
    "note": "",
    "address": "豫园路115号",
    "photoRef": null,
    "source": {
      "provider": "OpenStreetMap / Overpass",
      "url": "https://www.openstreetmap.org/node/5346226598",
      "checked": "2026-11-06",
      "method": "OSM node",
      "also": null
    }
  },
  "jinling": {
    "id": "jinling",
    "name": "진링동루 선착장",
    "zh": "金陵东路渡口",
    "kind": "ferry",
    "coord": [
      121.4889614,
      31.2346608
    ],
    "crs": "WGS84",
    "precision": "선착장 위치",
    "note": "둥창루와 연결되는 东金线. 현장 운항·통제는 여행 전 확인.",
    "address": "",
    "photoRef": null,
    "source": {
      "provider": "OpenStreetMap / Overpass",
      "url": "https://www.openstreetmap.org/node/530696825",
      "checked": "2026-11-06",
      "method": "OSM node",
      "also": "https://www1.meet-in-shanghai.net/cn/traffic/dock-112479/"
    }
  },
  "dongchang": {
    "id": "dongchang",
    "name": "둥창루 선착장",
    "zh": "东昌路渡口",
    "kind": "ferry",
    "coord": [
      121.4986053,
      31.2319107
    ],
    "crs": "WGS84",
    "precision": "선착장 위치",
    "note": "십육포 유람선 부두로 직접 가는 페리로 표시하지 않습니다.",
    "address": "",
    "photoRef": "P27",
    "source": {
      "provider": "OpenStreetMap / Overpass",
      "url": "https://www.openstreetmap.org/node/530695728",
      "checked": "2026-11-06",
      "method": "OSM node",
      "also": null
    }
  },
  "ring": {
    "id": "ring",
    "name": "루자쭈이 원형육교",
    "zh": "陆家嘴环形天桥",
    "kind": "walk",
    "coord": [
      121.4960369,
      31.23962
    ],
    "crs": "WGS84",
    "precision": "장소 대표점",
    "note": "",
    "address": "",
    "photoRef": "P33",
    "source": {
      "provider": "OpenStreetMap / Overpass",
      "url": "https://www.openstreetmap.org/node/4463371991",
      "checked": "2026-11-06",
      "method": "OSM node",
      "also": null
    }
  },
  "ifc": {
    "id": "ifc",
    "name": "IFC 몰·카페",
    "zh": "上海国金中心商场",
    "kind": "area",
    "coord": [
      121.4979204,
      31.2382389
    ],
    "crs": "WGS84",
    "precision": "몰 권역",
    "note": "카페 점포는 미정. 상하이타워와 대체 선택입니다.",
    "address": "",
    "photoRef": null,
    "source": {
      "provider": "OpenStreetMap / Overpass",
      "url": "https://www.openstreetmap.org/way/526005642",
      "checked": "2026-11-06",
      "method": "OSM geometry bounding-box center",
      "also": null
    }
  },
  "tower": {
    "id": "tower",
    "name": "상하이타워 전망대",
    "zh": "上海中心大厦",
    "kind": "sight",
    "coord": [
      121.5012667,
      31.2356191
    ],
    "crs": "WGS84",
    "precision": "건물 대표점",
    "note": "동방명주와 다른 시설. 예약·대기·전망대 체류를 추가로 확인해야 합니다.",
    "address": "",
    "photoRef": null,
    "source": {
      "provider": "OpenStreetMap / Overpass",
      "url": "https://www.openstreetmap.org/way/165792123",
      "checked": "2026-11-06",
      "method": "OSM geometry bounding-box center",
      "also": null
    }
  },
  "cruise": {
    "id": "cruise",
    "name": "십육포 유람선 권역",
    "zh": "十六铺",
    "kind": "cruise",
    "coord": [
      121.4954101,
      31.2283676
    ],
    "crs": "WGS84",
    "precision": "승선 권역 · 부두 미정",
    "note": "예약 안내에 따라 정확한 부두·게이트를 확인해야 합니다. 임의 유람 항적은 그리지 않습니다.",
    "address": "",
    "photoRef": "P16",
    "source": {
      "provider": "OpenStreetMap / Overpass",
      "url": "https://www.openstreetmap.org/way/53746506",
      "checked": "2026-11-06",
      "method": "OSM geometry bounding-box center",
      "also": null
    }
  }
};
