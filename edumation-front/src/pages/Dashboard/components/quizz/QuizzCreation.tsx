import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import BackButton from '../../../../components/ui/BackButton';
import Question from './Question';
import QuizzService from '../../../../services/QuizzService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

interface Option {
  text: string;
}

interface QuizQuestion {
  id: number;
  questionText: string;
  options: Option[];
  correctAnswer: number;
}

const QuizzCreation: React.FC = () => {
  const [quiz, setQuiz] = useState<{
    title: string;
    description: string;
    questions: QuizQuestion[];
  }>({
    title: '',
    description: '',
    questions: [
      {
        id: 1,
        questionText: '',
        options: [{ text: '' }, { text: '' }, { text: '' }, { text: '' }],
        correctAnswer: 0,
      },
    ],
  });
  const navigate = useNavigate();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuiz({ ...quiz, title: event.target.value });
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuiz({ ...quiz, description: event.target.value });
  };

  const addQuestion = () => {
    const newQuestion = {
      id: quiz.questions.length + 1,
      questionText: ``,
      options: [{ text: '' }, { text: '' }, { text: '' }, { text: '' }],
      correctAnswer: 0,
    };
    setQuiz({ ...quiz, questions: [...quiz.questions, newQuestion] });
  };

  const updateQuestion = (index: number, updatedQuestion: QuizQuestion) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[index] = updatedQuestion;
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const eraseQuestion = (id: number) => {
    const updatedQuestions = quiz.questions.filter(
      (question) => question.id !== id
    );
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const eraseAllQuestions = () => {
    setQuiz({
      ...quiz,
      questions: [
        {
          id: 1,
          questionText: '',
          options: [{ text: '' }, { text: '' }, { text: '' }, { text: '' }],
          correctAnswer: 0,
        },
      ],
    });
  };

  const finishQuizz = async () => {
    try {
      const formattedQuiz = {
        title: quiz.title,
        description: quiz.description,
        questions: quiz.questions.map(
          ({ questionText, options, correctAnswer }) => ({
            questionText,
            options: options.map((option) => option.text),
            correctAnswer,
          })
        ),
      };
      console.log(formattedQuiz);
      await QuizzService.createQuizz(formattedQuiz);
      toast.success('Quiz created successfully');
      navigate('/dashboard/quizz');
    } catch (error) {
      toast.error('Failed to create quiz');
      console.error(error);
    }
  };

  return (
    <>
      <div className="mb-4">
        <BackButton />
      </div>
      <div className="flex flex-col">
        <header className="flex items-center justify-between p-4 text-black">
          <Typography
            variant="h5"
            component="h1"
            className="text-lg font-semibold text-black dark:text-white"
          >
            Create new Quizz
          </Typography>
        </header>
        <main className="flex-grow overflow-auto ">
          <TextField
            label="Quizz Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={quiz.title}
            onChange={handleTitleChange}
          />
          <TextField
            label="Quizz Description"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={quiz.description}
            onChange={handleDescriptionChange}
          />
          <div className="my-4 flex justify-between">
            <Typography
              variant="h6"
              component="h2"
              className="text-lg font-semibold text-black dark:text-white"
            >
              Create new Question
            </Typography>
            <div className="flex gap-4">
              <Button
                variant="contained"
                color="primary"
                className="bg-black text-yellow-500 text-sm"
                onClick={addQuestion}
              >
                Add Question
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={eraseAllQuestions}
                startIcon={<DeleteIcon />}
              >
                <span className="hidden md:inline">Delete All Questions</span>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {quiz.questions.map((question, index) => (
              <Question
                key={question.id}
                question={question}
                index={index}
                eraseQuestion={() => eraseQuestion(question.id)}
                updateQuestion={updateQuestion}
              />
            ))}
          </div>
        </main>
        <div className="flex justify-end mt-4 gap-4">
          <BackButton title="Cancel" icon={false} />{' '}
          <Button
            variant="contained"
            color="primary"
            className="bg-black text-yellow-500 text-sm"
            onClick={finishQuizz}
          >
            Finish Quizz
          </Button>
        </div>
      </div>
    </>
  );
};
export default QuizzCreation;
