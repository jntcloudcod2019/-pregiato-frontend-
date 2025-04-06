import React, { useState, useEffect, forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface AnimatedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  showPasswordToggle?: boolean;
}

const AnimatedInput = forwardRef<HTMLInputElement, AnimatedInputProps>(
  (
    {
      label,
      error,
      className,
      type = "text",
      showPasswordToggle = false,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [inputValue, setInputValue] = useState(props.value || "");
    const [inputType, setInputType] = useState(type);

    useEffect(() => {
      if (type === "password") {
        setInputType(showPassword ? "text" : "password");
      }
    }, [showPassword, type]);

    useEffect(() => {
      if (props.value !== undefined) {
        setInputValue(props.value);
      }
    }, [props.value]);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      props.onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      props.onChange?.(e);
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const hasValue = inputValue !== "";

    return (
      <div className="relative w-full bg-background">
        <div className="relative">
          <motion.div
            className={cn(
              "absolute pointer-events-none",
              isFocused || hasValue
                ? "-top-2.5 left-2 text-xs"
                : "top-2.5 left-3 text-base",
            )}
            initial={false}
            animate={{
              top: isFocused || hasValue ? -10 : 10,
              left: isFocused || hasValue ? 8 : 12,
              scale: isFocused || hasValue ? 0.8 : 1,
              color: isFocused
                ? "var(--color-primary)"
                : error
                  ? "var(--color-destructive)"
                  : "var(--color-muted-foreground)",
            }}
            transition={{ duration: 0.2 }}
          >
            <span
              className={cn(
                "px-1 bg-background",
                isFocused
                  ? "text-primary"
                  : error
                    ? "text-destructive"
                    : "text-muted-foreground",
              )}
            >
              {label}
            </span>
          </motion.div>

          <input
            ref={ref}
            type={inputType}
            className={cn(
              "flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background",
              "file:border-0 file:bg-transparent file:text-sm file:font-medium",
              "placeholder:text-muted-foreground focus-visible:outline-none",
              "transition-colors duration-200",
              error
                ? "border-destructive focus-visible:ring-1 focus-visible:ring-destructive"
                : "border-input focus-visible:ring-1 focus-visible:ring-ring",
              isFocused && !error ? "border-primary ring-1 ring-primary" : "",
              className,
            )}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            value={inputValue}
            {...props}
          />

          {showPasswordToggle && type === "password" && (
            <button
              type="button"
              className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
              onClick={togglePasswordVisibility}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOffIcon className="h-4 w-4" />
              ) : (
                <EyeIcon className="h-4 w-4" />
              )}
            </button>
          )}
        </div>

        {error && (
          <motion.p
            className="text-xs text-destructive mt-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  },
);

AnimatedInput.displayName = "AnimatedInput";

export default AnimatedInput;
