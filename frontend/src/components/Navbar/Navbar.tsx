import React from "react";
import Styles from "./navbar.module.css";

import { NavLink } from "react-router-dom";
import { FaHome, FaGamepad, FaUser } from "react-icons/fa";

export default function NavBar() {
  return (
    <section className={Styles.navContainer}>
      <nav className={Styles.navLinkContainer}>
        <NavLink
          to="/home"
          className={(isActive) =>
            !isActive.isActive
              ? `${Styles.home} ${Styles.navLink} ${Styles.navLinkNotActive}`
              : `${Styles.home} ${Styles.navLink} ${Styles.navLinkIsActive}`
          }
        >
          <FaHome fontSize="40px" />
          Home
        </NavLink>
        <NavLink
          to="/game"
          className={(isActive) =>
            !isActive.isActive
              ? `${Styles.game} ${Styles.navLink} ${Styles.navLinkNotActive}`
              : `${Styles.game} ${Styles.navLink} ${Styles.navLinkIsActive}`
          }
        >
          <FaGamepad fontSize="40px" />
          2048
        </NavLink>
        <NavLink
          to="/profile"
          className={(isActive) =>
            !isActive.isActive
              ? `${Styles.profile} ${Styles.navLink} ${Styles.navLinkNotActive}`
              : `${Styles.profile} ${Styles.navLink} ${Styles.navLinkIsActive}`
          }
        >
          <FaUser fontSize="40px" />
          Profile
        </NavLink>
      </nav>
    </section>
  );
}
