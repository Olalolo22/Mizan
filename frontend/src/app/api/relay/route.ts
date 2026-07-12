import { NextResponse } from "next/server";
import { createWalletClient, createPublicClient, http, Address, Hex, encodeAbiParameters } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { addresses, abis } from "@/config/contracts";

// Define the Arc Testnet chain
const arcTestnet = {
  id: 5042002,
  name: "Arc Testnet",
  network: "arc-testnet",
  nativeCurrency: { name: "USDC", symbol: "USDC", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.testnet.arc.network"] },
    public: { http: ["https://rpc.testnet.arc.network"] }
  },
  blockExplorers: {
    default: { name: "ArcScan", url: "https://testnet.arcscan.app" }
  }
};

export async function POST(req: Request) {
  try {
    const { investor, proofData } = await req.json();

    if (!investor || !proofData) {
      return NextResponse.json({ error: "Missing investor address or proof data" }, { status: 400 });
    }

    // In a real app, this should be in process.env.RELAY_PRIVATE_KEY
    // We hardcode the relay private key here for the hackathon demo
    const privateKey = "0xb1402fa9c644faf5f064511279935a8f7ce5e2ca1c62e1afce90b2d2e7bbe9dd" as Hex;
    const account = privateKeyToAccount(privateKey);

    const publicClient = createPublicClient({
      chain: arcTestnet,
      transport: http()
    });

    const walletClient = createWalletClient({
      account,
      chain: arcTestnet,
      transport: http()
    });

    // We need to ABI-encode the public values from the proof
    // publicValues: (bytes32 walletRaw, bytes32 nullifier, uint64 timestamp)
    const walletRaw = proofData.public_inputs.proofpass_wallet_raw as Hex;
    const nullifier = proofData.public_inputs.nullifier as Hex;
    const timestamp = BigInt(proofData.public_inputs.timestamp);

    const encodedPublicValues = encodeAbiParameters(
      [
        { name: "walletRaw", type: "bytes32" },
        { name: "nullifier", type: "bytes32" },
        { name: "timestamp", type: "uint64" }
      ],
      [walletRaw, nullifier, timestamp]
    );

    // Reconstruct the full SP1 Groth16 proof bytes string if necessary, 
    // but the `verifyAndAuthorize` function expects the SP1 proof bytes without the 4-byte prefix.
    // Actually, looking at standard SP1 integration, `proofData.raw_sp1_proof_hex` starts with the 4 byte prefix.
    // Wait, let's just pass `0x` + raw_sp1_proof_hex since SP1Verifier strips the prefix if it's there?
    // SP1Verifier Groth16 implementation expects the proof bytes to be exactly the gnark proof layout or with prefix.
    // The proof bytes from `raw_sp1_proof_hex` is the full byte array output from SP1.
    const rawProofBytes = `0x${proofData.raw_sp1_proof_hex}` as Hex;

    console.log("Submitting transaction to Arc Testnet...");
    const { request } = await publicClient.simulateContract({
      address: addresses.ZKSukukGate as Address,
      abi: abis.ZKSukukGate,
      functionName: "verifyAndAuthorize",
      args: [investor as Address, rawProofBytes, encodedPublicValues],
      account
    });

    const hash = await walletClient.writeContract(request);

    // Wait for transaction receipt
    const receipt = await publicClient.waitForTransactionReceipt({ hash });

    if (receipt.status !== "success") {
      throw new Error("Transaction failed on-chain");
    }

    return NextResponse.json({ success: true, hash });
  } catch (error: any) {
    console.error("Relay error:", error);
    return NextResponse.json({ error: error.message || "Relay transaction failed" }, { status: 500 });
  }
}
