# Documentación de uso

En este documento se muestra cómo desplegar el reto técnico con NodeJS utilizando el Framework Serverless.

## Uso

### Instalación

Para instalar las dependencias necesarias, sigue estos pasos:

1. **Instalar Node.js**: Asegúrate de tener Node.js v18 instalado en tu máquina. Puedes descargarlo desde [nodejs.org](https://nodejs.org/).

2. **Instalar Serverless Framework**: Si no tienes el Serverless Framework instalado, instálalo globalmente usando npm:

   ```bash
   npm install -g serverless

### Despliegue

Para desplegar el ejemplo, necesitas ejecutar el siguiente comando:

```
$ serverless deploy
```

Después de ejecutar el despliegue, deberías ver una salida similar a:

```bash
Deploying reto-tecnico to stage dev (us-east-1)

✔ Service deployed to stack reto-tecnico-dev (112s)

functions:
  cmd: reto-tecnico-dev-cmd (38 MB)
  qry: reto-tecnico-dev-qry (38 MB)
  swaggerUI: reto-tecnico-dev-swagger-ui (38 MB)
  swaggerJSON: reto-tecnico-dev-swagger-json (38 MB)
```

### Invocación

Después de un despliegue exitoso, puedes invocar la función desplegada utilizando el siguiente comando:

```bash
serverless invoke --function qry
```

### Despliegue Local

Puedes invocar tu función localmente usando el siguiente comando:

```bash
serverless invoke local --function qry
```

## Uso del API

Este proyecto expone un API REST con dos endpoints principales:

### **1. POST /**

- **Descripción**: Permite guardar un personaje en la base de datos DynamoDB.
- **Cuerpo de la solicitud**: El cuerpo debe cumplir con la estructura de la interfaz `People`, que tiene los siguientes campos:

```json
{
  "name": "string",
  "height": "string",
  "mass": "string",
  "hair_color": "string",
  "skin_color": "string",
  "eye_color": "string",
  "birth_year": "string",
  "gender": "string",
  "homeworld": "string",
  "films": ["string"],
  "species": ["string"],
  "vehicles": ["string"],
  "starships": ["string"],
  "created": "string",
  "edited": "string",
  "url": "string"
}
```
- **Respuesta Esperada**:
```json
{ 
  "response": true 
}
```

### **2. GET /**

- **Descripción**: Recupera todos los personajes almacenados en la tabla de DynamoDB y del API de Star Wars.
- **Ejemplo de solicitud**:

```bash
curl https://{API_ID}.execute-api.{REGION}.amazonaws.com/dev/
```

- **Respuesta Esperada**:
```json
{
  "statusCode": 200,
  "data": [
    {
      "name": "Luke Skywalker",
      "height": "172",
      "mass": "77",
      "hair_color": "blond",
      "skin_color": "fair",
      "eye_color": "blue",
      "birth_year": "19BBY",
      "gender": "male",
      "homeworld": "Tatooine",
      "films": ["A New Hope", "The Empire Strikes Back"],
      "species": [],
      "vehicles": ["Snowspeeder"],
      "starships": ["X-Wing"],
      "created": "2024-01-01T00:00:00Z",
      "edited": "2024-01-01T00:00:00Z",
      "url": "https://swapi.dev/api/people/1/"
    }
  ]
}
```