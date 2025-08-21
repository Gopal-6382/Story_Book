import React, { useState, useMemo } from 'react';
import { clsx } from 'clsx';
import { 
  ChevronUp, 
  ChevronDown, 
  Loader2,
  AlertCircle
} from 'lucide-react';
import type { DataTableProps, SortDirection } from '../../types';
import { sortData } from '../../utils';

function DataTable<T>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  rowKey,
  className = '',
}: DataTableProps<T>) {
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [selectedRows, setSelectedRows] = useState<T[]>([]);

  // Handle column sorting
  const handleSort = (columnKey: keyof T) => {
    if (sortColumn === columnKey) {
      // Cycle through sort directions: asc -> desc -> none
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortColumn(null);
        setSortDirection(null);
      }
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  // Apply sorting to data
  const sortedData = useMemo(() => {
    if (!sortColumn || !sortDirection) return data;
    return sortData(data, sortColumn, sortDirection);
  }, [data, sortColumn, sortDirection]);

  // Handle row selection
  const toggleRowSelection = (row: T) => {
    const isSelected = selectedRows.includes(row);
    let newSelectedRows: T[];

    if (isSelected) {
      newSelectedRows = selectedRows.filter(selectedRow => selectedRow !== row);
    } else {
      newSelectedRows = [...selectedRows, row];
    }

    setSelectedRows(newSelectedRows);
    onRowSelect?.(newSelectedRows);
  };

  // Handle select all
  const toggleSelectAll = () => {
    if (selectedRows.length === sortedData.length) {
      setSelectedRows([]);
      onRowSelect?.([]);
    } else {
      setSelectedRows([...sortedData]);
      onRowSelect?.([...sortedData]);
    }
  };

  // Get unique row identifier
  const getRowKey = (row: T, index: number): string => {
    if (rowKey && row[rowKey]) {
      return String(row[rowKey]);
    }
    return `row-${index}`;
  };

  // Render sort indicator
  const renderSortIndicator = (columnKey: keyof T) => {
    if (sortColumn !== columnKey) return null;
    
    return (
      <span className="ml-1">
        {sortDirection === 'asc' ? (
          <ChevronUp className="h-4 w-4 inline" />
        ) : (
          <ChevronDown className="h-4 w-4 inline" />
        )}
      </span>
    );
  };

  // Render cell content
  const renderCellContent = (column: any, row: T) => {
    if (column.render) {
      return column.render(row[column.dataIndex], row);
    }
    
    const value = row[column.dataIndex];
    return value !== null && value !== undefined ? String(value) : '—';
  };

  if (loading) {
    return (
      <div className={clsx('w-full overflow-x-auto', className)}>
        <div className="min-w-full divide-y divide-gray-200">
          {/* Table header skeleton */}
          <div className="bg-gray-50">
            <div className="grid grid-cols-12 gap-4 px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              {selectable && (
                <div className="col-span-1">
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              )}
              {columns.map((_, index) => (
                <div key={index} className="col-span-1">
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Table body skeleton */}
          {[...Array(5)].map((_, rowIndex) => (
            <div key={rowIndex} className="bg-white animate-pulse">
              <div className="grid grid-cols-12 gap-4 px-6 py-4">
                {selectable && (
                  <div className="col-span-1">
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
                )}
                {columns.map((_, colIndex) => (
                  <div key={colIndex} className="col-span-1">
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={clsx('text-center py-12 px-4', className)}>
        <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No data found</h3>
        <p className="mt-1 text-sm text-gray-500">There are no records to display.</p>
      </div>
    );
  }

  return (
    <div className={clsx('w-full overflow-x-auto', className)}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {selectable && (
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                    checked={selectedRows.length === sortedData.length && sortedData.length > 0}
                    onChange={toggleSelectAll}
                    aria-label="Select all rows"
                  />
                </div>
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={clsx(
                  'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                  column.sortable && 'cursor-pointer hover:bg-gray-100',
                  column.width && 'data-table-column'
                )}
                onClick={() => column.sortable && handleSort(column.dataIndex)}
                style={column.width ? { width: column.width } : undefined}
              >
                <div className="flex items-center">
                  {column.title}
                  {column.sortable && renderSortIndicator(column.dataIndex)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedData.map((row, index) => {
            const isSelected = selectedRows.includes(row);
            const rowId = getRowKey(row, index);
            
            return (
              <tr
                key={rowId}
                className={clsx(
                  'hover:bg-gray-50',
                  isSelected && 'bg-blue-50'
                )}
              >
                {selectable && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                      checked={isSelected}
                      onChange={() => toggleRowSelection(row)}
                      aria-label={`Select row ${index + 1}`}
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td
                    key={`${rowId}-${column.key}`}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {renderCellContent(column, row)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;