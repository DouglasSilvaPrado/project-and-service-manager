<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container my-2">
        <NuxtLink class="navbar-brand" to="/">
            <img src="~/assets/costs_logo.png" alt="">
        </NuxtLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <NuxtLink
                to="/"
                class="nav-link"
                activeClass="active"
                aria-current="page"
                >
                    Home
                </NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink to="/projects" class="nav-link" activeClass="active">
                Projetos
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
</template>

<script setup lang="ts">

</script>

<style scoped>
    .ml-auto {
        margin-left: auto;
    }
</style>
      
