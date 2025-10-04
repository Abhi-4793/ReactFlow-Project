import React, { useEffect, useState } from "react";
import styles from "../stylesheets/Settings.module.scss";
import { IoMdArrowRoundBack } from "react-icons/io";
export default function SettingsPanel({ node, onChange, onClose }) {
  const [value, setValue] = useState(node.data.label);

  useEffect(() => {
    setValue(node.data.label);
  }, [node]);

  const handleChange = (e) => {
    setValue(e.target.value);
    onChange(node.id, e.target.value);
  };

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <button onClick={onClose} className={styles.closeButton}>
          <IoMdArrowRoundBack />
        </button>
        <span className={styles.heading}>Message</span>
      </div>
      <div className={styles.body}>
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
      <div className={styles.textareaSeparator}></div>
    </div>
  );
}
