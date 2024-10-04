<template>
    <header>
        <div class="header container-xl d-flex justify-content-between align-items-center py-3">
            <button class="navbar-toggler d-md-none rounded-3" type="button" data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                <nuxt-icon name="menu" filled />
            </button>
            <div class="offcanvas offcanvas-end w-75" tabindex="-1" id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel">
                <div class="offcanvas-header d-flex justify-content-between">
                    <h5 class="offcanvas-title" id="offcanvasNavbarLabel">سکان اکادمی</h5>
                    <button type="button" class="btn-close m-0" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                        <li class="nav-item" v-for="(navbarLink, index) in navbarLinklist" :key="index">
                            <a class="nav-link" href="#">{{ navbarLink }}</a>
                        </li>

                    </ul>
                </div>
            </div>
            <div class="header__logo">
                <nuxt-icon name="Logo" filled />
            </div>
            <div class="nav__list d-none d-md-block">
                <ul class="nav d-flex justify-content-between align-items-center p-0 m-0">
                    <li class="nav-item" v-for="(navbarLink, index) in navbarLinklist" :key="index">
                        <a class="nav-link" href="#">{{ navbarLink }}</a>
                    </li>

                </ul>
            </div>
            <div class="header__login">
                <button class="btn rounded-3">
                    <nuxt-icon class="mb-0" name="login" filled />
                    <span class="header__login-text d-none d-md-inline-block pe-1">ورود | ثبت‌نام</span>
                </button>
            </div>
        </div>
    </header>
</template>
<script setup>
import { ref } from 'vue';
const navbarLinklist = ref(["دوره‌های آموزشی", "وبلاگ", "مجموعه‌ها", "رادیوفول‌استک", "فن‌واژه"]);
</script>