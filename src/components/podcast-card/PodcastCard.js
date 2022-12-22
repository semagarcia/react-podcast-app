import React from 'react';

import './PodcastCard.styles.scss';

/**
 * Component that renders a small card with the basic information of a podcast: thumbnail, title and author
 * @param { { podcastId, author, thumbnail, title, onClick } } params
 */
const PodcastCard = ({ podcastId, author, thumbnail, title, onClick }) => {
  return (
    <div
      id={`podcast-${podcastId}`}
      className="podcast-card flex-col flex-grow-1 card-container"
      onClick={onClick}
    >
      <div className="flex-row logo">
        <img src={thumbnail} />
      </div>
      <div className="flex-row title">{title || '-'}</div>
      <div className="flex-row author">Author: {author || '-'}</div>
    </div>
  );
};

export default PodcastCard;
