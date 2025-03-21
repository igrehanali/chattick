import React from "react";
import styles from "../styles/dashboard.module.css";

export function MetricCard({ name, value, change, trend, icon: Icon }) {
  return (
    <div className={styles["metric-card"]}>
      <div className={styles["metric-card__header"]}>
        <div className={styles["metric-card__title"]}>{name}</div>
        <Icon className={styles["metric-card__icon"]} />
      </div>
      <div className={styles["metric-card__content"]}>
        <div className={styles["metric-card__value"]}>{value}</div>
        <div className={`${styles["metric-card__change"]} ${styles[`metric-card__change--${trend}`]}`}>
          {change}
        </div>
      </div>
    </div>
  );
}