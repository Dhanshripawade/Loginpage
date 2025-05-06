import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getallPatient, savepatient , deletePatient, updatePatients} from "../store/authThunk";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye,FaEdit, FaTrash } from "react-icons/fa";

import Home from "./Sidebar";

function Patient() {
  const dispatch = useDispatch();
  const { patient, status, error } = useSelector((state) => state.auth);
  const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(getallPatient());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    name: "",
    sex: "",
    dob: "",
    address: "",
    personal_ph_no: "",
    patienttype: "",
 
    password: "",
    age: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const toggleCreateForm = () => setShowForm(!showForm);
   const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          if (isEditing) {
            await dispatch(updatePatients({ id: editingId, updatedData: formData })).unwrap();
            toast.success("Consultant updated successfully!");
          } else {
            await dispatch(savepatient(formData)).unwrap();
            toast.success("Consultant created successfully!");
          }
    
          setFormData({
            name: "",
                  sex: "",
                  dob: "",
                  address: "",
                  personal_ph_no: "",
                  patienttype: "",
                  age: "",
                  password: "",
            
          });
          setShowForm(false);
          setIsEditing(false);
          setEditingId(null);
          dispatch(getallPatient());
        } catch (err) {
          console.error("Error submitting form:", err);
          toast.error("Error occurred, please try again!");
        }
      };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await dispatch(savepatient(formData)).unwrap();
  //     toast.success("Patient registered successfully!");
  //     setFormData({
  //       name: "",
  //       sex: "",
  //       dob: "",
  //       address: "",
  //       personal_ph_no: "",
  //       patienttype: "",
  //       age: "",
  //       username: "",
  //       password: "",
  //     });
  //     setShowForm(false);
  //     dispatch(getallPatient());
  //   } catch (err) {
  //     console.error("Error:", err);
  //     toast.error("Failed to register patient.");
  //   }
  //   window.location.reload();
  // };
  const handleDelete = (id) => {
      window.confirm("Are you sure delete Patients")
      dispatch(deletePatient(id));
      window.location.reload();
    };
    const handleEdit = (item) => {
      setFormData({
     
       name :item.name || "",
        sex: item.sex || "",
        patienttype : item.patienttype || "",
        dob: item.dob || "",
        address : item.address || "",
        age : item.age || "",
        personal_ph_no: item.personal_ph_no || "",
        
      });
      setShowForm(true);
      setIsEditing(true);
      setEditingId(item._id || item.id);
    };
    

  return (
    <div className="flex">
      <Home />

      <div className="relative w-full p-6">
        <h1 className="mb-4 text-2xl">Patients</h1>

        <div className="text-end">
          <button
            onClick={toggleCreateForm}
            className="py-2 mb-5 text-white bg-blue-600 rounded-md px-7"
          >
            {showForm ? "Close" : "Create +"}
          </button>
        </div>

        {showForm && (
          <div className="absolute z-10 grid grid-cols-1 gap-4 p-4 mb-6 rounded-md shadow md:grid-cols-2 right-10">
            <div className="relative p-6 bg-gray-300">
              <h2 className="mb-4 text-xl font-semibold text-center">
                Register
              </h2>
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 gap-4 md:grid-cols-2"
              >
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="p-2 border rounded"
                />
                <select
                  name="sex"
                  value={formData.sex}
                  onChange={handleChange}
                  className="p-2 border rounded"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Age"
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Address"
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  name="personal_ph_no"
                  value={formData.personal_ph_no}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  name="patienttype"
                  value={formData.patienttype}
                  onChange={handleChange}
                  placeholder="Patient Type"
                  className="p-2 border rounded"
                />

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="p-2 border rounded"
                />
                <div className="col-span-2 text-end">
                  <button
                    type="submit"
                    className="px-6 py-2 text-white bg-green-600 rounded hover:bg-green-700"
                  >
                    {isEditing ? "Update" : " Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {status === "loading" && <p>Loading...</p>}
        {status === "failed" && <p className="text-red-500">Error: {error}</p>}

        {status === "succeeded" && patient.length > 0 && (
          <table className="min-w-full mt-6 text-sm border border-gray-300 ">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Gender</th>
                <th className="px-4 py-2 border">DOB</th>
                <th className="px-4 py-2 border">Age</th>
                <th className="px-4 py-2 border">Address</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Patient Type</th>
                <th className="px-4 py-2 border">Action </th>

              </tr>
            </thead>
            <tbody>
              {patient.map((item) => (
                <tr key={item._id} className="text-center">
                  <td className="px-4 py-2 border">{item.name}</td>
                  <td className="px-4 py-2 border">{item.sex}</td>
                  <td className="px-4 py-2 border">{item.dob}</td>
                  <td className="px-4 py-2 border">{item.age}</td>
                  <td className="px-4 py-2 border">{item.address}</td>
                  <td className="px-4 py-2 border">{item.personal_ph_no}</td>
                  <td className="px-4 py-2 border">{item.patienttype}</td>
                  <td className="px-4 py-2 border">
                    <div className="flex justify-center gap-2">
                      <FaEye className="text-blue-600 hover:text-blue-800" />
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
        )}

        <ToastContainer />
      </div>
    </div>
  );
}

export default Patient;
