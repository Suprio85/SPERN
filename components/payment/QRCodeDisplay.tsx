"use client"

interface QRCodeDisplayProps {
  qrCodeUrl: string
  amount: number
}

export default function QRCodeDisplay({ qrCodeUrl, amount }: QRCodeDisplayProps) {
  return (
    <div className="text-center py-8">
      <h3 className="text-lg font-semibold mb-4">Scan to Pay</h3>
      <img 
        src={qrCodeUrl} 
        alt="Payment QR Code" 
        className="mx-auto border-4 border-purple-100 rounded-xl"
      />
      <p className="text-sm text-gray-600 mt-4">
        Scan with any UPI app to pay ₹{amount}
      </p>
    </div>
  )
}
