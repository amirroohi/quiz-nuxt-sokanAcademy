<script setup>
const error = useError();
const handleError = () => {
    clearError({
        redirect: "/"
    })
}
</script>
<template>
    <div class="d-flex justify-content-center align-items-center flex-column vh-100 vw-100">
        <h1 class="fs-1">{{ error.statusCode }}</h1>
        <p class="fs-3 mb-3">{{ error.message }}</p>
        <button class="btn btn-primary" @click="handleError">
            بازگشت
        </button>
    </div>
</template>