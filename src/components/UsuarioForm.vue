<template>
    <form>
        <div class="user-date-login" v-if="mostrarDadosLogin">
            <label for="nome">Nome</label>
            <input type="text" name="nome" id="nome" v-model="nome" />

            <label for="email">Email</label>
            <input type="email" name="email" id="email" v-model="email" />

            <label for="senha">Senha</label>
            <input type="password" name="senha" id="senha" v-model="senha" />
        </div>

        <label for="cep">Cep</label>
        <input type="text" name="cep" id="cep" v-model="cep" @keyup="preencherCep" />

        <label for="rua">Rua</label>
        <input type="text" name="rua" id="rua" v-model="rua" />

        <label for="numero">Número</label>
        <input type="text" name="numero" id="numero" v-model="numero" />

        <label for="bairro">Bairro</label>
        <input type="text" name="bairro" id="bairro" v-model="bairro" />

        <label for="cidade">Cidade</label>
        <input type="text" name="cidade" id="cidade" v-model="cidade" />

        <label for="estado">Estado</label>
        <input type="text" name="estado" id="estado" v-model="estado" />

        <div class="button">
            <slot></slot>
        </div>
    </form>
</template>

<script>
import { mapFields } from '@/helpers.js';
import { getCep } from '@/services.js';

export default {
    name: 'UsuarioForm',
    computed: {
        ...mapFields({
            fields: ['nome', 'email', 'senha', 'cep', 'rua', 'numero', 'bairro', 'cidade', 'estado'],
            base: 'usuario',
            mutation: 'UPDATE_USUARIO',
        }),
        mostrarDadosLogin() {
            return !this.$store.state.login || this.$route.name === 'Usuario-Editar';
        },
    },
    methods: {
        preencherCep() {
            const cep = this.cep.replace(/\D/g, '');

            if (cep.length == 8) {
                getCep(cep).then((response) => {
                    this.rua = response.data.logradouro;
                    this.bairro = response.data.bairro;
                    this.estado = response.data.uf;
                    this.cidade = response.data.localidade;
                });
            }
        },
    },
};
</script>

<style scoped>
form,
.user-date-login {
    display: grid;
}
</style>
