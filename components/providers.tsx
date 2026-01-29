"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/lib/auth-context";
import { LanguageProvider } from "@/lib/language-context";
import { PageLoader } from "./page-loader";
import { ScrollToTop } from "./scroll-to-top";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AuthProvider>
          <LanguageProvider>
            <PageLoader />
            <ScrollToTop />
            {children}
          </LanguageProvider>
        </AuthProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
