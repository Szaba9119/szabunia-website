import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import {
	EDITOR_GALLERY_FOLDERS,
	getGalleryOrderPath,
	orderGalleryFiles,
	type EditorGalleryFolder,
} from '@/lib/galleryOrder';

const galleryRoot = path.join(process.cwd(), 'public', 'images', 'galeria');
const archiveRoot = path.join(process.cwd(), '_to_delete', 'galeria');
const imagePattern = /\.(jpe?g|png|webp)$/i;

function isFolder(value: unknown): value is EditorGalleryFolder {
	return (
		typeof value === 'string' &&
		EDITOR_GALLERY_FOLDERS.includes(value as EditorGalleryFolder)
	);
}

function isFilename(value: unknown): value is string {
	return (
		typeof value === 'string' &&
		value === path.basename(value) &&
		imagePattern.test(value)
	);
}

async function filesFor(folder: EditorGalleryFolder): Promise<string[]> {
	const files = (await fs.readdir(path.join(galleryRoot, folder))).filter(
		(file) => imagePattern.test(file),
	);
	return orderGalleryFiles(folder, files);
}

export async function GET() {
	if (process.env.NODE_ENV === 'production') {
		return NextResponse.json(
			{ error: 'Edytor jest dostępny tylko lokalnie.' },
			{ status: 403 },
		);
	}

	const galleries = await Promise.all(
		EDITOR_GALLERY_FOLDERS.map(async (folder) => ({
			folder,
			files: await filesFor(folder),
		})),
	);
	return NextResponse.json({ galleries });
}

export async function POST(request: Request) {
	if (process.env.NODE_ENV === 'production') {
		return NextResponse.json(
			{ error: 'Edytor jest dostępny tylko lokalnie.' },
			{ status: 403 },
		);
	}

	const body = (await request.json()) as {
		category?: unknown;
		order?: unknown;
	};
	if (
		!isFolder(body.category) ||
		!Array.isArray(body.order) ||
		!body.order.every(isFilename)
	) {
		return NextResponse.json(
			{ error: 'Nieprawidłowa kolejność zdjęć.' },
			{ status: 400 },
		);
	}

	const order = body.order as string[];
	const current = await filesFor(body.category);
	if (
		order.length !== current.length ||
		new Set(order).size !== current.length ||
		!current.every((file) => order.includes(file))
	) {
		return NextResponse.json(
			{ error: 'Lista zdjęć zmieniła się. Odśwież edytor.' },
			{ status: 409 },
		);
	}

	let saved: Record<string, string[]> = {};
	try {
		saved = JSON.parse(
			await fs.readFile(getGalleryOrderPath(), 'utf8'),
		) as Record<string, string[]>;
	} catch {
		// Manifest może nie istnieć przy pierwszym zapisie.
	}
	saved[body.category] = order;
	await fs.writeFile(
		getGalleryOrderPath(),
		`${JSON.stringify(saved, null, 2)}\n`,
		'utf8',
	);
	return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
	if (process.env.NODE_ENV === 'production') {
		return NextResponse.json(
			{ error: 'Edytor jest dostępny tylko lokalnie.' },
			{ status: 403 },
		);
	}

	const body = (await request.json()) as {
		category?: unknown;
		filename?: unknown;
	};
	if (!isFolder(body.category) || !isFilename(body.filename)) {
		return NextResponse.json(
			{ error: 'Nieprawidłowe zdjęcie.' },
			{ status: 400 },
		);
	}

	const source = path.join(galleryRoot, body.category, body.filename);
	const destinationDir = path.join(archiveRoot, body.category);
	await fs.mkdir(destinationDir, { recursive: true });
	await fs.rename(source, path.join(destinationDir, body.filename));
	return NextResponse.json({ ok: true });
}
