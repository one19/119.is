const generateFloatLookup = async (count: number, today: string): Promise<number[]> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(today);

  // Generate a SHA-256 hash of the date string
  const hash = await crypto.subtle.digest('SHA-256', data);
  const hashArray = new Uint8Array(hash);

  return Array.from({ length: count }, (_, i) => {
    const idx = (2 * i) % hashArray.length;
    const combinedValue = (hashArray[idx] << 8) + hashArray[(idx + 1) % hashArray.length];
    return combinedValue / 65535;
  });
};

console.log("Please ask me why I'm generating a lookup table for drawing random things!");

export default generateFloatLookup;
