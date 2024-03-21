import React from 'react';
import Footer from "./Footer";
import Header from "./Header";
import {Box, Button, Modal} from "@mui/material";

class TodoApp extends React.Component {
    closeModal = () => {
        this.setState({ isModalOpen: false })
    }
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
            searchValue: '',
            isModalOpen: false,
            taskTitle: ''
        }
        this.closeModal.bind(this)
    }

    handleInputChange = (event) => {
        this.setState({ taskTitle: event.target.value });
    }

    handleSubmit = () => {
        this.addTask(this.state.taskTitle);
        this.closeModal();
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

    addTask(newTaskTitle) {
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

    openModal() {
        this.setState({ isModalOpen: true });
    }

    render() {

        const style = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
        };
        const nbTotal = this.state.items.length
        const nbChecked = this.state.items.filter((item) => {/*console.log("Loop",i,j);*/ return !!item.isChecked}).length
        const progress = nbTotal > 0 ? (nbChecked / nbTotal) * 100 : 0;
        return (
            <div>
                <Header nbTotal={nbTotal} nbChecked={nbChecked} progress={progress} searchValue={this.state.searchValue} />
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
                <Modal
                    open={this.state.isModalOpen}
                    onClose={this.closeModal}
                >
                    <Box sx={style}>
                        <input type="text" placeholder="Entrez le titre de la nouvelle tâche" onChange={this.handleInputChange}
                        onKeyPress={event => {
                            if (event.key === 'Enter') {
                                this.handleSubmit();
                            }
                        }} />
                        <Button onClick={this.handleSubmit}>Ajouter une tâche</Button>
                    </Box>
                </Modal>

                <Footer addTask={this.openModal.bind(this)} registerTasks={this.registerTasks.bind(this)}/>
            </div>
        )
    }
}

export default TodoApp;
