// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Header, Footer } from '../../components/common';  
import { SearchHeader, SearchForm } from '../../components/SearchPage';
import './searchPage.css';
import documentIcon from '../../assets/search/icon_document.svg';
import folderIcon from '../../assets/search/icon_folders.svg';
import searchHero from '../../assets/search/search_1.png';

function SearchPage() {
  const navigate = useNavigate(); 

  const handleSearch = (formData) => {
    navigate('/results', { state: { searchParams: formData } });
  };

  return (
    <div className="search-page">
      <Header />
      <div className="search-page__content">
        <SearchHeader />
        <div className="search-page__graphics">
          <img
            src={documentIcon}
            alt="Документ"
            className="search-page__icon-document"
          />
          <img
            src={folderIcon}
            alt="Папки"
            className="search-page__icon-folders"
          />
        </div>
        <div className="search-page__main">
          <SearchForm onSearch={handleSearch} />
          <img
            src={searchHero}
            alt="Герой с сопутствующими элементами"
            className="search-page__hero"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SearchPage;
