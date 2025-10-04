import React from "react";
import { Handle } from "reactflow";
import styles from "../stylesheets/CustomNode.module.scss";
import { LuMessageCircleMore } from "react-icons/lu";
import { IoLogoWhatsapp } from "react-icons/io";

export default function CustomNode({ data, selected }) {
  return (
    <div className={`${styles.node} ${selected ? styles.selected : ""}`}>
      {/* top header with whatsapp and message icon */}
      <div className={styles.header}>
        <div className={styles.message}>
          <LuMessageCircleMore />
          Send Message
        </div>
        <div className={styles.whatsapp}>
          <IoLogoWhatsapp />
        </div>
      </div>
      {/* label and connection points for left and right */}
      <div className={styles.body}>{data.label}</div>
      <Handle type="source" position="right" id="a" className={styles.handle} />
      <Handle type="target" position="left" id="b" className={styles.handle} />
    </div>
  );
}
