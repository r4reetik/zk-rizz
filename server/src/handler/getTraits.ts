import { Request, Response } from 'express';
import { pg } from '../utils/connection';
import { traits } from '../utils/traits';

const getTraits = async (_req: Request, _res: Response) => {
	const userAddress = _req.params.address;

	const data = await pg.select('*').from('traits').where('address', userAddress);
	if (!data || data.length < 1) {
		_res.status(404).json({
			error: 'invalid user',
		});
		return;
	}

	_res.status(200).json({
		success: 'valid user',
	});
};

export default getTraits;
