<template>
    <section class="login">
        <h1>Login</h1>
        <form>
            <label for="email">Email</label>
            <input type="email" name="email" id="email" v-model="login.email" />
            <label for="senha">Senha</label>
            <input type="password" name="senha" id="senha" v-model="login.senha" />
            <button class="btn" @click.prevent="logar">Logar</button>
        </form>
        <p class="login-reset">
            <a href="/" target="_blank">Esqueci a senha, Clique Aqui</a>
        </p>
        <LoginCriar />
    </section>
</template>

<script>
import LoginCriar from "@/components/LoginCriar.vue";

export default {
    name: "Login",
    components: {
        LoginCriar,
    },
    data() {
        return {
            login: {
                email: "",
                senha: "",
            },
        };
    },
    methods: {
        logar() {
            this.$store.dispatch("getUsuario", this.login.email);
            this.$router.push({ name: "Usuario" });
        },
    },
};
</script>

<style scoped>
form {
    display: grid;
}

h1 {
    text-align: center;
    font-size: 2rem;
    margin: 50px;
    color: #87f;
}
.login {
    max-width: 600px;
    margin: 0 auto;
    padding: 0 20px;
}

.btn {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 2rem;
    margin-bottom: 2rem;
    padding: 15px 30px;
}

.login-reset {
    text-align: center;
    margin: 10px auto 0 auto;
}

.login-reset a:hover {
    color: #87f;
    text-decoration: underline;
}
</style>
