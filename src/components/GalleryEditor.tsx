'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

type Gallery = { folder: string; files: string[] };

const labels: Record<string, string> = {
	portrety: 'Portrety',
	eventy: 'Eventy',
	produktowe: 'Produktowe',
	gastronomia: 'Gastronomia',
	wnetrza: 'Wnętrza',
	dron: 'Dron',
};

export default function GalleryEditor() {
	const [galleries, setGalleries] = useState<Gallery[]>([]);
	const [activeFolder, setActiveFolder] = useState('portrety');
	const [dragged, setDragged] = useState<string | null>(null);
	const [status, setStatus] = useState('Ładowanie galerii...');

	const active = galleries.find((gallery) => gallery.folder === activeFolder);

	useEffect(() => {
		fetch('/api/gallery-editor')
			.then((response) => response.json())
			.then((data: { galleries?: Gallery[]; error?: string }) => {
				if (!data.galleries)
					throw new Error(data.error ?? 'Nie udało się wczytać galerii.');
				setGalleries(data.galleries);
				setStatus('Gotowe');
			})
			.catch((error: Error) => setStatus(error.message));
	}, []);

	const movePhoto = (target: string) => {
		if (!active || !dragged || dragged === target) return;
		const next = [...active.files];
		const from = next.indexOf(dragged);
		const to = next.indexOf(target);
		next.splice(from, 1);
		next.splice(to, 0, dragged);
		setGalleries((items) =>
			items.map((item) =>
				item.folder === active.folder ? { ...item, files: next } : item,
			),
		);
	};

	const save = async () => {
		if (!active) return;
		setStatus('Zapisywanie...');
		const response = await fetch('/api/gallery-editor', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ category: active.folder, order: active.files }),
		});
		const data = (await response.json()) as { error?: string };
		setStatus(
			response.ok
				? 'Kolejność zapisana'
				: (data.error ?? 'Nie udało się zapisać'),
		);
	};

	const remove = async (filename: string) => {
		if (
			!active ||
			!window.confirm(`Przenieść zdjęcie „${filename}” do _to_delete?`)
		)
			return;
		const response = await fetch('/api/gallery-editor', {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ category: active.folder, filename }),
		});
		if (!response.ok) {
			setStatus('Nie udało się przenieść zdjęcia');
			return;
		}
		setGalleries((items) =>
			items.map((item) =>
				item.folder === active.folder
					? { ...item, files: item.files.filter((file) => file !== filename) }
					: item,
			),
		);
		setStatus('Zdjęcie przeniesione do _to_delete');
	};

	return (
		<main className='min-h-screen bg-gray-bg px-4 py-8 text-navy dark:bg-dark-bg dark:text-dark-text sm:px-8'>
			<div className='mx-auto max-w-7xl'>
				<header className='mb-8 flex flex-wrap items-end justify-between gap-4'>
					<div>
						<p className='mb-2 text-xs font-bold uppercase tracking-[0.18em] text-blue'>
							Narzędzie lokalne
						</p>
						<h1 className='font-barlow text-4xl font-extrabold tracking-tight'>
							Edytor kolejności galerii
						</h1>
						<p className='mt-2 max-w-2xl text-sm text-steel dark:text-dark-text-muted'>
							Przeciągnij zdjęcia, aby zmienić kolejność. Kliknięcie „Usuń”
							przenosi plik do katalogu _to_delete.
						</p>
					</div>
					<div className='flex items-center gap-3'>
						<span className='text-sm text-steel dark:text-dark-text-muted'>
							{status}
						</span>
						<button
							type='button'
							onClick={save}
							disabled={!active}
							className='rounded-lg bg-blue px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-light disabled:opacity-50'
						>
							Zapisz kolejność
						</button>
					</div>
				</header>

				<nav
					className='mb-8 flex gap-2 overflow-x-auto border-b border-border pb-3 dark:border-dark-border'
					aria-label='Kategorie galerii'
				>
					{galleries.map((gallery) => (
						<button
							key={gallery.folder}
							type='button'
							onClick={() => setActiveFolder(gallery.folder)}
							className={`shrink-0 rounded-lg px-4 py-2 text-sm font-bold transition ${gallery.folder === activeFolder ? 'bg-navy text-white dark:bg-white dark:text-navy' : 'bg-white text-steel hover:text-navy dark:bg-dark-card dark:text-dark-text-muted dark:hover:text-white'}`}
						>
							{labels[gallery.folder] ?? gallery.folder}{' '}
							<span className='ml-1 opacity-60'>{gallery.files.length}</span>
						</button>
					))}
				</nav>

				<section className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6'>
					{active?.files.map((filename, index) => (
						<article
							key={filename}
							draggable
							onDragStart={() => setDragged(filename)}
							onDragEnd={() => setDragged(null)}
							onDragOver={(event) => event.preventDefault()}
							onDrop={() => movePhoto(filename)}
							className={`group relative overflow-hidden rounded-xl border bg-white shadow-sm transition dark:bg-dark-card ${dragged === filename ? 'border-blue opacity-50' : 'border-border dark:border-dark-border'}`}
						>
							<div className='aspect-square bg-gray-100 dark:bg-dark-bg'>
								<Image
									src={`/images/galeria/${active.folder}/${filename}`}
									alt={filename}
									fill
									sizes='(min-width: 1280px) 16vw, (min-width: 640px) 30vw, 50vw'
									className='object-cover'
								/>
							</div>
							<div className='flex items-center justify-between gap-2 p-2'>
								<span
									className='min-w-0 truncate text-xs font-bold'
									title={filename}
								>
									{index + 1}. {filename}
								</span>
								<button
									type='button'
									onClick={() => remove(filename)}
									className='shrink-0 rounded-md px-2 py-1 text-xs font-bold text-red-600 opacity-80 transition hover:bg-red-50 hover:opacity-100'
								>
									Usuń
								</button>
							</div>
						</article>
					))}
				</section>
			</div>
		</main>
	);
}
