export default async function handler(req, res) {
  try {
    const response = await fetch(
      `${process.env.VITE_SUPABASE_URL}/rest/v1/entries?select=created_at&limit=1`,
      {
        headers: {
          apikey: process.env.VITE_SUPABASE_ANON_KEY,
          Authorization: `Bearer ${process.env.VITE_SUPABASE_ANON_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Supabase responded with ${response.status}`);
    }

    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}
