// components/ui/Modal.tsx
"use client";

import React from "react";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	title?: string;
	mobileHeight?: string;
	bgColor?: string; // 👈 новый пропс для фона
}

const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	children,
	title,
	mobileHeight = "h-auto",
	bgColor = "bg-white", // 👈 по умолчанию белый фон
}) => {
	return (
		<div
			className={`fixed inset-0 bg-black bg-opacity-50 flex md:items-center items-end justify-center ${
				isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
			} transition-opacity duration-300 z-50`}
			onClick={onClose}
		>
			{/* Мобильная версия */}
			<div
				className={`block md:hidden w-full ${mobileHeight} rounded-t-[30px] ${bgColor} px-6 pt-3 pb-6 relative transform transition-all duration-300 ease-out will-change-transform ${
					isOpen ? "translate-y-0" : "translate-y-full"
				}`}
				onClick={(e) => e.stopPropagation()}
			>
				<div className="w-full flex justify-center mb-4">
					<div className="bg-[#b1b1b1] w-[72px] h-[2px] rounded-full" />
				</div>

				{title && <h2 className="text-[24px] font-bold text-center mb-6">{title}</h2>}

				{children}
			</div>

			{/* Десктопная версия */}
			<div
				className={`hidden md:block w-full max-w-[482px] max-h-[90vh] rounded-[18px] ${bgColor} px-10 py-10 relative transform transition-all duration-300 ease-out will-change-transform ${
					isOpen
						? "scale-100 opacity-100"
						: "scale-95 opacity-0 pointer-events-none"
				}`}
				onClick={(e) => e.stopPropagation()}
				style={{ maxHeight: "90vh", overflowY: "auto" }}
			>
				<button
					className="absolute top-4 right-4 text-[12px] font-[400] text-gray-500 hover:text-gray-700"
					onClick={onClose}
				>
					Закрыть
				</button>

				{title && (
					<h2 className="text-[24px] font-bold text-center mt-6 mb-6">{title}</h2>
				)}

				{children}
			</div>
		</div>
	);
};

export default Modal;