import { useState, useEffect } from 'react';
import { Quiz } from '../../../../services/Types';
import QuizzService from '../../../../services/QuizzService';
import axios from 'axios';
import { Grid, IconButton, Skeleton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DeleteConfirmationModal from '../../../../components/DeleteConfirmationModal';
import { toast } from 'react-toastify';

const QuizzList = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedQuizzId, setSelectedQuizzId] = useState<string | null>(null);

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

  const handleOpenDelete = (quizzId: string) => {
    setSelectedQuizzId(quizzId);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => setOpenDelete(false);

  const handleDeleteQuizz = async () => {
    if (!selectedQuizzId) return;
    try {
      await QuizzService.deleteQuizz(selectedQuizzId);
      toast.success('Quizz deleted successfully');
    } catch (error) {
      toast.error('Failed to delete quizz');
    } finally {
      handleCloseDelete();
    }
  };

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
      <div className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quizzes.map((quiz) => (
            <div
              key={quiz._id}
              className="bg-white dark:bg-slate-800 shadow rounded-lg p-4"
            >
              <Link to={quiz._id}>
                <h3 className="text-lg font-semibold hover:text-gray-400">
                  {quiz.title}
                </h3>
              </Link>
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

              <div className="mt-4 flex justify-end items-end">
                <IconButton
                  className="text-black dark:text-gray-200"
                  aria-label="add to favorites"
                >
                  <FavoriteIcon sx={{ color: '#3c70c9' }} />
                </IconButton>
                <IconButton
                  className="text-black dark:text-gray-200"
                  aria-label="share"
                >
                  <ShareIcon sx={{ color: '#3c96c9' }} />
                </IconButton>
                <Link to={quiz._id}>
                  <IconButton
                    className="text-black dark:text-gray-200"
                    aria-label="share"
                  >
                    <EditIcon sx={{ color: '#3dc8eb' }} />
                  </IconButton>
                </Link>
                <IconButton
                  className="text-black dark:text-gray-200"
                  aria-label="share"
                  onClick={() => quiz._id && handleOpenDelete(quiz._id)}
                >
                  <DeleteIcon sx={{ color: '#e63535' }} />
                </IconButton>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedQuizzId && (
        <DeleteConfirmationModal
          open={openDelete}
          onClose={handleCloseDelete}
          onDelete={handleDeleteQuizz}
          itemId={selectedQuizzId}
          confirmationMessage={`Are you sure you want to delete this quizz?`}
        />
      )}
    </>
  );
};

export default QuizzList;
