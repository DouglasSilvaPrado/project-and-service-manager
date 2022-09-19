<template>
    <div>
        <form>
            <div class="mb-3">
                <label for="inputNameProject" class="form-label">Nome do projeto:</label>
                <input v-model="project.name" type="text" class="form-control" id="inputNameProject">
            </div>

            <div class="mb-3">
                <label for="inputBudget" class="form-label">Orçamento do projeto:</label>
                <input v-model="project.budget" type="number" class="form-control" id="inputBudget">
            </div>

            <div class="mb-3">
                <label for="inputCategory" class="form-label">Selecione a categoia:</label>
                <select v-model="project.category" class="form-select" id="inputCategory">
                    <option 
                    v-for="category in categories"
                    :key="category.id"
                    :value="category"
                    >
                        {{category.name}}
                    </option>
                </select>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import IProject from '~~/interface/IProject';
import api from '~~/services/api';


interface ICategory {
    id: number;
    name: string;
}


interface ProjectProps{
    project: IProject
}

const props = defineProps<ProjectProps>()

const categories = ref<ICategory[]>([]);

async function getCategories(): Promise<void> {
  await api.getCategories().then((res) => {
    categories.value = res.data;
  });
}

onMounted(() => {
  getCategories();
});
</script>

<style scoped>

</style>