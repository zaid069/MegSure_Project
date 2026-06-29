import { useEffect, useRef, useState } from "react";
import  heroVideo from "./assets/Hero_Video.mp4";
import "./Hero.css";

const slides = [
  {
    id: 0,
    eyebrow: "NMHS · MEGSURE · MEGHALAYA",
    title: "A paradox of",
    titleItalic: "abundance",
    body: "Clouds gather above Meghalaya. The state receives about 280 cm of rainfall annually, yet many hill communities face dry springs in the lean season.",
  },
  {
    id: 1,
    eyebrow: "NMHS · MEGSURE · MEGHALAYA",
    title: "Rain becomes",
    titleLine2: "runoff",
    body: "Heavy rain touches forest canopy and leaves. On steep slopes, water can rush across the surface before it recharges the ground.",
  },
  {
    id: 2,
    eyebrow: "NMHS · MEGSURE · MEGHALAYA",
    title: "Rain reaches",
    titleLine2: "plants",
    body: "Close-up water drops settle on leaves. The first task of a restored catchment is to keep more rain in contact with living vegetation and soil.",
  },
  {
    id: 3,
    eyebrow: "NMHS · MEGSURE · MEGHALAYA",
    titleItalic: "Roots",
    titleSuffix: " hold\nthe water",
    body: "Exposed roots, wet soil, leaf litter and small streams show how water moves through the root zone before emerging as springs.",
  },
  {
    id: 4,
    eyebrow: "NMHS · MEGSURE · MEGHALAYA",
    title: "From spring\nto bamboo\nto home",
    body: "Traditional bamboo channels show the logic of springshed management: collect water gently, convey it locally, and keep recharge landscapes alive.",
  },
];

export default function Hero() {
  const videoRef = useRef(null);
  const wrapperRef = useRef(null);
  const cardRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    const wrapper = wrapperRef.current;
    const card = cardRef.current;
    let targetTime = 0;
    let rafId = null;

    const smoothUpdate = () => {
      if (!video) return;
      const diff = targetTime - video.currentTime;
      if (Math.abs(diff) > 0.001) {
        video.currentTime = targetTime;;
      }
      rafId = requestAnimationFrame(smoothUpdate);
    };

    const handleScroll = () => {
      if (!wrapper || !video) return;
      if (video.readyState < 2) return;

      const scrollY = window.scrollY;
      const wrapperH = wrapper.offsetHeight;
      const winH = window.innerHeight;
      const total = wrapperH - winH;
      const p = Math.max(0, Math.min(scrollY / total, 1));

      if (video.duration) {
        targetTime = p * video.duration;
      }

      // Slide switching
      const boundaries = [0, 0.17, 0.33, 0.55, 0.78];
      const slideIndex = boundaries.reduce((acc, boundary, i) => {
        return p >= boundary ? i : acc;
      }, 0);
      setActiveSlide(slideIndex);

      // When video ends (progress > 0.85), peek the crisis card from bottom
      if (card) {
        if (p >= 0.85) {
          const cardProgress = Math.min((p - 0.85) / 0.09, 1);

          const cardHeight = cardProgress * 55;
          const cardWidth = 80 + (20 * cardProgress);
          const radius = 32 * (1 - cardProgress);

          card.style.height = cardHeight + "vh";
          card.style.width = cardWidth + "%";
          card.style.borderRadius = radius + "px " + radius + "px 0 0";
          card.style.opacity = cardProgress;
        } else {
          card.style.height = "0";
          card.style.opacity = "0";
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    rafId = requestAnimationFrame(smoothUpdate);

    if (video) {
      video.addEventListener("canplay", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
      if (video) video.removeEventListener("canplay", handleScroll);
    };
  }, []);

  const slide = slides[activeSlide];

  return (
    <section id="home" ref={wrapperRef} className="hero-wrapper">

      {/* Fixed video layer */}
      <div className="video-container">
        <video
          ref={videoRef}
          className="hero-video"
          src={heroVideo}
          muted
          playsInline
          preload="auto"
        />

        {/* Dark overlay */}
        <div className="hero-overlay" />

        {/* Slide text */}
        <div className="hero-text" key={activeSlide}>
          <p className="hero-eyebrow">{slide.eyebrow}</p>
          <h1 className="hero-title">
            {slide.id === 0 && (<>{slide.title}<br /><em>{slide.titleItalic}</em></>)}
            {slide.id === 1 && (<>{slide.title}<br />{slide.titleLine2}</>)}
            {slide.id === 2 && (<>{slide.title}<br />{slide.titleLine2}</>)}
            {slide.id === 3 && (
              <>
                <em>{slide.titleItalic}</em>
                {slide.titleSuffix?.split("\n").map((line, i) => (
                  <span key={i}>{line}<br /></span>
                ))}
              </>
            )}
            {slide.id === 4 && slide.title?.split("\n").map((line, i) => (
              <span key={i}>{line}<br /></span>
            ))}
          </h1>
          <p className="hero-body">{slide.body}</p>
        </div>
      </div>

      {/* Crisis card peeks from bottom when video ends */}
      <div className="hero-crisis-card" ref={cardRef} />

    </section>
  );
}