let BASE_URL = "http://localhost:8001";


const call_fetch = async (method, url, body) => {
    if (body != undefined) {
        body = JSON.stringify(body);
    }
    const optionFetch = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: body
    }

    return await fetch(BASE_URL + url, optionFetch)
        .then((response) => {
            return response;
        }).catch((error) => {
            throw error;
        });
}


const g_fetch = async (method, url, body) => {
    try {
        const call = await call_fetch(method, url, body);
        const callJson = await call.json();
        if (call.ok) {
            return callJson;
        } else {
            throw callJson
        }
    } catch (error) {
        console.log("g_fetch error : ", error);
        throw error;
    }
}



export {
    g_fetch,
}