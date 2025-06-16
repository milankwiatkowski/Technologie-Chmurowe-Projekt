export const getPosts = async (token) => {
  const response = await fetch("http://backend:5000/admin", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error("Nie udało się pobrać postów");
  }

  return await response.json();
};

export const createPost = async (post, token) => {
  const response = await fetch("http://backend:5000/admin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(post)
  });

  if (!response.ok) {
    throw new Error("Nie udało się dodać posta");
  }

  return await response.text(); // bo Twój backend zwraca tekst
};
