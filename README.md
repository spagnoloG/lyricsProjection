# lyricsProjection[SLO]
Moderna spletna aplikacija namenjena za rabo v cerkvah.
Enostavno vnašanje pesmi v aplikacijo, pregled, urejanje in projeciranje le-teh na oddaljeni zaslon.


![homepage_image](https://iili.io/208drP.md.png)


Projekt je nastal v sodelovanju z župnijo Šempeter pri Gorici.

Možnosti
<ol>
  <li>Vnašanje pesmi</li>
  <li>Urejanje pesmi</li>
  <li>Ketegorizacija pesmi</li>
  <li>Sestavljanje seznamov predvajanj</li>
  <li>Projeciranje pesmi</li>
  <li>Projeciranje seznamov predvajanj</li>
  <li>Aktivni indikator trenutne pesmi v spletnem vmesniku</li>
</ol>

Uporabljeni programski jeziki: js, vue, (vuetify - component library)

Potrebno dodatno delo: 
<ol>
  <li> celotna docker implementacija za RPi/PC</li>
  <li> support za psalme</li>
</ol>

Inštalacijska skripta trenutno deluje samo na linux debian(ubuntu, raspbian) operacijskem sistemu(aplikacijo se v nasprotnem primeru lahko zažene z npm run serve/yarn seve na kateremkoli sistemu), dokler se ne poštima docker implementacije(Katera bo lahko zaznala arm64 ali amd64 cpu).
Za backend je potrebna namestitev baze mongoDB(na default portu :27017), brez avtentikacije. 

Popravki so dobrodošli.