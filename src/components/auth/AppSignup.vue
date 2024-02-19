<template>
  <UIAuthWrapper>
    <UIAuthTitle>Sign up</UIAuthTitle>
    <UIAuthForm @submit="submitForm">
      <AppAuthErrorList :errors="errorEmail" />
      <UIAuthInput
        type="email"
        placeholder="Email"
        v-model="email"
        @input="clearEmailErrors"
      />
      <AppAuthErrorList :errors="errorEmail" />
      <UIAuthInput
        type="password"
        placeholder="Password"
        v-model="password"
        @input="clearPasswordErrors"
      />
      <AppAuthErrorList :errors="errorPassword" />
      <UIAuthButton :disabled="loading">Signup</UIAuthButton>
      <AppAuthErrorList :errors="error ? [error] : []" />
      <UIAuthFooterText>
        Have an account?
        <UIAuthFooterLink @click="() => emits('login')"
          >Log in</UIAuthFooterLink
        >
      </UIAuthFooterText>
    </UIAuthForm>
  </UIAuthWrapper>
</template>

<script setup lang="ts">
import UIAuthTitle from '@/components/ui/auth/UIAuthTitle.vue'
import UIAuthForm from '@/components/ui/auth/UIAuthForm.vue'
import UIAuthInput from '@/components/ui/auth/UIAuthInput.vue'
import UIAuthButton from '@/components/ui/auth/UIAuthButton.vue'
import UIAuthFooterText from '@/components/ui/auth/UIAuthFooterText.vue'
import UIAuthFooterLink from '@/components/ui/auth/UIAuthFooterLink.vue'
import UIAuthWrapper from '@/components/ui/auth/UIAuthWrapper.vue'
import { ref, watch } from 'vue'
import { emailRegex, passwordRegex } from '@/utils/regex'
import AppAuthErrorList from './AppAuthErrorList.vue'

import useAuthStore from '@/stores/auth'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { loading, error } = storeToRefs(authStore)

const email = ref('')
const password = ref('')

const errorEmail = ref<string[]>([])
const errorPassword = ref<string[]>([])

const emits = defineEmits<{
  login: []
  signup: []
}>()

const clearEmailErrors = () => {
  errorEmail.value = []
}
const clearPasswordErrors = () => {
  errorPassword.value = []
}
const submitForm = () => {
  if (!emailRegex.test(email.value)) {
    clearEmailErrors()
    errorEmail.value.push('Email is not valid')
  }
  if (!passwordRegex.test(password.value)) {
    clearPasswordErrors()
    errorPassword.value.push(
      'Password is not valid, It should contain eight characters, at least one uppercase letter, one lowercase letter and one number'
    )
  }
  if ([...errorEmail.value, ...errorPassword.value].length > 0) {
    return
  } else {
    authStore.signUp(email.value, password.value)
  }
}
watch(
  () => authStore.isAuthenticated,
  (value) => {
    if (value === true) {
      emits('signup')
    }
  }
)
</script>

<style scoped lang="scss"></style>
