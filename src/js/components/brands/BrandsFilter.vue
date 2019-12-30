<template>
  <div class="catalog-control">
    <div class="catalog-control__mobile">
      <CatalogFilterMobileHorizontal
        v-for="filter in newFilter"
        :key="filter.name"
        :filter="filter"
        @change="onChange"
      />
    </div>
    <div class="catalog-control__menu catalog-control__menu_white">
      <div class="container">
        <div class="view">
          <div class="view__category">
            <template v-for="filter in newFilter">
              <FilterCheckbox
                v-if="filter.type === 'checkbox'"
                :key="filter.name"
                :filter="filter"
                @change="onChange"
              />
              <FilterSelect
                v-else-if="filter.type === 'radio'"
                :key="filter.name"
                :filter="filter"
              />
              <FilterPrice
                v-else-if="filter.type === 'range'"
                :key="filter.name"
                :filter="filter"
              />
            </template>
          </div>
          <div class="view__tab">
            <div class="multifilter">
              <div class="multifilter__content">
                <div class="multifilter__label">
                  Вид:
                </div>
                <div class="multifilter__tablist" role="tablist">
                  <button
                    class="multifilter__tab"
                    :class="{ active: view === 'cards' }"
                    role="tab"
                    @click.prevent="showTab('cards')"
                  >
                    <i class="i i-cards" />
                  </button>
                  <button
                    class="multifilter__tab"
                    :class="{ active: view === 'list' }"
                    role="tab"
                    @click.prevent="showTab('list')"
                  >
                    <i class="i i-list" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CatalogFilterMobileHorizontal from '@/components/CatalogFilterMobileHorizontal.vue';
import FilterCheckbox from '@/components/catalog/FilterCheckbox.vue';
import FilterSelect from '@/components/catalog/FilterSelect.vue';
import FilterPrice from '@/components/catalog/FilterPrice.vue';

import {
  PriceFilter,
  CheckboxFilter,
  RadioFilter,
  SelectFilter,
} from '@/components/Multifilter';


export default {
  name: 'BrandsFilter',
  components: {
    CatalogFilterMobileHorizontal,
    FilterCheckbox,
    FilterSelect,
    FilterPrice,
  },
  props: {
    view: {
      type: String,
      default: 'cards',
    },
  },
  data() {
    return {
      filters: [],
      // view: 'cards',
    };
  },
  computed: {
    // ...mapState('filters', {
    //   filters: state => state.filters,
    // }),
    newFilter() {
      return this.filters.map((filter, i, array) => {
        if (filter.parent) {
          filter.parent = array.find(item => item.name === filter.parent);
        }

        return filter;
      });
    },
  },
  created() {
    this.filters = [].map.call(document.querySelectorAll('fieldset.multifilter'), (filter) => {
      if (filter.querySelector('.multifilter-checkbox')) {
        return CheckboxFilter.parseSettings(filter);
      }

      if (filter.querySelector('.multifilter-radio')) {
        return SelectFilter.parseSettings(filter);
      }

      if (filter.querySelector('.multifilter-price')) {
        return PriceFilter.parseSettings(filter);
      }

      return null;
    }).filter(item => item);
  },
  methods: {
    onChange() {
      this.$nextTick(() => {
        // [[1040, 1060], [1041, 1042, 1061]]
        const data = this.filters.map(
          filter => filter.data
            .filter(item => item.checked)
            .map(item => parseInt(item.value, 10)),
        );

        this.$emit('update:filters', data);
      });
    },
    showTab(e) {
      this.$emit('update:view', e);
    },
  },
};
</script>
