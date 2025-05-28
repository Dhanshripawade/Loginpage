import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getallreception,
  registerReception,
  deleteReception,
  viewReception,
  updateReception,
} from "../store/authThunk";
import Sidebar from "./Sidebar";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Receptionist() {
  const dispatch = useDispatch();
  const { Reception, receptionId } = useSelector((state) => state.auth);

  const [receptionData, setReceptionData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedReception, setSelectedReception] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(getallreception());
  }, [dispatch]);

  useEffect(() => {
    setReceptionData(Reception);
  }, [Reception]);

  useEffect(() => {
    if (receptionId) {
      setSelectedReception(receptionId);
      setShowViewModal(false);
    }
  }, [receptionId]);

  const toggleCreateForm = () => setShowForm(!showForm);

  const [formData, setFormData] = useState({
    rID: "",
    name: "",
    username: "",
    email: "",
    phoneNumber: "",
    gender: "",
    address: "",
    dateOfBirth: "",
    department: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await dispatch(
          updateReception({ id: editingId, updatedData: formData })
        ).unwrap();
        // toast.success("Consultant updated successfully!");
      } else {
        await dispatch(registerReception(formData)).unwrap();
        // toast.success("Consultant created successfully!");
      }

      setFormData({
        rID: "",

        username: "",
        email: "",
        phoneNumber: "",
        gender: "",
        address: "",
        dateOfBirth: "",
        department: "",
      });
      setShowForm(false);
      setIsEditing(false);
      setEditingId(null);
      dispatch(getallreception());
    } catch (err) {
      console.error("Error submitting form:", err);
      // toast.error("Error occurred, please try again!");
    }
    window.location.reload();
  };

  const handleDelete = (id) => {
    window.confirm(
      "Are you sure deAre you sure you want to delete this receptionsits?"
    );
    dispatch(deleteReception(id));
    window.location.reload();
  };

  const handleView = async (rID) => {
    try {
      await dispatch(viewReception(rID)).unwrap();
      setShowViewModal(true);
    } catch (error) {
      console.error("View error:", error);
      toast.error("Failed to load receptionist details.");
    }
  };
  console.log(selectedReception);

  const handleEdit = (item) => {
    setFormData({
      rID: item.rID || "",
      name: item.name || "",
      gender: item.gender || "",
      email: item.email || "",
      dateOfBirth: item.dateOfBirth || "",
      address: item.address || "",

      phoneNumber: item.phoneNumber || "",
      department: item.department || "",
      username: item.username || "",
    });
    setShowForm(true);
    setIsEditing(true);
    setEditingId(item._id || item.id);
  };

  const inputClass = "border w-52 px-3 py-1 rounded-md";

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full p-4">
        <h1 className="mb-4 text-xl font-semibold">Receptionists</h1>

        <div className="flex justify-end">
  <button
    onClick={toggleCreateForm}
    className="flex items-center gap-2 px-6 py-2 mb-5 text-sm font-semibold text-white transition-colors duration-200 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
  >
    {showForm ? "Close" : "Create +"}
  </button>
</div>

        {showForm && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <form
      onSubmit={handleSubmit}
      className="relative z-50 grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-white rounded-md shadow-md min-w-[700px]"
    >
      {[
        "rID",
        "name",
        "username",
        "email",
        "phoneNumber",
        "address",
        "department",
        "password",
      ].map((field) => (
        <input
          key={field}
          type={field === "password" ? "password" : "text"}
          name={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={formData[field]}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      ))}

      <input
        type="date"
        name="dateOfBirth"
        value={formData.dateOfBirth}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="gender"
        list="genders"
        placeholder="Gender"
        value={formData.gender}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <datalist id="genders">
        <option value="Male" />
        <option value="Female" />
        <option value="Other" />
      </datalist>

      {/* Button Row - full width */}
      <div className="flex justify-end gap-4 mt-4 md:col-span-2">
      <button
          type="button"
          onClick={toggleCreateForm}
          className="px-6 py-2 text-white bg-gray-600 rounded hover:bg-gray-700"
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
)}


        <div className="relative mt-4 overflow-x-auto">
          <table className="w-full text-sm text-left border border-gray-300">
            <thead className="text-gray-700 bg-gray-100">
              <tr>
                {[
                  "rID",
                  "Name",
                  "Email",
                  "Phone",
                  "Username",
                  "address",
                  "Gender",
                  "Department",
                  "DOB",
                  "Action",
                ].map((header) => (
                  <th key={header} className="px-4 py-2 border">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {receptionData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{item.rID}</td>
                  <td className="px-4 py-2 border">{item.name}</td>
                  <td className="px-4 py-2 border">{item.email}</td>
                  <td className="px-4 py-2 border">{item.phoneNumber}</td>
                  <td className="px-4 py-2 border">{item.username}</td>
                  <td className="px-4 py-2 border">{item.address}</td>
                  <td className="px-4 py-2 border">{item.gender}</td>
                  <td className="px-4 py-2 border">{item.department}</td>
                  <td className="px-4 py-2 border">{item.dateOfBirth}</td>
                  <td className="px-4 py-2 border">
                    <div className="flex justify-center gap-2">
                      <FaEye
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => handleView(item.rID)}
                      />
                      <button onClick={() => handleEdit(item)} title="Edit">
                        <FaEdit className="text-green-600 hover:text-green-700" />
                      </button>
                      <FaTrash
                        onClick={() => handleDelete(item._id)}
                        className="text-red-500 cursor-pointer"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showViewModal && selectedReception && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
            <div className="relative w-full max-w-md p-6 mx-auto mt-20 bg-white shadow-xl rounded-xl">
              <button
                onClick={() => setShowViewModal(false)}
                className="absolute text-xl font-bold text-red-600 top-3 right-3 hover:text-red-800"
              >
                ×
              </button>

              <h2 className="mb-4 text-2xl font-bold text-gray-800 ">
                Receptionists Details
              </h2>
              <ul className="mb-4 space-y-2 text-sm">
                <li>
                  <strong>id:</strong> {selectedReception._id}
                </li>
                <li>
                  <strong>rID:</strong> {selectedReception.rID}
                </li>
                <li>
                  <strong>Name:</strong> {selectedReception.name}
                </li>
                <li>
                  <strong>Email:</strong> {selectedReception.email}
                </li>
                <li>
                  <strong>Phone:</strong> {selectedReception.phoneNumber}
                </li>
                <li>
                  <strong>Address:</strong> {selectedReception.address}
                </li>
                <li>
                  <strong>Username:</strong> {selectedReception.username}
                </li>
                <li>
                  <strong>Gender:</strong> {selectedReception.gender}
                </li>
                <li>
                  <strong>DOB:</strong> {selectedReception.dateOfBirth}
                </li>
                <li>
                  <strong>Department:</strong> {selectedReception.department}
                </li>
                <li>
                  <strong>password:</strong> {selectedReception.password}
                </li>
                <li>
                  <strong>updatedAt:</strong> {selectedReception.updatedAt}
                </li>
                <li>
                  <strong>createdAt:</strong> {selectedReception.createdAt}
                </li>
              </ul>
             
            </div>
          </div>
        )}

        <ToastContainer />
      </div>
    </div>
  );
}

export default Receptionist;
