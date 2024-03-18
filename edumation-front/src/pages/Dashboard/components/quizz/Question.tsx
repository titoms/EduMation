import {
  Card,
  CardContent,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface Option {
  text: string;
}

interface QuestionProps {
  question: {
    id: number;
    questionText: string;
    options: Option[];
    correctAnswer: number;
  };
  index: number;
  updateQuestion: (index: number, updatedQuestion: any) => void;
  eraseQuestion: (id: number) => void;
}

const Question: React.FC<QuestionProps> = ({
  question,
  index,
  updateQuestion,
  eraseQuestion,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    optionIndex: number
  ) => {
    const updatedOptions = [...question.options];
    updatedOptions[optionIndex].text = e.target.value;
    updateQuestion(index, { ...question, options: updatedOptions });
  };

  const handleCorrectAnswerChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateQuestion(index, {
      ...question,
      correctAnswer: parseInt(event.target.value, 10),
    });
  };

  return (
    <Card className="bg-white dark:bg-slate-800 text-black dark:text-white mt-4">
      <CardContent>
        <div className="flex justify-between align-center items-center">
          <TextField
            label={`Question title `}
            variant="outlined"
            fullWidth
            margin="normal"
            value={question.questionText}
            onChange={(e) =>
              updateQuestion(index, {
                ...question,
                questionText: e.target.value,
              })
            }
          />
          <CloseIcon
            onClick={() => eraseQuestion(question.id)}
            className="cursor-pointer m-2 text-slate-500 dark:text-white hover:text-slate-500 dark:hover:text-slate-400"
          />
        </div>
        <RadioGroup
          value={question.correctAnswer}
          onChange={handleCorrectAnswerChange}
          className="mt-2"
        >
          {question.options.map((choice, idx) => (
            <FormControlLabel
              key={idx}
              value={idx}
              control={<Radio />}
              label={
                <TextField
                  fullWidth
                  variant="outlined"
                  label={`Choice `}
                  value={choice.text}
                  onChange={(e) => handleChange(e, idx)}
                />
              }
            />
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default Question;
