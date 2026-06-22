import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div className="w-full h-10 flex justify-center gap-10 items-center shadow-md">
      <NavLink to='/'>Контакты</NavLink>
      <NavLink to='/addContact'>Добавить контакт</NavLink>
    </div>
  );
}

export default Header;
