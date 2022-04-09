import { ComponentStory, ComponentMeta } from '@storybook/react';
import Footer, { IFooter } from './Footer';

export default {
  title: 'navigation/Footer',
  component: Footer,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = (args) => <Footer {...args} />;

export const Base = Template.bind({});
Base.args = {} as IFooter;
