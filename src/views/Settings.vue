<template>
  <div>
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-h4 font-weight-bold mb-2">{{ $t('settings.title') }}</h1>
      <p class="text-subtitle-1 text-medium-emphasis">
        {{ $t('settings.appearance') }}
      </p>
    </div>

    <!-- Settings Cards -->
    <v-row>
      <!-- Language Settings -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>{{ $t('settings.language') }}</v-card-title>
          <v-card-text>
            <v-select
              v-model="selectedLanguage"
              :label="$t('settings.language')"
              :items="languageOptions"
              variant="outlined"
              @update:model-value="changeLanguage"
            ></v-select>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Theme Settings -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>{{ $t('settings.theme') }}</v-card-title>
          <v-card-text>
            <v-select
              v-model="selectedTheme"
              :label="$t('settings.theme')"
              :items="themeOptions"
              variant="outlined"
              @update:model-value="changeTheme"
            ></v-select>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Shop Settings -->
      <v-col cols="12">
        <v-card>
          <v-card-title>{{ $t('settings.shop') }}</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="shopName"
              :label="$t('settings.shopName')"
              variant="outlined"
              readonly
              hint="Shop name can be updated in account settings"
              persistent-hint
            ></v-text-field>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- About Section -->
    <v-card class="mt-6">
      <v-card-title>About ShweO</v-card-title>
      <v-card-text>
        <p class="text-body-1 mb-4">
          ShweO is a social commerce order management system designed for Myanmar sellers.
        </p>
        <p class="text-body-2 text-medium-emphasis">
          Version 1.0.0 (Prototype)
        </p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from 'vuetify'
import { useUiStore } from '@/stores/ui.store'

const { t, locale } = useI18n()
const theme = useTheme()
const uiStore = useUiStore()

const shopName = ref('Ma Thandar Shop')
const selectedLanguage = ref(uiStore.language)
const selectedTheme = ref(uiStore.theme)

const languageOptions = computed(() => [
  { title: 'English', value: 'en' },
  { title: 'မြန်မာ', value: 'mm' }
])

const themeOptions = computed(() => [
  { title: t('settings.lightMode'), value: 'light' },
  { title: t('settings.darkMode'), value: 'dark' },
  { title: t('settings.systemMode'), value: 'system' }
])

const changeLanguage = (lang: 'en' | 'mm') => {
  uiStore.toggleLang(lang)
  locale.value = lang
}

const changeTheme = (newTheme: 'light' | 'dark' | 'system') => {
  uiStore.setTheme(newTheme)
  theme.global.name.value = uiStore.resolvedTheme
}
</script>
