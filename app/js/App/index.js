import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';
import * as actions from './actions';
import { connect } from 'react-redux';

import App from './App';

class AppContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error: '',
            packageName: '',
            isSubmitDisabled: true
        };
    }

    handlePackageNameChange = (event) => {
        const packageName = event.target.value;

        this.setState({
            error: '',
            packageName,
            isSubmitDisabled: !packageName
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        let weight = 15;
        let defaultWeight = 5;
        const { packageName } = this.state;
        const { dispatch } = this.props;

        dispatch(actions.clearNodes());
        dispatch(actions.clearLinks());

        const getPackageDependencies = (name) => {
            return axios.get(`https://registry.npmjs.cf/${name}`)
                .then(response => {
                    const { nodes } = this.props;

                    if (!response.data['dist-tags'] || !response.data.versions) {
                        this.setState({ error: 'There is no proper package info to show graph' });

                        return;
                    }

                    let version = response.data['dist-tags'].latest;
                    let { dependencies } = response.data.versions[version];

                    if (!nodes.find(node => node.id === name)) {
                        dispatch(actions.addNode({ id: name, name: `${name} ${version}`, val: weight }));
                    }

                    if (dependencies) {
                        weight = weight < defaultWeight ? defaultWeight : weight - 2;

                        const promises = Object.keys(dependencies).map(dependency => {
                            return getPackageDependencies(dependency);
                        });

                        axios.all(promises).then(() => {
                            Object.keys(dependencies).forEach(dependency => {
                                dispatch(actions.addLink({ target: name, source: dependency }));
                            });
                        });
                    }
                })
                .catch(error => this.setState({ error: error.response.statusText }));
        };

        return getPackageDependencies(packageName);
    };

    render() {
        const { nodes, links } = this.props;
        const { packageName, isSubmitDisabled, error } = this.state;

        return (
            <App
                error={error}
                nodes={nodes}
                links={links}
                packageName={packageName}
                isSubmitDisabled={isSubmitDisabled}
                handleSubmit={this.handleSubmit}
                handlePackageNameChange={this.handlePackageNameChange}
            />
        );
    }
}

AppContainer.propTypes = {
    nodes: PropTypes.array.isRequired,
    links: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default connect(state => ({
    nodes: state.nodes,
    links: state.links
}))(AppContainer);
