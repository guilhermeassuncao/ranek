<template>
    <section>
        <h2>Endereço de Envio</h2>
        <ErroNotificacao :erros="erros" />
        <UsuarioForm>
            <button class="btn btn-checkout" @click.prevent="finalizarCompra">Finalizar Compra</button>
        </UsuarioForm>
    </section>
</template>

<script>
import UsuarioForm from '@/components/UsuarioForm.vue';
import { api } from '@/services.js';
import { mapState } from 'vuex';

export default {
    name: 'FinalizarCompra',
    components: {
        UsuarioForm,
    },
    props: ['produto'],
    data() {
        return {
            erros: [],
        };
    },
    computed: {
        ...mapState(['usuario']),
        compra() {
            return {
                comprador_id: this.usuario.email,
                vendedor_id: this.produto.usuario_id,
                produto: this.produto,
                endereco: {
                    cep: this.usuario.cep,
                    rua: this.usuario.rua,
                    numero: this.usuario.numero,
                    bairro: this.usuario.bairro,
                    cidade: this.usuario.cidade,
                    estado: this.usuario.estado,
                },
            };
        },
    },
    methods: {
        async criarUsuario() {
            this.erros = [];

            try {
                await this.$store.dispatch('criarUsuario', this.$store.state.usuario);
                await this.$store.dispatch('logarUsuario', this.$store.state.usuario);
                await this.$store.dispatch('getUsuario');

                await this.criarTransacao();
            } catch (error) {
                this.erros.push(error.response.data.message);
            }
        },
        criarTransacao() {
            return api.post('/transacao', this.compra).then(() => {
                this.$router.push({ name: 'Compras' });
            });
        },
        finalizarCompra() {
            if (this.$store.state.login) {
                this.criarTransacao();
            } else {
                this.criarUsuario();
            }
        },
    },
};
</script>

<style scoped>
h2 {
    margin-top: 40px;
    margin-bottom: 20px;
}

.btn-checkout {
    background: #e80;
    width: 100%;
    padding: 15px 30px;
    margin-top: 2rem;
}
</style>
