import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression';

const port = 1337;
const app = express();

app.use(compression());
app.use(express.static("public"));

app.get("*", function(req, res) {
	res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen(port, function(err) {
	if(err) {
		console.log(err);
	}
});
