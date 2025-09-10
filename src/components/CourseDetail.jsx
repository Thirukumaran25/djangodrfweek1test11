import React, { useEffect, useState } from 'react';
import api from '../api';
import { useParams, useNavigate } from 'react-router-dom';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`courses/${id}/`)
      .then(res => {
        setCourse(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching course:', err);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      api.delete(`courses/${id}/`)
        .then(() => {
          alert('Course deleted');
          navigate('/courses');
        })
        .catch(err => {
          console.error('Error deleting course:', err);
          alert('Failed to delete course');
        });
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!course) return <p className="text-red-600 text-center">Course not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">{course.title}</h2>
      <p className="mb-2"><b>Description:</b> {course.description}</p>
      <p className="mb-2"><b>Start Date:</b> {course.start_date}</p>
      <p className="mb-2"><b>End Date:</b> {course.end_date}</p>
      <p className="mb-2"><b>Active:</b> {course.is_active ? 'Yes' : 'No'}</p>
      <p className="mb-4"><b>Instructor:</b> {course.instructor?.name || 'N/A'}</p>

      <div className="flex gap-4">
        <button
          onClick={() => navigate(`/courses/edit/${id}`)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Edit Course
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete Course
        </button>
      </div>
    </div>
  );
};

export default CourseDetail;
