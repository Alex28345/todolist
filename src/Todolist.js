import React from 'react';

class TodoApp extends React.Component {
    constructor(props) {
        super(props)
        let todoList;
        if(window.confirm('Voulez-vous charger les tâches sauvegardées ?')) {
            todoList = localStorage.getItem('todoList') !== "" ? JSON.parse(localStorage.getItem('todoList')) : [];
        } else {
            todoList = [];
        }
        this.state = {
            items: todoList,
            searchValue: ''
        }
    }


    toggleTask(index) {
        const updatedItems = [...this.state.items];
        updatedItems[index].isChecked = !updatedItems[index].isChecked;
        this.setState({ items: updatedItems });
    }

    deleteTask(index) {
        if(window.confirm('Voulez-vous vraiment supprimer cette tâche ?')){
            const updatedItems = [...this.state.items];
            updatedItems.splice(index, 1);
            this.setState({ items: updatedItems });
        }
    }

    taskUp(index) {
        if(index > 0){
            const updatedItems = [...this.state.items];
            let modifiedItem = updatedItems[index-1];
            updatedItems[index-1] = updatedItems[index];
            updatedItems[index] = modifiedItem;
            this.setState({ items: updatedItems });
        }
    }

    taskDown(index) {
        if(index < this.state.items.length-1){
            const updatedItems = [...this.state.items];
            let modifiedItem = updatedItems[index+1];
            updatedItems[index+1] = updatedItems[index];
            updatedItems[index] = modifiedItem;
            this.setState({ items: updatedItems });
        }
    }

    addTask() {
        let newTaskTitle = window.prompt('Entrez le titre de la nouvelle tâche :');
        if(newTaskTitle !== null && newTaskTitle !== ''){
            this.setState(prevState => ({
                items: [
                    {Title: newTaskTitle, isChecked:false},
                    ...prevState.items,
                ],
            }));
        }
    }

    registerTasks() {
        localStorage.setItem('todoList', JSON.stringify(this.state.items));
    }


    render() {
        const nbTotal = this.state.items.length
        const nbChecked = this.state.items.filter((item) => {/*console.log("Loop",i,j);*/ return !!item.isChecked}).length
        const progress = nbTotal > 0 ? (nbChecked / nbTotal) * 100 : 0;
        return (
            <div>
                <header>
                    <h1>TODOLIST</h1>
                    <p style={{opacity: this.state.searchValue.length >= 3 ? 0.5 : 1}}>Il y a <b>{nbChecked}</b> taches cochées sur <b>{nbTotal}</b> au total.</p>
                    <progress value={progress} max="100" style={{opacity: this.state.searchValue.length >= 3 ? 0.5 : 1}}></progress>
                </header>
                <h2>Recherche:</h2>
                <input  type="text"
                        value={this.state.searchValue}
                        onChange={e => this.setState({searchValue: e.target.value})}
                        placeholder="Rechercher..."
                />
                <h2>Les tâches:</h2>
                <ol>
                    {this.state.items && this.state.items
                        .filter(item => this.state.searchValue.length >= 3 ? item.Title.toLowerCase().includes(this.state.searchValue.toLowerCase()) : true)
                        .map((item, index) => (
                            <li key={item.id}>
                                <input type="checkbox" onClick={() => this.toggleTask(index)} checked={item.isChecked} />
                                <span className={item.isChecked ? "isChecked" : ""} onClick={() => {if (!item.isChecked) {this.toggleTask(index);}}} >{item.Title} </span>
                                <button onClick={() => this.deleteTask(index)} >Supprimer</button>
                                <button onClick={() => this.taskUp(index)} >↑</button>
                                <button onClick={() => this.taskDown(index)} >↓</button>
                            </li>
                        ))}
                </ol>
                <footer>
                    <button onClick={() => {this.addTask()}}>ajouter</button>
                    <button onClick={() => {this.registerTasks()}}>Enregistrer les taches</button>
                </footer>
            </div>
        )
    }
}

export default TodoApp;
