import { classNames } from "shared/lib/classNames/classNames";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import cls from "./Navbar.module.scss";

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <div className={cls.links}>
        <AppLink to="/" className={cls.mainLink} theme={AppLinkTheme.PRIMARY}>
          Main page
        </AppLink>
        <AppLink to="/about" theme={AppLinkTheme.RED}>About page</AppLink>
      </div>
    </div>
  );
};
