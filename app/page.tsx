import {
	GithubIcon,
	LinkedinIcon,
	MailIcon,
	XIcon,
} from "@/components/icons";

const socialLinks = [
	{
		label: "Email Lakshay",
		href: "mailto:hey@laks.sh",
		Icon: MailIcon,
	},
	{
		label: "Lakshay on GitHub",
		href: "https://github.com/lakshaybhushan",
		Icon: GithubIcon,
	},
	{
		label: "Lakshay on X",
		href: "https://x.com/blakssh",
		Icon: XIcon,
	},
	{
		label: "Lakshay on LinkedIn",
		href: "https://www.linkedin.com/in/lakshaybhushan/",
		Icon: LinkedinIcon,
	},
] as const;

const intro = [
	"I’m a product designer based in Berlin, currently designing interfaces for the web at Vercel.",
	"I enjoy making complex tools feel calm, clear, and effortless to use.",
	"Outside of work you’ll probably find me watching films, playing story driven games, taking photographs or building things just for fun :)",
] as const;

export default function Home() {
	return (
		<main className="flex min-h-svh justify-center px-6 pt-24 pb-20 sm:px-8 sm:pt-48 sm:pb-28">
			<div className="w-full max-w-shell">
				<div className="max-w-measure">
					<header className="leading-display">
						<h1 className="font-medium text-ink">Lakshay Bhushan</h1>
						<p className="text-ink">Member of Technical Staff, Design at Vercel</p>
					</header>

					<div className="mt-section flex flex-col gap-stack leading-copy text-ink-soft">
						{intro.map((paragraph) => (
							<p key={paragraph} className="text-pretty">
								{paragraph}
							</p>
						))}
					</div>

					<nav aria-label="Elsewhere" className="mt-section">
						<ul className="-ml-1.5 flex">
							{socialLinks.map(({ label, href, Icon }) => {
								const isExternal = href.startsWith("http");

								return (
									<li key={label}>
										<a
											aria-label={label}
											className="social-link -my-3.5 px-1.5 py-3.5"
											href={href}
											rel={isExternal ? "noreferrer" : undefined}
											target={isExternal ? "_blank" : undefined}
										>
											<Icon className="size-4" />
										</a>
									</li>
								);
							})}
						</ul>
					</nav>
				</div>
			</div>
		</main>
	);
}
