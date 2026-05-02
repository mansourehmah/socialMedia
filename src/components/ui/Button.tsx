import type { FC, PropsWithChildren } from "react";

interface ButtonProps extends PropsWithChildren {
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
}) => {
  return (
    <>
      <button
        onClick={onClick}
        disabled={disabled}
        className="h-11 w-full rounded-xl bg-black text-white font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed">
        {children}
      </button>
    </>
  );
};
