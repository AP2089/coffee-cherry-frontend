<template>
  <form class="space-y-6" @submit="onSubmit">
    <label class="block">
      <span class="text-[10px] tracking-[0.18em] uppercase text-bone/40">имя</span>
      <input v-model="name" v-bind="nameAttrs" type="text" class="field" autocomplete="name" />
      <span v-if="errors.name" class="error">{{ errors.name }}</span>
    </label>

    <label class="block">
      <span class="text-[10px] tracking-[0.18em] uppercase text-bone/40">email</span>
      <input v-model="email" v-bind="emailAttrs" type="email" class="field" autocomplete="email" />
      <span v-if="errors.email" class="error">{{ errors.email }}</span>
    </label>

    <label class="block">
      <span class="text-[10px] tracking-[0.18em] uppercase text-bone/40">сообщение</span>
      <textarea v-model="message" v-bind="messageAttrs" rows="5" class="field resize-none" />
      <span v-if="errors.message" class="error">{{ errors.message }}</span>
    </label>

    <p v-if="submitted" class="text-sm text-bronze">
      Сообщение отправлено. Мы ответим в ближайшее время.
    </p>

    <button
      type="submit"
      class="magnetic-btn magnetic-btn--filled px-8 py-4 text-xs w-full md:w-auto"
      :disabled="isSubmitting"
    >
      {{ isSubmitting ? 'Отправляем…' : 'Отправить' }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

const submitted = ref(false)

const validationSchema = toTypedSchema(
  z.object({
    name: z.string().trim().min(2, 'Укажите имя'),
    email: z.string().trim().email('Некорректный email'),
    message: z.string().trim().min(10, 'Сообщение должно быть не короче 10 символов'),
  }),
)

const { handleSubmit, defineField, errors, isSubmitting, resetForm } = useForm({
  validationSchema,
  initialValues: {
    name: '',
    email: '',
    message: '',
  },
})

const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const [message, messageAttrs] = defineField('message')

const onSubmit = handleSubmit(async () => {
  submitted.value = false
  await new Promise((resolve) => setTimeout(resolve, 400))
  submitted.value = true
  resetForm()
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
