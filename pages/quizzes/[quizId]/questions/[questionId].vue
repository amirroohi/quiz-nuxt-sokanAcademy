<script setup>
// variables
const route = useRoute();
const answer = ref('');
const inputValue = ref([]);
const nextQuestionId = ref("");
// get question from api
const { data: question, status } = await useFetch(`https://api.sokanacademy.com/api/quizzes/${route.params.quizId}/questions/${route.params.questionId}`, {
    headers: {
        authorization: "Bearer 57925|vK5JXxnZi7Q6P3FaDPKetO3pC4Bej98lLclh8JQqabfaef7d"
    },
    query: {
        entity_type: "section",
        entity_slug: "آزمون-بخش-داکر-بازی-3539"
    }
});
// when data does not catch from api return error
if (!question.value) {
    throw createError({
        statusCode: 404,
        message: `متاسفانه سوال با شناسه مورد نظر (${route.params.questionId}) یافت نشد.`
    })
}
// this function checked the multiple choice (if we need behavior checkbox like radio)
function handleInputClick(id) {
    if (!question.value.data.multiple_choice) {
        if (!inputValue.value.includes(id)) {
            inputValue.value = [];
            inputValue.value.push(id);
        }
    }
}
// for calculated progress width
const calculateWidth = computed(() => {
    if ((question.value.data.priority / question.value.data.total) > 1) {
        return '100%'
    }
    return (question.value.data.priority / question.value.data.total) * 100 + '%';
});
// it's returned that inputValue has something or not
const isDisabled = computed(() => {
    if (inputValue.value.length) return true;
    else if (inputValue.value === '') return false;
});
// get answer from api and check falsy
const handleAnswerApi = async () => {
    const { data: answered } = await $fetch(`https://api.sokanacademy.com/api/quizzes/${route.params.quizId}/questions/${route.params.questionId}/answers`, {
        method: "POST",
        headers: {
            authorization: "Bearer 57925|vK5JXxnZi7Q6P3FaDPKetO3pC4Bej98lLclh8JQqabfaef7d"
        },
        body: {
            entity_type: "section",
            entity_slug: "آزمون-بخش-داکر-بازی-3539",
            answer: inputValue.value
        }
    });
    answer.value = answered;
    if (!answer.value.correct) {
        inputValue.value = [];
    }
    if (answer.value.finished) {
        return;
    } else {
        nextQuestionId.value = answer.value.next.id;
    }
}
// send next question route to url
const handleNextQuestion = () => {
    navigateTo(`/quizzes/${route.params.quizId}/questions/${nextQuestionId.value}`);
    answer.value = "";
    inputValue.value = "";
}
</script>
<template>
    <section class="container d-flex justify-content-center">
        <div v-if="status === 'pending'" class="d-flex justify-content-center align-items-center flex-column vh-100 vw-100">
            در حال بارگذاری...
        </div>
        <div v-else class="question">
            <div class="question__title">
                <h2 class="question__title-text">{{ question.data.title }} {{ inputValue.value }}</h2>
                <div class="d-flex align-items-center">
                    <div class="progress-count">{{ question.data.priority }}/{{ question.data.total }}</div>
                    <div class="progress-bar-container">
                        <div class="progress-bar-indicator" :style="{ width: calculateWidth }">
                        </div>
                    </div>
                </div>
            </div>
            <div class="question__description d-flex">
                <div>{{ question.data.priority }}</div>- <div v-html="question.data.query"></div><span
                    v-if="question.data.multiple_choice">(چند
                    گزینه‌ای)</span>
            </div>
            <div class="question__choices">
                <div v-for="choice in question.data.options" class="form-check" :key="choice.id">
                    <input class="form-check-input" :class="{ accepted: answer.correct }" type="checkbox"
                        :value="choice.id" :id="choice.id" v-model="inputValue" @click="handleInputClick(choice.id)">
                    <label class="form-check-label" :for="choice.id" v-html="choice.option">
                    </label>
                </div>
            </div>
            <div class="question__answer">
                <!-- btn -->
                <button v-if="answer.correct && (question.data.priority !== question.data.total)" class="question__btn"
                    @click="handleNextQuestion">
                    سوال بعدی
                </button>
                <button v-else-if="answer.correct && (question.data.priority === question.data.total)"
                    class="question__btn" @click="navigateTo(`/result`)">
                    پایان آزمون
                </button>
                <button v-else class="question__btn" @click="handleAnswerApi" :disabled="!isDisabled">
                    بررسی پاسخ
                </button>
                <!-- badge -->
                <div v-if="answer.correct && answer !== ''" class="question__status correct"><nuxt-icon class="true"
                        name="tick-bold" />پاسخ درست
                </div>
                <div v-else-if="!answer.correct && answer !== ''" class="question__status wrong"><nuxt-icon
                        class="false" name="close-bold" />پاسخ اشتباه
                </div>
            </div>
        </div>
    </section>
</template>