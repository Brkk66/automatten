import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              AUTO<span className="text-red-500">MATTEN</span>
            </h3>
            <p className="text-zinc-400">
              Premium automatten voor elke auto. Standaard designs of volledig custom.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-zinc-400 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/configurator" className="text-zinc-400 hover:text-white transition">
                  Configurator
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-zinc-400 hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-zinc-400">
              <li>info@automatten.nl</li>
              <li>Nederland</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-zinc-800 text-center text-zinc-500">
          <p>&copy; {new Date().getFullYear()} Automatten. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  );
}
