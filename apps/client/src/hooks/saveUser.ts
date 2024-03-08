const saveUser = async <T,>(body: object) => {
  try {
    const res = await fetch('/api/user', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const json = await res.json() as T;
    return { response: json, error: null };
  } catch (error) {
    return { response: null, error: error };
  }
}

export default saveUser