<template>
  <div class="container">
    <div class="text-center my-5">
      <h1>Bem-vindo ao <span class="text-warning bg-dark px-2">Costs</span></h1>
      <p class="text-secondary">comece a gerenciar os seus projetos agora mesmo!</p>
      <div class="my-3">
        <NuxtLink to="/projects/new">
          <button class="btn btn-dark">Criar projeto</button>
        </NuxtLink>
      </div>    
      <img src="~/assets/savings.svg">
    </div>
  </div>

</template>

<script setup lang="ts">

</script>

<style scoped>
img {
  width: 350px;
  margin: 2em 0;
}
</style>