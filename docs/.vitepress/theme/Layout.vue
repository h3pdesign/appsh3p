<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #nav-bar-content-after>
      <a class="h3p-top-logo" href="/" aria-label="h3p apps home">
        <img class="h3p-logo-light" src="/brand/logo-light.png" alt="H3P logo" />
        <img class="h3p-logo-dark" src="/brand/logo-dark.png" alt="H3P logo" />
      </a>
    </template>
  </Layout>
</template>
