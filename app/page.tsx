"use client";

import { useState } from "react";
import Image from 'next/image';

export default function Home() {
  const [images, setImages] = useState({
    dribbling: "",
    celebrating: "",
    resting: ""
  });
  const [prompts, setPrompts] = useState({
    dribbling: "",
    celebrating: "",
    resting: ""
  });
  const [loading, setLoading] = useState({
    dribbling: false,
    celebrating: false,
    resting: false
  });

  const handleGenerate = async (prompt: string, type: string) => {
    try {
      setLoading(prev => ({ ...prev, [type]: true }));
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          prompt: `${prompt}. Amos Snapflux is a young fit white male soccer player.` 
        })
      });

      const data = await response.json();
      if (data.image) {
        setImages((prev) => ({ ...prev, [type]: data.image }));
      } else {
        console.error("Failed to generate image");
      }
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(prev => ({ ...prev, [type]: false }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        Mini-project 2: <span className="text-gray-700">Front End</span>
      </h1>

      <div className="bg-orange-400 text-white p-5 text-center rounded-lg mb-10">
          <h2 className="text-xl font-semibold">Amos soccer comic</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-5 text-center">
          <h3 className="text-xl font-bold mb-4">Dribbling</h3>
          {images.dribbling ? (
            <Image
              src={images.dribbling}
              alt="Dribbling"
              width={400}
              height={400}
              className="w-full rounded-lg shadow-lg"
            />
          ) : (
            <div className="space-y-4">
              <textarea
                className="w-full p-2 border rounded-md"
                placeholder="Describe how Amos is dribbling..."
                value={prompts.dribbling}
                onChange={(e) => setPrompts(prev => ({ ...prev, dribbling: e.target.value }))}
                rows={3}
              />
              <button 
                className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-blue-300 w-full"
                onClick={() => handleGenerate(prompts.dribbling || "Young fit white male Amos Snapflux dribbling a soccer ball with skill", "dribbling")}
                disabled={loading.dribbling}
              >
                {loading.dribbling ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Generating...
                  </div>
                ) : (
                  "Generate Dribbling Image"
                )}
              </button>
            </div>
          )}
          <p className="mt-4 text-gray-700 font-medium">
            Meet Amos snapflux, the rising soccer star! His mission today: dribble past defenders and score the winning goal!
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-5 text-center">
          <h3 className="text-xl font-bold mb-4">Shooting and Scoring</h3>
          {images.celebrating ? (
            <Image
              src={images.celebrating}
              alt="Celebrating"
              width={400}
              height={400}
              className="w-full rounded-lg shadow-lg"
            />
          ) : (
            <div className="space-y-4">
              <textarea
                className="w-full p-2 border rounded-md"
                placeholder="Describe Amos scoring the goal..."
                value={prompts.celebrating}
                onChange={(e) => setPrompts(prev => ({ ...prev, celebrating: e.target.value }))}
                rows={3}
              />
              <button 
                className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-blue-300 w-full"
                onClick={() => handleGenerate(prompts.celebrating || "Young fit white male Amos Snapflux scoring an amazing goal on the soccer field", "celebrating")}
                disabled={loading.celebrating}
              >
                {loading.celebrating ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Generating...
                  </div>
                ) : (
                  "Generate Scoring Image"
                )}
              </button>
            </div>
          )}
          <p className="mt-4 text-gray-700 font-medium">
            &quot;Amos snapflux scored a Goal! What a nice shot!&quot;
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-5 text-center">
          <h3 className="text-xl font-bold mb-4">Celebrating</h3>
          {images.resting ? (
            <Image
              src={images.resting}
              alt="Resting"
              width={400}
              height={400}
              className="w-full rounded-lg shadow-lg"
            />
          ) : (
            <div className="space-y-4">
              <textarea
                className="w-full p-2 border rounded-md"
                placeholder="Describe how Amos is celebrating..."
                value={prompts.resting}
                onChange={(e) => setPrompts(prev => ({ ...prev, resting: e.target.value }))}
                rows={3}
              />
              <button 
                className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-blue-300 w-full"
                onClick={() => handleGenerate(prompts.resting || "Young fit white male Amos Snapflux celebrating victoriously with a soccer ball", "resting")}
                disabled={loading.resting}
              >
                {loading.resting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Generating...
                  </div>
                ) : (
                  "Generate Celebrating Image"
                )}
              </button>
            </div>
          )}
          <p className="mt-4 text-gray-700 font-medium">
            &quot;Amos snapflux celebrates with the ball in his hands.&quot;
          </p>
        </div>
      </div>
    </div>
  );
}
