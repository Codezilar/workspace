"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Copy, Check } from "lucide-react";
export default function PaymentForm({ wallet, amount, currency }) {
  const [form, setForm] = useState({
      amount,
      paymentMethod: "Cryptocurrency",
      currency,
      transactionHash: "",
      paymentProof: "",
      note: "",
    }),
    [loading, setLoading] = useState(false),
    [copied, setCopied] = useState(false),
    [error, setError] = useState("");
  const router = useRouter();
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const r = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          amount: Number(form.amount),
          transactionHash: form.transactionHash.trim(),
          paymentProof: form.paymentProof.trim(),
          note: form.note.trim(),
        }),
      });
      const body = await r.json();
      if (r.ok) router.push("/payment");
      else setError(body.error || "Unable to submit payment.");
    } catch {
      setError(
        "Unable to submit payment. Please check your connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
      <div className="glass rounded-3xl p-6">
        <p className="text-sm text-mist">Platform access</p>
        <p className="mt-2 text-4xl font-semibold">
          {currency} {amount}
        </p>
        <div className="mt-8 border-t border-white/10 pt-6">
          <p className="text-sm text-mist">Send to this wallet</p>
          <div className="mt-3 flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 p-3">
            <code className="min-w-0 flex-1 break-all text-xs text-white">
              {wallet || "Configure PAYMENT_WALLET_ADDRESS"}
            </code>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(wallet);
                setCopied(true);
              }}
              className="text-acid"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </div>
        </div>
        <p className="mt-7 text-sm leading-6 text-mist">
          Once you have completed the transfer, submit your transaction details.
          A platform administrator will review it before activating your
          workspace.
        </p>
      </div>
      <form onSubmit={submit} className="glass rounded-3xl p-6">
        <h2 className="text-xl font-semibold">Submit payment proof</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {[
            ["Amount paid", "amount", "number"],
            ["Payment method", "paymentMethod", "text"],
            ["Currency", "currency", "text"],
            ["Transaction / reference hash", "transactionHash", "text"],
            ["Proof URL (optional)", "paymentProof", "url"],
          ].map(([l, k, type]) => (
            <label
              key={k}
              className={
                k === "transactionHash" || k === "paymentProof"
                  ? "sm:col-span-2"
                  : ""
              }
            >
              <span className="mb-2 block text-sm text-mist">{l}</span>
              <input
                className="input"
                type={type}
                required={k === "transactionHash"}
                value={form[k]}
                onChange={(e) => setForm({ ...form, [k]: e.target.value })}
              />
            </label>
          ))}
        </div>
        <label className="mt-4 block">
          <span className="mb-2 block text-sm text-mist">Additional note</span>
          <textarea
            className="input min-h-24"
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
          />
        </label>
        {error && <p className="mt-4 text-sm text-red-300">{error}</p>}
        <button disabled={loading} className="btn btn-primary mt-6 w-full">
          {loading ? "Submitting…" : "Submit for review"}
        </button>
      </form>
    </div>
  );
}
