// src/types.ts

// Define SortDirection type
export type SortDirection = 'asc' | 'desc' | null;

// Define the Column interface
export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
  width?: string | number;
  render?: (value: any, row: T) => React.ReactNode;
}

// Define the DataTableProps interface
export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  rowKey?: keyof T;
  className?: string;
}

// Define the InputFieldProps interface using Omit to fix the type conflict
export interface InputFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  invalid?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  showClearButton?: boolean;
  loading?: boolean;
}