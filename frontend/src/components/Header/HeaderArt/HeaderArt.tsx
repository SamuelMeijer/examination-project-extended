import React, { CSSProperties } from "react";
import Styles from "./headerArt.module.css";
import { useLocation } from "react-router-dom";

export default function HeaderArt() {
  // Checking current pathname
  const location = useLocation().pathname;

  // TODO: Move to separate component to make reusable for header?
  let bgColorArr: string[] = [];
  // Populating bgColorArr
  switch (location) {
    case "/game":
      bgColorArr = ["#FFC66C", "#FF8632", "#FF7F4A"];
      break;
    case "/shop":
      bgColorArr = ["#FF7F4A", "#FFC66C", "#FF8632"];
      break;
    default:
      bgColorArr = ["#FF8632", "#FF7F4A", "#FFC66C"];
      break;
  }

  // Dynamic backgroundColor
  const backColor: CSSProperties = {
    backgroundColor: bgColorArr[0],
  };

  const midColor: CSSProperties = {
    backgroundColor: bgColorArr[1],
  };

  const frontColor: CSSProperties = {
    backgroundColor: bgColorArr[2],
  };

  return (
    <section className={Styles.headerArtContainer}>
      <div className={Styles.rectangleBack} style={backColor} />
      <div className={Styles.rectangleMid} style={midColor} />
      <div className={Styles.rectangleFront} style={frontColor} />
    </section>
  );
}
