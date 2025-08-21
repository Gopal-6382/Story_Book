import '@testing-library/jest-dom';

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  Eye: () => 'EyeIcon',
  EyeOff: () => 'EyeOffIcon',
  X: () => 'XIcon',
  Loader2: () => 'LoaderIcon',
  ChevronUp: () => 'ChevronUpIcon',
  ChevronDown: () => 'ChevronDownIcon',
  AlertCircle: () => 'AlertCircleIcon',
}));