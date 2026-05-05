/**
 * Centralized constants for Playwright tests
 * All text constants and environment variables should be defined here
 */

// Environment variables with fallbacks (process.env is available in Node.js/Playwright)
export const ENV = {
  BASE_URL: process.env.BASE_URL || 'https://front.dev-tecorresponde.k8s.qubikcommerce.com',
  BO_USERNAME: process.env.BO_USERNAME || 'catalina.liste+admin@qubikcommerce.com',
  BO_PASSWORD: process.env.BO_PASSWORD || 'Pruebatest1!',
  TEMP_MAIL_API: process.env.TEMP_MAIL_API || 'https://api.tempmail.so',
  TEMP_MAIL_API_KEY: process.env.TEMP_MAIL_API_KEY || '',
} as const;

// Timeouts
export const TIMEOUTS = {
  SHORT: 3000,
  MEDIUM: 5000,
  LONG: 10000,
  EXTRA_LONG: 30000,
  VERY_LONG: 45000,
} as const;

// Common UI selectors
export const SELECTORS = {
  // Auth
  EMAIL_INPUT: 'input[type="email"], input[placeholder*="correo" i], input[placeholder*="email" i]',
  PASSWORD_INPUT: 'input[type="password"]',
  SUBMIT_BUTTON: 'button[type="submit"]',
  ERROR_ALERT: '[role="alert"]',

  // Navigation
  NAVIGATION: 'nav, aside',
  HEADER: 'header',
  FOOTER: 'footer',

  // Common elements
  LOADING: '.loading, [class*="loading"], .spinner',
  MODAL: '[role="dialog"]',
  DRAWER: '[data-testid="drawer"]',

  // Tables
  TABLE_ROWS: 'table tbody tr',
  SEARCH_INPUT: 'input[type="search"], input[placeholder*="buscar" i]',

  // Buttons
  EXPORT_BUTTON: 'button:has-text("Exportar")',
  SUBMIT: 'button[type="submit"]',

  // Tabs
  TAB_ALL: '[data-key="ALL"]',
  TAB_UNREAD: '[data-key="UNREAD"]',
  TAB_UNANSWERED: '[data-key="UNANSWERED"]',
} as const;

// Text constants for assertions
export const TEXT = {
  // Success messages
  SUCCESS: /éxito|confirmado|suscrito|gracias/i,
  THANKS_MESSAGE: "¡Muchas gracias por tu reclamo!",

  // Error messages
  INVALID_EMAIL: "Por favor ingresá un formato válido.",
  INVALID_PHONE: "Número de teléfono inválido.",
  INVALID_CODE: "El código ingresado es incorrecto",
  AIRPORTS_SAME: "El aeropuerto de origen y",
  COMPANY_LENGTH: /^Ingresá entre 3 y 30 caracteres\.$/,
  INVALID_NUMBER: "Ingresá un número de 1 a 10 dígitos.",
  CLAIM_NOT_FOUND: "No encontramos el reclamo N°",

  // Auth
  LOGIN_ERROR: /El correo y la contraseña no/i,

  // Placeholders
  EMAIL_PLACEHOLDER: /email|newsletter/i,
  SEARCH_PLACEHOLDER: /buscar|nro|Reclamo/i,

  // Button texts
  CONTINUE: "Continuar",
  SUBMIT_TEXT: "Enviar",
  ADD_NOTE: "Agregar nota",
  NORMAL: "Normal",
  CLOSE: "Cerrar",
  ACCEPT_COOKIES: /aceptar|accept|ok|entendido/i,
  SUBSCRIBE: /suscribir|subscribe/i,
  CLAIM: /reclamo|claim/i,

  // Headings
  DASHBOARD: /Panel de Inicio/i,
  USER_DATA: "Datos personales",
  CLAIM_INFO: 'Información del reclamo',
  CUSTOMER_INFO: 'Datos del usuario',
  PRODUCT_INFO: 'Datos del producto',

  // Status
  STATUS_BUTTON: /Reconfirmar|Revisar|Iniciados|Aprobados|Rechazados|Finalizados|Cancelados/i,

  // Sections
  SUMMARY: /Resumen general|del sistema/i,
  SERVICES: /servicio/i,
  TESTIMONIALS: /testimonio/i,
  LAST_CLAIMS: /Últimos Reclamos/i,
  MESSAGES_UNREAD: /Mensajes sin leer/i,
  MY_DATA: /Mis Datos/i,

  // User
  LOGGED_USER: /Catalina Liste/i,

  // Dates
  DATE_PATTERN: /\d{1,2}\/\d{1,2}\/\d{2,4}/,

  // History
  STATUS_CHANGE: /cambió el estado de|cambió el estado/i,
  EMPTY_HISTORY: /Aún no hay movimientos registrados/i,

  // Tabs
  DETAILS_TAB: 'details',
  NOTES_TAB: 'notes',
  MESSAGES_TAB: 'chat',
  FILES_TAB: 'files',
  HISTORY_TAB: 'history',

  // reCAPTCHA
  RECAPTCHA: `iframe[title="reCAPTCHA"]`,

  // Cookie banner
  COOKIE_BANNER: '[class*="cookie"], [id*="cookie"], [class*=" Cookie"]',
} as const;

// URLs
export const URLS = {
  BASE: ENV.BASE_URL,
  BACKOFFICE_LOGIN: '/backoffice/login',
  BACKOFFICE_HOME: '/backoffice/home',
  BACKOFFICE_CLAIMS: '/backoffice/claims',
  BACKOFFICE_MESSAGES: '/backoffice/messages',
  BACKOFFICE_MY_ACCOUNT: '/backoffice/my-account',
  FRONTEND_HOME: '/',
  FRONTEND_CLAIM_PASO0: '/iniciar-reclamo/paso-0',
  FRONTEND_VUELOS_PASO1: '/vuelos/paso-1',
  FRONTEND_SEARCH: '/mis-reclamos/buscar',
  FRONTEND_LIST: '/mis-reclamos/listado',
  FRONTEND_DATOS_PASO1: '/datos-personales/paso-1',
  FRONTEND_DATOS_PASO2: '/datos-personales/paso-2',
  FRONTEND_CONTANOS_PASO1: '/contanos-tu-problema/paso-1',
  STATIC_NOSOTROS: '/nosotros',
  STATIC_VUELOS: '/vuelos',
  STATIC_PRIVACY: '/politicas-de-privacidad',
  STATIC_TERMS: '/terminos-y-condiciones',
  STATIC_SERVICES: '/nuestros-servicios',
  STATIC_FAQ: '/preguntas-frecuentes',
  STATIC_CONTACT: '/contacto',
} as const;

// Test data
export const TEST_DATA = {
  SHORT_TEXT: "Test",
  LAST_NAME: "User",
  LONG_TEXT: "Compré un celular hace dos semanas y desde el primer día no funciona correctamente. La pantalla se apaga sola y la batería dura muy poco. Ya intenté cargarlo varias veces pero sigue igual. Quiero que me lo cambien por uno nuevo o me devuelvan el dinero.\n\nPodés sumar más info para que entendamos mejor tu caso:\n- Yo tengo domicilio en CABA.\n- Fecha del incidente: 15/04/2026.\n- Número de reclamo previo: REC-2026-001234.",
  DOCUMENT_NUMBER: "12345678",
  PHONE: "1191234567",
  INVALID_PHONE: "abc",
  INVALID_EMAIL: "emailinvalido",
  ORIGIN: "Buenos Aires",
  DESTINATION: "Madrid",
  AIRLINE: "Aerolineas Argentinas",
  FLIGHT_NUMBER: "123",
  OWNER_NAME: "Juan Perez",
  COMPANY_NAME: "ADUSSA",
  SHORT_COMPANY: "AD",

  // My Account test data
  MODIFIED_NAME: "Catalina Modified",
  MODIFIED_SURNAME: "Liste Modified",
  MODIFIED_DOCUMENT: "98765432",
  MODIFIED_EMAIL: "modified.email@example.com",
  MODIFIED_PHONE: "1199999999",
  ORIGINAL_NAME: "Catalina",
  ORIGINAL_SURNAME: "Liste",
} as const;
