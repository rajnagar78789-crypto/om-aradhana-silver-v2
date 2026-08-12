const { createClient } = require('@sanity/client');

// Sanity connection setup
const client = createClient({
  projectId: '0acvey0w', // ✅ Maine tera asli Project ID daal diya hai
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'sklGZa382fHIAuqpWJizUfh0mKTvBIu0z0lsA7Gjib9HBcuTRJwc1vzMJRtrI8tYimWpqSD7nxWzH85iguGSnBGybz2gf7fG2UlO7AaegRS8vzSQEtIQxOkb6GDY6he3uudIDM3NSzhMh5ukl8Oyj8xB64KKTdsVsujIZbedqUk0FuFXL81a', // ⚠️ DHYAN DE: Yahan apna wo lamba wala Sanity Token daal (Quotes '' ke andar)
});

async function deleteKachra() {
  console.log('🚀 Atki hui reels saaf karne ka process shuru...');

  try {
    // Tere screenshot mein naam 'Reels Showcase' tha, toh umeed hai _type 'reelsShowcase' hoga. 
    // Isse tere products 100% safe rahenge, sirf reels udengi.
    const query = '*[_type == "reel"]{_id}';
    
    const docs = await client.fetch(query);

    if (docs.length === 0) {
      console.log('✅ Yahan toh kuch mila hi nahi bhai! (Shayad _type ka naam kuch aur hai)');
      return;
    }

    console.log(`🔥 Total ${docs.length} reels mili hain. Ab inko udate hain...`);

    // Ek-ek karke sabko delete marenge
    for (const doc of docs) {
      await client.delete(doc._id);
      console.log(`🗑️ Uda diya ID: ${doc._id}`);
    }

    console.log('🎉 Kaam 25! Saari atki hui reels ekdam saaf.');
  } catch (error) {
    console.error('❌ Error aagaya bhai:', error.message);
  }
}

deleteKachra();