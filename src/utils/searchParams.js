export const buildSearchParams = (formData) => {
  const toneMapping = {
    'Любая': 'any',
    'Позитивная': 'positive',
    'Негативная': 'negative',
  };

  return {
    issueDateInterval: {
      startDate: `${formData.startDate}T00:00:00+03:00`,
      endDate: `${formData.endDate}T23:59:59+03:00`,
    },
    searchContext: {
      targetSearchEntitiesContext: {
        targetSearchEntities: [
          {
            type: 'company',
            inn: formData.inn,
            maxFullness: true,
            onlyMainRole: true,
          },
        ],
        onlyMainRole: true,
        tonality: toneMapping[formData.tone] || 'any',
        riskFactors: {
          and: [],
          or: [],
          not: [],
        },
        themes: {
          and: [],
          or: [],
          not: [],
        },
      },
      themesFilter: {
        and: [],
        or: [],
        not: [],
      },
    },
    attributeFilters: {
      excludeTechNews: true,
      excludeAnnouncements: true,
      excludeDigests: true,
    },
    similarMode: 'duplicates',
    limit: parseInt(formData.documentCount, 10),
    sortType: 'sourceInfluence',
    sortDirectionType: 'desc',
    intervalType: 'month',
    histogramTypes: ['totalDocuments', 'riskFactors'],
  };
};
