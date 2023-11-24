import ListDetail from '../components/Search/HotelListDetail';
import SearchPopup from '../components/Search/SearchPopup';

// ==================================================

const SearchPage = () => {
  return (
    <section className='container section-search'>
      <SearchPopup />

      <ListDetail />
    </section>
  );
};

export default SearchPage;
