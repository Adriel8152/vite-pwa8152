export const GLOBAL_VAR = {
	CLIENT_PATH: process?.env?.CLIENT_PATH || 'http://localhost:8125',
	API_PATH: process?.env?.API_PATH || 'http://localhost:3000',
}

export default GLOBAL_VAR;