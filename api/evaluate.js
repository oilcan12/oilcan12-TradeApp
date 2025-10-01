export const config = {
  runtime: 'edge', // optional – remove if you want standard function
};

export default async function handler(req) {
  const data = await req.json();
  const hours = parseInt(data.hours || 0);
  const type = data.type || "Tractor";

  let tradeIn, retail, dealer;

  if (type === "Tractor") {
    if (hours < 3000) tradeIn = "$17,500 – $19,500";
    else if (hours < 4500) tradeIn = "$14,500 – $17,500";
    else tradeIn = "$12,000 – $14,000";

    retail = "$18,500 – $21,000";
    dealer = "$21,500 – $23,900";
  } else if (type === "Mower") {
    if (hours < 800) tradeIn = "$4,000 – $5,000";
    else if (hours < 1200) tradeIn = "$3,000 – $4,000";
    else tradeIn = "$2,000 – $3,000";

    retail = "$5,000 – $6,000";
    dealer = "$6,000 – $7,500";
  }

  return new Response(
    JSON.stringify({
      tradeInRange: tradeIn,
      retailRange: retail,
      dealerRange: dealer,
      suggestions: [
        "Wash and polish",
        "Touch-up paint",
        "Replace torn seat",
        "Grease pins",
        "Show recent maintenance"
      ],
      marketOutlook: {
        bestStrategy: "List in early spring",
        strongestMonths: "March–June",
        secondary: "September–October"
      }
    }),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
}
