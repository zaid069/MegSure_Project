import { useEffect } from "react";
import "./Crisis.css";
import Crisis_1 from "./assets/Crisis_1.jpg";
import Crisis_2 from "./assets/Crisis_2.jpg";
import Crisis_3 from "./assets/Crisis_3.webp";
import Crisis_4 from "./assets/Crisis_4.webp";

const steps = [
  {
    id: "01",
    label: "ABUNDANCE",
    title: "Rainfall is not the same as water security.",
    body: "Meghalaya receives an annual average of about 280 cm rainfall. But steep slopes quickly convert monsoon rain into runoff. Without enough soil cover, roots and recharge structures, water leaves before it can refill springs.",
    metric: "280",
    metricLabel: "CM ANNUAL RAINFALL",
    dark: false,
    align: "left",
    bg: Crisis_1,
  },
  {
    id: "02",
    label: "SPRING DEPENDENCE",
    title: "Springs are rural infrastructure.",
    body: "The state has over 60,000 springs. They support drinking water, household use, irrigation, and many existing agroforestry systems across spring-fed villages.",
    metric: "60k+",
    metricLabel: "SPRINGS ACROSS THE STATE",
    dark: true,
    align: "right",
    bg: Crisis_2,
  },
  {
    id: "03",
    label: "SCARCITY",
    title: "More than half the springs show decline.",
    body: "About 54% of springs have either dried up or recorded a significant reduction in flow. This turns seasonal water stress into a daily household and livelihood burden.",
    metric: "54%",
    metricLabel: "DRIED OR REDUCED-FLOW SPRINGS",
    dark: false,
    align: "left",
    bg: Crisis_3,
  },
  {
    id: "04",
    label: "LAND DEGRADATION",
    title: "Degraded vegetation reduces the sponge effect.",
    body: "Approximately 0.495 million ha — about 4.95 lakh ha — is affected by desertification and land degradation, with vegetation degradation and water erosion as major drivers. The restoration opportunity is real: mosaic restoration and protection can rebuild recharge landscapes.",
    metric: "22%",
    metricLabel: "LAND AREA AFFECTED",
    dark: true,
    align: "right",
    bg: Crisis_4,
    pills: ["VEGETATION DEGRADATION", "WATER EROSION", "SURFACE RUNOFF"],
  },
];

export default function Crisis() {
  useEffect(() => {
    const bg = document.getElementById("crisis-bg");
    const stepEls = document.querySelectorAll(".crisis-step");

    // Set initial background
    if (bg) bg.style.backgroundImage = `url('${steps[0].bg}')`;

    // Preload all images
    steps.forEach(step => {
      const img = new Image();
      img.src = step.bg;
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          const url = entry.target.dataset.bg;
          if (bg && url) {
            bg.style.backgroundImage = `url('${url}')`;
            bg.style.transform = "scale(1.01)";
            setTimeout(() => {
              bg.style.transform = "scale(1.05)";
            }, 500);
          }
        } else {
          entry.target.classList.remove("active");
        }
      });
    },
      { threshold: 0.58 }
    );

    stepEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="crisis" id="crisis">

      {/* PAGE 1 — Title */}
      <div className="crisis-title-page">
        <div className="crisis-title-inner">
          <p className="crisis-eyebrow">THE CRISIS</p>
          <h2 className="crisis-title">
            Meghalaya is wet in the sky, but stressed below the ground.
          </h2>
          <p className="crisis-subtitle">
            MegSure frames the challenge as a springshed crisis: rainfall is high,
            but land degradation, vegetation loss, steep terrain and surface runoff
            reduce groundwater recharge and weaken spring-dependent livelihoods.
          </p>
        </div>
      </div>

      {/* SCROLLY SECTION — sticky bg + cards */}
      <div className="crisis-scrolly">

        {/* Sticky background */}
        <div className="crisis-scrolly-bg">
          <div id="crisis-bg" className="crisis-bg-img" />
          <div className="crisis-bg-overlay" />
        </div>

        {/* Steps */}
        <div className="crisis-steps">
          {steps.map((step) => (
            <article
              key={step.id}
              data-id={step.id}
              className={`crisis-step ${step.align === "right" ? "crisis-step-right" : ""}`}
              data-bg={step.bg}
            >
              <div className={`crisis-card ${step.dark ? "crisis-card-dark" : "crisis-card-light"}`}>
                <p className="crisis-card-number">
                  {step.id} · {step.label}
                </p>
                <h3 className="crisis-card-title">{step.title}</h3>
                <p className="crisis-card-body">{step.body}</p>
                <div className="crisis-metric">
                  <b className="crisis-metric-num">{step.metric}</b>
                  <span className="crisis-metric-label">{step.metricLabel}</span>
                </div>
                {step.pills && (
                  <div className="crisis-pills">
                    {step.pills.map((pill) => (
                      <span key={pill} className="crisis-pill">{pill}</span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* INTERLUDE — closing quote */}
      <div className="crisis-interlude">
        <p className="crisis-quote">
          MegSure is not just a spring project. It is a plan to rebuild the{" "}
          <em>living catchment</em> around each spring.
        </p>
      </div>

    </div>
  );
}