import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PodcastCard from 'components/podcast-card/PodcastCard';
import useStorageWithCache from 'custom-hooks/useStorageWithCache';
import { podcastListMapper } from 'mappers/mappers';
import API_ENDPOINTS from 'models/api-endpoints';
import CONSTANTS from 'models/constants';

import './Home.styles.scss';

/**
 * Initial view that shows the list of the 100 top podcast
 */
const HomeView = () => {
  const navigationRouter = useNavigate();
  const [filterCriteria, setFilterCriteria] = useState('');
  const [podcasts, setPodcasts] = useState([]);
  const { data /*, isLoading, error */ } = useStorageWithCache(
    API_ENDPOINTS.MOST_POPULAR_PODCASTS,
    CONSTANTS.PODCAST_DATA_KEY,
    podcastListMapper
  );

  /**
   * Handler for navigating to a podcast entry
   * @param {*} podcast
   */
  const navigateToPodcastDetails = (podcast) => {
    // Pushing a state
    // navigationRouter(`/podcast/${podcast.id.attributes['im:id']}`, { state: { podcast } });

    // Without persisting state (option choosen)
    navigationRouter(`/podcast/${podcast.id.attributes['im:id']}`);
  };

  /**
   * Checks if a podcast matches and satisfies the criteria
   * @param {string} criteria filter written by the user
   * @param {*} podcast podcast to be checked if matches or not
   * @returns
   */
  const isMatchingCriteria = (criteria, podcast) => {
    return [
      podcast['im:artist'].label.toLowerCase().indexOf(criteria.toLowerCase()) >
        -1,
      podcast['im:name'].label.toLowerCase().indexOf(criteria.toLowerCase()) >
        -1,
    ].some(Boolean);
  };

  useEffect(() => {
    setPodcasts(data);
  }, [data]);

  useEffect(() => {
    const results =
      filterCriteria && filterCriteria !== ''
        ? data.filter((podcast) => isMatchingCriteria(filterCriteria, podcast))
        : data;
    setPodcasts(results);
  }, [filterCriteria]);

  return (
    <div className="flex-col">
      <div className="flex-row filter-area">
        <div className="flex-row filtered-results-counter">
          {podcasts.length}
        </div>
        <div className="flex-row">
          <input
            className="filter-field"
            placeholder="Filter podcasts..."
            type="text"
            value={filterCriteria}
            onChange={(evt) => setFilterCriteria(evt.target.value)}
          />
        </div>
      </div>

      <div className="flex-row results-grid">
        {podcasts.map((podcast, index) => (
          <PodcastCard
            podcastId={podcast.id.attributes['im:id']}
            key={index}
            author={podcast['im:artist'].label}
            thumbnail={podcast['im:image'][2].label}
            title={podcast['im:name'].label}
            onClick={() => navigateToPodcastDetails(podcast)}
          ></PodcastCard>
        ))}
      </div>
    </div>
  );
};

export default HomeView;
