import { useEffect, useRef } from "react";
import "./Cnn.css";

import Int1 from "./assets/int_1.jpeg";
import Int2 from "./assets/int_2.jpg";
import Int3 from "./assets/int_3.jpg";
import Int4 from "./assets/int_4.jpg";
import Int5 from "./assets/int_5.jpg";
import Int6 from "./assets/int_6.jpg";

const models = [
  {
    name: "YOLOv3",
    tag: "DETECTION",
    desc: "Fast object detection for spring features, drainage signatures and small visual cues in drone and high-resolution imagery.",
    stat: "45ms",
    statLabel: "inference time",
  },
  {
    name: "Faster R-CNN",
    tag: "PRECISION",
    desc: "Region-based high-accuracy detection for complex terrain and ambiguous spring-source environments.",
    stat: "92%",
    statLabel: "accuracy",
  },
  {
    name: "SSD",
    tag: "SCALE",
    desc: "Single-shot multi-scale detection to rapidly screen large raster tiles and extract candidate spring zones.",
    stat: "60k+",
    statLabel: "tiles screened",
  },
  {
    name: "ResNet",
    tag: "CLASSIFICATION",
    desc: "Deep residual classification for image patches, spectral signatures and springshed vulnerability classes.",
    stat: "50+",
    statLabel: "feature layers",
  },
];

const pipeline = [
  "Satellite / Drone",
  "CNN Processing",
  "Spring Detection",
  "Priority Ranking",
  "Field Action",
];

const interventions = [
  {
    tag: "Recharge",
    title: "Percolation pits",
    desc: "Small pits in suitable recharge zones capture rainfall, increase infiltration and reduce direct runoff from slopes.",
    color: "#00d4c7",
    img: Int1,
  },
  {
    tag: "Slope treatment",
    title: "Staggered trenches",
    desc: "Trenches laid across slopes slow water, trap sediment, and support plantations in degraded catchments.",
    color: "#4caf7d",
    img: Int2,
  },
  {
    tag: "Vegetation",
    title: "Agroforestry buffers",
    desc: "Spring-linked tree and horticulture models rebuild cover, diversify income and increase root-zone moisture retention.",
    color: "#8bc34a",
    img: Int3,
  },
  {
    tag: "Soil",
    title: "Contour bunds",
    desc: "Contour works reduce erosion and create micro-sites for moisture, groundwater recharge and natural regeneration.",
    color: "#ff9800",
    img: Int4,
  },
  {
    tag: "Water source",
    title: "Spring boxes",
    desc: "Source protection, collection chambers and hygienic conveyance improve access without damaging recharge areas.",
    color: "#2196f3",
    img: Int5,
  },
  {
    tag: "Community",
    title: "Bamboo conveyance",
    desc: "Local, low-cost water conveyance systems integrated with springshed governance and community maintenance.",
    color: "#cddc39",
    img: Int6,
  },
];

export default function Cnn() {
  const modelRefs = useRef([]);
  const interventionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    modelRefs.current.forEach((el) => el && observer.observe(el));
    interventionRefs.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div id="cnn" className="cnn">

      {/* ── MAIN PAGE ── */}
      <div className="cnn-main-page">
        <div className="cnn-grid-bg" />

        <div className="cnn-main-inner">

          {/* Title block */}
          <div className="cnn-main-left">
            <p className="cnn-eyebrow">AI / CNN DETECTION ARCHITECTURE</p>
            <h2 className="cnn-hero-title">
              From raw imagery to{" "}
              <span className="cnn-highlight">priority spring action.</span>
            </h2>
            <p className="cnn-hero-sub">
              The technology layer converts satellite, drone and field observations
              into a validated spring inventory, hotspot analysis and intervention plan.
              The goal is not only detection, but decision-making.
            </p>
          </div>

          {/* Pipeline with animated arrows */}
          <div className="cnn-pipeline">
            {pipeline.map((step, i) => (
              <div key={i} className="cnn-pipe-group">
                <div className="cnn-pipe-step">
                  <div className="cnn-pipe-dot" />
                  <span>{step}</span>
                </div>
                {i < pipeline.length - 1 && (
                  <div className="cnn-pipe-arrow">
                    <div className="cnn-pipe-arrow-line">
                      <div className="cnn-pipe-arrow-pulse" />
                    </div>
                    <div className="cnn-pipe-arrow-head">›</div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Detection models */}
          <div className="cnn-models-block">
            <p className="cnn-section-label">DETECTION MODELS</p>
            <div className="cnn-model-grid">
              {models.map((model, i) => (
                <div
                  key={model.name}
                  className="cnn-model-card"
                  ref={(el) => (modelRefs.current[i] = el)}
                >
                  <div className="cnn-model-glow" />
                  <div className="cnn-model-top">
                    <span className="cnn-model-tag">{model.tag}</span>
                  </div>
                  <h3 className="cnn-model-name">{model.name}</h3>
                  <p className="cnn-model-desc">{model.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── INTERVENTIONS ── */}
      <div className="cnn-interventions">
        <div className="cnn-interventions-head">
          <p className="cnn-eyebrow-dark">ON-GROUND PACKAGE</p>
          <h2 className="cnn-interventions-title">
            Sustainable interventions for rejuvenating springs
          </h2>
          <p className="cnn-interventions-sub">
            Each critical spring receives a tailored package: recharge works above
            the spring, soil conservation on slopes, vegetation restoration, and
            community monitoring.
          </p>
        </div>

        <div className="cnn-intervention-grid">
          {interventions.map((item, i) => (
            <div
              key={item.title}
              className="cnn-intervention-card"
              ref={(el) => (interventionRefs.current[i] = el)}
              style={{ "--accent": item.color }}
            >
              <div
                className="cnn-intervention-img"
                style={{ backgroundImage: `url('${item.img}')` }}
              />
              <div className="cnn-intervention-body">
                <div className="cnn-intervention-tag">{item.tag}</div>
                <h3 className="cnn-intervention-title">{item.title}</h3>
                <p className="cnn-intervention-desc">{item.desc}</p>
                <div className="cnn-intervention-line" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}