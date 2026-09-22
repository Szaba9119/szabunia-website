import Link from 'next/link';
import Image from 'next/image';
import { galleryAlt } from '@/data/galleryAlts';
import AnimatedSection from './AnimatedSection';
import Parallax from './Parallax';
import { PARALLAX } from '@/lib/motion';
import { servicePillars } from '@/data/servicePillars';
import { serviceItems } from '@/data/services';

export default function Services() {
	return (
		<section id='uslugi' className='pt-6 pb-8 md:pt-8 md:pb-12 px-4'>
			<div className='max-w-6xl mx-auto'>
				<AnimatedSection>
					{/* Nagłówek i podtytuł w JEDNYM Parallaxie (13.09.2026). Wcześniej jeździł
					    sam h2 (±24 px) nad odstępem 12 px, więc przy scrollu nachodził na
					    podtytuł. max-w-xl: dwie linie zamiast trzech na desktopie. */}
					{/* ⛔ PODTYTUŁ „Cztery obszary, w których pomagam firmom. Zdjęcia, wideo
					    i ujęcia z drona dobieram do celu realizacji." USUNIĘTY 22.09.2026
					    (zgoda Marcina).

					    Powód: nie wnosił informacji w tym miejscu. Ten sam czwórpodział
					    stoi już wyżej dwa razy, w `h2` hero („LUDZIE. WYDARZENIA. OBIEKTY.
					    PRODUKTY.") i w podpisach kolażu, a dobór narzędzi do celu mówi
					    zdanie pod siatką („Każdy projekt wyceniam indywidualnie…").

					    Rozważone i odrzucone zamienniki: „Zdjęcia i film robię w jednym
					    dniu zdjęciowym" (wprost potwierdzone w `services.tsx` tylko dla
					    dwóch z czterech usług, więc jako zdanie zbiorcze obiecuje za dużo),
					    „W każdym z tych obszarów robię zdjęcia i film" (powtarza „Foto ·
					    Wideo · Dron" i „realizacje foto i wideo" z hero), „Prowadzę całą
					    realizację sam" (powtarza trzeci punkt `TrustLine`, 400 px wyżej).

					    To JEDYNA zmiana w tej turze, którą widać także na komputerze.
					    ⚠ SEO: nagłówek `h2` i cztery opisy usług zostają bez zmian. */}
					<Parallax distance={PARALLAX.accent} direction='up'>
						<h2 className='font-barlow font-extrabold text-3xl md:text-[48px] leading-tight tracking-tight text-navy dark:text-white mb-8 md:mb-10 text-center'>
							Czym mogę pomóc Twojej firmie
						</h2>
					</Parallax>
				</AnimatedSection>

				{/* Usługi — siatka 2×2 (10.08.2026, po przejściu na cztery usługi).
            Wcześniej: sześć kolumn, sześć wąskich kafelków i dwa szerokie
            domykające rząd — konstrukcja istniała wyłącznie po to, żeby przy
            ośmiu usługach nie zostawała „sierota" w ostatnim rzędzie. Przy
            czterech usługach dzieli się równo, więc `wide` i plakietka
            „Bestseller" (dotyczyła usuniętych pakietów) są zbędne.
            Obrazy na mobile w 16:9 zamiast 4:3 — sekcja zajmowała ~6,4 ekranu. */}
				<AnimatedSection>
					{/* `gap-0` na telefonie: wiersze listy rozdziela linia, nie odstęp.
					    Od `sm` wraca siatka 2x2 z odstępami, czyli układ sprzed zmiany. */}
					<div className='grid grid-cols-1 gap-0 border-b border-border dark:border-dark-border sm:border-b-0 sm:grid-cols-2 sm:gap-4 md:gap-6'>
						{servicePillars.map((pillar) => ({ pillar, s: serviceItems.find((item) => item.slug === pillar.slug)! })).map(({ pillar, s }) => {
							// ⛔ REGUŁA Z 06.07.2026 („zdjęcia usług zawsze widoczne na mobile")
							// ZNIESIONA 22.09.2026 WYRAŹNĄ ZGODĄ MARCINA. Nie przywracać zdjęć
							// na telefonie bez nowej decyzji.
							//
							// Tamta decyzja zapadła, gdy hero NIE miało jeszcze klikalnego kolażu
							// z nazwami usług — ten wszedł 14.09.2026. Zdjęcia czterech obszarów
							// są dziś na telefonie widoczne 400 px wyżej, i to większe, więc karty
							// pokazywały drugi przykład tej samej kategorii, nie nową informację.
							//
							// Obejrzane 22.09.2026 przy 390 px: w pierwszych 2 600 px stały trzy
							// bloki kart ze zdjęciami (kolaż, usługi, portfolio). Każdy układ karty
							// rymował z którymś z pozostałych: wersja pionowa z kolażem, pozioma
							// z portfolio. Sekcja usług przestaje więc być blokiem kart i staje się
							// indeksem tekstowym: numer, nazwa, opis, linia.
							//
							// NA KOMPUTERZE ZOSTAJE SIATKA 2x2 ZE ZDJĘCIAMI. Sprawdzone przy 1440 px:
							// podpisy kolażu w hero są tam ukryte do najechania kursorem, więc kolaż
							// czyta się jako fotografia, nie jako menu; karty portfolio stoją w czterech
							// węższych kolumnach, więc nie rymują z dwiema kolumnami usług. Problem
							// jest mobilny i poprawka też.
							return (
								/* Telefon: wiersz listy oddzielony cienką linią, bez tła, obrysu
								   i zaokrąglenia. Od `sm` wszystkie klasy karty wracają pod prefiksem
								   `sm:`, w brzmieniu sprzed 22.09.2026. */
								<div
									key={s.title}
									className='border-t border-border dark:border-dark-border sm:border sm:rounded-2xl sm:bg-white sm:dark:bg-dark-card sm:hover:border-blue sm:dark:hover:border-blue sm:transition-all sm:hover:-translate-y-0.5 group sm:overflow-hidden'
								>
									{/* Kafel usługi to jedyne miejsce, gdzie klient deklaruje,
                      czego chce, ZANIM dojdzie do formularza. Bez `data-cta`
                      delegat go nie łapie i nie wiadomo, czy porzucenie następuje
                      na wyborze usługi, czy na formularzu (PELNY2608-13). */}
									{/* TELEFON: KARTA POZIOMA, ZDJĘCIE OBOK TEKSTU (22.09.2026).
                      Wcześniej ten sam układ co na komputerze, tylko ściśnięty do
                      jednej kolumny: zdjęcie 16:9 na pełną szerokość, pod nim tytuł
                      i opis. Cztery takie karty dawały 1 937 px, a sekcja stała
                      między kolażem w hero a portfolio, więc do realizacji trzeba
                      było przewinąć cztery ekrany.

                      Drugi powód jest kompozycyjny i ważniejszy. Kolaż w hero to
                      też cztery zdjęcia z nazwami usług, prowadzące pod te same
                      cztery adresy. Przy zdjęciu na pełną szerokość obie sekcje
                      czytały się jak dwa te same menu jedno pod drugim. Po zmianie
                      hero zostaje przy fotografii, a ta sekcja przy wyjaśnieniu:
                      prowadzi tytuł i opis, zdjęcie jest miniaturą przy nich.

                      Wzorzec wzięty z `Portfolio.tsx` (układ zaakceptowany
                      13.09.2026), żeby nie mnożyć trzeciego rodzaju karty.
                      Od `sm` wszystko wraca do siatki 2x2 ze zdjęciem 3:2. */}
									<Link
										href={`/uslugi/${s.slug}`}
										data-cta={`uslugi_karta_${s.slug}`}
										className='grid grid-cols-[2.25rem_minmax(0,1fr)] items-start py-5 active:opacity-60 sm:block sm:py-0 sm:active:opacity-100'
									>
										{/* Numeracja bierze się z `servicePillars`, czyli z tego samego
                        źródła co kolejność usług. `aria-hidden`, bo czytnik ekranu
                        ma czytać nazwę usługi, nie „zero jeden". Na komputerze
                        numeru nie ma: tam porządek niesie siatka. */}
										<span
											aria-hidden='true'
											className='sm:hidden font-barlow font-bold text-[13px] tabular-nums text-steel dark:text-dark-text-muted pt-px'
										>
											{pillar.number}
										</span>
										{/* `hidden` na telefonie, nie usunięcie z drzewa, bo komponent
                        jest serwerowy i nie zna szerokości ekranu.

                        ⚠ SPROSTOWANIE WŁASNEGO ZAŁOŻENIA (22.09.2026). Napisałem tu
                        najpierw, że kontener bez rozmiaru nigdy nie wchodzi w widok,
                        więc przeglądarka obrazu nie pobierze. To nieprawda: zmierzone
                        przy 390 px, wszystkie cztery obrazy były pobrane. Chrome
                        pobiera obraz `loading="lazy"` umieszczony w `display:none`
                        od razu, bo nie ma czego obserwować.

                        STAN FAKTYCZNY: telefon pobiera te cztery pliki i ich nie
                        pokazuje. Zmierzony koszt to 55,7 KB (3,5 + 19,0 + 16,9 +
                        17,6 KB przy 390 px). To nie jest pogorszenie wobec stanu
                        sprzed zmiany, bo wtedy pobierały się te same pliki, tylko
                        były widoczne. Zejście niżej wymagałoby nierenderowania
                        elementu, czyli komponentu klienckiego albo ręcznego
                        `<picture>` z zapytaniem medialnym. Za 55 KB nie warto. */}
										{s.image && (
											<div className='hidden sm:block relative overflow-hidden bg-border dark:bg-dark-border sm:aspect-[3/2]'>
												<Image
													src={s.image}
													/* ZDJ2608-11: opis obejrzanego kadru zamiast szablonu z nazwy usługi. */
													alt={galleryAlt(
														s.image,
														`${s.title}, przykładowa realizacja`,
													)}
													fill
													/* Telefon: kafel ok. 132 px szerokości, ale kadr 3:2
                             wypełnia go WYSOKOŚCIĄ, więc renderuje się ok. dwa
                             razy szerzej niż kafel — stąd 260 px, nie 132.
                             Ten sam rachunek co `tileSizes` w `Hero.tsx`.
                             Od `sm` dwie kolumny w `max-w-6xl`: (1152-24)/2 = 564. */
													/* Poniżej `sm` kafel jest ukryty, więc deklarujemy
                             16 px, czyli tyle, ile obraz naprawdę zajmuje.
                             Przeglądarka dostanie i tak wariant 384 px: dopóki
                             w `sizes` stoi jakikolwiek `vw`, Next odcina listę
                             kandydatów na `deviceSizes[0] * najmniejszy vw`,
                             czyli 640 * 0,5 = 320, a pierwszy kandydat powyżej
                             to 384. Ten człon i tak wybiera najmniejszego
                             dostępnego zamiast liczonego z 50vw.
                             Od `sm` dwie kolumny w `max-w-6xl`: (1152-24)/2 = 564. */
													sizes='(max-width: 639px) 16px, (max-width: 1183px) 50vw, 564px'
													style={{ objectPosition: s.imagePos }}
													className='object-cover transition-transform duration-500 group-hover:scale-105'
												/>
											</div>
										)}
										<div className='min-w-0 sm:p-6'>
											<div className='flex items-start gap-2 mb-1.5 sm:items-center sm:gap-2.5 sm:mb-2'>
												<h3 className='font-barlow font-bold text-[15px] sm:text-base text-navy dark:text-white'>
													{s.title}
												</h3>
												{/* `ml-auto`: strzałka stoi w kolumnie przy prawej krawędzi,
                            nie przy ostatnim słowie tytułu. Bez tego wyglądała
                            na doklejoną przy tytułach jednowierszowych, a przy
                            dwuwierszowym („Fotografia i wideo nieruchomości
                            i przemysłu") i tak uciekała do krawędzi, więc trzy
                            wiersze wyrównywały się inaczej niż czwarty. */}
												<span
													aria-hidden='true'
													className='sm:hidden ml-auto shrink-0 text-blue dark:text-blue-light text-[13px] leading-6'
												>
													→
												</span>
											</div>
											{/* ⛔ ETYKIETA „wycena w 24h" ZDJĘTA Z KAFELKA 14.08.2026
                          (decyzja Marcina, przegląd po deployu).

                          Powód jest kompozycyjny, nie treściowy. Na `/uslugi` ta sama
                          etykieta siedzi w wierszu z separatorem (`border-t`) i jest
                          sparowana z „Zobacz szczegóły →", więc ma przeciwwagę. Tutaj
                          stała jako samotny akapit pod opisem, bez linii i bez pary,
                          i wisiała pod kafelkiem.

                          Informacja nie ginie: pod siatką stoi zdanie „Każdy projekt
                          wyceniam indywidualnie... wstępna wycena w ciągu 24h", które
                          mówi to samo raz dla wszystkich czterech usług zamiast
                          czterokrotnie. Kafelek na `/uslugi` zostaje bez zmian. */}
											<p className='text-steel dark:text-dark-text-muted text-[13px] leading-relaxed'>
												{s.desc}
											</p>
										</div>
									</Link>
								</div>
							);
						})}
					</div>
					{/* ⛔ ZDANIE „Kwoty startowe. Zakres i cena ustalane indywidualnie."
              USUNIĘTE 14.08.2026 (depricing).

              Powstało 10.08.2026, żeby zamknąć realny problem: kafelek eventów
              mówił „Zdjęcia, film i dron z jednego dnia", a pod spodem stała
              kwota startowa, więc czytane razem sugerowały cały dzień z filmem
              i dronem za tę kwotę. Słowo „startowe" było wtedy nośnikiem
              informacji, nie ozdobą.

              Po zdjęciu kwot zdanie mówi nieprawdę (żadnych kwot na kafelkach
              nie ma) i dubluje komunikat stojący kilkanaście linijek niżej
              („Każdy projekt wyceniam indywidualnie... wstępna wycena w 24h"),
              który mówi to samo i jest przy CTA. Nie przywracać bez kwot. */}
				</AnimatedSection>

				{/* Linijka o modelu wyceny „na zapytanie" + CTA do formularza
            (2026-07-23, prośba Marcina). Wyjątek od „bez bocznych wyjść": to CTA
            konwersyjne do #kontakt (ten sam cel co hero), nie link informacyjny.
            Głos strony, bez żargonu „brief". */}
				<AnimatedSection>
					<div className='mt-12 text-center'>
						<p className='text-steel dark:text-dark-text-muted text-[15px] max-w-xl mx-auto'>
							Każdy projekt wyceniam indywidualnie. Napisz w kilku zdaniach, co
							planujesz, a odeślę Ci wstępną wycenę{' '}
							<span className='text-navy dark:text-white font-semibold'>
								w ciągu 24 godzin
							</span>
							.
						</p>
						{/* `#kontakt`, nie `/kontakt` — formularz jest na tej samej stronie.
						    Patrz komentarz w `Hero.tsx`. */}
						<a
							href='#kontakt'
							data-cta='wycena_home_uslugi'
							className='mt-6 inline-flex items-center gap-2 bg-gradient-to-br from-blue to-blue text-white px-7 py-3.5 rounded-xl font-barlow font-bold text-[15px] btn-glow transition-transform hover:scale-[1.02]'
						>
							Zapytaj o ofertę
							<span className='text-white/80'>→</span>
						</a>
					</div>
				</AnimatedSection>

				{/* Link „Zobacz wszystkie usługi" usunięty (decyzja Marcina, 2026-07-07:
            lejek bez bocznych wyjść — kafle i tak prowadzą do podstron usług).
            Link SEO z home do huba /uslugi przeniesiony do stopki (Footer.tsx). */}
			</div>
		</section>
	);
}
