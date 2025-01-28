
function MainButton({ title, href, type, className, disabled }) {
  return (
    <a href={href}>
      <button type={type} className={className} disabled={disabled}>
        {title}
      </button>
    </a>
  );
}

export default MainButton;
