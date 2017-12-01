function captcha(input, next = (i, len) => i+1) {
	let output = 0;

	for (let i = 0;  i < input.length; i++) {
		if (input[i] == input[next(i, input.length) % input.length])
			output += parseInt(input[i], 10);
	}

	return output;
}


export { captcha }