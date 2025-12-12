import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const eventsData = [
  {
    date: "OCT 12",
    title: "The Golden Age",
    type: "Workshop",
    image: "https://webprojects.cloud/r&d/roman-structure/images/man-one.jpg",
  },
  {
    date: "NOV 05",
    title: "Lost Pigments",
    type: "Lecture",
    image: "https://webprojects.cloud/r&d/roman-structure/images/women-two.jpg",
  },
  {
    date: "DEC 10",
    title: "Night at the Relics",
    type: "Special Event",
    image: "https://webprojects.cloud/r&d/roman-structure/images/man-four.jpg",
  },
];

const ExhibitionOverlay = ({ isOpen, onClose }) => {
  const overlayRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // 1. Fade in Overlay
      gsap.to(overlayRef.current, {
        duration: 0.5,
        opacity: 1,
        pointerEvents: "auto",
        ease: "power2.out",
      });

      // 2. Slide up content
      gsap.fromTo(
        containerRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );

      // 3. Stagger in the event cards
      gsap.fromTo(
        ".event-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.4,
        }
      );
    } else {
      // Fade out
      gsap.to(overlayRef.current, {
        duration: 0.5,
        opacity: 0,
        pointerEvents: "none",
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-40 flex items-center justify-center opacity-0 pointer-events-none"
    >
      {/* Blurred Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-lg"
        onClick={onClose}
      ></div>

      {/* Main Content Container */}
      <div
        ref={containerRef}
        className="relative w-full max-w-5xl h-[90vh] md:h-auto bg-[#1a1a1a] border border-[#333] p-6 md:p-10 overflow-y-auto md:overflow-hidden flex flex-col md:flex-row gap-10 shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 text-white hover:text-accent transition-colors text-sm font-bold tracking-widest"
        >
          CLOSE [X]
        </button>

        {/* LEFT: Featured Exhibition (Hero) */}
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <span className="text-accent text-xs font-bold tracking-widest uppercase mb-2 block">
              Current Exhibition
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase leading-tight mb-6">
              Gods of <br /> the Pantheon
            </h2>
            <p className="text-grey text-sm md:text-base max-w-md leading-relaxed">
              Explore the divine hierarchy of Ancient Rome. From Jupiter to
              Mars, witness the marble incarnations of the deities that shaped
              an empire. Includes rare artifacts never before seen outside of
              Italy.
            </p>
          </div>

          <div className="mt-8 md:mt-12 flex flex-col md:flex-row items-stretch gap-4">
            <div className="w-full md:w-1/2 border border-white/20 px-6 py-3 flex flex-col justify-center">
              <span className="block text-xs text-grey uppercase tracking-widest">
                Running Until
              </span>
              <span className="block text-white font-bold text-xl mt-1">
                JAN 15, 2026
              </span>
            </div>
            <button className="w-full md:w-1/2 bg-white text-black px-8 py-4 font-bold uppercase hover:bg-accent transition-colors duration-300">
              View Gallery
            </button>
          </div>
        </div>

        {/* RIGHT: Upcoming Events List */}
        <div className="w-full md:w-1/2 border-t md:border-t-0 md:border-l border-white/10 md:pl-10 pt-10 md:pt-0">
          <h3 className="text-xl text-white font-bold mb-6">Upcoming Events</h3>

          <div className="space-y-4">
            {eventsData.map((event, index) => (
              <div
                key={index}
                className="event-card group flex items-center gap-4 p-4 border border-white/5 hover:border-accent/50 bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer"
              >
                {/* Date Box */}
                <div className="flex flex-col items-center justify-center w-16 h-16 bg-[#0f0f0f] text-accent font-bold border border-white/10 shrink-0">
                  <span className="text-[10px] uppercase leading-none">
                    {event.date.split(" ")[0]}
                  </span>
                  <span className="text-lg leading-none mt-1">
                    {event.date.split(" ")[1]}
                  </span>
                </div>

                {/* Text Info */}
                <div className="flex-grow">
                  <span className="text-xs text-grey uppercase tracking-wider">
                    {event.type}
                  </span>
                  <h4 className="text-white font-bold text-lg group-hover:text-accent transition-colors">
                    {event.title}
                  </h4>
                </div>

                {/* Hover Image Reveal (Optional Polish) */}
                <div className="w-16 h-16 overflow-hidden hidden sm:block">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-110 group-hover:scale-100"
                  />
                </div>
              </div>
            ))}
          </div>

          <a
            href="#"
            className="inline-block mt-8 text-sm text-white border-b border-accent pb-1 hover:text-accent transition-colors"
          >
            VIEW FULL CALENDAR &rarr;
          </a>
        </div>
      </div>
    </div>
  );
};

export default ExhibitionOverlay;
