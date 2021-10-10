import { Meta } from "@storybook/react";

import NavBar, { NavBarProps } from "../Components/NavBar/NavBar";

export default {
  title: "Blog/Navbar",
  args: {
    navBarState: true,
    setNavBarState: (a: boolean) => {},
  } as NavBarProps,
} as Meta;

export const NavBarStory = (storybookprops: NavBarProps) => (
  <NavBar {...storybookprops} />
);
