import { useState, useEffect } from 'react';
import axios from 'axios';
import SchoolsService from '../../../services/SchoolsService';
import UsersService from '../../../services/UsersService';
import { User, School, Course } from '../../../services/Types';
import UserSkeleton from '../../../components/ui/skeletons/UserSkeleton';
import CoursesService from '../../../services/CoursesService';
import { Link } from 'react-router-dom';

const MainDashboard = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [students, setStudents] = useState<User[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [countCourses, setCountCourses] = useState(0);
  const [countStudents, setCountStudents] = useState(0);
  const [countUsers, setCountUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [countSchools, setCountSchools] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await SchoolsService.getAllSchools();
        setSchools(response.data);
        setCountSchools(Object.keys(response.data).length);
        setLoading(false);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setError(err.response.data);
        } else {
          setError('An error occurred while fetching schools.');
        }
        setLoading(false);
      }
    };
    fetchSchools();

    const fetchCourses = async () => {
      try {
        const response = await CoursesService.getAllCourses();
        setCourses(response.data);
        setCountCourses(Object.keys(response.data).length);
        setLoading(false);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setError(err.response.data);
        } else {
          setError('An error occurred while fetching schools.');
        }
        setLoading(false);
      }
    };
    fetchCourses();

    const fetchStudents = async () => {
      try {
        const response = await UsersService.getAllUsers();
        setUsers(response.data);
        setCountUsers(Object.keys(response.data).length);
        const studentData = response.data.filter(
          (user: User) => user.role === 'student'
        );
        setStudents(studentData);
        setCountStudents(Object.keys(studentData).length);
        setLoading(false);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setError(err.response.data);
        } else {
          setError('An error occurred while fetching students.');
        }
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  return (
    <>
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      {loading ? (
        <UserSkeleton />
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <>
          {/* RESUME */}
          <div className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="mt-4 relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 dark:bg-slate-800 dark:text-white shadow-md">
                <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-black dark:text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-6 h-6 text-white"
                  >
                    <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
                    <path
                      fillRule="evenodd"
                      d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                      clipRule="evenodd"
                    ></path>
                    <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"></path>
                  </svg>
                </div>
                <div className="p-4 text-right">
                  <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                    Schools
                  </p>
                  <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                    <span>{countSchools}</span>
                  </h4>
                </div>
                <div className="border-t border-blue-gray-50 p-4">
                  <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                    <strong className="text-green-500">+0%</strong>&nbsp;than
                    last week
                  </p>
                </div>
              </div>
              <div className="mt-4 relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 dark:bg-slate-800 dark:text-white shadow-md">
                <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-6 h-6 text-white"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="p-4 text-right">
                  <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                    Students
                  </p>
                  <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                    {countStudents}
                  </h4>
                </div>
                <div className="border-t border-blue-gray-50 p-4">
                  <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                    <strong className="text-green-500">+0%</strong>&nbsp;than
                    last month
                  </p>
                </div>
              </div>
              <div className="mt-4 relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 dark:bg-slate-800 dark:text-white shadow-md">
                <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-6 h-6 text-white"
                  >
                    <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
                  </svg>
                </div>
                <div className="p-4 text-right">
                  <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                    Courses
                  </p>
                  <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                    {countCourses}
                  </h4>
                </div>
                <div className="border-t border-blue-gray-50 p-4">
                  <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                    <strong className="text-red-500">-0%</strong>&nbsp;than
                    yesterday
                  </p>
                </div>
              </div>
              <div className="mt-4 relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 dark:bg-slate-800 dark:text-white shadow-md">
                <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-orange-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-6 h-6 text-white"
                  >
                    <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z"></path>
                  </svg>
                </div>
                <div className="p-4 text-right">
                  <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                    Quizz
                  </p>
                  <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                    0
                  </h4>
                </div>
                <div className="border-t border-blue-gray-50 p-4">
                  <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                    <strong className="text-green-500">+0%</strong>&nbsp;than
                    yesterday
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* MAIN CONTENT */}
          <main>
            <div className="">
              {/* FIRST ROW */}
              <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
                {/* CHART  */}
                {/* <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-shrink-0">
                    <span className="text-2xl sm:text-3xl leading-none font-bold ">
                      $0
                    </span>
                    <h3 className="text-base font-normal text-gray-500">
                      Sales this week
                    </h3>
                  </div>
                  <div className="flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                    12.5%
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div id="main-chart"></div>
              </div> */}
                {/* Latest */}
                {/* <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Latest Transactions
                    </h3>
                    <span className="text-base font-normal text-gray-500">
                      This is a list of latest transactions
                    </span>
                  </div>
                  <div className="flex-shrink-0">
                    <a
                      href="#"
                      className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg p-2"
                    >
                      View all
                    </a>
                  </div>
                </div>
                <div className="flex flex-col mt-8">
                  <div className="overflow-x-auto rounded-lg">
                    <div className="align-middle inline-block min-w-full">
                      <div className="shadow overflow-hidden sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Transaction
                              </th>
                              <th
                                scope="col"
                                className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Date & Time
                              </th>
                              <th
                                scope="col"
                                className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Amount
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                            <tr>
                              <td className="p-4 whitespace-nowrap text-sm font-normal ">
                                Payment from{' '}
                                <span className="font-semibold">
                                  Bonnie Green
                                </span>
                              </td>
                              <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                Apr 23 ,2021
                              </td>
                              <td className="p-4 whitespace-nowrap text-sm font-semibold ">
                                $2300
                              </td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="p-4 whitespace-nowrap text-sm font-normal rounded-lg rounded-left">
                                Payment refund to{' '}
                                <span className="font-semibold">#00910</span>
                              </td>
                              <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                Apr 23 ,2021
                              </td>
                              <td className="p-4 whitespace-nowrap text-sm font-semibold ">
                                -$670
                              </td>
                            </tr>
                            <tr>
                              <td className="p-4 whitespace-nowrap text-sm font-normal ">
                                Payment failed from{' '}
                                <span className="font-semibold">#087651</span>
                              </td>
                              <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                Apr 18 ,2021
                              </td>
                              <td className="p-4 whitespace-nowrap text-sm font-semibold ">
                                $234
                              </td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="p-4 whitespace-nowrap text-sm font-normal rounded-lg rounded-left">
                                Payment from{' '}
                                <span className="font-semibold">Lana Byrd</span>
                              </td>
                              <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                Apr 15 ,2021
                              </td>
                              <td className="p-4 whitespace-nowrap text-sm font-semibold ">
                                $5000
                              </td>
                            </tr>
                            <tr>
                              <td className="p-4 whitespace-nowrap text-sm font-normal ">
                                Payment from{' '}
                                <span className="font-semibold">Jese Leos</span>
                              </td>
                              <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                Apr 15 ,2021
                              </td>
                              <td className="p-4 whitespace-nowrap text-sm font-semibold ">
                                $2300
                              </td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="p-4 whitespace-nowrap text-sm font-normal rounded-lg rounded-left">
                                Payment from{' '}
                                <span className="font-semibold">
                                  THEMESBERG LLC
                                </span>
                              </td>
                              <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                Apr 11 ,2021
                              </td>
                              <td className="p-4 whitespace-nowrap text-sm font-semibold ">
                                $560
                              </td>
                            </tr>
                            <tr>
                              <td className="p-4 whitespace-nowrap text-sm font-normal ">
                                Payment from{' '}
                                <span className="font-semibold">Lana Lysle</span>
                              </td>
                              <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                Apr 6 ,2021
                              </td>
                              <td className="p-4 whitespace-nowrap text-sm font-semibold ">
                                $1437
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              </div>
              {/* SECOND ROW */}
              {/* <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <span className="text-2xl sm:text-3xl leading-none font-bold ">
                      2,340
                    </span>
                    <h3 className="text-base font-normal text-gray-500">
                      New quizzes this week
                    </h3>
                  </div>
                  <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                    14.6%
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <span className="text-2xl sm:text-3xl leading-none font-bold ">
                      5,355
                    </span>
                    <h3 className="text-base font-normal text-gray-500">
                      Visitors this week
                    </h3>
                  </div>
                  <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                    32.9%
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <span className="text-2xl sm:text-3xl leading-none font-bold ">
                      385
                    </span>
                    <h3 className="text-base font-normal text-gray-500">
                      User signups this week
                    </h3>
                  </div>
                  <div className="ml-5 w-0 flex items-center justify-end flex-1 text-red-500 text-base font-bold">
                    -2.7%
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div> */}
              {/* THIRD ROW */}
              <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
                {/* LATEST CUSTOMERS ROW */}
                <div className="bg-white text-gray-700 dark:bg-slate-800 dark:text-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold leading-none">
                      Latest Customers
                    </h3>
                    <Link
                      to="users/"
                      className="text-sm font-medium text-cyan-500 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg inline-flex items-center p-2"
                    >
                      View all
                    </Link>
                  </div>
                  <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200">
                      {users.slice(0, 5).map((user) => (
                        <li key={user._id} className="py-3 sm:py-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              <img
                                className="h-8 w-8 rounded-full"
                                src={
                                  user.profileImage
                                    ? user.profileImage
                                    : 'https://via.placeholder.com/150'
                                }
                                alt={user.name}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">
                                {user.name}
                              </p>
                              <p className="text-sm text-gray-500 truncate">
                                <a
                                  href={`mailto:${user.email}`}
                                  className="__cf_email__"
                                >
                                  {user.email}
                                </a>
                              </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold">
                              {user.role}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {/* ACQUISITION OVERVIEW ROW */}
                {/* <div className="bg-white text-gray-700 dark:bg-slate-800 dark:text-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                <h3 className="text-xl leading-none font-bold mb-10">
                  Acquisition Overview
                </h3>
                <div className="block w-full overflow-x-auto">
                  <table className="items-center w-full bg-transparent border-collapse">
                    <thead>
                      <tr>
                        <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                          Top Channels
                        </th>
                        <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                          Users
                        </th>
                        <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap min-w-140-px"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr className="text-gray-500 dark:text-gray-100">
                        <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                          Organic Search
                        </th>
                        <td className="border-t-0 px-4 align-middle text-xs font-medium whitespace-nowrap p-4">
                          5,649
                        </td>
                        <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                          <div className="flex items-center">
                            <span className="mr-2 text-xs font-medium">30%</span>
                            <div className="relative w-full">
                              <div className="w-full bg-gray-200 rounded-sm h-2">
                                <div
                                  className="bg-cyan-600 h-2 rounded-sm"
                                  style={{ width: '30%' }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr className="text-gray-500 dark:text-gray-100">
                        <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                          Referral
                        </th>
                        <td className="border-t-0 px-4 align-middle text-xs font-medium whitespace-nowrap p-4">
                          4,025
                        </td>
                        <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                          <div className="flex items-center">
                            <span className="mr-2 text-xs font-medium">24%</span>
                            <div className="relative w-full">
                              <div className="w-full bg-gray-200 rounded-sm h-2">
                                <div
                                  className="bg-orange-300 h-2 rounded-sm"
                                  style={{ width: '24%' }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr className="text-gray-500 dark:text-gray-100">
                        <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                          Direct
                        </th>
                        <td className="border-t-0 px-4 align-middle text-xs font-medium whitespace-nowrap p-4">
                          3,105
                        </td>
                        <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                          <div className="flex items-center">
                            <span className="mr-2 text-xs font-medium">18%</span>
                            <div className="relative w-full">
                              <div className="w-full bg-gray-200 rounded-sm h-2">
                                <div
                                  className="bg-teal-400 h-2 rounded-sm"
                                  style={{ width: '18%' }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr className="text-gray-500 dark:text-gray-100">
                        <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                          Social
                        </th>
                        <td className="border-t-0 px-4 align-middle text-xs font-medium whitespace-nowrap p-4">
                          1251
                        </td>
                        <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                          <div className="flex items-center">
                            <span className="mr-2 text-xs font-medium">12%</span>
                            <div className="relative w-full">
                              <div className="w-full bg-gray-200 rounded-sm h-2">
                                <div
                                  className="bg-pink-600 h-2 rounded-sm"
                                  style={{ width: '12%' }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr className="text-gray-500 dark:text-gray-100">
                        <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                          Other
                        </th>
                        <td className="border-t-0 px-4 align-middle text-xs font-medium whitespace-nowrap p-4">
                          734
                        </td>
                        <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                          <div className="flex items-center">
                            <span className="mr-2 text-xs font-medium">9%</span>
                            <div className="relative w-full">
                              <div className="w-full bg-gray-200 rounded-sm h-2">
                                <div
                                  className="bg-indigo-600 h-2 rounded-sm"
                                  style={{ width: '9%' }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr className="text-gray-500 dark:text-gray-100">
                        <th className="border-t-0 align-middle text-sm font-normal whitespace-nowrap p-4 pb-0 text-left">
                          Email
                        </th>
                        <td className="border-t-0 align-middle text-xs font-medium whitespace-nowrap p-4 pb-0">
                          456
                        </td>
                        <td className="border-t-0 align-middle text-xs whitespace-nowrap p-4 pb-0">
                          <div className="flex items-center">
                            <span className="mr-2 text-xs font-medium">7%</span>
                            <div className="relative w-full">
                              <div className="w-full bg-gray-200 rounded-sm h-2">
                                <div
                                  className="bg-purple-500 h-2 rounded-sm"
                                  style={{ width: '7%' }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div> */}
              </div>
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default MainDashboard;
