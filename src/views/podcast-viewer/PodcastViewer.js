import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

import PodcastInfoCard from 'components/podcast-info-card/PodcastInfoCard';
import useStorageWithCache from 'custom-hooks/useStorageWithCache';
import { podcastListMapper } from 'mappers/mappers';
import API_ENDPOINTS from 'models/api-endpoints';
import CONSTANTS from 'models/constants';

import './PodcastViewer.styles.scss';

/**
 * View that shows the details of a podcast: generic info (left col) and a detail fragment (right col)
 */
const PodcastViewerView = () => {
  const navigationRouter = useNavigate();
  const { podcastId } = useParams();
  // const { state } = useLocation();
  const [podcastInfo, setPodcastInfo] = useState([]);
  const { data /*, isLoading, error */ } = useStorageWithCache(
    API_ENDPOINTS.MOST_POPULAR_PODCASTS,
    CONSTANTS.PODCAST_DATA_KEY,
    podcastListMapper
  );

  useEffect(() => {
    setPodcastInfo(
      data.find((podcast) => podcast.id.attributes['im:id'] === podcastId) || {}
    );
  }, [podcastId, data]);

  /**
   * Handler to navigate to a route
   * @param {string} targetRoute route where to navigate to
   * @returns
   */
  const navigateTo = (targetRoute) => navigationRouter(targetRoute);

  return (
    <div className="flex-row">
      <div className="flex-row left-column">
        {podcastInfo && (
          <PodcastInfoCard
            podcastId={podcastId}
            coverUrlPath={
              podcastInfo['im:image'] && podcastInfo['im:image'][2].label
            }
            title={podcastInfo['im:name']?.label}
            author={podcastInfo['im:artist']?.label}
            description={podcastInfo.summary?.label}
            onNavigate={navigateTo}
          ></PodcastInfoCard>
        )}
      </div>
      <div className="flex-col flex-grow-1 right-column">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default PodcastViewerView;
