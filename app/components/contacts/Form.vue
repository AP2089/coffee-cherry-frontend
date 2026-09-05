<template>
  <div class="space-y-6">
    <Alert v-if="submitted" class="border-primary/30 bg-primary/10 text-primary">
      <AlertDescription>{{ $t('contacts.form.success') }}</AlertDescription>
    </Alert>

    <Alert v-if="errorMessage" variant="destructive">
      <AlertDescription>{{ errorMessage }}</AlertDescription>
    </Alert>

    <form class="space-y-6" @submit="onSubmit">
      <div class="block">
        <Label class="text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
          {{ $t('contacts.form.name') }}
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
        <Label class="text-[10px] tracking-[0.18em] uppercase text-muted-foreground">email</Label>
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
          {{ $t('contacts.form.message') }}
        </Label>
        <Textarea
          v-model="message"
          v-bind="messageAttrs"
          rows="5"
          class="field-underline resize-none"
        />
        <p v-if="errors.message" class="mt-2 text-xs text-destructive">{{ errors.message }}</p>
      </div>

      <FormPersonalDataConsent
        v-model="personalDataConsent"
        v-bind="personalDataConsentAttrs"
        :error="errors.personalDataConsent"
      />

      <Button
        type="submit"
        variant="magnetic-filled"
        class="w-full px-8 py-4 md:w-auto"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? $t('contacts.form.submitting') : $t('contacts.form.submit') }}
      </Button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

import { apiPostContact } from '~/api/contacts'

const { t } = useI18n()
const submitted = ref(false)
const errorMessage = ref('')

const validationSchema = computed(() =>
  toTypedSchema(
    z.object({
      name: z.string().trim().min(2, t('contacts.form.errors.name')),
      email: z.string().trim().email(t('contacts.form.errors.email')),
      message: z.string().trim().min(10, t('contacts.form.errors.message')),
      personalDataConsent: personalDataConsentField(),
    }),
  ),
)

const { handleSubmit, defineField, errors, isSubmitting, resetForm } = useForm({
  validationSchema,
  initialValues: {
    name: '',
    email: '',
    message: '',
    personalDataConsent: false,
  },
})

const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const [message, messageAttrs] = defineField('message')
const [personalDataConsent, personalDataConsentAttrs] = defineField('personalDataConsent')

const onSubmit = handleSubmit(async (values) => {
  submitted.value = false
  errorMessage.value = ''

  try {
    const response = await apiPostContact({
      name: values.name,
      email: values.email,
      message: values.message,
    })

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to send message')
    }
    submitted.value = true
    resetForm()
  } catch (err: unknown) {
    const message =
      err && typeof err === 'object' && 'data' in err
        ? String((err as { data?: { message?: string } }).data?.message || '')
        : ''
    errorMessage.value = message || t('checkout.error.fallback')
  }
})
</script>
