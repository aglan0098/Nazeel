function Card({ name, number }) {
  return (
    <div
      className={`p-6 rounded-2xl text-center cursor-pointer hover:opacity-90 transition-opacity bg-[#FEF5E5]`}
    >
      <p className="my-3 text-lg font-semibold">{number}</p>
      <p className="text-md">{name}</p>
    </div>
  );
}

export default Card;
