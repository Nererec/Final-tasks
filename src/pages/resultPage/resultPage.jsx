// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Header, Footer } from '../../components/common';
import { ResultHeader, SummaryCarousel, DocumentList } from '../../components/ResultPage';
import { buildSearchParams } from '../../utils/searchParams';
import { fetchResults, fetchMoreDocuments } from '../../store/slices';
import { Loader } from '../../components/common';
import './resultPage.css';

function ResultPage() {
  const location = useLocation();
  const searchParams = location.state?.searchParams;

  const dispatch = useDispatch();
  const { histograms, documentIds, documents, loading, error } = useSelector((state) => state.results);

  useEffect(() => {
    if (searchParams) {
      const params = buildSearchParams(searchParams);
      dispatch(fetchResults(params)); 
    }
  }, [dispatch, searchParams]);
  

  const handleLoadMore = () => {
    if (documents.length >= documentIds.length) {
      alert('Больше нет документов для загрузки.');
      return;
    }
  
    dispatch(
      fetchMoreDocuments({
        ids: documentIds,
        offset: documents.length,
        limit: 10,
      })
    );
  };
  
  

  const hasMoreDocuments = documents.length < documentIds.length;

return (
  <div className="result-page">
    <Header />
    <div className="result-page__content">
      {!loading && !error && documents.length === 0 ? (
        <ResultHeader />
      ) : null}
      {loading ? (
        <div className="loader-wrapper">
          <Loader />
        </div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          <SummaryCarousel histograms={histograms} />
          <DocumentList
            documents={documents}
            onLoadMore={handleLoadMore}
            hasMoreDocuments={hasMoreDocuments} 
          />
        </>
      )}
    </div>
    <Footer />
  </div>
);
}

export default ResultPage;
