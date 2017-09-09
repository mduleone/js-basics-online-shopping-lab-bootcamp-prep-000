var cart = [];

function getCart() {
 return cart;
}

function setCart(c) {
  cart = c;
  return cart;
}

function addToCart(item) {
 cart.push({[item]: Math.floor(Math.random() * 100) + 1});
 console.log(`${item} has been added to your cart.`);
 return cart;
}

// My own helper
function getKeysAndPrices(objects) {
  return objects.map(el => {
    return {
      key: Object.keys(el)[0],
      price: el[Object.keys(el)[0]],
    };
  });
}

function prettyPrintPrice(object) {
    return `${object.key} at $${object.price}`;
}

function viewCart() {
  if (cart.length === 0) {
    return console.log('Your shopping cart is empty.');
  }

  const start = 'In your cart, you have';
  const items = getKeysAndPrices(cart);

  switch (cart.length) {
    case 1:
      return console.log(`${start} ${prettyPrintPrice(items[0])}.`);
    case 2:
      return console.log(`${start} ${prettyPrintPrice(items[0])} and ${prettyPrintPrice(items[1])}.`);
    default:
      const first = items.shift();
      let value = `${start} ${prettyPrintPrice(first)}`;
      items.forEach((item, i) => value = i < items.length - 1 ? `${value}, ${prettyPrintPrice(item)}` : `${value}, and ${prettyPrintPrice(item)}.`);
      console.log(value);
      return value;
  }
}

function total() {
  const items = getKeysAndPrices(cart);
  return items.reduce((acc, curr) => acc + curr.price, 0);
}

function removeFromCart(item) {
  const newCart = cart.filter(el => !el.hasOwnProperty(item));

  if (newCart.length === cart.length) {
    console.log('That item is not in your cart.');
  }

  cart = newCart;
  return cart;
}

function placeOrder(cardNumber) {
  if (!cardNumber) {
    return console.log(`Sorry, we don't have a credit card on file for you.`)
  };

  console.log(`Your total cost is $${total()}, which will be charged to the card ${cardNumber}.`);
  cart = [];
}
