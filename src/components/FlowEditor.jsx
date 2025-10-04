import React, { useState, useCallback, useRef } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import NodePanel from "./NodePanel";
import SettingsPanel from "./SettingsPanel";
import CustomNode from "./CustomNode";
import styles from "../stylesheets/FlowEditor.module.scss";

const nodeTypes = { custom: CustomNode };
const initialNodes = [];
const initialEdges = [];

function FlowEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [error, setError] = useState("");

  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onInit = useCallback((instance) => {
    setReactFlowInstance(instance);
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      if (!reactFlowWrapper.current || !reactFlowInstance) return;

      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      if (!type) return;

      // Project client coordinates to canvas coordinates
      const position = reactFlowInstance.project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const newNode = {
        id: (Math.random() * 100000).toFixed(0),
        type,
        position,
        data: { label: "textNode", text: "" },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const handleDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const onConnect = useCallback(
    (params) => {
      const existingEdge = edges.find(
        (e) =>
          e.source === params.source && e.sourceHandle === params.sourceHandle
      );
      if (existingEdge) {
        // Optionally alert user or ignore new connection
        return;
      }

      setEdges((eds) =>
        addEdge(
          {
            ...params,
            markerEnd: { type: MarkerType.ArrowClosed },
          },
          eds
        )
      );
    },
    [edges, setEdges]
  );

  const onNodeClick = (_event, node) => setSelectedNode(node);

  //Save the chnages and throw error if dont match the requirement
  const handleSave = () => {
    const hasOrphaned = nodes.filter(
      (node) => !edges.some((e) => e.target === node.id)
    );
    if (nodes.length > 1 && hasOrphaned.length > 1) {
      setError("Cannot save Flow");
    } else {
      setError("");
      alert("Flow saved! (Further action here)");
    }
  };

  //Text change fucntion to update the text for Node
  const handleNodeTextChange = (id, text) => {
    setNodes((nds) =>
      nds.map((n) =>
        n.id === id ? { ...n, data: { ...n.data, label: text } } : n
      )
    );
  };
  const onNodesChangeWrapper = useCallback(
    (changes) => {
      onNodesChange(changes);
      setError("");
    },
    [onNodesChange, setError]
  );

  const onEdgesChangeWrapper = useCallback(
    (changes) => {
      onEdgesChange(changes);
      setError("");
    },
    [onEdgesChange, setError]
  );
  return (
    <div className={styles.flowRoot}>
      {/* Top bar */}
      <div className={styles.topBar}>
        <button className={styles.saveButton} onClick={handleSave}>
          Save Changes
        </button>
      </div>
      {error && (
        <div className={styles.errorContainer}>
          <div className={styles.errorBox}>{error}</div>
        </div>
      )}

      <div className={styles.mainContent}>
        {/* ReactFlow area */}
        <div
          className={styles.flowArea}
          ref={reactFlowWrapper}
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <ReactFlowProvider>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              onNodesChange={onNodesChangeWrapper}
              onEdgesChange={onEdgesChangeWrapper}
              onConnect={onConnect}
              fitView
              onNodeClick={onNodeClick}
              onInit={onInit}
              style={{ width: "100%", height: "100%", background: "#fafafa" }}
            />
          </ReactFlowProvider>
        </div>
        {/* Sidebar: NodePanel or SettingsPanel */}
        <div className={styles.sidebar}>
          {selectedNode ? (
            <SettingsPanel
              node={selectedNode}
              onChange={handleNodeTextChange}
              onClose={() => setSelectedNode(null)}
            />
          ) : (
            <NodePanel onDragStart={handleDragStart} />
          )}
        </div>
      </div>
    </div>
  );
}

export default FlowEditor;
