export default {
    namespaced: true,
    state: () => {
        chapter_list: []
    },
    mutations: {
        writeChapter(state, list) {
            state.chapter_list = list
        }
    },
    actions: {}
}