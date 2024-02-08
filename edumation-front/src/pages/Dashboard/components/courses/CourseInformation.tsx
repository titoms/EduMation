import { Course, School, User } from '../../../../services/Types';

interface CourseInformationProps {
  course: Course;
  school: School | undefined; // Updated to accept undefined
  teacher: User | undefined; // Updated to accept undefined
}

const CourseInformation: React.FC<CourseInformationProps> = ({
  course,
  teacher,
  school,
}) => {
  return (
    <div className="bg-gray-200 shadow-md w-full flex justify-center rounded-lg p-8">
      <div className="max-w-md w-full space-y-8">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold">Course information :</h2>
          <p className="text-gray-500">{course?.description}</p>
        </div>
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold">
            {course?.courseDuration ? course.courseDuration : 0} Days
          </h2>
        </div>
        <div className="mt-8 flex justify-between content-center text-center">
          <div className="space-y-4">
            <img
              className="w-32 h-32 m-auto rounded-full"
              src="https://via.placeholder.com/150"
              alt="School Pic"
            />
            <h3 className="mt-2">{school?.name || 'School not assigned'}</h3>
          </div>
          <div className="space-y-4">
            <img
              className="w-32 h-32 m-auto rounded-full"
              src={teacher?.profileImage || 'https://via.placeholder.com/150'}
              alt="Teacher Pic"
            />
            <h3 className="mt-2">{teacher?.name || 'Teacher not assigned'}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseInformation;
