import React from 'react';

import './EpisodeCard.styles.scss';

/**
 * Component for displaying the podcast's episode details (title, description and the audio control for listening)
 * @param { { title, description, audioSourcePath } } params
 */
const EpisodeCard = ({ title, description, audioSourcePath }) => {
  return (
    <div className="episode-card flex-col flex-grow-1 episode-card-container">
      <div className="flex-row title">{title}</div>
      <div
        className="flex-row description"
        dangerouslySetInnerHTML={{
          __html: description?.replaceAll('\n', '<br />'),
        }}
      ></div>
      <div className="flex-row audio-source">
        <audio controls src={audioSourcePath}></audio>
      </div>
    </div>
  );
};

export default EpisodeCard;
