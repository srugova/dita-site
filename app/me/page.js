import PersonalSite from "../PersonalSite";

export const metadata = {
  title: "Dita — Data Lead, Builder, Content Creator",
  description: "Personal site of Dita (Nurhadiyati). Lead of Product Data & Insights at Gramedia Digital. Monash Data Science grad. Builder of recommendation engines, data warehouses, and AI tools.",
  keywords: ["Dita", "Nurhadiyati", "data science", "product data", "Gramedia Digital", "ditalovesdata"],
  openGraph: {
    title: "Dita — I make data make sense",
    description: "Data lead by day, content creator by night. Building rec engines, wrangling data warehouses, and making AI tools.",
    url: "https://dita.id/me",
    siteName: "dita.id",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dita — I make data make sense",
    description: "Data lead by day, content creator by night.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dita Nurhadiyati",
  url: "https://dita.id/me",
  jobTitle: "Lead of Product Data & Insights",
  worksFor: {
    "@type": "Organization",
    name: "Gramedia Digital",
  },
  description:
    "Data lead, builder, and content creator. Monash Data Science grad. Builder of recommendation engines, data warehouses, and AI tools.",
  sameAs: ["https://github.com/srugova"],
};

export default function MePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PersonalSite />
    </>
  );
}
