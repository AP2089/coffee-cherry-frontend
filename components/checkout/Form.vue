<template>
  <form class="space-y-6" @submit="onSubmit">
    <div class="grid md:grid-cols-2 gap-5">
      <label class="block">
        <span class="text-[10px] tracking-[0.18em] uppercase text-bone/40">{{
          $t('checkout.fields.name')
        }}</span>
        <input v-model="name" v-bind="nameAttrs" type="text" class="field" autocomplete="name" />
        <span v-if="errors.name" class="error">{{ errors.name }}</span>
      </label>

      <label class="block">
        <span class="text-[10px] tracking-[0.18em] uppercase text-bone/40">{{
          $t('checkout.fields.phone')
        }}</span>
        <input v-model="phone" v-bind="phoneAttrs" type="tel" class="field" autocomplete="tel" />
        <span v-if="errors.phone" class="error">{{ errors.phone }}</span>
      </label>

      <label class="block md:col-span-2">
        <span class="text-[10px] tracking-[0.18em] uppercase text-bone/40">{{
          $t('checkout.fields.email')
        }}</span>
        <input
          v-model="email"
          v-bind="emailAttrs"
          type="email"
          class="field"
          autocomplete="email"
        />
        <span v-if="errors.email" class="error">{{ errors.email }}</span>
      </label>

      <label class="block">
        <span class="text-[10px] tracking-[0.18em] uppercase text-bone/40">{{
          $t('checkout.fields.city')
        }}</span>
        <input
          v-model="city"
          v-bind="cityAttrs"
          type="text"
          class="field"
          autocomplete="address-level2"
        />
        <span v-if="errors.city" class="error">{{ errors.city }}</span>
      </label>

      <label class="block">
        <span class="text-[10px] tracking-[0.18em] uppercase text-bone/40">{{
          $t('checkout.fields.address')
        }}</span>
        <input
          v-model="address"
          v-bind="addressAttrs"
          type="text"
          class="field"
          autocomplete="street-address"
        />
        <span v-if="errors.address" class="error">{{ errors.address }}</span>
      </label>

      <label class="block md:col-span-2">
        <span class="text-[10px] tracking-[0.18em] uppercase text-bone/40">{{
          $t('checkout.fields.comment')
        }}</span>
        <textarea v-model="comment" v-bind="commentAttrs" rows="4" class="field resize-none" />
      </label>
    </div>

    <button
      type="submit"
      class="magnetic-btn magnetic-btn--filled px-8 py-4 text-xs w-full md:w-auto"
      :disabled="loading"
    >
      {{ loading ? $t('checkout.submitting') : $t('checkout.submit') }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import type { Customer } from '~/types'

const props = defineProps<{ loading?: boolean }>()
const emit = defineEmits<{ submit: [customer: Customer] }>()
const { t } = useI18n()

const validationSchema = computed(() =>
  toTypedSchema(
    z.object({
      name: z.string().trim().min(2, t('checkout.errors.name')),
      phone: z.string().trim().min(6, t('checkout.errors.phone')),
      email: z.string().trim().email(t('checkout.errors.email')),
      city: z.string().trim().min(2, t('checkout.errors.city')),
      address: z.string().trim().min(5, t('checkout.errors.address')),
      comment: z.string().trim(),
    }),
  ),
)

const { handleSubmit, defineField, errors } = useForm({
  validationSchema,
  initialValues: {
    name: '',
    phone: '',
    email: '',
    city: '',
    address: '',
    comment: '',
  },
})

const [name, nameAttrs] = defineField('name')
const [phone, phoneAttrs] = defineField('phone')
const [email, emailAttrs] = defineField('email')
const [city, cityAttrs] = defineField('city')
const [address, addressAttrs] = defineField('address')
const [comment, commentAttrs] = defineField('comment')

const onSubmit = handleSubmit((values) => {
  if (props.loading) return

  emit('submit', {
    name: values.name,
    phone: values.phone,
    email: values.email,
    city: values.city,
    address: values.address,
    comment: values.comment || '',
  })
})
</script>

<style scoped lang="scss">
@use '../../assets/scss/variables' as *;

.field {
  @apply mt-2 w-full bg-transparent border-0 border-b border-bone/20 px-0 py-3 text-bone outline-none transition-colors duration-300;
  font-family: 'Manrope', sans-serif;

  &:focus {
    border-color: $bronze;
  }
}

.error {
  @apply mt-2 block text-xs text-ember;
}
</style>
