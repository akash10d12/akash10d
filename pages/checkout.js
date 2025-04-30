import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Checkout() {
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("selectedProduct");
    if (saved) {
      const parsed = JSON.parse(saved);
      setProduct(parsed);
      setSize("35"); // default size
    }
  }, []);

  const total = product ? product.price * quantity : 0;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !address || !phone || !size) {
      alert("Please fill in all fields.");
      return;
    }

    alert(`Order placed!\n\nName: ${name}\nPhone: ${phone}\nAddress: ${address}\nProduct: ${product.name}\nSize: ${size}\nQuantity: ${quantity}\nTotal: $${total}`);

    localStorage.removeItem("selectedProduct");
    router.push("/");
  };

  if (!product) return <p className="p-4">No product selected.</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <img src={product.imageUrl} alt={product.name} className="w-full max-w-sm mx-auto mb-4" />
      <h3 className="text-xl font-semibold">{product.name}</h3>
      <p className="mb-2">Unit Price: ${product.price}</p>
      <p className="mb-2">Total: ${total}</p>

      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div>
          <label className="block font-medium">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-4 py-2"
          />
        </div>

        <div>
          <label className="block font-medium">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border rounded px-4 py-2"
          />
        </div>

        <div>
          <label className="block font-medium">Delivery Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border rounded px-4 py-2"
          ></textarea>
        </div>

        <div>
          <label className="block font-medium">Shoe Size</label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full border rounded px-4 py-2"
          >
            {[...Array(9)].map((_, i) => (
              <option key={i} value={35 + i}>{35 + i}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium">Quantity</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full border rounded px-4 py-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Confirm Order
        </button>
      </form>
    </div>
  );
}