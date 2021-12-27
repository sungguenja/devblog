import { hastag } from "Interfaces/writing";

interface hashTagProps {
  hashTagObj: hastag;
}

const hashTag = ({ hashTagObj }: hashTagProps) => {
  return <h1>#{hashTagObj.fields.title}</h1>;
};

export default hashTag;