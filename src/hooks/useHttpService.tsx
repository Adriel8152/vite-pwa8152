export const useHttpService = () => {
	const API_PATH = process.env.API_PATH;

	const get = ( url: string, options: RequestInit | undefined = { method: 'get' } ) => {
		return fetch(`${API_PATH?.endsWith('/') ? API_PATH : API_PATH + '/'}${url.startsWith('/') ? url.slice(1) : url }`, options);
	};

	const post = ( url: string, body: any, options: RequestInit | undefined = { method: 'post', body: JSON.stringify( body ) } ) => {
		return fetch(`${API_PATH?.endsWith('/') ? API_PATH : API_PATH + '/'}${url.startsWith('/') ? url.slice(1) : url }`, options);
	};

	return {
		get,
	}
}
