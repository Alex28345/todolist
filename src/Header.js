import React from 'react';

class Header extends React.Component {
    render() {
        const { nbTotal, nbChecked, progress, searchValue } = this.props;


        return (
            <header className="bg-gray-200 p-4">
                <h1 className="text-3xl font-bold">TODOLIST</h1>
                <p className={searchValue.length >= 3 ? "opacity-50" : ""}>Il y a <b>{nbChecked}</b> tâches cochées
                    sur <b>{nbTotal}</b> au total.</p>
                <progress value={progress} max="100" className={searchValue.length >= 3 ? "opacity-50" : ""}></progress>
            </header>

        );
    }
}

export default Header;