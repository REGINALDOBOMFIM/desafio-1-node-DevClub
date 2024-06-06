const express = require('express')
const uuid = require('uuid')

const port = 3001
const app = express()
app.use(express.json())

const order = []

const checkOrderId = (request, response, next) => {
    const { id } = request.params

    const index = order.findIndex(newOrder => newOrder.id === id)

    if (index < 0) {
        return response.status(404).jason({ error: "order not found" })
    }

    request.indexOrder = index
    request.orderId = id
    next()
}

app.get('/order', (request, responde) => {
    return responde.json(order)
})

app.post('/order', (request, responde) => {
    const { order, clientName, price } = request.body

    const newOrder = {id: uuid.v4(), order, clientName, price}

    order.push(newOrder)

    return responde.status(201).json(newOrder, {Status: "Em preparação"})

})

app.put('/order/:id,', checkOrderId, (request, responde) => {
    const { order, clientName, price } = request.body
    const index = request.indexOrder
    const id = request.orderId

    const alterOrder = {order, clientName, price}

    order[index] = alterOrder

    return responde.status(201).json(alterOrder, { Status: "Pedido alterado" })

})

app.delete('/order/:id,', checkOrderId, (request, responde) => {
    const index = request.indexOrder
     
    order.splice(index, 1)

    return responde.status(204).json({Status: "Pedido cancelado" })

})



app.listen(port, () => {
    console.log(`🚀 Server is running at http://localhost:${port}`);
})