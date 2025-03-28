import designsjson from "../constants/designs.json";

export const designs = designsjson.map((design) => {
	return {
		...design,
		image: `/src/assets/designs/${design.imageKey}.webp`,
	};
});
