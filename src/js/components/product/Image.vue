<template>
  <canvas :style="{opacity: disabled ? '0.3' : '1'}" class="p-images-block__img"></canvas>
</template>

<script>
  export default {
    name: "CanvasImage",
    props: {
      src: {
        type: String,
        required: true,
      },
      src2x: {
        type: String,
        required: false
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    // data: () => ({
    //   cachedImages: {},
    // }),
    watch: {
      src(url, oldUrl) {
        // console.log('watch src');

        // url = url.replace('images/', '');

        if (url === oldUrl) {
          return;
        }

        if (Object.prototype.hasOwnProperty.call(this.cachedImages, url)) {
          const image = this.cachedImages[url];
          this.$el.width = image.naturalWidth;
          this.$el.height = image.naturalHeight;

          this.ctx.clearRect(0, 0, this.$el.width, this.$el.height);
          this.ctx.drawImage(image, 0, 0);

          return;
        }

        this.loadImg();
      },
    },
    mounted() {
      this.ctx = this.$el.getContext('2d');

      this.cachedImages = {};

      this.img = new Image();
      this.img.crossOrigin = 'Anonymous';

      this.img.addEventListener('load', () => {
        this.$el.width = this.img.naturalWidth;
        this.$el.height = this.img.naturalHeight;

        this.ctx.clearRect(0, 0, this.$el.width, this.$el.height);

        this.ctx.globalCompositeOperation = 'darken';
        this.ctx.fillStyle = '#f7f7f7';

        // this.ctx.globalAlpha = this.disabled ? 0.3 : 1;
        this.ctx.drawImage(this.img, 0, 0);

        // this.ctx.globalAlpha = 1;
        this.ctx.fillRect(0, 0, this.$el.width, this.$el.height);

        const savedImage = new Image();
        savedImage.src = this.$el.toDataURL('image/png');
        this.cachedImages[this.img.src] = savedImage;
      }, false);

      this.img.addEventListener('error', () => {
        this.ctx.clearRect(0, 0, this.$el.width, this.$el.height);
      }, false);

      this.loadImg();
    },
    methods: {
      loadImg() {
        if (this.src2x && Math.round(window.devicePixelRatio || 1) >= 2) {
          this.img.src = this.src2x;
        } else {
          this.img.src = this.src;
        }
      }
    }
  }
</script>
