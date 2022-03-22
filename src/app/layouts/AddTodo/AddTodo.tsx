import MainContainer from "../../layouts/MainContainer/MainContainer";
import TodoForm from "../../components/Form/TodoForm";


const AddTodo = () => {
    return (
    <MainContainer navTitle='Welcome to Todos Portal!'>
        <TodoForm/>
    </MainContainer>
    )
};

export default AddTodo;
