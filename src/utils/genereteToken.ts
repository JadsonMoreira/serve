const genereteToken = () => {
  let token = ''
  for (let i = 0; i < 5; i++) {
    const numeroAleatorio = Math.floor(Math.random() * 10) // Gera um número inteiro entre 0 e 9
    token += numeroAleatorio.toString() // Adiciona o número ao token como uma string
  }
  return token
}

export { genereteToken }
