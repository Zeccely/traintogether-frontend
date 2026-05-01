export async function getProducts() {
  const response = await fetch("http://localhost:8080/");

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}
