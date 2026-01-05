import { ChannelConnection, Channel } from '@/types/commerce'

export const mockChannels: ChannelConnection[] = [
  {
    channel: Channel.TELEGRAM,
    isConnected: true,
    isEnabled: true,
    botToken: '@mathandar_shop_bot',
    webhookUrl: 'https://api.shweo.com/webhooks/telegram',
    lastSyncAt: new Date(),
  },
  {
    channel: Channel.MESSENGER,
    isConnected: true,
    isEnabled: true,
    webhookUrl: 'https://api.shweo.com/webhooks/messenger',
    lastSyncAt: new Date(),
  },
  {
    channel: Channel.VIBER,
    isConnected: false,
    isEnabled: false,
  },
]
