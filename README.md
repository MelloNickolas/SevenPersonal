# Seven Personal

Site institucional da academia **Seven Personal** ([@sevenpersonal_](https://instagram.com/sevenpersonal_)) com painel administrativo para o proprietário gerenciar planos, programação do mês e a galeria de fotos/vídeos.

## ✨ Funcionalidades

**Site público**
- Hero com identidade da marca + CTA de WhatsApp
- **Planos & Promoções** — cards com preço, descrição, frequência semanal e botão "Quero esse plano" (abre o WhatsApp). Promoção fica em destaque.
- **Programação do Mês** — carrossel com autoplay (estilo Instagram)
- **Galeria Seven** — fotos e vídeos num mosaico responsivo, com lightbox
- **Contato** — WhatsApp, Instagram, endereço e horários (editáveis)

**Painel admin** (`/admin`)
- Login do proprietário (JWT)
- CRUD de planos, com destaque de promoção
- Upload e gestão das imagens do carrossel
- Upload e gestão da galeria (fotos e vídeos)
- Edição das informações de contato

## 🧱 Stack

| Camada    | Tecnologia                                   | Hospedagem |
| --------- | -------------------------------------------- | ---------- |
| Frontend  | React + Vite + TypeScript + Framer Motion    | Vercel     |
| Backend   | ASP.NET Core 9 (arquitetura em camadas) + EF Core | Render |
| Banco     | PostgreSQL (Neon) · SQLite (fallback dev)     | Neon       |
| Mídia     | Cloudinary (upload assinado direto do navegador) | —      |

### Arquitetura do backend (`backend/`)

```
SevenPersonal.Domain        → entidades, enums, interfaces
SevenPersonal.Repository     → EF Core (DbContext, migrations, repositórios)
SevenPersonal.Application    → DTOs, serviços (lógica de negócio)
SevenPersonal.Services       → infraestrutura (Cloudinary, JWT)
SevenPersonal.API            → controllers, autenticação, DI
```

## 🚀 Rodando localmente

### Pré-requisitos
- .NET SDK 9, Node 20+
- Conta no [Cloudinary](https://cloudinary.com) (para upload de mídia)
- (Opcional) Postgres do [Neon](https://neon.tech) — só se quiser usar Postgres em vez de SQLite

### Backend
```bash
cd backend/SevenPersonal.API
cp .env.example .env          # preencha ADMIN_*, JWT_SECRET, CLOUDINARY_*
dotnet run
```
O provider do banco é **detectado automaticamente** pelo `CONNECTION_STRING`:
- URL `postgresql://...` → **Postgres/Neon**
- vazio → **SQLite** (cria `seven.db` localmente, sem banco externo)

O schema é criado no startup (`EnsureCreated`). Roda em `http://localhost:5110`; Swagger em `/swagger`.

### Frontend
```bash
cd frontend/seven-personal-web
cp .env.example .env          # ajuste VITE_API_URL para a porta da API
npm install
npm run dev
```

## ☁️ Deploy

### Backend → Render
1. New → **Blueprint** apontando para este repo (usa o `render.yaml`).
2. Preencha as variáveis marcadas como `sync: false` (admin, Cloudinary, `CORS_ORIGINS`).
3. O `JWT_SECRET` é gerado automaticamente.

### Banco → Neon (Postgres)
- Crie um projeto no [Neon](https://neon.tech) e copie a connection string (`postgresql://...`).
- No Render, defina `CONNECTION_STRING` com essa URL. Como o banco é externo, o plano **free** do Render funciona normalmente (sem risco de perder dados no restart).

### Frontend → Vercel
- Importe o projeto, defina **Root Directory** = `frontend/seven-personal-web`.
- Variável `VITE_API_URL` = URL pública da API no Render.
- O `vercel.json` já trata as rotas SPA.

### Evitando o cold start (Render free)
O workflow [`.github/workflows/keep-alive.yml`](.github/workflows/keep-alive.yml) pinga `/api/health` a cada 10 min.
Configure a variável de repositório `API_HEALTH_URL` (Settings → Secrets and variables → Actions → Variables) com a URL `https://<sua-api>.onrender.com/api/health`.

## 🔐 Acesso ao painel
Defina `ADMIN_USERNAME` e `ADMIN_PASSWORD` nas variáveis de ambiente do backend. Acesse `/admin/login`.
