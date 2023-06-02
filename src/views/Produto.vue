<template>
    <section>
        <div v-if="produto" class="product">
            <ul class="product-imgs" v-if="produto.fotos">
                <li v-for="(foto, index) in produto.fotos" :key="index">
                    <img :src="foto.src" :alt="foto.titulo" />
                </li>
            </ul>
            <div class="product-info">
                <h1>{{ produto.nome }}</h1>
                <p class="product-price">{{ produto.preco | numeroPreco }}</p>
                <p class="product-description">{{ produto.descricao }}</p>

                <transition mode="out-in" v-if="produto.vendido === 'false'">
                    <button class="btn" v-if="!finalizar" @click="finalizar = true">Comprar</button>
                    <FinalizarCompra v-else :produto="produto" />
                </transition>

                <button class="btn btn-disabled" v-else disabled>Produto Vendido</button>
            </div>
        </div>
        <PaginaCarregando v-else />
    </section>
</template>

<script>
import { api } from '@/services.js';
import FinalizarCompra from '@/components/FinalizarCompra.vue';

export default {
    name: 'Produto',
    components: {
        FinalizarCompra,
    },
    data() {
        return {
            produto: null,
            finalizar: false,
        };
    },
    props: ['id'],
    methods: {
        getProduto() {
            this.produto = null;
            setTimeout(() => {
                api.get(`/produto/${this.id}`).then((response) => {
                    this.produto = response.data;
                });
            }, 1000);
        },
    },
    created() {
        document.title = 'Produtos - Ranek';
        this.getProduto();
    },
};
</script>

<style scoped>
.product {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    max-width: 1000px;
    padding: 60px 20px;
    margin: 0 auto;
}

.product-price {
    color: #e80;
    font-size: 1.5rem;
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 40px;
}

.product-description {
    font-size: 1.2rem;
}

.product-imgs {
    grid-row: 1 / 3;
}

.product-info {
    position: sticky;
    top: 25px;
}

img {
    margin: 30px;
    box-shadow: 0 4px 8px rgba(30, 60, 90, 0.2);
    max-width: 400px;
    border-radius: 4px;
}

.btn {
    margin-top: 60px;
    width: 200px;
}

@media screen and (max-width: 500px) {
    .product {
        grid-template-columns: 1fr;
    }

    .product-imgs {
        grid-row: 2;
    }

    .product-info {
        position: initial;
    }
}
</style>
