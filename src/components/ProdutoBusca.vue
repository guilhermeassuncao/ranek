<template>
    <form>
        <input type="text" name="product-search-input" id="product-search-input" v-model="input" placeholder="Buscar Produtos ..." />
        <input type="submit" id="product-search-btn" value="Buscar" @click.prevent="buscarProdutos" />
    </form>
</template>

<script>
export default {
    name: "ProdutoBusca",
    data() {
        return {
            input: "",
        };
    },
    methods: {
        buscarProdutos() {
            this.$router.push({ query: { q: this.input } });
        },
    },
};
</script>

<style scoped>
form {
    max-width: 600px;
    margin: 30px auto 60px auto;
    position: relative;
    padding: 0 15px;
}

#product-search-input {
    width: 100%;
    padding: 20px;
    border: none;
}

#product-search-input:focus,
#product-search-input:hover {
    transform: scale(1.1);
}

#product-search-btn {
    width: 62px;
    height: 62px;
    background: url("../assets/search.svg") no-repeat center center;
    text-indent: -150px;
    border: none;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    box-shadow: none;
}
</style>
