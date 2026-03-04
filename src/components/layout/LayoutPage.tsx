"use client";
import { FC, ReactNode } from "react";
import scss from "./LayoutPage.module.scss";
import Header from "./header/Header";

interface LayoutPageProps {
	children: ReactNode;
}

export const LayoutPage: FC<LayoutPageProps> = ({ children }) => {
	return (
		<div className={scss.LayoutPage}>
			<Header />
			<main>{children}</main>
		</div>
	);
};
