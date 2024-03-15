import { Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import Question from './Question';
import BackButton from '../../../../components/ui/BackButton';

interface QuestionType {
  id: number;
  text: string;
  choices: string[];
}

interface QuizType {
  title: string;
  description: string;
  questions: QuestionType[];
}

const QuizzCreation: React.FC = () => {
  const [quiz, setQuiz] = useState<QuizType>({
    title: '',
    description: '',
    questions: [],
  });

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuiz({ ...quiz, title: event.target.value });
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuiz({ ...quiz, description: event.target.value });
  };

  const updateQuestion = (index: number, updatedQuestion: QuestionType) => {
    const newQuestions = [...quiz.questions];
    newQuestions[index] = updatedQuestion;
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const addQuestion = () => {
    const newQuestion: QuestionType = {
      id: quiz.questions.length + 1,
      text: `Question ${quiz.questions.length + 1}`,
      choices: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4'],
    };
    setQuiz({ ...quiz, questions: [...quiz.questions, newQuestion] });
  };

  const finishQuizz = () => {
    console.log(quiz);
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
            <Button
              variant="contained"
              color="primary"
              className="bg-black text-yellow-500 text-sm"
              onClick={addQuestion}
            >
              Add Question
            </Button>
          </div>

          {quiz.questions.map((question, index) => (
            <Question
              key={question.id}
              question={question}
              index={index}
              updateQuestion={updateQuestion}
            />
          ))}
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
