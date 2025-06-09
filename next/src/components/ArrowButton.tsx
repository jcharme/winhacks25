import { ButtonHTMLAttributes, ReactNode, SVGProps} from "react";

// source @ https://heroicons.com/outline/
// modified to remove padding (changed viewbox)
const ModifiedArrowRightCircleIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      viewBox="2.25 2.25 19.5 19.5"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z"
      />
    </svg>
  );
};

type ArrowButtonProps = {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const ArrowButton = ({children, ...rest}: ArrowButtonProps) => {
  return (
    <button className="relative h-6 w-fit flex items-center border border-text rounded-3xl box-border" {...rest}>
      <span className="text-lg pl-7 pr-1">{children}</span>
      <ModifiedArrowRightCircleIcon className="size-6 text-primary absolute -z-10" />
    </button>
  );
};

export default ArrowButton;
