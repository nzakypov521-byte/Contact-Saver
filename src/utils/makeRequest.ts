const makeRequest = async <R, D = unknown>(
    url: string,
    method: 'PUT' | 'POST' | 'DELETE' | 'PATCH' | 'GET',
    dataToSend?: D
): Promise<R> => {
    const response = await fetch(url, {
        method: method,
        body: dataToSend ? JSON.stringify(dataToSend) : undefined,
    })

    if (!response.ok) throw new Error(`Ошибка HTTP ${response.status}`)

    return await response.json()
}

export default makeRequest;