"use strict";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import styles from "./button.module.css";

// Define button variants and sizes
const buttonVariants = {
  variant: {
    default: styles.default,
    primary: styles.primary,
    secondary: styles.secondary,
  },
  size: {
    default: styles["size-default"],
    sm: styles["size-sm"],
    lg: styles["size-lg"],
  },
};

const Button = React.forwardRef(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const classes = [
      styles.button,
      styles[variant],
      styles[`size-${size}`],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return <Comp className={classes} ref={ref} {...props} />;
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
