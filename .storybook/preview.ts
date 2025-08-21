import type { Preview } from '@storybook/react-vite';
import '../src/index.css'; // Import your global styles

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true, // Expand controls panel by default
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' },
        { name: 'gray', value: '#f3f4f6' },
      ],
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: { width: '375px', height: '667px' },
        },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
        },
        desktop: {
          name: 'Desktop',
          styles: { width: '1440px', height: '900px' },
        },
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: false }, // Disable if causing false positives
        ],
      },
    },
    options: {
      storySort: {
        order: ['Introduction', 'Components', '*', 'Examples'],
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'] as string[], // Enable autodocs for all stories
};

export default preview;