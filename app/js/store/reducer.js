import { combineReducers } from 'redux';

const defaultNodes = [];
const defaultLinks = [];

const nodes = (state = defaultNodes, action) => {
    switch (action.type) {
        case 'NODES:ADD': {
            return [...state, action.payload];
        }

        case 'NODES:CLEAR': {
            return defaultNodes;
        }

        default:
            return state;
    }
};

const links = (state = defaultLinks, action) => {
    switch (action.type) {
        case 'LINKS:ADD': {
            return [...state, action.payload];
        }

        case 'LINKS:CLEAR': {
            return defaultNodes;
        }

        default:
            return state;
    }
};

export default combineReducers({
    nodes,
    links
});