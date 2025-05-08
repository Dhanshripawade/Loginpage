import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getallPatient,
  savepatient,
  deletePatient,
  updatePatients,
  viewPatient,
} from "../store/authThunk";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Home from "./Sidebar";

function Patient() {
  const dispatch = useDispatch();
  const { patient, patientId, status, error } = useSelector(
    (state) => state.auth
  );

  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

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

  //view
  const [opendata, setopendata] = useState(false);
  const [selecteddata, Setselecteddata] = useState([]);

  useEffect(() => {
    dispatch(getallPatient());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleCreateForm = () => setShowForm(!showForm);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await dispatch(
          updatePatients({ id: editingId, updatedData: formData })
        ).unwrap();
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

  const handleDelete = (id) => {
    if (window.confirm("Are you sure delete Patients")) {
      dispatch(deletePatient(id));
      window.location.reload();
    }
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name || "",
      sex: item.sex || "",
      patienttype: item.patienttype || "",
      dob: item.dob || "",
      address: item.address || "",
      age: item.age || "",
      personal_ph_no: item.personal_ph_no || "",
      password: item.password || "",
    });
    setShowForm(true);
    setIsEditing(true);
    setEditingId(item._id || item.id);
  };

  const handleview = (id) => {
    setopendata(!opendata);
    dispatch(viewPatient(id));
  };

  useEffect(() => {
    if (patientId) {
      Setselecteddata(Array.isArray(patientId) ? patientId : [patientId]);
    }
  }, [patientId]);

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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <form
              onSubmit={handleSubmit}
              className="relative z-50 grid min-w-[700px] grid-cols-1 gap-2 p-6 bg-white rounded-md shadow-md md:grid-cols-2"
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
              <div className="flex justify-end gap-3 mt-4 font-semibold md:col-span-2">
                <button
                  type="submit"
                  className="px-6 py-2 text-white bg-green-600 rounded hover:bg-green-700"
                >
                  {isEditing ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={toggleCreateForm}
                  className="px-6 py-2 text-white bg-gray-600 rounded hover:bg-gray-700"
                  aria-label="Close"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {status === "loading" && <p>Loading...</p>}
        {status === "failed" && <p className="text-red-500">Error: {error}</p>}

        {status === "succeeded" && patient.length > 0 && (
          <table className="min-w-full mt-6 text-sm border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Gender</th>
                <th className="px-4 py-2 border">DOB</th>
                <th className="px-4 py-2 border">Age</th>
                <th className="px-4 py-2 border">Address</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Patient Type</th>
                <th className="px-4 py-2 border">Action</th>
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
                      <FaEye
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => handleview(item._id)}
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
        )}

        {opendata && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
            <div className="p-6 bg-white rounded shadow-lg w-50">
              {Array.isArray(selecteddata) &&
                selecteddata.map((item) => (
                  <div key={item._id}>
                    <h1 className="m-2 text-xl">
                      <b>_id:</b> {item._id}
                    </h1>
                    <h1 className="m-2 text-xl">
                      <b>Name:</b> {item.name}
                    </h1>
                    <h1 className="m-2 text-xl">
                      <b>Gender:</b> {item.sex}
                    </h1>
                    <h1 className="m-2 text-xl">
                      <b>DOB:</b> {item.dob}
                    </h1>
                    +
                    <h1 className="m-2 text-xl">
                      <b>Phone Number:</b> {item.personal_ph_no}
                    </h1>
                    <h1 className="m-2 text-xl">
                      <b>Patienttype:</b> {item.patienttype}
                    </h1>
                    <h1 className="m-2 text-xl">
                      <b>Age:</b> {item.age}
                    </h1>
                    <h1 className="m-2 text-xl">
                      <b>_createdAt:</b> {item.createdAt}
                    </h1>
                    <h1 className="m-2 text-xl">
                      <b>_updatedAt:</b> {item.updatedAt}
                    </h1>
                    <div className="text-center">
                      <button
                        className="w-full px-4 py-2 mt-2 text-white bg-red-600 rounded hover:bg-red-700"
                        onClick={() => setopendata(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        <ToastContainer />
      </div>
    </div>
  );
}

export default Patient;
