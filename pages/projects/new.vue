<template>
    <div class="container my-5">
        <div class="d-flex justify-content-center my-5">
            <div class="w-50 text-start">
                <h2>Criar Projeto</h2>
                <p class="text-secondary my-3">
                    Crie seu projeto para depois adicionar os serviços
                </p>
                
                <ProjectForm
                    :project="project"
                 />

                <button 
                    type="button" 
                    class="btn btn-dark"
                    @click="createProject()">
                        Criar Projeto
                </button>
            </div>
            
        </div>
    </div>
</template>

<script setup lang="ts">

import api from "@/services/api"
import IProject from "@/interface/IProject"
import {useToast} from 'vue-toast-notification';

const project: IProject = {
    name: "",
    budget: 0,
    category: {
        id: 1,
        name: "Infra"
    },
    cost: 0,
    services:[],
    id: 0
}

async function createProject(){
    await api.createProject(project).then(() => {
        navigateTo('/projects')
        $toast.open({
            message: 'Projeto Criado!',
            type: 'success',
            duration: 3000,
            position: 'top'
        })
    })
}

const $toast = useToast();
</script>

<style scoped>

</style>