import React from 'react';

class Footer extends React.Component {
    render() {

        const { addTask, registerTasks, changeValue, searchValue } = this.props;

        return (
            <footer className="bg-gray-200 p-4 flex justify-between items-center">
                <input
                    type="text"
                    value={searchValue}
                    onChange={changeValue}
                    placeholder="Rechercher..."
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400"
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={addTask}>Ajouter
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={registerTasks}>Enregistrer les tâches
                </button>

            </footer>

        );
    }
}

export default Footer;