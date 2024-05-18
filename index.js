const { createApp } = Vue;
const API_URL = 'http://localhost:3000';

createApp({
    data() {
        return {
            heroi: { vida: 100 },
            vilao: { vida: 100 },
            ataque: true,
            cura: true,
            defesa: true,
            corrida: true,
            historico: [],
            usospocao: 5
        }
    },
    methods: {
        barraVidaClasse(vida) {
            if (vida >= 60) {
                return 'verde';
            } else if (vida >= 30) {
                return 'amarela';
            } else {
                return 'vermelha';
            }
        },
        atacar(isheroi) {
            if (this.heroi.vida <= 0 || this.vilao.vida <= 0) {
                return;
            }
            if (this.ataque == true)
                this.historico.push("Helldiver atirou!");
            if (isheroi) {
                this.vilao.vida = Math.min(100, Math.max(0, this.vilao.vida - 10));
                console.log("Herói atacou");
                this.atualizarVidaNoBancoDeDados(this.heroi.vida, this.vilao.vida);
                this.acaoVilao();
            } else {
                if (this.heroi.vida > 0) {
                    this.heroi.vida = Math.min(100, Math.max(0, this.heroi.vida - 10));
                    console.log("Vilão atacou");
                    (this.ataque == true)
                    this.historico.push("Terminídeo atacou!");
                    this.atualizarVidaNoBancoDeDados(this.heroi.vida, this.vilao.vida);
                }
            }
        },
        async atualizarVidaNoBancoDeDados(vidaHeroi, vidaVilao) {
            try {
                const response = await fetch(`${API_URL}/atualizarVida`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ vidaHeroi, vidaVilao })
                });
                if (!response.ok) {
                    throw new Error('Erro ao atualizar a vida no banco de dados.');
                }
                console.log('Vida do herói e do vilão atualizada com sucesso.');
            } catch (error) {
                console.error('Erro ao atualizar a vida no banco de dados:', error);
            }
        },
        defender(isheroi) {
            if (this.heroi.vida <= 0 || this.vilao.vida <= 0) {
                return;
            }
            if (this.defesa == true)
                this.historico.push("Helldiver defendeu!");
            if (isheroi) {
                if (this.heroi.vida > 0) {
                    this.heroi.vida = Math.min(100, Math.max(0, this.heroi.vida - 4));
                    this.atualizarVidaNoBancoDeDados(this.heroi.vida, this.vilao.vida);
                    this.acaoVilao();
                }
            } else {
                (this.defesa == true)
                this.historico.push("Terminídeo atacou!");
                this.atualizarVidaNoBancoDeDados(this.heroi.vida, this.vilao.vida);
            }
        },
        usarpocao(isheroi) {
            if (this.heroi.vida <= 0 || this.vilao.vida <= 0 || this.usosPocao <= 0) {
                return;
            }
            if (this.cura) {
                this.historico.push("Helldiver curou!");
                if (isheroi) {
                    this.heroi.vida = Math.min(100, this.heroi.vida + 10);
                    this.atualizarVidaNoBancoDeDados(this.heroi.vida, this.vilao.vida);
                    this.acaoVilao();
                } else {
                    console.log("Vilão curou");
                }
                this.usospocao--; 
            } else {
                console.log("Você não pode usar mais a poção!");
                this.historico.push("Poções esgotadas!")
                this.atualizarVidaNoBancoDeDados(this.heroi.vida, this.vilao.vida);
            }
        },
    correr(isheroi) {
        if (this.heroi.vida <= 0 || this.vilao.vida <= 0) {
            return;
        }
        if (this.corrida == true)
            this.historico.push("Helldiver correu!");
        this.atualizarVidaNoBancoDeDados(this.heroi.vida, this.vilao.vida);
        if (!isheroi) {
            console.log("Herói correu");
        } else {
            this.acaoVilao();
            this.atualizarVidaNoBancoDeDados(this.heroi.vida, this.vilao.vida);
        }
    },
    acaoVilao() {
        if (this.heroi.vida <= 0 || this.vilao.vida <= 0) {
            return;
        }
        const acoes = ['atacar', 'correr', 'atacar', 'correr'];
        const acaoaleatoria = acoes[Math.floor(Math.random() * acoes.length)];
        this[acaoaleatoria](false);
    },
},
}).mount("#app");

document.getElementById("reloadButton").addEventListener("click", function () {
    location.reload();
});
