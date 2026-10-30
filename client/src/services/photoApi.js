
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

// Common function to handle API responses
async function handleResponse(response) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

// 1. Fetch all certificates or filter by category
export async function getPhotos(category = "") {
  const query = category
    ? `?category=${encodeURIComponent(category)}`
    : "";

  const response = await fetch(
    `${API_BASE_URL}/api/photos${query}`
  );

  return handleResponse(response);
}

// 2. Upload a new certificate
export async function uploadPhoto({ name, rollNumber, category, file }) {
  const formData = new FormData();

  formData.append("name", name);
  formData.append("rollNumber", rollNumber);
  formData.append("category", category);
  formData.append("certificate", file);

  const response = await fetch(`${API_BASE_URL}/api/photos`, {
    method: "POST",
    body: formData,
  });

  return handleResponse(response);
}

// 3. Delete a certificate using its ID and password
export async function deletePhoto(id, password) {
  const response = await fetch(
    `${API_BASE_URL}/api/photos/${encodeURIComponent(id)}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    }
  );

  return handleResponse(response);
}
