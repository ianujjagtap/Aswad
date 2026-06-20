"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type AdminLang = "mr" | "en";

interface AdminLanguageContextType {
  lang: AdminLang;
  setLang: (lang: AdminLang) => void;
  t: (mr: string, en: string) => string;
}

const AdminLanguageContext = createContext<AdminLanguageContextType | undefined>(undefined);

export function AdminLanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<AdminLang>("mr");

  useEffect(() => {
    const saved = localStorage.getItem("admin-lang") as AdminLang;
    if (saved === "mr" || saved === "en") setLang(saved);
  }, []);

  const changeLang = (newLang: AdminLang) => {
    setLang(newLang);
    localStorage.setItem("admin-lang", newLang);
  };

  const t = (mr: string, en: string) => (lang === "mr" ? mr : en);

  return (
    <AdminLanguageContext.Provider value={{ lang, setLang: changeLang, t }}>
      {children}
    </AdminLanguageContext.Provider>
  );
}

export function useAdminLanguage() {
  const context = useContext(AdminLanguageContext);
  if (context === undefined) {
    throw new Error("useAdminLanguage must be used within an AdminLanguageProvider");
  }
  return context;
}
