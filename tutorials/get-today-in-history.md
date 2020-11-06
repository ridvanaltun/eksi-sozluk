```javascript
const { EksiSozluk } = require('eksi-sozluk');

const session = new EksiSozluk();

session
    .todayInHistory('2018', {
      page: 1,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
```

### Result

```javascript
[
  {
    title: '3 haziran 2018 fenerbahçe seçimli genel kurulu',
    title_url: 'https://eksisozluk.com3-haziran-2018-fenerbahce-secimli-genel-kurulu--5556880?day=2018-06-02',
    entry_count: 1000
  },
  {
    title: "ali koç'un ramazanda su içmesi",
    title_url: 'https://eksisozluk.com/ali-kocun-ramazanda-su-icmesi--5673947day=2018-06-02',
    entry_count: 281
  },
  {
    title: "teoman'ın tarkan kadar saygı görmemesinin sebebi",
    title_url: 'https://eksisozluk.comteomanin-tarkan-kadar-saygi-gormemesinin-sebebi--5673590?day=2018-06-02',
    entry_count: 232
  },
  {
    title: 'ali koç',
    title_url: 'https://eksisozluk.com/ali-koc--157305?day=2018-06-02',
    entry_count: 219
  },
  {
    title: 'sigara içmeyi çekici kılan sinema karakterleri',
    title_url: 'https://eksisozluk.comsigara-icmeyi-cekici-kilan-sinema-karakterleri--3903677?day=2018-06-02',
    entry_count: 201
  },
  {
    title: 'uber işi bitti artık öyle bir şey yok',
    title_url: 'https://eksisozluk.com/uber-isi-bitti-artik-oyle-bir-sey-yok--5673114day=2018-06-02',
    entry_count: 198
  },
  {
    title: 'ben ne ara 22 oldum hissi',
    title_url: 'https://eksisozluk.com/ben-ne-ara-22-oldum-hissi--5673411?day=2018-06-02',
    entry_count: 192
  },
  {
    title: 'bir öğretmeni cumhurbaşkanı yapmanın yanlış olması',
    title_url: 'https://eksisozluk.combir-ogretmeni-cumhurbaskani-yapmanin-yanlis-olmasi--5674095?day=2018-06-02',
    entry_count: 177
  },
  {
    title: '40 yaş üstü sözlük yazarları',
    title_url: 'https://eksisozluk.com/40-yas-ustu-sozluk-yazarlari--370303?day=2018-06-02',
    entry_count: 156
  },
  {
    title: 'o generalin apoletlerini sökeceğim',
    title_url: 'https://eksisozluk.com/o-generalin-apoletlerini-sokecegim--5673674day=2018-06-02',
    entry_count: 156
  },
  {
    title: 'bilinçaltınız neye takıntılı testi',
    title_url: 'https://eksisozluk.com/bilincaltiniz-neye-takintili-testi--4557974day=2018-06-02',
    entry_count: 150
  },
  {
    title: 'eski sevgilinin başkasıyla sevişiyor olması',
    title_url: 'https://eksisozluk.com/eski-sevgilinin-baskasiyla-sevisiyor-olmasi--2539551day=2018-06-02',
    entry_count: 146
  },
  {
    title: 'seçimin 1. turda açık ve net biteceği görünüyor',
    title_url: 'https://eksisozluk.comsecimin-1-turda-acik-ve-net-bitecegi-gorunuyor--5673295?day=2018-06-02',
    entry_count: 144
  },
  {
    title: "muharrem ince'nin saçma avm tespiti",
    title_url: 'https://eksisozluk.com/muharrem-incenin-sacma-avm-tespiti--5673711day=2018-06-02',
    entry_count: 141
  },
  {
    title: 'askerlikte azar işitilen en yüksek rütbeli komutan',
    title_url: 'https://eksisozluk.comaskerlikte-azar-isitilen-en-yuksek-rutbeli-komutan--5397776?day=2018-06-02',
    entry_count: 140
  },
  {
    title: 'bir kadına söylenebilecek en ağır söz',
    title_url: 'https://eksisozluk.com/bir-kadina-soylenebilecek-en-agir-soz--1390118day=2018-06-02',
    entry_count: 124
  },
  {
    title: "2. ordu komutanının rte'yi alkışlaması",
    title_url: 'https://eksisozluk.com/2-ordu-komutaninin-rteyi-alkislamasi--5673559day=2018-06-02',
    entry_count: 124
  },
  {
    title: "m. akşener'in yolunun çöp kamyonuyla kesilmesi",
    title_url: 'https://eksisozluk.com/m-aksenerin-yolunun-cop-kamyonuyla-kesilmesi--5674050day=2018-06-02',
    entry_count: 122
  },
  {
    title: "muharrem ince'nin de yabancı dil bilmemesi",
    title_url: 'https://eksisozluk.com/muharrem-incenin-de-yabanci-dil-bilmemesi--5673423day=2018-06-02',
    entry_count: 119
  },
  {
    title: 'bedelli askerlik yapıp erkeğim diye dolaşmak',
    title_url: 'https://eksisozluk.com/bedelli-askerlik-yapip-erkegim-diye-dolasmak--4618044day=2018-06-02',
    entry_count: 113
  },
  {
    title: '16 yıllık ak parti iktidarının en itici 3 figürü',
    title_url: 'https://eksisozluk.com16-yillik-ak-parti-iktidarinin-en-itici-3-figuru--5672363?day=2018-06-02',
    entry_count: 112
  },
  {
    title: "hem chp'li hem de namazlı abdestli olmak",
    title_url: 'https://eksisozluk.com/hem-chpli-hem-de-namazli-abdestli-olmak--5673493day=2018-06-02',
    entry_count: 110
  },
  {
    title: 'bedelli askerlik',
    title_url: 'https://eksisozluk.com/bedelli-askerlik--39846?day=2018-06-02',
    entry_count: 106
  },
  {
    title: 'mini etekli bir kızın arkasından merdiven çıkmak',
    title_url: 'https://eksisozluk.commini-etekli-bir-kizin-arkasindan-merdiven-cikmak--3682644?day=2018-06-02',
    entry_count: 104
  },
  {
    title: 'vergi kaçakçısı meslekler',
    title_url: 'https://eksisozluk.com/vergi-kacakcisi-meslekler--5673700?day=2018-06-02',
    entry_count: 100
  },
  {
    title: 'ahlat ağacı (film)',
    title_url: 'https://eksisozluk.com/ahlat-agaci-film--5658176?day=2018-06-02',
    entry_count: 95
  },
  {
    title: 'cenk tosun',
    title_url: 'https://eksisozluk.com/cenk-tosun--1759344?day=2018-06-02',
    entry_count: 93
  },
  {
    title: 'geceye güzel bir hayal bırak',
    title_url: 'https://eksisozluk.com/geceye-guzel-bir-hayal-birak--5672109?day=2018-06-02',
    entry_count: 90
  },
  {
    title: 'muharrem ince ve danışmanlarına duyurular',
    title_url: 'https://eksisozluk.com/muharrem-ince-ve-danismanlarina-duyurular--5654201day=2018-06-02',
    entry_count: 85
  },
  {
    title: "24 haziran'da hdp'ye oy veriyoruz kampanyası",
    title_url: 'https://eksisozluk.com/24-haziranda-hdpye-oy-veriyoruz-kampanyasi--5672735day=2018-06-02',
    entry_count: 84
  },
  {
    title: 'egm kimliği belirsiz cesetler sayfası',
    title_url: 'https://eksisozluk.com/egm-kimligi-belirsiz-cesetler-sayfasi--1172158day=2018-06-02',
    entry_count: 83
  },
  {
    title: '1 haziran 2018 star tv seçim özel',
    title_url: 'https://eksisozluk.com/1-haziran-2018-star-tv-secim-ozel--5673071day=2018-06-02',
    entry_count: 82
  },
  {
    title: "canikli'nin muharrem ince'ye apolet yanıtı",
    title_url: 'https://eksisozluk.com/caniklinin-muharrem-inceye-apolet-yaniti--5673876day=2018-06-02',
    entry_count: 81
  },
  {
    title: "türkiye'nin asla düzelemeyecek olmasının sebebi",
    title_url: 'https://eksisozluk.comturkiyenin-asla-duzelemeyecek-olmasinin-sebebi--4284654?day=2018-06-02',
    entry_count: 80
  },
  {
    title: 'kilo verirken iradeyi en çok zorlayan yiyecek',
    title_url: 'https://eksisozluk.comkilo-verirken-iradeyi-en-cok-zorlayan-yiyecek--5672238?day=2018-06-02',
    entry_count: 76
  },
  {
    title: 'lgs 2018',
    title_url: 'https://eksisozluk.com/lgs-2018--5673366?day=2018-06-02',
    entry_count: 72
  },
  {
    title: 'aziz yıldırım',
    title_url: 'https://eksisozluk.com/aziz-yildirim--87207?day=2018-06-02',
    entry_count: 70
  },
  {
    title: 'muharrem ince',
    title_url: 'https://eksisozluk.com/muharrem-ince--413935?day=2018-06-02',
    entry_count: 70
  },
  {
    title: 'bir erkeğin seksten daha çok hoşuna giden şey',
    title_url: 'https://eksisozluk.combir-erkegin-seksten-daha-cok-hosuna-giden-sey--3018123?day=2018-06-02',
    entry_count: 69
  },
  {
    title: 'güzel götlü kız vs güzel gözlü kız',
    title_url: 'https://eksisozluk.com/guzel-gotlu-kiz-vs-guzel-gozlu-kiz--4816372day=2018-06-02',
    entry_count: 69
  },
  {
    title: 'en efsane barış manço şarkısı',
    title_url: 'https://eksisozluk.com/en-efsane-baris-manco-sarkisi--5673130day=2018-06-02',
    entry_count: 67
  },
  {
    title: 'erkek kankayla güreşirken için birden hoş olması',
    title_url: 'https://eksisozluk.comerkek-kankayla-guresirken-icin-birden-hos-olmasi--5673715?day=2018-06-02',
    entry_count: 67
  },
  {
    title: 'ekşi itiraf',
    title_url: 'https://eksisozluk.com/eksi-itiraf--1037199?day=2018-06-02',
    entry_count: 66
  },
  {
    title: "uçan tanka recep tayyip erdoğan'ın tepkisi",
    title_url: 'https://eksisozluk.com/ucan-tanka-recep-tayyip-erdoganin-tepkisi--5673817day=2018-06-02',
    entry_count: 65
  },
  {
    title: "bakan fakıbaba'nın çok da şeyimde değil demesi",
    title_url: 'https://eksisozluk.combakan-fakibabanin-cok-da-seyimde-degil-demesi--5673850?day=2018-06-02',
    entry_count: 65
  },
  {
    title: 'evde dolarları yakan dayı',
    title_url: 'https://eksisozluk.com/evde-dolarlari-yakan-dayi--5674031?day=2018-06-02',
    entry_count: 61
  },
  {
    title: 'eşcinsellik normaldir anormal olan homofobidir',
    title_url: 'https://eksisozluk.comescinsellik-normaldir-anormal-olan-homofobidir--5674182?day=2018-06-02',
    entry_count: 51
  },
  {
    title: 'haziran 2018 arabalara gelen büyük zam',
    title_url: 'https://eksisozluk.com/haziran-2018-arabalara-gelen-buyuk-zam--5674193day=2018-06-02',
    entry_count: 51
  },
  {
    title: '24 haziran için muhafazakar kesime bir mesaj bırak',
    title_url: 'https://eksisozluk.com24-haziran-icin-muhafazakar-kesime-bir-mesaj-birak--5673381',
    entry_count: 49
  },
  {
    title: "2 haziran 2018 erdoğan'ın akm yıkıntısını ziyareti",
    title_url: 'https://eksisozluk.com2-haziran-2018-erdoganin-akm-yikintisini-ziyareti--5673495?day=2018-06-02',
    entry_count: 49
  }
]
```
