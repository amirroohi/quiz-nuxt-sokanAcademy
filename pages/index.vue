<script setup>
const { data: preview, status } = await useFetch('https://api.sokanacademy.com/api/quizzes', {
    query: {
        entity_type: "section",
        entity_slug: "آزمون-بخش-داکر-بازی-3539"
    }
});
if (!preview.value) {
    throw createError({
        statusCode: 404,
        message: `متاسفانه آزمونی با شناسه مورد نظر یافت نشد.`
    })
}
const handleStartApi = async () => {
    const { data: firstQuestion } = await $fetch(`https://api.sokanacademy.com/api/quizzes/${preview.value.data.id}/participation`, {
        method: "POST",
        headers: {
            authorization: "Bearer 57925|vK5JXxnZi7Q6P3FaDPKetO3pC4Bej98lLclh8JQqabfaef7d"
        },
        query: {
            entity_type: "section",
            entity_slug: "آزمون-بخش-داکر-بازی-3539"
        }
    });
    navigateTo(`/quizzes/${firstQuestion.id}/questions/${firstQuestion.question.id}`);
}
</script>
<template>
    <section class="container d-flex justify-content-center">
        <div class="preview">
            <div v-if="status === 'pending'" class="d-flex justify-content-center align-items-center flex-column vh-100 vw-100">
                در حال بارگذاری...
            </div>
            <div v-else class="preview__card">
                <div class="preview__content">
                    <h2 class="preview__title">{{ preview.data.title }}</h2>
                    <div class="preview__description" v-html="preview.data.description"></div>
                    <div class="preview__tags">
                        <span class="preview__tag">{{ preview.data.questions_count }} سوال تستی</span>
                        <span class="preview__tag">بدون محدودیت زمانی</span>
                        <span class="preview__tag">قابل تکرار</span>
                    </div>
                    <div class="preview__starter w-100">
                        <button class="preview__button" @click.prevent="handleStartApi">
                            <p class="mb-0">شروع آزمون</p>
                            <nuxt-icon name="left"/>
                        </button>
                    </div>
                </div>
                <div class="preview__vector d-none d-md-block">
                    <img src="../assets/images/Vector.png" alt="preview-vector">
                </div>
            </div>
            <div class="preview__tips">
                <h2 class="preview__tiptitle">نکات قبل از شرکت در آزمون</h2>
                <div class="preview__tiplist">
                    <div class="preview__tipitem">
                        <div class="preview__tipitem-bullet"></div>
                        <p class="preview__tipitem-text">شما باید به تمامی سوال‌ها پاسخ دهید.</p>
                    </div>
                    <div class="preview__tipitem">
                        <div class="preview__tipitem-bullet"></div>
                        <p class="preview__tipitem-text">این آزمون محدودیت زمانی ندارد و هرچقدر که نیاز دارید، زمان
                            خواهید داشت.</p>
                    </div>
                    <div class="preview__tipitem">
                        <div class="preview__tipitem-bullet"></div>
                        <p class="preview__tipitem-text">
                            درصورتی که سوالی را اشتباه پاسخ دهید، راهنمایی در اختیار شما
                            قرار می‌گیرد
                            تا بتوانید مورد درسی را مرور کنید و مجددا پاسخ صحیح را انتخاب نمایید.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>