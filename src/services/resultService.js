import { fetchPublicationHistograms, searchPublications, fetchPublicationDetails } from './searchAPI';

export const fetchHistogramsAndPublications = async (searchParams) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const histograms = await fetchPublicationHistograms(searchParams);
    const publicationIds = await searchPublications(searchParams);

    if (!Array.isArray(publicationIds)) {
      throw new Error('Invalid publication IDs');
    }

    const encodedIds = publicationIds.map((item) => item.encodedId);

    return { histograms, ids: encodedIds };
  } catch (error) {
    throw error;
  }
};

export const fetchBatchDocuments = async (ids, offset, limit) => {
  try {
    const batchIds = ids.slice(offset, offset + limit);

    if (batchIds.length === 0) {
      console.warn('No more IDs to fetch');
      return [];
    }

    const documents = await fetchPublicationDetails(batchIds);

    return documents;
  } catch (error) {
    console.error('Error in fetchBatchDocuments:', error);
    throw error;
  }
};
