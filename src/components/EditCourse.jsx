import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState({
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    is_active: true,
    instructor_id: '',
  });

  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`courses/${id}/`)
      .then(res => {
        const data = res.data;
        setCourse({
          title: data.title,
          description: data.description,
          start_date: data.start_date,
          end_date: data.end_date,
          is_active: data.is_active,
          instructor_id: data.instructor ? data.instructor.id : '',
        });
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching course:', err);
        setLoading(false);
      });

    api.get('instructors/')
      .then(res => setInstructors(res.data))
      .catch(err => console.error('Error fetching instructors:', err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCourse(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedCourse = {
      title: course.title,
      description: course.description,
      start_date: course.start_date,
      end_date: course.end_date,
      is_active: course.is_active,
      instructor_id: course.instructor_id,
    };

    api.put(`courses/${id}/`, updatedCourse)
      .then(() => {
        alert('✅ Course updated successfully!');
        navigate(`/courses/${id}`);
      })
      .catch(err => {
        console.error('Error updating course:', err);
        alert('❌ Failed to update course');
      });
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Title:</label>
          <input
            type="text"
            name="title"
            value={course.title}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">Description:</label>
          <textarea
            name="description"
            value={course.description}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">Start Date:</label>
          <input
            type="date"
            name="start_date"
            value={course.start_date}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">End Date:</label>
          <input
            type="date"
            name="end_date"
            value={course.end_date}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="flex items-center">
          <label className="font-semibold mr-2">Active:</label>
          <input
            type="checkbox"
            name="is_active"
            checked={course.is_active}
            onChange={handleChange}
            className="w-5 h-5"
          />
        </div>
        <div>
          <label className="block font-semibold">Instructor:</label>
          <select
            name="instructor_id"
            value={course.instructor_id}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">-- Select Instructor --</option>
            {instructors.map(inst => (
              <option key={inst.id} value={inst.id}>{inst.name}</option>
            ))}
          </select>
        </div>

        <div className="text-center pt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          >
            Update Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCourse;
