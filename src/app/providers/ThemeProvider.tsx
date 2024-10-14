'use client';
import React from 'react';
import { ThemeProvider } from "next-themes";
import { ReactNode, useEffect, useState } from "react";

interface Props {
  children?: ReactNode;
}

export function ThemeProviderContainer({children}: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }
  
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  )
}