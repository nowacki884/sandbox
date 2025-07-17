export interface DefaultResponse {
  msg: string
}

export async function get<T>(path: string): Promise<T | unknown> {
  try {
    const res = await fetch(`http://localhost:8000${path}`)
    const resData = (await res.json()) as T
    return resData
  } catch (error) {
    return error
  }
}

export function post(path: string, data: Object) {
  // try {
  //   const res = await fetch(`http://localhost:8000${path}`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   })
  //   const resData = (await res.json()) as T
  //   return resData
  // } catch (error) {
  //   return error
  // }
  return fetch(`http://localhost:8000${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
}
