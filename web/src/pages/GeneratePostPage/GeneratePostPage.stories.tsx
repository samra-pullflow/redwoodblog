import type { Meta, StoryObj } from '@storybook/react'

import GeneratePostPage from './GeneratePostPage'

const meta: Meta<typeof GeneratePostPage> = {
  component: GeneratePostPage,
}

export default meta

type Story = StoryObj<typeof GeneratePostPage>

export const Primary: Story = {}
