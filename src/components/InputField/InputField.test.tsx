import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputField from './InputField';

describe('InputField', () => {
  test('renders with label', () => {
    render(<InputField label="Test Label" />);
    expect(screen.getByLabelText(/Test Label/i)).toBeInTheDocument();
  });

  test('handles input change', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    
    render(<InputField label="Test Input" onChange={handleChange} />);
    const input = screen.getByLabelText(/Test Input/i);
    
    await user.type(input, 'hello');
    expect(handleChange).toHaveBeenCalledTimes(5);
  });

  test('displays error message when invalid', () => {
    render(
      <InputField
        label="Test Input"
        invalid={true}
        errorMessage="This is an error"
      />
    );
    
    expect(screen.getByText(/This is an error/i)).toBeInTheDocument();
  });

  test('displays helper text', () => {
    render(
      <InputField
        label="Test Input"
        helperText="This is helpful"
      />
    );
    
    expect(screen.getByText(/This is helpful/i)).toBeInTheDocument();
  });

  test('is disabled when disabled prop is true', () => {
    render(<InputField label="Test Input" disabled={true} />);
    const input = screen.getByLabelText(/Test Input/i);
    expect(input).toBeDisabled();
  });

  test('toggles password visibility', async () => {
    const user = userEvent.setup();
    render(<InputField label="Password" type="password" />);
    
    const input = screen.getByLabelText(/Password/i);
    const toggleButton = screen.getByRole('button');
    
    // Initially should be password type
    expect(input).toHaveAttribute('type', 'password');
    
    // Click toggle button
    await user.click(toggleButton);
    expect(input).toHaveAttribute('type', 'text');
    
    // Click again to toggle back
    await user.click(toggleButton);
    expect(input).toHaveAttribute('type', 'password');
  });

  test('clears input when clear button is clicked', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    
    render(
      <InputField
        label="Test Input"
        value="test value"
        onChange={handleChange}
        showClearButton={true}
      />
    );
    
    const clearButton = screen.getByRole('button');
    await user.click(clearButton);
    
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: '',
        }),
      })
    );
  });
});