import type { Metadata } from "next";
import "../globals.css";
import "./video.css";
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import NextTopLoader from "nextjs-toploader";
import { SWRProvider } from "@/components/swr-provider";
import { Toaster } from "@/components/ui/sonner";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "SquareEdge | Sell with confidence",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextTopLoader />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SWRProvider>
            <Toaster richColors position="top-center" />
            {children}
          </SWRProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
