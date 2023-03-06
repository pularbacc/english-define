const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const crawl_define = async (keyword) => {
    try {
        const url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + keyword;
        return await axios.get(url).then(res => {
            const data = res["data"][0];
            const phonetics = [];
            for (const phonetic of data.phonetics) {
                if (phonetic) {
                    if (phonetic.audio) {
                        phonetics.push(phonetic.audio);
                    }
                }
            }
            const meanings = [];
            for (const meaning of data.meanings) {
                const definitions = [];
                for (const definition of meaning.definitions) {
                    definitions.push(definition.definition);
                }
                meanings.push({
                    partOfSpeech: meaning.partOfSpeech,
                    definitions: definitions
                })
            }
            return {
                phonetics: phonetics,
                meanings: meanings
            }
        })
    } catch (error) {
        console.log("err define ", error);
    }

}

const crawl_sentences = async (keyword) => {
    try {
        return await axios
            .get('https://sentencestack.com/q/' + keyword)
            .then(async res => {
                const dom = new JSDOM(res.data);
                const contents = dom.window.document.querySelectorAll(".sent-txt");
                const data = [];
                for (const content of contents) {
                    data.push(content.innerHTML);
                }
                return data;
            })
            .catch(error => {
                console.error(error);
            });
    } catch (error) {
        console.log("error sentences ", error);
    }

}

const crawl_images = async (keyword) => {
    try {
        const url = "https://images.search.yahoo.com/search/images?p=" + keyword;
        return await axios
            .get(url)
            .then(async res => {
                const dom = new JSDOM(res.data);
                const result = dom.window.document.getElementById("results");
                const imgs = result.getElementsByTagName("img");
                const data = [];
                for (const img of imgs) {
                    if (img.src) {
                        data.push(img.src);
                    }
                }
                return data;
            })
            .catch(error => {
                console.error(error);
            });
    } catch (error) {
        console.log("err images ", error);
    }

}

const crawl_pages = async (keyword) => {
    return await Promise.all([crawl_define(keyword), crawl_sentences(keyword), crawl_images(keyword)]).then(values => {
        return {
            define: values[0],
            sentences: values[1],
            images: values[2]
        }
    }).catch(e => {
        console.log(e);
    })

}

const POST = async ({
    req,
    res
}) => {
    const keyword = req.data.keyword;

    const resData = await crawl_pages(keyword);

    res.json(resData);
}

module.exports = {
    POST: POST
}