import React from 'react';
import { IconButton, Link } from '@mui/material';
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
      <Link to={quiz._id}>
        <h3 className="text-lg font-semibold hover:text-gray-400">
          {quiz.title}
        </h3>
      </Link>
      <p>{quiz.description}</p>
      <ul>
        {quiz.questions.map((question, index) => (
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
        <Link to={quiz._id}>
          <IconButton
            className="text-black dark:text-gray-200"
            aria-label="share"
          >
            <EditIcon sx={{ color: '#3dc8eb' }} />
          </IconButton>
        </Link>
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
