# Dra. Marcele Oliveira | Harmonização Glútea e Seios em Salvador

Landing page estática (HTML + CSS + JS puros) para a Dra. Marcele Oliveira, especialista em Harmonização Glútea e Seios em Salvador - BA.

## Como executar localmente

Este projeto não usa Node.js, build ou dependências. Basta abrir o arquivo `index.html` diretamente no navegador, ou servir a pasta com qualquer servidor estático:

```bash
# Opção 1: abrir direto
# dê duplo clique em index.html

# Opção 2: servidor local simples (Python)
python -m http.server 8000
# depois acesse http://localhost:8000

# Opção 3: servidor local simples (Node, sem instalar dependências no projeto)
npx serve .
```

## Estrutura do projeto

```
empresa-teste/
├── index.html
├── vercel.json
├── README.md
└── assets/
    ├── config.json      # dados editáveis da empresa (nome, contato, textos das seções)
    ├── css/
    │   └── style.css
    ├── js/
    │   └── script.js
    └── imagens/
        └── image.png    # foto real fornecida no briefing (antes & depois)
```

## Stack

- HTML5 semântico
- CSS3 puro (Grid, Flexbox, Custom Properties)
- JavaScript vanilla (scroll reveal, parallax, carrossel, menu mobile, contadores animados)
- Google Fonts: Playfair Display (títulos) + Poppins (corpo)
- Sem Node.js, sem build, sem npm — pronto para deploy estático (Vercel)

## Seções da página

1. Header fixo com logo, menu e CTA de WhatsApp
2. Hero com headline, CTAs e estatísticas do Google
3. Credibilidade (avaliação no Google, método exclusivo, atendimento humanizado)
4. Serviços/Procedimentos (Harmonização Glútea, Harmonização de Seios, Contorno Corporal)
5. Sobre o atendimento (texto do Google Meu Negócio)
6. Diferenciais
7. Depoimentos (carrossel automático com avaliações reais do Google)
8. Galeria de antes & depois
9. CTA final
10. Contato (WhatsApp, telefone, endereço, horário de funcionamento, mapa do Google)
11. Footer + botão flutuante de WhatsApp

## Edição de conteúdo

O botão flutuante **"✏️ Editar Página"** abre um modal que permite editar título, subtítulo, telefone, endereço e Instagram. Como o site é 100% estático (sem backend), salvar as alterações faz o **download** de um novo arquivo `config-edicoes.json` — ele não sobrescreve o `assets/config.json` original no servidor.

## Paleta de cores

- Primária: `#FFFFFF`
- Secundária: `#F5F5DC`
- Destaque: `#FF6B35`

## Observação sobre imagens

O briefing listava 8 imagens, porém apenas **1 arquivo real** (`assets/imagens/image.png`) estava presente na pasta `assets/imagens/` — as demais entradas apontavam para o mesmo nome de arquivo. Essa única imagem (foto real de antes & depois) foi reaproveitada nas seções Hero, Sobre e Galeria, conforme indicado no briefing.
