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
        @click="close"
      />
    </transition>

    <form class="search-field" action="/search/">
      <input
        v-model="searchField"
        class="search-field__input input-text"
        :class="{ 'active': fieldOpen }"
        placeholder="Поиск в каталоге"
        type="text"
        name="q"
        @focus="open"
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
        v-show="resultsOpen && hasResults"
        class="search-results"
      >
        <div ref="scrollbar1" class="search-results__col search-results__col_left">
          <ul v-show="searches.length > 0" class="search-results__list">
            <!--<li class="search-results__item"><strong>Прот</strong>еины</li>-->
            <!--<li class="search-results__item"><strong>Прот</strong>еин сывороточный</li>-->
            <!--<li class="search-results__item"><strong>Прот</strong>еин растительный </li>-->
            <!--<li class="search-results__item"><strong>Прот</strong>еин яичный</li>-->
            <li
              v-for="search in searches"
            >
              <a
                class="search-results__item"
                :href="search.url"
                v-html="find(search.name)"
              />
            </li>
          </ul>

          <section v-show="sections.length > 0" class="search-results__section">
            <h3 class="search-results__title">
              Популярные категории
            </h3>
            <ul class="search-results__list">
              <li
                v-for="section in sections"
                :key="section.id"
              >
                <a
                  class="search-results__item"
                  :href="section.url"
                >{{ section.name }}</a>
              </li>
            </ul>
          </section>

          <section v-show="brands.length > 0" class="search-results__section">
            <h3 class="search-results__title">
              Популярные бренды
            </h3>
            <ul class="search-results__list">
              <li
                v-for="brand in brands"
                :key="brand.id"
              >
                <a
                  class="search-results__item"
                  :href="brand.url"
                >{{ brand.name }}</a>
              </li>
            </ul>
          </section>
        </div>

        <div ref="scrollbar2" class="search-results__col search-results__col_right">
          <div v-if="status === 'loading'" class="search-results__status">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <template v-else>
            <div v-show="queryHistory.length > 0" class="search-results-history">
              <span class="search-results-history__title">Вы недавно искали:</span>
              <span
                v-for="query in queryHistory"
                class="search-results-history__item"
                v-text="query.name"
              />
            </div>


            <section
              v-show="products.length > 0"
              class="search-results__section"
            >
              <!--<h3 class="search-results__title">Популярные товары</h3>-->
              <h3 class="search-results__title">
                Найдено в товарах
              </h3>
              <div class="search-results__products">
                <div
                  v-for="product in products"
                  :key="product.id"
                  class="search-results-product"
                >
                  <div class="search-results-product__image">
                    <img
                      v-lazy="product.img"
                      :data-srcset="`${product.img} 2x`"
                      :alt="product.name"
                    >
                  </div>
                  <a :href="product.url" class="search-results-product__title">
                    {{ product.name }}
                  </a>
                  <div class="search-results-product__description">
                    {{ product.section }}
                  </div>
                  <div class="search-results-product__price">
                    <small>от</small>
                    {{ `${product.price} ₽` }}
                  </div>
                </div>
              </div>
            </section>


            <!--<section class="search-results__section">-->
            <!--  <h3 class="search-results__title">Найдено в статьях и акциях</h3>-->
            <!--  <div class="search-results-article">-->
            <!--    <div class="search-results-article__title">-->
            <!--      <a href="#">Скидка 10% на протеины</a>-->
            <!--    </div>-->
            <!--    <div class="search-results-article__description">Акция! Скидки на все виды протеинов</div>-->
            <!--  </div>-->
            <!--  <div class="search-results-article">-->
            <!--    <div class="search-results-article__title">-->
            <!--      <a href="#">Какие бывают протеины</a>-->
            <!--    </div>-->
            <!--    <div class="search-results-article__description">Рассказываем о протеинах просто и для всех.</div>-->
            <!--  </div>-->
            <!--</section>-->

            <!--<section class="search-results__section">-->
            <!--  <h3 class="search-results__title">-->
            <!--    Найдено в брендах-->
            <!--  </h3>-->
            <!--</section>-->

          </template>
        </div>
      </section>
    </transition>
  </div>
</template>

<script>
// import SimpleBar from 'simplebar';
import debounce from 'lodash.debounce';
import axios from 'axios';


function getSearch(searchField) {
  return axios
    .get(`/ajax/search/autocomplete/?q=${searchField}`)
    .then((response) => response.data)
    .then((response) => {
      if (response.success === 1) {
        return response.data;
      }
      const error = new Error(response.message);
      error.response = response;
      throw error;
    });
}

export default {
  name: 'Search',
  data() {
    return {
      isOpen: false,
      fieldOpen: false,
      resultsOpen: false,
      searchField: '',

      status: null,

      searches: [],
      brands: [],
      sections: [],
      products: [],
      banners: [],
      queryHistory: [],
    };
  },
  computed: {
    hasResults() {
      return this.searchField.length >= 3;
      // return this.searches.length > 0
      //   || this.brands.length > 0
      //   || this.sections.length > 0
      //   || this.products.length > 0
      //   || this.queryHistory.length > 0;
    },
  },
  watch: {
    searchField(value, oldValue) {
      this.debouncedGetResults();
    },
  },
  created() {
    this.debouncedGetResults = debounce(this.getResults, 500);
  },
  mounted() {
    // new SimpleBar(this.$refs.scrollbar1, { autoHide: false });
    // new SimpleBar(this.$refs.scrollbar2, { autoHide: false });
  },
  methods: {
    getResults() {
      if (this.searchField.length < 3) {
        // this.resultsOpen = false;
        return;
      }

      this.resultsOpen = true;

      this.status = 'loading';

      getSearch(this.searchField)
        .then((data) => {
          this.status = 'success';

          this.searches = data.searches;
          this.brands = data.brands;
          this.sections = data.sections;
          this.products = data.products;
          this.banners = data.banners;
          this.queryHistory = data.queryHistory;
        })
      // .catch(() => {
      //   this.status = 'error';
      //
      //   setTimeout(() => {
      //     this.status = null;
      //   }, 1000)
      // });
    },
    find(value) {
      return value.replace(this.searchField, '<strong>$&</strong>');
    },
    open() {
      this.isOpen = true;

      if (this.fieldOpen) {
        this.resultsOpen = true;
      } else {
        this.fieldOpen = true;
      }
    },
    close() {
      this.isOpen = false;

      if (!this.resultsOpen) {
        this.fieldOpen = false;
      } else {
        this.resultsOpen = false;
      }
    },
    fieldAnimationEnd() {
      if (this.fieldOpen && this.hasResults) {
        this.resultsOpen = true;
      }
    },
    resultsAnimationEnd() {
      if (!this.resultsOpen && !this.isOpen) {
        this.fieldOpen = false;
      }
    },
  },
};
</script>
