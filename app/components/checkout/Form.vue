<template>
  <form class="space-y-6" @submit="onSubmit">
    <div class="grid md:grid-cols-2 gap-5">
      <div class="block">
        <Label class="text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
          {{ $t('checkout.fields.name') }}
        </Label>
        <Input
          v-model="name"
          v-bind="nameAttrs"
          type="text"
          class="field-underline"
          autocomplete="name"
        />
        <p v-if="errors.name" class="mt-2 text-xs text-destructive">{{ errors.name }}</p>
      </div>

      <div class="block">
        <Label class="text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
          {{ $t('checkout.fields.phone') }}
        </Label>
        <Input
          v-model="phone"
          v-bind="phoneAttrs"
          type="tel"
          class="field-underline"
          autocomplete="tel"
        />
        <p v-if="errors.phone" class="mt-2 text-xs text-destructive">{{ errors.phone }}</p>
      </div>

      <div class="block md:col-span-2">
        <Label class="text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
          {{ $t('checkout.fields.email') }}
        </Label>
        <Input
          v-model="email"
          v-bind="emailAttrs"
          type="email"
          class="field-underline"
          autocomplete="email"
        />
        <p v-if="errors.email" class="mt-2 text-xs text-destructive">{{ errors.email }}</p>
      </div>

      <div class="block">
        <Label class="text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
          {{ $t('checkout.fields.city') }}
        </Label>
        <Input
          v-model="city"
          v-bind="cityAttrs"
          type="text"
          class="field-underline"
          autocomplete="address-level2"
        />
        <p v-if="errors.city" class="mt-2 text-xs text-destructive">{{ errors.city }}</p>
      </div>

      <div class="block">
        <Label class="text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
          {{ $t('checkout.fields.address') }}
        </Label>
        <Input
          v-model="address"
          v-bind="addressAttrs"
          type="text"
          class="field-underline"
          autocomplete="street-address"
        />
        <p v-if="errors.address" class="mt-2 text-xs text-destructive">{{ errors.address }}</p>
      </div>

      <div class="block md:col-span-2">
        <Label class="text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
          {{ $t('checkout.fields.comment') }}
        </Label>
        <Textarea
          v-model="comment"
          v-bind="commentAttrs"
          rows="4"
          class="field-underline resize-none"
        />
      </div>

      <div class="block md:col-span-2">
        <FormPersonalDataConsent
          v-model="personalDataConsent"
          v-bind="personalDataConsentAttrs"
          :error="errors.personalDataConsent"
        />
      </div>
    </div>

    <Button
      type="submit"
      variant="magnetic-filled"
      class="w-full px-8 py-4 md:w-auto"
      :disabled="loading"
    >
      {{ loading ? $t('checkout.submitting') : $t('checkout.submit') }}
    </Button>
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
      personalDataConsent: personalDataConsentField(),
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
    personalDataConsent: false,
  },
})

const [name, nameAttrs] = defineField('name')
const [phone, phoneAttrs] = defineField('phone')
const [email, emailAttrs] = defineField('email')
const [city, cityAttrs] = defineField('city')
const [address, addressAttrs] = defineField('address')
const [comment, commentAttrs] = defineField('comment')
const [personalDataConsent, personalDataConsentAttrs] = defineField('personalDataConsent')

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
