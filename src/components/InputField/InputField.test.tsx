import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import InputField from '../InputField'

describe('InputField', () => {
  test('renders with label', () => {
    render(<InputField label="Test Label" />)
    expect(screen.getByLabelText(/Test Label/i)).toBeInTheDocument()
  })

// src/components/InputField/InputField.test.tsx
test('clears input when clear button is clicked', async () => {
  const user = userEvent.setup();
  const handleChange = vi.fn();
  
  render(
    <InputField
      label="Test Input"
      value="test value" // Changed from defaultValue to value
      onChange={handleChange}
      showClearButton={true}
    />
  );
  
  const clearButton = screen.getByRole('button', { name: /clear input/i });
  await user.click(clearButton);
  
  expect(handleChange).toHaveBeenCalledWith(
    expect.objectContaining({
      target: expect.objectContaining({
        value: '',
      }),
    })
  );
});
  test('displays error message when invalid', () => {
    render(
      <InputField
        label="Test Input"
        invalid={true}
        errorMessage="This is an error"
      />
    )
    
    expect(screen.getByText(/This is an error/i)).toBeInTheDocument()
  })

  test('displays helper text', () => {
    render(
      <InputField
        label="Test Input"
        helperText="This is helpful"
      />
    )
    
    expect(screen.getByText(/This is helpful/i)).toBeInTheDocument()
  })

  test('is disabled when disabled prop is true', () => {
    render(<InputField label="Test Input" disabled={true} />)
    const input = screen.getByLabelText(/Test Input/i)
    expect(input).toBeDisabled()
  })

  test('toggles password visibility', async () => {
    const user = userEvent.setup()
    render(<InputField label="Password" type="password" />)
    
    // Use more specific selector for the input
    const input = screen.getByLabelText('Password', { selector: 'input' })
    // Use the button's aria-label to find it
    const toggleButton = screen.getByRole('button', { name: /show password/i })
    
    // Initially should be password type
    expect(input).toHaveAttribute('type', 'password')
    
    // Click toggle button
    await user.click(toggleButton)
    expect(input).toHaveAttribute('type', 'text')
    
    // Click again to toggle back
    await user.click(toggleButton)
    expect(input).toHaveAttribute('type', 'password')
  })

 // In src/components/InputField/InputField.test.tsx

test('clears input when clear button is clicked', async () => {
  const user = userEvent.setup();
  const handleChange = vi.fn();
  
  render(
    <InputField
      label="Test Input"
      value="test value"
      onChange={handleChange}
      showClearButton={true}
    />
  );
  
  // Change this line to use the exact aria-label value
  const clearButton = screen.getByRole('button', { name: 'Clear input' });
  
  await user.click(clearButton);
  
  expect(handleChange).toHaveBeenCalledWith(
    expect.objectContaining({
      target: expect.objectContaining({
        value: '',
      }),
    })
  );
});
})