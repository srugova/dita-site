export const metadata = {
  title: "Dita — Data Lead, Builder, Content Creator",
  description: "Personal site of Dita (Nurhadiyati). Lead of Product Data & Insights at Gramedia Digital. Monash Data Science grad. Builder of recommendation engines, data warehouses, and AI tools.",
  keywords: ["Dita", "Nurhadiyati", "data science", "product data", "Gramedia Digital", "ditalovesdata"],
  openGraph: {
    title: "Dita — I make data make sense",
    description: "Data lead by day, content creator by night. Building rec engines, wrangling data warehouses, and making AI tools.",
    url: "https://dita.id",
    siteName: "dita.id",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dita — I make data make sense",
    description: "Data lead by day, content creator by night.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;700&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
