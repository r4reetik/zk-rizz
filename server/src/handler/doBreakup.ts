import { Request, Response } from 'express';
import { pg } from '../utils/connection';

const doBreakup = async (_req: Request, _res: Response) => {
	let updateData = _req.body;

	try {
		await pg('traits')
			.where('address', updateData.addresses[0])
			.orWhere('address', updateData.addresses[1])
			.update({ status: false });

		_res.status(200).json({
			write: 'success',
		});
	} catch (e) {
		_res.status(404).json({
			write: 'faled',
		});
	}
};

export default doBreakup;
