import React from "react";
import FlowEditor from "./components/FlowEditor";

export default function App() {
  return (
    <div
      style={{
        height: "100vh",
        background: "#181818",
        color: "white",
        fontFamily: "Inter",
      }}
    >
      <FlowEditor />
    </div>
  );
}
