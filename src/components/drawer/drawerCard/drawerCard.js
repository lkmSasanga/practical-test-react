import React from "react";

import classes from "./drawerCard.module.css";

const DrawerCard = props => {
  return (
    <div className={`${classes.card} ${props.className}`}>{props.children}</div>
  );
};

export default DrawerCard;
