<template>
    <section>
        <h2>Editar Usuário</h2>
        <UsuarioForm>
            <button class="btn btn-user-edit" @click.prevent="atualizarUsuario">Atualizar Usuário</button>
        </UsuarioForm>
    </section>
</template>

<script>
import UsuarioForm from "@/components/UsuarioForm.vue";
import { api } from "@/services.js";

export default {
    name: "UsuarioEditar",
    components: {
        UsuarioForm,
    },
    methods: {
        atualizarUsuario() {
            api.put(`/usuario/${this.$store.state.usuario.id}`, this.$store.state.usuario)
                .then(() => {
                    this.$store.dispatch("getUsuario");
                    this.$router.push({ name: "Usuario" });
                })
                .catch((error) => {
                    console.log(error.response);
                });
        },
    },
};
</script>

<style>
h2 {
    margin-bottom: 30px;
}

.btn-user-edit {
    width: 100%;
    padding: 15px 30px;
    margin-top: 3rem;
}
</style>
