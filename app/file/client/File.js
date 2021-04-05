export const File = {
	async convertFileToStream(file) {
		return new Promise((resolve) => {
			const reader = new FileReader();
			reader.onload = function() {
				resolve(this.result);
			};
			reader.readAsBinaryString(file);
		});
	},
};
