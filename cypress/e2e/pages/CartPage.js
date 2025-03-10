class CartPage { 
     getCartItemCount() {    
        return cy.get('cart-item-count'); // adjust the selector based on the actual cart item count element  
     }
}
export default CartPage;