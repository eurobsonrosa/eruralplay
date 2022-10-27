<template>
  <div class="auth-content">
    <Loading v-if="loadingSign" class="loading"/>
    <div class="auth-modal">
        <img src="@/assets/logo.png" alt="logo" width="200">
        <hr>
        <div class="auth-title">{{ showSignup ? 'Cadastro' : 'Login' }}</div>
        <input v-model="user.username" type="text" placeholder="username">        
        <input v-model="user.password" name="password" type="password" placeholder="Senha">
        <input v-if="showSignup" v-model="user.confirmPassword" type="password" placeholder="Confirmação de senha">

        <button v-if="showSignup" @click="signup">Registrar</button>
        <button v-else @click="signin">Entrar</button>

        <a href @click.prevent="showSignup = !showSignup">
            <span v-if="showSignup">Já tem Cadastro? Acesse o Login Aqui!</span>
            <span v-else>Não tem Cadastro? Registre-se Aqui!</span>
        </a>
    </div>
  </div>
</template>

<script>
import { baseApiUrl, showError, userKey} from '@/global'
import Loading from "../templates/MyLoading.vue"
import axios from 'axios'

export default {
    name: 'MyAuth',
    components: {Loading},
    data: function() {
        return {
            showSignup: false,
            user: {},
            loadingSign: false,
        }
    },
    methods: {
        signin() {
            this.loadingSign = true;
            axios.post(`${baseApiUrl}/signin`, this.user)
            .then(res => {
                this.loadingSign = false;
                this.$store.commit('setUser', res.data.user)
                localStorage.setItem(userKey, JSON.stringify(res.data.user))
                this.$router.push({ path: '/' })
            })
            .catch(showError)
            .finally(() => this.loadingSign = false)
        },
        signup() {
            this.loadingSign = true;
            axios.post(`${baseApiUrl}/signup`, this.user)
            .then(() => {
                this.loadingSign = false;
                this.$toasted.global.defaultSuccess()
                this.user = {}
                this.showSignup = false
            })
            .catch(showError)
            .finally(() => this.loadingSign = false)
        },
        verifyLogin(){
            if(this.$store.state.user) this.$router.push({ path: '/' })
        }
    },
    created(){
        this.verifyLogin()
    } 
}
</script>

<style>
    .auth-content {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .auth-modal {
        background-color: #fff;
        width: 350px;
        padding: 35px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);


        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .auth-title {
        font-size: 1.2rem;
        font-weight: 100;
        margin-top: 10px;
        margin-bottom: 15px;
    }

    .auth-modal input {
        border: 1px solid #BBB;
        width: 100%;
        margin-bottom: 15px;
        padding: 3px 8px;
        outline: none;
    }

    .auth-modal button {
        border: none;
        border-radius: 5px;
        align-self: flex-end;
        background-color: #28a745;
        color: #FFF;
        padding: 5px 15px;
    }

    .auth-modal button:hover {
        background-color: #f67e25;
    }

    .auth-modal a {
        margin-top: 35px;
    }

    .auth-modal hr {
        border: 0;
        width: 100%;
        height: 1px;
        background-image: linear-gradient(to right,
            rgba(120, 120, 120, 0),
            rgba(120, 120, 120, 0.75),
            rgba(120, 120, 120, 0));
    }
</style>
