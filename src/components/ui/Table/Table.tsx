import { cn } from '../../../utils/cn';
import type { 
  TableProps, 
  TableHeaderProps, 
  TableBodyProps, 
  TableRowProps, 
  TableCellProps 
} from './Table.types';
import { DEFAULT_CLASS_NAME } from './Table.constants';
import { 
  getTableStyles,
  getTableHeaderStyles,
  getTableBodyStyles,
  getTableRowStyles,
  getTableCellStyles,
  TABLE_HEADER_CELL_STYLES
} from './Table.styles';

export function Table({ children, className = DEFAULT_CLASS_NAME }: TableProps) {
  const tableStyles = getTableStyles(className);
  
  return (
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
      <table className={cn(tableStyles)}>
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ children, className = DEFAULT_CLASS_NAME }: TableHeaderProps) {
  const headerStyles = getTableHeaderStyles(className);
  
  return (
    <thead className={cn(headerStyles)}>
      {children}
    </thead>
  );
}

export function TableBody({ children, className = DEFAULT_CLASS_NAME }: TableBodyProps) {
  const bodyStyles = getTableBodyStyles(className);
  
  return (
    <tbody className={cn(bodyStyles)}>
      {children}
    </tbody>
  );
}

export function TableRow({ children, className = DEFAULT_CLASS_NAME }: TableRowProps) {
  const rowStyles = getTableRowStyles(className);
  
  return (
    <tr className={cn(rowStyles)}>
      {children}
    </tr>
  );
}

export function TableCell({ children, className = DEFAULT_CLASS_NAME }: TableCellProps) {
  const cellStyles = getTableCellStyles(className);
  
  return (
    <td className={cn(cellStyles)}>
      {children}
    </td>
  );
}

export function TableHeaderCell({ children, className = DEFAULT_CLASS_NAME }: TableCellProps) {
  return (
    <th className={cn(TABLE_HEADER_CELL_STYLES, className)}>
      {children}
    </th>
  );
}