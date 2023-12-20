import { useState } from 'react';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';
import { Icon } from 'components/img/Icon';
// import { ReactComponent as MyIcon } from 'components/img/Icon';

export function Searchbar({ formSubmit }) {
  const [request, setRequest] = useState('');

  const handleChange = e => {
    setRequest(e.currentTarget.value);
    // console.log('e :>> ', value);
  };
  const handleSubmit = e => {
    e.preventDefault();

    if (request === '') {
      return toast.warn('Please enter your request!');
    }

    formSubmit(request.toLowerCase().trim());
    setRequest('');
    // console.log(this.state);
  };
  return (
    <>
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <Icon id="search" className={css.icons} />
          </button>
          <input
            name="request"
            value={request}
            className={css.SearchFormInput}
            type="text"
            placeholder="Search images and photos"
            onChange={handleChange}
          />
        </form>
      </header>
    </>
  );
}
