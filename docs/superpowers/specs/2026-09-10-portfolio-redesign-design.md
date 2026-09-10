# Redesign do portfólio: Next.js, dark tech, foco em carreira

Data: 2026-09-10
Status: aprovado pelo usuário (abordagem A)

## Objetivo

Substituir o portfólio atual (Vite + React, tema claro, página de captação com WhatsApp e Google Ads) por um portfólio de carreira em Next.js, com identidade dark tech alinhada ao banner do LinkedIn e ao currículo de 2026. Público: recrutadores e tech leads. Idioma: só português.

## Abordagem de migração (A)

- Mesmo repositório `~/projetos/Portfolio`, branch `redesign-nextjs`.
- Remover `src/`, `index.html`, `vite.config.ts`, `tsconfig.app.json`, `tsconfig.node.json`, `postcss.config.js`, `tailwind.config.js` (v3), `jsconfig.json`, `src/App.css`.
- Gerar Next.js (App Router, TypeScript, Tailwind v4, ESLint) na raiz.
- Manter assets: `public/images/profile.jpg`, `public/images/projetos/ecosys/*.png`, `public/images/projetos/unyleya/*.png`. Remover `public/DMB Soluções.png`, `public/vite.svg`, `placeholder-generator.html`.
- Copiar o PDF do currículo para `public/curriculo-daniel-moreira.pdf`.
- Reescrever `README.md` de forma sóbria (o que é, stack, como rodar).
- Deploy continua no projeto Vercel já ligado ao repositório.

## Rotas

| Rota | Conteúdo |
|---|---|
| `/` | Página única: Hero, Sobre, Destaques, Projetos, Experiência, Skills, Contato |
| `/projetos/[slug]` | Estudo de caso completo para cada destaque (3 páginas, geradas estaticamente) |
| `/opengraph-image` e `/projetos/[slug]/opengraph-image` | Imagem OG gerada com `next/og` |
| `/sitemap.xml`, `/robots.txt` | Gerados pelo Next.js |

Slugs: `integracao-meta-octalab`, `health-score-rfm`, `erp-data-warehouse`.

## Identidade visual

Tokens (CSS variables, Tailwind v4 `@theme`):

| Token | Valor |
|---|---|
| `--bg` | `#0b1220` |
| `--surface` | `#111a2e` |
| `--border` | `#1e293b` |
| `--text` | `#e2e8f0` |
| `--muted` | `#94a3b8` |
| `--accent` | `#22d3ee` |
| `--accent-soft` | `rgba(34,211,238,.12)` |

- Fontes: Geist Sans (texto) e Geist Mono (rótulos, números, linhas de stack), via `next/font`.
- Fundo com grid pontilhado sutil (CSS radial-gradient), brilho radial ciano atrás do hero.
- Cards com borda `--border` que passa a `--accent` no hover, com leve elevação.
- Só tema escuro. Sem toggle.

## Seções da página inicial

1. **Header** fixo com blur: nome, âncoras (Destaques, Projetos, Experiência, Skills, Contato), link GitHub, botão "Currículo (PDF)".
2. **Hero**: rótulo mono "Desenvolvedor com IA · Octalab"; título "Construo software em produção com dados confiáveis por trás."; parágrafo de duas linhas; botões "Ver destaques" e "GitHub"; quatro fatos com contadores animados: `2+` anos em dados, `3` empresas, `70%` eficiência (ERP), `80%` menos erros (Unyleya).
3. **Sobre**: dois parágrafos do resumo do currículo, foto de perfil circular à direita em desktop.
4. **Destaques**: 3 cards grandes (título, uma frase, 3 tags, link para `/projetos/[slug]`).
5. **Projetos**: grid compacto dos repositórios do GitHub (título, descrição curta, tags, link repo e demo quando houver). Lista vem do site atual, com Smart Transcription Plan incluído sem link.
6. **Experiência**: timeline vertical com Octalab, ecosys AUTO, Unyleya (2 cargos). Bullets do currículo 2026. Linha de stack em mono.
7. **Skills**: grupos Dados, Backend e APIs, Frontend, IA e agentes, Integrações (Meta Graph API: WhatsApp Cloud API, Instagram, Ads, App Review; n8n; Pipefy), DevOps. Chips em mono.
8. **Contato**: e-mail, LinkedIn, GitHub, currículo. Sem formulário.
9. **Footer**: nome, ano, "Next.js · Tailwind · Vercel".

## Páginas de estudo de caso

Estrutura fixa: cabeçalho (título, empresa, período, tags), Problema, Solução, Arquitetura (diagrama SVG inline simples: caixas e setas), Resultados (métricas em mono), Stack, Links (repo, demo), Galeria (screenshots existentes, com lightbox leve).

Conteúdo inicial:

- **Integração Meta na Octalab**: WhatsApp Cloud API, Instagram, Marketing API (Ads), webhooks, permissões e App Review. Sem repositório público. Texto redigido por Claude a partir do currículo; o usuário revisa os detalhes técnicos antes do deploy.
- **Health Score RFM**: adapta o texto do caso "Análise de Churn e Engajamento" atual. Screenshots da pasta `ecosys`. Repos `ecosysMS-Back` e `ecosys-dash-hub`.
- **ERP interno e Data Warehouse**: ETL com n8n e Python, dois bancos (PostgreSQL e MySQL), 70% de ganho de eficiência. Mesmos repos e screenshots.

## Conteúdo e dados

- `content/site.ts`: nome, headline, resumo, links, e-mail.
- `content/projects.ts`: destaques (com corpo do estudo de caso) e repositórios.
- `content/experience.ts`, `content/skills.ts`.
- Tudo tipado. Componentes não contêm texto de conteúdo.
- Nenhum número inventado: apenas os que constam no currículo 2026.

## Motion

- Framer Motion: `whileInView` para reveal (fade + translateY 16px) uma vez por seção; contadores do hero; `whileHover` nos cards.
- Spotlight de cursor só no hero, implementado com CSS variables e `onMouseMove`.
- Tudo desativado com `prefers-reduced-motion`.

## SEO e performance

- `metadata` por página, `title` template, description, canonical.
- OG image dinâmica com `next/og`.
- JSON-LD `Person` no layout, `CreativeWork` nas páginas de projeto.
- `next/image` para todas as imagens. Fontes via `next/font`.
- Meta: Lighthouse ≥ 95 em Performance, Accessibility, Best Practices, SEO.

## O que sai

WhatsApp flutuante, formulário com webhook, tag Google Ads, logo DMB Soluções, react-hook-form, yet-another-react-lightbox, Radix (substituído por componentes simples), README antigo.

## Qualidade

- ESLint nos arquivos tocados durante a implementação.
- `next build` e type-check uma única vez ao final, antes do PR.
- Verificação visual em desktop (1440px) e celular (390px) via screenshot headless.
- PR de `redesign-nextjs` para `main`.
