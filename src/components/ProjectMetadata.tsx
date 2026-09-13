import type { CaseStudy } from '@/data/portfolio';

export default function ProjectMetadata({ data, compact = false }: { data?: CaseStudy; compact?: boolean }) {
  if (!data) return null;
  const rows = [
    { label: 'Obszar', value: data.area?.join(' · ') },
    { label: 'Materiał', value: data.capabilities?.join(' · ') },
    ...(!compact ? [{ label: 'Zastosowanie', value: data.use?.join(' · ') }, { label: 'Lokalizacja', value: data.location }, { label: 'Data', value: data.date }] : []),
  ].filter((row) => row.value);
  if (!rows.length) return null;
  return <dl className='flex flex-wrap gap-x-6 gap-y-3 my-5 text-xs'>{rows.map((row) => <div key={row.label}><dt className='uppercase tracking-wider text-steel dark:text-dark-text-muted text-[10px] mb-1'>{row.label}</dt><dd className='text-navy dark:text-white font-semibold'>{row.value}</dd></div>)}</dl>;
}
