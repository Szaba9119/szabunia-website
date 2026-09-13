import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import GalleryEditor from '@/components/GalleryEditor';

export const metadata: Metadata = {
  title: 'Edytor galerii — lokalne narzędzie SZABUNIA',
  robots: { index: false, follow: false },
};

export default function GalleryEditorPage() {
  if (process.env.NODE_ENV === 'production') notFound();
  return <GalleryEditor />;
}
