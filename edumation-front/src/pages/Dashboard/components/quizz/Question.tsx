import {
  Card,
  CardContent,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link as RouterLink } from 'react-router-dom';

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
    <Card className="bg-white dark:bg-slate-800 text-black dark:text-white mt-4 p-4">
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
      <div className="mt-4 flex justify-end items-end">
        <IconButton
          className="text-black dark:text-gray-200"
          aria-label="share"
          onClick={() => eraseQuestion(question.id)}
        >
          <DeleteIcon sx={{ color: '#e63535' }} />
        </IconButton>
      </div>
    </Card>
  );
};

export default Question;
