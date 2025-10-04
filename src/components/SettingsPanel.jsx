import React, { useEffect, useState } from "react";
import styles from "../stylesheets/Settings.module.scss";

export default function SettingsPanel({ node, onChange, onClose }) {
  const [value, setValue] = useState(node.data.label);

  useEffect(() => {
    setValue(node.data.label);
  }, [node]);

  //keep track of Text for differnt Nodes
  const handleChange = (e) => {
    setValue(e.target.value);
    onChange(node.id, e.target.value);
  };

  return (
    <div className={styles.panel}>
      <button onClick={onClose} className={styles.closeButton}>
        ←
      </button>
      <h3 className={styles.heading}>Message</h3>
      <div className={styles.inputGroup}>
        <label htmlFor="textField" className={styles.label}>
          Text
        </label>
        <textarea
          id="textField"
          value={value}
          onChange={handleChange}
          rows={4}
          className={styles.textarea}
        />
      </div>
    </div>
  );
}
