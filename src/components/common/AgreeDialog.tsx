import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Label,
  Separator,
  Checkbox,
  Button,
} from '@/components/ui';
import { Asterisk, ChevronRight } from 'lucide-react';

interface Props {
  children: React.ReactNode;
  agreements: {
    service: boolean;
    privacy: boolean;
    marketing: boolean;
  };
  onToggle: (key: keyof Props['agreements']) => void;
}

function AgreeDialog({ children, agreements, onToggle }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>약관 동의</DialogTitle>
          <DialogDescription>
            회원가입을 위해 필수 항목을 동의해주세요.
          </DialogDescription>

          {/* 필수 동의 */}
          <div className="grid gap-2 mt-4">
            <div className="flex items-center gap-1">
              <Asterisk className="text-[#F96859]" />
              <Label>필수 동의 항목</Label>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Checkbox
                    className="w-[18px] h-[18px]"
                    checked={agreements.service}
                    onCheckedChange={() => onToggle('service')}
                  />
                  서비스 이용약관 동의
                </div>
                <Button variant="link" className="gap-1 !p-0 text-xs">
                  자세히 보기 <ChevronRight />
                </Button>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Checkbox
                    className="w-[18px] h-[18px]"
                    checked={agreements.privacy}
                    onCheckedChange={() => onToggle('privacy')}
                  />
                  개인정보 수집 및 이용 동의
                </div>
                <Button variant="link" className="gap-1 !p-0 text-xs">
                  자세히 보기 <ChevronRight />
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          {/* 선택 동의 */}
          <div className="grid gap-2 mt-4">
            <Label>선택 동의 항목</Label>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Checkbox
                  className="w-[18px] h-[18px]"
                  checked={agreements.marketing}
                  onCheckedChange={() => onToggle('marketing')}
                />
                마케팅 및 광고 수신 동의
              </div>
              <Button variant="link" className="gap-1 !p-0 text-xs">
                자세히 보기 <ChevronRight />
              </Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export { AgreeDialog };
