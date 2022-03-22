import { useEffect } from 'react';
import MainContainer from '../MainContainer/MainContainer';
import { useAppDispatch } from '../../store/hooks';
import { getTodos } from '../../store/todos/asyncActions';
import TodoList from '../../components/Todos/TodosList';



const Home = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTodos())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <MainContainer navTitle='Welcome to Todos Portal!'>
            <TodoList />
        </MainContainer>
    );
}

export default Home;