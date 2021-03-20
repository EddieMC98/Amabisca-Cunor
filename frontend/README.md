# Se utiliza NGX-Admin como plantilla base.
# La plantilla se basa en Angular 8+, Bootstrap 4 y <a href="https://github.com/akveo/nebular">Nebular</a>

[La plantilla puede encontrarse en:](https://github.com/akveo/ngx-admin/issues/1645)

### Se incluyen las siguientes tecnologías:

- Angular 8+ & Typescript
- Bootstrap 4+ & SCSS
- Layout responsivo
- RTL support
- Alta definición
- Posee mucha flexibilidad y posibilidad de configurar varios temas.
- Módulo de autenticación con múltiples proveedores.
- Funcionalidades incluidas:
  - Botones
  - Modales
  - Popovers
  - Iconos
  - Tipografías
  - Búsquedas animadas
  - Formularios
  - Pestañas (Tabs)
  - Notificaciones
  - Tablas
  - Mapas
  - Gráficas de Estadística
  - Editores
  
## Documentación de Nebular
Documentación del sistema [Nebular](https://github.com/akveo/nebular) modules set, [here you can find documentation and other useful articles](https://akveo.github.io/nebular/docs/guides/install-based-on-starter-kit).

## Modificaciones a Módulos

### ng2-smart-table

Para dar soporte a la paginación y filtro, se debe modificar manualmente el módulo en el archivo ubicado en la dirección 
raiz del proyecto. Ejemplo: "/node_modules/ng2-smart-table/lib/data-source/server/server.data-source.js"

Modificar las líneas:

    httpParams = httpParams.set(_this.conf.sortFieldKey, fieldConf.field);
    
    httpParams = httpParams.set(_this.conf.sortDirKey, fieldConf.direction.toUpperCase());

Por:

    httpParams = httpParams.set(_this.conf.sortFieldKey, fieldConf.field + "," + fieldConf.direction.toLowerCase());
    
    //httpParams = httpParams.set(_this.conf.sortDirKey, fieldConf.direction.toUpperCase());

Modificar la línea original:
    
    httpParams = httpParams.set(this.conf.pagerPageKey, this.pagingConf['page']);
    
Por:
    
    httpParams = httpParams.set(this.conf.pagerPageKey, this.pagingConf['page'] + (-1));


# Iniciar el proyecto

### Descargar el código

Puede utilizar GIT para clonar el proyecto, ejemplo:

    git clone git@pensotec.com:pensotec/pr-penso-plantilla-002.git

Cuando finalice de clonar, es necesario instalar los módulos vía NPM con el comando dentro de la carpeta FRONTEND:

    npm i

# Iniciar la copia local de la plantilla

Para iniciar la copia local en modo desarrollo, ejecutar:

    npm start

También puede utilizar el CLI de Angular

    ng serve -o

Luego dirigirse al enlace http://0.0.0.0:4200 o http://localhost:4200 en el navegador.

# Generar el Front End para producción

Para crear el Front End en modo producción, ejecutar:

    npm run build:prod
    ng build --prod --build-optimizer=false --aot=false

Se creará un folder con el nombre "dist", se encontrarán los archivos finales del Front End, listos para desplegarse
en un servidor Web.