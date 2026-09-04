import { NextResponse } from "next/server";
import { getDbUser, isAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Payment from "@/models/Payment";
import { paymentSchema } from "@/lib/validators";
export async function POST(req) {
  try {
    const user = await getDbUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (user.accessStatus === "ACTIVE")
      return NextResponse.json(
        { error: "Account already active" },
        { status: 400 },
      );
    const parsed = paymentSchema.safeParse(await req.json());
    if (!parsed.success)
      return NextResponse.json(
        {
          error:
            parsed.error.issues[0]?.message ||
            "Please check your payment details.",
        },
        { status: 400 },
      );
    await connectDB();
    const pending = await Payment.findOne({
      userId: user._id,
      status: "PENDING",
    });
    if (pending) {
      user.accessStatus = "PAYMENT_REVIEW";
      await user.save();
      return NextResponse.json({ ok: true, alreadySubmitted: true });
    }
    try {
      await Payment.create({
        ...parsed.data,
        userId: user._id,
        walletAddress: process.env.PAYMENT_WALLET_ADDRESS || "",
      });
    } catch (error) {
      if (error?.code === 11000) {
        const existingPending = await Payment.findOne({
          userId: user._id,
          status: "PENDING",
        });
        if (existingPending) {
          user.accessStatus = "PAYMENT_REVIEW";
          await user.save();
          return NextResponse.json({ ok: true, alreadySubmitted: true });
        }
        return NextResponse.json(
          {
            error:
              "This transaction/reference hash has already been submitted. Enter the unique reference from your transfer.",
          },
          { status: 409 },
        );
      }
      throw error;
    }
    user.accessStatus = "PAYMENT_REVIEW";
    await user.save();
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Payment submission failed:", error);
    return NextResponse.json(
      { error: "We could not save your payment submission. Please try again." },
      { status: 500 },
    );
  }
}
export async function GET() {
  const user = await getDbUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const query = isAdmin(user) ? {} : { userId: user._id };
  return NextResponse.json(
    await Payment.find(query)
      .populate("userId", "name email")
      .sort({ createdAt: -1 })
      .lean(),
  );
}
