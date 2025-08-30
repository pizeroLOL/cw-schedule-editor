<script setup lang="ts"></script>

<template>
  <div class="grid min-h-dvh w-full items-center-safe justify-center-safe">
    <div class="grid gap-8">
      <h1 class="text-6xl">欢迎使用 <span class="text-cyan-700 dark:text-cyan-300">CW</span>SE</h1>
      <div class="mx-auto flex w-fit gap-4">
        <button class="rounded-md bg-neutral-300 px-4 py-2 dark:bg-neutral-800">
          导入 （WIP）
        </button>
        <RouterLink
          to="/part"
          class="rounded-md bg-green-800 px-4 py-2 text-neutral-100 transition duration-100 hover:bg-green-700"
        >
          新建
        </RouterLink>
      </div>
    </div>
  </div>
</template>
