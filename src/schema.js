export default {

	/*
		USER_LOGIN {
			type: "object",
			properties: {
				username: { type: "string", pattern: "regex", code: "username", error: "Bitte überprüfen Sie ihre Eingabe." }
			}
		}
	*/

	getErrorByCode: (code, result) => {
		if(result.error) {
			let errorObj = result.error.filter(el => el.code == code)[0];
			return errorObj && errorObj.hasOwnProperty("message") ? errorObj.message : null;
		}
	}

}