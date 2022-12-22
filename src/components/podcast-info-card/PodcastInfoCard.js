import React from 'react';

import './PodcastInfoCard.styles.scss';

/**
 * Component for displaying the cover of a podcast and its main info: title, author, description and the cover
 * @param { { podcastId, coverUrlPath, title, author, description, onNavigate } } params
 */
const PodcastInfoCard = ({
  podcastId,
  coverUrlPath,
  title,
  author,
  description,
  onNavigate,
}) => {
  return (
    <div
      data-testid="product-info-card"
      className="flex-col info-card-container"
    >
      <div className="flex-row cover">
        <img
          src={coverUrlPath || ''}
          onClick={() => onNavigate(`/podcast/${podcastId}`)}
        />
      </div>
      <div className="info-divider"></div>
      <div className="flex-col">
        <div
          className="podcast-title"
          onClick={() => onNavigate(`/podcast/${podcastId}`)}
        >
          {title || '-'}
        </div>
        <div
          className="podcast-author"
          onClick={() => onNavigate(`/podcast/${podcastId}`)}
        >
          By {author || '-'}
        </div>
      </div>
      <div className="info-divider"></div>
      <div className="flex-col podcast-description">
        <div className="flex-row label">Description:</div>
        <div className="flex-row text">{description || '-'}</div>
      </div>
    </div>
  );
};

export default PodcastInfoCard;
