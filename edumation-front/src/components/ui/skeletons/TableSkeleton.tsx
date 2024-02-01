import { Grid, Skeleton } from '@mui/material';

const TableSkeleton = () => (
  <>
    <Grid item xs={12} md={6} xl={4}>
      <Skeleton variant="rounded" height={40} width={120} />
    </Grid>
    <Skeleton variant="text" height={100} />
    <Skeleton variant="rounded" height={300} />
    <Skeleton variant="text" height={100} />
    <Skeleton variant="rounded" height={300} />
  </>
);
export default TableSkeleton;
