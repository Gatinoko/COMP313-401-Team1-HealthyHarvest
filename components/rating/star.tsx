const Star = ({
  filled,
  onClick,
}: {
  filled: boolean;
  onClick: () => void;
}) => {
  return (
    <span className='star' onClick={onClick}>
      {filled ? '★' : '☆'}
    </span>
  );
};

export default Star;
