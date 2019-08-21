import Utils from '../utils/utils';

export default {
  addReview(review) {
    const data = {
      ajax: 'Y',
      method: 'post',
      sessid: global.BX.bitrix_sessid(),
      ...review,
    };

    return Utils.sendRequest('/local/public/product_reviews.php', {
      method: 'post',
      body: data,
    });
  },
  getReviews(productId, page = 0) {
    if (global.demo) {
      return new Promise((resolve, reject) => {
        let id = Math.ceil(Math.random() * 1000);

        setTimeout(() => {
          resolve({
            count: 16,
            items: [
              {
                id: id += 1,
                author: `User ${id}`,
                text: 'Покупал первый раз я взял вкус печенье-крем с водой мешаю так лучше всего потому что, вкус мне понравился, живот не крутит все ок) ещё завёл себе карту дисконтную до кучи жду товаров по скидке! Купил я до что начала 900 гр большую пока не стал линейка вкусов большой банки очень ограничен.',
                raiting: 4,
                countMinus: 5,
                countPlus: 10,
                created: '25.02.2019',
              }, {
                id: id += 1,
                author: `User ${id}`,
                text: 'text',
                raiting: 2,
                countMinus: 2,
                countPlus: 1,
                created: '25.02.2019',
              },
            ],
          });
          // resolve({
          //   count: 0,
          //   items: [],
          // });
        }, 1000);
      });
    }
    return Utils.sendRequest(`/ajax/review/byProduct/${productId}/`, {
      method: 'post',
      body: {
        page,
        linit: '',
      },
    });
  },
  vote(productId, value) {
    const data = new FormData();
    data.append('id', productId);
    data.append('method', value === 'minus' ? 'voteMinus' : 'votePlus');

    if (global.BX && global.BX.bitrix_sessid) {
      data.append('sessid', global.BX.bitrix_sessid());
    }

    return Utils.sendRequestFull(`/ajax/review/byProduct/${productId}/`, {
      method: 'post',
      body: data,
    });
  },
};
