"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
 
  const [checked, setChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [editingProject, setEditingProject] = useState<any>(null);
  const [deletingProject, setDeletingProject] = useState<any>(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
    } else {
      setChecked(true);
    }
  }, []);

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: () => api.get("/projects").then((r) => r.data),
    enabled: checked,
  });

  
  if (!checked) {
    return (
      <div className="p-6 text-center text-gray-500">
        Checking authentication...
      </div>
    );
  }

  const openCreate = () => {
    setEditingProject(null);
    setProjectName("");
    setShowModal(true);
  };

  const openEdit = (project: any) => {
    setEditingProject(project);
    setProjectName(project.name);
    setShowModal(true);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* LOGOUT */}
      <div className="flex justify-end mb-4">
        <button
          onClick={async () => {
            await api.post("/auth/logout");
            localStorage.removeItem("token");
            queryClient.clear();
            window.location.href = "/login";
          }}
          className="text-sm bg-red-500 hover:bg-red-600 cursor-pointer text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>

      <h1 className="text-2xl text-center font-semibold mb-6">
        Your Projects
      </h1>

      {/* NEW PROJECT */}
      <button
        onClick={openCreate}
        className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-4 py-2 rounded-lg mb-4"
      >
        + New Project
      </button>

      {/* LOADING STATE */}
      {isLoading && (
        <div className="text-center text-gray-500">Loading projects...</div>
      )}

      {/* PROJECT LIST */}
      {data?.map((p: any) => (
        <div
          key={p._id}
          className="bg-white p-4 rounded-lg shadow m-5 hover:shadow-md transition flex justify-between"
        >
          <Link href={`/project/${p._id}`} className="flex-1">
            {p.name}
          </Link>

          <div className="flex gap-2">
            <button
              onClick={() => openEdit(p)}
              className="text-blue-500 cursor-pointer text-sm"
            >
              Edit
            </button>

            <button
              onClick={() => setDeletingProject(p)}
              className="text-red-500 cursor-pointer text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/*  EDIT  */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              {editingProject ? "Edit Project" : "New Project"}
            </h2>

            <input
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="border w-full p-2 rounded mb-4"
              placeholder="Project name"
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
                  if (!projectName.trim()) return;

                  if (editingProject) {
                    await api.patch(`/projects/${editingProject._id}`, {
                      name: projectName,
                    });
                  } else {
                    await api.post("/projects", { name: projectName });
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

      {/* DELETE  */}
      {deletingProject && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-lg w-80 shadow-lg text-center">
            <p className="mb-4">Delete this project?</p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setDeletingProject(null)}
                className="px-3 py-1 border cursor-pointer rounded"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await api.delete(`/projects/${deletingProject._id}`);
                  setDeletingProject(null);
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