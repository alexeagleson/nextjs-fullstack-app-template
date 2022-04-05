import { ComponentMeta, ComponentStory } from '@storybook/react';
import CatCard, { ICatCard } from './CatCard';
import { mockCatCardProps } from './CatCard.mocks';

export default {
  title: 'templates/CatCard',
  component: CatCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof CatCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CatCard> = (args) => (
  <CatCard {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockCatCardProps.base,
} as ICatCard;
