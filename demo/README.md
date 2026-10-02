# KMS AMIS demonstracija

## Paleidimas

Iš `demo/` katalogo paleiskite `run.bat`, arba naudokite bet kurį statinį HTTP serverį, pavyzdžiui:

```text
python -m http.server 8000
```

Atverkite `http://localhost:8000/`. Build žingsnio nėra; puslapiai naudoja vanilla JavaScript ES modulius. Grafikams naudojamas Chart.js CDN, žemėlapiui – Leaflet CDN.

## Architektūra ir duomenys

- `js/data/catalog.js` aprašo katalogo dalis: `automatic-air`, `laboratory-air`, `noise`, `soil`, `surface-water`, `wildlife`, `greenery`, `meteorology`.
- `js/data/sites.js` saugo automatines stoteles, IoT įrenginius ir mikrorajonus. `js/data/periodic_sites.js` saugo atskirus dirvožemio, vandens, gyvosios gamtos ir želdynų taškus.
- `js/data/generator.js` naudoja fiksuotą demonstracijos laiką ir deterministinius `hashSeed`, `mulberry32` bei `unit` sėklus; reikšmė priklauso nuo parametro, taško ir datos, todėl perkrovus puslapį ji nesikeičia.
- Pasakojimo įvykiai: KA-07 trijų dienų tarpas 2025-02-10..13, NH₃ anomalija KA-05 2026-02-16, pataisytas KA-03 PM10 įrašas 2025-05-11 ir `BF-2025-11-25-A` backfill paketas.

## localStorage sutartys

- Taškų ir puslapių filtrai yra dabartinio puslapio būsena; demo jų atskirai nepersistuoja.
- Prenumeratos vedlys naudoja bendrą `js/data/subscriptions.js` modulį ir raktą `kms-amis-demo-subscriptions-v1`. Administravimas prenumeratas turi skaityti iš to paties modulio / rakto.
- Administratoriaus bannerio vėliavėlė yra tik skaitoma būsena, kurią pateikia administravimo dalis; šis demo jos nesukuria ir nekeičia.

## Specifikacijos atsekamumas

| Specifikacijos punktas | Demo funkcija |
| --- | --- |
| 3.3.1, 3.3.3, 3.3.4, 3.3.6–3.3.8 | `generator.js`: tarpas, anomalija, pataisymas ir backfill istorija |
| 3.4.1.x | `catalog.js`: automatinio oro kokybės parametrai |
| 3.4.2.x–3.4.5 | `catalog.js` ir `periodic_sites.js`: laboratoriniai bei periodiniai duomenys |
| 3.5.1–3.5.2 | `generator.js` ir `query.js`: laiko eilutės, agregavimas ir talpyklos |
| 3.6.1–3.6.3 | Puslapių filtrai, suvestinės, Chart.js diagramos ir triukšmo logaritminis vidurkis |
| 3.6.6–3.6.11 | `map.js`, `sites.js`, mikrorajonai, taškų pop-up ir LKS-94 demonstracija |
| 3.7.1–3.7.4, 3.8.6–3.8.8 | Normų kontekstas, prenumeratos vedlys ir localStorage demo |
| 3.10.1.1–3.10.4 | Bendra navigacija, viešojo portalo puslapiai, adaptyvus išdėstymas ir prieinamumo pagrindas |

### Viešųjų puslapių atsekamumas

| Puslapis | Specifikacijos punktai |
| --- | --- |
| `zemelapis.html` | 3.6.6–3.6.11 |
| `oro.html` | 3.6.1–3.6.3 |
| `ataskaitos.html` | 3.6.4 |
| `dirvezemis.html` | 3.6.1–3.6.3 |
| `gyvoji_gamta.html` | 3.10.1.1.2.5 |
| `bendra-info.html` | 3.10.1.1.1.1 |
| `truksmas.html` | 3.6.1–3.6.3 |
| `zeldynai.html` | 3.10.1.1.2.6 |
| `prenumerata.html` | 3.7.2, 3.7.4, 3.8.6 |
| `vanduo.html` | 3.6.1–3.6.3 |
| `vadovas.html` | 3.10.1.1.1.2 |
| `privatumo-politika.html`, `slapuku-politika.html` | 3.8.7 |

Tai yra statinis demonstracinis pagrindas: normos, GIS geometrija, priėmimo laikas, tikras pranešimų siuntimas ir administravimo API turi būti suderinti diegimo metu.
