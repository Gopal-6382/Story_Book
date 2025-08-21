import React, { useState } from 'react';
import InputField from './components/InputField';
import DataTable from './components/DataTable';
import type { Column } from './types';
import "./index.css"
// Define user interface for DataTable
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
  department: string;
}

function App() {
  // State for InputField examples
  const [textValue, setTextValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  // State for DataTable
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  // Sample data for DataTable
  const userData: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', lastLogin: '2024-01-15', department: 'Engineering' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active', lastLogin: '2024-01-14', department: 'Marketing' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'inactive', lastLogin: '2024-01-10', department: 'Content' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'active', lastLogin: '2024-01-16', department: 'Sales' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'inactive', lastLogin: '2024-01-05', department: 'Support' },
  ];

  // Filter data based on search
  const filteredData = userData.filter(user => 
    user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
    user.department.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Column definitions for DataTable
  const columns: Column<User>[] = [
    { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
    { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
    { key: 'role', title: 'Role', dataIndex: 'role', sortable: true },
    { 
      key: 'status', 
      title: 'Status', 
      dataIndex: 'status', 
      sortable: true,
      render: (value) => (
        <span className={`px-2 py-1 text-xs rounded-full ${
          value === 'active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      )
    },
    { key: 'department', title: 'Department', dataIndex: 'department', sortable: true },
    { key: 'lastLogin', title: 'Last Login', dataIndex: 'lastLogin', sortable: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            React Components Demo
          </h1>
          <p className="text-gray-600 mt-3 text-lg">
            Professional implementation of InputField and DataTable components
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* InputField Examples */}
          <div className="space-y-8">
            <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                InputField Component
              </h2>
              
              <div className="space-y-6">
                <InputField
                  label="Basic Text Input"
                  value={textValue}
                  onChange={(e) => setTextValue(e.target.value)}
                  placeholder="Enter your name"
                  helperText="This is a basic text input field"
                />

                <InputField
                  label="Email Input"
                  type="email"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  placeholder="user@example.com"
                  helperText="We'll never share your email"
                />

                <InputField
                  label="Password Input"
                  type="password"
                  value={passwordValue}
                  onChange={(e) => setPasswordValue(e.target.value)}
                  placeholder="Enter your password"
                  helperText="Use a strong password"
                />

                <InputField
                  label="Search with Clear Button"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search..."
                  showClearButton={true}
                  helperText="Try typing something and then clear it"
                />

                <InputField
                  label="Disabled Input"
                  defaultValue="Cannot edit this value"
                  disabled={true}
                  helperText="This field is disabled"
                />

                <InputField
                  label="Invalid Input"
                  defaultValue="wrong@format"
                  invalid={true}
                  errorMessage="Please enter a valid email address"
                  helperText="This field shows error state"
                />

                <InputField
                  label="Loading Input"
                  placeholder="Loading content..."
                  loading={true}
                  helperText="This field is in loading state"
                />
              </div>
            </section>

            <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                InputField Variants & Sizes
              </h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <InputField
                    label="Filled (sm)"
                    variant="filled"
                    size="sm"
                    placeholder="Small filled input"
                  />
                  <InputField
                    label="Outlined (md)"
                    variant="outlined"
                    size="md"
                    placeholder="Medium outlined input"
                  />
                  <InputField
                    label="Ghost (lg)"
                    variant="ghost"
                    size="lg"
                    placeholder="Large ghost input"
                  />
                </div>
              </div>
            </section>
          </div>

          {/* DataTable Example */}
          <div className="space-y-8">
            <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                DataTable Component
              </h2>
              
              <div className="mb-6">
                <InputField
                  label="Search Users"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search by name, email, or department"
                  variant="filled"
                  showClearButton={true}
                />
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <DataTable
                  data={filteredData}
                  columns={columns}
                  selectable={true}
                  onRowSelect={setSelectedUsers}
                  rowKey="id"
                />
              </div>

              {selectedUsers.length > 0 && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h3 className="font-medium text-blue-800 flex items-center">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">
                      {selectedUsers.length}
                    </span>
                    Selected Users
                  </h3>
                  <ul className="mt-3 text-sm text-blue-700 space-y-1">
                    {selectedUsers.map(user => (
                      <li key={user.id} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                        {user.name} ({user.email}) - {user.department}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                Component Features
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-800 text-lg mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    InputField Features
                  </h3>
                  <ul className="text-sm text-green-700 space-y-2">
                    <li className="flex items-center">✓ Multiple variants (filled, outlined, ghost)</li>
                    <li className="flex items-center">✓ Three sizes (sm, md, lg)</li>
                    <li className="flex items-center">✓ Validation states</li>
                    <li className="flex items-center">✓ Password visibility toggle</li>
                    <li className="flex items-center">✓ Clear button option</li>
                    <li className="flex items-center">✓ Loading state</li>
                    <li className="flex items-center">✓ Full accessibility support</li>
                  </ul>
                </div>

                <div className="p-5 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg border border-purple-200">
                  <h3 className="font-semibold text-purple-800 text-lg mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    DataTable Features
                  </h3>
                  <ul className="text-sm text-purple-700 space-y-2">
                    <li className="flex items-center">✓ Column sorting</li>
                    <li className="flex items-center">✓ Row selection (single/multiple)</li>
                    <li className="flex items-center">✓ Loading state with skeletons</li>
                    <li className="flex items-center">✓ Empty state handling</li>
                    <li className="flex items-center">✓ Custom cell rendering</li>
                    <li className="flex items-center">✓ Responsive design</li>
                    <li className="flex items-center">✓ TypeScript generics support</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>

        <footer className="mt-16 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-500 mb-2">
            Built with React, TypeScript, TailwindCSS, and Storybook
          </p>
          <div className="flex justify-center space-x-4">
            <span className="text-sm text-gray-400">Fully accessible</span>
            <span className="text-sm text-gray-400">•</span>
            <span className="text-sm text-gray-400">Responsive design</span>
            <span className="text-sm text-gray-400">•</span>
            <span className="text-sm text-gray-400">Production ready</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;