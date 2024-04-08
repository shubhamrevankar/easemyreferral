import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Suspense } from "react";
import Loading from "./loading";
import { ClerkProvider } from "@clerk/nextjs";
// import { ApolloProviders } from "@/providers/ApolloProvider";
import UserProvider from "@/providers/UserProvider";
import Footer from "@/components/Footer";
import { EdgeStoreProvider } from "@/lib/edgestore";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "easemyreferral",
  description: "We ease your referral process",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/favicon.png"
          className="rounded-full bg-transparent"
        />
      </head>
      <ClerkProvider>
        {/* <ApolloProviders> */}
          <UserProvider>
            <EdgeStoreProvider>
              <body className={inter.className}>
                <div className="bg-slate-50 min-h-screen">
                  <Header />
                  <div className="md:h-16"></div>
                  <Suspense fallback={<Loading />}>{children}</Suspense>
                  <Footer />
                </div>
              </body>
            </EdgeStoreProvider>
          </UserProvider>
        {/* </ApolloProviders> */}
      </ClerkProvider>
    </html>
  );
}
