export default async function handler(req, res) {
    const { cnpj } = req.query;
    const minhaChave = "0131b585c4b527e5ca52551d8ff7dbe3"; 

    const url = `https://api.portaldatransparencia.gov.br/api-de-dados/ceis?cnpj=${cnpj}&pagina=1`;

    try {
        const resposta = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'chave-api-dados': minhaChave
            }
        });

        if (!resposta.ok) throw new Error("Erro no Governo");
        const dados = await resposta.json();
        res.status(200).json(dados);
    } catch (error) {
        res.status(500).json({ error: "Erro ao conectar com o Governo" });
    }
}
