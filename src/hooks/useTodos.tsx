import { useHttpService } from "./useHttpService"

export const useTodos = () => {
	const { get, post } = useHttpService();
	
	const getAllTodos = async () => {
		const resp = await get( '/getTodos', { method: 'get' } );
		const data = await resp.json();

		return data;
	}

	const addTodo = async ( title: string ) => {
		const resp = await post( '/addTodo', {
			method: 'post',
			headers: {
				"Content-Type": "application/JSON"
			},
			body: JSON.stringify( { title } ),
		} );

		const data = await resp.json();

		return data;
	}

	return {
		getAllTodos,
		addTodo,
	}
}
