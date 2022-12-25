import * as httpRequest from '~/utils/httpRequest';

export const getAll = async () => {
    const token = JSON.parse(localStorage.getItem('token')) || null;
    const configHeader = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    const res = await httpRequest.get('orders/me', configHeader);
    return res;
};
