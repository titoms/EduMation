import { useParams } from 'react-router-dom';
import BackButton from '../../../../components/ui/BackButton';
import { useEffect, useState } from 'react';
import QuizzService from '../../../../services/QuizzService';
import { Quiz } from '../../../../services/Types';
import axios from 'axios';
import UserSkeleton from '../../../../components/ui/skeletons/UserSkeleton';
import { IconButton, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { toast } from 'react-toastify';

const IndividualQuizz = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [quizzData, setQuizzData] = useState<Quiz | null>(null);
  const [editedQuizz, setEditedQuizz] = useState<Quiz | null>(null);

  const params = useParams();
  const quizzId = params.id!;

  useEffect(() => {
    const fetchQuizz = async () => {
      try {
        const response = await QuizzService.getQuizzById(quizzId);
        setQuizzData(response.data);
        setEditedQuizz(response.data);
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

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedQuizz(quizzData); // Reset edits
  };

  const handleChange = (e, questionIndex, type, optionIndex) => {
    setEditedQuizz((prevEditedQuizz) => {
      if (!prevEditedQuizz) return prevEditedQuizz;

      // Clone the edited quiz to avoid direct mutation
      let newQuizz = { ...prevEditedQuizz };

      // Handle updates based on the type of change
      if (type === 'title') {
        newQuizz.title = e.target.value;
      } else if (type === 'description') {
        newQuizz.description = e.target.value;
      } else if (type === 'questionText' && typeof questionIndex === 'number') {
        // Clone the questions array and update the specific question
        const newQuestions = [...newQuizz.questions];
        newQuestions[questionIndex] = {
          ...newQuestions[questionIndex],
          questionText: e.target.value,
        };
        newQuizz.questions = newQuestions;
      } else if (
        type === 'option' &&
        typeof questionIndex === 'number' &&
        typeof optionIndex === 'number'
      ) {
        // Clone the questions array and its options then update the specific option
        const newQuestions = [...newQuizz.questions];
        const newOptions = [...newQuestions[questionIndex].options];
        newOptions[optionIndex] = e.target.value; // Assuming you're directly passing the new value
        newQuestions[questionIndex] = {
          ...newQuestions[questionIndex],
          options: newOptions,
        };
        newQuizz.questions = newQuestions;
      }

      return newQuizz;
    });
  };

  const handleSaveQuizz = async () => {
    if (!editedQuizz) return;
    try {
      await QuizzService.updateQuizz(quizzId, editedQuizz);
      toast.success('Quiz updated successfully');
      setQuizzData(editedQuizz);
      setEditMode(false);
    } catch (error) {
      toast.error('Failed to update quiz');
      console.error(error);
    }
  };

  if (!quizzData || loading) return <UserSkeleton />;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <BackButton />
      {editMode ? (
        <>
          <h1 className="text-3xl my-8 font-semibold">
            <TextField
              label="Quizz Title"
              variant="outlined"
              fullWidth
              multiline
              value={editedQuizz?.title || ''}
              onChange={(e) => handleChange(e, null, 'title')}
            />
          </h1>
          <div className="bg-white dark:bg-slate-800 shadow rounded-lg pt-2 p-6">
            <div key={quizzData._id} className="pb-2">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">
                  {' '}
                  {quizzData.questions.length} Questions
                </h2>
                <div className="mt-4 flex justify-end items-end">
                  <IconButton onClick={handleSaveQuizz} aria-label="save">
                    <SaveIcon sx={{ color: '#2fcc70' }} />
                  </IconButton>
                  <IconButton onClick={handleCancelEdit} aria-label="cancel">
                    <CancelIcon sx={{ color: '#eeeeee' }} />
                  </IconButton>
                  <IconButton
                    className="text-black dark:text-gray-200"
                    aria-label="share"
                  >
                    <DeleteIcon sx={{ color: '#e63535' }} />
                  </IconButton>
                </div>
              </div>

              <TextField
                label="Quizz Description"
                variant="outlined"
                fullWidth
                margin="normal"
                multiline
                value={editedQuizz?.description || ''}
                onChange={(e) => handleChange(e, null, 'description')}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 ">
                {quizzData.questions.map((question, index) => (
                  <div
                    key={index}
                    className="mt-4 p-4 bg-gray-100 dark:bg-slate-600 rounded-md flex flex-col justify-center"
                  >
                    <TextField
                      label="Question Title"
                      variant="outlined"
                      fullWidth
                      multiline
                      value={editedQuizz?.questions[index].questionText || ''}
                      onChange={(e) => handleChange(e, index, 'questionText')}
                    />
                    <ul className="ml-2 my-4">
                      {question.options.map((option, optionIndex) => (
                        <>
                          <TextField
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            style={{
                              borderRadius: '5px',
                              border:
                                optionIndex === question.correctAnswer
                                  ? '1px solid #2fcc70'
                                  : 'inherit',
                            }}
                            multiline
                            value={
                              editedQuizz?.questions[index].options[
                                optionIndex
                              ] || ''
                            }
                            onChange={(e) =>
                              handleChange(e, index, 'option', optionIndex)
                            }
                          />
                        </>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-3xl my-8 font-semibold">{quizzData.title}</h1>
          <div className="bg-white dark:bg-slate-800 shadow rounded-lg pt-2 p-6">
            <div key={quizzData._id} className="pb-2">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">
                  {' '}
                  {quizzData.questions.length} Questions - Finalscore :{' '}
                  {quizzData.finalScore}
                </h2>
                <div className="mt-4 flex justify-end items-end">
                  <IconButton onClick={handleEditToggle} aria-label="edit">
                    <EditIcon sx={{ color: '#2fcc70' }} />
                  </IconButton>
                  <IconButton
                    className="text-black dark:text-gray-200"
                    aria-label="share"
                  >
                    <DeleteIcon sx={{ color: '#e63535' }} />
                  </IconButton>
                </div>
              </div>

              <p className="text-sm my-4 italic">
                {quizzData.description
                  ? quizzData.description
                  : 'Quizz Description'}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 ">
                {quizzData.questions.map((question, index) => (
                  <div
                    key={index}
                    className="mt-4 p-4 bg-gray-100 dark:bg-slate-600 rounded-md flex flex-col justify-center"
                  >
                    <p className="font-semibold">{question.questionText}</p>
                    <ul className="list-none ml-2 my-4 mb-0">
                      {question.options.map((option, optionIndex) => (
                        <>
                          <li
                            className="my-4"
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
                        </>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default IndividualQuizz;
