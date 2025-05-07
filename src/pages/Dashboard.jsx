import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerDoctor } from "../store/consultant/consultantThunk";
import { deleteDoctor,updateDoctor ,getConsltantData , viewDoctor} from "../store/authThunk";
import Home from "./Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

function Dashboard() {
  const dispatch = useDispatch();

  const { consultant } = useSelector((state) => state.auth);
  const [consultantdata, setconsultantdata] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);


  const toggleForm = () => setShowForm((prev) => !prev);

  useEffect(() => {
    dispatch(getConsltantData());
  }, [dispatch]);

  useEffect(() => {
    setconsultantdata(consultant);
    setShowModal(false);
  }, [consultant]);

   

  const [formData, setFormData] = useState({
    cIN: "",
    name: "",
    gender: "",
    email: "",
    dateOfBirth: "",
    specialization: "",
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
        await dispatch(updateDoctor({ id: editingId, updatedData: formData })).unwrap();
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
        specialization: "",
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
      await dispatch(viewDoctor(cIN)).unwrap();
      setShowViewModal(true);
    } catch (error) {
      console.error("View error:", error);
      toast.error("Failed to load receptionist details.");
    }
  };


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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this consultant?")) {
      try {
        await dispatch(deleteDoctor(id)).unwrap();
        toast.success("Consultant deleted successfully!");
        dispatch(getConsultantData());
      } catch (err) {
        toast.error("Error deleting consultant.");
        console.error("Delete error:", err);
      }
    }
    window.location.reload();
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="">
        <Home />
      </div>

      <main className="flex-1 p-6 overflow-auto">
        <h1 className="mb-4 text-xl font-semibold">Consultants</h1>
        
        <div className="mb-4 text-end">
          <button
            onClick={toggleForm}
            className="px-2 py-2 text-white transition duration-200 bg-blue-600 rounded-md hover:bg-blue-700"
          >
            {showForm ? "Close" : "Create +"}
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="absolute right-0 z-10 grid grid-cols-1 gap-4 p-4 mb-6 ml-5 bg-gray-300 rounded-md shadow md:grid-cols-2 text-end"
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
              { name: "medicalLicenseNumber", placeholder: "Medical License No.", type: "number" },
              { name: "dateOfBirth", placeholder: "DOB", type: "date" },
              { name: "qualifications", placeholder: "Qualification" },
              { name: "yearsOfExperience", placeholder: "Years of Experience", type: "number" },
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
            <button
              type="submit"
              className="w-full col-span-1 px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700 md:col-span-2"
            >
              {isEditing ? "Update" : "Create"}
            </button>
          </form>
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
              {consultant?.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{item.cIN}</td>
                  <td className="px-4 py-2 border">{item.name}</td>
                  <td className="px-4 py-2 border">{item.gender}</td>
                  <td className="px-4 py-2 border">{item.dateOfBirth}</td>
                  <td className="px-4 py-2 border">{item.specialty}</td>
                  <td className="px-4 py-2 border">{item.qualifications}</td>
                  <td className="px-4 py-2 border">{item.medicalLicenseNumber}</td>
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
                      <button onClick={() => handleDelete(item._id || item.id)} title="Delete">
                        <FaTrash className="text-red-600 hover:text-red-700" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {consultant?.length === 0 && (
                <tr>
                  <td colSpan="11" className="px-4 py-2 text-center border">
                    No consultant data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <ToastContainer />

        {showModal && showViewModal && (
          <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative p-6 bg-white rounded shadow-lg w-100">
              <h2 className="mb-2 text-lg font-bold text-center">Consultant Details</h2>
              <ul className="space-y-1 text-sm">
                {Object.entries(consultantdata).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
              </ul>
              <button
                className="absolute text-gray-600 top-2 right-2 hover:text-black"
                onClick={() => setShowModal(false)}
              >
                ✖
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
