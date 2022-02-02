import React, { CSSProperties } from "react";
import Styles from "./header.module.css";
import { useLocation } from "react-router-dom";

import HeaderArt from "./HeaderArt/HeaderArt";
import { colorDecider, marginDecider, titleDecider } from "../../common/utils";

export default function Header() {
  // Checking current pathname
  const location = useLocation().pathname;

  // Dynamic title
  const title = titleDecider(location);

  // Dynamic backgroundColor depending on current pathname
  let bgColorArr = colorDecider(location);

  if (location === "/home") {
    bgColorArr = ["#4C352F"];
  }

  const dynamicBackground: CSSProperties = {
    backgroundColor: bgColorArr[0],
  };

  const dynamicBackgroundAndMargin: CSSProperties = {
    backgroundColor: bgColorArr[0],
    marginRight: marginDecider(location),
  };

  // TODO: Add location or bgColorArr as prop to HeaderArt?
  // TODO: Add correct color for invalid pathnames
  return (
    <section className={Styles.headerContainer}>
      <HeaderArt />

      <div
        className={Styles.headerTitleContainer}
        style={dynamicBackgroundAndMargin}
      >
        <h1 className={Styles.headerTitle}>{title}</h1>

        <div
          className={Styles.headerTitleContainerNavConnector}
          style={dynamicBackground}
        />
      </div>
    </section>
  );
}
