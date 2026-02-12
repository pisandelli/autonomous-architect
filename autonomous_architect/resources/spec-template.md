# 📋 Project Specification (PRD)

> **Instructions:** Preencha este documento com o máximo de detalhes. Quanto mais claras as regras de negócio e modelos de dados, mais preciso será o código gerado pelo Autonomous Architect.
> **Protocol:** Ensure all UI requirements align with `SKILL.md` (CSS Layers, Modules, Tokens).

## 1. 🎯 Visão Geral & Objetivos
**Nome do Projeto:** [Nome]
**Objetivo Principal:** [Descreva em 1 parágrafo o que o software faz e para quem].
**Diferencial Chave:** [O que o torna único?]

---

## 2. 👤 Personas & User Stories
| Persona | Quer (Ação) | Para (Benefício) |
| :--- | :--- | :--- |
| **Admin** | Gerenciar usuários | Manter segurança do sistema |
| **Cliente** | Visualizar dashboard | Acompanhar métricas em tempo real |

---

## 3. 🗺️ Sitemap & Navegação (App)
Estrutura de pastas esperada em `app/pages/`.

*   `/` (Public Home): Landing page.
*   `/auth/*`: `login.vue`, `register.vue`.
*   `/dashboard` (Protected):
    *   `/dashboard/index.vue`: Visão geral.
    *   `/dashboard/settings.vue`: Configurações.

---

## 4. 💾 Modelagem de Dados (Draft Prisma Schema)
Defina as entidades principais. Não precisa ser sintaxe Prisma perfeita, mas deve mostrar relações.

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  role      Role     @default(USER)
  posts     Post[]
}

model Post {
  id        String   @id @default(cuid())
  title     String
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
}
```

---

## 5. 🔌 API Requirements (Layer 1)
Liste os principais módulos de API necessários.

### UserModule
*   `login(email, password)`
*   `register(data)`
*   `getProfile()`

### PostModule
*   `list(filters)`
*   `create(data)`

---

## 6. 🎨 Requisitos de UI/UX
*   **Design System:** [BaseButton, Cards, Modais...]
*   **Tema:** [Dark/Light/System]
*   **Interações Chaves:** [Ex: "O carrinho deve abrir em um drawer lateral"]

---

## 7. 🛡️ Regras de Negócio Críticas
1.  Usuário não pode deletar conta se tiver pendências financeiras.
2.  Posts só podem ser publicados após aprovação de Admin.
