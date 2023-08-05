import { useState } from 'react';
import '../book.scss';
import { useRef } from 'react';
import { useEffect } from 'react';
import { Modal, Row } from 'antd';

const ModalGallery = () => {
  const { isOpen, setIsOpen, currentIndex, items, title } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const refGallery = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setActiveIndex(currentIndex);
    }
  }, [isOpen, currentIndex]);
  return (
    <Modal
      width={'60vw'}
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      footer={null} // hide footer
      closable={false} // hide close button
      className="modal-gallery"
    >
      <Row gutter={[20, 20]}></Row>
    </Modal>
  );
};

export default ModalGallery;
