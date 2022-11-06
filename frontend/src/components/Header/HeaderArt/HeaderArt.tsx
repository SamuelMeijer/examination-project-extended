import React, { CSSProperties } from "react";
import Styles from "./headerArt.module.css";
import { useLocation } from "react-router-dom";
import { colorDecider } from "../../../common/utils";
import Logo from '../../../common/logo'

export default function HeaderArt() {
  // Checking current pathname
  const location = useLocation().pathname;

  // Dynamic backgroundColor depending on current pathname
  const bgColorArr = colorDecider(location);

  const midColor: CSSProperties = {
    backgroundColor: bgColorArr[1],
  };

  const frontColor: CSSProperties = {
    backgroundColor: bgColorArr[2],
  };

  return (
    <section className={Styles.headerArtContainer}>
      <div className={Styles.rectangleMid} style={midColor} />
      <div className={Styles.rectangleFront} style={frontColor}>
        <Logo />
      </div>
    </section>
  );
}
