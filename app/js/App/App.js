import React from 'react';
import PropTypes from 'prop-types';

import ForceGraph2D from 'react-force-graph-2d';

const App = (props) => {
    const {
        error, nodes, links, packageName, isSubmitDisabled,
        handleSubmit, handlePackageNameChange
    } = props;
    let graph = null;

    if (nodes.length) {
        graph = (
            <ForceGraph2D
                width={1000}
                height={700}
                graphData={{ nodes, links }}
                backgroundColor="rgba(33, 150, 243, .1)"
            />
        );
    }

    return (
        <>
            <form noValidate>
                <div>
                    <input
                        autoFocus
                        type="text"
                        value={packageName}
                        placeholder="NPM package"
                        onChange={handlePackageNameChange}
                    />
                    {error && <p className="error">{`*${error}`}</p>}
                </div>
                <button type="submit" onClick={handleSubmit} disabled={isSubmitDisabled}>
                    {'Get graph'}
                </button>
            </form>
            {graph}
        </>
    );
};

App.propTypes = {
    error: PropTypes.string,
    packageName: PropTypes.string,
    isSubmitDisabled: PropTypes.bool,
    nodes: PropTypes.array.isRequired,
    links: PropTypes.array.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handlePackageNameChange: PropTypes.func.isRequired
};

App.defaultProps = {
    error: '',
    packageName: '',
    isSubmitDisabled: true,
    handleSubmit() {},
    handlePackageNameChange() {}
};

export default App;

