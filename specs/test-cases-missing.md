# Test Cases - Funcionalidades No Automatizadas

Fecha: 2026-05-05
Proyecto: TeCorresponde (TeC)
Alcance: Casos de prueba para funcionalidades no cubiertas por los tests automatizados existentes

---

## 1. FRONTEND - PÁGINAS PÚBLICAS

### 1.1 Contacto (Contact Form)
| ID | Caso de Prueba | Descripción | Prioridad |
|----|----------------|-------------|-----------|
| FE-CONT-001 | Envío exitoso de formulario de contacto | Completar nombre, email, teléfono, asunto y mensaje, verificar envío exitoso | High |
| FE-CONT-002 | Validación de campos requeridos | Intentar enviar formulario vacío, verificar mensajes de error | High |
| FE-CONT-003 | Validación de formato de email | Ingresar email inválido, verificar validación | Medium |
| FE-CONT-004 | Validación de longitud de campos | Probar límites de caracteres en campos de texto | Low |
| FE-CONT-005 | Verificación de reCAPTCHA | Verificar que el reCAPTCHA funcione correctamente | Medium |

### 1.2 Contanos tu Problema (Tell Us Your Problem)
| ID | Caso de Prueba | Descripción | Prioridad |
|----|----------------|-------------|-----------|
| FE-CONTP-001 | Flujo completo - Vuelos Paso 1 | Seleccionar aerolínea, búsqueda con autocompletado | High |
| FE-CONTP-002 | Flujo completo - Vuelos Paso 2 | Ingresar número de vuelo, fecha, motivo de reclamo | High |
| FE-CONTP-003 | Flujo completo - Otros Paso 1 | Seleccionar categoría de reclamo, buscar categoría | High |
| FE-CONTP-004 | Flujo completo - Otros Paso 2 | Ingresar empresa, descripción del problema | High |
| FE-CONTP-005 | Validación de campos en Paso 1 Vuelos | Validar aerolínea obligatoria, formato | Medium |
| FE-CONTP-006 | Validación de campos en Paso 2 Vuelos | Validar número de vuelo, fecha no futura | Medium |
| FE-CONTP-007 | Validación de campos en Paso 1 Otros | Validar selección de categoría | Medium |
| FE-CONTP-008 | Validación de campos en Paso 2 Otros | Validar empresa obligatoria, descripción mínima | Medium |
| FE-CONTP-009 | Navegación hacia atrás | Verificar botón "Atrás" mantiene datos ingresados | Low |

### 1.3 Iniciar Reclamo - Flujo Vuelos (3 pasos)
| ID | Caso de Prueba | Descripción | Prioridad |
|----|----------------|-------------|-----------|
| FE-INIC-V-001 | Paso 0 - Selección de flujo | Seleccionar "Vuelos" como tipo de reclamo | High |
| FE-INIC-V-002 | Paso 1 - Búsqueda de aeropuertos | Buscar aeropuerto origen y destino (min 3 caracteres) | High |
| FE-INIC-V-003 | Paso 1 - Validación de aeropuertos | Verificar que aeropuertos coincidan, validación de campos | Medium |
| FE-INIC-V-004 | Paso 2 - Datos del vuelo | Ingresar número de vuelo, fecha, motivo de reclamo | High |
| FE-INIC-V-005 | Paso 2 - Validación de datos de vuelo | Validar número de vuelo, fecha no futura, selección de motivo | Medium |
| FE-INIC-V-006 | Paso 3 - Confirmación | Verificar resumen de datos, confirmar reclamo | High |
| FE-INIC-V-007 | Integración con Gemini AI | Verificar validación automática de formulario con IA | Medium |

### 1.4 Iniciar Reclamo - Flujo Otros (3 pasos)
| ID | Caso de Prueba | Descripción | Prioridad |
|----|----------------|-------------|-----------|
| FE-INIC-O-001 | Paso 0 - Selección de flujo | Seleccionar "Otros" como tipo de reclamo | High |
| FE-INIC-O-002 | Paso 1 - Categoría y empresa | Seleccionar categoría, ingresar nombre de empresa | High |
| FE-INIC-O-003 | Paso 1 - Validación | Validar categoría obligatoria, empresa mínimo 2 caracteres | Medium |
| FE-INIC-O-004 | Paso 2 - Descripción del problema | Ingresar descripción detallada del problema | High |
| FE-INIC-O-005 | Paso 2 - Adjuntos | Subir archivos adjuntos (PDF, imágenes) | High |
| FE-INIC-O-006 | Paso 2 - Validación de adjuntos | Validar tipos de archivo, tamaño máximo | Medium |
| FE-INIC-O-007 | Paso 3 - Confirmación | Verificar resumen de datos, confirmar reclamo | High |

### 1.5 Datos Personales (múltiples flujos)
| ID | Caso de Prueba | Descripción | Prioridad |
|----|----------------|-------------|-----------|
| FE-DP-001 | Paso 1 - Información personal | Ingresar nombre, apellido, tipo y número de documento | High |
| FE-DP-002 | Paso 1 - Validación de documento | Validar formato de documento según tipo | Medium |
| FE-DP-003 | Paso 2 - Contacto y OTP | Ingresar email/teléfono, generar OTP, validar | High |
| FE-DP-004 | Paso 2 - Reenvío de OTP | Verificar botón de reenvío de código OTP | Medium |
| FE-DP-005 | Paso 2 - Validación de OTP | Ingresar OTP incorrecto, verificar mensaje de error | Medium |
| FE-DP-006 | Paso 2 - Cambio de canal de comunicación | Cambiar entre email y teléfono, validar nuevo OTP | Medium |
| FE-DP-007 | Edición desde Mis Reclamos | Editar datos personales desde el panel de reclamos | Low |

### 1.6 Mis Reclamos (Track Claims)
| ID | Caso de Prueba | Descripción | Prioridad |
|----|----------------|-------------|-----------|
| FE-MR-001 | Búsqueda por número de reclamo | Ingresar número de reclamo, verificar resultado | High |
| FE-MR-002 | Búsqueda con credenciales | Login con OTP, ver listado de reclamos | High |
| FE-MR-003 | Listado de reclamos | Verificar paginación, ordenamiento | Medium |
| FE-MR-004 | Detalle de reclamo (drawer) | Abrir detalle desde 3-puntos, ver información completa | High |
| FE-MR-005 | Detalle - Pestaña Datos Personales | Ver datos personales en el drawer | Medium |
| FE-MR-006 | Detalle - Pestaña Mensajes | Ver mensajes del reclamo, enviar nuevo mensaje | High |
| FE-MR-007 | Detalle - Pestaña Archivos | Ver archivos adjuntos, descargar | Medium |
| FE-MR-008 | Detalle - Pestaña Historial | Ver historial de cambios de estado | Low |
| FE-MR-009 | Estado de pago | Verificar visualización de estado de pago | Medium |
| FE-MR-010 | Reclamo en diferentes estados | Verificar visualización para estados: Borrador, En Revisión, Aprobado, Rechazado, Finalizado, Cancelado | High |

### 1.7 Reconfirmación de Reclamo (Deep Links)
| ID | Caso de Prueba | Descripción | Prioridad |
|----|----------------|-------------|-----------|
| FE-RECONF-001 | Aceptar reconfirmación | Acceder por deep link, aceptar reconfirmación de reclamo | High |
| FE-RECONF-002 | Rechazar reconfirmación | Acceder por deep link, rechazar reconfirmación | High |
| FE-RECONF-003 | Reclamo ya reconfirmado | Verificar mensaje cuando ya fue reconfirmado | Medium |
| FE-RECONF-004 | Token inválido | Verificar manejo de token inválido o expirado | Medium |

### 1.8 Reanudar Reclamo Incompleto (Unfinished Claim)
| ID | Caso de Prueba | Descripción | Prioridad |
|----|----------------|-------------|-----------|
| FE-RESUME-001 | Acceder a reclamo incompleto | Click en email de reclamo incompleto, reanudar | High |
| FE-RESUME-002 | Continuar desde último paso | Verificar que retoma desde donde se quedó | High |
| FE-RESUME-003 | Completar y enviar | Completar pasos faltantes y enviar reclamo | High |

### 1.9 Newsletter
| ID | Caso de Prueba | Descripción | Prioridad |
|----|----------------|-------------|-----------|
| FE-NEWS-001 | Suscripción exitosa | Ingresar email, suscribirse al newsletter | Medium |
| FE-NEWS-002 | Validación de email | Ingresar email inválido, verificar error | Medium |
| FE-NEWS-003 | Email duplicado | Verificar manejo de email ya suscrito | Low |
| FE-NEWS-004 | Desuscripción | Acceder por link de desuscripción, confirmar | Low |

### 1.10 Páginas Estáticas Adicionales
| ID | Caso de Prueba | Descripción | Prioridad |
|----|----------------|-------------|-----------|
| FE-STATIC-007 | Página Nosotros | Verificar carga, contenido, enlaces | Low |
| FE-STATIC-008 | Página Vuelos | Verificar carga, secciones, CTA | Low |
| FE-STATIC-009 | Página Nuestros Servicios | Verificar servicios listados, descripciones | Low |
| FE-STATIC-010 | Página Preguntas Frecuentes | Verificar acordeón funcional, búsqueda | Medium |
| FE-STATIC-011 | Políticas de Privacidad | Verificar contenido legal | Low |
| FE-STATIC-012 | Términos y Condiciones | Verificar contenido legal | Low |

### 1.11 Mantenimiento (Maintenance Page)
| ID | Caso de Prueba | Descripción | Prioridad |
|----|----------------|-------------|-----------|
| FE-MAINT-001 | Página de mantenimiento | Verificar que se muestre cuando el sitio está en mantenimiento | Low |

### 1.12 404 - Not Found
| ID | Caso de Prueba | Descripción | Prioridad |
|----|----------------|-------------|-----------|
| FE-404-001 | Página no encontrada | Acceder a URL inexistente, verificar página 404 | Low |

---

## 2. FRONTEND - BACKOFFICE

### 2.1 Autenticación Backoffice (Adicional)
| ID | Caso de Prueba | Descripción | Prioridad |
|----|----------------|-------------|-----------|
| BO-AUTH-004 | Cerrar sesión | Click en logout, verificar redirección a login | High |
| BO-AUTH-005 | Olvidé mi contraseña | Ingresar email, recibir enlace de reset | Medium |
| BO-AUTH-006 | Reset de contraseña | Acceder por enlace, ingresar nueva contraseña | Medium |
| BO-AUTH-007 | Validación de contraseña nueva | Verificar requisitos de contraseña segura | Medium |
| BO-AUTH-008 | Sesión expirada | Verificar redirección al expirar sesión | Medium |

### 2.2 Mi Cuenta (User Profile)
| ID | Caso de Prueba | Descripción | Prioridad |
|----|----------------|-------------|-----------|
| BO-PROF-001 | Ver perfil de usuario | Acceder a Mi Cuenta, ver datos personales | High |
| BO-PROF-002 | Editar información personal | Modificar nombre, apellido, email | High |
| BO-PROF-003 | Cambiar contraseña | Ingresar contraseña actual y nueva | High |
| BO-PROF-004 | Validación de contraseña actual | Ingresar contraseña incorrecta, verificar error | Medium |
| BO-PROF-005 | Validación de contraseña nueva | Verificar requisitos de contraseña | Medium |
| BO-PROF-006 | Ver mensajes no leídos | Verificar contador en el header | Low |

### 2.3 Dashboard (Completar)
| ID | Caso de Prueba | Descripción | Prioridad |
|----|----------------|-------------|-----------|
| BO-DASH-006 | Filtros de fecha | Cambiar rango de fechas, verificar actualización | Medium |
| BO-DASH-007 | Gráfico de reclamos por estado | Verificar datos en gráfico de torta/barras | Medium |
| BO-DASH-008 | Gráfico de reclamos por mes | Verificar datos en gráfico de líneas/barras | Medium |
| BO-DASH-009 | Últimos reclamos | Ver detalle de últimos reclamos en dashboard | Medium |
| BO-DASH-010 | Click en reclamo desde dashboard | Navegar a detalle de reclamo | Medium |
| BO-DASH-011 | Contador de mensajes no leídos | Verificar contador en tiempo real | Low |

### 2.4 Lista de Reclamos (Completar)
| ID | Caso de Prueba | Descripción | Prioridad |
|----|----------------|-------------|-----------|
| BO-CLAIM-006 | Filtro por categoría | Filtrar reclamos por categoría | Medium |
| BO-CLAIM-007 | Filtro por fecha | Filtrar por rango de fechas | Medium |
| BO-CLAIM-008 | Filtro combinado | Combinar múltiples filtros | Medium |
| BO-CLAIM-009 | Ordenamiento | Ordenar por fecha, número, estado | Medium |
| BO-CLAIM-010 | Cambio de página | Navegar entre páginas de resultados | Medium |
| BO-CLAIM-011 | Exportar a Excel | Click en exportar, verificar descarga | High |
| BO-CLAIM-012 | Vista de tarjetas vs lista | Cambiar vista de reclamos | Low |
| BO-CLAIM-013 | Búsqueda por email de cliente | Buscar reclamos por email | Medium |

### 2.5 Detalle de Reclamo (Completar)
| ID | Caso de Prueba | Descripción | Prioridad |
|----|----------------|-------------|-----------|
| BO-DET-006 | Cambiar estado - Siguiente | Mover reclamo al siguiente estado | High |
| BO-DET-007 | Cambiar estado - Anterior | Mover reclamo al estado anterior | High |
| BO-DET-008 | Cambiar estado - Rechazar | Rechazar reclamo con motivo | High |
| BO-DET-009 | Validación con Gemini AI | Ejecutar validación de IA en reclamo | Medium |
| BO-DET-010 | Asignar staff | Asignar usuario de staff al reclamo | Medium |
| BO-DET-011 | Pestaña Notas - Editar nota | Editar nota existente | Medium |
| BO-DET-012 | Pestaña Notas - Eliminar nota | Eliminar nota, confirmar acción | Medium |
| BO-DET-013 | Pestaña Mensajes - Enviar | Enviar mensaje al cliente | High |
| BO-DET-014 | Pestaña Mensajes - Adjuntar archivo | Adjuntar archivo en mensaje | High |
| BO-DET-015 | Pestaña Archivos - Subir archivo | Subir resolución o anexo | High |
| BO-DET-016 | Pestaña Archivos - Descargar | Descargar archivo adjunto | Medium |
| BO-DET-017 | Pestaña Archivos - Eliminar | Eliminar archivo, confirmar acción | Medium |
| BO-DET-018 | Pestaña Historial - Ver transiciones | Ver historial completo de cambios | Low |
| BO-DET-019 | Reconfirmación - Enviar recordatorio | Enviar recordatorio de reconfirmación | Medium |
| BO-DET-020 | Reconfirmación - Aceptar/Rechazar | Acciones de reconfirmación desde backoffice | Medium |
| BO-DET-021 | Cancelar reclamo | Cancelar reclamo desde backoffice | Medium |
| BO-DET-022 | Cerrar reclamo | Cerrar reclamo finalizado | Medium |
| BO-DET-023 | Eliminar reclamo borrador | Eliminar reclamo en estado borrador | Low |

### 2.6 Mensajes (Completar)
| ID | Caso de Prueba | Descripción | Prioridad |
|----|----------------|-------------|-----------|
| BO-MSG-006 | Filtro por fecha | Filtrar mensajes por rango de fechas | Medium |
| BO-MSG-007 | Marcar como leído/no leído | Cambiar estado de lectura | Medium |
| BO-MSG-008 | Responder mensaje | Responder directo desde lista | Medium |
| BO-MSG-009 | Adjuntar archivo en respuesta | Adjuntar archivo al responder | Medium |
| BO-MSG-010 | Búsqueda avanzada | Buscar por contenido, remitente | Medium |
| BO-MSG-011 | Paginación | Navegar entre páginas de mensajes | Low |

### 2.7 Configuración - Jobs (Trabajos Programados)
| ID | Caso de Prueba | Descripción | Prioridad |
|----|----------------|-------------|-----------|
| BO-SET-JOB-001 | Listar jobs disponibles | Ver tabla de jobs programados | Medium |
| BO-SET-JOB-002 | Ejecutar job manualmente | Click en ejecutar, confirmar acción | Medium |
| BO-SET-JOB-003 | Verificar ejecución de job | Confirmar que el job se ejecutó correctamente | Medium |

### 2.8 Configuración - Receso Judicial (Judicial Recess)
| ID | Caso de Prueba | Descripción | Prioridad |
|----|----------------|-------------|-----------|
| BO-SET-JR-001 | Listar recesos judiciales | Ver tabla de períodos de receso | Medium |
| BO-SET-JR-002 | Crear nuevo receso | Ingresar fechas de inicio y fin | Medium |
| BO-SET-JR-003 | Validación de fechas | Verificar que fecha fin sea posterior a inicio | Medium |
| BO-SET-JR-004 | Editar receso existente | Modificar fechas de receso | Medium |
| BO-SET-JR-005 | Eliminar receso | Eliminar receso, confirmar acción | Medium |
| BO-SET-JR-006 | Receso actual | Verificar indicador de receso activo | Medium |
| BO-SET-JR-007 | Conflictos de fechas | Verificar validación de fechas superpuestas | Low |

### 2.9 Configuración - Propiedades (App Settings)
| ID | Caso de Prueba | Descripción | Prioridad |
|----|----------------|-------------|-----------|
| BO-SET-PROP-001 | Listar propiedades | Ver tabla de configuraciones de app | Medium |
| BO-SET-PROP-002 | Crear nueva propiedad | Ingresar clave y valor de configuración | Medium |
| BO-SET-PROP-003 | Editar propiedad | Modificar valor de configuración | Medium |
| BO-SET-PROP-004 | Validación de clave duplicada | Verificar error al duplicar clave | Low |
| BO-SET-PROP-005 | Eliminar propiedad | Eliminar configuración, confirmar | Low |
| BO-SET-PROP-006 | Tipos de datos | Verificar diferentes tipos de valores (string, number, boolean) | Low |

### 2.10 Chat en Tiempo Real
| ID | Caso de Prueba | Descripción | Prioridad |
|----|----------------|-------------|-----------|
| BO-CHAT-001 | Listar chats paginados | Ver lista de chats de reclamos | Medium |
| BO-CHAT-002 | Buscar en chats | Buscar por número de reclamo o cliente | Medium |
| BO-CHAT-003 | Abrir chat | Navegar al detalle del chat | Medium |
| BO-CHAT-004 | Enviar mensaje en chat | Enviar mensaje desde el chat | Medium |
| BO-CHAT-005 | Adjuntar archivo en chat | Adjuntar archivo en mensaje de chat | Medium |
| BO-CHAT-006 | Marcar mensajes como leídos | Marcar todos los mensajes como leídos | Low |

---

## 3. API TESTS (Backend - tec_core)

### 3.1 Claims API
| ID | Caso de Prueba | Descripción | Prioridad |
|----|----------------|-------------|-----------|
| API-CLAIM-001 | GET /claims - Listar reclamos del usuario | Obtener todos los reclamos del usuario logueado | High |
| API-CLAIM-002 | GET /claims/{id} - Obtener por ID | Obtener detalle de reclamo público | High |
| API-CLAIM-003 | GET /claims/claimNumber/{claimNumber} | Obtener reclamo por número | High |
| API-CLAIM-004 | POST /claims - Crear reclamo | Crear nuevo reclamo genérico | High |
| API-CLAIM-005 | PATCH /claims/{id} - Actualizar | Actualizar datos de reclamo | High |
| API-CLAIM-006 | POST /claims/{id}/cancel - Cancelar | Cancelar reclamo | Medium |
| API-CLAIM-007 | POST /claims/{id}/accept-reconfirmation | Aceptar reconfirmación | Medium |
| API-CLAIM-008 | POST /claims/{id}/reject-reconfirmation | Rechazar reconfirmación | Medium |
| API-CLAIM-009 | POST /claims/{id}/close - Cerrar | Cerrar reclamo (backoffice) | Medium |
| API-CLAIM-010 | GET /claims/{id}/attachments/{attachmentId} | Descargar adjunto | Medium |
| API-CLAIM-011 | POST /claims/{id}/attachments - Subir | Subir archivo adjunto | High |
| API-CLAIM-012 | DELETE /claims/{id}/attachments/{attachmentId} | Eliminar adjunto | Medium |
| API-CLAIM-013 | GET /claims/{id}/resolution - Descargar | Descargar resolución | Medium |
| API-CLAIM-014 | GET /claims/categories - Categorías | Obtener categorías de reclamos | Medium |
| API-CLAIM-015 | PUT /claims/{claimNumber}/to-review | Cambiar a estado "En Revisión" | Medium |
| API-CLAIM-016 | PATCH /claims/{id}/associate-with-customer | Asociar con cliente | Medium |

### 3.2 Flight Claims API
| ID | Caso de Prueba | Descripción | Prioridad |
|----|----------------|-------------|-----------|
| API-FLIGHT-001 | GET /claims/flights/{id} - Obtener | Obtener reclamo de vuelo por ID | High |
| API-FLIGHT-002 | POST /claims/flights - Crear | Crear nuevo reclamo de vuelo | High |
| API-FLIGHT-003 | PUT /claims/flights/{id} - Actualizar | Actualizar reclamo de vuelo | High |

### 3.3 Backoffice Claims API
| ID | Caso de Prueba | Descripción | Prioridad |
|----|----------------|-------------|-----------|
| API-BO-CLAIM-001 | GET /backoffice/claims/mine/paginated | Obtener reclamos paginados | High |
| API-BO-CLAIM-002 | GET /backoffice/claims/mine/paginated/search | Buscar reclamos con paginación | High |
| API-BO-CLAIM-003 | GET /backoffice/claims/mine/export | Exportar a Excel | Medium |
| API-BO-CLAIM-004 | POST /backoffice/claims/{claimId}/nextStatus | Siguiente estado | High |
| API-BO-CLAIM-005 | POST /backoffice/claims/{claimId}/prevStatus | Estado anterior | High |
| API-BO-CLAIM-006 | POST /backoffice/claims/{claimId}/reject | Rechazar reclamo | High |
| API-BO-CLAIM-007 | POST /backoffice/claims/{claimId}/accept-reconfirmation | Aceptar reconfirmación (BO) | Medium |
| API-BO-CLAIM-008 | POST /backoffice/claims/{claimId}/reject-reconfirmation | Rechazar reconfirmación (BO) | Medium |
| API-BO-CLAIM-009 | DELETE /backoffice/claims/{claimId} | Eliminar reclamo borrador | Low |
| API-BO-CLAIM-010 | PATCH /backoffice/claims/{claimId}/assign/{staffUserId} | Asignar staff | Medium |
| API-BO-CLAIM-011 | GET /backoffice/claims/mine/chats/paginated | Listar chats paginados | Medium |
| API-BO-CLAIM-012 | GET /backoffice/claims/mine/reconfirm-claims-status | Estado de reconfirmaciones | Low |

### 3.4 Backoffice Claim Notes API
| ID | Caso de Prueba | Descripción | Prioridad |
|----|----------------|-------------|-----------|
| API-NOTE-001 | GET /backoffice/claims/{claimId}/notes | Listar notas de reclamo | Medium |
| API-NOTE-002 | POST /backoffice/claims/{claimId}/notes | Crear nota | Medium |
| API-NOTE-003 | PUT /backoffice/claims/{claimId}/notes/{noteId} | Editar nota | Medium |
| API-NOTE-004 | DELETE /backoffice/claims/{claimId}/notes/{noteId} | Eliminar nota | Medium |

### 3.5 Backoffice Dashboard API
| ID | Caso de Prueba | Descripción | Prioridad |
|----|----------------|-------------|-----------|
| API-DASH-001 | GET /backoffice/dashboard/claims-by-status | Reclamos por estado | Medium |
| API-DASH-002 | GET /backoffice/dashboard/claims-per-month-by-year | Reclamos por mes | Medium |
| API-DASH-003 | GET /backoffice/dashboard/last-claims | Últimos reclamos | Medium |
| API-DASH-004 | GET /backoffice/dashboard/unread-messages | Mensajes no leídos | Medium |

### 3.6 OTP Auth API
| ID | Caso de Prueba | Descripción | Prioridad |
|----|----------------|-------------|-----------|
| API-OTP-001 | POST /auth/generate-otp - Email | Generar OTP por email | High |
| API-OTP-002 | POST /auth/generate-otp - SMS | Generar OTP por teléfono | High |
| API-OTP-003 | POST /auth/login-with-otp | Login con OTP válido | High |
| API-OTP-004 | POST /auth/login-with-otp - Inválido | Login con OTP inválido | Medium |
| API-OTP-005 | POST /auth/generate-otp-for-validation | Generar OTP para validación | Medium |
| API-OTP-006 | POST /auth/validate-communication-channel | Validar canal de comunicación | Medium |

### 3.7 TEC Users API
| ID | Caso de Prueba | Descripción | Prioridad |
|----|----------------|-------------|-----------|
| API-USER-001 | GET /tec-users/me | Obtener usuario actual | High |
| API-USER-002 | GET /tec-users/staff | Listar usuarios staff | Medium |
| API-USER-003 | PATCH /tec-users - Actualizar | Actualizar datos personales | High |
| API-USER-004 | PATCH /tec-users/update-password | Cambiar contraseña | High |
| API-USER-005 | GET /tec-users/unread-messages | Mensajes no leídos | Medium |

### 3.8 Chat Messages API
| ID | Caso de Prueba | Descripción | Prioridad |
|----|----------------|-------------|-----------|
| API-CHAT-001 | POST /{claimId}/chat-messages - Crear | Enviar mensaje en chat | High |
| API-CHAT-002 | GET /{claimId}/chat-messages - Listar | Listar mensajes de chat | High |
| API-CHAT-003 | PATCH /{claimId}/chat-messages/read-all | Marcar todos como leídos | Medium |
| API-CHAT-004 | PATCH /{claimId}/chat-messages/unread | Marcar como no leído | Low |

### 3.9 Airlines API
| ID | Caso de Prueba | Descripción | Prioridad |
|----|----------------|-------------|-----------|
| API-AIRLINE-001 | GET /airlines?term= - Búsqueda | Buscar aerolíneas por término (min 3 chars) | Medium |

### 3.10 Airports API
| ID | Caso de Prueba | Descripción | Prioridad |
|----|----------------|-------------|-----------|
| API-AIRPORT-001 | GET /airports?term= - Búsqueda | Buscar aeropuertos por término (min 3 chars) | Medium |

### 3.11 App Settings API
| ID | Caso de Prueba | Descripción | Prioridad |
|----|----------------|-------------|-----------|
| API-SETTING-001 | GET /app-settings - Listar | Listar configuraciones (Admin) | Low |
| API-SETTING-002 | POST /app-settings - Crear | Crear configuración (Admin) | Low |
| API-SETTING-003 | PATCH /app-settings/{id} - Editar | Editar configuración (Admin) | Low |
| API-SETTING-004 | DELETE /app-settings/{id} - Eliminar | Eliminar configuración (Admin) | Low |

### 3.12 App Info API
| ID | Caso de Prueba | Descripción | Prioridad |
|----|----------------|-------------|-----------|
| API-INFO-001 | GET /api/info | Obtener info de la aplicación | Low |

### 3.13 Communications API
| ID | Caso de Prueba | Descripción | Prioridad |
|----|----------------|-------------|-----------|
| API-COMM-001 | POST /communications/send-claim-reconfirmation-reminder | Enviar recordatorio (Backoffice) | Medium |

### 3.14 Contact API
| ID | Caso de Prueba | Descripción | Prioridad |
|----|----------------|-------------|-----------|
| API-CONTACT-001 | POST /contact | Enviar formulario de contacto | Medium |

### 3.15 Gemini AI API
| ID | Caso de Prueba | Descripción | Prioridad |
|----|----------------|-------------|-----------|
| API-GEMINI-001 | POST /gemini/{id}/validate-form | Validar formulario con IA | Medium |

### 3.16 Job API
| ID | Caso de Prueba | Descripción | Prioridad |
|----|----------------|-------------|-----------|
| API-JOB-001 | GET /api/jobs - Listar | Listar jobs disponibles (Admin) | Low |
| API-JOB-002 | POST /api/jobs/run?jobName= | Ejecutar job manualmente (Admin) | Low |

### 3.17 Judicial Recess API
| ID | Caso de Prueba | Descripción | Prioridad |
|----|----------------|-------------|-----------|
| API-JR-001 | GET /judicial-recess - Listar | Listar recesos judiciales | Medium |
| API-JR-002 | POST /judicial-recess - Crear | Crear receso judicial | Medium |
| API-JR-003 | PATCH /judicial-recess/{id} - Editar | Editar receso judicial | Medium |
| API-JR-004 | DELETE /judicial-recess/{id} - Eliminar | Eliminar receso judicial | Medium |
| API-JR-005 | GET /judicial-recess/status - Estado | Obtener estado actual | Medium |

### 3.18 Newsletter API
| ID | Caso de Prueba | Descripción | Prioridad |
|----|----------------|-------------|-----------|
| API-NEWS-001 | POST /newsletter - Suscribir | Suscribirse al newsletter | Medium |
| API-NEWS-002 | GET /newsletter/export - Exportar | Exportar suscriptores a CSV | Low |
| API-NEWS-003 | DELETE /newsletter/unsubscribe - Desuscribir | Desuscribirse del newsletter | Low |

### 3.19 TEC Files API (S3)
| ID | Caso de Prueba | Descripción | Prioridad |
|----|----------------|-------------|-----------|
| API-FILE-001 | POST /tec-files - Subir | Subir archivo a S3 | High |
| API-FILE-002 | DELETE /tec-files/{id} - Eliminar | Eliminar archivo de S3 | Medium |

---

## 4. INTEGRACIÓN Y FLUJOS END-TO-END

### 4.1 Flujo Completo de Reclamo de Vuelo
| ID | Caso de Prueba | Descripción | Prioridad |
|----|----------------|-------------|-----------|
| E2E-FLIGHT-001 | Crear reclamo de vuelo (Frontend) | Flujo completo: Iniciar → Datos Vuelo → Datos Personales → Confirmación | High |
| E2E-FLIGHT-002 | Procesar reclamo (Backoffice) | Backoffice: Revisar → Validar con IA → Cambiar estado → Resolver | High |
| E2E-FLIGHT-003 | Comunicación Cliente-Backoffice | Cliente envía mensaje → Backoffice responde → Cliente verifica | High |
| E2E-FLIGHT-004 | Reconfirmación de reclamo | Backoffice envía reconfirmación → Cliente acepta/rechaza | Medium |

### 4.2 Flujo Completo de Reclamo Otros
| ID | Caso de Prueba | Descripción | Prioridad |
|----|----------------|-------------|-----------|
| E2E-OTHER-001 | Crear reclamo otros (Frontend) | Flujo completo: Iniciar → Datos Empresa → Descripción → Adjuntos → Confirmación | High |
| E2E-OTHER-002 | Procesar reclamo (Backoffice) | Backoffice: Revisar → Cambiar estado → Adjuntar resolución → Cerrar | High |
| E2E-OTHER-003 | Seguimiento de reclamo | Cliente consulta estado → Ve actualizaciones → Descarga resolución | Medium |

### 4.3 Flujo de Autenticación OTP
| ID | Caso de Prueba | Descripción | Prioridad |
|----|----------------|-------------|-----------|
| E2E-OTP-001 | Registro con OTP Email | Generar OTP → Recibir email → Validar → Completar registro | High |
| E2E-OTP-002 | Registro con OTP SMS | Generar OTP → Recibir SMS → Validar → Completar registro | High |
| E2E-OTP-003 | Reenvío de OTP | Solicitar reenvío → Recibir nuevo código | Medium |
| E2E-OTP-004 | OTP expirado | Intentar validar OTP expirado | Medium |

### 4.4 Flujo de Newsletter
| ID | Caso de Prueba | Descripción | Prioridad |
|----|----------------|-------------|-----------|
| E2E-NEWS-001 | Suscripción → Desuscripción | Suscribirse → Recibir confirmación → Desuscribirse | Low |

---

## 5. PRUEBAS DE RENDIMIENTO Y CARGA (Manual / JMeter)

### 5.1 Carga de Página
| ID | Caso de Prueba | Descripción | Prioridad |
|----|----------------|-------------|-----------|
| PERF-001 | Tiempo de carga Homepage | Verificar carga < 3 segundos | Medium |
| PERF-002 | Tiempo de carga Dashboard | Verificar carga < 5 segundos | Medium |
| PERF-003 | Tiempo de búsqueda de reclamos | Verificar respuesta < 2 segundos | Medium |

### 5.2 API Response Time
| ID | Caso de Prueba | Descripción | Prioridad |
|----|----------------|-------------|-----------|
| PERF-004 | Response time Claims API | Verificar < 500ms para listados | Medium |
| PERF-005 | Response time Search | Verificar < 1s para búsquedas | Medium |

---

## 6. PRUEBAS DE SEGURIDAD (Manual / OWASP)

### 6.1 Autenticación y Autorización
| ID | Caso de Prueba | Descripción | Prioridad |
|----|----------------|-------------|-----------|
| SEC-001 | Acceso sin autenticación | Verificar redirección a login en rutas protegidas | High |
| SEC-002 | JWT Token expiration | Verificar manejo de token expirado | High |
| SEC-003 | Inyección SQL | Verificar protección contra SQL injection | High |
| SEC-004 | XSS - Cross Site Scripting | Verificar protección contra XSS | High |
| SEC-005 | CSRF | Verificar protección CSRF | Medium |
| SEC-006 | Rate limiting | Verificar límites en intentos de login | Medium |

---

## RESUMEN

- **Total casos identificados:** ~180
- **Frontend - Público:** ~50 casos
- **Frontend - Backoffice:** ~60 casos
- **API Tests:** ~60 casos
- **E2E Flows:** ~10 casos
- **Performance:** ~5 casos
- **Security:** ~6 casos

## RECOMENDACIONES

1. **Prioridad Alta:** Completar flujos críticos de reclamo (creación, procesamiento, seguimiento)
2. **Prioridad Media:** Configuraciones de backoffice, API tests, validaciones
3. **Prioridad Baja:** Páginas estáticas, funciones administrativas avanzadas
4. **Automatización sugerida:** Usar Playwright para E2E, JUnit para API tests en tec_core
5. **Pruebas manuales:** Security, Performance, visual regression
