import { GetApi } from 'api/api';
import { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';

export function ImageGallery({ showModal, requestFirst }) {
  const [galery, setGalery] = useState([]);
  const [page, setPage] = useState(1);
  const [request, setRequest] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [totaltot, setTotaltot] = useState(0);

  useEffect(() => {
    if (!requestFirst) {
      return;
    }
    const getGalerys = async () => {
      setLoading(true);
      try {
        // console.log('request :>> ', request);
        const response = await GetApi(requestFirst, page);
        setGalery([...galery, ...response.hits]);
        if (request !== requestFirst) {
          console.log('Изменилось имя запроса');
          setGalery([...response.hits]);
          setPage(1);
        }
        setTotal(response.hits.length);
        setTotaltot(response.totalHits);
        console.log('response :>> ', response);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getGalerys(requestFirst);
    setRequest(requestFirst);
  }, [page, requestFirst]);

  const clickLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div>
      {total === 0 &&
        request !== '' &&
        ((
          <div className={css.boxMessage}>
            <p className={css.messageName}>
              Sorry, no images were found for your request, please try another
              request
            </p>
          </div>
        ) ||
          (error && (
            <div className={css.boxMessage}>
              <p className={css.messageName}>Error {error}</p>
            </div>
          )) ||
          (total === 0 && page !== 1 && (
            <div className={css.boxMessage}>
              <p className={css.messageName}>
                There are no more pictures, please try another request
              </p>
            </div>
          )))}
      {loading && <Loader />}
      {!loading && (
        <ul className={css.ImageGallery}>
          {galery.length > 0 &&
            galery.map(({ webformatURL, tags, id, largeImageURL }) => (
              <ImageGalleryItem
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                tags={tags}
                key={id}
                showModal={showModal}
              />
            ))}
        </ul>
      )}

      {!loading &&
        totaltot !== 0 &&
        galery.length < totaltot &&
        total >= 12 && <Button onClick={clickLoadMore} />}
      {totaltot !== 0 && galery.length === totaltot && (
        <div className={css.messageFinish} hidden>
          🔴 We're sorry, but you've reached the end of search results.
        </div>
      )}
    </div>
  );
}
