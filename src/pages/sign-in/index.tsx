import SplitText from '@/components/animation/SplitText';

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from '@/components/ui';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router';

const formSchema = z.object({
  email: z.email({
    error: '올바른 형식의 이메일을 입력해주세요.',
  }),
  password: z.string().min(8, {
    error: '비밀번호는 최소 8자 이상이어야 합니다.',
  }),
});

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

export default function SignIn() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = () => console.log('로그인 버튼 클릭!');

  return (
    <div className="w-full h-full h-screen flex items-center justify-center bg-white">
      <div className="w-100 max-w-100 flex flex-col items-center justify-center gap-3 px-12">
        {/* 로고 이미지 */}
        <div className="w-30 h-30 flex items-center justify-center cursor-pointer hover:mb-6 transition-all duration-300">
          <img src="/assets/hehe.svg" alt="@LOGO" />
        </div>

        {/* SplitText 애니메이션 텍스트 */}
        <SplitText
          text="he he"
          className="text-4xl font-semibold text-brand text-center text-[#87CEEB]"
          delay={300}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
          onLetterAnimationComplete={handleAnimationComplete}
        />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-5 mt-8"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="이메일"
                      {...field}
                      className="border-[#87CEEB] border-2 rounded-2xl focus-visible:ring-[#4FC3F7] focus-visible:border-[#4FC3F7] placeholder:text-sm pl-4"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="비밀번호"
                      {...field}
                      className="border-[#87CEEB] border-2 rounded-2xl focus-visible:ring-[#4FC3F7] focus-visible:border-[#4FC3F7] placeholder:text-sm pl-4"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-1/2 m-auto mt-8">
              <Button
                type="submit"
                variant={'outline'}
                className="!bg-[#87CEEB] w-full rounded-2xl cursor-pointer py-4 text-base text-white font-bold
                transition-transform duration-300 ease-in-out hover:scale-110"
              >
                로그인
              </Button>
              <div className="text-center mt-2 text-xs text-[#87CEEB]">
                계정이 없으신가요?
                <NavLink to={'/sign-up'} className="ml-1 underline">
                  회원가입
                </NavLink>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
