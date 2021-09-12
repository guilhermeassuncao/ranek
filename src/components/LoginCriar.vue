<template>
    <section>
        <h2>Crie a sua Conta</h2>
        <transition mode="out-in">
            <button v-if="!criar" class="btn" @click="criar = true">Criar Conta</button>
            <UsuarioForm v-else><button class="btn btn-form" @click.prevent="criarUsuario">Criar Usuário</button> </UsuarioForm>
        </transition>
    </section>
</template>

<script>
import UsuarioForm from "@/components/UsuarioForm.vue";

export default {
    name: "LoginCriar",
    components: {
        UsuarioForm,
    },
    data() {
        return {
            criar: false,
        };
    },
    methods: {
        async criarUsuario() {
            try {
                await this.$store.dispatch("criarUsuario", this.$store.state.usuario);
                await this.$store.dispatch("getUsuario", this.$store.state.usuario.email);

                this.$router.push({ name: "Usuario" });
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>

<style scoped>
h2 {
    text-align: center;
    margin-top: 80px;
    margin-bottom: 20px;
}

.btn {
    width: 100%;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
}

.btn-form {
    width: 100%;
    max-width: 100%;
    margin-top: 2rem;
    margin-bottom: 2rem;
    padding: 15px 30px;
}
</style>
