export const addNode = (node) => ({
    type: 'NODES:ADD', payload: node
});

export const addLink = (link) => ({
    type: 'LINKS:ADD', payload: link
});

export const clearNodes = () => ({
    type: 'NODES:CLEAR'
});

export const clearLinks = () => ({
    type: 'LINKS:CLEAR'
});