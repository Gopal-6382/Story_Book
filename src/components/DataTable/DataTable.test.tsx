import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DataTable from './DataTable'
import { Column } from '../../types'; 

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
  test('renders table with data', () => {
    render(<DataTable data={testData} columns={columns} />)
    
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('jane@example.com')).toBeInTheDocument()
    expect(screen.getByText('35')).toBeInTheDocument()
  })

  test('sorts data when column header is clicked', async () => {
    const user = userEvent.setup()
    render(<DataTable data={testData} columns={columns} />)
    
    const nameHeader = screen.getByText('Name')
    await user.click(nameHeader)
    
    const nameCells = screen.getAllByRole('cell', { name: /John Doe|Jane Smith|Bob Johnson/ })
    expect(nameCells[0]).toHaveTextContent('Bob Johnson')
    
    await user.click(nameHeader)
    const nameCellsDesc = screen.getAllByRole('cell', { name: /John Doe|Jane Smith|Bob Johnson/ })
    expect(nameCellsDesc[0]).toHaveTextContent('John Doe')
  })

  test('shows loading state', () => {
    render(<DataTable data={[]} columns={columns} loading={true} />)
    
    const skeletonElements = document.querySelectorAll('.bg-gray-200.rounded')
    expect(skeletonElements.length).toBeGreaterThan(0)
  })

  test('shows empty state', () => {
    render(<DataTable data={[]} columns={columns} loading={false} />)
    
    expect(screen.getByText('No data found')).toBeInTheDocument()
    expect(screen.getByText('There are no records to display.')).toBeInTheDocument()
  })

  test('selects rows when selectable', async () => {
    const user = userEvent.setup()
    const handleRowSelect = vi.fn()
    
    render(
      <DataTable
        data={testData}
        columns={columns}
        selectable={true}
        onRowSelect={handleRowSelect}
      />
    )
    
    const checkboxes = screen.getAllByRole('checkbox')
    await user.click(checkboxes[1])
    
    expect(handleRowSelect).toHaveBeenCalledWith([testData[0]])
    
    await user.click(checkboxes[0])
    expect(handleRowSelect).toHaveBeenCalledWith(testData)
  })

  test('renders custom cell content', () => {
    // Explicitly type the customColumns array to fix the type error
    const customColumns: Column<TestData>[] = [
      ...columns,
      {
        key: 'actions',
        title: 'Actions',
        dataIndex: 'id', 
        render: (value: number) => <button>Edit {value}</button>,
      },
    ]
    
    render(<DataTable data={testData} columns={customColumns} />)
    
    expect(screen.getByText('Edit 1')).toBeInTheDocument()
    expect(screen.getByText('Edit 2')).toBeInTheDocument()
    expect(screen.getByText('Edit 3')).toBeInTheDocument()
  })
})