import type { Meta, StoryObj } from '@storybook/react'

import { Code } from './Code'

const meta: Meta<typeof Code> = {
  title: 'shared/Code',
  component: Code
}

export default meta
type Story = StoryObj<typeof Code>

export const Primary: Story = {
  args: {
    text: 'import type { Meta, StoryObj } from \'@storybook/react\'\nimport { Code } from \'./Code\'\nconst meta: Meta<typeof Code> = {\ntitle: \'shared/Code\',\ncomponent: Code,\n'
  }
}
