import FlowCanvas from "./components/FlowCanvas";
import Sidebar from "./components/Sidebar";
import { addNode } from "./store/flowSlice";
import { useAppDispatch, useAppSelector } from "./store/hooks";

function App() {
  const dispatch = useAppDispatch();
  const selectedNodeId = useAppSelector((state) => state.flow.selectedNodeId);

  const handleAddTask = () => {
    const newNode = {
      id: `node-${Date.now()}`,
      position: { x: Math.random() * 250, y: Math.random() * 250 },
      data: { label: "New Task" },
      type: "default",
    };
    dispatch(addNode(newNode));
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="flex-1 flex flex-col">
        <button
          onClick={handleAddTask}
          className="m-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition self-start">
          Add Task
        </button>
        <FlowCanvas />
      </div>
      {selectedNodeId && (
        <div className="md:w-80 w-full">
          <Sidebar />
        </div>
      )}
    </div>
  );
}

export default App;
