import { api } from '../api.js'

const getAll = (filters) => {
  let tests = JSON.parse(localStorage.getItem('tests') || '[]')

  if (filters?.userId) {
    tests = tests.filter(test => test.userId === filters.userId)
  }

  return tests
}

const getOne = (id) => {
  const tests = getAll()

  return tests.find(test => test.id === id)
}

const update = (testId, test) => {
  const tests = getAll()

  const index = tests.findIndex(t => t.id === testId)
  const previousTest = tests[index]

  tests.splice(index, 1, {
    ...previousTest,
    ...test,
  })

  localStorage.setItem('tests', JSON.stringify(tests))
}

const create = (test, userId) => {
  const tests = getAll()

  test.id = crypto.randomUUID()
  test.userId = userId
  test.tags = test.tags.map(tag => tag.toLowerCase())

  tests.push(test)

  localStorage.setItem('tests', JSON.stringify(tests))
}

export default () => ({
  getAll: filters => getAll(filters),
  getOne: id => getOne(id),
  getOneForEdit: id => getOne(id),
  update: (testId, test) => update(testId, test),
  create: (test, userId) => create(test, userId),
  passTest: (testId, answers) => {
    const tests = getAll()

    const test = tests.find(t => t.id === testId)

    const correctAnsweredQuestions = test.questions.filter((question) => {
      return question.correctAnswer === answers[question.id]
    })

    const notCorrectAnsweredQuestions = test.questions.filter((question) => {
      return question.correctAnswer !== answers[question.id]
    })

    const suggestionTagsRaw = notCorrectAnsweredQuestions.map(question => question.tags)

    const suggestionTags = Array.from(new Set(suggestionTagsRaw.flat())).map(tag => tag.toLowerCase())

    const suggestions = api.articles.getAll({
      tags: suggestionTags,
    })

    return {
      correctCount: correctAnsweredQuestions.length,
      suggestions,
    }
  },
})
