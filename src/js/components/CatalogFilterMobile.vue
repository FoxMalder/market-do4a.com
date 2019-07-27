<template>
  <div class="catalog-menu-mob" :class="{active: isActive}">
    <div class="catalog-menu-mob__header">
      <button class="catalog-menu-mob__btn-back" v-if="!isParent" @click.prevent="back"></button>
      <span class="catalog-menu-mob__title">{{title}}</span>
      <button class="catalog-menu-mob__btn-close" v-if="isParent" @click.prevent="close"></button>
    </div>
    
    <div class="catalog-menu-mob__wrapper">
      <MultifilterPrice
              v-if="contentType === 'range'"
              :slider="content"
              @change="onChange"/>
      <MultifilterCheckboxList
              v-else-if="contentType === 'checkbox'"
              :items="content"
              :search="false"
              @change="onChange"/>
      <template
              v-else>
        <template v-for="item in content">
          <div class="multifilter"
                  v-if="item.type === 'multifilter' && !bottomContent"
                  :class="{active: item.activeChildren.length > 0}">
            <button class="multifilter__content multifilter__content_parent" @click.prevent="next(item)">
              <span class="multifilter__label" v-if="item.replaceTitle">{{item.label}}</span>
              <span class="multifilter__value" v-if="item.replaceTitle">{{item.replaceTitle}}</span>
              <span class="multifilter__value" v-else>{{item.label}}</span>
              <span class="multifilter__total" v-show="item.activeChildren.length > 0">{{item.activeChildren.length}}</span>
            </button>
            
            <button class="multifilter__btn-clear"
                    v-show="item.activeChildren.length > 0"
                    @click.prevent="reset(item.name, item.childType)">
              Сбросить
            </button>
          </div>
  
          <template v-else-if="item.type === 'radio'">
            <label class="multifilter-radio"
                    v-for="radio in item.data">
              <input class="multifilter-radio__input" type="radio"
                      :name="radio.name"
                      :value="radio.value"
                      v-model="item.selected"
                      @change="onChange">
              <span class="multifilter-radio__label">{{radio.label}}</span>
            </label>
          </template>
        </template>
      </template>
    </div>
    <div class="catalog-menu-mob__wrapper" v-if="bottomContent" style="overflow: hidden;flex: 0 0 auto;">
      <template v-for="item in bottomContent">
        <div class="multifilter"
                v-if="item.type === 'multifilter'"
                :class="{active: item.activeChildren.length > 0}">
          <button class="multifilter__content multifilter__content_parent" @click.prevent="next(item)">
            <span class="multifilter__label" v-if="item.replaceTitle">{{item.label}}</span>
            <span class="multifilter__value" v-if="item.replaceTitle">{{item.replaceTitle}}</span>
            <span class="multifilter__value" v-else>{{item.label}}</span>
            <span class="multifilter__total" v-show="item.activeChildren.length > 0">{{item.activeChildren.length}}</span>
          </button>
    
          <button class="multifilter__btn-clear"
                  v-show="item.activeChildren.length > 0"
                  @click.prevent="reset(item.name, item.childType)">
            Сбросить
          </button>
        </div>
      </template>
    </div>
    
    <div class="catalog-menu-mob__footer">
      <button class="catalog-menu-mob__btn-footer btn btn-gray-2"
              v-if="!isParent"
              :disabled="!canReset"
              @click.prevent="reset(parentName, contentType)">
        Сбросить
      </button>
      <button class="catalog-menu-mob__btn-footer btn btn-red"
              v-if="isParent"
              @click.prevent="close">
        Применить
      </button>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';
  import MultifilterCheckboxList from './MultifilterCheckboxList.vue';
  import MultifilterRadio from './MultifilterRadio.vue';
  import MultifilterPrice from './MultifilterPrice.vue';

  export default {
    name: "CatalogFilterMobile",
    components: {
      MultifilterCheckboxList,
      MultifilterRadio,
      MultifilterPrice
    },
    computed: {
      ...mapState('filters/mobile', {
        isActive: state => state.isActive,
        isParent: state => state.isParent,
        parentName: state => state.parentName,
        title: state => state.title,
        contentType: state => state.contentType,
        type: state => state.defaultContainer,
      }),
      ...mapGetters('filters/mobile', {
        content: 'visibleContent',
        bottomContent: 'visibleBottomContent',
        canReset: 'canReset',
      }),
    },
    methods: {
      onChange() {
        console.log('mobile change');
      },
      reset(name, type) {
        this.$store.dispatch('filters/filterReset', { container: this.type, name, type });
      },
      close() {
        this.$store.dispatch('filters/mobile/hideMenu');
      },
      back() {
        this.$store.dispatch('filters/mobile/showParents');
      },
      next(item) {
        this.$store.dispatch('filters/mobile/showChildrens', item);
      },
    }
  }
</script>

<!--<style scoped>-->

<!--</style>-->
