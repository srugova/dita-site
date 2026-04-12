import PersonalSite from "./PersonalSite";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dita Nurhadiyati",
  url: "https://dita.id",
  jobTitle: "Lead of Product Data & Insights",
  worksFor: {
    "@type": "Organization",
    name: "Gramedia Digital",
  },
  description:
    "Data lead, builder, and content creator. Monash Data Science grad. Builder of recommendation engines, data warehouses, and AI tools.",
  sameAs: [
    "https://github.com/srugova",
  ],
};

export default function Page() {
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
