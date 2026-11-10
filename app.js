
'use strict';

// ==========================================
// CONFIGURACIÓN DE LA API
// ==========================================

const API_URL =
  'https://evaluaciones-proyectos-uvg-api.eomarroquin.workers.dev/api/consulta';

const $ = id => document.getElementById(id);

const numberText = n =>
  Number.isInteger(n)
    ? String(n)
    : n.toFixed(2).replace(/0+$/, '').replace(/\.$/, '');

// ==========================================
// VALIDACIÓN DE EVALUACIONES
// ==========================================

const validEvaluation = record =>
  record &&
  Array.isArray(record.criteria) &&
  record.criteria.length > 0 &&
  record.criteria.every(c =>
    Number.isFinite(c.max) &&
    c.max > 0 &&
    Number.isFinite(c.score) &&
    c.score >= 0 &&
    c.score <= c.max
  );

// ==========================================
// MOSTRAR RESULTADOS
// ==========================================

function showEvaluation(match) {
  const total = match.criteria.reduce(
    (sum, c) => sum + c.score, 0
  );

  const maximum = match.criteria.reduce(
    (sum, c) => sum + c.max, 0
  );

  $('total-score').textContent = numberText(total);

  $('total-maximum').textContent =
    `de ${numberText(maximum)} puntos`;

  $('result-meta').textContent =
    `${match.course} · ${match.period} · Sección ${match.section} · Grupo ${match.group}`;

  $('rubric-name').textContent =
    `${match.evaluation} · ${match.rubric}`;

  $('general-feedback').textContent =
    match.feedback || 'Sin comentarios generales.';

  const rubric = $('rubric');
  rubric.replaceChildren();

  for (const c of match.criteria) {
    const article = document.createElement('article');
    article.className = 'criterion';

    const head = document.createElement('div');
    head.className = 'criterion-head';

    const name = document.createElement('strong');
    name.textContent = c.name;

    const score = document.createElement('span');
    score.textContent =
      `${numberText(c.score)} / ${numberText(c.max)}`;

    head.append(name, score);

    const track = document.createElement('div');
    track.className = 'track';

    track.setAttribute('role', 'progressbar');
    track.setAttribute('aria-label', c.name);
    track.setAttribute('aria-valuemin', '0');
    track.setAttribute('aria-valuemax', String(c.max));
    track.setAttribute('aria-valuenow', String(c.score));

    const fill = document.createElement('div');
    fill.className = 'fill';

    fill.style.width = `${100 * c.score / c.max}%`;

    track.append(fill);

    const comment = document.createElement('p');
    comment.textContent =
      c.comment || 'Sin observaciones específicas.';

    article.append(head, track, comment);
    rubric.append(article);
  }

  $('access-panel').hidden = true;
  $('results').hidden = false;

  $('results').scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}

// ==========================================
// CONSULTAR EVALUACIÓN EN CLOUDFLARE
// ==========================================

$('access-form').addEventListener('submit', async event => {
  event.preventDefault();

  const section = $('section').value.trim();
  const group = $('group').value.trim();
  const code = $('code').value.trim().toUpperCase();

  const error = $('form-error');
  const submitButton =
    $('access-form').querySelector('[type="submit"]');

  error.hidden = true;

  if (submitButton) {
    submitButton.disabled = true;
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        section,
        group,
        code
      })
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error(
          'Demasiados intentos. Espera 15 minutos antes de volver a intentarlo.'
        );
      }

      if (response.status === 401) {
        throw new Error(
          'No se encontró una evaluación disponible con esos datos. Verifica la sección, el grupo y el código de acceso.'
        );
      }

      throw new Error(
        'No fue posible realizar la consulta. Intenta nuevamente.'
      );
    }

    if (!validEvaluation(data)) {
      throw new Error(
        'La evaluación recibida tiene un formato incorrecto.'
      );
    }

    showEvaluation(data);

  } catch (err) {
    error.textContent =
      err.message || 'Ocurrió un error inesperado.';

    error.hidden = false;

  } finally {
    if (submitButton) {
      submitButton.disabled = false;
    }
  }
});

// ==========================================
// REGRESAR AL FORMULARIO
// ==========================================

$('back-button').addEventListener('click', () => {
  $('results').hidden = true;
  $('access-panel').hidden = false;
  $('code').value = '';

  $('access-panel').scrollIntoView({
    behavior: 'smooth'
  });
});
