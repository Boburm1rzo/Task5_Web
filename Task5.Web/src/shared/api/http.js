export async function httpGetJson(url) {
  const res = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    let details = "";
    try {
      details = await res.text();
    } catch {
      // ignore
    }
    throw new Error(`HTTP ${res.status}: ${details || res.statusText}`);
  }

  return res.json();
}
