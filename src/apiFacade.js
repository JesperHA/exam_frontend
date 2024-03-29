const url = "https://lamseben.dk/exam-prep"

function handleHttpErrors(res) {
	if (!res.ok) {
		return Promise.reject({status: res.status, fullError: res.json()})
	}
	return res.json();
}

function apiFacade() {
	const setToken = (token) => {
		localStorage.setItem('jwtToken', token)
	}
	const getToken = () => {
		return localStorage.getItem('jwtToken')
	}
	const loggedIn = () => {
		const loggedIn = getToken() != null;
		return loggedIn;
	}
	const logout = () => {
		localStorage.removeItem("jwtToken");
	}

	const login = (user, password) => {
		const options = makeOptions("POST", true, {username: user, password: password});
		return fetch(url + "/api/login", options)
			.then(handleHttpErrors)
			.then(res => {
				setToken(res.token)
			})
	};

	const fetchData = (user) => {
		const options = makeOptions("GET", true);
		return fetch(url + "/api/info/" + user, options).then(handleHttpErrors);
	};


	const makeOptions = (method, addToken, body) => {
		var opts = {
			method: method,
			headers: {
				"Content-type": "application/json",
				'Accept': 'application/json',
			}
		}
		if (addToken && loggedIn()) {
			opts.headers["x-access-token"] = getToken();
		}
		if (body) {
			opts.body = JSON.stringify(body);
		}
		return opts;
	}



	
	return {
		makeOptions,
		setToken,
		getToken,
		loggedIn,
		login,
		logout,
		fetchData,
		
	}
}



const facade = apiFacade();
export default facade;