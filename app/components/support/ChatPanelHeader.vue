<script setup lang="ts">
interface IProps {
  profileReady: boolean
  isConnected: boolean
}

interface IEmits {
  close: []
}

defineProps<IProps>()
const emit = defineEmits<IEmits>()
</script>

<template>
  <CardHeader
    class="shrink-0 flex-row items-start gap-3 space-y-0 border-b border-border px-4 py-3"
  >
    <div class="flex min-w-0 flex-1 items-start gap-2">
      <CardTitle class="font-display text-lg tracking-tight">{{ $t('support.title') }}</CardTitle>
      <span
        v-if="profileReady"
        class="mt-1.5 inline-flex h-2 w-2 shrink-0 rounded-full"
        :class="isConnected ? 'bg-success' : 'bg-destructive/80'"
        :title="isConnected ? $t('support.online') : $t('support.offline')"
      />
    </div>
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      class="ml-auto shrink-0 cursor-pointer text-muted-foreground hover:text-foreground"
      :aria-label="$t('support.close')"
      @click="emit('close')"
    >
      <IconsClose class="h-4 w-4" />
    </Button>
  </CardHeader>
</template>
