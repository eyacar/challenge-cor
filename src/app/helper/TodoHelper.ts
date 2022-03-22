import { ITodo } from "../store/interface"

export class TodoHelper{
    todoStore:ITodo[] | undefined;

    private isFakeStore: boolean;

    constructor(){
        this.isFakeStore = Boolean(window.localStorage.getItem('todosFakeStore'));
    }

    get isTodosFakeStore(){
        return this.isFakeStore
    }

    checkIsFakeStore(){
        this.isFakeStore = Boolean(window.localStorage.getItem('todosFakeStore'));
    }

    createFakeLocalStore( todos: ITodo[]){
        window.localStorage.setItem('todosFakeStore', JSON.stringify(todos))
    }

    getTheModifiedStore(){
        return window.localStorage.getItem('todosFakeStore');
    }

    static deleteItemFromFakeStore(id: string){
        const store = window.localStorage.getItem('todosFakeStore');

        const storeObject:ITodo[] = store && JSON.parse(store);

        if(store && storeObject){
            const newStore = storeObject.filter((todo) => todo.id !== id)
            window.localStorage.removeItem('todosFakeStore')
            return window.localStorage.setItem('todosFakeStore', JSON.stringify(newStore))
        }
    }

    static editFromFakeStore(id: string, priority: string, status: string){
        const store = window.localStorage.getItem('todosFakeStore');

        const storeObject:ITodo[] = store && JSON.parse(store);

        if(store && storeObject){
            const newStore = storeObject.map( element => element.id === id ? {...element, priority, status} : element )
            window.localStorage.removeItem('todosFakeStore')
            return window.localStorage.setItem('todosFakeStore', JSON.stringify(newStore))
        }
    }

    static addTodoToFakeStore(todo:ITodo){
        const store = window.localStorage.getItem('todosFakeStore');

        const storeObject:ITodo[] = store && JSON.parse(store);

        if(store && storeObject){
            const newObject = [...storeObject, todo]
            return window.localStorage.setItem('todosFakeStore', JSON.stringify(newObject))
        }

    }

}