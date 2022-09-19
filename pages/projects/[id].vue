<template>
    <div v-if="project" class="container my-5">

        <div id="project">
            <div class="row my-3">
                <div class="col-md-6">
                    <h2 class="bg-dark text-warning py-2">Projeto: {{project.name}}</h2>
                </div>
                <div class="col-md-6">
                    <button class="btn btn-dark float-end"
                    @click="toUpdate()"
                    >
                        {{is_updating ? "Fechar" : "Editar projeto"}}
                    </button>
                </div>
            </div>

            <div class="row">
                <div v-if="is_updating">
                    <ProjectForm 
                        :project="project"
                    />
                    <button 
                        type="button" 
                        class="btn btn-dark"
                        @click="updateProject()">
                            Atualizar
                    </button>
                </div>
                <div v-else>
                    <p><span class="fw-bold">Categoria:</span> {{project.category.name}}</p>
                    <p><span class="fw-bold">Total do orçamento:</span> R${{project.budget}}</p>
                    <p><span class="fw-bold">Total utilizado:</span> R${{project.cost}}</p>
                </div>
            </div>
        </div>

        <hr>

        <div class="services">
            <div class="row my-3">
                <div class="col-md-6">
                    <h3 class="py-2"> Adicione um serviço</h3>
                </div>
                <div class="col-md-6">
                    <button class="btn btn-dark float-end"
                    @click="toCreate()"
                    >
                        {{is_create ? "Fechar" : "Adicionar Serviço"}}
                    </button>
                </div>
            </div>

            <div v-if="is_create">        
                <form>
                    <div class="mb-3">
                        <label for="inputName" class="form-label">Nome do serviço:</label>
                        <input v-model="service.name" type="text" class="form-control" id="inputName">
                    </div>

                    <div class="mb-3">
                        <label for="inputCost" class="form-label">Custo do serviço:</label>
                        <input v-model="service.cost" type="number" class="form-control" id="inputCost">
                    </div>

                    <div class="mb-3">
                        <label for="inputDescription" class="form-label">Descrição do projeto:</label>
                        <input v-model="service.description" type="text" class="form-control" id="inputDescription">
                    </div>
                </form>
                <button 
                    type="button" 
                    class="btn btn-dark"
                    @click="createService()">
                        Adicionar Serviço
                </button>
            </div>

            <hr>

            <div class="my-3">
                <h3>Serviços:</h3>

                <div class="row">
                    <div class="col-md-6 col-lg-4 mb-3" v-for="service in services" :key="service.id">
                        <ServiceCard :service="service" @remove="() => removeService(service.id, service.cost)"/>
                    </div>
                </div>     
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import IProject from '~~/interface/IProject';
import IService from '~~/interface/IService';
import api from '~~/services/api';
import { uuid } from 'vue-uuid';
import { useToast } from 'vue-toast-notification';

const route = useRoute()
const id = route.params.id

const $toast = useToast();

const project = ref<IProject>()

const services = ref<IService[]>([])

const service: IService ={
    name: "",
    cost: 0,
    description: ""
}

let is_updating = ref(false)
let is_create = ref(false)

async function updateProject(){
    await api.updateProject(project.value).then(() => {
        toUpdate()
        $toast.open({
            message: 'Projeto Atualizado!',
            type: 'success',
            duration: 2000,
            position: 'top'
        })
    })
}

function toUpdate(){
    is_updating.value = !is_updating.value
}

function toCreate(){
    is_create.value = !is_create.value
}

async function createService(){ 
    project.value.services.push(service)

    //lastService
    const lastService = project.value.services[project.value.services.length -1]
    
    //Genarate id
    lastService.id = uuid.v4()

    const lastServiceCost = lastService.cost

    const newCost = project.value.cost + lastServiceCost

    //maximum value validation
    if (newCost > project.value.budget) {
        $toast.open({
            message: 'Orçamento ultrapassado, verifique o valor do serviço!',
            type: 'error',
            duration: 4000,
            position: 'top'
        })
        project.value.services.pop()
        return false
    }

    // add service cost to project cost total
    project.value.cost = newCost

    await api.createService(project.value).then((res) =>{
        project.value.services = res.data.services
        services.value = res.data.services
        toCreate()
        $toast.open({
            message: 'Serviço Adicionado!',
            type: 'success',
            duration: 2000,
            position: 'top'
        })
    })

    service.name = ""
    service.cost = 0
    service.description = ""
}

async function removeService(id: string, cost: number){
    const servicesUpdated = project.value.services.filter((service) => service.id !== id)
    
    const projectUpdate = project.value
    
    projectUpdate.services = servicesUpdated
    projectUpdate.cost = projectUpdate.cost - cost

    await api.removeService(projectUpdate).then(() => {
        project.value = projectUpdate
        services.value = servicesUpdated
        $toast.open({
            message: 'Serviço Removido!',
            type: 'error',
            duration: 2000,
            position: 'top'
        })
    })
}

onBeforeMount(async () => {
    await api.getByIdProject(id).then((res) => {
        project.value = res.data
        services.value = res.data.services
    })
})

</script>

<style scoped>

</style>