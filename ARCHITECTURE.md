## **Challenge: Dynamic Orchestrator**

### **1\. El Escenario**

El usuario debe construir un **Dashboard de Tareas Inteligente** que renderice diferentes tipos de tarjetas (tareas de texto, tareas con checklist, y alertas de sistema) basándose en una respuesta JSON. No se sabe de antemano cuántas ni de qué tipo serán las tarjetas.

### **2\. Flujo Arquitectural**

Para evaluar el nivel intermedio/difícil, el flujo debe seguir estrictamente este esquema:

* **View (Lit Element):** Solo se encarga de pintar y capturar eventos de usuario.  
* **Data Manager (DM):** Es el cerebro. Procesa los datos, gestiona el estado y responde a los eventos.  
* **Events:** La única forma de comunicación entre la vista y el DM es mediante eventos personalizados (`CustomEvents`).

---

### **3\. Requerimientos Técnicos**

#### **A. Centralización (The DM Pattern)**

Deben crear una clase `TaskDataManager` (JS Puro) que:

* Realice un `fetch` a un archivo local `tasks.json`.  
* Mantenga el estado interno de las tareas.  
* Escuche eventos como `delete-task` o `update-task` y actualice el estado sin tocar el DOM directamente.

#### **B. Reutilización (Mixins)**

Crear un Mixin llamado `HasAnalytics`. Cualquier componente que lo use debe:

* Tener un método `logInteraction(action, detail)`.  
* Emitir automáticamente un evento global cada vez que el usuario interactúa con un elemento importante.

#### **C. Renderización Dinámica**

El componente principal `task-list.js` no debe tener una lista de componentes estática. Debe iterar sobre los datos y usar una función `_renderTemplate(task)` que devuelva un `html` distinto dependiendo del `task.type`.

---

### **4\. Estructura de Source Tree**

Se evaluará que el proyecto respete la organización jerárquica:

src/  
├── custom-elements/  
│   ├── shared/  
│   │   └── analytics-mixin.js  
│   ├── task-card/  
│   │   ├── task-card.js  
│   │   └── task-card.scss  
│   └── task-list/  
│       ├── task-list.js  
│       └── task-list.scss  
├── dm/  
│   └── task-data-manager.js  
├── pages/  
│   └── dashboard-page.js  
└── styles/  
    ├── \_variables.scss  
    └── main.scss

### **5\. Puntos Extra**

1. **Optimización:** Que el `Data Manager` no emita un evento de actualización si los datos recibidos son idénticos a los actuales (Deep Comparison).  
2. **Manejo de Errores:** Un componente `error-boundary` que capture fallos en la renderización dinámica de un template específico sin romper toda la página.

JSON Tasks

{  
  "project": "CloudSync Dashboard",  
  "lastUpdated": "2026-04-15T10:00:00Z",  
  "data": \[  
    {  
      "id": "t-101",  
      "type": "text",  
      "priority": "medium",  
      "content": {  
        "title": "Actualizar dependencias de NPM",  
        "description": "Revisar vulnerabilidades en el package.json y subir versiones de Lit Element."  
      },  
      "metadata": {  
        "category": "mantenimiento",  
        "trackable": true  
      }  
    },  
    {  
      "id": "t-102",  
      "type": "checklist",  
      "priority": "high",  
      "content": {  
        "title": "Despliegue a Producción",  
        "items": \[  
          { "id": "i1", "label": "Correr tests unitarios", "completed": true },  
          { "id": "i2", "label": "Build de producción", "completed": false },  
          { "id": "i3", "label": "Purgar caché de Nginx", "completed": false }  
        \]  
      },  
      "metadata": {  
        "category": "devops",  
        "trackable": true  
      }  
    },  
    {  
      "id": "t-103",  
      "type": "alert",  
      "priority": "critical",  
      "content": {  
        "title": "Fallo en el Data Manager",  
        "message": "La persistencia en LocalStorage ha fallado. Se requiere revisión inmediata de la clase base.",  
        "errorCode": "ERR\_DOM\_004"  
      },  
      "metadata": {  
        "category": "sistema",  
        "trackable": false  
      }  
    },  
    {  
      "id": "t-104",  
      "type": "text",  
      "priority": "low",  
      "content": {  
        "title": "Documentar Mixins",  
        "description": "Añadir JSDoc a los ficheros en la carpeta shared/."  
      },  
      "metadata": {  
        "category": "documentacion",  
        "trackable": true  
      }  
    }  
  \]  
}  

## 6. Development Rules (STRICT)

### Architecture Rules
- The View (Lit components) MUST NOT contain business logic
- The Data Manager is the ONLY source of truth
- The Data Manager MUST NOT manipulate the DOM
- Communication MUST be done ONLY through CustomEvents
- Components MUST NOT directly modify shared state

### Rendering Rules
- task-list MUST dynamically render tasks using a function (_renderTemplate)
- DO NOT hardcode task components
- Rendering MUST depend on task.type

### Event Rules
- All user interactions MUST dispatch CustomEvents
- The Data Manager MUST listen and react to those events
- No direct method calls between components and Data Manager

### Code Guidelines
- Use clean and modular structure
- Avoid duplicated logic
- Keep components reusable