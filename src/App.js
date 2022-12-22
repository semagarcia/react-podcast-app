import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from 'components/header/Header';

import './App.scss';

const HomeView = lazy(() => import('./views/home/home'));
const PodcastDetailsView = lazy(() => import('./views/podcast-details/PodcastDetails'));
const PodcastEpisodeView = lazy(() => import('./views/podcast-episode/PodcastEpisode'));
const PodcastViewerView = lazy(() => import('./views/podcast-viewer/PodcastViewer'));
const NotFoundView = lazy(() => import('./views/not-found/NotFound'));

function App() {
  return (
    <div className="flex-col app-container">
      <Header></Header>
      <div className="content-wrapper">
        <Suspense
          fallback={<div className="lazy-suspense-loader">Loading...</div>}
        >
          <Routes>
            <Route exact path="/" element={<HomeView></HomeView>}></Route>
            <Route
              path="podcast/:podcastId"
              element={<PodcastViewerView></PodcastViewerView>}
            >
              <Route
                path=""
                element={<PodcastDetailsView></PodcastDetailsView>}
              ></Route>
              <Route
                path="episode/:episodeId"
                element={<PodcastEpisodeView></PodcastEpisodeView>}
              ></Route>
            </Route>
            <Route path="*" element={<NotFoundView></NotFoundView>}></Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
