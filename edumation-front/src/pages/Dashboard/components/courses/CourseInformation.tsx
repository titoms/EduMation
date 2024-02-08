import React from 'react';
import { Course } from '../../../../services/Types';

interface CourseInformationProps {
  course: Course;
}

const CourseInformation: React.FC<CourseInformationProps> = ({ course }) => {
  return (
    <div className="bg-gray-200 shadow-md w-full flex justify-center rounded-lg p-8">
      <div className="max-w-md w-full space-y-6">
        <div className="mx-auto max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold">Course information :</h2>
            <p className="text-gray-500">{course?.description}</p>
          </div>
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold">
              {course?.courseDuration ? course.courseDuration : 0} Days
            </h2>
          </div>
          <div className="mt-8 flex justify-around text-center">
            <div className="">
              <img
                className="w-32 h-32 rounded-full"
                src="https://via.placeholder.com/150"
                alt="School Pic"
              />
              <h3 className="mt-2">School Name</h3>
            </div>
            <div className="">
              <img
                className="w-32 h-32 rounded-full"
                src="https://via.placeholder.com/150"
                alt="Teacher Pic"
              />
              <h3 className="mt-2">Teacher Name</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseInformation;
