import type { TransitionDirectionalAnimations } from "astro";

const EASE_IN_OUT_QUART = 'cubic-bezier(0.76, 0, 0.24, 1)';

export default function slideInFromLeft({
	duration,
}: {
	duration?: string | number;
} = {}): TransitionDirectionalAnimations {
	return {
		forwards: {
			old: [
				{
					name: 'astroFadeOut',
					duration: duration ?? '90ms',
					easing: EASE_IN_OUT_QUART,
					fillMode: 'both',
				},
				{
					name: 'astroSlideToRight',
					duration: duration ?? '220ms',
					easing: EASE_IN_OUT_QUART,
					fillMode: 'both',
				},
			],
			new: [
				{
					name: 'astroFadeIn',
					duration: duration ?? '210ms',
					easing: EASE_IN_OUT_QUART,
					delay: duration ? undefined : '30ms',
					fillMode: 'both',
				},
				{
					name: 'astroSlideFromLeft',
					duration: duration ?? '220ms',
					easing: EASE_IN_OUT_QUART,
					fillMode: 'both',
				},
			],
		},
		backwards: {
			old: [{ name: 'astroFadeOut' }, { name: 'astroSlideToLeft' }],
			new: [{ name: 'astroFadeIn' }, { name: 'astroSlideFromRight' }],
		},
	};
}
