export default {
    namespaced: true,
    state: () => {
        list: []
    },
    mutations: {
        writeList(state, list) {
            state.list = list
        }
    },
    actions: {}
}