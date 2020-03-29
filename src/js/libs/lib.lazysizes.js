import lazySizes from 'lazysizes';
import 'lazysizes/plugins/native-loading/ls.native-loading';
import 'lazysizes/plugins/attrchange/ls.attrchange';


lazySizes.cfg.init = false;

document.addEventListener('lazybeforeunveil', (e) => {
  const bg = e.target.dataset.bg || e.target.dataset.background;

  if (bg) {
    e.target.style.backgroundImage = `url(${bg})`;
  }
});

lazySizes.init();
