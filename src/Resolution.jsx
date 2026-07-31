import { useEffect } from "react";
import "./Resolution.css";

import Res1 from "./assets/Res_1.jpg";
import Res2 from "./assets/Res_2.jpg";
import Res3 from "./assets/Res_3.jpg";
import Res4 from "./assets/Res_4.jpg";
import Res5 from "./assets/Res_5.jpg";

const steps = [
  {
    id: "01",
    label: "SEE THE LANDSCAPE",
    title: "Remote sensing + GIS springshed basemap.",
    body: "Optical, thermal and drone datasets are layered to detect likely spring sources, vegetation condition, drainage lines, slope, land use, soil moisture proxies and recharge zones.",
    dark: true,
    align: "left",
    bg: Res1,
    pills: ["Sentinel-2", "Thermal", "Drone", "DEM", "LULC"],
  },
  {
    id: "02",
    label: "CNN NOVEL APPROACH",
    title: "AI models identify springs and spring-linked signatures.",
    body: "YOLOv3, Faster R-CNN, SSD and ResNet are used as a CNN suite to automate feature detection, improve precision, and scale spring mapping beyond manual visual interpretation.",
    metric: "AI",
    metricLabel: "SPRING DETECTION AND PRIORITISATION",
    dark: false,
    align: "right",
    bg: Res2,
  },
  {
    id: "03",
    label: "GROUND TRUTH",
    title: "Field validation makes the map real.",
    body: "Field teams validate spring location, flow status, source condition, community dependence and intervention feasibility. The field data corrects the model and builds a monitoring network.",
    dark: true,
    align: "left",
    bg: Res3,
    pills: ["SPRING SURVEY", "FLOW STATUS", "COMMUNITY USE", "RISK CLASS"],
  },
  {
    id: "04",
    label: "RECHARGE INTERVENTIONS",
    title: "Nature-based solutions slow, spread and sink rainwater.",
    body: "Percolation pits, staggered trenches, contour trenches, vegetative barriers, spring boxes, recharge ponds and soil moisture works are placed where they can strengthen the spring recharge area.",
    dark: false,
    align: "right",
    bg: Res4,
    pills: ["PERCOLATION PITS", "STAGGERED TRENCHES", "CONTOUR TRENCHES", "CHECK STRUCTURES"],
  },
  {
    id: "05",
    label: "SPRING-LINKED AGROFORESTRY",
    title: "Agroforestry becomes part of springshed restoration.",
    body: "Zone-specific models are designed for agro-climatic, edaphic and altitudinal conditions. Trees, horticultural crops and soil cover support farmer livelihoods while strengthening recharge and reducing land degradation.",
    dark: true,
    align: "left",
    bg: Res5,
  },
];

export default function Resolution() {
  useEffect(() => {
    const bg1 = document.getElementById("resolution-bg-1");
    const bg2 = document.getElementById("resolution-bg-2");
    const stepEls = document.querySelectorAll(".resolution-step");
    let currentBg = 1;

    // Preload all images
    const preloadImage = (url) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = resolve; // resolve even on error
        img.src = url;
      });
    };

    // Preload all images before setting initial bg
    Promise.all(steps.map(step => preloadImage(step.bg))).then(() => {
      if (bg1) { bg1.style.backgroundImage = `url('${steps[0].bg}')`; bg1.style.opacity = "1"; }
      if (bg2) { bg2.style.backgroundImage = `url('${steps[1].bg}')`; bg2.style.opacity = "0"; }
    });


    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          const url = entry.target.dataset.bg;
          if (url) {
            const tempImg = new Image();
            tempImg.onload = () => {
              if (currentBg === 1) {
                bg2.style.backgroundImage = `url('${url}')`;
                bg2.style.opacity = "1";
                bg1.style.opacity = "0";
                currentBg = 2;
              } else {
                bg1.style.backgroundImage = `url('${url}')`;
                bg1.style.opacity = "1";
                bg2.style.opacity = "0";
                currentBg = 1;
              }
            };
            tempImg.src = url;
          }
        } else {
          entry.target.classList.remove("active");
        }
      });
    }, { threshold: 0.58 });

    stepEls.forEach(step => observer.observe(step));
    return () => observer.disconnect();
  }, []);

  return (
    <div id="resolution">

      {/* PAGE 1 — Title */}
      <div className="resolution-title-page">
        <div className="resolution-title-inner">
          <p className="resolution-eyebrow">THE RESOLUTION</p>
          <h2 className="resolution-title">
            Detect the spring. Diagnose the springshed. Rebuild recharge.
          </h2>
          <p className="resolution-subtitle">
            The project combines remote sensing, AI/CNN detection, field validation,
            multi-criteria prioritisation and nature-based interventions to rejuvenate
            critical springs and support spring-linked agroforestry.
          </p>
        </div>
      </div>

      {/* SCROLLY SECTION */}
      <div className="resolution-scrolly">

        <div className="resolution-scrolly-bg">
          <div id="resolution-bg-1" className="resolution-bg-img" />
          <div id="resolution-bg-2" className="resolution-bg-img" />
          <div className="resolution-bg-overlay" />
        </div>

        <div className="resolution-steps">
          {steps.map((step) => (
            <article
              key={step.id}
              className={`resolution-step ${step.align === "right" ? "resolution-step-right" : ""}`}
              data-bg={step.bg}
            >
              <div className={`resolution-card ${step.dark ? "resolution-card-dark" : "resolution-card-light"}`}>
                <p className="resolution-card-number">
                  {step.id} · {step.label}
                </p>
                <h3 className="resolution-card-title">{step.title}</h3>
                <p className="resolution-card-body">{step.body}</p>
                {step.metric && (
                  <div className="resolution-metric">
                    <b className="resolution-metric-num">{step.metric}</b>
                    <span className="resolution-metric-label">{step.metricLabel}</span>
                  </div>
                )}
                {step.pills && (
                  <div className="resolution-pills">
                    {step.pills.map(pill => (
                      <span key={pill} className="resolution-pill">{pill}</span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}