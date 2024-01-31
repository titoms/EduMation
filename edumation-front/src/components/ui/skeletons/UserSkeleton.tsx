import { Grid, Skeleton } from '@mui/material';

const UserSkeleton = () => (
  <>
    <Skeleton variant="text" height={60} />
    <Grid container spacing={2} className="mb-4 w-full">
      <Grid item xs={12} md={6} xl={4}>
        <Skeleton variant="rounded" height={300} />
      </Grid>
      <Grid item xs={12} md={6} xl={4}>
        <Skeleton variant="rounded" height={300} />
      </Grid>
    </Grid>
  </>
);
export default UserSkeleton;
