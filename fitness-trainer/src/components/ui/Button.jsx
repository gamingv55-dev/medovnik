import './Button.css';

export default function Button({
  variant = 'primary',
  as: Tag = 'button',
  children,
  className = '',
  ...props
}) {
  return (
    <Tag className={`btn btn--${variant} ${className}`} {...props}>
      {children}
    </Tag>
  );
}
