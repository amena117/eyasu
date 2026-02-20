import { useState } from 'react'

function App() {
  const [selectedImage, setSelectedImage] = useState(null)

  // 🔥 AUTO MAGIC: Loads EVERY .jpg (any name!)
  const imageModules = import.meta.glob('/src/assets/pictures/*.JPG', { eager: true })
  const images = Object.values(imageModules).map((mod) => mod.default)

  const closeModal = () => setSelectedImage(null)

  // Nice message if folder is empty
  if (images.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center text-3xl font-light text-zinc-400">
        Add your photos to src/assets/pictures folder
      </div>
    )
  }

  const currentIndex = images.indexOf(selectedImage)

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % images.length
    setSelectedImage(images[nextIndex])
  }

  const goToPrev = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length
    setSelectedImage(images[prevIndex])
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 overflow-hidden">
      {/* Hero - White & Light Blue */}
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(#bae6fd15_1px,transparent_1px)] bg-[length:5px_5px]"></div>
       
        <div className="relative z-10">
          <p className="text-sky-500 tracking-[4px] text-sm font-medium mb-8">21.02.2026 • ADDIS ABABA</p>
         
          <h1 className="text-[5rem] md:text-[7.5rem] leading-none tracking-[-4px] font-bold text-sky-600 mb-3">
            EYASU
          </h1>
         
          <div className="flex items-center justify-center gap-8 mb-3">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-sky-300 to-transparent"></div>
            <span className="text-6xl text-sky-400">&amp;</span>
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-sky-300 to-transparent"></div>
          </div>

          <h1 className="text-[5rem] md:text-[7.5rem] leading-none tracking-[-4px] font-bold text-sky-600">
            KALKIDAN
          </h1>

          <div className="mt-16">
            <h2 className="text-4xl md:text-5xl font-light tracking-wide text-zinc-800">
              Our Wedding Memories
            </h2>
            <p className="mt-3 text-zinc-500 text-lg">beautiful moments forever captured</p>
          </div>
        </div>

        <div className="absolute bottom-16 text-zinc-400 text-sm tracking-widest animate-bounce">
          SCROLL TO VIEW ALL {images.length} MOMENTS ↓
        </div>
      </div>

      {/* Gallery - Clean Light Masonry */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
          {images.map((src, index) => (
            <div
              key={index}
              className="break-inside-avoid cursor-zoom-in overflow-hidden rounded-3xl shadow-md border border-zinc-100 hover:shadow-2xl hover:border-sky-200 transition-all bg-white"
              onClick={() => setSelectedImage(src)}
            >
              <img
                src={src}
                alt={`Eyasu & Kalkidan ${index + 1}`}
                className="w-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <button
            onClick={closeModal}
            className="fixed top-4 right-4 z-[100] text-white/90 hover:text-white text-5xl leading-none p-4 touch-manipulation"
            aria-label="Close full image view"
          >
            ✕
          </button>

          <div
            className="relative max-w-5xl w-full max-h-[95vh] flex items-center justify-center"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Full size"
              className="max-h-[95vh] max-w-full rounded-2xl shadow-2xl"
            />

            {/* Previous & Next buttons */}
            <button
              onClick={goToPrev}
              className="fixed left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-6xl leading-none p-6 touch-manipulation z-[100]"
              aria-label="Previous image"
            >
              ←
            </button>

            <button
              onClick={goToNext}
              className="fixed right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-6xl leading-none p-6 touch-manipulation z-[100]"
              aria-label="Next image"
            >
              →
            </button>

            {/* Smaller download button at bottom */}
            <a
              href={selectedImage}
              download
              className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white text-zinc-900 px-6 py-2.5 rounded-full font-medium flex items-center gap-2 shadow-lg hover:bg-sky-50 transition-all text-sm sm:text-base z-[100]"
            >
              ⬇️ Download
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default App