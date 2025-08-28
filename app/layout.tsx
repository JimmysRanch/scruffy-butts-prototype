import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'Scruffy Butts – Grooming',
  description: 'Book dog grooming in Natalia, TX – Scruffy Butts',
  manifest: '/manifest.webmanifest',
  icons: [
    { rel: 'icon', url: '/favicon.ico' },
    { rel: 'apple-touch-icon', url: '/apple-touch-icon-180.png' }
  ]
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <header className="border-b sticky top-0 bg-white/80 backdrop-blur z-10">
          <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-black tracking-tight text-xl">Scruffy Butts</Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/book">Book</Link>
              <Link href="/admin">Admin</Link>
            </nav>
          </div>
        </header>
        <main className="grow mx-auto max-w-5xl w-full px-4 py-8">{children}</main>
        <footer className="border-t">
          <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-gray-500">
            © {new Date().getFullYear()} Scruffy Butts · Natalia, TX
          </div>
        </footer>
      </body>
    </html>
  )
}
