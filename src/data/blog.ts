export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: "poradnik" | "realizacja" | "branża";
  date: string;
  readTime: number;
  thumbnail: string;
  seo: {
    title: string;
    description: string;
  };
}

export const blogPosts: BlogPost[] = [
  {
    slug: "jak-przygotowac-sie-do-sesji-biznesowej",
    title: "Jak przygotować się do sesji biznesowej: 7 praktycznych wskazówek",
    excerpt:
      "Odpowiednie przygotowanie to połowa sukcesu. Oto sprawdzona checklista, dzięki której Twoje portrety biznesowe będą wyglądać profesjonalnie i naturalnie.",
    category: "poradnik",
    date: "2025-01-15",
    readTime: 6,
    thumbnail: "/images/blog/jak-przygotowac-sie-do-sesji-biznesowej-2.jpg",
    content: `
      <p class="lead">Sesja biznesowa to inwestycja w Twój wizerunek. Niezależnie od tego, czy potrzebujesz headshota na LinkedIn, zdjęcia do materiałów prasowych, czy kompleksowej <a href="/uslugi/wizerunek-portrety">sesji personal branding</a>, odpowiednie przygotowanie sprawi, że efekt końcowy będzie dokładnie taki, jak sobie wymarzyłeś.</p>

      <h2>1. Określ cel zdjęć</h2>
      <p>Zanim zaczniesz wybierać garnitur, zastanów się, <strong>do czego będziesz używać tych zdjęć</strong>. LinkedIn? Strona firmowa? Materiały prasowe? Każdy kanał ma swoje wymagania: na LinkedIn sprawdzi się bliższy kadr z uśmiechem, na stronę firmową bardziej formalne ujęcie.</p>

      <h2>2. Wybierz odpowiednią stylizację</h2>
      <p>Zasada jest prosta: ubierz się o jeden level wyżej niż na co dzień w pracy. Jeśli pracujesz w casualu, załóż koszulę. Jeśli nosisz koszulę, dobierz marynarkę. Unikaj intensywnych wzorów, neonowych kolorów i ubrań z dużymi logotypami.</p>
      <ul>
        <li><strong>Kolory bezpieczne:</strong> granat, szarość, biel, czerń, butelkowa zieleń</li>
        <li><strong>Do uniknięcia:</strong> paski, kratka, fluorescencyjne kolory</li>
        <li><strong>Pro tip:</strong> przygotuj 2-3 stylizacje, żeby mieć z czego wybierać</li>
      </ul>

      <h2>3. Zadbaj o detale</h2>
      <p>Detale widać na zdjęciach. Wyprasowana koszula, zadbane paznokcie, schludna fryzura. Jeśli nosisz okulary, wyczyść je tuż przed sesją (refleksy na brudnych szkłach to koszmar w retuszu).</p>

      <h2>4. Dobry sen i nawodnienie</h2>
      <p>Brzmi banalnie? Może. Ale cienie pod oczami i sucha skóra to pierwsze rzeczy, które widać na profesjonalnych zdjęciach. Wyśpij się, pij wodę, unikaj alkoholu dzień przed sesją.</p>

      <h2>5. Przygotuj inspiracje</h2>
      <p>Podeślij fotografowi 3-5 zdjęć, które Ci się podobają. Nie muszą być Twoje, mogą to być portrety biznesowe z internetu. Dzięki temu fotograf od razu zrozumie, jaki styl Ci odpowiada.</p>

      <h2>6. Zaplanuj czas</h2>
      <p>Nie umawiaj się na sesję między dwoma spotkaniami. Stres i pośpiech widać na zdjęciach. Najlepiej wybierz luźniejszy dzień, bez deadline'ów na karku.</p>

      <h2>7. Zaufaj fotografowi</h2>
      <p>Dobry fotograf biznesowy będzie Cię prowadził: pokaże, jak stanąć, gdzie patrzeć, kiedy się uśmiechnąć. Nie musisz być modelem. Twoim jedynym zadaniem jest być sobą.</p>

      <h2>Podsumowanie</h2>
      <p>Przygotowanie do sesji biznesowej nie wymaga godzin planowania. Wystarczy checklista powyżej i 30 minut na dobór stylizacji. Reszta to moja robota: zadbam o światło, kompozycję i klimat, który odda Twój profesjonalizm.</p>
      <p>Zobacz też, jak <a href="/blog/headshoty-linkedin-konwersja">profesjonalne headshoty zwiększają konwersję na LinkedIn</a>, albo przejrzyj moje <a href="/portfolio/sesja-wizerunkowa">realizacje sesji wizerunkowych</a>.</p>
    `,
    seo: {
      title: "Jak przygotować się do sesji biznesowej: 7 wskazówek | Marcin Szabunia",
      description:
        "Praktyczna checklista przed sesją portretową: stylizacja, detale, inspiracje. Wszystko, czego potrzebujesz, żeby Twoje zdjęcia biznesowe wyglądały profesjonalnie.",
    },
  },
  {
    slug: "headshoty-linkedin-konwersja",
    title: "Dlaczego profesjonalne headshoty zwiększają konwersję na LinkedIn",
    excerpt:
      "Profil z profesjonalnym zdjęciem generuje 14x więcej wyświetleń. Jak wykorzystać portret biznesowy, żeby LinkedIn pracował na Twoją markę?",
    category: "branża",
    date: "2025-02-08",
    readTime: 5,
    thumbnail: "/images/blog/headshoty-linkedin-konwersja-2.jpg",
    content: `
      <p class="lead">LinkedIn to nie Facebook. To narzędzie biznesowe, w którym pierwsze wrażenie decyduje o tym, czy ktoś kliknie „Połącz", czy przewinie dalej. A pierwsze wrażenie zaczyna się od zdjęcia profilowego.</p>

      <h2>Liczby nie kłamią</h2>
      <p>Według danych LinkedIn, profile z profesjonalnym zdjęciem generują <strong>14 razy więcej wyświetleń</strong> niż te bez zdjęcia lub ze zdjęciem amatorskim. To nie jest subtelna różnica, to przepaść.</p>
      <ul>
        <li>21x więcej wyświetleń profilu</li>
        <li>36x więcej wiadomości</li>
        <li>9x więcej zaproszeń do połączenia</li>
      </ul>

      <h2>Co sprawia, że headshot „działa"?</h2>
      <p>Nie chodzi o to, żeby zdjęcie było „ładne". Chodzi o to, żeby budowało <strong>zaufanie</strong>. Profesjonalny headshot komunikuje: „Jestem kompetentny, wiarygodny, warto ze mną rozmawiać".</p>

      <h3>Elementy dobrego headshota na LinkedIn:</h3>
      <ul>
        <li><strong>Kontakt wzrokowy:</strong> patrz w obiektyw, nie w bok</li>
        <li><strong>Delikatny uśmiech:</strong> sygnalizuje dostępność, nie dystans</li>
        <li><strong>Czyste tło:</strong> jednolite lub lekko rozmyte</li>
        <li><strong>Właściwy kadr:</strong> od ramion w górę, twarz zajmuje ok. 60% kadru</li>
        <li><strong>Profesjonalna stylizacja:</strong> dopasowana do branży</li>
      </ul>

      <h2>Selfie vs profesjonalny headshot</h2>
      <p>Selfie zrobione telefonem może być świetne na Instagram. Na LinkedIn sygnalizuje jednak: „nie inwestuję w swój wizerunek". W świecie B2B, gdzie transakcje opiewają na tysiące złotych, profesjonalne zdjęcie to koszt minimalny w stosunku do potencjalnego zwrotu.</p>

      <h2>Jak często aktualizować zdjęcie?</h2>
      <p>Prosta zasada: zdjęcie na LinkedIn powinno wyglądać jak Ty <strong>dzisiaj</strong>. Jeśli ktoś umówi się z Tobą na spotkanie i nie rozpozna Cię, masz problem. Aktualizuj headshot co 1-2 lata lub po znaczącej zmianie wizerunku.</p>

      <h2>ROI profesjonalnego headshota</h2>
      <p><a href="/uslugi/wizerunek-portrety">Sesja portretowa</a> kosztuje od 1 000 zł. Jeden nowy klient pozyskany dzięki lepszemu profilowi na LinkedIn zwraca tę inwestycję wielokrotnie. To jedna z najtańszych i najskuteczniejszych inwestycji w personal branding.</p>
      <p>Zanim umówisz sesję, sprawdź, <a href="/blog/jak-przygotowac-sie-do-sesji-biznesowej">jak przygotować się do sesji biznesowej</a>, i zobacz <a href="/portfolio/sesja-wizerunkowa">przykładowe realizacje sesji wizerunkowych</a>.</p>
    `,
    seo: {
      title: "Headshoty na LinkedIn: jak zwiększają konwersję | Marcin Szabunia",
      description:
        "Profesjonalne zdjęcie na LinkedIn generuje 14x więcej wyświetleń. Jak zrobić headshot, który buduje zaufanie i przyciąga klientów?",
    },
  },
  {
    slug: "fotografia-eventowa-vs-reportaz",
    title: "Fotografia eventowa vs reportaż: co wybrać dla Twojej konferencji",
    excerpt:
      "Reportaż i sesja eventowa to dwa różne podejścia. Które lepiej opowie historię Twojego wydarzenia? Porównanie stylów, kosztów i efektów.",
    category: "poradnik",
    date: "2025-03-02",
    readTime: 7,
    thumbnail: "/images/blog/fotografia-eventowa-vs-reportaz-2.jpg",
    content: `
      <p class="lead">Organizujesz konferencję, galę lub targi branżowe i potrzebujesz fotografa. Ale czy chcesz reportaż (dyskretne chwytanie momentów) czy sesję eventową (zaplanowane ujęcia)? Te dwa podejścia dają zupełnie inny materiał. Oto, jak wybrać mądrze.</p>

      <h2>Reportaż: historia opowiedziana kadrami</h2>
      <p>Reportaż fotograficzny to styl, w którym fotograf jest „niewidzialny". Nie pozuje uczestników i nie prosi o uśmiech. Obserwuje i dokumentuje autentyczne momenty.</p>
      <h3>Kiedy wybrać reportaż:</h3>
      <ul>
        <li>Konferencje z panelami i dyskusjami</li>
        <li>Networking i nieformalne spotkania</li>
        <li>Gale i bankiety</li>
        <li>Imprezy firmowe i team-buildingi</li>
      </ul>
      <p><strong>Efekt:</strong> Naturalne, emocjonalne zdjęcia oddające atmosferę wydarzenia. Świetne na Social Media i <a href="/portfolio/fotografia-eventowa">relacje z eventów</a>.</p>

      <h2>Sesja eventowa: kontrolowany kadr</h2>
      <p>Sesja eventowa to bardziej zaaranżowane podejście. Fotograf pracuje z uczestnikami, ustawia grupowe zdjęcia, robi portrety prelegentów, dokumentuje kluczowe momenty z najlepszej perspektywy.</p>
      <h3>Kiedy wybrać sesję eventową:</h3>
      <ul>
        <li>Targi i wystawy (zdjęcia stoisk, produktów)</li>
        <li>Launch produktu (zaplanowane ujęcia)</li>
        <li>Oficjalne spotkania z VIP-ami</li>
        <li>Materiały do raportów rocznych i komunikatów prasowych</li>
      </ul>
      <p><strong>Efekt:</strong> Profesjonalne, dopracowane zdjęcia idealne do materiałów korporacyjnych i mediów.</p>

      <h2>Podejście hybrydowe: najlepsza opcja</h2>
      <p>W praktyce najczęściej łączę oba style. Pierwsza część eventu to reportaż: rejestracja, networking, panele. W przerwach robię portrety prelegentów i zdjęcia grupowe, a wieczorem wracam do reportażu z części oficjalnej. Dzięki temu dostajesz kompletny materiał.</p>

      <h2>Porównanie kosztów</h2>
      <p>Cena nie zależy od stylu fotografii, a od czasu pracy i opcji dodatkowych:</p>
      <ul>
        <li><strong>Stawka godzinowa:</strong> 600 zł (pierwsza godzina), 400 zł (kolejne)</li>
        <li><strong>Pakiet całodniowy (8h):</strong> 2 800 zł</li>
        <li><strong>Live editing:</strong> +20 zł/zdjęcie (zdjęcia na Social Media w trakcie eventu)</li>
        <li><strong>Ujęcia z drona:</strong> +500 zł</li>
      </ul>

      <h2>Jak wybrać?</h2>
      <p>Zadaj sobie pytanie: do czego będziesz używać tych zdjęć? Na social media i szybkie relacje najlepszy będzie reportaż, do materiałów prasowych i raportów sesja eventowa, a jeśli potrzebujesz jednego i drugiego, wybierz podejście hybrydowe. Niezależnie od wyboru, kluczowe jest omówienie agendy przed eventem, żeby fotograf wiedział, co jest najważniejsze.</p>
      <p>Sprawdź pełną ofertę <a href="/uslugi/eventy-reportaze">fotografii eventowej</a> i napisz, jeśli chcesz omówić swoje wydarzenie.</p>
    `,
    seo: {
      title: "Fotografia eventowa vs reportaż: porównanie | Marcin Szabunia",
      description:
        "Reportaż czy sesja eventowa? Porównanie stylów fotografii na konferencjach, targach i galach. Koszty, efekty, kiedy co wybrać.",
    },
  },
  {
    slug: "zdjecie-do-cv-w-domu",
    title: "Jak zrobić profesjonalne zdjęcie do CV w domu: kompletny poradnik",
    excerpt:
      "Nie masz czasu na sesję u fotografa? Oto jak zrobić przyzwoite zdjęcie do CV telefonem, i kiedy lepiej jednak zainwestować w profesjonalną sesję.",
    category: "poradnik",
    date: "2025-04-10",
    readTime: 8,
    thumbnail: "/images/blog/zdjecie-do-cv-w-domu-2.jpg",
    content: `
      <p class="lead">Zdjęcie do CV to często pierwsza rzecz, którą widzi rekruter. Nie musisz od razu iść do studia, telefonem też da się zrobić przyzwoite zdjęcie. Oto jak to zrobić krok po kroku, i kiedy warto jednak postawić na profesjonalistę.</p>

      <h2>1. Oświetlenie: klucz do sukcesu</h2>
      <p>Stań twarzą do dużego okna w ciągu dnia. Naturalne, rozproszone światło to najlepsze, co możesz mieć za darmo. Unikaj sztucznego oświetlenia sufitowego: tworzy cienie pod oczami. Idealny czas to godziny przedpołudniowe, gdy światło jest miękkie i równomierne.</p>
      <ul>
        <li><strong>Tak:</strong> twarzą do okna, za plecami ściana</li>
        <li><strong>Nie:</strong> okno za plecami (ciemna twarz), lampa sufitowa (cienie)</li>
        <li><strong>Pro tip:</strong> pochmurny dzień = najlepszy dzień na zdjęcie (miękkie światło)</li>
      </ul>

      <h2>2. Tło: im prostsze, tym lepiej</h2>
      <p>Jasna, jednolita ściana to idealne tło. Biała, beżowa lub jasnoszara. Unikaj regałów z książkami, plakatów i bałaganu. Jeśli nie masz odpowiedniej ściany, powieś za sobą białe prześcieradło rozciągnięte na karniszu.</p>

      <h2>3. Ustawienie telefonu</h2>
      <p>Postaw telefon na statywie lub oprzyj o coś stabilnego na wysokości oczu. Użyj tylnego aparatu (ma lepszą jakość niż przedni). Włącz samowyzwalacz (3-10 sekund) lub poproś kogoś o pomoc. Utrzymuj odległość ok. 1-1,5 metra od aparatu.</p>
      <ul>
        <li>Tryb portretowy (rozmyte tło): włącz, jeśli Twój telefon go ma</li>
        <li>Kadr: od klatki piersiowej w górę, twarz w centrum</li>
        <li>Telefon w pionie, nie w poziomie</li>
      </ul>

      <h2>4. Stylizacja i wygląd</h2>
      <p>Ubierz się tak, jak ubrałbyś/ubrałabyś się na rozmowę kwalifikacyjną. Schludna koszula lub bluzka, zadbana fryzura, minimalna biżuteria. Patrz prosto w obiektyw z lekkim uśmiechem. Chodzi o to, żeby wyglądać przyjaźnie i profesjonalnie.</p>

      <h2>5. Podstawowy retusz w telefonie</h2>
      <p>Użyj bezpłatnych aplikacji jak Snapseed lub Lightroom Mobile. Wystarczy: lekko podnieść jasność, wyrównać balans bieli, przyciąć kadr do proporcji paszportowych. Nie przesadzaj z filtrami: zdjęcie do CV ma wyglądać naturalnie.</p>

      <h2>Kiedy lepiej iść do fotografa?</h2>
      <p>Zdjęcie z telefonu wystarczy na szybką aplikację. Ale jeśli zależy Ci na stanowisku, gdzie liczy się wizerunek (sprzedaż, management, consulting, marketing), <a href="/uslugi/wizerunek-portrety">profesjonalna sesja portretowa</a> zwróci się wielokrotnie. Sesja headshot zaczyna się od 1 000 zł, a jedno dobrze zrobione zdjęcie posłuży Ci na LinkedIn, stronę firmową i materiały branżowe.</p>
      <p>Jeśli chcesz, żeby profil naprawdę pracował, przeczytaj, jak <a href="/blog/headshoty-linkedin-konwersja">headshoty zwiększają konwersję na LinkedIn</a>.</p>
    `,
    seo: {
      title: "Jak zrobić zdjęcie do CV w domu: poradnik | Marcin Szabunia",
      description:
        "Praktyczny poradnik: jak zrobić profesjonalne zdjęcie do CV telefonem w domu. Oświetlenie, tło, ustawienie i kiedy lepiej wybrać fotografa.",
    },
  },
  {
    slug: "fotografia-przemyslowa-fabryka",
    title: "Fotografia przemysłowa: jak pokazać fabrykę z najlepszej strony",
    excerpt:
      "Hale produkcyjne, maszyny CNC, linie montażowe. Jak uchwycić skalę i precyzję nowoczesnego zakładu? Praktyczne wskazówki od fotografa przemysłowego.",
    category: "branża",
    date: "2025-05-05",
    readTime: 6,
    thumbnail: "/images/blog/fotografia-przemyslowa-fabryka-2.jpg",
    content: `
      <p class="lead">Fotografia przemysłowa to nie zdjęcia maszyn, to opowieść o ludziach, procesach i innowacji. Dobrze wykonane zdjęcia fabryki mogą odmienić stronę internetową, raport roczny czy materiały rekrutacyjne. Oto jak to robię.</p>

      <h2>Specyfika hal produkcyjnych</h2>
      <p>Hale produkcyjne to jedno z najtrudniejszych środowisk do fotografowania. Mieszane oświetlenie (jarzeniówki + naturalne), duże przestrzenie, ruch maszyn i ludzi. Trzeba być gotowym na takie warunki i mieć sprzęt, który poradzi sobie z trudnym światłem.</p>

      <h2>BHP na sesji zdjęciowej</h2>
      <p>Na każdą sesję przemysłową przyjeżdżam w odpowiednim obuwiu i odzieży ochronnej. Przed wejściem na halę zapoznaję się z regulaminem BHP i konsultuję z kierownikiem produkcji, które obszary wymagają szczególnej ostrożności. Bezpieczeństwo jest priorytetem: żadne zdjęcie nie jest warte ryzyka.</p>

      <h2>Ludzie vs maszyny</h2>
      <p>Najskuteczniejsze zdjęcia przemysłowe łączą skalę maszyn z ludzkim elementem. Operator przy panelu sterowania, inżynier kontrolujący jakość, zespół na tle linii produkcyjnej. Te ujęcia budują narrację o firmie, w której technologia spotyka się z kompetencjami ludzi.</p>
      <ul>
        <li><strong>Zdjęcia procesów:</strong> linia montażowa w akcji, spawanie, kontrola jakości</li>
        <li><strong><a href="/uslugi/sesje-zespolowe">Portrety pracowników</a>:</strong> operatorzy, inżynierowie, kadra zarządzająca</li>
        <li><strong>Detale:</strong> precyzja obróbki CNC, gotowe produkty, elementy technologiczne</li>
        <li><strong>Perspektywy:</strong> ujęcia z góry (dron), szerokie panoramy hal, makro detali</li>
      </ul>

      <h2>Do czego firmom służą te zdjęcia?</h2>
      <p>Profesjonalne zdjęcia przemysłowe pracują na wielu frontach jednocześnie:</p>
      <ul>
        <li><strong>Strona www:</strong> buduje wiarygodność, pokazuje skalę działalności</li>
        <li><strong>Raporty ESG / raporty roczne:</strong> dokumentacja procesów i inwestycji</li>
        <li><strong>Rekrutacja:</strong> pokazuje nowoczesne miejsce pracy, przyciąga talenty</li>
        <li><strong>Sprzedaż B2B:</strong> prezentacje dla klientów, oferty przetargowe</li>
        <li><strong>Social Media:</strong> content pokazujący „behind the scenes" produkcji</li>
      </ul>

      <h2>Jak się przygotować?</h2>
      <p>Przed sesją ustalam z klientem listę kluczowych ujęć: procesy produkcyjne, które chcemy pokazać, kluczowi pracownicy do portretów, produkty finalne. Dobry plan pozwala wykorzystać czas na hali maksymalnie efektywnie, bo produkcja nie czeka.</p>
      <p>Zobacz też moje <a href="/portfolio/sesja-korporacyjna">realizacje sesji korporacyjnych</a> w przestrzeniach firmowych.</p>
    `,
    seo: {
      title: "Fotografia przemysłowa: jak pokazać fabrykę | Marcin Szabunia",
      description:
        "Jak fotografować hale produkcyjne, maszyny i procesy przemysłowe. Praktyczne wskazówki od fotografa z doświadczeniem w branży produkcyjnej.",
    },
  },
  {
    slug: "bledy-zdjecia-zespolu",
    title: "5 błędów, które firmy popełniają przy zdjęciach zespołu",
    excerpt:
      "Zdjęcia zespołowe to wizytówka firmy. Oto najczęstsze błędy, które sprawiają, że wyglądają nieprofesjonalnie, i jak ich uniknąć.",
    category: "poradnik",
    date: "2025-06-01",
    readTime: 5,
    thumbnail: "/images/blog/bledy-zdjecia-zespolu-2.jpg",
    content: `
      <p class="lead">Zdjęcia zespołu na stronie firmowej budują zaufanie klientów i pomagają w rekrutacji. Ale źle zrobione potrafią osiągnąć efekt odwrotny. Oto 5 najczęstszych błędów, które widzę u swoich klientów, i jak ich uniknąć.</p>

      <h2>1. Niespójny styl zdjęć</h2>
      <p>Jeden pracownik ma selfie z wakacji, drugi zdjęcie z wesela, trzeci kadr wycięty z grupowego. Efekt? Strona wygląda chaotycznie i nieprofesjonalnie. Rozwiązanie jest proste: jedna sesja, jedno tło, jeden styl oświetlenia. Spójność to klucz.</p>

      <h2>2. Złe tło i otoczenie</h2>
      <p>Zdjęcia na tle ksero, kuchni biurowej albo parkingu. Tło powinno być albo neutralne (jednolite, rozmyte), albo celowo dobrane (np. open space, sala konferencyjna, przestrzeń biurowa). Nigdy przypadkowe.</p>

      <h2>3. Brak briefu i przygotowania</h2>
      <p>Pracownicy dowiadują się o sesji 5 minut przed. Efekt: pogniecione koszule, brak makijażu, stresowe miny. Informujcie zespół minimum tydzień wcześniej. Wyślijcie wskazówki dotyczące ubioru. Dajcie ludziom czas na przygotowanie, a efekt będzie wielokrotnie lepszy.</p>

      <h2>4. Za mało czasu na osobę</h2>
      <p>Sesja dla 30 osób w 2 godziny = 4 minuty na osobę. To za mało na dobry portret. Realistyczny czas to 10-15 minut na osobę, wliczając ustawienie światła, rozgrzewkę i kilka prób. Nie oszczędzaj na czasie: to inwestycja w wizerunek.</p>

      <h2>5. Zapominanie o aktualizacji</h2>
      <p>Nowy pracownik dołącza, stary odchodzi, a zdjęcia na stronie mają 3 lata. Ustal harmonogram aktualizacji, np. sesja co rok lub przy każdej większej zmianie w zespole. Regularne sesje utrzymują stronę aktualną i pokazują, że firma się rozwija.</p>

      <h2>Bonus: jak zorganizować sesję zespołową?</h2>
      <p>Mogę przyjechać do Waszego biura z <a href="/uslugi/sesje-zespolowe">mobilnym studio</a>. Setup zajmuje ok. 30 minut, a potem fotografuję osoby jedna po drugiej. Zero stresu, zero logistyki po Waszej stronie. Gotowe zdjęcia w 14 dni.</p>
      <p>Przejrzyj <a href="/portfolio/sesja-korporacyjna">realizacje sesji korporacyjnych</a> i daj znać, kiedy zaplanować sesję u Was.</p>
    `,
    seo: {
      title: "5 błędów przy zdjęciach zespołu: jak ich uniknąć | Marcin Szabunia",
      description:
        "Najczęstsze błędy w zdjęciach zespołowych: niespójność, złe tło, brak briefu. Jak zorganizować profesjonalną sesję dla pracowników.",
    },
  },
  {
    slug: "ile-kosztuje-sesja-wizerunkowa-dla-firmy",
    title: "Ile kosztuje sesja wizerunkowa dla firmy: co realnie wpływa na cenę",
    excerpt:
      "Cena sesji wizerunkowej zaczyna się od 1 000 zł, ale finalna wycena zależy od kilku policzalnych czynników. Tłumaczę, za co realnie płacisz i jak zaplanować budżet.",
    category: "poradnik",
    date: "2026-03-10",
    readTime: 6,
    thumbnail: "/images/blog/ile-kosztuje-sesja-wizerunkowa-dla-firmy-2.jpg",
    content: `
      <p class="lead">„Ile kosztuje sesja wizerunkowa?" to pytanie, które dostaję najczęściej. Uczciwa odpowiedź brzmi: to zależy, ale od konkretnych, policzalnych rzeczy. Poniżej tłumaczę, co realnie wpływa na cenę <a href="/uslugi/wizerunek-portrety">sesji wizerunkowej dla firmy</a>, żebyś wiedział, za co płacisz i jak zaplanować budżet.</p>

      <h2>Od czego zaczyna się wycena</h2>
      <p>Pojedynczy portret biznesowy zaczyna się od <strong>1 000 zł</strong>. To punkt wyjścia dla jednej osoby i podstawowego zestawu ujęć. Im więcej elementów dochodzi, tym wyżej idzie wycena. Zawsze jednak ustalamy ją z góry, przed sesją, bez niespodzianek.</p>

      <h2>1. Liczba osób</h2>
      <p>Sesja jednej osoby to inny nakład pracy niż <a href="/uslugi/sesje-zespolowe">sesja całego zespołu</a>. Przy większej grupie liczy się czas na osobę: realnie 10–15 minut na dobry portret, wliczając ustawienie i kilka prób. To główny czynnik przy zespołach.</p>

      <h2>2. Liczba ujęć i retuszu</h2>
      <p>Czy potrzebujesz jednego headshota, czy kilku wariantów (formalny, luźniejszy, kadr poziomy i pionowy)? Każde finalne zdjęcie przechodzi autorski retusz, a jego liczba wprost przekłada się na cenę.</p>

      <h2>3. Lokalizacja i dojazd</h2>
      <p>Sesja w Poznaniu, u mnie albo w Twoim biurze, to standard. Realizacje w innych miastach to dodatkowo czas i dojazd, które ustalamy w wycenie. Na terenie Poznania dojazd jest wliczony.</p>

      <h2>4. Sceneria i przygotowanie</h2>
      <p>Neutralne tło jest najprostsze. Jeśli zależy Ci na zdjęciach w realnej przestrzeni firmy (open space, hala, gabinet), dochodzi czas na przygotowanie planu i światła. Efekt jest bardziej „Wasz", ale wymaga więcej pracy.</p>

      <h2>5. Licencja i sposób użycia</h2>
      <p>Zdjęcia na wewnętrzny intranet to co innego niż materiały do ogólnopolskiej kampanii. Zakres wykorzystania (czas, media, zasięg) wpływa na licencję i bywa elementem wyceny przy większych projektach.</p>

      <h2>6. Tryb ekspresowy</h2>
      <p>Standardowo gotowe zdjęcia dostajesz w ustalonym terminie. Jeśli materiał jest potrzebny „na wczoraj", możliwy jest tryb przyśpieszony. To dodatkowa opcja, a nie ukryty koszt.</p>

      <h2>Jak oszacować budżet w 2 minuty</h2>
      <p>Zamiast zgadywać, policz. W <a href="/kalkulator">kalkulatorze wyceny</a> zaznaczasz zakres i od razu widzisz orientacyjny koszt. Pełne pakiety i ceny znajdziesz też w <a href="/#cennik">cenniku</a>.</p>
      <p>Zanim umówimy sesję, zobacz, <a href="/blog/jak-przygotowac-sie-do-sesji-biznesowej">jak przygotować się do sesji biznesowej</a>, a gdy będziesz gotowy, <a href="/kontakt">napisz brief</a>, odezwę się w 24h.</p>
    `,
    seo: {
      title: "Ile kosztuje sesja wizerunkowa dla firmy | Marcin Szabunia",
      description:
        "Co wpływa na cenę sesji wizerunkowej dla firmy: liczba osób, ujęć, lokalizacja, licencja. Od 1 000 zł, sprawdź, jak zaplanować budżet i oszacuj koszt.",
    },
  },
  {
    slug: "fotografia-produktowa-ecommerce",
    title: "Fotografia produktowa dla e-commerce: jak zdjęcia wpływają na sprzedaż",
    excerpt:
      "W e-commerce klient kupuje to, co widzi na zdjęciu. Jak packshot i lifestyle, spójność katalogu i kadr pod mobile realnie wpływają na sprzedaż.",
    category: "branża",
    date: "2026-04-14",
    readTime: 6,
    thumbnail: "/images/blog/fotografia-produktowa-ecommerce-2.jpg",
    content: `
      <p class="lead">W e-commerce klient nie weźmie produktu do ręki, ogląda go wyłącznie na zdjęciu. Dlatego <a href="/uslugi/fotografia-produktowa">fotografia produktowa</a> to nie koszt, lecz część maszyny sprzedażowej. Oto, co realnie robi dobre zdjęcie produktu i jak je zaplanować.</p>

      <h2>Packshot vs lifestyle: potrzebujesz obu</h2>
      <p>To dwa różne narzędzia, które grają razem:</p>
      <ul>
        <li><strong>Packshot:</strong> produkt na białym tle, czysty i powtarzalny. Podstawa karty produktu i wymóg większości platform sprzedażowych.</li>
        <li><strong>Lifestyle:</strong> produkt w kontekście, w użyciu, w realnej scenerii. Buduje emocje i pokazuje skalę oraz zastosowanie.</li>
      </ul>
      <p>Packshot sprzedaje fakty, lifestyle sprzedaje wyobrażenie. Sklepy, które łączą oba, dają klientowi komplet informacji do decyzji.</p>

      <h2>Spójność całego katalogu</h2>
      <p>Najczęstszy błąd to zdjęcia robione „przy okazji", każde w innym świetle i kadrze. Efekt? Katalog wygląda przypadkowo i traci wiarygodność. Jeden standard (to samo tło, światło i proporcje kadru) sprawia, że marka wygląda dojrzale, a strona profesjonalnie.</p>

      <h2>Zdjęcie pracuje na mobile</h2>
      <p>Większość zakupów odbywa się na telefonie, na małym ekranie. Produkt musi być czytelny w miniaturze, detale ostre po przybliżeniu, a kadr na tyle ciasny, żeby nie ginął w interfejsie. Projektuję zdjęcia z myślą o tym, gdzie realnie będą oglądane.</p>

      <h2>Dobre zdjęcia zmniejszają liczbę zwrotów</h2>
      <p>Kiedy klient dokładnie widzi, co kupuje (kolor, fakturę, proporcje, wykończenie), rzadziej jest rozczarowany po rozpakowaniu. Mniejsza rozbieżność między oczekiwaniem a rzeczywistością to mniej zwrotów i mniej pytań do obsługi.</p>

      <h2>Jak przygotować sesję produktową</h2>
      <p>Przed sesją ustalamy listę produktów, liczbę ujęć na produkt (front, tył, detale, w użyciu) i docelowe proporcje kadru pod Twój sklep. Dobry plan pozwala odfotografować większą partię sprawnie i bez chaosu.</p>
      <p>Zobacz <a href="/portfolio/packshoty-produktowe">realizacje packshotów produktowych</a>, policz zakres w <a href="/kalkulator">kalkulatorze</a> i <a href="/kontakt">napisz, co chcesz sfotografować</a>.</p>
    `,
    seo: {
      title: "Fotografia produktowa dla e-commerce a sprzedaż | Marcin Szabunia",
      description:
        "Jak zdjęcia produktowe wpływają na sprzedaż w e-commerce: packshot vs lifestyle, spójność katalogu, kadr pod mobile i mniej zwrotów. Praktyczny przewodnik.",
    },
  },
  {
    slug: "wideo-marketing-dla-firm-formaty",
    title: "Wideo marketing dla firm: jakie formaty naprawdę się sprawdzają",
    excerpt:
      "Film wizerunkowy, pionowy reels, testimonial czy aftermovie z eventu? Przegląd formatów wideo marketingu dla firm i tego, gdzie każdy z nich naprawdę działa.",
    category: "poradnik",
    date: "2026-05-12",
    readTime: 6,
    thumbnail: "/images/blog/wideo-marketing-dla-firm-formaty-2.jpg",
    content: `
      <p class="lead">„Potrzebujemy wideo" to dopiero początek rozmowy. Bo film wizerunkowy, pionowy reels i materiał z eventu to zupełnie różne formaty, które rozwiązują różne problemy. Oto przegląd formatów <a href="/uslugi/wideo-marketing">wideo marketingu dla firm</a> i tego, gdzie każdy się sprawdza.</p>

      <h2>1. Film wizerunkowy</h2>
      <p>Wizytówka firmy w 60–120 sekundach: kim jesteście, co robicie, dlaczego warto. Ląduje na stronie głównej, w stopce maila i w prezentacjach sprzedażowych. To format „evergreen": pracuje miesiącami, więc warto zrobić go porządnie.</p>

      <h2>2. Pionowe reels i shorty</h2>
      <p>Krótkie, dynamiczne, pod kciuk. Format pod Instagram, TikTok i YouTube Shorts, ale coraz częściej także pod LinkedIn. Świetnie sprawdza się do budowania regularnej obecności i pokazywania kulis pracy. Liczy się rytm i pierwsze 3 sekundy.</p>

      <h2>3. Testimonial i case study</h2>
      <p>Zadowolony klient mówiący o współpracy to jeden z najmocniejszych formatów B2B. Buduje zaufanie lepiej niż dowolny opis na stronie, bo to nie Wy mówicie o sobie, tylko ktoś inny mówi o Was.</p>

      <h2>4. Wideo produktowe</h2>
      <p>Produkt w ruchu, obracany, rozkładany, używany. Pokazuje to, czego nie odda zdjęcie: mechanizm, skalę, fakturę w ruchu. Naturalne uzupełnienie <a href="/uslugi/fotografia-produktowa">fotografii produktowej</a> na karcie produktu.</p>

      <h2>5. Relacja z eventu</h2>
      <p>Aftermovie z konferencji, targów czy gali firmowej to energia wydarzenia zamknięta w 60–90 sekundach. Działa jako podsumowanie dla uczestników i zaproszenie na kolejną edycję. Jeśli organizujesz event, zaplanuj wideo razem z <a href="/blog/fotografia-eventowa-vs-reportaz">fotografią eventową</a>.</p>

      <h2>Foto i wideo w jednym wejściu</h2>
      <p>Najefektywniej jest łączyć materiał foto i wideo na jednej realizacji: jeden brief, jeden dzień, spójny styl. Sprawdź <a href="/uslugi/pakiety-foto-wideo">pakiety foto + wideo</a>, oszacuj zakres w <a href="/kalkulator">kalkulatorze</a> i <a href="/kontakt">opisz swój projekt</a>. Podpowiem, który format da najwięcej przy Twoim budżecie.</p>
    `,
    seo: {
      title: "Wideo marketing dla firm: jakie formaty wybrać | Marcin Szabunia",
      description:
        "Film wizerunkowy, reels, testimonial, wideo produktowe, relacja z eventu, przegląd formatów wideo marketingu B2B i tego, gdzie każdy się sprawdza.",
    },
  },
  {
    slug: "sesja-wizerunkowa-poznan",
    title: "Sesja wizerunkowa w Poznaniu: studio, biuro czy plener?",
    excerpt:
      "Gdzie najlepiej zrobić zdjęcia biznesowe w Poznaniu? Porównanie trzech podejść: studio, Twoje biuro i plener. Plusy, minusy i to, dla kogo każde z nich sprawdzi się najlepiej.",
    category: "poradnik",
    date: "2026-05-27",
    readTime: 6,
    thumbnail: "/images/blog/sesja-wizerunkowa-poznan-2.jpg",
    content: `
      <p class="lead">Szukasz fotografa do zdjęć biznesowych w Poznaniu i zastanawiasz się, gdzie właściwie zrobić sesję? Studio, Twoje biuro, a może plener? Każde z tych miejsc daje inny efekt i pasuje do innych potrzeb. Oto praktyczne porównanie, które pomoże Ci wybrać.</p>

      <h2>Studio: pełna kontrola nad efektem</h2>
      <p>Studio to najbezpieczniejszy wybór, gdy zależy Ci na czystym, ponadczasowym portrecie. Kontrolowane światło, neutralne tło (białe, szare, grafitowe) i zero przypadkowości. Taki <a href="/uslugi/wizerunek-portrety">portret wizerunkowy</a> wygląda spójnie niezależnie od tego, gdzie go potem użyjesz, na LinkedIn, stronie firmowej czy w materiałach prasowych.</p>
      <ul>
        <li><strong>Dla kogo:</strong> headshoty, portrety zarządu, zdjęcia do CV i mediów</li>
        <li><strong>Plus:</strong> powtarzalność i pełna kontrola nad światłem</li>
        <li><strong>Minus:</strong> mniej „charakteru" miejsca niż realna przestrzeń</li>
      </ul>

      <h2>Twoje biuro: autentyczność i wygoda</h2>
      <p>Sesja u Ciebie w firmie ma dwie wielkie zalety: pokazuje realną przestrzeń marki i nie wyrywa zespołu z pracy na pół dnia. Przyjeżdżam z mobilnym studiem, rozłożenie zajmuje ok. 30 minut, a potem fotografuję w Waszym rytmie. To naturalny wybór dla <a href="/uslugi/sesje-zespolowe">sesji zespołowych</a> i zdjęć pokazujących firmę „od środka".</p>
      <ul>
        <li><strong>Dla kogo:</strong> zespoły, działy, zdjęcia pokazujące biuro i kulturę firmy</li>
        <li><strong>Plus:</strong> autentyczna przestrzeń, zero logistyki po Waszej stronie</li>
        <li><strong>Minus:</strong> trzeba zadbać o porządek w kadrze i miejsce na sprzęt</li>
      </ul>

      <h2>Plener: charakter i lokalny klimat</h2>
      <p>Poznań ma sporo do zaoferowania jako tło: architektura Starego Miasta, nowoczesne dzielnice biurowe, zieleń nad Wartą i industrialne klimaty dawnych browarów. Plener daje zdjęciom charakter i „oddech", świetnie sprawdza się w personal brandingu i materiałach mniej formalnych.</p>
      <ul>
        <li><strong>Dla kogo:</strong> personal branding, twórcy, mniej formalne wizerunki</li>
        <li><strong>Plus:</strong> charakter miejsca, naturalne światło, dynamika kadru</li>
        <li><strong>Minus:</strong> zależność od pogody i pory dnia</li>
      </ul>

      <h2>Jak wybrać?</h2>
      <p>Zacznij od pytania: gdzie te zdjęcia będą żyły? Jednolity headshot na cały zespół? Studio albo Wasze biuro. Wizerunek eksperta z charakterem? Plener. Przy kompleksowym materiale o firmie często łączymy oba podejścia: portrety w biurze plus kilka ujęć w plenerze. Nie musisz wybierać tylko jednego.</p>

      <h2>Logistyka i dojazd w Poznaniu</h2>
      <p>Bazuję w Poznaniu, więc dojazd na terenie miasta jest wliczony w cenę, niezależnie od tego, czy to studio, Twoje biuro, czy plener. Realizacje poza Poznaniem ustalamy indywidualnie. Przed sesją zawsze omawiamy lokalizację, żeby światło i tło grały na Twoją korzyść.</p>
      <p>Zobacz <a href="/portfolio/sesja-wizerunkowa">realizacje sesji wizerunkowych</a> i <a href="/portfolio/sesja-korporacyjna">sesji korporacyjnych</a>, oszacuj zakres w <a href="/kalkulator">kalkulatorze</a>, a potem <a href="/kontakt">napisz, co chcesz osiągnąć</a>. Dobiorę miejsce pod Twój cel.</p>
    `,
    seo: {
      title: "Sesja wizerunkowa Poznań: studio, biuro czy plener | Marcin Szabunia",
      description:
        "Gdzie zrobić sesję wizerunkową w Poznaniu: studio, biuro czy plener? Porównanie podejść, plusy i minusy każdego, dojazd na terenie Poznania w cenie.",
    },
  },
  {
    slug: "zdjecia-ai-vs-profesjonalna-sesja",
    title: "Zdjęcia AI vs profesjonalna sesja: czy generator headshotów wystarczy firmie?",
    excerpt:
      "Generatory zdjęć AI kuszą ceną i tempem. Ale czy headshot z AI nadaje się na profil eksperta i stronę firmy? Trzeźwe spojrzenie fotografa na mocne i słabe strony.",
    category: "branża",
    date: "2026-05-23",
    readTime: 6,
    thumbnail: "/images/blog/zdjecia-ai-vs-profesjonalna-sesja-2.jpg",
    content: `
      <p class="lead">Generatory zdjęć AI obiecują headshot w kilka minut, za ułamek ceny sesji. Brzmi kusząco, zwłaszcza gdy materiał jest potrzebny „na wczoraj". Ale czy portret z AI nadaje się na profil eksperta, stronę firmy i materiały, które mają budować zaufanie? Spójrzmy na to trzeźwo.</p>

      <h2>Co AI robi naprawdę dobrze</h2>
      <p>Nie ma sensu udawać, że narzędzia AI są bezużyteczne. W kilku zastosowaniach są świetne:</p>
      <ul>
        <li><strong>Tempo i cena:</strong> kilka wariantów w kilkanaście minut i za niewielkie pieniądze</li>
        <li><strong>Eksperymenty:</strong> szybkie sprawdzenie tła, kadru czy stylizacji „na próbę"</li>
        <li><strong>Awatary pomocnicze:</strong> ikonka do wewnętrznego narzędzia, roboczej prezentacji, prototypu</li>
      </ul>

      <h2>Gdzie AI zawodzi w kontekście B2B</h2>
      <p>Problem zaczyna się tam, gdzie zdjęcie ma reprezentować realną osobę i realną markę.</p>
      <ul>
        <li><strong>„To nie do końca Ty":</strong> AI wygładza i zmienia rysy. Gdy klient spotka Cię na żywo i nie rozpozna, tracisz wiarygodność, zamiast ją budować.</li>
        <li><strong>Detale, które zdradzają:</strong> dłonie, biżuteria, logo, faktura tkaniny, to miejsca, w których generatory wciąż się mylą.</li>
        <li><strong>Brak spójności:</strong> headshot z AI rzadko pasuje stylem do reszty zdjęć firmy, zespołu, biura, realizacji.</li>
        <li><strong>Ryzyko wizerunkowe:</strong> coraz więcej osób rozpoznaje „twarz z generatora", a to potrafi sygnalizować, że marka idzie na skróty.</li>
      </ul>

      <h2>Zaufanie to waluta B2B</h2>
      <p>W sprzedaży B2B decyzje opierają się na zaufaniu, a portret jest jego pierwszym sygnałem. Pisałem o tym przy okazji <a href="/blog/headshoty-linkedin-konwersja">headshotów na LinkedIn</a>: autentyczne, profesjonalne zdjęcie komunikuje „warto ze mną rozmawiać". Wygenerowana twarz tego nie zrobi, bo z definicji nie jest prawdziwa.</p>

      <h2>Kiedy AI ma sens, a kiedy nie</h2>
      <p>Prosta zasada: im bliżej twarzy marki, tym mniej miejsca na AI. Roboczy awatar do wewnętrznego systemu? Spokojnie. Twarz prezesa na stronie głównej, profil handlowca, zdjęcia, na podstawie których ktoś zdecyduje o współpracy? Tu realna <a href="/uslugi/wizerunek-portrety">sesja wizerunkowa</a> zwraca się szybciej, niż się wydaje.</p>

      <h2>Werdykt</h2>
      <p>AI to narzędzie, nie zamiennik. Świetne do szkiców i zastosowań pomocniczych, słabe wszędzie tam, gdzie liczy się, że to naprawdę Ty. Twarz, która ma reprezentować Ciebie i Twoją firmę, warta jest jednej dobrej sesji.</p>
      <p>Zobacz <a href="/portfolio/sesja-wizerunkowa">realizacje sesji wizerunkowych</a> albo od razu <a href="/kontakt">napisz, czego potrzebujesz</a>. Podpowiem, ile ujęć i wariantów realnie wystarczy.</p>
    `,
    seo: {
      title: "Zdjęcia AI vs profesjonalna sesja: co wybrać | Marcin Szabunia",
      description:
        "Headshot z generatora AI czy profesjonalna sesja? Porównanie kosztów, wiarygodności, zgodności z wizerunkiem i ryzyk. Kiedy AI wystarczy, a kiedy szkodzi marce.",
    },
  },
  {
    slug: "co-zalozyc-na-sesje-biznesowa",
    title: "Co założyć na sesję biznesową: kolory, fasony i błędy, których lepiej unikać",
    excerpt:
      "Stylizacja potrafi zrobić albo zepsuć portret biznesowy. Praktyczny przewodnik po kolorach, fasonach i materiałach, które dobrze wyglądają na zdjęciach, i częstych błędach.",
    category: "poradnik",
    date: "2026-05-19",
    readTime: 7,
    thumbnail: "/images/blog/co-zalozyc-na-sesje-biznesowa-2.jpg",
    content: `
      <p class="lead">Możesz mieć idealne światło i najlepszego fotografa, ale jeśli stylizacja nie gra, portret nie zadziała. Ubranie to jedyny element sesji, który w całości zależy od Ciebie. Oto przewodnik po tym, co założyć na <a href="/uslugi/wizerunek-portrety">sesję biznesową</a>, żeby wyglądać profesjonalnie i jak Ty.</p>

      <h2>Zasada nadrzędna: o jeden poziom wyżej</h2>
      <p>Ubierz się odrobinę bardziej elegancko niż na co dzień w pracy. Pracujesz w casualu? Załóż dobrą koszulę. Nosisz koszulę? Dodaj marynarkę. Chodzi o to, żeby na zdjęciu wyglądać jak najlepsza wersja siebie w pracy, a nie jak ktoś przebrany na galę.</p>

      <h2>Kolory, które dobrze wychodzą na zdjęciach</h2>
      <p>Stonowane, jednolite barwy są bezpieczne i ponadczasowe. Pozwalają skupić uwagę na twarzy, a nie na ubraniu.</p>
      <ul>
        <li><strong>Pewniaki:</strong> granat, grafit, szarość, biel, butelkowa zieleń, burgund</li>
        <li><strong>Ostrożnie:</strong> czysta czerń (bywa ciężka), jaskrawe neony, krzykliwe akcenty</li>
        <li><strong>Pod kolor marki:</strong> jeśli firma ma mocną identyfikację, warto wpleść jej kolor w detal</li>
      </ul>

      <h2>Materiały i wzory: uwaga na pułapki</h2>
      <p>Aparat widzi więcej niż oko. Drobne wzory potrafią „migotać" na zdjęciu (efekt mory), a błyszczące tkaniny odbijają światło i rozpraszają uwagę.</p>
      <ul>
        <li><strong>Unikaj:</strong> drobnej kratki, wąskich pasków, połyskliwych satyn</li>
        <li><strong>Stawiaj na:</strong> matowe, gęste tkaniny dobrej jakości, gładkie faktury</li>
        <li><strong>Dopasowanie:</strong> ubranie po prostu dobrze leżące wygrywa z drogim, ale źle skrojonym</li>
      </ul>

      <h2>Warstwy = warianty na jednej sesji</h2>
      <p>Marynarka, którą można zdjąć, sweter pod spodem, zapasowa koszula albo szalik: to najprostszy sposób, żeby z jednej sesji wyjść z kilkoma różnymi nastrojami zdjęć. Formalny wariant na materiały korporacyjne, luźniejszy na social media. Bez dodatkowego dnia zdjęciowego.</p>

      <h2>Detale, które widać</h2>
      <p>Na portrecie wszystko jest w zbliżeniu. Wyprasowana koszula, zadbane dłonie (jeśli będą w kadrze), świeża fryzura. Okulary? Przetrzyj szkła tuż przed sesją: refleksy i odciski to żmudna robota w retuszu. Biżuterię ogranicz do kilku spójnych elementów.</p>

      <h2>Co spakować na sesję</h2>
      <ul>
        <li>2–3 przygotowane stylizacje (na wieszaku, nie zwinięte w torbie)</li>
        <li>Zapasowa koszula lub bluzka w neutralnym kolorze</li>
        <li>Wałek do ubrań i drobne przybory na ostatnie poprawki</li>
        <li>To, w czym czujesz się najpewniej: komfort widać na twarzy</li>
      </ul>

      <h2>Najczęstsze błędy</h2>
      <p>Zbyt nowy, jeszcze „sztywny" garnitur. Logo na pół klatki piersiowej. Stylizacja kompletnie oderwana od branży (smoking do firmy technologicznej). I najważniejszy błąd: strój, w którym jest Ci niewygodnie. Jeśli ciągle poprawiasz kołnierzyk, widać to na każdym ujęciu.</p>
      <p>Resztę przygotowań znajdziesz w poradniku <a href="/blog/jak-przygotowac-sie-do-sesji-biznesowej">jak przygotować się do sesji biznesowej</a>. Zobacz też, jak <a href="/blog/headshoty-linkedin-konwersja">headshot pracuje na konwersję na LinkedIn</a>, i przejrzyj <a href="/portfolio/sesja-wizerunkowa">przykładowe realizacje</a>. Gotowy? <a href="/kontakt">Napisz do mnie</a>, umówimy termin.</p>
    `,
    seo: {
      title: "Co założyć na sesję biznesową: przewodnik po stylizacji | Marcin Szabunia",
      description:
        "Jak ubrać się na sesję wizerunkową: kolory, które dobrze wyglądają na zdjęciach, fasony, materiały i błędy do uniknięcia. Praktyczny przewodnik krok po kroku.",
    },
  },
  {
    slug: "zdjecia-na-strone-firmowa",
    title: "Jakie zdjęcia potrzebuje strona internetowa firmy: kompletna lista",
    excerpt:
      "Strona firmowa to często pierwszy kontakt klienta z marką. Oto, jakich zdjęć naprawdę potrzebujesz, sekcja po sekcji, żeby budowała zaufanie, a nie wyglądała jak baza stocków.",
    category: "poradnik",
    date: "2026-05-15",
    readTime: 7,
    thumbnail: "/images/blog/zdjecia-na-strone-firmowa-2.jpg",
    content: `
      <p class="lead">Strona internetowa to często pierwszy kontakt klienta z Twoją firmą, a ocena zapada w kilka sekund. Zdjęcia decydują o tym pierwszym wrażeniu bardziej niż tekst. Oto kompletna lista zdjęć, których realnie potrzebuje strona firmowa, sekcja po sekcji.</p>

      <h2>Zdjęcie główne (hero)</h2>
      <p>Pierwszy ekran, który widzi odwiedzający. Powinno jednym kadrem komunikować, czym się zajmujesz i jaki masz styl. To nie miejsce na przypadkowy stock, tu warto zainwestować w mocne, autorskie ujęcie, bo pracuje na każdą wizytę.</p>

      <h2>Zespół i sekcja „o nas"</h2>
      <p>Ludzie kupują od ludzi. Spójne <a href="/uslugi/sesje-zespolowe">portrety zespołu</a> (jedno tło, jedno światło, jeden styl) budują zaufanie i pomagają w rekrutacji. Najczęstsze potknięcia w tym obszarze opisałem w tekście o <a href="/blog/bledy-zdjecia-zespolu">błędach przy zdjęciach zespołu</a>.</p>

      <h2>Biuro i przestrzeń firmy</h2>
      <p>Zdjęcia realnej przestrzeni, biura, sali konferencyjnej, hali, pokazują skalę i charakter firmy oraz uwiarygadniają markę. To naturalna część <a href="/portfolio/sesja-korporacyjna">sesji korporacyjnej</a>, którą można zrealizować przy okazji portretów zespołu.</p>

      <h2>Produkty i usługi</h2>
      <p>Jeśli sprzedajesz produkty, potrzebujesz spójnego zestawu zdjęć: packshot na białym tle plus ujęcia w kontekście. Jak to przekłada się na sprzedaż, rozkładam w tekście o <a href="/blog/fotografia-produktowa-ecommerce">fotografii produktowej dla e-commerce</a>. Usługi też da się pokazać obrazem: proces, efekt, ludzie przy pracy.</p>

      <h2>Realizacje i portfolio</h2>
      <p>Sekcja „co już zrobiliśmy" to dowód kompetencji. Zdjęcia z wdrożeń, eventów czy gotowych projektów działają mocniej niż deklaracje. Jeśli organizujesz wydarzenia, warto mieć materiał z <a href="/uslugi/eventy-reportaze">reportażu</a>.</p>

      <h2>Wideo na stronie</h2>
      <p>Krótki film wizerunkowy na stronie głównej potrafi zatrzymać uwagę dłużej niż statyczny obraz. <a href="/uslugi/wideo-marketing">Wideo marketing</a> najlepiej zaplanować razem z sesją foto, jeden dzień, spójny styl, materiał na stronę i social media naraz.</p>

      <h2>Dlaczego nie zdjęcia stockowe</h2>
      <p>Stocki są wygodne, ale mają trzy wady: każdy ma do nich dostęp (Twój konkurent może użyć tego samego zdjęcia), nie pokazują Twojej realnej firmy i często widać w nich „sztuczność". Autentyczne, autorskie zdjęcia odróżniają markę, stock ją upodabnia do innych.</p>

      <h2>Jak to zaplanować</h2>
      <p>Najtaniej i najspójniej jest zebrać potrzeby z całej strony i zrealizować je w jednej, dobrze zaplanowanej sesji (albo serii). Zaczynamy od listy sekcji i ujęć, dobieramy lokalizację i styl, a Ty dostajesz komplet spójnego materiału. Oszacuj zakres w <a href="/kalkulator">kalkulatorze</a>, przejrzyj <a href="/portfolio/sesja-korporacyjna">realizacje</a> i <a href="/kontakt">napisz, co jest na Twojej stronie</a>, ułożymy plan zdjęć pod nią.</p>
    `,
    seo: {
      title: "Jakie zdjęcia na stronę firmową: kompletna lista | Marcin Szabunia",
      description:
        "Jakich zdjęć potrzebuje strona internetowa firmy: hero, zespół, biuro, produkty, realizacje. Lista sekcja po sekcji i dlaczego warto zrezygnować ze stocków.",
    },
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export const blogCategories = ["poradnik", "realizacja", "branża"] as const;

/* ── Linkowanie wewnętrzne blog ↔ usługi ──
   Mapa: slug wpisu → slug najbardziej powiązanej usługi (z src/data/services.tsx).
   Trzymamy slug usługi jako string, żeby nie tworzyć zależności blog→services. */
export const blogServiceMap: Record<string, string> = {
  "jak-przygotowac-sie-do-sesji-biznesowej": "wizerunek-portrety",
  "headshoty-linkedin-konwersja": "wizerunek-portrety",
  "fotografia-eventowa-vs-reportaz": "eventy-reportaze",
  "zdjecie-do-cv-w-domu": "wizerunek-portrety",
  "fotografia-przemyslowa-fabryka": "fotografia-produktowa",
  "bledy-zdjecia-zespolu": "sesje-zespolowe",
  "ile-kosztuje-sesja-wizerunkowa-dla-firmy": "wizerunek-portrety",
  "fotografia-produktowa-ecommerce": "fotografia-produktowa",
  "wideo-marketing-dla-firm-formaty": "wideo-marketing",
  "sesja-wizerunkowa-poznan": "wizerunek-portrety",
  "zdjecia-ai-vs-profesjonalna-sesja": "wizerunek-portrety",
  "co-zalozyc-na-sesje-biznesowa": "wizerunek-portrety",
  "zdjecia-na-strone-firmowa": "wizerunek-portrety",
};

/** Slug usługi powiązanej z danym wpisem (lub undefined). */
export function getServiceSlugForPost(slug: string): string | undefined {
  return blogServiceMap[slug];
}

/** Powiązane wpisy: najpierw ta sama usługa, potem ta sama kategoria, potem reszta. */
export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const svc = blogServiceMap[slug];
  const current = getBlogPostBySlug(slug);
  const pool = blogPosts.filter((p) => p.slug !== slug);
  const sameService = pool.filter((p) => !!svc && blogServiceMap[p.slug] === svc);
  const sameCategory = pool.filter(
    (p) => !!current && p.category === current.category && !sameService.includes(p)
  );
  const rest = pool.filter((p) => !sameService.includes(p) && !sameCategory.includes(p));
  return [...sameService, ...sameCategory, ...rest].slice(0, limit);
}

/** Wpisy bloga powiązane z daną usługą (od najnowszych). */
export function getPostsForService(serviceSlug: string, limit = 3): BlogPost[] {
  return blogPosts
    .filter((p) => blogServiceMap[p.slug] === serviceSlug)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, limit);
}
