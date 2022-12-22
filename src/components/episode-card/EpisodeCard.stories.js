import EpisodeCard from './EpisodeCard';

export default {
  title: 'EpisodeCard',
  component: EpisodeCard,
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    audioSourcePath: { control: 'text' },
  },
};

// Template
const Template = (args) => <EpisodeCard {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  title: 'Episode 587 | "So Sick"',
  description: 'The Meg and Tory case continues on as the guys react to the latest trial news after Kelsey takes the stand (19:57). Gunna is released from jail after pleading guilty to a state RICO charge (49:50), and speculation spreads on whether the Atlanta rapper snitched or not (52:07). Joe sends his condolences to the family and friends of Stephen ‘tWitch’ Boss (1:20:00). Dr. Umar shares his thoughts about Wakanda Forever (1:25:17) and Elon Musk has suspended more accounts on Twitter (1:31:35). GloRilla is looking for a personal assistant (1:35:00), the NBA reveals its new trophies and awards (1:46:43), new music (2:12:36), + MORE!',
  audioSourcePath: 'https://traffic.libsyn.com/secure/jbpod/Joe_Budden_Podcast_587.mp3?dest-id=2422538'
};
