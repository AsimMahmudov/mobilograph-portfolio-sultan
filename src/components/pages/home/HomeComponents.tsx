import React from "react";
import Hero from "./hero/Hero";
import About from "./about/About";
import Portfolio from "./portfolio/Portfolio";
import Services from "./services/Services";
import Contact from "./contact/Contact";

const HomeComponents = () => {
	return (
		<>
			<Hero />
			<About/>
			<Portfolio/>
			<Services/>
			<Contact/>
		</>
	);
};

export default HomeComponents;
