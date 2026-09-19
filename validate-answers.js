const fs = require('fs');
const vm = require('vm');

function loadJsonFromJs(path, varName) {
  const src = fs.readFileSync(path, 'utf8');
  const ctx = { console, Math, JSON, Date };
  ctx.window = ctx;
  vm.createContext(ctx);
  const wrapped = src + `\nglobalThis.__RESULT = ${varName};`;
  vm.runInContext(wrapped, ctx);
  return ctx.__RESULT;
}

const curriculum = loadJsonFromJs('docs/assets/curriculum.js', 'ACADEMY');
const answers = loadJsonFromJs('docs/assets/answers.js', 'EXERCISE_ANSWERS');

const exIds = [];
curriculum.forEach(m => {
  (m.lessons || []).forEach(l => {
    (l.blocks || []).forEach(b => {
      if (b.t === 'ex' || b.t === 'proj') exIds.push(b.id);
    });
  });
});

const answerKeys = Object.keys(answers);
const missing = exIds.filter(id => !answerKeys.includes(id));
console.log('exercise ids in curriculum:', exIds.length);
console.log(exIds.join(', '));
console.log('answer keys in answers.js:', answerKeys.length);
console.log(answerKeys.join(', '));
console.log('MISSING from answers.js:', missing.length ? missing.join(', ') : 'NONE');
