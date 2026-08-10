import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import CookieConsent from "@/components/CookieConsent";
import ContactClickTracker from "@/components/ContactClickTracker";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Barlow usunięty (decyzja Marcina, 2026-07-23): ogonek w Ę/ę wyglądał w nim
// nienaturalnie (widoczne zwłaszcza w hero "REALIZUJĘ"). Nagłówki przechodzą
// na Inter Black — jedna rodzina na całej stronie, spójne polskie diakrytyki.
// Utility `font-barlow` w komponentach ZOSTAJE (nazwa historyczna) — token
// --font-barlow w globals.css wskazuje teraz na var(--font-inter).
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-inter",
  // "swap", nie "optional" (brief-23 zad. 1): przy multi-subset foncie każdy
  // unicode-range (latin vs latin-ext) ładuje się osobnym plikiem. Z "optional"
  // przeglądarka na realnym łączu potrafi zdążyć z podstawowym latin w oknie
  // ~100ms, a spóźnić się z latin-ext (polskie znaki) — i już NIGDY nie
  // podmienia fallbacku na Inter dla tych znaków w danej wizycie. Efekt:
  // trwała mieszanka dwóch fontów w jednym słowie (np. w nagłówkach FAQ).
  // "swap" kosztuje krótki, samokorygujący się błysk zamiast trwałego błędu.
  display: "swap",
});

export const metadata: Metadata = {
  // Zmienione 10.08.2026 (decyzja Marcina), poprzednio „Fotograf eventowy
  // i biznesowy Poznań | Szabunia". Po przejściu na cztery filary oferty
  // głównym pozycjonowaniem strony głównej jest „fotograf biznesowy", a event
  // jest jednym z czterech obszarów niżej, nie połową tytułu. Tytuł nie próbuje
  // zmieścić wszystkich czterech filarów: szerokość oferty pokazuje H1, a tytuł
  // ma zdobyć kliknięcie na jednej kategorii. 53 znaki, mieści się bez ucięcia.
  title: "Fotograf biznesowy Poznań | Zdjęcia i film | Szabunia",
  // Przepisane 10.08.2026 na cztery filary. Dobór słów NIE jest przypadkowy:
  // „fotografia" (622 kliknięcia w Ads), „biznesowa" (78) i „Poznaniu" (358)
  // to jedyne frazy z tego opisu, które mają pomiar. Nazwy klientów zostają
  // na końcu, bo to one dają powód do kliknięcia w wyniku wyszukiwania.
  // 146 znaków, mieści się bez ucięcia.
  description:
    "Fotografia biznesowa i wideo dla firm w Poznaniu: wydarzenia, wizerunek zespołu, nieruchomości i przemysł, produkty. Zdjęcia dla H&M i Santandera.",
  metadataBase: new URL("https://szabunia.pl"),
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [{ url: "/feed.xml", title: "Blog Marcina Szabuni" }],
    },
  },
  openGraph: {
    // Zmienione 10.08.2026 razem z H1 i meta title. Podgląd linku w social
    // media ma powtarzać komunikat z hero, a nie tworzyć trzecią wersję:
    // dlatego pełne zdanie, a nie skrót do „fotograf biznesowy". Nie musi być
    // identyczne z meta title — tam wygrywa układ pod wynik wyszukiwania,
    // tutaj pod kartę linku.
    title: "Marcin Szabunia, fotograf biznesowy w Poznaniu. Zdjęcia i film.",
    // Przepisane 10.08.2026. Karta linku otwiera się hasłem z hero, żeby ktoś,
    // kto zobaczy podgląd na LinkedInie i wejdzie na stronę, przeczytał to samo
    // dwa razy. Bez upychania fraz: nikt nie szuka przez kartę linku.
    // ⚠ Znika „jeden twórca". Ten sam problem co „od jednej osoby": FAQ na
    // podstronie Wydarzeń mówi wprost, że przy dużym wydarzeniu dochodzi drugi
    // operator, więc deklaracja przeczyła własnej stronie.
    description:
      "Ludzie, wydarzenia, obiekty, produkty. Zdjęcia i film dla firm, od pierwszej rozmowy do gotowych materiałów. Poznań, cała Polska i Europa.",
    url: "https://szabunia.pl",
    siteName: "Marcin Szabunia",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/images/og/strony/home.jpg",
        width: 1200,
        height: 630,
        alt: "Marcin Szabunia, fotografia i wideo dla firm, Poznań",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    // Zmienione 10.08.2026 razem z H1 i meta title. Podgląd linku w social
    // media ma powtarzać komunikat z hero, a nie tworzyć trzecią wersję:
    // dlatego pełne zdanie, a nie skrót do „fotograf biznesowy". Nie musi być
    // identyczne z meta title — tam wygrywa układ pod wynik wyszukiwania,
    // tutaj pod kartę linku.
    title: "Marcin Szabunia, fotograf biznesowy w Poznaniu. Zdjęcia i film.",
    // Przepisane 10.08.2026. Karta linku otwiera się hasłem z hero, żeby ktoś,
    // kto zobaczy podgląd na LinkedInie i wejdzie na stronę, przeczytał to samo
    // dwa razy. Bez upychania fraz: nikt nie szuka przez kartę linku.
    // ⚠ Znika „jeden twórca". Ten sam problem co „od jednej osoby": FAQ na
    // podstronie Wydarzeń mówi wprost, że przy dużym wydarzeniu dochodzi drugi
    // operator, więc deklaracja przeczyła własnej stronie.
    description:
      "Ludzie, wydarzenia, obiekty, produkty. Zdjęcia i film dla firm, od pierwszej rozmowy do gotowych materiałów. Poznań, cała Polska i Europa.",
    images: ["/images/og/strony/home.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`scroll-smooth ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="manifest" href="/manifest.json" />
        {/* Dwa warianty: pasek adresu przeglądarki dopasowuje się do motywu.
            Wartości z globals.css: --color-gray-bg i --color-dark-bg. */}
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#F9FAFB" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0B0F1A" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        {/* GA4 (gtag.js) z Consent Mode v2 — domyślnie wszystko denied;
            zgoda nadawana po "Akceptuję" w banerze cookie (CookieConsent.tsx).
            Celowo zwykły <script> w <head>, nie next/script ani @next/third-parties:
            consent default MUSI wykonać się przed załadowaniem gtag.js, a nowych
            paczek nie dodajemy (CLAUDE.md §11). PRÓBA wydzielenia do public/*.js +
            next/script strategy="beforeInteractive" (2026-07-02) zweryfikowana jako
            NIEDZIAŁAJĄCA w tej konfiguracji (Turbopack): plik się fetchuje (200 OK),
            ale nigdy nie wykonuje — dataLayer i dark mode przestają działać. Wycofane.
            'unsafe-inline' w script-src pozostaje świadomie z tego powodu. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
try{if(localStorage.getItem('cookie-consent')==='accepted'){gtag('consent','update',{analytics_storage:'granted',ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted'});}}catch(e){}
/* Ruch wewnetrzny na urzadzeniach mobilnych (audyt PELNY2907-46). Filtry GA4 dzialaja
   wylacznie po adresie IP, wiec regula na IP biura nie lapie wejsc Marcina z telefonu
   przez siec komorkowa — i to one zawyzaly dane (czerwcowe "49 sesji z Instagrama").
   Wejscie raz na /?internal=1 oznacza urzadzenie na stale; /?internal=0 kasuje flage.
   traffic_type=internal ustawiamy PRZED gtag('config'), zeby objal takze pierwszy
   page_view. Wartosc 'internal' musi zgadzac sie z regula w GA4 (Definiowanie ruchu
   wewnetrznego) i z filtrem danych "Internal Traffic" ustawionym na Wyklucz. */
try{var q=location.search;
if(q.indexOf('internal=1')>-1){localStorage.setItem('szabunia-internal','1');}
else if(q.indexOf('internal=0')>-1){localStorage.removeItem('szabunia-internal');}
if(localStorage.getItem('szabunia-internal')==='1'){gtag('set',{traffic_type:'internal'});}}catch(e){}
gtag('js',new Date());gtag('config','G-MD8FJ0CZG3');
/* gtag.js (~175 KiB) doładowywany dopiero gdy watek glowny jest wolny lub przy
   pierwszej interakcji — uwalnia main thread i skraca render delay LCP na mobile.
   Consent default + config wyzej wykonuja sie od razu i kolejkuja sie w dataLayer. */
(function(){var loaded=false;function load(){if(loaded)return;loaded=true;var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=G-MD8FJ0CZG3';document.head.appendChild(s);}
var evs=['scroll','pointerdown','keydown','touchstart','mousemove'];function onev(){evs.forEach(function(e){window.removeEventListener(e,onev);});load();}
evs.forEach(function(e){window.addEventListener(e,onev,{once:true,passive:true});});
if('requestIdleCallback' in window){requestIdleCallback(load,{timeout:6000});}else{setTimeout(load,5000);}})();`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark'}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              // @id spina trzy encje w jeden graf zamiast trzech luźnych węzłów
              // (audyt PELNY2907-31). Przy zerowych backlinkach to najtańszy
              // sygnał tożsamości, jaki możemy dać Knowledge Graph.
              "@id": "https://szabunia.pl/#business",
              // Nazwa ujednolicona 10.08.2026 z encją WebSite (#website), która
              // już wcześniej nazywała się „Marcin Szabunia, fotografia i wideo
              // dla firm". Dwie różne nazwy w jednym grafie to gorszy sygnał
              // tożsamości niż jednorazowa zmiana. Poprzednio: „Marcin Szabunia,
              // fotograf eventowy i biznesowy".
              name: "Marcin Szabunia, fotografia i wideo dla firm",
              // Opis przepisany 10.08.2026 na cztery filary. Poprzedni opisywał
              // ofertę dwufilarową („Obsługa wydarzeń firmowych i wizerunek
              // zespołów"). Znika też „od jednej osoby": przy dużym wydarzeniu
              // dochodzi drugi operator, co mówi wprost FAQ na podstronie
              // Wydarzeń, więc deklaracja przeczyła własnej stronie.
              description:
                "Zdjęcia i film dla firm w czterech obszarach: wydarzenia firmowe, wizerunek firmy i zespołu, nieruchomości i przemysł oraz produkty. Poznań, cała Polska i Europa.",
              url: "https://szabunia.pl",
              telephone: "+48514900688",
              email: "marcin@szabunia.pl",
              // Domknięcie grafu w drugą stronę: firma → osoba (audyt PELNY2907-31).
              founder: { "@id": "https://szabunia.pl/#person" },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Poznań",
                addressCountry: "PL",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 52.4064,
                longitude: 16.9252,
              },
              image: "https://szabunia.pl/images/marcin-hero.jpg",
              // priceRange usunięty świadomie (audyt PELNY2907-41, decyzja Marcina
              // 2026-07-29): po cenniku v3 wartość "od 300 zł" przestała odpowiadać
              // czemukolwiek w ofercie, a strona działa w modelu "cena na zapytanie".
              // Nie przywracać bez decyzji — pusta wartość jest lepsza niż zła.
              // Godziny muszą być identyczne z wizytówką Google (NAP consistency)
              // i nie węższe niż harmonogram reklam. Decyzja Marcina 2026-08-02:
              // pon–pt 08:00–20:00, sob 10:00–16:00, niedziela zamknięte.
              // Zmiana tutaj = zmiana w wizytówce w tym samym ruchu, nigdy osobno.
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                  ],
                  opens: "08:00",
                  closes: "20:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Saturday"],
                  opens: "10:00",
                  closes: "16:00",
                },
              ],
              // aggregateRating + review[] usunięte świadomie (audyt 2026-07-06,
              // decyzja Marcina): wytyczne Google zabraniają markupu opinii
              // dodawanego przez samą firmę (self-serving reviews) — gwiazdek
              // w SERP i tak by nie było, a markup tworzył ryzyko flagi.
              // Opinie pozostają w widocznej treści strony (Testimonials.tsx).
              sameAs: [
                "https://instagram.com/szabunia.biz",
                // Kanoniczny adres wizytówki Google (Knowledge Graph, kgmid /g/11rcwdrdcl).
                // Wcześniej był tu shortlink share.google — działa, ale to domena
                // przekierowująca, nie adres samej encji, więc jako sygnał `sameAs`
                // jest słabszy (audyt PELNY2907-10). Rozwinięcie zweryfikowane
                // w przeglądarce 2026-07-29.
                "https://www.google.com/search?kgmid=/g/11rcwdrdcl",
              ],
              // Katalog przebudowany 10.08.2026 z OŚMIU ofert na CZTERY filary.
              // Usunięte jako osobne oferty: „Sesje zespołowe", „Pakiety Foto +
              // Wideo + Dron", „Wideo marketing", „Zdjęcia i wideo z drona",
              // „Fotografia wnętrz, obiektów i architektury", „Fotografia
              // biznesowa i portretowa". Wszystkie weszły w cztery poniższe.
              //
              // ZASADY, których tu pilnujemy:
              //  - dron pada WYŁĄCZNIE w opisie Nieruchomości, nigdy jako oferta,
              //  - wideo pada jako element usług, nigdy jako osobna oferta,
              //  - `url` wskazuje żywą stronę, nigdy adres spod 301,
              //  - ŻADNYCH cen: `priceRange` został usunięty świadomie 29.07.2026
              //    (model „cena na zapytanie"), więc kwoty w katalogu byłyby
              //    cofnięciem tamtej decyzji. Ceny emitują podstrony usług,
              //    każda swoją, w uslugi/[slug]/page.tsx.
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Usługi fotograficzne i wideo dla firm",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Wydarzenia firmowe",
                      description:
                        "Fotografia i wideo konferencji, gal, targów, szkoleń i integracji, razem z ujęciami z powietrza",
                      url: "https://szabunia.pl/uslugi/eventy-reportaze",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Wizerunek firmy",
                      description:
                        "Portrety biznesowe, headshoty całego zespołu, zdjęcia przy pracy i film wizerunkowy, w studiu albo w biurze klienta",
                      url: "https://szabunia.pl/uslugi/wizerunek-portrety",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Nieruchomości i przemysł",
                      description:
                        "Fotografia i wideo hal, zakładów, biurowców, inwestycji i wnętrz, z powietrza i z poziomu ziemi",
                      url: "https://szabunia.pl/uslugi/nieruchomosci-przemysl",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Fotografia produktowa",
                      description:
                        "Packshoty na białym tle, produkty w aranżacji, zdjęcia reklamowe i wideo produktowe",
                      url: "https://szabunia.pl/uslugi/fotografia-produktowa",
                    },
                  },
                ],
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": "https://szabunia.pl/#person",
              name: "Marcin Szabunia",
              jobTitle: "Fotograf biznesowy i twórca wideo",
              url: "https://szabunia.pl",
              image: "https://szabunia.pl/images/marcin-hero.jpg",
              // Przepisane 10.08.2026. „Fotograf biznesowy" jako otwarcie było
              // węższe niż cztery filary, zwłaszcza przy nieruchomościach
              // i produktach (korekta Marcina). `jobTitle` wyżej zostaje bez
              // zmian, bo opisuje rolę zawodową, a nie katalog usług.
              description:
                "Fotograf i twórca wideo z Poznania. Zdjęcia i film dla firm: wydarzenia firmowe, wizerunek zespołów, nieruchomości i przemysł oraz produkty. Współpracowałem z H&M, Warner Music Poland, Santander Bank Polska, John Deere, IQOS, Amica, Grupa Forte S.A., Centrum Posnania i Woohoo.",
              email: "marcin@szabunia.pl",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Poznań",
                addressRegion: "Wielkopolska",
                addressCountry: "PL",
              },
              // Referencja przez @id zamiast powielonej encji — Google widzi
              // jedną firmę, nie dwie o podobnych nazwach (audyt PELNY2907-31).
              worksFor: { "@id": "https://szabunia.pl/#business" },
              sameAs: [
                "https://instagram.com/szabunia.biz",
                // Kanoniczny adres wizytówki Google (Knowledge Graph, kgmid /g/11rcwdrdcl).
                // Wcześniej był tu shortlink share.google — działa, ale to domena
                // przekierowująca, nie adres samej encji, więc jako sygnał `sameAs`
                // jest słabszy (audyt PELNY2907-10). Rozwinięcie zweryfikowane
                // w przeglądarce 2026-07-29.
                "https://www.google.com/search?kgmid=/g/11rcwdrdcl",
              ],
              // Uporządkowane 10.08.2026. To pole opisuje KOMPETENCJE, nie ofertę,
              // więc nie musi mieć czterech pozycji ani powtarzać nazw usług.
              // Wypadły nazwy zlikwidowanych usług („Wideo marketing", „Zdjęcia
              // i wideo z drona", „Fotografia wnętrz, obiektów i architektury"),
              // weszły nazwy dziedzin. „Fotografia lotnicza", nie „zdjęcia
              // z drona": dron jest narzędziem, dziedzina nazywa się inaczej.
              knowsAbout: [
                "Fotografia biznesowa",
                "Portrety wizerunkowe",
                "Fotografia eventowa",
                "Fotografia produktowa",
                "Fotografia korporacyjna",
                "Fotografia nieruchomości",
                "Fotografia przemysłowa",
                "Fotografia architektury",
                "Fotografia lotnicza",
                "Wideo dla firm",
              ],
              award: "Wyróżnienie w konkursie Portret 2022",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://szabunia.pl/#website",
              name: "Marcin Szabunia, fotografia i wideo dla firm",
              url: "https://szabunia.pl",
              inLanguage: "pl-PL",
              description:
                "Strona fotografa biznesowego i twórcy wideo B2B z Poznania. Portfolio, zakres ustalany przed wyceną, wstępna wycena w 24h.",
              publisher: { "@id": "https://szabunia.pl/#person" },
            }),
          }}
        />
        {/* Analytics: Plausible or Umami — set NEXT_PUBLIC_ANALYTICS_URL in .env */}
        {process.env.NEXT_PUBLIC_ANALYTICS_URL && (
          <script
            defer
            data-domain="szabunia.pl"
            src={process.env.NEXT_PUBLIC_ANALYTICS_URL}
          />
        )}
      </head>
      <body className="font-inter antialiased bg-gray-bg dark:bg-dark-bg text-navy dark:text-dark-text">
        <a href="#main" className="skip-to-content">
          Przejdź do treści
        </a>
        <ThemeProvider>
          {children}
          <CookieConsent />
          <ContactClickTracker />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
