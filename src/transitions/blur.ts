export const blurTransition = {
	forwards: {
		old: {
			name: "blurOut",
			duration: "0.25s",
			easing: "cubic-bezier(0.3, 0, 0.7, 1)",
		},
		new: {
			name: "blurIn",
			duration: "0.25s",
			easing: "cubic-bezier(0.3, 0, 0.7, 1)",
		},
	},
	backwards: {
		old: {
			name: "blurOut",
			duration: "0.25s",
			easing: "cubic-bezier(0.3, 0, 0.7, 1)",
		},
		new: {
			name: "blurIn",
			duration: "0.25s",
			easing: "cubic-bezier(0.3, 0, 0.7, 1)",
		},
	},
};

export const blurTransitionStyles = `
@keyframes blurIn {
    0% {
        opacity: 0;
        filter: blur(4px);
        transform: scale(0.98);
    }
    100% {
        opacity: 1;
        filter: blur(0);
        transform: scale(1);
    }
}

@keyframes blurOut {
    0% {
        opacity: 1;
        filter: blur(0);
        transform: scale(1);
    }
    100% {
        opacity: 0;
        filter: blur(4px);
        transform: scale(1.02);
    }
}

::view-transition-old(root),
::view-transition-new(root) {
    animation: none;
    mix-blend-mode: normal;
    will-change: transform, opacity;
}
`;
