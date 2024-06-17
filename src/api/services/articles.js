const getAll = (filters) => {
  let articles = JSON.parse(localStorage.getItem('articles') || '[]')

  if (filters?.tags) {
    articles = articles.filter(article => article.tags.some(tag => filters.tags.includes(tag)))
  }

  return articles
}

const getOne = (id) => {
  const articles = getAll()

  return articles.find(article => article.id === id)
}

const update = (articleId, article) => {
  const articles = getAll()

  const index = articles.findIndex(a => a.id === articleId)

  const previousArticle = articles[index]

  articles.splice(index, 1, {
    ...previousArticle,
    ...article,
  })

  localStorage.setItem('articles', JSON.stringify(articles))
}

const create = (article) => {
  const articles = getAll()

  article.id = crypto.randomUUID()
  article.tags = article.tags.map(tag => tag.toLowerCase())

  articles.push(article)

  localStorage.setItem('articles', JSON.stringify(articles))
}

export default () => ({
  getAll: (filters) => {
    return getAll(filters)
  },
  getOne: id => getOne(id),
  update: (articleId, article) => update(articleId, article),
  create: article => create(article),
})
