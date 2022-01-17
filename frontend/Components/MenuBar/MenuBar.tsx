// css
import styles from "./MenuBar.module.css";

interface MenuBarProps {
  menuBarWrapperId: string;
  menuBarWrapperClassName: string;
  onMouseEnter: VoidFunction;
  onMouseLeave: VoidFunction;
  menuBarNavClassName: string;
  menuBarNavId: string;
}

const MenuBar = ({
  menuBarWrapperId,
  menuBarWrapperClassName,
  onMouseEnter,
  onMouseLeave,
  menuBarNavClassName,
  menuBarNavId,
}: MenuBarProps) => {
  return (
    <div
      id={menuBarWrapperId}
      className={menuBarWrapperClassName}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <nav className={menuBarNavClassName} id={menuBarNavId}>
        <h2>DevBlog</h2>
        <ul>
          <li>test1</li>
          <li>test2</li>
        </ul>
      </nav>
    </div>
  );
};

export default MenuBar;
