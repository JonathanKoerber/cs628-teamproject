export default function Button({ onClick, label, className }) {
  return (
    <button onClick={onClick} className={className}>
      {label}
    </button>
  );
}
