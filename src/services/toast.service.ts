import { useToast } from 'vue-toast-notification'

const toast = useToast({
  position: 'top',
  duration: 3000,
  dismissible: true,
})

function withIcon(icon: string, message: string) {
  return `
    <div style="display:flex; align-items:center; gap:8px;">
      <i class="mdi ${icon}"></i>
      <span>${message}</span>
    </div>
  `
}

export const notify = {
  success(message: string) {
    toast.success(withIcon('mdi-check-circle', message))
  },
  error(message: string) {
    toast.error(withIcon('mdi-alert-circle', message))
  },
  info(message: string) {
    toast.info(withIcon('mdi-information', message))
  },
  warning(message: string) {
    toast.warning(withIcon('mdi-alert', message))
  },
}
