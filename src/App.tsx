import { useEffect, useState } from 'react'
import './App.css'
import { Alert, Button, Divider, Skeleton, Snackbar, TextField } from '@mui/material'
import { useTodos } from './hooks/useTodos';
import { Todo } from './interfaces';



const initialError = { errorStatus: false, errorMessage: '' };



function App() {
  const [alertConfig, setAlertConfig] = useState<{
    open: boolean,
    message: string,
    vertical: 'top' | 'bottom',
    horizontal: 'left' | 'center' | 'right',
    severity: 'error' | 'warning' | 'info' | 'success',
  }>( {
    open: false,
    message: '',
    vertical: 'top',
    horizontal: 'right',
    severity: 'info',
  } );
  const [loading, setLoading] = useState( true );
  const [todos, setTodos] = useState<Todo[]>( [] );
  const [error, setError] = useState( initialError );
  const [todoInput, setTodoInput] = useState( '' );


  const { getAllTodos, addTodo } = useTodos();





  const fetchAndSetTodos = () => {
    setLoading( true );
    setError( initialError );

    getAllTodos()
      .then( data => {
        setTodos( data.reverse() );
      } )
      .catch( respError => {
        setAlertConfig( {
          ...alertConfig,
          open: true,
          message: 'Ocurrió un error al obtener los todos',
          severity: 'error',
        } );

        setError( {
          errorStatus: true,
          errorMessage: JSON.stringify( respError ),
        } );
      } )
      .finally( () => {
        setLoading( false );
      } )
  }

  const transformDateToString = (date: Date | string | null) => {
    if( date === null ) return '--';

    date = new Date( date );

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() devuelve un índice basado en cero, por lo tanto, se suma 1.
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const handleAddTodo = () => {
    if( todoInput.trim() === '' ) {
      setAlertConfig( {
        ...alertConfig,
        open: true,
        message: 'El campo de texto no puede estar vacío',
        severity: 'error',
      } );

      return;
    };

    setLoading( true );

    addTodo( todoInput )
      .then( () => {
        fetchAndSetTodos();
        setTodoInput( '' );
      } )
      .catch( respError => {
        setAlertConfig( {
          ...alertConfig,
          open: true,
          message: 'Ocurrió un error al agregar el todo',
        } );

        setError( {
          errorStatus: true,
          errorMessage: JSON.stringify( respError ),
        } );
      } )
  };

  




  useEffect( () => {
    fetchAndSetTodos();
  }, [] )


  return (
    <>
      <Snackbar open={ alertConfig.open } autoHideDuration={ 5000 } onClose={ () => setAlertConfig({ ...alertConfig, open: false }) } anchorOrigin={{ vertical: alertConfig.vertical, horizontal: alertConfig.horizontal }}>
        <Alert
          onClose={ () => setAlertConfig({ ...alertConfig, open: false }) }
          severity={ alertConfig.severity }
          variant="filled"
          sx={{ width: '100%' }}
        >
          { alertConfig.message }
        </Alert>
      </Snackbar>




      <div style={{ padding: 64 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <TextField label="Agregar un todo" variant="filled" color='primary' sx={{ width: '100%', }} fullWidth value={todoInput} onChange={ e => setTodoInput( e.target.value ) } onKeyDown={ (event) => event.key === 'Enter' && handleAddTodo() } />
          <Button variant="contained" onClick={ handleAddTodo }>Agregar</Button>
        </div>

        <br /><br />

        <Divider />

        <br />

        <div>
          <h2>Lista de todos</h2>

          <div style={{ display: 'flex', justifyContent: 'flex-end', }}>
            <Button variant='text' onClick={ fetchAndSetTodos }>Actualizar</Button>
          </div>

          <table className='table'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Realizado</th>
                <th>Creado</th>
                <th>Eliminado</th>
              </tr>
            </thead>
            <tbody>
              {
                !error.errorStatus && loading && new Array(5).fill(null).map( (_, index) => (
                  <tr key={index}>
                    <td> <Skeleton id={index.toString()} variant="rounded" /> </td>
                    <td> <Skeleton id={index.toString()} variant="rounded" /> </td>
                    <td> <Skeleton id={index.toString()} variant="rounded" /> </td>
                    <td> <Skeleton id={index.toString()} variant="rounded" /> </td>
                    <td> <Skeleton id={index.toString()} variant="rounded" /> </td>
                  </tr>
                ))
              }

              {
                !error.errorStatus && !loading && todos.map( todo => (
                  <tr key={todo.id}>
                    <td>{todo.id}</td>
                    <td>{todo.title}</td>
                    <td>{todo.done ? '✅' : '❌'}</td>
                    <td>{transformDateToString(todo.createdAt)}</td>
                    <td>{transformDateToString(todo.deletedAt)}</td>
                  </tr>
                ) )
              }

              {
                error.errorStatus && <p>{error.errorMessage}</p>
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default App
