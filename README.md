# Portfólio · Daniel Moreira Batista

Site pessoal em [portfolio-daniel-moreira.vercel.app](https://portfolio-daniel-moreira.vercel.app): destaques com estudos de caso, repositórios públicos, experiência e skills.

## Stack

- Next.js (App Router) e TypeScript
- Tailwind CSS v4
- Motion para animações de entrada e contadores
- Open Graph, sitemap e robots gerados pelo Next.js
- Deploy na Vercel

## Rodar localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:3000`.

## Editar conteúdo

Todo o texto fica em `src/content/`:

- `site.ts`: nome, cargo, resumo, links e fatos do hero
- `projects.ts`: estudos de caso (`featuredProjects`) e repositórios (`repositories`)
- `experience.ts`: linha do tempo
- `skills.ts`: grupos de habilidades

Os componentes em `src/components/` não contêm texto de conteúdo.

## Verificação

```bash
npm run lint
npm run build
```
