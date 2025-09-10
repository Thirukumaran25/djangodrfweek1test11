import React, { useState, useEffect } from 'react';
import api from '../api';

const CreateCourse = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [instructorId, setInstructorId] = useState('');
  const [instructors, setInstructors] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [showAddInstructor, setShowAddInstructor] = useState(false);
  const [newInstructor, setNewInstructor] = useState({
    name: '',
    email: '',
    bio: '',
  });

  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = () => {
    api.get('instructors/')
      .then(res => setInstructors(res.data))
      .catch(err => console.error('Error fetching instructors:', err));
  };

  const handleCourseSubmit = (e) => {
    e.preventDefault();

    const newCourse = {
      title,
      description,
      start_date: startDate,
      end_date: endDate,
      is_active: true,
      instructor_id: instructorId,
    };

    api.post('courses/', newCourse)
      .then(() => {
        setSuccessMessage('✅ Course created successfully!');
        setTitle('');
        setDescription('');
        setStartDate('');
        setEndDate('');
        setInstructorId('');
      })
      .catch(err => console.error('Error creating course:', err));
  };

  const handleAddInstructor = (e) => {
    e.preventDefault();

    api.post('instructors/', newInstructor)
      .then(res => {
        setSuccessMessage('✅ Instructor added!');
        setNewInstructor({ name: '', email: '', bio: '' });
        setShowAddInstructor(false);
        fetchInstructors();
        setInstructorId(res.data.id);
      })
      .catch(err => {
        console.error('Error adding instructor:', err);
        alert("Failed to add instructor. Check if email is unique.");
      });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Course</h2>

      {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}

      <form onSubmit={handleCourseSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Title:</label>
          <input className="w-full border p-2 rounded" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label className="block font-semibold">Description:</label>
          <textarea className="w-full border p-2 rounded" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label className="block font-semibold">Start Date:</label>
          <input className="w-full border p-2 rounded" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        </div>
        <div>
          <label className="block font-semibold">End Date:</label>
          <input className="w-full border p-2 rounded" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
        </div>
        <div>
          <label className="block font-semibold">Instructor:</label>
          <select className="w-full border p-2 rounded" value={instructorId} onChange={(e) => setInstructorId(e.target.value)} required>
            <option value="">-- Select Instructor --</option>
            {instructors.map(inst => (
              <option key={inst.id} value={inst.id}>
                {inst.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="text-blue-600 mt-2 underline"
            onClick={() => setShowAddInstructor(!showAddInstructor)}
          >
            {showAddInstructor ? 'Cancel' : '➕ Add New Instructor'}
          </button>
        </div>

        {showAddInstructor && (
          <div className="p-4 bg-gray-100 rounded mt-4">
            <h4 className="text-lg font-semibold mb-2">New Instructor Info</h4>
            <div className="mb-2">
              <label>Name:</label>
              <input className="w-full border p-2 rounded" value={newInstructor.name} onChange={(e) => setNewInstructor({ ...newInstructor, name: e.target.value })} required />
            </div>
            <div className="mb-2">
              <label>Email:</label>
              <input className="w-full border p-2 rounded" type="email" value={newInstructor.email} onChange={(e) => setNewInstructor({ ...newInstructor, email: e.target.value })} required />
            </div>
            <div className="mb-2">
              <label>Bio:</label>
              <textarea className="w-full border p-2 rounded" value={newInstructor.bio} onChange={(e) => setNewInstructor({ ...newInstructor, bio: e.target.value })} />
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleAddInstructor}>Save Instructor</button>
          </div>
        )}

        <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">Create Course</button>
      </form>
    </div>
  );
};

export default CreateCourse;
