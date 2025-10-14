export const config = {
  runtime: "edge",
};

const kubotaPrices = {
  "MX4900DT": {
    msrp: 32248,
    description: "MX4900DT – Standard Utility Tractor"
  },
  "MX4900DTC": {
    msrp: 41648,
    description: "MX4900DTC – Utility Tractor with Cab"
  }
};

export default async function handler(req) {
  const data = await req.json();
  const model = (data.model || "").toUpperCase().trim();
  const hours = parseInt(data.hours || 0);

  let priceEntry = kubotaPrices[model];

  let basePrice = priceEntry?.msrp || null;
  let description = priceEntry?.description || "Model not found – using estimated ranges.";
  let tradeIn, retail, dealer;

  // Apply fallback ranges or base MSRP logic
  if (basePrice) {
    const usageFactor = hours < 1000 ? 0.85 : hours < 2500 ? 0.70 : 0.55;
    tradeIn = `$${Math.round(basePrice * usageFactor * 0.8)} – $${Math.round(basePrice * usageFactor * 0.9)}`;
    retail = `$${Math.round(basePrice * usageFactor)} – $${Math.round(basePrice * usageFactor * 1.1)}`;
    dealer = `$${Math.round(basePrice * usageFactor * 1.15)} – $${Math.round(basePrice * usageFactor * 1.25)}`;
  } else {
    // fallback for unknown models
    if (data.type === "Tractor") {
      if (hours < 3000) tradeIn = "$17,500 – $19,500";
      else if (hours < 4500) tradeIn = "$14,500 – $17,500";
      else tradeIn = "$12,000 – $14,000";

      retail = "$18,500 – $21,000";
      dealer = "$21,500 – $23,900";
    } else if (data.type === "Mower") {
      if (hours < 800) tradeIn = "$4,000 – $5,000";
      else if (hours < 1200) tradeIn = "$3,000 – $4,000";
      else tradeIn = "$2,000 – $3,000";

      retail = "$5,000 – $6,000";
      dealer = "$6,000 – $7,500";
    }
  }

  return new Response(
    JSON.stringify({
      tradeInRange: tradeIn,
      retailRange: retail,
      dealerRange: dealer,
      description,
      suggestions: [
        "Grab it by the pussy",
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
      headers: { "Content-Type": "application/json" },
    }
  );
}
