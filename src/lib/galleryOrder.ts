import fs from 'fs';
import path from 'path';

export const EDITOR_GALLERY_FOLDERS = [
	'portrety',
	'eventy',
	'produktowe',
	'gastronomia',
	'wnetrza',
	'dron',
] as const;

export type EditorGalleryFolder = (typeof EDITOR_GALLERY_FOLDERS)[number];

type GalleryOrder = Partial<Record<EditorGalleryFolder, string[]>>;

const orderPath = path.join(
	process.cwd(),
	'public',
	'images',
	'galeria',
	'.gallery-order.json',
);

function readOrder(): GalleryOrder {
	try {
		return JSON.parse(fs.readFileSync(orderPath, 'utf8')) as GalleryOrder;
	} catch {
		return {};
	}
}

export function orderGalleryFiles(folder: string, files: string[]): string[] {
	const saved = readOrder()[folder as EditorGalleryFolder];
	if (!saved?.length) return files.sort();

	const available = new Set(files);
	const ordered = saved.filter((file) => available.has(file));
	const newFiles = files.filter((file) => !saved.includes(file)).sort();
	return [...ordered, ...newFiles];
}

export function getGalleryOrderPath(): string {
	return orderPath;
}
