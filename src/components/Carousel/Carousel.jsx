import { faAngleLeft, faAngleRight, faL } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames/bind';
import { useEffect } from 'react';
import { useRef, useState } from 'react';

import styles from './Carousel.module.scss';

const cx = classnames.bind(styles);
function Carousel({ items = [], showArrowButton = true, loop = true, thumbWidth = 82 }) {
    const listImage = useRef(null);
    const btnLeft = useRef(null);
    const btnRight = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleClickNext = (step) => {
        setCurrentIndex((prevState) => {
            let newIndex = prevState + step;
            if (!loop) {
                if (newIndex === items.length - 1) {
                    btnRight.current.style.display = 'none';
                } else if (newIndex === 0) {
                    btnLeft.current.style.display = 'none';
                }
            } else if (newIndex > items.length - 1) {
                newIndex = 0;
            } else if (newIndex < 0) {
                newIndex = items.length - 1;
            }
            console.log(newIndex);
            if (newIndex > 0 && newIndex < items.length - 1) {
                btnLeft.current.style.display = 'inline-flex';
                btnRight.current.style.display = 'inline-flex';
            }
            return newIndex;
        });
    };

    const handleTransform = () => {
        return `translate(${-currentIndex * (thumbWidth + 10)}px)`;
    };

    useEffect(() => {
        if (!loop) {
            btnLeft.current.style.display = 'none';
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx('carousel-swapper')}>
            {/* <video
                className={cx('left-image')}
                playsInline
                loop
                muted
                controls
                alt="All the devices"
                src={video}
                // ref={videoEl}
            /> */}
            <img src={items[currentIndex].imageURL} alt="images" className={cx('left-image')} />
            <div className={cx('left-image-list-swapper')}>
                <ul
                    ref={listImage}
                    className={cx('left-image-list')}
                    // style={{ transform: `translate(${-currentIndex * 92}px)` }}
                    style={{ transform: handleTransform() }}
                >
                    {/* <video
                        className={cx('left-image-list__item', 'left-image-list__item--active')}
                        alt="All the devices"
                        src={video}
                    /> */}
                    {items.map((item, index) => (
                        <img
                            key={index}
                            src={item.imageURL}
                            alt="images"
                            className={cx(
                                'left-image-list__item',
                                currentIndex === index ? 'left-image-list__item--active' : null,
                            )}
                            style={{ width: thumbWidth }}
                            onClick={() => handleClickNext(index)}
                        />
                    ))}
                </ul>
                {showArrowButton && (
                    <>
                        <div
                            ref={btnLeft}
                            className={cx('arrow-btn', 'arrow-btn__left')}
                            onClick={() => handleClickNext(-1)}
                        >
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </div>
                        <div ref={btnRight} className={cx('arrow-btn', 'arrow-btn__right')}>
                            <FontAwesomeIcon icon={faAngleRight} onClick={() => handleClickNext(1)} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Carousel;
