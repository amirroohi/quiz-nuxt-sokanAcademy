<template>
    <nav aria-label="breadcrumb" class="container-xl mt-4 pt-3" style="--bs-breadcrumb-divider: '';">
        <ol class="breadcrumb d-flex align-items-center">
            <li class="breadcrumb-item"><a href="#">خانه</a></li>
            <li class="breadcrumb-item"><a href="#">وبلاگ</a></li>
            <li class="breadcrumb-item"><a href="#">{{ quiz.data.second_parent.title }}</a></li>
            <li class="breadcrumb-item active">{{ quiz.data.title }}</li>
        </ol>
    </nav>
</template>

<script setup>
const { data: quiz } = await useFetch('https://api.sokanacademy.com/api/quizzes', {
    headers: {
        authorization: "Bearer 57750|WeOc4ixbxX0UiDg4LqL6i07eeaIt2aXfHYNGNiaS4a7ea0f5"
    },
    query: {
        entity_type: "section",
        entity_slug: "آزمون-بخش-داکر-بازی-3539"
    }
});
</script>

<style lang="scss" scoped>
.breadcrumb-item:not(:last-child)::after {
    content: url(../assets/icons/left.svg);
    float: left;
    padding-right: 8px;
    position: relative;
    top: 15%;
}

.breadcrumb-item::before {
    content: none;
}

.breadcrumb-item {
    height: 28px;
    line-height: 2;
    text-align: center;
    overflow: hidden;
    text-wrap: nowrap;
    text-overflow: ellipsis;
    padding-left: 12px;
}
</style>
