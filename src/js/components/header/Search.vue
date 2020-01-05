<template>
  <div
    class="header-control__search"
    :class="{ 'active': fieldOpen }"
    @transitionend.self="fieldAnimationEnd"
  >
    <transition name="fade">
      <div
        v-show="fieldOpen"
        class="search-overlay"
      />
    </transition>

    <form class="search-field">
      <input
        class="search-field__input input-text"
        :class="{ 'active': fieldOpen }"
        placeholder="Поиск в каталоге"
        type="text"
        @focus="open"
        @blur="close"
      >
      <button class="search-field__loupe" type="submit">
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16.7948 9.64739C16.7948 13.5948 13.5948 16.7948 9.64739 16.7948C5.7 16.7948 2.5 13.5948 2.5 9.64739C2.5 5.7 5.7 2.5 9.64739 2.5C13.5948 2.5 16.7948 5.7 16.7948 9.64739ZM14.8572 17.7685C13.3546 18.7345 11.5664 19.2948 9.64739 19.2948C4.31928 19.2948 0 14.9755 0 9.64739C0 4.31928 4.31928 0 9.64739 0C14.9755 0 19.2948 4.31928 19.2948 9.64739C19.2948 11.9671 18.4761 14.0956 17.1119 15.7596L23.4246 22.0724L21.2928 24.2042L14.8572 17.7685Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </form>


    <transition
      @after-leave="resultsAnimationEnd"
    >
      <section
        v-show="resultsOpen"
        class="search-results"
      >
        <div ref="scrollbar1" class="search-results__col search-results__col_left">
          <ul class="search-results__list">
            <li class="search-results__item"><strong>Прот</strong>еины</li>
            <li class="search-results__item"><strong>Прот</strong>еин сывороточный</li>
            <li class="search-results__item"><strong>Прот</strong>еин растительный </li>
            <li class="search-results__item"><strong>Прот</strong>еин яичный</li>
          </ul>

          <section class="search-results__section">
            <h3 class="search-results__title">Популярные категории</h3>
            <ul class="search-results__list">
              <li class="search-results__item">Протеины</li>
              <li class="search-results__item">Гейнеры</li>
              <li class="search-results__item">Жиросжигатели</li>
              <li class="search-results__item">Аминокислоты</li>
              <li class="search-results__item">Креатин</li>
            </ul>
          </section>

          <section class="search-results__section">
            <h3 class="search-results__title">Популярные бренды</h3>
          </section>
        </div>

        <div ref="scrollbar2" class="search-results__col search-results__col_right">
          <div class="search-results-history">
            <span class="search-results-history__title">Вы недавно искали:</span>
            <span class="search-results-history__item">Протеин</span>
            <span class="search-results-history__item">Гейнер</span>
            <span class="search-results-history__item">Креатин</span>
          </div>

          <section class="search-results__section">
            <h3 class="search-results__title">Популярные товары</h3>
            <div class="search-results__products">
              <div class="search-results-product" v-for="i in 5">
                <div class="search-results-product__image">
                  <img src="https://marketdo4a.com/upload/resizer/0f/85811_300x180_0ffc75b1eb6169cbc1577b619d5dd706.jpg?1571926274">
                </div>
                <a href="#" class="search-results-product__title">
                  Do4a Lab Premium Whey 80% 900 гр
                </a>
                <div class="search-results-product__description">
                  Сывороточный
                </div>
                <div class="search-results-product__price">
                  <small>от</small>
                  1 350 ₽
                </div>
              </div>
            </div>
          </section>


          <section class="search-results__section">
            <h3 class="search-results__title">Найдено в статьях и акциях</h3>
            <div class="search-results-article">
              <div class="search-results-article__title">
                <a href="#">Скидка 10% на протеины</a>
              </div>
              <div class="search-results-article__description">Акция! Скидки на все виды протеинов</div>
            </div>
            <div class="search-results-article">
              <div class="search-results-article__title">
                <a href="#">Какие бывают протеины</a>
              </div>
              <div class="search-results-article__description">Рассказываем о протеинах просто и для всех.</div>
            </div>
          </section>

          <section class="search-results__section">
            <h3 class="search-results__title">Найдено в брендах</h3>
          </section>
        </div>
      </section>
    </transition>
  </div>
</template>

<script>
import SimpleBar from 'simplebar';


export default {
  name: 'Search',
  data() {
    return {
      fieldOpen: false,
      resultsOpen: false,
    };
  },
  mounted() {
    // new SimpleBar(this.$refs.scrollbar1, { autoHide: false });
    // new SimpleBar(this.$refs.scrollbar2, { autoHide: false });
  },
  methods: {
    open() {
      if (this.fieldOpen) {
        this.resultsOpen = true;
      } else {
        this.fieldOpen = true;
      }
    },
    close() {
      if (!this.resultsOpen) {
        this.fieldOpen = false;
      } else {
        this.resultsOpen = false;
      }
    },
    fieldAnimationEnd() {
      if (this.fieldOpen) {
        this.resultsOpen = true;
      }
    },
    resultsAnimationEnd() {
      if (!this.resultsOpen) {
        this.fieldOpen = false;
      }
    },
  },
};
</script>
