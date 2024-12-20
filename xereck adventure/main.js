document.addEventListener('DOMContentLoaded', () => {
    const gameOverScreen = document.getElementById('game-over');
    const victoryScreen = document.getElementById('victory-screen');
    const menu = document.getElementById('menu');
    const gameContainer = document.querySelector('.game');
    const shrek = document.querySelector('#Shrek');
    const monstro1 = document.querySelector('#monstro1');
    const boss = document.querySelector('#boss');
    const contadorElement = document.getElementById('contador-value');
    const startButton = document.getElementById('start-button');
    const restartButton = document.getElementById('restart-button');
    const restartButtonVictory = document.getElementById('restart-button-victory');
    const backToMenuButton = document.getElementById('back-to-menu-button');
    const musicToggleButton = document.getElementById('music-toggle-button');
    const musicIcon = document.getElementById('music-icon');
    const menuMusic1 = document.getElementById('musica-menu1');
    const menuMusic2 = document.getElementById('musica-menu2');
    const gameMusic = document.getElementById('musica-jogo');
    const gameOverMusic = document.getElementById('musica-gameover');
    const victoryMusic1 = document.getElementById('musica-vitoria1');
    const victoryMusic2 = document.getElementById('musica-vitoria2');
    let monstro1Morto = false; // Variável para rastrear se o monstro1 está "morto"



    let jogoIniciado = false;
    let pontos = 0;
    let vidaShrek = 3;
    let bossVida = 3;
    let inimigosMortos = 0;
    let laserAtivo = false;
    let musicPlaying = false;
    let currentMenuMusic = 1;
    let loop;
    let monstro1Vida = 3;
    let puloDuploUsado = false;

    gameOverScreen.style.display = 'none';
    victoryScreen.style.display = 'none';

    const toggleMusic = () => {
        if (musicPlaying) {
            if (currentMenuMusic === 1) {
                menuMusic1.pause();
                musicIcon.src = 'img/botao-play.jpeg';
            } else {
                menuMusic2.pause();
                musicIcon.src = 'img/botao-play.jpeg';
            }
        } else {
            if (currentMenuMusic === 1) {
                menuMusic1.play();
                musicIcon.src = 'img/botao-pause.jpeg';
            } else {
                menuMusic2.play();
                musicIcon.src = 'img/botao-pause.jpeg';
            }
        }
        musicPlaying = !musicPlaying;
    };

    musicToggleButton.addEventListener('click', () => {
        toggleMusic();
    });

    const exibirMenu = () => {
        menu.style.display = 'block';
        gameOverScreen.style.display = 'none';
        victoryScreen.style.display = 'none';
        gameContainer.classList.add('hidden');
        menuMusic1.pause();
        menuMusic2.pause();
        musicIcon.src = 'img/botao-play.jpeg';
    };

    const startGame = () => {
        menu.style.display = 'none';
        gameOverScreen.style.display = 'none';
        victoryScreen.style.display = 'none';
        gameContainer.classList.remove('hidden');

        pontos = 0;
        inimigosMortos = 0;
        vidaShrek = 3;
        bossVida = 3; 
        monstro1Vida = 3; 
        contadorElement.textContent = pontos;

        menuMusic1.pause();
        menuMusic2.pause();
        if (gameMusic) gameMusic.play();

        monstro1.style.display = 'block';
        boss.style.display = 'none';

        jogoIniciado = true;
        loop = setInterval(verificarColisao, 10);

        criarMonstro1(); // Chama a função para criar o primeiro monstro

        // Remover chão após 10 segundos
        const chao = document.querySelector('#chao');
        setTimeout(() => {
            chao.style.display = 'none'; // Esconde o chão
        }, 10000);
    };

    const criarMonstro1 = () => {
        // Resetar vida do monstro
        monstro1Vida = 3;
        // Colocar o monstro em uma posição aleatória
        monstro1.style.left = `${Math.random() * (window.innerWidth - 100)}px`;
        monstro1.style.display = 'block';
        verificarColisaoMonstro1(); // Começa a verificação de colisão para o novo monstro
    };

    const verificarColisao = () => {
        if (!jogoIniciado) return; // Não faz nada se o jogo não está em andamento
    
        console.log('Verificando colisão...');
    
        const shrekRect = shrek.getBoundingClientRect();
        const bossRect = boss.getBoundingClientRect();
        const monstro1Rect = monstro1.getBoundingClientRect();
    
        // Verificação de colisão com o monstro1
        if (shrekRect.bottom > monstro1Rect.top && shrekRect.top < monstro1Rect.bottom &&
            shrekRect.right > monstro1Rect.left && shrekRect.left < monstro1Rect.right) {
            vidaShrek = 0; // O Shrek "morre"
            console.log('Colisão com monstro1!');
            gameOver(); // Chama a função para terminar o jogo
        }
    
        // Verificação de colisão com o boss
        if (shrekRect.bottom > bossRect.top && shrekRect.top < bossRect.bottom &&
            shrekRect.right > bossRect.left && shrekRect.left < bossRect.right) {
            vidaShrek = 0; // O Shrek "morre"
            console.log('Colisão com o boss!');
            gameOver(); // Chama a função para terminar o jogo
        }
    
        // Verifique se a vida de Shrek é 0
        if (vidaShrek <= 0) {
            console.log('Shrek morreu, chamando gameOver()');
            gameOver(); // Chama a função para terminar o jogo
        }
    };
    

    // Definindo z-index para Shrek, monstro e o gif de morte
shrek.style.zIndex = '5';       // Shrek em uma camada intermediária
monstro1.style.zIndex = '4';    // Monstro 1 em uma camada abaixo de Shrek

if (monstro1Vida <= 0) {
    monstro1Morto = true;

    const gifMorte = document.createElement('img');
    gifMorte.src = 'img/morte-monstro1.gif';
    gifMorte.style.position = 'absolute';
    gifMorte.style.left = `${monstro1.getBoundingClientRect().left + window.scrollX}px`; // Ajuste para o scroll horizontal
    gifMorte.style.top = `${monstro1.getBoundingClientRect().top + window.scrollY}px`;   // Ajuste para o scroll vertical
    gifMorte.style.width = monstro1.style.width;
    gifMorte.style.height = monstro1.style.height;
    gifMorte.style.zIndex = '6';  // Defina um z-index acima de Shrek
    const changeStyleButton = document.getElementById('change-style-button');
    console.log(changeStyleButton); // Isso deve mostrar o botão no console

    if (!changeStyleButton) {
        console.error("Botão de mudar estilo não encontrado!");
        return; // Para evitar erros subsequentes
    }
    let isAlternateStyle = false;

    changeStyleButton.addEventListener('click', () => {
        // Alterna o estilo do menu e do botão de iniciar
        isAlternateStyle = !isAlternateStyle;

        if (isAlternateStyle) {
            menu.classList.add('alternate-background');
            startButton.classList.add('alternate-color');
            gameTitle.textContent = 'Xereck Adventure Zombie 1'; // Muda o nome do jogo
        } else {
            menu.classList.remove('alternate-background');
            startButton.classList.remove('alternate-color');
            gameTitle.textContent = 'Xereck Adventure 1'; // Retorna ao nome original
            musicIcon.src = 'img/caveira-madruga'; // Ícone original
        }
    })
    changeStyleButton.addEventListener('click', () => {
        console.log("Botão de mudar estilo clicado"); // Adicione esta linha
        isAlternateStyle = !isAlternateStyle;
        // (restante do código)
    });

    document.body.appendChild(gifMorte);

    setTimeout(() => {
        gifMorte.remove();
        monstro1.style.display = 'none';
        pontos++;
        contadorElement.textContent = pontos;
        inimigosMortos++;

        if (inimigosMortos >= 4) {
            boss.style.display = 'block';
            dispararLaserBoss();
        } else {
            setTimeout(criarMonstro1, 1000);
            monstro1Morto = false;
        }
    }, 1000);
}


    const dispararLaserBoss = () => {
        const laserBoss = document.createElement('div');
        laserBoss.classList.add('laser-boss');
        document.body.appendChild(laserBoss);

        const bossRect = boss.getBoundingClientRect();
        laserBoss.style.left = bossRect.left + 'px';
        laserBoss.style.top = bossRect.top + 'px';

        let laserInterval = setInterval(() => {
            const laserRect = laserBoss.getBoundingClientRect();
            laserBoss.style.top = laserRect.top + 5 + 'px';

            if (laserRect.top > window.innerHeight) {
                clearInterval(laserInterval);
                laserBoss.remove();
            }
        }, 50);
    };

    document.addEventListener('click', () => {
        if (!jogoIniciado || laserAtivo) return;

        laserAtivo = true;
        const laserShrek = document.createElement('div');
        laserShrek.classList.add('laser');
        gameContainer.appendChild(laserShrek);  // Adiciona dentro do contêiner do jogo

        laserShrek.style.left = `${shrek.offsetLeft + 150}px`;
        laserShrek.style.bottom = '60px';

        let laserInterval = setInterval(() => {
            let laserPosicao = laserShrek.offsetLeft;
            laserShrek.style.left = `${laserPosicao + 10}px`;

            if (laserPosicao > window.innerWidth) {
                clearInterval(laserInterval);
                laserShrek.remove();
                laserAtivo = false;
            }

            const monstro1Rect = monstro1.getBoundingClientRect();
            const gameRect = gameContainer.getBoundingClientRect(); 

            if (
                laserPosicao + laserShrek.offsetWidth > monstro1Rect.left &&
                laserPosicao < monstro1Rect.right &&
                monstro1.style.display !== 'none'
            ) {
                monstro1Vida -= 1; 
                if (monstro1Vida <= 0) {
                    monstro1.style.display = 'none'; // Desativa o monstro para evitar contagem extra

                    const gifMorte = document.createElement('img');
                    gifMorte.src = 'img/morte-monstro1.gif';
                    gifMorte.style.position = 'absolute';

                    // Corrige posição para alinhar com o monstro
                    gifMorte.style.left = `${monstro1Rect.left - gameRect.left}px`;
                    gifMorte.style.top = `${monstro1Rect.top - gameRect.top - 95}px`; // Ajuste fino vertical
                    gifMorte.style.width = monstro1.style.width;
                    gifMorte.style.height = monstro1.style.height;
                    gifMorte.style.zIndex = '10';  

                    gameContainer.appendChild(gifMorte);

                    setTimeout(() => {
                        gifMorte.remove();
                        pontos++;
                        contadorElement.textContent = pontos;
                        inimigosMortos++;

                        if (inimigosMortos >= 4) {
                            boss.style.display = 'block';
                            dispararLaserBoss();
                        } else {
                            setTimeout(criarMonstro1, 1000); // Cria um novo monstro após 1 segundo
                        }
                    }, 1000);
                }
                laserShrek.remove(); 
                laserAtivo = false;
            }

            const bossRect = boss.getBoundingClientRect();
            if (
                laserPosicao + laserShrek.offsetWidth > bossRect.left &&
                laserPosicao < bossRect.right
            ) {
                bossVida -= 1;
                if (bossVida <= 0) {
                    boss.style.display = 'none';
                    verificarVitoria();
                }
                laserShrek.remove();
                laserAtivo = false;
            }
        }, 20);
    });
// Adicionando a mecânica de pulo duplo
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        if (shrek.classList.contains('jump') && !puloDuploUsado) {
            // Permite o pulo duplo
            shrek.classList.add('jump');
            puloDuploUsado = true; 
        } else if (!shrek.classList.contains('jump')) {
            // Primeiro pulo
            shrek.classList.add('jump');
        }
    }
});

// Remover a classe de pulo após a animação
shrek.addEventListener('animationend', () => {
    shrek.classList.remove('jump');
    puloDuploUsado = false; // Permite o pulo novamente após a animação
});
const gameOver = () => {
    jogoIniciado = false; // Define que o jogo não está mais em andamento
    clearInterval(loop); // Para a verificação de colisão

    // Para todos os lasers que estão em execução
    const lasers = document.querySelectorAll('.laser');
    lasers.forEach(laser => laser.remove()); // Remove todos os lasers ativos

    gameContainer.classList.add('hidden');

    // Exibe a tela de Game Over
    gameOverScreen.style.display = 'block';
    gameMusic.pause();
    gameOverMusic.play(); // Toca a música de Game Over
};


    const verificarVitoria = () => {
        jogoIniciado = false;
        clearInterval(loop);
        gameContainer.classList.add('hidden');
        victoryScreen.style.display = 'block';
        gameMusic.pause();
        victoryMusic1.play();
        restartButtonVictory.addEventListener('click', startGame);
    };

    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', startGame);
    backToMenuButton.addEventListener('click', exibirMenu);
});
