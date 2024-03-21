import React from 'react';

class Footer extends React.Component {
    render() {

        const { addTask, registerTasks } = this.props;

        return (
            <footer>
                <button onClick={addTask}>Ajouter</button>
                <button onClick={registerTasks}>Enregistrer les taches</button>
            </footer>
        );
    }
}

export default Footer;