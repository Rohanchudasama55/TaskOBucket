import { cn } from "../../../utils/cn";
import type { ButtonProps } from './Button.types';
import { DEFAULT_VARIANT, DEFAULT_SIZE, DEFAULT_FULL_WIDTH } from './Button.constants';
import { getButtonStyles } from './Button.styles';

export const Button = ({
  variant = DEFAULT_VARIANT,
  size = DEFAULT_SIZE,
  fullWidth = DEFAULT_FULL_WIDTH,
  className,
  children,
  ...props
}: ButtonProps) => {
  const buttonStyles = getButtonStyles(variant, size, fullWidth, className);

  return (
    <button
      className={cn(buttonStyles)}
      {...props}
    >
      {children}
    </button>
  );
};