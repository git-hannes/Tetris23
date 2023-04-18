<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <div class="field">
    <div class="label text-sm text-gray-500">{{ label }}</div>
    <div class="value text-xl">{{ value }}</div>
  </div>
</template>
