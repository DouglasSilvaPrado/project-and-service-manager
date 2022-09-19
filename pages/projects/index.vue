<template>
    <div class="container mb-5">
        <div class="row my-5">
            <div class="col-md-6">
                <h2>Meus Projetos</h2>
            </div>
            <div class="col-md-6">
                <NuxtLink to="/projects/new">
                    <button class="btn btn-dark float-end">Criar projeto</button>
                </NuxtLink>
            </div>
        </div>

        <div class="row">
            <div class="col-md-6 col-lg-4 mb-3" v-for="project in projects" :key="project.id">
                <ProjectCard 
                    :project="project"
                    @remove="() => removeProject(project)"
                    @update="() => updateProject(project.id)"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import IProject from '~~/interface/IProject';
import api from '~~/services/api';
import {useToast} from 'vue-toast-notification';

const projects = ref<IProject[]>([])

async function getProjects(){
    await api.getProjects().then((res) => {
        projects.value = res.data;
    })
}

async function removeProject(project: IProject){
    await api.removeProject(project).then(() => {
        projects.value = projects.value.filter((p) => p.id !== project.id);
        $toast.open({
            message: 'Projeto Removido!',
            type: 'error',
            duration: 3000,
            position: 'top'
        })
    })
    
}

function updateProject(id: number){
    navigateTo(`/projects/${id}`)
}

const $toast = useToast();

onMounted(() =>{
    getProjects();
})
</script>

<style scoped>
    .mb {
        margin-bottom: 500px;
    }
</style>