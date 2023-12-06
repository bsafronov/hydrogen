import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "~/providers/theme.provider";
import { Header } from "./_components/header";
import { ModalProvider } from "~/providers/modal.provider";
import { ToasterProvider } from "~/providers/toaster.provider";
import { AuthProvider } from "~/providers/auth.provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Hydrogen",
  description: "Hydrogen by Safronov",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`font-sans ${inter.variable}`}>
        <AuthProvider>
          <TRPCReactProvider cookies={cookies().toString()}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <ToasterProvider />
              <ModalProvider />
              <Header />
              <main className="mb-8 md:mb-16">{children}</main>
            </ThemeProvider>
          </TRPCReactProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
