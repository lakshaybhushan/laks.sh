export default function HoverButton() {
	return (
		<button className="group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-full bg-[#00997E] px-6 font-medium text-[#FDFFF4] transition duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#00997E]/50 hover:rotate-1">
			<span className="relative z-10 transition-transform group-hover:scale-110">Hover me</span>
			<div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
				<div className="relative h-full w-8 bg-white/20" />
			</div>
		</button>
	);
}
