const httpClient = require("../lib/httpClient");
const OrderController = {};

OrderController.index = () => {
  return httpClient.get("/charges");
};

OrderController.createToken = payload => {
  return httpClient.post("/tokens", payload);
};

/*
OrderController.index = () => {
  return Order.index(function(data) {
    return data;
  });
};

 OrderController.create = payload => {
  return Order.create(payload, function(data) {
    return data;
  });
};

OrderController.show = id => {
  return Order.show(id);
};

OrderController.update = (id, payload) => {
  return Order.update(id, payload, function(data) {
    return data;
  });
};

// Order destroy
OrderController.delete = id => {
  return Order.delete(id);
};
 */
module.exports = OrderController;
