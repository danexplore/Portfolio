# Portfólio · Daniel Moreira Batista

Site pessoal em [portfolio-daniel-moreira.vercel.app](https://portfolio-daniel-moreira.vercel.app): destaques com estudos de caso, repositórios públicos, experiência e skills.

## Stack

- Next.js (App Router) e TypeScript
- Tailwind CSS v4
- Canvas 2D para a escultura de partículas interativa
- Motion para contadores e detecção de visibilidade
- Open Graph, sitemap e robots gerados pelo Next.js
- Deploy na Vercel

## Rodar localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:3000`.

## Editar conteúdo

O conteúdo profissional fica em `src/content/`:

- `site.ts`: nome, cargo, resumo, links e fatos do hero
- `projects.ts`: estudos de caso (`featuredProjects`) e repositórios (`repositories`)
- `experience.ts`: linha do tempo
- `skills.ts`: grupos de habilidades

Os títulos de apresentação e rótulos da interface ficam nos componentes em `src/components/`.

## Interações

- Órbita com partículas que se afastam do cursor, retornam por molas e se dispersam/reconstroem conforme a rolagem, com botão para pausar os efeitos.
- KPIs integrados à base da primeira tela e botões com atração pelo cursor.
- Renderização limitada a 30 fps, com menos partículas no celular; suspensa fora da tela ou com a aba oculta.
- Preferência de movimento reduzido respeitada, inclusive quando alterada com o site aberto.
- Prévias dos projetos com iluminação e inclinação no hover; filtros por área nos repositórios.
- Navegação por seções com indicação ativa e progresso de leitura.
- Experiência expansível, galeria com teclado e foco contido, e cópia de e-mail.
- Conteúdo e métricas legíveis mesmo sem JavaScript; as interações são melhorias progressivas.

## Verificação

```bash
npm run lint
npm run build
```
