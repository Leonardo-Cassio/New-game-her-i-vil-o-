const LoginComponent = {
    template: `
    <div class="comp1">
        <h2>Login</h2>
        <input type="text" v-model="nome" placeholder="Nome">
        <input type="text" v-model="email" placeholder="Email">
        <input type="password" v-model="senha" placeholder="Senha">
        <button @click="$emit('change-page', 'signin')">Sign In</button>
        <button class="logar" @click="fazerLogin">Confirmar</button>
    </div>
    `,
    data() {
        return {
            nome:'',
            email: '',
            senha: ''
        }
    },
    methods: {
        async fazerLogin() {
            try {
                const response = await fetch('https://new-game-heroi-e-vilao.onrender.com/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: this.email,
                        nome: this.nome,
                        senha: this.senha,
                    })
                });

                if (response.status === 200) {
                    alert('Login bem-sucedido.');
                    window.location.href = 'index.html';
                } else {
                    alert('Credenciais inválidas.');
                }
            } catch (error) {
                console.error('Erro ao fazer login:', error);
                alert('Erro ao fazer login.');
            }
        },
        alterarLoginCadastro() {
            this.$emit('alterar', 'Cadastro');
        }
    }
};

const SigninComponent = {
    template: `
    <div class="comp2">
        <h2>Sign In</h2>
        <input type="text" v-model="nome" placeholder="Nome">
        <input type="text" v-model="email" placeholder="Email">
        <input type="password" v-model="senha" placeholder="Senha">
        <button @click="$emit('change-page', 'login')">Login</button>
        <button class="logar" @click="criarConta">Confirmar</button>
    </div>
    `,
    data() {
        return {
            nome: '',
            email: '',
            senha: ''
        }
    },
    methods: {
        async criarConta() {
            try {
                const response = await fetch('https://new-game-heroi-e-vilao.onrender.com/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nome: this.nome,
                        email: this.email,
                        senha: this.senha
                    })
                });

                if (response.ok) {
                    alert('Conta criada com sucesso.');
                    window.location.href = 'index.html';
                } else {
                    alert('Erro ao criar conta.');
                }
            } catch (error) {
                console.error('Erro ao criar conta:', error);
                alert('Erro ao criar conta.');
            }
        },
        alterarLoginCadastro() {
            this.$emit('alterar', 'Login');
        }
    }
};
const app = Vue.createApp({
    data() {
        return {
            currentPage: 'login'

        };
    },
    methods: {
        changePage(page) {
            this.currentPage = page;
        }
    },
});

app.component('login-component', LoginComponent);
app.component('signin-component', SigninComponent);

app.mount('#app');
