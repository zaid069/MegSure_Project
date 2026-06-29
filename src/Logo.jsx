import { useEffect, useState } from "react";
import "./Logo.css";

import mbdaLogo from "./assets/MBDA_logo.webp";
import nmhsLogo from "./assets/NMHS_logo.png";
import moefccLogo from "./assets/MoEFCC_logo.png";
import ioraLogo from "./assets/IORA_logo.png";

export default function Logo() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY < 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`site-header ${visible ? "show" : "hide"}`}>
      <a href="https://mbda.gov.in" target="_blank" rel="noopener noreferrer">
        <img src={mbdaLogo} alt="MBDA" className="header-logo" />
      </a>
      <a href="https://nmhs.org.in" target="_blank" rel="noopener noreferrer">
        <img src={nmhsLogo} alt="NMHS" className="header-logo" />
      </a>
      <a href="https://moef.gov.in" target="_blank" rel="noopener noreferrer">
        <img src={moefccLogo} alt="MoEFCC" className="header-logo" />
      </a>
      <a href="https://ioraecological.com" target="_blank" rel="noopener noreferrer">
        <img src={ioraLogo} alt="IORA" className="header-logo" />
      </a>
    </header>
  );
}