<template>
  <canvas class="p-images-block__img"></canvas>
</template>

<script>
  export default {
    name: "CanvasImage",
    props: {
      src: String,
    },
    data: () => ({
      cacheImages: null,
    }),
    watch: {
      src(url, oldUrl) {
        if (url === oldUrl) {
          return;
        }

        if (this.cacheImages && Object.prototype.hasOwnProperty.call(this.cacheImages, url)) {
          const image = this.cacheImages[url];
          this.$el.width = image.naturalWidth;
          this.$el.height = image.naturalHeight;
          this.ctx.drawImage(image, 0, 0);

          return;
        }

        this.img.src = url;
      },
    },
    mounted() {
      // this.canvas = this.$refs.canvas;
      this.ctx = this.$el.getContext('2d');

      this.img = new Image;
      this.img.crossOrigin = 'Anonymous';


      // this.img.onload = () => {};
      this.img.addEventListener('load', () => {
        this.$el.width = this.img.naturalWidth;
        this.$el.height = this.img.naturalHeight;
        this.ctx.drawImage(this.img, 0, 0);

        this.ctx.globalCompositeOperation = 'darken';
        this.ctx.fillStyle = '#f7f7f7';
        this.ctx.fillRect(0, 0, this.$el.width, this.$el.height);

        const savedImage = new Image();
        savedImage.src = this.$el.toDataURL(`image/png`);
        this.cacheImages[this.img.src] = savedImage;

        // this.cacheImages.push({
        //   url: this.img.src,
        //   image: savedImage,
        // });
      }, false);

      // img.src = 'https://marketdo4a.com/upload/resizer/eb/86081_380x380_eb3e46411c38f8c29a12f9b64be3e26d.jpg?1534642513';
      // this.img.src = this.activePacking.img;
      this.img.src = this.src;
    }
  }
</script>
