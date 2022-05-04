<template>
  <div>I am {{ $props.age }} years old</div>
</template>

<script setup lang="ts">
defineProps<{
  age: number
}>()
</script>
