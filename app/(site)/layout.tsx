"use client";
import "../globals.css";

export default function RootLayout({ children, }: { children: React.ReactNode; }) {
  return (
  <div className="auth-layout">
    {children}
  </div>
)}
