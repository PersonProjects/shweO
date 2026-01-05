import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { BRAND_COLORS } from '@/config/colors'

export const vuetify = createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          background: '#ffffff',
          surface: '#ffffff',
          primary: BRAND_COLORS.primary,
          secondary: BRAND_COLORS.secondary,
          success: BRAND_COLORS.success,
          warning: BRAND_COLORS.warning,
          error: BRAND_COLORS.error,
          info: BRAND_COLORS.info,
        },
      },
      dark: {
        dark: true,
        colors: {
          background: '#0f172a',
          surface: '#020617',
          primary: BRAND_COLORS.primary,
          secondary: BRAND_COLORS.secondary,
          success: BRAND_COLORS.success,
          warning: BRAND_COLORS.warning,
          error: BRAND_COLORS.error,
          info: BRAND_COLORS.info,
        },
      },
    },
  },
})

export default vuetify
