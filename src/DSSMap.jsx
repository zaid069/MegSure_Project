import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import "./DSSMap.css";

const legend = [
  { color: "#65b86c", label: "Active" },
  { color: "#e4a938", label: "At risk" },
  { color: "#e15d43", label: "Critical / dried" },
  { color: "#00d4c7", label: "Intervention" },
];

export default function DSSMap() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    import("leaflet").then((L) => {
      if (mapInstanceRef.current) return;

      const map = L.default.map(mapRef.current, {
        center: [25.57, 91.87],
        zoom: 8,
        scrollWheelZoom: false,
        zoomControl: false,
      });

      L.default.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        { maxZoom: 18, attribution: "© OpenStreetMap contributors" }
      ).addTo(map);

      const bbox = [
        [26.12, 89.75],
        [26.12, 92.95],
        [25.05, 92.95],
        [25.05, 89.75],
      ];
      L.default.polygon(bbox, {
        color: "#00d4c7",
        weight: 1.5,
        fill: false,
        dashArray: "6 8",
      }).addTo(map);

      mapInstanceRef.current = map;
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();

  return (
    <div id="dss-map" className="dss-section">
      <div className="dss-grid-bg" />

      <div className="dss-inner">

        {/* Title */}
        <div className="dss-head">
          <p className="dss-eyebrow">DECISION SUPPORT SYSTEM</p>
          <h2 className="dss-title">
            Smart DSS for spring health and{" "}
            <span className="dss-highlight">investment planning.</span>
          </h2>
          <p className="dss-sub">
            The DSS layer integrates satellite data, field validation and
            agroforestry suitability to guide investment decisions across
            Meghalaya's springshed network.
          </p>
        </div>

        {/* Two cards */}
        <div className="dss-cards">

          {/* Left — info card */}
          <div className="dss-info-card">

            <p className="dss-card-eyebrow">DSS OVERVIEW</p>

            <p className="dss-card-body">
              The DSS layer is designed as a live decision surface: spring
              locations, risk class, intervention status, agroforestry
              suitability, field validation and seasonal monitoring in one
              spatial dashboard.
            </p>

            <div className="dss-divider" />

            <p className="dss-card-eyebrow">SPRING STATUS LEGEND</p>
            <div className="dss-legend">
              {legend.map((item) => (
                <span key={item.label} className="dss-legend-item">
                  <i className="dss-dot" style={{ background: item.color }} />
                  {item.label}
                </span>
              ))}
            </div>

            <div className="dss-divider" />

            {/* Dashboard button */}
            <a
              href="#"
              className="dss-dashboard-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Open Dashboard</span>
              <span className="dss-btn-arrow">→</span>
            </a>

            <div className="dss-divider" />

            <p className="dss-card-body">
              Springs in Meghalaya support drinking water, household use,
              irrigation and agroforestry across thousands of villages. MegSure
              maps each spring's risk class, recharge zone and intervention
              priority to enable targeted investment and monitoring.
            </p>

          </div>

          {/* Right — map card */}
          <div className="dss-map-card">

            <div className="dss-map-topbar">
              <div className="dss-map-label">
                <div className="dss-map-label-dot" />
                    MAP
              </div>
              <div className="dss-zoom-controls">
                <button className="dss-zoom-btn" onClick={handleZoomIn}>+</button>
                <button className="dss-zoom-btn" onClick={handleZoomOut}>−</button>
              </div>
            </div>

            <div ref={mapRef} className="dss-map-container" />

            <p className="dss-map-note"></p>

          </div>

        </div>
      </div>
    </div>
  );
}