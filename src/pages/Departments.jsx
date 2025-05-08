import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Home from "./Sidebar";
import {
  deleteDepartment,
  getallDepartment,
  registerDepartment,
  updateDepartment,
  viewDepartment,
} from "../store/authThunk";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Departments() {
  const dispatch = useDispatch();
  const { department, departmentdIN } = useSelector((state) => state.auth);
  const [departmentData, setDepartmentData] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    dIN: "",
    name: "",
    description: "",
  });

  useEffect(() => {
    dispatch(getallDepartment());
  }, [dispatch]);

  useEffect(() => {
    setDepartmentData(department);
  }, [department]);

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await dispatch(registerDepartment(formData)).unwrap();
  //     toast.success("Department created successfully!");
  //     setFormData({ dIN: "", name: "", description: "" });
  //     setShowForm(false);
  //     dispatch(getallDepartment());
  //   } catch (error) {
  //     toast.error("Failed to create department.");
  //   }
  //   window.location.reload();
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await dispatch(
          updateDepartment({ id: editingId, updatedData: formData })
        ).unwrap();
        toast.success("Consultant updated successfully!");
      } else {
        await dispatch(registerDepartment(formData)).unwrap();
        toast.success("Consultant created successfully!");
      }

      setFormData({
        dIN: "",
        name: "",
        description: "",
      });
      setShowForm(false);
      setIsEditing(false);
      setEditingId(null);
      dispatch(getallDepartment());
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error("Error occurred, please try again!");
    }
  };

  //delete
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this department?"
    );
    if (confirmed) {
      try {
        await dispatch(deleteDepartment(id)).unwrap();
        toast.success("Department deleted successfully!");
        dispatch(getallDepartment());
      } catch (error) {
        toast.error("Failed to delete department.");
      }
    }
    window.location.reload();
  };
  //view
  const [showViewModal, setShowViewModal] = useState(false);
  const [alldepartment, setAlldepartment] = useState([]);
  const handleView = async (dIN) => {
    try {
      await dispatch(viewDepartment(dIN)).unwrap();
      setShowViewModal(true);
    } catch (error) {
      console.error("View error:", error);
      toast.error("Failed to load receptionist details.");
    }
  };

  useEffect(() => {
    if (departmentdIN) {
      setAlldepartment(departmentdIN[0]);
      setShowViewModal(false);
    }
  }, [departmentdIN]);
  console.log(departmentdIN);

  //update
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const handleEdit = (item) => {
    setFormData({
      dIN: item.dIN || "",
      name: item.name || "",
      description: item.description || "",
    });
    setShowForm(true);
    setIsEditing(true);
    setEditingId(item._id || item.id);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <div>
        <Home />
      </div>
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">Departments</h1>
          <button
            onClick={toggleForm}
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            {showForm ? "Close" : "Create +"}
          </button>
        </div>

        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
            <div className="relative p-6 bg-white rounded shadow-lg min-w-[700px]">
              <button
                onClick={toggleForm}
                className="absolute text-2xl font-bold text-gray-500 top-2 right-2 hover:text-red-600"
                aria-label="Close"
              >
                &times;
              </button>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  name="dIN"
                  placeholder="Department ID"
                  value={formData.dIN}
                  onChange={handleInputChange}
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="p-2 border rounded"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="w-full text-sm text-left table-auto">
            <thead className="text-gray-700 bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {departmentData?.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{item.dIN}</td>
                  <td className="px-4 py-2 border">{item.name}</td>
                  <td className="px-4 py-2 border">{item.description}</td>
                  <td className="px-4 py-2 border">
                    <div className="flex justify-center gap-3">
                      <FaEye
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => handleView(item.dIN)}
                      />
                      <button onClick={() => handleEdit(item)} title="Edit">
                        <FaEdit className="text-green-600 hover:text-green-700" />
                      </button>
                      <FaTrash
                        onClick={() => handleDelete(item._id)}
                        className="text-red-500 cursor-pointer hover:text-red-700"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showViewModal && alldepartment && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
            <div className="p-6 bg-white rounded shadow-lg w-50">
              <h2 className="mb-4 text-xl font-semibold text-center">
                Receptionist Details
              </h2>
              <ul className="mb-4 space-y-2 text-sm">
              <li>
                  <strong>dIN:</strong> {alldepartment.dIN}
                </li>
                <li>
                  <strong>_id:</strong> {alldepartment._id}
                </li>
                <li>
                  <strong>name:</strong> {alldepartment.name}
                </li>
                <li>
                  <strong>Description:</strong> {alldepartment.description}
                </li>
               
                <li>
                  <strong>_createdAt:</strong> {alldepartment.createdAt}
                </li>
                <li>
                  <strong>_updatedAt:</strong> {alldepartment.updatedAt}
                </li>
              </ul>
              <button
                onClick={() => setShowViewModal(false)}
                className="w-full px-4 py-2 mt-2 text-white bg-red-600 rounded hover:bg-red-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Departments;
