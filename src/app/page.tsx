import ExhibitionClient from "@/components/ExhibitionClient";
import Footer from "@/components/Footer";
import { buildWebsiteJsonLd } from "@/lib/seo";

export default function Home() {
  const jsonLd = buildWebsiteJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ExhibitionClient>
        <Footer />
      </ExhibitionClient>
    </>
  );
}
