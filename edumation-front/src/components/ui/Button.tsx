import { ButtonHTMLAttributes, forwardRef } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '../../utils/twUtils';
import { Link } from 'react-router-dom';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline disabled:pointer-events-none',
  {
    variants: {
      variant: {
        blue: 'mr-2 bg-blue-300 hover:bg-blue-400 text-blue-900 font-bold rounded',
        red: 'mr-2 bg-red-300 hover:bg-red-400 text-red-900 font-bold rounded',
        green:
          'mr-2 bg-green-300 hover:bg-green-400 text-green-900 font-bold rounded',
        yellow:
          'mr-2 bg-yellow-300 hover:bg-yellow-500 text-yellow-900 font-bold rounded',
        purple:
          'mr-2 bg-purple-500 hover:bg-purple-700 text-white font-bold rounded',
        default:
          'bg-blue-900 text-white hover:bg-blue-700 dark:bg-blue-50 dark:text-blue-900',
        outline:
          'bg-transparent border border-blue-200 hover:bg-blue-100 dark:border-blue-700 dark:text-blue-800',
        subtle:
          'bg-blue-100 text-blue-900 hover:bg-blue-200 dark:bg-blue-700 dark:text-blue-100',
        ghost:
          'bg-transparent dark:bg-transparent hover:bg-blue-100 dark:hover:bg-blue-800 dark:text-blue-100 dark:hover:text-blue-100 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-2 rounded-md',
        lg: 'h-11 px-8 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, href, variant, size, ...props }, ref) => {
    if (href) {
      return (
        <Link
          href={href}
          className={cn(buttonVariants({ variant, size, className }))}
        >
          {children}
        </Link>
      );
    }
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

export default Button;
