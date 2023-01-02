import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';

import '../../styles/styles.css';

export const SearchBar = ({ onFormSubmit, prevQuery }) => {
  const handleSubmit = (values, actions) => {
    onFormSubmit(filterQuery(values.searchQuery));
  };

  const filterQuery = query => {
    return query.trim().toLowerCase();
  };

  return (
    <header className="Searchbar">
      <Formik initialValues={{ searchQuery: '' }} onSubmit={handleSubmit}>
        {({ values }) => (
          <Form className="SearchForm">
            {/* if the queris match one another the button wouldn't be able (to prevent data reloading) */}
            <button
              disabled={filterQuery(values.searchQuery) === prevQuery}
              className="SearchForm-button"
              type="submit"
            >
              <span className="SearchForm-button-label">Search</span>
            </button>
            <Field
              className="SearchForm-input"
              type="text"
              name="searchQuery"
              placeholder="Search images and photos"
              autoFocus
              autoComplete="off"
            />
          </Form>
        )}
      </Formik>
    </header>
  );
};

SearchBar.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  prevQuery: PropTypes.string.isRequired,
};
