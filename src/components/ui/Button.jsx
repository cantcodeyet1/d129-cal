export default function Button({ children, variant = 'primary', onClick, className = '', disabled = false }) {
  return (
    <button
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
