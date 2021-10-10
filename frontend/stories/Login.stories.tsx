import { Meta } from "@storybook/react";

import Login, { props } from "../Components/LoginComponent/Login";

export default {
  title: "Blog/Login",
  args: {
    loginPropsList: [],
  } as props,
} as Meta;

export const LoginStory = (storybookprops: props) => (
  <Login {...storybookprops} />
);
