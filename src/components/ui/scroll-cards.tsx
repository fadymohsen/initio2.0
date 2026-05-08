"use client";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

export interface iCardItem {
	title: string;
	description: string;
	tag?: string;
	src: string;
	link: string;
	color: string;
	textColor: string;
}

interface iCardProps extends Omit<iCardItem, "tag"> {
	i: number;
}

const Card: FC<iCardProps> = ({ title, description, color, textColor, i, src, link }) => {
	return (
		<div className="h-screen flex items-center justify-center sticky top-0 md:p-0 px-6">
			<Link
				href={link}
				className="relative flex flex-col h-[300px] w-[700px] py-12 px-6 md:px-12
				rotate-0 md:h-[400px] md:w-[600px] items-center justify-center mx-auto
				shadow-md pr-3 pl-3 pt-3 pb-4 overflow-hidden group cursor-pointer"
				style={{ backgroundColor: color }}
			>
				<span className="font-bold relative text-5xl md:text-7xl mt-5 text-center z-10">
					<span
						className="relative font-serif font-black tracking-tight text-center"
						style={{ color: textColor }}
					>
						{title}
					</span>
				</span>
				<div
					className="font-sans text-lg md:text-2xl font-medium text-center mb-0 z-10 mt-[30px] lowercase tracking-wide"
					style={{ lineHeight: 1.4, color: textColor }}
				>
					{description}
				</div>

				{/* Background image */}
				<div className="absolute inset-0 z-0">
					<Image
						className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
						src={src}
						alt={title}
						fill
					/>
				</div>

				{/* Hover overlay */}
				<div className="absolute inset-0 z-[5] bg-[#010F24]/0 group-hover:bg-[#010F24]/30 transition-colors duration-500" />

				{/* "View Project" hint */}
				<div className="absolute bottom-5 right-5 z-10 flex items-center gap-1 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
					<span className="font-sans text-[10px] uppercase tracking-[0.2em]" style={{ color: textColor }}>
						View Project
					</span>
				</div>
			</Link>
		</div>
	);
};

interface iCardSlideProps {
	items: iCardItem[];
}

const CardsParallax: FC<iCardSlideProps> = ({ items }) => {
	return (
		<div className="min-h-screen">
			{items.map((project, i) => (
				<Card key={`p_${i}`} {...project} i={i} />
			))}
		</div>
	);
};

export { CardsParallax };
