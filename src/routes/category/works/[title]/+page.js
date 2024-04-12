import PocketBase from 'pocketbase';

const pb = new PocketBase(`${import.meta.env.VITE_API_URL}`);

export const load = async () => {
	const works = await pb.collection('works').getFullList({
		sort: '-date',
		expand: 'category, reference, colab, exhibitions'
	});

	const colabs = await pb.collection('collaborations').getFullList({
		sort: '-title',
		expand: 'curator'
	});

	return {
		works, colabs
	};
};
