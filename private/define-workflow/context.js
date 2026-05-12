export default class Ctx {
    #ctx;
    constructor (value) {
        this.#ctx = value;
    }

    get () {
        return this.#ctx;
    }

    set (newValue) {
        this.#ctx = newValue;
        return this.#ctx;
    }
}


function createCtx(state, config, actions, effects) {
  return {
    state,
    config,
    actions,
    effects,
    emit,
    transition,
    reset
  };
}