import { g_fetch } from "../modules/fetch";

const check_call_be_api = async () => {
    return await g_fetch("GET", "/").catch(e => {
        throw e;
    })
}

export {
    check_call_be_api
}