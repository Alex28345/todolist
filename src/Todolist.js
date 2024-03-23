import React from 'react';
import Footer from "./Footer";
import Header from "./Header";
import {Modal} from "@mui/material";
import CategoryIcon from "./CategoryIcon";
import CategoryIcons from "./CategoryIcons";

class TodoApp extends React.Component {
    closeModal = () => {
        this.setState({ isModalOpen: false })
        this.setState({ selectedCategories: [] })
    }
    constructor(props) {
        super(props)
        this.inputRef = React.createRef();
        let todoList;
        console.log(localStorage.getItem('todoList'))
        if(localStorage.getItem('todoList') === null) {
            todoList = [];
        } else if(window.confirm('Voulez-vous charger les tâches sauvegardées ?')) {
            todoList = (localStorage.getItem('todoList') !== "") ? JSON.parse(localStorage.getItem('todoList')) : [];
        } else {
            todoList = [];
        }

        this.state = {
            items: todoList,
            searchValue: '',
            isModalOpen: false,
            taskTitle: '',
            selectedCategories: [],
        }
        this.closeModal.bind(this)
    }

    handleInputChange = (event) => {
        this.setState({ taskTitle: event.target.value });
    }

    handleSubmit = () => {
        this.addTask(this.state.taskTitle, this.state.selectedCategories);
        this.setState({ taskTitle: '' });
        this.setState({ selectedIcon: '' });
        this.closeModal();
    }

    handleCategoryChange = (categoryName) => {
        this.setState(prevState => {
            if (prevState.selectedCategories.includes(categoryName)) {
                // Si la catégorie est déjà sélectionnée, la supprimer
                return { selectedCategories: prevState.selectedCategories.filter(category => category !== categoryName) };
            } else {
                // Sinon, ajouter la catégorie
                return { selectedCategories: [...prevState.selectedCategories, categoryName] };
            }
        });
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

    addTask(newTaskTitle, categories) {
        if(newTaskTitle !== null && newTaskTitle !== ''){
            this.setState(prevState => ({
                items: [
                    {Title: newTaskTitle, isChecked:false, Categories: categories},
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

    changeSearchValue(event) {
        this.setState({searchValue: event.target.value});
    }

    render() {
        const icons = ['Home', 'Work', 'Apple', 'Bug', 'Computer'];
        const nbTotal = this.state.items.length
        const nbChecked = this.state.items.filter((item) => {/*console.log("Loop",i,j);*/ return !!item.isChecked}).length
        const progress = nbTotal > 0 ? (nbChecked / nbTotal) * 100 : 0;
        return (
            <>
                <Header nbTotal={nbTotal} nbChecked={nbChecked} progress={progress} searchValue={this.state.searchValue} />
                <div className="my-4">
                    <h2 className="text-xl font-bold">Les tâches:</h2>
                    <ol className="list-decimal list-inside">
                        {this.state.items && this.state.items
                            .filter(item => this.state.searchValue.length >= 3 ? item.Title.toLowerCase().includes(this.state.searchValue.toLowerCase()) : true)
                            .map((item, index) => (
                                <li key={index} className="flex items-center space-x-2 m-2">
                                    <input type="checkbox" onChange={() => this.toggleTask(index)} checked={item.isChecked} />
                                    <span className={"cursor-pointer" + (item.isChecked ? " line-through" : "")} onClick={() => { if (!item.isChecked) { this.toggleTask(index); } }}>{item.Title}</span>
                                    <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600" onClick={() => this.deleteTask(index)}>Supprimer</button>
                                    {index !== 0 && <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600" onClick={() => this.taskUp(index)}>↑</button>}
                                    {index !== this.state.items.length - 1 && <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600" onClick={() => this.taskDown(index)}>↓</button>}
                                    <CategoryIcons categories={item.Categories} />
                                </li>
                            ))}
                    </ol>
                </div>
                <Modal
                    open={this.state.isModalOpen}
                    onClose={this.closeModal}
                >
                    <div className="absolute bg-gray-400 bottom-[50%] translate-y-1/2 translate-x-1/2 right-[50%] p-5 w-1/3 flex flex-col items-center justify-center space-y-5">
                        <input type="text" ref={this.inputRef} placeholder="Entrez le titre de la nouvelle tâche"
                               className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400 mr-2 w-5/6"
                               onChange={this.handleInputChange}
                               onKeyPress={event => {
                                   if (event.key === 'Enter') {
                                       this.handleSubmit();
                                   }
                               }}/>

                        <div className="icon-selection space-x-1">
                            {icons.map(icon => (
                                <button
                                    className={this.state.selectedCategories.includes(icon) ? 'bg-blue-500 rounded-xl p-1' : 'p-1'}
                                    onClick={() => this.handleCategoryChange(icon)}
                                >
                                    <CategoryIcon category={icon}/>
                                </button>
                            ))}
                        </div>

                        <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                onClick={this.handleSubmit}>Ajouter une tâche
                        </button>
                    </div>

                </Modal>

                <Footer addTask={this.openModal.bind(this)} registerTasks={this.registerTasks.bind(this)}
                        changeValue={this.changeSearchValue.bind(this)} searchValue={this.state.searchValue}/>
            </>

        )
    }
}

export default TodoApp;
