// components/ui/skeleton/ProductCardSkeleton.tsx
export function ProductCardSkeleton() {
	return (
		<div className="w-full max-w-[340px] bg-white rounded-[20px] animate-pulse">
			{/* Изображение (скелет) */}
			<div className="w-full md:h-[220px] h-[174px] bg-gray-200 rounded-[20px]"></div>

			{/* Контент */}
			<div className="p-3">
				{/* Заголовок */}
				<div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>

				{/* Цена */}
				<div className="flex items-center gap-2 mt-1">
					<div className="h-5 bg-gray-200 rounded w-16"></div>
					<div className="h-4 bg-gray-200 rounded w-12"></div>
				</div>

				{/* Кнопка */}
				<div className="w-full mt-8 h-10 bg-gray-200 rounded-[8px]"></div>
			</div>
		</div>
	);
}