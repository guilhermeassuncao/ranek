<template>
    <div>
        <h1>Pagina não encontrada</h1>
        <router-link class="btn btn-page-not-found" to="/">Voltar para Home</router-link>
    </div>
</template>

<script>
export default {
    name: "PaginaNaoEncontrada",
};
</script>

<style scoped="true">
h1 {
    margin-bottom: 30px;
    margin-top: 200px auto;
}

.btn-page-not-found {
    margin: 30px auto;
    width: 200px;
    padding: 25px 30px;
}
</style>
