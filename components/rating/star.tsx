export type StarProps = {
	isHollow: boolean;
	size?: 'sm' | 'md' | 'lg';
	onClick: () => void;
};

export function Star({ isHollow = false, size = 'md', onClick }: StarProps) {
	// Function for assinging the correct Tailwindcss class according to the size property
	function assignSize(size: 'sm' | 'md' | 'lg') {
		switch (size) {
			case 'sm':
				return 'text-lg';
			case 'md':
				return 'text-2xl';
			case 'lg':
				return 'text-4xl';
			default:
				return 'text-md';
		}
	}

	// Function for assinging the correct Tailwindcss class according to the star icon type
	function assignColor(color: 'default' | 'active') {
		switch (color) {
			case 'default':
				return 'text-warning-200';
			case 'active':
				return 'text-warning-400';
			default:
				return 'text-warning-400';
		}
	}

	return (
		<span
			className={`${assignSize(size)} ${
				isHollow ? assignColor('default') : assignColor('active')
			} w-fit h-fit`}
			onClick={onClick}>
			{isHollow ? '☆' : '★'}
		</span>
	);
}
