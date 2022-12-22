import React from 'react';
import { describe, expect, test, jest } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react';

import PodcastInfoCard from './PodcastInfoCard';

describe('PodcastInfoCard', () => {
  test('Maximum case', async() => {
    const mockData = {
      podcastId: '12345',
      author: 'Sema Garcia',
      description: 'Lorem ipsum',
      title: 'Awesome title',
      coverUrlPath: 'https://robohash.org/12345'
    };
    const { getByTestId, getByText } = render(
      <PodcastInfoCard
        podcastId={mockData.podcastId}
        author={mockData.author}
        coverUrlPath={mockData.coverUrlPath}
        description={mockData.description}
        title={mockData.title}>
      </PodcastInfoCard>
    );

    const element = getByTestId('product-info-card');
    expect(element).toBeTruthy();
    expect(element.querySelector('img').getAttribute('src')).toBe(mockData.coverUrlPath);
    expect(getByText('By ' + mockData.author)).toBeInTheDocument();
    expect(getByText(mockData.description)).toBeInTheDocument();
    expect(getByText(mockData.title)).toBeInTheDocument();
  });

  test('Minimum case', async() => {
    const { getByTestId, getAllByText } = render(
      <PodcastInfoCard
        podcastId={''}
        author={''}
        coverUrlPath={''}
        description={''}
        title={''}>
      </PodcastInfoCard>
    );

    const element = getByTestId('product-info-card');
    expect(element).toBeTruthy();
    expect(getAllByText('-').length).toBe(2); // Author & Description
    expect(getAllByText('By -').length).toBe(1); // Title (By -)
    expect(element.querySelector('img').getAttribute('src')).toBe('');
  });

  test('onClick event', async() => {
    const onClickNavigateSpy = jest.fn();
    const { getByTestId } = render(
      <PodcastInfoCard
        podcastId={''}
        author={''}
        coverUrlPath={''}
        description={''}
        title={''}
        onNavigate={onClickNavigateSpy}>
      </PodcastInfoCard>
    );

    const element = getByTestId('product-info-card');
    fireEvent.click(element.querySelector('img'));
    expect(onClickNavigateSpy).toHaveBeenCalled();
  });
});
