import "./RevealSection.css";
import Crisis from "./Crisis";
import Resolution from "./Resolution";
import CNN from "./CNN";
import DSSMap from "./DSSMap";

export default function RevealSection() {
  return (
    <>`
        <div className="rs-content">
          <section id="crisis"><Crisis /></section>
          <section id="resolution"><Resolution /></section>
          <section id="cnn"><CNN /></section>
          <section id="dss-map"><DSSMap /></section>
        </div>
        
    </>
  );
}