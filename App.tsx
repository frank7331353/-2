
import React, { useState, useCallback } from 'react';
import { Perspective, AspectRatio, GenerationResult } from './types';
import { ASPECT_RATIOS } from './constants';
import { generatePerspectiveImage } from './services/geminiService';

const App: React.FC = () => {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [selectedPerspective, setSelectedPerspective] = useState<Perspective>(Perspective.EYE_LEVEL);
  const [selectedRatio, setSelectedRatio] = useState<AspectRatio>('1:1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<GenerationResult[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSourceImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!sourceImage) return;
    setIsGenerating(true);
    try {
      const newImageUrl = await generatePerspectiveImage(sourceImage, selectedPerspective, selectedRatio);
      const newResult: GenerationResult = {
        id: Math.random().toString(36).substr(2, 9),
        imageUrl: newImageUrl,
        perspective: selectedPerspective,
        aspectRatio: selectedRatio,
        timestamp: Date.now()
      };
      setResults(prev => [newResult, ...prev]);
    } catch (error) {
      console.error("Generation failed:", error);
      alert("Failed to generate image. Please check your API key or try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Sidebar - Controls */}
      <aside className="w-full md:w-96 bg-slate-900 border-r border-slate-800 p-6 overflow-y-auto max-h-screen">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-blue-400 mb-2">VisionAngle AI</h1>
          <p className="text-sm text-slate-400">Cinematic Perspective Generator</p>
        </div>

        {/* Upload Section */}
        <section className="mb-8">
          <label className="block text-sm font-semibold mb-3 text-slate-300">1. Upload Scene Image</label>
          <div className="relative group">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className={`border-2 border-dashed ${sourceImage ? 'border-blue-500 bg-blue-500/10' : 'border-slate-700 hover:border-blue-500'} rounded-xl p-4 transition-all text-center`}>
              {sourceImage ? (
                <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
                  <img src={sourceImage} alt="Source" className="w-full h-full object-contain" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="text-xs font-medium px-3 py-1 bg-white text-black rounded-full">Change Image</span>
                  </div>
                </div>
              ) : (
                <div className="py-6">
                  <svg className="w-8 h-8 mx-auto text-slate-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  <p className="text-sm text-slate-500">Click to upload your scene</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Perspective Selection */}
        <section className="mb-8">
          <label className="block text-sm font-semibold mb-3 text-slate-300">2. Select Perspective</label>
          <div className="grid grid-cols-1 gap-2">
            {Object.values(Perspective).map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPerspective(p)}
                className={`text-left px-4 py-3 rounded-lg text-sm transition-all border ${
                  selectedPerspective === p 
                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20' 
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </section>

        {/* Aspect Ratio */}
        <section className="mb-8">
          <label className="block text-sm font-semibold mb-3 text-slate-300">3. Aspect Ratio</label>
          <div className="grid grid-cols-2 gap-2">
            {ASPECT_RATIOS.map((ratio) => (
              <button
                key={ratio.value}
                onClick={() => setSelectedRatio(ratio.value as AspectRatio)}
                className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                  selectedRatio === ratio.value 
                    ? 'bg-slate-100 border-white text-slate-900' 
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
                }`}
              >
                {ratio.label}
              </button>
            ))}
          </div>
        </section>

        {/* Action Button */}
        <button
          onClick={handleGenerate}
          disabled={isGenerating || !sourceImage}
          className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-xl ${
            isGenerating || !sourceImage 
              ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-400 text-white active:scale-95'
          }`}
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Generating...</span>
            </>
          ) : (
            'Generate Perspective'
          )}
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-slate-950 p-6 md:p-12 overflow-y-auto">
        <header className="mb-8 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-slate-200">Generation Stage</h2>
          <div className="text-slate-500 text-sm">
            {results.length} iterations generated
          </div>
        </header>

        {results.length === 0 ? (
          <div className="h-[70vh] flex flex-col items-center justify-center text-slate-600 border-2 border-dashed border-slate-800 rounded-3xl">
            <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-lg">No perspectives generated yet.</p>
            <p className="text-sm">Upload an image and choose an angle to begin.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {results.map((res) => (
              <div key={res.id} className="group bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl transition-all hover:border-blue-500/50">
                <div className="relative overflow-hidden aspect-video bg-black cursor-zoom-in" onClick={() => setPreviewImage(res.imageUrl)}>
                  <img src={res.imageUrl} alt={res.perspective} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <span className="bg-black/60 backdrop-blur-md text-white text-[10px] uppercase tracking-widest px-2 py-1 rounded font-bold">
                      {res.aspectRatio}
                    </span>
                  </div>
                </div>
                <div className="p-4 flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-blue-400 font-bold text-sm uppercase tracking-wider">{res.perspective}</h3>
                      <p className="text-slate-500 text-xs mt-1">Generated {new Date(res.timestamp).toLocaleTimeString()}</p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => downloadImage(res.imageUrl, `perspective-${res.id}.png`)}
                        className="p-2 bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white rounded-lg transition-colors group/btn"
                        title="Download"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => setPreviewImage(res.imageUrl)}
                        className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
                        title="Preview Fullscreen"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Fullscreen Preview Modal */}
      {previewImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-10 cursor-zoom-out"
          onClick={() => setPreviewImage(null)}
        >
          <img src={previewImage} alt="Fullscreen Preview" className="max-w-full max-h-full object-contain shadow-2xl" />
          <button 
            className="absolute top-6 right-6 p-4 text-white hover:text-blue-400 transition-colors"
            onClick={() => setPreviewImage(null)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
