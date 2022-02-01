import React from "react";
import Styles from "./header.module.css";

import HeaderArt from "./HeaderArt/HeaderArt";

export default function Header() {
  return (
  <section className={Styles.headerContainer}>
    <HeaderArt />
  </section>);
}
