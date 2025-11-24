import type { Meta, StoryObj } from '@storybook/react';
import {
  OswegoArrow,
  OswegoTree,
  OswegoDock,
  OswegoCircle,
  OswegoInfinity,
} from '../../components/icons';

type IconProps = React.ComponentProps<typeof OswegoArrow>;

// Reusable grid style for the AllIcons story
const iconGridStyle = {
  display: 'grid',
  gap: '32px',
  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
  padding: '32px',
  textAlign: 'center',
} as const;

const meta: Meta<IconProps> = {
  title: 'OswegoPark Labs/Icons/TechTree IntelliNav',
  component: OswegoArrow,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Premium SVG icon suite used by **TechTree IntelliNav**, part of the OswegoPark Platform Engineering UIKit.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'number' },
      description: 'Pixel size of the icon',
      defaultValue: 64,
    },
    color: {
      control: { type: 'color' },
      description: 'Current SVG stroke color',
      defaultValue: '#4af0ff',
    },
    ariaLabel: {
      control: { type: 'text' },
      description: 'Accessible label for screen readers',
      defaultValue: 'oswego-icon',
    },
  },
};

export default meta;
type Story = StoryObj<IconProps>;

export const Arrow: Story = {
  args: {
    ariaLabel: 'Arrow Icon',
  },
  render: (args) => <OswegoArrow {...args} />,
};

export const Tree: Story = {
  args: {
    ariaLabel: 'TechTree Icon',
  },
  render: (args) => <OswegoTree {...args} />,
};

export const Dock: Story = {
  args: {
    ariaLabel: 'Dock Icon',
  },
  render: (args) => <OswegoDock {...args} />,
};

export const Circle: Story = {
  args: {
    ariaLabel: 'Circle Icon',
  },
  render: (args) => <OswegoCircle {...args} />,
};

export const Infinity: Story = {
  args: {
    ariaLabel: 'Infinity Icon',
  },
  render: (args) => <OswegoInfinity {...args} />,
};

export const AllIcons: Story = {
  args: {
    size: 72,
    color: '#4af0ff'
  },
  parameters: {
    layout: 'padded',
  },
  render: (args) => (
    <div style={iconGridStyle}>
      <div><OswegoArrow {...args} /><p>Arrow</p></div>
      <div><OswegoTree {...args} /><p>Tree</p></div>
      <div><OswegoDock {...args} /><p>Dock</p></div>
      <div><OswegoCircle {...args} /><p>Circle</p></div>
      <div><OswegoInfinity {...args} /><p>Infinity</p></div>
      <div><BuildIcon {...args} /><p>Build</p></div>
      <div><DeployIcon {...args} /><p>Deploy</p></div>
      <div><DesignIcon {...args} /><p>Design</p></div>
      <div><HomeIcon {...args} /><p>Home</p></div>
      <div><MonitorIcon {...args} /><p>Monitor</p></div>
    </div>
  ),
};