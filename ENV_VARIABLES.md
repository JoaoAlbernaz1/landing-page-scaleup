# Variáveis de Ambiente

Este projeto requer as seguintes variáveis de ambiente para funcionar corretamente:

## Variáveis Obrigatórias

### `NEXT_PUBLIC_N8N_WEBHOOK_URL`
- **Descrição**: URL do webhook do n8n para receber os dados do formulário de diagnóstico
- **Formato**: URL completa (ex: `https://seu-n8n-instance.com/webhook/diagnostico`)
- **Valor atual**: `https://selens.app.n8n.cloud/webhook-test/scaleup-leads`

### `NEXT_PUBLIC_WHATSAPP_NUMBER`
- **Descrição**: Número do WhatsApp para contato (usado na página de agradecimento)
- **Formato**: Número sem espaços, sem +, com código do país e DDD (ex: `5561974022641`)
- **Exemplo**: `5561974022641`
- **Padrão**: Se não configurado, usa `5561974022641`

## Como Configurar

1. Crie um arquivo `.env.local` na raiz do projeto
2. Adicione as variáveis acima:

```env
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://seu-n8n-instance.com/webhook/diagnostico
NEXT_PUBLIC_WHATSAPP_NUMBER=5561974022641
```

3. Reinicie o servidor de desenvolvimento (`npm run dev`)

## Para Deploy na Vercel

1. Acesse as configurações do projeto na Vercel
2. Vá em "Settings" > "Environment Variables"
3. Adicione as variáveis acima
4. Faça um novo deploy
