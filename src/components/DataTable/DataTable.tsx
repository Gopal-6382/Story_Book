// src/components/DataTable/DataTable.tsx
import { useState, useMemo, useCallback } from 'react';
import { clsx } from 'clsx';
import { ChevronUp, ChevronDown, Loader2, AlertCircle } from 'lucide-react';
import type { DataTableProps, SortDirection } from '../../types';
import { sortData } from '../../utils';

function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  rowKey,
  className = '',
}: DataTableProps<T>) {
  const [sortState, setSortState] = useState<{
    column: keyof T | null;
    direction: SortDirection;
  }>({ column: null, direction: null });
  const [selectedRows, setSelectedRows] = useState<T[]>([]);

  const handleSort = useCallback((columnKey: keyof T) => {
    setSortState(prev => {
      if (prev.column !== columnKey) {
        return { column: columnKey, direction: 'asc' };
      }

      switch (prev.direction) {
        case 'asc': return { column: columnKey, direction: 'desc' };
        case 'desc': return { column: null, direction: null };
        default: return { column: columnKey, direction: 'asc' };
      }
    });
  }, []);

  const sortedData = useMemo(() => {
    if (!sortState.column || !sortState.direction) return data;
    return sortData(data, sortState.column, sortState.direction);
  }, [data, sortState]);

  const toggleRowSelection = useCallback((row: T) => {
    setSelectedRows(prev => {
      const isSelected = prev.includes(row);
      const newSelectedRows = isSelected
        ? prev.filter(r => r !== row)
        : [...prev, row];

      onRowSelect?.(newSelectedRows);
      return newSelectedRows;
    });
  }, [onRowSelect]);

  const toggleSelectAll = useCallback(() => {
    const newSelectedRows = selectedRows.length === sortedData.length ? [] : [...sortedData];
    setSelectedRows(newSelectedRows);
    onRowSelect?.(newSelectedRows);
  }, [sortedData, selectedRows.length, onRowSelect]);

  const getRowKey = useCallback((row: T, index: number): string => {
    return rowKey && row[rowKey] ? String(row[rowKey]) : `row-${index}`;
  }, [rowKey]);

  const renderSortIndicator = (columnKey: keyof T) => {
    if (sortState.column !== columnKey) return null;
    return sortState.direction === 'asc' ? (
      <ChevronUp className="h-4 w-4 inline" />
    ) : (
      <ChevronDown className="h-4 w-4 inline" />
    );
  };

  const renderCellContent = (column: any, row: T) => {
    if (column.render) {
      return column.render(row[column.dataIndex], row);
    }
    const value = row[column.dataIndex];
    return value != null ? String(value) : '—';
  };

  if (loading) {
    return (
      <div className={clsx('w-full overflow-x-auto', className)}>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {selectable && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                  <div className="h-4 bg-gray-200 rounded" />
                </th>
              )}
              {columns.map((_, idx) => (
                <th key={idx} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="h-4 bg-gray-200 rounded" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, idx) => (
              <tr key={idx}>
                {selectable && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded" />
                  </td>
                )}
                {columns.map((_, colIdx) => (
                  <td key={colIdx} className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={selectedRows.length === sortedData.length}
                  onChange={toggleSelectAll}
                  aria-label="Select all rows"
                />
              </th>
            )}
            {columns.map(column => (
              <th
                key={String(column.key)}
                className={clsx(
                  'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                  column.sortable && 'cursor-pointer hover:bg-gray-100'
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
                className={clsx('hover:bg-gray-50', isSelected && 'bg-blue-50')}
              >
                {selectable && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={isSelected}
                      onChange={() => toggleRowSelection(row)}
                      aria-label={`Select row ${index + 1}`}
                    />
                  </td>
                )}
                {columns.map(column => (
                  <td
                    key={String(column.key)}
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