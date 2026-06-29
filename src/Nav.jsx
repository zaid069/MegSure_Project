import { useState, useEffect } from "react";
import "./Nav.css";

const navItems = [
  { label: "RAIN JOURNEY", href: "home" },
  { label: "CRISIS", href: "crisis" },
  { label: "RESOLUTION", href: "resolution" },
  { label: "CNN", href: "cnn" },
  { label: "DSS MAP", href: "dss-map" },
];

export default function Nav() {
  const [active, setActive] = useState("home");

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActive(id);
    }
  };

  // Highlight nav item based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => ({
        id: item.href,
        el: document.getElementById(item.href),
      }));

      for (let i = sections.length - 1; i >= 0; i--) {
        const { id, el } = sections[i];
        if (el && el.getBoundingClientRect().top <= 100) {
          setActive(id);
          break;
        }
      }
      // Mobile nav moves up when logo gone
      if (window.innerWidth <= 768) {
        const header = document.querySelector('.header');
        if (window.scrollY > 44) {
          header?.classList.add('nav-top');
        } else {
          header?.classList.remove('nav-top');
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="header">

      {/* Right: nav pill */}
      <nav className="header-nav">
        {navItems.map((item) => (
          <button
            key={item.href}
            className={`header-nav-btn ${active === item.href ? "active" : ""}`}
            onClick={() => scrollToSection(item.href)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
}