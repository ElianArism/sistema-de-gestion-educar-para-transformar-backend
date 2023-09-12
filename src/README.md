# Backend Educar para transformar

## URL en produccion

`https://sistemadegestioneducarparatransformar-elianarism.b4a.run/api/`

## Endpoints

### Usuarios

- Retornar todos los usuarios filtrando por role

  `GET /all/:role`

- Retornar un usuario especifico por role e id

  `GET /:role/:id`

- Eliminar un usuario

  `DELETE /:role/:id`

- Actualizar password ( solo usuarios logueados)

  `PUT /update-password"`

### Agregar nuevos usuarios

- `POST /professor`
- `POST /student`
- `POST /parent`

### Actualizar usuarios

- `PUT /professor`
- `PUT /student`
- `PUT /parent`
