import React, { useState, useEffect } from 'react';
import axios from 'axios';

type Quiz = {
  _id: string;
  title: string;
  description: string;
  questions: { questionText: string; options: string[]; answer: string }[];
};

const Quizz: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/quizz', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setQuizzes(response.data);
        setLoading(false);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setError(err.response.data);
        } else {
          setError('An error occurred while fetching quizzes.');
        }
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <h1 className="text-2xl font-semibold">Schools</h1>
      <div className="h-screen mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quizzes.map((quiz) => (
            <div key={quiz._id} className="bg-white shadow rounded-lg p-4">
              <h3 className="text-lg font-semibold">{quiz.title}</h3>
              <p>{quiz.description}</p>
              <ul>
                {quiz.questions.map((question, index) => (
                  <li key={index} className="mt-2">
                    <p className="font-semibold">{question.questionText}</p>
                    <ul className="list-disc ml-4">
                      {question.options.map((option, optionIndex) => (
                        <li key={optionIndex}>{option}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Quizz;
