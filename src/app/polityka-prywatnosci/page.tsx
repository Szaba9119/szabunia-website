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

          <h1 className="font-barlow font-extrabold text-3xl md:text-[42px] leading-tight tracking-tight text-navy dark:text-white mb-8">
            Polityka prywatności
          </h1>

          <div className="prose-custom space-y-6 text-[15px] text-steel dark:text-dark-text-muted leading-relaxed">
            <section>
              <h2 className="font-barlow font-bold text-lg text-navy dark:text-white mb-3">
                1. Administrator danych
              </h2>
              <p>
                Administratorem Twoich danych osobowych jest Marcin Szabunia,
                prowadzący działalność pod adresem: Poznań, Polska (NIP:
                7822913664). Kontakt: marcin@szabunia.pl.
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
                przygotowania oferty (art. 6 ust. 1 lit. b RODO — podjęcie
                działań przed zawarciem umowy) oraz w celach kontaktowych i
                marketingu bezpośredniego własnych usług (art. 6 ust. 1 lit. f
                RODO — prawnie uzasadniony interes administratora).
              </p>
            </section>

            <section>
              <h2 className="font-barlow font-bold text-lg text-navy dark:text-white mb-3">
                4. Odbiorcy danych
              </h2>
              <p>
                Formularz kontaktowy obsługiwany jest przez usługę Resend
                (Resend, Inc., USA). Dane mogą być przekazywane do podmiotów
                świadczących usługi hostingowe, e-mailowe i informatyczne na
                podstawie umów powierzenia przetwarzania danych.
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
                Strona wykorzystuje jedynie niezbędne pliki cookies techniczne
                (np. zapamiętanie preferencji trybu ciemnego). Nie stosujemy
                cookies analitycznych ani reklamowych. Ustawienia cookies możesz
                zmienić w swojej przeglądarce.
              </p>
            </section>

            <section>
              <h2 className="font-barlow font-bold text-lg text-navy dark:text-white mb-3">
                8. Zmiany polityki
              </h2>
              <p>
                Zastrzegam sobie prawo do wprowadzania zmian w niniejszej
                polityce prywatności. Aktualna wersja jest zawsze dostępna na tej
                stronie. Ostatnia aktualizacja: luty 2026.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
