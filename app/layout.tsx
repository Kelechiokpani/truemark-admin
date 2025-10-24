"use client"
import './globals.css';
import { SidebarProvider } from "@/components/dashboard/context/SidebarContext";
import NextTopLoader from "nextjs-toploader";
import { client } from "@/lib/apolloClient";
import { ApolloProvider } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";


export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  const router = useRouter();
  // const { token, currentUser } = useUserStore()


  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
      <NextTopLoader
        color="#387467"
        initialPosition={0.08}
        crawlSpeed={200}
        height={2}
        crawl={true}
        showSpinner={true}
        easing="ease"
        speed={200}
        shadow="0 0 10px #2299DD,0 0 5px #2299DD"
      />
      <Toaster position="top-right" />
      <ApolloProvider client={client}>
        <SidebarProvider>{children}</SidebarProvider>
      </ApolloProvider>
      </body>
    </html>
  );
}
