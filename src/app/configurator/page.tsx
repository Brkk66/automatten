"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

// Dynamic import for fabric.js (client-side only)
const MatDesigner = dynamic(() => import("@/components/MatDesigner"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-96 bg-zinc-800 rounded-lg">
      <div className="text-zinc-400">Design tool laden...</div>
    </div>
  ),
});

const standardMats = [
  { id: "rs", name: "Audi RS", price: 89, logo: "RS" },
  { id: "vw-r", name: "Volkswagen R", price: 89, logo: "R" },
  { id: "amg", name: "Mercedes AMG", price: 99, logo: "AMG" },
  { id: "m-power", name: "BMW M Power", price: 99, logo: "M" },
  { id: "gtd", name: "Volkswagen GTD", price: 79, logo: "GTD" },
  { id: "gti", name: "Volkswagen GTI", price: 79, logo: "GTI" },
];

// All car models in one list
const allCars = [
  // Audi
  "Audi A1", "Audi A3", "Audi A4", "Audi A5", "Audi A6", "Audi A7", "Audi A8",
  "Audi Q2", "Audi Q3", "Audi Q5", "Audi Q7", "Audi Q8",
  "Audi RS3", "Audi RS4", "Audi RS5", "Audi RS6", "Audi RS7", "Audi RSQ8",
  "Audi TT", "Audi R8", "Audi e-tron",
  // Volkswagen
  "VW Golf", "VW Golf R", "VW Golf GTI", "VW Golf GTD", "VW Polo", "VW Polo GTI",
  "VW Passat", "VW Arteon", "VW Tiguan", "VW Touareg", "VW T-Roc", "VW T-Cross",
  "VW ID.3", "VW ID.4", "VW ID.5", "VW Scirocco", "VW Up", "VW Caddy",
  // Mercedes
  "Mercedes A-Klasse", "Mercedes B-Klasse", "Mercedes C-Klasse", "Mercedes E-Klasse", "Mercedes S-Klasse",
  "Mercedes CLA", "Mercedes CLS", "Mercedes GLA", "Mercedes GLB", "Mercedes GLC", "Mercedes GLE", "Mercedes GLS",
  "Mercedes AMG GT", "Mercedes AMG A45", "Mercedes AMG C63", "Mercedes AMG E63",
  // BMW
  "BMW 1 Serie", "BMW 2 Serie", "BMW 3 Serie", "BMW 4 Serie", "BMW 5 Serie", "BMW 6 Serie", "BMW 7 Serie", "BMW 8 Serie",
  "BMW X1", "BMW X2", "BMW X3", "BMW X4", "BMW X5", "BMW X6", "BMW X7",
  "BMW M2", "BMW M3", "BMW M4", "BMW M5", "BMW M8", "BMW Z4", "BMW i4", "BMW iX",
  // Porsche
  "Porsche 911", "Porsche Cayenne", "Porsche Macan", "Porsche Panamera", "Porsche Taycan", "Porsche Boxster", "Porsche Cayman",
  // Other
  "Seat Leon", "Seat Ibiza", "Seat Ateca", "Seat Cupra", "Seat Cupra Formentor",
  "Skoda Octavia", "Skoda Superb", "Skoda Kodiaq", "Skoda Karoq", "Skoda Fabia",
  "Ford Focus", "Ford Fiesta", "Ford Mustang", "Ford Puma", "Ford Kuga",
  "Opel Astra", "Opel Corsa", "Opel Insignia", "Opel Mokka",
  "Peugeot 208", "Peugeot 308", "Peugeot 508", "Peugeot 3008", "Peugeot 5008",
  "Renault Clio", "Renault Megane", "Renault Captur", "Renault Kadjar",
  "Toyota Yaris", "Toyota Corolla", "Toyota RAV4", "Toyota Supra", "Toyota GR86",
  "Honda Civic", "Honda CR-V", "Honda Type R",
  "Hyundai i20", "Hyundai i30", "Hyundai Tucson", "Hyundai Kona", "Hyundai i30 N",
  "Kia Ceed", "Kia Sportage", "Kia Stinger", "Kia EV6",
  "Mazda 3", "Mazda CX-5", "Mazda MX-5",
  "Volvo XC40", "Volvo XC60", "Volvo XC90", "Volvo S60", "Volvo V60",
  "Tesla Model 3", "Tesla Model S", "Tesla Model X", "Tesla Model Y",
  "Anders (specificeer hieronder)",
].sort();

const years = Array.from({ length: 30 }, (_, i) => (2025 - i).toString());

function ConfiguratorContent() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type");

  const [mode, setMode] = useState<"standard" | "custom">(initialType === "custom" ? "custom" : "standard");
  const [selectedStandardMat, setSelectedStandardMat] = useState(initialType && initialType !== "custom" ? initialType : "rs");
  const [selectedCar, setSelectedCar] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [frontClips, setFrontClips] = useState(false);
  const [rearClips, setRearClips] = useState(false);
  const [notes, setNotes] = useState("");
  const [designDataUrl, setDesignDataUrl] = useState<string>("");

  const selectedMat = standardMats.find((m) => m.id === selectedStandardMat);

  const calculatePrice = () => {
    let price = mode === "custom" ? 149 : (selectedMat?.price || 89);
    if (frontClips) price += 10;
    if (rearClips) price += 10;
    return price;
  };

  const handleSubmit = () => {
    const order = {
      mode,
      matType: mode === "standard" ? selectedMat?.name : "Custom Design",
      car: selectedCar,
      year: selectedYear,
      frontClips,
      rearClips,
      notes,
      designImage: mode === "custom" ? designDataUrl : null,
      totalPrice: calculatePrice(),
    };
    console.log("Order:", order);
    alert("Bedankt voor je bestelling! We nemen zo snel mogelijk contact met je op.");
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />

      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Configurator</h1>
            <p className="text-zinc-400">Kies een standaard mat of ontwerp je eigen custom mat</p>
          </div>

          <div className="space-y-8">
            {/* Mode Selection */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">1. Wat wil je?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setMode("standard")}
                    className={`p-6 rounded-lg border-2 transition-all text-left ${
                      mode === "standard"
                        ? "border-red-500 bg-red-500/10"
                        : "border-zinc-700 hover:border-zinc-600"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-white">Standaard Mat</h3>
                    </div>
                    <p className="text-zinc-400">Kies uit onze collectie RS, R, AMG, M en andere logo matten</p>
                    <p className="text-red-400 mt-2 font-semibold">Vanaf 79 euro</p>
                  </button>

                  <button
                    onClick={() => setMode("custom")}
                    className={`p-6 rounded-lg border-2 transition-all text-left ${
                      mode === "custom"
                        ? "border-red-500 bg-red-500/10"
                        : "border-zinc-700 hover:border-zinc-600"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-white">Custom Design</h3>
                    </div>
                    <p className="text-zinc-400">Ontwerp je eigen mat met tekst, kleuren en afbeeldingen</p>
                    <p className="text-red-400 mt-2 font-semibold">149 euro</p>
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Standard Mat Selection */}
            {mode === "standard" && (
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-white">2. Kies je mat</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {standardMats.map((mat) => (
                      <button
                        key={mat.id}
                        onClick={() => setSelectedStandardMat(mat.id)}
                        className={`relative overflow-hidden rounded-lg border-2 transition-all aspect-square ${
                          selectedStandardMat === mat.id
                            ? "border-red-500"
                            : "border-zinc-700 hover:border-zinc-600"
                        }`}
                      >
                        {/* Placeholder mat image */}
                        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                          <div className="text-center">
                            <span className="text-3xl font-black text-white drop-shadow-lg">{mat.logo}</span>
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-2">
                          <p className="text-white text-xs font-semibold">{mat.name}</p>
                          <p className="text-red-400 text-xs">{mat.price} euro</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Custom Design Tool */}
            {mode === "custom" && (
              <Card className="bg-zinc-900 border-zinc-800 border-red-500/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <span className="bg-red-600 text-xs px-2 py-1 rounded">CUSTOM</span>
                    2. Ontwerp je mat
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <MatDesigner onDesignChange={setDesignDataUrl} />
                </CardContent>
              </Card>
            )}

            {/* Car Selection - Simple Dropdown */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">{mode === "standard" ? "3" : "3"}. Selecteer je auto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-zinc-300 mb-2 block">Auto</Label>
                    <Select value={selectedCar} onValueChange={setSelectedCar}>
                      <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                        <SelectValue placeholder="Zoek je auto..." />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700 max-h-80">
                        {allCars.map((car) => (
                          <SelectItem key={car} value={car} className="text-white hover:bg-zinc-700">
                            {car}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-zinc-300 mb-2 block">Bouwjaar</Label>
                    <Select value={selectedYear} onValueChange={setSelectedYear}>
                      <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                        <SelectValue placeholder="Selecteer jaar" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700 max-h-80">
                        {years.map((year) => (
                          <SelectItem key={year} value={year} className="text-white hover:bg-zinc-700">
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {selectedCar === "Anders (specificeer hieronder)" && (
                  <div>
                    <Label className="text-zinc-300 mb-2 block">Specificeer je auto</Label>
                    <Textarea
                      placeholder="Bijv: Alfa Romeo Giulia 2019"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-white"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Mounting Clips */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">{mode === "standard" ? "4" : "4"}. Bevestigingsknoppen</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="front-clips"
                      checked={frontClips}
                      onCheckedChange={(checked) => setFrontClips(checked as boolean)}
                      className="border-zinc-600 data-[state=checked]:bg-red-600"
                    />
                    <Label htmlFor="front-clips" className="text-zinc-300 cursor-pointer">
                      Bevestigingsknoppen voor (+10 euro)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="rear-clips"
                      checked={rearClips}
                      onCheckedChange={(checked) => setRearClips(checked as boolean)}
                      className="border-zinc-600 data-[state=checked]:bg-red-600"
                    />
                    <Label htmlFor="rear-clips" className="text-zinc-300 cursor-pointer">
                      Bevestigingsknoppen achter (+10 euro)
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">{mode === "standard" ? "5" : "5"}. Extra opmerkingen</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Heb je nog speciale wensen of opmerkingen? Laat het hier weten..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white min-h-24"
                />
              </CardContent>
            </Card>

            {/* Summary */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Samenvatting</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-zinc-300 mb-6">
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span className="text-white font-medium">
                      {mode === "custom" ? "Custom Design" : selectedMat?.name}
                    </span>
                  </div>
                  {selectedCar && (
                    <div className="flex justify-between">
                      <span>Auto:</span>
                      <span className="text-white">{selectedCar} {selectedYear}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Basisprijs:</span>
                    <span className="text-white">{mode === "custom" ? 149 : selectedMat?.price} euro</span>
                  </div>
                  {frontClips && (
                    <div className="flex justify-between">
                      <span>Bevestigingsknoppen voor:</span>
                      <span className="text-white">+10 euro</span>
                    </div>
                  )}
                  {rearClips && (
                    <div className="flex justify-between">
                      <span>Bevestigingsknoppen achter:</span>
                      <span className="text-white">+10 euro</span>
                    </div>
                  )}
                  <div className="border-t border-zinc-700 pt-3 mt-4">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Totaal:</span>
                      <span className="text-red-500">{calculatePrice()} euro</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={!selectedCar || !selectedYear}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg disabled:opacity-50"
                >
                  Bestelling Plaatsen
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ConfiguratorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-zinc-950" />}>
      <ConfiguratorContent />
    </Suspense>
  );
}
