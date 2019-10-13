<template>
  <div class="s-shops">
    <div class="s-shops__list" v-if="!isTabs || !shownStoreInfo">
      <div class="s-shops__scroll" ref="scrollEl">
        <!-- Список городов -->
        <ul class="s-city-list">
          <li
            v-for="city in filtredCityList"
            class="s-city"
            :class="{ active: city.id === cityId }">
            <div class="s-city__header">
              <div class="s-city__name">{{ city.name }}</div>
              <div class="s-city__note" v-if="city.id === cityId">
                <svg width="13" height="15" viewBox="0 0 13 15" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.04028 0.543988C4.86651 0.290477 6.00108 0 6.95171 0C7.90234 0 9.03691 0.290477 9.86315 0.543988C10.2914 0.675388 10.6666 0.806428 10.935 0.904682C11.0696 0.953918 11.178 0.995202 11.2538 1.02456C11.2917 1.03924 11.3215 1.05096 11.3423 1.05922L11.3668 1.06897L11.3738 1.07179L11.377 1.07308C11.3771 1.07313 11.3772 1.07317 11.0017 2L11.377 1.07308L12.0964 1.36453L11.0425 9.18467L4.9868 14.4714L0.957031 8.94306L1.9882 1.29114L2.52623 1.07317L2.90171 2C2.52623 1.07317 2.52611 1.07322 2.52623 1.07317L2.52966 1.07179L2.53667 1.06897L2.56111 1.05922C2.58194 1.05096 2.61172 1.03924 2.64963 1.02456C2.7254 0.995202 2.83387 0.953918 2.96838 0.904682C3.23681 0.806428 3.61202 0.675388 4.04028 0.543988ZM3.8129 2.72611L3.04639 8.41409L5.31662 11.5286L9.16087 8.17248L9.90365 2.66059C9.71767 2.59642 9.50509 2.52615 9.27649 2.45601C8.47314 2.20952 7.5827 2 6.95171 2C6.32072 2 5.43029 2.20952 4.62693 2.45601C4.31749 2.55096 4.03741 2.64613 3.8129 2.72611Z" fill="currentColor"/>
                </svg>
                Вы здесь
              </div>
            </div>
            <!-- Список магазинов -->
            <ul class="s-city__store-list">
              <li
                v-for="store in getStoreListByCityId(city.id)"
                class="s-item"
                :class="{ active: store.id === currentStoreId }"
                @click="getStore(store.id)">
                <div class="s-item__header">
                  <div class="s-item__address">{{ store.name }}</div>
                  <div class="s-item__info">{{ isMobile ? store.shortAddress : '{Timetable}' }}</div>
                </div>
                <div class="s-item__body" v-if="isMobile">
                  <a class="s-item__phone" v-for="phone in store.phone" :href="'tel:' + phone">{{ phone }}</a>
                </div>
                <div class="s-item__bottom">
                  <div class="s-item__info">{{ isMobile ? '{Timetable}' : store.shortAddress }}</div>
                  <div class="s-item__contacts">
                    <a class="s-item__link" v-if="store.instagram" :href="store.instagram">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.0009 0C7.28508 0 6.94424 0.0118751 5.87756 0.0604173C4.81297 0.109168 4.08629 0.277711 3.45045 0.525005C2.79274 0.780425 2.23481 1.12209 1.67898 1.67814C1.12272 2.23398 0.78105 2.7919 0.524797 3.44941C0.276878 4.08546 0.108126 4.81234 0.060209 5.87652C0.0125001 6.9432 0 7.28424 0 10.0001C0 12.716 0.0120835 13.0558 0.0604173 14.1224C0.109376 15.187 0.27792 15.9137 0.525005 16.5495C0.780633 17.2073 1.1223 17.7652 1.67835 18.321C2.23398 18.8773 2.7919 19.2198 3.4492 19.4752C4.08546 19.7225 4.81234 19.891 5.87673 19.9398C6.94341 19.9883 7.28403 20.0002 9.99969 20.0002C12.7158 20.0002 13.0556 19.9883 14.1222 19.9398C15.1868 19.891 15.9143 19.7225 16.5506 19.4752C17.2081 19.2198 17.7652 18.8773 18.3208 18.321C18.8771 17.7652 19.2187 17.2073 19.475 16.5498C19.7208 15.9137 19.8896 15.1868 19.9396 14.1226C19.9875 13.056 20 12.716 20 10.0001C20 7.28424 19.9875 6.9434 19.9396 5.87673C19.8896 4.81213 19.7208 4.08546 19.475 3.44962C19.2187 2.7919 18.8771 2.23398 18.3208 1.67814C17.7646 1.12189 17.2083 0.780216 16.55 0.525005C15.9125 0.277711 15.1854 0.109168 14.1208 0.0604173C13.0541 0.0118751 12.7145 0 9.99781 0H10.0009ZM9.09388 1.80118C9.36013 1.80076 9.65722 1.80118 9.99097 1.80118C12.661 1.80118 12.9775 1.81076 14.0318 1.85868C15.0069 1.90326 15.536 2.06618 15.8885 2.20305C16.3552 2.38431 16.6879 2.60098 17.0377 2.95098C17.3877 3.30098 17.6044 3.63432 17.7861 4.10099C17.9229 4.45308 18.0861 4.98225 18.1304 5.95726C18.1784 7.01144 18.1888 7.32811 18.1888 9.99689C18.1888 12.6657 18.1784 12.9823 18.1304 14.0365C18.0858 15.0115 17.9229 15.5407 17.7861 15.8928C17.6048 16.3595 17.3877 16.6918 17.0377 17.0415C16.6877 17.3916 16.3554 17.6082 15.8885 17.7895C15.5364 17.927 15.0069 18.0895 14.0318 18.1341C12.9777 18.182 12.661 18.1924 9.99097 18.1924C7.32074 18.1924 7.00427 18.182 5.9501 18.1341C4.97509 18.0891 4.44591 17.9261 4.0932 17.7893C3.62653 17.608 3.29319 17.3913 2.94319 17.0413C2.59319 16.6913 2.37652 16.3588 2.19485 15.892C2.05797 15.5399 1.89484 15.0107 1.85047 14.0357C1.80255 12.9815 1.79297 12.6648 1.79297 9.99439C1.79297 7.32394 1.80255 7.00894 1.85047 5.95476C1.89505 4.97975 2.05797 4.45058 2.19485 4.09808C2.3761 3.6314 2.59319 3.29807 2.94319 2.94806C3.29319 2.59806 3.62653 2.38139 4.0932 2.19972C4.44571 2.06222 4.97509 1.89972 5.9501 1.85493C6.87261 1.81326 7.23011 1.80076 9.09388 1.79868V1.80118ZM15.3484 3.46373C14.6859 3.46373 14.1484 4.00062 14.1484 4.66333C14.1484 5.32584 14.6859 5.86334 15.3484 5.86334C16.011 5.86334 16.5485 5.32584 16.5485 4.66333C16.5485 4.00082 16.011 3.46332 15.3484 3.46332V3.46373ZM9.99875 4.86337C7.16268 4.86337 4.86328 7.16277 4.86328 9.99884C4.86328 12.8349 7.16268 15.1333 9.99875 15.1333C12.8348 15.1333 15.1334 12.8349 15.1334 9.99884C15.1334 7.16277 12.8346 4.86337 9.99854 4.86337H9.99875ZM10.0131 6.66611C11.8539 6.66611 13.3464 8.15841 13.3464 9.99948C13.3464 11.8403 11.8539 13.3328 10.0131 13.3328C8.172 13.3328 6.67969 11.8403 6.67969 9.99948C6.67969 8.15841 8.172 6.66611 10.0131 6.66611Z" fill="url(#paint0_linear)"/>
                        <defs>
                          <linearGradient id="paint0_linear" x1="16.5385" y1="1.15386" x2="5.76908" y2="17.6924" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#536DE8"/>
                            <stop offset="0.366894" stop-color="#A84CA7"/>
                            <stop offset="0.751381" stop-color="#FC3436"/>
                            <stop offset="1" stop-color="#FFA10D"/>
                          </linearGradient>
                        </defs>
                      </svg>
                    </a>
                    <a class="s-item__link" v-if="store.vk" :href="store.vk">
                      <svg width="26" height="14" viewBox="0 0 26 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.005 13.8163C14.005 13.8163 14.4477 13.768 14.6745 13.5289C14.8821 13.3098 14.8749 12.8964 14.8749 12.8964C14.8749 12.8964 14.8473 10.9659 15.7605 10.6809C16.6604 10.4006 17.8159 12.5478 19.0423 13.3735C19.9686 13.9977 20.6718 13.8611 20.6718 13.8611L23.9488 13.8163C23.9488 13.8163 25.6623 13.7127 24.8499 12.39C24.7827 12.2816 24.3759 11.4112 22.4141 9.6232C20.3586 7.7516 20.6346 8.05431 23.1088 4.81642C24.6159 2.8447 25.2183 1.64095 25.0299 1.12623C24.8511 0.63389 23.7424 0.764631 23.7424 0.764631L20.0538 0.78701C20.0538 0.78701 19.7802 0.750497 19.5774 0.869459C19.3794 0.986066 19.251 1.25815 19.251 1.25815C19.251 1.25815 18.6679 2.78346 17.8891 4.08144C16.2464 6.81875 15.5901 6.96363 15.3213 6.79402C14.6961 6.39708 14.8521 5.20157 14.8521 4.35234C14.8521 1.69866 15.2625 0.592666 14.0542 0.30645C13.6534 0.211044 13.3582 0.148618 12.3323 0.138018C11.016 0.125062 9.90242 0.142729 9.27126 0.445435C8.85129 0.646847 8.52731 1.09678 8.7253 1.1227C8.96888 1.1545 9.52085 1.26875 9.81363 1.65979C10.1916 2.16509 10.1784 3.29817 10.1784 3.29817C10.1784 3.29817 10.3956 6.42182 9.67084 6.80933C9.17407 7.07552 8.49251 6.53253 7.0274 4.04846C6.27745 2.77639 5.71108 1.37004 5.71108 1.37004C5.71108 1.37004 5.60189 1.10738 5.4063 0.966042C5.16992 0.795255 4.83994 0.742252 4.83994 0.742252L1.33495 0.764631C1.33495 0.764631 0.808185 0.778765 0.614997 1.00373C0.443408 1.20279 0.601798 1.61621 0.601798 1.61621C0.601798 1.61621 3.34603 7.91886 6.45384 11.0955C9.30366 14.0071 12.5387 13.8163 12.5387 13.8163H14.005Z" fill="#4C6C91"/>
                      </svg>
                    </a>
                    <template v-if="!isMobile">
                      <a class="s-item__phone" v-for="phone in store.phone" :href="'tel:' + phone">{{ phone }}</a>
                    </template>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="s-shops__map" v-if="!isTabs || shownStoreInfo">
      
      <div class="s-active-shop" v-if="activeStore">
        <div class="s-active-shop__header">
          <button class="s-active-shop__btn-back" @click="back">
            <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M9.93342 20L-1.03312e-06 10L9.93342 1.20215e-06L11.9431 2L5.32546 8.58579L18 8.58579L18 11.4142L5.32546 11.4142L11.9431 18L9.93342 20Z" fill="#F4412D"/>
            </svg>
          </button>
          <div class="s-active-shop__name">{{ activeStore.name }}</div>
        </div>
        <div class="s-active-shop__body">
          <div class="s-active-shop__info">{{ activeStore.shortAddress }}</div>
          <a class="s-active-shop__phone" v-for="phone in activeStore.phone" :href="'tel:' + phone">{{ phone }}</a>
        </div>
        <div class="s-active-shop__footer">
          <div class="s-active-shop__info">{Timetable}</div>
          <div class="s-active-shop__social">
            <a class="s-active-shop__social-link" v-if="activeStore.instagram" :href="activeStore.instagram">
              <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.0009 0C7.28508 0 6.94424 0.0118751 5.87756 0.0604173C4.81297 0.109168 4.08629 0.277711 3.45045 0.525005C2.79274 0.780425 2.23481 1.12209 1.67898 1.67814C1.12272 2.23398 0.78105 2.7919 0.524797 3.44941C0.276878 4.08546 0.108126 4.81234 0.060209 5.87652C0.0125001 6.9432 0 7.28424 0 10.0001C0 12.716 0.0120835 13.0558 0.0604173 14.1224C0.109376 15.187 0.27792 15.9137 0.525005 16.5495C0.780633 17.2073 1.1223 17.7652 1.67835 18.321C2.23398 18.8773 2.7919 19.2198 3.4492 19.4752C4.08546 19.7225 4.81234 19.891 5.87673 19.9398C6.94341 19.9883 7.28403 20.0002 9.99969 20.0002C12.7158 20.0002 13.0556 19.9883 14.1222 19.9398C15.1868 19.891 15.9143 19.7225 16.5506 19.4752C17.2081 19.2198 17.7652 18.8773 18.3208 18.321C18.8771 17.7652 19.2187 17.2073 19.475 16.5498C19.7208 15.9137 19.8896 15.1868 19.9396 14.1226C19.9875 13.056 20 12.716 20 10.0001C20 7.28424 19.9875 6.9434 19.9396 5.87673C19.8896 4.81213 19.7208 4.08546 19.475 3.44962C19.2187 2.7919 18.8771 2.23398 18.3208 1.67814C17.7646 1.12189 17.2083 0.780216 16.55 0.525005C15.9125 0.277711 15.1854 0.109168 14.1208 0.0604173C13.0541 0.0118751 12.7145 0 9.99781 0H10.0009ZM9.09388 1.80118C9.36013 1.80076 9.65722 1.80118 9.99097 1.80118C12.661 1.80118 12.9775 1.81076 14.0318 1.85868C15.0069 1.90326 15.536 2.06618 15.8885 2.20305C16.3552 2.38431 16.6879 2.60098 17.0377 2.95098C17.3877 3.30098 17.6044 3.63432 17.7861 4.10099C17.9229 4.45308 18.0861 4.98225 18.1304 5.95726C18.1784 7.01144 18.1888 7.32811 18.1888 9.99689C18.1888 12.6657 18.1784 12.9823 18.1304 14.0365C18.0858 15.0115 17.9229 15.5407 17.7861 15.8928C17.6048 16.3595 17.3877 16.6918 17.0377 17.0415C16.6877 17.3916 16.3554 17.6082 15.8885 17.7895C15.5364 17.927 15.0069 18.0895 14.0318 18.1341C12.9777 18.182 12.661 18.1924 9.99097 18.1924C7.32074 18.1924 7.00427 18.182 5.9501 18.1341C4.97509 18.0891 4.44591 17.9261 4.0932 17.7893C3.62653 17.608 3.29319 17.3913 2.94319 17.0413C2.59319 16.6913 2.37652 16.3588 2.19485 15.892C2.05797 15.5399 1.89484 15.0107 1.85047 14.0357C1.80255 12.9815 1.79297 12.6648 1.79297 9.99439C1.79297 7.32394 1.80255 7.00894 1.85047 5.95476C1.89505 4.97975 2.05797 4.45058 2.19485 4.09808C2.3761 3.6314 2.59319 3.29807 2.94319 2.94806C3.29319 2.59806 3.62653 2.38139 4.0932 2.19972C4.44571 2.06222 4.97509 1.89972 5.9501 1.85493C6.87261 1.81326 7.23011 1.80076 9.09388 1.79868V1.80118ZM15.3484 3.46373C14.6859 3.46373 14.1484 4.00062 14.1484 4.66333C14.1484 5.32584 14.6859 5.86334 15.3484 5.86334C16.011 5.86334 16.5485 5.32584 16.5485 4.66333C16.5485 4.00082 16.011 3.46332 15.3484 3.46332V3.46373ZM9.99875 4.86337C7.16268 4.86337 4.86328 7.16277 4.86328 9.99884C4.86328 12.8349 7.16268 15.1333 9.99875 15.1333C12.8348 15.1333 15.1334 12.8349 15.1334 9.99884C15.1334 7.16277 12.8346 4.86337 9.99854 4.86337H9.99875ZM10.0131 6.66611C11.8539 6.66611 13.3464 8.15841 13.3464 9.99948C13.3464 11.8403 11.8539 13.3328 10.0131 13.3328C8.172 13.3328 6.67969 11.8403 6.67969 9.99948C6.67969 8.15841 8.172 6.66611 10.0131 6.66611Z" fill="url(#paint0_linear_2)"/>
                <defs>
                  <linearGradient id="paint0_linear_2" x1="16.5385" y1="1.15386" x2="5.76908" y2="17.6924" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#536DE8"/>
                    <stop offset="0.366894" stop-color="#A84CA7"/>
                    <stop offset="0.751381" stop-color="#FC3436"/>
                    <stop offset="1" stop-color="#FFA10D"/>
                  </linearGradient>
                </defs>
              </svg>
            </a>
            <a class="s-active-shop__social-link" v-if="activeStore.vk" :href="activeStore.vk">
              <svg viewBox="0 0 26 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.005 13.8163C14.005 13.8163 14.4477 13.768 14.6745 13.5289C14.8821 13.3098 14.8749 12.8964 14.8749 12.8964C14.8749 12.8964 14.8473 10.9659 15.7605 10.6809C16.6604 10.4006 17.8159 12.5478 19.0423 13.3735C19.9686 13.9977 20.6718 13.8611 20.6718 13.8611L23.9488 13.8163C23.9488 13.8163 25.6623 13.7127 24.8499 12.39C24.7827 12.2816 24.3759 11.4112 22.4141 9.6232C20.3586 7.7516 20.6346 8.05431 23.1088 4.81642C24.6159 2.8447 25.2183 1.64095 25.0299 1.12623C24.8511 0.63389 23.7424 0.764631 23.7424 0.764631L20.0538 0.78701C20.0538 0.78701 19.7802 0.750497 19.5774 0.869459C19.3794 0.986066 19.251 1.25815 19.251 1.25815C19.251 1.25815 18.6679 2.78346 17.8891 4.08144C16.2464 6.81875 15.5901 6.96363 15.3213 6.79402C14.6961 6.39708 14.8521 5.20157 14.8521 4.35234C14.8521 1.69866 15.2625 0.592666 14.0542 0.30645C13.6534 0.211044 13.3582 0.148618 12.3323 0.138018C11.016 0.125062 9.90242 0.142729 9.27126 0.445435C8.85129 0.646847 8.52731 1.09678 8.7253 1.1227C8.96888 1.1545 9.52085 1.26875 9.81363 1.65979C10.1916 2.16509 10.1784 3.29817 10.1784 3.29817C10.1784 3.29817 10.3956 6.42182 9.67084 6.80933C9.17407 7.07552 8.49251 6.53253 7.0274 4.04846C6.27745 2.77639 5.71108 1.37004 5.71108 1.37004C5.71108 1.37004 5.60189 1.10738 5.4063 0.966042C5.16992 0.795255 4.83994 0.742252 4.83994 0.742252L1.33495 0.764631C1.33495 0.764631 0.808185 0.778765 0.614997 1.00373C0.443408 1.20279 0.601798 1.61621 0.601798 1.61621C0.601798 1.61621 3.34603 7.91886 6.45384 11.0955C9.30366 14.0071 12.5387 13.8163 12.5387 13.8163H14.005Z" fill="#4C6C91"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      <div class="s-map">
        <div class="s-map__header">
          <button
            class="s-map__tab"
            :class="{ active: currentTab === 'map' }"
            @click="currentTab = 'map'"
          >Карта</button>
          <button
            class="s-map__tab"
            :class="{ active: currentTab === 'way' }"
            v-show="activeStore && (activeStore.wayOnAuto || activeStore.wayOnFoot || activeStore.wayImage)"
            @click="currentTab = 'way'"
          >Как добраться</button>
          <button
            class="s-map__tab"
            :class="{ active: currentTab === 'photo' }"
            v-show="activeStore && activeStore.gallery"
            @click="currentTab = 'photo'"
          >Фото</button>
        </div>
        <div class="s-map__content">
          <ShopListMap v-show="currentTab === 'map'" :currentStoreId="currentStoreId"/>
          
          <div
            v-if="activeStore"
            v-show="currentTab === 'way'"
            class="s-map__way"
          >
            <div v-if="activeStore.wayImage">
              <img :src="activeStore.wayImage" alt="">
            </div>
            <div v-if="activeStore.wayOnAuto">
              <b>Добраться на машине:</b>
              <p v-html="activeStore.wayOnAuto"></p>
            </div>
            <div v-if="activeStore.wayOnFoot">
              <b>Добраться пешком:</b>
              <p v-html="activeStore.wayOnFoot"></p>
            </div>
          </div>
          
          <div
            v-if="activeStore && activeStore.gallery"
            v-show="currentTab === 'photo'"
            class="s-map__gallery"
          >
            <img :src="activeStore.gallery" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';
  import SimpleBar from 'simplebar';

  import ShopListMap from './ShopListMap.vue';


  export default {
    name: "ShopList",
    components: {
      ShopListMap,
    },
    data() {
      return {
        currentTab: 'map',
        isMobile: document.documentElement.clientWidth < 768,
        isTabs: document.documentElement.clientWidth < 1240,
        shownStoreInfo: false,
        searchFieldValue: '',
        currentStoreId: null,
      }
    },
    mounted() {

      if (document.documentElement.clientWidth >= 1240) {
        this.SimpleBar = new SimpleBar(this.$refs.scrollEl, { autoHide: false });
      }


      this.headerEl = document.querySelector('.page-header');


      const searchInput = document.querySelectorAll('.search-fild__input');

      searchInput.forEach(item => {
        this.searchFieldValue = item.value.trim().toLowerCase();
        item.addEventListener('input', () => {
          this.searchFieldValue = item.value.trim().toLowerCase();
        });
      });
    },
    computed: {
      ...mapGetters({
        getStoreListByCityId: 'getStoreListByCityId',
      }),
      ...mapState({
        // cityList: 'cityList',
        cityId: state => state.cityId,
        sortedCityList: (state) => {
          const index = state.cityList.findIndex(item => item.id === state.cityId);
          if (index === -1) return state.cityList;

          const arr = [...state.cityList];
          arr.unshift(...arr.splice(index, 1));

          return arr;
        },
      }),

      filtredCityList() {
        return this.sortedCityList.filter(item => item.name.toLowerCase().indexOf(this.searchFieldValue) !== -1);
      },

      activeStore() {
        return this.$store.getters.getStoreById(this.currentStoreId);
      },
    },
    methods: {
      getStore(storeId) {
        this.currentTab = 'map';
        this.currentStoreId = storeId;
        this.shownStoreInfo = true;

        if (this.headerEl && document.documentElement.clientWidth < 1240) {
          this.headerEl.style.display = 'none';
        }


        // this.$nextTick(function () {
        //   this.$root.$emit('map:set', storeId);
        // });
      },

      back() {
        this.shownStoreInfo = false;
        this.currentStoreId = null;

        if (this.headerEl) {
          this.headerEl.style.display = '';
        }
      }
    },
  }
</script>
