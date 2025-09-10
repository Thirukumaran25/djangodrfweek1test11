import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    api.get('courses/')
      .then(res => setCourses(res.data))
      .catch(err => console.error('Error fetching courses:', err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Course List</h2>
      {courses.length === 0 ? (
        <p className="text-gray-600">No courses found.</p>
      ) : (
        <ul className="space-y-4">
          {courses.map(course => (
            <li key={course.id} className="p-4 bg-white rounded shadow hover:shadow-md">
              <Link className="text-blue-600 text-lg font-semibold" to={`/courses/${course.id}`}>
                {course.title}
              </Link>
              <p className="text-sm text-gray-700">Instructor: {course.instructor?.name || 'N/A'}</p>
              <p className="text-sm text-gray-500">Total Lessons: {course.total_lessons}</p>
              <p className="text-sm text-gray-500">{course.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CourseList;
