import doBreakup from './doBreakup';
import getTraits from './getTraits';
import setTraits from './setTraits';

const handler = {
	setTraits,
	traits: getTraits,
	doBreakup,
};

export default handler;
