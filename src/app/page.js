import NumberCard from "@/components/layout/ui/NumberCard";

const cards = [
  {
    id: 1,
    name: "معاملات قيد التحضير",
    number: 10,
  },
  {
    id: 2,
    name: "الوارد الداخلي",
    number: 15,
  },
  {
    id: 3,
    name: "نسخ الوارد الداخلي",
    number: 5,
  },
  {
    id: 4,
    name: "المتأخرات",
    number: 20,
  },
  {
    id: 5,
    name: "المحفوظات",
    number: 8,
  },
  {
    id: 6,
    name: "المعملات المنجزة",
    number: 12,
  },
  {
    id: 7,
    name: "المفضلات",
    number: 18,
  },
  {
    id: 8,
    name: "التعاميم",
    number: 7,
  },
];

export default function Home() {
  return (
    <div>
      <div className="mb-20 border-2 border-gray-100 rounded-xl p-3 md:p-6 my-4">
        {/* Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cards.map((card) => (
            <NumberCard key={card.id} name={card.name} number={card.number} />
          ))}
        </div>
      </div>
    </div>
  );
}
