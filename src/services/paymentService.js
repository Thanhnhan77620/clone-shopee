import * as httpRequest from '~/utils/httpRequest';

export const paymentByMomo = async (body = {}) => {
    const token = JSON.parse(localStorage.getItem('token')) || null;
    const configHeader = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    const res = await httpRequest.post('payments/momo', body, configHeader);
    return res;
};

