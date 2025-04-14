const amountDisplay = document.querySelector(".amount-selection-wrapper span")
const cartMenuWrapper = document.querySelector(".cart-menu-wrapper")
const cartMenuBody = document.querySelector(".cart-menu-body")
const cartButton = document.querySelector(".cart-button")
const sideMenuWrapper = document.querySelector(".side-menu-wrapper")
const overlay = document.querySelector(".overlay")
const mainImage = document.querySelector(".main-image")
const thumbnailButtons = document.querySelectorAll(".thumbnail-button")

const cartItems = []
let itemAmount = 0
let itemId = 0
let displayImageId = 1

function createCheckoutButton() {
  const button = document.createElement("button")
  button.classList.add("big-button")
  button.innerText = "Checkout"
  return button
}

function subtractFromAmount() {
  if (itemAmount === 0) return
  itemAmount--
  amountDisplay.innerText = itemAmount
}

function addToAmount() {
  itemAmount++
  amountDisplay.innerText = itemAmount
}

function toggleCart() {
  cartMenuWrapper.classList.toggle("cart-menu-open")
}

function openCart() {
  cartMenuWrapper.classList.add("cart-menu-open")
}

function updateCartButton() {
  cartButton.setAttribute("data-cart-items", cartItems.length)

  if (cartItems.length === 0) {
    cartButton.classList.remove("cart-button-items")
    return
  }

  cartButton.classList.add("cart-button-items")
}

function removeFromCart(itemId) {
  const itemIndex = cartItems.findIndex((v) => v.id === itemId)
  cartItems.splice(itemIndex, 1)

  const cartItem = document.querySelector(`[data-item-id="${itemId}"]`)
  cartMenuBody.removeChild(cartItem)

  if (cartItems.length === 0) {
    const cartMenuFooter = document.querySelector(".cart-menu-footer")
    const checkoutButton = document.querySelector(".cart-menu-footer .big-button")
    cartMenuFooter.removeChild(checkoutButton)

    const noItemHeader = document.createElement("h4")
    noItemHeader.innerText = "Your cart is empty."

    cartMenuBody.appendChild(noItemHeader)
  }

  updateCartButton()
}

function addToCard() {
  if (itemAmount === 0) return

  const itemData = {
    id: itemId,
    itemName: "Fall Limited Edition Sneakers",
    price: "$125.00",
    amount: itemAmount,
    totalPrice: `$${(125 * itemAmount).toFixed(2)}`,
  }

  const cartItem = document.createElement("div")
  cartItem.className = "cart-item-wrapper"
  cartItem.setAttribute("data-item-id", itemData.id)

  const itemImg = document.createElement("img")
  itemImg.classList.add("cart-item-image")
  itemImg.src = "images/image-product-1-thumbnail.jpg"
  itemImg.alt = "product thumbnail"

  const itemDataWrapper = document.createElement("div")
  itemDataWrapper.classList.add("cart-item-data")

  const itemName = document.createElement("p")
  itemName.innerText = itemData.itemName

  const itemPrice = document.createElement("p")
  itemPrice.innerHTML = `${itemData.price} x ${itemData.amount} <span class="bold">${itemData.totalPrice}</span>`

  itemDataWrapper.appendChild(itemName)
  itemDataWrapper.appendChild(itemPrice)

  const itemDeleteWrapper = document.createElement("div")
  itemDeleteWrapper.classList.add("cart-item-delete")

  const deleteButton = document.createElement("button")
  deleteButton.innerHTML =
    '<svg width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use fill="currentColor" fill-rule="nonzero" xlink:href="#a"/></svg>'

  itemDeleteWrapper.appendChild(deleteButton)

  deleteButton.addEventListener("click", () => {
    removeFromCart(itemData.id)
  })

  cartItem.appendChild(itemImg)
  cartItem.appendChild(itemDataWrapper)
  cartItem.appendChild(itemDeleteWrapper)

  cartMenuBody.appendChild(cartItem)

  if (cartItems.length === 0) {
    const emptyCartText = document.querySelector(".cart-menu-body h4")
    cartMenuBody.removeChild(emptyCartText)

    const checkoutButton = createCheckoutButton()
    const cartFooter = document.querySelector(".cart-menu-footer")
    if (cartFooter) {
      cartFooter.appendChild(checkoutButton)
    } else {
      const newCartFooter = document.createElement("div")
      newCartFooter.classList.add("cart-menu-footer")
      newCartFooter.appendChild(checkoutButton)
      cartMenuWrapper.appendChild(newCartFooter)
    }
  }

  cartItems.push(itemData)

  itemAmount = 0

  amountDisplay.innerText = itemAmount
  updateCartButton()
  openCart()

  itemId++
}

function openSideMenu() {
  sideMenuWrapper.classList.add("open")
  overlay.classList.remove("hidden")
  overlay.classList.add("open")
}

function closeSideMenu() {
  sideMenuWrapper.classList.remove("open")
  overlay.classList.remove("open")
  setTimeout(() => {
    overlay.classList.add("hidden")
  }, 200)
}

thumbnailButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonId = button.getAttribute("data-image-id")
    mainImage.src = `images/image-product-${buttonId}.jpg`

    const currentActiveThumbnail = document.querySelector(".thumbnail-active")
    currentActiveThumbnail.classList.remove("thumbnail-active")
    button.classList.add("thumbnail-active")

    displayImageId = parseInt(buttonId)
  })
})

function nextImage() {
  if (displayImageId === 4) return
  displayImageId++
  mainImage.src = `images/image-product-${displayImageId}.jpg`
}

function prevImage() {
  if (displayImageId === 1) return
  displayImageId--
  mainImage.src = `images/image-product-${displayImageId}.jpg`
}
