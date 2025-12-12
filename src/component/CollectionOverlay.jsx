import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// Mock Data combining your existing URLs with Titles/Dates
const collectionItems = [
  {
    id: 1,
    title: "Marcus Aurelius Bust",
    date: "161 AD",
    category: "Statues",
    src: "https://webprojects.cloud/r&d/roman-structure/images/man-one.jpg",
  },
  {
    id: 2,
    title: "Vestal Virgin",
    date: "113 AD",
    category: "Statues",
    src: "https://webprojects.cloud/r&d/roman-structure/images/women-one.jpg",
  },
  {
    id: 3,
    title: "Ceremonial Vase",
    date: "50 BC",
    category: "Pottery",
    src: "https://webprojects.cloud/r&d/roman-structure/images/women-two.jpg",
  },
  {
    id: 4,
    title: "Soldier's Helm",
    date: "300 AD",
    category: "Armor",
    src: "https://webprojects.cloud/r&d/roman-structure/images/man-two.jpg",
  },
  {
    id: 5,
    title: "Goddess Flora",
    date: "200 AD",
    category: "Statues",
    src: "https://webprojects.cloud/r&d/roman-structure/images/women-four.jpg",
  },
  {
    id: 6,
    title: "Senator's Robe",
    date: "45 BC",
    category: "Textiles",
    src: "https://webprojects.cloud/r&d/roman-structure/images/man-four.jpg",
  },
  {
    id: 7,
    title: "Gold Laurel",
    date: "10 AD",
    category: "Jewelry",
    src: "https://webprojects.cloud/r&d/roman-structure/images/man-five.jpg",
  },
  {
    id: 8,
    title: "Marble Pillar",
    date: "120 AD",
    category: "Architecture",
    src: "https://webprojects.cloud/r&d/roman-structure/images/man-six.jpg",
  },
  {
    id: 9,
    title: "Aphrodite",
    date: "100 BC",
    category: "Statues",
    src: "https://webprojects.cloud/r&d/roman-structure/images/women-six.jpg",
  },
];

const categories = ["All", "Statues", "Pottery", "Armor", "Jewelry"];

const CollectionOverlay = ({ isOpen, onClose }) => {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    if (isOpen) {
      // 1. Overlay Fade In
      gsap.to(overlayRef.current, {
        duration: 0.5,
        opacity: 1,
        pointerEvents: "auto",
        ease: "power2.out",
      });

      // 2. Content Slide Up
      gsap.fromTo(
        contentRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );

      // 3. Stagger Grid Items
      gsap.fromTo(
        ".collection-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
          delay: 0.4,
        }
      );
    } else {
      // Fade Out
      gsap.to(overlayRef.current, {
        duration: 0.5,
        opacity: 0,
        pointerEvents: "none",
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  // Filter Logic
  const filteredItems =
    activeCategory === "All"
      ? collectionItems
      : collectionItems.filter((item) => item.category === activeCategory);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex flex-col items-center opacity-0 pointer-events-none"
    >
      {/* Dark/Blur Backdrop */}
      <div
        className="absolute inset-0 bg-[#0f0f0f]/95 backdrop-blur-xl"
        onClick={onClose}
      ></div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 md:top-10 md:right-10 z-50 text-white hover:text-accent transition-colors font-bold tracking-widest text-sm"
      >
        CLOSE [X]
      </button>

      {/* Main Content */}
      <div
        ref={contentRef}
        className="relative w-full max-w-[1400px] h-full flex flex-col p-6 md:p-12 overflow-hidden"
      >
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 mb-8 gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase mb-2">
              The Archive
            </h2>
            <p className="text-grey text-sm max-w-md">
              Browse over 5,000 artifacts from the Roman Empire. Digitized for
              research and preservation.
            </p>
          </div>

          {/* Search Bar Visual */}
          <div className="w-full md:w-auto relative group">
            <input
              type="text"
              placeholder="Search artifacts..."
              className="bg-transparent border-b border-white/30 text-white pb-2 pl-0 pr-8 w-full md:w-[300px] focus:outline-none focus:border-accent transition-colors placeholder:text-white/30"
            />
            <img
              src="https://webprojects.cloud/r&d/roman-structure/images/search-icon.svg"
              alt="search"
              className="absolute right-0 bottom-2 w-4 opacity-50 group-hover:opacity-100 transition-opacity"
            />
          </div>
        </div>

        {/* Categories Tabs */}
        <div className="flex gap-4 md:gap-8 overflow-x-auto pb-4 mb-4 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-sm uppercase tracking-widest font-bold whitespace-nowrap transition-colors duration-300 ${
                activeCategory === cat
                  ? "text-accent"
                  : "text-white/40 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Scrollable Grid Area */}
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {/* CSS Columns for Masonry Layout */}
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6 pb-20">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="collection-item break-inside-avoid group cursor-pointer relative"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden border border-white/5 group-hover:border-accent/50 transition-colors duration-300">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <span className="text-accent text-xs font-bold uppercase tracking-wider mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-white text-lg font-bold leading-none">
                      {item.title}
                    </h3>
                    <span className="text-grey text-xs mt-1">
                      Circa {item.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionOverlay;
