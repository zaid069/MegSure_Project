// Footer.jsx
import "./Footer.css";
import nmhsLogo from "./assets/NMHS_logo.png";
import mbdaLogo from "./assets/MBDA_logo.webp";
import moefccLogo from "./assets/MoEFCC_logo.png";
import ioraLogo from "./assets/IORA_logo.png";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid-bg" />

      <div className="footer-inner">

        {/* ── SIGNATURE PANEL ── */}
        <div className="footer-panel">
          <div className="footer-panel-logos">
            <img src={nmhsLogo} alt="NMHS" className="footer-panel-logo" />
            <img src={mbdaLogo} alt="MBDA" className="footer-panel-logo" />
            <img src={moefccLogo} alt="MoEFCC" className="footer-panel-logo" />
            <img src={ioraLogo} alt="IORA" className="footer-panel-logo" />
          </div>

          <svg
            className="footer-panel-cutout"
            viewBox="0 0 1200 800"
            preserveAspectRatio="xMidYMax slice"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="panelGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#062420" />
                <stop offset="45%" stopColor="#04544c" />
                <stop offset="100%" stopColor="#00b8ad" />
              </linearGradient>

              {/* hole for the main panel fill */}
              <mask id="textCutout">
                <rect fill="#ffffff" x="0" y="0" width="1200" height="800" />
                <text
                  fill="#000000"
                  fontFamily="Georgia, serif"
                  fontWeight="700"
                  fontSize="108"
                  textAnchor="middle"
                  x="600"
                  y="775"
                  textLength="1140"
                  lengthAdjust="spacingAndGlyphs"
                >
                  Springshed Management
                </text>
              </mask>

              {/* dot layer's own fade (dark top = hidden, light bottom = visible) */}
              <linearGradient id="dotFadeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#000000" />
                <stop offset="65%" stopColor="#000000" />
                <stop offset="100%" stopColor="#ffffff" />
              </linearGradient>

              <pattern id="dotPattern" width="6" height="6" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="#ffffff" fillOpacity="0.5" />
              </pattern>

              {/* dots respect BOTH the fade AND the text hole */}
              <mask id="dotMask">
                <rect x="0" y="0" width="1200" height="800" fill="url(#dotFadeGradient)" />
                <text
                  fill="#000000"
                  fontFamily="Georgia, serif"
                  fontWeight="700"
                  fontSize="108"
                  textAnchor="middle"
                  x="600"
                  y="775"
                  textLength="1140"
                  lengthAdjust="spacingAndGlyphs"
                >
                  Springshed Management
                </text>
              </mask>
            </defs>

            {/* main panel gradient, punched by the text hole */}
            <rect
              fill="url(#panelGradient)"
              x="0" y="0"
              width="1200" height="800"
              mask="url(#textCutout)"
            />

            {/* dot texture, fades in toward the bottom, also skips the text hole */}
            <rect
              fill="url(#dotPattern)"
              x="0" y="0"
              width="1200" height="800"
              mask="url(#dotMask)"
            />
          </svg>

          <div className="footer-panel-fade" />
        </div>

      </div>
    </footer>
  );
}