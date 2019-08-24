import Utils from '../utils/utils';

export default {
  addProduct({ productId, productQuantity }) {
    const data = {
      method: 'add',
      id: productId,
      quantity: productQuantity,
      ajax: 'Y',
      sessid: Utils.sessid(),
    };
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    return Utils.sendRequestFull('/local/public/basket.php', {
      method: 'post',
      body: formData,
    }).then((response) => {
      if (response.status !== 'error') {
        return response.html;
      }
      const error = new Error(response.error);
      error.response = response;
      throw error;
    });
  },

  test(data) {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    return Utils.sendRequestFull('/local/public/basket.php', {
      method: 'post',
      body: formData,
    }).then((response) => {
      if (response.status !== 'error') {
        return response.html;
      }
      const error = new Error(response.error);
      error.response = response;
      throw error;
    });
  },
};
