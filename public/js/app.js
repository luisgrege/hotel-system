// Cole aqui a URL e a Chave Anon que você já tinha pego do Supabase
const SUPABASE_URL = 'SUA_URL_DO_SUPABASE'; // Mantenha a sua URL aqui
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2dXJmYWRjZ2NlemhhYnpncndqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyNTIwNjUsImV4cCI6MjA3MzgyODA2NX0.nyZlXl42x8TUdwN6UY_P4TgheQ8lzB62uekbFy_1Jx4'; // Mantenha a sua chave aqui

// Inicializa o cliente do Supabase
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Seleciona o elemento no HTML onde vamos inserir os cards dos quartos.
// É a <div> com a classe 'quartos-grid'.
const quartosGrid = document.querySelector('.quartos-grid');

// Esta é a função principal que busca os dados no Supabase.
// Usamos 'async' para indicar que esta função fará uma operação que pode demorar (buscar dados na internet).
async function carregarQuartos() {
    // Usamos 'await' para esperar a resposta do Supabase antes de continuar.
    // supabase.from('quartos') diz "quero dados da tabela quartos".
    // .select('*') diz "me dê todas as colunas".
    const { data, error } = await supabase.from('quartos').select('*');

    // Sempre é bom verificar se ocorreu algum erro.
    if (error) {
        console.error('Erro ao buscar quartos:', error);
        return; // Para a execução da função se deu erro.
    }

    // Se não há quartos no banco de dados, mostramos uma mensagem.
    if (data.length === 0) {
        quartosGrid.innerHTML = '<p>Nenhuma acomodação disponível no momento.</p>';
        return;
    }

    // Agora, para cada quarto que recebemos do Supabase, vamos criar o HTML.
    // O 'map' percorre cada item da lista 'data'.
    const htmlDosQuartos = data.map(quarto => {
        // Para cada 'quarto', retornamos uma string com o HTML do card.
        // Usamos a crase (`) para criar um "template string", que facilita colocar variáveis dentro do texto.
        return `
            <div class="card-quarto">
                <img src="${quarto.url_da_imagem}" alt="Foto do ${quarto.nome}">
                <div class="card-content">
                    <h3>${quarto.nome}</h3>
                    <p>${quarto.descricao}</p>
                    <span class="preco">A partir de R$ ${quarto.preco_por_noite}/noite</span>
                </div>
            </div>
        `;
    }).join(''); // O .join('') junta todos os HTMLs dos cards em uma única string gigante.

    // Finalmente, inserimos essa string gigante de HTML dentro da nossa div 'quartos-grid'.
    quartosGrid.innerHTML = htmlDosQuartos;
}

// Esta linha executa a função carregarQuartos() assim que a página termina de carregar.
carregarQuartos();