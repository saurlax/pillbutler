export async function httpGet<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`GET ${url} failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function httpPost<TResponse, TBody>(
  url: string,
  body: TBody
): Promise<TResponse> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`POST ${url} failed: ${response.status}`);
  }

  return (await response.json()) as TResponse;
}

export async function httpPut<TResponse, TBody>(
  url: string,
  body: TBody
): Promise<TResponse> {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`PUT ${url} failed: ${response.status}`);
  }

  return (await response.json()) as TResponse;
}
