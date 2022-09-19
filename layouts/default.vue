<template>
    <div>
        <Nav />
        <div class="content">
            <slot />
        </div>
        <Footer />
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.content {
    min-height: 600px
}
</style>