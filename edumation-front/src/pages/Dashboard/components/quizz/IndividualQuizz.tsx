import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { IconButton, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import BackButton from '../../../../components/ui/BackButton';
import UserSkeleton from '../../../../components/ui/skeletons/UserSkeleton';
import QuizzService from '../../../../services/QuizzService';
import { Quiz } from '../../../../services/Types';

const IndividualQuizz = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [quizzData, setQuizzData] = useState<Quiz | null>(null);

  const { id: quizzId } = useParams<{ id: string }>();

  useEffect(() => {
    setLoading(true);
    const fetchQuizz = async () => {
      try {
        const response = await QuizzService.getQuizzById(quizzId);
        setQuizzData(response.data);
      } catch (err) {
        const errorMessage =
          axios.isAxiosError(err) && err.response
            ? err.response.data
            : 'An error occurred while fetching the quiz.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizz();
  }, [quizzId]);

  const toggleEditMode = () => setEditMode(!editMode);

  const handleChange = (event, index = null, type) => {
    if (!quizzData) return;
    const updatedQuizz = { ...quizzData };
    switch (type) {
      case 'title':
        updatedQuizz.title = event.target.value;
        break;
      case 'description':
        updatedQuizz.description = event.target.value;
        break;
      default:
        if (index !== null) {
          const { questionIndex, optionIndex, value } = event.target;
          if (type === 'questionText') {
            updatedQuizz.questions[questionIndex].questionText = value;
          } else if (type === 'option') {
            updatedQuizz.questions[questionIndex].options[optionIndex] = value;
          }
        }
        break;
    }
    setQuizzData(updatedQuizz);
  };

  const saveQuizz = async () => {
    if (!quizzData) return;
    setLoading(true);
    try {
      await QuizzService.updateQuizz(quizzId, quizzData);
      toast.success('Quiz updated successfully');
      setEditMode(false);
    } catch (error) {
      toast.error('Failed to update quiz');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <UserSkeleton />;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <BackButton />
      <h1 className="text-3xl my-8 font-semibold">
        {editMode ? (
          <TextField
            label="Quizz Title"
            variant="outlined"
            fullWidth
            multiline
            value={quizzData?.title || ''}
            onChange={(e) => handleChange(e, null, 'title')}
          />
        ) : (
          quizzData?.title || 'Quizz Title'
        )}
      </h1>
      <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6">
        <div key={quizzData?._id} className="pb-2">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">
              {quizzData?.questions.length} Questions
            </h2>
            <div className="mt-4 flex justify-end items-end">
              {editMode ? (
                <>
                  <IconButton onClick={saveQuizz} aria-label="save">
                    <SaveIcon sx={{ color: '#2fcc70' }} />
                  </IconButton>
                  <IconButton
                    onClick={() => setEditMode(false)}
                    aria-label="cancel"
                  >
                    <CancelIcon sx={{ color: '#eeeeee' }} />
                  </IconButton>
                </>
              ) : (
                <IconButton onClick={toggleEditMode} aria-label="edit">
                  <EditIcon sx={{ color: '#2fcc70' }} />
                </IconButton>
              )}
              <IconButton aria-label="delete">
                <DeleteIcon sx={{ color: '#e63535' }} />
              </IconButton>
            </div>
          </div>
          {editMode ? (
            <TextField
              label="Quizz Description"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              value={quizzData?.description || ''}
              onChange={(e) => handleChange(e, null, 'description')}
            />
          ) : (
            <p className="text-sm my-4 italic">
              {quizzData?.description || 'Quizz Description'}
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {quizzData?.questions.map((question, index) => (
              <div
                key={index}
                className="mt-4 p-4 bg-gray-100 dark:bg-slate-600 rounded-md"
              >
                {editMode ? (
                  <TextField
                    label="Question Title"
                    variant="outlined"
                    fullWidth
                    multiline
                    value={question.questionText || ''}
                    onChange={(e) => handleChange(e, index, 'questionText')}
                  />
                ) : (
                  <p className="font-semibold">{question.questionText}</p>
                )}
                <ul className="list-disc ml-4 my-8">
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
      </div>
    </>
  );
};

export default IndividualQuizz;
