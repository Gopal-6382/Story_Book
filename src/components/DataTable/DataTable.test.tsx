import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DataTable from './DataTable'
import { Column } from '../../types'; 
// Adjust the path as neede

interface TestData {
  id: number
  name: string
  email: string
  age: number
}

const testData: TestData[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35 },
]

// Corrected type definition for the columns array
const columns: Column<TestData>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
];


describe('DataTable', () => {
  // ... (existing tests)

  test('renders custom cell content', () => {
    // Explicitly type the customColumns array to fix the type error
    const customColumns: Column<TestData>[] = [
      ...columns,
      {
        key: 'actions',
        title: 'Actions',
        dataIndex: 'id', // Now correctly typed as 'id' is a key of TestData
        render: (value: number) => <button>Edit {value}</button>,
      },
    ]
    
    render(<DataTable data={testData} columns={customColumns} />)
    
    expect(screen.getByText('Edit 1')).toBeInTheDocument()
    expect(screen.getByText('Edit 2')).toBeInTheDocument()
    expect(screen.getByText('Edit 3')).toBeInTheDocument()
  })
})