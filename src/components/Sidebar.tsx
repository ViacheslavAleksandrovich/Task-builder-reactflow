import { useAppDispatch, useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";
import { updateNodeLabel } from "../store/flowSlice";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const selectedNodeId = useAppSelector((state: RootState) => state.flow.selectedNodeId);
  const nodes = useAppSelector((state: RootState) => state.flow.nodes);
  const selectedNode = nodes.find((node) => node.id === selectedNodeId);

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedNodeId) {
      dispatch(updateNodeLabel({ id: selectedNodeId, label: e.target.value }));
    }
  };

  return (
    <div className="w-full md:w-80 bg-gray-100 border-t md:border-t-0 md:border-l border-gray-300 p-4 flex flex-col gap-4">
      <h3 className="text-lg font-bold text-center">Task Controls</h3>
      {selectedNode ? (
        <>
          <label className="font-medium text-gray-700">Edit Task Name:</label>
          <input
            type="text"
            value={selectedNode.data.label}
            onChange={handleLabelChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">
            Save
          </button>
        </>
      ) : (
        <p className="text-center text-gray-500">Select a task to edit</p>
      )}
    </div>
  );
};

export default Sidebar;
