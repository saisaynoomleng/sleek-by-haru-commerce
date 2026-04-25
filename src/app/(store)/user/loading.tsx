import Bounded from '@/components/shared/Bounded';
import { Skeleton } from '@/components/ui/skeleton';

const loading = () => {
  return (
    <Bounded>
      <div className="flex gap-x-5">
        <Skeleton className="w-100 aspect-square rounded-full" />

        <div className="space-y-2">
          <Skeleton className="w-100 h-3" />
          <Skeleton className="w-100 h-3" />
          <Skeleton className="w-100 h-3" />
        </div>
      </div>
    </Bounded>
  );
};

export default loading;
