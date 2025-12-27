import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const matCategories = [
  {
    id: "rs",
    name: "Audi RS",
    description: "Premium RS logo automatten voor je Audi",
    color: "from-zinc-800 to-zinc-900",
  },
  {
    id: "vw-r",
    name: "Volkswagen R",
    description: "Sportieve R-line automatten",
    color: "from-blue-900 to-zinc-900",
  },
  {
    id: "amg",
    name: "Mercedes AMG",
    description: "Luxe AMG automatten voor je Mercedes",
    color: "from-zinc-700 to-zinc-900",
  },
  {
    id: "custom",
    name: "Custom Design",
    description: "Ontwerp je eigen unieke automatten",
    color: "from-red-900 to-zinc-900",
    isCustom: true,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Premium <span className="text-red-500">Automatten</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 mb-8 max-w-3xl mx-auto">
            Kies uit onze collectie RS, VW R, AMG matten of ontwerp je eigen custom automatten
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/configurator">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg">
                Start Configurator
              </Button>
            </Link>
            <Link href="#categories">
              <Button size="lg" variant="outline" className="border-zinc-700 text-white hover:bg-zinc-800 px-8 py-6 text-lg">
                Bekijk Collectie
              </Button>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Onze Collectie</h2>
            <p className="text-zinc-400 text-lg">Kies je favoriete stijl of maak je eigen ontwerp</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {matCategories.map((category) => (
              <Link key={category.id} href={`/configurator?type=${category.id}`}>
                <Card className={`group relative overflow-hidden bg-gradient-to-br ${category.color} border-zinc-800 hover:border-zinc-600 transition-all duration-300 cursor-pointer h-80`}>
                  <CardContent className="p-6 h-full flex flex-col justify-end relative z-10">
                    {category.isCustom && (
                      <span className="absolute top-4 right-4 bg-red-600 text-white text-xs px-2 py-1 rounded">
                        CUSTOM
                      </span>
                    )}
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-400 transition">
                      {category.name}
                    </h3>
                    <p className="text-zinc-400">{category.description}</p>
                  </CardContent>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Waarom Automatten?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Premium Kwaliteit</h3>
              <p className="text-zinc-400">Hoogwaardige materialen voor langdurig gebruik</p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Perfect Passend</h3>
              <p className="text-zinc-400">Op maat gemaakt voor jouw auto model en bouwjaar</p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Custom Designs</h3>
              <p className="text-zinc-400">Volledig eigen ontwerp met onze design tool</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-red-900/20 to-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Klaar om te beginnen?
          </h2>
          <p className="text-xl text-zinc-400 mb-8">
            Configureer je perfecte automatten in slechts een paar stappen
          </p>
          <Link href="/configurator">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-12 py-6 text-lg">
              Start Nu
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
