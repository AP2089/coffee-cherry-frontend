<template>
  <form
    class="support-chat__profile flex flex-1 flex-col justify-between overflow-y-auto"
    @submit="onSubmit"
  >
    <div class="support-chat__profile-body">
      <p class="support-chat__intro">{{ $t('support.intro') }}</p>

      <div class="support-chat__fields">
        <label class="support-chat__field">
          <span class="support-chat__label">{{ $t('support.fields.name') }}</span>
          <input
            v-bind="nameAttrs"
            v-model="name"
            type="text"
            class="support-chat__input"
            autocomplete="name"
            :placeholder="$t('support.fields.name')"
            :class="{ 'support-chat__input--invalid': errors.name }"
          />
          <span v-if="errors.name" class="support-chat__error">{{ errors.name }}</span>
        </label>

        <label class="support-chat__field">
          <span class="support-chat__label">{{ $t('support.fields.email') }}</span>
          <input
            v-bind="emailAttrs"
            v-model="email"
            type="email"
            class="support-chat__input"
            autocomplete="email"
            :placeholder="$t('support.fields.email')"
            :class="{ 'support-chat__input--invalid': errors.email }"
          />
          <span v-if="errors.email" class="support-chat__error">{{ errors.email }}</span>
        </label>
      </div>
    </div>

    <div class="support-chat__profile-footer">
      <button
        type="submit"
        class="magnetic-btn magnetic-btn--filled support-chat__start w-full px-4 py-3 text-xs"
      >
        {{ $t('support.start') }}
      </button>
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
    }),
  ),
)

const { handleSubmit, defineField, errors, resetForm } = useForm({
  validationSchema,
  initialValues: {
    name: '',
    email: '',
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
    },
    errors: {},
    touched: {
      name: false,
      email: false,
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
@use '../../assets/scss/variables' as *;

.support-chat__profile {
  min-height: 0;
}

.support-chat__profile-body {
  flex: 1;
  padding: 1rem 1rem 0.75rem;
}

.support-chat__intro {
  margin: 0 0 1.25rem;
  padding: 0.875rem 1rem;
  border: 1px solid rgba($bone, 0.08);
  background: rgba($bone, 0.03);
  color: rgba($bone, 0.62);
  font-size: 0.875rem;
  line-height: 1.6;
}

.support-chat__fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.support-chat__field {
  display: block;
}

.support-chat__label {
  display: block;
  margin-bottom: 0.5rem;
  color: rgba($bone, 0.42);
  font-size: 0.625rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.support-chat__input {
  width: 100%;
  padding: 0.75rem 0.875rem;
  border: 1px solid rgba($bone, 0.14);
  background: rgba($bone, 0.04);
  color: $bone;
  font-family: 'Manrope', sans-serif;
  font-size: 0.875rem;
  outline: none;
  transition:
    border-color 0.3s $ease-premium,
    background 0.3s $ease-premium,
    box-shadow 0.3s $ease-premium;

  &::placeholder {
    color: rgba($bone, 0.28);
  }

  &:focus {
    border-color: rgba($bronze, 0.55);
    background: rgba($bone, 0.06);
    box-shadow: 0 0 0 1px rgba($bronze, 0.15);
  }

  &--invalid {
    border-color: rgba($ember, 0.55);
    background: rgba($ember, 0.06);
  }
}

.support-chat__error {
  display: block;
  margin-top: 0.5rem;
  color: $ember;
  font-size: 0.75rem;
}

.support-chat__profile-footer {
  padding: 0.75rem 1rem 1rem;
  border-top: 1px solid rgba($bone, 0.1);
  background: rgba($ink, 0.35);
}

.support-chat__start {
  letter-spacing: 0.12em;
}
</style>
