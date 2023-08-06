import { useState } from 'react';
import '../book.scss';
import { useRef } from 'react';
import { useEffect } from 'react';
import { Col, Image, Modal, Row } from 'antd';
import ImageGallery from 'react-image-gallery';

const ModalGallery = (props) => {
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
      <Row gutter={[20, 20]}>
        <Col span={16}>
          <ImageGallery
            ref={refGallery}
            items={items}
            showPlayButton={false} // hide play button
            showFullscreenButton={false} // hide fullscreen button
            startIndex={currentIndex} // start at current index
            showThumbnails={false} // hide thumbnail
            onSlide={(i) => setActiveIndex(i)}
            slideDuration={0} // duration between slides
          />
        </Col>
        <Col span={8}>
          <div>{title}</div>
          <div>
            <Row gutter={[20, 20]}>
              {items?.map((item, index) => {
                return (
                  <Col key={`image-${index}`}>
                    {/* Dùng component img của thằng antd để phải đỡ css */}
                    <Image
                      wrapperClassName={'img-normal'}
                      width={100}
                      height={100}
                      src={item.original}
                      preview={false}
                      onClick={() => {
                        // Click thì sẽ nhấn tới ảnh kế tiếp(chuyển tới hình ảnh kế tiếp), dùng ref đề trỏ tới `ImageGallery`
                        refGallery.current.slideToIndex(index);
                      }}
                    />
                    <div className={activeIndex === index ? 'active' : ''}></div>
                  </Col>
                );
                A;
              })}
            </Row>
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default ModalGallery;
