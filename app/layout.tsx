// app/layout.tsx
import * as React from "react";

export const metadata = {
  title: "Resume Builder",
  description: "Build and tailor your resume with AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
