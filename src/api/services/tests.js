const getAll = () => {
  return JSON.parse(localStorage.getItem('tests') || '[]')
}

const getOne = (id) => {
  const tests = getAll()

  return tests.find(test => test.id === id)
}

const update = (test) => {
  const tests = getAll()

  const index = tests.findIndex(t => t.id === test.id)

  tests.splice(index, 1, test)

  localStorage.setItem('tests', JSON.stringify(tests))
}

const create = (test) => {
  const tests = getAll()

  test.id = crypto.randomUUID()

  tests.push(test)

  localStorage.setItem('tests', JSON.stringify(tests))
}

export default () => ({
  getAll: () => getAll(),
  getOne: id => getOne(id),
  update: test => update(test),
  create: test => create(test),
})
