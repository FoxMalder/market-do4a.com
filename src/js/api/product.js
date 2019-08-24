import Utils from '../utils/utils';

export default {
  requestParam: {},
  getSimilar(productId) {
    const formData = new FormData();

    if (this.requestParam) {
      Object.keys(this.requestParam).forEach((key) => {
        formData.append(key, this.requestParam[key]);
      });
    }

    return Utils.sendRequest(`/ajax/catalog/products/similarByProductId/${productId}/`, {
      method: 'post',
      body: formData,
    });
  },
};
