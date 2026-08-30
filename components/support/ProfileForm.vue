<template>
  <form
    class="support-chat__profile flex flex-1 flex-col justify-between overflow-y-auto"
    @submit="onSubmit"
  >
    <div class="support-chat__profile-body">
      <Alert class="mb-5 border-border bg-muted/60">
        <AlertDescription class="text-sm leading-relaxed text-muted-foreground">
          {{ $t('support.intro') }}
        </AlertDescription>
      </Alert>

      <div class="space-y-4">
        <div class="space-y-2">
          <Label class="text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
            {{ $t('support.fields.name') }}
          </Label>
          <Input
            v-bind="nameAttrs"
            v-model="name"
            type="text"
            autocomplete="name"
            :placeholder="$t('support.fields.name')"
            :class="{ 'border-destructive/55 bg-destructive/5': errors.name }"
          />
          <p v-if="errors.name" class="text-xs text-destructive">{{ errors.name }}</p>
        </div>

        <div class="space-y-2">
          <Label class="text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
            {{ $t('support.fields.email') }}
          </Label>
          <Input
            v-bind="emailAttrs"
            v-model="email"
            type="email"
            autocomplete="email"
            :placeholder="$t('support.fields.email')"
            :class="{ 'border-destructive/55 bg-destructive/5': errors.email }"
          />
          <p v-if="errors.email" class="text-xs text-destructive">{{ errors.email }}</p>
        </div>

        <FormPersonalDataConsent
          v-model="personalDataConsent"
          v-bind="personalDataConsentAttrs"
          :error="errors.personalDataConsent"
        />
      </div>
    </div>

    <div class="support-chat__profile-footer">
      <Button type="submit" variant="magnetic-filled" class="w-full px-4 py-3 tracking-[0.12em]">
        {{ $t('support.start') }}
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { configure, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

const emit = defineEmits<{
  submit: [values: { guestName: string; guestEmail: string }]
}>()

const { t } = useI18n()

const validationSchema = computed(() =>
  toTypedSchema(
    z.object({
      name: z.string().trim().min(2, t('support.errors.name')),
      email: z.string().trim().email(t('support.errors.email')),
      personalDataConsent: personalDataConsentField(),
    }),
  ),
)

const { handleSubmit, defineField, errors, resetForm } = useForm({
  validationSchema,
  initialValues: {
    name: '',
    email: '',
    personalDataConsent: false,
  },
})

const [name, nameAttrs] = defineField('name', {
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: true,
})

const [email, emailAttrs] = defineField('email', {
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: true,
})

const [personalDataConsent, personalDataConsentAttrs] = defineField('personalDataConsent', {
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: true,
})

const onSubmit = handleSubmit((values) => {
  emit('submit', {
    guestName: values.name,
    guestEmail: values.email,
  })
})

function reset() {
  resetForm({
    values: {
      name: '',
      email: '',
      personalDataConsent: false,
    },
    errors: {},
    touched: {
      name: false,
      email: false,
      personalDataConsent: false,
    },
  })
}

defineExpose({ reset })

onMounted(() => {
  configure({
    validateOnInput: true,
    validateOnChange: true,
    validateOnBlur: true,
  })
})

onBeforeUnmount(() => {
  configure({
    validateOnInput: false,
    validateOnChange: true,
    validateOnBlur: true,
  })
})
</script>

<style scoped lang="scss">
.support-chat__profile {
  min-height: 0;
}

.support-chat__profile-body {
  flex: 1;
  padding: 1rem 1rem 0.75rem;
}

.support-chat__profile-footer {
  padding: 0.75rem 1rem 1rem;
  border-top: 1px solid var(--border);
  background: rgba(14, 12, 10, 0.35);
}
</style>
