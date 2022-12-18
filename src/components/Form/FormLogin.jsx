import classnames from 'classnames/bind';
import { useDispatch } from 'react-redux';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebookSquare, faGoogle } from '@fortawesome/free-brands-svg-icons';

import styles from './Form.module.scss';
import Button from '../Button';
// import { handleShowPopupOverplay } from '~/utils';
import { CHECKBOX_FORM_LOGIN_ID } from '~/commons';
import { handleShowPopupOverplay } from '~/utils';
import { useState } from 'react';
import { toastError, toastSuccess } from '~/assets/js/toast-message';

//slice
import { login } from '~/slices/authSlice';
import { getAll } from '~/slices/cartSlice';

//service
import * as authService from '~/services/authService';
import * as cartService from '~/services/cartService';

const cx = classnames.bind(styles);
function FormLogin() {
    const dispatch = useDispatch();
    const [error, setError] = useState({
        email: '',
        password: '',
    });

    const handleLogin = () => {
        var formElement = document.getElementById('form-login');
        var enableInputs = formElement.querySelectorAll('[name]');
        var userLogin = Array.from(enableInputs).reduce((value, input) => {
            value[input.name] = input.value;
            return value;
        }, {});
        //helend2905@gmail.com
        const fetchLoginAPI = async () => {
            const userResponse = await authService.login(userLogin);
            if (userResponse.status === 200) {
                toastSuccess('Login Successfully!');
                dispatch(login(userResponse.data));
                handleShowPopupOverplay(null, true);

                Promise.resolve(cartService.getAll()).then((e) => {
                    console.log(e);
                    if (e.status === 201) {
                        dispatch(getAll(e.data));
                    } else {
                        toastError(e.errors.message);
                    }
                });
            } else {
                setError({ ...userResponse.errors });
            }
        };
        fetchLoginAPI();
    };
    return (
        //  Login from
        <>
            {/* Authen from form  */}
            <form id="form-login">
                <div className={cx('auth-form__form')}>
                    <div className={cx('auth-form__group', error.email ? 'invalid' : null)}>
                        <input name="email" type="text" className={cx('auth-form__input')} placeholder="Nhập email" />
                        <span className={cx('error-message')}>{error.email}</span>
                    </div>

                    <div className={cx('auth-form__group', error.password ? 'invalid' : null)}>
                        <input
                            name="password"
                            type="password"
                            className={cx('auth-form__input')}
                            placeholder="Nhập mật khẩu"
                            autoComplete="on"
                        />
                        <span className={cx('error-message')}>{error.password}</span>
                    </div>
                </div>
            </form>

            <div className={cx('auth-form__aside')}>
                <div className={cx('auth-form__help')}>
                    <a href="/" className={cx('auth-form__link', 'auth-form__help-forgot')}>
                        Quên mật khẩu
                    </a>
                    <span className={cx('auth-form__help--separate')}></span>
                    <a href="/" className={cx('auth-form__link')}>
                        Cần trợ giúp?
                    </a>
                </div>
            </div>
            <div className={cx('auth-form__controls')}>
                <Button normal labelFor={CHECKBOX_FORM_LOGIN_ID} className={cx('auth-form__controls-back')}>
                    TRỞ LẠI
                </Button>
                <Button primary onClick={handleLogin}>
                    ĐĂNG NHẬP
                </Button>
            </div>
        </>
    );
}

export default FormLogin;
