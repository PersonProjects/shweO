<template>
  <div>
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-h4 font-weight-bold mb-2">{{ $t('channels.title') }}</h1>
      <p class="text-subtitle-1 text-medium-emphasis">
        {{ $t('channels.configuration') }}
      </p>
    </div>

    <!-- Channels List -->
    <v-row>
      <v-col
        v-for="channel in channels"
        :key="channel.channel"
        cols="12"
        md="6"
        lg="4"
      >
        <v-card :class="{ 'border-2 border-success': channel.isConnected }">
          <v-card-title class="d-flex align-center">
            <v-avatar
              :color="getChannelColor(channel.channel)"
              size="40"
              class="mr-3"
            >
              <v-icon color="white">{{ getChannelIcon(channel.channel) }}</v-icon>
            </v-avatar>
            <span>{{ $t(`channels.${channel.channel}`) }}</span>
          </v-card-title>

          <v-card-text>
            <!-- Connection Status -->
            <div class="mb-4">
              <v-chip
                :color="channel.isConnected ? 'success' : 'grey'"
                class="mr-2"
              >
                <v-icon start size="small">
                  {{ channel.isConnected ? 'mdi-check-circle' : 'mdi-close-circle' }}
                </v-icon>
                {{ channel.isConnected ? $t('channels.connected') : $t('channels.disconnected') }}
              </v-chip>

              <v-chip
                v-if="channel.isConnected"
                :color="channel.isEnabled ? 'success' : 'warning'"
              >
                {{ channel.isEnabled ? $t('channels.enabled') : $t('channels.disabled') }}
              </v-chip>
            </div>

            <!-- Channel Details -->
            <div v-if="channel.isConnected" class="mb-3">
              <div v-if="channel.botToken" class="mb-2">
                <p class="text-caption text-medium-emphasis mb-1">{{ $t('channels.botToken') }}:</p>
                <v-chip size="small" variant="tonal">{{ channel.botToken }}</v-chip>
              </div>

              <div v-if="channel.webhookUrl" class="mb-2">
                <p class="text-caption text-medium-emphasis mb-1">{{ $t('channels.webhookUrl') }}:</p>
                <p class="text-body-2 text-truncate">{{ channel.webhookUrl }}</p>
              </div>

              <div v-if="channel.lastSyncAt">
                <p class="text-caption text-medium-emphasis">
                  {{ $t('channels.lastSync') }}: {{ formatDateTime(channel.lastSyncAt) }}
                </p>
              </div>
            </div>

            <!-- Not Connected Info -->
            <v-alert
              v-if="!channel.isConnected"
              type="info"
              variant="tonal"
              density="compact"
            >
              {{ $t('channels.notConnectedInfo', 'Connect this channel to start receiving orders') }}
            </v-alert>
          </v-card-text>

          <v-card-actions>
            <!-- Connect/Disconnect Button -->
            <v-btn
              v-if="!channel.isConnected"
              color="success"
              variant="tonal"
              @click="connectChannel(channel.channel)"
            >
              <v-icon start>mdi-link-variant</v-icon>
              {{ $t('channels.connect') }}
            </v-btn>

            <v-btn
              v-else
              color="error"
              variant="text"
              @click="disconnectChannel(channel.channel)"
            >
              <v-icon start>mdi-link-variant-off</v-icon>
              {{ $t('channels.disconnect') }}
            </v-btn>

            <v-spacer></v-spacer>

            <!-- Enable/Disable Toggle -->
            <v-switch
              v-if="channel.isConnected"
              v-model="channel.isEnabled"
              color="success"
              hide-details
              density="compact"
              :label="channel.isEnabled ? $t('channels.enabled') : $t('channels.disabled')"
              @change="toggleChannel(channel.channel)"
            ></v-switch>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Orders by Channel Statistics -->
    <v-card class="mt-6">
      <v-card-title>{{ $t('dashboard.channelBreakdown') }}</v-card-title>
      <v-card-text>
        <v-row>
          <v-col
            v-for="stat in ordersByChannel"
            :key="stat.channel"
            cols="12"
            md="4"
          >
            <v-card variant="tonal" :color="getChannelColor(stat.channel)">
              <v-card-text>
                <div class="d-flex align-center mb-2">
                  <v-icon :color="getChannelColor(stat.channel)" size="32" class="mr-3">
                    {{ getChannelIcon(stat.channel) }}
                  </v-icon>
                  <h3 class="text-h5 font-weight-bold">{{ stat.count }}</h3>
                </div>
                <p class="text-subtitle-2">{{ $t(`channels.${stat.channel}`) }}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Connect Channel Dialog -->
    <v-dialog
      v-model="showConnectDialog"
      max-width="600"
    >
      <v-card>
        <v-card-title class="bg-success">
          {{ $t('channels.connect') }} {{ selectedChannelName }}
        </v-card-title>

        <v-card-text class="pa-6">
          <v-alert
            type="info"
            variant="tonal"
            class="mb-4"
          >
            {{ $t('channels.connectInstructions', 'Follow the instructions to connect this channel') }}
          </v-alert>

          <v-text-field
            v-if="selectedChannel === Channel.TELEGRAM"
            v-model="connectForm.botToken"
            :label="$t('channels.botToken')"
            variant="outlined"
            placeholder="@your_bot_name"
            class="mb-4"
          ></v-text-field>

          <v-text-field
            v-model="connectForm.webhookUrl"
            :label="$t('channels.webhookUrl')"
            variant="outlined"
            disabled
            class="mb-4"
          ></v-text-field>
        </v-card-text>

        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn
            variant="text"
            @click="showConnectDialog = false"
          >
            {{ $t('common.cancel') }}
          </v-btn>
          <v-btn
            color="success"
            @click="confirmConnect"
          >
            {{ $t('channels.connect') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useChannelsStore } from '@/stores/channels.store'
import { useOrdersStore } from '@/stores/orders.store'
import { Channel } from '@/types/commerce'
import { useToast } from 'vue-toast-notification'

const { t } = useI18n()
const channelsStore = useChannelsStore()
const ordersStore = useOrdersStore()
const toast = useToast()

const showConnectDialog = ref(false)
const selectedChannel = ref<Channel | null>(null)

const connectForm = ref({
  botToken: '',
  webhookUrl: ''
})

const channels = computed(() => channelsStore.allChannels)
const ordersByChannel = computed(() => ordersStore.dashboardStats.ordersByChannel)

const selectedChannelName = computed(() => {
  return selectedChannel.value ? t(`channels.${selectedChannel.value}`) : ''
})

const getChannelColor = (channel: Channel) => {
  const colors: Record<Channel, string> = {
    [Channel.TELEGRAM]: 'info',
    [Channel.MESSENGER]: 'primary',
    [Channel.VIBER]: 'purple',
  }
  return colors[channel]
}

const getChannelIcon = (channel: Channel) => {
  const icons: Record<Channel, string> = {
    [Channel.TELEGRAM]: 'mdi-send',
    [Channel.MESSENGER]: 'mdi-facebook-messenger',
    [Channel.VIBER]: 'mdi-phone',
  }
  return icons[channel]
}

const formatDateTime = (date: Date) => {
  return new Date(date).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const connectChannel = (channel: Channel) => {
  selectedChannel.value = channel
  connectForm.value = {
    botToken: channel === Channel.TELEGRAM ? '@mathandar_shop_bot' : '',
    webhookUrl: `https://api.shweo.com/webhooks/${channel}`
  }
  showConnectDialog.value = true
}

const confirmConnect = () => {
  if (selectedChannel.value) {
    channelsStore.connectChannel(selectedChannel.value, {
      botToken: connectForm.value.botToken,
      webhookUrl: connectForm.value.webhookUrl
    })
    toast.success(t('toast.channelUpdated'))
    showConnectDialog.value = false
  }
}

const disconnectChannel = (channel: Channel) => {
  channelsStore.disconnectChannel(channel)
  toast.success(t('toast.channelUpdated'))
}

const toggleChannel = (channel: Channel) => {
  channelsStore.toggleChannel(channel)
  toast.success(t('toast.channelUpdated'))
}
</script>
