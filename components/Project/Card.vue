<template>
    <div class="card h-100">
        <div class="card-header bg-dark text-warning">
            <h3>{{project.name}}</h3>
        </div>
        <div class="card-body">
            <p class="card-text">Orçamento: R${{project.budget}}</p>
            <p class="card-text">{{project.category.name}}</p>
        </div>
        <div class="card-footer">
            <button class="btn btn-outline-dark"
                @click="updateProject">
                <i class="fa-regular fa-pen-to-square"></i> Editar
            </button>
            <button class="btn btn-outline-dark mx-2"
                @click="removeProject">
                <i class="fa-solid fa-trash"></i> Excluir
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import IProject from '~~/interface/IProject';

interface ProjectProps{
    project: IProject
}

const props = defineProps<ProjectProps>()

const emit = defineEmits(["remove", "update"])

const removeProject = () => {
    emit("remove", props.project)
}

const updateProject = () => {
    emit("update", props.project)
}

</script>

<style scoped>
    .card-header{
        height: 100px;
    }
</style>