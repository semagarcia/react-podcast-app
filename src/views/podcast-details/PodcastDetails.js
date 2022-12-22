import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import useStorageWithCache from 'custom-hooks/useStorageWithCache';
import { podcastDetailMapper } from 'mappers/mappers';
import API_ENDPOINTS from 'models/api-endpoints';
import { buildUrlForCORS } from 'utils/cors-enabler';
import { convertMillisIntoMMSS, formatIntoReadableDate } from 'utils/time';

import './PodcastDetails.styles.scss';

/**
 * View for displaying the list of podcast's episodes, with its duration and the publishing date
 */
const PodcastDetailsView = () => {
  const { podcastId } = useParams();
  const [podcastDetails, setPodcastDetails] = useState([]);
  const { data, isLoading /*, error */ } = useStorageWithCache(
    buildUrlForCORS(API_ENDPOINTS.PODCAST_EPISODES).replace(
      '#PODCAST_ID#',
      podcastId
    ),
    podcastId,
    podcastDetailMapper
  );

  useEffect(() => {
    setPodcastDetails(data);
  }, [data]);

  return (
    <div className="flex-col flex-grow-1">
      <div className="flex-row episode-counter">
        Episodes: {podcastDetails && podcastDetails.length}
      </div>
      <div className="flex-col episode-list">
        <div className="list-header">
          <div className="title">Title</div>
          <div className="date">Date</div>
          <div className="duration">Duration</div>
        </div>
        {podcastDetails &&
          podcastDetails.map((podcast) => (
            <div className="list-entry" key={podcast.trackId}>
              <div className="title">
                <Link to={`episode/${podcast.trackId}`}>
                  {podcast.trackName}
                </Link>
              </div>
              <div className="date">
                {formatIntoReadableDate(podcast.releaseDate)}
              </div>
              <div className="duration">
                {convertMillisIntoMMSS(podcast.trackTimeMillis)}
              </div>
            </div>
          ))}
      </div>
      {isLoading && (
        <div className="flex-row retrieving-loader">Retrieving episodes...</div>
      )}
    </div>
  );
};

export default PodcastDetailsView;
