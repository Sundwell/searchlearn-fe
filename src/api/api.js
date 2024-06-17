import auth from './services/auth.js'
import tests from './services/tests.js'
import articles from './services/articles.js'

export const api = {
  auth: auth(),
  tests: tests(),
  articles: articles(),
}
