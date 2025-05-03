import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Node, Edge } from "reactflow";

export interface FlowState {
  nodes: Node[];
  edges: Edge[];
  selectedNodeId: string | null;
  step: number;
  completed: boolean;
}

const initialState: FlowState = {
  nodes: [],
  edges: [],
  selectedNodeId: null,
  step: 0,
  completed: false,
};

const flowSlice = createSlice({
  name: "flow",
  initialState,
  reducers: {
    setNodes(state, action: PayloadAction<Node[]>) {
      state.nodes = action.payload;
    },
    setEdges(state, action: PayloadAction<Edge[]>) {
      state.edges = action.payload;
    },
    addNode(state, action: PayloadAction<Node>) {
      state.nodes.push(action.payload);
    },
    setSelectedNodeId(state, action: PayloadAction<string | null>) {
      state.selectedNodeId = action.payload;
    },
    updateNodeLabel(state, action: PayloadAction<{ id: string; label: string }>) {
      const node = state.nodes.find((n) => n.id === action.payload.id);
      if (node) {
        node.data = { ...node.data, label: action.payload.label };
      }
    },
    setStep(state, action: PayloadAction<number>) {
      state.step = action.payload;
    },
    setCompleted(state, action: PayloadAction<boolean>) {
      state.completed = action.payload;
    },
  },
});

export const {
  setNodes,
  setEdges,
  addNode,
  setSelectedNodeId,
  updateNodeLabel,
  setStep,
  setCompleted,
} = flowSlice.actions;

export default flowSlice.reducer;
