import React from 'react';
import { IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Quiz } from '../../../../services/Types';

interface QuizzCardProps {
  quiz: Quiz;
  onOpenDelete: (id: string) => void;
}

const QuizzCard: React.FC<QuizzCardProps> = ({ quiz, onOpenDelete }) => {
  return (
    <div
      key={quiz._id}
      className="bg-white dark:bg-slate-800 shadow rounded-lg p-4"
    >
      <RouterLink
        to={`${quiz._id}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
        className="text-center"
      >
        <h3 className="text-xl font-semibold hover:text-gray-400">
          {quiz.title ? quiz.title : 'Quizz Title'}
        </h3>{' '}
        <p className="my-4 hover:text-gray-400">
          {quiz.description ? quiz.description : 'Quizz Description'}
        </p>
      </RouterLink>
      <p className="my-4">{quiz.questions.length} Questions :</p>
      <ul>
        {quiz.questions.slice(0, 1).map((question, index) => (
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
      <RouterLink
        to={`${quiz._id}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
        className="text-center"
      >
        <p className="text-center text-sm hover:text-gray-400"> See more...</p>
      </RouterLink>

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
        <RouterLink to={`${quiz._id}`}>
          <IconButton aria-label="edit">
            <EditIcon sx={{ color: '#3dc8eb' }} />
          </IconButton>
        </RouterLink>
        <IconButton
          className="text-black dark:text-gray-200"
          aria-label="share"
          onClick={() => quiz._id && onOpenDelete(quiz._id)}
        >
          <DeleteIcon sx={{ color: '#e63535' }} />
        </IconButton>
      </div>
    </div>
  );
};

export default QuizzCard;
