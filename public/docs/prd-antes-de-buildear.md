<h2 id="que-es">Qué Es</h2>

Un PRD mínimo es el documento de una página que definís **antes** de escribir una sola línea de código. No es un documento de requisitos corporativo — es el filtro que te ahorra construir lo que no sirve.

La mayoría empieza a buildear sin saber exactamente qué está construyendo ni para quién. Este prompt + template lo cambia en 15 minutos.

<h2 id="el-prompt">El Prompt</h2>

Pegá este prompt en Claude con el contexto de tu idea:

```
Actúa como un product manager senior. Voy a describir una idea de producto o feature.
Tu trabajo es hacerme las preguntas necesarias para construir un PRD mínimo de una página.

Preguntas obligatorias:
1. ¿Quién es el usuario exacto? (no "cualquiera", sé específico)
2. ¿Qué problema resuelve? ¿Con qué frecuencia ocurre ese problema?
3. ¿Qué tiene que hacer el MVP para que sea útil? (máximo 3 features)
4. ¿Cómo medimos el éxito en 30 días?
5. ¿Qué NO entra en el MVP?

Una vez que respondas, generá el PRD en el template estándar.

Mi idea: [DESCRIBE TU IDEA AQUÍ]
```

<h2 id="las-reglas">Las 3 Reglas</h2>

<div class="doc-steps">
  <div class="doc-step">
    <span class="doc-step-num">01</span>
    <div class="doc-step-body">
      <strong>Usuario específico</strong>
      <p>"Developers" no es un usuario. "Developers freelance que facturan menos de 3k/mes y quieren subir a 5k" sí lo es. Sin esto, todo lo demás falla.</p>
    </div>
  </div>
  <div class="doc-step">
    <span class="doc-step-num">02</span>
    <div class="doc-step-body">
      <strong>Máximo 3 features en el MVP</strong>
      <p>Si necesitás más de 3 features para explicar el valor del producto, no tenés claro el valor del producto. Recortá hasta que duela.</p>
    </div>
  </div>
  <div class="doc-step">
    <span class="doc-step-num">03</span>
    <div class="doc-step-body">
      <strong>Definí el NO antes del SÍ</strong>
      <p>El apartado más importante del PRD es qué queda fuera. Escribílo antes de definir lo que entra.</p>
    </div>
  </div>
</div>

<h2 id="template">Template</h2>

```
# PRD: [Nombre del producto]
Versión 1.0 · [Fecha]

## El problema
[1-2 frases. Quién lo tiene y con qué frecuencia.]

## El usuario
[Descripción específica. Edad, contexto, dolor concreto.]

## El MVP
Feature 1: [Descripción en una línea]
Feature 2: [Descripción en una línea]
Feature 3: [Descripción en una línea]

## Fuera del MVP
[Lo que no entra]
[Lo que no entra]

## Métrica de éxito (30 días)
[Una sola métrica. Si necesitás más de una, elegí la más importante.]
```
