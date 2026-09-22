'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import YouTubeFacade from './YouTubeFacade';
import SecondaryLink from './SecondaryLink';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import type { GalleryVideo } from '@/data/galeria';

export interface SizedImage {
	src: string;
	width: number;
	height: number;
}

export interface GalleryCategory {
	key: string;
	label: string;
	images: SizedImage[];
	alt: string;
	/** Rotujące opisowe alt teksty; i-te zdjęcie dostaje wariant i % length. */
	altVariants?: string[];
	/** Kafelki o stałej proporcji zamiast siatki murowanej.
      Włączone tam, gdzie zdjęcia mają bardzo różne proporcje (produktowe: od 0,56
      do 1,50), przez co kolumny kończyły się na różnych wysokościach i rzędy
      przestawały być rzędami. Kolejność w tych kategoriach jest ułożona
      tematycznie po trzy, więc rząd musi wyglądać jak rząd. */
	uniformTiles?: boolean;
	/** Przejście do odpowiadającej usługi, renderowane pod siatką (11.08.2026).
      Mapa kategoria → usługa siedzi w `app/galeria/page.tsx` (CATEGORY_SERVICE),
      komponent tylko renderuje to, co dostanie. Kategoria bez wpisu (dziś `wideo`)
      nie renderuje nic i zachowuje własne linki do case studies. */
	service?: { label: string; href: string };
}

/**
 * Alt dla i-tego zdjęcia.
 *
 * ZDJ2608-04 (04.08.2026): gdy wariantów jest tyle co kadrów, opis jest już unikalny
 * i opisuje TEN kadr, więc dopisek „, kadr N" tylko zaśmieca i wraca wzorzec opisu
 * pozycji zamiast obrazu. Numer zostaje wyłącznie tam, gdzie lista jest krótsza od
 * galerii i rotuje (dziś tylko `produktowe`), bo bez niego powtórzyłby się ten sam tekst.
 */
function altFor(
	cat:
		| { alt: string; altVariants?: string[]; images?: SizedImage[] }
		| undefined,
	i: number,
): string {
	if (!cat) return `Fotografia ${i + 1}`;
	const variants = cat.altVariants;
	if (variants?.length) {
		const rotating = !cat.images || variants.length < cat.images.length;
		const base = variants[i % variants.length];
		return rotating ? `${base}, kadr ${i + 1}` : base;
	}
	return `${cat.alt}, kadr ${i + 1}`;
}

export default function GalleryView({
	categories,
	videos,
}: {
	categories: GalleryCategory[];
	videos: GalleryVideo[];
	initialActive?: string;
}) {
	const tabs = [
		...categories.map((c) => ({ key: c.key, label: c.label })),
		{ key: 'wideo', label: 'Wideo' },
	];
	const searchParams = useSearchParams();
	const requested = searchParams.get('kat');
	const active = tabs.some((tab) => tab.key === requested)
		? requested!
		: tabs[0]?.key ?? 'wideo';
	const [lightbox, setLightbox] = useState<number | null>(null);
	// Indeks kafla, z którego otwarto podgląd, NIE referencja do węzła DOM.
	// Zamknięcie idzie dziś przez `popstate`, a ten odpala ponowne renderowanie
	// routera Next, po którym zapamiętany węzeł bywa odpięty od dokumentu i
	// `focus()` na nim nic nie robi — fokus lądował na `body` (22.09.2026).
	// Po indeksie kafel odnajdujemy zawsze, także po ponownym renderowaniu.
	const triggerIndex = useRef<number | null>(null);
	const dialogRef = useRef<HTMLDivElement | null>(null);
	const tabsRef = useRef<HTMLDivElement | null>(null);
	const sectionRef = useRef<HTMLDivElement | null>(null);
	const touchStart = useRef<{ x: number; y: number } | null>(null);
	const closingRef = useRef(false);

	const activeCat = categories.find((c) => c.key === active);
	const images = activeCat?.images ?? [];
	const imageCount = images.length;

	const restoreFocus = useCallback(() => {
		const index = triggerIndex.current;
		if (index === null) return;
		// Dwie próby w kolejnych klatkach. Zamknięcie przez `popstate` odpala
		// ponowne renderowanie routera Next, które potrafi wymienić kafel PO
		// pierwszej klatce — wtedy fokus z pierwszej próby przepada i zostaje
		// tam, gdzie był. Druga próba trafia już w nowy węzeł.
		const focusTile = () => {
			const tile = sectionRef.current?.querySelector<HTMLButtonElement>(
				`[data-tile="${index}"]`,
			);
			tile?.focus();
			return document.activeElement === tile;
		};
		requestAnimationFrame(() => {
			if (!focusTile()) requestAnimationFrame(focusTile);
		});
	}, []);

	// Otwarcie podglądu dokłada wpis do historii (22.09.2026). Bez tego przycisk
	// Wstecz na telefonie wyrzucał z galerii zamiast zamknąć podgląd — nasłuch
	// `popstate` niżej istniał, ale nie było czego cofać, bo nic nie wchodziło
	// na stos. Adres zostaje ten sam, więc cofnięcie nie zmienia tego, co widać.
	const openLightbox = useCallback(
		(index: number) => {
			triggerIndex.current = index;
			closingRef.current = false;
			setLightbox(index);
			window.history.pushState({ szLightbox: true }, '', window.location.href);
		},
		[],
	);

	// Jedna droga zamykania: przycisk, tło, Escape i gest cofają wpis, a stan
	// czyści obsługa `popstate`. Gałąź `else` łapie przypadek, w którym wpisu nie
	// ma (np. podgląd otwarty przed hydratacją nasłuchu).
	// `closingRef` chroni przed podwójnym cofnięciem. Kliknięcie w „✕" bąbelkuje
	// do tła, które ma ten sam `onClick`, więc `close` wchodzi dwa razy i bez tej
	// blokady `history.back()` cofał o DWA wpisy: zamknięcie podglądu wyrzucało
	// z galerii na poprzednią stronę (zmierzone 22.09.2026). Przyciski strzałek
	// miały `stopPropagation` od początku, przycisk zamknięcia nie.
	const close = useCallback(() => {
		if (closingRef.current) return;
		closingRef.current = true;
		if (window.history.state?.szLightbox) {
			window.history.back();
			return;
		}
		setLightbox(null);
		restoreFocus();
	}, [restoreFocus]);
	const prev = useCallback(
		() =>
			setLightbox((i) =>
				i === null ? null : (i - 1 + imageCount) % imageCount,
			),
		[imageCount],
	);
	const next = useCallback(
		() => setLightbox((i) => (i === null ? null : (i + 1) % imageCount)),
		[imageCount],
	);

	const selectTab = (key: string) => {
    if (key === active) return;
		setLightbox(null);
		// Na telefonie pasek przewija się w poziomie: dosuwamy klikniętą zakładkę,
		// żeby po zmianie kategorii było widać, która jest aktywna.
		tabsRef.current
			?.querySelector<HTMLElement>(`[data-tab="${key}"]`)
			?.scrollIntoView({
				block: 'nearest',
				inline: 'center',
				behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
			});
		// Powrót na górę sekcji. Bez tego po przełączeniu kategorii w połowie galerii
		// lądujesz w środku nowego zestawu i nie wiadomo, gdzie jest początek
		// (Marcin 04.08.2026: „żeby dawało go do góry, by mógł dalej scrolować w dół").
		//
		// UWAGA: mierzymy korzeń sekcji, NIE przyklejony pasek. Element `sticky`
		// w stanie przyklejonym raportuje pozycję przyklejoną (96 px od góry), więc
		// liczony z niego cel wychodził równy bieżącemu scrollY i przewijanie nigdy
		// się nie odpalało (zgłoszone przez Marcina: „na komputerach nie przesuwa
		// do góry"). Korzeń sekcji nie jest przyklejony, więc podaje prawdę.
		const root = sectionRef.current;
		if (root) {
			const y = root.getBoundingClientRect().top + window.scrollY - 96;
			if (window.scrollY > y + 4)
				window.scrollTo({ top: y, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
		}
		if (typeof window !== 'undefined') {
			const url = new URL(window.location.href);
			url.searchParams.set('kat', key);
			window.history.pushState(null, '', url);
		}
	};

	useEffect(() => {
    const closeOnHistory = () => {
      closingRef.current = false;
      setLightbox((current) => {
        if (current !== null) restoreFocus();
        return null;
      });
    };
    window.addEventListener('popstate', closeOnHistory);
    return () => window.removeEventListener('popstate', closeOnHistory);
  }, [restoreFocus]);

	// Klawiatura + blokada scrolla, gdy otwarty lightbox
	useEffect(() => {
		if (lightbox === null) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') close();
			else if (e.key === 'ArrowLeft') prev();
			else if (e.key === 'ArrowRight') next();
		};
		document.addEventListener('keydown', onKey);
		document.body.style.overflow = 'hidden';
		return () => {
			document.removeEventListener('keydown', onKey);
			document.body.style.overflow = '';
		};
	}, [lightbox, close, prev, next]);

	// Fokus na oknie podglądu po otwarciu + pułapka fokusu Tab (dostępność)
	useFocusTrap(dialogRef, lightbox !== null);

	// Wstępne wczytanie sąsiednich zdjęć — płynniejsza nawigacja.
	// Zależność od `active` (a nie tablicy `images`) wystarcza: zmiana kategorii odświeża zestaw.
	useEffect(() => {
		if (lightbox === null || imageCount < 2) return;
		[
			(lightbox + 1) % imageCount,
			(lightbox - 1 + imageCount) % imageCount,
		].forEach((idx) => {
			const src = images[idx]?.src;
			if (!src) return;
			const im = new window.Image();
			im.src = src;
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps -- `images` pochodzi z `active`; identyczność tablicy nie ma znaczenia
	}, [lightbox, imageCount, active]);

	return (
		<div ref={sectionRef}>
			{/* Zakładki kategorii — przyklejone pod nawigacją, żeby dało się zmienić
          kategorię bez wracania na górę (prośba Marcina 04.08.2026).
          `top-24` mija pływający pasek nawigacji (`fixed top-0` + `pt-4`).
          `z-30` trzyma je pod nawigacją (z-50) i pod lightboxem (z-100).
          Na telefonie jeden rząd z przewijaniem w poziomie zamiast zawijania
          do trzech rzędów, które po przyklejeniu zjadałyby pół ekranu. */}
			<div className='sticky top-24 z-30 -mx-4 px-4 mb-8'>
				<div
					ref={tabsRef}
					aria-label='Kategorie galerii'
					className='flex sm:flex-wrap sm:justify-center gap-2 overflow-x-auto sm:overflow-visible scrollbar-none snap-x snap-mandatory py-2 px-3 rounded-full bg-white/85 dark:bg-[rgba(11,15,26,0.9)] backdrop-blur-xl border border-border/70 dark:border-dark-border shadow-sm'
				>
					{tabs.map((t) => (
						<button
							key={t.key}
							type='button'
							data-tab={t.key}
							onClick={() => selectTab(t.key)}
							aria-pressed={active === t.key}
							className={`shrink-0 snap-start px-4 py-2 rounded-full text-[13px] font-barlow font-semibold transition-colors ${
								active === t.key
									? 'bg-blue text-white'
									: 'bg-blue-pale dark:bg-dark-card text-text-body dark:text-dark-text-muted hover:text-navy dark:hover:text-white border border-transparent dark:border-dark-border'
							}`}
						>
							{t.label}
						</button>
					))}
				</div>
			</div>

			{/* Wideo — odtwarzanie na miejscu (fasada), bez wyrzucania na YouTube */}
			{active === 'wideo' ? (
				<div>
					<div
						className={`grid grid-cols-1 gap-5 ${
							videos.filter((v) => !v.vertical).length >= 3
								? 'md:grid-cols-3'
								: 'md:grid-cols-2'
						}`}
					>
						{videos
							.filter((v) => !v.vertical)
							.map((v) => (
								<div key={v.youtubeId}>
									<YouTubeFacade
										id={v.youtubeId}
										title={v.title}
										className='mt-0'
									/>
									<p className='mt-2.5 text-[13px] font-barlow font-semibold text-navy dark:text-white'>
										{v.title}
									</p>
								</div>
							))}
					</div>

					<div
						className={`mt-8 grid grid-cols-1 gap-5 ${
							videos.filter((v) => v.vertical).length >= 5
								? 'md:grid-cols-5'
								: 'md:grid-cols-4'
						}`}
					>
						{videos
							.filter((v) => v.vertical)
							.map((v) => (
								<div key={v.youtubeId}>
									<YouTubeFacade
										id={v.youtubeId}
										title={v.title}
										vertical
										className='mt-0'
									/>
									<p className='mt-2.5 text-[13px] font-barlow font-semibold text-navy dark:text-white'>
										{v.title}
									</p>
								</div>
							))}
					</div>

					<p className='mt-10 text-center text-[14px] text-steel dark:text-dark-text-muted'>
						Zobacz pełne realizacje wideo:{' '}
						<Link
							href='/portfolio/woohoo-autopay'
							className='text-blue dark:text-blue-light font-barlow font-semibold hover:underline'
						>
							E-commerce All-in
						</Link>{' '}
						i{' '}
						<Link
							href='/portfolio/artech-fotografia-produktowa'
							className='text-blue dark:text-blue-light font-barlow font-semibold hover:underline'
						>
							Artech
						</Link>
						.
					</p>
				</div>
			) : (
				/* Zdjęcia — równa siatka zamiast masonry. Masonry zachowywało naturalne
           proporcje, ale kolumny rozjeżdżały się wysokością i każdy rząd miał inną
           linię zakończenia. Kadr źródłowy pozostaje dostępny w lightboxie. */
				/* TELEFON: SIATKA 3-KOLUMNOWA, KWADRATOWE MINIATURY (22.09.2026).
				   Wcześniej `grid-cols-1`, czyli jedno zdjęcie na rząd przez całą szerokość.
				   Zmierzone przy 375 px: kafel 343x457, a sama siatka produktowa 18 499 px,
				   przy dokumencie 26 973 px. Do przycisku pod galerią trzeba było przewinąć
				   42 pełnoekranowe zdjęcia, więc materiał z końca listy nie był oglądany.
				   Po zmianie kafel ma 112 px, a ta sama siatka ok. 1 700 px.

				   Kwadrat, nie proporcja kategorii: przy trzech kolumnach rząd musi być
				   rzędem niezależnie od tego, czy kadry są pionowe, czy poziome — to ten
				   sam problem, który `uniformTiles` rozwiązywał tylko w dwóch kategoriach.
				   Od `sm` proporcje kategorii i odstępy 12 px wracają bez zmian, więc
				   widok na komputerze zostaje taki, jaki był.

				   TRZY KOLUMNY NA CAŁEJ SZEROKOŚCI TELEFONU (zweryfikowane na zrzutach
				   22.09.2026). Pierwsza wersja tej zmiany schodziła poniżej 360 px do
				   dwóch kolumn, bo kafel ma tam 93 px. Porównanie obu wariantów przy
				   320 px pokazało, że 93 px wystarcza: twarz, strój, poza i tło są
				   rozpoznawalne, a rząd czyta się jak arkusz stykowy.

				   Dwie kolumny robiły za to gorszą rzecz: przy 320 px kafel miał 142 px,
				   a przy 360 px już tylko 107 px. Ekran rósł o 12%, a zdjęcie malało
				   o 25%. Trzy kolumny na całym zakresie dają ciąg rosnący:
				   93 / 107 / 117 / 130 px przy 320 / 360 / 390 / 430 px. */
				<div className='grid grid-cols-3 gap-1 sm:gap-3'>
					{images.map((img, i) => {
						// KADROWANIE, NIE SAMA SZEROKOSC KAFLA. `object-cover` skaluje zdjecie
						// tak, zeby WYPELNILO kafel, i przycina nadmiar. Kadr szerszy od kafla
						// jest wiec renderowany szerzej niz kafel, a piksele potrzebne poziomo to
						// `szerokosc kafla * (proporcje kadru / proporcje kafla)`. Sama szerokosc
						// kafla zaniza rozdzielczosc: zmierzone 19% dla kwadratowego packshotu
						// w kaflu 4/5 i 7% dla kadru 3:2 w kaflu 4/3 (pomiar 1920 px, 20.09.2026).
						// Ten sam wzorzec co `tileSizes` w `Hero.tsx`, tylko liczony per zdjecie:
						// `SizedImage` niesie `width` i `height`, wiec stala kategorialna bylaby
						// najszerszym kadrem narzuconym calej kategorii. Kadr zgodny z kaflem ma
						// wtedy mnoznik 1 i nie doplaca za sasiadow.
						const isPortraitCat =
							activeCat?.key === 'portrety' || activeCat?.key === 'zespolowe';
						const tileAR = isPortraitCat
							? 3 / 4
							: activeCat?.uniformTiles
								? 4 / 5
								: 4 / 3;
						const srcAR = img.width / img.height;
						const coverBoost = Math.max(1, srcAR / tileAR);
						// Telefon ma inny kafel niż `sm` w górę (kwadrat zamiast proporcji
						// kategorii), więc mnożnik kadrowania liczy się dla niego osobno.
						// Dla kafla 1:1 proporcja kafla wynosi 1, stąd sam `srcAR`.
						// Mnożnik 0,97 to ten sam zabieg, co w `ServiceGalleryStrip.tsx`:
						// Next generuje warianty tylko z siatki 128/256/384/640 px, więc
						// deklaracja większa o jeden piksel przeskakuje na kolejny wariant.
						// Zmierzone przy 430 px i DPR 2: kadr 3:2 potrzebował 390 px, czyli
						// 6 px ponad wariant 384, i pobierał 640 px, czyli 2,8x więcej
						// powierzchni obrazu, niż widać na ekranie (22.09.2026).
						const mobileBoost = Math.max(1, srcAR) * 0.97;
						return (
						<button
							key={img.src}
							type='button'
							data-tile={i}
							onClick={() => openLightbox(i)}
							aria-label={`Powiększ: ${altFor(activeCat, i)}`}
							className={`relative block w-full rounded-md sm:rounded-xl overflow-hidden bg-border dark:bg-dark-card group aspect-square ${
								isPortraitCat
									? 'sm:aspect-[3/4]'
									: activeCat?.uniformTiles
										? 'sm:aspect-[4/5]'
										: 'sm:aspect-[4/3]'
							}`}
						>
							<Image
								src={img.src}
								alt={altFor(activeCat, i)}
								fill
								// SEO2609-08 (14.09.2026): pierwszy kafel jest elementem LCP,
								// a `lazy` opóźniało jego pobranie o 218–572 ms.
								priority={i < 3}
								loading={i < 3 ? undefined : 'lazy'}
								fetchPriority={i === 0 ? 'high' : undefined}
								// Kafel ma 365 px (kontener `max-w-6xl` Z paddingiem w tym samym
								// elemencie: 1152 - 32 = 1120, minus dwie przerwy 12 px, na trzy),
								// przemnozone przez `coverBoost` z kadrowania. Samo `33vw` bylo
								// przypadkowo blisko celu na szerokim ekranie, ale zanizalo posrodku
								// zakresu: przy 1000 px deklarowalo 330 px przy potrzebnych 387 px.
								// Trzy progi: telefon ma inny kafel niż `sm` w górę (kwadrat
								// zamiast proporcji kategorii), a powyżej 1152 px kafel
								// przestaje rosnąć. Odjęte piksele to padding kontenera (32)
								// plus odstępy: 4 px x 2 na telefonie, 12 px x 2 od `sm`.
								// Ostatni człon w pikselach: (1152 - 32 - 24) / 3 = 365.
								sizes={`(max-width: 639px) calc((100vw - 40px) / 3 * ${mobileBoost.toFixed(3)}), (min-width: 1152px) ${Math.ceil(365 * coverBoost)}px, calc((100vw - 56px) / 3 * ${coverBoost.toFixed(3)})`}
								/* Kwadrat przycina pionowy portret u góry i u dołu, więc
								   kotwiczymy kadr wyżej: przy `object-center` znikała część
								   głowy. Od `sm` kafel jest znów 3:4 i kotwica nie jest
								   potrzebna. Ten sam wzorzec co `thumbPosition` w
								   `ServiceGalleryStrip.tsx`. */
								className={`object-cover transition-opacity group-hover:opacity-90 ${
									isPortraitCat ? 'object-[50%_20%] sm:object-center' : ''
								}`}
							/>
						</button>
						);
					})}
				</div>
			)}

			{/* Przejście do odpowiadającej usługi, pod siatką (11.08.2026).
          Link tekstowy, nie przycisk: na górze `/galeria` stoi już „Zapytaj
          o ofertę", a ten odsyłacz ma być podporządkowany galerii, nie
          konkurować z nią.

          ⚠ SPROSTOWANIE poprzedniego komentarza w tym miejscu, który mówił
          „te same klasy co linia z case studies w zakładce Wideo niżej".
          Nie były te same i być nie mogły, bo nie było czego zaimportować:
          tamta linia ma 14 px z podkreśleniem, a wszystkie poboczne odsyłacze
          w serwisie 13 px ze strzałką. Ten odsyłacz był jedyną kopią wzorca,
          która odpadła od reszty (audyt UI 11.08.2026, finding C5).

          Linki w zakładce Wideo ZOSTAJĄ jak były i to jest celowe: siedzą
          WEWNĄTRZ zdania („Zobacz pełne realizacje wideo: X i Y"), a strzałka
          i `inline-flex` rozbiłyby je w środku wiersza. To inny rodzaj linku,
          nie ta sama funkcja.

          Warunek na `activeCat?.service` sam wyklucza zakładkę Wideo: `wideo`
          nie jest kategorią w `categories` (dochodzi osobno do `tabs`), więc
          `activeCat` jest wtedy `undefined`. */}
			{/* `mt-7`, nie `mt-10`: `SecondaryLink` ma 12 px własnego górnego paddingu
          (cel dotykowy 45 px), więc 28 px marginesu daje 40 px odstępu optycznego
          od siatki, tyle co przed dołożeniem paddingu (11.08.2026). */}
			{activeCat?.service && (
				<p className='mt-7 text-center'>
					<SecondaryLink href={activeCat.service.href}>
						Poznaj usługę: {activeCat.service.label}
					</SecondaryLink>
				</p>
			)}

			{/* CTA pod każdą kategorią: galeria pokazuje wybrane kadry, a pełniejsze
			    portfolio dobieram już do konkretnego projektu klienta. */}
			<div className='mt-10 rounded-2xl border border-blue/20 dark:border-blue-light/20 bg-blue-pale/60 dark:bg-blue/10 px-5 py-7 text-center sm:px-8'>
				<p className='mx-auto max-w-2xl text-[15px] leading-relaxed text-text-body dark:text-dark-text'>
					Chcesz zobaczyć więcej zdjęć z podobnych realizacji? Napisz, czego
					potrzebujesz, a wyślę więcej zdjęć z realizacji podobnych
					do Twojej.
				</p>
				<a
					href='#kontakt'
					data-cta={`portfolio_galeria_${active}`}
					className='mt-5 inline-flex items-center gap-2 rounded-xl bg-blue px-6 py-3 text-[14px] font-barlow font-bold text-white btn-glow transition-transform hover:scale-[1.02]'
				>
					Zapytaj o ofertę
					<span aria-hidden='true' className='text-white/80'>
						→
					</span>
				</a>
			</div>

			{/* Lightbox */}
			{lightbox !== null && activeCat && (
				<div
					ref={dialogRef}
					tabIndex={-1}
					className='fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 sm:p-8 outline-none'
					onClick={close}
					onTouchStart={(e) => {
						touchStart.current = {
							x: e.touches[0].clientX,
							y: e.touches[0].clientY,
						};
					}}
					/* Gest liczony na obu osiach (22.09.2026). Wcześniej próg 50 px dotyczył
					   samego X, więc przesunięcie po skosie przeskakiwało kadr. Teraz
					   decyduje oś dominująca: w poziomie zmiana zdjęcia, w dół zamknięcie
					   (wzorzec z podglądów zdjęć na telefonie). W górę nic, bo to gest
					   przewijania i zamykanie nim zaskakuje. */
					onTouchEnd={(e) => {
						const start = touchStart.current;
						touchStart.current = null;
						if (!start) return;
						const dx = e.changedTouches[0].clientX - start.x;
						const dy = e.changedTouches[0].clientY - start.y;
						if (Math.abs(dx) > Math.abs(dy)) {
							if (Math.abs(dx) > 50) {
								if (dx < 0) next();
								else prev();
							}
						} else if (dy > 80) {
							close();
						}
					}}
					role='dialog'
					aria-modal='true'
					aria-label='Podgląd zdjęcia'
				>
					{imageCount > 1 && (
						<span className='absolute top-4 left-1/2 -translate-x-1/2 text-white/85 text-sm font-barlow font-semibold tabular-nums select-none'>
							{lightbox + 1} / {imageCount}
						</span>
					)}
					<button
						type='button'
						onClick={(e) => {
							e.stopPropagation();
							close();
						}}
						aria-label='Zamknij podgląd'
						className='absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white text-xl flex items-center justify-center transition-colors'
					>
						✕
					</button>
					{imageCount > 1 && (
						<button
							type='button'
							onClick={(e) => {
								e.stopPropagation();
								prev();
							}}
							aria-label='Poprzednie zdjęcie'
							className='absolute left-2 sm:left-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white text-2xl flex items-center justify-center transition-colors'
						>
							‹
						</button>
					)}
					<div
						className='max-h-[88dvh] max-w-[92vw]'
						onClick={(e) => e.stopPropagation()}
					>
						{/* next/image zamiast surowego <img> (audyt 2026-07-06): lightbox
                serwował nieskompresowane oryginały (do ~800 KB); wzorzec jak
                w PortfolioGallery. */}
						<Image
							src={images[lightbox].src}
							alt={altFor(activeCat, lightbox)}
							width={images[lightbox].width}
							height={images[lightbox].height}
							quality={90}
							priority
							className='max-h-[88dvh] max-w-[92vw] w-auto h-auto object-contain rounded-lg'
						/>
					</div>
					{imageCount > 1 && (
						<button
							type='button'
							onClick={(e) => {
								e.stopPropagation();
								next();
							}}
							aria-label='Następne zdjęcie'
							className='absolute right-2 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white text-2xl flex items-center justify-center transition-colors'
						>
							›
						</button>
					)}
				</div>
			)}
		</div>
	);
}
