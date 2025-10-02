const API_BASE = "http://localhost:8080/api";

export async function login(username, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  return res.json();
}

export async function getTopics(token) {
  const res = await fetch(`${API_BASE}/quiz/topics`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  return res.json();
}

export async function getRandomQuestions(token, topic, difficulty, count = 10) {
  const params = new URLSearchParams({ topic, count: count.toString() });
  if (difficulty) params.append('difficulty', difficulty);
  
  const res = await fetch(`${API_BASE}/quiz/random?${params}`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  return res.json();
}