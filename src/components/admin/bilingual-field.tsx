import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface BilingualFieldProps {
  labelMr: string;
  labelEn: string;
  valueMr: string;
  valueEn: string;
  onChangeMr: (v: string) => void;
  onChangeEn: (v: string) => void;
  placeholderMr?: string;
  placeholderEn?: string;
  className?: string;
}

export function BilingualField({
  labelMr,
  labelEn,
  valueMr,
  valueEn,
  onChangeMr,
  onChangeEn,
  placeholderMr,
  placeholderEn,
  className,
}: BilingualFieldProps) {
  return (
    <div className={cn("grid gap-3 sm:grid-cols-2", className)}>
      <div className="space-y-1.5">
        <Label className="text-xs text-amber-400/80">{labelMr}</Label>
        <Input
          value={valueMr}
          onChange={(e) => onChangeMr(e.target.value)}
          placeholder={placeholderMr}
          className="border-border/60 bg-background/50 font-[var(--font-devanagari)]"
        />
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">{labelEn}</Label>
        <Input
          value={valueEn}
          onChange={(e) => onChangeEn(e.target.value)}
          placeholder={placeholderEn}
          className="border-border/60 bg-background/50"
        />
      </div>
    </div>
  );
}
