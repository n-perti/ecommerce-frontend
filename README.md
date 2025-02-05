# E-commerce Frontend

[![Next.js](https://img.shields.io/badge/Next.js-13-blue)](https://nextjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Una aplicación frontend moderna y responsiva para plataformas de e-commerce, desarrollada con Next.js y Tailwind CSS. Este proyecto ofrece una interfaz de usuario atractiva, optimizada para una experiencia de compra fluida y eficiente.

## Descripción

Este proyecto representa el frontend de un sistema de comercio electrónico. Aprovecha la potencia de Next.js para ofrecer renderizado del lado del servidor (SSR) y generación de sitios estáticos (SSG), lo que permite tiempos de carga rápidos y SEO optimizado. La interfaz se ha desarrollado utilizando Tailwind CSS, lo que facilita el diseño de componentes modernos y personalizables.

## Características

- **Interfaz Responsiva**: Diseño adaptable a dispositivos móviles, tablets y escritorio.
- **Optimización SEO**: Aprovecha las capacidades de SSR/SSG de Next.js para mejorar el posicionamiento en buscadores.
- **Rutas y Navegación Fluida**: Navegación intuitiva entre páginas y secciones.
- **Componentes Reutilizables**: Estructura modular basada en componentes de React.
- **Integración con API RESTful**: Comunicación eficiente con el backend para gestionar productos, usuarios y pedidos.
- **Soporte para Personalización**: Estilos fácilmente modificables gracias a Tailwind CSS.

## Tecnologías Utilizadas

- **Next.js**: Framework React para aplicaciones web escalables.
- **React.js**: Biblioteca para construir interfaces de usuario.
- **Tailwind CSS**: Framework CSS para un diseño rápido y personalizado.
- **Vercel**: Plataforma recomendada para el despliegue de aplicaciones Next.js.

## Requisitos Previos

- [Node.js](https://nodejs.org/) v16 o superior.
- npm, yarn o pnpm para la gestión de dependencias.

## Instalación

1. **Clona el repositorio:**

    ```bash
    git clone https://github.com/n-perti/ecommerce-frontend.git
    cd ecommerce-frontend
    ```

2. **Instala las dependencias:**

    ```bash
    npm install
    # o, alternativamente:
    yarn install
    ```

3. **Inicia el servidor de desarrollo:**

    ```bash
    npm run dev
    # o
    yarn dev
    ```

4. **Accede a la aplicación:**

    Abre tu navegador en [http://localhost:3000](http://localhost:3000) para ver la aplicación en funcionamiento.

## Estructura del Proyecto

La organización del proyecto sigue las convenciones de Next.js y se estructura de la siguiente forma:

```
├── public/             # Recursos públicos (imágenes, fuentes, etc.)
├── src/                # Código fuente de la aplicación
│   ├── app/            # Páginas y rutas de la aplicación
│   ├── components/     # Componentes reutilizables de la UI
│   ├── styles/         # Archivos de estilos (CSS, Tailwind config, etc.)
│   └── lib/            # Funciones auxiliares e integraciones con APIs
├── .eslintrc.json      # Configuración de ESLint para mantener la calidad del código
├── package.json        # Dependencias y scripts del proyecto
└── next.config.js      # Configuración de Next.js
```

## Despliegue

La forma más sencilla de desplegar este proyecto es a través de [Vercel](https://vercel.com/):

1. Conecta tu repositorio a Vercel.
2. Configura las variables de entorno necesarias.
3. Despliega la aplicación con un solo clic.

Consulta la [documentación de Next.js](https://nextjs.org/docs/deployment) para más detalles sobre despliegues.

## Contribuciones

¡Se agradecen las contribuciones! Si deseas aportar mejoras o corregir errores, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una rama para tu nueva funcionalidad o corrección (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commits con mensajes descriptivos.
4. Abre un pull request explicando los cambios realizados.

## Licencia

Este proyecto se distribuye bajo la [Licencia MIT](LICENSE).

## Contacto

Si tienes preguntas, sugerencias o deseas colaborar, no dudes en abrir un issue en el repositorio o contactarme directamente a [hi@nicolaspertierra.com](mailto:hi@nicolaspertierra.com).

---

Este README proporciona una visión clara y profesional del proyecto, facilitando su comprensión y uso tanto para desarrolladores como para posibles empleadores en tu portfolio. ¡Éxito con tu proyecto!
