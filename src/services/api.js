export async function getCategories() {
  const urlCateg = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const result = await urlCateg.json();
  return result;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const urlCategID = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}_ID&q=${query}`);
  const result = await urlCategID.json();
  return result;
}

export async function getProductById(id) {
  const urlProdID = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const result = await urlProdID.json();
  return result;
}
