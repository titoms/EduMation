import { Grid, Skeleton } from '@mui/material';

const ScheduleSkeleton = () => (
  <>
    <Skeleton variant="text" height={60} />
    <div className="flex flex-row">
      <Skeleton className="mr-3" variant="rectangular" height={50} width={50} />
      <Skeleton className="mr-3" variant="rectangular" height={50} width={50} />
      <Skeleton
        className="mr-3"
        variant="rectangular"
        height={50}
        width={150}
      />
    </div>
    <div className="mt-4 ">
      <Grid container spacing={2} className="w-full">
        <Grid item xs={2}>
          <Skeleton variant="rounded" height={100} />
        </Grid>
        <Grid item xs={2}>
          <Skeleton variant="rounded" height={100} />
        </Grid>
        <Grid item xs={2}>
          <Skeleton variant="rounded" height={100} />
        </Grid>
        <Grid item xs={2}>
          <Skeleton variant="rounded" height={100} />
        </Grid>
        <Grid item xs={2}>
          <Skeleton variant="rounded" height={100} />
        </Grid>
        <Grid item xs={2}>
          <Skeleton variant="rounded" height={100} />
        </Grid>
      </Grid>
    </div>
    <div className="mt-4 ">
      <Grid container spacing={2} className="w-full">
        <Grid item xs={2}>
          <Skeleton variant="rounded" height={100} />
        </Grid>
        <Grid item xs={2}>
          <Skeleton variant="rounded" height={100} />
        </Grid>
        <Grid item xs={2}>
          <Skeleton variant="rounded" height={100} />
        </Grid>
        <Grid item xs={2}>
          <Skeleton variant="rounded" height={100} />
        </Grid>
        <Grid item xs={2}>
          <Skeleton variant="rounded" height={100} />
        </Grid>
        <Grid item xs={2}>
          <Skeleton variant="rounded" height={100} />
        </Grid>
      </Grid>
    </div>
  </>
);
export default ScheduleSkeleton;
