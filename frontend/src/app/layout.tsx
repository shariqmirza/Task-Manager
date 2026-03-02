"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './globals.css';

const client = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className="bg-gray-50 text-gray-800">
        <QueryClientProvider client={client}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}