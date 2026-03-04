import HomeComponents from "@/components/pages/home/HomeComponents";
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
	title: "Sultan",
	description: "I bridge the gap between cinema quality and social media speed.",
	url: "https://next-structure-seven.vercel.app/",
	image: "/suli.jpg",
});

const Home = () => <HomeComponents />;

export default Home;
