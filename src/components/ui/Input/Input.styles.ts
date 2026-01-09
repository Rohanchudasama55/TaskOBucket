export const getInputStyles = (
  error?: string,
  leftIcon?: React.ReactNode,
  rightIcon?: React.ReactNode,
  showPasswordToggle?: boolean,
  className?: string
): string => {
  const baseClasses = 'block w-full rounded-xl border px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1';
  
  const errorClasses = error 
    ? 'border-red-300 text-red-900 placeholder-red-400 focus:ring-red-500 focus:border-red-500'
    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500';
  
  const iconClasses = [
    leftIcon && 'pl-10',
    (rightIcon || showPasswordToggle) && 'pr-10'
  ].filter(Boolean);

  return [
    baseClasses,
    errorClasses,
    ...iconClasses,
    className
  ].filter(Boolean).join(' ');
};

export const LABEL_STYLES = "block text-sm font-medium text-gray-700 mb-2";
export const ICON_CONTAINER_STYLES = "text-gray-400";
export const LEFT_ICON_STYLES = "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none";
export const RIGHT_ICON_STYLES = "absolute inset-y-0 right-0 pr-3 flex items-center";
export const PASSWORD_TOGGLE_STYLES = "text-gray-400 hover:text-gray-600 focus:outline-none";
export const ERROR_TEXT_STYLES = "mt-2 text-sm text-red-600 flex items-center";
export const HELPER_TEXT_STYLES = "mt-2 text-sm text-gray-500";