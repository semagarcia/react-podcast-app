import PodcastCard from './PodcastCard';

export default {
  title: 'PodcastCard',
  component: PodcastCard,
  argTypes: {
    podcastId: { control: 'text' },
    title: { control: 'text' },
    author: { control: 'text' },
    thumbnail: { control: 'text' },
    onClick: { action: 'clicked' }
  },
};

// Template
const Template = (args) => <PodcastCard {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  podcastId: '12345',
  title: 'Podcast title',
  author: 'Sema García',
  thumbnail: `https://robohash.org/${Date.now()}.png`
};
