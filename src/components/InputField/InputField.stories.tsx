import type { Meta, StoryObj } from '@storybook/react';
import InputField from './InputField';
import { useState } from 'react';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email', 'number'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text here...',
    label: 'Default Input',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Input with helper text',
    placeholder: 'Enter text here...',
    helperText: 'This is a helpful message',
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Input with error',
    placeholder: 'Enter text here...',
    invalid: true,
    errorMessage: 'This field is required',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'Cannot edit this...',
    disabled: true,
  },
};

export const LoadingState: Story = {
  args: {
    label: 'Loading Input',
    placeholder: 'Loading...',
    loading: true,
  },
};

export const PasswordInput: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
  },
};

export const WithClearButton: Story = {
  args: {
    label: 'Input with clear button',
    placeholder: 'Type something...',
    showClearButton: true,
  },
};

// Interactive example
export const InteractiveExample = () => {
  const [value, setValue] = useState('');
  
  return (
    <div className="space-y-4 w-80">
      <InputField
        label="Interactive Input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type something..."
        showClearButton
        helperText="This input is interactive"
      />
      <p>Current value: {value || '[empty]'}</p>
    </div>
  );
};

// All variants
export const AllVariants = () => {
  return (
    <div className="space-y-4 w-80">
      <InputField
        label="Filled Variant"
        variant="filled"
        placeholder="Filled input"
      />
      <InputField
        label="Outlined Variant"
        variant="outlined"
        placeholder="Outlined input"
      />
      <InputField
        label="Ghost Variant"
        variant="ghost"
        placeholder="Ghost input"
      />
    </div>
  );
};

// All sizes
export const AllSizes = () => {
  return (
    <div className="space-y-4 w-80">
      <InputField
        label="Small Size"
        size="sm"
        placeholder="Small input"
      />
      <InputField
        label="Medium Size"
        size="md"
        placeholder="Medium input"
      />
      <InputField
        label="Large Size"
        size="lg"
        placeholder="Large input"
      />
    </div>
  );
};