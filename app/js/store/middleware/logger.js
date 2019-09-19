const logger = store => next => action => {
    if (action.type) {
        let result;

        console.groupCollapsed('dispatching', action.type);
        console.log('action', action);
        console.log('prev state', store.getState());
        result = next(action);
        console.log('next state', store.getState());
        console.groupEnd();

        return result;
    }

    return next(action);
};

export default logger;