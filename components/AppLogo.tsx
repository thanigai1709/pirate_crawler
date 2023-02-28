import Link from "next/link";
import Image from "next/image";
const AppLogo = ({ route }) => {
	return (
		<Link className="app-logo" href={route}>
			<Image className="app-logo__img" src="/static/cat.png" alt="site logo" width="64" height="64" />
			<span>CopyKat</span>
		</Link>
	);
};

export default AppLogo;
