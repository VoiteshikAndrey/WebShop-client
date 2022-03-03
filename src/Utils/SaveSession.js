export const SaveSession = (cart, auth) => {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('auth', JSON.stringify(auth));
    return;
}