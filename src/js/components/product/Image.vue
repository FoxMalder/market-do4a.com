<template>
  <canvas class="p-images-block__img"></canvas>
</template>

<script>
  export default {
    name: "CanvasImage",
    props: {
      src: String,
      disabled: Boolean,
    },
    data: () => ({
      cacheImages: {},
    }),
    watch: {
      src(url, oldUrl) {
        if (url === oldUrl) {
          return;
        }

        if (Object.prototype.hasOwnProperty.call(this.cacheImages, url)) {
          const image = this.cacheImages[url];
          this.$el.width = image.naturalWidth;
          this.$el.height = image.naturalHeight;
          
          this.ctx.globalAlpha = this.disabled ? 0.5 : 1;
          this.ctx.drawImage(image, 0, 0);

          return;
        }

        this.img.src = url;
      },
    },
    mounted() {
      this.ctx = this.$el.getContext('2d');
      this.ctx.globalCompositeOperation = 'darken';
      this.ctx.fillStyle = '#f7f7f7';

      this.img = new Image();
      this.img.crossOrigin = 'Anonymous';
      
      this.img.addEventListener('load', () => {
        this.$el.width = this.img.naturalWidth;
        this.$el.height = this.img.naturalHeight;
        
        this.ctx.globalAlpha = this.disabled ? 0.5 : 1;
        this.ctx.drawImage(this.img, 0, 0);
        this.ctx.fillRect(0, 0, this.$el.width, this.$el.height);

        const savedImage = new Image();
        savedImage.src = this.$el.toDataURL('image/png');
        this.cacheImages[this.img.src] = savedImage;
      }, false);
      
      this.img.addEventListener('error', () => {
        this.ctx.clearRect(0, 0, this.$el.width, this.$el.height);
      }, false);
      
      this.img.src = this.src;
    }
  }
</script>
