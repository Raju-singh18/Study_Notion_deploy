 
import React, { useEffect, useState } from "react";
import axios from "axios";
import Course_Card from "../components/core/Catalog/Course_Card";  
import { courseEndpoints } from "../services/apis";

const CoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
           courseEndpoints.GET_ALL_COURSE_API
        );

        if (response.data.success) {
          setCourses(response.data.data);
          setFilteredCourses(response.data.data);
        } else {
          setError(response.data.message || "Failed to fetch courses");
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong while fetching courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Search functionality
  useEffect(() => {
    if (!searchQuery) {
      setFilteredCourses(courses);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = courses.filter((course) =>
        course.courseName.toLowerCase().includes(query) ||
        `${course.instructor.firstName} ${course.instructor.lastName}`
          .toLowerCase()
          .includes(query)
      );
      setFilteredCourses(filtered);
    }
  }, [searchQuery, courses]);

  return (
    <div className="pt-24 px-3 sm:px-6 md:px-10 lg:px-20 xl:px-30 2xl:px-40">
      {/* Heading + Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-richblack-5">
          All Courses
        </h1>
        <input
          type="text"
          placeholder="Search courses or instructors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-96 px-4 py-2 rounded-lg border border-richblack-700 bg-richblack-800 text-richblack-5 focus:outline-none focus:ring-2 focus:ring-yellow-50 transition-all duration-300"
        />
      </div>

      {/* Loading / Error / Courses */}
      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading courses...</p>
      ) : error ? (
        <p className="text-center text-red-500 text-lg">{error}</p>
      ) : filteredCourses.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No Courses Found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <Course_Card
              key={course._id}
              course={course}
              Height={"h-[220px] sm:h-[200px] md:h-[220px]"} // responsive card height
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursePage;
