import * as httpRequest from '~/utils/httpRequest';
const token = JSON.parse(localStorage.getItem('token')) || null;

export const searchHint = async (params = {}) => {
    const res = await httpRequest.get('products/search-hint', {
        params
    });
    return res;
};

export const searching = async (body = {}, params = {}) => {
    const configHeader = {
        params
    }
    const res = await httpRequest.post('products/searching', body, configHeader);
    return res;
};

export const getProductById = async (id) => {
    const res = await httpRequest.get('products/' + id);
    return res;
};