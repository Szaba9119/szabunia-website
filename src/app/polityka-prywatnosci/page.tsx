import Link from "next/link";
import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Polityka prywatności | Marcin Szabunia — Fotograf biznesowy Poznań",
  description:
    "Polityka prywatności serwisu szabunia.pl. Informacje o przetwarzaniu danych osobowych, plikach cookies i prawach użytkownika zgodnie z RODO.",
  alternates: {
    canonical: "/polityka-prywatnosci",
  },
  openGraph: {
    title: "Polityka prywatności | Marcin Szabunia — Fotograf biznesowy Poznań",
    description:
      "Polityka prywatności serwisu szabunia.pl. Informacje o przetwarzaniu danych osobowych, plikach cookies i prawach użytkownika zgodnie z RODO.",
    url: "https://szabunia.pl/polityka-prywatnosci",
    images: [
      {
        url: "/images/marcin-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Marcin Szabunia — Fotograf biznesowy Poznań",
      },
    ],
  },
};

export default function PrivacyPolicy() {
  return (
    <>
      <Navigation />
      <main className="pt-28 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-steel dark:text-dark-text-muted hover:text-blue dark:hover:text-blue-light transition-colors text-sm mb-8"
          >
            ← Wróć na stronę główną
          </Link>

          <h1 className="font-barlow font-extrabold text-3xl md:text-[44px] leading-tight tracking-tight text-navy dark:text-white mb-8">
            Polityka prywatności
          </h1>

          <div className="prose-custom space-y-6 text-[15px] text-steel dark:text-dark-text-muted leading-relaxed">
            <section>
              <h2 className="font-barlow font-bold text-lg text-navy dark:text-white mb-3">
                1. Administrator danych
              </h2>
              <p>
                Administratorem Twoich danych osobowych jest Marcin Szabunia
                (osoba fizyczna), Poznań, Polska. We wszystkich sprawach
                dotyczących Twoich danych skontaktuj się pod adresem:
                marcin@szabunia.pl.
              </p>
            </section>

            <section>
              <h2 className="font-barlow font-bold text-lg text-navy dark:text-white mb-3">
                2. Zakres zbieranych danych
              </h2>
              <p>
                Zbieram dane osobowe, które dobrowolnie podajesz za
                pośrednictwem formularza kontaktowego na stronie: imię i nazwisko
                (lub nazwa firmy), adres e-mail, numer telefonu (opcjonalnie),
                rodzaj usługi oraz treść wiadomości.
              </p>
            </section>

            <section>
              <h2 className="font-barlow font-bold text-lg text-navy dark:text-white mb-3">
                3. Cel i podstawa przetwarzania
              </h2>
              <p>
                Twoje dane przetwarzam w celu odpowiedzi na Twoje zapytanie i
                przygotowania oferty (art. 6 ust. 1 lit. b RODO, podjęcie działań
                przed zawarciem umowy) oraz w celach kontaktowych i marketingu
                bezpośredniego własnych usług (art. 6 ust. 1 lit. f RODO, prawnie
                uzasadniony interes administratora). Jeśli dojdzie do zlecenia,
                przetwarzam dane także w celu wykonania umowy oraz rozliczenia i
                wystawienia faktury (art. 6 ust. 1 lit. b i c RODO).
              </p>
            </section>

            <section>
              <h2 className="font-barlow font-bold text-lg text-navy dark:text-white mb-3">
                4. Odbiorcy danych
              </h2>
              <p>
                Formularz kontaktowy obsługiwany jest przez usługę Resend
                (Resend, Inc., USA), a strona hostowana jest na platformie Vercel
                (Vercel, Inc., USA). Jeśli dojdzie do zlecenia, rozliczenie i
                wystawienie faktury odbywa się przez serwis Useme (useme.com) —
                w tym celu przekazuję do Useme dane niezbędne do wystawienia
                faktury (np. dane do faktury, których potrzebujesz jako nabywca).
                Dane mogą być przekazywane także innym podmiotom świadczącym
                usługi hostingowe, e-mailowe i informatyczne na podstawie umów
                powierzenia przetwarzania danych. Przekazanie danych do USA
                (Resend, Vercel) następuje na podstawie mechanizmów
                zapewniających odpowiedni stopień ochrony — standardowych
                klauzul umownych (SCC) lub udziału tych podmiotów w programie
                EU-US Data Privacy Framework.
              </p>
            </section>

            <section>
              <h2 className="font-barlow font-bold text-lg text-navy dark:text-white mb-3">
                5. Okres przechowywania
              </h2>
              <p>
                Dane przechowuję przez okres niezbędny do realizacji celów, dla
                których zostały zebrane — maksymalnie 2 lata od ostatniego
                kontaktu, chyba że dłuższy okres wymagany jest przepisami prawa.
              </p>
            </section>

            <section>
              <h2 className="font-barlow font-bold text-lg text-navy dark:text-white mb-3">
                6. Twoje prawa
              </h2>
              <p>
                Masz prawo dostępu do swoich danych, ich sprostowania, usunięcia,
                ograniczenia przetwarzania, przenoszenia danych, wniesienia
                sprzeciwu wobec przetwarzania, a także prawo do wniesienia skargi
                do Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2,
                00-193 Warszawa).
              </p>
            </section>

            <section>
              <h2 className="font-barlow font-bold text-lg text-navy dark:text-white mb-3">
                7. Pliki cookies
              </h2>
              <p>
                Strona wykorzystuje niezbędne pliki cookies techniczne (np.
                zapamiętanie preferencji trybu ciemnego) oraz — wyłącznie po
                wyrażeniu zgody w banerze cookie — pliki cookies analityczne
                (Google Analytics 4) i reklamowe (Google Ads), służące do
                analizy ruchu oraz pomiaru skuteczności reklam. Odbiorcą danych
                zbieranych przez te pliki jest Google Ireland Ltd. Zgodę możesz
                odrzucić — strona działa wtedy w pełni, bez pomiaru — a wyrażoną
                zgodę zmienić lub wycofać w każdej chwili, klikając „Ustawienia
                cookies” w stopce strony albo usuwając pliki cookies w swojej
                przeglądarce.
              </p>
              <p className="mt-3">
                Niezależnie od powyższego, platforma hostingowa dostarcza
                bezcookiesowe, zanonimizowane statystyki ruchu i wydajności
                strony (Vercel Web Analytics oraz Vercel Speed Insights,
                dostawca: Vercel, Inc., USA). Narzędzia te nie wykorzystują
                plików cookies ani nie śledzą użytkowników między witrynami;
                dane techniczne (m.in. adres IP, typ przeglądarki) przetwarzane
                są przez Vercel jako podmiot przetwarzający na zasadach
                opisanych w sekcji 4.
              </p>
            </section>

            <section>
              <h2 className="font-barlow font-bold text-lg text-navy dark:text-white mb-3">
                8. Zdjęcia i wideo z realizacji
              </h2>
              <p>
                Przy zleceniach fotograficznych i wideo administratorem danych
                osobowych osób uwidocznionych w wykonanych materiałach jest
                Zamawiający (klient). Te dane przetwarzam wyłącznie w celu
                realizacji umowy i usuwam po zakończeniu współpracy, z wyjątkiem
                wybranych materiałów wykorzystywanych w moim portfolio i
                działaniach marketingowych na podstawie ustaleń z klientem.
                Sprawy dotyczące wizerunku i danych na materiałach: marcin@szabunia.pl.
              </p>
            </section>

            <section>
              <h2 className="font-barlow font-bold text-lg text-navy dark:text-white mb-3">
                9. Zmiany polityki
              </h2>
              <p>
                Zastrzegam sobie prawo do wprowadzania zmian w niniejszej
                polityce prywatności. Aktualna wersja jest zawsze dostępna na tej
                stronie. Ostatnia aktualizacja: czerwiec 2026.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
