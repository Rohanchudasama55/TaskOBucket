export const TABLE_STYLES = 'min-w-full divide-y divide-gray-200';
export const TABLE_HEADER_STYLES = 'bg-gray-50';
export const TABLE_BODY_STYLES = 'bg-white divide-y divide-gray-200';
export const TABLE_ROW_STYLES = '';
export const TABLE_CELL_STYLES = 'px-6 py-4 whitespace-nowrap text-sm text-gray-900';
export const TABLE_HEADER_CELL_STYLES = 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider';

export const getTableStyles = (className?: string): string => {
  return [TABLE_STYLES, className].filter(Boolean).join(' ');
};

export const getTableHeaderStyles = (className?: string): string => {
  return [TABLE_HEADER_STYLES, className].filter(Boolean).join(' ');
};

export const getTableBodyStyles = (className?: string): string => {
  return [TABLE_BODY_STYLES, className].filter(Boolean).join(' ');
};

export const getTableRowStyles = (className?: string): string => {
  return [TABLE_ROW_STYLES, className].filter(Boolean).join(' ');
};

export const getTableCellStyles = (className?: string): string => {
  return [TABLE_CELL_STYLES, className].filter(Boolean).join(' ');
};