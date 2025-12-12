import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const VisitOverlay = ({ isOpen, onClose }) => {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Animate In
      gsap.to(overlayRef.current, {
        duration: 0.5,
        opacity: 1,
        pointerEvents: "auto",
        ease: "power2.out",
      });
      gsap.fromTo(
        contentRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out" }
      );
    } else {
      // Animate Out
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
      className="fixed inset-0 z-40 flex items-center justify-end opacity-0 pointer-events-none"
    >
      {/* Darkened/Blurred Background - Clicks close the modal */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
        onClick={onClose}
      ></div>

      {/* Side Panel Content */}
      <div className="relative w-full md:w-[500px] h-full bg-[#1a1a1a] border-l border-[#333] p-6 md:p-12 overflow-y-auto custom-scrollbar">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 md:top-8 md:right-8 text-white hover:text-accent transition-colors text-sm font-bold tracking-widest"
        >
          CLOSE [X]
        </button>

        <div ref={contentRef} className="mt-10 space-y-12 pb-10">
          {/* Header */}
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase mb-2">
              The Relics
            </h2>
            <p className="text-accent uppercase text-sm tracking-widest">
              Location & Hours
            </p>
          </div>

          {/* Opening Hours */}
          <div className="border-t border-white/10 pt-6">
            <h3 className="text-xl text-white font-bold mb-4">Opening Hours</h3>
            <ul className="space-y-3 text-grey text-sm font-light">
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Mon - Fri</span>
                <span className="text-white">09:00 AM — 06:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Saturday</span>
                <span className="text-white">10:00 AM — 08:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span className="text-white">Closed</span>
              </li>
            </ul>
          </div>

          {/* Tickets */}
          <div className="border-t border-white/10 pt-6">
            <h3 className="text-xl text-white font-bold mb-4">Admissions</h3>
            <ul className="space-y-3 text-grey text-sm font-light">
              <li className="flex justify-between items-center">
                <span>Adult</span>
                <span className="text-accent text-lg font-bold">$25</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Student (w/ ID)</span>
                <span className="text-accent text-lg font-bold">$15</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Children (Under 12)</span>
                <span className="text-accent text-lg font-bold">Free</span>
              </li>
            </ul>
            <button className="w-full mt-6 py-4 border border-accent text-accent uppercase hover:bg-accent hover:text-black transition-colors duration-300 font-bold text-sm tracking-wider">
              Book Tickets Online
            </button>
          </div>

          {/* LIVE MAP SECTION */}
          <div className="border-t border-white/10 pt-6">
            <h3 className="text-xl text-white font-bold mb-4">Location</h3>
            <p className="text-grey text-sm mb-4">
              1200 Via Antiqua, Rome
              <br />
              Lazio, Italy 00118
            </p>

            {/* Map Container */}
            <div className="w-full h-[250px] bg-[#222] rounded-sm overflow-hidden relative border border-white/10 group">
              {/* NOTE: The style filter below is what makes the map dark.
                 grayscale(100%) = removes color
                 invert(92%) = turns white backgrounds black
                 contrast(83%) = softens the harsh lines
              */}
              <iframe
                title="Museum Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.873236726662!2d12.490795576629988!3d41.890210171241184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f61b6532013ad%3A0x28f1c82e908503c4!2sColosseum!5e0!3m2!1sen!2sus!4v1716383625488!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: "grayscale(100%) invert(92%) contrast(83%)",
                }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="opacity-70 group-hover:opacity-100 transition-opacity duration-500"
              ></iframe>

              {/* "Get Directions" Button overlay */}
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-4 left-4 bg-accent text-black text-xs font-bold px-4 py-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
              >
                GET DIRECTIONS
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitOverlay;
