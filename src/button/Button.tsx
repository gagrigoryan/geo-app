import React from "react";
import styles from "./button.module.scss";
import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isActive?: boolean;
  className?: string;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ isActive, className, children, ...props }, ref) => {
    return (
      <button
        className={clsx(
          styles.container,
          isActive && styles.containerActive,
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
