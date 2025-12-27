"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, FabricText, FabricImage, Rect } from "fabric";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const fonts = [
  "Arial",
  "Helvetica",
  "Times New Roman",
  "Georgia",
  "Verdana",
  "Impact",
  "Comic Sans MS",
];

const matColors = [
  { name: "Zwart", value: "#1a1a1a" },
  { name: "Donkergrijs", value: "#333333" },
  { name: "Rood", value: "#8B0000" },
  { name: "Blauw", value: "#00008B" },
  { name: "Beige", value: "#D2B48C" },
  { name: "Bruin", value: "#3D2914" },
];

interface MatDesignerProps {
  onDesignChange?: (dataUrl: string) => void;
}

export default function MatDesigner({ onDesignChange }: MatDesignerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<Canvas | null>(null);
  const [textInput, setTextInput] = useState("");
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [fontSize, setFontSize] = useState("48");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [matColor, setMatColor] = useState("#1a1a1a");
  const [selectedObject, setSelectedObject] = useState<fabric.Object | null>(null);

  useEffect(() => {
    if (!canvasRef.current || fabricCanvasRef.current) return;

    const canvas = new Canvas(canvasRef.current, {
      width: 500,
      height: 350,
      backgroundColor: matColor,
      selection: true,
    });

    // Draw mat shape (rounded rectangle)
    const matShape = new Rect({
      left: 25,
      top: 25,
      width: 450,
      height: 300,
      rx: 20,
      ry: 20,
      fill: matColor,
      stroke: "#444",
      strokeWidth: 3,
      selectable: false,
      evented: false,
    });
    canvas.add(matShape);

    // Add border/edge effect
    const innerBorder = new Rect({
      left: 35,
      top: 35,
      width: 430,
      height: 280,
      rx: 15,
      ry: 15,
      fill: "transparent",
      stroke: "#555",
      strokeWidth: 1,
      selectable: false,
      evented: false,
    });
    canvas.add(innerBorder);

    canvas.on("selection:created", (e) => {
      setSelectedObject(e.selected?.[0] || null);
    });

    canvas.on("selection:updated", (e) => {
      setSelectedObject(e.selected?.[0] || null);
    });

    canvas.on("selection:cleared", () => {
      setSelectedObject(null);
    });

    canvas.on("object:modified", () => {
      exportDesign(canvas);
    });

    fabricCanvasRef.current = canvas;

    return () => {
      canvas.dispose();
      fabricCanvasRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!fabricCanvasRef.current) return;
    const canvas = fabricCanvasRef.current;

    // Update mat background
    const objects = canvas.getObjects();
    if (objects[0]) {
      objects[0].set("fill", matColor);
    }
    canvas.backgroundColor = matColor;
    canvas.renderAll();
    exportDesign(canvas);
  }, [matColor]);

  const exportDesign = (canvas: Canvas) => {
    if (onDesignChange) {
      const dataUrl = canvas.toDataURL({ format: "png", quality: 1 });
      onDesignChange(dataUrl);
    }
  };

  const addText = () => {
    if (!fabricCanvasRef.current || !textInput.trim()) return;
    const canvas = fabricCanvasRef.current;

    const text = new FabricText(textInput, {
      left: 150,
      top: 150,
      fontSize: parseInt(fontSize),
      fill: textColor,
      fontFamily: fontFamily,
      fontWeight: "bold",
      shadow: "2px 2px 4px rgba(0,0,0,0.5)",
    });

    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
    setTextInput("");
    exportDesign(canvas);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!fabricCanvasRef.current || !e.target.files?.[0]) return;
    const canvas = fabricCanvasRef.current;
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const imgUrl = event.target?.result as string;

      FabricImage.fromURL(imgUrl).then((img) => {
        // Scale image to fit nicely
        const maxSize = 150;
        const scale = Math.min(maxSize / (img.width || 1), maxSize / (img.height || 1));
        img.scale(scale);
        img.set({
          left: 200,
          top: 120,
        });
        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
        exportDesign(canvas);
      });
    };

    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const deleteSelected = () => {
    if (!fabricCanvasRef.current || !selectedObject) return;
    const canvas = fabricCanvasRef.current;
    canvas.remove(selectedObject);
    setSelectedObject(null);
    canvas.renderAll();
    exportDesign(canvas);
  };

  const updateSelectedText = () => {
    if (!fabricCanvasRef.current || !selectedObject) return;
    if (selectedObject.type !== "text") return;

    const canvas = fabricCanvasRef.current;
    selectedObject.set({
      fill: textColor,
      fontSize: parseInt(fontSize),
      fontFamily: fontFamily,
    });
    canvas.renderAll();
    exportDesign(canvas);
  };

  const clearCanvas = () => {
    if (!fabricCanvasRef.current) return;
    const canvas = fabricCanvasRef.current;
    const objects = canvas.getObjects();
    // Keep first two objects (mat shape and border)
    objects.slice(2).forEach((obj) => canvas.remove(obj));
    canvas.renderAll();
    exportDesign(canvas);
  };

  return (
    <div className="space-y-6">
      {/* Canvas */}
      <div className="flex justify-center bg-zinc-800 rounded-lg p-4">
        <canvas ref={canvasRef} className="rounded-lg shadow-xl" />
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Text & Image */}
        <div className="space-y-4">
          <div className="bg-zinc-800/50 rounded-lg p-4 space-y-4">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Tekst Toevoegen
            </h3>

            <div className="flex gap-2">
              <Input
                placeholder="Typ je tekst..."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                className="bg-zinc-700 border-zinc-600 text-white"
                onKeyDown={(e) => e.key === "Enter" && addText()}
              />
              <Button onClick={addText} className="bg-red-600 hover:bg-red-700">
                +
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label className="text-zinc-400 text-xs">Lettertype</Label>
                <Select value={fontFamily} onValueChange={setFontFamily}>
                  <SelectTrigger className="bg-zinc-700 border-zinc-600 text-white h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-700 border-zinc-600">
                    {fonts.map((font) => (
                      <SelectItem key={font} value={font} className="text-white">
                        {font}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-zinc-400 text-xs">Grootte</Label>
                <Select value={fontSize} onValueChange={setFontSize}>
                  <SelectTrigger className="bg-zinc-700 border-zinc-600 text-white h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-700 border-zinc-600">
                    {["24", "32", "48", "64", "72", "96"].map((size) => (
                      <SelectItem key={size} value={size} className="text-white">
                        {size}px
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-zinc-400 text-xs">Kleur</Label>
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-full h-9 rounded cursor-pointer bg-zinc-700 border border-zinc-600"
                />
              </div>
            </div>

            {selectedObject && selectedObject.type === "text" && (
              <Button
                onClick={updateSelectedText}
                variant="outline"
                className="w-full border-zinc-600 text-white hover:bg-zinc-700"
              >
                Update Geselecteerde Tekst
              </Button>
            )}
          </div>

          <div className="bg-zinc-800/50 rounded-lg p-4 space-y-4">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Afbeelding Toevoegen
            </h3>

            <label className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-zinc-600 rounded-lg cursor-pointer hover:border-red-500 transition">
              <svg className="w-6 h-6 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span className="text-zinc-400">Upload logo of afbeelding</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Right: Mat Color & Actions */}
        <div className="space-y-4">
          <div className="bg-zinc-800/50 rounded-lg p-4 space-y-4">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
              Mat Kleur
            </h3>

            <div className="grid grid-cols-3 gap-2">
              {matColors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setMatColor(color.value)}
                  className={`p-3 rounded-lg border-2 transition ${
                    matColor === color.value
                      ? "border-red-500"
                      : "border-zinc-600 hover:border-zinc-500"
                  }`}
                  style={{ backgroundColor: color.value }}
                >
                  <span className="text-white text-xs font-medium drop-shadow-lg">
                    {color.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-zinc-800/50 rounded-lg p-4 space-y-4">
            <h3 className="text-white font-semibold">Acties</h3>

            <div className="space-y-2">
              {selectedObject && (
                <Button
                  onClick={deleteSelected}
                  variant="destructive"
                  className="w-full"
                >
                  Verwijder Geselecteerd
                </Button>
              )}

              <Button
                onClick={clearCanvas}
                variant="outline"
                className="w-full border-zinc-600 text-white hover:bg-zinc-700"
              >
                Alles Wissen
              </Button>
            </div>
          </div>

          <div className="bg-red-900/20 border border-red-900/50 rounded-lg p-4">
            <p className="text-sm text-zinc-300">
              <strong className="text-red-400">Tip:</strong> Klik op elementen om ze te selecteren.
              Sleep om te verplaatsen, gebruik de hoeken om te vergroten/verkleinen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
