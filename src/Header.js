import React from 'react';

class Header extends React.Component {
    render() {
        const { nbTotal, nbChecked, progress, searchValue } = this.props;


        return (
            <header>
                <h1>TODOLIST</h1>
                <p style={{opacity: searchValue.length >= 3 ? 0.5 : 1}}>Il y a <b>{nbChecked}</b> taches cochées sur <b>{nbTotal}</b> au total.</p>
                <progress value={progress} max="100" style={{opacity: searchValue.length >= 3 ? 0.5 : 1}}></progress>
            </header>
        );
    }
}

export default Header;