/**
 * Mapper for transforming podcast data
 * @param {*} podcastData Data from top podcast list
 * @returns An empty array if none was retrieved; otherwise, a list of podcasts
 */
export const podcastListMapper = (podcastData) =>
  podcastData?.feed?.entry || [];

/**
 * Mapper for transforming podcast detail's data
 * We need to omit/discard the first element because it's not related to the collection data
 * @param {{ contents: string, status: object }} podcastDetailData Podcast detail's response
 * @returns An empty array if none was retrieved; otherwise, a list with details
 */
export const podcastDetailMapper = (podcastDetailData) =>
  podcastDetailData?.results?.slice(1) || [];
