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
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { AgreeDialog } from '@/components/common';
import supabase from '@/lib/supabase';
import { toast } from 'sonner';

const formSchema = z
  .object({
    email: z.email({
      error: '올바른 형식의 이메일을 입력해주세요.',
    }),
    password: z.string().min(8, {
      error: '비밀번호는 최소 8자 이상이어야 합니다.',
    }),
    confirmPassword: z.string().min(8, {
      error: '비밀번호 확인을 입력해주세요.',
    }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: '비밀번호가 일치하지 않습니다.',
        path: ['confirmPassword'],
      });
    }
  });

export default function SignUp() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const [agreements, setAgreements] = useState({
    service: false,
    privacy: false,
    marketing: false,
  });

  const toggleAgreement = (key: keyof typeof agreements) => {
    setAgreements((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!agreements.service || !agreements.privacy) {
      toast.warning('필수 동의항목을 체크해주세요.');
      return;
    }
    try {
      // supabase api와의 연동에서 발생하는 에러
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          emailRedirectTo: 'https://example.com/welcome',
        },
      });

      if (error) {
        return;
      }
      if (data) {
        toast.success('회원가입을 완료하였습니다.');
        navigate('/sign-in');
      }
    } catch (error) {
      // 자바스크립트가 실행될 때 런타임에서 잡히는 에러
      console.log(error);
      throw new Error();
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-white">
      <div className="w-100 max-w-100 flex flex-col items-center justify-center gap-3 px-12">
        <div className="w-12 h-12 flex items-center justify-center cursor-pointer hover:mb-6 transition-all duration-300">
          <img src="/assets/hehe.svg" alt="@LOGO" />
        </div>
        <h1 className="text-[#87CEEB] mt-4 text-lg font-bold">회원가입</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-5"
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="비밀번호 확인"
                      {...field}
                      className="border-[#87CEEB] border-2 rounded-2xl focus-visible:ring-[#4FC3F7] focus-visible:border-[#4FC3F7] placeholder:text-sm pl-4"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AgreeDialog agreements={agreements} onToggle={toggleAgreement}>
              <Button
                type="button"
                variant={'outline'}
                className="!bg-[#87CEEB] w-full
            rounded-2xl cursor-pointer py-4 text-base text-white font-bold
                transition-transform duration-300 ease-in-out hover:scale-110"
              >
                약관 동의
              </Button>
            </AgreeDialog>

            <div className="w-full flex items-center gap-8 mt-8">
              <Button
                type="button"
                variant={'outline'}
                size={'icon'}
                className="!bg-[#87CEEB] text-white rounded-2xl cursor-pointer
                transition-transform duration-300 ease-in-out hover:scale-120"
                onClick={() => navigate('/sign-in')}
              >
                <ArrowLeft />
              </Button>
              <Button
                type="submit"
                variant={'outline'}
                className="!bg-[#87CEEB] flex-1 rounded-2xl cursor-pointer py-4 text-base text-white font-bold
                transition-transform duration-300 ease-in-out hover:scale-110"
              >
                회원가입
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
