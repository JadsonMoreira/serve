import { whatsApp } from '../../integrations/whatsapp/WhatsApp'
import { findProductId } from '../product/findProductId'

const sendMessageWhatsApp = async (order: any) => {
  const listItens = []

  for (const product of order.products) {
    const productField = await findProductId(String(product.id))

    const obItem = {
      item: `${productField.name} - ${productField.title} - (${
        (productField.weight as any).value
      }${(productField.weight as any).type.toLowerCase()})`,
      quantidade: product.quantity,
    }

    listItens.push(obItem)
  }

  function formatarItem(quantity: any, item: any) {
    return `${quantity}x ${item}\n`
  }

  let texto = ''
  texto += `Pedido *n*° ${order.number}\n\n*Itens:*\n`
  listItens.forEach((item) => {
    texto += `➡ ${formatarItem(item.quantidade, item.item)}`
  })

  if (order.delivery) {
    texto += `\n🛵 *Delivery* (taxa de: R$ *${order.totalFreight
      .toFixed(2)
      .replace('.', ',')}*)`
  }

  if (order.paymentForm === 'PIX') {
    texto += `\n💰 *${order.paymentForm}*\n`
  } else {
    texto += `\n💳 *${order.paymentForm}*\n`
  }

  if (order.delivery) {
    texto += `🏠 ${order.address?.publicPlace} - N° ${order.address?.number} - ${order.address?.complement},
       ${order.address?.neighborhood}, ${order.address?.city}`
  } else {
    texto += '🏪 Retirar no estabelecimento'
  }

  texto += `\nTotal: R$ *${order.total.toFixed(2).replace('.', ',')}*\n`

  texto += '\nObrigado pela preferência, se precisar de algo é só chamar! 😉'

  const firstText = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: `+55 ${order.user.phone}`,
    type: 'text',
    text: { body: texto },
  }

  const secundText = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: '+55 (71) 99296-9727',
    type: 'text',
    text: {
      body:
        `Vim avisar que o seu pedido foi realizado com sucesso e está *em análise*!` +
        ' Vou te atualizando sobre o status do pedido por aqui 😄',
    },
  }

  await whatsApp.sendMessage(secundText)
  setTimeout(async () => {
    await whatsApp.sendMessage(firstText)
  }, 4000) // 4000 milissegundos = 4 segundos
}

export { sendMessageWhatsApp }
