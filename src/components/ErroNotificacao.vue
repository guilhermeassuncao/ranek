<template>
    <transition mode="out-in">
        <ul class="erro" v-if="erros" key="erros">
            <li v-for="(erro, index) in erros" :key="index" v-html="erro"></li>
        </ul>
    </transition>
</template>

<script>
export default {
    name: 'ErroNotificacao',
    props: {
        erros: Array,
    },
};
</script>

<style scoped>
.erro {
    margin: 10px auto;
}

.erro li {
    color: #e80;
    text-align: center;
}
</style>
