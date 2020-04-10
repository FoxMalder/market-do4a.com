<template>
  <div
    class="catalog-menu-mob"
    :class="{active: isActive}"
  >
    <div class="catalog-menu-mob__header">
      <button
        v-if="!isParent"
        class="catalog-menu-mob__btn-back"
        @click.prevent="back"
      />
      <span class="catalog-menu-mob__title">{{ title }}</span>
      <button
        v-if="isParent"
        class="catalog-menu-mob__btn-close"
        @click.prevent="close"
      />
    </div>

    <div class="catalog-menu-mob__wrapper">
      <MultifilterPrice
        v-if="contentType === 'range'"
        :slider="content"
        @change="onChange"
      />
      <MultifilterCheckboxList
        v-else-if="contentType === 'checkbox'"
        :items="content"
        :search="false"
        @change="onChange"
      />
      <template v-else>
        <template v-for="item in content">
          <div
            v-if="item.type === 'multifilter'"
            class="multifilter"
            :class="{active: item.activeChildren.length > 0}"
          >
            <button class="multifilter__content multifilter__content_parent" @click.prevent="next(item)">
              <span v-if="!item.replaceTitle" class="multifilter__value">{{ item.label }}</span>
              <template v-else>
                <span class="multifilter__label">{{ item.label }}</span> <span class="multifilter__value">{{ item.replaceTitle }}</span>
              </template>
              <span v-show="item.activeChildren.length > 0" class="multifilter__total">{{ item.activeChildren.length }}</span>
            </button>

            <button
              v-show="item.activeChildren.length > 0"
              class="multifilter__btn-clear"
              @click.prevent="onResetRow(item.name, item.childType)"
            >
              Сбросить
            </button>
          </div>

          <template v-else-if="item.type === 'radio'">
            <label v-for="radio in item.data" class="multifilter-radio">
              <input
                v-model="item.selected"
                class="multifilter-radio__input"
                type="radio"
                :name="radio.name"
                :value="radio.value"
                @change="onChange"
              > <span class="multifilter-radio__label">{{ radio.label }}</span> </label>
          </template>
        </template>
      </template>
    </div>
    <!--<div-->
    <!--  v-if="bottomContent.length"-->
    <!--  class="catalog-menu-mob__wrapper"-->
    <!--  style="overflow: hidden;flex: 0 0 auto;"-->
    <!--&gt;-->
    <!--  <template v-for="item in bottomContent">-->
    <!--    <div-->
    <!--      v-if="item.type === 'multifilter'"-->
    <!--      class="multifilter"-->
    <!--      :class="{active: item.activeChildren.length > 0}"-->
    <!--    >-->
    <!--      <button class="multifilter__content multifilter__content_parent" @click.prevent="next(item)">-->
    <!--        <span v-if="item.replaceTitle" class="multifilter__label">{{ item.label }}</span>-->
    <!--        <span v-if="item.replaceTitle" class="multifilter__value">{{ item.replaceTitle }}</span>-->
    <!--        <span v-else class="multifilter__value">{{ item.label }}</span>-->
    <!--        <span v-show="item.activeChildren.length > 0" class="multifilter__total">{{ item.activeChildren.length }}</span>-->
    <!--      </button>-->

    <!--      <button-->
    <!--        v-show="item.activeChildren.length > 0"-->
    <!--        class="multifilter__btn-clear"-->
    <!--        @click.prevent="onResetRow(item.name, item.childType)"-->
    <!--      >-->
    <!--        Сбросить-->
    <!--      </button>-->
    <!--    </div>-->
    <!--  </template>-->
    <!--</div>-->

    <div class="catalog-menu-mob__footer">
      <button
        v-if="type === 'filters' || !isParent"
        class="catalog-menu-mob__btn-footer btn btn-gray-2"
        :disabled="!canReset"
        @click.prevent="onResetFooter(parentName, contentType)"
      >
        <svg
          class="btn-icon"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2.17851 0.821777L0.822472 2.1777L4.64429 5.99984L0.822266 9.82187L2.17825 11.1779L6.00022 7.35588L9.82195 11.1779L11.178 9.82201L7.3562 5.9999L11.1781 2.178L9.82212 0.822014L6.00027 4.64386L2.17851 0.821777Z"
            fill="currentColor"
          />
        </svg>
        Сбросить
      </button>

      <button
        v-if="isParent"
        class="catalog-menu-mob__btn-footer btn btn-red"
        @click.prevent="close"
      >
        Применить
      </button>
    </div>
  </div>
</template>

<script>
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { mapGetters, mapState, mapActions } from 'vuex';

import MultifilterCheckboxList from './catalog/MultifilterCheckboxList.vue';
import MultifilterRadio from './catalog/MultifilterRadio.vue';
import MultifilterPrice from './catalog/MultifilterPrice.vue';


export default {
  name: 'CatalogFilterMobile',
  components: {
    MultifilterCheckboxList,
    MultifilterRadio,
    MultifilterPrice,
  },
  data() {
    return {
      isActive: false,
      defaultTitle: 'Фильтр',
      title: 'Фильтр',
      isParent: true,

      type: 'filters',
      parentName: null,
      contentType: null,
    };
  },
  computed: {
    ...mapState('filters', {
      filters: (state) => state.filters,
      sort: (state) => state.sort,
    }),

    content() {
      if (this.type === 'sort') {
        return [this.sort.sort];
      }

      const list = {
        ...this.filters,
        ...this.sort,
      };

      // if (rootState.filters.sort.store) {
      //   list.store = rootState.filters.sort.store;
      // }


      if (this.parentName) {
        return list[this.parentName].data;
      }

      return Object.keys(list)
        .filter((key) => key !== 'type' && key !== 'category' && key !== 'sort')
        .map((key) => {
          const opt = {
            type: 'multifilter',
            name: key,
            label: list[key].label,
            childType: list[key].type,
            activeChildren: [],
          };

          if (opt.childType === 'checkbox') {
            opt.activeChildren = list[key].data
              .filter((item) => item.checked)
              .map((item) => item.label) || [];

            opt.replaceTitle = list[key].replaceTitle
              && (opt.activeChildren.length > 0 ? opt.activeChildren.join(', ') : list[key].labelEmpty);
          }
          return opt;
        });
    },

    /**
     * Показывать ли кнопку "Сбросить"
     * @returns {boolean}
     */
    canReset() {
      if (this.isParent) {
        return !!this.content.find((item) => item.childType === 'checkbox' && item.activeChildren.length > 0);
      }

      if (this.contentType === 'checkbox') {
        return !!this.content.find((item) => item.checked);
      }

      return true;
    },
  },
  methods: {
    onChange() {
      this.hasChanges = true;
      console.log('mobile change');
    },
    /**
     * Кнопка сброса в списке фильтров
     * @param name
     * @param type
     */
    onResetRow(name, type) {
      this.$store.dispatch('filters/filterReset', { container: this.type, name, type });
      this.onChange();
    },
    /**
     * Кнопка сброса в нижней части
     * @param name
     * @param type
     */
    onResetFooter(name, type) {
      if (this.isParent) {
        this.$store.dispatch('filters/resetAll');
      } else {
        this.$store.dispatch('filters/filterReset', { container: this.type, name, type });
      }
      this.onChange();
    },
    open({ name, title }) {
      disableBodyScroll(this.$el);

      const rect = document.querySelector('.h-navbar-fixed').getBoundingClientRect();
      if (rect.top > 0) {
        window.scrollTo({
          top: rect.top
            + (window.pageYOffset || document.documentElement.scrollTop),
          behavior: 'smooth',
        });
      }


      this.type = name;
      this.title = title;
      this.defaultTitle = title;
      this.contentType = null;
      this.parentName = null;
      this.isParent = true;
      this.isActive = true;
    },
    close() {
      enableBodyScroll(this.$el);

      this.isActive = false;

      if (this.hasChanges) {
        this.$store.dispatch('filters/onChange');
        this.hasChanges = false;
      }
    },
    back() {
      this.contentType = null;
      this.parentName = null;
      this.isParent = true;
      this.title = this.defaultTitle;
    },
    next(item) {
      this.parentName = item.name;
      this.contentType = item.childType;
      this.isParent = false;
      this.title = item.label;
    },
  },
};
</script>

<style scoped>

</style>
