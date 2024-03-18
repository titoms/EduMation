import { useParams } from 'react-router-dom';
import BackButton from '../../../../components/ui/BackButton';
import { useEffect, useState } from 'react';
import QuizzService from '../../../../services/QuizzService';
import { Quiz } from '../../../../services/Types';
import axios from 'axios';
import UserSkeleton from '../../../../components/ui/skeletons/UserSkeleton';

const IndividualQuizz = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [quizzData, setQuizzData] = useState<Quiz | null>(null);

  const params = useParams();
  const quizzId = params.id!;

  useEffect(() => {
    const fetchQuizz = async () => {
      try {
        const response = await QuizzService.getQuizzById(quizzId);
        setQuizzData(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setError(err.response.data);
        } else {
          setError('An error occurred while fetching the quiz.');
        }
        setLoading(false);
      }
    };
    fetchQuizz();
  }, [quizzId]);

  if (!quizzData || loading) return <UserSkeleton />;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <BackButton />
      <h1 className="text-2xl my-4 font-semibold">Quizz</h1>
      <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6">
        <div key={quizzData._id} className="pb-2">
          <h2 className="text-3xl font-bold">
            {quizzData.title ? quizzData.title : 'Quizz Title'}
          </h2>
          <p className="text-sm my-4 italic">
            {quizzData.description
              ? quizzData.description
              : 'Quizz Description'}
          </p>
          {quizzData.questions.map((question, index) => (
            <div key={index} className="mt-4">
              <p className="font-semibold">{question.questionText}</p>
              <ul className="list-disc ml-4">
                {question.options.map((option, optionIndex) => (
                  <li
                    key={optionIndex}
                    style={{
                      color:
                        optionIndex === question.correctAnswer
                          ? '#2fcc70'
                          : 'inherit',
                    }}
                  >
                    {option}
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

export default IndividualQuizz;
