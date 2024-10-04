<script setup>
// variables
const isGreat = ref(false);
// get result from api with authorization
const { data: final } = await useFetch('https://api.sokanacademy.com/api/quizzes', {
    headers: {
        authorization: "Bearer 57925|vK5JXxnZi7Q6P3FaDPKetO3pC4Bej98lLclh8JQqabfaef7d"
    },
    query: {
        entity_type: "section",
        entity_slug: "آزمون-بخش-داکر-بازی-3539"
    }
});
if (!final.value) {
    throw createError({
        statusCode: 404,
        message: `متاسفانه نتیجه آزمون با شناسه مورد نظر یافت نشد.`
    })
}
// this function is used for calculating average of all time participation in this quiz until now
const averageOfLevels = computed(() => {
    let totalCorrects = final.value.data.examinees.reduce((acc, curr) => acc + curr.correct, 0);
    let totalQuestions = final.value.data.questions_count * final.value.data.examinees.length;
    let averageAll = totalCorrects / totalQuestions;
    if (averageAll >= 0.8) {
        isGreat.value = true;
        return "عالی";
    }
    else if (averageAll >= 0.5) {
        isGreat.value = false;
        return "متوسط";
    }
    else if (averageAll < 0.5) {
        isGreat.value = false;
        return "ضعیف";
    }
    else return "نامشخص";
})
</script>
<template>
    <section class="container d-flex justify-content-center">
        <div class="result">
            <div class="result__card d-flex  justify-content-between">
                <div class="result__content">
                    <h2 class="result__title">{{ final.data.title }}</h2>
                    <div class="result__description d-flex">
                        <nuxt-icon :name="tableLevelIcon(level(final.data.examinees[0], final.data.questions_count))"
                            filled />
                        <span>عملکرد شما {{ level(final.data.examinees[0], final.data.questions_count) }}
                            بود!</span>
                    </div>
                    <div class="result__details">
                        جزو 10% شرکت‌کننده با عملکرد {{ level(final.data.examinees[0], final.data.questions_count) }}
                        هستید.
                    </div>
                    <div class="result__badges">
                        <div class="question__status correct"><nuxt-icon class="true" name="tick-bold" />{{
                            final.data.examinees[0].correct }} پاسخ درست</div>
                        <div class="question__status wrong"><nuxt-icon class="false" name="close-bold" />{{
                            final.data.examinees[0].wrong }} پاسخ اشتباه
                        </div>
                    </div>
                    <div class="result__starter w-100">
                        <button class="result__button" :class="{
                            emphasis: level(final.data.examinees[0],
                                final.data.questions_count) !== 'عالی'
                        }" @click="navigateTo('/')">
                            <nuxt-icon name="redo" filled />
                            <span>تلاش مجدد</span>
                        </button>
                    </div>
                </div>
                <div class="result__vector d-none d-md-block">
                    <img src="../assets/images/Vector.png" alt="result-vector">
                </div>
            </div>
            <div class="result__history">
                <h2 class="result__title">تاریخچه نتایج</h2>
                <div class="result__description-wrapper d-flex flex-column row-gap-3">
                    <div class="result__description">
                        <nuxt-icon :class="{ great: isGreat }" name="cup" />
                        <div class="d-flex flex-column justify-content-between row-gap-2">
                            <h4 class="result__performance">میانگین عملکرد شما {{ averageOfLevels }} است!</h4>
                            <p class="result__participation d-none d-md-block">{{ final.data.examinees.length }} بار در
                                این آزمون شرکت کرده‌اید.</p>
                        </div>
                    </div>
                    <p class="result__participation d-md-none">{{ final.data.examinees.length }} بار در این آزمون شرکت
                        کرده‌اید.</p>
                </div>
                <div class="result__table-wrapper overflow-auto">
                    <div class="result__table d-flex flex-column row-gap-2">
                        <div class="row column-gap-2 mx-0">
                            <div class="result__table-item col">عملکرد شما</div>
                            <div class="result__table-item col"><nuxt-icon name="tick-bold" filled />پاسخ درست</div>
                            <div class="result__table-item col"><nuxt-icon name="close-bold" filled />پاسخ اشتباه</div>
                            <div class="result__table-item col">تاریخ</div>
                        </div>
                        <div v-for="exam in final.data.examinees" class="row column-gap-2 mx-0">
                            <div class="result__table-item col"
                                :class="tableLevelColor(level(exam, final.data.questions_count))">
                                <nuxt-icon :name="tableLevelIcon(level(exam, final.data.questions_count))" />
                                {{ level(exam, final.data.questions_count) }}
                            </div>
                            <div class="result__table-item col">{{ exam.correct }}</div>
                            <div class="result__table-item col">{{ exam.wrong }}</div>
                            <div class="result__table-item col">{{ new Date(exam.ended_at).toLocaleDateString('fa-IR')
                                || "--" }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>