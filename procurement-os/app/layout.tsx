// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Procurement OS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">

        {/* FIXED SIDEBAR */}
        <aside
          className="
            fixed top-0 left-0
            h-screen w-64
            bg-blue-900 text-white
            shadow-lg
            flex flex-col
          "
        >
          {/* Header */}
          <div className="p-6 border-b border-blue-700">
            <h1 className="text-2xl font-bold tracking-wide">
              Procurement OS
            </h1>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-3 p-6 text-lg">
            <SidebarLink href="/vendors">Vendors</SidebarLink>
            <SidebarLink href="/rate-contracts">Rate Contracts</SidebarLink>
            <SidebarLink href="/po">Purchase Orders</SidebarLink>
            <SidebarLink href="/qc">QC</SidebarLink>
            <SidebarLink href="/grn">GRN</SidebarLink>
            <SidebarLink href="/invoice">Invoice</SidebarLink>
            <SidebarLink href="/match">3-Way Match</SidebarLink>
          </nav>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main
          className="
            ml-64 
            min-h-screen
            p-10
          "
        >
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>

      </body>
    </html>
  );
}

function SidebarLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="
        block
        px-4 py-3
        rounded-lg
        hover:bg-blue-700
        transition
        cursor-pointer
        font-medium
      "
    >
      {children}
    </a>
  );
}
