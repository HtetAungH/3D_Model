import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import Scene from "./component/Scene";
import Loader from "./component/Loader";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

// Image Data Array to keep JSX clean
const galleryImages = [
  "https://webprojects.cloud/r&d/roman-structure/images/man-one.jpg",
  "https://webprojects.cloud/r&d/roman-structure/images/women-one.jpg",
  "https://webprojects.cloud/r&d/roman-structure/images/women-two.jpg",
  "https://webprojects.cloud/r&d/roman-structure/images/man-two.jpg",
  "https://webprojects.cloud/r&d/roman-structure/images/women-four.jpg",
  "https://webprojects.cloud/r&d/roman-structure/images/man-four.jpg",
  "https://webprojects.cloud/r&d/roman-structure/images/man-five.jpg",
  "https://webprojects.cloud/r&d/roman-structure/images/man-six.jpg",
  "https://webprojects.cloud/r&d/roman-structure/images/women-six.jpg",
  "https://webprojects.cloud/r&d/roman-structure/images/man-seven.jpg",
  "https://webprojects.cloud/r&d/roman-structure/images/men-eight.jpg",
  "https://webprojects.cloud/r&d/roman-structure/images/women-eight.jpg",
  "https://webprojects.cloud/r&d/roman-structure/images/women-nine.jpg",
  "https://webprojects.cloud/r&d/roman-structure/images/men-nine.jpg",
];

function App() {
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef(null);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  // Intro & Parallax Animations
  useLayoutEffect(() => {
    if (!loaded) return;

    const ctx = gsap.context(() => {
      // Banner Reveal
      gsap.from(".banner-element", {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: "power2.out",
        stagger: 0.2,
      });

      // Image Grid Entry
      gsap.from(".gallery-item", {
        opacity: 0,
        scale: 0.8,
        stagger: 0.1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".images-container",
          start: "top 80%",
        },
      });

      // Parallax Effect
      const images = document.querySelectorAll(".img-main");
      images.forEach((img) => {
        gsap.to(img, {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [loaded]);

  return (
    <div ref={containerRef} className="relative min-h-screen">
      <Loader loaded={loaded} />
      <Scene setLoaded={setLoaded} />

      {/* Main Content */}
      <main
        className={`transition-opacity duration-1000 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Header */}
        <header className="flex flex-col md:flex-row items-center justify-between p-4 md:p-10 gap-5 md:gap-0">
          <a
            href="#"
            className="logo flex justify-center max-w-[150px] md:max-w-[270px]"
          >
            <img
              src="https://webprojects.cloud/r&d/roman-structure/images/Logo.svg"
              alt="Logo"
              className="w-full h-auto"
            />
          </a>

          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-10 bg-dark px-4 md:px-8 py-2 md:py-0">
            <button className="border border-transparent bg-transparent">
              <img
                src="https://webprojects.cloud/r&d/roman-structure/images/search-icon.svg"
                alt="search"
                className="w-5 h-5"
              />
            </button>
            {["visit", "exhibitions & events", "collection"].map((text) => (
              <a
                key={text}
                href="#"
                className="text-[11px] md:text-sm uppercase text-[#EBEBEB] hover:text-accent transition-colors duration-150"
              >
                {text}
              </a>
            ))}
            <button className="bg-nav-bg p-3 md:p-4">
              <img
                src="https://webprojects.cloud/r&d/roman-structure/images/menu_icon.svg"
                alt="menu"
              />
            </button>
          </div>
        </header>

        {/* Banner */}
        <section className="min-h-screen flex items-center justify-center">
          <div className="banner-section max-w-[1122px] px-5 text-center">
            <h1 className="banner-element text-[40px] leading-[50px] md:text-[60px] md:leading-[80px] lg:text-[100px] lg:leading-[140px] text-white font-black uppercase">
              delve into relics
            </h1>
            <p className="banner-element text-grey mt-4">
              Welcome to the relics museum, where history and art come to life.
              Explore our diverse collection of artifacts, paintings, and
              sculptures, each with its own unique story to tell, Plan your
              visit and book tickets online.
            </p>
            <a
              href="#"
              className="banner-element group flex items-center gap-1 text-accent relative w-fit mx-auto mt-8 font-medium uppercase text-sm md:text-base"
            >
              plan your visit
              <img
                src="https://webprojects.cloud/r&d/roman-structure/images/arrow-green.svg"
                alt="arrow"
                className="w-[18px] transition-transform duration-150 group-hover:rotate-45"
              />
              <span className="absolute right-0 top-[calc(100%+2px)] w-0 h-[1px] bg-accent transition-all duration-150 group-hover:w-full group-hover:left-0"></span>
            </a>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="images-container flex flex-wrap justify-between gap-y-8 p-5 md:p-10 lg:pt-[100px] lg:px-10">
          {galleryImages.map((src, index) => (
            <div
              key={index}
              className={`img w-full flex ${
                index % 2 !== 0 ? "justify-end" : ""
              }`}
            >
              <div className="gallery-item img-main w-full md:max-w-[50vw] lg:max-w-[30vw] border border-transparent relative overflow-hidden group hover:border-[#5599FF] transition-all duration-150">
                <img
                  src={src}
                  alt="gallery"
                  className="w-full aspect-video object-cover object-top transition-transform duration-1000 group-hover:scale-110"
                />
                {/* Hover Shine Effect */}
                <div className="absolute -top-full -left-full w-[200%] h-[200%] bg-gradient-to-br from-transparent via-white/30 to-transparent blur-[33px] pointer-events-none transition-all duration-1000 group-hover:top-full group-hover:left-full"></div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;
