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
    margin: 50px auto;
    text-align: center;
}

.btn-page-not-found {
    margin: 50px auto;
    width: 200ox;
    padding: 25px 30px;
}
</style>
