const getUsers = () => {
  return JSON.parse(localStorage.getItem('users') || '[]')
}

export default () => ({
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
    }

    localStorage.setItem('user', JSON.stringify(newUser))

    users.push(newUser)

    localStorage.setItem('users', JSON.stringify(users))

    return newUser
  },
  getCurrentUser: () => JSON.parse(localStorage.getItem('user') || 'null') || null,
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
