import { TOPIC_CATEOGRY } from '@/constants/category.constant';
import { Button } from '../ui';

function AppSidebar() {
  return (
    <aside className="min-w-60 w-60 flex flex-col items-center px-32">
      <div
        className="flex flex-col gap-4 items-center mb-20 rounded-3xl shadow-[0_4px_20px_0_rgba(135,206,235,0.4)] p-8
      hover:scale-110 transition-all duration-300 cursor-pointer"
      >
        <div className="w-20 h-20">
          <img src="/assets/hehe.svg" alt="@PROFILE" />
        </div>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          헤헤
        </h4>
      </div>

      <div className="w-full flex flex-col gap-8 items-center">
        {TOPIC_CATEOGRY.map((menu) => {
          return (
            <Button
              key={menu.id}
              variant={'ghost'}
              className="justify-center text-base font-bold w-30 border border-[#87CEEB] rounded-full cursor-pointer
            text-[#87CEEB] hover:text-white hover:bg-[#87CEEB] transition-all duration-300"
            >
              {menu.label}
            </Button>
          );
        })}
      </div>
    </aside>
  );
}

export { AppSidebar };
