import React from 'react';

class TodoApp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValue: '',
            items: [
                { text: "Learn JavaScript", done: false },
                { text: "Learn React", done: false },
                { text: "Play around in JSFiddle", done: true },
            ]
        }
    }

    toggleTask(index) {
        const updatedItems = [...this.state.items];
        updatedItems[index].done = !updatedItems[index].done;
        this.setState({ items: updatedItems });
    }

    deleteTask(index) {
        if(window.confirm){
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
        this.setState({inputValue : ''});
    }

    taskDown(index) {
        console.log(index)
        console.log(this.state.items.length-1)
        if(index < this.state.items.length-1){
            const updatedItems = [...this.state.items];
            let modifiedItem = updatedItems[index+1];
            updatedItems[index+1] = updatedItems[index];
            updatedItems[index] = modifiedItem;
            this.setState({ items: updatedItems });
        }
        this.setState({inputValue : ''});
    }

    addTask() {
        if(this.state.inputValue !== ''){
            this.setState({items:[
                    {text: this.state.inputValue, done:false},...this.state.items,
                ]})
        }
        this.setState({inputValue : ''});
    }

    handleKeyDown(event) {
        if (event.key === 'Enter') {
            this.addTask();
        }
    }

    header() {
        return (
            <header className="App-header">
                <h1>TODOLIST</h1>
            </header>
        );
    }


    render() {
        const nbTotal = this.state.items.length
        const nbWait = this.state.items.filter((item) => {/*console.log("Loop",i,j);*/ return !!item.done}).length
        return (
            <div>
                <h2>Ajouter une tache:</h2>
                <input  type="text"
                        value={this.state.inputValue}
                        onChange={e => this.setState({inputValue: e.target.value})}
                        onKeyDown={(event) => this.handleKeyDown(event)}
                />
                <button onClick={() => {this.addTask()}}>+</button>
                <h2>Todos:</h2>
                <ol>
                    {this.state.items && this.state.items.map((item, index) => (
                        <li key={item.id}>
                            <input type="checkbox" onClick={() => this.toggleTask(index)} checked={item.done} />
                            <span className={item.done ? "done" : ""} onClick={() => {if (!item.done) {this.toggleTask(index);}}} >{item.text} </span>
                            <button onClick={() => this.deleteTask(index)} >Supprimer</button>
                            <button onClick={() => this.taskUp(index)} >↑</button>
                            <button onClick={() => this.taskDown(index)} >↓</button>

                        </li>
                    ))}
                </ol>
                <em style={{color:'blue'}}>Il y a <b>{nbWait}</b> taches cochées (sur <b>{nbTotal}</b> au total).</em>
            </div>
        )
    }
}

export default TodoApp;
