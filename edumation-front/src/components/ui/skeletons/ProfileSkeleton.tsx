import { Skeleton } from '@mui/material';

const ProfileSkeleton = () => (
  <>
    <Skeleton variant="text" height={60} />
    <Skeleton variant="rounded" height={200} />
  </>
);
export default ProfileSkeleton;
