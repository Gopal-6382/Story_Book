import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DataTable from './DataTable';

interface TestData {
  id: number;
  name: string;
  email: string;
  age: number;
}

const testData: TestData[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35 },
];

const columns = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
];

describe('DataTable', () => {
  test('renders table with data', () => {
    render(<DataTable data={testData} columns={columns} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('35')).toBeInTheDocument();
  });

  test('sorts data when column header is clicked', async () => {
    const user = userEvent.setup();
    render(<DataTable data={testData} columns={columns} />);
    
    // Click name column to sort ascending
    const nameHeader = screen.getByText('Name');
    await user.click(nameHeader);
    
    // Get all name cells and check if they're sorted
    const nameCells = screen.getAllByRole('cell', { name: /John Doe|Jane Smith|Bob Johnson/ });
    expect(nameCells[0]).toHaveTextContent('Bob Johnson'); // Sorted ascending
    
    // Click again to sort descending
    await user.click(nameHeader);
    const nameCellsDesc = screen.getAllByRole('cell', { name: /John Doe|Jane Smith|Bob Johnson/ });
    expect(nameCellsDesc[0]).toHaveTextContent('John Doe'); // Sorted descending
  });

  test('shows loading state', () => {
    render(<DataTable data={[]} columns={columns} loading={true} />);
    
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('shows empty state', () => {
    render(<DataTable data={[]} columns={columns} loading={false} />);
    
    expect(screen.getByText('No data found')).toBeInTheDocument();
    expect(screen.getByText('There are no records to display.')).toBeInTheDocument();
  });

  test('selects rows when selectable', async () => {
    const user = userEvent.setup();
    const handleRowSelect = jest.fn();
    
    render(
      <DataTable
        data={testData}
        columns={columns}
        selectable={true}
        onRowSelect={handleRowSelect}
      />
    );
    
    // Select first row
    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[1]); // First data row checkbox
    
    expect(handleRowSelect).toHaveBeenCalledWith([testData[0]]);
    
    // Select all rows
    await user.click(checkboxes[0]); // Select all checkbox
    expect(handleRowSelect).toHaveBeenCalledWith(testData);
  });

  test('renders custom cell content', () => {
    const customColumns = [
      ...columns,
      {
        key: 'actions',
        title: 'Actions',
        dataIndex: 'id',
        render: (value: number) => <button>Edit {value}</button>,
      },
    ];
    
    render(<DataTable data={testData} columns={customColumns} />);
    
    expect(screen.getByText('Edit 1')).toBeInTheDocument();
    expect(screen.getByText('Edit 2')).toBeInTheDocument();
    expect(screen.getByText('Edit 3')).toBeInTheDocument();
  });
});