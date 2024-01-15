export interface ClassTime {
  date: string;
  startTime: string;
  endTime: string;
  location: string;
}

export interface Schedule {
  courseId: string;
  classTimes: ClassTime[];
  recurring: boolean;
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  schoolId: string;
  teacherId: string;
  studentIds: string[];
  quizIds: string[];
  scheduleId: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export interface Quiz {
  _id: string;
  title: string;
  description: string;
  questions: { questionText: string; options: string[]; answer: string }[];
}

export interface School {
  _id: string;
  name: string;
  address: string;
  contactInfo: {
    phone: string;
    email: string;
    website: string;
  };
}
