<template>
    <ul v-if="paginasTotal > 1">
        <li v-for="pagina in paginas" :key="pagina">
            <router-link :to="{ query: query(pagina) }">
                {{ pagina }}
            </router-link>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'ProdutoPaginacao',
    props: {
        produtosTotal: {
            type: Number,
            default: 1,
        },
        produtosPorPagina: {
            type: Number,
            default: 1,
        },
    },
    methods: {
        query(pagina) {
            return {
                ...this.$route.query,
                _page: pagina,
            };
        },
    },
    computed: {
        paginas() {
            const current = Number(this.$route.query._page);
            const range = 3;

            const offset = Math.ceil(range / 2);
            const total = this.paginasTotal;

            const pagesArray = [];

            for (let index = 0; index < total; index++) {
                pagesArray.push(index + 1);
            }

            pagesArray.splice(0, current - offset);
            pagesArray.splice(range, total);

            return pagesArray;
        },
        paginasTotal() {
            const total = this.produtosTotal / this.produtosPorPagina;
            return total !== Infinity ? Math.ceil(total) : 0;
        },
    },
};
</script>

<style scoped>
ul {
    grid-column: 1/-1;
    text-align: center;
    margin-top: 3rem;
}
li {
    display: inline-block;
}

li a {
    padding: 6px 12px;
    border-radius: 2px;
    margin: 4px;
    border: 1px solid #87f;
    color: #87f;
}

li a.router-link-exact-active,
li a:hover {
    background: #87f;
    color: white;
}
</style>
