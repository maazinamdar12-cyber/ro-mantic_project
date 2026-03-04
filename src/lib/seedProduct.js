import Product from "@/models/Product";

export async function seedProducts() {
  const products = [
    {
      name: "Aqua Pure RO",
      price: 14999,
      description:
        "Advanced RO water purifier with multi-stage filtration for safe drinking water.",
      image:
        "https://png.pngtree.com/png-clipart/20250316/original/pngtree-water-purifier-png-image_19411603.png",
      isActive: true,
    },
    {
      name: "Crystal Clear RO",
      price: 18999,
      description:
        "High-performance RO purifier with mineral enhancer for better taste.",
      image:
        "https://png.pngtree.com/png-clipart/20250118/original/pngtree-smart-water-purifier-design-2025-png-image_19931692.png",
      isActive: true,
    },
    {
      name: "PureDrop RO",
      price: 12999,
      description:
        "Affordable RO water purifier designed for everyday household usage.",
      image:
        "https://png.pngtree.com/png-clipart/20250118/original/pngtree-smart-water-purifier-design-2025-png-image_19931692.png",
      isActive: true,
    },
    {
      name: "RO-Mantic Pro",
      price: 22999,
      description:
        "Premium RO purifier with UV + UF technology and smart indicators.",
      image:
        "https://png.pngtree.com/png-clipart/20250118/original/pngtree-smart-water-purifier-design-2025-png-image_19931692.png",
      isActive: true,
    },
  ];

  for (const product of products) {
    const exists = await Product.findOne({ name: product.name });

    if (!exists) {
      await Product.create(product);
      console.log(`✅ Product seeded: ${product.name}`);
    } else {
      console.log(`ℹ️ Product already exists: ${product.name}`);
    }
  }
}
