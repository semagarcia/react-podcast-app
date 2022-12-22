import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import EpisodeCard from 'components/episode-card/EpisodeCard';
import useStorageWithCache from 'custom-hooks/useStorageWithCache';
import { podcastDetailMapper } from 'mappers/mappers';
import API_ENDPOINTS from 'models/api-endpoints';
import CONSTANTS from 'models/constants';
import { buildUrlForCORS } from 'utils/cors-enabler';

/**
 * View for show an episode and offer the possibility to listen each of them
 */
const PodcastEpisodeView = () => {
  const { podcastId, episodeId } = useParams();
  const [episode, setEpisode] = useState({});
  const { data /*, isLoading, error */ } = useStorageWithCache(
    buildUrlForCORS(API_ENDPOINTS.PODCAST_EPISODES).replace(
      '#PODCAST_ID#',
      podcastId
    ),
    CONSTANTS.PODCAST_DETAIL_DATA_KEY,
    podcastDetailMapper
  );

  useEffect(() => {
    setEpisode(data.find((episode) => episode.trackId === +episodeId) || {});
  }, [data]);

  return (
    <div className="flex-row flex-grow-1">
      {episode && (
        <EpisodeCard
          description={episode.description}
          audioSourcePath={episode.episodeUrl}
          title={episode.trackName}
        ></EpisodeCard>
      )}
    </div>
  );
};

export default PodcastEpisodeView;
