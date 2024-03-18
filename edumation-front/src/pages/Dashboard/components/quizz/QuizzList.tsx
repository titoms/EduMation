import React, { useState, useEffect } from 'react';
import { Grid, Skeleton } from '@mui/material';
import QuizzService from '../../../../services/QuizzService';
import { Quiz } from '../../../../services/Types';
import DeleteConfirmationModal from '../../../../components/DeleteConfirmationModal';
import { toast } from 'react-toastify';
import QuizzCard from './QuizzCard';

interface QuizzListProps {
  filter: string;
}

const QuizzList: React.FC<QuizzListProps> = ({ filter }) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedQuizzId, setSelectedQuizzId] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await QuizzService.getAllQuizz();
        const filteredQuizz = response.data.filter((quizz) =>
          quizz.title.toLowerCase().includes(filter.toLowerCase())
        );
        setQuizzes(filteredQuizz);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch quizzes:', error);
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [filter]);

  const handleOpenDelete = (quizzId: string) => {
    setSelectedQuizzId(quizzId);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => setOpenDelete(false);

  const handleDeleteQuizz = async () => {
    if (!selectedQuizzId) return;
    try {
      await QuizzService.deleteQuizz(selectedQuizzId);
      setQuizzes(quizzes.filter((quiz) => quiz._id !== selectedQuizzId));
      toast.success('Quizz deleted successfully');
    } catch (error) {
      toast.error('Failed to delete quizz');
      console.error(error);
    } finally {
      handleCloseDelete();
    }
  };

  if (loading) {
    return (
      <>
        <Skeleton variant="text" height={60} />
        <Grid container spacing={2}>
          {[...new Array(2)].map((_, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Skeleton variant="rounded" height={300} />
            </Grid>
          ))}
        </Grid>
      </>
    );
  }

  return (
    <>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {quizzes.map((quiz) => (
          <QuizzCard
            key={quiz._id}
            quiz={quiz}
            onOpenDelete={handleOpenDelete}
          />
        ))}
      </div>

      {selectedQuizzId && (
        <DeleteConfirmationModal
          open={openDelete}
          onClose={handleCloseDelete}
          onDelete={handleDeleteQuizz}
          itemId={selectedQuizzId}
          confirmationMessage="Are you sure you want to delete this quizz?"
        />
      )}
    </>
  );
};

export default QuizzList;
