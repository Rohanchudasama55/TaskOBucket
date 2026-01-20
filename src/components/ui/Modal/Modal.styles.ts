export const getModalBackdropStyles = (className?: string): string => {
  const baseStyles = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50';
  
  return [baseStyles, className].filter(Boolean).join(' ');
};

 export const MODAL_CONTENT_STYLES = 'relative max-w-lg w-full max-h-full ';