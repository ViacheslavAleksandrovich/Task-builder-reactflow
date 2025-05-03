import { Handle, Position } from "reactflow";
import { useAppDispatch } from "../store/hooks";
import { updateNodeLabel } from "../store/flowSlice";
import { useState, useEffect } from "react";

interface TaskNodeProps {
  id: string;
  data: {
    label: string;
  };
}

const TaskNode = ({ id, data }: TaskNodeProps) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label);

  useEffect(() => {
    setLabel(data.label);
  }, [data.label]);

  const handleBlur = () => {
    setIsEditing(false);
    if (label !== data.label) {
      dispatch(updateNodeLabel({ id, label }));
    }
  };

  return (
    <div className="p-4 bg-white border border-gray-300 rounded-md shadow-md">
      <Handle type="target" position={Position.Top} className="w-2 h-2 bg-blue-500" />
      {isEditing ? (
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <div
          className="text-center font-medium cursor-pointer"
          onDoubleClick={() => setIsEditing(true)}>
          {label}
        </div>
      )}
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 bg-blue-500" />
    </div>
  );
};

export default TaskNode;
