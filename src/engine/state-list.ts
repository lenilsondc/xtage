import {State} from './state';

export class StateList {
    
    private states: State[] = [];

    public pop() {
        return this.states.pop();
    }

    public push(state) {
        this.states.push(state);
    }

    public top() {
        return this.states[this.states.length - 1];
    }
}