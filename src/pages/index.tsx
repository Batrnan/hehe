import { AppSidebar } from '@/components/common/AppSidebar';
import { Skeleton } from '@/components/ui';

function Topics() {
  return (
    <div className="w-full h-screen flex pl-0 p-16">
      <AppSidebar />
      <section className="flex-1 flex flex-col pl-12">
        <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight mb-8">
          인기 글
        </h1>
        <div className="grid grid-cols-3 gap-8">
          <Skeleton className="w-full h-70" />
          <Skeleton className="w-full h-70" />
          <Skeleton className="w-full h-70" />
          <Skeleton className="w-full h-70" />
          <Skeleton className="w-full h-70" />
          <Skeleton className="w-full h-70" />
        </div>
      </section>
    </div>
  );
}
export default Topics;
