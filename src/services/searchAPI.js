import apiClient from './apiClient';

export const fetchPublicationHistograms = async (params) => {
  try {
    const response = await apiClient('/objectsearch/histograms', {
      method: 'POST',
      body: JSON.stringify(params),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching publication histograms:', error);
    throw error;
  }
};

export const searchPublications = async (params) => {
  try {
    const response = await apiClient('/objectsearch', {
      method: 'POST',
      body: JSON.stringify(params),
    });
    if (!response.items || !Array.isArray(response.items)) {
      throw new Error('Invalid response format');
    }
    return response.items;
  } catch (error) {
    console.error('Error searching publications:', error);
    throw error;
  }
};

export const fetchPublicationDetails = async (ids) => {
  try {
    if (!Array.isArray(ids) || ids.length === 0) {
      throw new Error('Invalid or empty IDs array');
    }

    const response = await apiClient('/documents', {
      method: 'POST',
      body: JSON.stringify({ ids }),
    });

    return response
      .map((item) => (item.ok ? item.ok : null))
      .filter(Boolean);
  } catch (error) {
    console.error('Error fetching publication details:', error);
    throw error;
  }
};
