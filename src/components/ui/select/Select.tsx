// components/ui/Select.tsx
"use client";

import React, { useState } from "react";

interface Option {
	value: string;
	label: string;
	price?: string; // например, "200 с"
}

interface SelectProps {
	label?: string;
	placeholder?: string;
	options: Option[];
	value: string;
	onChange: (value: string) => void;
	disabled?: boolean;
	className?: string;
	required?: boolean;
}

const Select: React.FC<SelectProps> = ({
	label,
	placeholder,
	options,
	value,
	onChange,
	disabled = false,
	className = "",
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleOptionClick = (optionValue: string) => {
		onChange(optionValue);
		setIsOpen(false);
	};

	return (
		<div className="w-full">
			{label && (
				<label className="block text-[14px] font-medium text-gray-700 mb-2">
					{label}
				</label>
			)}
			<div className="relative">
				<button
					type="button"
					onClick={() => !disabled && setIsOpen(!isOpen)}
					disabled={disabled}
					className={`w-full h-[56px] px-4 py-4 rounded-[14px] bg-[#F3F3F3] text-black border-none flex items-center justify-between text-left    outline-none transition-all duration-200 ${
						disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
					} ${className}`}>
					<span className="text-gray-700">
						{options.find((opt) => opt.value === value)?.label || placeholder}
					</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="text-gray-500">
						<polyline points="6 9 12 15 18 9"></polyline>
					</svg>
				</button>

				{/* Дропдаун */}
				{isOpen && (
					<div style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#E5E5E5 transparent", // Firefox
          }} className="absolute top-full left-0 w-full h-[120px] mt-2 bg-white rounded-[14px] shadow-lg z-20 border border-gray-200  overflow-y-auto">
						<ul className="p-2 m-0 list-none ">
							{options.map((option) => (
								<li
									key={option.value}
									onClick={() => handleOptionClick(option.value)}
									className={`flex items-center rounded-[8px] justify-between p-4 cursor-pointer   last:border-b-0 transition-colors ${
										value === option.value
											? "bg-gray-100 text-gray-600"
											: "hover:bg-gray-50 text-black"
									}`}>
									<div className="flex items-center gap-2 ">
										<div className="relative flex items-center">
											<input
												type="checkbox"
												checked={value === option.value}
												readOnly
												className="appearance-none w-4 h-4 border border-black rounded-sm cursor-pointer checked:bg-[#28AC4D] checked:border-[#28AC4D]"
											/>
											{value === option.value && (
												<svg
													className="absolute w-4 h-4 text-white pointer-events-none"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="3"
													strokeLinecap="round"
													strokeLinejoin="round">
													<polyline points="6 12 10 16 18 8"></polyline>
												</svg>
											)}
										</div>
										<span className="text-black">{option.label}</span>
									</div>
									{option.price && (
										<span className="text-black">{option.price}</span>
									)}
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
};

export default Select;
