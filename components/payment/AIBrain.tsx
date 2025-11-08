"use client"

interface AIBrainProps {
  status: string
}

export default function AIBrain({ status }: AIBrainProps) {
  return (
    <div className="text-center mb-6">
      <div className="flex justify-center">
        {/* @ts-expect-error - lottie-player is a web component */}
        <lottie-player
          id="ai-brain"
          className="ai-brain"
          src="https://assets5.lottiefiles.com/packages/lf20_kkflmtur.json"
          background="transparent"
          speed="1"
          loop
          autoplay
        >
          {/* @ts-expect-error - lottie-player closing tag */}
        </lottie-player>
      </div>
      <p className="mt-2 text-gray-600">
        {status.includes("Best Route") ? (
          <span dangerouslySetInnerHTML={{ __html: status }} />
        ) : (
          status
        )}
      </p>
    </div>
  )
}
