import { Request, Response } from 'express';
import { pg } from '../utils/connection';

const setTraits = async (_req: Request, _res: Response) => {
	let insertData = _req.body;
	insertData.traits = insertData.traits.join(',');

	try {
		await pg.insert(insertData).into('traits');

		_res.status(200).json({
			write: 'success',
		});
	} catch (e) {
		_res.status(404).json({
			write: 'failed',
		});
	}
};

export default setTraits;
