const getUsers = () => {
  return JSON.parse(localStorage.getItem('users') || '[]')
}

export default () => ({
  getAllUsers: () => getUsers(),
  patch: (userId, data) => {
    const users = getUsers()

    const index = users.findIndex(user => user.id === userId)
    const previousUser = users[index]

    users.splice(index, 1, {
      ...previousUser,
      ...data,
    })

    localStorage.setItem('users', JSON.stringify(users))

    return users.find(user => user.id === userId)
  },
  register: (data) => {
    const users = getUsers()

    if (users.find(user => user.email === data.email)) {
      return
    }

    const newUser = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      email: data.email,
      password: data.password,
      admin: !!data.admin,
    }

    localStorage.setItem('user', JSON.stringify(newUser))

    users.push(newUser)

    localStorage.setItem('users', JSON.stringify(users))

    return newUser
  },
  getCurrentUser: () => {
    const cached = JSON.parse(localStorage.getItem('user') || 'null') || null

    if (cached) {
      const users = getUsers()

      return users.find(user => user.id === cached.id)
    }
  },
  login: (email, password) => {
    const users = getUsers()

    const user = users.find(user => user.email === email && user.password === password)

    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    }

    return user
  },
  logout: () => localStorage.removeItem('user'),
})
