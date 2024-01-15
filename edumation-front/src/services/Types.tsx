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
