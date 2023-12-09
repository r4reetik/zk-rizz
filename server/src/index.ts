import express, { Request, Response } from 'express';
import handler from './handler/handler';
import bodyParser from 'body-parser';

require('dotenv').config();
var cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ----- GET Method ----- //
app.get('/health', (_req: Request, _res: Response) => {
	_res.status(200).json({
		status: 'online',
		message: 'healthy',
	});
});

app.get('/traits/:address', (_req: Request, _res: Response) => {
	handler.traits(_req, _res);
});

// ----- POST Method ----- //
app.post('/set-traits', (_req: Request, _res: Response) => {
	handler.setTraits(_req, _res);
});

// ----- Fail Safe ----- //
app.get('*', (_req: Request, _res: Response) => {
	_res.status(404).json({
		status: 'online',
		message: 'resource not found',
	});
});

// ----- Server Invocation ----- //
const port = process.env.PORT || 17080;

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
