import {State} from './state';
import {StateList} from './state-list';

export class StateStack {

    private states: StateList;

    constructor() {
        this.states = new StateList()
    }

    public update() {
        let state = this.states.top();
        if (state) {
            state.update();
        }
    }

    public render() {
        let state = this.states.top();
        if (state) {
            state.render();
        }
    }

    public push(state: State) {
        this.states.push(state);
        state.onEnter();
    }

    public pop() {
        let state = this.states.top();
        state.onExit();
        return this.states.pop();
    }

    public pause() {
        let state = this.states.top();
        if (state.onPause) {
            state.onPause();
        }
    }

    public resume() {
        var state = this.states.top();
        if (state.onResume) {
            state.onResume();
        }
    }
}