const getAll = () => {
  return JSON.parse(localStorage.getItem('articles') || '[]')
}

const getOne = (id) => {
  const articles = getAll()

  return articles.find(article => article.id === id)
}

const update = (article) => {
  const articles = getAll()

  const index = articles.findIndex(a => a.id === article.id)

  articles.splice(index, 1, article)

  localStorage.setItem('articles', JSON.stringify(articles))
}

const create = (article) => {
  const articles = getAll()

  article.id = crypto.randomUUID()

  articles.push(article)

  localStorage.setItem('articles', JSON.stringify(articles))
}

export default () => ({
  getAll: () => getAll(),
  getOne: id => getOne(id),
  update: article => update(article),
  create: article => create(article),
})
