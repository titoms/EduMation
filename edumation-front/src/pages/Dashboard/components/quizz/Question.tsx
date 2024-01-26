import {
  Card,
  CardHeader,
  CardContent,
  Checkbox,
  FormControlLabel,
} from '@mui/material';

const Question = ({ question, index }) => {
  return (
    <Card className="w-full p-2 mt-4">
      <CardHeader
        title={`Question ${index + 1}`}
        titleTypographyProps={{ className: 'font-bold' }}
      />
      <CardContent>
        <div className="space-y-2 flex flex-col">
          {question.choices.map((choice, idx) => (
            <FormControlLabel
              key={idx}
              control={<Checkbox />}
              label={choice}
              className="flex items-center gap-2"
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Question;
