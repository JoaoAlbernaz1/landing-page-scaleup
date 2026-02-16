# ⚠️ ERRO: Webhook não configurada

## Como resolver:

### 1. Acesse seu projeto na Vercel
https://vercel.com/dashboard

### 2. Vá em Settings > Environment Variables

### 3. Adicione a variável:

**Nome da variável:**
```
NEXT_PUBLIC_N8N_WEBHOOK_URL
```

**Valor:**
```
https://selens.app.n8n.cloud/webhook-test/scaleup-leads
```

**Environments:**
✅ Marque todas: Production, Preview, Development

### 4. Clique em "Save"

### 5. Faça um novo deploy:
- Vá em "Deployments"
- Clique nos três pontos (...) do último deploy
- Selecione "Redeploy"

## Variável opcional (mas recomendada):

**Nome:**
```
NEXT_PUBLIC_WHATSAPP_NUMBER
```

**Valor:**
```
5561974022641
```

**Environments:**
✅ Marque todas: Production, Preview, Development

---

**Após configurar e fazer redeploy, o formulário funcionará corretamente!**
