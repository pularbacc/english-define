<script setup>
import { ref } from 'vue';
import { search_api } from '../services/search';

const keyword = ref("");

const search = async () => {
    define.value = {};
    sentences.value = [];
    images.value = [];
    try {
        search_api({
            keyword: keyword.value
        }).then(res => {
            const data = res["data"];
            if (data.define) {
                define.value = data.define;
            }
            if (data.sentences) {
                sentences.value = data.sentences;
            }
            if (data.images) {
                images.value = data.images;
            }
        })
    } catch (error) {

    }
}
const define = ref({});
const images = ref([]);
const sentences = ref([]);

</script>

<template>
    <div class="page-container">
        <div class="search-container">
            <input
                type="text"
                v-on:keyup.enter.exact="search()"
                v-model="keyword"
                class="search-inp"
            />
        </div>

        <div class="result-container">
            <div class="result-content-container result-define">
                <div v-if="define.phonetics">
                    <div v-for="phonetic of define.phonetics">
                        <audio controls>
                            <source :src="phonetic" />
                        </audio>
                    </div>
                </div>
                <div v-if="define.meanings">
                    <div v-for="meaning of define.meanings">
                        <div class="labelDefine">{{ meaning.partOfSpeech }}</div>
                        <div v-for="definition of meaning.definitions" class="define">
                            -
                            <span>{{ definition }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="result-content-container result-img">
                <div v-for="image of images" class="img-div">
                    <img :src="image" class="img-search" />
                </div>
            </div>
            <div class="result-content-container result-sentences">
                <div v-for="sentence of sentences" class="sentences">
                    -
                    <span v-html="sentence"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.page-container {
    background: #181818;
    position: absolute;
    height: 100vh;
    width: 100%;
}
.search-inp {
    width: 36%;
    height: 44px;
    font-size: 20px;
    padding: 0px 12px;
    border-radius: 8px;
    border: 1px solid #3a3e41;
    background: #121212;
    color: #cdcbc9;
}

.btn-search {
    height: 38px;
    margin-left: 6px;
}

.search-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 120px;
    position: absolute;
    width: 100%;
    background: #202020;
    border-bottom: 1px solid #3a3e41;
}
.result-container {
    position: absolute;
    bottom: 0px;
    height: calc(100% - 140px);
    width: calc(100% - 24px);
    left: 12px;
}
.type-result-container {
    margin-bottom: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid black;
}

.btn-type {
    margin-right: 6px;
    border: none;
    outline: none;
    background: white;
    font-size: 18px;
}

.btn-type:hover {
    cursor: pointer;
}

.btn-type-active {
    color: #1a73e8;
}

.img-div {
    clear: both;
    display: inline-block;
    width: 33%;
}

.img-search {
    width: 100%;
}

.result-content-container {
    padding: 12px;
    border-radius: 12px;
    background: #1c1c1c;
    width: 32.5%;
    height: calc(100% - 12px);
    overflow-y: auto;
    overflow-x: hidden;
    color: #cdcbc9;
    border: 1px solid #3a3e41;
}

.result-img {
    position: absolute;
    display: flex;
    flex-flow: wrap-reverse;
}

.result-define {
    position: absolute;
    left: 33.7%;
}

.result-sentences {
    position: absolute;
    right: 0px;
    top: 0px;
}

.labelDefine {
    font-weight: 500px;
    font-weight: 500;
    color: #2f8de1;
    line-height: 24px;
    margin-top: 12px;
}

.define {
    line-height: 22px;
    margin-top: 4px;
}

.sentences {
    line-height: 22px;
    margin-top: 4px;
}
</style>