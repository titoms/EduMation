import { useState, useEffect } from 'react';
import { Quiz } from '../../../../services/Types';
import QuizzService from '../../../../services/QuizzService';
import axios from 'axios';
import { Grid, IconButton, Skeleton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

const QuizzList = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await QuizzService.getAllQuizz();
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

  if (loading) {
    return (
      <>
        <Skeleton variant="text" height={60} />
        <Grid container spacing={2} className="mb-4 w-full">
          <Grid item xs={12} md={6} xl={4}>
            <Skeleton variant="rounded" height={300} />
          </Grid>
          <Grid item xs={12} md={6} xl={4}>
            <Skeleton variant="rounded" height={300} />
          </Grid>
        </Grid>
      </>
    );
  }
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="h-screen mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
              <div className="mt-4">
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default QuizzList;