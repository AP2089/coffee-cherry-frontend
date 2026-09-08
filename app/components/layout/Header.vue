<template>
  <header
    class="fixed top-0 inset-x-0 z-30 transition-all duration-500 ease-premium"
    :class="scrolled || menuOpen ? 'bg-background/80 backdrop-blur-md' : 'bg-transparent'"
  >
    <div
      class="mx-auto max-w-content px-5 md:px-8 lg:px-12 h-16 md:h-20 flex items-center justify-between"
    >
      <NuxtLink
        :to="localePath('/')"
        class="font-display text-xl md:text-2xl tracking-tight font-bold"
      >
        {{ $t('brand.name.short') }}
        <span class="text-primary">
          {{ ' ' + $t('brand.lab') }}
        </span>
      </NuxtLink>

      <div class="flex items-center gap-4 md:gap-10">
        <nav
          class="hidden md:flex items-center gap-8 md:gap-10 text-sm tracking-[0.18em] uppercase text-muted-foreground"
        >
          <NuxtLink
            :to="{ path: localePath('/'), hash: '#collection' }"
            class="hover:text-foreground transition-colors duration-300"
          >
            {{ $t('nav.collection') }}
          </NuxtLink>
          <NuxtLink
            :to="localePath('/story')"
            class="hover:text-foreground transition-colors duration-300"
          >
            {{ $t('nav.story') }}
          </NuxtLink>
          <NuxtLink
            :to="localePath('/contacts')"
            class="hover:text-foreground transition-colors duration-300"
          >
            {{ $t('footer.visit') }}
          </NuxtLink>
        </nav>

        <NuxtLink
          :to="localePath('/cart')"
          class="relative flex items-center gap-2 text-sm tracking-[0.14em] uppercase text-foreground/80 hover:text-foreground transition-colors"
          :aria-label="$t('nav.open.cart')"
        >
          <span class="hidden sm:inline">{{ $t('nav.cart') }}</span>
          <Badge variant="cart">{{ cart.getItemsCount }}</Badge>
        </NuxtLink>

        <ToggleGroup
          v-model="localeModel"
          type="single"
          class="hidden md:flex rounded-full border border-border bg-secondary/60 p-0.5"
        >
          <ToggleGroupItem
            v-for="item in locales"
            :key="item.code"
            :value="item.code"
            variant="pill"
            class="rounded-full cursor-pointer"
            @click="navigateToLocale(item.code)"
          >
            {{ item.code }}
          </ToggleGroupItem>
        </ToggleGroup>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          class="md:hidden text-foreground/80 hover:text-foreground"
          :aria-expanded="menuOpen"
          aria-controls="mobile-nav"
          :aria-label="$t('nav.menu')"
          @click="menuOpen = true"
        >
          <svg
            class="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            aria-hidden="true"
          >
            <path stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </Button>
      </div>
    </div>

    <Sheet :open="menuOpen" @update:open="menuOpen = $event">
      <SheetContent side="top" class="border-border bg-background/95 pt-16 md:hidden">
        <nav id="mobile-nav" class="flex flex-col gap-1">
          <Button
            variant="ghost"
            class="justify-start px-2 py-4 text-sm tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground border-b border-border rounded-none"
            as-child
          >
            <NuxtLink :to="{ path: localePath('/'), hash: '#collection' }" @click="closeMenu">
              {{ $t('nav.collection') }}
            </NuxtLink>
          </Button>
          <Button
            variant="ghost"
            class="justify-start px-2 py-4 text-sm tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground border-b border-border rounded-none"
            as-child
          >
            <NuxtLink :to="localePath('/story')" @click="closeMenu">
              {{ $t('nav.story') }}
            </NuxtLink>
          </Button>
          <Button
            variant="ghost"
            class="justify-start px-2 py-4 text-sm tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground border-b border-border rounded-none"
            as-child
          >
            <NuxtLink :to="localePath('/contacts')" @click="closeMenu">
              {{ $t('footer.visit') }}
            </NuxtLink>
          </Button>
          <div class="flex items-center justify-end px-2 py-4">
            <ToggleGroup
              v-model="localeModel"
              type="single"
              class="rounded-full border border-border bg-secondary/60 p-0.5"
            >
              <ToggleGroupItem
                v-for="item in locales"
                :key="item.code"
                :value="item.code"
                variant="pill"
                class="rounded-full text-sm cursor-pointer"
                @click="navigateToLocale(item.code)"
              >
                {{ item.code }}
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  </header>
</template>

<script setup lang="ts">
const cart = useCartStore()
const route = useRoute()
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const localePath = useLocalePath()
const scrolled = ref(false)
const menuOpen = ref(false)

const localeModel = computed({
  get: () => locale.value,
  set: () => {},
})

function navigateToLocale(code: string) {
  closeMenu()
  navigateTo(switchLocalePath(code))
}

function closeMenu() {
  menuOpen.value = false
}

watch(
  () => route.path,
  () => {
    closeMenu()
  },
)

watch(menuOpen, (open) => {
  if (!import.meta.client) return
  document.body.style.overflow = open ? 'hidden' : ''
})

onMounted(() => {
  const onScroll = () => {
    scrolled.value = window.scrollY > 24
  }

  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    document.body.style.overflow = ''
  })
})
</script>
