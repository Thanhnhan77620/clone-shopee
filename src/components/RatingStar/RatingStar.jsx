import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
// import { faStar } from '@fortawesome/free-regular-svg-icons';
import classnames from 'classnames/bind';

import styles from './RatingStar.module.scss';

const cx = classnames.bind(styles);
function RatingStar({ size = 14, score = 0, colorEmpty = '', colorFill = 'yellow' }) {
    return (
        <div className={cx('star-list')}>
            <div className={cx('star')}>
                <FontAwesomeIcon icon={faStar} style={{ color: colorEmpty, width: size, height: size }} />
                <FontAwesomeIcon icon={faStar} style={{ color: colorEmpty, width: size, height: size }} />
                <FontAwesomeIcon icon={faStar} style={{ color: colorEmpty, width: size, height: size }} />
                <FontAwesomeIcon icon={faStar} style={{ color: colorEmpty, width: size, height: size }} />
                <FontAwesomeIcon icon={faStar} style={{ color: colorEmpty, width: size, height: size }} />
            </div>
            <div className={cx('star', 'star--fill')} style={{ width: `${score * size}px` }}>
                <FontAwesomeIcon icon={faStar} style={{ color: colorFill, width: size, height: size }} />
                <FontAwesomeIcon icon={faStar} style={{ color: colorFill, width: size, height: size }} />
                <FontAwesomeIcon icon={faStar} style={{ color: colorFill, width: size, height: size }} />
                <FontAwesomeIcon icon={faStar} style={{ color: colorFill, width: size, height: size }} />
                <FontAwesomeIcon icon={faStar} style={{ color: colorFill, width: size, height: size }} />
            </div>
        </div>
    );
}

export default RatingStar;
