import { FormEvent } from "react";
import Style from "./ChangeName.module.css";

interface ChangeNameProps {
  name: string;
  changeNameFunction: (targetValue: string) => void;
  submitNameFunction: (targetEvent: FormEvent<HTMLFormElement>) => void;
}

const changeName = ({
  name,
  changeNameFunction,
  submitNameFunction,
}: ChangeNameProps) => {
  return (
    <form
      className={Style.form}
      onSubmit={(event) => submitNameFunction(event)}
    >
      <input
        className={Style.input}
        type="text"
        onChange={(event) => {
          changeNameFunction(event.target.value);
        }}
        placeholder="변경할 닉네임을 입력"
      />
      <br />
      <button className={Style.button} type="submit">
        제출
      </button>
    </form>
  );
};

export default changeName;
