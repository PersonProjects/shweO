<template>
  <v-app>
    <v-app-bar
      color="primary"
      prominent
      density="compact"
    >
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="uiStore.toggleDrawer()"
      ></v-app-bar-nav-icon>

      <v-toolbar-title class="text-h6 font-weight-bold">
        ShweO
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- Language Switcher -->
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn
            icon
            v-bind="props"
          >
            <v-icon>mdi-translate</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            @click="changeLanguage('en')"
            :class="{ 'bg-success-lighten-4': uiStore.language === 'en' }"
          >
            <v-list-item-title>English</v-list-item-title>
          </v-list-item>
          <v-list-item
            @click="changeLanguage('mm')"
            :class="{ 'bg-success-lighten-4': uiStore.language === 'mm' }"
          >
            <v-list-item-title>မြန်မာ</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- Theme Toggle -->
      <v-btn
        icon
        @click="toggleTheme"
      >
        <v-icon>
          {{ uiStore.resolvedTheme === 'dark' ? 'mdi-weather-sunny' : 'mdi-weather-night' }}
        </v-icon>
      </v-btn>

      <!-- Notifications Badge -->
      <v-btn icon>
        <v-badge
          :content="ordersStore.unseenCount"
          :model-value="ordersStore.unseenCount > 0"
          color="error"
        >
          <v-icon>mdi-bell</v-icon>
        </v-badge>
      </v-btn>
    </v-app-bar>

    <!-- Navigation Drawer -->
    <v-navigation-drawer
      v-model="uiStore.drawer"
      :rail="uiStore.rail && !uiStore.isMobile"
      permanent
      @click="uiStore.rail && !uiStore.isMobile ? uiStore.toggleRail() : null"
    >
      <v-list density="compact" nav>
        <!-- Shop Info -->
        <v-list-item
          prepend-icon="mdi-store"
          :title="shopName"
          :subtitle="$t('settings.shop')"
          class="mb-2"
        ></v-list-item>

        <v-divider class="mb-2"></v-divider>

        <!-- Dashboard -->
        <v-list-item
          prepend-icon="mdi-view-dashboard"
          :title="$t('nav.dashboard')"
          :to="{ name: 'dashboard' }"
          exact
        ></v-list-item>

        <!-- Orders -->
        <v-list-item
          prepend-icon="mdi-package-variant-closed"
          :title="$t('nav.orders')"
          :to="{ name: 'orders' }"
        >
          <template v-slot:append v-if="ordersStore.unseenCount > 0">
            <v-chip
              color="error"
              size="x-small"
              class="ml-2"
            >
              {{ ordersStore.unseenCount }}
            </v-chip>
          </template>
        </v-list-item>

        <!-- Products -->
        <v-list-item
          prepend-icon="mdi-package"
          :title="$t('nav.products')"
          :to="{ name: 'products' }"
        >
          <template v-slot:append v-if="productsStore.lowStockProducts.length > 0">
            <v-chip
              color="warning"
              size="x-small"
              class="ml-2"
            >
              {{ productsStore.lowStockProducts.length }}
            </v-chip>
          </template>
        </v-list-item>

        <!-- Channels -->
        <v-list-item
          prepend-icon="mdi-chat"
          :title="$t('nav.channels')"
          :to="{ name: 'channels' }"
        ></v-list-item>

        <v-divider class="my-2"></v-divider>

        <!-- Settings -->
        <v-list-item
          prepend-icon="mdi-cog"
          :title="$t('nav.settings')"
          :to="{ name: 'settings' }"
        ></v-list-item>
      </v-list>

      <!-- Rail Toggle -->
      <template v-slot:append v-if="!uiStore.isMobile">
        <div class="pa-2">
          <v-btn
            block
            @click.stop="uiStore.toggleRail()"
            icon
          >
            <v-icon>
              {{ uiStore.rail ? 'mdi-chevron-right' : 'mdi-chevron-left' }}
            </v-icon>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from 'vuetify'
import { useUiStore } from '@/stores/ui.store'
import { useOrdersStore } from '@/stores/orders.store'
import { useProductsStore } from '@/stores/products.store'

const { locale } = useI18n()
const theme = useTheme()
const uiStore = useUiStore()
const ordersStore = useOrdersStore()
const productsStore = useProductsStore()

const shopName = computed(() => 'Ma Thandar Shop')

// Change language
const changeLanguage = (lang: 'en' | 'mm') => {
  uiStore.toggleLang(lang)
  locale.value = lang
}

// Toggle theme
const toggleTheme = () => {
  const newTheme = uiStore.resolvedTheme === 'dark' ? 'light' : 'dark'
  uiStore.setTheme(newTheme)
  theme.global.name.value = newTheme
}

// Watch theme changes
theme.global.name.value = uiStore.resolvedTheme
</script>
