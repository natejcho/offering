import { useEffect } from 'react'
import { useShoppingCart } from 'use-shopping-cart'

// TODO: delete, all we need is to clear the cart
export default function ClearCart() {
  const { clearCart } = useShoppingCart()

  useEffect(() => clearCart(), [clearCart])

  return <p>Cart cleared.</p>
}
