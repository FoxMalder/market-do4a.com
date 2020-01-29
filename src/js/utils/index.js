import Utils from './utils';


/**
 * Determine if an element is an HTML element
 * @param el
 * @returns {boolean}
 */
export const isElement = (el) => !!(el && el.nodeType === Node.ELEMENT_NODE);

/**
 * Return an element's offset with respect to document element
 * @param el
 * @returns {{top: Number, left: Number}}
 */
export const getOffset = (el) => {
  const rect = el.getBoundingClientRect();

  return {
    top: rect.top
      + (window.pageYOffset || document.documentElement.scrollTop),
    left: rect.left
      + (window.pageXOffset || document.documentElement.scrollLeft),
  };
};


/**
 * Return an element's offset with respect to to its offsetParent
 * @param el
 * @returns {{top: Number, left: Number}}
 */
export const getPosition = (el) => {
  let offset = { top: 0, left: 0 };
  if (!isElement(el)) {
    return offset;
  }
  let parentOffset = { top: 0, left: 0 };
  const elStyles = el.getComputedStyle();
  if (elStyles.position === 'fixed') {
    offset = el.getBoundingClientRect() || offset;
  } else {
    offset = getOffset(el);
    const doc = el.ownerDocument;
    let offsetParent = el.offsetParent || doc.documentElement;
    while (
      offsetParent
      && (offsetParent === doc.body || offsetParent === doc.documentElement)
      && offsetParent.getComputedStyle().position === 'static'
      ) {
      offsetParent = offsetParent.parentNode;
    }
    if (offsetParent && offsetParent !== el && offsetParent.nodeType === Node.ELEMENT_NODE) {
      parentOffset = getOffset(offsetParent);
      const offsetParentStyles = offsetParent.getComputedStyle();
      parentOffset.top += parseFloat(offsetParentStyles.borderTopWidth);
      parentOffset.left += parseFloat(offsetParentStyles.borderLeftWidth);
    }
  }
  return {
    top: offset.top - parentOffset.top - parseFloat(elStyles.marginTop),
    left: offset.left - parentOffset.left - parseFloat(elStyles.marginLeft),
  };
};

export const getViewportSize = () => ({
  width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
  height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
});


export const formatNumber = (value, currency) => {
  const num = parseFloat(value);
  if (!Number.isFinite(num) || (!num && num !== 0)) {
    return '';
  }

  const stringified = num.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
  if (currency !== undefined) {
    return `${stringified} ${currency}`;
  }
  return stringified;
};

export {
  Utils,
};

export default Utils;
