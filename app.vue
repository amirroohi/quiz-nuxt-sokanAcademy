<script setup>
const title = ref('آزمون')
const description = ref('در این قسمت از سایت آزمون بخش مربوطه قرار میگیرد.')

useHead({
  title,
  meta: [
    {
      name: 'description',
      content: description,
    }
  ]
})
</script>

<template>
  <NuxtLayout>
    <NuxtErrorBoundary>
      <NuxtPage />
      <template #error="{ error }">
        <div class="d-flex justify-content-center align-items-center flex-column vh-100 vw-100">
          <h1 class="fs-1">متاسفانه موردی دچار خطا شده است</h1>
          <p class="fs-3 mb-3">{{ error }}</p>
          <button class="btn btn-primary" @click="error.value = null">
            بازگشت
          </button>
        </div>
      </template>
    </NuxtErrorBoundary>
  </NuxtLayout>
</template>