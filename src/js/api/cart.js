import Utils from '../utils/utils';

export default {
  addProduct({ productId, productQuantity }) {
    const data = {
      method: 'add',
      id: productId,
      quantity: productQuantity,
      // getHtml: 'N',
      sessid: Utils.sessid(),
    };
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    return Utils.sendRequest('/local/public/basket.php', {
      method: 'post',
      body: formData,
    });
  },
};
