# Como fazer deploy na Vercel

## Método 1: Via Interface Web (Recomendado)

1. Acesse: https://vercel.com/new
2. Faça login com sua conta (GitHub, Google ou email)
3. Clique em "Import Git Repository"
4. Selecione: `JoaoAlbernaz1/landing-page-scaleup`
5. Configure:
   - **Framework Preset**: Next.js (detecta automaticamente)
   - **Root Directory**: `./`
   - **Build Command**: `npm run build` (automático)
   - **Output Directory**: `.next` (automático)
6. **Configure Environment Variables** (IMPORTANTE):
   - Clique em "Environment Variables"
   - Adicione:
     - `NEXT_PUBLIC_N8N_WEBHOOK_URL` = sua URL do webhook n8n
     - `NEXT_PUBLIC_WHATSAPP_NUMBER` = 5561974022641 (ou seu número)
7. Clique em "Deploy"

## Método 2: Via CLI (Requer autenticação)

```bash
# 1. Fazer login
vercel login

# 2. Fazer deploy
vercel --prod
```

## Verificar Deploy

Após o deploy, você receberá uma URL como: `https://landing-page-scaleup.vercel.app`

Para verificar o status:
- Dashboard: https://vercel.com/dashboard
- Deployments: https://vercel.com/dashboard/[seu-projeto]/deployments

## Atualizar Deploy

Após conectar o repositório, cada push no GitHub fará deploy automático.

Para forçar um novo deploy:
1. Acesse o dashboard do projeto
2. Vá em "Deployments"
3. Clique nos três pontos do último deploy
4. Selecione "Redeploy"
