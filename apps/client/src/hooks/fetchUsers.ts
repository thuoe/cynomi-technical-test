const fetchUsers = async <T,>() => {
    try {
      const res = await fetch('/api/users', { method: "GET" });
      const json = await res.json() as T;
      return { data: json, error: null };
    } catch (error) {
      return { data: null, error: error };
    }
  }
  
  export default fetchUsers