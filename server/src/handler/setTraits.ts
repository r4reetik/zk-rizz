import { Request, Response } from 'express';
import { pg } from '../utils/connection';

const setTraits = async (_req: Request, _res: Response) => {
	let insertData = _req.body;
	insertData.mine.traits = insertData.mine.traits.join(',');
	insertData.want.traits = insertData.want.traits.join(',');

	try {
		await pg
			.insert({
				address: insertData.address,
				mine_gender: insertData.mine.gender,
				mine_age: insertData.mine.age,
				mine_traits: insertData.mine.traits,
				want_gender: insertData.want.gender,
				want_age: insertData.want.age,
				want_traits: insertData.want.traits,
			})
			.into('traits');

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
