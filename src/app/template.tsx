import PageTransition from "@/components/PageTransition";
import ScrollRestorer from "@/components/ScrollRestorer";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <PageTransition>
      <ScrollRestorer />
      {children}
    </PageTransition>
  );
}
