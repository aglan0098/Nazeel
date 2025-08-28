import ChartBarLabel from "@/components/general/charts/bar";
import ChartPieDonutText from "@/components/general/charts/pie";
import NumberCard from "@/components/general/NumberCard";

const cards = [
  {
    id: 1,
    name: "عدد السجناء",
    number: 20,
  },
  {
    id: 2,
    name: "عدد إطلاق السراح",
    number: 15,
  },
  {
    id: 3,
    name: "عدد السجناء (موقوف)",
    number: 13,
  },
  {
    id: 4,
    name: "عدد السجناء (محكوم)",
    number: 3,
  },
  {
    id: 5,
    name: "عدد السجناء (حكم ابتدائي)",
    number: 5,
  },
  {
    id: 6,
    name: "عدد المنقولين (وصول)",
    number: 4,
  },
  {
    id: 7,
    name: "عدد المنقولين (مغادرة)",
    number: 18,
  },
  {
    id: 8,
    name: "عدد دخول سجناء اليوم",
    number: 7,
  },
];

export default function Home() {
  return (
    <>
      <div className="md:grid grid-cols-2">
        <div className="mb-20 border-2 border-gray-100 rounded-xl p-3 md:p-6 my-4">
          {/* Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cards.map((card) => (
              <NumberCard key={card.id} name={card.name} number={card.number} />
            ))}
          </div>
        </div>

        <div className="mb-20 border-2 border-gray-100 rounded-xl p-3 md:p-6 my-4">
          {/* Cards */}
          <h2>مهامي</h2>
        </div>
      </div>

      <div className="md:grid grid-cols-[2fr_1fr]">
        <div>
          <ChartBarLabel />
        </div>
        <div>
          <ChartPieDonutText />
        </div>
      </div>
    </>
  );
}
