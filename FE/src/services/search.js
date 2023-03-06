import { g_fetch } from "../modules/fetch";

const search_api = async (data) => {
    return await g_fetch("POST", "/search", data).catch(e => {
        throw e;
    })
}

export {
    search_api
}