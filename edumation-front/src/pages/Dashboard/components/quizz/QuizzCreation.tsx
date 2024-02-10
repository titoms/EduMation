import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import Question from './Question';
import BackButton from '../../../../components/ui/BackButton';

const QuizzCreation: React.FC = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      text: 'Question 1',
      choices: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4'],
    },
    // Add more questions as needed
  ]);

  const addQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      text: `Question ${questions.length + 1}`,
      choices: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4'], // Default choices, adjust as needed
    };
    setQuestions([...questions, newQuestion]);
    console.log(questions);
  };

  return (
    <>
      <div className="mb-4">
        <BackButton />
      </div>
      <div className="flex flex-col">
        <header className="flex items-center justify-between p-4 text-black">
          <Typography
            variant="h6"
            component="h1"
            className="text-lg font-semibold text-black dark:text-white"
          >
            Create new Quizz
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className="bg-black text-yellow-500 text-sm"
            onClick={addQuestion}
          >
            Add Question
          </Button>
        </header>
        <main className="flex-grow overflow-auto ">
          {questions.map((question, index) => (
            <Question key={question.id} question={question} index={index} />
          ))}
        </main>
        <div className="flex justify-end mt-4 gap-4">
          <Button
            variant="contained"
            color="primary"
            className="bg-black text-yellow-500 text-sm"
          >
            Finish Quizz
          </Button>
          <BackButton title="Cancel" icon={false} />
        </div>
      </div>
    </>
  );
};
export default QuizzCreation;
