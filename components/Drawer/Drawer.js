import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useRouter } from "next/navigation";
import { CiMenuBurger } from "react-icons/ci";
import Cookies from "js-cookie";
import "./drawer.css";

export default function TemporaryDrawer() {
	const router = useRouter();
	const [state, setState] = useState({
		left: false,
	});

	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	const goTo = (index) => {
		let path = "/requests";
		if (index == 1) {
			path = "/uploads";
		}
		if (index === null) {
			Cookies.remove("access_token");
			path = "/login";
		}
		router.push(path);
	};

	const list = (anchor) => (
		<Box
			sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
			role="presentation"
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<List>
				{["Requests", "Upload File"].map((text, index) => (
					<ListItem key={text} disablePadding onClick={() => goTo(index)}>
						<ListItemButton>
							<ListItemIcon>
								{/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				{["Logout"].map((text, index) => (
					<ListItem key={text} disablePadding onClick={() => goTo(null)}>
						<ListItemButton>
							<ListItemIcon>
								{/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);

	return (
		<div className="drawer-container">
			<React.Fragment key={"left"}>
				<Button onClick={toggleDrawer("left", true)}>
					<CiMenuBurger size="2em" />
				</Button>
				<Drawer
					anchor={"left"}
					open={state["left"]}
					onClose={toggleDrawer("left", false)}
				>
					{list("left")}
				</Drawer>
			</React.Fragment>
		</div>
	);
}
