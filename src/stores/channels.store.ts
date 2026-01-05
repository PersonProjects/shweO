import { defineStore } from 'pinia'
import { ChannelConnection, Channel } from '@/types/commerce'
import { mockChannels } from '@/mocks/channels'

export const useChannelsStore = defineStore('channels', {
  state: () => ({
    channels: [...mockChannels] as ChannelConnection[],
    loading: false,
  }),

  getters: {
    // All channels
    allChannels: (state) => state.channels,

    // Connected channels
    connectedChannels: (state) =>
      state.channels.filter(c => c.isConnected),

    // Enabled channels
    enabledChannels: (state) =>
      state.channels.filter(c => c.isEnabled),

    // Get channel by type
    getChannel: (state) => (channel: Channel) =>
      state.channels.find(c => c.channel === channel),

    // Check if channel is connected
    isChannelConnected: (state) => (channel: Channel) =>
      state.channels.find(c => c.channel === channel)?.isConnected ?? false,

    // Check if channel is enabled
    isChannelEnabled: (state) => (channel: Channel) =>
      state.channels.find(c => c.channel === channel)?.isEnabled ?? false,
  },

  actions: {
    // Toggle channel enabled status
    toggleChannel(channel: Channel) {
      const ch = this.channels.find(c => c.channel === channel)
      if (ch) {
        ch.isEnabled = !ch.isEnabled
        ch.lastSyncAt = new Date()
      }
    },

    // Connect channel
    connectChannel(channel: Channel, config: Partial<ChannelConnection>) {
      const ch = this.channels.find(c => c.channel === channel)
      if (ch) {
        ch.isConnected = true
        ch.isEnabled = true
        Object.assign(ch, config, { lastSyncAt: new Date() })
      }
    },

    // Disconnect channel
    disconnectChannel(channel: Channel) {
      const ch = this.channels.find(c => c.channel === channel)
      if (ch) {
        ch.isConnected = false
        ch.isEnabled = false
        ch.botToken = undefined
        ch.webhookUrl = undefined
      }
    },

    // Update channel configuration
    updateChannelConfig(channel: Channel, config: Partial<ChannelConnection>) {
      const ch = this.channels.find(c => c.channel === channel)
      if (ch) {
        Object.assign(ch, config, { lastSyncAt: new Date() })
      }
    },

    // Simulate syncing
    async syncChannel(channel: Channel) {
      this.loading = true
      await new Promise(resolve => setTimeout(resolve, 1000))
      const ch = this.channels.find(c => c.channel === channel)
      if (ch) {
        ch.lastSyncAt = new Date()
      }
      this.loading = false
    }
  }
})
