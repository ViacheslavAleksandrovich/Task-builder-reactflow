import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  OnNodesChange,
  OnEdgesChange,
  applyNodeChanges,
  applyEdgeChanges,
  Connection,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import { setNodes, setEdges, setSelectedNodeId } from "../store/flowSlice";
import TaskNode from "./TaskNode";
import { RootState } from "../store/store";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const nodeTypes = {
  taskNode: TaskNode,
};

const FlowCanvas = () => {
  const dispatch = useAppDispatch();
  const nodes = useAppSelector((state: RootState) => state.flow.nodes);
  const edges = useAppSelector((state: RootState) => state.flow.edges);

  const onNodesChange: OnNodesChange = (changes) => {
    const updatedNodes = applyNodeChanges(changes, nodes);
    dispatch(setNodes(updatedNodes));
  };

  const onEdgesChange: OnEdgesChange = (changes) => {
    const updatedEdges = applyEdgeChanges(changes, edges);
    dispatch(setEdges(updatedEdges));
  };

  const onConnect = (connection: Connection) => {
    const updatedEdges = addEdge(connection, edges);
    dispatch(setEdges(updatedEdges));
  };

  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    dispatch(setSelectedNodeId(node.id));
  };

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        fitView
        nodeTypes={nodeTypes}>
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

export default FlowCanvas;
