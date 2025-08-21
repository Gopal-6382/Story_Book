// src/utils.ts
export function sortData<T>(data: T[], key: keyof T, direction: 'asc' | 'desc'): T[] {
  return [...data].sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];
    
    if (aValue === bValue) return 0;
    
    const modifier = direction === 'asc' ? 1 : -1;
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return (aValue - bValue) * modifier;
    }
    
    return String(aValue).localeCompare(String(bValue)) * modifier;
  });
}