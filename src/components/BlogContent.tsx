"use client";

export default function BlogContent({ html }: { html: string }) {
  return (
    <div
      className="prose prose-lg max-w-none
        prose-headings:font-barlow prose-headings:font-bold prose-headings:text-navy dark:prose-headings:text-white
        prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
        prose-p:text-text-body dark:prose-p:text-dark-text prose-p:text-[15px] prose-p:leading-relaxed
        prose-li:text-text-body dark:prose-li:text-dark-text prose-li:text-[15px]
        prose-strong:text-navy dark:prose-strong:text-white
        prose-a:text-blue dark:prose-a:text-blue-light prose-a:no-underline hover:prose-a:underline
        prose-ul:my-4 prose-li:my-1
        [&_.lead]:text-lg [&_.lead]:text-steel dark:[&_.lead]:text-dark-text-muted [&_.lead]:leading-relaxed [&_.lead]:mb-8"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
