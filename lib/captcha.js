export function captcha(input, next) {
	let output = 0;

	for (let i = 0;  i < input.length; i++) {
		let nextIdx = next(i, input.length);
		if (input[i] == input[nextIdx % input.length])
			output += parseInt(input[i], 10);
	}

	return output;
}
