"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, CheckCircle2, Copy } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/products";
import { BRAND_CONFIG } from "@/lib/config";

type PaymentMethod = "cod" | "jazzcash" | "easypaisa";
type Step = "info" | "shipping" | "payment" | "review" | "confirmation";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  notes: string;
  paymentMethod: PaymentMethod;
}

function generateOrderNumber() {
  return `BAT-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .slice(2, 6)
    .toUpperCase()}`;
}

export default function CheckoutPage() {
  const { items, getSubtotal, clearCart } = useCartStore();
  const subtotal = useCartStore((s) => s.getSubtotal());
  const [step, setStep] = useState<Step>("info");
  const [orderNumber, setOrderNumber] = useState("");
  const [copied, setCopied] = useState(false);

  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    notes: "",
    paymentMethod: "cod",
  });

  const update = (k: keyof FormData, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleConfirm = () => {
    const num = generateOrderNumber();
    setOrderNumber(num);
    clearCart();
    setStep("confirmation");
  };

  const copyOrder = () => {
    navigator.clipboard.writeText(orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const STEPS: { id: Step; label: string }[] = [
    { id: "info", label: "Information" },
    { id: "shipping", label: "Shipping" },
    { id: "payment", label: "Payment" },
    { id: "review", label: "Review" },
  ];

  const currentIdx = STEPS.findIndex((s) => s.id === step);

  if (step === "confirmation") {
    return (
      <main className="pt-20 min-h-screen bg-stone-50 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg w-full text-center py-20"
        >
          <div className="flex justify-center mb-8">
            <CheckCircle2 size={64} className="text-emerald-500" strokeWidth={1.5} />
          </div>
          <p className="text-[11px] text-amber-500 tracking-[0.3em] uppercase font-medium mb-3">
            Order Placed
          </p>
          <h1 className="text-4xl font-light text-stone-900 mb-4">Thank You</h1>
          <p className="text-stone-500 mb-8 leading-relaxed">
            Your order has been received. Our team will contact you shortly to confirm delivery
            details.
          </p>

          <div className="bg-white border border-stone-200 p-6 mb-8">
            <p className="text-xs text-stone-400 tracking-widest uppercase mb-2">Order Number</p>
            <div className="flex items-center justify-center gap-3">
              <p className="text-2xl font-mono font-semibold text-stone-900">{orderNumber}</p>
              <button onClick={copyOrder} className="text-stone-400 hover:text-stone-700">
                <Copy size={16} />
              </button>
            </div>
            {copied && <p className="text-xs text-emerald-500 mt-2">Copied!</p>}
          </div>

          {form.paymentMethod === "jazzcash" && (
            <div className="bg-red-50 border border-red-200 p-5 mb-6 text-left">
              <p className="text-sm font-semibold text-red-800 mb-2">JazzCash Payment</p>
              <p className="text-sm text-red-700">
                Please send payment to our JazzCash account. Include your order number{" "}
                <strong>{orderNumber}</strong> in the reference. Our team will verify and confirm.
              </p>
            </div>
          )}

          {form.paymentMethod === "easypaisa" && (
            <div className="bg-green-50 border border-green-200 p-5 mb-6 text-left">
              <p className="text-sm font-semibold text-green-800 mb-2">Easypaisa Payment</p>
              <p className="text-sm text-green-700">
                Please send payment to our Easypaisa account. Include your order number{" "}
                <strong>{orderNumber}</strong> in the reference. Our team will verify and confirm.
              </p>
            </div>
          )}

          {form.paymentMethod === "cod" && (
            <div className="bg-stone-100 border border-stone-200 p-5 mb-6 text-left">
              <p className="text-sm font-semibold text-stone-800 mb-2">Cash on Delivery</p>
              <p className="text-sm text-stone-600">
                Payment will be collected upon delivery. Our team will contact you to arrange a
                delivery time.
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center bg-stone-900 text-white px-8 py-4 text-sm font-medium tracking-widest uppercase hover:bg-stone-700 transition-colors"
            >
              Continue Shopping
            </Link>
            <a
              href={`https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                `Hi, I placed an order (${orderNumber}). Can you confirm the details?`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border border-stone-200 text-stone-700 px-8 py-4 text-sm font-medium tracking-widest uppercase hover:border-stone-400 transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="pt-20 min-h-screen bg-stone-50">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-12">
        {/* Header */}
        <div className="mb-12">
          <nav className="flex items-center gap-2 text-xs text-stone-400 mb-6">
            <Link href="/" className="hover:text-stone-700">Home</Link>
            <ChevronRight size={12} />
            <Link href="/shop" className="hover:text-stone-700">Shop</Link>
            <ChevronRight size={12} />
            <span className="text-stone-700">Checkout</span>
          </nav>
          <h1 className="text-4xl font-light text-stone-900">Checkout</h1>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-0 mb-12 overflow-x-auto">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <div
                className={`flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-wider uppercase transition-colors ${
                  i <= currentIdx
                    ? "text-stone-900"
                    : "text-stone-400"
                }`}
              >
                <span
                  className={`w-6 h-6 flex items-center justify-center text-[11px] border transition-colors ${
                    i < currentIdx
                      ? "bg-stone-900 border-stone-900 text-white"
                      : i === currentIdx
                      ? "border-stone-900 text-stone-900"
                      : "border-stone-300 text-stone-400"
                  }`}
                >
                  {i < currentIdx ? "✓" : i + 1}
                </span>
                {s.label}
              </div>
              {i < STEPS.length - 1 && (
                <ChevronRight size={14} className="text-stone-300 mx-1" />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Form */}
          <div className="lg:col-span-3">
            {/* Step 1: Info */}
            {step === "info" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-xl font-semibold text-stone-900 mb-8">
                  Customer Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="First Name" value={form.firstName} onChange={(v) => update("firstName", v)} />
                  <Field label="Last Name" value={form.lastName} onChange={(v) => update("lastName", v)} />
                  <Field label="Email" type="email" value={form.email} onChange={(v) => update("email", v)} className="sm:col-span-2" />
                  <Field label="Phone" type="tel" value={form.phone} onChange={(v) => update("phone", v)} className="sm:col-span-2" placeholder="+92 300 000 0000" />
                </div>
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => setStep("shipping")}
                    disabled={!form.firstName || !form.lastName || !form.phone}
                    className="bg-stone-900 text-white px-8 py-4 text-sm font-medium tracking-widest uppercase hover:bg-stone-700 transition-colors disabled:opacity-40"
                  >
                    Continue to Shipping
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Shipping */}
            {step === "shipping" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-xl font-semibold text-stone-900 mb-8">
                  Shipping Information
                </h2>
                <div className="space-y-4">
                  <Field label="Street Address" value={form.address} onChange={(v) => update("address", v)} className="col-span-2" />
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="City" value={form.city} onChange={(v) => update("city", v)} />
                    <Field label="Province" value={form.province} onChange={(v) => update("province", v)} />
                  </div>
                  <Field label="Postal Code" value={form.postalCode} onChange={(v) => update("postalCode", v)} />
                  <div>
                    <label className="block text-xs text-stone-500 tracking-widest uppercase mb-2">
                      Order Notes (Optional)
                    </label>
                    <textarea
                      value={form.notes}
                      onChange={(e) => update("notes", e.target.value)}
                      rows={3}
                      className="w-full border border-stone-200 px-4 py-3 text-sm text-stone-800 outline-none focus:border-stone-400 resize-none"
                      placeholder="Special delivery instructions..."
                    />
                  </div>
                </div>
                <div className="mt-8 flex justify-between">
                  <button onClick={() => setStep("info")} className="text-sm text-stone-500 hover:text-stone-800 underline">
                    Back
                  </button>
                  <button
                    onClick={() => setStep("payment")}
                    disabled={!form.address || !form.city}
                    className="bg-stone-900 text-white px-8 py-4 text-sm font-medium tracking-widest uppercase hover:bg-stone-700 transition-colors disabled:opacity-40"
                  >
                    Continue to Payment
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Payment */}
            {step === "payment" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-xl font-semibold text-stone-900 mb-8">
                  Payment Method
                </h2>

                <div className="space-y-4">
                  <PaymentOption
                    id="cod"
                    label="Cash on Delivery"
                    description="Pay in cash when your order arrives."
                    selected={form.paymentMethod === "cod"}
                    onSelect={() => update("paymentMethod", "cod")}
                    icon="💵"
                  />
                  <PaymentOption
                    id="jazzcash"
                    label="JazzCash"
                    description="Mobile wallet payment via JazzCash. You will receive payment details after placing the order."
                    selected={form.paymentMethod === "jazzcash"}
                    onSelect={() => update("paymentMethod", "jazzcash")}
                    icon="🔴"
                  />
                  <PaymentOption
                    id="easypaisa"
                    label="Easypaisa"
                    description="Mobile wallet payment via Easypaisa. You will receive payment details after placing the order."
                    selected={form.paymentMethod === "easypaisa"}
                    onSelect={() => update("paymentMethod", "easypaisa")}
                    icon="🟢"
                  />
                </div>

                <p className="mt-6 text-xs text-stone-400 leading-relaxed">
                  * JazzCash and Easypaisa payments are processed manually. Our team will send you
                  account details to complete the transfer after order placement.
                </p>

                <div className="mt-8 flex justify-between">
                  <button onClick={() => setStep("shipping")} className="text-sm text-stone-500 hover:text-stone-800 underline">
                    Back
                  </button>
                  <button
                    onClick={() => setStep("review")}
                    className="bg-stone-900 text-white px-8 py-4 text-sm font-medium tracking-widest uppercase hover:bg-stone-700 transition-colors"
                  >
                    Review Order
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Review */}
            {step === "review" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-xl font-semibold text-stone-900 mb-8">Order Review</h2>

                <div className="space-y-6 mb-8">
                  <ReviewSection title="Customer">
                    <p>{form.firstName} {form.lastName}</p>
                    {form.email && <p className="text-stone-500">{form.email}</p>}
                    <p className="text-stone-500">{form.phone}</p>
                  </ReviewSection>
                  <ReviewSection title="Shipping">
                    <p>{form.address}</p>
                    <p className="text-stone-500">{form.city}, {form.province} {form.postalCode}</p>
                  </ReviewSection>
                  <ReviewSection title="Payment">
                    <p className="capitalize">
                      {form.paymentMethod === "cod"
                        ? "Cash on Delivery"
                        : form.paymentMethod === "jazzcash"
                        ? "JazzCash"
                        : "Easypaisa"}
                    </p>
                  </ReviewSection>
                </div>

                <div className="mt-8 flex justify-between">
                  <button onClick={() => setStep("payment")} className="text-sm text-stone-500 hover:text-stone-800 underline">
                    Back
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="bg-amber-500 text-stone-950 px-8 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-amber-400 transition-colors"
                  >
                    Place Order
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-stone-100 p-8 sticky top-28">
              <h3 className="text-base font-semibold text-stone-900 mb-6">Order Summary</h3>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <div className="relative w-16 h-16 bg-stone-50 border border-stone-100 flex-shrink-0">
                      <Image src={item.product.images[0]} alt={item.product.name} fill className="object-contain p-1" />
                      <span className="absolute -top-2 -right-2 bg-stone-700 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-stone-900 truncate">{item.product.name}</p>
                      <p className="text-xs text-stone-400 truncate">{item.product.subtitle}</p>
                      <p className="text-sm font-semibold text-stone-900 mt-1">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-stone-100 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Subtotal</span>
                  <span className="text-stone-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Shipping</span>
                  <span className="text-stone-500 text-xs">Calculated on confirmation</span>
                </div>
                <div className="flex justify-between text-base font-semibold border-t border-stone-100 pt-3 mt-3">
                  <span className="text-stone-900">Total</span>
                  <span className="text-stone-900">{formatPrice(subtotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  className = "",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  className?: string;
  placeholder?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-xs text-stone-500 tracking-widest uppercase mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-stone-200 px-4 py-3 text-sm text-stone-800 outline-none focus:border-stone-400 bg-white transition-colors"
      />
    </div>
  );
}

function PaymentOption({
  id,
  label,
  description,
  selected,
  onSelect,
  icon,
}: {
  id: string;
  label: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
  icon: string;
}) {
  return (
    <button
      onClick={onSelect}
      className={`w-full text-left p-5 border-2 transition-all ${
        selected ? "border-stone-900 bg-stone-50" : "border-stone-200 bg-white hover:border-stone-300"
      }`}
    >
      <div className="flex items-center gap-3 mb-2">
        <span className="text-xl">{icon}</span>
        <span className="font-semibold text-stone-900 text-sm">{label}</span>
        <div className={`ml-auto w-4 h-4 rounded-full border-2 flex items-center justify-center ${
          selected ? "border-stone-900" : "border-stone-300"
        }`}>
          {selected && <div className="w-2 h-2 rounded-full bg-stone-900" />}
        </div>
      </div>
      <p className="text-xs text-stone-500 leading-relaxed">{description}</p>
    </button>
  );
}

function ReviewSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-stone-100 pb-4">
      <p className="text-[11px] text-stone-400 tracking-widest uppercase mb-2">{title}</p>
      <div className="text-sm text-stone-700 space-y-0.5">{children}</div>
    </div>
  );
}
