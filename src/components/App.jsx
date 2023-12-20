import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './ModalWin/index';

export function App() {
  const [request, setRequest] = useState('');
  const page = 1;
  const [isShowModal, setIsShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');

  const formSubmitHandler = data => {
    if (request !== data) {
      setRequest(data);
    } else {
      toast.warn('This request is already running, please enter another one');
    }
  };
  const showModal = modalImage => {
    setIsShowModal(true);
    setModalImage(modalImage);
  };
  const closeModalBtn = () => {
    setIsShowModal(false);
    setModalImage('');
  };
  // toggleModal = () => {
  //   this.setState(prev => ({
  //     isShowModal: !prev.isShowModal,
  //   }));
  // };
  //
  return (
    <>
      <ToastContainer autoClose={1500} />
      <Searchbar formSubmit={formSubmitHandler} />
      <ImageGallery requestFirst={request} page={page} showModal={showModal} />
      {isShowModal && (
        <Modal closeModalBtn={closeModalBtn} modalImage={modalImage} />
      )}
    </>
  );
}
