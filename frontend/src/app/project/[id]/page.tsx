"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { DndContext, useDroppable, useDraggable } from "@dnd-kit/core";
import { useEffect, useState } from "react";

/* ---------- Draggable Task ---------- */
function DraggableTask({ task, openEdit, openDelete }: any) {
  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({ id: task._id });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white p-3 mb-2 rounded-lg border border-gray-200 hover:shadow-md transition flex justify-between items-center"
    >
      <span {...listeners} {...attributes} className="flex-1 cursor-grab">
        {task.title}
      </span>

      <button
        onClick={(e) => {
          e.stopPropagation();
          openEdit(task);
        }}
        className="text-blue-500 cursor-pointer text-sm mx-2"
      >
        ✎
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          openDelete(task);
        }}
        className="text-red-500 cursor-pointer text-sm"
      >
        ✕
      </button>
    </div>
  );
}

/* ---------- Column ---------- */
function Column({ status, tasks, openEdit, openDelete }: any) {
  const { setNodeRef } = useDroppable({ id: status });

  return (
    <div
      ref={setNodeRef}
      className="bg-white p-4 rounded-xl shadow-sm border min-h-[250px]"
    >
      <h2 className="font-semibold text-gray-700 mb-3">
        {status === "todo"
          ? "TO DO"
          : status === "inprogress"
          ? "IN PROGRESS"
          : "DONE"}
      </h2>

      {tasks.length === 0 && (
        <p className="text-sm text-gray-400 italic text-center mt-6">
          No tasks yet
        </p>
      )}

      {tasks.map((task: any) => (
        <DraggableTask
          key={task._id}
          task={task}
          openEdit={openEdit}
          openDelete={openDelete}
        />
      ))}
    </div>
  );
}

export default function Board() {
  const { id } = useParams();

  // ✅ AUTH CHECK
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
    } else {
      setChecked(true);
    }
  }, []);

  const { data: tasks = [], refetch, isLoading, isError } = useQuery({
    queryKey: ["tasks", id],
    queryFn: () => api.get(`/tasks/${id}`).then((r) => r.data),
    enabled: checked,
  });

  const columns = ["todo", "inprogress", "done"];

  const [showModal, setShowModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [editingTask, setEditingTask] = useState<any>(null);
  const [deletingTask, setDeletingTask] = useState<any>(null);

  const openCreate = () => {
    setEditingTask(null);
    setTaskTitle("");
    setShowModal(true);
  };

  const openEdit = (task: any) => {
    setEditingTask(task);
    setTaskTitle(task.title);
    setShowModal(true);
  };

  const openDelete = (task: any) => {
    setDeletingTask(task);
  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (!over) return;

    await api.patch(`/tasks/${active.id}`, { status: over.id });
    refetch();
  };

  if (!checked) {
    return (
      <div className="p-6 text-center text-gray-500">
        Checking authentication...
      </div>
    );
  }

  if (isLoading)
    return <div className="p-6 text-center text-gray-500">Loading...</div>;

  if (isError)
    return <div className="p-6 text-center text-red-500">Failed to load</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl text-center font-semibold mb-6">
        Task Board
      </h1>

      <button
        onClick={openCreate}
        className="bg-black text-white cursor-pointer px-3 py-2 mb-4 rounded"
      >
        + Add Task
      </button>

      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((col) => (
            <Column
              key={col}
              status={col}
              tasks={tasks.filter((t: any) => t.status === col)}
              openEdit={openEdit}
              openDelete={openDelete}
            />
          ))}
        </div>
      </DndContext>

      {/* CREATE / EDIT */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              {editingTask ? "Edit Task" : "New Task"}
            </h2>

            <input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="border w-full p-2 rounded mb-4"
              placeholder="Task title"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1 cursor-pointer border rounded"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  if (!taskTitle.trim()) return;

                  if (editingTask) {
                    await api.patch(`/tasks/${editingTask._id}`, {
                      title: taskTitle,
                    });
                  } else {
                    await api.post("/tasks", {
                      title: taskTitle,
                      projectId: id,
                    });
                  }

                  setShowModal(false);
                  refetch();
                }}
                className="bg-blue-600 cursor-pointer text-white px-3 py-1 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE */}
      {deletingTask && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-lg w-80 shadow-lg text-center">
            <p className="mb-4">Delete this task?</p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setDeletingTask(null)}
                className="px-3 py-1 cursor-pointer border rounded"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await api.delete(`/tasks/${deletingTask._id}`);
                  setDeletingTask(null);
                  refetch();
                }}
                className="bg-red-600 text-white cursor-pointer px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}