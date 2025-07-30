# Diagrama de Base de Datos

## Estructura General

### Versión ASCII (Vista Rápida)

```
+-------------+     +-----------------+     +------------------+
|   PROFILES  |     |    PROJECTS    |     | PORTFOLIO_ITEMS  |
+-------------+     +-----------------+     +------------------+
| id         |<--+  | id             |     | id              |
| email      |   |  | business_id    |<----| profile_id      |
| user_type  |   |  | title          |     | title           |
| skills[]   |   |  | status         |     | file_type       |
+-------------+   |  | requirements[] |     | metadata        |
       ^          |  +-----------------+    +------------------+
       |          |         ^
       |          |         |
       |          |  +-----------------+    +------------------+
       |          |  |   PROJECT      |    |    MESSAGES     |
       +----------+--| APPLICATIONS   |    +------------------+
                    +-----------------+    | sender_id       |
                    | project_id     |    | receiver_id     |
                    | talent_id      |    | content         |
                    | status         |    | status          |
                    +-----------------+    +------------------+
```

### Diagrama Detallado (Mermaid)

```mermaid
erDiagram
    profiles ||--o{ portfolio_items : "has"
    profiles ||--o{ project_applications : "submits"
    profiles ||--o{ projects : "creates"
    profiles ||--o{ favorites : "saves"
    projects ||--o{ project_applications : "receives"
    projects ||--o{ messages : "contains"

    profiles {
        uuid id PK
        text email
        text full_name
        enum user_type
        text avatar_url
        text phone
        text location
        text timezone
        enum talent_category
        text[] skills
        text[] languages
        decimal hourly_rate
        text availability
        text portfolio_url
        text social_media
    }

    projects {
        uuid id PK
        uuid business_id FK
        text title
        text description
        enum status
        enum campaign_type
        date start_date
        date end_date
        decimal budget
        text[] requirements
        vector embedding
    }

    portfolio_items {
        uuid id PK
        uuid profile_id FK
        text title
        text description
        enum file_type
        text url
        json metadata
        vector embedding
    }

    project_applications {
        uuid id PK
        uuid project_id FK
        uuid talent_id FK
        enum status
        text cover_letter
        decimal proposed_rate
        timestamp created_at
    }

    messages {
        uuid id PK
        uuid sender_id FK
        uuid receiver_id FK
        text content
        enum status
        timestamp sent_at
    }

    favorites {
        uuid id PK
        uuid user_id FK
        uuid item_id FK
        enum item_type
        timestamp created_at
    }

    ai_preferences {
        uuid id PK
        uuid user_id FK
        json preferences
        vector style_embedding
    }
```

## Descripción de las Tablas

### Profiles

Almacena la información de usuarios, tanto talentos como empresas.

- Extiende la tabla auth.users de Supabase
- Incluye campos específicos para cada tipo de usuario
- Almacena métricas sociales para talentos

### Projects

Proyectos o campañas creadas por empresas.

- Estados posibles: draft, active, paused, completed, cancelled
- Incluye embeddings para búsqueda semántica
- Gestión de presupuesto y requisitos

### Portfolio Items

Elementos del portafolio de los talentos.

- Soporta múltiples tipos de archivos (imagen, video, etc.)
- Metadata para información adicional
- Embeddings para búsqueda y categorización

### Project Applications

Gestiona las aplicaciones de talentos a proyectos.

- Estados: pending, accepted, rejected, withdrawn
- Incluye propuesta económica
- Tracking de timestamps

### Messages

Sistema de mensajería interno.

- Estados de mensajes: sent, delivered, read
- Soporte para conversaciones 1:1
- Historial completo de comunicaciones

### Favorites

Sistema de favoritos/guardados.

- Permite guardar proyectos y perfiles
- Facilita el acceso rápido a elementos relevantes
- Tracking de fecha de guardado

### AI Preferences

Configuraciones de IA por usuario.

- Preferencias de estilo y contenido
- Embeddings para personalización
- Configuraciones de matching
