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
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);

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
  const handleDelete = (id) => {
    setSelectedDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await dispatch(deleteDepartment(selectedDeleteId)).unwrap();
      toast.success("Department deleted successfully!");
      dispatch(getallDepartment());
    } catch (err) {
      toast.error("Failed to delete department.");
    } finally {
      setShowDeleteConfirm(false);
      setSelectedDeleteId(null);
    }
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
          <div className="flex justify-end mt-10">
            <button
              onClick={toggleForm}
              className="flex items-center gap-2 px-6 py-2 text-sm font-semibold text-white transition-colors duration-200 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              {showForm ? "Close" : "Create +"}
            </button>
          </div>
        </div>

        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
            <div className="relative p-6 bg-white rounded shadow-lg min-w-[700px]">
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
                <div className="flex justify-end gap-3 mt-4 font-semibold md:col-span-2">
                  <button
                    type="button"
                    onClick={toggleForm}
                    className="px-6 py-2 text-white bg-gray-600 rounded hover:bg-gray-700"
                    aria-label="Close"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 text-white bg-green-600 rounded hover:bg-green-700"
                  >
                    {isEditing ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* table */}
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="w-full text-sm text-left table-auto">
            <thead className="text-gray-700 bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">DIN</th>
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

        {/* delete */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="p-6 bg-white rounded shadow-lg min-w-[350px]">
              <h2 className="mb-4 text-lg font-semibold text-center">
                Are you sure you want to delete this department?
              </h2>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* //view */}
        {showViewModal && alldepartment && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
            <div className="relative w-full max-w-md p-6 mx-auto mt-20 bg-white shadow-xl rounded-xl">
              <button
                onClick={() => setShowViewModal(false)}
                className="absolute text-xl font-bold text-red-600 top-3 right-3 hover:text-red-800"
              >
                ×
              </button>

              <h2 className="mb-4 text-2xl font-bold text-gray-800 ">
                Department Details
              </h2>
              <ul className="mb-4 space-y-2 text-sm">
                <li>
                  <strong>DIN:</strong> {alldepartment.dIN}
                </li>
                <li>
                  <strong>id:</strong> {alldepartment._id}
                </li>

                <li>
                  <strong>Description:</strong> {alldepartment.description}
                </li>

                <li>
                  <strong>CreatedAt:</strong> {alldepartment.createdAt}
                </li>
                <li>
                  <strong>UpdatedAt:</strong> {alldepartment.updatedAt}
                </li>
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Departments;
