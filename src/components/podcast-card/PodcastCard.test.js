import React from 'react';
import { describe, expect, test, jest } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react';

import PodcastCard from './PodcastCard';

describe('PodcastCard', () => {
  test('Maximum case', async() => {
    const mockData = {
      podcastId: '12345',
      author: 'Sema Garcia',
      thumbnail: 'https://robohash.org/12345',
      title: 'Awesome title',
    };
    const { container, getByText } = render(
      <PodcastCard
        podcastId={mockData.podcastId}
        author={mockData.author}
        thumbnail={mockData.thumbnail}
        title={mockData.title}>
      </PodcastCard>
    );

    expect(container.querySelector(`#podcast-${mockData.podcastId}`)).toBeInTheDocument();
    expect(container.querySelector('img').getAttribute('src')).toBe(mockData.thumbnail);
    expect(getByText(mockData.title)).toBeInTheDocument();
    expect(getByText('Author: ' + mockData.author)).toBeInTheDocument();
  });

  test('Minimum case', async() => {
    const { container, getAllByText } = render(
      <PodcastCard
        podcastId={''}
        author={''}
        thumbnail={''}
        title={''}>
      </PodcastCard>
    );

    expect(container.querySelector('img').getAttribute('src')).toBe('');
    expect(container.querySelector('#podcast-')).toBeInTheDocument();
    expect(getAllByText('-').length).toBe(1);
    expect(getAllByText('Author: -').length).toBe(1);
  });

  test('onClick event', async() => {
    const onClickSpy = jest.fn();
    const podcastId = '12345';
    const { container } = render(
      <PodcastCard
        podcastId={podcastId}
        onClick={onClickSpy}>
      </PodcastCard>
    );

    fireEvent.click(container.querySelector(`#podcast-${podcastId}`));
    expect(onClickSpy).toHaveBeenCalled();
  });
});
