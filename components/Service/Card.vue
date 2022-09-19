<template>
    <div class="card h-100">
        <div class="card-header bg-dark text-warning">
            <h3>{{ service.name}}</h3>
        </div>
        <div class="card-body">
            <p class="card-text">Custo Total: R${{service.cost}}</p>
            <p class="card-text">{{service.description}}</p>
        </div>
        <div class="card-footer">
            <button class="btn btn-outline-dark mx-2"
                @click="removeService">
                <i class="fa-solid fa-trash"></i> Excluir
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import IService from '~~/interface/IService';

interface ServiceProps{
    service?: IService
}

const props = defineProps<ServiceProps>()

const emit = defineEmits(["remove"])

const removeService = () => {
    emit("remove", props.service)
}


</script>

<style scoped>
.card-header{
        height: 100px;
    }
</style>