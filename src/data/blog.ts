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
  /** Q&A pod FAQPage JSON-LD (featured snippets / AEO) — wyłącznie parafrazy treści wpisu. */
  faq?: { q: string; a: string }[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "jak-przygotowac-sie-do-sesji-biznesowej",
    faq: [
      { q: "Co założyć na sesję biznesową?", a: "Ubierz się o jeden poziom bardziej elegancko niż na co dzień w pracy. Bezpieczne kolory to granat, szarość, biel, czerń i butelkowa zieleń. Unikaj pasków, kratki, fluorescencyjnych barw i ubrań z dużymi logotypami. Warto przygotować 2-3 stylizacje, żeby na sesji mieć z czego wybierać." },
      { q: "Czy muszę umieć pozować na sesji biznesowej?", a: "Nie. Dobry fotograf biznesowy prowadzi Cię przez całą sesję: pokazuje, jak stanąć, gdzie patrzeć i kiedy się uśmiechnąć. Nie musisz być modelem — Twoim jedynym zadaniem jest być sobą, a o światło, kompozycję i klimat zdjęć zadba fotograf." },
      { q: "Jak przygotować się dzień przed sesją biznesową?", a: "Wyśpij się, pij wodę i unikaj alkoholu dzień przed sesją — cienie pod oczami i sucha skóra to pierwsze rzeczy widoczne na profesjonalnych zdjęciach. Zadbaj też o detale: wyprasowaną koszulę, schludną fryzurę i czyste szkła okularów, bo refleksy na brudnych szkłach to koszmar w retuszu." },
    ],
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
      <p>Przygotowanie do sesji biznesowej nie wymaga godzin planowania. Wystarczy checklista powyżej i 30 minut na dobór stylizacji. Reszta to moja robota: zadbam o światło, kompozycję i klimat, który odda Twój profesjonalizm. Sesje realizuję w Poznaniu, gdzie mam bazę, a na życzenie dojeżdżam do klientów w całej Polsce i Europie.</p>
      <p>Zobacz też, jak <a href="/blog/headshoty-linkedin-konwersja">profesjonalne headshoty zwiększają konwersję na LinkedIn</a>, albo przejrzyj moje <a href="/galeria?kat=portrety">realizacje sesji wizerunkowych</a>.</p>
    `,
    seo: {
      title: "Jak przygotować się do sesji biznesowej | Marcin Szabunia",
      description:
        "Praktyczna checklista przed sesją portretową: stylizacja, detale, inspiracje. Wszystko, czego potrzebujesz, żeby Twoje zdjęcia biznesowe wyglądały profesjonalnie.",
    },
  },
  {
    slug: "headshoty-linkedin-konwersja",
    faq: [
      { q: "Ile więcej wyświetleń daje profesjonalne zdjęcie na LinkedIn?", a: "Według danych LinkedIn profile z profesjonalnym zdjęciem generują 14 razy więcej wyświetleń niż te bez zdjęcia lub ze zdjęciem amatorskim. Statystyki mówią też o 21x większej liczbie wyświetleń profilu, 36x większej liczbie wiadomości i 9x większej liczbie zaproszeń do połączenia." },
      { q: "Jak często aktualizować zdjęcie profilowe na LinkedIn?", a: "Zdjęcie na LinkedIn powinno wyglądać jak Ty dzisiaj — jeśli ktoś umówi się z Tobą na spotkanie i Cię nie rozpozna, masz problem. Dobra zasada to aktualizacja headshota co 1-2 lata lub po każdej znaczącej zmianie wizerunku." },
      { q: "Co wyróżnia dobry headshot na LinkedIn?", a: "Dobry headshot buduje zaufanie, a nie tylko dobrze wygląda. Kluczowe elementy to kontakt wzrokowy z obiektywem, delikatny uśmiech sygnalizujący dostępność, czyste lub lekko rozmyte tło, kadr od ramion w górę z twarzą zajmującą około 60% kadru oraz stylizacja dopasowana do branży." },
    ],
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
      <p><a href="/uslugi/wizerunek-portrety">Sesja portretowa</a> kosztuje od 1 000 zł. Jeden nowy klient pozyskany dzięki lepszemu profilowi na LinkedIn zwraca tę inwestycję wielokrotnie. To jedna z najtańszych i najskuteczniejszych inwestycji w personal branding. Pracuję z bazy w Poznaniu — na terenie miasta dojazd jest wliczony w cenę, a sesje realizuję w całej Polsce i Europie.</p>
      <p>Zanim umówisz sesję, sprawdź, <a href="/blog/jak-przygotowac-sie-do-sesji-biznesowej">jak przygotować się do sesji biznesowej</a>, i zobacz <a href="/galeria?kat=portrety">przykładowe realizacje sesji wizerunkowych</a>.</p>
    `,
    seo: {
      title: "Headshoty na LinkedIn a konwersja | Marcin Szabunia",
      description:
        "Profesjonalne zdjęcie na LinkedIn generuje 14x więcej wyświetleń. Jak zrobić headshot, który buduje zaufanie i przyciąga klientów?",
    },
  },
  {
    slug: "fotografia-eventowa-vs-reportaz",
    faq: [
      { q: "Czym różni się reportaż od sesji eventowej?", a: "Reportaż to dyskretne dokumentowanie autentycznych momentów — fotograf jest „niewidzialny\", nie pozuje uczestników. Sesja eventowa to podejście zaaranżowane: grupowe zdjęcia, portrety prelegentów i kluczowe momenty z najlepszej perspektywy. Oba style dają zupełnie inny materiał." },
      { q: "Które podejście wybrać na konferencję firmową?", a: "Najczęściej sprawdza się podejście hybrydowe: reportaż podczas rejestracji, networkingu i paneli, w przerwach portrety prelegentów i zdjęcia grupowe, a wieczorem reportaż z części oficjalnej. Dzięki temu firma dostaje kompletny materiał na social media i do materiałów prasowych." },
      { q: "Od czego zależy cena fotografii eventowej?", a: "Cena nie zależy od stylu fotografii, tylko od czasu pracy i opcji dodatkowych: 600 zł za pierwszą godzinę, 400 zł za kolejne, pakiet całodniowy (8h) to 2 800 zł. Live editing kosztuje +20 zł/zdjęcie, a ujęcia z drona +200 zł." },
    ],
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
      <p><strong>Efekt:</strong> Naturalne, emocjonalne zdjęcia oddające atmosferę wydarzenia. Świetne na Social Media i <a href="/galeria?kat=eventy">relacje z eventów</a>.</p>

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
        <li><strong>Ujęcia z drona:</strong> +200 zł</li>
      </ul>

      <h2>Jak wybrać?</h2>
      <p>Zadaj sobie pytanie: do czego będziesz używać tych zdjęć? Na social media i szybkie relacje najlepszy będzie reportaż, do materiałów prasowych i raportów sesja eventowa, a jeśli potrzebujesz jednego i drugiego, wybierz podejście hybrydowe. Niezależnie od wyboru, kluczowe jest omówienie agendy przed eventem, żeby fotograf wiedział, co jest najważniejsze.</p>
      <p>Sprawdź pełną ofertę <a href="/uslugi/eventy-reportaze">fotografii eventowej</a> i napisz, jeśli chcesz omówić swoje wydarzenie — działam z Poznania, obsługuję eventy w całej Polsce i Europie, a na zapytania odpowiadam w ciągu 24h.</p>
    `,
    seo: {
      title: "Fotografia eventowa vs reportaż: co wybrać | Marcin Szabunia",
      description:
        "Reportaż czy sesja eventowa? Porównanie stylów fotografii na konferencjach, targach i galach. Koszty, efekty, kiedy co wybrać.",
    },
  },
  {
    slug: "zdjecie-do-cv-w-domu",
    faq: [
      { q: "Jakie światło jest najlepsze do zdjęcia do CV w domu?", a: "Naturalne, rozproszone światło dzienne. Stań twarzą do dużego okna, z jednolitą ścianą za plecami, najlepiej w godzinach przedpołudniowych. Unikaj sztucznego oświetlenia sufitowego, które tworzy cienie pod oczami — a pochmurny dzień daje najmiększe i najbardziej równomierne światło." },
      { q: "Jak ustawić telefon do zdjęcia do CV?", a: "Postaw telefon pionowo na statywie lub stabilnym podparciu na wysokości oczu, w odległości około 1-1,5 metra. Użyj tylnego aparatu (ma lepszą jakość) i samowyzwalacza na 3-10 sekund. Kadruj od klatki piersiowej w górę, z twarzą w centrum, a jeśli telefon ma tryb portretowy — włącz go." },
      { q: "Kiedy zamiast zdjęcia z telefonu wybrać fotografa?", a: "Zdjęcie z telefonu wystarczy na szybką aplikację. Jeśli jednak zależy Ci na stanowisku, gdzie liczy się wizerunek — sprzedaż, management, consulting, marketing — profesjonalna sesja portretowa zwróci się wielokrotnie. Zaczyna się od 1 000 zł, a jedno dobre zdjęcie posłuży na LinkedIn, stronę firmową i materiały branżowe." },
    ],
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
      <p>Zdjęcie z telefonu wystarczy na szybką aplikację. Ale jeśli zależy Ci na stanowisku, gdzie liczy się wizerunek (sprzedaż, management, consulting, marketing), <a href="/uslugi/wizerunek-portrety">profesjonalna sesja portretowa</a> zwróci się wielokrotnie. Sesja headshot zaczyna się od 1 000 zł, a jedno dobrze zrobione zdjęcie posłuży Ci na LinkedIn, stronę firmową i materiały branżowe. Sesje realizuję w Poznaniu (dojazd na terenie miasta wliczony), a na zapytania odpowiadam w ciągu 24h.</p>
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
    faq: [
      { q: "Do czego firmom służą zdjęcia przemysłowe?", a: "Profesjonalne zdjęcia z fabryki pracują na wielu frontach jednocześnie: budują wiarygodność strony internetowej i pokazują skalę działalności, dokumentują procesy i inwestycje w raportach ESG i rocznych, wspierają rekrutację, prezentacje sprzedażowe B2B i oferty przetargowe, a w social media dostarczają contentu pokazującego kulisy produkcji." },
      { q: "Jak wygląda kwestia BHP podczas sesji zdjęciowej w fabryce?", a: "Na każdą sesję przemysłową fotograf przyjeżdża w odpowiednim obuwiu i odzieży ochronnej. Przed wejściem na halę zapoznaje się z regulaminem BHP i konsultuje z kierownikiem produkcji, które obszary wymagają szczególnej ostrożności. Bezpieczeństwo jest priorytetem — żadne zdjęcie nie jest warte ryzyka." },
      { q: "Co warto pokazać na zdjęciach z hali produkcyjnej?", a: "Najskuteczniejsze zdjęcia przemysłowe łączą skalę maszyn z ludzkim elementem: operator przy panelu sterowania, inżynier kontrolujący jakość, zespół na tle linii produkcyjnej. Warto uzupełnić je o zdjęcia procesów, portrety pracowników, detale obróbki CNC oraz szersze perspektywy, na przykład ujęcia z drona i panoramy hal." },
    ],
    title: "Fotografia przemysłowa: jak pokazać fabrykę z najlepszej strony",
    excerpt:
      "Hale produkcyjne, maszyny CNC, linie montażowe. Jak uchwycić skalę i precyzję nowoczesnego zakładu? Praktyczne wskazówki od fotografa przemysłowego.",
    category: "branża",
    date: "2025-05-05",
    readTime: 6,
    thumbnail: "/images/blog/fotografia-przemyslowa-fabryka-3.jpg",
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
      <p>Przed sesją ustalam z klientem listę kluczowych ujęć: procesy produkcyjne, które chcemy pokazać, kluczowi pracownicy do portretów, produkty finalne. Dobry plan pozwala wykorzystać czas na hali maksymalnie efektywnie, bo produkcja nie czeka. Bazuję w Poznaniu, a sesje przemysłowe realizuję w zakładach w całej Polsce i Europie.</p>
    `,
    seo: {
      title: "Fotografia przemysłowa: zdjęcia fabryki | Marcin Szabunia",
      description:
        "Jak fotografować hale produkcyjne, maszyny i procesy przemysłowe. Praktyczne wskazówki od fotografa z doświadczeniem w branży produkcyjnej.",
    },
  },
  {
    slug: "bledy-zdjecia-zespolu",
    faq: [
      { q: "Ile czasu zaplanować na zdjęcie jednej osoby podczas sesji zespołowej?", a: "Realistyczny czas to 10-15 minut na osobę, wliczając ustawienie światła, rozgrzewkę i kilka prób. Sesja dla 30 osób w 2 godziny daje tylko 4 minuty na portret — to za mało na dobry efekt. Czas sesji to inwestycja w wizerunek firmy." },
      { q: "Jak przygotować zespół do firmowej sesji zdjęciowej?", a: "Poinformuj pracowników o sesji minimum tydzień wcześniej i wyślij wskazówki dotyczące ubioru. Gdy zespół dowiaduje się o zdjęciach 5 minut przed, efektem są pogniecione koszule i stresowe miny. Czas na przygotowanie daje wielokrotnie lepszy rezultat." },
      { q: "Jak często aktualizować zdjęcia zespołu na stronie firmowej?", a: "Warto ustalić harmonogram aktualizacji, na przykład sesję co rok lub przy każdej większej zmianie w zespole. Regularne sesje utrzymują stronę aktualną i pokazują, że firma się rozwija — trzyletnie zdjęcia z nieaktualnym składem działają odwrotnie." },
    ],
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
      <p>Mogę przyjechać do Waszego biura z <a href="/uslugi/sesje-zespolowe">mobilnym studiem</a> — bazuję w Poznaniu, gdzie dojazd jest bezpłatny, a poza miastem doliczam 2,50 zł netto/km od granic Poznania, w obie strony. Setup zajmuje ok. 20 minut, a potem fotografuję osoby jedna po drugiej. Zero stresu, zero logistyki po Waszej stronie. Gotowe zdjęcia w 14 dni.</p>
      <p>Przejrzyj <a href="/portfolio/idcom-headshoty-zespolu">realizacje sesji korporacyjnych</a> i daj znać, kiedy zaplanować sesję u Was.</p>
    `,
    seo: {
      title: "5 błędów przy zdjęciach zespołu | Marcin Szabunia",
      description:
        "Najczęstsze błędy w zdjęciach zespołowych: niespójność, złe tło, brak briefu. Jak zorganizować profesjonalną sesję dla pracowników.",
    },
  },
  {
    slug: "ile-kosztuje-sesja-wizerunkowa-dla-firmy",
    faq: [
      { q: "Od jakiej kwoty zaczyna się sesja wizerunkowa dla firmy?", a: "Pojedynczy portret biznesowy zaczyna się od 1 000 zł — to punkt wyjścia dla jednej osoby i podstawowego zestawu ujęć. Im więcej elementów dochodzi, tym wyższa wycena, ale zawsze jest ustalana z góry, przed sesją, bez niespodzianek." },
      { q: "Co wpływa na cenę sesji wizerunkowej?", a: "Sześć policzalnych czynników: liczba osób, liczba finalnych ujęć z autorskim retuszem, lokalizacja i dojazd (na terenie Poznania wliczony), sceneria i przygotowanie planu, zakres licencji na wykorzystanie zdjęć oraz ewentualny tryb ekspresowy, gdy materiał jest potrzebny szybciej niż standardowo." },
      { q: "Ile czasu trwa portret jednej osoby przy sesji zespołowej?", a: "Realnie 10-15 minut na dobry portret jednej osoby, wliczając ustawienie i kilka prób. Właśnie dlatego liczba osób to główny czynnik wyceny przy sesjach zespołowych — czas pracy rośnie wraz z wielkością grupy." },
    ],
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
    faq: [
      { q: "Czym różni się packshot od zdjęcia lifestyle?", a: "Packshot to produkt na białym tle — czysty, powtarzalny, podstawa karty produktu i wymóg większości platform sprzedażowych. Lifestyle pokazuje produkt w kontekście i realnej scenerii, budując emocje oraz pokazując skalę i zastosowanie. Packshot sprzedaje fakty, lifestyle wyobrażenie — sklepy łączące oba dają klientowi komplet informacji do decyzji." },
      { q: "Czy zdjęcia produktowe zmniejszają liczbę zwrotów?", a: "Tak. Kiedy klient dokładnie widzi, co kupuje — kolor, fakturę, proporcje i wykończenie — rzadziej jest rozczarowany po rozpakowaniu. Mniejsza rozbieżność między oczekiwaniem a rzeczywistością oznacza mniej zwrotów i mniej pytań kierowanych do obsługi sklepu." },
      { q: "Jak przygotować sesję zdjęciową produktów do sklepu internetowego?", a: "Przed sesją ustala się listę produktów, liczbę ujęć na produkt (front, tył, detale, produkt w użyciu) oraz docelowe proporcje kadru pod konkretny sklep. Dobry plan pozwala odfotografować większą partię produktów sprawnie i bez chaosu, a katalog zachowuje jeden spójny standard tła, światła i kadru." },
    ],
    title: "Fotografia produktowa dla e-commerce: jak zdjęcia wpływają na sprzedaż",
    excerpt:
      "W e-commerce klient kupuje to, co widzi na zdjęciu. Jak packshot i lifestyle, spójność katalogu i kadr pod mobile realnie wpływają na sprzedaż.",
    category: "branża",
    date: "2026-04-14",
    readTime: 6,
    thumbnail: "/images/blog/fotografia-produktowa-ecommerce-3.jpg",
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
      <p>Przed sesją ustalamy listę produktów, liczbę ujęć na produkt (front, tył, detale, w użyciu) i docelowe proporcje kadru pod Twój sklep. Dobry plan pozwala odfotografować większą partię sprawnie i bez chaosu. Sesję zrealizujemy w moim studiu w Poznaniu albo z dojazdem — pracuję dla klientów w całej Polsce.</p>
      <p>Zobacz <a href="/portfolio/artech-fotografia-produktowa">realizacje packshotów produktowych</a>, policz zakres w <a href="/kalkulator">kalkulatorze</a> i <a href="/kontakt">napisz, co chcesz sfotografować</a>.</p>
    `,
    seo: {
      title: "Fotografia produktowa dla e-commerce | Marcin Szabunia",
      description:
        "Jak zdjęcia produktowe wpływają na sprzedaż w e-commerce: packshot vs lifestyle, spójność katalogu, kadr pod mobile i mniej zwrotów. Praktyczny przewodnik.",
    },
  },
  {
    slug: "wideo-marketing-dla-firm-formaty",
    faq: [
      { q: "Jaki format wideo wybrać na stronę firmową?", a: "Film wizerunkowy — wizytówka firmy w 60–120 sekundach, która odpowiada na pytania: kim jesteście, co robicie i dlaczego warto. Sprawdza się na stronie głównej, w stopce maila i prezentacjach sprzedażowych. To format „evergreen\", pracujący miesiącami, więc warto zrobić go porządnie." },
      { q: "Dlaczego testimonial wideo działa w B2B?", a: "Zadowolony klient mówiący o współpracy to jeden z najmocniejszych formatów B2B. Buduje zaufanie lepiej niż dowolny opis na stronie, bo to nie firma mówi o sobie — to ktoś inny mówi o niej, a taka rekomendacja jest dla odbiorcy dużo bardziej wiarygodna." },
      { q: "Czy warto łączyć zdjęcia i wideo na jednej realizacji?", a: "Tak, to najefektywniejsze podejście: jeden brief, jeden dzień zdjęciowy i spójny styl materiałów. Firma otrzymuje jednocześnie zdjęcia i wideo — na przykład na stronę i do social mediów — zamiast organizować dwie osobne realizacje z osobnymi briefami i terminami." },
    ],
    title: "Wideo marketing dla firm: jakie formaty naprawdę się sprawdzają",
    excerpt:
      "Film wizerunkowy, pionowy reels, testimonial czy aftermovie z eventu? Przegląd formatów wideo marketingu dla firm i tego, gdzie każdy z nich naprawdę działa.",
    category: "poradnik",
    date: "2026-05-12",
    readTime: 6,
    thumbnail: "/images/blog/wideo-marketing-dla-firm-formaty-2.jpg",
    content: `
      <p class="lead">„Potrzebujemy wideo" to dopiero początek rozmowy. Bo film wizerunkowy, pionowy reels i materiał z eventu to zupełnie różne formaty, które rozwiązują różne problemy. Oto przegląd formatów <a href="/uslugi/wideo-marketing">wideo marketingu dla firm</a> i tego, gdzie każdy się sprawdza.</p>

      <h2>1. Film wizerunkowy (film korporacyjny)</h2>
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
      <p>Najefektywniej jest łączyć materiał foto i wideo na jednej realizacji: jeden brief, jeden dzień, spójny styl. Bazuję w Poznaniu, a realizacje prowadzę w całej Polsce i Europie. Sprawdź <a href="/uslugi/pakiety-foto-wideo">pakiety foto + wideo</a>, oszacuj zakres w <a href="/kalkulator">kalkulatorze</a> i <a href="/kontakt">opisz swój projekt</a>. Podpowiem, który format da najwięcej przy Twoim budżecie.</p>
    `,
    seo: {
      title: "Wideo marketing dla firm: jakie formaty | Marcin Szabunia",
      description:
        "Film wizerunkowy, reels, testimonial, wideo produktowe, relacja z eventu, przegląd formatów wideo marketingu B2B i tego, gdzie każdy się sprawdza.",
    },
  },
  {
    slug: "sesja-wizerunkowa-poznan",
    faq: [
      { q: "Studio czy własne biuro — gdzie zrobić sesję wizerunkową?", a: "Studio daje pełną kontrolę nad światłem i powtarzalny, ponadczasowy portret — idealne na headshoty, portrety zarządu i zdjęcia do mediów. Sesja w biurze pokazuje realną przestrzeń marki i nie wyrywa zespołu z pracy: fotograf przyjeżdża z mobilnym studiem, którego rozłożenie zajmuje około 20 minut." },
      { q: "Czy dojazd na sesję na terenie Poznania jest dodatkowo płatny?", a: "Nie. Fotograf bazuje w Poznaniu, więc dojazd na terenie miasta jest wliczony w cenę — niezależnie od tego, czy sesja odbywa się w studiu, w Twoim biurze, czy w plenerze. Realizacje poza Poznaniem ustalane są indywidualnie." },
      { q: "Dla kogo sprawdzi się sesja wizerunkowa w plenerze?", a: "Plener daje zdjęciom charakter i „oddech\" — świetnie sprawdza się w personal brandingu, u twórców i przy mniej formalnych wizerunkach. Poznań oferuje różnorodne tła: architekturę Starego Miasta, nowoczesne dzielnice biurowe czy zieleń nad Wartą. Minusem jest zależność od pogody i pory dnia." },
    ],
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
      <p>Sesja u Ciebie w firmie ma dwie wielkie zalety: pokazuje realną przestrzeń marki i nie wyrywa zespołu z pracy na pół dnia. Przyjeżdżam z mobilnym studiem, rozłożenie zajmuje ok. 20 minut, a potem fotografuję w Waszym rytmie. To naturalny wybór dla <a href="/uslugi/sesje-zespolowe">sesji zespołowych</a> i zdjęć pokazujących firmę „od środka".</p>
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
      <p>Zobacz <a href="/galeria?kat=portrety">realizacje sesji wizerunkowych</a> i <a href="/portfolio/idcom-headshoty-zespolu">sesji korporacyjnych</a>, oszacuj zakres w <a href="/kalkulator">kalkulatorze</a>, a potem <a href="/kontakt">napisz, co chcesz osiągnąć</a>. Dobiorę miejsce pod Twój cel.</p>
    `,
    seo: {
      title: "Sesja wizerunkowa Poznań: gdzie ją zrobić | Marcin Szabunia",
      description:
        "Gdzie zrobić sesję wizerunkową w Poznaniu: studio, biuro czy plener? Porównanie podejść, plusy i minusy każdego, dojazd na terenie Poznania w cenie.",
    },
  },
  {
    slug: "zdjecia-ai-vs-profesjonalna-sesja",
    faq: [
      { q: "Kiedy zdjęcia z generatora AI wystarczą?", a: "AI sprawdza się tam, gdzie liczy się tempo i niska cena: przy szybkich eksperymentach z tłem, kadrem czy stylizacją oraz przy pomocniczych awatarach do wewnętrznych narzędzi, roboczych prezentacji i prototypów. Prosta zasada: im dalej od twarzy marki, tym więcej miejsca na AI." },
      { q: "Dlaczego headshot z AI nie sprawdza się w B2B?", a: "AI wygładza i zmienia rysy, więc klient może Cię nie rozpoznać na żywo, a to podważa wiarygodność. Generatory wciąż mylą się w detalach (dłonie, biżuteria, logo, faktura tkaniny), efekt rzadko pasuje stylem do reszty zdjęć firmy, a rozpoznana „twarz z generatora\" sygnalizuje, że marka idzie na skróty." },
      { q: "Czy AI zastąpi profesjonalną sesję wizerunkową?", a: "Nie — AI to narzędzie, a nie zamiennik. Świetnie działa przy szkicach i zastosowaniach pomocniczych, ale zawodzi wszędzie tam, gdzie liczy się, że zdjęcie przedstawia naprawdę Ciebie. Twarz prezesa na stronie głównej czy profil handlowca, na podstawie których ktoś decyduje o współpracy, wymagają realnej sesji." },
    ],
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
      <p>Zobacz <a href="/galeria?kat=portrety">realizacje sesji wizerunkowych</a> albo od razu <a href="/kontakt">napisz, czego potrzebujesz</a>. Podpowiem, ile ujęć i wariantów realnie wystarczy. Bazuję w Poznaniu, a sesje realizuję w całej Polsce i Europie.</p>
    `,
    seo: {
      title: "Zdjęcia AI vs profesjonalna sesja | Marcin Szabunia",
      description:
        "Headshot z generatora AI czy profesjonalna sesja? Porównanie kosztów, wiarygodności, zgodności z wizerunkiem i ryzyk. Kiedy AI wystarczy, a kiedy szkodzi marce.",
    },
  },
  {
    slug: "co-zalozyc-na-sesje-biznesowa",
    faq: [
      { q: "Jakie kolory najlepiej wychodzą na zdjęciach biznesowych?", a: "Stonowane, jednolite barwy: granat, grafit, szarość, biel, butelkowa zieleń i burgund. Pozwalają skupić uwagę na twarzy, a nie na ubraniu. Ostrożnie z czystą czernią, która bywa ciężka, oraz z jaskrawymi neonami. Jeśli firma ma mocną identyfikację, jej kolor warto wpleść w detal stylizacji." },
      { q: "Jakich materiałów i wzorów unikać na sesji biznesowej?", a: "Unikaj drobnej kratki i wąskich pasków, które potrafią „migotać\" na zdjęciu (efekt mory), oraz połyskliwych satyn odbijających światło. Stawiaj na matowe, gęste tkaniny dobrej jakości i gładkie faktury. Ubranie, które po prostu dobrze leży, wygrywa z drogim, ale źle skrojonym." },
      { q: "Co spakować na sesję biznesową?", a: "Przygotuj 2-3 stylizacje przewiezione na wieszaku (nie zwinięte w torbie), zapasową koszulę lub bluzkę w neutralnym kolorze oraz wałek do ubrań i drobne przybory na ostatnie poprawki. Zabierz też strój, w którym czujesz się najpewniej — komfort widać na twarzy." },
    ],
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
      <p>Resztę przygotowań znajdziesz w poradniku <a href="/blog/jak-przygotowac-sie-do-sesji-biznesowej">jak przygotować się do sesji biznesowej</a>. Zobacz też, jak <a href="/blog/headshoty-linkedin-konwersja">headshot pracuje na konwersję na LinkedIn</a>, i przejrzyj <a href="/galeria?kat=portrety">przykładowe realizacje</a>. Gotowy? <a href="/kontakt">Napisz do mnie</a>, umówimy termin — odpowiadam w ciągu 24h. Sesje realizuję w Poznaniu, a także w całej Polsce i Europie.</p>
    `,
    seo: {
      title: "Co założyć na sesję biznesową: stylizacje | Marcin Szabunia",
      description:
        "Jak ubrać się na sesję wizerunkową: kolory, które dobrze wyglądają na zdjęciach, fasony, materiały i błędy do uniknięcia. Praktyczny przewodnik krok po kroku.",
    },
  },
  {
    slug: "zdjecia-na-strone-firmowa",
    faq: [
      { q: "Jakich zdjęć potrzebuje strona internetowa firmy?", a: "Kompletny zestaw obejmuje: mocne autorskie zdjęcie hero na pierwszy ekran, spójne portrety zespołu do sekcji „o nas\", zdjęcia biura i przestrzeni firmy, zdjęcia produktów lub usług (packshot plus ujęcia w kontekście) oraz materiał z realizacji do sekcji portfolio. Uzupełnieniem może być krótki film wizerunkowy." },
      { q: "Dlaczego nie warto używać zdjęć stockowych na stronie firmowej?", a: "Stocki mają trzy wady: każdy ma do nich dostęp, więc konkurent może użyć tego samego zdjęcia, nie pokazują realnej firmy i często widać w nich sztuczność. Autentyczne, autorskie zdjęcia odróżniają markę, podczas gdy stock upodabnia ją do innych." },
      { q: "Jak zaplanować zdjęcia na stronę firmową?", a: "Najtaniej i najspójniej jest zebrać potrzeby z całej strony i zrealizować je w jednej, dobrze zaplanowanej sesji albo serii sesji. Praca zaczyna się od listy sekcji i ujęć, potem dobiera się lokalizację i styl, a efektem jest komplet spójnego materiału na wszystkie sekcje." },
    ],
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
      <p>Zdjęcia realnej przestrzeni, biura, sali konferencyjnej, hali, pokazują skalę i charakter firmy oraz uwiarygadniają markę. To naturalna część <a href="/portfolio/idcom-headshoty-zespolu">sesji korporacyjnej</a>, którą można zrealizować przy okazji portretów zespołu.</p>

      <h2>Produkty i usługi</h2>
      <p>Jeśli sprzedajesz produkty, potrzebujesz spójnego zestawu zdjęć: packshot na białym tle plus ujęcia w kontekście. Jak to przekłada się na sprzedaż, rozkładam w tekście o <a href="/blog/fotografia-produktowa-ecommerce">fotografii produktowej dla e-commerce</a>. Usługi też da się pokazać obrazem: proces, efekt, ludzie przy pracy.</p>

      <h2>Realizacje i portfolio</h2>
      <p>Sekcja „co już zrobiliśmy" to dowód kompetencji. Zdjęcia z wdrożeń, eventów czy gotowych projektów działają mocniej niż deklaracje. Jeśli organizujesz wydarzenia, warto mieć materiał z <a href="/uslugi/eventy-reportaze">reportażu</a>.</p>

      <h2>Wideo na stronie</h2>
      <p>Krótki film wizerunkowy na stronie głównej potrafi zatrzymać uwagę dłużej niż statyczny obraz. <a href="/uslugi/wideo-marketing">Wideo marketing</a> najlepiej zaplanować razem z sesją foto, jeden dzień, spójny styl, materiał na stronę i social media naraz.</p>

      <h2>Dlaczego nie zdjęcia stockowe</h2>
      <p>Stocki są wygodne, ale mają trzy wady: każdy ma do nich dostęp (Twój konkurent może użyć tego samego zdjęcia), nie pokazują Twojej realnej firmy i często widać w nich „sztuczność". Autentyczne, autorskie zdjęcia odróżniają markę, stock ją upodabnia do innych.</p>

      <h2>Jak to zaplanować</h2>
      <p>Najtaniej i najspójniej jest zebrać potrzeby z całej strony i zrealizować je w jednej, dobrze zaplanowanej sesji (albo serii). Zaczynamy od listy sekcji i ujęć, dobieramy lokalizację i styl, a Ty dostajesz komplet spójnego materiału. Działam z Poznania — tu dojazd masz w cenie, a sesje realizuję w całej Polsce i Europie. Oszacuj zakres w <a href="/kalkulator">kalkulatorze</a>, przejrzyj <a href="/portfolio/idcom-headshoty-zespolu">realizacje</a> i <a href="/kontakt">napisz, co jest na Twojej stronie</a>, ułożymy plan zdjęć pod nią.</p>
    `,
    seo: {
      title: "Jakie zdjęcia na stronę firmową: lista | Marcin Szabunia",
      description:
        "Jakich zdjęć potrzebuje strona internetowa firmy: hero, zespół, biuro, produkty, realizacje. Lista sekcja po sekcji i dlaczego warto zrezygnować ze stocków.",
    },
  },
  {
    slug: "slownik-pojec-wideo",
    faq: [
      { q: "Co to jest b-roll?", a: "B-roll to ujęcia uzupełniające: detale biura, dłonie przy pracy, maszyny w ruchu, przebitki z eventu. Same w sobie nie opowiadają historii, ale sprawiają, że film nie jest jedną gadającą głową. Im lepszy b-roll, tym dynamiczniejszy montaż gotowego materiału." },
      { q: "Co to jest setka w wideo?", a: "Setka to wypowiedź wprost do kamery — eksperta, prezesa albo uczestnika eventu. Nazwa pochodzi z żargonu telewizyjnego; po angielsku mówi się talking head. Setki najlepiej nagrywać w kontrolowanych warunkach, na przykład w mobilnym studiu z porządnym światłem i dźwiękiem." },
      { q: "Czym jest color grading?", a: "Color grading to nadawanie filmowi spójnego charakteru kolorystycznego — cieplejszego i bardziej kinowego albo chłodnego i technologicznego. To ostatni etap postprodukcji, dzięki któremu materiał wygląda profesjonalnie i spójnie z marką." },
    ],
    title: "Co to jest b-roll? Słownik pojęć wideo, które warto znać",
    excerpt:
      "Reels, b-roll, color grading, teaser, setka. Krótki słownik pojęć, które padają przy zamawianiu wideo dla firmy, wyjaśniony prostym językiem, bez branżowego żargonu.",
    category: "poradnik",
    date: "2026-06-12",
    readTime: 7,
    thumbnail: "/images/blog/slownik-pojec-wideo.jpg",
    content: `
      <p class="lead">Zamawiasz wideo dla firmy i nagle z oferty wyskakują słowa: b-roll, color grading, setka, recap. Branża wideo ma swój żargon, ale Ty nie musisz go znać, żeby dobrze zamówić. Oto słownik pojęć, które najczęściej padają w rozmowach o filmach dla firm, wyjaśniony prostym językiem.</p>

      <h2>Reels (rolka)</h2>
      <p>Krótkie pionowe wideo pod Instagram, TikTok i YouTube Shorts, zwykle do 30 sekund. Najszybciej rosnący format w social media i podstawa większości firmowych strategii wideo. Przykład: trzy pionowe reelsy z wywiadami, które zrealizowałem dla wydarzenia <a href="/portfolio/woohoo-autopay">E-commerce All In</a>.</p>

      <h2>Format pionowy i poziomy (9:16 i 16:9)</h2>
      <p>Proporcje kadru. Pionowy 9:16 to standard telefonu: reelsy, stories, Shorts. Poziomy 16:9 to YouTube, strona internetowa i prezentacje. Ten sam materiał rzadko działa dobrze w obu naraz, dlatego formaty planuje się przed zdjęciami, a nie po nich. Więcej w tekście o <a href="/blog/wideo-marketing-dla-firm-formaty">formatach wideo dla firm</a>.</p>

      <h2>B-roll</h2>
      <p>Ujęcia uzupełniające: detale biura, dłonie przy pracy, maszyny w ruchu, przebitki z eventu. Same w sobie nie opowiadają historii, ale to one sprawiają, że film nie jest jedną gadającą głową. Im lepszy b-roll, tym dynamiczniejszy montaż.</p>

      <h2>Setka (talking head)</h2>
      <p>Wypowiedź wprost do kamery: ekspert, prezes, uczestnik eventu. Nazwa pochodzi z żargonu telewizyjnego, po angielsku mówi się talking head. Setki najlepiej nagrywać w kontrolowanych warunkach, dlatego na eventach buduję mobilne studio do filmowania z porządnym światłem i dźwiękiem.</p>

      <h2>Teaser</h2>
      <p>Bardzo krótka zapowiedź, do 15 sekund. Pojedyncze najmocniejsze ujęcia, dynamiczny montaż, logo i data. Idealny do podgrzania atmosfery przed wydarzeniem albo jako szybka reklama. W moim cenniku to najtańszy pakiet montażowy.</p>

      <h2>Event recap (aftermovie)</h2>
      <p>Film podsumowujący wydarzenie, zwykle do 60-90 sekund: najlepsze momenty, emocje, skala. Pokazuje sponsorom i przyszłym uczestnikom, dlaczego warto być na kolejnej edycji. Przykład znajdziesz w <a href="/portfolio/woohoo-autopay">realizacji dla E-commerce All In</a>.</p>

      <h2>Film wizerunkowy</h2>
      <p>Dłuższa forma o firmie: kim jesteście, jak pracujecie, dlaczego warto Wam zaufać. Działa na stronie internetowej i w rozmowach handlowych. Dobry przykład to <a href="/portfolio/artech-fotografia-produktowa">film z hali produkcyjnej dla Artech Group</a>: zamiast opisywać park maszynowy, firma po prostu go pokazuje.</p>

      <h2>Montaż</h2>
      <p>Składanie nagranego materiału w gotowy film: wybór ujęć, rytm, muzyka, napisy, dźwięk. To na montażu film zyskuje tempo i sens, dlatego w moich pakietach wideo montaż i postprodukcja są zawsze w cenie, z ustalonymi turami poprawek.</p>

      <h2>Color grading</h2>
      <p>Nadawanie filmowi spójnego charakteru kolorystycznego: cieplejszy i bardziej kinowy albo chłodny i technologiczny. To ostatni etap postprodukcji, dzięki któremu materiał wygląda profesjonalnie i spójnie z marką.</p>

      <h2>Gimbal (stabilizacja)</h2>
      <p>Urządzenie, które utrzymuje kamerę w idealnie płynnym ruchu. Dzięki niemu ujęcia z przejść po biurze czy evencie wyglądają filmowo, a nie jak z ręki. Standard przy każdej mojej realizacji wideo.</p>

      <h2>Ujęcia z drona</h2>
      <p>Zdjęcia i wideo z powietrza: budynek firmy, teren zakładu, skala wydarzenia. Latam dronem DJI, mam certyfikat operatora A1/A3 i ubezpieczenie OC, więc strona formalna jest po mojej stronie. Przy odpowiednich zgodach da się latać nawet w środku obiektu, jak przy <a href="/portfolio/woohoo-autopay">evencie na Enea Stadion</a>, gdzie dron latał wewnątrz stadionu.</p>

      <h2>Mikroport</h2>
      <p>Mały bezprzewodowy mikrofon przypinany do ubrania osoby mówiącej. To różnica między dźwiękiem, którego da się słuchać, a takim, który ginie w echu sali. Przy wywiadach i setkach to pozycja obowiązkowa.</p>

      <h2>Voice-over (lektor)</h2>
      <p>Głos czytający tekst poza kadrem. Prowadzi widza przez film, kiedy nie ma wypowiedzi do kamery albo trzeba połączyć różne wątki w jedną historię.</p>

      <h2>Napisy</h2>
      <p>Większość ludzi ogląda wideo w social media bez dźwięku, dlatego napisy to nie dodatek, tylko standard. Dobre napisy są zsynchronizowane, czytelne na telefonie i spójne z identyfikacją marki.</p>

      <h2>Tury poprawek</h2>
      <p>Liczba rund uwag, które możesz zgłosić do montażu w cenie. U mnie wideo ma 3 tury poprawek w cenie, a w praktyce pierwsza prawie zawsze wystarcza, bo zakres i styl ustalamy przed realizacją.</p>

      <h2>Nie musisz znać żargonu</h2>
      <p>Wystarczy, że wiesz, co chcesz osiągnąć: resztę przetłumaczymy wspólnie na konkretny plan realizacji. Zobacz <a href="/uslugi/wideo-marketing">ofertę wideo marketingu</a> i <a href="/uslugi/pakiety-foto-wideo">pakiety foto + wideo</a>, oszacuj koszt w <a href="/kalkulator">kalkulatorze wyceny</a> albo po prostu <a href="/kontakt">napisz, czego potrzebujesz</a>, własnymi słowami. Odpowiem w 24h.</p>
    `,
    seo: {
      title: "Co to jest b-roll? Słownik pojęć wideo | Marcin Szabunia",
      description:
        "Reels, b-roll, color grading, teaser, setka, recap, gimbal. Słownik pojęć wideo marketingu dla firm wyjaśniony prostym językiem, bez żargonu.",
    },
  },
  {
    slug: "co-to-jest-packshot",
    faq: [
      { q: "Co to jest packshot?", a: "Packshot to zdjęcie produktu na jednolitym, najczęściej białym tle — czyste, powtarzalne i pozbawione rozpraszaczy. Odpowiada na pytanie, jak dokładnie wygląda dana rzecz. To podstawa karty produktu w sklepie internetowym i standard wymagany przez większość marketplace'ów." },
      { q: "Czy fotograf przekazuje klientowi pliki RAW?", a: "Standardowo nie. RAW to surowy plik z aparatu, cyfrowy odpowiednik negatywu — zawiera pełne dane obrazu, ale wymaga obróbki i nie nadaje się do bezpośredniej publikacji. Klient otrzymuje gotowy, spójny materiał po autorskiej postprodukcji, podobnie jak drukarnia nie oddaje projektów otwartych." },
      { q: "Co obejmuje licencja na zdjęcia biznesowe?", a: "Licencja określa, gdzie i jak można używać zdjęć. Standardowo obejmuje pełny użytek komercyjny: stronę internetową, social media, druk i reklamę online, bez limitów czasowych. Szerszy zakres, na przykład ogólnopolską kampanię outdoor, ustala się indywidualnie przy wycenie." },
    ],
    title: "Co to jest packshot? Słownik pojęć fotografii, które warto znać",
    excerpt:
      "Packshot, lifestyle, headshot, brief, RAW, retusz. Krótki słownik pojęć, które padają przy zamawianiu zdjęć dla firmy, wyjaśniony prostym językiem, bez branżowego żargonu.",
    category: "poradnik",
    date: "2026-06-11",
    readTime: 7,
    thumbnail: "/images/blog/co-to-jest-packshot.jpg",
    content: `
      <p class="lead">Zamawiasz zdjęcia dla firmy i nagle z oferty wyskakują słowa: packshot, lifestyle, poseboard, live editing. Branża fotograficzna lubi swój żargon, ale Ty nie musisz go znać, żeby dobrze zamówić. Oto słownik pojęć, które najczęściej padają w rozmowach z klientami, wyjaśniony prostym językiem.</p>

      <h2>Packshot</h2>
      <p>Zdjęcie produktu na jednolitym, najczęściej białym tle. Czyste, powtarzalne, bez rozpraszaczy: sam produkt, idealnie oświetlony. To podstawa karty produktu w sklepie internetowym i standard wymagany przez większość marketplace'ów. Packshot odpowiada na pytanie „jak dokładnie wygląda ta rzecz". W mojej ofercie znajdziesz go w <a href="/uslugi/fotografia-produktowa">fotografii produktowej</a>, od 55 zł za sztukę przy większych seriach.</p>

      <h2>Zdjęcie lifestyle</h2>
      <p>Przeciwieństwo packshota: produkt pokazany w użyciu, w realnej scenerii. Kubek na stole przy porannej kawie, kosmetyk w dłoni, butelka na evencie. Lifestyle buduje emocje i kontekst, packshot podaje fakty. Dobry sklep potrzebuje obu, o czym piszę więcej w tekście o <a href="/blog/fotografia-produktowa-ecommerce">fotografii produktowej dla e-commerce</a>.</p>

      <h2>Headshot</h2>
      <p>Portret od ramion w górę, z twarzą zajmującą większość kadru. Standard na LinkedIn, stronę firmową i materiały prasowe. Dobry headshot buduje zaufanie zanim ktokolwiek przeczyta Twoje CV czy ofertę. Sprawdź, <a href="/blog/headshoty-linkedin-konwersja">jak headshot wpływa na konwersję na LinkedIn</a>.</p>

      <h2>Sesja wizerunkowa i personal branding</h2>
      <p>Szersza wersja sesji portretowej: nie tylko twarz, ale cały wizerunek eksperta lub marki osobistej. Różne kadry, stylizacje i scenerie do wykorzystania na stronie, w social media i materiałach sprzedażowych. Więcej w opisie <a href="/uslugi/wizerunek-portrety">sesji wizerunkowych</a>.</p>

      <h2>Brief</h2>
      <p>Krótki opis tego, czego potrzebujesz: cel zdjęć, gdzie będą używane, termin, lokalizacja, liczba osób lub produktów. Nie musi być formalnym dokumentem, wystarczy kilka zdań w mailu. Dobry brief to połowa udanej sesji, bo fotograf od początku wie, na czym Ci zależy.</p>

      <h2>Poseboard</h2>
      <p>Zestaw przykładowych póz i kadrów, który przygotowuję przed sesją portretową. Dzięki niemu nie musisz zastanawiać się, co zrobić z rękami: na planie po prostu odtwarzamy sprawdzone ustawienia dopasowane do Twojego celu. Dostajesz go gratis przy każdej sesji portretowej.</p>

      <h2>Reportaż (fotoreportaż)</h2>
      <p>Styl fotografowania wydarzeń, w którym fotograf dokumentuje to, co dzieje się naprawdę, bez ustawiania i pozowania. Naturalne emocje, networking, przemówienia, kuluary. Standard na konferencjach i galach. Porównanie z sesją eventową znajdziesz <a href="/blog/fotografia-eventowa-vs-reportaz">w osobnym wpisie</a>.</p>

      <h2>Live editing</h2>
      <p>Obróbka i dostarczanie zdjęć jeszcze w trakcie wydarzenia. Organizator dostaje gotowe kadry do publikacji w social media, zanim event się skończy. Opcja dodatkowa przy <a href="/uslugi/eventy-reportaze">reportażach eventowych</a>, wyceniana za zdjęcie.</p>

      <h2>Mobilne studio</h2>
      <p>Pełny zestaw studyjny (tło, oświetlenie, stanowisko), który przywożę do Twojego biura. Rozstawienie zajmuje około 30 minut, a zespół fotografuje się na miejscu, bez wysyłania ludzi przez pół miasta. Bazuję w Poznaniu, gdzie dojazd jest w cenie (0 zł); poza miastem doliczam 2,50 zł netto za kilometr, licząc od granic miasta w obie strony. Podstawa <a href="/uslugi/sesje-zespolowe">sesji zespołowych</a>.</p>

      <h2>RAW</h2>
      <p>Surowy plik z aparatu, cyfrowy odpowiednik negatywu. Zawiera pełne dane obrazu, ale wymaga obróbki i nie nadaje się do bezpośredniej publikacji. Fotografowie standardowo nie przekazują RAW-ów, tak jak drukarnia nie oddaje projektów otwartych: oddaję gotowy, spójny materiał po autorskiej postprodukcji.</p>

      <h2>Retusz i postprodukcja</h2>
      <p>Postprodukcja to cała obróbka po sesji: selekcja, kolory, kontrast, kadrowanie. Retusz to jej precyzyjna część dotycząca detali: niedoskonałości skóry, refleksy na okularach, drobne poprawki tła. W moich pakietach każde finalne zdjęcie przechodzi oba etapy, a w cenie masz ustalone tury poprawek.</p>

      <h2>Licencja</h2>
      <p>Określa, gdzie i jak możesz używać zdjęć. W moim standardzie licencja obejmuje pełny użytek komercyjny: strona www, social media, druk, reklama online, bez limitów czasowych. Szerszy zakres (np. ogólnopolska kampania outdoor) ustalamy indywidualnie przy wycenie.</p>

      <h2>Nie musisz znać żargonu</h2>
      <p>Wystarczy, że wiesz, co chcesz osiągnąć: resztę przetłumaczymy wspólnie na konkretny plan sesji. Oszacuj koszt w <a href="/kalkulator">kalkulatorze wyceny</a> albo po prostu <a href="/kontakt">napisz, czego potrzebujesz</a>, własnymi słowami. Odpowiem w 24h.</p>
    `,
    seo: {
      title: "Co to jest packshot? Słownik fotografii | Marcin Szabunia",
      description:
        "Packshot, lifestyle, headshot, brief, RAW, retusz, licencja. Słownik pojęć fotografii biznesowej i produktowej wyjaśniony prostym językiem, bez żargonu.",
    },
  },
  {
    slug: "zdjecia-film-z-drona-dla-firm",
    faq: [
      { q: "Czy komercyjne loty dronem dla firm są legalne?", a: "Tak, loty komercyjne dronem są w Polsce uregulowane i wymagają uprawnień. Po stronie operatora jest komplet formalności: certyfikat A1/A3 zgodny z przepisami unijnymi, ubezpieczenie OC oraz uzyskanie zgód przed lotem w strefach kontrolowanych. Strona formalna nie jest problemem klienta." },
      { q: "W jakiej formie dostanę materiał z drona?", a: "W zależności od celu materiał ma trzy formy: wyretuszowane zdjęcia do oferty i na stronę, zmontowany film 4K gotowy na stronę i social media albo przebitki 4K z korekcją barwną do własnego montażu. Jeśli potrzebujesz tylko surowca do swojego montażu, płacisz mniej." },
      { q: "Jak długo trwa realizacja zdjęć i filmu z drona?", a: "Zwykle godzina w powietrzu wystarcza na komplet ujęć jednego obiektu. Zdjęcia dostarczam do 14 dni, wideo do 21 dni roboczych, dostępny jest też tryb ekspresowy. Wcześniej ustalamy brief, ujęcia i sprawdzam, czy teren leży w strefie wymagającej zgody." },
    ],
    title: "Zdjęcia i film z drona dla firm: zastosowania, legalność i koszt",
    excerpt:
      "Do czego firmie zdjęcia i film z drona, jak wygląda realizacja, co z legalnością lotów i ile to kosztuje. Praktyczny przewodnik B2B z Poznania.",
    category: "poradnik",
    date: "2026-06-27",
    readTime: 7,
    thumbnail: "/images/blog/zdjecia-film-z-drona-dla-firm.jpg",
    content: `
      <p class="lead">Perspektywa z lotu ptaka pokazuje to, czego nie odda żadne zdjęcie z poziomu ziemi: skalę inwestycji, układ terenu, sąsiedztwo i kontekst całego obiektu. Dla firmy to nie efekt „wow" dla samego efektu, tylko konkretne narzędzie sprzedaży i dokumentacji. Poniżej tłumaczę, do czego realnie przydają się zdjęcia i film z drona, jak wygląda realizacja, co z legalnością lotów i od czego zależy koszt.</p>

      <h2>Do czego firmie zdjęcia i film z drona</h2>
      <p>Dron to jedno wejście, a kilka zupełnie różnych zastosowań. Najczęściej realizuję materiał dla:</p>
      <ul>
        <li><strong>Deweloperów i firm budowlanych:</strong> postęp prac, dokumentacja etapów, inwestycja pokazana w otoczeniu.</li>
        <li><strong>Przemysłu i logistyki:</strong> hale, place, tereny i infrastruktura w prawdziwej skali.</li>
        <li><strong>Hoteli i obiektów turystycznych:</strong> lokalizacja, otoczenie i atuty, których nie widać z ziemi.</li>
        <li><strong>Agencji nieruchomości:</strong> nieruchomości komercyjne i grunty z czytelnym kontekstem działki.</li>
        <li><strong>Organizatorów eventów:</strong> skala wydarzenia, scena i teren w jednym kadrze.</li>
        <li><strong>Marketingu i social mediów:</strong> dynamiczne ujęcia otwierające film firmowy albo reels.</li>
      </ul>
      <p>Wspólny mianownik jest prosty: dron sprzedaje <strong>skalę i kontekst</strong>. Odbiorca od razu rozumie, gdzie obiekt leży, jak duży jest i co ma wokół.</p>

      <h2>Co dostajesz: zdjęcia, film 4K albo przebitki do montażu</h2>
      <p>W zależności od celu materiał z drona dostarczam w trzech formach:</p>
      <ul>
        <li><strong>Zdjęcia z drona:</strong> wyretuszowane kadry do oferty, na stronę, do prospektu inwestycji.</li>
        <li><strong>Film z drona 4K:</strong> zmontowany, gotowy materiał na stronę i social media.</li>
        <li><strong>Przebitki 4K do montażu własnego:</strong> wyselekcjonowane ujęcia z korekcją barwną, bez montażu, gotowe do cięcia, jeśli masz własny zespół wideo.</li>
      </ul>
      <p>To rozróżnienie ma realne znaczenie dla budżetu. Jeśli nie potrzebujesz gotowego filmu, a tylko surowca do swojego montażu, płacisz mniej. Jeśli nie wiesz, czym różni się ujęcie od przebitki, zajrzyj do <a href="/blog/slownik-pojec-wideo">słownika pojęć wideo</a>.</p>

      <h2>Jak wygląda realizacja krok po kroku</h2>
      <p>Przebieg jest powtarzalny i bez niespodzianek:</p>
      <ul>
        <li><strong>Brief i zgody:</strong> ustalamy ujęcia, lokalizację i sprawdzam, czy teren leży w strefie wymagającej zgody.</li>
        <li><strong>Lot:</strong> zdjęcia i wideo w 4K. Zwykle godzina w powietrzu wystarcza na komplet ujęć jednego obiektu.</li>
        <li><strong>Postprodukcja:</strong> retusz zdjęć albo montaż filmu i korekcja barwna.</li>
        <li><strong>Dostawa:</strong> zdjęcia do 14 dni, wideo do 21 dni roboczych. Jest też tryb ekspresowy.</li>
      </ul>

      <h2>Legalność i bezpieczeństwo lotów</h2>
      <p>To pytanie pada najczęściej i słusznie. Loty komercyjne dronem są w Polsce uregulowane i wymagają uprawnień. Po mojej stronie jest komplet formalności:</p>
      <ul>
        <li><strong>Certyfikat operatora A1/A3</strong> zgodny z przepisami unijnymi.</li>
        <li><strong>Ubezpieczenie OC</strong> operatora drona.</li>
        <li><strong>Zgody w strefach kontrolowanych:</strong> w obszarach, które tego wymagają, uzyskuję zgodę przed lotem.</li>
      </ul>
      <p>W standardowych lokalizacjach latam bez dopłat, a w strefach kontrolowanych zgody wyceniam indywidualnie. Dla Ciebie oznacza to jedno: strona formalna nie jest Twoim problemem.</p>

      <h2>Orientacyjny koszt</h2>
      <p>Orientacyjnie, netto: przebitki 4K do montażu własnego od <strong>500 zł</strong>, zdjęcia z drona od <strong>600 zł</strong>, zmontowany film 4K od <strong>900 zł</strong>, a komplet z jednego lotu wychodzi taniej niż te same usługi zamawiane osobno. Pełne rozbicie ceny na czynniki (warianty, czas lotu, strefy) znajdziesz we wpisie <a href="/blog/ile-kosztuje-film-z-drona">ile kosztuje film z drona</a>.</p>

      <h2>Dron jako dodatek, nie tylko osobna usługa</h2>
      <p>Materiał z drona świetnie łączy się z sesją naziemną. Na <a href="/uslugi/eventy-reportaze">evencie</a> kilka ujęć z góry pokazuje skalę wydarzenia, a w filmie firmowym otwierają one całość i nadają jej rozmach. Z jednego wejścia powstaje wtedy spójny komplet foto i wideo, bez logistyki dwóch ekip.</p>

      <h2>Podsumowanie</h2>
      <p>Zdjęcia i film z drona to dla firmy narzędzie, które sprzedaje skalę i kontekst, a przy okazji wyróżnia materiał na tle konkurencji. Najważniejsze: ustal cel (zdjęcia, gotowy film czy przebitki), a resztę, łącznie z formalnościami, zostaw operatorowi. Bazę mam w Poznaniu, a loty realizuję w całej Polsce: w Poznaniu bez kosztów dojazdu, poza miastem dochodzi dojazd 2,50 zł netto/km liczony od granic miasta.</p>
      <p>Zobacz <a href="/galeria?kat=dron">przykładowe kadry z drona</a> albo od razu <a href="/uslugi/zdjecia-wideo-z-drona">zapytaj o wycenę</a> swojego obiektu.</p>
    `,
    seo: {
      title: "Zdjęcia i film z drona dla firm: koszt | Marcin Szabunia",
      description:
        "Zastosowania zdjęć i filmów z drona w B2B, przebieg realizacji, legalność (A1/A3, OC, PAŻP) i koszt. Fotografia z drona dla firm, Poznań i cała Polska.",
    },
  },
  {
    slug: "foto-wideo-dron-z-jednego-wejscia",
    faq: [
      { q: "Co oznacza foto, wideo i dron „z jednego wejścia\"?", a: "To jeden twórca na planie, który tym samym okiem i w jednym standardzie realizuje zdjęcia, wideo i w razie potrzeby ujęcia z drona. Jest jeden brief, jeden harmonogram i jeden komplet materiału — bez dwóch stylów kolorystycznych i ekip wchodzących sobie w kadr." },
      { q: "Kiedy jeden twórca opłaca się bardziej niż dwie ekipy?", a: "Wtedy, gdy z jednego wydarzenia ma powstać kilka formatów: reportaż zdjęciowy, film podsumowujący, teaser do social mediów i ujęcia z drona — np. event, premiera albo dzień zdjęciowy pod stały content. Jeśli potrzebujesz tylko zdjęć albo tylko filmu, łączenie nie ma sensu." },
      { q: "Jak wyglądają terminy dostawy przy realizacji foto i wideo z jednego wejścia?", a: "Zdjęcia dostarczane są do 14 dni, wideo do 21 dni, całość w jednym spójnym standardzie. Na planie pracuję na dwóch aparatach równolegle, z dźwiękiem i dronem, jeśli jest w planie, a kolejność dnia układam tak, żeby foto i wideo nie wchodziły sobie w drogę." },
    ],
    title: "Foto, wideo i dron z jednego wejścia: dlaczego jeden twórca to mniej logistyki",
    excerpt:
      "Dwie osobne ekipy do zdjęć i wideo to więcej kosztów, koordynacji i ryzyka. Jeden twórca, który ogarnia foto, wideo i dron, daje spójny materiał i prostszą logistykę.",
    category: "branża",
    date: "2026-06-28",
    readTime: 5,
    thumbnail: "/images/blog/foto-wideo-dron-z-jednego-wejscia.jpg",
    content: `
      <p class="lead">Kiedy firma potrzebuje i zdjęć, i wideo, naturalny odruch to zatrudnić fotografa oraz osobno ekipę filmową. W praktyce oznacza to dwa briefy, dwa grafiki, dwie umowy i dwie wizje na jednym planie. Da się prościej. Jeden twórca, który ogarnia foto, wideo i dron z jednego wejścia, to mniej logistyki, spójny materiał i zwykle niższy koszt. Wyjaśniam, na czym to polega i kiedy się sprawdza.</p>

      <h2>Co znaczy „jedno wejście"</h2>
      <p>„Jedno wejście" to jeden twórca na planie, który tym samym okiem i w jednym standardzie realizuje zdjęcia, wideo, a w razie potrzeby ujęcia z drona. Nie ma przerzucania odpowiedzialnością między ekipami, nie ma dwóch różnych stylów kolorystycznych, nie ma sytuacji, w której fotograf i operator wchodzą sobie w kadr. Jest jeden brief, jeden harmonogram i jeden komplet materiału na koniec.</p>

      <h2>Co realnie zyskujesz</h2>
      <ul>
        <li><strong>Spójność materiału.</strong> Zdjęcia i wideo wyglądają, jakby pochodziły z tej samej produkcji, bo pochodzą. To samo światło, ta sama kolorystyka, ten sam klimat. Marka dostaje jednolity zestaw na stronę, do social mediów i materiałów firmowych.</li>
        <li><strong>Mniej logistyki.</strong> Ustalasz wszystko z jedną osobą: jeden kontakt, jeden brief, jedna faktura, jeden termin. Przy evencie to różnica między spokojnym dniem a żonglerką dwoma ekipami.</li>
        <li><strong>Niższy koszt.</strong> Nie płacisz dwóm zespołom za ten sam dzień i tę samą logistykę. Pakiet foto, wideo i dron z jednego wejścia wychodzi taniej niż te usługi zamawiane osobno.</li>
      </ul>

      <h2>Kiedy to się sprawdza</h2>
      <p>Model „jeden twórca" pasuje tam, gdzie z jednego wydarzenia ma powstać kilka rodzajów materiału:</p>
      <ul>
        <li><strong>Eventy i konferencje:</strong> reportaż zdjęciowy, film podsumowujący, krótki teaser do social mediów i ujęcia z drona pokazujące skalę, wszystko z jednego dnia.</li>
        <li><strong>Premiery i otwarcia:</strong> spójny zestaw foto i wideo do komunikacji i prasy.</li>
        <li><strong>Stały content:</strong> jeden dzień zdjęciowy, z którego powstaje paczka zdjęć i kilka reelsów do regularnych publikacji.</li>
      </ul>
      <p>Jeśli potrzebujesz tylko zdjęć albo tylko filmu, nie ma sensu na siłę łączyć. Siła „jednego wejścia" ujawnia się dopiero wtedy, gdy z jednego wydarzenia ma powstać więcej niż jeden format.</p>

      <h2>Jak wygląda realizacja</h2>
      <ul>
        <li><strong>Brief.</strong> Ustalamy cel, kluczowe momenty i to, co ma powstać (zdjęcia, film, teaser, dron).</li>
        <li><strong>Plan dnia.</strong> Układam kolejność tak, żeby foto i wideo nie wchodziły sobie w drogę, a dron złapał właściwe światło.</li>
        <li><strong>Realizacja.</strong> Pracuję na dwóch aparatach (foto i wideo równolegle), z dźwiękiem i dronem, jeśli jest w planie.</li>
        <li><strong>Dostawa.</strong> Zdjęcia do 14 dni, wideo do 21 dni, w jednym spójnym standardzie.</li>
      </ul>

      <h2>Podsumowanie</h2>
      <p>Jeden twórca od foto, wideo i drona to dla firmy prostsza logistyka, spójniejszy materiał i niższy koszt niż dwie osobne ekipy. Najwięcej zyskujesz tam, gdzie z jednego wejścia ma powstać kilka formatów: event, premiera, stały content. Pracuję z bazą w Poznaniu, a zlecenia realizuję w całej Polsce i Europie; na zapytania odpowiadam w ciągu 24 godzin.</p>
      <p>Zobacz <a href="/uslugi/pakiety-foto-wideo">pakiety foto, wideo i dron</a> albo <a href="/uslugi/eventy-reportaze">obsługę eventów</a>, a po przykłady realizacji zajrzyj do <a href="/galeria">galerii</a>.</p>
    `,
    seo: {
      title: "Foto, wideo i dron z jednego wejścia | Marcin Szabunia",
      description:
        "Dlaczego jeden twórca foto, wideo i dron to mniej logistyki, spójny materiał i niższy koszt niż dwie ekipy. Kompleksowa obsługa eventów i contentu, Poznań.",
    },
  },
  {
    slug: "obsluga-foto-wideo-eventu-firmowego",
    faq: [
      { q: "Co ustalić na briefie przed obsługą foto-wideo eventu?", a: "Cel materiału (relacja, employer branding, sprzedaż, prasa), kluczowe momenty, których nie można przegapić, najważniejsze osoby i gości, którzy muszą znaleźć się w kadrze, oraz formaty na wyjściu: zdjęcia, film, teaser, reelsy czy ujęcia z drona." },
      { q: "Co firma dostaje po evencie z kompleksowej obsługi foto-wideo?", a: "Reportaż zdjęciowy po selekcji i pełnej obróbce, film podsumowujący (recap) i krótszy teaser do social mediów, reelsy pionowe na Instagram czy TikTok, a przy opcji live editingu wybrane zdjęcia obrobione na bieżąco, gotowe do publikacji jeszcze tego samego dnia." },
      { q: "Jakie ujęcia to must-have na evencie firmowym?", a: "Scena i prelegenci (wystąpienia, slajdy, wręczenia, panel), ludzie i emocje (reakcje sali, rozmowy, networking), detale brandingu, cateringu i gadżetów oraz szerokie kadry pokazujące skalę, w tym ujęcia z drona przy dużych lub plenerowych wydarzeniach." },
    ],
    title: "Jak zaplanować kompleksową obsługę foto-wideo eventu firmowego",
    excerpt:
      "Event firmowy zdarza się raz. Jak zaplanować obsługę foto-wideo, żeby wyjść z kompletem materiału: brief, harmonogram, must-have ujęcia, dron i live editing.",
    category: "poradnik",
    date: "2026-06-28",
    readTime: 6,
    thumbnail: "/images/blog/obsluga-foto-wideo-eventu-firmowego.jpg",
    content: `
      <p class="lead">Event firmowy zdarza się raz. Nie ma drugiego podejścia, nie ma poprawek następnego dnia. Dlatego o materiale foto i wideo warto pomyśleć zanim zacznie się wydarzenie, a nie w jego trakcie. Oto praktyczny przewodnik, jak zaplanować kompleksową obsługę foto-wideo eventu, żeby wyjść z niego z kompletem materiału gotowym do publikacji.</p>

      <h2>Po co firmie foto i wideo z jednego eventu</h2>
      <p>Z jednego dobrze obfotografowanego i nagranego wydarzenia powstaje materiał, który pracuje przez kolejne miesiące: relacja na stronie, film podsumowujący do prezentacji handlowych, krótkie reelsy do social mediów, zdjęcia do materiałów prasowych. Jeden dzień, kilka formatów, długi okres użycia. Warunek jest jeden: trzeba to zaplanować.</p>

      <h2>Zacznij od briefu i celów</h2>
      <p>Zanim ustalimy godziny i ujęcia, odpowiadamy na pytanie, do czego materiał ma służyć. Inaczej fotografuje się event, z którego ma powstać prasowa relacja, a inaczej taki, który ma napędzić social media. Na briefie ustalamy:</p>
      <ul>
        <li>Cel: relacja, employer branding, sprzedaż, prasa.</li>
        <li>Kluczowe momenty, których nie można przegapić (wystąpienia, wręczenia, panel, networking).</li>
        <li>Najważniejsze osoby i goście, którzy muszą znaleźć się w kadrze.</li>
        <li>Formaty na wyjściu: zdjęcia, film, teaser, reelsy, ujęcia z drona.</li>
      </ul>

      <h2>Harmonogram dnia</h2>
      <p>Dobry plan to nie sztywny scenariusz, tylko mapa kluczowych momentów. Najważniejsze, żeby foto i wideo nie wchodziły sobie w drogę, a dron złapał właściwe światło, najlepiej przed zmrokiem. Przy całodniowym evencie zwykle wygląda to tak: ujęcia pustej sali i przygotowań, rejestracja gości, część oficjalna, przerwy i networking, część wieczorna. Z dronem planujemy okno na ujęcia z góry, gdy pozwala na to pogoda i przepisy.</p>

      <h2>Must-have ujęcia</h2>
      <p>Niezależnie od skali, kilka rzeczy powinno znaleźć się zawsze:</p>
      <ul>
        <li><strong>Scena i prelegenci:</strong> wystąpienia, slajdy, wręczenia, panel.</li>
        <li><strong>Ludzie:</strong> reakcje sali, rozmowy, networking, emocje.</li>
        <li><strong>Detale:</strong> branding, identyfikacja wizualna, catering, gadżety.</li>
        <li><strong>Skala:</strong> szerokie kadry sali i ujęcia z drona, jeśli event jest plenerowy lub duży.</li>
      </ul>
      <p>To te ujęcia budują później spójną relację i dają z czego montować film.</p>

      <h2>Co dostajesz po evencie</h2>
      <ul>
        <li><strong>Reportaż zdjęciowy</strong> po selekcji i pełnej obróbce.</li>
        <li><strong>Film podsumowujący</strong> (recap) i krótszy teaser do social mediów.</li>
        <li><strong>Reelsy pionowe</strong>, jeśli content ma trafić na Instagram czy TikTok.</li>
        <li><strong>Live editing:</strong> wybrane zdjęcia obrobione na bieżąco, jeszcze w trakcie eventu, gotowe do publikacji tego samego dnia.</li>
      </ul>

      <h2>Podsumowanie</h2>
      <p>Kompleksowa obsługa foto-wideo eventu zaczyna się od briefu, a nie od pierwszego zdjęcia. Ustal cel, kluczowe momenty i formaty, a resztę, łącznie z dronem i live editingiem, zaplanuj z wyprzedzeniem. Wtedy z jednego dnia wychodzi materiał na miesiące. Eventy obsługuję z bazy w Poznaniu — dojazd w granicach miasta jest bezpłatny, a realizacje prowadzę w całej Polsce i Europie.</p>
      <p>Zobacz <a href="/uslugi/pakiety-foto-wideo">pakiety foto, wideo i dron</a> oraz <a href="/uslugi/eventy-reportaze">reportaż z eventów</a>, a przykładowe kadry znajdziesz w <a href="/galeria?kat=eventy">galerii eventowej</a>.</p>
    `,
    seo: {
      title: "Obsługa foto-wideo eventu firmowego | Marcin Szabunia",
      description:
        "Praktyczny przewodnik: brief, harmonogram, must-have ujęcia, dron i live editing. Jak zaplanować kompleksową obsługę foto-wideo eventu firmowego. Poznań.",
    },
  },
  {
    slug: "pakiet-foto-wideo-czy-osobno",
    faq: [
      { q: "Kiedy pakiet foto + wideo + dron się opłaca?", a: "Gdy z jednego wydarzenia ma powstać kilka rodzajów materiału: zdjęcia, film i ujęcia pokazujące skalę — np. event albo konferencja. Jedna osoba ogarnia to taniej niż dwie ekipy za ten sam dzień, a materiał jest spójny i spięty jednym briefem, fakturą i terminem." },
      { q: "Kiedy lepiej zamówić usługi foto i wideo osobno?", a: "Gdy potrzebujesz tylko jednej rzeczy — samego reportażu zdjęciowego albo samego filmu — pakiet byłby przepłacaniem. Osobne usługi mają też sens przy dużej produkcji: wielokamerowym filmie ze scenariuszem i filmowym oświetleniem plus osobną ekipą fotograficzną, gdzie jeden twórca to za mało." },
      { q: "Na co patrzeć przy wyborze poza ceną?", a: "Na spójność (czy foto i wideo będą wyglądać jak komplet, czy jak dwa różne style), logistykę (ile osób koordynujesz w dniu wydarzenia), czas dostawy (jeden harmonogram postprodukcji zamiast czekania na dwie ekipy) oraz formalności — jedna umowa i faktura zamiast kilku." },
    ],
    title: "Pakiet foto + wideo + dron czy usługi osobno: co się bardziej opłaca firmie",
    excerpt:
      "Gotowy pakiet foto, wideo i dron u jednej osoby czy ekipa z osobnych specjalistów? Kiedy opłaca się pakiet, kiedy usługi osobno i na co patrzeć poza ceną.",
    category: "branża",
    date: "2026-06-28",
    readTime: 5,
    thumbnail: "/images/blog/pakiet-foto-wideo-czy-osobno.jpg",
    content: `
      <p class="lead">Firma, która potrzebuje zdjęć i filmu z jednego wydarzenia, staje przed wyborem: zamówić gotowy pakiet foto, wideo i dron u jednej osoby, czy złożyć ekipę z osobnych specjalistów. Obie drogi mają sens, ale w różnych sytuacjach. Poniżej tłumaczę, kiedy bardziej opłaca się pakiet, a kiedy usługi osobno, i na co realnie patrzeć poza ceną.</p>

      <h2>Co zwykle wchodzi w pakiet</h2>
      <p>Pakiet foto + wideo + dron z jednego wejścia to jeden twórca, który w jednym standardzie realizuje zdjęcia, film i ujęcia z powietrza. Z jednego dnia dostajesz reportaż zdjęciowy, film podsumowujący, krótki teaser do social mediów i ujęcia z drona, a wszystko spięte jednym briefem, jedną fakturą i jednym terminem.</p>

      <h2>Kiedy pakiet się opłaca</h2>
      <p>Pakiet wygrywa wtedy, gdy z jednego wydarzenia ma powstać kilka rodzajów materiału:</p>
      <ul>
        <li><strong>Eventy i konferencje:</strong> potrzebujesz i zdjęć, i filmu, i ujęć pokazujących skalę. Jedna osoba ogarnia to taniej niż dwie ekipy za ten sam dzień.</li>
        <li><strong>Spójność jest ważna:</strong> zdjęcia i wideo mają wyglądać jak z jednej produkcji, bo trafią obok siebie na stronę i do social mediów.</li>
        <li><strong>Zależy Ci na prostocie:</strong> jeden kontakt zamiast koordynowania kilku osób na miejscu.</li>
      </ul>

      <h2>Kiedy lepiej osobno</h2>
      <p>Usługi osobno mają sens, gdy:</p>
      <ul>
        <li><strong>Potrzebujesz tylko jednej rzeczy:</strong> sam reportaż zdjęciowy albo sam film. Wtedy pakiet to przepłacanie za coś, czego nie wykorzystasz.</li>
        <li><strong>Produkcja jest duża:</strong> wielokamerowy film ze scenariuszem i filmowym oświetleniem, a do tego osobna ekipa fotograficzna jednocześnie. Przy takiej skali jeden twórca to za mało i lepiej złożyć dedykowany zespół.</li>
      </ul>

      <h2>Na co patrzeć poza ceną</h2>
      <ul>
        <li><strong>Spójność:</strong> czy foto i wideo będą wyglądać jak komplet, czy jak dwa różne style.</li>
        <li><strong>Logistyka:</strong> ile osób musisz koordynować w dniu wydarzenia.</li>
        <li><strong>Czas dostawy:</strong> jeden twórca pracuje na jednym harmonogramie postprodukcji, nie czekasz na dwie ekipy.</li>
        <li><strong>Formalności:</strong> jedna umowa i faktura zamiast kilku.</li>
      </ul>

      <h2>Jak to policzyć dla siebie</h2>
      <p>Najprościej porównać konkretne liczby dla Twojego wydarzenia. Skoro dron i tak jest na miejscu, a foto i wideo powstają z jednego wejścia, komplet w pakiecie wychodzi taniej niż te same usługi zamawiane osobno. Dokładne kwoty dla Twojej skali policzysz w <a href="/kalkulator">kalkulatorze wyceny</a> albo dostaniesz po krótkim briefie — na zapytania odpowiadam w ciągu 24 godzin. Działam z bazą w Poznaniu, a pakiety realizuję w całej Polsce: w Poznaniu bez kosztów dojazdu, poza miastem dojazd 2,50 zł netto za kilometr.</p>

      <h2>Podsumowanie</h2>
      <p>Pakiet foto + wideo + dron opłaca się tam, gdzie z jednego wydarzenia ma powstać kilka spójnych formatów, a Ty chcesz prostej logistyki i niższego kosztu niż dwie osobne ekipy. Usługi osobno mają sens przy pojedynczej potrzebie albo bardzo dużej produkcji.</p>
      <p>Zobacz <a href="/uslugi/pakiety-foto-wideo">pakiety foto, wideo i dron</a> albo policz swój wariant w <a href="/kalkulator">kalkulatorze</a>.</p>
    `,
    seo: {
      title: "Pakiet foto, wideo i dron czy osobno | Marcin Szabunia",
      description:
        "Kiedy opłaca się pakiet foto + wideo + dron, a kiedy usługi osobno. Porównanie kosztu, spójności i logistyki obsługi eventu firmowego. Poznań.",
    },
  },
  {
    slug: "zdjecia-z-drona-dla-deweloperow",
    faq: [
      { q: "Po co deweloperowi zdjęcia z drona?", a: "Ujęcia z drona pokazują to, czego nie widać z chodnika: skalę osiedla, położenie względem miasta, dojazd, zieleń wokół i widok z górnych pięter. Służą do dokumentacji postępu budowy, materiałów sprzedażowych oraz budowania zaufania, gdy realne ujęcie stoi obok wizualizacji." },
      { q: "Czy loty dronem nad inwestycją są legalne?", a: "Tak, pod warunkiem uprawnień: loty odbywają się zgodnie z przepisami EASA, z numerem operatora i uprawnieniami w kategorii otwartej (A1/A3), a w strefach kontrolowanych po zgłoszeniu i zgodzie przez system PAŻP. Dostęp do terenu budowy i zasady bezpieczeństwa ustalane są wcześniej." },
      { q: "Ile kosztują zdjęcia z drona dla dewelopera?", a: "Orientacyjnie, ceny netto: same przebitki 4K do własnego montażu od 500 zł, zdjęcia z drona od 600 zł, gotowy film 4K od 900 zł. Komplet zdjęć i filmu lub przebitek z jednego lotu wychodzi taniej niż zamawianie tych usług osobno." },
    ],
    title: "Zdjęcia z drona dla deweloperów i nieruchomości: jak pokazać inwestycję z lotu ptaka",
    excerpt:
      "Zdjęcia i film z drona pokazują inwestycję tak, jak nie zrobi tego ujęcie z ziemi: lokalizację, skalę i postęp budowy. Zastosowania, legalność i koszt dla deweloperów.",
    category: "branża",
    date: "2026-06-28",
    readTime: 5,
    thumbnail: "/images/blog/zdjecia-z-drona-dla-deweloperow.jpg",
    content: `
      <p class="lead">Deweloperzy i agencje nieruchomości sprzedają nie tylko metry, ale i lokalizację, otoczenie oraz postęp inwestycji. Zdjęcia z drona pokazują to, czego nie widać z poziomu chodnika: skalę osiedla, dojazd, zieleń wokół i widok z górnych pięter. Poniżej tłumaczę, jak wykorzystać fotografię i wideo z powietrza w sprzedaży inwestycji oraz ile to kosztuje.</p>

      <h2>Dlaczego widok z góry sprzedaje</h2>
      <p>Klient kupujący mieszkanie albo powierzchnię biurową podejmuje decyzję na podstawie wyobrażenia. Ujęcie z drona daje mu to wyobrażenie od razu: pokazuje położenie inwestycji względem miasta, bliskość parku czy głównej arterii, układ budynków i to, jak wygląda okolica z perspektywy przyszłego balkonu. Z poziomu ziemi tego po prostu nie sfotografujesz.</p>

      <h2>Najczęstsze zastosowania</h2>
      <ul>
        <li><strong>Postęp budowy:</strong> regularna dokumentacja z tego samego ujęcia pokazuje inwestorom i klientom, że prace idą zgodnie z planem.</li>
        <li><strong>Lokalizacja i otoczenie:</strong> jedno szerokie ujęcie tłumaczy więcej niż akapit o „dogodnym położeniu".</li>
        <li><strong>Materiały sprzedażowe:</strong> zdjęcia i film do prospektu, na stronę inwestycji, do kampanii i na portale ogłoszeniowe.</li>
        <li><strong>Realność zamiast renderu:</strong> ujęcie gotowego etapu obok wizualizacji buduje zaufanie do dewelopera.</li>
      </ul>

      <h2>Co dostajesz z jednego lotu</h2>
      <p>Z jednego wejścia powstaje komplet materiału, który od razu trafia do sprzedaży:</p>
      <ul>
        <li><strong>Zdjęcia w wysokiej rozdzielczości:</strong> kadry poziome i pionowe pod stronę, social media i druk.</li>
        <li><strong>Film z drona:</strong> płynny oblot inwestycji i okolicy, gotowy montaż albo surowe przebitki 4K.</li>
        <li><strong>Przebitki do montażu:</strong> jeśli masz własnego montażystę, dostajesz same ujęcia 4K i składasz je z resztą materiału.</li>
      </ul>

      <h2>Legalność: na to zwróć uwagę</h2>
      <p>Loty nad inwestycją to nie tylko kwestia sprzętu. Latam zgodnie z przepisami EASA, mam numer operatora i uprawnienia w kategorii otwartej (A1/A3), a loty w strefach kontrolowanych zgłaszam i uzyskuję na nie zgodę przez system PAŻP. Nad terenem budowy ustalamy wcześniej dostęp i zasady bezpieczeństwa. Dla Ciebie to oznacza materiał zrobiony legalnie, bez ryzyka i formalnych przestojów.</p>

      <h2>Ile to kosztuje</h2>
      <p>Cena zależy od tego, co ma powstać. Orientacyjnie, ceny netto: same przebitki 4K do własnego montażu od 500 zł, zdjęcia z drona od 600 zł, gotowy film 4K od 900 zł. Komplet zdjęcia plus przebitki albo zdjęcia plus film z jednego lotu wychodzi taniej niż zamawianie tego osobno. Pracuję z bazą w Poznaniu i realizuję zlecenia w całej Polsce — w Poznaniu bez kosztów dojazdu, poza miastem dojazd 2,50 zł netto za kilometr od granic miasta. Dokładną wycenę policzysz w <a href="/kalkulator">kalkulatorze</a> albo dostaniesz po krótkim briefie o inwestycji.</p>

      <h2>Podsumowanie</h2>
      <p>Dla dewelopera zdjęcia i film z drona to nie ozdoba, tylko argument sprzedażowy. Pokazują lokalizację, skalę i postęp inwestycji tak, jak nie zrobi tego żadne ujęcie z ziemi. Najwięcej zyskujesz, biorąc z jednego lotu komplet foto i wideo gotowy do kampanii.</p>
      <p>Zobacz <a href="/uslugi/zdjecia-wideo-z-drona">zdjęcia i wideo z drona</a> albo przykłady w <a href="/galeria?kat=dron">galerii z drona</a>.</p>
    `,
    seo: {
      title: "Zdjęcia z drona dla deweloperów | Marcin Szabunia",
      description:
        "Zdjęcia i film z drona w sprzedaży inwestycji: postęp budowy, lokalizacja, materiały sprzedażowe, legalność i koszt. Fotografia z drona dla deweloperów, Poznań.",
    },
  },
  {
    slug: "ile-kosztuje-film-z-drona",
    faq: [
      { q: "Ile kosztuje film z drona dla firmy?", a: "Orientacyjne ceny netto zaczynają się od 500 zł za przebitki 4K do własnego montażu, 600 zł za zdjęcia z drona i 900 zł za gotowy film 4K. Komplet zdjęcia plus przebitki to od 700 zł, a zdjęcia plus film od 1 100 zł. To punkty wyjścia do wyceny." },
      { q: "Od czego zależy cena filmu z drona?", a: "Głównie od tego, co ma powstać: same zdjęcia, gotowy zmontowany film czy surowe przebitki 4K. Na cenę wpływają też zakres lotu, lokalizacja i dojazd, strefa powietrzna oraz postprodukcja — gotowy film z muzyką i kolorystyką kosztuje więcej niż surowe ujęcia." },
      { q: "Czy komplet zdjęć i filmu z jednego lotu się opłaca?", a: "Tak. Skoro dron i tak jest na miejscu, zdjęcia plus przebitki albo zdjęcia plus film z jednego wejścia kosztują mniej niż te same usługi zamawiane osobno, bo płacisz za jeden dojazd, jedno przygotowanie i jedną sesję w powietrzu." },
    ],
    title: "Ile kosztuje film z drona dla firmy i od czego zależy cena",
    excerpt:
      "Ile kosztuje film z drona dla firmy i od czego zależy cena. Warianty, czas lotu, strefy PAŻP i orientacyjne ceny netto, żebyś wiedział, czego się spodziewać.",
    category: "poradnik",
    date: "2026-06-28",
    readTime: 5,
    thumbnail: "/images/blog/ile-kosztuje-film-z-drona.jpg",
    content: `
      <p class="lead">„Ile kosztuje film z drona" to pytanie, na które najuczciwsza odpowiedź brzmi: zależy. Poniżej rozkładam cenę na czynniki, pokazuję warianty i podaję orientacyjne kwoty netto, żebyś wiedział, czego się spodziewać jeszcze przed wysłaniem zapytania.</p>

      <h2>Od czego zależy cena</h2>
      <ul>
        <li><strong>Co ma powstać:</strong> same zdjęcia, gotowy zmontowany film czy surowe przebitki 4K do Twojego montażu. To największa różnica w cenie.</li>
        <li><strong>Zakres lotu:</strong> krótki oblot jednego budynku to co innego niż dokumentacja całego terenu z kilku ujęć.</li>
        <li><strong>Lokalizacja:</strong> dojazd poza Poznań dolicza koszt kilometrów.</li>
        <li><strong>Strefa powietrzna:</strong> loty w strefie kontrolowanej wymagają zgody i czasu na formalności.</li>
        <li><strong>Postprodukcja:</strong> gotowy film z muzyką i kolorystyką kosztuje więcej niż same surowe ujęcia.</li>
      </ul>

      <h2>Warianty: za co właściwie płacisz</h2>
      <p>W praktyce wybierasz jeden z trzech wariantów:</p>
      <ul>
        <li><strong>Przebitki 4K do własnego montażu:</strong> dostajesz surowe, ustabilizowane ujęcia i składasz je z resztą materiału. Najtaniej, jeśli masz montażystę.</li>
        <li><strong>Zdjęcia z drona:</strong> gotowe, wyretuszowane kadry do druku i internetu.</li>
        <li><strong>Gotowy film z drona:</strong> zmontowany materiał z muzyką, gotowy do publikacji.</li>
      </ul>

      <h2>Czas lotu i lokalizacja</h2>
      <p>Wycena rośnie razem z zakresem. Jeden budynek z kilku ujęć zrobię w trakcie krótkiego wejścia. Większy teren, kilka lokalizacji albo dokumentacja postępu budowy w paru terminach to więcej czasu w powietrzu i przy komputerze. Do tego dochodzi dojazd: w Poznaniu bez dopłaty, poza miastem liczony za kilometry.</p>

      <h2>Strefy PAŻP i formalności</h2>
      <p>Spora część Poznania leży w zasięgu stref kontrolowanych wokół lotniska. Loty w takich strefach są legalne, ale wymagają zgłoszenia i zgody przez system PAŻP, a czasem ograniczają pułap. Mam numer operatora i uprawnienia w kategorii otwartej (A1/A3), więc formalności biorę na siebie. Dla Ciebie znika to z listy zmartwień, warto tylko wiedzieć, że w części lokalizacji lot trzeba zaplanować z wyprzedzeniem.</p>

      <h2>Komplet z jednego lotu wychodzi taniej</h2>
      <p>Skoro dron i tak jest na miejscu, najwięcej zyskujesz, biorąc komplet. Zdjęcia plus przebitki albo zdjęcia plus film z jednego wejścia kosztują mniej niż te same usługi osobno, bo płacisz za jeden dojazd, jedno przygotowanie i jedną sesję w powietrzu.</p>

      <h2>Orientacyjne ceny</h2>
      <p>Ceny netto, od których zaczynamy:</p>
      <ul>
        <li>Przebitki 4K do własnego montażu: od 500 zł.</li>
        <li>Zdjęcia z drona: od 600 zł.</li>
        <li>Gotowy film 4K: od 900 zł.</li>
        <li>Komplet zdjęcia plus przebitki: od 700 zł.</li>
        <li>Komplet zdjęcia plus film: od 1 100 zł.</li>
      </ul>
      <p>To punkty wyjścia. Dokładną kwotę dla Twojego obiektu i lokalizacji policzysz w <a href="/kalkulator">kalkulatorze</a> albo dostaniesz po krótkim opisie zlecenia.</p>

      <h2>Podsumowanie</h2>
      <p>Cena filmu z drona zależy głównie od tego, co ma powstać, ile czasu zajmie lot i gdzie się odbywa. Najtaniej wychodzą przebitki do własnego montażu, najwięcej daje gotowy komplet foto i wideo z jednego wejścia.</p>
      <p>Zobacz <a href="/uslugi/zdjecia-wideo-z-drona">zdjęcia i wideo z drona</a> albo policz swój wariant w <a href="/kalkulator">kalkulatorze</a>.</p>
    `,
    seo: {
      title: "Ile kosztuje film z drona dla firmy | Marcin Szabunia",
      description:
        "Ile kosztuje film z drona i od czego zależy cena: warianty, czas lotu, strefy PAŻP, komplet z jednego lotu. Orientacyjne ceny netto. Poznań.",
    },
  },
  {
    slug: "jak-wybrac-fotografa-na-event",
    faq: [
      { q: "Czego wymagać od fotografa na event firmowy?", a: "Portfolio z podobnych realizacji eventowych, jasnych obiektywów do trudnego światła sal, dwóch korpusów na wypadek awarii, zapisu na dwie karty jednocześnie, backupu plików na bieżąco oraz konkretnej daty oddania zdjęć — nie „kiedyś po evencie\"." },
      { q: "Jakie są czerwone flagi przy wyborze fotografa eventowego?", a: "Brak portfolio eventowego albo same zdjęcia pozowane bez reportażu, jeden aparat i jedna karta bez słowa o backupie, wycena bez pytania o program i charakter wydarzenia oraz niejasny termin dostawy i brak umowy." },
      { q: "Co powinien zawierać brief dla fotografa na event?", a: "Program i godziny wydarzenia, kluczowe momenty (wystąpienia, wręczenia, networking), liczbę gości, miejsce i światło, oczekiwane formaty — poziome i pionowe pod social media — oraz informację, czy potrzebne są zdjęcia na bieżąco. Im konkretniej, tym trafniejsza wycena i lepszy materiał." },
    ],
    title: "Jak wybrać fotografa na event firmowy: checklista przed konferencją lub galą",
    excerpt:
      "Checklista wyboru fotografa na event firmowy: czego wymagać, jakie pytania zadać i jakie czerwone flagi powinny Cię zaniepokoić przed konferencją lub galą.",
    category: "poradnik",
    date: "2026-06-28",
    readTime: 5,
    thumbnail: "/images/blog/jak-wybrac-fotografa-na-event.jpg",
    content: `
      <p class="lead">Event firmowy zdarza się raz. Konferencji, gali czy jubileuszu nie powtórzysz, więc fotograf musi dowieźć materiał za pierwszym razem. Poniżej checklista, która pomoże Ci wybrać dobrze i uniknąć rozczarowania po fakcie.</p>

      <h2>Dlaczego wybór fotografa ma znaczenie</h2>
      <p>Zdjęcia z eventu pracują długo po wydarzeniu: trafiają do relacji, na stronę, do social mediów, do podsumowań rocznych i materiałów sprzedażowych. Słabe zdjęcia z ważnej gali to stracona okazja wizerunkowa, której nie odrobisz. Dlatego warto wybierać nie po najniższej cenie, tylko po pewności, że materiał będzie.</p>

      <h2>Czego wymagać</h2>
      <ul>
        <li><strong>Doświadczenie w eventach:</strong> reportaż rządzi się swoimi prawami, liczy się timing, dyskrecja i wyłapywanie momentów. Poproś o portfolio z podobnych realizacji.</li>
        <li><strong>Sprzęt i zapas:</strong> jasne obiektywy do trudnego światła sal, dwa korpusy na wypadek awarii, zapis na dwie karty jednocześnie.</li>
        <li><strong>Backup:</strong> profesjonalista zabezpiecza pliki na bieżąco, nie ryzykuje jedną kartą.</li>
        <li><strong>Live editing:</strong> jeśli zależy Ci na publikacji jeszcze w trakcie wydarzenia, upewnij się, że fotograf to oferuje.</li>
        <li><strong>Termin dostawy:</strong> ustal konkretną datę oddania zdjęć, nie „kiedyś po evencie".</li>
      </ul>

      <h2>Pytania, które warto zadać</h2>
      <ul>
        <li>Czy pokażesz portfolio z eventów podobnych do mojego?</li>
        <li>Jak zabezpieczasz pliki w trakcie i po wydarzeniu?</li>
        <li>Co się dzieje, jeśli sprzęt zawiedzie?</li>
        <li>Ile zdjęć dostanę i w jakim czasie?</li>
        <li>Czy dostanę wybrane zdjęcia na bieżąco, do social mediów?</li>
      </ul>

      <h2>Czerwone flagi</h2>
      <ul>
        <li>Brak portfolio eventowego albo same zdjęcia pozowane, bez reportażu.</li>
        <li>Jeden aparat, jedna karta, ani słowa o backupie.</li>
        <li>Wycena bez pytania o program i charakter wydarzenia.</li>
        <li>Niejasny termin dostawy i brak umowy.</li>
      </ul>

      <h2>Przygotuj krótki brief</h2>
      <p>Dobry fotograf i tak o to zapyta, ale warto mieć to pod ręką: program i godziny wydarzenia, kluczowe momenty (wystąpienia, wręczenia, networking), liczbę gości, miejsce i światło, oczekiwane formaty (poziome i pionowe pod social media) oraz to, czy potrzebujesz zdjęć na bieżąco. Im konkretniej, tym trafniejsza wycena i lepszy materiał.</p>

      <h2>Podsumowanie</h2>
      <p>Fotografa na event wybieraj po doświadczeniu, zabezpieczeniu pracy i jasnych warunkach dostawy, nie po najniższej cenie. Jedno dobrze obsłużone wydarzenie daje materiał, który pracuje na wizerunek firmy przez cały rok.</p>
      <p>Zobacz <a href="/uslugi/eventy-reportaze">obsługę fotograficzną eventów</a> albo przykłady w <a href="/galeria?kat=eventy">galerii eventowej</a>. Bazuję w Poznaniu, a eventy obsługuję w całej Polsce — w granicach Poznania bez kosztów dojazdu.</p>
    `,
    seo: {
      title: "Jak wybrać fotografa na event firmowy | Marcin Szabunia",
      description:
        "Checklista wyboru fotografa na event firmowy: czego wymagać, jakie pytania zadać, czerwone flagi i brief. Fotograf eventowy Poznań.",
    },
  },
  {
    slug: "live-editing-na-evencie",
    faq: [
      { q: "Co to jest live editing na evencie?", a: "To wybór, obróbka i dostarczanie zdjęć w trakcie trwania eventu, a nie po nim. Co jakiś czas przekazywana jest paczka gotowych, wyretuszowanych kadrów, które od razu trafiają na firmowe social media, do działu marketingu albo na ekran w sali. Pełny reportaż przychodzi później." },
      { q: "Jak technicznie wygląda live editing?", a: "Fotograf pracuje z zapisem na dwie karty, a wybrane kadry zgrywa i obrabia na miejscu. Gotowe zdjęcia trafiają ustaloną drogą: przez wspólny folder w chmurze, bezpośrednio do osoby od social mediów albo na dedykowany adres — na przykład paczka co godzinę lub po każdym kluczowym punkcie programu." },
      { q: "Co przygotować po stronie firmy przed live editingiem?", a: "Osobę, która odbiera zdjęcia i publikuje je na kanałach firmy, kanał przekazywania (folder w chmurze lub kontakt do konkretnej osoby), listę priorytetowych momentów, które muszą pójść w świat najszybciej, oraz informację, czy potrzebne są kadry pionowe pod relacje i stories." },
    ],
    title: "Live editing na evencie: zdjęcia w social mediach jeszcze tego samego dnia",
    excerpt:
      "Live editing to obróbka i przekazywanie zdjęć z eventu na bieżąco, jeszcze tego samego dnia. Jak to działa, co przygotować i dlaczego daje firmie przewagę w social mediach.",
    category: "branża",
    date: "2026-06-28",
    readTime: 5,
    thumbnail: "/images/blog/live-editing-na-evencie.jpg",
    content: `
      <p class="lead">Najlepszy moment na publikację zdjęć z eventu to nie tydzień później, tylko w trakcie wydarzenia. Live editing to obróbka i przekazywanie wybranych kadrów na bieżąco, jeszcze zanim goście wrócą do domu. Poniżej tłumaczę, jak to działa i dlaczego daje firmie realną przewagę.</p>

      <h2>Co to jest live editing</h2>
      <p>Live editing to wybór, obróbka i dostarczanie zdjęć w trakcie trwania eventu, a nie po nim. W praktyce co jakiś czas przekazuję paczkę gotowych, wyretuszowanych kadrów, które od razu trafiają na firmowe social media, do działu marketingu albo na ekran w sali. Pełny reportaż dostajesz później, ale to, co najważniejsze, jest dostępne od ręki.</p>

      <h2>Dlaczego „tego samego dnia" działa</h2>
      <p>Treść z wydarzenia ma największe zasięgi wtedy, gdy event żyje. Relacja na bieżąco buduje zaangażowanie, zachęca gości do udostępniania i pokazuje firmę jako sprawnie działającą. Zdjęcia wrzucone tydzień później to już archiwum, które ogląda garstka osób.</p>
      <ul>
        <li>Goście udostępniają posty, w których są oznaczeni, jeszcze w trakcie eventu.</li>
        <li>Marketing publikuje relację, gdy temat jest gorący, nie po fakcie.</li>
        <li>Zarząd i partnerzy widzą efekt wydarzenia od razu.</li>
      </ul>

      <h2>Jak to wygląda technicznie</h2>
      <p>Pracuję z zapisem na dwie karty, a wybrane kadry zgrywam i obrabiam na miejscu, na bieżąco. Gotowe zdjęcia przekazuję ustaloną drogą: przez wspólny folder w chmurze, bezpośrednio do osoby od social mediów albo na dedykowany adres. Tempo ustalamy wcześniej, na przykład paczka co godzinę albo po każdym kluczowym punkcie programu.</p>

      <h2>Co przygotować po swojej stronie</h2>
      <ul>
        <li><strong>Osoba od publikacji:</strong> ktoś, kto odbiera zdjęcia i wrzuca je na kanały firmy.</li>
        <li><strong>Kanał przekazywania:</strong> folder w chmurze albo kontakt do konkretnej osoby.</li>
        <li><strong>Lista priorytetów:</strong> które momenty muszą pójść w świat najszybciej (wystąpienie prezesa, wręczenie nagrody, zdjęcie grupowe).</li>
        <li><strong>Format:</strong> czy potrzebujesz kadrów pionowych pod relacje i stories.</li>
      </ul>

      <h2>Live editing a wideo</h2>
      <p>Ten sam mechanizm działa przy wideo. Krótki teaser albo kilka ujęć zmontowanych jeszcze w trakcie wydarzenia podbija relację tak samo jak zdjęcia. Jeśli planujesz i foto, i wideo, warto połączyć je w jednym wejściu, żeby relacja na żywo miała oba formaty.</p>

      <h2>Ile to kosztuje</h2>
      <p>Live editing to dodatkowa praca na miejscu, więc wyceniam ją jako opcję do obsługi eventu, zależnie od długości wydarzenia i tempa przekazywania zdjęć. Najprościej podać mi program i oczekiwania, a dostaniesz konkretną wycenę — na zapytania odpowiadam w ciągu 24h. Działam z Poznania, a eventy obsługuję w całej Polsce i Europie. Przy większych wydarzeniach ten koszt zwykle zwraca się samym zasięgiem relacji na żywo.</p>

      <h2>Podsumowanie</h2>
      <p>Live editing zamienia zdjęcia z eventu z archiwum w narzędzie marketingowe, które pracuje, gdy wydarzenie jeszcze trwa. Dla firmy to większe zasięgi, więcej udostępnień i wizerunek marki, która działa sprawnie.</p>
      <p>Zobacz <a href="/uslugi/eventy-reportaze">obsługę eventów</a> albo połącz ją z <a href="/uslugi/wideo-marketing">wideo marketingiem</a>.</p>
    `,
    seo: {
      title: "Live editing na evencie: zdjęcia od ręki | Marcin Szabunia",
      description:
        "Live editing na evencie: obróbka i przekazywanie zdjęć na bieżąco, jeszcze w trakcie wydarzenia. Większe zasięgi relacji w social mediach. Poznań.",
    },
  },
  {
    slug: "headshoty-zespolu-w-jeden-dzien",
    faq: [
      { q: "Ile miejsca potrzeba na mobilne studio w biurze?", a: "Wystarczy około 3 m² wolnej przestrzeni i dostęp do gniazdka — tło, światło i statywy przywozi fotograf. Sprawdzi się jedna sala albo wydzielony kąt w open space, a sesja toczy się obok normalnej pracy, więc zespół nie musi nigdzie jechać." },
      { q: "Ile trwa sesja headshotów dla jednej osoby?", a: "Na jedną osobę rezerwuje się 10-15 minut, co daje realnie 4-6 osób na godzinę. Ludzie przychodzą według wcześniej rozesłanej listy, w okienkach z buforem na spóźnienia — nikt nie stoi w kolejce i każdy wie, o której przyjść na swoje zdjęcie." },
      { q: "Co zrobić, gdy część zespołu jest nieobecna w dniu sesji?", a: "Rozwiązań jest kilka: dogrywka przy kolejnej wizycie, krótka sesja uzupełniająca albo zachowanie ustawienia i parametrów, żeby dorobić brakujące portrety w tym samym standardzie. Ważne, żeby z góry ustalić, co z nieobecnymi, zanim galeria trafi na stronę." },
    ],
    title: "Headshoty całego zespołu w jeden dzień: jak to zorganizować bez chaosu",
    excerpt:
      "Jak zorganizować headshoty całego zespołu w jeden dzień bez chaosu: mobilne studio w biurze, harmonogram 10-15 minut na osobę, przygotowanie zespołu i spójność.",
    category: "poradnik",
    date: "2026-06-28",
    readTime: 5,
    thumbnail: "/images/blog/headshoty-zespolu-w-jeden-dzien.jpg",
    content: `
      <p class="lead">Zrobienie spójnych portretów całemu zespołowi brzmi jak logistyczny koszmar: kilkadziesiąt osób, jeden dzień, normalna praca w tle. W praktyce da się to ogarnąć bez chaosu, jeśli dobrze zaplanujesz harmonogram. Poniżej tłumaczę, jak zorganizować to krok po kroku.</p>

      <h2>Wyzwanie: cały zespół, jeden dzień</h2>
      <p>Headshoty całego zespołu w jeden dzień to najczęstszy scenariusz w firmach, bo rozbijanie tego na kilka terminów rozciąga sprawę na tygodnie i psuje spójność. Klucz to potraktować sesję jak proces: ustawione stanowisko, gotowe światło i płynny przepływ osób, tak żeby nikt nie tracił czasu, a Ty nie wyrywał ludzi z pracy na pół dnia.</p>

      <h2>Mobilne studio w biurze</h2>
      <p>Najwygodniej, gdy przyjeżdżam do Was z mobilnym studiem. Bazą jest Poznań — w granicach miasta dojazd nic nie kosztuje, a do firm poza Poznaniem dojeżdżam za 2,50 zł netto/km od granic miasta, w obie strony. Potrzebuję około 3 m² wolnej przestrzeni i dostępu do gniazdka, resztę przywożę: tło, światło, statywy. Zespół nie musi nigdzie jechać, a sesja toczy się obok normalnej pracy. Jedna sala albo wydzielony kąt w open space w zupełności wystarczy.</p>

      <h2>Harmonogram: 10-15 minut na osobę</h2>
      <p>Sekret płynnej sesji to grafik. Na jedną osobę rezerwujemy 10-15 minut, co daje realnie 4-6 osób na godzinę. Ludzie przychodzą według listy, w okienkach, a nie wszyscy naraz. Dzięki temu nikt nie stoi w kolejce, a każdy wie, o której zejść z pracy na swoje zdjęcie.</p>
      <ul>
        <li>Lista z imionami i godzinami, rozesłana wcześniej.</li>
        <li>Okienka co 10-15 minut, z małym buforem na spóźnienia.</li>
        <li>Priorytet dla osób z napiętym kalendarzem.</li>
      </ul>

      <h2>Jak przygotować zespół</h2>
      <p>Kilka prostych wskazówek wysłanych wcześniej robi różnicę:</p>
      <ul>
        <li><strong>Strój:</strong> spójny z dress codem firmy, raczej gładkie tkaniny, bez krzykliwych wzorów.</li>
        <li><strong>Drobiazgi:</strong> grzebień pod ręką, ewentualnie podkład matujący.</li>
        <li><strong>Nastawienie:</strong> kilka minut przed obiektywem wystarczy, prowadzę przez pozy, nikt nie musi umieć pozować.</li>
      </ul>

      <h2>Spójność: o to chodzi najbardziej</h2>
      <p>Cała wartość sesji zespołowej leży w tym, że zdjęcia wyglądają jak komplet: ten sam system światła, ten sam kadr i jednolity retusz. Dlatego robimy je za jednym razem, na jednym ustawieniu. Efekt to galeria zespołu na stronie, która wygląda profesjonalnie, a nie jak zlepek przypadkowych zdjęć.</p>

      <h2>Co z osobami nieobecnymi</h2>
      <p>Zawsze ktoś jest na urlopie albo chory. Rozwiązań jest kilka: dogrywka przy kolejnej wizycie, krótka sesja uzupełniająca albo zachowanie ustawienia i parametrów, żeby dorobić brakujące portrety w tym samym standardzie. Ważne, żeby z góry ustalić, co z nieobecnymi, zanim galeria trafi na stronę.</p>

      <h2>Podsumowanie</h2>
      <p>Headshoty całego zespołu w jeden dzień to przede wszystkim kwestia harmonogramu i jednego, dobrze ustawionego stanowiska. Mobilne studio w biurze, okienka co kilkanaście minut i wcześniejszy brief sprawiają, że sesja idzie sprawnie, a Wy dostajecie spójną galerię zespołu.</p>
      <p>Zobacz <a href="/uslugi/sesje-zespolowe">sesje zespołowe</a> albo sprawdź <a href="/poradnik">poradnik przygotowania do sesji</a>.</p>
    `,
    seo: {
      title: "Headshoty całego zespołu w jeden dzień | Marcin Szabunia",
      description:
        "Jak zorganizować headshoty całego zespołu w jeden dzień: mobilne studio w biurze, harmonogram 10-15 minut na osobę, przygotowanie zespołu i spójność. Poznań.",
    },
  },
  {
    slug: "spojne-portrety-zespolu",
    faq: [
      { q: "Co składa się na spójny standard portretów zespołu?", a: "Cztery elementy: ten sam schemat oświetlenia dla każdej osoby, jednolite kadrowanie i ustawienie sylwetki, jeden zestaw teł używany konsekwentnie oraz ten sam standard retuszu. Spójność nie oznacza, że wszyscy wyglądają identycznie — portrety powstają w jednym, świadomym systemie." },
      { q: "Jak zachować spójność zdjęć zespołu przy rotacji pracowników?", a: "Po sesji zapisywane są parametry: ustawienie świateł, obiektyw, kadr i sposób obróbki. Dzięki temu nową osobę nawet po pół roku można sfotografować dokładnie tak samo, a jej portret wpasuje się w istniejącą galerię, zamiast z niej wystawać." },
      { q: "Dlaczego przypadkowe zdjęcia w sekcji „Zespół\" szkodzą firmie?", a: "Różne tła, kadry, selfie i wycięte zdjęcia ślubne sprawiają, że sekcja wygląda niechlujnie i podświadomie obniża wiarygodność firmy, nawet jeśli ludzie i kompetencje są pierwszej klasy. Spójne portrety w jednym standardzie zmieniają ją w element budujący zaufanie." },
    ],
    title: "Spójne portrety zespołu: dlaczego warto fotografować wszystkich w jednym standardzie",
    excerpt:
      "Galeria zespołu złożona z przypadkowych zdjęć obniża wiarygodność firmy. Dlaczego warto fotografować wszystkich w jednym standardzie i jak utrzymać spójność przy rotacji.",
    category: "branża",
    date: "2026-06-28",
    readTime: 5,
    thumbnail: "/images/blog/spojne-portrety-zespolu.jpg",
    content: `
      <p class="lead">Strona „Zespół" to często najsłabszy wizualnie element firmowej witryny: zlepek selfie, zdjęć z wesela i kadrów robionych telefonem w różnym świetle. Spójne portrety całego zespołu w jednym standardzie zmieniają to w element, który buduje zaufanie. Poniżej tłumaczę, dlaczego warto i jak to ugryźć.</p>

      <h2>Problem: galeria zespołu z przypadkowych zdjęć</h2>
      <p>Kiedy każdy dostarcza własne zdjęcie, efekt jest zawsze ten sam: różne tła, różne kadry, raz selfie, raz wycięte zdjęcie ślubne. Taka sekcja „Zespół" wygląda niechlujnie i podświadomie obniża wiarygodność firmy, nawet jeśli ludzie i kompetencje są pierwszej klasy.</p>

      <h2>Co daje spójny standard</h2>
      <ul>
        <li><strong>Profesjonalny pierwszy kontakt:</strong> odwiedzający widzą zespół, który wygląda jak jeden, dopracowany podmiot.</li>
        <li><strong>Wiarygodność:</strong> spójne portrety sygnalizują, że firma dba o szczegóły.</li>
        <li><strong>Wygoda marketingu:</strong> jednolite zdjęcia łatwiej wpleść w stronę, oferty, LinkedIn i materiały sprzedażowe.</li>
        <li><strong>Łatwiejsza rozbudowa:</strong> nowe osoby dochodzą w tym samym stylu, bez psucia całości.</li>
      </ul>

      <h2>Elementy spójności</h2>
      <p>Spójność nie znaczy, że wszyscy wyglądają identycznie. Znaczy, że portrety powstają w jednym, świadomym systemie:</p>
      <ul>
        <li><strong>Światło:</strong> ten sam schemat oświetlenia dla każdej osoby.</li>
        <li><strong>Kadr i poza:</strong> jednolite kadrowanie i sposób ustawienia sylwetki.</li>
        <li><strong>Tło:</strong> jeden zestaw teł, czy to wspólne tło, czy świadomie dobrana paleta (na przykład jasne, kremowe i ciemne) używana konsekwentnie.</li>
        <li><strong>Retusz:</strong> ten sam standard obróbki, naturalnie, bez przesady.</li>
      </ul>

      <h2>Jak utrzymać spójność przy rotacji</h2>
      <p>Zespoły się zmieniają, dlatego ważne jest, żeby standard dało się odtworzyć. Po sesji zapisuję parametry: ustawienie świateł, obiektyw, kadr i sposób obróbki. Dzięki temu nową osobę nawet po pół roku sfotografuję dokładnie tak samo, a jej portret wpasuje się w galerię, zamiast z niej wystawać.</p>

      <h2>Przykład: zespół IDcom</h2>
      <p>Dobrze widać to na headshotach zespołu IDcom. Każda osoba ma własny portret, ale całość trzyma jeden styl: spójne światło i kadr, a tła celowo grają kolorem (jasne, kremowe, ciemne), tworząc galerię, która wygląda jak komplet, nie jak przypadkowy zbiór. Zobacz <a href="/portfolio/idcom-headshoty-zespolu">realizację IDcom</a>.</p>

      <h2>Podsumowanie</h2>
      <p>Spójne portrety zespołu to jeden z najtańszych sposobów, żeby firmowa strona wyglądała poważnie. Jeden system światła, kadru i retuszu sprawia, że sekcja „Zespół" pracuje na wizerunek marki, a nie przeciw niemu. Takie sesje realizuję z bazy w Poznaniu, a dojeżdżam do firm w całej Polsce i Europie.</p>
      <p>Zobacz <a href="/uslugi/sesje-zespolowe">sesje zespołowe</a> albo przykład <a href="/portfolio/idcom-headshoty-zespolu">headshotów IDcom</a>.</p>
    `,
    seo: {
      title: "Spójne portrety zespołu: jeden standard | Marcin Szabunia",
      description:
        "Dlaczego warto fotografować cały zespół w jednym standardzie: spójne światło, kadr, tło i retusz. Jak utrzymać spójność przy rotacji. Przykład IDcom, Poznań.",
    },
  },
  {
    slug: "ile-kosztuje-film-promocyjny",
    faq: [
      { q: "Od czego zależy cena filmu promocyjnego?", a: "Od czterech czynników: długości i typu materiału (teaser, reels, recap z eventu czy dłuższy film to różne nakłady montażu), czasu nagrań na planie, złożoności realizacji (liczba lokalizacji, scenariusz, napisy, grafika) oraz dodatków, takich jak ujęcia z drona, lektor, licencjonowana muzyka czy wersje językowe." },
      { q: "Jak liczona jest cena filmu promocyjnego?", a: "Cena składa się z dwóch przejrzystych części: pracy operatora na planie (pierwsza godzina 400 zł, każda kolejna 200 zł netto) oraz pakietu montażowego, czyli obróbki nagranego materiału. Dzięki temu klient płaci za realny zakres, a nie za sztywny pakiet, którego nie wykorzysta." },
      { q: "Ile kosztuje montaż filmu dla firmy?", a: "Pakiety montażowe (ceny netto): teaser do 15 s — 300 zł, reels do 30 s — 600 zł, event recap do 60 s — 900 zł, film promo 1–2 min — 1 400 zł, dłuższy dokument około 3 min — 1 800 zł. Do tego dochodzi praca operatora na planie." },
    ],
    title: "Ile kosztuje film promocyjny dla firmy i od czego zależy cena",
    excerpt:
      "Ile kosztuje film promocyjny i od czego zależy cena. Jak liczę pracę operatora i montaż, ile kosztują formaty od teasera po film o firmie oraz Monthly Content.",
    category: "poradnik",
    date: "2026-06-28",
    readTime: 5,
    thumbnail: "/images/blog/ile-kosztuje-film-promocyjny.jpg",
    content: `
      <p class="lead">„Ile kosztuje film promocyjny" to pytanie bez jednej odpowiedzi, bo film filmowi nierówny. Inaczej wycenia się 15-sekundowy teaser, a inaczej trzyminutowy materiał o firmie. Poniżej pokazuję, od czego zależy cena, jak liczę pracę i ile kosztują konkretne formaty.</p>

      <h2>Od czego zależy cena</h2>
      <ul>
        <li><strong>Długość i typ materiału:</strong> teaser, reels, recap z eventu czy dłuższy film promocyjny to różne nakłady montażu.</li>
        <li><strong>Czas nagrań:</strong> ile godzin operator spędza na planie.</li>
        <li><strong>Złożoność:</strong> jedna lokalizacja i prosty montaż czy kilka ujęć, scenariusz, napisy i grafika.</li>
        <li><strong>Dodatki:</strong> ujęcia z drona, lektor, licencjonowana muzyka, wersje językowe.</li>
      </ul>

      <h2>Jak liczę: praca operatora plus montaż</h2>
      <p>Cenę składam z dwóch części, żeby była przejrzysta. Pierwsza to praca operatora na planie: pierwsza godzina 400 zł, każda kolejna 200 zł netto. Druga to pakiet montażowy, czyli obróbka gotowego materiału. Dzięki temu płacisz za realny zakres, a nie za sztywny pakiet, którego nie wykorzystasz. Bazuję w Poznaniu: na terenie miasta dojazd jest bezpłatny, a poza Poznaniem doliczam 2,50 zł netto za kilometr, licząc od granic miasta w obie strony.</p>

      <h2>Formaty i ceny montażu</h2>
      <p>Pakiety montażowe (ceny netto) dobierasz pod cel:</p>
      <ul>
        <li><strong>XS Teaser (do 15 s): 300 zł.</strong> Krótka zajawka na social media.</li>
        <li><strong>S Reels (do 30 s): 600 zł.</strong> Dynamiczny format pionowy pod Reels, TikTok, Shorts.</li>
        <li><strong>M Event recap (do 60 s): 900 zł.</strong> Podsumowanie wydarzenia.</li>
        <li><strong>L Promo (1-2 min): 1 400 zł.</strong> Film promocyjny produktu albo usługi.</li>
        <li><strong>XL Dokument (około 3 min): 1 800 zł.</strong> Dłuższy materiał o firmie, ludziach i sposobie pracy.</li>
      </ul>
      <p>Więcej o tym, który format kiedy wybrać, znajdziesz we wpisie o <a href="/blog/wideo-marketing-dla-firm-formaty">formatach wideo dla firm</a>.</p>

      <h2>Monthly Content: wideo w abonamencie</h2>
      <p>Jeśli potrzebujesz regularnych materiałów do social mediów, taniej wychodzi stała współpraca niż pojedyncze zlecenia. Monthly Content to 4 900 zł netto miesięcznie: jeden dzień zdjęciowy i montaż czterech reelsów, przy minimum trzymiesięcznej umowie. Masz wtedy przewidywalny dopływ materiału i stały koszt w budżecie.</p>

      <h2>Orientacyjnie: ile zapłacisz za konkretny film</h2>
      <p>Najprościej na przykładach (ceny netto, praca operatora plus montaż):</p>
      <ul>
        <li>Reels z jednego, krótkiego nagrania: od około 600 zł plus godzina pracy operatora.</li>
        <li>Recap z eventu: montaż 900 zł plus czas nagrań na miejscu.</li>
        <li>Film promocyjny 1-2 min z jednej lokalizacji: pakiet L 1 400 zł plus praca operatora.</li>
      </ul>
      <p>Dokładną kwotę dla Twojego projektu policzysz w <a href="/kalkulator">kalkulatorze</a> albo dostaniesz po krótkim opisie pomysłu.</p>

      <h2>Podsumowanie</h2>
      <p>Cena filmu promocyjnego zależy przede wszystkim od formatu i czasu nagrań. Rozbicie na pracę operatora i pakiet montażowy sprawia, że płacisz za realny zakres, a przy regularnych potrzebach taniej wychodzi Monthly Content.</p>
      <p>Zobacz <a href="/uslugi/wideo-marketing">wideo marketing</a> albo policz swój film w <a href="/kalkulator">kalkulatorze</a>.</p>
    `,
    seo: {
      title: "Ile kosztuje film promocyjny dla firmy | Marcin Szabunia",
      description:
        "Ile kosztuje film promocyjny i od czego zależy cena: praca operatora, pakiety montażowe (teaser, reels, recap, promo), Monthly Content. Ceny netto, Poznań.",
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
  "jak-wybrac-fotografa-na-event": "eventy-reportaze",
  "live-editing-na-evencie": "eventy-reportaze",
  "zdjecie-do-cv-w-domu": "wizerunek-portrety",
  "fotografia-przemyslowa-fabryka": "fotografia-produktowa",
  "bledy-zdjecia-zespolu": "sesje-zespolowe",
  "headshoty-zespolu-w-jeden-dzien": "sesje-zespolowe",
  "spojne-portrety-zespolu": "sesje-zespolowe",
  "ile-kosztuje-sesja-wizerunkowa-dla-firmy": "wizerunek-portrety",
  "fotografia-produktowa-ecommerce": "fotografia-produktowa",
  "wideo-marketing-dla-firm-formaty": "wideo-marketing",
  "sesja-wizerunkowa-poznan": "wizerunek-portrety",
  "zdjecia-ai-vs-profesjonalna-sesja": "wizerunek-portrety",
  "co-zalozyc-na-sesje-biznesowa": "wizerunek-portrety",
  "zdjecia-na-strone-firmowa": "wizerunek-portrety",
  "co-to-jest-packshot": "fotografia-produktowa",
  "slownik-pojec-wideo": "wideo-marketing",
  "ile-kosztuje-film-promocyjny": "wideo-marketing",
  "zdjecia-film-z-drona-dla-firm": "zdjecia-wideo-z-drona",
  "zdjecia-z-drona-dla-deweloperow": "zdjecia-wideo-z-drona",
  "ile-kosztuje-film-z-drona": "zdjecia-wideo-z-drona",
  "foto-wideo-dron-z-jednego-wejscia": "pakiety-foto-wideo",
  "obsluga-foto-wideo-eventu-firmowego": "pakiety-foto-wideo",
  "pakiet-foto-wideo-czy-osobno": "pakiety-foto-wideo",
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

/** Wpisy bloga powiązane z daną usługą (od najnowszych). Gdy usługa ma mniej
    niż `limit` własnych wpisów, dopełniamy tematycznie: najpierw ta sama
    kategoria, potem najnowsze pozostałe, żeby każda usługa pokazała `limit`. */
export function getPostsForService(serviceSlug: string, limit = 3): BlogPost[] {
  const byDate = (a: BlogPost, b: BlogPost) => +new Date(b.date) - +new Date(a.date);
  const mapped = blogPosts
    .filter((p) => blogServiceMap[p.slug] === serviceSlug)
    .sort(byDate);
  if (mapped.length >= limit) return mapped.slice(0, limit);

  const used = new Set(mapped.map((p) => p.slug));
  const cats = new Set(mapped.map((p) => p.category));
  const rest = blogPosts.filter((p) => !used.has(p.slug));
  const sameCat = rest.filter((p) => cats.has(p.category)).sort(byDate);
  const others = rest.filter((p) => !cats.has(p.category)).sort(byDate);
  return [...mapped, ...sameCat, ...others].slice(0, limit);
}
