# Tec Responde - Playwright Test Suite

## Estructura del Proyecto

```
tests/
├── specs/                    # Test specs organizados por funcionalidad
│   ├── homepage.spec.ts      # Tests de Homepage
│   ├── claim-flow.spec.ts    # Tests del flujo de crear reclamo
│   ├── backoffice-auth.spec.ts    # Tests de autenticación BO
│   ├── backoffice-dashboard.spec.ts  # Tests de dashboard BO
│   ├── backoffice-claim-detail.spec.ts  # Tests de detalle de claim
│   ├── frontend-other.spec.ts  # Track claims, datos personales, confirmation
│   └── static-pages.spec.ts   # Páginas estáticas, validaciones, responsive
├── pages/                   # Page Objects
│   ├── HomePage.ts
│   ├── BackofficeLoginPage.ts
│   ├── BackofficeDashboardPage.ts
│   ├── ClaimsListPage.ts
│   └── InitiateClaimPage.ts
├── components/             # Componentes reutilizables
├── fixtures/               # Fixtures y configuración
│   └── test-fixtures.ts
└── seed.ts                # Seed data para tests
```

## Configuración

1. Copiar `.env.example` a `.env`:
```bash
cp .env.example .env
```

2. Configurar variables de entorno:
```bash
export BASE_URL="https://front.dev-tecorresponde.k8s.qubikcommerce.com"
export BO_USERNAME="tu_usuario"
export BO_PASSWORD="tu_password"
```

O agregar directamente en `.env`:
```
BASE_URL=https://front.dev-tecorresponde.k8s.qubikcommerce.com
BO_USERNAME=admin
BO_PASSWORD=admin123
```

## Ejecutar Tests

### Todos los tests:
```bash
npx playwright test
```

### Por tags:
```bash
npx playwright test --grep "@smoke"
```

### Por archivo específico:
```bash
npx playwright test tests/specs/homepage.spec.ts
```

### Con UI interactiva:
```bash
npx playwright test --ui
```

### Con reporter HTML:
```bash
npx playwright test --reporter=html
```

## Casos de Prueba Cubiertos

### Frontend Público (High Priority)
- Homepage: carga, header, footer, buttons, newsletter
- Flujo Crear Reclamo: pasos 0-3, búsqueda vuelo, evidencia
- Datos Personales: pasos 1-2, validaciones
- Contanos tu Problema
- Confirmation
- Seguimiento de Reclamos
- Páginas Estáticas
- Validaciones de Formularios
- Responsive (320px-1920px)

### Backoffice
- Login/Logout
- Dashboard: métricas, gráficos, claims recientes
- Claims List: búsqueda, filtros, exportación
- Claim Detail: info cliente/vuelo, estados, notas
- Cambio de Estados

### APIs (próxima fase)
- Claims API
- Flight Claims API
- Attachments API
- Chat Messages API
- Backoffice API

## Mejores Prácticas Usadas

- **Page Object Model**: Locators y methods encapsulados en classes
- **Fixtures**: Reutilización de page objects
- **Descriptive Test Names**: ID del caso de prueba en el nombre
- **Assertions Claras**: expect con mensajes descriptivos
- **Setup/Teardown**: beforeEach para limpiar estado
- **Tags**: Para filtrar (@smoke, @critical, @slow)

## Desarrollo Futuro

1. **Agregar más Page Objects** para:
   - ClaimDetailPage
   - MessagesPage
   - SettingsPage

2. **API Tests** usando `request` API de Playwright

3. **Autenticación reutilizable** con storageState

4. **Visual Regression** con snapshots

5. **Accessibility** con axe-core