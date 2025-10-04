import React from "react";
import styles from "../stylesheets/NodePanel.module.scss";

const NODE_TYPES = [
  {
    type: "custom",
    icon: "💬",
    label: "Message",
    description: "Add a text/message node to your flow.",
  },
  // Future types: { type: "decision", icon: "🔀", label: "Decision" }
];

export default function NodePanel({ onDragStart }) {
  return (
    <aside className={styles.panel}>
      <div className={styles.palette}>
        {NODE_TYPES.map((node) => (
          <div
            key={node.type}
            className={styles.tile}
            draggable
            onDragStart={(event) => onDragStart(event, node.type)}
            title={node.description}
          >
            <span className={styles.icon}>{node.icon}</span>
            <span className={styles.label}>{node.label}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
