// Jedno źródło prawdy dla FAQ strony głównej: widoczna sekcja (FAQ.tsx)
// i markup FAQPage JSON-LD (app/page.tsx) czytają tę samą tablicę — wcześniej
// istniały dwie kopie, które się rozjechały (audyt 2026-07-06).
export interface HomeFaqItem {
  q: string;
  a: string;
}

export const homeFaqs: HomeFaqItem[] = [
  {
    q: "Na jakim sprzęcie pracujesz?",
    a: "Pracuję na dwóch aparatach Canon R6, każdy zapisuje materiał równolegle na dwóch kartach, więc zdjęcia z sesji są bezpieczne. Obiektywy: Sigma 20, 35 i 50 mm f/1.4 Art, Sigma 70-200 mm f/2.8 Sport, Tamron 24-70 mm f/2.8 i Tokina 16-28 mm f/2.8, czyli pełne pokrycie ogniskowych od 16 do 200 mm. Oświetlenie Godox: mobilny system lamp błyskowych z modyfikatorami oraz studyjne światło ciągłe LED. Dźwięk: Rode Wireless PRO, Rode VideoMicro II i rejestrator Zoom. Do tego dron DJI Mini 5 Pro z certyfikatem operatora A1/A3 i ubezpieczeniem OC. Ten zestaw daje powtarzalność na planie i spójną jakość między kadrami, niezależnie od tego, czy sesja trwa godzinę, czy cały dzień.",
  },
  {
    q: "Ile kosztuje sesja?",
    a: "Sesje portretowe zaczynają się od 1 000 zł netto. Konkretną wycenę przygotuję po krótkim briefie. Wycena zależy od liczby osób, lokalizacji i zakresu postprodukcji. Zawsze wyceniam indywidualnie, żeby nie przepłacać za to, czego nie potrzebujesz.",
  },
  {
    q: "Jak szybko otrzymam gotowe materiały?",
    a: "Standardowy czas oddania zdjęć to 14 dni roboczych, a materiałów wideo do 21 dni. Oferuję również usługę ekspresową (do 48h) za dodatkową opłatą (+50% wartości zlecenia).",
  },
  {
    q: "Co jeśli muszę przełożyć albo odwołać sesję?",
    a: "Zmiana terminu minimum 48h przed sesją jest bezpłatna. Odwołanie później niż 48h przed sesją: 50% wartości zlecenia. Gotowe pliki archiwizuję przez 1 rok, a po pełnej akceptacji dzieła masz do 7 dni na dodatkowe poprawki.",
  },
  {
    q: "Jak wygląda sesja zdjęciowa krok po kroku?",
    a: "Zaczynamy od krótkiego briefu (telefon lub mail), w którym ustalamy cel, styl i logistykę. Przed sesją przygotowuję poseboard z przykładowymi kadrami. W dniu sesji prowadzę Cię przez pozowanie i dobór ujęć. Po sesji wybierasz zdjęcia z galerii online, a ja zajmuję się retuszem. Gotowe materiały dostajesz w ciągu 14 dni.",
  },
  {
    q: "Czy mogę zobaczyć zdjęcia przed retuszem?",
    a: "Tak. Po sesji udostępniam album ze wszystkimi wykonanymi ujęciami (jako galeria online). Z tego albumu wybierasz zdjęcia, które mają trafić do retuszu i postprodukcji. Dzięki temu masz pełną kontrolę nad tym, które ujęcia trafią do finalnej edycji.",
  },
  {
    q: "Czy dojeżdżasz poza Poznań?",
    a: "Tak, realizuję zlecenia na terenie całej Polski oraz Europy. Dojazd w Poznaniu: 0 zł. Poza Poznaniem: 2,50 zł netto za kilometr, liczony od granicy miasta w obie strony według Google Maps. Przy dłuższych wyjazdach (powyżej jednego dnia pracy) doliczany jest również nocleg.",
  },
  {
    q: "Czy przekazujesz surowe pliki RAW?",
    a: "Standardowo nie przekazuję surowych plików RAW. Otrzymujesz starannie wyselekcjonowane i poddane autorskiej postprodukcji materiały, które stanowią gotowy, spójny produkt. Przekazanie plików RAW jest możliwe tylko przy specjalnych ustaleniach licencyjnych.",
  },
  {
    q: "W jakich formatach otrzymam pliki?",
    a: "Zdjęcia w pełnej jakości plus wersje zoptymalizowane pod web. Na życzenie przygotuję też PNG z przezroczystym tłem oraz TIFF do druku.",
  },
  {
    q: "Czy mogę użyć zdjęć na LinkedIn / stronie / w reklamie?",
    a: "Tak. Wszystkie licencje obejmują użytek komercyjny: strona www, social media, materiały drukowane, reklama online. Bez limitów czasowych.",
  },
  {
    q: "Ile osób mogę sfotografować w jeden dzień?",
    a: "Przy portretach biznesowych fotografuję do 40 osób dziennie (przy setupie studyjnym na miejscu). Każda osoba potrzebuje ok. 10-15 minut. Mogę przyjechać do biura z mobilnym studiem.",
  },
  {
    q: "Co jeśli nie jestem fotogeniczny/a?",
    a: "Słyszę to bardzo często i za każdym razem efekt pozytywnie zaskakuje. Prowadzę Cię przez całą sesję: pomagam z pozowaniem, ustawiam światło pod Twoją twarz, dbam o naturalny wyraz. W studiu zawsze ustawiam lustro przed modelem, żebyś mógł na bieżąco widzieć siebie i poprawiać drobne detale. Nie musisz być modelem, wystarczy być sobą. Reszta to moja robota.",
  },
  {
    q: "Czy wystawiam fakturę VAT?",
    a: "Tak, jestem czynnym płatnikiem VAT. Płatność realizowana przez platformę Useme (faktura VAT). Termin płatności: 7 dni.",
  },
  {
    q: "Jak wygląda rozliczenie krok po kroku?",
    a: "Po pierwszym retuszu wysyłam proformę z podglądem materiału. Masz 7 dni na akceptację (foto lub wideo), brak odpowiedzi oznacza akceptację. Po opłacie dostajesz pełne pliki (social media i druk) oraz fakturę VAT przez Useme.",
  },
  {
    q: "Ile tur poprawek otrzymuję w cenie?",
    a: "Zdjęcia: 2 tury poprawek w cenie. Wideo: 3 tury poprawek montażowych w cenie. Każda dodatkowa godzina pracy nad zmianami: 200 zł netto. W praktyce pierwsza tura prawie zawsze wystarcza, bo zależy mi, żeby finalny materiał w 100% odpowiadał Twoim oczekiwaniom.",
  },
  {
    q: "Czy pracujesz z AI w zdjęciach i wideo?",
    a: "Tak. Jeżeli projekt tego wymaga, wspieram się narzędziami AI: generowanie grafik, fotomanipulacje, edycje zdjęć, kreatywna postprodukcja wideo. AI traktuję jako rozszerzenie warsztatu, nie zastępstwo dla autorskiego podejścia. Zawsze informuję klienta, w którym miejscu procesu AI zostało użyte.",
  },
];
