import MainContainer from "../MainContainer/MainContainer";
import Typography from '@mui/material/Typography';
import TodoForm from "../../components/Form/TodoForm";


const AddTodoContainer = () => {
    return (
        <MainContainer navTitle='Welcome to Todos Portal!'>
            <>
                <Typography
                    variant="h4"
                    component="h4"
                    textAlign='center'
                    marginTop={4}
                    gutterBottom>
                    You can add a Todo to the list!
                </Typography>
                <TodoForm />
            </>
        </MainContainer>
    )
};

export default AddTodoContainer;
