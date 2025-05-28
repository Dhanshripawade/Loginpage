import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerDoctor } from "../store/consultant/consultantThunk";
import {
  deleteDoctor,
  updateDoctor,
  getConsltantData,
  viewDoctor,
} from "../store/authThunk";
import Home from "./Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

function Consultant() {
  const dispatch = useDispatch();

  const { consultant, consultantId } = useSelector((state) => state.auth);
  const [consultantAllData, setconsultantAllData] = useState(null);
  const [consultantdata, setconsultantdata] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  //delete dialog
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);

  const toggleForm = () => setShowForm(!showForm);

  useEffect(() => {
    dispatch(getConsltantData());
  }, [dispatch]);

  useEffect(() => {
    setconsultantAllData(consultant);
  }, [consultant]);

  const [formData, setFormData] = useState({
    cIN: "",
    name: "",
    gender: "",
    email: "",
    dateOfBirth: "",

    specialty: "",
    qualifications: "",
    medicalLicenseNumber: "",
    phoneNumber: "",
    yearsOfExperience: "",
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await dispatch(
          updateDoctor({ id: editingId, updatedData: formData })
        ).unwrap();
        toast.success("Consultant updated successfully!");
      } else {
        await dispatch(registerDoctor(formData)).unwrap();
        toast.success("Consultant created successfully!");
      }

      setFormData({
        cIN: "",
        name: "",
        gender: "",
        email: "",
        dateOfBirth: "",
        specialty: "",
        qualifications: "",
        medicalLicenseNumber: "",
        phoneNumber: "",
        yearsOfExperience: "",
        username: "",
        password: "",
      });
      setShowForm(false);
      setIsEditing(false);
      setEditingId(null);
      dispatch(getConsltantData());
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error("Error occurred, please try again!");
    }
  };

  const handleView = async (cIN) => {
    try {
      const result = await dispatch(viewDoctor(cIN)).unwrap();
      setconsultantdata(result);
      setShowViewModal(true);
    } catch (error) {
      console.error("View error:", error);
      toast.error("Failed to load consultant details.");
    }
  };

  useEffect(() => {
    if (consultantId) {
      setconsultantdata(consultantId);
    }
  }, [consultantId]);

  console.log(consultantId);

  const handleEdit = (item) => {
    setFormData({
      cIN: item.cIN || "",
      name: item.name || "",
      gender: item.gender || "",
      email: item.email || "",
      dateOfBirth: item.dateOfBirth || "",
      specialty: item.specialty || "",
      qualifications: item.qualifications || "",
      medicalLicenseNumber: item.medicalLicenseNumber || "",
      phoneNumber: item.phoneNumber || "",
      yearsOfExperience: item.yearsOfExperience || "",
      username: item.username || "",
      password: "",
    });
    setShowForm(true);
    setIsEditing(true);
    setEditingId(item._id || item.id);
  };

  const handleDelete = (id) => {
    setSelectedDeleteId(id);
    setShowDeleteConfirm(true);
  };
  //dialog delete
  const confirmDelete = async () => {
    try {
      await dispatch(deleteDoctor(selectedDeleteId)).unwrap();
      toast.success("Consultant deleted successfully!");
      dispatch(getConsltantData());
    } catch (err) {
      toast.error("Failed to delete consultant.");
    } finally {
      setShowDeleteConfirm(false);
      setSelectedDeleteId(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="">
        <Home />
      </div>

      <main className="flex-1 p-6 overflow-auto">
        <h1 className="mb-4 text-xl font-semibold">Consultants</h1>

        <div className="flex justify-end">
          <button
            onClick={toggleForm}
            className="flex items-center gap-2 px-6 py-2 mb-5 text-sm font-semibold text-white transition-colors duration-200 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            {showForm ? "Close" : "Create +"}
          </button>
        </div>

        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <form
              onSubmit={handleSubmit}
              className="relative grid min-w-[700px] grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-lg md:grid-cols-2"
            >
              {[
                { name: "cIN", placeholder: "CIN" },
                { name: "name", placeholder: "Name" },
                { name: "username", placeholder: "Username" },
                { name: "password", placeholder: "Password", type: "password" },
                { name: "email", placeholder: "Email", type: "email" },
                { name: "specialty", placeholder: "Specialty" },
                { name: "phoneNumber", placeholder: "Phone Number" },
                { name: "gender", placeholder: "Gender" },
                {
                  name: "medicalLicenseNumber",
                  placeholder: "Medical License No.",
                  type: "number",
                },
                { name: "dateOfBirth", placeholder: "DOB", type: "date" },
                { name: "qualifications", placeholder: "Qualification" },
                {
                  name: "yearsOfExperience",
                  placeholder: "Years of Experience",
                  type: "number",
                },
              ].map(({ name, placeholder, type = "text" }) => (
                <input
                  key={name}
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  value={formData[name]}
                  className="p-2 border rounded"
                  onChange={handleInputChange}
                />
              ))}

              <div className="flex justify-end gap-3 mt-4 font-semibold md:col-span-2">
                <button
                  type="button"
                  onClick={toggleForm}
                  className="px-6 py-2 text-white bg-gray-600 rounded-lg hover:bg-gray-700"
                  aria-label="Close"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
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
                  "CIN",
                  "Name",
                  "Gender",
                  "DOB",
                  "Specialty",
                  "Qualifications",
                  "License No.",
                  "Experience (Years)",
                  "Contact",
                  "Username",
                  "Actions",
                ].map((header) => (
                  <th key={header} className="px-4 py-2 border">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {consultantAllData?.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{item.cIN}</td>
                  <td className="px-4 py-2 border">{item.name}</td>
                  <td className="px-4 py-2 border">{item.gender}</td>
                  <td className="px-4 py-2 border">{item.dateOfBirth}</td>
                  <td className="px-4 py-2 border">{item.specialty}</td>
                  <td className="px-4 py-2 border">{item.qualifications}</td>
                  <td className="px-4 py-2 border">
                    {item.medicalLicenseNumber}
                  </td>
                  <td className="px-4 py-2 border">{item.yearsOfExperience}</td>
                  <td className="px-4 py-2 border">
                    {item.email}
                    <span className="flex">{item.phoneNumber}</span>
                  </td>
                  <td className="px-4 py-2 border">{item.username}</td>
                  <td className="px-4 py-2 border">
                    <div className="flex justify-center gap-2">
                      <FaEye
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => handleView(item.cIN)}
                      />
                      <button onClick={() => handleEdit(item)} title="Edit">
                        <FaEdit className="text-green-600 hover:text-green-700" />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id || item.id)}
                        title="Delete"
                      >
                        <FaTrash className="text-red-600 hover:text-red-700" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showDeleteConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-5">
            <div className="p-6 bg-white rounded shadow-lg min-w-[350px]">
              <h2 className="mb-4 text-lg font-semibold text-center">
                Are you sure you want to delete this consultant?
              </h2>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-6 py-2 text-white bg-gray-600 rounded-lg hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-6 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {showViewModal && consultantdata && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
            <div className="relative w-full max-w-md p-6 mx-auto mt-20 bg-white shadow-xl rounded-xl">
              <button
                onClick={() => setShowViewModal(false)}
                className="absolute text-xl font-bold text-red-600 top-3 right-3 hover:text-red-800"
              >
                ×
              </button>

              <h2 className="mb-4 text-2xl font-bold text-gray-800 ">
                Consultant Details
              </h2>
              <ul className="mb-4 space-y-2 text-sm">
                <li>
                  <strong>cIN:</strong> {consultantdata[0].cIN}
                </li>
                <li>
                  <strong>Name:</strong> {consultantdata[0].name}
                </li>
                <li>
                  <strong>Gender:</strong> {consultantdata[0].gender}
                </li>
                <li>
                  <strong>Email:</strong> {consultantdata[0].email}
                </li>
                <li>
                  <strong>DOB:</strong> {consultantdata[0].dateOfBirth}
                </li>

                <li>
                  <strong>Specialty:</strong> {consultantdata[0].specialty}
                </li>
                <li>
                  <strong>Qualification:</strong>{" "}
                  {consultantdata[0].qualifications}
                </li>
                <li>
                  <strong>Medical Licence No:</strong>{" "}
                  {consultantdata[0].medicalLicenseNumber}
                </li>
                <li>
                  <strong>Phone:</strong> {consultantdata[0].phoneNumber}
                </li>
                <li>
                  <strong>Experience (Years):</strong>{" "}
                  {consultantdata[0].yearsOfExperience}
                </li>
                <li>
                  <strong>Username:</strong> {consultantdata[0].username}
                </li>

                <li>
                  <strong>Updated At:</strong> {consultantdata[0].updatedAt}
                </li>
                <li>
                  <strong>Created At:</strong> {consultantdata[0].createdAt}
                </li>
              </ul>
            </div>
          </div>
        )}

        <ToastContainer />
      </main>
    </div>
  );
}

export default Consultant;
