import PodcastInfoCard from './PodcastInfoCard';

export default {
  title: 'PodcastInfoCard',
  component: PodcastInfoCard,
  argTypes: {
    podcastId: { control: 'text' },
    title: { control: 'text' },
    author: { control: 'text' },
    description: { control: 'text' },
    coverUrlPath: { control: 'text' },
    onNavigate: { action: 'navigateTo' }
  },
};

// Template
const Template = (args) => <PodcastInfoCard {...args} />;

const podcastId = '12345';

export const Basic = Template.bind({});
Basic.args = {
  podcastId: podcastId,
  title: 'Podcast title',
  author: 'Sema García',
  description: 'Lorem ipsum description bla bla bla',
  coverUrlPath: 'https://www.gravatar.com/avatar/' + podcastId,
};
