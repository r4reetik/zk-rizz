import { Request, Response } from 'express';
import { pg } from '../utils/connection';
import { traits } from '../utils/traits';

const getTraits = async (_req: Request, _res: Response) => {
	const userAddress = _req.params.address;

	const data = await pg.select('*').from('traits').where('address', userAddress);

	const traitsList = data[0].traits.split(',');

	const traitsKV: { [key: string]: number } = traits.reduce(
		(acc, trait) => {
			acc[trait] = traitsList.includes(trait) ? 1 : 0;
			return acc;
		},
		{} as { [key: string]: number }
	);

	data[0].traits = traitsKV;

	_res.status(200).json(data[0]);
};

export default getTraits;
