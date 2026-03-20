import { memo } from "react";
import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export const formatOption = (option: string) =>
  option.charAt(0).toUpperCase() + option.slice(1).toLowerCase();

export const PillSelector = memo(
  ({
    options,
    value,
    onChange,
  }: {
    options: string[];
    value: string;
    onChange: (val: string) => void;
  }) => (
    <div className="flex gap-3 flex-wrap">
      {options.map((option) => {
        const isSelected = value === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={cn(
              "px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border focus:outline-none cursor-pointer",
              isSelected
                ? "bg-[#660b26] text-white border-[#660b26] shadow-lg shadow-[#660b26]/30 ring-2 ring-[#d4af37]/40"
                : "bg-white text-gray-600 border-gray-200 hover:border-[#d4af37] hover:bg-[#d4af37]/5 hover:shadow-md hover:shadow-[#d4af37]/20",
            )}
          >
            {formatOption(option)}
          </button>
        );
      })}
    </div>
  ),
);
PillSelector.displayName = "PillSelector";

// Optimized ControlledSelect with memoization

export const SiblingCounter = memo(
  ({
    label,
    youngerRegister,
    elderRegister,
  }: {
    label: string;
    youngerRegister: any;
    elderRegister?: any;
  }) => (
    <div className="flex flex-col gap-2">
      <PremiumLabel>{label}</PremiumLabel>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <Label className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
            Younger
          </Label>
          <Input
            type="number"
            min={0}
            placeholder="0"
            className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:border-[#d4af37]! focus:ring-2 focus:ring-[#d4af37]/20!"
            {...youngerRegister}
          />
        </div>
        {elderRegister && (
          <div className="flex flex-col gap-1">
            <Label className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
              Elder
            </Label>
            <Input
              type="number"
              min={0}
              placeholder="0"
              className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:border-[#d4af37]! focus:ring-2 focus:ring-[#d4af37]/20!"
              {...elderRegister}
            />
          </div>
        )}
      </div>
    </div>
  ),
);
SiblingCounter.displayName = "SiblingCounter";

// ============================================================
// PREMIUM WRAPPERS
// ============================================================

export const PremiumCard = memo(
  ({ children }: { children: React.ReactNode }) => (
    <Card className="bg-[#fffcfc] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-[#d4af37]/10 rounded-[2rem] overflow-hidden transition-all duration-300 hover:shadow-[0_12px_40px_rgba(212,175,55,0.15)]">
      {children}
    </Card>
  ),
);
PremiumCard.displayName = "PremiumCard";

export const CardHeaderComp = memo(({ title }: { title: string }) => (
  <CardHeader className="gap-0 px-10 py-2">
    <CardTitle className="text-2xl md:text-3xl font-serif text-[#660b26] font-semibold tracking-wide">
      {title}
    </CardTitle>
  </CardHeader>
));
CardHeaderComp.displayName = "CardHeaderComp";

export const PremiumSeparator = memo(() => (
  <Separator className="h-px bg-linear-to-r from-transparent via-[#d4af37]/30 to-transparent" />
));
PremiumSeparator.displayName = "PremiumSeparator";

export const PremiumCardContent = memo(
  ({ children }: { children: React.ReactNode }) => (
    <CardContent className="p-8 md:px-10 md:pb-10 pt-6 flex flex-col gap-8">
      {children}
    </CardContent>
  ),
);
PremiumCardContent.displayName = "PremiumCardContent";

export const ControlledSelect = memo(
  ({
    control,
    name,
    options,
    placeholder,
    formatFn,
  }: {
    control: any;
    name: string;
    options: string[];
    placeholder?: string;
    formatFn?: (opt: string) => string;
  }) => (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-1">
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger
              aria-label={name}
              className={cn(
                "h-12! w-full rounded-xl border bg-gray-50/50 px-4 py-2 text-sm text-gray-800 transition-all focus:bg-white focus:outline-none",
                fieldState.error
                  ? "border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/20"
                  : "border-gray-200 focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 focus:shadow-md focus:shadow-[#d4af37]/10",
              )}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent
              className="max-h-75 rounded-xl border-[#d4af37]/20!"
              position="popper"
              align="start"
            >
              {options.map((option) => (
                <SelectItem
                  key={option}
                  value={option}
                  className="rounded-lg focus:bg-[#d4af37]/10 focus:text-[#660b26] cursor-pointer"
                >
                  {formatFn ? formatFn(option) : option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {fieldState.error && (
            <span className="text-xs text-destructive mt-1">
              {fieldState.error.message}
            </span>
          )}
        </div>
      )}
    />
  ),
);
ControlledSelect.displayName = "ControlledSelect";
export const PremiumLabel = memo(
  ({
    children,
    className,
    required,
    htmlFor,
  }: {
    children: React.ReactNode;
    className?: string;
    required?: boolean;
    htmlFor?: string;
  }) => (
    <Label
      htmlFor={htmlFor}
      className={cn(
        "block text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-1",
        className,
      )}
    >
      {children}{" "}
      {required && <span className="text-[#660b26] text-sm ml-0.5">*</span>}
    </Label>
  ),
);
PremiumLabel.displayName = "PremiumLabel";
export const FormField = memo(
  ({
    label,
    id,
    type = "text",
    placeholder,
    register,
    error,
    required = false,
  }: {
    label: string;
    id: string;
    type?: string;
    placeholder?: string;
    register: any;
    error?: any;
    required?: boolean;
  }) => (
    <div className="flex flex-col gap-1">
      <PremiumLabel htmlFor={id} required={required}>
        {label}
      </PremiumLabel>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        className={cn(
          "h-12 w-full rounded-xl border bg-gray-50/50 px-4 py-2 text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:bg-white focus:outline-none",
          error
            ? "border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/20"
            : "border-gray-200 focus:border-[#d4af37]! focus:ring-2 focus:ring-[#d4af37]/20! focus:shadow-md focus:shadow-[#d4af37]/10",
        )}
        {...register}
      />
      {error && (
        <span className="text-xs text-destructive mt-1">{error.message}</span>
      )}
    </div>
  ),
);
FormField.displayName = "FormField";
