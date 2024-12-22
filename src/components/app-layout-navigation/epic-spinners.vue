<template>
  <div class="flex md12">
    <div class="loading_center">
      <FulfillingBouncingCircleSpinner :animation-duration="1000" :size="100" :color="'#007bff'" />
    </div>
  </div>
</template>
<script setup>
import { FulfillingBouncingCircleSpinner } from 'epic-spinners'
</script>
<style>
.loading_center {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
