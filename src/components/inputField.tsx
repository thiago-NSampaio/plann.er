import { ComponentProps, ReactNode } from "react";

interface InputFieldProps extends ComponentProps<"input"> {
  children: ReactNode;
}

export function InputField({ children, ...rest }: InputFieldProps) {
  return (
    <div className="h-14 px-5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
      {children}
      <input
        {...rest}
        className="bg-transparent text-lg placeholder-zinc-200 flex-1 outline-none focus:outline-none"
      />
    </div>
  );
}
