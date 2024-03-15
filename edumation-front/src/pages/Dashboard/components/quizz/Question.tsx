import { Card, CardContent, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface QuestionType {
  id: number;
  text: string;
  choices: string[];
}

interface QuestionProps {
  question: QuestionType;
  index: number;
  updateQuestion: (index: number, question: QuestionType) => void;
}

const Question: React.FC<QuestionProps> = ({
  question,
  index,
  updateQuestion,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    optionIndex: number
  ) => {
    const updatedChoices = [...question.choices];
    updatedChoices[optionIndex] = e.target.value;
    updateQuestion(index, { ...question, choices: updatedChoices });
  };

  const handleEraseQuestion = () => {
    console.log('Erase Question');
  };

  return (
    <Card className="w-full bg-white dark:bg-slate-800 text-black dark:text-white p-2 mt-4">
      <CardContent>
        <div className="flex justify-between align-center items-center gap-2">
          <TextField
            label={`Question ${index + 1}`}
            variant="outlined"
            fullWidth
            margin="normal"
            value={question.questionText}
            onChange={(e) => handleChange(e, 'text')}
          />
          <CloseIcon
            onClick={handleEraseQuestion}
            className="m-2 text-slate-500 dark:text-white hover:text-slate-500 dark:hover:text-slate-400"
          />
        </div>
        <div className="space-y-2 flex flex-col">
          {question.choices.map((choice, idx) => (
            <TextField
              key={idx}
              label={`Choice ${idx + 1}`}
              variant="outlined"
              fullWidth
              margin="normal"
              value={''}
              onChange={(e) => handleChange(e, 'option', idx)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Question;
